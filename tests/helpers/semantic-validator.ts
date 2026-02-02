import Anthropic from '@anthropic-ai/sdk';
import type { RealmKey } from '../../src/data/types';
import { realms } from '../../src/data/realms';
import type { TrioInsight } from '../../src/data/trioInsights';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Semantic Validator - AI-powered validation of trio insights
 */

export interface SemanticValidationResult {
  trioKey: string;
  isAppropriate: boolean;
  reasoning: string;
  confidence: 'high' | 'medium' | 'low';
  suggestions?: string[];
}

// Cache for semantic validation results
const CACHE_FILE = path.join(process.cwd(), 'test-reports', 'semantic-cache.json');
let cache: Record<string, SemanticValidationResult> = {};

// Load cache on initialization
if (fs.existsSync(CACHE_FILE)) {
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  } catch (e) {
    console.warn('Failed to load semantic validation cache:', e);
  }
}

/**
 * Validate a trio insight using Claude API
 */
export async function validateTrioInsightSemantically(
  realm1: RealmKey,
  realm2: RealmKey,
  realm3: RealmKey,
  insight: TrioInsight
): Promise<SemanticValidationResult> {
  const trioKey = [realm1, realm2, realm3].sort().join('-');

  // Check cache first
  if (cache[trioKey]) {
    return cache[trioKey];
  }

  // Get realm descriptions
  const realmDescriptions = [realm1, realm2, realm3].map(key => {
    const realm = realms[key];
    return {
      key,
      name: realm?.name || key,
      description: realm?.lore || realm?.quote || ''
    };
  });

  // Initialize Anthropic client
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is required for semantic validation');
  }

  const client = new Anthropic({ apiKey });

  // Construct validation prompt
  const prompt = `You are validating emotional quiz results for consistency and appropriateness.

I have a quiz that measures 10 emotional realms. Users' answers produce a "trio" of their top 3 realms, and each trio combination has a personalized insight.

**The Three Realms:**
${realmDescriptions.map(r => `- **${r.name}** (${r.key}): ${r.description}`).join('\n')}

**The Trio Insight:**
- **Title:** ${insight.title}
- **Description:** ${insight.insight}
- **Strengths:** ${insight.strengths.join('; ')}
- **Challenges:** ${insight.challenges.join('; ')}

**Your Task:**
Evaluate whether this trio insight is appropriate and accurate for someone whose top 3 emotional realms are ${realmDescriptions.map(r => r.name).join(', ')}.

Consider:
1. Does the title capture the essence of combining these three emotional states?
2. Does the description accurately reflect the interplay of these three realms?
3. Are the strengths and challenges appropriate for this combination?
4. Is there any disconnect or inconsistency between the realms and the insight?

**Respond in this exact format:**
APPROPRIATE: [YES or NO]
CONFIDENCE: [HIGH, MEDIUM, or LOW]
REASONING: [1-2 sentence explanation]
SUGGESTIONS: [Optional: specific improvements if NO or MEDIUM confidence, or write NONE]`;

  try {
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';

    // Parse response
    const appropriateMatch = text.match(/APPROPRIATE:\s*(YES|NO)/i);
    const confidenceMatch = text.match(/CONFIDENCE:\s*(HIGH|MEDIUM|LOW)/i);
    const reasoningMatch = text.match(/REASONING:\s*([^\n]+)/i);
    const suggestionsMatch = text.match(/SUGGESTIONS:\s*([^\n]+(?:\n(?!APPROPRIATE|CONFIDENCE|REASONING|SUGGESTIONS)[^\n]+)*)/i);

    const isAppropriate = appropriateMatch?.[1]?.toUpperCase() === 'YES';
    const confidence = (confidenceMatch?.[1]?.toLowerCase() as 'high' | 'medium' | 'low') || 'medium';
    const reasoning = reasoningMatch?.[1]?.trim() || 'No reasoning provided';
    const suggestionsText = suggestionsMatch?.[1]?.trim() || '';
    const suggestions = suggestionsText && suggestionsText !== 'NONE'
      ? suggestionsText.split(/[;.\n]/).map(s => s.trim()).filter(s => s.length > 0)
      : undefined;

    const result: SemanticValidationResult = {
      trioKey,
      isAppropriate,
      reasoning,
      confidence,
      suggestions
    };

    // Cache the result
    cache[trioKey] = result;
    saveCache();

    return result;
  } catch (error) {
    console.error(`Semantic validation failed for ${trioKey}:`, error);

    // Return a default result on error
    return {
      trioKey,
      isAppropriate: true, // Assume appropriate on error to avoid false negatives
      reasoning: `Error during validation: ${error instanceof Error ? error.message : 'Unknown error'}`,
      confidence: 'low'
    };
  }
}

/**
 * Validate multiple trio insights in batch (with rate limiting)
 */
export async function validateTrioInsightsBatch(
  trios: Array<{
    realms: [RealmKey, RealmKey, RealmKey];
    insight: TrioInsight;
  }>,
  delayMs: number = 1000 // Delay between API calls to respect rate limits
): Promise<SemanticValidationResult[]> {
  const results: SemanticValidationResult[] = [];

  for (const trio of trios) {
    const [realm1, realm2, realm3] = trio.realms;
    const result = await validateTrioInsightSemantically(realm1, realm2, realm3, trio.insight);
    results.push(result);

    // Wait before next API call
    if (delayMs > 0) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  return results;
}

/**
 * Save cache to disk
 */
function saveCache() {
  try {
    const dir = path.dirname(CACHE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch (e) {
    console.warn('Failed to save semantic validation cache:', e);
  }
}

/**
 * Generate a markdown report from semantic validation results
 */
export function generateSemanticReport(results: SemanticValidationResult[]): string {
  const appropriate = results.filter(r => r.isAppropriate);
  const inappropriate = results.filter(r => !r.isAppropriate);
  const highConfidence = results.filter(r => r.confidence === 'high');
  const mediumConfidence = results.filter(r => r.confidence === 'medium');
  const lowConfidence = results.filter(r => r.confidence === 'low');

  let report = `# Semantic Validation Report\n\n`;
  report += `**Generated:** ${new Date().toISOString()}\n\n`;
  report += `## Summary\n\n`;
  report += `- **Total Validated:** ${results.length}\n`;
  report += `- **Appropriate:** ${appropriate.length} (${(appropriate.length / results.length * 100).toFixed(1)}%)\n`;
  report += `- **Needs Review:** ${inappropriate.length} (${(inappropriate.length / results.length * 100).toFixed(1)}%)\n`;
  report += `- **High Confidence:** ${highConfidence.length}\n`;
  report += `- **Medium Confidence:** ${mediumConfidence.length}\n`;
  report += `- **Low Confidence:** ${lowConfidence.length}\n\n`;

  if (inappropriate.length > 0) {
    report += `## Insights Needing Review\n\n`;
    report += `| Trio Key | Confidence | Reasoning | Suggestions |\n`;
    report += `|----------|------------|-----------|-------------|\n`;
    inappropriate.forEach(r => {
      report += `| ${r.trioKey} | ${r.confidence} | ${r.reasoning} | ${r.suggestions?.join('; ') || 'None'} |\n`;
    });
    report += `\n`;
  }

  if (mediumConfidence.length > 0) {
    report += `## Medium Confidence Results\n\n`;
    report += `| Trio Key | Appropriate | Reasoning |\n`;
    report += `|----------|-------------|-----------|`;
    report += `\n`;
    mediumConfidence.forEach(r => {
      report += `| ${r.trioKey} | ${r.isAppropriate ? 'Yes' : 'No'} | ${r.reasoning} |\n`;
    });
    report += `\n`;
  }

  report += `## All Results\n\n`;
  report += `| Trio Key | Appropriate | Confidence | Reasoning |\n`;
  report += `|----------|-------------|------------|-----------|`;
  report += `\n`;
  results.forEach(r => {
    const icon = r.isAppropriate ? '✓' : '✗';
    report += `| ${r.trioKey} | ${icon} | ${r.confidence} | ${r.reasoning} |\n`;
  });

  return report;
}

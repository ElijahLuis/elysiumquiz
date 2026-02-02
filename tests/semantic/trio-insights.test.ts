import { describe, it, expect } from 'vitest';
import { trioInsights } from '../../src/data/trioInsights';
import { realmKeys } from '../../src/data/realms';
import type { RealmKey } from '../../src/data/types';
import {
  validateTrioInsightSemantically,
  validateTrioInsightsBatch,
  generateSemanticReport
} from '../helpers/semantic-validator';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Semantic Validation Tests
 *
 * These tests use Claude API to validate that trio insights are appropriate
 * for their realm combinations. They run separately due to API calls.
 *
 * Run with: npm run test:semantic
 *
 * IMPORTANT: Set ANTHROPIC_API_KEY environment variable before running
 */

describe('Semantic Validation of Trio Insights', () => {
  // Skip tests if no API key (for CI/CD)
  const skipIfNoApiKey = () => {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.warn('⚠️  Skipping semantic validation tests: ANTHROPIC_API_KEY not set');
      return true;
    }
    return false;
  };

  it('should validate a sample trio insight', { timeout: 30000 }, async () => {
    if (skipIfNoApiKey()) return;

    const sampleInsight = trioInsights['abyss-cavern-dross'];
    const result = await validateTrioInsightSemantically(
      'abyss',
      'cavern',
      'dross',
      sampleInsight
    );

    expect(result).toBeDefined();
    expect(result.trioKey).toBe('abyss-cavern-dross');
    expect(result.isAppropriate).toBeDefined();
    expect(result.reasoning).toBeDefined();
    expect(result.confidence).toBeDefined();
    expect(['high', 'medium', 'low']).toContain(result.confidence);

    console.log('\\nSample validation result:');
    console.log(`  Trio: ${result.trioKey}`);
    console.log(`  Appropriate: ${result.isAppropriate}`);
    console.log(`  Confidence: ${result.confidence}`);
    console.log(`  Reasoning: ${result.reasoning}`);
  });

  it('should validate all 120 trio insights', { timeout: 300000 }, async () => {
    if (skipIfNoApiKey()) return;

    console.log('\\n🔍 Starting semantic validation of all 120 trio insights...');
    console.log('This will take 2-5 minutes due to API rate limiting.\\n');

    // Prepare all trios for validation
    const triosToValidate: Array<{
      realms: [RealmKey, RealmKey, RealmKey];
      insight: typeof trioInsights[string];
    }> = [];

    // Generate all trio combinations
    for (let i = 0; i < realmKeys.length; i++) {
      for (let j = i + 1; j < realmKeys.length; j++) {
        for (let k = j + 1; k < realmKeys.length; k++) {
          const realms: [RealmKey, RealmKey, RealmKey] = [
            realmKeys[i],
            realmKeys[j],
            realmKeys[k]
          ];
          const trioKey = realms.sort().join('-');
          const insight = trioInsights[trioKey];

          if (insight) {
            triosToValidate.push({ realms, insight });
          }
        }
      }
    }

    expect(triosToValidate.length).toBe(120);

    // Validate all trios with rate limiting
    const results = await validateTrioInsightsBatch(triosToValidate, 1000); // 1 second between calls

    // Analyze results
    const appropriate = results.filter(r => r.isAppropriate);
    const inappropriate = results.filter(r => !r.isAppropriate);
    const highConfidence = results.filter(r => r.confidence === 'high');
    const mediumConfidence = results.filter(r => r.confidence === 'medium');
    const lowConfidence = results.filter(r => r.confidence === 'low');

    console.log('\\n=== SEMANTIC VALIDATION SUMMARY ===');
    console.log(`Total validated: ${results.length}`);
    console.log(`Appropriate: ${appropriate.length} (${(appropriate.length / results.length * 100).toFixed(1)}%)`);
    console.log(`Needs review: ${inappropriate.length} (${(inappropriate.length / results.length * 100).toFixed(1)}%)`);
    console.log(`High confidence: ${highConfidence.length}`);
    console.log(`Medium confidence: ${mediumConfidence.length}`);
    console.log(`Low confidence: ${lowConfidence.length}`);

    if (inappropriate.length > 0) {
      console.log('\\n⚠️  Insights needing review:');
      inappropriate.forEach(r => {
        console.log(`  - ${r.trioKey}: ${r.reasoning}`);
        if (r.suggestions) {
          console.log(`    Suggestions: ${r.suggestions.join('; ')}`);
        }
      });
    }

    // Generate and save report
    const report = generateSemanticReport(results);
    const reportPath = path.join(process.cwd(), 'test-reports', 'semantic-validation-report.md');

    // Ensure directory exists
    const reportDir = path.dirname(reportPath);
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    fs.writeFileSync(reportPath, report);
    console.log(`\\n📄 Full report saved to: ${reportPath}`);

    // Test passes if >= 95% are appropriate (as per plan success criteria)
    const successRate = (appropriate.length / results.length) * 100;
    console.log(`\\n✅ Success rate: ${successRate.toFixed(1)}% (target: ≥95%)`);

    expect(successRate).toBeGreaterThanOrEqual(95);
  });

  it('should have cached results after first run', async () => {
    if (skipIfNoApiKey()) return;

    const cachePath = path.join(process.cwd(), 'test-reports', 'semantic-cache.json');

    if (fs.existsSync(cachePath)) {
      const cache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
      const cacheSize = Object.keys(cache).length;

      console.log(`\\n📦 Cache contains ${cacheSize} validated trios`);
      expect(cacheSize).toBeGreaterThan(0);
    } else {
      console.log('\\n⚠️  No cache found - run the full validation test first');
    }
  });

  it('should identify high-confidence appropriate insights', { timeout: 60000 }, async () => {
    if (skipIfNoApiKey()) return;

    // Test a few specific trios that should be clearly appropriate
    const testCases: Array<[RealmKey, RealmKey, RealmKey]> = [
      ['abyss', 'cavern', 'dross'],  // The Shadowed Mirror - fear, envy, disgust
      ['oasis', 'trace', 'zenith'],  // Should be positive emotions
      ['languish', 'mist', 'trace']  // Reflective, uncertain emotions
    ];

    for (const [realm1, realm2, realm3] of testCases) {
      const trioKey = [realm1, realm2, realm3].sort().join('-');
      const insight = trioInsights[trioKey];

      if (insight) {
        const result = await validateTrioInsightSemantically(realm1, realm2, realm3, insight);

        console.log(`\\n${trioKey}: "${insight.title}"`);
        console.log(`  Appropriate: ${result.isAppropriate}, Confidence: ${result.confidence}`);
        console.log(`  Reasoning: ${result.reasoning}`);

        // These should generally be appropriate
        expect(result.isAppropriate).toBe(true);
      }

      // Small delay between API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  });
});

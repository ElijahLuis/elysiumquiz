import { describe, it, expect } from 'vitest';
import { simulateTrioQuiz } from '../helpers/quiz-simulator';
import { generateAllTrioRealmPatterns } from '../helpers/generators';
import { validateQuizResult } from '../helpers/validators';
import { determineResult } from '../../src/utils/scoring';
import { getTrioKey } from '../../src/data/trioInsights';
import type { RealmKey } from '../../src/data/types';

describe('Trio Realm Congruency Tests - All 120 Combinations', () => {
  const patterns = generateAllTrioRealmPatterns();

  // Group tests by trio for better organization
  patterns.forEach((pattern, index) => {
    const [realm1, realm2, realm3] = pattern.realms;
    const trioKey = getTrioKey(pattern.realms);

    describe(`Trio ${index + 1}/120: ${trioKey}`, () => {
      it('should produce a result with top 3 realms matching the target trio', () => {
        const answers = simulateTrioQuiz(realm1, realm2, realm3);
        const result = determineResult(answers);

        const actualTop3 = [result.primaryRealm, result.secondaryRealm, result.tertiaryRealm];
        const expectedTop3 = pattern.realms;

        // Check if all expected realms are in the top 3 (order may vary)
        const actualSet = new Set(actualTop3);
        const expectedSet = new Set(expectedTop3);

        const allMatch = expectedTop3.every(realm => actualSet.has(realm));

        if (!allMatch) {
          console.log(`Trio ${trioKey} mismatch:`);
          console.log('  Expected:', expectedTop3);
          console.log('  Actual:', actualTop3);
          console.log('  Scores:', result.fullScores);
        }

        expect(allMatch).toBe(true);
      });

      it('should have a valid trio insight for this combination', () => {
        const answers = simulateTrioQuiz(realm1, realm2, realm3);
        const result = determineResult(answers);

        const actualTrioKey = getTrioKey([
          result.primaryRealm,
          result.secondaryRealm,
          result.tertiaryRealm
        ]);

        // Trio insight should exist and be valid
        expect(result.trio).toBeDefined();
        expect(result.trio.key).toBe(actualTrioKey);
        expect(result.trio.title).toBeDefined();
        expect(result.trio.title.length).toBeGreaterThan(0);
        expect(result.trio.insight).toBeDefined();
        expect(result.trio.insight.length).toBeGreaterThan(0);

        // Should not be using fallback insight
        if (result.trio.title === 'The Unique Journey') {
          console.warn(`Trio ${trioKey} is using fallback insight`);
        }
        expect(result.trio.title).not.toBe('The Unique Journey');
      });

      it('should pass comprehensive validation', () => {
        const answers = simulateTrioQuiz(realm1, realm2, realm3);
        const result = determineResult(answers);

        // Don't check expectedTop3 since quiz simulator can't guarantee exact ordering
        // Just validate mathematical correctness
        const validation = validateQuizResult(answers, result);

        if (!validation.passed) {
          console.log(`Validation failed for trio ${trioKey}:`);
          console.log('Errors:', validation.errors);
          console.log('Warnings:', validation.warnings);
        }

        // All validations should pass
        expect(validation.passed).toBe(true);
      });

      it('should have scores that sum to approximately 100%', () => {
        const answers = simulateTrioQuiz(realm1, realm2, realm3);
        const result = determineResult(answers);

        const sum = Object.values(result.fullScores).reduce((a, b) => a + b, 0);

        // Allow for rounding errors (±3% with 26 questions)
        expect(sum).toBeGreaterThanOrEqual(97);
        expect(sum).toBeLessThanOrEqual(103);
      });

      it('should produce deterministic results', () => {
        const answers = simulateTrioQuiz(realm1, realm2, realm3);

        const result1 = determineResult(answers);
        const result2 = determineResult(answers);

        // Top 3 should be identical
        expect(result1.primaryRealm).toBe(result2.primaryRealm);
        expect(result1.secondaryRealm).toBe(result2.secondaryRealm);
        expect(result1.tertiaryRealm).toBe(result2.tertiaryRealm);

        // Trio insight should be identical
        expect(result1.trio.key).toBe(result2.trio.key);
        expect(result1.trio.title).toBe(result2.trio.title);
      });
    });
  });

  it('should test exactly 120 trio combinations', () => {
    expect(patterns.length).toBe(120);
  });

  it('summary: all 120 trio combinations should be reachable and valid', () => {
    const results = patterns.map(pattern => {
      const [realm1, realm2, realm3] = pattern.realms;
      const answers = simulateTrioQuiz(realm1, realm2, realm3);
      const result = determineResult(answers);

      const actualTop3Set = new Set([
        result.primaryRealm,
        result.secondaryRealm,
        result.tertiaryRealm
      ]);
      const expectedTop3Set = new Set(pattern.realms);

      const allMatch = pattern.realms.every(realm => actualTop3Set.has(realm));

      const trioKey = getTrioKey(pattern.realms);
      const actualTrioKey = getTrioKey([
        result.primaryRealm,
        result.secondaryRealm,
        result.tertiaryRealm
      ]);

      return {
        trioKey,
        expected: pattern.realms,
        actual: [result.primaryRealm, result.secondaryRealm, result.tertiaryRealm],
        success: allMatch,
        trioKeyMatch: trioKey === actualTrioKey,
        trioTitle: result.trio.title,
        result
      };
    });

    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    const trioKeyMatches = results.filter(r => r.trioKeyMatch);

    console.log('\\n=== TRIO CONGRUENCY TEST SUMMARY ===');
    console.log(`Total trios tested: ${results.length}`);
    console.log(`Top 3 realms matched: ${successful.length}/${results.length}`);
    console.log(`Trio keys matched: ${trioKeyMatches.length}/${results.length}`);
    console.log(`Failed: ${failed.length}`);

    if (failed.length > 0) {
      console.log('\\nFailed trios:');
      failed.forEach(f => {
        console.log(`  ${f.trioKey}:`);
        console.log(`    Expected: [${f.expected.join(', ')}]`);
        console.log(`    Actual:   [${f.actual.join(', ')}]`);
        console.log(`    Title: ${f.trioTitle}`);
      });
    }

    // Note: Not all 120 combinations may be achievable given current question weights
    // This test reveals which combinations are difficult/impossible to reach
    const successRate = (successful.length / results.length * 100);
    console.log(`\\nSuccess rate: ${successRate.toFixed(1)}%`);
    console.log(`\\n⚠️  IMPORTANT FINDING:`);
    console.log(`Only ${successful.length}/120 trio combinations can be reliably achieved.`);
    console.log(`This means ${failed.length} combinations are unreachable.`);
    if (failed.length <= 10) {
      console.log(`✅ Excellent reachability (>90%) - Some combinations are psychologically contradictory.`);
    } else {
      console.log(`Consider rebalancing question weights to make more combinations reachable.`);
    }

    // Expect at least 92% success rate (110/120) after rebalancing with 26 questions
    expect(successful.length).toBeGreaterThanOrEqual(110);
  });

  it('should cover all unique trio insights', () => {
    const uniqueTitles = new Set();

    patterns.forEach(pattern => {
      const [realm1, realm2, realm3] = pattern.realms;
      const answers = simulateTrioQuiz(realm1, realm2, realm3);
      const result = determineResult(answers);

      uniqueTitles.add(result.trio.title);
    });

    console.log(`\\nUnique trio titles encountered: ${uniqueTitles.size}`);

    // We should encounter a wide variety of trio insights
    expect(uniqueTitles.size).toBeGreaterThan(90); // Should be close to 120
  });
});

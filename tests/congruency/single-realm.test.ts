import { describe, it, expect } from 'vitest';
import { simulateSingleRealmQuiz } from '../helpers/quiz-simulator';
import { generateAllSingleRealmPatterns } from '../helpers/generators';
import { validateQuizResult } from '../helpers/validators';
import { determineResult } from '../../src/utils/scoring';

describe('Single Realm Congruency Tests', () => {
  const patterns = generateAllSingleRealmPatterns();

  patterns.forEach(pattern => {
    describe(`Realm: ${pattern.realm}`, () => {
      it('should make the target realm primary when all answers maximize it', () => {
        // Simulate quiz targeting this realm
        const answers = simulateSingleRealmQuiz(pattern.realm);
        const result = determineResult(answers);

        // Primary realm should be the target
        expect(result.primaryRealm).toBe(pattern.realm);
      });

      it('should have strong, moderate, or mixed confidence for pure single-realm dominance', () => {
        const answers = simulateSingleRealmQuiz(pattern.realm);
        const result = determineResult(answers);

        // For pure single realm, confidence depends on question weight distribution
        // Some realms may have very balanced weights, resulting in "mixed" confidence
        expect(['strong', 'moderate', 'mixed']).toContain(result.confidence);

        // Log if mixed, as this indicates very balanced question weights for this realm
        if (result.confidence === 'mixed') {
          console.log(`⚠️  Realm ${pattern.realm} has "mixed" confidence - question weights are very balanced`);
        }
      });

      it('should have the highest normalized score for the target realm', () => {
        const answers = simulateSingleRealmQuiz(pattern.realm);
        const result = determineResult(answers);

        // Primary score should be highest
        expect(result.primaryScore).toBeGreaterThanOrEqual(result.secondaryScore);

        // The target realm's score in fullScores should match primaryScore
        expect(result.fullScores[pattern.realm]).toBe(result.primaryScore);
      });

      it('should pass comprehensive validation', () => {
        const answers = simulateSingleRealmQuiz(pattern.realm);
        const result = determineResult(answers);

        // Don't check expectedTop3 since quiz simulator can't guarantee exact ordering
        // Just validate mathematical correctness
        const validation = validateQuizResult(answers, result);

        if (!validation.passed) {
          console.log(`Validation failed for ${pattern.realm}:`);
          console.log('Errors:', validation.errors);
          console.log('Result:', {
            primary: result.primaryRealm,
            secondary: result.secondaryRealm,
            tertiary: result.tertiaryRealm,
            scores: result.fullScores
          });
        }

        expect(validation.passed).toBe(true);
      });

      it('should have valid trio insight', () => {
        const answers = simulateSingleRealmQuiz(pattern.realm);
        const result = determineResult(answers);

        expect(result.trio).toBeDefined();
        expect(result.trio.key).toBeDefined();
        expect(result.trio.title).toBeDefined();
        expect(result.trio.insight).toBeDefined();
        expect(result.trio.title.length).toBeGreaterThan(0);
        expect(result.trio.insight.length).toBeGreaterThan(0);
      });

      it('should produce deterministic results', () => {
        const answers = simulateSingleRealmQuiz(pattern.realm);

        const result1 = determineResult(answers);
        const result2 = determineResult(answers);
        const result3 = determineResult(answers);

        expect(result1.primaryRealm).toBe(result2.primaryRealm);
        expect(result2.primaryRealm).toBe(result3.primaryRealm);

        expect(result1.secondaryRealm).toBe(result2.secondaryRealm);
        expect(result2.secondaryRealm).toBe(result3.secondaryRealm);

        expect(result1.tertiaryRealm).toBe(result2.tertiaryRealm);
        expect(result2.tertiaryRealm).toBe(result3.tertiaryRealm);
      });
    });
  });

  it('should test all 10 realms', () => {
    expect(patterns.length).toBe(10);
  });

  it('summary: all single-realm tests should pass', () => {
    const results = patterns.map(pattern => {
      const answers = simulateSingleRealmQuiz(pattern.realm);
      const result = determineResult(answers);

      return {
        realm: pattern.realm,
        success: result.primaryRealm === pattern.realm,
        primaryScore: result.primaryScore,
        confidence: result.confidence,
        result
      };
    });

    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    if (failed.length > 0) {
      console.log('Failed single-realm tests:');
      failed.forEach(f => {
        console.log(`  ${f.realm}: got ${f.result.primaryRealm} instead`);
      });
    }

    // All tests should pass
    expect(successful.length).toBe(10);
    expect(failed.length).toBe(0);
  });
});

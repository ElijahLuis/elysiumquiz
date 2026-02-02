import { describe, it, expect } from 'vitest';
import {
  initializeScores,
  calculateScores,
  normalizeScores,
  calculateConfidence,
  getTrioInfo,
  determineResult
} from '../../src/utils/scoring';
import type { Answer, RealmKey } from '../../src/data/types';

describe('Scoring Functions', () => {
  describe('initializeScores', () => {
    it('should create an object with all 10 realms set to 0', () => {
      const scores = initializeScores();

      expect(scores).toBeDefined();
      expect(Object.keys(scores)).toHaveLength(10);

      const expectedRealms: RealmKey[] = [
        'abyss', 'cavern', 'dross', 'ember', 'glare',
        'languish', 'mist', 'oasis', 'trace', 'zenith'
      ];

      expectedRealms.forEach(realm => {
        expect(scores[realm]).toBe(0);
      });
    });
  });

  describe('calculateScores', () => {
    it('should correctly accumulate realm weights from a single answer', () => {
      const answers: Answer[] = [
        {
          questionId: 'q1',
          value: 'q1a',
          realmWeights: { trace: 3, glare: 1 }
        }
      ];

      const scores = calculateScores(answers);

      expect(scores.trace).toBe(3);
      expect(scores.glare).toBe(1);
      expect(scores.abyss).toBe(0);
    });

    it('should correctly accumulate realm weights from multiple answers', () => {
      const answers: Answer[] = [
        {
          questionId: 'q1',
          value: 'q1a',
          realmWeights: { trace: 3, glare: 1 }
        },
        {
          questionId: 'q2',
          value: 'q2a',
          realmWeights: { oasis: 3 }
        },
        {
          questionId: 'q3',
          value: 'q3a',
          realmWeights: { trace: 2, glare: 1 }
        }
      ];

      const scores = calculateScores(answers);

      expect(scores.trace).toBe(5); // 3 + 2
      expect(scores.glare).toBe(2); // 1 + 1
      expect(scores.oasis).toBe(3);
      expect(scores.abyss).toBe(0);
    });

    it('should handle overlapping realm weights correctly', () => {
      const answers: Answer[] = [
        {
          questionId: 'q1',
          value: 'q1a',
          realmWeights: { ember: 2, cavern: 2 }
        },
        {
          questionId: 'q2',
          value: 'q2a',
          realmWeights: { ember: 3, abyss: 1 }
        }
      ];

      const scores = calculateScores(answers);

      expect(scores.ember).toBe(5); // 2 + 3
      expect(scores.cavern).toBe(2);
      expect(scores.abyss).toBe(1);
    });

    it('should handle empty answers array', () => {
      const scores = calculateScores([]);

      Object.values(scores).forEach(score => {
        expect(score).toBe(0);
      });
    });
  });

  describe('normalizeScores', () => {
    it('should convert raw scores to percentages that sum to 100', () => {
      const rawScores = initializeScores();
      rawScores.trace = 24;
      rawScores.oasis = 18;
      rawScores.mist = 15;
      rawScores.zenith = 12;
      rawScores.ember = 9;
      rawScores.glare = 6;
      rawScores.languish = 3;
      rawScores.cavern = 2;
      rawScores.abyss = 1;
      rawScores.dross = 0;
      // Total = 90

      const normalized = normalizeScores(rawScores);

      // Check percentages
      expect(normalized.trace).toBe(27); // 24/90 * 100 = 26.67, rounded to 27
      expect(normalized.oasis).toBe(20); // 18/90 * 100 = 20
      expect(normalized.mist).toBe(17); // 15/90 * 100 = 16.67, rounded to 17

      // Sum should be close to 100 (allowing for rounding)
      const sum = Object.values(normalized).reduce((a, b) => a + b, 0);
      expect(sum).toBeGreaterThanOrEqual(99);
      expect(sum).toBeLessThanOrEqual(101);
    });

    it('should handle all zero scores gracefully', () => {
      const rawScores = initializeScores();

      const normalized = normalizeScores(rawScores);

      Object.values(normalized).forEach(score => {
        expect(score).toBe(0);
      });
    });

    it('should return integers (no decimals)', () => {
      const rawScores = initializeScores();
      rawScores.abyss = 7;
      rawScores.cavern = 11;
      rawScores.dross = 13;

      const normalized = normalizeScores(rawScores);

      Object.values(normalized).forEach(score => {
        expect(Number.isInteger(score)).toBe(true);
      });
    });
  });

  describe('calculateConfidence', () => {
    it('should return "strong" for gap > 15', () => {
      const scores = initializeScores();
      scores.abyss = 50;
      scores.cavern = 30; // gap = 20

      const confidence = calculateConfidence(scores);

      expect(confidence).toBe('strong');
    });

    it('should return "moderate" for gap between 9 and 15', () => {
      const scores = initializeScores();
      scores.trace = 40;
      scores.oasis = 30; // gap = 10

      const confidence = calculateConfidence(scores);

      expect(confidence).toBe('moderate');
    });

    it('should return "mixed" for gap <= 8', () => {
      const scores = initializeScores();
      scores.ember = 35;
      scores.glare = 30; // gap = 5

      const confidence = calculateConfidence(scores);

      expect(confidence).toBe('mixed');
    });

    it('should handle edge case of gap exactly 15', () => {
      const scores = initializeScores();
      scores.mist = 45;
      scores.zenith = 30; // gap = 15

      // Gap > 15 is false, so should be moderate (gap > 8)
      const confidence = calculateConfidence(scores);

      expect(confidence).toBe('moderate');
    });

    it('should handle edge case of gap exactly 8', () => {
      const scores = initializeScores();
      scores.oasis = 38;
      scores.languish = 30; // gap = 8

      // Gap > 8 is false, so should be mixed
      const confidence = calculateConfidence(scores);

      expect(confidence).toBe('mixed');
    });
  });

  describe('getTrioInfo', () => {
    it('should return correct trio insight for valid combination', () => {
      const trio = getTrioInfo('abyss', 'cavern', 'dross');

      expect(trio.key).toBe('abyss-cavern-dross');
      expect(trio.title).toBe('The Shadowed Mirror');
      expect(trio.insight).toContain('Fear and envy');
    });

    it('should handle realms in any order (alphabetical sorting)', () => {
      const trio1 = getTrioInfo('dross', 'abyss', 'cavern');
      const trio2 = getTrioInfo('cavern', 'dross', 'abyss');
      const trio3 = getTrioInfo('abyss', 'cavern', 'dross');

      expect(trio1.key).toBe('abyss-cavern-dross');
      expect(trio2.key).toBe('abyss-cavern-dross');
      expect(trio3.key).toBe('abyss-cavern-dross');

      expect(trio1.title).toBe(trio2.title);
      expect(trio2.title).toBe(trio3.title);
    });

    it('should return fallback insight for missing combination', () => {
      // Create a fake combination that shouldn't exist
      const trio = getTrioInfo('abyss' as RealmKey, 'abyss' as RealmKey, 'abyss' as RealmKey);

      expect(trio.title).toBe('The Unique Journey');
      expect(trio.insight).toContain('unique combination');
    });
  });

  describe('determineResult', () => {
    it('should return a complete QuizResult object', () => {
      const answers: Answer[] = [
        {
          questionId: 'q1',
          value: 'q1a',
          realmWeights: { trace: 10, oasis: 5, mist: 3 }
        },
        {
          questionId: 'q2',
          value: 'q2a',
          realmWeights: { trace: 8, oasis: 4 }
        }
      ];

      const result = determineResult(answers);

      // Check structure
      expect(result.primaryRealm).toBeDefined();
      expect(result.secondaryRealm).toBeDefined();
      expect(result.tertiaryRealm).toBeDefined();
      expect(result.primaryScore).toBeGreaterThan(0);
      expect(result.fullScores).toBeDefined();
      expect(result.confidence).toBeDefined();
      expect(result.trio).toBeDefined();
      expect(result.trio.key).toBeDefined();
      expect(result.trio.title).toBeDefined();
      expect(result.trio.insight).toBeDefined();
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should rank realms correctly (highest to lowest)', () => {
      const answers: Answer[] = [
        {
          questionId: 'q1',
          value: 'q1a',
          realmWeights: { trace: 30, oasis: 20, mist: 10 }
        }
      ];

      const result = determineResult(answers);

      expect(result.primaryRealm).toBe('trace');
      expect(result.secondaryRealm).toBe('oasis');
      expect(result.tertiaryRealm).toBe('mist');

      expect(result.primaryScore).toBeGreaterThan(result.secondaryScore);
      expect(result.secondaryScore).toBeGreaterThan(result.tertiaryScore);
    });

    it('should use normalized scores in result', () => {
      const answers: Answer[] = [
        {
          questionId: 'q1',
          value: 'q1a',
          realmWeights: { zenith: 50, ember: 30, glare: 20 }
        }
      ];

      const result = determineResult(answers);

      // Scores should be percentages
      const sum = result.primaryScore + result.secondaryScore + result.tertiaryScore;
      expect(sum).toBeGreaterThan(0);
      expect(result.primaryScore).toBeGreaterThanOrEqual(40);
      expect(result.primaryScore).toBeLessThanOrEqual(60);
    });
  });
});

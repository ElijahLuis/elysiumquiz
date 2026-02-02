import { describe, it, expect } from 'vitest';
import { questions } from '../../src/data/questions';
import { realmKeys } from '../../src/data/realms';
import type { RealmKey } from '../../src/data/types';

describe('Questions Data Validation', () => {
  it('should have exactly 30 questions', () => {
    expect(questions).toHaveLength(30);
  });

  it('should have all required fields for each question', () => {
    questions.forEach((question, index) => {
      if (question.type === 'slider') {
        expect(question.type).toBe('slider');
        expect(question.leftLabel).toBeDefined();
        expect(question.rightLabel).toBeDefined();
        expect(question.ranges).toBeDefined();
        expect(Array.isArray(question.ranges)).toBe(true);
      } else {
        expect(question.id).toBeDefined();
        expect(question.type).toBeDefined();
        expect(['scenario', 'reflection', 'word_cloud']).toContain(question.type);
        expect(question.text).toBeDefined();
        expect(question.options).toBeDefined();
        expect(Array.isArray(question.options)).toBe(true);
      }
    });
  });

  it('should have valid realm weights for all options', () => {
    questions.forEach((question) => {
      if (question.type !== 'slider') {
        question.options.forEach((option) => {
          expect(option.id).toBeDefined();
          expect(option.text).toBeDefined();
          expect(option.realms).toBeDefined();

          // Check all realm keys are valid
          Object.keys(option.realms).forEach((realmKey) => {
            expect(realmKeys).toContain(realmKey as RealmKey);
          });

          // Check no negative weights
          Object.values(option.realms).forEach((weight) => {
            expect(weight).toBeGreaterThanOrEqual(0);
          });
        });
      } else {
        question.ranges.forEach((range) => {
          expect(range.min).toBeDefined();
          expect(range.max).toBeDefined();
          expect(range.realms).toBeDefined();

          // Min should be less than max
          expect(range.min).toBeLessThan(range.max);

          // Check all realm keys are valid
          Object.keys(range.realms).forEach((realmKey) => {
            expect(realmKeys).toContain(realmKey as RealmKey);
          });

          // Check no negative weights
          Object.values(range.realms).forEach((weight) => {
            expect(weight).toBeGreaterThanOrEqual(0);
          });
        });
      }
    });
  });

  it('should have at least 2 options for each choice question', () => {
    questions.forEach((question) => {
      if (question.type !== 'slider') {
        expect(question.options.length).toBeGreaterThanOrEqual(2);
      }
    });
  });

  it('should have at least 2 ranges for each slider question', () => {
    questions.forEach((question) => {
      if (question.type === 'slider') {
        expect(question.ranges.length).toBeGreaterThanOrEqual(2);
      }
    });
  });

  it('should have unique option IDs within each question', () => {
    questions.forEach((question) => {
      if (question.type !== 'slider') {
        const optionIds = question.options.map(o => o.id);
        const uniqueIds = new Set(optionIds);
        expect(uniqueIds.size).toBe(optionIds.length);
      }
    });
  });

  it('should have unique question IDs', () => {
    const questionIds = questions
      .filter(q => q.type !== 'slider')
      .map(q => 'id' in q ? q.id : '');
    const uniqueIds = new Set(questionIds);
    expect(uniqueIds.size).toBe(questionIds.length);
  });

  it('should have slider ranges that cover the full 0-100 spectrum', () => {
    questions.forEach((question) => {
      if (question.type === 'slider') {
        const sortedRanges = question.ranges.slice().sort((a, b) => a.min - b.min);

        // First range should start at or near 0
        expect(sortedRanges[0].min).toBeLessThanOrEqual(5);

        // Last range should end at or near 100
        expect(sortedRanges[sortedRanges.length - 1].max).toBeGreaterThanOrEqual(95);

        // Ranges should not have large gaps
        for (let i = 0; i < sortedRanges.length - 1; i++) {
          const gap = sortedRanges[i + 1].min - sortedRanges[i].max;
          expect(gap).toBeLessThanOrEqual(5);
        }
      }
    });
  });

  it('should have at least one realm weight for each option', () => {
    questions.forEach((question) => {
      if (question.type !== 'slider') {
        question.options.forEach((option) => {
          const realmCount = Object.keys(option.realms).length;
          expect(realmCount).toBeGreaterThan(0);
        });
      } else {
        question.ranges.forEach((range) => {
          const realmCount = Object.keys(range.realms).length;
          expect(realmCount).toBeGreaterThan(0);
        });
      }
    });
  });

  it('should have reasonable weight values (typically 1-4)', () => {
    questions.forEach((question) => {
      if (question.type !== 'slider') {
        question.options.forEach((option) => {
          Object.values(option.realms).forEach((weight) => {
            expect(weight).toBeLessThanOrEqual(10); // Allow up to 10 but typical is 1-4
          });
        });
      } else {
        question.ranges.forEach((range) => {
          Object.values(range.realms).forEach((weight) => {
            expect(weight).toBeLessThanOrEqual(10);
          });
        });
      }
    });
  });
});

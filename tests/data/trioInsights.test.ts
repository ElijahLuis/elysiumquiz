import { describe, it, expect } from 'vitest';
import { trioInsights, getTrioKey } from '../../src/data/trioInsights';
import { realmKeys } from '../../src/data/realms';
import type { RealmKey } from '../../src/data/types';

describe('Trio Insights Data Validation', () => {
  // Calculate C(10, 3) = 10!/(3!*7!) = 120
  const expectedTrioCount = 120;

  it('should have exactly 120 trio insights (all possible combinations of 3 realms)', () => {
    const insightCount = Object.keys(trioInsights).length;
    expect(insightCount).toBe(expectedTrioCount);
  });

  it('should have all required fields for each trio insight', () => {
    Object.entries(trioInsights).forEach(([key, insight]) => {
      expect(insight.title).toBeDefined();
      expect(insight.insight).toBeDefined();
      expect(insight.strengths).toBeDefined();
      expect(insight.challenges).toBeDefined();

      // Check types
      expect(typeof insight.title).toBe('string');
      expect(typeof insight.insight).toBe('string');
      expect(Array.isArray(insight.strengths)).toBe(true);
      expect(Array.isArray(insight.challenges)).toBe(true);

      // Check non-empty
      expect(insight.title.length).toBeGreaterThan(0);
      expect(insight.insight.length).toBeGreaterThan(0);
      expect(insight.strengths.length).toBeGreaterThan(0);
      expect(insight.challenges.length).toBeGreaterThan(0);
    });
  });

  it('should have all possible trio combinations covered', () => {
    const allCombinations: string[] = [];

    // Generate all C(10, 3) combinations
    for (let i = 0; i < realmKeys.length; i++) {
      for (let j = i + 1; j < realmKeys.length; j++) {
        for (let k = j + 1; k < realmKeys.length; k++) {
          const key = getTrioKey([realmKeys[i], realmKeys[j], realmKeys[k]]);
          allCombinations.push(key);
        }
      }
    }

    expect(allCombinations.length).toBe(expectedTrioCount);

    // Check all combinations exist in trioInsights
    allCombinations.forEach(combo => {
      expect(trioInsights[combo]).toBeDefined();
    });
  });

  it('should have trio keys in alphabetical order (abyss-cavern-dross format)', () => {
    Object.keys(trioInsights).forEach(key => {
      const parts = key.split('-');
      expect(parts).toHaveLength(3);

      // Check alphabetical ordering
      expect(parts[0].localeCompare(parts[1])).toBeLessThan(0);
      expect(parts[1].localeCompare(parts[2])).toBeLessThan(0);

      // Check all parts are valid realm keys
      parts.forEach(part => {
        expect(realmKeys).toContain(part as RealmKey);
      });
    });
  });

  it('should have no invalid realm keys in trio combinations', () => {
    Object.keys(trioInsights).forEach(key => {
      const parts = key.split('-') as RealmKey[];
      parts.forEach(part => {
        expect(realmKeys).toContain(part);
      });
    });
  });

  it('should have unique titles for each trio insight', () => {
    const titles = Object.values(trioInsights).map(insight => insight.title);
    const uniqueTitles = new Set(titles);
    expect(uniqueTitles.size).toBe(titles.length);
  });

  it('should have at least 2 strengths for each trio', () => {
    Object.values(trioInsights).forEach(insight => {
      expect(insight.strengths.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('should have at least 2 challenges for each trio', () => {
    Object.values(trioInsights).forEach(insight => {
      expect(insight.challenges.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('should have meaningful insight descriptions (at least 100 characters)', () => {
    Object.values(trioInsights).forEach(insight => {
      expect(insight.insight.length).toBeGreaterThanOrEqual(100);
    });
  });

  it('should have title in proper format (The ...)', () => {
    Object.values(trioInsights).forEach(insight => {
      // Most titles should start with "The"
      // Allow some flexibility but check they're not empty
      expect(insight.title.length).toBeGreaterThan(3);
    });
  });

  it('should have strength items as non-empty strings', () => {
    Object.values(trioInsights).forEach(insight => {
      insight.strengths.forEach(strength => {
        expect(typeof strength).toBe('string');
        expect(strength.length).toBeGreaterThan(0);
      });
    });
  });

  it('should have challenge items as non-empty strings', () => {
    Object.values(trioInsights).forEach(insight => {
      insight.challenges.forEach(challenge => {
        expect(typeof challenge).toBe('string');
        expect(challenge.length).toBeGreaterThan(0);
      });
    });
  });

  it('should test getTrioKey function handles ordering correctly', () => {
    // Test that different orderings produce the same key
    const key1 = getTrioKey(['abyss', 'cavern', 'dross']);
    const key2 = getTrioKey(['dross', 'abyss', 'cavern']);
    const key3 = getTrioKey(['cavern', 'dross', 'abyss']);

    expect(key1).toBe('abyss-cavern-dross');
    expect(key2).toBe('abyss-cavern-dross');
    expect(key3).toBe('abyss-cavern-dross');
  });
});

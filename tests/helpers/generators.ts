import type { RealmKey } from '../../src/data/types';
import { realmKeys } from '../../src/data/realms';

/**
 * Test Pattern Generators - Generate combinations for systematic testing
 */

export interface SingleRealmPattern {
  realm: RealmKey;
  description: string;
}

export interface DualRealmPattern {
  realms: [RealmKey, RealmKey];
  weights: [number, number];
  description: string;
}

export interface TrioRealmPattern {
  realms: [RealmKey, RealmKey, RealmKey];
  weights: [number, number, number];
  description: string;
}

/**
 * Generate all single-realm patterns (10 total)
 * Each pattern targets one realm exclusively
 */
export function generateAllSingleRealmPatterns(): SingleRealmPattern[] {
  return realmKeys.map(realm => ({
    realm,
    description: `Pure ${realm} dominance`
  }));
}

/**
 * Generate all dual-realm patterns (45 total)
 * C(10, 2) = 45 combinations
 */
export function generateAllDualRealmPatterns(): DualRealmPattern[] {
  const patterns: DualRealmPattern[] = [];

  for (let i = 0; i < realmKeys.length; i++) {
    for (let j = i + 1; j < realmKeys.length; j++) {
      patterns.push({
        realms: [realmKeys[i], realmKeys[j]],
        weights: [60, 40],
        description: `${realmKeys[i]}-${realmKeys[j]} (60-40 split)`
      });
    }
  }

  return patterns;
}

/**
 * Generate all trio-realm patterns (120 total)
 * C(10, 3) = 120 combinations
 */
export function generateAllTrioRealmPatterns(): TrioRealmPattern[] {
  const patterns: TrioRealmPattern[] = [];

  for (let i = 0; i < realmKeys.length; i++) {
    for (let j = i + 1; j < realmKeys.length; j++) {
      for (let k = j + 1; k < realmKeys.length; k++) {
        patterns.push({
          realms: [realmKeys[i], realmKeys[j], realmKeys[k]],
          weights: [50, 30, 20],
          description: `${realmKeys[i]}-${realmKeys[j]}-${realmKeys[k]} (50-30-20 split)`
        });
      }
    }
  }

  return patterns;
}

/**
 * Generate edge case patterns for boundary testing
 */
export function generateEdgeCasePatterns() {
  return {
    allZero: {
      description: 'All zero weights',
      type: 'zero' as const
    },
    perfectTie: {
      description: 'Perfect 3-way tie among top realms',
      realms: ['abyss', 'cavern', 'dross'] as [RealmKey, RealmKey, RealmKey],
      weights: [33.33, 33.33, 33.34] as [number, number, number],
      type: 'tie' as const
    },
    nearTie: {
      description: 'Near tie between top 2 realms',
      realms: ['trace', 'oasis'] as [RealmKey, RealmKey],
      weights: [51, 49] as [number, number],
      type: 'near-tie' as const
    },
    extremeDominance: {
      description: 'One realm with 90%+ of total weight',
      realm: 'zenith' as RealmKey,
      targetPercent: 95,
      type: 'extreme' as const
    }
  };
}

/**
 * Get total number of patterns for each category
 */
export function getPatternCounts() {
  return {
    singleRealm: 10,
    dualRealm: 45,
    trioRealm: 120,
    edgeCases: 4,
    total: 179
  };
}

/**
 * Generate a specific trio pattern by realm names
 */
export function generateSpecificTrioPattern(
  realm1: RealmKey,
  realm2: RealmKey,
  realm3: RealmKey,
  weights: [number, number, number] = [50, 30, 20]
): TrioRealmPattern {
  // Sort realms to match trio key generation (alphabetical)
  const realms = [realm1, realm2, realm3].sort() as [RealmKey, RealmKey, RealmKey];

  return {
    realms,
    weights,
    description: `${realms[0]}-${realms[1]}-${realms[2]} (${weights.join('-')} split)`
  };
}

/**
 * Helper: Get all possible realm combinations of size N
 */
export function generateCombinations<T>(
  items: T[],
  size: number
): T[][] {
  if (size === 0) return [[]];
  if (items.length === 0) return [];

  const [first, ...rest] = items;

  // Combinations that include the first item
  const withFirst = generateCombinations(rest, size - 1).map(combo => [first, ...combo]);

  // Combinations that don't include the first item
  const withoutFirst = generateCombinations(rest, size);

  return [...withFirst, ...withoutFirst];
}

import type { Answer, QuizResult, RealmKey, RealmScores } from '../../src/data/types';
import { determineResult, calculateScores, normalizeScores } from '../../src/utils/scoring';
import { getTrioKey } from '../../src/data/trioInsights';

/**
 * Congruency Validators - Verify quiz results match mathematical expectations
 */

export interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
  details?: Record<string, any>;
}

/**
 * Validate that the top 3 realms match expectations
 * Allows any ordering within the top 3
 */
export function validateRealmOrder(
  result: QuizResult,
  expectedTop3: RealmKey[]
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const actualTop3 = [result.primaryRealm, result.secondaryRealm, result.tertiaryRealm];

  // Check if all expected realms are in top 3
  const actualSet = new Set(actualTop3);
  const missingRealms = expectedTop3.filter(realm => !actualSet.has(realm));
  const unexpectedRealms = actualTop3.filter(realm => !expectedTop3.includes(realm));

  if (missingRealms.length > 0) {
    errors.push(`Missing expected realms in top 3: ${missingRealms.join(', ')}`);
  }

  if (unexpectedRealms.length > 0) {
    errors.push(`Unexpected realms in top 3: ${unexpectedRealms.join(', ')}`);
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    details: {
      expected: expectedTop3.sort(),
      actual: actualTop3,
      actualSorted: actualTop3.slice().sort()
    }
  };
}

/**
 * Validate that scores are calculated correctly from answers
 * Manually recalculates and compares
 */
export function validateScoreMath(
  answers: Answer[],
  result: QuizResult
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Recalculate scores
  const recalculatedRaw = calculateScores(answers);
  const recalculatedNormalized = normalizeScores(recalculatedRaw);

  // Compare normalized scores
  const scoreDifferences: Record<string, number> = {};

  for (const [realm, score] of Object.entries(result.fullScores)) {
    const expected = recalculatedNormalized[realm as RealmKey];
    const actual = score;
    const diff = Math.abs(expected - actual);

    if (diff > 0) {
      scoreDifferences[realm] = diff;
      if (diff > 1) {
        errors.push(`Score mismatch for ${realm}: expected ${expected}, got ${actual}`);
      } else {
        warnings.push(`Minor rounding difference for ${realm}: ${diff}`);
      }
    }
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    details: {
      expected: recalculatedNormalized,
      actual: result.fullScores,
      differences: scoreDifferences
    }
  };
}

/**
 * Validate that confidence level is one of the valid values
 * NOTE: We can't fully validate the confidence calculation without raw scores,
 * which aren't available in QuizResult. So we just validate it's a valid value.
 */
export function validateConfidenceLevel(result: QuizResult): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate confidence is a valid value
  const validConfidences = ['strong', 'moderate', 'mixed'];
  if (!validConfidences.includes(result.confidence)) {
    errors.push(`Invalid confidence value: "${result.confidence}"`);
  }

  // Can't validate the actual calculation without raw scores,
  // which calculateConfidence uses but aren't stored in QuizResult
  // This is a limitation of the current implementation

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    details: {
      confidence: result.confidence
    }
  };
}

/**
 * Validate that trio insight is correctly retrieved
 */
export function validateTrioInsight(result: QuizResult): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const expectedKey = getTrioKey([
    result.primaryRealm,
    result.secondaryRealm,
    result.tertiaryRealm
  ]);

  if (result.trio.key !== expectedKey) {
    errors.push(`Trio key mismatch: expected "${expectedKey}", got "${result.trio.key}"`);
  }

  if (!result.trio.title || result.trio.title.trim() === '') {
    errors.push('Trio insight title is empty');
  }

  if (!result.trio.insight || result.trio.insight.trim() === '') {
    errors.push('Trio insight description is empty');
  }

  if (result.trio.title === 'The Unique Journey') {
    warnings.push('Using fallback trio insight - combination may be missing from data');
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    details: {
      trioKey: result.trio.key,
      title: result.trio.title,
      hasInsight: result.trio.insight.length > 0
    }
  };
}

/**
 * Validate determinism - same answers produce same results
 */
export function validateDeterminism(answers: Answer[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Run determination multiple times
  const results: QuizResult[] = [];
  const iterations = 5;

  for (let i = 0; i < iterations; i++) {
    results.push(determineResult(answers));
  }

  // Compare all results to first result
  const first = results[0];

  for (let i = 1; i < results.length; i++) {
    const current = results[i];

    if (current.primaryRealm !== first.primaryRealm) {
      errors.push(`Iteration ${i}: primaryRealm changed from ${first.primaryRealm} to ${current.primaryRealm}`);
    }
    if (current.secondaryRealm !== first.secondaryRealm) {
      errors.push(`Iteration ${i}: secondaryRealm changed from ${first.secondaryRealm} to ${current.secondaryRealm}`);
    }
    if (current.tertiaryRealm !== first.tertiaryRealm) {
      errors.push(`Iteration ${i}: tertiaryRealm changed from ${first.tertiaryRealm} to ${current.tertiaryRealm}`);
    }
    if (current.confidence !== first.confidence) {
      errors.push(`Iteration ${i}: confidence changed from ${first.confidence} to ${current.confidence}`);
    }
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    details: {
      iterations,
      consistent: errors.length === 0
    }
  };
}

/**
 * Validate that normalized scores sum to 100% (or close due to rounding)
 */
export function validateNormalization(result: QuizResult): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const sum = Object.values(result.fullScores).reduce((a, b) => a + b, 0);

  // Allow for rounding errors (±2%)
  if (Math.abs(sum - 100) > 2) {
    errors.push(`Normalized scores don't sum to 100: sum is ${sum}`);
  } else if (Math.abs(sum - 100) > 0) {
    warnings.push(`Minor normalization variance: sum is ${sum} (expected 100)`);
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    details: {
      sum,
      scores: result.fullScores
    }
  };
}

/**
 * Validate that primary realm has highest score
 */
export function validatePrimaryIsHighest(result: QuizResult): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const primaryScore = result.fullScores[result.primaryRealm];

  for (const [realm, score] of Object.entries(result.fullScores)) {
    if (realm !== result.primaryRealm && score > primaryScore) {
      errors.push(`Realm ${realm} has higher score (${score}) than primary realm ${result.primaryRealm} (${primaryScore})`);
    }
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    details: {
      primaryRealm: result.primaryRealm,
      primaryScore,
      allScores: result.fullScores
    }
  };
}

/**
 * Run all validators and return comprehensive result
 */
export function validateQuizResult(
  answers: Answer[],
  result: QuizResult,
  expectedTop3?: RealmKey[]
): ValidationResult {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];
  const allDetails: Record<string, any> = {};

  // Run all validators
  const validators = [
    { name: 'scoreMath', fn: () => validateScoreMath(answers, result) },
    { name: 'confidenceLevel', fn: () => validateConfidenceLevel(result) },
    { name: 'trioInsight', fn: () => validateTrioInsight(result) },
    { name: 'normalization', fn: () => validateNormalization(result) },
    { name: 'primaryHighest', fn: () => validatePrimaryIsHighest(result) }
  ];

  if (expectedTop3) {
    validators.unshift({
      name: 'realmOrder',
      fn: () => validateRealmOrder(result, expectedTop3)
    });
  }

  for (const { name, fn } of validators) {
    const validation = fn();
    allErrors.push(...validation.errors.map(e => `[${name}] ${e}`));
    allWarnings.push(...validation.warnings.map(w => `[${name}] ${w}`));
    if (validation.details) {
      allDetails[name] = validation.details;
    }
  }

  return {
    passed: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
    details: allDetails
  };
}

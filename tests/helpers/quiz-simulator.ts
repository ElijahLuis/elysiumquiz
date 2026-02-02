import type { Answer, RealmKey, RealmScores } from '../../src/data/types';
import { questions } from '../../src/data/questions';
import { realmKeys } from '../../src/data/realms';

/**
 * Quiz Simulator - Programmatically generate quiz answers for testing
 */

/**
 * Simulate taking the quiz to maximize a single realm
 * Selects the option with highest weight for the target realm in each question
 */
export function simulateSingleRealmQuiz(targetRealm: RealmKey): Answer[] {
  const answers: Answer[] = [];

  for (const question of questions) {
    if (question.type === 'slider') {
      // For slider questions, find the range with highest weight for target realm
      let bestRange = question.ranges[0];
      let bestWeight = bestRange.realms[targetRealm] || 0;

      for (const range of question.ranges) {
        const weight = range.realms[targetRealm] || 0;
        if (weight > bestWeight) {
          bestWeight = weight;
          bestRange = range;
        }
      }

      // Use the midpoint of the best range
      const value = (bestRange.min + bestRange.max) / 2;

      answers.push({
        questionId: `slider-${questions.indexOf(question)}`,
        value: value.toString(),
        realmWeights: bestRange.realms
      });
    } else {
      // For choice questions (scenario, reflection, word_cloud)
      let bestOption = question.options[0];
      let bestWeight = bestOption.realms[targetRealm] || 0;

      for (const option of question.options) {
        const weight = option.realms[targetRealm] || 0;
        if (weight > bestWeight) {
          bestWeight = weight;
          bestOption = option;
        }
      }

      answers.push({
        questionId: question.id,
        value: bestOption.id,
        realmWeights: bestOption.realms
      });
    }
  }

  return answers;
}

/**
 * Simulate taking the quiz with specific realm weights distribution
 * Attempts to distribute answers to achieve the target weight ratios
 */
export function simulateBalancedQuiz(
  targetRealms: RealmKey[],
  targetWeights: number[]
): Answer[] {
  if (targetRealms.length !== targetWeights.length) {
    throw new Error('targetRealms and targetWeights must have same length');
  }

  const answers: Answer[] = [];
  const targetDistribution: Record<RealmKey, number> = {} as Record<RealmKey, number>;

  // Normalize target weights to percentages
  const totalWeight = targetWeights.reduce((sum, w) => sum + w, 0);
  targetRealms.forEach((realm, i) => {
    targetDistribution[realm] = targetWeights[i] / totalWeight;
  });

  // Track accumulated weights
  const accumulated: RealmScores = realmKeys.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {} as RealmScores);

  for (const question of questions) {
    if (question.type === 'slider') {
      // For sliders, pick range that best matches target distribution
      const bestRange = question.ranges.reduce((best, range) => {
        const bestScore = calculateDistributionScore(best.realms, targetDistribution, accumulated);
        const rangeScore = calculateDistributionScore(range.realms, targetDistribution, accumulated);
        return rangeScore > bestScore ? range : best;
      });

      const value = (bestRange.min + bestRange.max) / 2;

      // Update accumulated weights
      Object.entries(bestRange.realms).forEach(([realm, weight]) => {
        accumulated[realm as RealmKey] += weight;
      });

      answers.push({
        questionId: `slider-${questions.indexOf(question)}`,
        value: value.toString(),
        realmWeights: bestRange.realms
      });
    } else {
      // For choice questions, pick option that best matches target distribution
      const bestOption = question.options.reduce((best, option) => {
        const bestScore = calculateDistributionScore(best.realms, targetDistribution, accumulated);
        const optionScore = calculateDistributionScore(option.realms, targetDistribution, accumulated);
        return optionScore > bestScore ? option : best;
      });

      // Update accumulated weights
      Object.entries(bestOption.realms).forEach(([realm, weight]) => {
        accumulated[realm as RealmKey] += weight;
      });

      answers.push({
        questionId: question.id,
        value: bestOption.id,
        realmWeights: bestOption.realms
      });
    }
  }

  return answers;
}

/**
 * Calculate how well an option's realms match the target distribution
 * Higher score = better match
 */
function calculateDistributionScore(
  optionRealms: Partial<Record<RealmKey, number>>,
  targetDistribution: Record<RealmKey, number>,
  currentAccumulated: RealmScores
): number {
  let score = 0;

  // Calculate what the new accumulated totals would be
  const total = Object.values(currentAccumulated).reduce((sum, val) => sum + val, 0) || 1;

  for (const [realm, targetPct] of Object.entries(targetDistribution) as [RealmKey, number][]) {
    const currentPct = currentAccumulated[realm] / total;
    const optionWeight = optionRealms[realm] || 0;

    // If this realm is underrepresented, reward adding to it
    if (currentPct < targetPct && optionWeight > 0) {
      score += optionWeight * (targetPct - currentPct) * 10;
    }
    // If this realm is overrepresented, penalize adding to it
    else if (currentPct > targetPct && optionWeight > 0) {
      score -= optionWeight * (currentPct - targetPct) * 5;
    }
    // If this realm is in target, reward adding to it proportionally
    else if (optionWeight > 0) {
      score += optionWeight * targetPct;
    }
  }

  return score;
}

/**
 * Simulate taking the quiz with random answers (reproducible with seed)
 */
export function simulateRandomQuiz(seed: number = 12345): Answer[] {
  const answers: Answer[] = [];
  let random = seed;

  // Simple seeded random number generator
  const nextRandom = () => {
    random = (random * 9301 + 49297) % 233280;
    return random / 233280;
  };

  for (const question of questions) {
    if (question.type === 'slider') {
      // Pick random range
      const rangeIndex = Math.floor(nextRandom() * question.ranges.length);
      const range = question.ranges[rangeIndex];
      const value = range.min + nextRandom() * (range.max - range.min);

      answers.push({
        questionId: `slider-${questions.indexOf(question)}`,
        value: value.toString(),
        realmWeights: range.realms
      });
    } else {
      // Pick random option
      const optionIndex = Math.floor(nextRandom() * question.options.length);
      const option = question.options[optionIndex];

      answers.push({
        questionId: question.id,
        value: option.id,
        realmWeights: option.realms
      });
    }
  }

  return answers;
}

/**
 * Simulate taking the quiz to create a specific trio combination
 * Distributes weights across the three target realms
 */
export function simulateTrioQuiz(
  primary: RealmKey,
  secondary: RealmKey,
  tertiary: RealmKey,
  weightRatio: [number, number, number] = [50, 30, 20]
): Answer[] {
  return simulateBalancedQuiz(
    [primary, secondary, tertiary],
    weightRatio
  );
}

/**
 * Create answers with all zero weights (edge case test)
 */
export function simulateZeroWeightQuiz(): Answer[] {
  const answers: Answer[] = [];

  for (const question of questions) {
    answers.push({
      questionId: question.type === 'slider'
        ? `slider-${questions.indexOf(question)}`
        : question.id,
      value: question.type === 'slider' ? '50' : 'dummy',
      realmWeights: {}
    });
  }

  return answers;
}

/**
 * Get all questions for inspection
 */
export function getAllQuestions() {
  return questions;
}

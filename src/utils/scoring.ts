import type { RealmKey, RealmScores, Answer, QuizResult, Confidence, TrioInfo } from '../data/types';
import { realmKeys } from '../data/realms';
import { getTrioKey, trioInsights } from '../data/trioInsights';

export function initializeScores(): RealmScores {
  return realmKeys.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {} as RealmScores);
}

export function calculateScores(answers: Answer[]): RealmScores {
  const scores = initializeScores();

  answers.forEach(answer => {
    Object.entries(answer.realmWeights).forEach(([realm, weight]) => {
      if (weight !== undefined) {
        scores[realm as RealmKey] += weight;
      }
    });
  });

  return scores;
}

export function normalizeScores(scores: RealmScores): RealmScores {
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  if (total === 0) return scores;

  const normalized = {} as RealmScores;
  Object.entries(scores).forEach(([realm, score]) => {
    normalized[realm as RealmKey] = Math.round((score / total) * 100);
  });

  return normalized;
}

export function calculateConfidence(scores: RealmScores): Confidence {
  const sorted = Object.values(scores).sort((a, b) => b - a);
  const gap = sorted[0] - sorted[1];

  if (gap > 15) return 'strong';
  if (gap > 8) return 'moderate';
  return 'mixed';
}

export function getTrioInfo(primary: RealmKey, secondary: RealmKey, tertiary: RealmKey): TrioInfo {
  const key = getTrioKey([primary, secondary, tertiary]);
  const insight = trioInsights[key];

  if (insight) {
    return {
      key,
      title: insight.title,
      insight: insight.insight
    };
  }

  // Fallback for any missing combinations (shouldn't happen with complete data)
  return {
    key,
    title: 'The Unique Journey',
    insight: 'Your emotional landscape represents a unique combination of experiences. The interplay between these realms suggests a complex inner world that defies simple categorization.'
  };
}

export function determineResult(answers: Answer[]): QuizResult {
  const scores = calculateScores(answers);
  const normalizedScores = normalizeScores(scores);

  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a);

  const primaryRealm = sorted[0][0] as RealmKey;
  const secondaryRealm = sorted[1][0] as RealmKey;
  const tertiaryRealm = sorted[2][0] as RealmKey;

  return {
    primaryRealm,
    primaryScore: normalizedScores[primaryRealm],
    secondaryRealm,
    secondaryScore: normalizedScores[secondaryRealm],
    tertiaryRealm,
    tertiaryScore: normalizedScores[tertiaryRealm],
    fullScores: normalizedScores,
    confidence: calculateConfidence(scores),
    trio: getTrioInfo(primaryRealm, secondaryRealm, tertiaryRealm),
    timestamp: new Date()
  };
}

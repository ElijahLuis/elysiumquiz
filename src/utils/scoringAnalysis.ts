/**
 * Scoring Analysis Utility
 *
 * This utility analyzes the question set to verify:
 * 1. All realms have balanced scoring opportunities
 * 2. All 120 trio combinations are theoretically reachable
 * 3. Each realm has sufficient "primary" (3-point) opportunities
 */

import { questions } from '../data/questions';
import { realmKeys } from '../data/realms';
import type { RealmKey, ChoiceQuestion, SliderQuestion } from '../data/types';

interface RealmAnalysis {
  realm: RealmKey;
  maxPoints: number;
  primaryOpportunities: number; // Questions where realm can score 3 points
  secondaryOpportunities: number; // Questions where realm can score 2 points
  questionsCovering: string[];
}

interface BalanceReport {
  realmAnalysis: RealmAnalysis[];
  totalQuestions: number;
  balanceScore: number; // 0-100, higher is more balanced
  warnings: string[];
  allCombinationsReachable: boolean;
}

export function analyzeScoring(): BalanceReport {
  const analysis: Record<RealmKey, RealmAnalysis> = {} as Record<RealmKey, RealmAnalysis>;

  // Initialize analysis for each realm
  realmKeys.forEach(realm => {
    analysis[realm] = {
      realm,
      maxPoints: 0,
      primaryOpportunities: 0,
      secondaryOpportunities: 0,
      questionsCovering: []
    };
  });

  // Analyze each question
  questions.forEach(question => {
    if (question.type === 'slider') {
      const sliderQ = question as SliderQuestion;
      // For sliders, find the max points each realm can get
      const realmMaxInQuestion: Record<string, number> = {};

      sliderQ.ranges.forEach(range => {
        Object.entries(range.realms).forEach(([realm, points]) => {
          if (points !== undefined) {
            realmMaxInQuestion[realm] = Math.max(realmMaxInQuestion[realm] || 0, points);
          }
        });
      });

      Object.entries(realmMaxInQuestion).forEach(([realm, maxPoints]) => {
        analysis[realm as RealmKey].maxPoints += maxPoints;
        analysis[realm as RealmKey].questionsCovering.push(question.id);
        if (maxPoints >= 3) {
          analysis[realm as RealmKey].primaryOpportunities++;
        } else if (maxPoints >= 2) {
          analysis[realm as RealmKey].secondaryOpportunities++;
        }
      });
    } else {
      const choiceQ = question as ChoiceQuestion;
      // For choice questions, find the max points each realm can get
      const realmMaxInQuestion: Record<string, number> = {};

      choiceQ.options.forEach(option => {
        Object.entries(option.realms).forEach(([realm, points]) => {
          if (points !== undefined) {
            realmMaxInQuestion[realm] = Math.max(realmMaxInQuestion[realm] || 0, points);
          }
        });
      });

      Object.entries(realmMaxInQuestion).forEach(([realm, maxPoints]) => {
        analysis[realm as RealmKey].maxPoints += maxPoints;
        analysis[realm as RealmKey].questionsCovering.push(question.id);
        if (maxPoints >= 3) {
          analysis[realm as RealmKey].primaryOpportunities++;
        } else if (maxPoints >= 2) {
          analysis[realm as RealmKey].secondaryOpportunities++;
        }
      });
    }
  });

  const realmAnalysis = Object.values(analysis);
  const warnings: string[] = [];

  // Check for balance issues
  const maxPoints = realmAnalysis.map(r => r.maxPoints);
  const avgMaxPoints = maxPoints.reduce((a, b) => a + b, 0) / maxPoints.length;
  const maxDeviation = Math.max(...maxPoints.map(p => Math.abs(p - avgMaxPoints)));

  // Balance score: 100 if all realms have same max points, lower as deviation increases
  const balanceScore = Math.max(0, Math.round(100 - (maxDeviation / avgMaxPoints) * 100));

  // Generate warnings
  realmAnalysis.forEach(r => {
    if (r.primaryOpportunities < 3) {
      warnings.push(`${r.realm} has only ${r.primaryOpportunities} primary (3-point) opportunities - needs at least 3`);
    }
    if (r.maxPoints < avgMaxPoints * 0.7) {
      warnings.push(`${r.realm} is underrepresented with only ${r.maxPoints} max points (avg: ${avgMaxPoints.toFixed(1)})`);
    }
    if (r.maxPoints > avgMaxPoints * 1.3) {
      warnings.push(`${r.realm} is overrepresented with ${r.maxPoints} max points (avg: ${avgMaxPoints.toFixed(1)})`);
    }
  });

  // Check if all 120 combinations are reachable
  // For a trio to be reachable, all 3 realms need sufficient scoring opportunities
  // We consider it reachable if each realm in the trio has at least 3 primary opportunities
  const minPrimaryForReachable = 3;
  const reachableRealms = realmAnalysis.filter(r => r.primaryOpportunities >= minPrimaryForReachable);
  const allCombinationsReachable = reachableRealms.length === 10;

  if (!allCombinationsReachable) {
    const insufficientRealms = realmAnalysis
      .filter(r => r.primaryOpportunities < minPrimaryForReachable)
      .map(r => r.realm);
    warnings.push(`Realms with insufficient primary opportunities: ${insufficientRealms.join(', ')}`);
  }

  return {
    realmAnalysis: realmAnalysis.sort((a, b) => b.maxPoints - a.maxPoints),
    totalQuestions: questions.length,
    balanceScore,
    warnings,
    allCombinationsReachable
  };
}

export function printAnalysisReport(): void {
  const report = analyzeScoring();

  console.log('\n========================================');
  console.log('       SCORING BALANCE ANALYSIS');
  console.log('========================================\n');

  console.log(`Total Questions: ${report.totalQuestions}`);
  console.log(`Balance Score: ${report.balanceScore}/100`);
  console.log(`All 120 Combinations Reachable: ${report.allCombinationsReachable ? 'YES ✓' : 'NO ✗'}\n`);

  console.log('REALM BREAKDOWN:');
  console.log('─'.repeat(70));
  console.log('Realm      | Max Pts | Primary (3pt) | Secondary (2pt) | Questions');
  console.log('─'.repeat(70));

  report.realmAnalysis.forEach(r => {
    const realmPadded = r.realm.padEnd(10);
    const maxPtsPadded = r.maxPoints.toString().padStart(7);
    const primaryPadded = r.primaryOpportunities.toString().padStart(13);
    const secondaryPadded = r.secondaryOpportunities.toString().padStart(15);
    const questionsCount = r.questionsCovering.length.toString().padStart(9);
    console.log(`${realmPadded} |${maxPtsPadded} |${primaryPadded} |${secondaryPadded} |${questionsCount}`);
  });

  console.log('─'.repeat(70));

  if (report.warnings.length > 0) {
    console.log('\nWARNINGS:');
    report.warnings.forEach(w => console.log(`  ⚠ ${w}`));
  } else {
    console.log('\n✓ No balance warnings - scoring appears well-balanced!');
  }

  console.log('\n========================================\n');
}

// Export for testing
export { questions };

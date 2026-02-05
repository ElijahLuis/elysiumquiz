import { useMemo } from 'react';
import type { Answer, RealmKey } from '../data/types';
import { realms, realmKeys } from '../data/realms';
import { calculateScores } from '../utils/scoring';

interface CrystallineOrbProps {
  answers: Answer[];
  progress: number;
  currentQuestion: number;
  totalQuestions: number;
  finalRealm?: RealmKey;
}

export function CrystallineOrb({
  answers,
  progress,
  currentQuestion,
  totalQuestions,
  finalRealm
}: CrystallineOrbProps) {
  // Calculate current realm colors based on accumulated answers
  const orbColors = useMemo(() => {
    if (finalRealm) {
      // Quiz complete - show final realm color
      return {
        primary: realms[finalRealm].color,
        secondary: realms[finalRealm].color,
        tertiary: realms[finalRealm].color,
        isComplete: true
      };
    }

    if (answers.length === 0) {
      // No answers yet - show neutral shimmer with muted realm colors
      return {
        primary: '#606080',
        secondary: '#505070',
        tertiary: '#404060',
        isComplete: false
      };
    }

    // Calculate current scores from answers
    const scores = calculateScores(answers);

    // Sort realms by score
    const sorted = realmKeys
      .map(key => ({ key, score: scores[key] }))
      .sort((a, b) => b.score - a.score);

    // Get top 3 realm colors weighted by their scores
    const topThree = sorted.slice(0, 3);
    const totalTopScore = topThree.reduce((sum, r) => sum + r.score, 0);

    // If no clear leaders yet, blend softly
    if (totalTopScore === 0) {
      return {
        primary: '#606080',
        secondary: '#505070',
        tertiary: '#404060',
        isComplete: false
      };
    }

    return {
      primary: realms[topThree[0].key].color,
      secondary: realms[topThree[1]?.key || topThree[0].key].color,
      tertiary: realms[topThree[2]?.key || topThree[0].key].color,
      isComplete: false
    };
  }, [answers, finalRealm]);

  // Calculate intensity based on progress (orb becomes more vibrant as quiz progresses)
  const intensity = Math.max(0.4, progress / 100);

  // Determine animation state
  const orbClass = orbColors.isComplete
    ? 'crystalline-orb crystallized'
    : 'crystalline-orb flowing';

  return (
    <div className="orb-container">
      <div className="orb-progress-text">
        Question {currentQuestion + 1} of {totalQuestions}
      </div>

      <div
        className={orbClass}
        style={{
          '--orb-color-1': orbColors.primary,
          '--orb-color-2': orbColors.secondary,
          '--orb-color-3': orbColors.tertiary,
          '--orb-intensity': intensity,
          '--orb-progress': `${progress}%`,
        } as React.CSSProperties}
      >
        {/* Core orb */}
        <div className="orb-core" />

        {/* Inner glow layer */}
        <div className="orb-inner-glow" />

        {/* Outer shimmer */}
        <div className="orb-shimmer" />

        {/* Facets that appear during crystallization */}
        <div className="orb-facets">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="orb-facet" style={{ '--facet-index': i } as React.CSSProperties} />
          ))}
        </div>

        {/* Progress ring */}
        <svg className="orb-progress-ring" viewBox="0 0 100 100">
          <circle
            className="orb-progress-track"
            cx="50"
            cy="50"
            r="46"
          />
          <circle
            className="orb-progress-fill"
            cx="50"
            cy="50"
            r="46"
            style={{
              strokeDasharray: `${2 * Math.PI * 46}`,
              strokeDashoffset: `${2 * Math.PI * 46 * (1 - progress / 100)}`,
            }}
          />
        </svg>
      </div>
    </div>
  );
}

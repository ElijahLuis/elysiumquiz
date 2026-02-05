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

// Sparkle positions around the orb (angle in degrees, distance from center)
const SPARKLES = [
  { angle: 30, distance: 55, size: 4, delay: 0 },
  { angle: 90, distance: 50, size: 3, delay: 0.5 },
  { angle: 150, distance: 58, size: 5, delay: 1.2 },
  { angle: 210, distance: 52, size: 3, delay: 0.8 },
  { angle: 270, distance: 56, size: 4, delay: 1.5 },
  { angle: 330, distance: 54, size: 3, delay: 0.3 },
];

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
        isComplete: true,
        isInitial: false
      };
    }

    if (answers.length === 0) {
      // No answers yet - show iridescent shimmer cycling through realm colors
      return {
        primary: realms.oasis.color,
        secondary: realms.trace.color,
        tertiary: realms.mist.color,
        isComplete: false,
        isInitial: true
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

    // If no clear leaders yet, show iridescent
    if (totalTopScore === 0) {
      return {
        primary: realms.oasis.color,
        secondary: realms.trace.color,
        tertiary: realms.mist.color,
        isComplete: false,
        isInitial: true
      };
    }

    return {
      primary: realms[topThree[0].key].color,
      secondary: realms[topThree[1]?.key || topThree[0].key].color,
      tertiary: realms[topThree[2]?.key || topThree[0].key].color,
      isComplete: false,
      isInitial: false
    };
  }, [answers, finalRealm]);

  // Calculate intensity based on progress (orb becomes more vibrant as quiz progresses)
  const intensity = Math.max(0.4, progress / 100);

  // Calculate scale based on progress (starts at 0.85, grows to 1.0)
  const scale = 0.85 + (progress / 100) * 0.15;

  // Determine animation state
  const orbClass = [
    'crystalline-orb',
    orbColors.isComplete ? 'crystallized' : 'flowing',
    orbColors.isInitial ? 'iridescent' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className="orb-container">
      <div className="orb-progress-text">
        Question {currentQuestion + 1} of {totalQuestions}
      </div>

      <div className="orb-wrapper">
        {/* Twinkling sparkles */}
        <div className="orb-sparkles">
          {SPARKLES.map((sparkle, i) => {
            const x = 50 + sparkle.distance * Math.cos((sparkle.angle * Math.PI) / 180);
            const y = 50 + sparkle.distance * Math.sin((sparkle.angle * Math.PI) / 180);
            return (
              <div
                key={i}
                className="orb-sparkle"
                style={{
                  '--sparkle-x': `${x}%`,
                  '--sparkle-y': `${y}%`,
                  '--sparkle-size': `${sparkle.size}px`,
                  '--sparkle-delay': `${sparkle.delay}s`,
                  '--sparkle-color': orbColors.primary,
                } as React.CSSProperties}
              />
            );
          })}
        </div>

        <div
          className={orbClass}
          style={{
            '--orb-color-1': orbColors.primary,
            '--orb-color-2': orbColors.secondary,
            '--orb-color-3': orbColors.tertiary,
            '--orb-intensity': intensity,
            '--orb-scale': scale,
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
    </div>
  );
}

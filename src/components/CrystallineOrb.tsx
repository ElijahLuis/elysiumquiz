import { useMemo, useState, useEffect, useRef } from 'react';
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

// Color interpolation duration in milliseconds
const COLOR_TRANSITION_DURATION = 1200;

// Parse hex color to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 118, g: 255, b: 229 }; // fallback to oasis color
}

// Convert RGB to hex
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// Interpolate between two colors
function interpolateColor(from: string, to: string, progress: number): string {
  const fromRgb = hexToRgb(from);
  const toRgb = hexToRgb(to);

  const r = fromRgb.r + (toRgb.r - fromRgb.r) * progress;
  const g = fromRgb.g + (toRgb.g - fromRgb.g) * progress;
  const b = fromRgb.b + (toRgb.b - fromRgb.b) * progress;

  return rgbToHex(r, g, b);
}

// Easing function for smooth animation
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

interface OrbColors {
  primary: string;
  secondary: string;
  tertiary: string;
  isComplete: boolean;
  isInitial: boolean;
}

export function CrystallineOrb({
  answers,
  progress,
  currentQuestion,
  totalQuestions,
  finalRealm
}: CrystallineOrbProps) {
  // Calculate target realm colors based on accumulated answers
  const targetColors = useMemo((): OrbColors => {
    if (finalRealm) {
      return {
        primary: realms[finalRealm].color,
        secondary: realms[finalRealm].color,
        tertiary: realms[finalRealm].color,
        isComplete: true,
        isInitial: false
      };
    }

    if (answers.length === 0) {
      return {
        primary: realms.oasis.color,
        secondary: realms.trace.color,
        tertiary: realms.mist.color,
        isComplete: false,
        isInitial: true
      };
    }

    const scores = calculateScores(answers);
    const sorted = realmKeys
      .map(key => ({ key, score: scores[key] }))
      .sort((a, b) => b.score - a.score);

    const topThree = sorted.slice(0, 3);
    const totalTopScore = topThree.reduce((sum, r) => sum + r.score, 0);

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

  // State for displayed colors (animated)
  const [displayColors, setDisplayColors] = useState({
    primary: targetColors.primary,
    secondary: targetColors.secondary,
    tertiary: targetColors.tertiary,
  });

  // Ref to track animation frame and start colors
  const animationRef = useRef<number | null>(null);
  const startColorsRef = useRef(displayColors);
  const startTimeRef = useRef<number | null>(null);

  // Animate colors when target changes
  useEffect(() => {
    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Store starting colors
    startColorsRef.current = { ...displayColors };
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min(elapsed / COLOR_TRANSITION_DURATION, 1);
      const easedProgress = easeInOutCubic(rawProgress);

      const newColors = {
        primary: interpolateColor(startColorsRef.current.primary, targetColors.primary, easedProgress),
        secondary: interpolateColor(startColorsRef.current.secondary, targetColors.secondary, easedProgress),
        tertiary: interpolateColor(startColorsRef.current.tertiary, targetColors.tertiary, easedProgress),
      };

      setDisplayColors(newColors);

      if (rawProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetColors.primary, targetColors.secondary, targetColors.tertiary]);

  // Calculate intensity based on progress
  const intensity = Math.max(0.4, progress / 100);

  // Determine animation state
  const orbClass = [
    'crystalline-orb',
    targetColors.isComplete ? 'crystallized' : 'flowing',
    targetColors.isInitial ? 'iridescent' : ''
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
                  '--sparkle-color': displayColors.primary,
                } as React.CSSProperties}
              />
            );
          })}
        </div>

        <div
          className={orbClass}
          style={{
            '--orb-color-1': displayColors.primary,
            '--orb-color-2': displayColors.secondary,
            '--orb-color-3': displayColors.tertiary,
            '--orb-intensity': intensity,
            '--orb-scale': 1,
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

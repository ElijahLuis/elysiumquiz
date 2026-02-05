import { useEffect, useState } from 'react';
import type { QuizResult } from '../data/types';
import { realms } from '../data/realms';

interface OrbTransitionProps {
  result: QuizResult;
  onComplete: () => void;
}

type TransitionPhase = 'crystallize' | 'expand' | 'fade';

export function OrbTransition({ result, onComplete }: OrbTransitionProps) {
  const [phase, setPhase] = useState<TransitionPhase>('crystallize');
  const realmColor = realms[result.primaryRealm].color;

  useEffect(() => {
    // Phase 1: Crystallize (orb pulses and glows) - 800ms
    const crystallizeTimer = setTimeout(() => {
      setPhase('expand');
    }, 800);

    // Phase 2: Expand (orb grows to fill screen) - 1400ms
    const expandTimer = setTimeout(() => {
      setPhase('fade');
    }, 2200);

    // Phase 3: Fade to results - 800ms, then complete
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(crystallizeTimer);
      clearTimeout(expandTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="orb-transition-container">
      <div
        className={`orb-transition orb-transition--${phase}`}
        style={{ '--realm-color': realmColor } as React.CSSProperties}
      >
        <div className="orb-transition-core" />
        <div className="orb-transition-glow" />
      </div>
    </div>
  );
}

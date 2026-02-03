import React, { useMemo } from 'react';

interface AnimatedBackgroundProps {
  particleCount?: number;
  realmColor?: string;
  density?: 'low' | 'medium' | 'high';
}

interface Particle {
  id: number;
  size: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  driftX: number;
  animation: 'float' | 'floatAlt';
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 3,        // 3-8px
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 15 + 25,  // 25-40s
    delay: Math.random() * -30,         // Stagger start times
    driftX: (Math.random() - 0.5) * 80, // -40 to 40px
    animation: Math.random() > 0.5 ? 'float' : 'floatAlt'
  }));
}

function getDensityOpacity(density: 'low' | 'medium' | 'high'): number {
  switch (density) {
    case 'low': return 0.08;
    case 'medium': return 0.15;
    case 'high': return 0.25;
    default: return 0.15;
  }
}

export function AnimatedBackground({
  particleCount = 12,
  realmColor,
  density = 'medium'
}: AnimatedBackgroundProps) {
  const particles = useMemo(() => generateParticles(particleCount), [particleCount]);
  const particleOpacity = getDensityOpacity(density);

  return (
    <div className="particle-container" aria-hidden="true">
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`particle particle-${particle.animation}`}
          style={{
            '--size': `${particle.size}px`,
            '--left': particle.left,
            '--top': particle.top,
            '--duration': `${particle.duration}s`,
            '--delay': `${particle.delay}s`,
            '--drift-x': `${particle.driftX}px`,
            '--particle-opacity': particleOpacity,
            background: realmColor || 'rgba(255, 255, 255, 0.3)'
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

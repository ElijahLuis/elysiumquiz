import { useEffect, useState } from 'react';
import type { QuizResult } from '../data/types';
import { realms } from '../data/realms';

interface RealmRevealProps {
  result: QuizResult;
  onContinue: () => void;
}

export function RealmReveal({ result, onContinue }: RealmRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const realm = realms[result.primaryRealm];

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`realm-reveal ${revealed ? 'revealed' : ''}`}
      style={{ '--realm-color': realm.color } as React.CSSProperties}
    >
      <div className="reveal-content">
        <div className="reveal-quote">"{realm.quote}"</div>
        <h1 className="reveal-realm-name">{realm.name}</h1>
        <div className="reveal-confidence">
          {result.confidence === 'strong' && 'A clear resonance'}
          {result.confidence === 'moderate' && 'A likely affinity'}
          {result.confidence === 'mixed' && 'A complex blend'}
        </div>
        <button className="reveal-continue" onClick={onContinue}>
          Claim Your Realm
        </button>
      </div>
    </div>
  );
}

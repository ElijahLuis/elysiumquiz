import type { RealmKey } from '../data/types';
import { realms } from '../data/realms';

interface RealmCardProps {
  realmKey: RealmKey;
  score: number;
  variant: 'primary' | 'secondary' | 'tertiary';
}

export function RealmCard({ realmKey, score, variant }: RealmCardProps) {
  const realm = realms[realmKey];

  return (
    <div
      className={`realm-card realm-card-${variant}`}
      style={{ '--realm-color': realm.color } as React.CSSProperties}
    >
      <div className="realm-card-header">
        <h3 className="realm-card-name">{realm.name}</h3>
        <span className="realm-card-score">{score}%</span>
      </div>
      <p className="realm-card-quote">"{realm.quote}"</p>
      {variant === 'primary' && (
        <>
          <p className="realm-card-lore">{realm.lore}</p>
          <div className="realm-card-emotions">
            <span className="emotions-label">Core emotions:</span>
            <div className="emotions-list">
              {realm.coreEmotions.map(emotion => (
                <span key={emotion} className="emotion-tag">{emotion}</span>
              ))}
            </div>
          </div>
          <div className="realm-card-tone">
            <span className="tone-label">Tone:</span> {realm.tone}
          </div>
        </>
      )}
    </div>
  );
}

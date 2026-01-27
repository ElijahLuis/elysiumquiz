import type { QuizResult, UserRegistration } from '../data/types';
import { RealmCard } from '../components/RealmCard';
import { realms } from '../data/realms';
import { getRealmTrioInsight } from '../data/trioInsights';

interface ResultsPageProps {
  result: QuizResult;
  user: UserRegistration | null;
  onRestart: () => void;
}

export function ResultsPage({ result, user, onRestart }: ResultsPageProps) {
  const primaryRealm = realms[result.primaryRealm];
  const trioInsight = getRealmTrioInsight(
    result.primaryRealm,
    result.secondaryRealm,
    result.tertiaryRealm
  );

  return (
    <div
      className="results-page"
      style={{ '--realm-color': primaryRealm.color } as React.CSSProperties}
    >
      <div className="results-header">
        {user && <p className="results-greeting">Welcome, {user.displayName}</p>}
        <h1 className="results-title">Your Realm: {primaryRealm.name}</h1>
      </div>

      <div className="results-cards">
        <RealmCard
          realmKey={result.primaryRealm}
          score={result.primaryScore}
          variant="primary"
        />

        <div className="secondary-realms">
          <h3 className="secondary-title">Also resonating with you:</h3>
          <div className="secondary-cards">
            <RealmCard
              realmKey={result.secondaryRealm}
              score={result.secondaryScore}
              variant="secondary"
            />
            <RealmCard
              realmKey={result.tertiaryRealm}
              score={result.tertiaryScore}
              variant="tertiary"
            />
          </div>
        </div>
      </div>

      <div className="results-insights">
        <h2 className="insights-title">{trioInsight.title}</h2>
        <p className="insights-text">{trioInsight.insight}</p>
        
        {trioInsight.strengths && trioInsight.strengths.length > 0 && (
          <div className="insights-strengths">
            <h4 className="insights-section-title">Your Strengths</h4>
            <ul className="insights-list">
              {trioInsight.strengths.map((strength, i) => (
                <li key={i}>{strength}</li>
              ))}
            </ul>
          </div>
        )}
        
        {trioInsight.challenges && trioInsight.challenges.length > 0 && (
          <div className="insights-challenges">
            <h4 className="insights-section-title">Challenges to Navigate</h4>
            <ul className="insights-list">
              {trioInsight.challenges.map((challenge, i) => (
                <li key={i}>{challenge}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="results-affinity">
        <h3>Your Emotional Landscape</h3>
        <div className="affinity-bars">
          {Object.entries(result.fullScores)
            .sort(([, a], [, b]) => b - a)
            .map(([key, score]) => (
              <div key={key} className="affinity-row">
                <span className="affinity-name">{realms[key as keyof typeof realms].name}</span>
                <div className="affinity-bar-container">
                  <div
                    className="affinity-bar"
                    style={{
                      width: `${score}%`,
                      background: realms[key as keyof typeof realms].color
                    }}
                  />
                </div>
                <span className="affinity-score">{score}%</span>
              </div>
            ))}
        </div>
      </div>

      <div className="results-actions">
        <button className="restart-button" onClick={onRestart}>
          Take Quiz Again
        </button>
        <p className="results-signup">
          Interested in learning more?{' '}
          <a href="/signup" className="signup-link">Sign up now!</a>
        </p>
      </div>
    </div>
  );
}

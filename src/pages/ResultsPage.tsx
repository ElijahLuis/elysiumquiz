import type { QuizResult } from '../data/types';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { RealmCard } from '../components/RealmCard';
import { realms } from '../data/realms';
import { getRealmTrioInsight } from '../data/trioInsights';

interface ResultsPageProps {
  result: QuizResult;
  onRestart: () => void;
}

export function ResultsPage({ result, onRestart }: ResultsPageProps) {
  const primaryRealm = realms[result.primaryRealm];
  const trioInsight = getRealmTrioInsight(
    result.primaryRealm,
    result.secondaryRealm,
    result.tertiaryRealm
  );

  const sortedScores = Object.entries(result.fullScores)
    .sort(([, a], [, b]) => b - a);

  return (
    <div
      className="results-page"
      style={{ '--realm-color': primaryRealm.color } as React.CSSProperties}
    >
      <AnimatedBackground particleCount={10} density="medium" realmColor={primaryRealm.color} />

      <div className="results-header">
        <h1 className="results-title">Your Realm: {primaryRealm.name}</h1>
      </div>

      <div className="results-dashboard">
        {/* Left Column: Realm Cards */}
        <div className="dashboard-left">
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

        {/* Right Column: Insights */}
        <div className="dashboard-right">
          <div className="results-insights">
            <h3 className="insights-label">Your Title:</h3>
            <h2 className="insights-title">{trioInsight.title}</h2>
            <p className="insights-realms">
              {realms[result.primaryRealm].name} — {realms[result.secondaryRealm].name} — {realms[result.tertiaryRealm].name}
            </p>
            <p className="insights-text">{trioInsight.insight}</p>

            <div className="insights-grid">
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
          </div>
        </div>
      </div>

      {/* Bottom Section: Affinity Chart */}
      <div className="results-affinity">
        <h3>Your Emotional Landscape</h3>
        <div className="affinity-grid">
          <div className="affinity-column">
            {sortedScores.slice(0, 5).map(([key, score]) => (
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
          <div className="affinity-column">
            {sortedScores.slice(5, 10).map(([key, score]) => (
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

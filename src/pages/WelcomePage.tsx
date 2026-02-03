import { AnimatedBackground } from '../components/AnimatedBackground';

interface WelcomePageProps {
  onStart: () => void;
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="welcome-page">
      <AnimatedBackground particleCount={15} density="medium" />
      <div className="welcome-content">
        <h1 className="welcome-title">Elysium Quiz</h1>
        <p className="welcome-subtitle">Discover Your Realm</p>
        <p className="welcome-description">
          Every emotion has a home. Through a series of reflections,
          discover which of the ten realms resonates with where you are right now.
        </p>
        <div className="welcome-realms-preview">
          <span className="realm-dot" style={{ background: '#bf9dff' }} title="Abyss" />
          <span className="realm-dot" style={{ background: '#9ef2e3' }} title="Cavern" />
          <span className="realm-dot" style={{ background: '#f0c9b3' }} title="Dross" />
          <span className="realm-dot" style={{ background: '#ffb194' }} title="Ember" />
          <span className="realm-dot" style={{ background: '#ffd96a' }} title="Glare" />
          <span className="realm-dot" style={{ background: '#86bfff' }} title="Languish" />
          <span className="realm-dot" style={{ background: '#cfe8f8' }} title="Mist" />
          <span className="realm-dot" style={{ background: '#76ffe5' }} title="Oasis" />
          <span className="realm-dot" style={{ background: '#ffa3c0' }} title="Trace" />
          <span className="realm-dot" style={{ background: '#ffeba3' }} title="Zenith" />
        </div>
        <button className="start-button" onClick={onStart}>
          Begin Your Journey
        </button>
        <p className="welcome-time">Takes about 3-5 minutes</p>
      </div>
    </div>
  );
}

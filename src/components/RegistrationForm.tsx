import { useState } from 'react';
import type { QuizResult } from '../data/types';
import { realms } from '../data/realms';

interface RegistrationFormProps {
  result: QuizResult;
  onRegister: (displayName: string, email?: string) => void;
  onSkip: () => void;
}

export function RegistrationForm({ result, onRegister, onSkip }: RegistrationFormProps) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const realm = realms[result.primaryRealm];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError('Please enter a name');
      return;
    }
    onRegister(displayName.trim(), email.trim() || undefined);
  };

  return (
    <div
      className="registration-container"
      style={{ '--realm-color': realm.color } as React.CSSProperties}
    >
      <div className="registration-header">
        <h2>Welcome to {realm.name}</h2>
        <p>Enter your name to claim your place in this realm</p>
      </div>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="displayName">Your Name *</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            placeholder="Enter your name"
            autoFocus
          />
          {error && <span className="form-error">{error}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email (optional)</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
          <span className="form-hint">For updates about Elysium</span>
        </div>

        <div className="registration-actions">
          <button type="submit" className="register-button">
            Enter {realm.name}
          </button>
          <button type="button" className="skip-button" onClick={onSkip}>
            Skip for now
          </button>
        </div>
      </form>
    </div>
  );
}

interface ProgressBarProps {
  progress: number;
  currentQuestion: number;
  totalQuestions: number;
}

export function ProgressBar({ progress, currentQuestion, totalQuestions }: ProgressBarProps) {
  return (
    <div className="progress-container">
      <div className="progress-text">
        Question {currentQuestion + 1} of {totalQuestions}
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

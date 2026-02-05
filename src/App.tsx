import { useQuiz } from './hooks/useQuiz';
import { WelcomePage } from './pages/WelcomePage';
import { QuizPage } from './pages/QuizPage';
import { ResultsPage } from './pages/ResultsPage';
import { OrbTransition } from './components/OrbTransition';
import './styles/global.css';

function App() {
  const {
    stage,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    answers,
    canGoBack,
    result,
    startQuiz,
    selectOption,
    selectSliderValue,
    goBack,
    completeTransition,
    restart,
    debugSkipToResults
  } = useQuiz();

  // DEBUG: Realm options for quick testing
  const debugRealms = ['ember', 'mist', 'abyss', 'zenith', 'oasis'] as const;

  return (
    <div className="app">
      {/* DEBUG: Quick navigation links - Remove later */}
      <div style={{
        position: 'fixed',
        top: 10,
        left: 10,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.8)',
        padding: '8px 12px',
        borderRadius: 8,
        fontSize: 12
      }}>
        <span style={{ color: '#888', marginRight: 8 }}>DEBUG:</span>
        {debugRealms.map(realm => (
          <button
            key={realm}
            onClick={() => debugSkipToResults(realm)}
            style={{
              marginRight: 6,
              padding: '4px 8px',
              background: '#333',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            {realm}
          </button>
        ))}
      </div>

      {stage === 'welcome' && (
        <WelcomePage onStart={startQuiz} />
      )}

      {stage === 'quiz' && currentQuestion && (
        <QuizPage
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          progress={progress}
          answers={answers}
          canGoBack={canGoBack}
          onSelectOption={selectOption}
          onSelectSlider={selectSliderValue}
          onBack={goBack}
        />
      )}

      {stage === 'transitioning' && result && (
        <OrbTransition
          result={result}
          onComplete={completeTransition}
        />
      )}

      {stage === 'results' && result && (
        <ResultsPage
          result={result}
          onRestart={restart}
        />
      )}
    </div>
  );
}

export default App;

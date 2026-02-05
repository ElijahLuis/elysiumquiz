import { useQuiz } from './hooks/useQuiz';
import { WelcomePage } from './pages/WelcomePage';
import { QuizPage } from './pages/QuizPage';
import { ResultsPage } from './pages/ResultsPage';
import { RealmReveal } from './components/RealmReveal';
import { RegistrationForm } from './components/RegistrationForm';
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
    user,
    startQuiz,
    selectOption,
    selectSliderValue,
    goBack,
    proceedToRegistration,
    register,
    skipRegistration,
    restart
  } = useQuiz();

  return (
    <div className="app">
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

      {stage === 'teaser' && result && (
        <RealmReveal
          result={result}
          onContinue={proceedToRegistration}
        />
      )}

      {stage === 'registration' && result && (
        <RegistrationForm
          result={result}
          onRegister={register}
          onSkip={skipRegistration}
        />
      )}

      {stage === 'results' && result && (
        <ResultsPage
          result={result}
          user={user}
          onRestart={restart}
        />
      )}
    </div>
  );
}

export default App;

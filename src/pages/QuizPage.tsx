import type { Question, Answer } from '../data/types';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { CrystallineOrb } from '../components/CrystallineOrb';
import { QuestionCard } from '../components/QuestionCard';

interface QuizPageProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  progress: number;
  answers: Answer[];
  canGoBack: boolean;
  onSelectOption: (optionId: string) => void;
  onSelectSlider: (value: number) => void;
  onBack: () => void;
}

export function QuizPage({
  question,
  currentIndex,
  totalQuestions,
  progress,
  answers,
  canGoBack,
  onSelectOption,
  onSelectSlider,
  onBack
}: QuizPageProps) {
  return (
    <div className="quiz-page">
      <AnimatedBackground particleCount={8} density="low" />
      <CrystallineOrb
        answers={answers}
        progress={progress}
        currentQuestion={currentIndex}
        totalQuestions={totalQuestions}
      />
      <QuestionCard
        question={question}
        onSelectOption={onSelectOption}
        onSelectSlider={onSelectSlider}
        onBack={onBack}
        canGoBack={canGoBack}
      />
    </div>
  );
}

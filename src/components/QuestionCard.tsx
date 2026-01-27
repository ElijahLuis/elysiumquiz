import type { Question, ChoiceQuestion, SliderQuestion } from '../data/types';
import { AnswerOption } from './AnswerOption';
import { Slider } from './Slider';

interface QuestionCardProps {
  question: Question;
  onSelectOption: (optionId: string) => void;
  onSelectSlider: (value: number) => void;
  onBack?: () => void;
  canGoBack: boolean;
}

export function QuestionCard({
  question,
  onSelectOption,
  onSelectSlider,
  onBack,
  canGoBack
}: QuestionCardProps) {
  const isChoice = question.type !== 'slider';

  const getQuestionTypeLabel = (type: Question['type']) => {
    switch (type) {
      case 'scenario': return 'Scenario';
      case 'reflection': return 'Reflection';
      case 'word_cloud': return 'Word Association';
      case 'slider': return 'Spectrum';
    }
  };

  return (
    <div className="question-card">
      <div className="question-type">{getQuestionTypeLabel(question.type)}</div>
      <h2 className="question-text">{question.text}</h2>

      {isChoice ? (
        <div className="options-container">
          {(question as ChoiceQuestion).options.map(option => (
            <AnswerOption
              key={option.id}
              text={option.text}
              onClick={() => onSelectOption(option.id)}
            />
          ))}
        </div>
      ) : (
        <Slider
          key={question.id}
          leftLabel={(question as SliderQuestion).leftLabel}
          rightLabel={(question as SliderQuestion).rightLabel}
          onSelect={onSelectSlider}
        />
      )}

      {canGoBack && onBack && (
        <button className="back-button" onClick={onBack}>
          Back
        </button>
      )}
    </div>
  );
}

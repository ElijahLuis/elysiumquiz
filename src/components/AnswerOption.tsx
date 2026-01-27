interface AnswerOptionProps {
  text: string;
  onClick: () => void;
  selected?: boolean;
}

export function AnswerOption({ text, onClick, selected }: AnswerOptionProps) {
  return (
    <button
      className={`answer-option ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

import { useState } from 'react';

interface SliderProps {
  leftLabel: string;
  rightLabel: string;
  onSelect: (value: number) => void;
}

export function Slider({ leftLabel, rightLabel, onSelect }: SliderProps) {
  const [value, setValue] = useState(50);
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleConfirm = () => {
    setConfirmed(true);
    onSelect(value);
  };

  return (
    <div className="slider-container">
      <div className="slider-labels">
        <span className="slider-label left">{leftLabel}</span>
        <span className="slider-label right">{rightLabel}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="slider-input"
        disabled={confirmed}
      />
      <div className="slider-value">{value}%</div>
      {!confirmed && (
        <button className="slider-confirm" onClick={handleConfirm}>
          Confirm
        </button>
      )}
    </div>
  );
}

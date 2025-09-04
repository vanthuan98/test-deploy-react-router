import React, { useMemo } from 'react';

interface AnswerButtonProps {
  option: string;
  isAnswered: boolean;
  isCorrect: boolean;
  isSelected: boolean;
  classname?: string;
  // eslint-disable-next-line no-unused-vars
  onSelect: (option: string) => void;
}

export const AnswerButton: React.FC<AnswerButtonProps> = React.memo(
  ({ option, isAnswered, isCorrect, isSelected, classname = '', onSelect }) => {
    const buttonStyle = useMemo(() => {
      if (!isAnswered) {
        return 'bg-white border-2 border-black hover:bg-gray-50 transition-colors duration-200';
      }
      if (isCorrect) {
        return 'bg-[#97FFA8] border-2 border-black'; // Xanh cho đáp án đúng
      }
      if (isSelected && !isCorrect) {
        return 'bg-[#FB2C36] border-2 border-black'; // Đỏ cho đáp án sai được chọn
      }
      return 'bg-white border-2 border-black opacity-50'; // Mờ cho đáp án sai chưa chọn
    }, [isAnswered, isCorrect, isSelected]);

    return (
      <button
        onClick={() => onSelect(option)}
        disabled={isAnswered}
        className={`w-full py-4 px-4 rounded-lg font-bold text-center transition-all duration-200 ${buttonStyle} ${classname}`}
      >
        {option}
      </button>
    );
  }
);

AnswerButton.displayName = 'AnswerButton';

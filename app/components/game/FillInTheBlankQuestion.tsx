import React from 'react';
import { AnswerButton } from './AnswerButton';
import type { FillInTheBlankQuestion as FillInTheBlankQuestionType } from '../../hooks';

interface FillInTheBlankQuestionProps {
  question: FillInTheBlankQuestionType;
  // eslint-disable-next-line no-unused-vars
  onAnswerSelect: (answer: string) => void;
  selectedAnswer: string | null;
  isAnswered: boolean;
}

export const FillInTheBlankQuestion: React.FC<FillInTheBlankQuestionProps> = ({
  question,
  onAnswerSelect,
  selectedAnswer,
  isAnswered,
}) => {
  // Tách câu thành các phần: trước chỗ trống, chỗ trống, sau chỗ trống
  const beforeBlank = question.sentence.substring(0, question.blankPosition);
  const afterBlank = question.sentence.substring(question.blankPosition + 5); // 5 là độ dài của "_____"

  return (
    <div className='w-full px-5 py-6'>
      {/* Hiển thị câu có chỗ trống */}
      <div className='bg-white mb-6'>
        <div className='text-lg text-gray-700 leading-relaxed mb-4'>
          <span>{beforeBlank}</span>
          <span className='inline-block min-w-20 px-2 h-8 bg-gray-200 rounded border-2 border-dashed border-gray-400 mx-2 align-middle items-center justify-center'>
            {isAnswered && (
              <span className='text-sm font-medium text-gray-800'>
                {question.correctAnswer}
              </span>
            )}
          </span>
          <span>{afterBlank}</span>
        </div>
        <div className='text-sm text-[#74247A]'>
          {question.word.exampleMeaning}
        </div>
      </div>

      {/* Hiển thị các lựa chọn */}
      <div className='space-y-3'>
        {question.options.map((option, index) => (
          <AnswerButton
            key={index}
            option={option}
            isAnswered={isAnswered}
            isCorrect={option === question.correctAnswer}
            isSelected={selectedAnswer === option}
            classname='mb-3'
            onSelect={onAnswerSelect}
          />
        ))}
      </div>
    </div>
  );
};

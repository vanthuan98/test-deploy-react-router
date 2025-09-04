import React from 'react';
import { AnswerButton } from './AnswerButton';
import type { GameQuestion as GameQuestionType } from '../../hooks/useGameQuestions';

interface GameQuestionProps {
  question: GameQuestionType;
  isAnswered: boolean;
  selectedAnswer: string | null;
  // eslint-disable-next-line no-unused-vars
  onAnswerSelect: (answer: string) => void;
  gameType?: 'meaning' | 'word' | 'sentence';
}

export const GameQuestion: React.FC<GameQuestionProps> = React.memo(
  ({
    question,
    isAnswered,
    selectedAnswer,
    onAnswerSelect,
    gameType = 'meaning',
  }) => {
    const isWordGame = gameType === 'word';
    const isSentenceGame = gameType === 'sentence';
    const isMeaningGame = gameType === 'meaning';

    return (
      <>
        <div className='text-center mb-6'>
          <p className='font-semibold text-lg'>
            "
            {isSentenceGame
              ? question.word.exampleMeaning
              : isWordGame
                ? question.word.meaning
                : question.word.word}
            "
          </p>
          {isMeaningGame && (
            <p className='text-sm text-gray-600 mt-2'>
              {question.word.example}
            </p>
          )}
        </div>

        <div className='w-full max-w-md mb-6'>
          {question.options.map((option, index) => (
            <AnswerButton
              key={index}
              option={option}
              isAnswered={isAnswered}
              isCorrect={option === question.correctAnswer}
              isSelected={option === selectedAnswer}
              classname='mb-3'
              onSelect={onAnswerSelect}
            />
          ))}
        </div>
      </>
    );
  }
);

GameQuestion.displayName = 'GameQuestion';

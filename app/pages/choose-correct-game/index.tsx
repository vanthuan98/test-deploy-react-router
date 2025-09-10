import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  GameLayout,
  LoadingScreen,
  GameCompletedScreen,
  GameQuestionComponent,
} from '../../components/game';
import { useGameQuestions, useLearnedWords } from '../../hooks';
import type { GameQuestion as GameQuestionType } from '../../hooks';

const ChooseCorrectSentenceGamePage = () => {
  const [questions, setQuestions] = useState<GameQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const { generateSentenceQuestions } = useGameQuestions();
  const { addLearnedWord } = useLearnedWords();

  // Initialize game
  const initializeGame = useCallback(() => {
    const gameQuestions = generateSentenceQuestions();
    setQuestions(gameQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setGameCompleted(false);
  }, [generateSentenceQuestions]);

  // Handle selecting an answer
  const handleAnswerSelect = useCallback(
    (selected: string) => {
      if (isAnswered) return;

      setSelectedAnswer(selected);
      setIsAnswered(true);

      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = selected === currentQuestion.correctAnswer;

      if (isCorrect) {
        setScore(prev => prev + 1);
        // Save learned word to local storage
        addLearnedWord(currentQuestion.word.word);
      }

      // Move to next question after delay
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setSelectedAnswer(null);
          setIsAnswered(false);
        } else {
          setGameCompleted(true);
        }
      }, 500);
    },
    [isAnswered, questions, currentQuestionIndex, addLearnedWord]
  );

  // Initialize on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Memoize current question
  const currentQuestion = useMemo(() => {
    return questions[currentQuestionIndex];
  }, [questions, currentQuestionIndex]);

  if (questions.length === 0) {
    return (
      <GameLayout>
        <LoadingScreen />
      </GameLayout>
    );
  }

  if (gameCompleted) {
    return (
      <GameLayout>
        <GameCompletedScreen
          score={score}
          totalQuestions={questions.length}
          onRestart={initializeGame}
        />
      </GameLayout>
    );
  }

  return (
    <div className='w-full px-5'>
      <GameQuestionComponent
        question={currentQuestion}
        isAnswered={isAnswered}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={handleAnswerSelect}
        gameType='sentence'
      />

      <div className='text-center'>
        <p className='font-light text-base'>
          Điểm: {score} | Câu: {currentQuestionIndex + 1}/{questions.length}
        </p>
      </div>
    </div>
  );
};

export default ChooseCorrectSentenceGamePage;

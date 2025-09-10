import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  GameLayout,
  LoadingScreen,
  GameCompletedScreen,
  FillInTheBlankQuestion,
} from '../../components/game';
import { useGameQuestions, useLearnedWords } from '../../hooks';
import type { FillInTheBlankQuestion as FillInTheBlankQuestionType } from '../../hooks';

const FillInTheBlankGamePage = () => {
  const [questions, setQuestions] = useState<FillInTheBlankQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const { generateFillInTheBlankQuestions } = useGameQuestions();
  const { addLearnedWord } = useLearnedWords();

  // Khởi tạo game
  const initializeGame = useCallback(() => {
    const gameQuestions = generateFillInTheBlankQuestions();
    setQuestions(gameQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setGameCompleted(false);
  }, [generateFillInTheBlankQuestions]);

  // Xử lý chọn đáp án
  const handleAnswerSelect = useCallback(
    (selectedWord: string) => {
      if (isAnswered) return;

      setSelectedAnswer(selectedWord);
      setIsAnswered(true);

      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = selectedWord === currentQuestion.correctAnswer;

      if (isCorrect) {
        setScore(prev => prev + 1);
        // Lưu từ đã học vào localStorage
        addLearnedWord(currentQuestion.word.word);
      }

      // Chuyển câu hỏi tiếp theo sau 0.5 giây
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

  // Khởi tạo game khi component mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Memoize current question
  const currentQuestion = useMemo(() => {
    return questions[currentQuestionIndex];
  }, [questions, currentQuestionIndex]);

  // Loading state
  if (questions.length === 0) {
    return (
      <GameLayout>
        <LoadingScreen />
      </GameLayout>
    );
  }

  // Game completed state
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
    <FillInTheBlankQuestion
      question={currentQuestion}
      onAnswerSelect={handleAnswerSelect}
      selectedAnswer={selectedAnswer}
      isAnswered={isAnswered}
    />
  );
};

export default FillInTheBlankGamePage;

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  GameLayout,
  LoadingScreen,
  GameCompletedScreen,
  GameQuestionComponent,
} from '../../components/game';
import { useGameQuestions, useLearnedWords } from '../../hooks';
import type { GameQuestion as GameQuestionType } from '../../hooks';

const ChooseCorrectMeaningGamePage = () => {
  const [questions, setQuestions] = useState<GameQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const { generateQuestions } = useGameQuestions();
  const { addLearnedWord } = useLearnedWords();

  // Khởi tạo game
  const initializeGame = useCallback(() => {
    const gameQuestions = generateQuestions();
    setQuestions(gameQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setGameCompleted(false);
  }, [generateQuestions]);

  // Xử lý chọn đáp án
  const handleAnswerSelect = useCallback(
    (selectedMeaning: string) => {
      if (isAnswered) return;

      setSelectedAnswer(selectedMeaning);
      setIsAnswered(true);

      const currentQuestion = questions[currentQuestionIndex];
      const isCorrect = selectedMeaning === currentQuestion.correctAnswer;

      if (isCorrect) {
        setScore(prev => prev + 1);
        // Lưu từ đã học vào localStorage
        addLearnedWord(currentQuestion.word.word);
      }

      // Chuyển câu hỏi tiếp theo sau 500ms
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
    <GameLayout>
      <div className='w-full max-w-md'>
        <GameQuestionComponent
          question={currentQuestion}
          isAnswered={isAnswered}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          gameType='meaning'
        />

        <div className='text-center'>
          <p className='font-light text-base'>
            Điểm: {score} | Câu: {currentQuestionIndex + 1}/{questions.length}
          </p>
        </div>
      </div>
    </GameLayout>
  );
};

export default ChooseCorrectMeaningGamePage;

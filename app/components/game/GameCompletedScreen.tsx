import React, { useMemo } from 'react';

interface GameCompletedScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const GameCompletedScreen: React.FC<GameCompletedScreenProps> =
  React.memo(({ score, totalQuestions, onRestart }) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    const message = useMemo(() => {
      if (percentage >= 90) return 'Xuất sắc! 🎉';
      if (percentage >= 70) return 'Tốt lắm! 👍';
      if (percentage >= 50) return 'Khá đấy! 😊';
      return 'Cần cố gắng thêm! 💪';
    }, [percentage]);

    return (
      <div className='text-center'>
        <h2 className='font-bold text-2xl mb-4'>Hoàn thành trò chơi!</h2>
        <p className='text-lg mb-2'>
          Điểm số của bạn: {score}/{totalQuestions}
        </p>
        <p className='text-lg mb-4 text-gray-600'>{message}</p>
        <button
          onClick={onRestart}
          className='bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-colors duration-200'
        >
          Chơi lại
        </button>
      </div>
    );
  });

GameCompletedScreen.displayName = 'GameCompletedScreen';

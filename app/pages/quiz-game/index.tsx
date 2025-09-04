import Header from '../../components/common/Header';
import ActionButton from '../../components/common/ActionButton';
import BottomMenu from '../../components/common/BottomMenu';
import { useNavigate } from 'react-router';

const QuizGamePage = () => {
  // Hàm xử lý click cho từng chế độ
  const navigate = useNavigate();
  const handleChooseMeaning = () => {
    navigate('/quiz-game/choose-correct-meaning-game');
  };
  const handleChooseWord = () => {
    navigate('/quiz-game/choose-correct-word-game');
  };
  const handleFillMissing = () => {
    navigate('/quiz-game/fill-in-the-blank-game');
  };
  const handleChooseCorrect = () => {
    navigate('/quiz-game/choose-correct-game');
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <Header />
      <div className='flex flex-col items-center justify-center h-[calc(100vh-72px-96px)]'>
        <div className='text-center mb-4'>
          <h2 className='font-bold text-2xl mb-2'>Quiz Game</h2>
          <div className='text-lg font-semibold mb-8'>Chọn chế độ chơi</div>
        </div>
        <div className='w-full flex flex-col gap-6 px-4'>
          <ActionButton
            label='Chọn nghĩa đúng'
            onClick={handleChooseMeaning}
            color='#1857F7'
          />
          <ActionButton
            label='Chọn từ đúng'
            onClick={handleChooseWord}
            color='#74247A'
          />
          <ActionButton
            label='Điền từ thiếu'
            onClick={handleFillMissing}
            color='#FB2C36'
          />
          <ActionButton
            label='Chọn câu đúng'
            onClick={handleChooseCorrect}
            color='#FFC700'
          />
        </div>
      </div>
      {/* Bottom Menu */}
      <BottomMenu />
    </div>
  );
};

export default QuizGamePage;

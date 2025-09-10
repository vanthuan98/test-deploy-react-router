import StatisticCard from '../../components/common/StatisticCard';
import { useStreak } from '../../hooks';
import { useLearnedWords } from '../../hooks';
import wordsData from '../../assets/data/words.json';

// Analyze page UI replicating provided design
const AnalyzePage = () => {
  const { currentStreak } = useStreak();
  const { learnedWords } = useLearnedWords();
  return (
    <div className='w-full h-full px-5 pt-5'>
      <div className='mb-6'>
        <StatisticCard
          value={currentStreak || 0}
          label='Ngày học liên tục'
          bgColor='#D7C3FF'
          textColor='#000000'
        />
      </div>

      <div className='grid grid-cols-2 gap-5'>
        <StatisticCard
          value={learnedWords.length}
          label='Từ đã học'
          bgColor='#F7B0B0'
          textColor='#000000'
        />
        <StatisticCard
          value={wordsData.length}
          label='Tổng số từ'
          bgColor='#B0F7D5'
          textColor='#000000'
        />
      </div>
    </div>
  );
};

export default AnalyzePage;

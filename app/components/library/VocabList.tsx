import React from 'react';
import InfiniteList from '../../components/common/InfiniteList';
import { useInfiniteScroll } from '../../hooks';
import { useLearnedWords } from '../../hooks/useLearnedWords';
import wordsData from '../../assets/data/words.json';

interface VocabListProps {
  data: typeof wordsData;
}

/**
 * Virtualized-like infinite list for vocabulary items, with learned badge.
 */
const VocabList: React.FC<VocabListProps> = ({ data }) => {
  const { items, hasMore, sentinelRef } = useInfiniteScroll(data, {
    batchSize: 20,
  });
  const { isWordLearned } = useLearnedWords();

  return (
    <div className='no-scrollbar'>
      <InfiniteList
        className=''
        items={items}
        hasMore={hasMore}
        sentinelRef={sentinelRef}
        renderItem={item => {
          const learned = isWordLearned(item.word);
          return (
            <div
              key={item.word + item.pronunciation}
              className={`${learned ? 'bg-[#FFF5B8]' : 'bg-gray-200'} p-4 mb-3 border-1 border-black`}
              style={{ boxShadow: '2px 4px 0px 0px #000' }}
            >
              <div className='flex items-center justify-between'>
                <div>
                  <div
                    className={`text-base font-bold tracking-wide ${learned ? 'text-[#74247A]' : ''}`}
                  >
                    {item.word}
                  </div>
                  <div className='text-xs mt-1'>{item.meaning}</div>
                </div>
                <div>
                  <span
                    className={`px-4 py-1 rounded-full border-1 border-black text-xs font-semibold whitespace-nowrap ${learned ? 'bg-green-100' : 'bg-white'}`}
                    style={{ boxShadow: '1px 2px 0px 0px #000' }}
                  >
                    {learned ? 'Đã học' : 'Chưa học'}
                  </span>
                </div>
              </div>
            </div>
          );
        }}
      />
      {!items.length && (
        <div className='text-center text-sm text-gray-600 py-10'>
          No results
        </div>
      )}
      <div ref={sentinelRef} />
    </div>
  );
};

export default VocabList;

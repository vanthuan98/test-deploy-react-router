import React, { useMemo, useState } from 'react';
import SearchBar, {
  type LibraryStatus,
} from '../../components/library/SearchBar';
import VocabList from '../../components/library/VocabList';
import wordsData from '../../assets/data/words.json';
import { useLearnedWords } from '../../hooks/useLearnedWords';

/**
 * Library page shows full vocabulary list with a search box
 * and learned status. Users can quickly find a word.
 */
const LibraryPage = () => {
  const [query, setQuery] = useState('');
  const { isWordLearned } = useLearnedWords();
  const [status, setStatus] = useState<LibraryStatus>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const byQuery = q
      ? wordsData.filter(w =>
          [w.word]
            .filter(Boolean)
            .some(v => String(v).toLowerCase().includes(q))
        )
      : wordsData.slice(0, 3000);
    if (status === 'all') return byQuery;
    if (status === 'learned') return byQuery.filter(w => isWordLearned(w.word));
    return byQuery.filter(w => !isWordLearned(w.word));
  }, [query, status, isWordLearned]);

  return (
    <div className='w-full h-full px-5 pt-5'>
      <div className='pb-5'>
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          status={status}
          onStatusChange={setStatus}
        />
      </div>

      <div className='pb-28'>
        <VocabList data={filtered} />
      </div>
    </div>
  );
};

export default LibraryPage;

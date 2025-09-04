import { useState, useEffect, useCallback } from 'react';

export interface LearnedWord {
  word: string;
  learnedAt: string;
  correctCount: number;
}

export const useLearnedWords = () => {
  const [learnedWords, setLearnedWords] = useState<LearnedWord[]>([]);

  // Load learned words từ localStorage khi component mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('learnedWords');
      if (stored) {
        setLearnedWords(JSON.parse(stored));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error loading learned words:', error);
    }
  }, []);

  // Lưu learned words vào localStorage
  const saveLearnedWords = useCallback((words: LearnedWord[]) => {
    try {
      localStorage.setItem('learnedWords', JSON.stringify(words));
      setLearnedWords(words);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error saving learned words:', error);
    }
  }, []);

  // Thêm từ mới vào learned words
  const addLearnedWord = useCallback(
    (word: string) => {
      const existingWord = learnedWords.find(w => w.word === word);

      if (existingWord) {
        // Cập nhật số lần trả lời đúng
        const updatedWords = learnedWords.map(w =>
          w.word === word ? { ...w, correctCount: w.correctCount + 1 } : w
        );
        saveLearnedWords(updatedWords);
      } else {
        // Thêm từ mới
        const newWord: LearnedWord = {
          word,
          learnedAt: new Date().toISOString(),
          correctCount: 1,
        };
        saveLearnedWords([...learnedWords, newWord]);
      }
    },
    [learnedWords, saveLearnedWords]
  );

  // Kiểm tra từ đã học chưa
  const isWordLearned = useCallback(
    (word: string) => {
      return learnedWords.some(w => w.word === word);
    },
    [learnedWords]
  );

  // Reset learned words
  const resetLearnedWords = useCallback(() => {
    try {
      localStorage.removeItem('learnedWords');
      setLearnedWords([]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error resetting learned words:', error);
    }
  }, []);

  return {
    learnedWords,
    addLearnedWord,
    isWordLearned,
    resetLearnedWords,
  };
};

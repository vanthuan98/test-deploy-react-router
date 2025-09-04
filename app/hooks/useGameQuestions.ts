import { useCallback } from 'react';
import wordsData from '../assets/data/words.json';
import { useLearnedWords } from './useLearnedWords';

export interface Word {
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
  level: string;
}

export interface GameQuestion {
  word: Word;
  options: string[];
  correctAnswer: string;
}

// Interface cho câu hỏi điền từ còn thiếu
export interface FillInTheBlankQuestion {
  word: Word;
  sentence: string; // Câu có chỗ trống
  blankPosition: number; // Vị trí của chỗ trống trong câu
  correctAnswer: string; // Từ cần điền
  options: string[]; // Các lựa chọn để điền
}

export const useGameQuestions = () => {
  const { isWordLearned } = useLearnedWords();

  const generateQuestions = useCallback((): GameQuestion[] => {
    try {
      // Lọc ra các từ chưa học
      const unlearnedWords = wordsData.filter(
        word => !isWordLearned(word.word)
      );

      // Nếu không đủ 10 từ chưa học, lấy tất cả từ
      const availableWords =
        unlearnedWords.length >= 10 ? unlearnedWords : wordsData;

      const shuffledWords = [...availableWords]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

      return shuffledWords.map(word => {
        const otherWords = wordsData.filter(w => w.word !== word.word);
        const randomWrongMeanings = otherWords
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(w => w.meaning);

        const options = [word.meaning, ...randomWrongMeanings];
        const shuffledOptions = options.sort(() => Math.random() - 0.5);

        return {
          word,
          options: shuffledOptions,
          correctAnswer: word.meaning,
        };
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error generating questions:', error);
      return [];
    }
  }, [isWordLearned]);

  // Generate questions for choose correct word game
  const generateWordQuestions = useCallback((): GameQuestion[] => {
    try {
      // Lọc ra các từ chưa học
      const unlearnedWords = wordsData.filter(
        word => !isWordLearned(word.word)
      );

      // Nếu không đủ 10 từ chưa học, lấy tất cả từ
      const availableWords =
        unlearnedWords.length >= 10 ? unlearnedWords : wordsData;

      const shuffledWords = [...availableWords]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

      return shuffledWords.map(word => {
        const otherWords = wordsData.filter(w => w.word !== word.word);
        const randomWrongWords = otherWords
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(w => w.word);

        const options = [word.word, ...randomWrongWords];
        const shuffledOptions = options.sort(() => Math.random() - 0.5);

        return {
          word,
          options: shuffledOptions,
          correctAnswer: word.word,
        };
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error generating word questions:', error);
      return [];
    }
  }, [isWordLearned]);

  // Generate questions for fill in the blank game
  const generateFillInTheBlankQuestions =
    useCallback((): FillInTheBlankQuestion[] => {
      try {
        // Lọc ra các từ chưa học có example sentence
        const unlearnedWords = wordsData.filter(
          word =>
            !isWordLearned(word.word) &&
            word.example &&
            word.example.trim() !== ''
        );

        // Nếu không đủ 10 từ chưa học, lấy tất cả từ có example
        const availableWords =
          unlearnedWords.length >= 10
            ? unlearnedWords
            : wordsData.filter(
                word => word.example && word.example.trim() !== ''
              );

        const shuffledWords = [...availableWords]
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);

        return shuffledWords.map(word => {
          // Tạo câu có chỗ trống bằng cách thay thế từ cần điền bằng "_____"
          const sentence = word.example.replace(
            new RegExp(`\\b${word.word}\\b`, 'gi'),
            '_____'
          );

          // Tìm vị trí của chỗ trống trong câu
          const blankPosition = sentence.indexOf('_____');

          // Tạo các lựa chọn sai từ các từ khác
          const otherWords = wordsData.filter(w => w.word !== word.word);
          const randomWrongWords = otherWords
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(w => w.word);

          const options = [word.word, ...randomWrongWords];
          const shuffledOptions = options.sort(() => Math.random() - 0.5);

          return {
            word,
            sentence,
            blankPosition,
            correctAnswer: word.word,
            options: shuffledOptions,
          };
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error generating fill in the blank questions:', error);
        return [];
      }
    }, [isWordLearned]);

  // Generate questions for choose correct sentence game
  // Question: exampleMeaning, Answers: example (sentences)
  const generateSentenceQuestions = useCallback((): GameQuestion[] => {
    try {
      const unlearnedWords = wordsData.filter(
        word =>
          !isWordLearned(word.word) &&
          word.example &&
          word.exampleMeaning &&
          word.example.trim() !== '' &&
          word.exampleMeaning.trim() !== ''
      );

      const availableWords =
        unlearnedWords.length >= 10
          ? unlearnedWords
          : wordsData.filter(
              word =>
                word.example &&
                word.exampleMeaning &&
                word.example.trim() !== '' &&
                word.exampleMeaning.trim() !== ''
            );

      const shuffledWords = [...availableWords]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

      return shuffledWords.map(word => {
        const otherWords = wordsData.filter(w => w.word !== word.word);
        const randomWrongExamples = otherWords
          .filter(w => w.example && w.example.trim() !== '')
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(w => w.example);

        const options = [word.example, ...randomWrongExamples];
        const shuffledOptions = options.sort(() => Math.random() - 0.5);

        return {
          word,
          options: shuffledOptions,
          correctAnswer: word.example,
        };
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error generating sentence questions:', error);
      return [];
    }
  }, [isWordLearned]);

  return {
    generateQuestions,
    generateWordQuestions,
    generateFillInTheBlankQuestions,
    generateSentenceQuestions,
  };
};

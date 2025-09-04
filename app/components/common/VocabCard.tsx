import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface Vocab {
  word: string;
  pronunciation: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
}

interface VocabCardProps {
  vocab: Vocab;
}

// Thẻ hiển thị từ vựng, phiên âm, nghĩa, ví dụ
const VocabCard: React.FC<VocabCardProps> = ({ vocab }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Slide In animation mỗi khi vocab thay đổi
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }
      );
    }
  }, [vocab]);

  return (
    <div
      ref={cardRef}
      className='bg-white p-8 border-4 border-black mb-8'
      style={{
        boxShadow: '2px 4px 0px 0px #000',
        perspective: 800,
      }}
    >
      <h2
        className='text-2xl font-black text-center mb-2'
        style={{ color: '#FFC700' }}
      >
        {vocab.word}
      </h2>
      <div className='text-center text-base mb-2' style={{ color: '#74247A' }}>
        {vocab.pronunciation}
      </div>
      <div
        className='text-center text-base font-bold mb-4'
        style={{ color: '#74247A' }}
      >
        {vocab.meaning}
      </div>
      <div className='text-center text-base mb-2'>"{vocab.example}"</div>
      <div className='text-center text-base' style={{ color: '#74247A' }}>
        "{vocab.exampleMeaning}"
      </div>
    </div>
  );
};

export default VocabCard;

import { useEffect, useRef, useState } from 'react';
import { useStreak } from '../../hooks';
import VocabCard from '../../components/common/VocabCard';
import wordsData from '../../assets/data/words.json';

export function meta({}: Record<string, unknown>) {
  return [
    { title: 'Vocabulary Master' },
    { name: 'description', content: 'Vocabulary Master' },
  ];
}

const TIME_REMAINING = 7;

const HomePage = () => {
  const { markStudiedToday } = useStreak();
  // State cho random từ vựng
  const [currentWord, setCurrentWord] = useState<(typeof wordsData)[0] | null>(
    null
  );

  // State cho float button position
  const [floatButtonPosition, setFloatButtonPosition] = useState({
    x: 50,
    y: 700, // Vị trí mặc định, sẽ được cập nhật sau
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragDistance = useRef(0);

  // State cho progress bar đếm ngược
  const [timeRemaining, setTimeRemaining] = useState(TIME_REMAINING);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Hàm random 1 từ mới
  const randomWord = () => {
    let idx = Math.floor(Math.random() * wordsData.length);
    // Đảm bảo không random lại đúng từ cũ
    while (
      currentWord &&
      wordsData[idx].word === currentWord.word &&
      wordsData.length > 1
    ) {
      idx = Math.floor(Math.random() * wordsData.length);
    }
    setCurrentWord(wordsData[idx]);
  };

  // Xử lý khi nhấn Bắt đầu học
  const handleStart = () => {
    randomWord();
    // Reset progress bar
    setTimeRemaining(TIME_REMAINING);

    // Start progress countdown
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    progressIntervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          randomWord();
          return TIME_REMAINING; // Reset về 7 giây
        }
        return prev - 1;
      });
    }, 1000);

    // Đánh dấu đã học hôm nay để tính streak
    markStudiedToday();
  };

  // Xử lý khi nhấn Tiếp theo
  const handleNext = () => {
    // Start progress countdown
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    // Reset progress bar
    setTimeRemaining(TIME_REMAINING);

    // Start learning
    handleStart();
  };

  // Xử lý click với kiểm tra drag
  const handleButtonClick = () => {
    // Chỉ xử lý click nếu không phải drag
    if (dragDistance.current < 5) {
      handleNext();
    }
  };

  // Xử lý drag start (mouse)
  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - floatButtonPosition.x,
      y: e.clientY - floatButtonPosition.y,
    };
    dragDistance.current = 0;
  };

  // Xử lý drag move (mouse)
  const handleDragMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      const newX = e.clientX - dragStartPos.current.x;
      const newY = e.clientY - dragStartPos.current.y;

      // Tính khoảng cách di chuyển
      dragDistance.current = Math.sqrt(newX * newX + newY * newY);

      // Giới hạn vị trí trong khung hình
      const buttonSize = 64; // w-16 = 64px
      const maxX = window.innerWidth - buttonSize / 2;
      const maxY = window.innerHeight - buttonSize / 2;
      const minX = buttonSize / 2;
      const minY = buttonSize / 2;

      const constrainedX = Math.max(minX, Math.min(maxX, newX));
      const constrainedY = Math.max(minY, Math.min(maxY, newY));

      setFloatButtonPosition({
        x: constrainedX,
        y: constrainedY,
      });
    }
  };

  // Xử lý drag end (mouse)
  const handleDragEnd = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Xử lý drag start (touch)
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    dragStartPos.current = {
      x: touch.clientX - floatButtonPosition.x,
      y: touch.clientY - floatButtonPosition.y,
    };
    dragDistance.current = 0;
  };

  // Xử lý drag move (touch)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      e.preventDefault();
      const touch = e.touches[0];
      const newX = touch.clientX - dragStartPos.current.x;
      const newY = touch.clientY - dragStartPos.current.y;

      // Tính khoảng cách di chuyển
      dragDistance.current = Math.sqrt(newX * newX + newY * newY);

      // Giới hạn vị trí trong khung hình
      const buttonSize = 64; // w-16 = 64px
      const maxX = window.innerWidth - buttonSize / 2;
      const maxY = window.innerHeight - buttonSize / 2;
      const minX = buttonSize / 2;
      const minY = buttonSize / 2;

      const constrainedX = Math.max(minX, Math.min(maxX, newX));
      const constrainedY = Math.max(minY, Math.min(maxY, newY));

      setFloatButtonPosition({
        x: constrainedX,
        y: constrainedY,
      });
    }
  };

  // Xử lý drag end (touch)
  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Tự động start sau khi render xong UI
  useEffect(() => {
    if (!currentWord) {
      const idx = Math.floor(Math.random() * wordsData.length);
      setCurrentWord(wordsData[idx]);
    }

    // Tự động start learning sau khi render xong
    handleStart();

    // Set vị trí button sau khi component mount
    setFloatButtonPosition({
      x: 50,
      y: window.innerHeight - 150, // Cách bottom 150px
    });

    return () => {
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Thêm event listeners cho drag & drop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStartPos.current.x;
        const newY = e.clientY - dragStartPos.current.y;

        // Giới hạn vị trí trong khung hình
        const buttonSize = 64;
        const maxX = window.innerWidth - buttonSize / 2;
        const maxY = window.innerHeight - buttonSize / 2;
        const minX = buttonSize / 2;
        const minY = buttonSize / 2;

        const constrainedX = Math.max(minX, Math.min(maxX, newX));
        const constrainedY = Math.max(minY, Math.min(maxY, newY));

        setFloatButtonPosition({
          x: constrainedX,
          y: constrainedY,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Xử lý window resize để đảm bảo button luôn trong khung hình
  useEffect(() => {
    const handleResize = () => {
      const buttonSize = 64;
      const maxX = window.innerWidth - buttonSize / 2;
      const maxY = window.innerHeight - buttonSize / 2;
      const minX = buttonSize / 2;
      const minY = buttonSize / 2;

      // Kiểm tra và điều chỉnh vị trí nếu button nằm ngoài khung hình
      if (floatButtonPosition.x > maxX) {
        setFloatButtonPosition(prev => ({ ...prev, x: maxX }));
      }
      if (floatButtonPosition.x < minX) {
        setFloatButtonPosition(prev => ({ ...prev, x: minX }));
      }
      if (floatButtonPosition.y > maxY) {
        setFloatButtonPosition(prev => ({ ...prev, y: maxY }));
      }
      if (floatButtonPosition.y < minY) {
        setFloatButtonPosition(prev => ({ ...prev, y: minY }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [floatButtonPosition]);

  return (
    <div className='w-full'>
      {/* Progress Bar đếm ngược */}
      <div className='px-5 py-3 bg-gray-100'>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-sm font-medium text-gray-700'>
            Từ tiếp theo sau:
          </span>
          <span className='text-sm font-bold text-blue-600'>
            {timeRemaining}s
          </span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div
            className='bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-linear'
            style={{
              width: `${(timeRemaining / TIME_REMAINING) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <div className='h-[calc(100vh-228px)] flex justify-center flex-col'>
        <div className='mx-5'>
          {/* Vocab Card */}
          {currentWord ? (
            <VocabCard vocab={currentWord} />
          ) : (
            <div className='flex justify-center items-center h-40'>
              Loading...
            </div>
          )}
        </div>
      </div>

      {/* Float Button - Tiếp theo */}
      <div
        className='fixed z-1000 cursor-move select-none touch-none'
        style={{
          left: `${floatButtonPosition.x}px`,
          top: `${floatButtonPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleButtonClick}
      >
        <button
          onTouchEnd={handleButtonClick}
          className='bg-blue-500 hover:bg-blue-600 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center text-sm font-semibold transition-all duration-200 hover:scale-110 active:scale-95'
          style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
        >
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default HomePage;

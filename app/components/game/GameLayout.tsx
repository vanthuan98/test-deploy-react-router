import React from 'react';
import Header from '../common/Header';
import BottomMenu from '../common/BottomMenu';

interface GameLayoutProps {
  children: React.ReactNode;
}

export const GameLayout: React.FC<GameLayoutProps> = ({ children }) => (
  <div className='min-h-screen bg-white'>
    <Header />
    <div className='flex flex-col items-center justify-center h-[calc(100vh-72px-96px)] px-4'>
      {children}
    </div>
    <BottomMenu />
  </div>
);

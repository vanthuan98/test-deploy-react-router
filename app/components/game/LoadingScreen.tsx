import React from 'react';

export const LoadingScreen: React.FC = () => (
  <div className='text-center'>
    <h2 className='font-bold text-2xl mb-4'>Loading...</h2>
    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto'></div>
  </div>
);

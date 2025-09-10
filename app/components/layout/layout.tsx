import React from 'react';
import { Outlet } from 'react-router';
import BottomMenu from '../common/BottomMenu';
import Header from '../common/Header';

const Layout = () => {
  return (
    <div>
      <Header />
      <div className='flex flex-col items-center justify-center h-[calc(100vh-72px-96px)] bg-white'>
        <Outlet />
      </div>
      <BottomMenu />
    </div>
  );
};

export default Layout;

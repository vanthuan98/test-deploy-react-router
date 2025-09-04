import React from 'react';
import { NavLink, useLocation } from 'react-router';
import MenuBottom1 from '../icon/MenuBottom1';
import MenuBottom2 from '../icon/MenuBottom2';
import MenuBottom3 from '../icon/MenuBottom3';
import MenuBottom4 from '../icon/MenuBottom4';

const menus = [
  {
    path: '/',
    includePaths: ['/'],
    icon: <MenuBottom1 />,
  },
  {
    path: '/quiz-game',
    includePaths: [
      '/quiz-game',
      '/quiz-game/choose-correct-meaning-game',
      '/quiz-game/choose-correct-word-game',
      '/quiz-game/fill-in-the-blank-game',
      '/quiz-game/choose-correct-game',
    ],
    icon: <MenuBottom2 />,
  },
  {
    path: '/analyze',
    includePaths: ['/analyze'],
    icon: <MenuBottom3 />,
  },
  {
    path: '/library',
    includePaths: ['/library'],
    icon: <MenuBottom4 />,
  },
];

const BottomMenu: React.FC = () => {
  // Lấy path hiện tại từ hook useLocation
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      className='w-full flex justify-between items-center pb-5'
      style={{
        position: 'fixed',
        left: 0,
        bottom: 0,
        background: '#74247A',
        zIndex: 50,
      }}
    >
      {menus.map((menu, idx) => {
        // Kiểm tra nếu path trùng thì highlight icon
        const isActive = menu.includePaths.some(path => path === currentPath);
        // Clone icon và truyền prop color
        const Icon = React.cloneElement(menu.icon, {
          color: isActive ? '#FFC700' : 'white',
        });
        return (
          <NavLink
            key={idx}
            to={menu.path}
            className='flex-1 flex flex-col items-center py-5'
            style={{ textDecoration: 'none' }}
          >
            {Icon}
          </NavLink>
        );
      })}
    </div>
  );
};

export default BottomMenu;

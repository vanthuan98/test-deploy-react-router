import React from 'react';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
}

// Nút hành động lớn: Bắt đầu học/Dừng
const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  color = '#FB2C36',
  disabled,
}) => {
  return (
    <button
      className='w-full font-black py-4 border-4 border-black text-lg'
      style={{
        background: color,
        color: '#fff',
        boxShadow: '2px 4px 0px 0px #000',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s',
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ActionButton;

import React from 'react';

interface StatisticCardProps {
  value: number | string;
  label: string;
  bgColor: string;
  textColor?: string;
}

// Thẻ thống kê, dùng cho Tổng từ, Đã học, Chuỗi ngày
const StatisticCard: React.FC<StatisticCardProps> = ({
  value,
  label,
  bgColor,
  textColor = '#fff',
}) => {
  return (
    <div
      className='p-4 border-2 border-black'
      style={{
        background: bgColor,
        color: textColor,
        boxShadow: '2px 4px 0px 0px #000',
        fontFamily: 'Lexend Mega, sans-serif',
      }}
    >
      <div className='text-xl font-black'>{value}</div>
      <div className='text-sm font-bold uppercase tracking-wide'>{label}</div>
    </div>
  );
};

export default StatisticCard;

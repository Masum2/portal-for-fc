// components/dashboard/StatsCard.tsx
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  color,
  change,
  changeType 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
          {change && (
            <p className={`text-xs font-medium mt-2 ${
              changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {changeType === 'increase' ? '↑' : '↓'} {change}
            </p>
          )}
        </div>
        <div className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
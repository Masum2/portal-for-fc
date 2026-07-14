// components/dashboard/QuickActionCard.tsx
import React from 'react';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: string;
  color: string;
  onClick: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  icon,
  color,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 text-left border border-gray-100 hover:border-transparent overflow-hidden relative"
    >
      {/* Background Gradient Orbs */}
      <div className={`absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br ${color} opacity-10 rounded-full group-hover:opacity-20 transition-opacity duration-500`} />
      <div className={`absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-br ${color} opacity-5 rounded-full group-hover:opacity-15 transition-opacity duration-500 delay-100`} />
      
      <div className="relative z-10">
        <div className={`inline-block p-3.5 rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mt-4">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        <div className="mt-3 flex items-center text-xs font-medium text-blue-600 group-hover:text-blue-800">
          <span>Get Started</span>
          <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default QuickActionCard;
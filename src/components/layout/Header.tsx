// components/layout/Header.tsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  pageTitle: string;
  pageSubtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle, pageSubtitle }) => {
  const { user } = useAuth();

  // Get current date
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions);

  return (
    <header className="bg-white  shadow-sm p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {pageTitle}
          </h1>
          {pageSubtitle && (
            <p className="text-gray-500 text-sm mt-1">{pageSubtitle}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* Date */}
          <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-xl">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-gray-600">{formattedDate}</span>
          </div>

          {/* User Avatar - Small */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
              {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
// components/layout/Header.tsx
import React from "react";
import { useAuth } from "../../context/AuthContext";

interface HeaderProps {
  pageTitle: string;
  pageSubtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Left / Page Title */}
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            {pageTitle}
          </h1>
        </div>

        {/* Right / User Profile Info (যেমন ইমেজটিতে দেখা যাচ্ছে) */}
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">
              {user?.firstName && user?.lastName 
                ? `${user.firstName} ${user.lastName}` 
                : 'Sarah Karim'}
            </p>
          </div>
          
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm bg-gray-100 flex items-center justify-center">
            {user?.firstName ? (
              <span className="font-bold text-sm text-[#1e1e1e]">
                {user.firstName.charAt(0)}
              </span>
            ) : (
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
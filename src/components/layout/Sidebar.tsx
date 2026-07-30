// components/layout/Sidebar.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: '/dashboard'
    },
    {
      id: 'new-license',
      label: 'Apply New License',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      ),
      path: '/apply/new'
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
      path: '/documents'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      path: '/profile'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${!isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} onClick={() => setIsCollapsed(true)} />

      {/* ইমেজ অনুযায়ী ডার্ক ব্যাকগ্রাউন্ড (bg-[#1e1e1e]) */}
      <aside className={`fixed top-0 left-0 h-full bg-[#1e1e1e] shadow-2xl z-50 transition-all duration-300 flex flex-col ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`} style={{ width: '280px' }}>
        
        {/* Brand Logo - উপরের অংশ */}
        <div className="flex items-center space-x-3 px-6 py-6 border-b border-gray-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f58220] to-[#b33939] flex items-center justify-center shadow-md">
            <span className="text-white font-black text-lg">B</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">FosterCare Portal</h1>
          </div>
        </div>

        {/* Navigation - ইমেজ এর মতো একটিভ আইটেমে বাঁ পাশে কমলা বর্ডার বা ব্যাকগ্রাউন্ড */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => { navigate(item.path); setIsCollapsed(true); }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all relative ${
                  active 
                    ? 'text-[#f58220] font-semibold bg-white/5' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#f58220] rounded-r-full"></div>
                )}
                <span className={active ? 'text-[#f58220]' : 'text-gray-400'}>{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => logout()}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
// components/layout/Layout.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Get page title based on route
  const getPageInfo = () => {
    const path = location.pathname;
    const titles: Record<string, { title: string; subtitle: string }> = {
      '/dashboard': {
        title: 'Dashboard',
        subtitle: 'Overview of your foster care management'
      },
      '/apply/new': {
        title: 'New License Application',
        subtitle: 'Apply for a new foster care license'
      },
      '/apply/renew': {
        title: 'Renew License',
        subtitle: 'Renew your existing foster care license'
      },
      '/notes': {
        title: 'Messages',
        subtitle: 'Communicate with social workers'
      },
      '/documents': {
        title: 'Documents',
        subtitle: 'Manage your license documents'
      }
    };

    // Find matching route
    for (const [route, info] of Object.entries(titles)) {
      if (path.startsWith(route)) {
        return info;
      }
    }

    return {
      title: 'Foster Care Portal',
      subtitle: 'Welcome to your dashboard'
    };
  };

  const pageInfo = getPageInfo();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-[280px]">
        {/* Header */}
        <div className=" pb-0">
          <Header pageTitle={pageInfo.title} pageSubtitle={pageInfo.subtitle} />
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
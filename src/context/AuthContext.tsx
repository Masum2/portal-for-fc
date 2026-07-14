// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { currentUser } from '../data/dummyData';

interface AuthContextType {
  user: User | null;
  login: (loginId: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (loginId: string, password: string): Promise<boolean> => {
    // Dummy authentication
    if (loginId === currentUser.loginId && password === currentUser.password) {
      const userData = currentUser;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    } else {
      alert('Invalid credentials! Use: caregiver_john / password123');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
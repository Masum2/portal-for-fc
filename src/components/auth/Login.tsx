// components/auth/Login.tsx (Dual Column Version)
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await login(loginId, password);
      if (success) {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
backgroundImage: `url('https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`

        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-blue-900/50" />
      </div>

      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-6xl mx-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          
          {/* Left Side - Branding */}
          <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-600/40 to-indigo-700/40 backdrop-blur-sm text-white">
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-xl">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">FosterCare</h2>
                  <p className="text-blue-200 text-sm font-light">Management Portal</p>
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-4 leading-tight">
                Welcome Back to Your
                <br />
                <span className="text-blue-200">Foster Care Journey</span>
              </h1>
              <p className="text-blue-100 text-lg opacity-90 max-w-md">
                Manage your license applications, track renewals, and stay connected with social workers.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { icon: '✓', text: '24/7 Access to Your Dashboard' },
                { icon: '✓', text: 'Real-time Application Status' },
                { icon: '✓', text: 'Secure & Confidential' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <div className="lg:hidden text-center mb-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-bold">
                  FC
                </div>
                <span className="text-lg font-bold text-white">FosterCare</span>
              </div>
            </div>

            <div className="max-w-sm w-full mx-auto">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white">Welcome Back</h3>
                <p className="text-white/60 text-sm mt-1">Enter your credentials to access your dashboard</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">
                    Login ID
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-white/40 group-focus-within:text-blue-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={loginId}
                      onChange={(e) => setLoginId(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-white placeholder-white/30"
                      placeholder="Enter your login ID"
                      disabled={isLoading}
                      autoComplete="username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-white/40 group-focus-within:text-blue-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-white placeholder-white/30"
                      placeholder="Enter your password"
                      disabled={isLoading}
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white/20 rounded bg-white/5"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
                      Remember me
                    </label>
                  </div>
                  <button type="button" className="text-sm text-blue-300 hover:text-blue-200 font-medium transition">
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 rounded-xl text-white font-medium transition-all ${
                    isLoading 
                      ? 'bg-blue-500/50 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#ff6400] to-[#ff8c00] hover:from-[#e65a00] hover:to-[#cc4e00] shadow-orange-500/30 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Sign In
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-center">
                  <p className="text-xs text-white/40">
                    <span className="font-medium text-white/50">Demo Credentials:</span>
                  </p>
                  <div className="flex items-center justify-center space-x-2 mt-1.5 flex-wrap">
                    <span className="text-xs bg-white/10 px-3 py-1 rounded-lg text-white/70 font-mono">
                      caregiver_john
                    </span>
                    <span className="text-white/30">/</span>
                    <span className="text-xs bg-white/10 px-3 py-1 rounded-lg text-white/70 font-mono">
                      password123
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
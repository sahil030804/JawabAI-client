'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  console.log('Profile page - User:', user); // Debug log
  console.log('Profile page - Loading:', loading); // Debug log
  console.log('Profile page - User structure:', JSON.stringify(user, null, 2)); // Debug log

  useEffect(() => {
    console.log('Profile page useEffect - User:', user, 'Loading:', loading); // Debug log
    if (!loading && !user) {
      console.log('Profile page - Redirecting to login'); // Debug log
      router.push('/login');
    }
  }, [user, loading, router]);

  // Show success message on first load
  const [showSuccessMessage, setShowSuccessMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const handleLogout = async () => {
    await logout();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="relative z-10 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg border border-green-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <p className="text-green-300 font-semibold text-lg">Welcome back! Authentication successful.</p>
                  <p className="text-green-400 text-sm">You now have access to all AI-powered features</p>
                </div>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="text-green-400 hover:text-green-300 transition-colors p-2 rounded-lg hover:bg-green-500/10"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">WhatsApp AI Automation</span>
            </Link>
            
            <nav className="flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/10"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-red-500/10 border border-red-500/30"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Profile Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-purple-500/20">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">SYSTEM ONLINE</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome to Your AI Command Center
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Harness the power of artificial intelligence to automate your WhatsApp communications and scale your business exponentially.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-cyan-400 mb-2">10K+</div>
                <div className="text-sm text-gray-400">AI Messages</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                <div className="text-sm text-gray-400">AI Accuracy</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-pink-400 mb-2">24/7</div>
                <div className="text-sm text-gray-400">AI Support</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="text-3xl font-bold text-green-400 mb-2">∞</div>
                <div className="text-sm text-gray-400">Infinite Scale</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl overflow-hidden mb-8 border border-purple-500/20">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm p-8 border-b border-purple-500/20">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform">
                  <span className="text-5xl font-bold text-white">
                    {user?.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                    {user?.lastName ? user.lastName.charAt(0).toUpperCase() : ''}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-4 border-slate-900 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1">
                  <div className="w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
                  <div className="w-4 h-4 bg-cyan-400 rounded-full relative"></div>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">{user?.fullName || 'AI User'}</h1>
                <p className="text-purple-200 text-lg mb-4">{user?.email || 'user@ai-system.com'}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-sm font-medium text-purple-200 backdrop-blur-sm border border-purple-400/30">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    {user?.role === 'user' ? 'AI Premium User' : user?.role || 'AI User'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${user?.isActive !== false ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                    <span className="text-sm text-purple-200">
                      {user?.isActive !== false ? 'Neural Network Active' : 'System Offline'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-400/30">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-cyan-300 font-medium">AI ENABLED</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-purple-300 font-medium mb-1">ACTIVATION DATE</div>
                <div className="text-2xl font-bold text-white">{user?.createdAt ? formatDate(user.createdAt) : 'UNKNOWN'}</div>
                <div className="text-sm text-purple-400 mt-1">Member Since</div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Neural Interface Settings</h2>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center space-x-2 shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                <span>Upgrade Neural Profile</span>
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                  <label className="block text-sm font-medium text-purple-300 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                    User Identity
                  </label>
                  <p className="text-xl text-white font-semibold">{user?.fullName || 'Not configured'}</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                  <label className="block text-sm font-medium text-purple-300 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    Communication Channel
                  </label>
                  <p className="text-xl text-white font-semibold">{user?.email || 'Not configured'}</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                  <label className="block text-sm font-medium text-purple-300 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    Neural Connection
                  </label>
                  <p className="text-xl text-white font-semibold">{user?.phone || 'Not configured'}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                  <label className="block text-sm font-medium text-purple-300 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 4.293 6.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                    System Status
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${user?.isActive !== false ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                    <span className="text-xl font-semibold text-white">
                      {user?.isActive !== false ? 'Neural Network Online' : 'System Offline'}
                    </span>
                  </div>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                  <label className="block text-sm font-medium text-purple-300 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                    </svg>
                    First Activation
                  </label>
                  <p className="text-xl text-white font-semibold">{user?.createdAt ? formatDate(user.createdAt) : 'Unknown'}</p>
                </div>
                
                {user?.lastLoginAt && (
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                    <label className="block text-sm font-medium text-purple-300 mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9.417 13.707 6.293a1 1 0 00-1.414-1.414z" clipRule="evenodd"/>
                      </svg>
                      Last Neural Sync
                    </label>
                    <p className="text-xl text-white font-semibold">{formatDate(user.lastLoginAt)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">AI Command Center</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="group relative bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all transform hover:scale-105 hover:shadow-2xl">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Neural Broadcast</h3>
                <p className="text-gray-300 text-sm leading-relaxed">Deploy AI-powered message campaigns across multiple neural networks simultaneously</p>
                <div className="mt-6 flex items-center text-cyan-400 text-sm font-medium group-hover:text-cyan-300 transition-colors">
                  <span>Launch System</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
              </div>
            </button>
            
            <button className="group relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all transform hover:scale-105 hover:shadow-2xl">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Temporal Scheduler</h3>
                <p className="text-gray-300 text-sm leading-relaxed">Program AI messages with quantum timing precision across multiple timelines</p>
                <div className="mt-6 flex items-center text-purple-400 text-sm font-medium group-hover:text-purple-300 transition-colors">
                  <span>Configure Timeline</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
              </div>
            </button>
            
            <button className="group relative bg-gradient-to-br from-emerald-500/20 to-green-500/20 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 hover:from-emerald-500/30 hover:to-green-500/30 transition-all transform hover:scale-105 hover:shadow-2xl">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-400 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-6 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Quantum Analytics</h3>
                <p className="text-gray-300 text-sm leading-relaxed">Access multidimensional insights and predictive algorithms for campaign optimization</p>
                <div className="mt-6 flex items-center text-emerald-400 text-sm font-medium group-hover:text-emerald-300 transition-colors">
                  <span>View Insights</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
              </div>
            </button>
          </div>
          
          {/* Advanced Features */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">AI Model Status</h3>
                <div className="px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                  <span className="text-green-400 text-xs font-medium">OPTIMIZED</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Neural Network Accuracy</span>
                  <span className="text-cyan-400 font-medium">98.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Processing Speed</span>
                  <span className="text-purple-400 font-medium">0.3ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Active Connections</span>
                  <span className="text-pink-400 font-medium">1,247</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">System Performance</h3>
                <div className="px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">
                  <span className="text-cyan-400 text-xs font-medium">PEAK</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">CPU Usage</span>
                  <span className="text-emerald-400 font-medium">23%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Memory Allocation</span>
                  <span className="text-yellow-400 font-medium">4.2GB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">API Response Time</span>
                  <span className="text-green-400 font-medium">12ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

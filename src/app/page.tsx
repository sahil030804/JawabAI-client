'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const { user, loading } = useAuth();

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm interested in your services",
      sender: 'user',
      timestamp: '2:34 PM'
    }
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

const aiResponses = [
  "Hello! Welcome to our WhatsApp support. How can I help you today?",
  "We have 3 plans: Starter ($29/mo), Pro ($79/mo), Enterprise (Custom). Which fits your business best?",
  "The Pro plan is our most popular! It includes AI-powered replies, bulk messaging, and full API access. Want to see the full list?",
  "Great choice! You can start with a 14-day free trial - no credit card required. Ready to set up your first automation?",
];

const userQuestions = [
  "I'd like to know about your pricing plans.",
  "The Pro plan sounds interesting, what's included?",
  "That sounds perfect. How do I get started?",
  "Yes, I'm ready to start my free trial!"
];

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages, isTyping]);

  useEffect(() => {
    let isCancelled = false;

    const delay = (ms: number) =>
      new Promise(res => setTimeout(res, ms));

    const addMessage = (msg: any) => {
      if (!isCancelled) {
        setChatMessages(prev => [...prev, msg]);
      }
    };

    const runChat = async () => {
      // Stop if we run out of AI responses
if (currentStep >= aiResponses.length) return;

      // Step 0: Initial user message is already there, so AI responds first
      if (currentStep === 0) {
        // AI typing indicator
        setIsTyping(true);
        await delay(2000);

        if (isCancelled) return;

        // AI response
        addMessage({
          id: Date.now(),
          text: aiResponses[0],
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        });

        setIsTyping(false);
        setCurrentStep(1);
        await delay(1000);
      }

      // Step 1: User asks about pricing
      if (currentStep === 1 && !isCancelled) {
        await delay(2000); // Delay before user message
        
        addMessage({
          id: Date.now() + 1,
          text: userQuestions[0],
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        });

        await delay(1500);

        // AI typing indicator
        setIsTyping(true);
        await delay(2000);

        if (isCancelled) return;

        // AI responds with pricing
        addMessage({
          id: Date.now() + 2,
          text: aiResponses[1],
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        });

        setIsTyping(false);
        setCurrentStep(2);
        await delay(1000);
      }

      // Step 2: User asks about features
      if (currentStep === 2 && !isCancelled) {
        await delay(2000); // Delay before user message
        
        addMessage({
          id: Date.now() + 3,
          text: userQuestions[1],
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        });

        await delay(1500);

        // AI typing indicator
        setIsTyping(true);
        await delay(2000);

        if (isCancelled) return;

        // AI responds with features
        addMessage({
          id: Date.now() + 4,
          text: aiResponses[2],
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        });

        setIsTyping(false);
        setCurrentStep(3);
        await delay(1000);
      }

      // Step 3: User asks how to get started
      if (currentStep === 3 && !isCancelled) {
        await delay(2000); // Delay before user message
        
        addMessage({
          id: Date.now() + 5,
          text: userQuestions[2],
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        });

        await delay(1500);

        // AI typing indicator
        setIsTyping(true);
        await delay(2000);

        if (isCancelled) return;

        // AI responds with getting started
        addMessage({
          id: Date.now() + 6,
          text: aiResponses[3],
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        });

        setIsTyping(false);
        setCurrentStep(4);
        await delay(1000);
      }

      // Step 4: Final AI message
      if (currentStep === 4 && !isCancelled) {
        // AI typing indicator
        setIsTyping(true);
        await delay(2000);

        if (isCancelled) return;

        // AI final response
        addMessage({
          id: Date.now() + 7,
          text: aiResponses[4],
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        });

        setIsTyping(false);
        setCurrentStep(5); // Complete
      }
    };

    if (currentStep < 5) {
      runChat();
    }

    return () => {
      isCancelled = true;
    };
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Glassmorphism Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">WhatsApp AI Automation</span>
            </Link>
            <nav className="flex items-center space-x-6">
              {user ? (
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Start Free Trial
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Clean Tech Design */}
      <main className="pt-16">
        {/* Hero */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 mb-6 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>🚀 TRUSTED BY 5,000+ BUSINESSES</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontWeight: 800 }}>
                <span className="text-indigo-600">Automate WhatsApp Replies</span>
                <br />
                <span className="text-gray-900">in Seconds</span>
                <span className="text-2xl text-gray-500 block mt-2 font-normal">No Code Required</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed" style={{ lineHeight: 1.6 }}>
                Capture leads, reply instantly, and close more sales — all on autopilot. 
                Never miss a customer message again with AI-powered automation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/signup"
                  className="group px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-xl hover:shadow-indigo-500/25 flex items-center justify-center"
                  style={{ borderRadius: '12px' }}
                >
                  <span className="flex items-center">
                    Start Free Trial
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </span>
                </Link>
                <button
                  onClick={() => {
                    setChatMessages([{
                      id: 1,
                      text: "Hi! I'm interested in your services",
                      sender: 'user',
                      timestamp: '2:34 PM'
                    }]);
                    setCurrentStep(0);
                    setIsTyping(false);
                  }}
                  className="px-8 py-4 bg-white text-gray-900 rounded-xl text-lg font-semibold transition-all hover:bg-gray-50 border border-gray-300 hover:scale-105 flex items-center justify-center"
                  style={{ borderRadius: '12px' }}
                >
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
                    </svg>
                    Restart Chat
                  </span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>No Credit Card</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 .68-.056 1.35-.166 2.001A11.954 11.954 0 0110 18.056 11.954 11.954 0 012.166 8c-.11-.65-.166-1.32-.166-2.001 0-.68.056-1.35.166-2.001zm14.668 0A11.954 11.954 0 0110 18.056 11.954 11.954 0 0117.834 15c.11-.65.166-1.32.166-2.001 0-.68-.056-1.35-.166-2.001z" clipRule="evenodd"/>
                  </svg>
                  <span>14-Day Trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                  <span>Official API</span>
                </div>
              </div>
            </div>

            {/* Right Side - Classic WhatsApp Chat Demo */}
            <div className="relative">
              <div className="bg-[#ECE5DD] rounded-2xl shadow-2xl overflow-hidden" style={{ borderRadius: '16px' }}>
                {/* WhatsApp Header */}
                <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Support Team</h3>
                      <p className="text-green-300 text-xs flex items-center">
                        <span className="w-2 h-2 bg-green-300 rounded-full mr-1"></span>
                        Online
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="text-white/80 hover:text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                    </button>
                    <button className="text-white/80 hover:text-white">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Chat Messages */}
                <div 
                  ref={chatContainerRef}
                  className="bg-[#ECE5DD] p-4 space-y-2 max-h-80 overflow-y-auto"
                >
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-[#DCF8C6] text-gray-800'
                            : 'bg-white text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 px-4 py-2 rounded-2xl">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Chat Input */}
                <div className="bg-[#F0F2F5] px-4 py-2 flex items-center space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                    </svg>
                  </button>
                  <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="bg-transparent flex-1 outline-none text-sm text-gray-700"
                      disabled={isTyping}
                    />
                  </div>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"/>
                    </svg>
                  </button>
                  <button className="text-[#128C7E] hover:text-[#075E54]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Strip */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 mb-8 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="text-gray-700 font-medium">4.9/5 from 2,847 reviews</span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Trusted by 5,000+ Growing Businesses</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {['Shopify', 'Amazon', 'Etsy', 'Instagram'].map((brand) => (
                <div key={brand} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center justify-center" style={{ borderRadius: '12px' }}>
                  <span className="text-xl font-bold text-gray-600">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Are You Leaving Money on the Table?</h2>
            <p className="text-xl text-gray-600">Every missed message could be a lost sale</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-red-50 rounded-2xl p-8 border border-red-100" style={{ borderRadius: '16px' }}>
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Missing Customer Messages?</h3>
              <p className="text-gray-600">Every missed message = lost revenue</p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-100" style={{ borderRadius: '16px' }}>
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Slow Replies Losing Sales?</h3>
              <p className="text-gray-600">Customers buy from fast responders</p>
            </div>
            <div className="bg-yellow-50 rounded-2xl p-8 border border-yellow-100" style={{ borderRadius: '16px' }}>
              <div className="text-4xl mb-4">🤯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Managing Chats Manually?</h3>
              <p className="text-gray-600">Wasting hours on repetitive tasks</p>
            </div>
          </div>
        </section>

        {/* Solution Section - Bento Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">One Platform to Rule Them All</h2>
            <p className="text-xl text-gray-600">Stop juggling tools. Start automating.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:shadow-lg transition-shadow" style={{ borderRadius: '16px' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Auto-Reply Instantly</h3>
              <p className="text-gray-600 text-sm">Reply in &lt;1 second</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200 hover:shadow-lg transition-shadow" style={{ borderRadius: '16px' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Manage in One Inbox</h3>
              <p className="text-gray-600 text-sm">Never miss a message</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 hover:shadow-lg transition-shadow" style={{ borderRadius: '16px' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Send Bulk Campaigns</h3>
              <p className="text-gray-600 text-sm">To 10k+ users instantly</p>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition-shadow" style={{ borderRadius: '16px' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-400 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Build Smart Chatbots</h3>
              <p className="text-gray-600 text-sm">No code required</p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Built For Your Business</h2>
              <p className="text-xl text-gray-600">See how others are crushing it</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow" style={{ borderRadius: '16px' }}>
                <div className="text-3xl mb-4">🛒</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">For E-commerce</h3>
                <p className="text-gray-600 mb-4">Recover abandoned carts automatically</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Cart abandonment recovery</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Order updates</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Customer support</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow" style={{ borderRadius: '16px' }}>
                <div className="text-3xl mb-4">🏢</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">For Agencies</h3>
                <p className="text-gray-600 mb-4">Manage multiple clients seamlessly</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Multi-client dashboard</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> White-label options</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Team collaboration</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow" style={{ borderRadius: '16px' }}>
                <div className="text-3xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">For Coaches</h3>
                <p className="text-gray-600 mb-4">Auto-reply leads instantly</p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Lead qualification</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Booking automation</li>
                  <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Follow-up sequences</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Start free, scale as you grow</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow" style={{ borderRadius: '16px' }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="text-4xl font-bold text-green-500 mb-6">$29<span className="text-lg text-gray-500">/mo</span></div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 1,000 contacts</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Basic automation</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Email support</li>
              </ul>
              <Link href="/signup" className="w-full py-3 bg-gray-100 text-gray-900 rounded-xl text-center font-semibold hover:bg-gray-200 transition-colors border border-gray-300" style={{ borderRadius: '12px' }}>
                Start Free
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-500 shadow-lg transform scale-105" style={{ borderRadius: '16px' }}>
              <div className="inline-flex items-center space-x-2 mb-2 px-3 py-1 bg-indigo-500 text-white rounded-full text-sm font-medium">
                <span>MOST POPULAR</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <div className="text-4xl font-bold text-indigo-600 mb-6">$79<span className="text-lg text-gray-500">/mo</span></div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 10,000 contacts</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Advanced AI features</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Priority support</li>
              </ul>
              <Link href="/signup" className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-center font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg" style={{ borderRadius: '12px' }}>
                Start Free Trial
              </Link>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow" style={{ borderRadius: '16px' }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-cyan-600 mb-6">Custom</div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Unlimited contacts</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Custom features</li>
                <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Dedicated support</li>
              </ul>
              <Link href="/signup" className="w-full py-3 bg-gray-100 text-gray-900 rounded-xl text-center font-semibold hover:bg-gray-200 transition-colors border border-gray-300" style={{ borderRadius: '12px' }}>
                Contact Sales
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Everything you need to know</p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200" style={{ borderRadius: '16px' }}>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Is this the official WhatsApp API?</h3>
                <p className="text-gray-600">Yes! We use WhatsApp&apos;s official Business API to ensure reliability and compliance.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200" style={{ borderRadius: '16px' }}>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Is my phone number safe?</h3>
                <p className="text-gray-600">Absolutely. We&apos;re GDPR compliant and never share your data with third parties.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200" style={{ borderRadius: '16px' }}>
                <h3 className="text-xl font-bold text-gray-900 mb-3">How fast is the setup?</h3>
                <p className="text-gray-600">You can be up and running in under 5 minutes. No technical skills required.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-12 text-center text-white" style={{ borderRadius: '24px' }}>
            <h2 className="text-4xl font-bold mb-6">
              Ready to Never Miss a Customer Again?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join 5,000+ businesses that are closing more sales with WhatsApp automation.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-indigo-600 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-xl hover:shadow-white/25"
              style={{ borderRadius: '12px' }}
            >
              🚀 Start Your Free Trial
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">SYSTEM OPERATIONAL</span>
            </div>
            <p className="text-gray-400">
              © 2024 WhatsApp AI Automation. Powered by Neural Networks 🧠
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

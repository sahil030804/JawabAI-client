'use client';

import Link from 'next/link';
import LoginForm from '@/components/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-[#25D366] rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold text-[#0F172A]">JawabAI</span>
              <span className="text-xs text-gray-500">WhatsApp Sales Assistant</span>
            </div>
          </Link>
          
          <h2 className="text-3xl font-bold text-[#0F172A] mb-2">
            Login to Your Account
          </h2>
          <p className="text-gray-600">
            Continue growing your business with automation
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white shadow-xl rounded-lg p-8">
          <LoginForm />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              No account?{' '}
              <Link
                href="/signup"
                className="font-medium text-[#25D366] hover:text-[#128C7E] transition-colors"
              >
                Register for free
              </Link>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
          <h3 className="font-semibold text-[#0F172A] mb-3">With JawabAI:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#25D366] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              1000+ happy customers
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#25D366] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              99.9% uptime guarantee
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#25D366] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Secure and reliable
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-[#25D366] mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              24/7 English support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

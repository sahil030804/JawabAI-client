'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export default function PaymentSuccessPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm text-center">
          {/* Success Animation */}
          <div className="mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-bounce">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-2">
              Payment Successful!
            </h1>
            <p className="text-base sm:text-xl text-gray-600">
              Your plan has been activated successfully
            </p>
          </div>

          {/* Plan Details */}
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#25D366] rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs sm:text-sm text-gray-600">You're now on the</p>
                <p className="text-lg sm:text-xl font-bold text-[#0F172A]">Pro Plan</p>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              Your subscription is now active. You can start using all premium features immediately.
            </div>
          </div>

          {/* Next Steps */}
          <div className="text-left mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-semibold text-[#0F172A] mb-3 sm:mb-4">What's Next?</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#25D366] rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium text-[#0F172A] text-sm sm:text-base">Complete your onboarding</p>
                  <p className="text-xs sm:text-sm text-gray-600">Set up your business details and knowledge base</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#25D366] rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium text-[#0F172A] text-sm sm:text-base">Connect your WhatsApp</p>
                  <p className="text-xs sm:text-sm text-gray-600">Link your WhatsApp Business API to start auto-replying</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#25D366] rounded-full flex items-center justify-center mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium text-[#0F172A] text-sm sm:text-base">Test your AI assistant</p>
                  <p className="text-xs sm:text-sm text-gray-600">Ask questions and see your AI in action</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <Link href="/dashboard">
              <Button className="w-full text-sm sm:text-base">
                Go to Dashboard
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button variant="outline" className="w-full text-sm sm:text-base">
                Complete Onboarding
              </Button>
            </Link>
          </div>

          {/* Support Link */}
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
            Need help? <Link href="/" className="text-[#25D366] hover:underline">Contact Support</Link>
          </p>
        </div>

        {/* Receipt Info */}
        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
          <p>A confirmation email has been sent to {user?.email}</p>
          <p className="mt-1">
            <Link href="/pricing" className="text-[#25D366] hover:underline">
              View your subscription details
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#25D366] rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-[#0F172A]">JawabAI</span>
                <span className="text-xs text-gray-500 hidden sm:block">WhatsApp Sales Assistant</span>
              </div>
            </Link>
            <nav className="flex items-center space-x-2 sm:space-x-6">
              <Link href="/" className="text-gray-600 hover:text-[#25D366] px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-[#25D366] px-3 py-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                Login
              </Link>
              <Link href="/signup" className="px-4 py-2 sm:px-6 sm:py-3 bg-[#25D366] text-white rounded-xl hover:bg-[#128C7E] transition-colors text-xs sm:text-sm font-medium">
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8">
            Choose the plan that fits your business. All plans include a 14-day free trial.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-sm flex flex-col">
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">Starter</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Perfect for small businesses</p>
              <div className="mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-[#0F172A]">$29</span>
                <span className="text-sm sm:text-base text-gray-600">/month</span>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                <li className="flex items-center text-sm sm:text-base text-gray-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  500 AI replies/month
                </li>
                <li className="flex items-center text-sm sm:text-base text-gray-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  10 documents
                </li>
                <li className="flex items-center text-sm sm:text-base text-gray-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  WhatsApp auto-reply
                </li>
                <li className="flex items-center text-sm sm:text-base text-gray-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Email support
                </li>
              </ul>
              <Link href="/checkout?plan=starter">
                <Button variant="outline" className="w-full text-sm sm:text-base">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border-2 border-[#25D366] shadow-lg relative flex flex-col md:flex-col lg:flex-col">
              <div className="absolute top-0 right-0 bg-[#25D366] text-white text-xs font-semibold px-2 sm:px-3 py-1 rounded-bl-xl rounded-tr-xl">
                POPULAR
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">Pro</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">For growing businesses</p>
              <div className="mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-[#0F172A]">$79</span>
                <span className="text-sm sm:text-base text-gray-600">/month</span>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                <li className="flex items-center text-sm sm:text-base text-gray-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  5,000 AI replies/month
                </li>
                <li className="flex items-center text-sm sm:text-base text-gray-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  50 documents
                </li>
                <li className="flex items-center text-sm sm:text-base text-gray-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Advanced AI features
                </li>
                <li className="flex items-center text-sm sm:text-base text-gray-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Priority support
                </li>
              </ul>
              <Link href="/checkout?plan=pro">
                <Button className="w-full text-sm sm:text-base">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-col lg:flex-col">
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">Enterprise</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">For large organizations</p>
              <div className="mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-[#0F172A]">Custom</span>
              </div>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                <li className="flex items-center text-sm sm:text-base text-gray-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Unlimited AI replies
                </li>
                <li className="flex items-center text-sm sm:text-base text-gray-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Unlimited documents
                </li>
                <li className="flex items-center text-sm sm:text-base text-gray-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Custom integrations
                </li>
                <li className="flex items-center text-sm sm:text-base text-gray-700">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  Dedicated support
                </li>
              </ul>
              <Link href="/signup">
                <Button variant="outline" className="w-full text-sm sm:text-base">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-12 sm:py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-6 sm:mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
              <h3 className="font-semibold text-[#0F172A] mb-2 text-sm sm:text-base">Can I change plans later?</h3>
              <p className="text-gray-600 text-sm sm:text-base">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
              <h3 className="font-semibold text-[#0F172A] mb-2 text-sm sm:text-base">What happens after the free trial?</h3>
              <p className="text-gray-600 text-sm sm:text-base">After 14 days, you'll need to choose a plan to continue using JawabAI. No credit card required for the trial.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
              <h3 className="font-semibold text-[#0F172A] mb-2 text-sm sm:text-base">Is my data secure?</h3>
              <p className="text-gray-600 text-sm sm:text-base">Yes, we use enterprise-grade encryption and follow strict security protocols to protect your data.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
              <h3 className="font-semibold text-[#0F172A] mb-2 text-sm sm:text-base">Do you offer refunds?</h3>
              <p className="text-gray-600 text-sm sm:text-base">We offer a 30-day money-back guarantee if you're not satisfied with our service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-3 sm:mb-4">
            Ready to automate your WhatsApp responses?
          </h2>
          <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8">
            Start your free trial today and see the difference AI can make.
          </p>
          <Link href="/signup">
            <Button className="w-full sm:w-auto sm:max-w-xs">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-[#25D366] rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
                </svg>
              </div>
              <span className="text-sm font-semibold text-[#0F172A]">JawabAI</span>
            </div>
            <div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-[#25D366] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#25D366] transition-colors">Terms</Link>
              <Link href="/" className="hover:text-[#25D366] transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

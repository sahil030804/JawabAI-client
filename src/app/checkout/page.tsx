'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

function CheckoutContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'starter';
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    agreeTerms: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = {
    starter: { name: 'Starter', price: 29, features: ['500 AI replies/month', '10 documents', 'WhatsApp auto-reply', 'Email support'] },
    pro: { name: 'Pro', price: 79, features: ['5,000 AI replies/month', 'Unlimited documents', 'WhatsApp auto-reply', 'Bulk messaging', 'Priority support', 'Analytics dashboard'] },
    enterprise: { name: 'Enterprise', price: null, features: ['Unlimited AI replies', 'Unlimited documents', 'Custom integrations', 'Dedicated account manager', '24/7 phone support', 'SLA guarantee'] },
  };

  const selectedPlan = plans[plan as keyof typeof plans] || plans.starter;

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      router.push('/payment-success');
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

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
            <Link href="/pricing" className="text-gray-600 hover:text-[#25D366] text-xs sm:text-sm font-medium">
              Back to Pricing
            </Link>
          </div>
        </div>
      </header>

      {/* Checkout Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-sm">
              <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4 sm:mb-6">Complete Your Purchase</h1>
              
              <form onSubmit={handleSubmit}>
                {/* Plan Summary */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <div>
                      <h3 className="font-semibold text-[#0F172A] text-sm sm:text-base">{selectedPlan.name} Plan</h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {selectedPlan.price ? `$${selectedPlan.price}/month` : 'Custom pricing'}
                      </p>
                    </div>
                    <Link href="/pricing" className="text-xs sm:text-sm text-[#25D366] hover:underline">
                      Change
                    </Link>
                  </div>
                </div>

                {/* Card Details */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange({ ...e, target: { ...e.target, value: formatCardNumber(e.target.value) } })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm sm:text-base"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange({ ...e, target: { ...e.target, value: formatExpiryDate(e.target.value) } })}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm sm:text-base"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm sm:text-base"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#25D366] focus:border-transparent text-sm sm:text-base"
                      required
                    />
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-[#25D366] focus:ring-[#25D366] border-gray-300 rounded"
                      required
                    />
                    <label className="ml-2 text-sm text-gray-600">
                      I agree to the{' '}
                      <Link href="/terms" className="text-[#25D366] hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-[#25D366] hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? 'Processing...' : selectedPlan.price ? `Pay $${selectedPlan.price}` : 'Contact Sales'}
                  </Button>

                  {/* Security Note */}
                  <p className="text-xs text-gray-500 text-center">
                    🔒 Your payment information is secure and encrypted
                  </p>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm sticky top-4 sm:top-8">
              <h2 className="text-base sm:text-lg font-semibold text-[#0F172A] mb-3 sm:mb-4">Order Summary</h2>
              
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <span>{selectedPlan.name} Plan</span>
                  <span>{selectedPlan.price ? `$${selectedPlan.price}` : 'Custom'}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <span>Billing</span>
                  <span>Monthly</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
                <div className="flex justify-between font-semibold text-[#0F172A] text-sm sm:text-base">
                  <span>Total</span>
                  <span>{selectedPlan.price ? `$${selectedPlan.price}` : 'Custom'}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4">
                <h3 className="font-semibold text-[#0F172A] mb-2 sm:mb-3 text-sm sm:text-base">Included Features</h3>
                <ul className="space-y-1 sm:space-y-2">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-xs sm:text-sm text-gray-600">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#25D366] mr-1.5 sm:mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500 mb-1 sm:mb-2">
                  14-day free trial included
                </p>
                <p className="text-xs text-gray-500">
                  Cancel anytime during trial
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function CheckoutFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#25D366]" />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutFallback />}>
      <CheckoutContent />
    </Suspense>
  );
}

import Link from 'next/link';

export default function TermsPage() {
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
            <Link href="/" className="text-gray-600 hover:text-[#25D366] text-xs sm:text-sm font-medium">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A] mb-3 sm:mb-4">Terms of Service</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Last updated: January 2026</p>

        <div className="prose prose-sm sm:prose-lg max-w-none">
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              By accessing or using JawabAI's WhatsApp automation service, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              JawabAI provides an AI-powered WhatsApp automation service that enables businesses to automate customer responses, manage conversations, and integrate WhatsApp Business API with their existing systems.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">3. User Accounts</h2>
            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">3.1 Account Registration</h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              To use our service, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">3.2 Account Security</h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">3.3 Account Termination</h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              We reserve the right to suspend or terminate your account at any time for violation of these Terms or for any other reason at our sole discretion.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">4. Subscription and Payment</h2>
            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">4.1 Subscription Plans</h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              JawabAI offers various subscription plans with different features and pricing. You agree to pay all fees and charges associated with your selected plan.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">4.2 Payment Terms</h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              Payments are processed through third-party payment providers. By providing payment information, you represent and warrant that you are authorized to use the payment method.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">4.3 Refunds</h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              We offer a 30-day money-back guarantee. Refunds will be processed within 5-7 business days of approval.
            </p>

            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">4.4 Cancellation</h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              You may cancel your subscription at any time. Cancellation will take effect at the end of the current billing period.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">5. Acceptable Use Policy</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              You agree not to use the service for any unlawful or prohibited purpose, including but not limited to:
            </p>
            <ul className="list-disc pl-4 sm:pl-6 text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>Sending spam or unsolicited messages</li>
              <li>Violating WhatsApp's Terms of Service</li>
              <li>Impersonating any person or entity</li>
              <li>Infringing on intellectual property rights</li>
              <li>Transmitting malicious code or viruses</li>
              <li>Harassing or abusing other users</li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              All content, features, and functionality of the JawabAI service, including but not limited to text, graphics, logos, and software, are the exclusive property of JawabAI and are protected by intellectual property laws.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">7. Privacy Policy</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              Your use of our service is also governed by our Privacy Policy, which can be found at <Link href="/privacy" className="text-[#25D366] hover:underline">/privacy</Link>. Please review our Privacy Policy carefully.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              The service is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the service, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              In no event shall JawabAI be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">10. Indemnification</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              You agree to indemnify and hold harmless JawabAI and its affiliates from any claims, damages, or expenses arising from your use of the service or violation of these Terms.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">11. Governing Law</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which JawabAI is registered, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">12. Changes to Terms</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">13. Contact Information</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Email: legal@jawabai.com
            </p>
          </section>
        </div>
      </main>

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
              <Link href="/" className="hover:text-[#25D366] transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Link from 'next/link';

export default function PrivacyPage() {
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
        <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A] mb-3 sm:mb-4">Privacy Policy</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Last updated: January 2026</p>

        <div className="prose prose-sm sm:prose-lg max-w-none">
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              JawabAI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our WhatsApp automation service.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">2. Information We Collect</h2>
            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">2.1 Personal Information</h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              We collect information you provide directly, including:
            </p>
            <ul className="list-disc pl-4 sm:pl-6 text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>Name and contact information</li>
              <li>Email address and phone number</li>
              <li>Business information and profile details</li>
              <li>Payment information (processed securely through third-party providers)</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">2.2 Usage Information</h3>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              We automatically collect information about your use of our service, including:
            </p>
            <ul className="list-disc pl-4 sm:pl-6 text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>Log data and device information</li>
              <li>Usage patterns and interactions</li>
              <li>WhatsApp message content (processed for AI responses)</li>
              <li>Performance and diagnostic data</li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              We use your information to:
            </p>
            <ul className="list-disc pl-4 sm:pl-6 text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>Provide, maintain, and improve our services</li>
              <li>Process WhatsApp messages and generate AI responses</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent security issues</li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">4. Data Security</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              We implement appropriate technical and organizational measures to protect your information, including:
            </p>
            <ul className="list-disc pl-4 sm:pl-6 text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security assessments and updates</li>
              <li>Compliance with industry standards</li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">5. Your Privacy Rights</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              You have the right to:
            </p>
            <ul className="list-disc pl-4 sm:pl-6 text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data</li>
              <li>Object to processing of your data</li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">6. Third-Party Services</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              We may share your information with third-party service providers who perform services on our behalf, such as:
            </p>
            <ul className="list-disc pl-4 sm:pl-6 text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li>Payment processing (Stripe)</li>
              <li>Cloud hosting and infrastructure</li>
              <li>Analytics and monitoring tools</li>
              <li>Email delivery services</li>
            </ul>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">7. International Data Transfers</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">8. Changes to This Privacy Policy</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">9. Contact Us</h2>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Email: privacy@jawabai.com
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
              <Link href="/terms" className="hover:text-[#25D366] transition-colors">Terms</Link>
              <Link href="/" className="hover:text-[#25D366] transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
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
            <Link href="/" className="text-gray-600 hover:text-[#25D366] text-xs sm:text-sm font-medium transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] mb-2">Privacy Policy</h1>
        <p className="text-sm sm:text-base text-gray-500 mb-8 sm:mb-10">Last updated: June 2026</p>

        <div className="prose prose-sm sm:prose-base max-w-none">
          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3">1. Introduction</h2>
            <p className="text-gray-600 mb-3 leading-relaxed text-sm sm:text-base">
              JawabAI (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our WhatsApp automation service. Please read this policy carefully to understand our practices regarding your personal data.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              By using our service, you consent to the practices described in this policy. If you do not agree, please discontinue use of our service immediately.
            </p>
          </section>

          <div className="border-t border-gray-200 my-8 sm:my-10" />

          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">2. Information We Collect</h2>

            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">2.1 Personal Information</h3>
            <p className="text-gray-600 mb-3 leading-relaxed text-sm sm:text-base">
              We collect information you provide directly to us when you register, subscribe, or communicate with us:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 mb-4 space-y-1.5 text-sm sm:text-base">
              <li>Full name and business contact information</li>
              <li>Email address and phone number</li>
              <li>Business details and account preferences</li>
              <li>Payment information (processed securely by Stripe — we never store full payment details)</li>
              <li>Communications you exchange with our support team</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">2.2 Usage &amp; Device Information</h3>
            <p className="text-gray-600 mb-3 leading-relaxed text-sm sm:text-base">
              We automatically collect certain information when you access our service:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 mb-4 space-y-1.5 text-sm sm:text-base">
              <li>Log data (IP address, browser type, operating system, referring URLs)</li>
              <li>Usage patterns and feature interactions</li>
              <li>WhatsApp message metadata and content (processed solely to generate AI responses)</li>
              <li>Performance metrics and diagnostic data to improve reliability</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">2.3 Cookies &amp; Tracking</h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              We use essential cookies to maintain session state and authentication. Optional analytics cookies help us understand usage patterns. You can manage cookie preferences through your browser settings. Disabling certain cookies may affect service functionality.
            </p>
          </section>

          <div className="border-t border-gray-200 my-8 sm:my-10" />

          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 mb-3 leading-relaxed text-sm sm:text-base">
              We use your information solely for legitimate business purposes:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 mb-4 space-y-1.5 text-sm sm:text-base">
              <li>Providing, maintaining, and improving our WhatsApp automation services</li>
              <li>Processing incoming messages and generating AI-powered responses</li>
              <li>Sending technical notices, security alerts, and support communications</li>
              <li>Responding to your inquiries and troubleshooting issues</li>
              <li>Analyzing usage trends to enhance user experience</li>
              <li>Detecting, preventing, and addressing fraud or security incidents</li>
              <li>Complying with legal obligations and enforcing our Terms of Service</li>
            </ul>
          </section>

          <div className="border-t border-gray-200 my-8 sm:my-10" />

          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">4. Legal Basis for Processing (GDPR)</h2>
            <p className="text-gray-600 mb-3 leading-relaxed text-sm sm:text-base">
              If you are located in the European Economic Area (EEA), our processing of your personal data is based on the following lawful grounds:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 mb-4 space-y-1.5 text-sm sm:text-base">
              <li><strong>Contractual necessity</strong> — to provide the service you subscribed to</li>
              <li><strong>Consent</strong> — where you have opted in (e.g., marketing communications)</li>
              <li><strong>Legitimate interests</strong> — for security, analytics, and service improvement</li>
              <li><strong>Legal obligation</strong> — where retention is required by applicable law</li>
            </ul>
          </section>

          <div className="border-t border-gray-200 my-8 sm:my-10" />

          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">5. Data Sharing &amp; Third Parties</h2>
            <p className="text-gray-600 mb-3 leading-relaxed text-sm sm:text-base">
              We do not sell your personal information. We may share data with trusted third-party service providers who perform critical functions on our behalf:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 mb-4 space-y-1.5 text-sm sm:text-base">
              <li><strong>Stripe</strong> — payment processing (your card data never touches our servers)</li>
              <li><strong>Cloud infrastructure providers</strong> — hosting and data storage</li>
              <li><strong>Analytics platforms</strong> — anonymized usage measurement</li>
              <li><strong>Email delivery services</strong> — transactional and support communications</li>
            </ul>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              All third parties are contractually bound to protect your data and may only process it for specified purposes.
            </p>
          </section>

          <div className="border-t border-gray-200 my-8 sm:my-10" />

          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">6. Data Retention</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              We retain your personal data only as long as necessary to fulfill the purposes described in this policy, or as required by law. Upon account termination, your data is deleted within 90 days unless retention is required for legal compliance or dispute resolution. Message content used for AI training is anonymized and retained only for model improvement with your explicit consent.
            </p>
          </section>

          <div className="border-t border-gray-200 my-8 sm:my-10" />

          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">7. Data Security</h2>
            <p className="text-gray-600 mb-3 leading-relaxed text-sm sm:text-base">
              We implement industry-standard security measures to safeguard your data:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 mb-4 space-y-1.5 text-sm sm:text-base">
              <li>End-to-end encryption for data in transit (TLS 1.3) and at rest (AES-256)</li>
              <li>Strict access controls and multi-factor authentication</li>
              <li>Regular security audits and penetration testing</li>
              <li>SOC 2 compliance practices (in progress)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Despite these measures, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but will promptly notify you of any confirmed data breach affecting your information.
            </p>
          </section>

          <div className="border-t border-gray-200 my-8 sm:my-10" />

          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">8. Your Rights &amp; Choices</h2>
            <p className="text-gray-600 mb-3 leading-relaxed text-sm sm:text-base">
              Depending on your jurisdiction, you may have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 mb-4 space-y-1.5 text-sm sm:text-base">
              <li><strong>Access</strong> — request a copy of the data we hold about you</li>
              <li><strong>Rectification</strong> — correct inaccurate or incomplete data</li>
              <li><strong>Deletion</strong> — request deletion of your account and associated data</li>
              <li><strong>Portability</strong> — receive your data in a machine-readable format</li>
              <li><strong>Restriction</strong> — limit how we process your data</li>
              <li><strong>Objection</strong> — opt out of marketing communications at any time</li>
              <li><strong>Withdrawal of consent</strong> — where processing is based on consent</li>
            </ul>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              To exercise any of these rights, contact us at privacy@jawabai.com. We will respond within 30 days.
            </p>
          </section>

          <div className="border-t border-gray-200 my-8 sm:my-10" />

          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">9. International Data Transfers</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Your information may be transferred to and processed in countries outside your country of residence, including the United States and India. We ensure appropriate safeguards are in place — including Standard Contractual Clauses (SCCs) for EEA/UK transfers — to protect your data in compliance with applicable data protection laws.
            </p>
          </section>

          <div className="border-t border-gray-200 my-8 sm:my-10" />

          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Our service is not directed to individuals under the age of 18. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us, and we will delete it promptly.
            </p>
          </section>

          <div className="border-t border-gray-200 my-8 sm:my-10" />

          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              We may update this Privacy Policy periodically. Material changes will be communicated via email or through a prominent notice on our website. The &ldquo;Last updated&rdquo; date at the top of this page reflects the most recent revision. Continued use of the service after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <div className="border-t border-gray-200 my-8 sm:my-10" />

          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">12. Contact Us</h2>
            <p className="text-gray-600 mb-4 leading-relaxed text-sm sm:text-base">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out:
            </p>
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
              <p className="text-gray-700 text-sm sm:text-base mb-1">
                <span className="font-semibold text-[#0F172A]">Email:</span>{' '}
                <a href="mailto:privacy@jawabai.com" className="text-[#25D366] hover:underline">privacy@jawabai.com</a>
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mt-2">
                We aim to respond to all inquiries within 2 business days.
              </p>
            </div>
          </section>
        </div>
      </main>

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

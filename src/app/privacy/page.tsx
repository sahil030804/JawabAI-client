import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#25D366] rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.485.716 4.798 1.951 6.75L.057 24l5.466-1.806A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.124 0-4.12-.585-5.818-1.6l-.418-.25-3.247 1.074 1.086-3.167-.272-.435A9.958 9.958 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-[#0F172A]">Sanchar Digital</span>
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

        <div className="space-y-8 sm:space-y-10">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3">1. Introduction</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Sanchar Digital (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our WhatsApp automation platform (&ldquo;the Service&rdquo;). Please read this policy carefully.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">
              By using the Service, you consent to the data practices described in this policy. If you do not agree, please discontinue use immediately.
            </p>
          </section>

          <div className="border-t border-gray-200" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">2. Information We Collect</h2>

            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">2.1 Account Information</h3>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 mb-4 space-y-1.5 text-sm sm:text-base leading-relaxed">
              <li>Full name, email address, phone number</li>
              <li>Business name, industry, and website</li>
              <li>Account login credentials (hashed and salted)</li>
              <li>Billing information (processed by Stripe&mdash;we never store full payment details)</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">2.2 WhatsApp Message Data</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3">
              To provide the Service, we process the following data from your WhatsApp Business Account via Meta&rsquo;s Cloud API:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 mb-4 space-y-1.5 text-sm sm:text-base leading-relaxed">
              <li><strong>Inbound message content</strong>&mdash;text messages and interactive replies from your customers</li>
              <li><strong>Message metadata</strong>&mdash;sender phone number, message timestamps, message IDs</li>
              <li><strong>Outbound message content</strong>&mdash;AI-generated replies sent on your behalf</li>
              <li><strong>Conversation history</strong>&mdash;recent message threads used for context-aware AI responses</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">2.3 Usage &amp; Technical Data</h3>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 mb-4 space-y-1.5 text-sm sm:text-base leading-relaxed">
              <li>IP address, browser type, operating system</li>
              <li>Feature interactions and usage patterns</li>
              <li>Performance metrics and error logs</li>
              <li>Session and authentication cookies (essential only)</li>
            </ul>

            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">2.4 Documents &amp; Knowledge Base</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              When you upload business documents (PDFs, DOCX, CSV, etc.) to train your AI assistant, these files are stored, parsed, and embedded for retrieval. The extracted text is used solely to generate relevant AI responses to customer inquiries.
            </p>
          </section>

          <div className="border-t border-gray-200" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 space-y-2 text-sm sm:text-base leading-relaxed">
              <li><strong>To provide AI-powered replies</strong>&mdash;process inbound WhatsApp messages, retrieve relevant knowledge, and generate automated responses using third-party AI models</li>
              <li><strong>To improve the Service</strong>&mdash;analyze anonymized usage patterns to enhance performance and user experience</li>
              <li><strong>To communicate with you</strong>&mdash;send account notifications, billing updates, security alerts, and support responses</li>
              <li><strong>To ensure security</strong>&mdash;detect and prevent fraud, abuse, and unauthorized access</li>
              <li><strong>To comply with legal obligations</strong>&mdash;retain records as required by applicable law</li>
            </ul>
          </section>

          <div className="border-t border-gray-200" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">4. WhatsApp &amp; Meta Data Handling</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3">
              This Service integrates with Meta&rsquo;s WhatsApp Business Cloud API. Your WhatsApp message data is processed as follows:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 space-y-2 text-sm sm:text-base leading-relaxed">
              <li>Message data is transmitted from Meta&rsquo;s servers to our platform via encrypted webhook callbacks</li>
              <li>Data is stored temporarily in our database for processing and conversation context</li>
              <li>Message content is sent to third-party AI providers (xAI/Grok) solely for generating reply suggestions</li>
              <li>We do not sell, share, or use your customer message data for any purpose other than providing the Service</li>
              <li>We comply with Meta&rsquo;s WhatsApp Business Messaging Policy, including data use limitations</li>
              <li>You retain full ownership of your customer conversation data</li>
            </ul>
          </section>

          <div className="border-t border-gray-200" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">5. Third-Party Data Processors</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3">
              We engage trusted third-party service providers who process your data solely on our instructions:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 pr-4 font-semibold text-[#0F172A]">Provider</th>
                    <th className="text-left py-2 pr-4 font-semibold text-[#0F172A]">Purpose</th>
                    <th className="text-left py-2 font-semibold text-[#0F172A]">Data</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Meta (WhatsApp)</td>
                    <td className="py-2 pr-4">Message delivery &amp; webhooks</td>
                    <td className="py-2">Message content, phone numbers</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">xAI (Grok)</td>
                    <td className="py-2 pr-4">AI reply generation</td>
                    <td className="py-2">Message content, conversation history</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Stripe</td>
                    <td className="py-2 pr-4">Payment processing</td>
                    <td className="py-2">Billing information</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">PostgreSQL (Database)</td>
                    <td className="py-2 pr-4">Data storage</td>
                    <td className="py-2">All account and message data</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Redis</td>
                    <td className="py-2 pr-4">Job queuing &amp; caching</td>
                    <td className="py-2">Transient processing data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="border-t border-gray-200" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">6. Data Retention</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We retain your personal data and WhatsApp message data for as long as your account is active and for 90 days after account deletion, unless legal obligations require longer retention. Message data used for AI context is automatically pruned as conversations age. You may request earlier deletion of your data at any time.
            </p>
          </section>

          <div className="border-t border-gray-200" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">7. Data Security</h2>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 space-y-2 text-sm sm:text-base leading-relaxed">
              <li>All data in transit is encrypted using TLS 1.3</li>
              <li>WhatsApp access tokens are encrypted at rest using AES-256-GCM</li>
              <li>Passwords are hashed using bcrypt with 12 salt rounds</li>
              <li>Database access is restricted to authorized services only</li>
              <li>Regular security reviews and dependency updates are performed</li>
            </ul>
          </section>

          <div className="border-t border-gray-200" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">8. Data Sharing &amp; Disclosure</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We do not sell your personal information or WhatsApp message data. We may disclose your information only:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 mt-3 space-y-2 text-sm sm:text-base leading-relaxed">
              <li>With your explicit consent</li>
              <li>To comply with a valid legal request (court order, subpoena)</li>
              <li>To enforce our Terms of Service or protect our rights</li>
              <li>To trusted service providers as described in Section 5 (above)</li>
            </ul>
          </section>

          <div className="border-t border-gray-200" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">9. Your Rights</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3">
              Depending on your jurisdiction, you may have the following rights:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 space-y-2 text-sm sm:text-base leading-relaxed">
              <li><strong>Access</strong>&mdash;request a copy of the personal data we hold about you</li>
              <li><strong>Rectification</strong>&mdash;correct inaccurate or incomplete data</li>
              <li><strong>Deletion</strong>&mdash;request deletion of your account and associated data</li>
              <li><strong>Portability</strong>&mdash;receive your data in a structured, machine-readable format</li>
              <li><strong>Objection</strong>&mdash;opt out of marketing communications</li>
            </ul>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">
              To exercise any right, contact us at privacy@sanchardigital.in. We respond within 30 days.
            </p>
          </section>

          <div className="border-t border-gray-200" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">10. Children&apos;s Privacy</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              The Service is not intended for individuals under 18 years of age. We do not knowingly collect personal data from children. If you believe a child has provided us with their data, contact us and we will delete it promptly.
            </p>
          </section>

          <div className="border-t border-gray-200" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We may update this Privacy Policy periodically. Material changes will be communicated via email or platform notice. Continued use after changes constitutes acceptance. The &ldquo;Last updated&rdquo; date reflects the most recent revision.
            </p>
          </section>

          <div className="border-t border-gray-200" />

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">12. Contact</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 space-y-2">
              <p className="text-gray-700 text-sm sm:text-base">
                <span className="font-semibold text-[#0F172A]">Email (Privacy):</span>{' '}
                <a href="mailto:privacy@sanchardigital.in" className="text-[#25D366] hover:underline">privacy@sanchardigital.in</a>
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                <span className="font-semibold text-[#0F172A]">Email (Support):</span>{' '}
                <a href="mailto:support@sanchardigital.in" className="text-[#25D366] hover:underline">support@sanchardigital.in</a>
              </p>
              <p className="text-gray-700 text-sm sm:text-base">
                <span className="font-semibold text-[#0F172A]">Address:</span>{' '}
                Sanchar Digital, India
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
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.485.716 4.798 1.951 6.75L.057 24l5.466-1.806A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.124 0-4.12-.585-5.818-1.6l-.418-.25-3.247 1.074 1.086-3.167-.272-.435A9.958 9.958 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
                </svg>
              </div>
              <span className="text-sm font-semibold text-[#0F172A]">Sanchar Digital</span>
            </div>
            <div className="flex space-x-4 sm:space-x-6 text-xs sm:text-sm text-gray-600">
              <Link href="/terms" className="hover:text-[#25D366] transition-colors">Terms</Link>
              <Link href="/" className="hover:text-[#25D366] transition-colors">Home</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

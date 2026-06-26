import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#25D366] rounded-xl flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.485.716 4.798 1.951 6.75L.057 24l5.466-1.806A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.124 0-4.12-.585-5.818-1.6l-.418-.25-3.247 1.074 1.086-3.167-.272-.435A9.958 9.958 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.472-7.618c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-[#0F172A]">Sanchar Digital</span>
                <span className="text-xs text-gray-500 hidden sm:block">WhatsApp Sales Assistant</span>
              </div>
            </Link>
            <Link href="/" className="text-gray-600 hover:text-[#25D366] text-xs sm:text-sm font-medium">
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-4xl font-bold text-[#0F172A] mb-3 sm:mb-4">Terms of Service</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Last updated: June 2026</p>

        <div className="space-y-8 sm:space-y-10">
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              By accessing or using the Sanchar Digital platform (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to all terms, do not use the Service. These terms constitute a binding legal agreement between you (&ldquo;Customer&rdquo; or &ldquo;User&rdquo;) and Sanchar Digital.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">2. Service Description</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Sanchar Digital provides an AI-powered WhatsApp automation platform that enables businesses to set up intelligent customer support and sales assistants. The Service connects to the WhatsApp Business Cloud API via Meta&rsquo;s Embedded Signup or OAuth flows and processes incoming customer messages to generate automated AI replies using third-party AI models.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">
              The Service is provided as a Software-as-a-Service (SaaS) offering. Sanchar Digital is a Meta Technology Provider facilitating WhatsApp Business API access for its customers.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">3. Eligibility</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              You must be at least 18 years old to use the Service. By registering, you represent that you have the legal authority to bind your business or organization to these terms. You must have a valid WhatsApp Business Account and comply with WhatsApp&rsquo;s Terms of Service and Business Messaging Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">4. Account Registration &amp; Security</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              You must provide accurate and complete information when creating an account. You are solely responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. Notify us immediately at support@sanchardigital.in of any unauthorized use. Sanchar Digital is not liable for any loss resulting from unauthorized access to your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">5. WhatsApp &amp; Meta Compliance</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              By using the Service to connect WhatsApp Business, you agree to comply with:
            </p>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 mt-3 space-y-2 text-sm sm:text-base leading-relaxed">
              <li>Meta&rsquo;s WhatsApp Business Messaging Policy</li>
              <li>Meta&rsquo;s WhatsApp Business Terms of Service</li>
              <li>Meta&rsquo;s Commerce Policy (if applicable)</li>
              <li>All applicable local laws and regulations regarding business messaging</li>
            </ul>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-3">
              You represent that your business will not use the Service to send spam, harass users, engage in illegal activities, or violate any WhatsApp or Meta policies. Sanchar Digital reserves the right to suspend service immediately upon notice of any policy violation.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">6. Subscription &amp; Payment</h2>
            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2">6.1 Plans</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Sanchar Digital offers subscription plans with varying features, message volumes, and pricing. Details are available on our pricing page.
            </p>
            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2 mt-4">6.2 Billing</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Fees are charged in advance on a monthly or annual basis as selected. Payments are processed securely through Stripe. You authorize us to charge your chosen payment method. All fees are non-refundable except as expressly stated.
            </p>
            <h3 className="text-lg sm:text-xl font-semibold text-[#0F172A] mb-2 mt-4">6.3 Cancellation</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              You may cancel at any time from your account settings. Cancellation takes effect at the end of the current billing period. No prorated refunds are provided for partial months.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">7. Acceptable Use</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">You agree not to:</p>
            <ul className="list-disc pl-5 sm:pl-6 text-gray-600 mt-3 space-y-2 text-sm sm:text-base leading-relaxed">
              <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
              <li>Send unsolicited messages or spam through the platform</li>
              <li>Attempt to reverse-engineer, decompile, or exploit the Service</li>
              <li>Interfere with the integrity or performance of the platform</li>
              <li>Use the Service to process sensitive personal data (health, biometric, financial account numbers) without appropriate safeguards</li>
              <li>Permit any third party to use your account credentials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">8. Intellectual Property</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              The Service, including its code, design, branding, and proprietary technology, is owned by Sanchar Digital and protected by applicable intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the Service during your subscription term. You retain all rights to your business data, customer messages, and uploaded content.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">9. AI-Generated Content</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              The Service uses third-party AI models (including xAI/Grok) to generate automated replies. Sanchar Digital does not guarantee the accuracy, completeness, or appropriateness of AI-generated content. You are responsible for reviewing and approving automated replies before or after they are sent. AI-generated content may not be suitable for all contexts, particularly sensitive customer interactions.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">10. Disclaimer of Warranties</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. SANCHAR DIGITAL DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">11. Limitation of Liability</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SANCHAR DIGITAL SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY FOR ANY CLAIM SHALL NOT EXCEED THE TOTAL FEES PAID BY YOU IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">12. Indemnification</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              You agree to indemnify and hold harmless Sanchar Digital, its affiliates, officers, and employees from any claims, damages, losses, or expenses (including legal fees) arising from your use of the Service, violation of these Terms, or infringement of any third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">13. Termination</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We may suspend or terminate your access to the Service at any time for violation of these Terms, non-payment, or conduct that we determine may harm other users or the platform. Upon termination, your right to use the Service ceases immediately. Sections 8 through 16 survive termination.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">14. Governing Law &amp; Dispute Resolution</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              These Terms shall be governed by the laws of India. Any disputes arising out of these Terms shall first be attempted to be resolved through good-faith negotiations. If unresolved, disputes shall be submitted to binding arbitration in accordance with the Arbitration and Conciliation Act, 1996, seated in the jurisdiction where Sanchar Digital is registered.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">15. Changes to Terms</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We may modify these Terms at any time. Material changes will be communicated via email or platform notice. Continued use of the Service after changes become effective constitutes acceptance of the updated Terms. The &ldquo;Last updated&rdquo; date at the top reflects the most recent revision.
            </p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-3 sm:mb-4">16. Contact</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 space-y-2">
              <p className="text-gray-700 text-sm sm:text-base">
                <span className="font-semibold text-[#0F172A]">Email:</span>{' '}
                <a href="mailto:legal@sanchardigital.in" className="text-[#25D366] hover:underline">legal@sanchardigital.in</a>
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
              <Link href="/privacy" className="hover:text-[#25D366] transition-colors">Privacy</Link>
              <Link href="/" className="hover:text-[#25D366] transition-colors">Home</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

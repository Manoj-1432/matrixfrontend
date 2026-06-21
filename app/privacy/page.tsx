import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Matrix Mobile Tyres',
  description: 'Privacy policy for Matrix Mobile Tyres — how we collect, use and protect your personal data.',
  alternates: { canonical: '/privacy' },
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold hover:underline mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          Back to Home
        </Link>

        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-400 text-sm mb-8">Last updated: June 2026</p>

          <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-6 text-slate-600">

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">1. Who we are</h2>
              <p>Matrix Mobile Tyres is a mobile tyre fitting service based in Coventry, UK. We can be contacted at <a href="tel:07721570075" className="text-blue-600 hover:underline">07721570075</a> or via WhatsApp at <a href="https://wa.me/447721570075" className="text-blue-600 hover:underline">wa.me/447721570075</a>.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">2. What data we collect</h2>
              <p>When you use our website or book a service, we may collect:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Your name, email address and phone number</li>
                <li>Your vehicle registration number</li>
                <li>Your address or fitting location</li>
                <li>Payment information (processed securely by Stripe — we never store card details)</li>
                <li>Order and booking history</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">3. How we use your data</h2>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>To process and fulfil your booking</li>
                <li>To send booking confirmation and service updates</li>
                <li>To respond to enquiries</li>
                <li>To improve our service</li>
              </ul>
              <p className="mt-2">We do not sell your data to third parties.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">4. Legal basis</h2>
              <p>We process your data under the lawful basis of <strong>contract</strong> (to fulfil your booking) and <strong>legitimate interests</strong> (to run our business and communicate with customers).</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">5. Data retention</h2>
              <p>We retain your personal data for as long as necessary to provide our services and comply with legal obligations (typically up to 7 years for financial records).</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">6. Third parties</h2>
              <p>We share data with trusted third parties only as needed:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Stripe</strong> — payment processing</li>
                <li><strong>DVLA</strong> — vehicle lookup via registration number</li>
                <li><strong>OpenAI</strong> — tyre size recommendations (no personal data shared)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">7. Your rights</h2>
              <p>Under UK GDPR you have the right to access, correct, delete or export your personal data. To exercise these rights, contact us at <a href="tel:07721570075" className="text-blue-600 hover:underline">07721570075</a>.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">8. Cookies</h2>
              <p>Our website uses only essential cookies required for the site to function (authentication tokens). We do not use tracking or advertising cookies. See our <Link href="/cookies" className="text-blue-600 hover:underline">Cookie Policy</Link> for details.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">9. Contact</h2>
              <p>If you have any questions about this policy, please contact us at <a href="tel:07721570075" className="text-blue-600 hover:underline">07721570075</a>.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

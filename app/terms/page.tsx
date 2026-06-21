import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Matrix Mobile Tyres',
  description: 'Terms and conditions for Matrix Mobile Tyres mobile tyre fitting service.',
  alternates: { canonical: '/terms' },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold hover:underline mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          Back to Home
        </Link>

        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Terms &amp; Conditions</h1>
          <p className="text-slate-400 text-sm mb-8">Last updated: June 2026</p>

          <div className="text-sm leading-relaxed space-y-6 text-slate-600">

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">1. Service</h2>
              <p>Matrix Mobile Tyres provides mobile tyre fitting services in Coventry and surrounding areas. By placing a booking you agree to these terms.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">2. Bookings</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Online bookings require at least 24 hours notice. Same-day bookings must be made by phone or WhatsApp.</li>
                <li>We will confirm your booking by phone or message. A booking is only confirmed once we have acknowledged it.</li>
                <li>We reserve the right to reschedule due to unforeseen circumstances. We will always notify you as soon as possible.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">3. Payment</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Payment is taken at time of booking via Stripe (card payment).</li>
                <li>All prices include VAT where applicable.</li>
                <li>Prices displayed are for the tyres and fitting — no hidden callout fees.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">4. Cancellations &amp; Refunds</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>You may cancel your booking up to 24 hours before the scheduled fitting for a full refund.</li>
                <li>Cancellations within 24 hours may be subject to a cancellation fee.</li>
                <li>If we are unable to complete the fitting, a full refund will be issued.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">5. Your responsibilities</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ensure the vehicle is accessible and safe to work on at the agreed location.</li>
                <li>Provide accurate vehicle registration information when booking.</li>
                <li>Inform us of any special requirements or access issues in advance.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">6. Liability</h2>
              <p>We carry full public liability insurance. Our liability is limited to the cost of the service provided. We are not liable for pre-existing damage or issues unrelated to the fitting.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">7. Governing law</h2>
              <p>These terms are governed by the laws of England and Wales.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">8. Contact</h2>
              <p>Questions? Call us on <a href="tel:07721570075" className="text-blue-600 hover:underline">07721570075</a> or visit our <Link href="/contact" className="text-blue-600 hover:underline">contact page</Link>.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

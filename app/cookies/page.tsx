import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy | Matrix Mobile Tyres',
  description: 'Cookie policy for Matrix Mobile Tyres — we only use essential cookies.',
  robots: { index: false },
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold hover:underline mb-8">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          Back to Home
        </Link>
        <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Cookie Policy</h1>
          <p className="text-slate-400 text-sm mb-8">Last updated: June 2026</p>
          <div className="text-sm leading-relaxed space-y-6 text-slate-600">
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">What are cookies?</h2>
              <p>Cookies are small text files stored on your device when you visit a website. They help the site remember information about your visit.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">What cookies do we use?</h2>
              <p className="mb-3">We only use <strong>essential cookies</strong> — cookies that are strictly necessary for the website to function. We do not use tracking, advertising or analytics cookies.</p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100">
                      <th className="text-left px-4 py-2.5 font-bold text-slate-700">Cookie</th>
                      <th className="text-left px-4 py-2.5 font-bold text-slate-700">Purpose</th>
                      <th className="text-left px-4 py-2.5 font-bold text-slate-700">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="px-4 py-2.5 font-mono text-slate-700">customer_token</td>
                      <td className="px-4 py-2.5 text-slate-500">Keeps you logged in to your account</td>
                      <td className="px-4 py-2.5 text-slate-500">Session</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-mono text-slate-700">cookie_consent</td>
                      <td className="px-4 py-2.5 text-slate-500">Remembers that you accepted this notice</td>
                      <td className="px-4 py-2.5 text-slate-500">1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">How to control cookies</h2>
              <p>You can delete or block cookies through your browser settings. Note that disabling essential cookies may affect how the site works (e.g. you may not be able to stay logged in).</p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">Contact</h2>
              <p>Questions? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link> or see our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

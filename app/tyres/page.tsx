import type { Metadata } from 'next';
import Link from 'next/link';
import TyresClient from './_tyres-client';

export const metadata: Metadata = {
  title: 'Buy Tyres Online | Mobile Tyre Fitting Coventry | Matrix Mobile Tyres',
  description: 'Shop tyres online and book mobile fitting in Coventry. Search by reg plate or tyre size — we fit at your home, work or roadside, 7 days a week. Emergency callouts available.',
  keywords: [
    'buy tyres Coventry',
    'mobile tyre fitting Coventry',
    'cheap tyres Coventry',
    'tyres fitted at home Coventry',
    'mobile tyre service Coventry',
    'tyre fitting near me',
    'budget tyres Coventry',
    'premium tyres Coventry',
    'tyre size search',
    'reg plate tyre search',
  ],
  alternates: { canonical: '/tyres' },
  openGraph: {
    title: 'Buy Tyres Online | Mobile Fitting in Coventry | Matrix Mobile Tyres',
    description: 'Search by reg plate or tyre size. We deliver and fit at your door across Coventry and surrounding areas, 7 days a week.',
    url: '/tyres',
  },
};

const STEPS = [
  { title: 'Search your tyres', desc: 'Enter your number plate or tyre size to see the tyres that fit your car, with prices.' },
  { title: 'Choose a time', desc: 'Pick a fitting slot that suits you — 7 days a week, with emergency callouts available.' },
  { title: 'We fit them where you are', desc: 'We come to your home, workplace or roadside with the tyres on the van. No garage visit needed.' },
];

export default function TyresPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero — server-rendered so the heading is in the page HTML */}
      <div className="bg-[#0d1b3e] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.18em] mb-3">Tyre Search</p>
          <h1 className="text-3xl lg:text-4xl font-black mb-3">Buy Tyres in Coventry — Fitted at Your Door</h1>
          <p className="text-blue-200/70 text-sm max-w-md mx-auto">Search by registration number or enter your tyre size manually to see matching tyres and prices.</p>
        </div>
      </div>

      <TyresClient />

      {/* About buying tyres — server-rendered text for customers and search engines */}
      <section className="py-16 px-4 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Buying tyres online with mobile fitting in Coventry</h2>
          <div className="flex flex-col gap-3 text-slate-600 text-sm leading-[1.85] mb-10">
            <p>
              Matrix Mobile Tyres supplies and fits car tyres across Coventry and the surrounding area, including Warwick,
              Leamington Spa, Rugby, Nuneaton, Bedworth and Hinckley. Find the right tyres for your car above, then choose
              a time and we&apos;ll fit them at your home, workplace or at the roadside.
            </p>
            <p>
              Not sure of your tyre size? Search by number plate and we&apos;ll look up your vehicle for you. You&apos;ll
              also find the size printed on the side wall of your current tyres — for example <strong className="text-slate-800">205/55 R16</strong>.
            </p>
            <p>
              Prefer to visit us? Our tyre shop is at Unit 1, Bryant Road, Exhall, Coventry CV7 9EN.{' '}
              <Link href="/shop" className="text-blue-700 font-semibold hover:underline">See the shop</Link>.
              Every fitting includes a TPMS sensor reset —{' '}
              <Link href="/tpms" className="text-blue-700 font-semibold hover:underline">find out more about TPMS</Link>.
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 mb-6">How it works</h2>
          <ol className="grid sm:grid-cols-3 gap-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white text-sm font-black flex items-center justify-center mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

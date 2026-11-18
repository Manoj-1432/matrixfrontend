import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mobile Car Battery Replacement Coventry | Matrix Mobile Tyres',
  description: 'Mobile car battery testing, replacement and jump starts in Coventry and surrounding areas. Flat battery? We come to your home, work or roadside — 7 days a week.',
  keywords: ['car battery replacement Coventry', 'mobile car battery Coventry', 'flat battery Coventry', 'car battery fitting Coventry', 'jump start Coventry'],
  alternates: { canonical: '/batteries' },
  openGraph: {
    title: 'Mobile Car Battery Replacement Coventry | Matrix Mobile Tyres',
    description: 'Flat battery? We test, supply and fit car batteries at your location — no garage needed.',
    url: '/batteries',
  },
};

const PHONE = '07721570075';
const WA    = 'https://wa.me/447721570075';

const WHAT_WE_DO = [
  { title: 'Battery Testing', desc: 'We test your battery and charging system on the spot, so you know whether it needs replacing or just a recharge.' },
  { title: 'Battery Replacement', desc: 'We supply and fit the correct battery for your vehicle at your home, workplace or roadside.' },
  { title: 'Jump Starts', desc: 'Car won\'t start? We come out to get you moving again, then check whether the battery is still healthy.' },
  { title: 'Charging System Check', desc: 'If batteries keep going flat, we check the alternator and charging system to find the real cause.' },
];

const SIGNS = [
  'Engine cranks slowly or struggles to start',
  'Clicking sound when you turn the key',
  'Battery warning light on the dashboard',
  'Dim headlights or interior lights',
  'Battery is more than 4–5 years old',
];

const FAQS = [
  { q: 'How long does a car battery last?', a: 'Most car batteries last around 4–5 years, depending on how the car is used. Lots of short journeys, cold weather and cars that sit unused for long periods can all shorten battery life.' },
  { q: 'How long does a battery replacement take?', a: 'Most battery replacements take 20–30 minutes once we arrive. Some vehicles with the battery under a seat or in the boot can take a little longer.' },
  { q: 'Do you fit batteries for stop-start cars?', a: 'Yes. Cars with stop-start need an AGM or EFB battery rather than a standard one. We make sure you get the right type for your vehicle.' },
  { q: 'Will I lose my radio and settings?', a: 'We take care to keep your car\'s settings where possible. Some vehicles also need the new battery registered to the car\'s computer, which we can do on site.' },
  { q: 'How much does a new battery cost?', a: 'The price depends on your vehicle and the battery type it needs. Call or WhatsApp us with your registration number and we\'ll give you a quote.' },
];

export default function BatteriesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4"
        style={{ background: 'linear-gradient(135deg,#0a1628,#0d1b3e,#0f2352)' }}>
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 70% 40%,rgba(79,70,229,0.18) 0%,transparent 55%)' }} />
        <div className="max-w-4xl mx-auto relative">
          <span className="inline-block bg-white/10 text-blue-300 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5 border border-white/10">Mobile Battery Service</span>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
            Car Batteries —<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#34d399,#60a5fa)' }}>
              fitted at your door
            </span>
          </h1>
          <p className="text-blue-200/70 text-lg max-w-xl leading-relaxed mb-8">
            Flat battery or car won&apos;t start? We test, supply and fit car batteries at your home, work or roadside across Coventry. No garage, no tow truck.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)', boxShadow: '0 4px 20px rgba(79,70,229,0.4)' }}>
              Call {PHONE}
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-all">
              WhatsApp for a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Signs */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5">Battery Trouble?</span>
              <h2 className="text-3xl font-black text-slate-900 mb-5">Don&apos;t wait to get stranded</h2>
              <div className="flex flex-col gap-3 text-slate-600 text-sm leading-[1.85]">
                <p>A weak battery usually gives warning signs before it fails completely — especially on cold mornings, when it has to work hardest.</p>
                <p>Modern cars also rely on the battery for more electronics than ever, so a tired battery can cause warning lights and electrical faults as well as starting problems.</p>
                <p><strong className="text-slate-800">The easy fix:</strong> we come to you, test the battery and charging system, and fit a replacement on the spot if you need one.</p>
              </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">Signs your battery is failing</h3>
              <div className="flex flex-col gap-3">
                {SIGNS.map((t, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-4">What We Do</span>
            <h2 className="text-3xl font-black text-slate-900">Our battery services</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {WHAT_WE_DO.map((s, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white text-sm font-black flex items-center justify-center mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-4">FAQ</span>
            <h2 className="text-3xl font-black text-slate-900">Common battery questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 text-[15px]">{f.q}</h3>
                <p className="text-slate-500 text-sm leading-[1.8]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg,#0a1628,#0d1b3e)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-3">Car won&apos;t start?</h2>
          <p className="text-blue-200/60 mb-8 text-sm max-w-sm mx-auto">We come to you — no garage visit needed. Call or WhatsApp us with your registration and we&apos;ll get you going.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-bold px-8 py-4 rounded-xl text-sm transition-all hover:-translate-y-0.5">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              Call {PHONE}
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

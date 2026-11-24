import type { Metadata } from 'next';
import Link from 'next/link';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.matrixmobiletyresandautos.com';

export const metadata: Metadata = {
  title: 'Emergency Tyre Fitting Coventry | 24/7 Mobile Tyre Callout | Matrix Mobile Tyres',
  description:
    'Flat tyre or puncture in Coventry? 24/7 emergency mobile tyre fitting at the roadside, home or work. We aim to reach you in 30–60 minutes. No callout fee. Call 07721570075.',
  keywords: [
    'emergency tyre fitting Coventry',
    '24 hour mobile tyre fitting Coventry',
    'emergency mobile tyre fitting',
    'mobile tyre change near me',
    'flat tyre Coventry',
    'puncture Coventry',
    'roadside tyre replacement Coventry',
    'emergency tyre callout',
    'tyre blowout help Coventry',
    '24/7 tyre fitting near me',
  ],
  alternates: { canonical: '/emergency-tyre-fitting' },
  openGraph: {
    title: '24/7 Emergency Tyre Fitting in Coventry | Matrix Mobile Tyres',
    description: 'Flat tyre or puncture? We come to you 24/7 — roadside, home or work. Aim to arrive in 30–60 minutes. No callout fee.',
    url: '/emergency-tyre-fitting',
  },
};

const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';

const SITUATIONS = [
  { title: 'Flat tyre', desc: 'Woke up to a flat, or the tyre went down on the drive? We come to your home and replace it on the spot.' },
  { title: 'Puncture', desc: 'Nail, screw or slow puncture? We check the tyre and fit a replacement if it can\'t be used safely.' },
  { title: 'Tyre blowout', desc: 'Pulled over after a blowout? Stay safe and call us — we come to the roadside with a new tyre.' },
  { title: 'Sidewall damage', desc: 'Hit a kerb or pothole and the side of the tyre is bulging or cut? It needs replacing — we can do it where you are.' },
  { title: 'Tyre warning light', desc: 'Pressure warning on and the tyre looks low? We check it, replace it if needed and reset your TPMS for free.' },
  { title: 'No spare wheel', desc: 'Most new cars don\'t carry a spare. Instead of a tow to a garage, we bring the tyre to you.' },
];

const STEPS = [
  { title: 'Call or WhatsApp us', desc: `Ring ${PHONE} any time, day or night. Tell us where you are and your registration number.` },
  { title: 'We find the right tyre', desc: 'We look up your tyre size and bring a suitable tyre with us. You get the price before we set off.' },
  { title: 'We come to you', desc: 'We aim to reach you within 30–60 minutes anywhere in our Coventry coverage area.' },
  { title: 'Back on the road', desc: 'Fitting takes around 20–30 minutes per tyre, including balancing and a free TPMS reset.' },
];

const SAFETY = [
  'Pull over somewhere safe, away from moving traffic, and switch on your hazard lights.',
  'Get yourself and any passengers out of the car on the side away from traffic, if it is safe to do so.',
  'On a motorway or fast road, wait behind the safety barrier and follow the official breakdown advice.',
  'Don\'t keep driving on a flat tyre — it can damage the wheel and make the car hard to control.',
  'Call us with your location (a what3words address, junction or postcode helps) and your registration.',
];

const AREAS = [
  { slug: 'coventry', name: 'Coventry' },
  { slug: 'bedworth', name: 'Bedworth' },
  { slug: 'nuneaton', name: 'Nuneaton' },
  { slug: 'kenilworth', name: 'Kenilworth' },
  { slug: 'warwick', name: 'Warwick' },
  { slug: 'leamington-spa', name: 'Leamington Spa' },
  { slug: 'rugby', name: 'Rugby' },
  { slug: 'hinckley', name: 'Hinckley' },
  { slug: 'solihull', name: 'Solihull' },
  { slug: 'meriden', name: 'Meriden' },
];

const FAQS = [
  { q: 'Do you offer 24 hour emergency tyre fitting in Coventry?', a: 'Yes. Our mobile tyre service runs 24/7, 365 days a year, including nights, weekends and bank holidays. Call or WhatsApp us on 07721570075.' },
  { q: 'How quickly can you get to me?', a: 'We aim to reach you within 30–60 minutes anywhere in our Coventry coverage area. When you call, we\'ll give you an arrival time based on where you are.' },
  { q: 'Is there a callout fee for emergency tyre fitting?', a: 'No hidden callout fees. We tell you the total price for the tyre and fitting before we set off, so there are no surprises.' },
  { q: 'Can you fit a tyre at the roadside?', a: 'Yes — at the roadside, at home, at work or in a car park, as long as it is safe for us to work. On motorways and fast roads, follow the official breakdown advice and call us once you are somewhere safe.' },
  { q: 'Do I need to know my tyre size?', a: 'No. Just give us your registration number and we\'ll find the right tyre for your car. If you know the size, it\'s printed on the side of the tyre — for example 205/55 R16.' },
  { q: 'What areas do you cover for emergency callouts?', a: 'Coventry and the surrounding area, including Bedworth, Nuneaton, Kenilworth, Warwick, Leamington Spa, Rugby, Hinckley, Solihull and Meriden.' },
];

const pageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${BASE}/emergency-tyre-fitting#service`,
      name: '24/7 Emergency Mobile Tyre Fitting',
      serviceType: 'Emergency tyre fitting',
      description: 'Emergency mobile tyre fitting 24/7 across Coventry — flat tyres, punctures and blowouts fixed at the roadside, at home or at work.',
      provider: { '@id': `${BASE}/#mobile` },
      areaServed: AREAS.map(a => ({ '@type': 'City', name: a.name })),
      availableChannel: {
        '@type': 'ServiceChannel',
        servicePhone: { '@type': 'ContactPoint', telephone: '+447721570075', contactType: 'emergency', hoursAvailable: 'Mo-Su 00:00-23:59' },
      },
      url: `${BASE}/emergency-tyre-fitting`,
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

const PHONE_ICON = 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z';

function CallButtons({ light = false }: { light?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a href={`tel:${PHONE}`}
        className={`inline-flex items-center justify-center gap-2.5 font-black px-8 py-4 rounded-xl text-base transition-all hover:-translate-y-0.5 ${light ? 'bg-white text-slate-900 hover:bg-slate-50' : 'text-white'}`}
        style={light ? undefined : { background: 'linear-gradient(135deg,#ea580c,#dc2626)', boxShadow: '0 6px 24px rgba(234,88,12,0.45)' }}>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d={PHONE_ICON} /></svg>
        Call Now: {PHONE}
      </a>
      <a href={WA} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all">
        WhatsApp Your Location
      </a>
    </div>
  );
}

export default function EmergencyTyreFittingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24 px-4"
        style={{ background: 'linear-gradient(135deg,#0a1628,#0d1b3e,#0f2352)' }}>
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 75% 30%,rgba(234,88,12,0.18) 0%,transparent 55%)' }} />
        <div className="max-w-4xl mx-auto relative">
          <span className="inline-flex items-center gap-2 bg-orange-500/15 text-orange-300 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5 border border-orange-400/25">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            24/7 Emergency Callout
          </span>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-5 leading-[1.05] tracking-tight">
            24/7 Emergency Tyre Fitting{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#fb923c,#fbbf24)' }}>
              in Coventry
            </span>
          </h1>
          <p className="text-blue-100/80 text-lg max-w-2xl leading-relaxed mb-8">
            Flat tyre, puncture or blowout? We come to you — at the roadside, at home or at work — any time, day or night.
            We aim to reach you within <strong className="text-white">30–60 minutes</strong>, with <strong className="text-white">no callout fee</strong>.
          </p>
          <CallButtons />
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-[13px] text-blue-100/70 font-medium">
            {['Open 24 hours, 7 days', 'Aim to arrive in 30–60 min', 'No callout fee', 'Free TPMS reset', 'Fully insured'].map(t => (
              <span key={t} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Situations */}
      <section className="py-20 px-4 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-4">We Can Help With</span>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-3">Emergency mobile tyre fitting for any tyre problem</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
              Whatever has happened to your tyre, you don&apos;t need a tow truck or a garage. Our mobile tyre fitters come to your car with the
              right tyre and the equipment to fit it on the spot.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SITUATIONS.map(s => (
              <div key={s.title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-4">How It Works</span>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900">From flat tyre to back on the road</h2>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <li key={s.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="w-8 h-8 rounded-lg bg-orange-500 text-white text-sm font-black flex items-center justify-center mb-4">{i + 1}</div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Safety + areas */}
      <section className="py-20 px-4 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <span className="inline-block bg-red-50 text-red-700 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-4">Stay Safe</span>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-5">What to do if you get a flat tyre</h2>
            <ul className="flex flex-col gap-3">
              {SAFETY.map(t => (
                <li key={t} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-2" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-4">Coverage</span>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-5">Emergency tyre callouts across Coventry and nearby towns</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-5">
              Our 24 hour mobile tyre fitting covers Coventry and the towns around it. If you&apos;re not sure whether we cover your location, just call — we&apos;ll tell you straight away.
            </p>
            <div className="flex flex-wrap gap-2">
              {AREAS.map(a => (
                <Link key={a.slug} href={`/areas/${a.slug}`}
                  className="bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-700 text-sm font-semibold px-4 py-2 rounded-full transition-colors">
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-4">FAQ</span>
            <h2 className="text-3xl font-black text-slate-900">Emergency tyre fitting questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {FAQS.map(f => (
              <div key={f.q} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 text-[15px]">{f.q}</h3>
                <p className="text-slate-500 text-sm leading-[1.8]">{f.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-8">
            Not an emergency? <Link href="/tyres" className="text-blue-700 font-semibold hover:underline">Search tyres and book a fitting online</Link>.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg,#7c2d12,#c2410c)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">Stuck with a flat tyre right now?</h2>
          <p className="text-orange-100/80 mb-8 text-sm max-w-md mx-auto">Call us 24/7. Tell us where you are and your registration, and we&apos;ll be on our way.</p>
          <div className="flex justify-center"><CallButtons light /></div>
        </div>
      </section>
    </div>
  );
}

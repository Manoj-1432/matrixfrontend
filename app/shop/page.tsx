import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tyre Shop Coventry | Matrix Tyres & Autos | Unit 1 Bryant Road',
  description: 'Visit Matrix Tyres & Autos in Coventry — Unit 1, Bryant Road, Exhall, CV7 9EN. Tyre fitting, wheel balancing, batteries & bulbs. Open Mon–Sun 8am–6pm.',
  keywords: [
    'tyre shop Coventry',
    'tyre fitting Coventry',
    'wheel balancing Coventry',
    'car batteries Coventry',
    'bulb replacement Coventry',
    'Matrix Tyres Autos Coventry',
    'tyre garage Coventry',
    'Exhall tyre shop',
    'CV7 9EN tyres',
  ],
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Matrix Tyres & Autos | Tyre Shop Coventry',
    description: 'Visit our tyre shop at Unit 1, Bryant Road, Exhall, Coventry CV7 9EN. Tyre fitting, wheel balancing, batteries & bulbs. Mon–Sun 8am–6pm.',
    url: '/shop',
  },
};

const PHONE = '07721570075';
const WA    = 'https://wa.me/447721570075';
const MAPS  = 'https://maps.google.com/?q=Unit+1+Bryant+Road+Exhall+Coventry+CV7+9EN';

const SERVICES = [
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Tyre Fitting',
    desc: 'Full range of tyres fitted while you wait. Budget, mid-range and premium brands in stock for most vehicles.',
    color: '#2563eb',
  },
  {
    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    title: 'Wheel Balancing',
    desc: 'Precision wheel balancing to eliminate vibration and ensure even tyre wear for a smoother, safer drive.',
    color: '#7c3aed',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Car Batteries',
    desc: 'Battery testing, supply and fitting. We stock batteries for all makes and models — fitted in minutes.',
    color: '#d97706',
  },
  {
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    title: 'Bulb Replacement',
    desc: 'Headlights, brake lights, indicators and interior bulbs. Standard and LED upgrades available.',
    color: '#16a34a',
  },
];

const REASONS = [
  'Walk-in welcome — no appointment needed',
  'Most tyres fitted while you wait',
  'Competitive prices with no hidden charges',
  'Experienced, friendly technicians',
  'Wide range of tyre brands in stock',
  'Free tyre pressure check with every visit',
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4"
        style={{ background: 'linear-gradient(135deg,#0a1628,#0d1b3e,#0f2352)' }}>
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 70% 50%,rgba(79,70,229,0.18) 0%,transparent 55%)' }} />
        <div className="max-w-4xl mx-auto relative">
          <span className="inline-block bg-white/10 text-blue-300 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5 border border-white/10">Our Tyre Shop</span>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            Matrix Tyres &amp; Autos<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#34d399,#60a5fa)' }}>
              Coventry&apos;s local tyre shop
            </span>
          </h1>
          <p className="text-blue-200/70 text-lg max-w-xl mb-8">
            Visit us at Unit 1, Bryant Road, Exhall — walk-ins welcome, most jobs completed while you wait.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={MAPS} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)', boxShadow: '0 4px 20px rgba(79,70,229,0.35)' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Get Directions
            </a>
            <a href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="bg-white border-b border-slate-100 py-5 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Address', value: 'Unit 1, Bryant Road, Exhall, CV7 9EN' },
            { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Hours', value: 'Mon–Sun · 8am–6pm' },
            { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Phone', value: PHONE },
            { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Walk-ins', value: 'Always welcome' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-bold text-slate-800">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-4">What We Offer</span>
            <h2 className="text-3xl font-black text-slate-900">Shop services</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">Everything you need for your tyres and more — all under one roof at our Coventry workshop.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map(s => (
              <div key={s.title} className="bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${s.color}15` }}>
                  <svg className="w-5 h-5" style={{ color: s.color }} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + reasons */}
      <section className="py-20 px-4 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">

          {/* Map embed */}
          <div>
            <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5">Find Us</span>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Unit 1, Bryant Road</h2>
            <p className="text-slate-500 text-sm mb-5">Exhall, Coventry, CV7 9EN</p>
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ height: 280 }}>
              <iframe
                title="Matrix Tyres & Autos location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?q=Unit+1+Bryant+Road+Exhall+Coventry+CV7+9EN&output=embed"
              />
            </div>
            <a href={MAPS} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              Open in Google Maps
            </a>
          </div>

          {/* Why visit */}
          <div>
            <span className="inline-block bg-green-50 text-green-700 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5">Why Visit Us</span>
            <h2 className="text-2xl font-black text-slate-900 mb-6">Your local tyre experts</h2>
            <div className="flex flex-col gap-4">
              {REASONS.map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 border border-green-300 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{r}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-slate-50 border border-slate-100 rounded-2xl p-5">
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Opening Hours</p>
              <p className="font-bold text-slate-900">Monday – Sunday</p>
              <p className="text-slate-500 text-sm">8:00am – 6:00pm</p>
              <p className="text-xs text-slate-400 mt-2">Including bank holidays</p>
            </div>
          </div>
        </div>
      </section>

      {/* Also need mobile? */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 text-white">
              <h3 className="text-xl font-black mb-2">Need us to come to you?</h3>
              <p className="text-indigo-100 text-sm">We also offer a 24/7 mobile tyre fitting service — we come to your home, workplace or roadside across Coventry and surrounding areas.</p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link href="/tyres"
                className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl text-sm hover:bg-indigo-50 transition-colors">
                Book Mobile Fitting
              </Link>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

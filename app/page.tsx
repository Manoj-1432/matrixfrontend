'use client';
import Link from 'next/link';
import { useState } from 'react';

const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';

const SERVICES = [
  {
    title: 'Mobile Tyre Fitting',
    desc: 'We come to your home, workplace or roadside. No garage visit, no waiting room.',
    icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 5H4m0 0l4 4m-4-4l4-4',
    accent: '#2563eb',
    bg: '#eff6ff',
  },
  {
    title: 'Same Day Fitting',
    desc: 'Need it done today? Call us and we\'ll do everything we can to fit you in.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    accent: '#16a34a',
    bg: '#f0fdf4',
  },
  {
    title: 'TPMS Service',
    desc: 'Sensor reset and replacement carried out after every tyre change on modern vehicles.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    accent: '#7c3aed',
    bg: '#faf5ff',
  },
  {
    title: 'Emergency Callout',
    desc: 'Stranded with a puncture? We cover Coventry and all surrounding areas, 7 days a week.',
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    accent: '#ea580c',
    bg: '#fff7ed',
  },
];

const STEPS = [
  { n: '01', title: 'Enter your reg', desc: 'Type your number plate — we instantly find your vehicle and compatible tyres.' },
  { n: '02', title: 'Choose your tyres', desc: 'Compare brands, specs and prices, then pick the right tyre for your budget.' },
  { n: '03', title: 'Pick date & time', desc: 'Select a day that suits you — we work around your schedule.' },
  { n: '04', title: 'We come to you', desc: 'Your fitter arrives on time and has you back on the road in 30 minutes.' },
];

const BRANDS = ['Michelin', 'Continental', 'Bridgestone', 'Goodyear', 'Pirelli', 'Dunlop', 'Hankook', 'Falken', 'Yokohama'];


const AREAS = ['Coventry', 'Warwick', 'Leamington Spa', 'Rugby', 'Nuneaton', 'Bedworth', 'Hinckley'];

const FAQS = [
  {
    q: 'How does mobile tyre fitting work?',
    a: 'We come to your chosen location — home, work, or roadside — with everything needed to fit your tyres on the spot. No need to visit a garage or wait in a queue.',
  },
  {
    q: 'How do I know which tyres fit my car?',
    a: 'Simply enter your vehicle registration and we instantly identify the correct tyre size for your car. You can also find the size printed on your existing tyres or in your vehicle handbook.',
  },
  {
    q: 'Can you fit tyres the same day?',
    a: 'In many cases yes. For same-day or emergency fitting, call or WhatsApp us directly and we\'ll do everything we can to get to you quickly.',
  },
  {
    q: 'What areas do you cover?',
    a: 'We cover Coventry and all surrounding towns within a 15-mile radius, including Warwick, Leamington Spa, Rugby, Nuneaton, Bedworth and Hinckley.',
  },
  {
    q: 'Do you carry budget, mid-range and premium tyres?',
    a: 'Yes — we stock a wide range from leading brands like Michelin, Continental and Pirelli down to quality budget options, so you can choose what suits your budget.',
  },
  {
    q: 'What is a TPMS sensor and do I need one?',
    a: 'TPMS (Tyre Pressure Monitoring System) sensors are fitted to most cars made after 2014. After a tyre change the sensor must be reset or replaced — we carry out this service as standard.',
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.18em] mb-3">FAQ</p>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">Frequently asked questions</h2>
          <p className="text-slate-500 max-w-md mx-auto">Everything you need to know about our mobile tyre fitting service.</p>
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => (
            <div key={i}
              className={`border rounded-2xl overflow-hidden transition-all duration-200 ${open === i ? 'border-blue-200 shadow-md shadow-blue-50' : 'border-slate-100 hover:border-slate-200'}`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-900 text-[15px] leading-snug">{f.q}</span>
                <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${open === i ? 'bg-blue-600 text-white rotate-45' : 'bg-slate-100 text-slate-500'}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-6 bg-white">
                  <div className="h-px bg-slate-100 mb-4" />
                  <p className="text-slate-500 text-sm leading-[1.8]">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Icon({ d, className = 'w-5 h-5', style }: { d: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

export default function Home() {
  const [width, setWidth] = useState('');
  const [profile, setProfile] = useState('');
  const [rim, setRim] = useState('');
  const [speed, setSpeed] = useState('');

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d1b3e 50%, #0f2352 100%)' }}
      >
        {/* Background texture */}
        <div className="pointer-events-none absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(79,70,229,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.1) 0%, transparent 50%)',
        }} />
        {/* Subtle grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-400/30 text-green-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available Now · 7 Days a Week
            </div>

            <h1 className="text-5xl lg:text-[3.75rem] font-black text-white leading-[1.06] tracking-tight mb-6">
              Tyres Fitted at{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #34d399, #60a5fa)' }}>
                  Your Door
                </span>
              </span>
            </h1>

            <p className="text-blue-200/80 text-[1.05rem] leading-[1.8] mb-9 max-w-[450px]">
              Coventry&apos;s trusted mobile tyre fitting service. We come to you — home, work, or roadside — with no hidden fees and no garage wait.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/tyres"
                className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl text-white"
                style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)', boxShadow: '0 4px 24px rgba(79,70,229,0.4)' }}>
                Find My Tyres
                <Icon d="M17 8l4 4m0 0l-4 4m4-4H3" className="w-4 h-4" />
              </Link>
              <a href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 backdrop-blur-sm">
                <Icon d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-4 h-4 text-green-400" />
                {PHONE}
              </a>
            </div>

            <div className="flex flex-wrap gap-5">
              {['Fully insured', 'No hidden fees', 'Rated 5.0 ★', '7 days a week'].map(t => (
                <span key={t} className="flex items-center gap-2 text-[13px] text-blue-200/70 font-medium">
                  <span className="w-4 h-4 rounded-full bg-green-400/20 border border-green-400/40 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-green-400" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </span>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Quote card */}
          <div className="w-full max-w-md mx-auto lg:ml-auto">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <div className="px-7 py-6" style={{ background: 'linear-gradient(135deg, #1e3a8a, #312e81)' }}>
                <p className="text-white font-black text-lg">Get an instant quote</p>
                <p className="text-blue-300 text-sm mt-1">Enter your reg to see matching tyres &amp; prices</p>
              </div>

              <div className="px-7 pt-6 pb-7">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Your Registration</label>
                <div className="flex rounded-xl overflow-hidden ring-2 ring-yellow-400 mb-5 shadow-md">
                  <div className="bg-[#f5d100] flex items-center pl-4 pr-3 shrink-0">
                    <div className="bg-[#003399] text-white text-[7px] font-black tracking-[1.5px] px-1.5 py-0.5 rounded-sm leading-none">GB</div>
                  </div>
                  <input
                    type="text"
                    placeholder="AB12 CDE"
                    maxLength={8}
                    spellCheck={false}
                    autoCapitalize="characters"
                    className="flex-1 bg-[#f5d100] outline-none font-black text-2xl tracking-[0.18em] uppercase text-slate-900 placeholder:text-yellow-600/40 px-3 py-4"
                  />
                </div>

                <Link href="/tyres"
                  className="flex items-center justify-center gap-2 w-full text-white font-bold py-4 rounded-xl text-sm transition-all duration-200 mb-5 hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg, #1e40af, #4f46e5)', boxShadow: '0 4px 16px rgba(79,70,229,0.35)' }}>
                  Find Tyres for My Car
                  <Icon d="M17 8l4 4m0 0l-4 4m4-4H3" className="w-4 h-4" />
                </Link>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-xs text-slate-400 font-medium">or search by size</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  {[
                    { label: 'Width', opts: ['175','185','195','205','215','225','235','245','255'], val: width, set: setWidth },
                    { label: 'Profile', opts: ['35','40','45','50','55','60','65','70','75'], val: profile, set: setProfile },
                    { label: 'Rim (inch)', opts: ['14','15','16','17','18','19','20','21','22'], val: rim, set: setRim },
                    { label: 'Speed', opts: ['H','T','V','W','Y','ZR'], val: speed, set: setSpeed },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{f.label}</label>
                      <select
                        value={f.val}
                        onChange={e => f.set(e.target.value)}
                        className="w-full border border-slate-200 hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white outline-none transition-all"
                      >
                        <option value="">Select</option>
                        {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>

                <Link href="/tyres"
                  className="flex items-center justify-center w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-sm transition-colors">
                  Search by Size →
                </Link>
              </div>

              <div className="border-t border-slate-100 bg-slate-50 px-7 py-4 flex items-center gap-3">
                <span className="text-amber-400 text-sm">★★★★★</span>
                <p className="text-xs text-slate-500">Trusted by drivers across <strong className="text-slate-800">Coventry &amp; surrounding areas</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-0">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: '5.0 ★', label: 'Average Rating', sub: 'Verified customer reviews' },
              { value: '7 Days', label: 'A Week', sub: 'Including weekends & bank holidays' },
              { value: '30 min', label: 'Average Fit Time', sub: 'Per tyre, at your location' },
              { value: '15 mi', label: 'Radius of Coventry', sub: 'All surrounding towns covered' },
            ].map((s, i) => (
              <div key={s.label} className={`py-8 px-6 lg:px-8 text-center ${i < 3 ? 'border-r border-slate-100' : ''}`}>
                <p className="text-3xl font-black text-[#0d1b3e] mb-1">{s.value}</p>
                <p className="text-slate-700 font-semibold text-sm">{s.label}</p>
                <p className="text-slate-400 text-xs mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-24 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.18em] mb-3">What We Offer</p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Everything at your door</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map(s => (
              <Link key={s.title} href="/tyres"
                className="group bg-white rounded-2xl p-7 border border-slate-100 hover:border-transparent hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-2 transition-all duration-300 flex flex-col">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: s.bg }}>
                  <Icon d={s.icon} className="w-6 h-6" style={{ color: s.accent } as React.CSSProperties} />
                </div>
                <h3 className="font-bold text-slate-900 text-[15px] mb-2 leading-snug">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">{s.desc}</p>
                <span className="text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200"
                  style={{ color: s.accent }}>
                  Learn more
                  <Icon d="M17 8l4 4m0 0l-4 4m4-4H3" className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.18em] mb-3">Simple Process</p>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">How it works</h2>
            <p className="text-slate-500 max-w-sm mx-auto">From search to fitted tyres in four easy steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
            <div className="hidden lg:block absolute top-[26px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px bg-slate-200" />
            {STEPS.map(s => (
              <div key={s.n} className="relative z-10 flex flex-col items-center text-center group">
                <div
                  className="w-14 h-14 rounded-2xl font-black text-lg flex items-center justify-center mb-6 text-white transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #1e3a8a, #4f46e5)', boxShadow: '0 8px 24px rgba(79,70,229,0.3)' }}
                >
                  {s.n}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-[15px]">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href="/tyres"
              className="inline-flex items-center gap-2 text-white font-bold px-10 py-4 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #1e3a8a, #4f46e5)', boxShadow: '0 4px 20px rgba(79,70,229,0.35)' }}>
              Book Now
              <Icon d="M17 8l4 4m0 0l-4 4m4-4H3" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BRANDS ─── */}
      <section className="py-14 px-4 sm:px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-10">Tyre Brands We Stock</p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {BRANDS.map(b => (
              <span
                key={b}
                className="bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-slate-600 hover:text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 cursor-default select-none tracking-wide shadow-sm"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ─── FAQ ─── */}
      <FaqSection />

      {/* ─── AREAS ─── */}
      <section className="py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.18em] mb-3">Coverage</p>
          <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Areas We Cover</h2>
          <p className="text-slate-500 text-sm mb-8 max-w-xs mx-auto">
            Mobile tyre fitting within 15 miles of Coventry. Not sure?{' '}
            <a href={`tel:${PHONE}`} className="text-blue-600 font-semibold hover:underline">Just call us.</a>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {AREAS.map(a => (
              <Link key={a} href="/areas"
                className="bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50/60 text-slate-600 font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-200 shadow-sm hover:shadow-md">
                {a}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative py-24 px-4 sm:px-6 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d1b3e 60%, #0f2352 100%)' }}>
        <div className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(79,70,229,0.18) 0%, transparent 55%)' }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.18em] mb-4">Get Started</p>
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-5">Ready to get started?</h2>
          <p className="text-blue-200/70 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
            Book online or speak to our team directly. We&apos;re available 7 days a week across Coventry and all surrounding areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tyres"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-black px-8 py-4 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-xl">
              Find My Tyres →
            </Link>
            <a href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200">
              <Icon d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-4 h-4 text-green-400" />
              {PHONE}
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-green-900/20">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl shadow-green-500/40 flex items-center justify-center transition-all duration-200 hover:scale-110 z-50">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}

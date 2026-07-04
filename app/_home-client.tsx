'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';

const SERVICES = [
  {
    title: 'Mobile Tyre Fitting',
    desc: 'We come to your home, workplace or roadside. No garage visit, no waiting room.',
    icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 5H4m0 0l4 4m-4-4l4-4',
    accent: '#1d4ed8',
    href: '/tyres',
  },
  {
    title: 'Same Day Fitting',
    desc: "Need it done today? Call us and we'll do everything we can to fit you in.",
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    accent: '#16a34a',
    href: '/tyres',
  },
  {
    title: 'TPMS Diagnostic',
    desc: 'Sensor reset and replacement after every tyre change on modern vehicles.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    accent: '#7c3aed',
    href: '/tpms',
  },
  {
    title: 'Emergency Callout',
    desc: 'Stranded with a puncture? We cover Coventry and surrounding areas 7 days a week.',
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    accent: '#dc2626',
    href: '/contact',
  },
];

const STEPS = [
  { n: '1', title: 'Enter your reg', desc: 'Type your number plate — we instantly find your vehicle and compatible tyres.' },
  { n: '2', title: 'Choose your tyres', desc: 'Compare brands, specs and prices, then pick the right tyre for your budget.' },
  { n: '3', title: 'Pick date & time', desc: 'Select a day that suits you — we work around your schedule, 7 days a week.' },
  { n: '4', title: 'We come to you', desc: 'Your fitter arrives on time and has you back on the road in around 30 minutes.' },
];

const BRANDS = ['Michelin', 'Continental', 'Bridgestone', 'Goodyear', 'Pirelli', 'Dunlop', 'Hankook', 'Falken', 'Yokohama', 'Nexen', 'Toyo', 'BF Goodrich'];

const GUARANTEES = [
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Fully Insured & Qualified',
    desc: 'All our mobile fitters are fully insured and professionally trained to work on your vehicle.',
  },
  {
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Price Match Promise',
    desc: 'The price you see is the price you pay. No callout charges, no hidden fees, no surprises.',
  },
  {
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    title: 'Fast Response',
    desc: 'We aim to reach you within 60 minutes for emergency callouts across our coverage area.',
  },
  {
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    title: '5-Star Rated Service',
    desc: 'Consistently rated 5 stars by our customers across Coventry and the surrounding areas.',
  },
];

const AREAS = ['Coventry', 'Warwick', 'Leamington Spa', 'Rugby', 'Nuneaton', 'Bedworth', 'Hinckley'];

const FAQS = [
  { q: 'How does mobile tyre fitting work?', a: 'We come to your chosen location — home, work, or roadside — with everything needed to fit your tyres on the spot. No need to visit a garage or wait in a queue.' },
  { q: 'How do I know which tyres fit my car?', a: 'Simply enter your vehicle registration and we instantly identify the correct tyre size for your car. You can also find the size printed on your existing tyres or in your vehicle handbook.' },
  { q: 'Can you fit tyres the same day?', a: "In many cases yes. For same-day or emergency fitting, call or WhatsApp us directly and we'll do everything we can to get to you quickly." },
  { q: 'What areas do you cover?', a: 'We cover Coventry and all surrounding towns within a 15-mile radius, including Warwick, Leamington Spa, Rugby, Nuneaton, Bedworth and Hinckley.' },
  { q: 'Do you carry budget, mid-range and premium tyres?', a: 'Yes — we stock a wide range from leading brands like Michelin, Continental and Pirelli down to quality budget options, so you can choose what suits your budget.' },
  { q: 'What is a TPMS sensor and do I need one?', a: 'TPMS (Tyre Pressure Monitoring System) sensors are fitted to most cars made after 2014. After a tyre change the sensor must be reset or replaced — we carry out this service as standard.' },
];

function Icon({ d, className = 'w-5 h-5' }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 px-4 sm:px-6 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently asked questions</h2>
          <p className="text-gray-500">Everything you need to know about our mobile tyre fitting service.</p>
        </div>
        <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
          {FAQS.map((f, i) => (
            <div key={i} className="bg-white">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-[15px] leading-snug">{f.q}</span>
                <span className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${open === i ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-200 text-gray-400'}`}>
                  <svg className={`w-3 h-3 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-500 text-sm leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-8">
          Still have a question?{' '}
          <a href={`tel:${PHONE}`} className="text-blue-700 font-semibold hover:underline">Call us</a>
          {' '}or{' '}
          <a href={WA} target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:underline">WhatsApp us</a>
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  const router = useRouter();
  const [heroReg, setHeroReg] = useState('');
  const [width, setWidth] = useState('');
  const [profile, setProfile] = useState('');
  const [rim, setRim] = useState('');
  const [speed, setSpeed] = useState('');

  function handleHeroSearch() {
    const v = heroReg.trim().replace(/\s+/g, '').toUpperCase();
    if (!v) return;
    router.push(`/tyres?reg=${encodeURIComponent(v)}`);
  }

  function handleSizeSearch() {
    if (!width || !profile || !rim) return;
    router.push(`/tyres?width=${width}&profile=${profile}&rim=${rim}${speed ? `&speed=${speed}` : ''}`);
  }

  return (
    <>
      {/* ─── ANNOUNCEMENT BAR ─── */}
      <div className="bg-blue-700 text-white text-center text-xs font-semibold py-2.5 px-4 tracking-wide">
        🚗 &nbsp;Free TPMS reset included with every tyre fitting &nbsp;·&nbsp; Available 7 days a week across Coventry &amp; surrounding areas
      </div>

      {/* ─── HERO ─── */}
      <section className="bg-[#0d1b3e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-bold px-4 py-2 rounded-full mb-7 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Available Now · 7 Days a Week
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-[3.6rem] font-extrabold text-white leading-[1.1] tracking-tight mb-5">
              Professional Mobile<br />
              <span className="text-blue-400">Tyre Fitting</span><br />
              at Your Location
            </h1>

            <p className="text-blue-200/70 text-base lg:text-lg leading-relaxed mb-8 max-w-[440px]">
              Coventry&apos;s trusted mobile tyre service. We come to you — at home, work, or roadside — with no hidden fees and no garage wait.
            </p>

            <div className="flex flex-wrap gap-4 mb-9">
              <Link href="/tyres"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-lg text-sm transition-colors shadow-lg shadow-blue-900/40">
                Find My Tyres
                <Icon d="M17 8l4 4m0 0l-4 4m4-4H3" className="w-4 h-4" />
              </Link>
              <a href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 text-white font-bold px-7 py-3.5 rounded-lg text-sm transition-colors">
                <Icon d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-4 h-4 text-green-400" />
                {PHONE}
              </a>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {['Fully insured', 'No callout charge', '5★ rated', 'Same day available'].map(t => (
                <span key={t} className="flex items-center gap-2 text-[13px] text-blue-200/50 font-medium">
                  <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Quote card */}
          <div className="w-full max-w-[400px] mx-auto lg:ml-auto">
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-blue-700 px-6 py-5">
                <p className="text-white font-bold text-lg">Get an instant quote</p>
                <p className="text-blue-200 text-sm mt-0.5">Enter your reg or search by tyre size</p>
              </div>

              <div className="px-6 pt-5 pb-6">
                {/* Reg input */}
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Vehicle Registration</label>
                <div className="flex rounded-lg overflow-hidden border-2 border-yellow-400 mb-4 shadow-sm">
                  <div className="bg-yellow-400 flex items-center pl-3 pr-2 shrink-0">
                    <div className="bg-blue-800 text-white text-[7px] font-black tracking-[1.5px] px-1.5 py-0.5 rounded-sm leading-none">GB</div>
                  </div>
                  <input
                    type="text"
                    placeholder="AB12 CDE"
                    maxLength={8}
                    spellCheck={false}
                    autoCapitalize="characters"
                    value={heroReg}
                    onChange={e => setHeroReg(e.target.value.toUpperCase())}
                    onKeyDown={e => e.key === 'Enter' && handleHeroSearch()}
                    className="flex-1 bg-yellow-400 outline-none font-black text-2xl tracking-[0.2em] uppercase text-gray-900 placeholder:text-yellow-600/40 px-3 py-3.5 min-w-0"
                  />
                </div>

                <button onClick={handleHeroSearch}
                  className="flex items-center justify-center gap-2 w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-3.5 rounded-lg text-sm transition-colors mb-5 shadow-md">
                  Find Tyres for My Car
                  <Icon d="M17 8l4 4m0 0l-4 4m4-4H3" className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400 font-medium">or search by size</span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { label: 'Width', opts: ['175','185','195','205','215','225','235','245','255'], val: width, set: setWidth },
                    { label: 'Profile', opts: ['35','40','45','50','55','60','65','70','75'], val: profile, set: setProfile },
                    { label: 'Rim (inch)', opts: ['14','15','16','17','18','19','20','21','22'], val: rim, set: setRim },
                    { label: 'Speed', opts: ['H','T','V','W','Y','ZR'], val: speed, set: setSpeed },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{f.label}</label>
                      <select
                        value={f.val}
                        onChange={e => f.set(e.target.value)}
                        className="w-full border border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white outline-none transition-all cursor-pointer"
                      >
                        <option value="">—</option>
                        {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>

                <button onClick={handleSizeSearch}
                  className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg text-sm transition-colors">
                  Search by Size
                  <Icon d="M17 8l4 4m0 0l-4 4m4-4H3" className="w-3.5 h-3.5" />
                </button>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">Trusted by drivers across <strong className="text-gray-800">Coventry &amp; surrounding areas</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-100">
            {[
              { value: '5.0★', label: 'Customer Rating', sub: 'Based on Google reviews', color: '#f59e0b' },
              { value: '7 Days', label: 'A Week', sub: 'Including bank holidays', color: '#1d4ed8' },
              { value: '~30 min', label: 'Fit Time', sub: 'Per tyre, at your location', color: '#16a34a' },
              { value: '15 mile', label: 'Coverage Radius', sub: 'Around Coventry', color: '#7c3aed' },
            ].map((s, i) => (
              <div key={s.label} className={`py-8 px-6 text-center ${i >= 2 ? 'border-t border-gray-100 lg:border-t-0' : ''}`}>
                <p className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</p>
                <p className="text-gray-900 font-bold text-sm">{s.label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-blue-700 font-bold text-sm uppercase tracking-widest mb-2">Our Services</p>
            <h2 className="text-3xl font-bold text-gray-900">Everything at your door</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map(s => (
              <Link key={s.title} href={s.href}
                className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-200 flex flex-col">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0"
                  style={{ background: `${s.accent}14` }}>
                  <Icon d={s.icon} className="w-5 h-5" style={{ color: s.accent } as React.CSSProperties} />
                </div>
                <h3 className="font-bold text-gray-900 text-[15px] mb-2 leading-snug">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{s.desc}</p>
                <span className="text-sm font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200" style={{ color: s.accent }}>
                  Find out more
                  <Icon d="M17 8l4 4m0 0l-4 4m4-4H3" className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 px-4 sm:px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-blue-700 font-bold text-sm uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-[22px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-gray-200" />
            {STEPS.map(s => (
              <div key={s.n} className="relative flex flex-col items-start">
                <div className="w-11 h-11 rounded-full bg-blue-700 text-white font-black text-base flex items-center justify-center mb-5 shrink-0 relative z-10 shadow-md shadow-blue-200">
                  {s.n}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-[15px]">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link href="/tyres"
              className="inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-bold px-8 py-3.5 rounded-lg text-sm transition-colors shadow-md shadow-blue-200">
              Book Now
              <Icon d="M17 8l4 4m0 0l-4 4m4-4H3" className="w-4 h-4" />
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3.5 rounded-lg text-sm transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ─── OUR GUARANTEE ─── */}
      <section className="py-20 px-4 sm:px-6 bg-blue-700">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-blue-300 font-bold text-sm uppercase tracking-widest mb-2">Our Promise</p>
            <h2 className="text-3xl font-bold text-white">The Matrix Guarantee</h2>
            <p className="text-blue-200/70 mt-2 max-w-md">Every booking comes with our commitment to quality, transparency and reliability.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GUARANTEES.map(g => (
              <div key={g.title} className="bg-white/10 border border-white/10 rounded-xl p-6 hover:bg-white/15 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center mb-4">
                  <Icon d={g.icon} className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-white text-[15px] mb-2">{g.title}</h3>
                <p className="text-blue-100/65 text-sm leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRANDS ─── */}
      <section className="py-14 px-4 sm:px-6 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto mb-8">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">Tyre Brands We Stock</p>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(90deg, white, transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(270deg, white, transparent)' }} />
          <div className="flex gap-3 animate-marquee whitespace-nowrap">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <span key={i} className="inline-flex items-center bg-gray-50 border border-gray-200 text-gray-600 font-semibold text-sm px-6 py-2.5 rounded-lg tracking-wide shrink-0 select-none">
                {b}
              </span>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
          .animate-marquee { animation: marquee 28s linear infinite; }
          .animate-marquee:hover { animation-play-state: paused; }
        `}</style>
      </section>

      {/* ─── FAQ ─── */}
      <FaqSection />

      {/* ─── AREAS ─── */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-blue-700 font-bold text-sm uppercase tracking-widest mb-2">Coverage Area</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Areas We Cover</h2>
          <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">
            Mobile tyre fitting within 15 miles of Coventry. Not sure?{' '}
            <a href={`tel:${PHONE}`} className="text-blue-700 font-semibold hover:underline">Just call us.</a>
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 mb-6">
            {AREAS.map(a => (
              <Link key={a} href="/areas"
                className="flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 text-gray-600 font-semibold px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm">
                <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {a}
              </Link>
            ))}
          </div>
          <Link href="/areas" className="text-blue-700 text-sm font-semibold hover:underline">View full coverage map →</Link>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#0d1b3e] py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to get your tyres fitted?</h2>
          <p className="text-blue-200/60 text-base mb-10 max-w-md mx-auto">
            Book online in minutes or speak to our team directly. Available 7 days a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/tyres"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-black px-8 py-4 rounded-lg text-sm transition-colors shadow-xl">
              Find My Tyres →
            </Link>
            <a href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/30 hover:bg-white/8 text-white font-bold px-8 py-4 rounded-lg text-sm transition-colors">
              <Icon d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-4 h-4 text-green-400" />
              {PHONE}
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-lg text-sm transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

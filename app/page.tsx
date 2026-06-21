'use client';
import Link from 'next/link';
import { useState } from 'react';

const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';

const SERVICES = [
  { title: 'Mobile Tyre Fitting', desc: 'Professional fitting at your home, workplace or roadside. No garage visit needed.', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 5H4m0 0l4 4m-4-4l4-4', bg: '#eff6ff', color: '#1d4ed8' },
  { title: 'Same Day Fitting', desc: "Need tyres urgently? Call us and we'll do everything we can to help you today.", icon: 'M13 10V3L4 14h7v7l9-11h-7z', bg: '#f0fdf4', color: '#15803d' },
  { title: 'TPMS Service', desc: 'Tyre pressure sensor reset and replacement after every tyre change on modern vehicles.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', bg: '#faf5ff', color: '#7c3aed' },
  { title: 'Emergency Callout', desc: 'Stranded with a puncture? We cover Coventry and surrounding areas 7 days a week.', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', bg: '#fff7ed', color: '#c2410c' },
];

const STEPS = [
  { n: '01', title: 'Enter your reg', desc: 'Type in your number plate and we instantly identify your vehicle and compatible tyres.' },
  { n: '02', title: 'Choose your tyres', desc: 'Compare brands, read specs and select the right tyre for your vehicle and budget.' },
  { n: '03', title: 'Pick date & time', desc: 'Select any day from 8am to 8pm — we work around your schedule, not the other way around.' },
  { n: '04', title: 'We come to you', desc: 'Your fitter arrives on time and has you back on the road in as little as 30 minutes.' },
];

const BRANDS = ['Michelin', 'Continental', 'Bridgestone', 'Goodyear', 'Pirelli', 'Dunlop', 'Hankook', 'Falken', 'Yokohama'];

const REVIEWS = [
  { name: 'Daniel H.', loc: 'Coventry', text: 'Booked at 9am and had both tyres changed on my driveway by midday. Absolutely brilliant — will never go to a garage again.' },
  { name: 'Amelia K.', loc: 'Kenilworth', text: 'Excellent from start to finish. Great communication, friendly fitter and a fair price. Highly recommend.' },
  { name: 'Liam B.', loc: 'Leamington Spa', text: 'Far easier than going to a garage. Quality tyres, fair prices and a very knowledgeable technician.' },
  { name: 'Sophie W.', loc: 'Rugby', text: 'Had a blowout on the way to work. They came out within 2 hours and sorted me out quickly. A real lifesaver.' },
  { name: 'Ethan C.', loc: 'Nuneaton', text: 'Dead simple to book. Fitter arrived on time, explained everything clearly before starting. Very professional.' },
  { name: 'Olivia T.', loc: 'Warwick', text: 'Used Matrix twice now. Always reliable, always on time, always a fair price. My go-to tyre service.' },
];

const STATS = [
  { value: '1,000+', label: 'Happy Customers' },
  { value: '5.0 ★', label: 'Average Rating' },
  { value: '7 Days', label: 'A Week, 8am–8pm' },
  { value: '15 mi', label: 'Radius of Coventry' },
];

const AREAS = ['Coventry', 'Warwick', 'Leamington Spa', 'Rugby', 'Nuneaton', 'Bedworth', 'Hinckley'];

function SvgIcon({ d, className = 'w-5 h-5' }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] text-blue-700 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-4">
      {children}
    </span>
  );
}

export default function Home() {
  const [width, setWidth] = useState('');
  const [profile, setProfile] = useState('');
  const [rim, setRim] = useState('');

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4ff 30%, #f5f0ff 65%, #f0fff4 100%)',
        }}
        className="relative overflow-hidden px-4 sm:px-6 pt-16 pb-20 lg:pt-20 lg:pb-28"
      >
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #34d399 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-7">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
              Available Now · 7 Days a Week, 8am–8pm
            </div>

            <h1 className="text-[3.2rem] lg:text-[3.8rem] font-black tracking-tight text-slate-900 leading-[1.08] mb-6">
              Expert Tyres<br />
              Fitted{' '}
              <span
                style={{
                  background: 'linear-gradient(90deg, #1e40af, #4f46e5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                at Your Door
              </span>
            </h1>

            <p className="text-slate-500 text-[1.1rem] leading-[1.75] mb-9 max-w-[460px]">
              Coventry&apos;s trusted mobile tyre fitting service. We come to you — at home, at work, or roadside — with no hidden fees and no garage wait.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/tyres"
                className="inline-flex items-center gap-2 bg-[#0d1b3e] hover:bg-[#162447] text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 hover:-translate-y-0.5">
                Find My Tyres
                <SvgIcon d="M17 8l4 4m0 0l-4 4m4-4H3" className="w-4 h-4" />
              </Link>
              <a href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 shadow-sm hover:shadow-md">
                <SvgIcon d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-4 h-4 text-green-500" />
                {PHONE}
              </a>
            </div>

            <div className="flex flex-wrap gap-5">
              {['Fully insured', 'No hidden fees', 'Rated 5.0 ★', '1,000+ customers'].map(t => (
                <span key={t} className="flex items-center gap-1.5 text-[13px] text-slate-500 font-medium">
                  <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <svg className="w-2.5 h-2.5 text-green-600" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </span>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — quote card */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 ring-1 ring-slate-100 overflow-hidden">
              <div className="bg-[#0d1b3e] px-7 py-6">
                <p className="text-white font-black text-lg leading-tight">Get an instant tyre quote</p>
                <p className="text-blue-300 text-sm mt-1">Enter your reg to see matching tyres and live prices</p>
              </div>

              <div className="px-7 pt-6 pb-7">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Your Registration</p>
                <div className="flex rounded-xl overflow-hidden ring-2 ring-yellow-400 mb-5">
                  <div className="bg-[#f5d100] flex items-center pl-4 pr-3 shrink-0">
                    <div className="bg-[#003399] text-white text-[7px] font-black tracking-[1.5px] px-1.5 py-0.5 rounded-sm leading-none">GB</div>
                  </div>
                  <input
                    type="text"
                    placeholder="AB12 CDE"
                    maxLength={8}
                    spellCheck={false}
                    className="flex-1 bg-[#f5d100] outline-none font-black text-2xl tracking-[0.18em] uppercase text-slate-900 placeholder:text-yellow-600/40 px-3 py-4"
                  />
                </div>

                <Link href="/tyres"
                  className="flex items-center justify-center gap-2 w-full bg-[#0d1b3e] hover:bg-[#162447] text-white font-bold py-4 rounded-xl text-sm transition-all duration-200 mb-5 shadow-md shadow-slate-900/20 hover:shadow-lg hover:-translate-y-0.5">
                  Find Tyres for My Car
                  <SvgIcon d="M17 8l4 4m0 0l-4 4m4-4H3" className="w-4 h-4" />
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
                    { label: 'Speed', opts: ['H','T','V','W','Y','ZR'], val: '', set: () => {} },
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
                  className="flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-sm transition-colors">
                  Search by Size →
                </Link>
              </div>

              <div className="border-t border-slate-100 bg-slate-50 px-7 py-4 flex items-center gap-3">
                <span className="text-amber-400 text-sm tracking-wide">★★★★★</span>
                <p className="text-xs text-slate-500">Trusted by <strong className="text-slate-800 font-bold">1,000+ drivers</strong> across Coventry &amp; surrounding areas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-[#0d1b3e] py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-white/10">
          {STATS.map(s => (
            <div key={s.label} className="text-center lg:px-8">
              <p className="text-3xl font-black text-white mb-1">{s.value}</p>
              <p className="text-blue-300 text-sm font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>Our Services</SectionLabel>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Everything you need, at your door</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(s => (
              <Link key={s.title} href="/tyres"
                className="group relative bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-2xl hover:shadow-slate-100 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{ background: `${s.bg}` }} />
                <div className="relative">
                  <div className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: s.bg }}>
                    <SvgIcon d={s.icon} className="w-7 h-7" style={{ color: s.color } as React.CSSProperties} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 group-hover:gap-2.5" style={{ color: s.color }}>
                    Learn more
                    <SvgIcon d="M17 8l4 4m0 0l-4 4m4-4H3" className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 px-4 sm:px-6" style={{ background: '#f8faff' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <SectionLabel>Simple Process</SectionLabel>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">How it works</h2>
            <p className="text-slate-500 max-w-md mx-auto">From search to fitted tyres in four simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-[28px] left-[14%] right-[14%] h-px bg-slate-200" />
            {STEPS.map(s => (
              <div key={s.n} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-2xl bg-[#0d1b3e] text-white font-black text-lg flex items-center justify-center mb-5 shadow-lg shadow-slate-900/20 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                  {s.n}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-[15px]">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href="/tyres"
              className="inline-flex items-center gap-2 bg-[#0d1b3e] hover:bg-[#162447] text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 shadow-lg shadow-slate-900/20 hover:-translate-y-0.5">
              Start My Booking
              <SvgIcon d="M17 8l4 4m0 0l-4 4m4-4H3" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BRANDS ─── */}
      <section className="py-12 px-4 sm:px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-7">Tyre Brands We Stock</p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3">
            {BRANDS.map(b => (
              <span key={b} className="text-slate-300 font-black text-sm tracking-wide hover:text-slate-500 transition-colors cursor-default select-none">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel>Customer Reviews</SectionLabel>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">What our customers say</h2>
            </div>
            <div className="shrink-0 flex items-center gap-4 bg-amber-50 border border-amber-100 rounded-2xl px-6 py-4">
              <div>
                <div className="text-amber-400 text-xl leading-none">★★★★★</div>
                <p className="text-[11px] text-amber-700 font-semibold mt-0.5">1,000+ verified reviews</p>
              </div>
              <div className="text-4xl font-black text-amber-400 pl-4 border-l border-amber-200">5.0</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map(r => (
              <div key={r.name}
                className="group bg-slate-50 hover:bg-white rounded-2xl p-7 border border-transparent hover:border-slate-100 hover:shadow-xl hover:shadow-slate-100/80 transition-all duration-300 flex flex-col gap-4">
                <div className="text-amber-400 text-sm tracking-wider">★★★★★</div>
                <p className="text-slate-600 text-sm leading-[1.7] flex-1">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#0d1b3e] text-white text-sm font-black flex items-center justify-center shrink-0">
                    {r.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 text-sm">{r.name}</p>
                    <p className="text-slate-400 text-xs">{r.loc}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AREAS ─── */}
      <section className="py-16 px-4 sm:px-6" style={{ background: '#f8faff' }}>
        <div className="max-w-4xl mx-auto text-center">
          <SectionLabel>Service Coverage</SectionLabel>
          <h2 className="text-3xl font-black text-slate-900 mb-3">Areas We Cover</h2>
          <p className="text-slate-500 text-sm mb-8 max-w-sm mx-auto">
            Mobile tyre fitting within a 15-mile radius of Coventry. Not sure if we reach you?{' '}
            <a href={`tel:${PHONE}`} className="text-blue-600 font-semibold hover:underline">Just call us.</a>
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {AREAS.map(a => (
              <Link key={a} href="/areas"
                className="bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 text-slate-600 font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-200 shadow-sm hover:shadow-md">
                {a}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 px-4 sm:px-6 bg-[#0d1b3e] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse at 70% 50%, #4f46e5 0%, transparent 60%)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">Ready to get started?</h2>
          <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Book online in minutes or speak to our team. Available every day, 8am to 8pm across Coventry and surrounding areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tyres"
              className="bg-white hover:bg-blue-50 text-slate-900 font-black px-8 py-4 rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              Find My Tyres →
            </Link>
            <a href={`tel:${PHONE}`}
              className="border-2 border-white/25 hover:border-white/50 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2">
              <SvgIcon d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-4 h-4" />
              {PHONE}
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-green-900/20">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <a href={WA} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl shadow-green-500/40 flex items-center justify-center transition-all duration-200 hover:scale-110 z-50">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-label="WhatsApp">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}

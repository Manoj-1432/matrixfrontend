import Link from 'next/link';

const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';

const TRUST_ITEMS = [
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'Fully Insured' },
  { icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', label: 'Rated 5 Stars' },
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: '7 Days a Week' },
  { icon: 'M13 10V3L4 14h7v7l9-11h-7z', label: 'Same Day Available' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: '15-Mile Radius' },
];

const SERVICES = [
  { title: 'Mobile Tyre Fitting', desc: 'Professional fitting at your home, workplace or roadside. No garage visit needed.', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 5H4m0 0l4 4m-4-4l4-4', color: '#0d1b3e' },
  { title: 'Same Day Fitting', desc: 'Need tyres urgently? Call us and we\'ll do everything we can to help you today.', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: '#15803d' },
  { title: 'TPMS Service', desc: 'Tyre pressure sensor reset and replacement after every tyre change.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: '#1d4ed8' },
  { title: 'Emergency Callout', desc: 'Stranded with a puncture? We cover Coventry and surrounding areas 7 days a week.', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', color: '#b91c1c' },
];

const STEPS = [
  { n: '1', title: 'Enter your reg', desc: 'Type in your number plate and we instantly identify your vehicle and compatible tyres.' },
  { n: '2', title: 'Choose your tyres', desc: 'Compare brands, read specs and select the right tyre for your vehicle and budget.' },
  { n: '3', title: 'Pick date & time', desc: 'Select any day from 8am to 8pm — we work around your schedule, not the other way around.' },
  { n: '4', title: 'We come to you', desc: 'Your fitter arrives on time and has you back on the road in as little as 30 minutes.' },
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

const AREAS = ['Coventry', 'Warwick', 'Leamington Spa', 'Rugby', 'Nuneaton', 'Bedworth', 'Hinckley'];

function Icon({ d, className = 'w-5 h-5' }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(160deg, #f8faff 0%, #eef2ff 40%, #f0fdf4 100%)' }}
        className="px-4 sm:px-6 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

          {/* Left copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available Now · 7 Days a Week
            </div>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.06] mb-5">
              Expert Tyres<br />
              Fitted <span style={{ color: '#0d1b3e' }}>at Your Door</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-lg">
              Coventry&apos;s trusted mobile tyre fitting service. We come to you — at home, at work, or roadside — 7 days a week with no hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link href="/tyres"
                style={{ background: '#0d1b3e' }}
                className="text-white font-bold px-7 py-4 rounded-xl text-sm hover:opacity-90 transition-opacity text-center">
                Find My Tyres →
              </Link>
              <a href={`tel:${PHONE}`}
                className="border-2 border-slate-200 hover:border-slate-400 text-slate-700 font-bold px-7 py-4 rounded-xl text-sm transition-colors text-center flex items-center justify-center gap-2">
                <Icon d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-4 h-4 text-green-500" />
                {PHONE}
              </a>
            </div>

            {/* Mini trust row */}
            <div className="flex flex-wrap gap-4">
              {['Fully insured', 'No hidden fees', 'Rated 5.0 ★★★★★', '1,000+ happy customers'].map(t => (
                <span key={t} className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-green-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — reg search card */}
          <div className="w-full">
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/80 overflow-hidden border border-slate-100">
              {/* Card header */}
              <div style={{ background: '#0d1b3e' }} className="px-8 py-6">
                <p className="text-white font-black text-xl mb-1">Get an instant quote</p>
                <p className="text-blue-300 text-sm">Enter your reg to see compatible tyres and live prices</p>
              </div>

              <div className="p-8">
                {/* Reg plate */}
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Vehicle Registration</p>
                <div className="flex items-stretch gap-0 rounded-xl overflow-hidden border-2 border-yellow-400 mb-5 shadow-sm">
                  <div className="bg-[#f5d100] flex items-center px-4 gap-2.5 shrink-0">
                    <div className="flex flex-col items-center">
                      <div className="bg-[#003399] text-white text-[7px] font-black tracking-[1.5px] px-1.5 py-0.5 rounded-sm leading-none">GB</div>
                    </div>
                  </div>
                  <input type="text" placeholder="AB12 CDE" maxLength={8} spellCheck={false}
                    className="flex-1 bg-[#f5d100] outline-none font-black text-2xl tracking-[0.2em] uppercase text-slate-900 placeholder:text-yellow-600/50 px-4 py-4" />
                </div>

                <Link href="/tyres"
                  style={{ background: '#0d1b3e' }}
                  className="block w-full text-center text-white font-bold py-4 rounded-xl text-sm hover:opacity-90 transition-opacity mb-4">
                  Find Tyres for My Car →
                </Link>

                <div className="relative mb-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"/></div>
                  <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-slate-400 font-medium">or search by tyre size</span></div>
                </div>

                {/* Tyre size dropdowns */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[['Width', ['175','185','195','205','215','225','235','245','255']], ['Profile', ['35','40','45','50','55','60','65','70']], ['Rim', ['14','15','16','17','18','19','20','21']], ['Speed', ['H','T','V','W','Y']]].map(([label, opts]) => (
                    <div key={label as string}>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">{label as string}</label>
                      <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-colors">
                        <option>Select {label as string}</option>
                        {(opts as string[]).map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>

                <Link href="/tyres"
                  className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-sm transition-colors">
                  Search by Size →
                </Link>
              </div>

              {/* Card footer */}
              <div className="border-t border-slate-100 px-8 py-4 bg-slate-50 flex items-center gap-3">
                <span className="text-amber-400 text-base">★★★★★</span>
                <p className="text-xs text-slate-500">Trusted by <strong className="text-slate-800">1,000+ drivers</strong> across Coventry &amp; surrounding areas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="border-y border-slate-100 py-5 px-4 bg-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {TRUST_ITEMS.map(t => (
            <div key={t.label} className="flex items-center gap-2 text-slate-600 text-sm font-medium">
              <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <Icon d={t.icon} className="w-3.5 h-3.5 text-green-600" />
              </div>
              {t.label}
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">What We Offer</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Our Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(s => (
              <Link key={s.title} href="/tyres"
                className="group bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-colors"
                  style={{ background: `${s.color}15` }}>
                  <Icon d={s.icon} className="w-6 h-6" style={{ color: s.color } as React.CSSProperties} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                <p className="mt-4 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: s.color }}>
                  Learn more <span>→</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ background: '#f8faff' }} className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Simple Process</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">How it works</h2>
            <p className="text-slate-500 mt-3 max-w-md mx-auto">From search to fitted tyres in four simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] right-[-calc(50%-28px)] h-px bg-slate-200 z-0" />
                )}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-black mb-5 shadow-lg shadow-blue-900/20"
                    style={{ background: '#0d1b3e' }}>
                    {s.n}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/tyres"
              style={{ background: '#0d1b3e' }}
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl text-sm hover:opacity-90 transition-opacity">
              Start My Booking →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="py-12 px-4 sm:px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Tyre Brands We Stock</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {BRANDS.map(b => (
              <span key={b} className="text-slate-300 font-black text-base hover:text-slate-500 transition-colors cursor-default tracking-wide">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Testimonials</p>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">What our customers say</h2>
            </div>
            <div className="flex items-center gap-3 shrink-0 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3">
              <div>
                <div className="text-amber-400 text-xl leading-none mb-0.5">★★★★★</div>
                <p className="text-[10px] text-amber-700 font-semibold">1,000+ verified reviews</p>
              </div>
              <div className="text-3xl font-black text-amber-500 pl-3 border-l border-amber-200">5.0</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map(r => (
              <div key={r.name} className="bg-slate-50 rounded-2xl p-7 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-200 border border-transparent hover:border-slate-100">
                <div className="text-amber-400 text-sm tracking-wide mb-4">★★★★★</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full text-white text-sm font-black flex items-center justify-center shrink-0"
                    style={{ background: '#0d1b3e' }}>
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{r.name}</p>
                    <p className="text-slate-400 text-xs">{r.loc}</p>
                  </div>
                  <svg className="w-4 h-4 text-green-500 ml-auto" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AREAS ── */}
      <section style={{ background: '#f8faff' }} className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">Coverage</p>
          <h2 className="text-3xl font-black text-slate-900 mb-3">Areas We Cover</h2>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto text-sm">Within a 15-mile radius of Coventry. Not sure if we reach you? Just call us.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {AREAS.map(a => (
              <Link key={a} href="/areas"
                className="bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-700 text-slate-700 font-semibold px-5 py-2.5 rounded-full text-sm transition-all shadow-sm hover:shadow-md">
                {a}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ background: '#0d1b3e' }} className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">Ready to get started?</h2>
          <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Book online in minutes or speak to our team directly. We&apos;re available every day from 8am to 8pm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tyres"
              className="bg-white text-slate-900 font-black px-8 py-4 rounded-xl text-sm hover:bg-blue-50 transition-colors">
              Find My Tyres →
            </Link>
            <a href={`tel:${PHONE}`}
              className="border-2 border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
              <Icon d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-4 h-4" />
              {PHONE}
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl text-sm transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp floating button */}
      <a href={WA} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl shadow-green-200 flex items-center justify-center transition-all hover:scale-110 z-50">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}

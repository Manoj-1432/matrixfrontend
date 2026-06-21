import Link from 'next/link';

const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';

const SERVICES = [
  {
    title: 'Mobile Tyre Fitting',
    desc: 'We come to you — at home, work, or roadside. Fast, professional fitting on your driveway.',
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    href: '/tyres',
  },
  {
    title: 'TPMS Service',
    desc: 'Tyre pressure sensor reset and replacement. Required after every tyre change on modern vehicles.',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    href: '/tpms',
  },
  {
    title: 'Same Day Fitting',
    desc: 'Need tyres urgently? Call us and we\'ll do everything we can to fit you in the same day.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    href: '/contact',
  },
  {
    title: 'Emergency Callout',
    desc: 'Stranded with a puncture or blowout? We cover Coventry and surrounding areas 7 days a week.',
    icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
    href: '/contact',
  },
];

const BRANDS = ['Michelin', 'Continental', 'Bridgestone', 'Goodyear', 'Pirelli', 'Dunlop', 'Hankook', 'Falken'];

const STEPS = [
  { n: '1', title: 'Search by reg or size', desc: 'Enter your number plate or tyre size to see compatible options and live pricing.' },
  { n: '2', title: 'Choose your tyres', desc: 'Compare premium, mid-range and budget options from leading brands.' },
  { n: '3', title: 'Book a fitting slot', desc: 'Pick a date and time — 7 days a week, 8am to 8pm, at your location.' },
  { n: '4', title: 'We come to you', desc: 'Our fitter arrives on time and has your new tyres fitted in as little as 30 minutes.' },
];

const REVIEWS = [
  { name: 'Daniel H.', loc: 'Coventry', stars: 5, text: 'Booked at 9am, fitter arrived by midday and changed both tyres in under 30 minutes. Brilliant service, highly recommend.' },
  { name: 'Amelia K.', loc: 'Kenilworth', stars: 5, text: 'Excellent from start to finish. Kept updated throughout, fitter was friendly and professional. Will definitely use again.' },
  { name: 'Liam B.', loc: 'Leamington Spa', stars: 5, text: 'Competitive price, quality tyres and a really knowledgeable technician. Far easier than going to a garage.' },
  { name: 'Sophie W.', loc: 'Rugby', stars: 5, text: 'Had a blowout on my way to work. They came out within 2 hours and sorted me out. Absolute lifesaver.' },
  { name: 'Ethan C.', loc: 'Nuneaton', stars: 5, text: 'Simple to book online. Fitter turned up on time, explained everything and did a great job. Very impressed.' },
  { name: 'Olivia T.', loc: 'Warwick', stars: 5, text: 'Used Matrix twice now. Always punctual, always professional and always a fair price. My go-to for tyres.' },
];

const AREAS = ['Coventry', 'Warwick', 'Leamington Spa', 'Rugby', 'Nuneaton', 'Bedworth', 'Hinckley'];

function SvgIcon({ d, className = 'w-6 h-6' }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

function Stars({ n }: { n: number }) {
  return <span className="text-amber-400 text-sm tracking-tight">{'★'.repeat(n)}</span>;
}

export default function Home() {
  return (
    <div className="overflow-x-hidden">

      {/* ─────────────────── HERO ─────────────────── */}
      <section className="bg-[#0d1b3e] relative overflow-hidden">
        {/* subtle diagonal stripe */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(-55deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Coventry &amp; Surrounding Areas · 7 Days a Week
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6">
              Professional<br />
              <span className="text-blue-400">Mobile Tyre</span><br />
              Fitting Service
            </h1>
            <p className="text-blue-200 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
              We come to you — at home, at work, or by the roadside. Fast, expert tyre fitting at a time and place that suits you.
            </p>

            {/* REG SEARCH BOX */}
            <div className="bg-white rounded-2xl p-3 max-w-lg mb-6 shadow-2xl shadow-black/40">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1 mb-2">Enter Your Registration</p>
              <div className="flex gap-2">
                <div className="flex-1 flex items-center bg-[#f5d100] rounded-xl px-4 border-2 border-yellow-400 overflow-hidden">
                  <div className="flex flex-col items-center shrink-0 mr-3 py-0.5">
                    <div className="bg-[#003399] text-white text-[7px] font-black tracking-[2px] px-1.5 py-0.5 rounded-sm leading-none mb-0.5">GB</div>
                    <svg className="w-3 h-2 text-yellow-600" viewBox="0 0 12 8"><circle cx="6" cy="4" r="3" fill="currentColor" opacity="0.4"/></svg>
                  </div>
                  <input
                    type="text"
                    placeholder="AB12 CDE"
                    maxLength={8}
                    spellCheck={false}
                    className="w-full bg-transparent outline-none text-gray-900 font-black text-2xl tracking-[0.15em] uppercase placeholder:text-yellow-600/50 py-3"
                  />
                </div>
                <Link href="/tyres"
                  className="shrink-0 bg-[#1a2a5e] hover:bg-[#0d1628] text-white font-bold text-sm px-6 rounded-xl transition-colors flex items-center">
                  Find Tyres
                </Link>
              </div>
              <p className="text-[11px] text-gray-400 mt-2 px-1">
                Or <Link href="/tyres" className="text-[#1a2a5e] font-semibold hover:underline">search by tyre size</Link>
              </p>
            </div>

            {/* trust pills */}
            <div className="flex flex-wrap gap-3">
              {[
                '★★★★★  Rated 5.0 by 1,000+ customers',
                '✓  No hidden charges',
                '✓  Same day available',
              ].map(t => (
                <span key={t} className="bg-white/10 border border-white/20 text-white text-[12px] font-medium px-4 py-2 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── SERVICES ─────────────────── */}
      <section className="bg-white py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">Our Services</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Everything you need to get back on the road — delivered to your door.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(s => (
              <Link key={s.title} href={s.href}
                className="group bg-white border border-gray-200 rounded-2xl p-7 hover:border-[#1a2a5e] hover:shadow-lg transition-all duration-200">
                <div className="w-12 h-12 bg-[#f0f4ff] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#1a2a5e] transition-colors duration-200">
                  <SvgIcon d={s.icon} className="w-6 h-6 text-[#1a2a5e] group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="font-bold text-gray-900 text-[15px] mb-2 leading-snug">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                <p className="mt-4 text-[#1a2a5e] text-sm font-semibold group-hover:underline">Learn more →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── TYRE BRANDS ─────────────────── */}
      <section className="bg-gray-50 border-y border-gray-200 py-10 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-7">Tyre Brands We Stock</p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
            {BRANDS.map(b => (
              <span key={b} className="text-gray-400 font-bold text-sm tracking-wide hover:text-gray-700 transition-colors cursor-default">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── HOW IT WORKS ─────────────────── */}
      <section className="bg-white py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#1a2a5e] text-xs font-bold uppercase tracking-widest mb-3">Quick &amp; Easy</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 relative">
            {/* connecting line */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gray-200 z-0" />
            {STEPS.map(s => (
              <div key={s.n} className="relative z-10 flex flex-col items-center text-center px-6 mb-8 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-[#1a2a5e] text-white text-xl font-black flex items-center justify-center mb-5 ring-4 ring-white">
                  {s.n}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-[15px]">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/tyres"
              className="inline-flex items-center gap-2 bg-[#1a2a5e] hover:bg-[#0d1628] text-white font-bold px-8 py-4 rounded-xl text-sm transition-colors">
              Start your booking →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────── WHY US ─────────────────── */}
      <section className="bg-[#0d1b3e] py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">Why Matrix Mobile Tyres</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-6 leading-tight">
                The convenience of a tyre shop — delivered to your door
              </h2>
              <p className="text-blue-200 text-base leading-relaxed mb-10">
                Forget wasting half a day in a waiting room. Our professional mobile fitters come to you — saving you time, hassle and inconvenience. Same great quality, same trusted brands, at a time that suits you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/tyres" className="bg-white text-[#1a2a5e] hover:bg-blue-50 font-bold px-7 py-3.5 rounded-xl text-sm transition-colors">
                  Book Now
                </Link>
                <a href={`tel:${PHONE}`} className="border border-white/30 hover:border-white/60 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-colors flex items-center gap-2">
                  <SvgIcon d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-4 h-4" />
                  {PHONE}
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'We come to you', desc: 'Home, work or roadside — anywhere within our 15-mile radius.' },
                { title: '7 days a week', desc: 'Available every day from 8am to 8pm including bank holidays.' },
                { title: 'Same day available', desc: 'Call us for urgent fitting requests — we\'ll do our best to help.' },
                { title: 'All major brands', desc: 'Michelin, Continental, Bridgestone and more — to suit every budget.' },
                { title: 'No hidden fees', desc: 'The price you see is exactly what you pay. Total transparency.' },
                { title: 'Expert fitters', desc: 'Fully trained, experienced technicians you can trust.' },
              ].map(f => (
                <div key={f.title} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors">
                  <p className="font-bold text-white text-sm mb-1.5">{f.title}</p>
                  <p className="text-blue-300 text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── REVIEWS ─────────────────── */}
      <section className="bg-white py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[#1a2a5e] text-xs font-bold uppercase tracking-widest mb-3">Customer Reviews</p>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">Trusted by over 1,000 drivers</h2>
            </div>
            <div className="flex items-center gap-4 shrink-0 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3">
              <div>
                <div className="text-amber-400 text-lg tracking-tight leading-none mb-0.5">★★★★★</div>
                <p className="text-[11px] text-gray-400 font-medium">1,000+ verified reviews</p>
              </div>
              <div className="text-3xl font-black text-gray-900">5.0</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map(r => (
              <div key={r.name} className="bg-gray-50 border border-gray-200 rounded-2xl p-7 flex flex-col gap-4">
                <Stars n={r.stars} />
                <blockquote className="text-gray-700 text-sm leading-relaxed flex-1">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-[#1a2a5e] text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                    <p className="text-gray-400 text-xs">{r.loc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── AREAS ─────────────────── */}
      <section className="bg-gray-50 border-y border-gray-200 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#1a2a5e] text-xs font-bold uppercase tracking-widest mb-3">Service Coverage</p>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Areas We Cover</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Within a 15-mile radius of Coventry. Not sure if we reach you? Just give us a call.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {AREAS.map(a => (
              <Link key={a} href="/areas"
                className="bg-white border border-gray-300 hover:border-[#1a2a5e] hover:text-[#1a2a5e] text-gray-700 font-medium px-5 py-2.5 rounded-full text-sm transition-all shadow-sm hover:shadow-md">
                {a}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── BOTTOM CTA ─────────────────── */}
      <section className="bg-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Book online in minutes or call us directly. Our team is available 7 days a week, 8am to 8pm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tyres"
              className="bg-[#1a2a5e] hover:bg-[#0d1628] text-white font-bold px-8 py-4 rounded-xl text-base transition-colors">
              Find My Tyres →
            </Link>
            <a href={`tel:${PHONE}`}
              className="border-2 border-[#1a2a5e] text-[#1a2a5e] hover:bg-[#1a2a5e] hover:text-white font-bold px-8 py-4 rounded-xl text-base transition-all flex items-center justify-center gap-2">
              <SvgIcon d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-4 h-4" />
              {PHONE}
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl text-base transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

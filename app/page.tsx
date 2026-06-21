import Link from 'next/link';

const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';

const HOW_STEPS = [
  { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', title: 'Enter Registration', desc: 'Add your registration and start your search instantly.' },
  { icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18', title: 'We Detect Your Vehicle', desc: 'Our system identifies matching tyre sizes for your exact car.' },
  { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Choose & Book Tyres', desc: 'Compare trusted options and confirm your booking in moments.' },
];

const WHY_CARDS = [
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Convenient', desc: 'We can come to you 7 days a week between 8am and 8pm, at home or at work.' },
  { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title: 'Best availability', desc: 'We offer same day fitting services on selected tyres.' },
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Trusted service', desc: 'Our mobile fitting service is highly rated by customers.' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: 'Coverage', desc: 'We provide fast 24/7 mobile tyre fitting within a 15-mile radius of Coventry.' },
];

const REVIEWS = [
  { name: 'Daniel H.', loc: 'Coventry', text: 'Booked at 9am, fitter arrived by midday and changed both tyres in under 30 minutes. Brilliant service, highly recommend.' },
  { name: 'Amelia K.', loc: 'Kenilworth', text: 'Excellent from start to finish. Kept me updated throughout. Fitter was friendly and professional. Will use again.' },
  { name: 'Liam B.', loc: 'Leamington Spa', text: 'Competitive price, quality tyres and a really knowledgeable technician. Far easier than going to a garage.' },
  { name: 'Sophie W.', loc: 'Rugby', text: 'Had a blowout on the way to work. They came out within 2 hours and sorted me out. Absolute lifesaver.' },
  { name: 'Ethan C.', loc: 'Nuneaton', text: 'Simple to book online. Fitter turned up on time, explained everything and did a great job. Very impressed.' },
  { name: 'Olivia T.', loc: 'Warwick', text: 'Used Matrix twice now. Always punctual, always professional and always a fair price. My go-to for tyres.' },
];

const AREAS = ['Coventry', 'Warwick', 'Leamington Spa', 'Rugby', 'Nuneaton', 'Bedworth', 'Hinckley'];

function Icon({ d, className = 'w-6 h-6' }: { d: string; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="gradient-bg min-h-screen">

      {/* ── HERO ── */}
      <section className="px-4 sm:px-6 pt-16 pb-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-purple-200 bg-white/60 backdrop-blur-sm text-purple-700 text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full mb-8">
            Premium Tyre Booking
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.05] mb-6">
            Find the <span className="gradient-text">Perfect Tyres</span> for Your Car
          </h1>

          <p className="text-gray-500 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Enter your registration number and get instant tyre recommendations, pricing, and booking in seconds.
          </p>

          {/* Registration search */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-4 bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg shadow-purple-100/50 border border-purple-100">
            <div className="flex-1 flex items-center gap-3 px-4">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2.5 1M3 6l2.5 1M13 6l-2.5 1M13 16l2 1M7 7h6m0 0v4M7 7v4"/></svg>
              <input
                type="text"
                placeholder="ENTER REGISTRATION (E.G., AB12CDE)"
                maxLength={8}
                spellCheck={false}
                className="w-full bg-transparent outline-none text-gray-800 font-bold text-sm tracking-widest uppercase placeholder:text-gray-400 placeholder:font-normal placeholder:tracking-wider py-3"
              />
            </div>
            <Link href="/tyres"
              className="gradient-btn text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-md shadow-purple-200">
              Find My Tyres →
            </Link>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center items-center gap-2 mt-6 mb-4">
            <span className="text-sm text-gray-500 font-medium">Trusted by 1,000+ drivers</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {['Fast Fitting', 'Best Prices', 'Same Day Service'].map(t => (
              <span key={t} className="flex items-center gap-1.5 border border-green-300 text-green-700 bg-white/60 text-xs font-semibold px-4 py-2 rounded-full">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEARCH BY TYRE SIZE ── */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-7 shadow-md shadow-purple-100/40 border border-purple-50">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Search by Tyre Size</h2>
            <p className="text-gray-500 text-sm mb-6">Prefer searching manually? Choose your tyre dimensions and see matching options instantly.</p>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { label: 'WIDTH', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', options: ['175', '185', '195', '205', '215', '225', '235', '245', '255', '265', '275'] },
                { label: 'RATIO', icon: 'M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01', options: ['35', '40', '45', '50', '55', '60', '65', '70', '75'] },
                { label: 'RIM', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', options: ['13', '14', '15', '16', '17', '18', '19', '20', '21', '22'] },
                { label: 'SPEED RATING', icon: 'M13 10V3L4 14h7v7l9-11h-7z', options: ['H', 'T', 'V', 'W', 'Y', 'ZR'] },
              ].map(f => (
                <div key={f.label}>
                  <div className="flex items-center gap-1.5 text-purple-600 text-[10px] font-bold tracking-widest uppercase mb-1.5">
                    <Icon d={f.icon} className="w-3.5 h-3.5" />
                    {f.label}
                  </div>
                  <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 bg-white focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-200 transition-colors">
                    <option value="">Select {f.label.split(' ')[0]}</option>
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div className="flex items-end">
                <Link href="/tyres"
                  className="w-full gradient-btn text-white font-bold text-sm py-2.5 rounded-lg text-center transition-all">
                  Search Size
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500 text-base max-w-lg mx-auto">From search to booking, every step is designed to be fast, clear, and reliable.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_STEPS.map(s => (
              <div key={s.title} className="bg-white/80 backdrop-blur-sm border border-purple-50 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center mx-auto mb-4">
                  <Icon d={s.icon} className="w-6 h-6 text-gray-700" />
                </div>
                <div className="w-full h-px bg-gray-100 mb-5" />
                <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">Why choose our mobile tyre fitting service?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_CARDS.map(c => (
              <div key={c.title} className="bg-white/80 backdrop-blur-sm border border-purple-50 rounded-2xl p-7 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center mx-auto mb-4">
                  <Icon d={c.icon} className="w-5 h-5 text-gray-700" />
                </div>
                <div className="w-full h-px bg-gray-100 mb-4" />
                <h3 className="font-bold text-gray-900 text-base mb-2">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">What our customers say</h2>
            <div className="flex justify-center items-center gap-1 mt-2">
              <span className="text-amber-400 text-lg">★★★★★</span>
              <span className="text-gray-500 text-sm ml-1">Rated 5.0 by 1,000+ customers</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map(r => (
              <div key={r.name} className="bg-white/80 backdrop-blur-sm border border-purple-50 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl text-purple-200 font-serif leading-none mb-4">&ldquo;</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{r.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                    <p className="text-gray-400 text-xs">{r.loc}</p>
                  </div>
                  <span className="ml-auto text-amber-400 text-xs">★★★★★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COVERAGE AREAS ── */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Areas We Cover</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Mobile tyre fitting within a 15-mile radius of Coventry and all surrounding towns.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {AREAS.map(a => (
              <Link key={a} href="/areas"
                className="bg-white/80 border border-purple-100 hover:border-purple-300 hover:bg-purple-50 text-gray-700 hover:text-purple-700 font-medium px-5 py-2.5 rounded-full text-sm transition-all shadow-sm">
                {a}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 sm:px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm border border-purple-100 rounded-3xl p-10 shadow-lg shadow-purple-100/40">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Ready to book?</h2>
            <p className="text-gray-500 mb-8">Book online in minutes or call us directly. Available 7 days a week, 8am–8pm.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/tyres"
                className="gradient-btn text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-md shadow-purple-200">
                Find My Tyres →
              </Link>
              <a href={`tel:${PHONE}`}
                className="border-2 border-gray-200 hover:border-purple-300 text-gray-700 hover:text-purple-700 font-bold px-8 py-4 rounded-xl text-sm transition-all">
                Call {PHONE}
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl text-sm transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp floating button */}
      <a href={WA} target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg shadow-green-200 flex items-center justify-center transition-colors z-50">
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  );
}

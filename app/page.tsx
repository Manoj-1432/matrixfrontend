import Link from 'next/link';

const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';

const STATS = [
  { value: '1,000+', label: 'Happy Customers' },
  { value: '5.0★', label: 'Average Rating' },
  { value: '7 Days', label: 'A Week, 8am–8pm' },
  { value: '15 Miles', label: 'Radius of Coventry' },
];

const STEPS = [
  {
    title: 'Enter Your Reg',
    desc: 'Type in your number plate and we instantly identify your vehicle and compatible tyres.',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  },
  {
    title: 'Choose Your Tyres',
    desc: 'Compare tyre options and prices. We stock all major brands to suit every budget.',
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
  },
  {
    title: 'Pick a Date & Time',
    desc: 'Select a convenient date and time slot. Available every day from 8am to 8pm.',
    icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
  {
    title: 'We Come to You',
    desc: 'Our professional fitter arrives at your home or workplace and gets you back on the road.',
    icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
  },
];

const FEATURES = [
  { title: 'Mobile Fitting at Your Door', desc: 'No need to visit a garage. We come to your home, workplace, or roadside — anywhere within our 15-mile coverage area.', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { title: 'Same Day Service Available', desc: 'Need tyres urgently? Call us directly and we\'ll do our best to fit you in the same day, subject to availability.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { title: 'Open 7 Days a Week', desc: 'We work every day including weekends and bank holidays, 8am to 8pm, so fitting around your schedule is easy.', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { title: 'Transparent Pricing', desc: 'The price you see is the price you pay. No hidden charges, no nasty surprises — just honest, competitive rates.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { title: 'All Major Tyre Brands', desc: 'We stock premium, mid-range and budget tyres from trusted manufacturers — the right tyre for your vehicle and budget.', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  { title: 'Professional Technicians', desc: 'All our fitters are fully trained and experienced professionals who take pride in delivering a quality, safe service.', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
];

const REVIEWS = [
  { name: 'Daniel H.', location: 'Coventry', text: 'Booked at 9am, fitter arrived by midday and had both tyres changed in under 30 minutes. Absolutely brilliant service.' },
  { name: 'Amelia K.', location: 'Kenilworth', text: 'Great communication from the moment I booked to when the fitter left. Will definitely use again.' },
  { name: 'Liam B.', location: 'Leamington Spa', text: 'Fair prices, quality tyres and a really friendly, professional technician. Couldn\'t ask for more.' },
  { name: 'Sophie W.', location: 'Rugby', text: 'Got a puncture at work. They came out the same afternoon and sorted it quickly. Lifesaver!' },
  { name: 'Ethan C.', location: 'Nuneaton', text: 'The online booking was easy and the fitter explained everything clearly before starting. Very professional.' },
  { name: 'Olivia T.', location: 'Warwick', text: 'Used them twice now. Always reliable, always on time and always a pleasure to deal with.' },
];

const AREAS = ['Coventry', 'Warwick', 'Leamington Spa', 'Rugby', 'Nuneaton', 'Bedworth', 'Hinckley'];

function Icon({ path, className = 'w-6 h-6' }: { path: string; className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-[#0d1b3e] text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-blue-300">
              <span className="flex h-2 w-2 rounded-full bg-green-400" />
              Coventry&apos;s Mobile Tyre Fitting Specialists
            </div>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6">
              New Tyres Fitted<br />
              <span className="text-blue-400">at Your Door.</span>
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed mb-10 max-w-lg">
              Enter your registration to find the right tyres for your car. We come to you — at home, at work, or roadside. 7 days a week.
            </p>

            {/* Registration search */}
            <div className="bg-white rounded-xl p-2 flex items-stretch gap-2 max-w-md mb-8 shadow-2xl shadow-black/30">
              <div className="flex-1 flex items-center bg-[#f5d200] rounded-lg px-4 py-3 gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className="bg-[#003399] rounded-sm px-1.5 py-0.5 mb-1">
                    <span className="text-white text-[7px] font-black tracking-widest leading-none">GB</span>
                  </div>
                  <div className="w-3 h-0.5 bg-[#f5d200]" />
                </div>
                <input
                  type="text"
                  placeholder="AB12 CDE"
                  maxLength={8}
                  className="bg-transparent w-full outline-none font-black tracking-[0.2em] uppercase text-gray-900 text-xl placeholder:text-gray-400"
                />
              </div>
              <Link
                href="/tyres"
                className="bg-[#1a2a5e] hover:bg-[#0d1b3e] text-white font-bold px-6 rounded-lg text-sm transition-colors flex items-center whitespace-nowrap"
              >
                Find Tyres
              </Link>
            </div>

            <p className="text-sm text-blue-300">
              Or{' '}
              <Link href="/tyres" className="underline underline-offset-2 hover:text-white transition-colors">
                search by tyre size
              </Link>
              {' '}· Questions?{' '}
              <a href={`tel:${PHONE}`} className="underline underline-offset-2 hover:text-white transition-colors">
                Call {PHONE}
              </a>
            </p>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(s => (
              <div key={s.label}>
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-sm text-blue-300 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-sm font-semibold text-[#1a2a5e] uppercase tracking-widest mb-3">Simple &amp; Fast</p>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#f0f4ff] border-2 border-[#1a2a5e] flex items-center justify-center shrink-0">
                    <span className="text-[#1a2a5e] font-black text-sm">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block flex-1 h-px bg-gray-200" />
                  )}
                </div>
                <div className="mb-3">
                  <Icon path={step.icon} className="w-5 h-5 text-[#1a2a5e]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-sm font-semibold text-[#1a2a5e] uppercase tracking-widest mb-3">Why Choose Us</p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-6">
                The smarter way to get tyres fitted
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                We believe getting new tyres shouldn&apos;t mean taking time off work or sitting in a waiting room. Matrix Mobile Tyres brings a professional, fast fitting service directly to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/tyres"
                  className="bg-[#1a2a5e] hover:bg-[#0d1b3e] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors text-center">
                  Browse Tyres
                </Link>
                <a href={`tel:${PHONE}`}
                  className="border border-gray-300 hover:border-[#1a2a5e] text-gray-700 hover:text-[#1a2a5e] font-semibold px-6 py-3 rounded-lg text-sm transition-colors text-center">
                  Call {PHONE}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map(f => (
                <div key={f.title} className="bg-white rounded-xl p-5 border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all">
                  <div className="w-9 h-9 rounded-lg bg-[#f0f4ff] flex items-center justify-center mb-3">
                    <Icon path={f.icon} className="w-5 h-5 text-[#1a2a5e]" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-sm font-semibold text-[#1a2a5e] uppercase tracking-widest mb-3">Testimonials</p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight">What our customers say</h2>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-yellow-400 text-xl tracking-tight">★★★★★</div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Rated 5.0 / 5</p>
                <p className="text-xs text-gray-400">Based on 1,000+ reviews</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map(r => (
              <div key={r.name} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow bg-white">
                <div className="text-yellow-400 text-base tracking-wider mb-4">★★★★★</div>
                <blockquote className="text-gray-700 text-sm leading-relaxed mb-6">
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1a2a5e] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COVERAGE ── */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-[#1a2a5e] uppercase tracking-widest mb-3">Service Area</p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">
                We cover Coventry &amp; surrounding areas
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Our mobile fitters operate within a 15-mile radius of Coventry, covering all nearby towns and villages. Not sure if we reach you? Give us a call.
              </p>
              <a href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a2a5e] hover:underline">
                <Icon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-4 h-4" />
                {PHONE}
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              {AREAS.map(a => (
                <Link key={a} href="/areas"
                  className="flex items-center gap-2 bg-white border border-gray-200 hover:border-[#1a2a5e] hover:text-[#1a2a5e] text-gray-700 font-medium px-5 py-3 rounded-full text-sm transition-all shadow-sm hover:shadow-md">
                  <Icon path="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" className="w-3.5 h-3.5 text-[#1a2a5e] shrink-0" />
                  {a}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0d1b3e] py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight mb-4">
            Ready to book your tyre fitting?
          </h2>
          <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Get started online in minutes, or call us to speak to the team directly. We&apos;re available 7 days a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tyres"
              className="bg-white text-[#1a2a5e] hover:bg-blue-50 font-bold px-8 py-4 rounded-lg text-base transition-colors">
              Find My Tyres
            </Link>
            <a href={`tel:${PHONE}`}
              className="bg-transparent border border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-lg text-base transition-colors flex items-center justify-center gap-2">
              <Icon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" className="w-4 h-4" />
              {PHONE}
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-4 rounded-lg text-base transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

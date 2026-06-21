import Link from 'next/link';

const PHONE = '07721570075';
const AREAS = ['Coventry', 'Warwick', 'Leamington Spa', 'Rugby', 'Nuneaton', 'Bedworth', 'Hinckley'];

const REVIEWS = [
  { name: 'Daniel Harper', location: 'Coventry', text: 'Booked in the morning and had two new tyres fitted on my driveway by lunchtime.' },
  { name: 'Amelia Khan', location: 'Kenilworth', text: 'Great communication from start to finish.' },
  { name: 'Liam Bennett', location: 'Leamington Spa', text: 'Fair prices, quality tyres, and a friendly technician.' },
  { name: 'Sophie Walker', location: 'Rugby', text: 'I had a puncture at work and they came the same day.' },
  { name: 'Ethan Collins', location: 'Nuneaton', text: 'The online booking was straightforward and the fitter explained everything clearly.' },
  { name: 'Olivia Turner', location: 'Warwick', text: 'Reliable, punctual, and hassle-free.' },
];

const STEPS = [
  { icon: '🔍', title: 'Enter Registration', desc: 'Type in your car reg and we instantly detect your vehicle.' },
  { icon: '🚗', title: 'We Detect Your Vehicle', desc: 'We find the right tyre sizes and recommendations for your car.' },
  { icon: '🛒', title: 'Choose & Book Tyres', desc: 'Select your tyres, pick a fitting slot, and confirm your booking.' },
  { icon: '🔧', title: 'We Come to You', desc: 'Our fitter arrives at your home or workplace and gets you back on the road.' },
];

export default function Home() {
  return (
    <div>
      {/* hero */}
      <section className="bg-gradient-to-br from-[#1a2a5e] to-[#0f1a3d] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Find the Perfect Tyres<br />for Your Car
          </h1>
          <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">
            Enter your registration number and get instant tyre recommendations, pricing, and booking in seconds.
          </p>

          {/* reg search */}
          <div className="bg-white rounded-2xl p-6 max-w-lg mx-auto shadow-xl">
            <div className="flex gap-3">
              <div className="flex-1 flex items-center bg-yellow-400 rounded-xl px-4 font-extrabold text-gray-900 text-lg tracking-widest uppercase">
                <span className="text-blue-700 mr-2 text-sm font-black">GB</span>
                <input
                  type="text"
                  placeholder="AB12 CDE"
                  maxLength={8}
                  className="bg-transparent w-full outline-none placeholder-gray-500 font-extrabold tracking-widest uppercase text-gray-900 text-xl"
                />
              </div>
              <Link href="/tyres"
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap">
                Find My Tyres
              </Link>
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">Or <Link href="/tyres" className="text-blue-600 underline">search by tyre size</Link></p>
          </div>
        </div>
      </section>

      {/* trust bar */}
      <section className="bg-blue-700 text-white py-5 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-sm font-semibold">
          <span>⭐ Trusted by 1,000+ drivers</span>
          <span>⚡ Fast Fitting</span>
          <span>💰 Best Prices</span>
          <span>📅 Same Day Service</span>
          <span>📍 15-mile radius of Coventry</span>
        </div>
      </section>

      {/* how it works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">How It Works</h2>
          <p className="text-center text-gray-500 mb-10">Get new tyres fitted in 4 simple steps</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.title} className="text-center p-5 rounded-2xl border border-gray-100 bg-gray-50 relative">
                <div className="text-4xl mb-3">{s.icon}</div>
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-700 text-white text-xs font-bold flex items-center justify-center">{i + 1}</div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">{s.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* why choose us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Why choose our mobile tyre fitting service?</h2>
            <div className="flex flex-col gap-5">
              {[
                { icon: '📅', title: 'Convenient', desc: '7 days a week between 8am and 8pm, at home or at work.' },
                { icon: '⚡', title: 'Best availability', desc: 'Same-day fitting on selected tyres.' },
                { icon: '⭐', title: 'Trusted service', desc: 'Highly rated by over 1,000 customers across Coventry and surrounding areas.' },
                { icon: '📍', title: 'Wide coverage', desc: 'Mobile tyre fitting within a 15-mile radius of Coventry.' },
              ].map(f => (
                <div key={f.title} className="flex gap-4 items-start">
                  <span className="text-2xl">{f.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">{f.title}</h3>
                    <p className="text-gray-500 text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-blue-700 rounded-2xl p-8 text-white text-center">
            <p className="text-5xl font-extrabold mb-2">1,000+</p>
            <p className="text-blue-200 mb-6">Happy customers across Coventry &amp; surrounding areas</p>
            <Link href="/booking"
              className="bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors inline-block">
              Book Your Fitting
            </Link>
            <p className="text-blue-200 text-sm mt-4">Or call us: <a href={`tel:${PHONE}`} className="text-white font-bold underline">{PHONE}</a></p>
          </div>
        </div>
      </section>

      {/* reviews */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">What our customers say</h2>
          <p className="text-center text-gray-500 mb-10">Real reviews from drivers across Coventry and surrounding areas</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {REVIEWS.map(r => (
              <div key={r.name} className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <div className="text-yellow-400 text-sm mb-2">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-700 text-sm italic mb-3">&ldquo;{r.text}&rdquo;</p>
                <p className="text-sm font-bold text-gray-900">{r.name}</p>
                <p className="text-xs text-gray-400">{r.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* coverage areas */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Areas We Cover</h2>
          <p className="text-gray-500 mb-8">Mobile tyre fitting within 15 miles of Coventry</p>
          <div className="flex flex-wrap justify-center gap-3">
            {AREAS.map(a => (
              <span key={a} className="bg-blue-50 border border-blue-200 text-blue-700 font-semibold px-5 py-2 rounded-full text-sm">
                📍 {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#1a2a5e] text-white text-center">
        <h2 className="text-3xl font-extrabold mb-3">Ready to get new tyres fitted?</h2>
        <p className="text-blue-200 mb-8 max-w-md mx-auto">Same-day fitting available on selected tyres. We come to your home or workplace.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/tyres"
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-8 py-3 rounded-xl text-lg transition-colors">
            Find My Tyres
          </Link>
          <a href={`tel:${PHONE}`}
            className="border border-white/30 hover:bg-white/10 text-white font-bold px-8 py-3 rounded-xl text-lg transition-colors">
            📞 {PHONE}
          </a>
        </div>
      </section>
    </div>
  );
}

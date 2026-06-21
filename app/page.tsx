import Link from 'next/link';

const PHONE = process.env.NEXT_PUBLIC_PHONE ?? '919392599067';

export default function Home() {
  return (
    <div>
      {/* hero */}
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Mobile Tyre Fitting<br />
            <span className="text-green-400">At Your Doorstep</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            24/7 emergency tyre fitting service. We come to you in 30–60 minutes, wherever you are.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tyres"
              className="bg-green-600 hover:bg-green-500 text-white font-bold px-8 py-3 rounded-xl text-lg transition-colors">
              Browse Tyres
            </Link>
            <a href={`tel:+${PHONE}`}
              className="border border-white/30 hover:bg-white/10 text-white font-bold px-8 py-3 rounded-xl text-lg transition-colors">
              📞 Call Now
            </a>
          </div>
        </div>
      </section>

      {/* features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '⚡', title: '30-60 Min Response', desc: 'We arrive fast, wherever you are — home, work, or roadside.' },
            { icon: '🕐', title: '24/7 Availability', desc: "Day or night, weekday or weekend — we're always on call." },
            { icon: '🔧', title: 'Expert Fitting', desc: 'Professional tyre fitting with the latest equipment.' },
          ].map(f => (
            <div key={f.title} className="text-center p-6 rounded-2xl border border-gray-100 bg-gray-50">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-green-600 text-white text-center">
        <h2 className="text-3xl font-extrabold mb-3">Ready to book your fitting?</h2>
        <p className="text-green-100 mb-8">Choose your tyres, pick a slot, and we'll come to you.</p>
        <Link href="/tyres"
          className="bg-white text-green-700 hover:bg-green-50 font-bold px-8 py-3 rounded-xl text-lg transition-colors inline-block">
          Get Started
        </Link>
      </section>
    </div>
  );
}

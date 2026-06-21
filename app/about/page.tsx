import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Matrix Mobile Tyres Coventry',
  description: "Learn about Matrix Mobile Tyres — Coventry's trusted mobile tyre fitting specialists. Fully insured, 5-star rated, 7 days a week. We come to you at home, work or roadside with no hidden fees.",
  keywords: ['about Matrix Mobile Tyres', 'mobile tyre company Coventry', 'tyre fitter Coventry', 'mobile tyre specialist Coventry'],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Matrix Mobile Tyres | Coventry\'s Mobile Tyre Specialists',
    description: "Coventry's trusted mobile tyre fitting specialists. Fully insured, no hidden fees, 7 days a week.",
    url: '/about',
  },
};

const PHONE = '07721570075';
const WA    = 'https://wa.me/447721570075';

const VALUES = [
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Fully Insured', desc: 'Every job is covered by full public liability insurance for your complete peace of mind.' },
  { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Transparent Pricing', desc: 'No hidden callout fees, no surprise charges. The price you see is exactly what you pay.' },
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Fast Response', desc: 'We aim to reach you within 30–60 minutes for emergency callouts across our coverage area.' },
  { icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', title: '5.0 Rated', desc: 'Consistently awarded 5 stars by our customers for professionalism, speed and value.' },
  { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', title: '7 Days a Week', desc: 'Open Monday to Sunday including bank holidays. We work around your schedule.' },
  { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', title: '15-Mile Coverage', desc: 'Based in Coventry with full coverage across all surrounding towns within 15 miles.' },
];

const PROMISE = [
  "We arrive on time or we'll call ahead to keep you informed",
  'Every tyre is fitted to manufacturer torque settings',
  'TPMS sensors reset or replaced after every fitting on modern vehicles',
  'Your vehicle is left exactly as we found it — no mess, no damage',
  'We carry a wide range of tyres so we can fit most vehicles same-visit',
  "If we can't match your needs, we'll tell you honestly and point you right",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4"
        style={{ background: 'linear-gradient(135deg,#0a1628,#0d1b3e,#0f2352)' }}>
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 80% 50%,rgba(79,70,229,0.15) 0%,transparent 55%)' }} />
        <div className="max-w-4xl mx-auto relative">
          <span className="inline-block bg-white/10 text-blue-300 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5 border border-white/10">About Us</span>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
            Coventry&apos;s trusted<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#34d399,#60a5fa)' }}>
              mobile tyre specialists
            </span>
          </h1>
          <p className="text-blue-200/70 text-lg max-w-xl leading-relaxed">
            We bring the tyre shop to you — home, work or roadside — with professional service, fair prices and no garage wait.
          </p>
        </div>
      </section>

      {/* Our story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5">Our Story</span>
              <h2 className="text-3xl font-black text-slate-900 mb-5 leading-tight">Built on one simple idea</h2>
              <div className="flex flex-col gap-4 text-slate-600 text-sm leading-[1.85]">
                <p>
                  Matrix Mobile Tyres was founded with a single goal: make getting new tyres fitted as easy and stress-free as possible. No booking into a busy garage, no sitting in a waiting room, no arranging a lift.
                </p>
                <p>
                  We come to you — at home, at work, or at the roadside — with everything needed to fit your tyres on the spot. Most jobs are completed in under 30 minutes per tyre.
                </p>
                <p>
                  Based in Coventry, we serve all surrounding areas within 15 miles, including Warwick, Leamington Spa, Rugby, Nuneaton, Bedworth and Hinckley, 7 days a week.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '5.0 ★', label: 'Average Rating', color: '#f59e0b' },
                { value: '7 Days', label: 'A Week', color: '#2563eb' },
                { value: '30 min', label: 'Per Tyre', color: '#16a34a' },
                { value: '15 mi', label: 'Coverage Radius', color: '#7c3aed' },
              ].map(s => (
                <div key={s.label} className="bg-white border border-slate-100 rounded-2xl p-5 text-center shadow-sm">
                  <div className="h-0.5 w-10 rounded-full mx-auto mb-3" style={{ background: s.color }} />
                  <p className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-slate-500 text-xs font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-4">Why Choose Us</span>
            <h2 className="text-3xl font-black text-slate-900">What sets us apart</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUES.map(v => (
              <div key={v.title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our promise */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-green-50 text-green-700 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-4">Our Promise</span>
            <h2 className="text-3xl font-black text-slate-900">What you can always expect</h2>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
            <div className="flex flex-col gap-4">
              {PROMISE.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 border border-green-300 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg,#0a1628,#0d1b3e)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-4">Ready to book your fitting?</h2>
          <p className="text-blue-200/60 mb-8 text-sm">Search tyres by reg plate or size and book a time that suits you.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/tyres"
              className="inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)', boxShadow: '0 4px 20px rgba(79,70,229,0.35)' }}>
              Find My Tyres
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

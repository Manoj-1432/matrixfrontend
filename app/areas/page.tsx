import Link from 'next/link';
import type { Metadata } from 'next';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'Areas We Cover | Mobile Tyre Fitting Coventry & Surrounding Areas',
  description: 'Matrix Mobile Tyres covers Coventry, Warwick, Leamington Spa, Rugby, Nuneaton, Bedworth and Hinckley. Mobile tyre fitting within a 15-mile radius, 7 days a week, emergency callouts available.',
  keywords: [
    'mobile tyre fitting areas Coventry',
    'mobile tyre fitting Warwick',
    'mobile tyre fitting Leamington Spa',
    'mobile tyre fitting Rugby',
    'mobile tyre fitting Nuneaton',
    'mobile tyre fitting Bedworth',
    'mobile tyre fitting Hinckley',
    'tyre fitting near me Coventry',
    'mobile tyre coverage Coventry',
  ],
  alternates: { canonical: '/areas' },
  openGraph: {
    title: 'Areas We Cover | Matrix Mobile Tyres Coventry',
    description: 'Mobile tyre fitting in Coventry and all towns within 15 miles — Warwick, Leamington Spa, Rugby, Nuneaton, Bedworth and Hinckley.',
    url: '/areas',
  },
};

const PHONE = '07721570075';
const WA    = 'https://wa.me/447721570075';

const AREAS = [
  { name: 'Coventry', postcodes: 'CV1–CV6', desc: 'Our home base. Fastest response times across all CV postcodes including city centre, Canley, Tile Hill, Binley, Willenhall and more.', highlight: true },
  { name: 'Warwick', postcodes: 'CV34–CV35', desc: 'Full coverage across Warwick town centre, Warwick Gates and surrounding villages.' },
  { name: 'Leamington Spa', postcodes: 'CV31–CV32', desc: 'Serving Royal Leamington Spa, Whitnash and Radford Semele.' },
  { name: 'Rugby', postcodes: 'CV21–CV23', desc: 'Covering Rugby town, Hillmorton, New Bilton and surrounding areas.' },
  { name: 'Nuneaton', postcodes: 'CV10–CV11', desc: 'Full coverage across Nuneaton, Camp Hill, Stockingford and nearby villages.' },
  { name: 'Bedworth', postcodes: 'CV12', desc: 'Fast response to Bedworth, Exhall, Ash Green and surrounding postcodes.' },
  { name: 'Hinckley', postcodes: 'LE10', desc: 'Covering Hinckley and the surrounding Leicestershire border areas.' },
];

const FEATURES = [
  { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: '30–60 min response' },
  { icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: '7 days a week' },
  { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Emergency callout' },
  { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'No hidden fees' },
];

export default function AreasPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4"
        style={{ background: 'linear-gradient(135deg,#0a1628,#0d1b3e,#0f2352)' }}>
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 70% 50%,rgba(79,70,229,0.18) 0%,transparent 55%)' }} />
        <div className="max-w-4xl mx-auto relative">
          <span className="inline-block bg-white/10 text-blue-300 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5 border border-white/10">Coverage</span>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
            We cover Coventry<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#34d399,#60a5fa)' }}>
              and 15 miles around it
            </span>
          </h1>
          <p className="text-blue-200/70 text-lg max-w-xl mb-8">
            Mobile tyre fitting across Coventry and all surrounding towns — home, work or roadside, 7 days a week.
          </p>
          <div className="flex flex-wrap gap-5">
            {FEATURES.map(f => (
              <div key={f.label} className="flex items-center gap-2 text-sm text-blue-200/70">
                <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                </svg>
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage map */}
      <section className="py-12 px-4 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ height: '420px' }}>
            <iframe
              title="Matrix Mobile Tyres coverage area — Coventry and surrounding towns"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155609.0!2d-1.5199!3d52.4081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f10.0!3m3!1m2!1s0x4870a06f7e1b1d7f%3A0x93d6d62f8f5ebe0a!2sCoventry%2C%20UK!5e0!3m2!1sen!2suk!4v1699000000000!5m2!1sen!2suk"
            />
          </div>
          <p className="text-center text-xs text-slate-400 mt-3">
            We cover Coventry, Warwick, Leamington Spa, Rugby, Nuneaton, Bedworth &amp; Hinckley — approximately 15 miles from Coventry city centre
          </p>
        </div>
      </section>

      {/* Area cards */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-4">Service Areas</span>
            <h2 className="text-3xl font-black text-slate-900">Towns we regularly serve</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {AREAS.map(a => (
              <div key={a.name}
                className={`rounded-2xl p-6 border transition-all hover:shadow-md ${a.highlight ? 'bg-[#0d1b3e] border-[#0d1b3e] text-white' : 'bg-white border-slate-100 text-slate-700'}`}>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <svg className={`w-4 h-4 shrink-0 ${a.highlight ? 'text-green-400' : 'text-blue-500'}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <h3 className={`font-bold text-lg ${a.highlight ? 'text-white' : 'text-slate-900'}`}>{a.name}</h3>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${a.highlight ? 'bg-white/15 text-blue-200' : 'bg-slate-100 text-slate-500'}`}>
                    {a.postcodes}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${a.highlight ? 'text-blue-200/70' : 'text-slate-500'}`}>{a.desc}</p>
                {a.highlight && (
                  <span className="inline-block mt-3 text-xs font-bold text-green-400 bg-green-400/10 border border-green-400/20 px-2.5 py-1 rounded-full">Home Base</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Not sure section */}
      <section className="py-16 px-4 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-black text-slate-900 mb-3">Not sure if we cover your area?</h2>
            <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
              Give us a call or drop us a WhatsApp — we&apos;ll let you know right away and do our best to reach you.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 bg-[#0d1b3e] hover:bg-[#0a1628] text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                Call {PHONE}
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
              <Link href="/tyres"
                className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold px-7 py-3.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">
                Find Tyres
              </Link>
            </div>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </div>
  );
}

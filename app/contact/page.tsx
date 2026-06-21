import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Matrix Mobile Tyres Coventry',
  description: 'Contact Matrix Mobile Tyres in Coventry. Call, WhatsApp or book online. Emergency tyre fitting available 7 days a week.',
  alternates: { canonical: '/contact' },
};

const PHONE = '07721570075';
const WA    = 'https://wa.me/447721570075';

const FAQS = [
  { q: 'What are your hours?', a: 'We operate 7 days a week including bank holidays, 8am–8pm. For emergencies call or WhatsApp anytime.' },
  { q: 'Can you come out the same day?', a: 'In many cases yes. For same-day or emergency fitting, call or WhatsApp us directly rather than booking online.' },
  { q: 'Do you cover my area?', a: "We cover Coventry and all towns within 15 miles including Warwick, Leamington Spa, Rugby, Nuneaton, Bedworth and Hinckley. If you're unsure, just ask." },
  { q: 'What if I have a problem with my order?', a: "Call or WhatsApp us directly and we'll sort it out straight away." },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4"
        style={{ background: 'linear-gradient(135deg,#0a1628,#0d1b3e,#0f2352)' }}>
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 70% 50%,rgba(79,70,229,0.18) 0%,transparent 55%)' }} />
        <div className="max-w-4xl mx-auto relative">
          <span className="inline-block bg-white/10 text-blue-300 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5 border border-white/10">Get In Touch</span>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            {"We're here to help —"}<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#34d399,#60a5fa)' }}>
              7 days a week
            </span>
          </h1>
          <p className="text-blue-200/70 text-lg max-w-xl">
            For emergencies, same-day bookings or any questions — call or WhatsApp us for the fastest response.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">

          {/* Contact cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            <a href={`tel:${PHONE}`}
              className="group bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Call Us</h3>
              <p className="text-blue-600 font-bold mb-1">{PHONE}</p>
              <p className="text-slate-400 text-xs">Tap to call · 7 days a week</p>
            </a>

            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="group bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-1">WhatsApp</h3>
              <p className="text-green-600 font-bold mb-1">Message Us</p>
              <p className="text-slate-400 text-xs">Fastest response · Open now</p>
            </a>

            <Link href="/tyres"
              className="group bg-white border border-slate-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 mb-1">Book Online</h3>
              <p className="text-indigo-600 font-bold mb-1">Find My Tyres</p>
              <p className="text-slate-400 text-xs">Search · Pick a slot · Pay online</p>
            </Link>
          </div>

          {/* Info row */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              { label: 'Hours', value: 'Mon–Sun · 8am–8pm', sub: 'Emergency callouts available', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
              { label: 'Coverage', value: '15-mile radius', sub: 'Coventry & surrounding areas', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
              { label: 'Response', value: '30–60 minutes', sub: 'For emergency callouts', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
            ].map(item => (
              <div key={item.label} className="bg-white border border-slate-100 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{item.label}</p>
                  <p className="font-bold text-slate-900 text-sm">{item.value}</p>
                  <p className="text-xs text-slate-400">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4 items-start mb-12">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-amber-900 mb-1">Need same-day or emergency fitting?</p>
              <p className="text-sm text-amber-800 mb-3">Online bookings require at least 1 day notice. For urgent help, call or WhatsApp us directly.</p>
              <div className="flex flex-wrap gap-2">
                <a href={`tel:${PHONE}`} className="inline-flex items-center gap-1.5 bg-amber-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors">
                  Call {PHONE}
                </a>
                <a href={WA} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <h2 className="text-2xl font-black text-slate-900 mb-6">Common questions</h2>
          <div className="flex flex-col gap-4">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2">{f.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

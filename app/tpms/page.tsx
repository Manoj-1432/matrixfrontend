import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TPMS Sensor Reset & Replacement Coventry | Matrix Mobile Tyres',
  description: 'Mobile TPMS sensor reset and replacement in Coventry and surrounding areas. Tyre pressure warning light on? We come to you after every tyre change — 7 days a week, no garage needed.',
  keywords: ['TPMS reset Coventry', 'TPMS sensor replacement Coventry', 'tyre pressure warning light Coventry', 'TPMS service Coventry', 'mobile TPMS Coventry'],
  alternates: { canonical: '/tpms' },
  openGraph: {
    title: 'TPMS Sensor Reset & Replacement Coventry | Matrix Mobile Tyres',
    description: 'TPMS warning light on? We reset and replace TPMS sensors at your location. Included free with every tyre fitting.',
    url: '/tpms',
  },
};

const PHONE = '07721570075';
const WA    = 'https://wa.me/447721570075';

const WHAT_WE_DO = [
  { title: 'TPMS Sensor Reset', desc: 'After fitting new tyres, we reset all TPMS sensors so your warning light clears and the system reads correctly.' },
  { title: 'Sensor Replacement', desc: 'If a sensor is faulty or damaged, we carry replacement units for most common vehicles and fit them on the spot.' },
  { title: 'Warning Light Diagnosis', desc: 'Not sure why your TPMS light is on? We diagnose the issue and advise the best course of action.' },
  { title: 'Full System Calibration', desc: 'We calibrate the full TPMS system to manufacturer specifications so it accurately monitors all four tyres.' },
];

const FAQS = [
  { q: 'Do I need TPMS if my car was made before 2014?', a: 'TPMS has been mandatory on new cars in the EU since November 2014. If your car was made before this date, it may not have TPMS fitted — check your dashboard for a low pressure warning light.' },
  { q: 'Why does my TPMS light come on after a tyre change?', a: 'When tyres are swapped, the sensors lose their calibration or link with the car\'s computer. They need to be reset using specialist diagnostic equipment — something we carry on every van.' },
  { q: 'How long does a TPMS reset take?', a: 'A standard reset takes 10–15 minutes. Sensor replacement takes 20–30 minutes per wheel depending on the vehicle.' },
  { q: 'How much does TPMS service cost?', a: 'TPMS reset is included free with every tyre fitting we do. For standalone sensor replacement, contact us for a quote — prices vary by vehicle and sensor type.' },
  { q: 'Can I drive with my TPMS light on?', a: 'You can drive short distances, but it\'s not advisable. The TPMS warning means you have no automatic alert if a tyre deflates — which is a safety risk, particularly at motorway speeds.' },
];

export default function TpmsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4"
        style={{ background: 'linear-gradient(135deg,#0a1628,#0d1b3e,#0f2352)' }}>
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 70% 40%,rgba(79,70,229,0.18) 0%,transparent 55%)' }} />
        <div className="max-w-4xl mx-auto relative">
          <span className="inline-block bg-white/10 text-blue-300 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5 border border-white/10">Specialist Service</span>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
            TPMS Service —<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#34d399,#60a5fa)' }}>
              at your door
            </span>
          </h1>
          <p className="text-blue-200/70 text-lg max-w-xl leading-relaxed mb-8">
            Tyre Pressure Monitoring System reset and replacement, carried out on-site after every tyre fitting. No garage needed, no warning lights left on.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/tyres"
              className="inline-flex items-center gap-2 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)', boxShadow: '0 4px 20px rgba(79,70,229,0.4)' }}>
              Book a Fitting
            </Link>
            <a href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition-all">
              {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* What is TPMS */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5">What is TPMS?</span>
              <h2 className="text-3xl font-black text-slate-900 mb-5">The tyre safety system most drivers don&apos;t think about</h2>
              <div className="flex flex-col gap-3 text-slate-600 text-sm leading-[1.85]">
                <p>TPMS (Tyre Pressure Monitoring System) is a mandatory safety feature on all new cars sold in the UK since November 2014. It uses sensors inside each wheel to continuously monitor tyre pressure.</p>
                <p>When pressure drops below a safe threshold — usually 25% below the recommended PSI — a warning light appears on your dashboard.</p>
                <p><strong className="text-slate-800">The issue:</strong> whenever you have new tyres fitted, the TPMS sensors need to be reset or the warning light stays on permanently, even when tyre pressure is correct.</p>
                <p>We carry specialist TPMS reset equipment on every van, so this is taken care of as standard after every tyre change — at no extra charge.</p>
              </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl p-7 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">When does TPMS warning appear?</h3>
              <div className="flex flex-col gap-3">
                {['After new tyres are fitted', 'After a puncture repair', 'If a sensor battery runs out (5–7 year life)', 'If a sensor is damaged during fitting', 'When tyre pressure genuinely drops'].map((t, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-white border-y border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-4">What We Do</span>
            <h2 className="text-3xl font-black text-slate-900">Our TPMS services</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {WHAT_WE_DO.map((s, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white text-sm font-black flex items-center justify-center mb-4">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-4">FAQ</span>
            <h2 className="text-3xl font-black text-slate-900">Common TPMS questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 text-[15px]">{f.q}</h3>
                <p className="text-slate-500 text-sm leading-[1.8]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg,#0a1628,#0d1b3e)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-white mb-3">TPMS light on?</h2>
          <p className="text-blue-200/60 mb-8 text-sm max-w-sm mx-auto">We come to you — no garage visit needed. Call or WhatsApp us and we&apos;ll sort it out.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 font-bold px-8 py-4 rounded-xl text-sm transition-all hover:-translate-y-0.5">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              Call {PHONE}
            </a>
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

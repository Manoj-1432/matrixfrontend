import Link from 'next/link';
import { SERVICE_LINKS } from './serviceLinks';

// Shared layout for the individual service landing pages (puncture repair,
// run-flat tyres, etc.). Server component: all text is in the page HTML.

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.matrixmobiletyresandautos.com';
const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';


const AREAS = [
  { slug: 'coventry', name: 'Coventry' },
  { slug: 'bedworth', name: 'Bedworth' },
  { slug: 'nuneaton', name: 'Nuneaton' },
  { slug: 'kenilworth', name: 'Kenilworth' },
  { slug: 'warwick', name: 'Warwick' },
  { slug: 'leamington-spa', name: 'Leamington Spa' },
  { slug: 'rugby', name: 'Rugby' },
  { slug: 'hinckley', name: 'Hinckley' },
  { slug: 'solihull', name: 'Solihull' },
  { slug: 'meriden', name: 'Meriden' },
];

type Item = { title: string; desc: string };
type Faq = { q: string; a: string };

export type ServicePageProps = {
  path: string;                 // e.g. '/puncture-repair'
  badge: string;
  h1: string;
  h1Accent: string;             // second, coloured part of the heading
  intro: string;
  points: string[];             // short ticks under the hero buttons
  serviceName: string;          // for structured data
  serviceDescription: string;
  itemsTitle: string;
  itemsIntro: string;
  items: Item[];
  infoTitle: string;
  info: string[];               // paragraphs
  infoListTitle?: string;
  infoList?: string[];
  faqs: Faq[];
  ctaTitle: string;
  ctaText: string;
  whatsappLabel?: string;
};

const PHONE_ICON = 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z';

function Buttons({ light = false, whatsappLabel }: { light?: boolean; whatsappLabel: string }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a href={`tel:${PHONE}`}
        className={`inline-flex items-center justify-center gap-2.5 font-bold px-8 py-4 rounded-xl text-sm transition-all hover:-translate-y-0.5 ${light ? 'bg-white text-slate-900 hover:bg-slate-50' : 'text-white'}`}
        style={light ? undefined : { background: 'linear-gradient(135deg,#2563eb,#4f46e5)', boxShadow: '0 4px 20px rgba(79,70,229,0.4)' }}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d={PHONE_ICON} /></svg>
        Call {PHONE}
      </a>
      <a href={WA} target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all">
        {whatsappLabel}
      </a>
    </div>
  );
}

export default function ServicePage(p: ServicePageProps) {
  const url = `${BASE}${p.path}`;
  const whatsappLabel = p.whatsappLabel ?? 'WhatsApp for a Quote';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: p.serviceName,
        serviceType: p.serviceName,
        description: p.serviceDescription,
        provider: { '@id': `${BASE}/#mobile` },
        areaServed: AREAS.map(a => ({ '@type': 'City', name: a.name })),
        url,
      },
      {
        '@type': 'FAQPage',
        mainEntity: p.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
          { '@type': 'ListItem', position: 2, name: p.serviceName, item: url },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24 px-4"
        style={{ background: 'linear-gradient(135deg,#0a1628,#0d1b3e,#0f2352)' }}>
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 70% 40%,rgba(79,70,229,0.18) 0%,transparent 55%)' }} />
        <div className="max-w-4xl mx-auto relative">
          <span className="inline-block bg-white/10 text-blue-300 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5 border border-white/10">{p.badge}</span>
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-5 leading-[1.08] tracking-tight">
            {p.h1}{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#34d399,#60a5fa)' }}>{p.h1Accent}</span>
          </h1>
          <p className="text-blue-100/75 text-lg max-w-2xl leading-relaxed mb-8">{p.intro}</p>
          <Buttons whatsappLabel={whatsappLabel} />
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-[13px] text-blue-100/70 font-medium">
            {p.points.map(t => (
              <span key={t} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Items */}
      <section className="py-20 px-4 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-3">{p.itemsTitle}</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">{p.itemsIntro}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {p.items.map(s => (
              <div key={s.title} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info + areas */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-5">{p.infoTitle}</h2>
            <div className="flex flex-col gap-3 text-slate-600 text-sm leading-[1.85]">
              {p.info.map((t, i) => <p key={i}>{t}</p>)}
            </div>
            {p.infoList && (
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm mt-6">
                {p.infoListTitle && <h3 className="font-bold text-slate-900 mb-3">{p.infoListTitle}</h3>}
                <ul className="flex flex-col gap-2.5">
                  {p.infoList.map(t => (
                    <li key={t} className="flex gap-2.5 text-sm text-slate-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-5">Areas we cover</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-5">
              We come to you across Coventry and the surrounding towns — at home, at work or at the roadside. Not sure if we cover you? Just call.
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {AREAS.map(a => (
                <Link key={a.slug} href={`/areas/${a.slug}`}
                  className="bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-700 text-sm font-semibold px-4 py-2 rounded-full transition-colors">
                  {a.name}
                </Link>
              ))}
            </div>
            <h2 className="text-lg font-black text-slate-900 mb-3">Other services</h2>
            <div className="flex flex-wrap gap-2">
              {SERVICE_LINKS.filter(s => s.href !== p.path).map(s => (
                <Link key={s.href} href={s.href} className="text-sm text-blue-700 font-semibold hover:underline mr-3">{s.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white border-y border-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-4">FAQ</span>
            <h2 className="text-3xl font-black text-slate-900">Common questions</h2>
          </div>
          <div className="flex flex-col gap-4">
            {p.faqs.map(f => (
              <div key={f.q} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
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
          <h2 className="text-3xl font-black text-white mb-3">{p.ctaTitle}</h2>
          <p className="text-blue-200/60 mb-8 text-sm max-w-md mx-auto">{p.ctaText}</p>
          <div className="flex justify-center"><Buttons light whatsappLabel={whatsappLabel} /></div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://matrixmobiletyres.co.uk';
const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';

type AreaData = {
  name: string;
  slug: string;
  postcodes: string;
  region: string;
  lat: number;
  lng: number;
  distanceFromCoventry: string;
  description: string;
  longDescription: string;
  landmarks: string[];
  neighbourhoods: string[];
  faqs: { q: string; a: string }[];
};

const AREAS: Record<string, AreaData> = {
  coventry: {
    name: 'Coventry',
    slug: 'coventry',
    postcodes: 'CV1, CV2, CV3, CV4, CV5, CV6',
    region: 'West Midlands',
    lat: 52.4081,
    lng: -1.5199,
    distanceFromCoventry: 'our home base',
    description: 'Mobile tyre fitting across all Coventry postcodes — city centre, Canley, Tile Hill, Binley, Willenhall and more. Fastest response times in the CV postcode area.',
    longDescription: 'Matrix Mobile Tyres is based in Coventry, making it our fastest response zone. We cover every CV postcode — from the city centre to Canley, Tile Hill, Binley, Willenhall, Stoke, Radford, Holbrooks, Foleshill, Walsgrave and beyond. Whether you\'re at home, at work, or stranded on the roadside, we\'ll come to you.',
    landmarks: ['Coventry City Centre', 'Coventry University', 'Ricoh Arena', 'Jaguar Land Rover', 'Amazon Fulfilment Centre', 'University Hospital Coventry'],
    neighbourhoods: ['City Centre', 'Canley', 'Tile Hill', 'Binley', 'Willenhall', 'Stoke', 'Radford', 'Holbrooks', 'Foleshill', 'Walsgrave', 'Earlsdon', 'Cheylesmore', 'Finham', 'Allesley'],
    faqs: [
      { q: 'How quickly can you reach me in Coventry?', a: 'Being based in Coventry, we typically reach customers within 30–45 minutes. For emergency callouts in the city centre or CV1–CV3, we can often be there in under 30 minutes.' },
      { q: 'Do you cover all Coventry postcodes?', a: 'Yes — we cover all CV1 through CV6 postcodes including the city centre, suburbs and surrounding villages.' },
      { q: 'Can you fit tyres at my workplace in Coventry?', a: 'Absolutely. We regularly visit businesses, offices, warehouses and industrial estates across Coventry. Just give us your address when booking.' },
    ],
  },
  warwick: {
    name: 'Warwick',
    slug: 'warwick',
    postcodes: 'CV34, CV35',
    region: 'Warwickshire',
    lat: 52.2825,
    lng: -1.5845,
    distanceFromCoventry: '10 miles from Coventry',
    description: 'Mobile tyre fitting in Warwick, Warwick Gates, Barford and surrounding villages. Full coverage of CV34 and CV35 postcodes.',
    longDescription: 'We provide mobile tyre fitting across Warwick town and the surrounding villages in CV34 and CV35. Whether you\'re near Warwick Castle, on the Warwick Gates estate, or in one of the many surrounding villages like Barford, Sherbourne or Hampton on the Hill, we come to you with the tyres already on the van.',
    landmarks: ['Warwick Castle', 'Warwick Gates Business Park', 'Warwick Racecourse', 'Warwick School', 'South Warwickshire Hospital'],
    neighbourhoods: ['Warwick Town Centre', 'Warwick Gates', 'Barford', 'Sherbourne', 'Hampton on the Hill', 'Budbrooke', 'Hatton', 'Sherbourne'],
    faqs: [
      { q: 'How long does it take to reach Warwick from your base?', a: 'Warwick is approximately 10 miles from our Coventry base. We typically arrive within 45–60 minutes, often sooner.' },
      { q: 'Do you cover the Warwick Gates area?', a: 'Yes, Warwick Gates is a regular area for us. We cover the residential estate and the business park.' },
      { q: 'Can you fit tyres at Warwick Racecourse or nearby?', a: 'Yes — we cover all of the Warwick area including the racecourse, surrounding roads and neighbouring villages.' },
    ],
  },
  'leamington-spa': {
    name: 'Leamington Spa',
    slug: 'leamington-spa',
    postcodes: 'CV31, CV32',
    region: 'Warwickshire',
    lat: 52.2919,
    lng: -1.5361,
    distanceFromCoventry: '10 miles from Coventry',
    description: 'Mobile tyre fitting across Royal Leamington Spa, Whitnash, Radford Semele and surrounding areas. Covering CV31 and CV32 postcodes.',
    longDescription: 'Royal Leamington Spa and its surrounding areas are well within our coverage zone. We regularly serve customers across Leamington town centre, Whitnash, Radford Semele, Cubbington and the many residential roads throughout CV31 and CV32. Book online or call us for fast mobile tyre fitting at your home, office or roadside.',
    landmarks: ['Royal Leamington Spa Town Centre', 'Jephson Gardens', 'Warwick District Council', 'Leamington Shopping', 'Campion School'],
    neighbourhoods: ['Town Centre', 'Whitnash', 'Radford Semele', 'Cubbington', 'Lillington', 'Milverton', 'Brunswick', 'New Milverton'],
    faqs: [
      { q: 'Do you cover Leamington Spa town centre?', a: 'Yes, we cover all of Leamington Spa including the town centre, Parade area and all surrounding neighbourhoods.' },
      { q: 'How far is Leamington Spa from your base?', a: 'Leamington Spa is about 10 miles from our Coventry base. We usually arrive within 45–60 minutes of your booking.' },
      { q: 'Can you fit tyres at a Leamington Spa car park?', a: 'Yes — we can meet you in a car park, at your home or workplace anywhere in Leamington Spa.' },
    ],
  },
  rugby: {
    name: 'Rugby',
    slug: 'rugby',
    postcodes: 'CV21, CV22, CV23',
    region: 'Warwickshire',
    lat: 52.3706,
    lng: -1.2655,
    distanceFromCoventry: '13 miles from Coventry',
    description: 'Mobile tyre fitting across Rugby town, Hillmorton, New Bilton and surrounding villages. Covering CV21, CV22 and CV23 postcodes.',
    longDescription: 'Rugby is one of our key service areas, located around 13 miles from our Coventry base. We cover all of Rugby town including Hillmorton, New Bilton, Brownsover and the many surrounding villages across CV21, CV22 and CV23. From Dunchurch in the south to Clifton upon Dunsmore in the north, we\'ve got you covered.',
    landmarks: ['Rugby Town Centre', 'Rugby School', 'Clifton Road Retail Park', 'Rugby Station', 'Brownsover Industrial Estate'],
    neighbourhoods: ['Town Centre', 'Hillmorton', 'New Bilton', 'Brownsover', 'Dunchurch', 'Clifton upon Dunsmore', 'Cawston', 'Overslade'],
    faqs: [
      { q: 'Do you cover all of Rugby town?', a: 'Yes — we cover Rugby town centre and all surrounding neighbourhoods including Hillmorton, New Bilton, Brownsover and nearby villages.' },
      { q: 'How long to reach Rugby from Coventry?', a: 'Rugby is about 13 miles from our base. We typically arrive within 45–60 minutes.' },
      { q: 'Can you help if I have a flat tyre on the A428 near Rugby?', a: 'Yes — roadside callouts on the A428, A426 and other main roads around Rugby are something we handle regularly. Call us and we\'ll come to you.' },
    ],
  },
  nuneaton: {
    name: 'Nuneaton',
    slug: 'nuneaton',
    postcodes: 'CV10, CV11',
    region: 'Warwickshire',
    lat: 52.5234,
    lng: -1.4658,
    distanceFromCoventry: '9 miles from Coventry',
    description: 'Mobile tyre fitting across Nuneaton, Camp Hill, Stockingford, Attleborough and surrounding areas. Covering CV10 and CV11 postcodes.',
    longDescription: 'Nuneaton is just 9 miles north of Coventry and one of our most frequently served areas. We cover all of Nuneaton town — Camp Hill, Stockingford, Attleborough, Weddington, Whitestone and the surrounding villages. Whether you\'re at home on a residential street or on a commercial estate, we bring the tyres to you.',
    landmarks: ['Nuneaton Town Centre', 'George Eliot Hospital', 'Ropewalk Shopping Centre', 'Nuneaton Station', 'Bermuda Park'],
    neighbourhoods: ['Town Centre', 'Camp Hill', 'Stockingford', 'Attleborough', 'Weddington', 'Whitestone', 'Galley Common', 'Arbury'],
    faqs: [
      { q: 'How quickly can you reach Nuneaton?', a: 'Nuneaton is about 9 miles from our base — we typically arrive within 40–50 minutes.' },
      { q: 'Do you cover Bermuda Park and industrial areas in Nuneaton?', a: 'Yes — Bermuda Park and all commercial/industrial areas in the CV10 and CV11 postcodes are within our coverage.' },
      { q: 'Can you fit tyres at George Eliot Hospital car park?', a: 'Yes — we regularly help customers at the hospital and nearby locations in Nuneaton.' },
    ],
  },
  bedworth: {
    name: 'Bedworth',
    slug: 'bedworth',
    postcodes: 'CV12',
    region: 'Warwickshire',
    lat: 52.4756,
    lng: -1.4767,
    distanceFromCoventry: '6 miles from Coventry',
    description: 'Mobile tyre fitting in Bedworth, Exhall, Ash Green and surrounding CV12 postcodes. Just 6 miles from our Coventry base.',
    longDescription: 'Bedworth is one of our closest service areas — just 6 miles from our Coventry base. We cover all of Bedworth town, Exhall, Ash Green, Bulkington and the surrounding CV12 postcode. Being so close means fast response times and same-day appointments are almost always available for Bedworth customers.',
    landmarks: ['Bedworth Town Centre', 'Bedworth Leisure Centre', 'Bedworth Station', 'Exhall Grange School', 'Newdigate Colliery'],
    neighbourhoods: ['Bedworth Town Centre', 'Exhall', 'Ash Green', 'Bulkington', 'Hawkesbury', 'Collycroft', 'Goodyers End'],
    faqs: [
      { q: 'How quickly can you reach Bedworth?', a: 'Bedworth is only 6 miles from our Coventry base, so we can often reach you within 30 minutes.' },
      { q: 'Do you cover Exhall and Ash Green?', a: 'Yes — Exhall, Ash Green and all surrounding CV12 areas are within our regular coverage zone.' },
      { q: 'Do you do same-day tyre fitting in Bedworth?', a: 'Yes — same-day fittings are almost always available in Bedworth due to its proximity to our base.' },
    ],
  },
  hinckley: {
    name: 'Hinckley',
    slug: 'hinckley',
    postcodes: 'LE10',
    region: 'Leicestershire',
    lat: 52.5408,
    lng: -1.3702,
    distanceFromCoventry: '14 miles from Coventry',
    description: 'Mobile tyre fitting in Hinckley and surrounding Leicestershire border areas. Covering LE10 postcodes including Burbage, Barwell and Earl Shilton.',
    longDescription: 'Hinckley sits just across the Leicestershire border, around 14 miles from our Coventry base, and is well within our coverage area. We serve Hinckley town centre and the surrounding areas including Burbage, Barwell and Earl Shilton. If you\'re in the LE10 postcode and need mobile tyre fitting, we\'ve got you covered.',
    landmarks: ['Hinckley Town Centre', 'Hinckley & Bosworth Borough Council', 'Triumph Motorcycles HQ', 'Hinckley Station', 'Sketchley Grange'],
    neighbourhoods: ['Hinckley Town Centre', 'Burbage', 'Barwell', 'Earl Shilton', 'Sketchley', 'Dodwells', 'Hollycroft'],
    faqs: [
      { q: 'Do you cover Hinckley even though it\'s in Leicestershire?', a: 'Yes — Hinckley is within our 15-mile radius from Coventry, so we cover the LE10 postcode area including Burbage and Barwell.' },
      { q: 'How long to reach Hinckley from your base?', a: 'Hinckley is about 14 miles away. We typically arrive within 50–65 minutes.' },
      { q: 'Can you fit tyres in Burbage or Earl Shilton?', a: 'Yes — Burbage, Earl Shilton and all surrounding areas around Hinckley are within our coverage.' },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(AREAS).map(slug => ({ area: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ area: string }> }): Promise<Metadata> {
  const { area } = await params;
  const data = AREAS[area];
  if (!data) return {};

  return {
    title: `Mobile Tyre Fitting ${data.name} | Matrix Mobile Tyres`,
    description: data.description,
    keywords: [
      `mobile tyre fitting ${data.name}`,
      `mobile tyres ${data.name}`,
      `tyre fitting at home ${data.name}`,
      `mobile tyre fitter ${data.name}`,
      `emergency tyre fitting ${data.name}`,
      `same day tyre fitting ${data.name}`,
      `tyre fitting near me ${data.name}`,
      `TPMS reset ${data.name}`,
      `mobile tyre replacement ${data.name}`,
      `${data.postcodes} tyre fitting`,
    ],
    alternates: { canonical: `/areas/${data.slug}` },
    openGraph: {
      title: `Mobile Tyre Fitting ${data.name} | Matrix Mobile Tyres`,
      description: data.description,
      url: `/areas/${data.slug}`,
    },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const data = AREAS[area];
  if (!data) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Mobile Tyre Fitting ${data.name}`,
    description: data.description,
    provider: {
      '@type': 'AutoRepair',
      name: 'Matrix Mobile Tyres',
      url: BASE,
      telephone: '+447721570075',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Coventry',
        addressRegion: 'West Midlands',
        addressCountry: 'GB',
      },
    },
    areaServed: {
      '@type': 'City',
      name: data.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: data.region,
      },
    },
    geo: { '@type': 'GeoCoordinates', latitude: data.lat, longitude: data.lng },
    url: `${BASE}/areas/${data.slug}`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      areaServed: data.name,
      seller: { '@type': 'AutoRepair', name: 'Matrix Mobile Tyres' },
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const otherAreas = Object.values(AREAS).filter(a => a.slug !== data.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 px-4"
          style={{ background: 'linear-gradient(135deg,#0a1628,#0d1b3e,#0f2352)' }}>
          <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: 'radial-gradient(ellipse at 70% 50%,rgba(79,70,229,0.18) 0%,transparent 55%)' }} />
          <div className="max-w-4xl mx-auto relative">
            <div className="flex items-center gap-2 mb-5">
              <Link href="/areas" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">Areas We Cover</Link>
              <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              <span className="text-blue-300 text-sm">{data.name}</span>
            </div>
            <span className="inline-block bg-white/10 text-blue-300 text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full mb-5 border border-white/10">
              {data.postcodes} · {data.distanceFromCoventry}
            </span>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
              Mobile Tyre Fitting<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,#34d399,#60a5fa)' }}>
                {data.name}
              </span>
            </h1>
            <p className="text-blue-200/70 text-lg max-w-xl mb-8">{data.longDescription}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/booking"
                className="inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5 text-white"
                style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
                Book in {data.name}
              </Link>
              <a href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all border border-white/10">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Call {PHONE}
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all">
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="bg-white border-b border-slate-100 py-6 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: 'Postcodes', value: data.postcodes },
              { label: 'Response Time', value: '30–60 min' },
              { label: 'Availability', value: '7 days/week' },
              { label: 'Callout Fee', value: 'Free' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="font-black text-slate-900 text-lg">{s.value}</p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Neighbourhoods */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Areas within {data.name} we cover</h2>
            <p className="text-slate-500 text-sm mb-8">We fit tyres across all neighbourhoods and postcodes in the {data.name} area.</p>
            <div className="flex flex-wrap gap-2">
              {data.neighbourhoods.map(n => (
                <span key={n} className="bg-white border border-slate-200 text-slate-700 text-sm font-medium px-4 py-2 rounded-xl shadow-sm">
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Landmarks */}
        <section className="py-12 px-4 bg-white border-t border-b border-slate-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 mb-2">We come to you near</h2>
            <p className="text-slate-500 text-sm mb-8">Home, work or roadside — anywhere in {data.name}.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.landmarks.map(l => (
                <div key={l} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                  <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm text-slate-700 font-medium">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 mb-8">Services available in {data.name}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Mobile Tyre Fitting', desc: `We come to your home, workplace or roadside anywhere in ${data.name} with tyres already on the van.` },
                { title: 'Same Day Tyre Fitting', desc: `Need tyres today? Call us — same-day appointments are often available across ${data.name}.` },
                { title: 'Emergency Tyre Callout', desc: `Flat tyre, blowout or nail in your tyre? We\'ll reach you in ${data.name} within 30–60 minutes.` },
                { title: 'TPMS Sensor Reset', desc: 'TPMS warning light on? We carry specialist reset equipment on every van — included free with fitting.' },
              ].map(s => (
                <div key={s.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-4 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 mb-8">Frequently asked questions — {data.name}</h2>
            <div className="flex flex-col gap-4">
              {data.faqs.map(f => (
                <div key={f.q} className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{f.q}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl p-8 text-center text-white" style={{ background: 'linear-gradient(135deg,#0a1628,#0d1b3e)' }}>
              <h2 className="text-2xl font-black mb-3">Ready to book in {data.name}?</h2>
              <p className="text-blue-200/70 text-sm mb-6">Book online in minutes or call/WhatsApp us directly. We come to you.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/booking"
                  className="inline-flex items-center justify-center gap-2 font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5"
                  style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
                  Book Online
                </Link>
                <a href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold px-7 py-3.5 rounded-xl text-sm border border-white/10 transition-all">
                  Call {PHONE}
                </a>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Other areas */}
        <section className="py-12 px-4 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-black text-slate-900 mb-6">Other areas we cover</h2>
            <div className="flex flex-wrap gap-2">
              {otherAreas.map(a => (
                <Link key={a.slug} href={`/areas/${a.slug}`}
                  className="text-sm text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 px-4 py-2 rounded-xl transition-all font-medium">
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

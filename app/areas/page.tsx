const PHONE = '07721570075';

const AREAS = [
  { name: 'Coventry', desc: 'Our home base — fastest response times across all CV postcodes.' },
  { name: 'Warwick', desc: 'Full coverage across Warwick and surrounding villages.' },
  { name: 'Leamington Spa', desc: 'Serving Royal Leamington Spa and nearby areas.' },
  { name: 'Rugby', desc: 'Mobile tyre fitting across Rugby and surrounding areas.' },
  { name: 'Nuneaton', desc: 'Full coverage across Nuneaton and Bedworth.' },
  { name: 'Bedworth', desc: 'Fast response to Bedworth and surrounding postcodes.' },
  { name: 'Hinckley', desc: 'Covering Hinckley and the surrounding Leicestershire border.' },
];

export default function AreasPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-blue-700 text-sm font-bold uppercase tracking-widest mb-2">Service Coverage</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Areas We Cover</h1>
          <p className="text-gray-500 text-lg">
            Mobile tyre fitting within a <strong>15-mile radius of Coventry</strong>, covering all surrounding towns.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {AREAS.map(a => (
            <div key={a.name} className="bg-white border border-gray-100 rounded-2xl p-5 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#1a2a5e] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-gray-900">{a.name}</h2>
                <p className="text-gray-500 text-sm mt-1">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-[#1a2a5e] rounded-2xl text-white text-center">
          <p className="font-bold text-xl mb-2">Not sure if we cover your area?</p>
          <p className="text-blue-200 mb-6">Give us a call and we&apos;ll let you know right away.</p>
          <a href={`tel:${PHONE}`}
            className="inline-flex items-center gap-2 bg-white text-[#1a2a5e] font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            {PHONE}
          </a>
        </div>
      </div>
    </div>
  );
}

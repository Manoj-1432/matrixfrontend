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
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Areas We Cover</h1>
        <p className="text-gray-500 text-lg mb-10">
          We provide mobile tyre fitting within a <strong>15-mile radius of Coventry</strong>, covering the following areas:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {AREAS.map(a => (
            <div key={a.name} className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4 items-start">
              <span className="text-2xl">📍</span>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">{a.name}</h2>
                <p className="text-gray-500 text-sm mt-1">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 p-6 bg-blue-700 rounded-2xl text-white text-center">
          <p className="font-bold text-lg mb-2">Not sure if we cover your area?</p>
          <p className="text-blue-200 mb-4">Give us a call and we&apos;ll let you know right away.</p>
          <a href="tel:07721570075" className="bg-white text-blue-700 font-bold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors inline-block">
            📞 07721 570075
          </a>
        </div>
      </div>
    </div>
  );
}

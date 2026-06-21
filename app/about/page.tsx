export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">About Us</h1>
        <p className="text-gray-500 text-lg mb-10">Matrix Mobile Tyres — Coventry&apos;s trusted mobile tyre fitting service.</p>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <p className="text-gray-600 leading-relaxed mb-4">
            Matrix Mobile Tyres is a professional mobile tyre fitting service based in Coventry.
            We bring the tyre shop to you — whether you&apos;re at home, at work, or stranded on the roadside.
          </p>
          <p className="text-gray-600 leading-relaxed">
            With over 1,000 happy customers across Coventry, Warwick, Leamington Spa, Rugby, Nuneaton,
            Bedworth and Hinckley, we&apos;ve built a reputation for fast, reliable, and professional service at fair prices.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
          {[
            { stat: '5.0 ★', label: 'Average Rating' },
            { stat: '7 Days', label: 'A Week' },
            { stat: '15 Miles', label: 'Radius of Coventry' },
          ].map(s => (
            <div key={s.label} className="bg-blue-700 text-white rounded-2xl p-5 text-center">
              <p className="text-3xl font-extrabold mb-1">{s.stat}</p>
              <p className="text-blue-200 text-sm">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Our Promise</h2>
          <ul className="flex flex-col gap-3">
            {[
              'Fast response — we aim to arrive within 30–60 minutes',
              'Transparent pricing — no hidden charges',
              'Quality tyres from trusted brands',
              'Professional, friendly fitters',
              'Same-day fitting on selected tyres',
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-gray-700 text-sm">
                <span className="text-blue-700 font-bold text-lg">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

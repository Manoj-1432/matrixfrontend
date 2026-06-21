export default function TpmsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">TPMS Service</h1>
        <p className="text-gray-500 text-lg mb-10">Tyre Pressure Monitoring System — keeping you safe on the road.</p>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">What is TPMS?</h2>
          <p className="text-gray-600 leading-relaxed">
            TPMS (Tyre Pressure Monitoring System) is a safety feature fitted to most vehicles manufactured after 2014.
            It monitors the air pressure in your tyres and warns you when pressure drops to an unsafe level.
            When you get new tyres fitted, the TPMS sensors often need to be reset or replaced.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Our TPMS Service Includes</h2>
          <ul className="flex flex-col gap-3">
            {[
              'TPMS sensor reset after tyre fitting',
              'Replacement of faulty TPMS sensors',
              'TPMS warning light diagnosis',
              'Full system check and calibration',
            ].map(item => (
              <li key={item} className="flex items-center gap-3 text-gray-700 text-sm">
                <span className="text-green-600 font-bold text-lg">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-700 rounded-2xl p-6 text-white text-center">
          <p className="font-bold text-lg mb-2">Need your TPMS reset or replaced?</p>
          <p className="text-blue-200 mb-4">We come to you — no garage visit needed.</p>
          <a href="tel:07721570075" className="bg-white text-blue-700 font-bold px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors inline-block">
            📞 07721 570075
          </a>
        </div>
      </div>
    </div>
  );
}

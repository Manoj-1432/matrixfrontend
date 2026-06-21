const PHONE = '07721570075';

const SERVICES = [
  'TPMS sensor reset after tyre fitting',
  'Replacement of faulty TPMS sensors',
  'TPMS warning light diagnosis',
  'Full system check and calibration',
];

export default function TpmsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <p className="text-blue-700 text-sm font-bold uppercase tracking-widest mb-2">Specialist Service</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">TPMS Service</h1>
          <p className="text-gray-500 text-lg">Tyre Pressure Monitoring System — keeping you safe on the road.</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-3">What is TPMS?</h2>
          <p className="text-gray-600 leading-relaxed">
            TPMS (Tyre Pressure Monitoring System) is a safety feature fitted to most vehicles manufactured after 2014.
            It monitors the air pressure in your tyres and warns you when pressure drops to an unsafe level.
            When you get new tyres fitted, the TPMS sensors often need to be reset or replaced.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Our TPMS Service Includes</h2>
          <ul className="flex flex-col gap-3">
            {SERVICES.map(item => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 border border-green-300 flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <span className="text-gray-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#1a2a5e] rounded-2xl p-8 text-white text-center">
          <p className="font-bold text-xl mb-2">Need your TPMS reset or replaced?</p>
          <p className="text-blue-200 mb-6">We come to you — no garage visit needed.</p>
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

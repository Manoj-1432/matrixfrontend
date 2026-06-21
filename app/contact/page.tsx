const PHONE = '07721570075';
const WA_URL = 'https://wa.me/447721570075';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-500 mb-8">Available 7 days a week, 8am–8pm. For emergencies, call anytime.</p>

        <div className="flex flex-col gap-4">
          <a href={`tel:${PHONE}`}
            className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-2xl shrink-0">📞</div>
            <div>
              <p className="font-bold text-gray-900">Call Us</p>
              <p className="text-sm text-blue-700 font-medium">{PHONE}</p>
              <p className="text-xs text-gray-400 mt-0.5">7 days, 8am–8pm</p>
            </div>
          </a>

          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-2xl shrink-0">💬</div>
            <div>
              <p className="font-bold text-gray-900">WhatsApp</p>
              <p className="text-sm text-green-600 font-medium">Message us on WhatsApp</p>
              <p className="text-xs text-gray-400 mt-0.5">Quick response guaranteed</p>
            </div>
          </a>

          <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-2xl shrink-0">📍</div>
            <div>
              <p className="font-bold text-gray-900">Coverage Area</p>
              <p className="text-sm text-gray-600">Within 15 miles of Coventry</p>
              <p className="text-xs text-gray-400 mt-0.5">Coventry, Warwick, Leamington Spa, Rugby, Nuneaton, Bedworth, Hinckley</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-5 rounded-2xl bg-orange-50 border border-orange-200">
          <p className="font-bold text-orange-900 mb-1">Need same-day fitting?</p>
          <p className="text-sm text-orange-800">
            Online bookings require at least 1 day&apos;s notice. For same-day or emergency fitting, call or WhatsApp us directly.
          </p>
        </div>
      </div>
    </div>
  );
}

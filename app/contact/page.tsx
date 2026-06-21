const PHONE = process.env.NEXT_PUBLIC_PHONE ?? '919392599067';
const WA_URL = `https://wa.me/${PHONE}`;

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-500 mb-8">We&apos;re available 24/7 for emergency mobile tyre fitting.</p>

        <div className="flex flex-col gap-4">
          <a href={`tel:+${PHONE}`}
            className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-2xl shrink-0">📞</div>
            <div>
              <p className="font-bold text-gray-900">Call Us</p>
              <p className="text-sm text-green-600 font-medium">+{PHONE}</p>
              <p className="text-xs text-gray-400 mt-0.5">Available 24/7</p>
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
        </div>

        <div className="mt-8 p-5 rounded-2xl bg-orange-50 border border-orange-200">
          <p className="font-bold text-orange-900 mb-1">Same-day fitting?</p>
          <p className="text-sm text-orange-800">
            Online bookings require at least 1 day&apos;s notice. For same-day emergency fitting, call or WhatsApp us directly.
          </p>
        </div>
      </div>
    </div>
  );
}

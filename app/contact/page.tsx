const PHONE = '07721570075';
const WA_URL = 'https://wa.me/447721570075';

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="mb-10">
          <p className="text-blue-700 text-sm font-bold uppercase tracking-widest mb-2">Get In Touch</p>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-500">Available 7 days a week. For emergencies, call anytime.</p>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <a href={`tel:${PHONE}`}
            className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-700 flex items-center justify-center text-white shrink-0 group-hover:bg-blue-800 transition-colors">
              <PhoneIcon />
            </div>
            <div>
              <p className="font-bold text-gray-900">Call Us</p>
              <p className="text-sm text-blue-700 font-semibold">{PHONE}</p>
              <p className="text-xs text-gray-400 mt-0.5">7 days a week</p>
            </div>
            <svg className="w-4 h-4 text-gray-300 ml-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </a>

          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 hover:border-green-300 hover:shadow-md transition-all group">
            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center text-white shrink-0 group-hover:bg-green-700 transition-colors">
              <ChatIcon />
            </div>
            <div>
              <p className="font-bold text-gray-900">WhatsApp</p>
              <p className="text-sm text-green-600 font-semibold">Message us on WhatsApp</p>
              <p className="text-xs text-gray-400 mt-0.5">Quick response guaranteed</p>
            </div>
            <svg className="w-4 h-4 text-gray-300 ml-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </a>

          <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5">
            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 shrink-0">
              <PinIcon />
            </div>
            <div>
              <p className="font-bold text-gray-900">Coverage Area</p>
              <p className="text-sm text-gray-600">Within 15 miles of Coventry</p>
              <p className="text-xs text-gray-400 mt-0.5">Coventry, Warwick, Leamington Spa, Rugby, Nuneaton, Bedworth, Hinckley</p>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 flex gap-4">
          <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
          <div>
            <p className="font-bold text-amber-900 mb-1">Need same-day fitting?</p>
            <p className="text-sm text-amber-800">
              Online bookings require at least 1 day&apos;s notice. For same-day or emergency fitting, call or WhatsApp us directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

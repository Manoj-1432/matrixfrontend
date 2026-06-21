import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#0d1b3e,#1e3a8a)' }}>
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
          </svg>
        </div>
        <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.18em] mb-2">404 — Page Not Found</p>
        <h1 className="text-3xl font-black text-slate-900 mb-3">Looks like a puncture</h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on the road.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/"
            className="inline-flex items-center justify-center gap-2 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)', boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}>
            Go to Homepage
          </Link>
          <Link href="/tyres"
            className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold px-7 py-3.5 rounded-xl text-sm hover:bg-slate-50 transition-colors">
            Find Tyres
          </Link>
        </div>
      </div>
    </div>
  );
}

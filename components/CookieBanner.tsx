'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie_consent')) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:p-6 pointer-events-none">
      <div className="max-w-2xl mx-auto bg-[#0d1b3e] border border-white/10 rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 pointer-events-auto"
        style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm mb-1">We use cookies</p>
          <p className="text-blue-200/60 text-xs leading-relaxed">
            We only use essential cookies needed for the site to work (login sessions). No tracking or advertising cookies.{' '}
            <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Privacy Policy</Link>
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={accept}
            className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

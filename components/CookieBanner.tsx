'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'cookie_consent_v2';

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Read the stored choice after mount (localStorage only exists in the browser).
    const id = setTimeout(() => {
      let stored: string | null = null;
      try { stored = localStorage.getItem(CONSENT_KEY); } catch {}
      if (!stored) setVisible(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  function choose(choice: 'accepted' | 'rejected') {
    try { localStorage.setItem(CONSENT_KEY, choice); } catch {}
    if (choice === 'accepted') {
      (window as GtagWindow).gtag?.('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      });
    }
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
            We use essential cookies to make the site work. With your permission we also use Google Ads cookies to
            measure how well our adverts work.{' '}
            <Link href="/cookies" className="text-blue-400 hover:text-blue-300 underline">Cookie Policy</Link>
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => choose('rejected')}
            className="border border-white/30 hover:bg-white/10 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors">
            Reject
          </button>
          <button onClick={() => choose('accepted')}
            className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs px-5 py-2.5 rounded-xl transition-colors">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const PHONE = '07721570075';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/tyres', label: 'Tyres' },
  { href: '/tpms', label: 'TPMS Service' },
  { href: '/areas', label: 'Areas We Cover' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Top bar */}
      <div style={{ background: '#0d1b3e' }} className="text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap">
            {[
              { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', text: '24/7 Emergency Callout' },
              { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', text: 'We Come To You', hide: 'sm' },
              { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', text: '30–60 Min Response', hide: 'md' },
            ].map(({ icon, text, hide }) => (
              <span key={text} className={`flex items-center gap-1.5 text-blue-200 ${hide === 'sm' ? 'hidden sm:flex' : hide === 'md' ? 'hidden md:flex' : ''}`}>
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
                {text}
              </span>
            ))}
            <span className="hidden lg:flex items-center gap-1 text-yellow-400 font-semibold">
              ★★★★★ <span className="text-blue-200 font-normal ml-1">Rated 5.0 by 1,000+ customers</span>
            </span>
          </div>
          <a href={`tel:${PHONE}`}
            className="shrink-0 bg-green-500 hover:bg-green-400 text-white font-bold px-4 py-1.5 rounded-full text-[11px] tracking-wide transition-colors">
            CALL NOW
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between">
          <Link href="/" className="shrink-0">
            <Image src="/logo.png" alt="Matrix Mobile Tyres" width={180} height={72} className="h-14 w-auto object-contain" priority />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className="text-[13.5px] font-medium text-slate-700 hover:text-[#0d1b3e] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${PHONE}`} className="text-[13px] font-semibold text-slate-700 hover:text-[#0d1b3e] transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              {PHONE}
            </a>
            <Link href="/tyres"
              style={{ background: '#0d1b3e' }}
              className="text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
              Get a Quote
            </Link>
          </div>

          <button className="lg:hidden p-2 text-slate-600" onClick={() => setOpen(!open)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 pb-4">
            {LINKS.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-slate-700 border-b border-gray-50 last:border-0">
                {l.label}
              </Link>
            ))}
            <Link href="/tyres" onClick={() => setOpen(false)}
              style={{ background: '#0d1b3e' }}
              className="mt-3 block text-center py-3 text-sm font-bold text-white rounded-xl">
              Get a Quote
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

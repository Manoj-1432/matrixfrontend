'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const PHONE = '07721570075';

const NAV_LINKS = [
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
    <header>
      {/* Dark announcement bar */}
      <div className="bg-[#0d1117] text-white text-xs py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-gray-300">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              24/7 Emergency Mobile Tyre Fitting
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-gray-300">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              We Come To You – 30-60 Min Response
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-gray-300">
              <svg className="w-3.5 h-3.5 shrink-0 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Fast Service
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-gray-300">
              <svg className="w-3.5 h-3.5 shrink-0 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Available Now
            </span>
            <span className="hidden lg:flex items-center gap-1.5">
              <span className="text-yellow-400 text-xs">★★★★★</span>
              <span className="text-gray-300">Rated by 1,000+ customers</span>
            </span>
          </div>
          <a href={`tel:${PHONE}`}
            className="shrink-0 bg-green-500 hover:bg-green-400 text-white font-bold px-4 py-1.5 rounded-full text-xs transition-colors flex items-center gap-1.5">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            CALL NOW
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[72px]">
          <Link href="/" className="shrink-0">
            <Image src="/logo.png" alt="Matrix Mobile Tyres" width={160} height={64} className="h-14 w-auto" priority />
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className="text-[13.5px] font-medium text-gray-700 hover:text-purple-700 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Link href="/tyres"
              className="text-[13px] font-semibold text-gray-700 border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg transition-colors">
              Cart
            </Link>
            <Link href="/tyres"
              className="text-[13px] font-semibold text-gray-700 border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg transition-colors">
              Book Now
            </Link>
          </div>

          <button className="lg:hidden p-2 text-gray-600" onClick={() => setOpen(!open)} aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>

        {open && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-gray-700 border-b border-gray-50 last:border-0">
                {l.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link href="/tyres" onClick={() => setOpen(false)}
                className="block text-center py-3 text-sm font-bold text-white rounded-xl gradient-btn">
                Book Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const PHONE = '07721570075';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/tyres', label: 'Tyres' },
  { href: '/tpms', label: 'TPMS' },
  { href: '/areas', label: 'Areas' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      {/* announcement bar */}
      <div className="bg-[#1a2a5e] text-white text-xs py-2 px-4 text-center">
        <span className="text-blue-200">Mobile tyre fitting across Coventry &amp; surrounding areas — </span>
        <a href={`tel:${PHONE}`} className="font-bold underline-offset-2 hover:underline">{PHONE}</a>
        <span className="text-blue-200"> · 7 days a week, 8am–8pm</span>
      </div>

      {/* main navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">

          <Link href="/" className="shrink-0">
            <Image src="/logo.png" alt="Matrix Mobile Tyres" width={200} height={80} className="h-14 w-auto" priority />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {LINKS.map(l => (
              <Link key={l.href} href={l.href}
                className="text-[13px] font-medium text-gray-600 hover:text-[#1a2a5e] transition-colors tracking-wide">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${PHONE}`}
              className="flex items-center gap-2 text-[13px] font-semibold text-gray-800">
              <svg className="w-4 h-4 text-[#1a2a5e]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              {PHONE}
            </a>
            <Link href="/tyres"
              className="bg-[#1a2a5e] hover:bg-[#0d1628] text-white text-[13px] font-semibold px-5 py-2.5 rounded-lg transition-colors">
              Get a Quote
            </Link>
          </div>

          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>

        {open && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1">
            {LINKS.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="py-3 px-2 text-sm font-medium text-gray-700 border-b border-gray-50 last:border-0">
                {l.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a href={`tel:${PHONE}`} className="text-center py-3 text-sm font-bold text-[#1a2a5e] border-2 border-[#1a2a5e] rounded-lg">
                Call {PHONE}
              </a>
              <Link href="/tyres" onClick={() => setOpen(false)}
                className="text-center py-3 text-sm font-bold bg-[#1a2a5e] text-white rounded-lg">
                Get a Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

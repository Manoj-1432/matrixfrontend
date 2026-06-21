'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const PHONE = '07721570075';

const NAV_LINKS = [
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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Matrix Mobile Tyres"
            width={180}
            height={72}
            className="h-16 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-600 hover:text-[#1a2a5e] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-[#1a2a5e] transition-colors">
            <svg className="w-4 h-4 text-[#1a2a5e]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            {PHONE}
          </a>
          <Link
            href="/tyres"
            className="bg-[#1a2a5e] hover:bg-[#0f1a3d] text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-gray-700 hover:text-[#1a2a5e] border-b border-gray-50 last:border-0 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a href={`tel:${PHONE}`} className="text-center py-3 text-sm font-semibold text-[#1a2a5e] border border-[#1a2a5e] rounded-lg">
                Call {PHONE}
              </a>
              <Link href="/tyres" onClick={() => setOpen(false)}
                className="text-center py-3 text-sm font-semibold text-white bg-[#1a2a5e] rounded-lg">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

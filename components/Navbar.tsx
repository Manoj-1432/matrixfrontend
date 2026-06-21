'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const PHONE = '07721570075';
const WA_URL = `https://wa.me/447721570075`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* top bar */}
      <div className="bg-gray-900 text-white text-xs py-2 px-4 flex items-center justify-between gap-4 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-5">
          <span>📞 24/7 Emergency Mobile Tyre Fitting</span>
          <span>📍 We Come To You — 30-60 Min Response</span>
          <span className="hidden sm:inline">⚡ Fast Service</span>
          <span className="hidden sm:inline">✅ Available Now</span>
          <span className="hidden md:inline">⭐⭐⭐⭐⭐ Rated by 1,000+ customers</span>
        </div>
        <a href={`tel:${PHONE}`}
          className="bg-green-600 hover:bg-green-500 text-white font-bold px-4 py-1.5 rounded-full text-xs shrink-0 transition-colors">
          📞 CALL NOW
        </a>
      </div>

      {/* main nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/">
            <Image src="/logo.png" alt="Matrix Mobile Tyres" width={120} height={48} className="h-10 w-auto object-contain" priority />
          </Link>

          {/* desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-blue-700 transition-colors">Home</Link>
            <Link href="/tyres" className="hover:text-blue-700 transition-colors">Tyres</Link>
            <Link href="/tpms" className="hover:text-blue-700 transition-colors">TPMS Service</Link>
            <Link href="/areas" className="hover:text-blue-700 transition-colors">Areas We Cover</Link>
            <Link href="/about" className="hover:text-blue-700 transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-blue-700 transition-colors">Contact Us</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/booking"
              className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              Book Fitting
            </Link>
          </div>

          {/* mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <span className="block w-6 h-0.5 bg-gray-700 mb-1.5" />
            <span className="block w-6 h-0.5 bg-gray-700 mb-1.5" />
            <span className="block w-6 h-0.5 bg-gray-700" />
          </button>
        </div>

        {/* mobile menu */}
        {open && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4 text-sm font-medium">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/tyres" onClick={() => setOpen(false)}>Tyres</Link>
            <Link href="/tpms" onClick={() => setOpen(false)}>TPMS Service</Link>
            <Link href="/areas" onClick={() => setOpen(false)}>Areas We Cover</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About Us</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact Us</Link>
            <Link href="/booking" onClick={() => setOpen(false)}
              className="bg-blue-700 text-white text-center py-2 rounded-lg font-semibold">
              Book Fitting
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

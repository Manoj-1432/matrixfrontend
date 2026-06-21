'use client';
import Link from 'next/link';
import { useState } from 'react';

const PHONE = process.env.NEXT_PUBLIC_PHONE ?? '919392599067';
const WA_URL = `https://wa.me/${PHONE}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* top bar */}
      <div className="bg-gray-900 text-white text-xs py-2 px-4 flex items-center justify-between gap-4 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-4">
          <span>📞 24/7 Emergency Mobile Tyre Fitting</span>
          <span>📍 We Come To You — 30-60 Min Response</span>
          <span>⚡ Fast Service</span>
          <span>✅ Available Now</span>
          <span>⭐⭐⭐⭐⭐ Rated by 200+ customers</span>
        </div>
        <a href={`tel:+${PHONE}`} className="bg-green-600 hover:bg-green-500 text-white font-bold px-4 py-1.5 rounded-full text-xs shrink-0 transition-colors">
          📞 CALL NOW
        </a>
      </div>

      {/* main nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/" className="font-extrabold text-xl text-gray-900 tracking-tight">
            MATRIX<span className="text-green-600">.</span>
          </Link>

          {/* desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
            <Link href="/tyres" className="hover:text-green-600 transition-colors">Tyres</Link>
            <Link href="/booking" className="hover:text-green-600 transition-colors">Book Fitting</Link>
            <Link href="/contact" className="hover:text-green-600 transition-colors">Contact Us</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              WhatsApp
            </a>
          </div>

          {/* mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <span className="block w-5 h-0.5 bg-gray-700 mb-1" />
            <span className="block w-5 h-0.5 bg-gray-700 mb-1" />
            <span className="block w-5 h-0.5 bg-gray-700" />
          </button>
        </div>

        {/* mobile menu */}
        {open && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-3 text-sm font-medium">
            <Link href="/" onClick={() => setOpen(false)} className="hover:text-green-600">Home</Link>
            <Link href="/tyres" onClick={() => setOpen(false)} className="hover:text-green-600">Tyres</Link>
            <Link href="/booking" onClick={() => setOpen(false)} className="hover:text-green-600">Book Fitting</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-green-600">Contact Us</Link>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white text-center py-2 rounded-lg">WhatsApp</a>
          </div>
        )}
      </nav>
    </>
  );
}

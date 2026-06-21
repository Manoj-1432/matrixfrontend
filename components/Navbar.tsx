'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';

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
  const [scrolled, setScrolled] = useState(false);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const raw = localStorage.getItem('customer_user');
    if (raw) {
      try { setCustomerName(JSON.parse(raw)?.name?.split(' ')[0] ?? null); } catch { /* ignore */ }
    }
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="w-full">
      {/* Announcement bar */}
      <div className="bg-[#0a1628] text-white text-xs py-2 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span className="flex items-center gap-1.5 text-blue-200/80">
              <svg className="w-3 h-3 text-green-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Emergency Callout Available
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-blue-200/80">
              <svg className="w-3 h-3 text-blue-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Coventry &amp; 15-mile radius
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-blue-200/80">
              <svg className="w-3 h-3 text-yellow-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span className="text-yellow-400 font-semibold">5.0 Rated</span>
              <span className="text-blue-200/60">· 7 days a week</span>
            </span>
          </div>
          <a href={`tel:${PHONE}`}
            className="shrink-0 bg-green-500 hover:bg-green-400 text-white font-bold px-4 py-1.5 rounded-full text-[11px] tracking-wider transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30">
            CALL NOW
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`bg-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-slate-200/60' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[92px] flex items-center justify-between">
          <Link href="/" className="shrink-0">
            <Image src="/logo.png" alt="Matrix Mobile Tyres" width={280} height={112} className="h-20 w-auto object-contain" priority />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {LINKS.map(l => {
              const active = pathname === l.href;
              return (
                <Link key={l.href} href={l.href}
                  className={`relative px-4 py-2 text-[13.5px] font-medium rounded-lg transition-all duration-150 ${active ? 'text-[#0d1b3e]' : 'text-slate-600 hover:text-[#0d1b3e] hover:bg-slate-50'}`}>
                  {l.label}
                  {active && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 rounded-full" />}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href={`tel:${PHONE}`}
              className="flex items-center gap-2 text-[13px] font-semibold text-slate-700 hover:text-[#0d1b3e] transition-colors px-3 py-2 rounded-lg hover:bg-slate-50">
              <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              {PHONE}
            </a>
            {customerName ? (
              <Link href="/account"
                className="flex items-center gap-2 text-[13px] font-semibold text-slate-700 hover:text-[#0d1b3e] px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                <span className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0">
                  {customerName[0].toUpperCase()}
                </span>
                {customerName}
              </Link>
            ) : (
              <Link href="/login"
                className="text-[13px] font-semibold text-slate-700 hover:text-[#0d1b3e] px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                Sign In
              </Link>
            )}
            <Link href="/tyres"
              className="text-white text-[13px] font-bold px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-all duration-200 shadow-md shadow-blue-900/20 hover:shadow-lg hover:shadow-blue-900/30"
              style={{ background: 'linear-gradient(135deg, #1e3a8a, #4f46e5)' }}>
              Get a Quote
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
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
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pb-5 pt-2 shadow-xl">
            <div className="flex flex-col gap-0.5 mb-4">
              {LINKS.map(l => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${pathname === l.href ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-50'}`}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-3 border-t border-slate-100">
              <a href={`tel:${PHONE}`} onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {PHONE}
              </a>
              <a href={WA} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-green-500 hover:bg-green-600 rounded-xl transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
              <Link href="/tyres" onClick={() => setOpen(false)}
                className="flex items-center justify-center py-3 text-sm font-bold text-white rounded-xl transition-colors"
                style={{ background: 'linear-gradient(135deg,#1e3a8a,#4f46e5)' }}>
                Get a Quote →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

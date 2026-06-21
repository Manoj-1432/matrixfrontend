import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';

export const metadata: Metadata = {
  title: 'Matrix Mobile Tyres | Mobile Tyre Fitting Coventry & Surrounding Areas',
  description: 'Professional mobile tyre fitting in Coventry, Warwick, Leamington Spa, Rugby, Nuneaton and surrounding areas. Available 7 days a week. We come to you.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col min-h-screen antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>

        <footer className="bg-gray-950 text-gray-300">
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #0d1b3e, #4f46e5, #0d1b3e)' }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800/60">

              {/* Brand */}
              <div className="md:col-span-1">
                <Image src="/logo.png" alt="Matrix Mobile Tyres" width={160} height={64} className="h-12 w-auto mb-4 brightness-0 invert" />
                <p className="text-sm text-gray-400 leading-relaxed mb-5">
                  Coventry&apos;s trusted mobile tyre fitting specialists. We come to you, 7 days a week.
                </p>
                <div className="flex flex-col gap-2.5 text-sm">
                  <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-medium">
                    <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    {PHONE}
                  </a>
                  <a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                    <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide mb-5">Services</h4>
                <div className="flex flex-col gap-3 text-sm text-gray-400">
                  <Link href="/tyres" className="hover:text-white transition-colors">Mobile Tyre Fitting</Link>
                  <Link href="/tpms" className="hover:text-white transition-colors">TPMS Service</Link>
                  <Link href="/booking" className="hover:text-white transition-colors">Book a Fitting</Link>
                  <Link href="/contact" className="hover:text-white transition-colors">Emergency Callout</Link>
                  <Link href="/contact" className="hover:text-white transition-colors">Same Day Fitting</Link>
                </div>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide mb-5">Company</h4>
                <div className="flex flex-col gap-3 text-sm text-gray-400">
                  <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                  <Link href="/areas" className="hover:text-white transition-colors">Areas We Cover</Link>
                  <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
                </div>
              </div>

              {/* Areas */}
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide mb-5">Areas We Cover</h4>
                <div className="flex flex-col gap-2 text-sm text-gray-400">
                  {['Coventry', 'Warwick', 'Leamington Spa', 'Rugby', 'Nuneaton', 'Bedworth', 'Hinckley'].map(a => (
                    <Link key={a} href="/areas" className="hover:text-white transition-colors">{a}</Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
              <p>&copy; {new Date().getFullYear()} Matrix Mobile Tyres. All rights reserved.</p>
              <p>Mobile tyre fitting across Coventry &amp; surrounding areas · 15-mile radius</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

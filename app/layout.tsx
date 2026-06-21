import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';

export const metadata: Metadata = {
  title: 'Matrix Mobile Tyres | Mobile Tyre Fitting Coventry & Surrounding Areas',
  description: 'Professional mobile tyre fitting in Coventry, Warwick, Leamington Spa, Rugby, Nuneaton and surrounding areas. Available 7 days a week, 8am–8pm. We come to you.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>

        <footer className="bg-gray-900 text-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">

              {/* Brand */}
              <div className="md:col-span-1">
                <Image src="/logo.png" alt="Matrix Mobile Tyres" width={160} height={64} className="h-12 w-auto mb-4 brightness-0 invert" />
                <p className="text-sm text-gray-400 leading-relaxed mb-5">
                  Coventry&apos;s trusted mobile tyre fitting specialists. We come to you, 7 days a week.
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  <a href={`tel:${PHONE}`} className="text-gray-300 hover:text-white transition-colors font-medium">{PHONE}</a>
                  <a href={WA} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">WhatsApp</a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
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
                <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
                <div className="flex flex-col gap-3 text-sm text-gray-400">
                  <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                  <Link href="/areas" className="hover:text-white transition-colors">Areas We Cover</Link>
                  <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
                </div>
              </div>

              {/* Areas */}
              <div>
                <h4 className="text-white font-semibold text-sm mb-4">Areas We Cover</h4>
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

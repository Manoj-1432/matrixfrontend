import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';

export const metadata: Metadata = {
  title: 'Matrix Mobile Tyres | Mobile Tyre Fitting Coventry',
  description: 'Professional mobile tyre fitting service in Coventry and surrounding areas. 7 days a week, 8am–8pm. We come to you — at home, work or roadside.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>

        <footer className="bg-[#0d1b3e] text-white">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Brand */}
              <div>
                <h3 className="font-black text-xl mb-3">Matrix Mobile Tyres</h3>
                <p className="text-blue-300 text-sm leading-relaxed mb-5">
                  Coventry&apos;s trusted mobile tyre fitting service. We come to you, 7 days a week.
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  <a href={`tel:${PHONE}`} className="text-blue-200 hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    {PHONE}
                  </a>
                  <a href={WA} target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-blue-300 mb-4">Services</h4>
                <div className="flex flex-col gap-2 text-sm text-blue-200">
                  <Link href="/tyres" className="hover:text-white transition-colors">Browse Tyres</Link>
                  <Link href="/tpms" className="hover:text-white transition-colors">TPMS Service</Link>
                  <Link href="/booking" className="hover:text-white transition-colors">Book a Fitting</Link>
                  <Link href="/contact" className="hover:text-white transition-colors">Same Day Enquiries</Link>
                </div>
              </div>

              {/* Areas */}
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-blue-300 mb-4">Areas We Cover</h4>
                <div className="flex flex-col gap-2 text-sm text-blue-200">
                  {['Coventry', 'Warwick', 'Leamington Spa', 'Rugby', 'Nuneaton', 'Bedworth', 'Hinckley'].map(a => (
                    <Link key={a} href="/areas" className="hover:text-white transition-colors">{a}</Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blue-400">
              <p>&copy; {new Date().getFullYear()} Matrix Mobile Tyres. All rights reserved.</p>
              <p>Mobile tyre fitting across Coventry &amp; surrounding areas</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

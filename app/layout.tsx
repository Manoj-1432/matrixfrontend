import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import MobileBookingBar from '@/components/MobileBookingBar';
import CookieBanner from '@/components/CookieBanner';
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://matrixmobiletyres.co.uk';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Matrix Mobile Tyres | Mobile Tyre Fitting Coventry & Surrounding Areas',
    template: '%s | Matrix Mobile Tyres Coventry',
  },
  description:
    'Matrix Mobile Tyres — professional mobile tyre fitting in Coventry, Warwick, Leamington Spa, Rugby, Nuneaton, Bedworth & Hinckley. We come to you at home, work or roadside. 7 days a week, same-day available. Book online now.',
  keywords: [
    'mobile tyre fitting Coventry',
    'mobile tyres Coventry',
    'tyre fitting at home Coventry',
    'mobile tyre fitter Coventry',
    'emergency tyre fitting Coventry',
    'mobile tyre fitting Warwick',
    'mobile tyre fitting Leamington Spa',
    'mobile tyre fitting Rugby',
    'mobile tyre fitting Nuneaton',
    'tyre fitting near me Coventry',
    'mobile tyre replacement Coventry',
    'TPMS reset Coventry',
    'cheap mobile tyre fitting Coventry',
    'same day tyre fitting Coventry',
    'Matrix Mobile Tyres',
  ],
  authors: [{ name: 'Matrix Mobile Tyres', url: BASE }],
  creator: 'Matrix Mobile Tyres',
  publisher: 'Matrix Mobile Tyres',
  category: 'Automotive Services',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: BASE,
    siteName: 'Matrix Mobile Tyres',
    title: 'Matrix Mobile Tyres | Mobile Tyre Fitting Coventry',
    description:
      'Mobile tyre fitting in Coventry & surrounding areas. We come to you — home, work or roadside. Same-day available, 7 days a week. Book online.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Matrix Mobile Tyres — Mobile Tyre Fitting Coventry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matrix Mobile Tyres | Mobile Tyre Fitting Coventry',
    description: 'Mobile tyre fitting in Coventry & surrounding areas. We come to you 7 days a week.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? '',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: 'Matrix Mobile Tyres',
  description:
    'Professional mobile tyre fitting service covering Coventry, Warwick, Leamington Spa, Rugby, Nuneaton, Bedworth and Hinckley. We come to you at home, work or roadside.',
  url: BASE,
  telephone: `+44${PHONE.replace(/^0/, '')}`,
  priceRange: '££',
  image: `${BASE}/logo.png`,
  logo: `${BASE}/logo.png`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Coventry',
    addressRegion: 'West Midlands',
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 52.4081,
    longitude: -1.5199,
  },
  areaServed: [
    { '@type': 'City', name: 'Coventry' },
    { '@type': 'City', name: 'Warwick' },
    { '@type': 'City', name: 'Leamington Spa' },
    { '@type': 'City', name: 'Rugby' },
    { '@type': 'City', name: 'Nuneaton' },
    { '@type': 'City', name: 'Bedworth' },
    { '@type': 'City', name: 'Hinckley' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Mobile Tyre Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile Tyre Fitting' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'TPMS Sensor Reset & Replacement' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Emergency Tyre Callout' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Same Day Tyre Fitting' } },
    ],
  },
  sameAs: [
    `https://wa.me/447721570075`,
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#0d1b3e" />
        <meta name="geo.region" content="GB-COV" />
        <meta name="geo.placename" content="Coventry" />
        <meta name="geo.position" content="52.4081;-1.5199" />
        <meta name="ICBM" content="52.4081, -1.5199" />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <Navbar />
        <main className="flex-1 pb-[72px] lg:pb-0">{children}</main>
        <MobileBookingBar />
        <CookieBanner />

        <footer style={{ background: '#06101f' }} className="text-gray-300">
          {/* Top gradient bar */}
          <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #4f46e5 30%, #2563eb 50%, #4f46e5 70%, transparent)' }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-0">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-14 border-b border-white/6">

              {/* Brand — wider column */}
              <div className="md:col-span-4">
                <Image src="/logo.png" alt="Matrix Mobile Tyres — Mobile Tyre Fitting Coventry" width={160} height={64} className="h-11 w-auto mb-5 brightness-0 invert opacity-90" />
                <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-[260px]">
                  Coventry&apos;s trusted mobile tyre fitting specialists. We come to you — home, work or roadside — 7 days a week.
                </p>
                <div className="flex flex-col gap-3 text-sm">
                  <a href={`tel:${PHONE}`} className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors font-medium group">
                    <span className="w-7 h-7 rounded-lg bg-green-500/15 flex items-center justify-center shrink-0 group-hover:bg-green-500/25 transition-colors">
                      <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    </span>
                    {PHONE}
                  </a>
                  <a href={WA} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors group">
                    <span className="w-7 h-7 rounded-lg bg-green-500/15 flex items-center justify-center shrink-0 group-hover:bg-green-500/25 transition-colors">
                      <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </span>
                    WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Services */}
              <div className="md:col-span-2">
                <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-5">Services</h4>
                <div className="flex flex-col gap-2.5 text-sm text-gray-500">
                  {[
                    { href: '/tyres', label: 'Mobile Tyre Fitting' },
                    { href: '/tpms', label: 'TPMS Diagnostic' },
                    { href: '/tyres', label: 'Book a Fitting' },
                    { href: '/contact', label: 'Emergency Callout' },
                    { href: '/contact', label: 'Same Day Fitting' },
                  ].map(l => (
                    <Link key={l.label} href={l.href} className="hover:text-white transition-colors hover:translate-x-0.5 inline-block transition-transform duration-150">{l.label}</Link>
                  ))}
                </div>
              </div>

              {/* Company */}
              <div className="md:col-span-2">
                <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-5">Company</h4>
                <div className="flex flex-col gap-2.5 text-sm text-gray-500">
                  {[
                    { href: '/about', label: 'About Us' },
                    { href: '/areas', label: 'Areas We Cover' },
                    { href: '/contact', label: 'Contact Us' },
                  ].map(l => (
                    <Link key={l.label} href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                  ))}
                </div>
              </div>

              {/* Areas */}
              <div className="md:col-span-4">
                <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-5">Areas We Cover</h4>
                <div className="flex flex-wrap gap-2">
                  {['Coventry', 'Warwick', 'Leamington Spa', 'Rugby', 'Nuneaton', 'Bedworth', 'Hinckley'].map(a => (
                    <Link key={a} href="/areas"
                      className="text-xs text-gray-500 hover:text-white bg-white/4 hover:bg-white/8 border border-white/6 px-3 py-1.5 rounded-lg transition-all duration-150">
                      {a}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
              <p>&copy; {new Date().getFullYear()} Matrix Mobile Tyres. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms &amp; Conditions</Link>
                <span>Mobile tyre fitting · Coventry</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

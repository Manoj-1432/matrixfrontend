import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import MobileBookingBar from '@/components/MobileBookingBar';
import CookieBanner from '@/components/CookieBanner';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

// Google Ads tag. Consent Mode: advertising cookies stay off until the visitor
// clicks "Accept" in the cookie banner (stored as cookie_consent_v2).
const GOOGLE_ADS_ID = 'AW-18136825590';
const GTAG_INIT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: 'denied', wait_for_update: 500
});
try {
  if (localStorage.getItem('cookie_consent_v2') === 'accepted') {
    gtag('consent', 'update', {
      ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');
`;

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const PHONE = '07721570075';
const WA = 'https://wa.me/447721570075';
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.matrixmobiletyresandautos.com';

// Names and coordinates must match the two Google Business Profiles exactly.
const SHOP_NAME = 'Matrix Tyres and Autos';
const MOBILE_NAME = 'Matrix 24/7 Mobile Tyres and Roadside Assistance';
const SHOP_LAT = 52.464759;
const SHOP_LNG = -1.479909;
const SHOP_MAPS = 'https://www.google.com/maps/place/?q=place_id:ChIJ323me3ZNd0gRiaHLpZgOo6c';
const MOBILE_MAPS = 'https://www.google.com/maps/place/?q=place_id:ChIJlXLWRoslv6gROprctmA7iOs';

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'Matrix Mobile Tyres & Autos | Tyre Fitting Coventry — Mobile & Shop',
    // Every page title already names the business, so don't append it again.
    template: '%s',
  },
  description:
    'Matrix Mobile Tyres & Autos — mobile tyre fitting across Coventry 24/7, plus our tyre shop at Unit 1 Bryant Road, Exhall CV7 9EN. Tyre fitting from £25. All major brands. Same-day available.',
  keywords: [
    'mobile tyre fitting Coventry',
    'tyre shop Coventry',
    'Matrix Mobile Tyres',
    'Matrix Tyres and Autos',
    'tyre fitting at home Coventry',
    'mobile tyre fitter Coventry',
    'emergency tyre fitting Coventry',
    'tyre fitting Exhall',
    'mobile tyre fitting Warwick',
    'mobile tyre fitting Leamington Spa',
    'mobile tyre fitting Rugby',
    'mobile tyre fitting Nuneaton',
    'tyre fitting near me Coventry',
    'TPMS reset Coventry',
    'cheap tyre fitting Coventry',
    'same day tyre fitting Coventry',
    'CV7 9EN tyres',
  ],
  authors: [{ name: 'Matrix Mobile Tyres & Autos', url: BASE }],
  creator: 'Matrix Mobile Tyres & Autos',
  publisher: 'Matrix Mobile Tyres & Autos',
  category: 'Automotive Services',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: BASE,
    siteName: 'Matrix Mobile Tyres & Autos',
    title: 'Matrix Mobile Tyres & Autos | Tyre Fitting Coventry',
    description:
      'Mobile tyre fitting 24/7 across Coventry & tyre shop at Exhall CV7 9EN. Fitting from £25. All major brands. Same-day available.',
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
    title: 'Matrix Mobile Tyres & Autos | Tyre Fitting Coventry',
    description: 'Mobile tyre fitting 24/7 across Coventry & tyre shop at Exhall CV7 9EN. Fitting from £25.',
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

const TELEPHONE = `+44${PHONE.replace(/^0/, '')}`;
const AREAS_SERVED = ['Coventry', 'Warwick', 'Leamington Spa', 'Rugby', 'Nuneaton', 'Bedworth', 'Hinckley']
  .map(name => ({ '@type': 'City', name }));
const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const offer = (name: string) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } });

// Two businesses, matching the two Google Business Profiles:
// the Exhall tyre shop and the 24/7 mobile service (a service-area business, no public address).
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AutoRepair',
      '@id': `${BASE}/#shop`,
      name: SHOP_NAME,
      description:
        'Tyre shop in Exhall, Coventry: tyre fitting, wheel balancing, car batteries, bulbs and TPMS sensor reset.',
      url: `${BASE}/shop`,
      telephone: TELEPHONE,
      priceRange: '££',
      image: `${BASE}/logo.png`,
      logo: `${BASE}/logo.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Unit 1, Bryant Road',
        addressLocality: 'Exhall, Coventry',
        addressRegion: 'West Midlands',
        postalCode: 'CV7 9EN',
        addressCountry: 'GB',
      },
      geo: { '@type': 'GeoCoordinates', latitude: SHOP_LAT, longitude: SHOP_LNG },
      hasMap: SHOP_MAPS,
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ALL_DAYS, opens: '08:00', closes: '18:00' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Tyre Shop Services',
        itemListElement: ['Tyre Fitting', 'Wheel Balancing', 'Car Batteries', 'Bulb Replacement', 'TPMS Sensor Reset & Replacement'].map(offer),
      },
      sameAs: [SHOP_MAPS],
    },
    {
      '@type': 'AutoRepair',
      '@id': `${BASE}/#mobile`,
      name: MOBILE_NAME,
      description:
        'Mobile tyre fitting and roadside assistance 24/7 across Coventry, Warwick, Leamington Spa, Rugby, Nuneaton, Bedworth and Hinckley — at your home, work or roadside.',
      url: BASE,
      telephone: TELEPHONE,
      priceRange: '££',
      image: `${BASE}/logo.png`,
      logo: `${BASE}/logo.png`,
      areaServed: AREAS_SERVED,
      hasMap: MOBILE_MAPS,
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ALL_DAYS, opens: '00:00', closes: '23:59' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Mobile Tyre Services',
        itemListElement: ['Mobile Tyre Fitting', 'Emergency Tyre Callout', 'Roadside Assistance', 'Car Batteries', 'TPMS Sensor Reset & Replacement'].map(offer),
      },
      sameAs: [MOBILE_MAPS, WA],
    },
  ],
};

async function getContact(): Promise<{ address: string; email: string }> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/api/public/contact`, { next: { revalidate: 3600 } });
    const json = await res.json();
    return { address: json?.data?.address ?? '', email: json?.data?.contact_email ?? '' };
  } catch {
    return { address: '', email: '' };
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { address, email } = await getContact();
  return (
    <html lang="en-GB" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#0d1b3e" />
        <meta name="geo.region" content="GB-WAR" />
        <meta name="geo.placename" content="Exhall, Coventry" />
        <meta name="geo.position" content={`${SHOP_LAT};${SHOP_LNG}`} />
        <meta name="ICBM" content={`${SHOP_LAT}, ${SHOP_LNG}`} />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <Script id="gtag-init" strategy="afterInteractive">{GTAG_INIT}</Script>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
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
                <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-[260px]">
                  Coventry&apos;s trusted tyre specialists — visit our shop or we come to you at home, work or roadside.
                </p>
                <div className="flex items-start gap-2.5 text-gray-500 text-sm mb-4">
                  <span className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </span>
                  <span className="leading-relaxed">Unit 1, Bryant Road, Exhall<br />Coventry, CV7 9EN<br /><span className="text-gray-600 text-xs">Shop: Mon–Sun · 8am–6pm</span></span>
                </div>
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
                  {email && (
                    <a href={`mailto:${email}`} className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors group">
                      <span className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      </span>
                      {email}
                    </a>
                  )}
                </div>
              </div>

              {/* Services */}
              <div className="md:col-span-2">
                <h4 className="text-white font-bold text-xs uppercase tracking-[0.15em] mb-5">Services</h4>
                <div className="flex flex-col gap-2.5 text-sm text-gray-500">
                  {[
                    { href: '/tyres', label: 'Tyre Fitting' },
                    { href: '/tyres', label: 'Wheel Balancing' },
                    { href: '/tpms', label: 'TPMS Diagnostic' },
                    { href: '/contact', label: 'Batteries & Bulbs' },
                    { href: '/contact', label: 'Emergency Callout' },
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
                  {[
                    { name: 'Coventry', slug: 'coventry' },
                    { name: 'Warwick', slug: 'warwick' },
                    { name: 'Leamington Spa', slug: 'leamington-spa' },
                    { name: 'Rugby', slug: 'rugby' },
                    { name: 'Nuneaton', slug: 'nuneaton' },
                    { name: 'Bedworth', slug: 'bedworth' },
                    { name: 'Hinckley', slug: 'hinckley' },
                  ].map(a => (
                    <Link key={a.slug} href={`/areas/${a.slug}`}
                      className="text-xs text-gray-500 hover:text-white bg-white/4 hover:bg-white/8 border border-white/6 px-3 py-1.5 rounded-lg transition-all duration-150">
                      {a.name}
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

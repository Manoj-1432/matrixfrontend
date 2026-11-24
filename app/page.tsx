import type { Metadata } from 'next';
import HomeClient from './_home-client';
import GoogleReviews from '@/components/GoogleReviews';

export const metadata: Metadata = {
  title: 'Mobile & Emergency Tyre Fitting Coventry 24/7 | Matrix Mobile Tyres',
  description:
    '24/7 mobile and emergency tyre fitting in Coventry, Bedworth, Nuneaton, Warwick, Leamington Spa & Rugby. Flat tyre or puncture? We come to your home, work or roadside — no callout fee. Call 07721570075.',
  keywords: [
    'mobile tyre fitting Coventry',
    'mobile tyres Coventry',
    'mobile tyre fitter near me',
    'tyre fitting at home Coventry',
    'emergency mobile tyre fitting Coventry',
    'emergency tyre fitting Coventry',
    '24 hour mobile tyre fitting Coventry',
    'flat tyre Coventry',
    'same day tyre fitting Coventry',
    'mobile tyre fitting Warwick',
    'mobile tyre fitting Leamington Spa',
    'mobile tyre fitting Rugby',
    'mobile tyre fitting Nuneaton',
    'tyre fitting near me',
    'TPMS reset Coventry',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: '24/7 Mobile & Emergency Tyre Fitting Coventry | Matrix Mobile Tyres',
    description:
      'Flat tyre or puncture? We come to you 24/7 — home, work or roadside — across Coventry and 15 miles around it. No callout fee.',
    url: '/',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Matrix Mobile Tyres Coventry' }],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does mobile tyre fitting work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You book online or call us. We come to your chosen location — home, workplace or roadside — with the tyres already on the van. Fitting takes around 20–30 minutes per tyre.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you cover Coventry and surrounding areas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We cover Coventry and all towns within 15 miles including Warwick, Leamington Spa, Rugby, Nuneaton, Bedworth and Hinckley.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer emergency tyre fitting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — 24/7. If you have a flat tyre, puncture or blowout, call or WhatsApp us and we aim to reach you within 30–60 minutes anywhere in our Coventry coverage area, with no callout fee.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there any hidden fees or callout charges?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No hidden callout fees. The price you see when booking is the total price you pay — no surprises.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you reset TPMS sensors after fitting new tyres?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We carry specialist TPMS reset equipment on every van. TPMS reset is included free with every tyre fitting on modern vehicles.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you fit tyres the same day?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In many cases yes. For same-day or emergency fitting, call or WhatsApp us directly and we will do everything we can to get to you quickly.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomeClient />
      <GoogleReviews />
    </>
  );
}

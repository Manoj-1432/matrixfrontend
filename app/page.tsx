import type { Metadata } from 'next';
import HomeClient from './_home-client';
import GoogleReviews from '@/components/GoogleReviews';

export const metadata: Metadata = {
  title: 'Matrix Mobile Tyres | Mobile Tyre Fitting Coventry — Home, Work or Roadside',
  description:
    'Mobile tyre fitting in Coventry, Warwick, Leamington Spa, Rugby, Nuneaton & Bedworth. We come to you at home, work or roadside. Same-day available, 7 days a week. Book online — no garage needed.',
  keywords: [
    'mobile tyre fitting Coventry',
    'mobile tyres Coventry',
    'mobile tyre fitter near me',
    'tyre fitting at home Coventry',
    'emergency mobile tyre fitting Coventry',
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
    title: 'Matrix Mobile Tyres | Mobile Tyre Fitting Coventry',
    description:
      'We come to you — home, work or roadside. Mobile tyre fitting across Coventry and 15 miles around it. No hidden fees. Book online.',
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
      name: 'How quickly can you come out for an emergency tyre fitting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We aim to reach you within 30–60 minutes for emergency callouts across our Coventry coverage area.',
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

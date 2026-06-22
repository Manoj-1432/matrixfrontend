import type { Metadata } from 'next';
import TyresClient from './_tyres-client';

export const metadata: Metadata = {
  title: 'Buy Tyres Online | Mobile Tyre Fitting Coventry | Matrix Mobile Tyres',
  description: 'Shop tyres online and book mobile fitting in Coventry. Search by reg plate or tyre size — we fit at your home, work or roadside, 7 days a week. Emergency callouts available.',
  keywords: [
    'buy tyres Coventry',
    'mobile tyre fitting Coventry',
    'cheap tyres Coventry',
    'tyres fitted at home Coventry',
    'mobile tyre service Coventry',
    'tyre fitting near me',
    'budget tyres Coventry',
    'premium tyres Coventry',
    'tyre size search',
    'reg plate tyre search',
  ],
  alternates: { canonical: '/tyres' },
  openGraph: {
    title: 'Buy Tyres Online | Mobile Fitting in Coventry | Matrix Mobile Tyres',
    description: 'Search by reg plate or tyre size. We deliver and fit at your door across Coventry and surrounding areas, 7 days a week.',
    url: '/tyres',
  },
};

export default function TyresPage() {
  return <TyresClient />;
}

import type { Metadata } from 'next';
import BookingClient from './_booking-client';

export const metadata: Metadata = {
  title: 'Book Mobile Tyre Fitting | Choose Your Slot | Matrix Mobile Tyres',
  description: 'Choose a date and time slot for your mobile tyre fitting in Coventry. We come to you — home, work or roadside. Available 7 days a week, 8am–8pm.',
  keywords: [
    'book tyre fitting Coventry',
    'mobile tyre appointment Coventry',
    'tyre fitting slots Coventry',
    'schedule tyre fitting',
  ],
  alternates: { canonical: '/booking' },
  robots: { index: false },
  openGraph: {
    title: 'Book Your Tyre Fitting | Matrix Mobile Tyres Coventry',
    description: 'Pick a slot and we come to you. Mobile tyre fitting across Coventry 7 days a week.',
    url: '/booking',
  },
};

export default function BookingPage() {
  return <BookingClient />;
}

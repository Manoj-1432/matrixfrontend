import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';

export const metadata: Metadata = {
  title: 'Fleet Tyres Coventry | Mobile Fleet & Business Tyre Fitting | Matrix Mobile Tyres',
  description:
    'Mobile fleet and business tyre fitting in Coventry. We fit tyres for company cars, vans and taxis at your depot or on the road, 24/7, to keep your vehicles working. Call 07721570075.',
  keywords: ['fleet tyres Coventry', 'mobile fleet tyre fitting Coventry', 'business tyres Coventry', 'commercial tyre fitting Coventry', 'taxi tyres Coventry', 'company car tyres Coventry'],
  alternates: { canonical: '/fleet-tyres' },
  openGraph: {
    title: 'Fleet & Business Tyre Fitting in Coventry | Matrix Mobile Tyres',
    description: 'Tyres for company cars, vans and taxis fitted at your depot or on the road, 24/7.',
    url: '/fleet-tyres',
  },
};

export default function FleetTyresPage() {
  return (
    <ServicePage
      path="/fleet-tyres"
      badge="Fleet & Business"
      h1="Fleet & Business Tyre Fitting"
      h1Accent="in Coventry"
      intro="Every hour a vehicle is off the road costs your business money. We look after tyres for company cars, vans and taxis — fitting them at your depot, your premises or wherever your driver is, 24/7."
      points={['Open 24/7', 'Fitted at your depot', 'Cars, vans & taxis', 'One point of contact']}
      serviceName="Mobile Fleet and Business Tyre Fitting"
      serviceDescription="Mobile tyre fitting for business fleets — company cars, vans and taxis — at depots and on the road across Coventry."
      itemsTitle="Keeping your vehicles on the road"
      itemsIntro="Whether you run two vans or a whole fleet, we fit around your working day so your vehicles spend less time off the road."
      items={[
        { title: 'Depot visits', desc: 'We come to your yard or premises and fit tyres to several vehicles in one visit.' },
        { title: 'Driver breakdowns', desc: 'Driver has a flat on the road? Call us 24/7 and we go straight to them.' },
        { title: 'Vans & commercial vehicles', desc: 'Correct load-rated tyres for vans and light commercial vehicles.' },
        { title: 'Taxis & private hire', desc: 'Quick tyre fitting for taxi and private hire drivers, so you can get back to earning.' },
        { title: 'Company cars', desc: 'Tyres for company and pool cars, fitted at the office or the driver\'s home.' },
        { title: 'Tyre checks', desc: 'Ask us to check tread depth and condition while we are on site, so problems are caught early.' },
      ]}
      infoTitle="Why use a mobile tyre service for your fleet?"
      info={[
        'Sending vehicles to a garage means lost hours for each driver. With a mobile service, we bring the tyres to your vehicles — before work, during a quiet spell, or wherever they are parked.',
        'Talk to us about how you would like to work, including regular visits and how you would like to be invoiced. We\'ll set up a service that suits your business.',
      ]}
      infoListTitle="Who we work with"
      infoList={['Trades and small businesses with vans', 'Taxi and private hire drivers and operators', 'Delivery and courier drivers', 'Companies with pool or company cars', 'Car dealers and garages needing tyres fitted on site']}
      faqs={[
        { q: 'Do you fit tyres for business fleets in Coventry?', a: 'Yes. We fit tyres for company cars, vans and taxis at your depot, premises or wherever your vehicles are, across Coventry and the surrounding area.' },
        { q: 'Can you fit tyres to several vehicles in one visit?', a: 'Yes. We can visit your depot and work through several vehicles in one go, at a time that suits you.' },
        { q: 'What if one of our drivers gets a puncture?', a: 'Call us 24/7 with their location and the vehicle registration and we will go straight to them.' },
        { q: 'Do you offer business accounts?', a: 'Call us to talk about how you would like to work and be invoiced, and we\'ll set up something that suits your business.' },
        { q: 'Do you fit taxi tyres?', a: 'Yes. We fit tyres for taxi and private hire drivers at home, at the rank or wherever suits you, so you\'re off the road for as little time as possible.' },
      ]}
      ctaTitle="Run vehicles for your business?"
      ctaText="Call us to talk about how we can keep your vehicles on the road."
      whatsappLabel="WhatsApp Us"
    />
  );
}

import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';

export const metadata: Metadata = {
  title: 'Roadside Assistance Coventry | 24/7 Mobile Tyres & Jump Starts | Matrix Mobile Tyres',
  description:
    '24/7 roadside assistance in Coventry. Flat tyre, puncture, flat battery or lost locking wheel nut key? We come to you day or night and get you back on the road. Call 07721570075.',
  keywords: ['roadside assistance Coventry', '24 hour roadside assistance Coventry', 'roadside tyre change Coventry', 'roadside help Coventry', 'breakdown help Coventry', 'mobile roadside assistance near me', 'flat tyre roadside Coventry', 'jump start roadside Coventry'],
  alternates: { canonical: '/roadside-assistance' },
  openGraph: {
    title: '24/7 Roadside Assistance in Coventry | Matrix Mobile Tyres',
    description: 'Flat tyre, puncture or flat battery? We come to you day or night across Coventry.',
    url: '/roadside-assistance',
  },
};

export default function RoadsideAssistancePage() {
  return (
    <ServicePage
      path="/roadside-assistance"
      badge="24/7 Roadside Assistance"
      h1="24/7 Roadside Assistance"
      h1Accent="in Coventry"
      intro="Stuck at the roadside, at home or in a car park? Matrix 24/7 Mobile Tyres and Roadside Assistance comes to you day or night to sort flat tyres, punctures, flat batteries and locking wheel nuts — and get you back on the road."
      points={['Open 24/7', 'We come to you', 'Tyres & batteries on the van', 'No callout fee for tyre fitting']}
      serviceName="24/7 Roadside Assistance"
      serviceDescription="24/7 mobile roadside assistance across Coventry: roadside tyre replacement, puncture repair, jump starts, battery replacement and locking wheel nut removal."
      itemsTitle="How we can help at the roadside"
      itemsIntro="Our vans carry the tyres, batteries and specialist tools to fix the most common reasons cars and vans get stuck — wherever you are in our coverage area."
      items={[
        { title: 'Flat tyre or blowout', desc: 'We replace the damaged tyre at the roadside, at home or at work, day or night.' },
        { title: 'Puncture repair', desc: 'Nail or screw in the tyre? We repair it on the spot if it is safe to, or fit a replacement.' },
        { title: 'Flat battery & jump starts', desc: 'Car won\'t start? We jump start it and test the battery and charging system.' },
        { title: 'Battery replacement', desc: 'If the battery has had it, we can supply and fit the right one for your vehicle on the spot.' },
        { title: 'Lost locking wheel nut key', desc: 'Can\'t change a wheel without the key? We remove locking wheel nuts with specialist tools.' },
        { title: 'Tyre warning light', desc: 'Pressure warning on? We check the tyres, fix the cause and reset your TPMS.' },
      ]}
      infoTitle="What to do while you wait"
      info={[
        'Your safety comes first. If you break down, get yourself and your passengers somewhere safe before calling us.',
        'Tell us where you are and your registration number. A postcode, junction, landmark or what3words address helps us find you quickly.',
      ]}
      infoListTitle="Staying safe at the roadside"
      infoList={[
        'Pull over as far from moving traffic as you can and switch on your hazard lights',
        'Get out on the side away from traffic if it is safe to do so',
        'On a motorway or fast road, wait behind the safety barrier and follow the official breakdown advice',
        'Wear a high-visibility vest if you have one, and keep children and pets with you',
      ]}
      faqs={[
        { q: 'Do you offer 24 hour roadside assistance in Coventry?', a: 'Yes. Our mobile service runs 24/7, 365 days a year, across Coventry and the surrounding area. Call or WhatsApp us on 07721570075.' },
        { q: 'What roadside problems can you fix?', a: 'Flat tyres, punctures, blowouts, flat batteries (jump starts and battery replacement), lost or broken locking wheel nut keys and tyre pressure warnings.' },
        { q: 'Do I need breakdown cover to use you?', a: 'No. You don\'t need a membership — just call us when you need help and we\'ll tell you the price before we set off.' },
        { q: 'How quickly can you reach me?', a: 'For emergency tyre callouts we aim to reach you within 30–60 minutes anywhere in our Coventry coverage area. We\'ll give you an arrival time when you call.' },
        { q: 'Which areas do you cover?', a: 'Coventry and the surrounding towns, including Bedworth, Nuneaton, Kenilworth, Warwick, Leamington Spa, Rugby, Hinckley, Solihull and Meriden.' },
      ]}
      ctaTitle="Need roadside help now?"
      ctaText="Call or WhatsApp us with your location and registration. We'll come to you, day or night."
      whatsappLabel="WhatsApp Your Location"
    />
  );
}

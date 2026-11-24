import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';

export const metadata: Metadata = {
  title: 'Jump Start Coventry | 24/7 Mobile Car Jump Start Service | Matrix Mobile Tyres',
  description:
    'Car won\'t start? 24/7 mobile jump start service in Coventry. We come to your home, work or roadside, get you going and test your battery. Call 07721570075.',
  keywords: ['jump start Coventry', 'car jump start Coventry', 'jump start near me', '24 hour jump start Coventry', 'flat battery Coventry', 'car won\'t start Coventry', 'mobile jump start service', 'van jump start Coventry'],
  alternates: { canonical: '/jump-start' },
  openGraph: {
    title: '24/7 Mobile Jump Start in Coventry | Matrix Mobile Tyres',
    description: 'Flat battery? We come to you day or night, get you started and test your battery.',
    url: '/jump-start',
  },
};

export default function JumpStartPage() {
  return (
    <ServicePage
      path="/jump-start"
      badge="24/7 Jump Start Service"
      h1="Mobile Jump Start Service"
      h1Accent="in Coventry"
      intro="Car won't start? Flat battery on a cold morning or after leaving the lights on? We come to you at home, at work or at the roadside, day or night, get your engine running and check whether your battery needs replacing."
      points={['Open 24/7', 'Home, work or roadside', 'Battery & charging check', 'New battery fitted if needed']}
      serviceName="Mobile Jump Start Service"
      serviceDescription="24/7 mobile jump start service across Coventry for cars and vans with a flat battery, including a battery and charging system check."
      itemsTitle="When you need a jump start"
      itemsIntro="A flat battery is one of the most common reasons a car won't start. We get you moving and help you work out why it happened."
      items={[
        { title: 'Lights left on', desc: 'Headlights or an interior light left on overnight can drain the battery. A jump start usually gets you going straight away.' },
        { title: 'Cold mornings', desc: 'Batteries work hardest in cold weather. If your car struggles or just clicks on a frosty morning, we can come out.' },
        { title: 'Car not used for a while', desc: 'A car left standing for weeks slowly drains its battery. We jump start it and check the battery is still healthy.' },
        { title: 'Old or failing battery', desc: 'If the battery is worn out, a jump start only lasts until you next switch off. We test it and can fit a new one on the spot.' },
        { title: 'Vans and cars', desc: 'We jump start cars and vans at home, at work, in car parks or at the roadside.' },
        { title: 'Battery keeps going flat?', desc: 'We check the charging system (alternator) as well, to find the real cause rather than just the symptom.' },
      ]}
      infoTitle="Jump start or new battery?"
      info={[
        'A jump start gets the engine running, but it doesn\'t fix a battery that is worn out. Once we have you started, we test the battery and the charging system so you know whether it will start again next time.',
        'If the battery needs replacing, we can usually supply and fit the right one for your vehicle at the same visit — including AGM and EFB batteries for cars with stop-start.',
      ]}
      infoListTitle="Signs it might be more than a flat battery"
      infoList={[
        'The car needed a jump start more than once recently',
        'The battery is more than 4–5 years old',
        'The battery warning light stays on while driving',
        'Lights dim or flicker when the engine is running',
        'The battery case looks swollen, cracked or is leaking — don\'t try to jump start it yourself',
      ]}
      faqs={[
        { q: 'Do you offer a 24 hour jump start service in Coventry?', a: 'Yes. Our mobile service runs 24/7 across Coventry and the surrounding area. Call or WhatsApp us on 07721570075 with your location.' },
        { q: 'How much does a jump start cost?', a: 'It depends on where you are and the time of day. Call or WhatsApp us and we will tell you the price before we set off.' },
        { q: 'Will a jump start damage my car?', a: 'Not when it is done properly. We use the correct equipment and connection points for your vehicle to protect its electronics.' },
        { q: 'How long should I drive after a jump start?', a: 'Ideally at least 30 minutes of normal driving to let the battery recharge. If it won\'t start again afterwards, the battery probably needs replacing.' },
        { q: 'Can you replace my battery if a jump start doesn\'t work?', a: 'Yes. We test the battery on the spot and can supply and fit a new one at the same visit. See our car battery page for more.' },
      ]}
      ctaTitle="Car won't start?"
      ctaText="Call or WhatsApp us with your location and registration. We'll come out and get you going."
      whatsappLabel="WhatsApp Your Location"
    />
  );
}

import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';

export const metadata: Metadata = {
  title: 'Locking Wheel Nut Removal Coventry | Lost Key? We Come to You | Matrix Mobile Tyres',
  description:
    'Lost or broken locking wheel nut key in Coventry? We remove locking wheel nuts at your home, work or roadside using specialist tools. Open 24/7 — call 07721570075.',
  keywords: ['locking wheel nut removal Coventry', 'lost locking wheel nut key Coventry', 'locking wheel nut removal near me', 'broken locking wheel nut key', 'mobile locking wheel nut removal', 'remove locking wheel nuts without key'],
  alternates: { canonical: '/locking-wheel-nut-removal' },
  openGraph: {
    title: 'Locking Wheel Nut Removal in Coventry | Matrix Mobile Tyres',
    description: 'Lost or broken locking wheel nut key? We come to you and remove them with specialist tools.',
    url: '/locking-wheel-nut-removal',
  },
};

export default function LockingWheelNutRemovalPage() {
  return (
    <ServicePage
      path="/locking-wheel-nut-removal"
      badge="Locking Wheel Nut Removal"
      h1="Locking Wheel Nut Removal"
      h1Accent="in Coventry"
      intro="Lost the key, or it's broken or rounded off? Without it you can't change a wheel or fit a new tyre. We come to you with specialist tools and remove your locking wheel nuts on the spot."
      points={['Open 24/7', 'Specialist removal tools', 'We come to you', 'Tyre fitting at the same visit']}
      serviceName="Mobile Locking Wheel Nut Removal"
      serviceDescription="Removal of locking wheel nuts when the key is lost, broken or damaged, at the customer's location across Coventry."
      itemsTitle="When you need locking wheel nuts removed"
      itemsIntro="Locking wheel nuts stop thieves taking your wheels — but they also stop you, if the key is missing or damaged."
      items={[
        { title: 'Lost key', desc: 'Can\'t find the locking wheel nut key? It is one of the most common reasons we get called out.' },
        { title: 'Broken or rounded key', desc: 'Keys can crack or round off, especially if the nuts were over-tightened. We remove the nuts with specialist tools.' },
        { title: 'Puncture with no key', desc: 'Got a flat and can\'t get the wheel off? We remove the locking nut and fix or replace the tyre at the same visit.' },
        { title: 'Bought a used car', desc: 'Car came without the key? We remove the locking nuts so you can get tyres fitted when you need them.' },
        { title: 'Seized nuts', desc: 'Old or corroded locking nuts that won\'t budge even with the key — we can deal with those too.' },
        { title: 'New tyres needed', desc: 'Need new tyres but can\'t get the wheels off? We remove the nuts and fit your tyres in one visit.' },
      ]}
      infoTitle="How we remove locking wheel nuts"
      info={[
        'We use specialist removal tools designed to grip and undo locking wheel nuts without the key. We take care to avoid damaging your alloy wheels.',
        'Once the nuts are off, we can fit standard wheel nuts or bolts so you can get to your wheels easily in future. Ask us about replacements when you call.',
      ]}
      infoListTitle="Tips to avoid getting stuck again"
      infoList={['Keep the key in the same place every time — usually the glovebox or with the spare-wheel kit', 'Write down the key code (often on a card that came with the car)', 'Ask your fitter not to over-tighten locking nuts with an impact gun', 'Check the key fits before you need it in an emergency']}
      faqs={[
        { q: 'Can you remove locking wheel nuts without the key?', a: 'Yes. We use specialist tools to remove locking wheel nuts when the key is lost, broken or rounded off.' },
        { q: 'Will it damage my alloy wheels?', a: 'We take care to avoid any damage to your wheels. In rare cases with badly seized nuts there is a small risk, and we will always explain this before we start.' },
        { q: 'Can you fit a tyre at the same visit?', a: 'Yes. Once the locking nut is off we can repair a puncture or fit a new tyre straight away.' },
        { q: 'Do you come out to me?', a: 'Yes — at your home, work or the roadside anywhere in Coventry and the surrounding area, 24/7.' },
        { q: 'How much does locking wheel nut removal cost?', a: 'It depends on the type of nut and how many need removing. Call or WhatsApp us and we will give you a price before we come out.' },
      ]}
      ctaTitle="Lost your locking wheel nut key?"
      ctaText="Call or WhatsApp us with your location and car details. We'll come out and get your wheels off."
    />
  );
}

import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';

export const metadata: Metadata = {
  title: 'Van & 4x4 Tyres Coventry | Mobile Van, SUV & 4x4 Tyre Fitting | Matrix Mobile Tyres',
  description:
    'Mobile van, SUV and 4x4 tyre fitting in Coventry. We supply and fit the correct load-rated tyres at your home, depot, site or roadside. Open 24/7 — call 07721570075.',
  keywords: ['van tyres Coventry', 'mobile van tyre fitting Coventry', '4x4 tyres Coventry', 'SUV tyres Coventry', 'commercial van tyres Coventry', 'transit van tyres Coventry', 'all terrain tyres Coventry'],
  alternates: { canonical: '/van-4x4-tyres' },
  openGraph: {
    title: 'Mobile Van & 4x4 Tyre Fitting in Coventry | Matrix Mobile Tyres',
    description: 'Van, SUV and 4x4 tyres supplied and fitted at your home, depot or roadside.',
    url: '/van-4x4-tyres',
  },
};

export default function Van4x4TyresPage() {
  return (
    <ServicePage
      path="/van-4x4-tyres"
      badge="Van, SUV & 4x4 Tyres"
      h1="Mobile Van & 4x4 Tyre Fitting"
      h1Accent="in Coventry"
      intro="Your van is your income — you can't afford for it to sit off the road. We supply and fit van, SUV and 4x4 tyres at your home, depot, work site or roadside, so you lose as little time as possible."
      points={['Open 24/7', 'Correct load-rated tyres', 'Fitted on site', 'No callout fee']}
      serviceName="Mobile Van and 4x4 Tyre Fitting"
      serviceDescription="Van, SUV and 4x4 tyres supplied and fitted at the customer's location across Coventry."
      itemsTitle="Tyres for vans, SUVs and 4x4s"
      itemsIntro="Bigger vehicles need tyres built to carry more weight. We make sure you get the right size, load rating and type for how you use your vehicle."
      items={[
        { title: 'Van tyres', desc: 'Tyres for small, medium and large vans, including reinforced (C-rated) tyres built for heavy loads.' },
        { title: 'SUV & crossover tyres', desc: 'Road tyres for SUVs and crossovers, from budget to premium brands.' },
        { title: '4x4 tyres', desc: 'Road, all-terrain and all-season tyres for 4x4s, depending on where you drive.' },
        { title: 'At your depot or site', desc: 'We come to your yard, depot or work site, so your van is back to work quickly.' },
        { title: 'Roadside callouts', desc: 'Puncture or blowout on the way to a job? Call us 24/7 and we come to you.' },
        { title: 'Several vehicles?', desc: 'Got more than one van? Ask about our fleet and business tyre service.' },
      ]}
      infoTitle="Why the right load rating matters"
      info={[
        'Van and 4x4 tyres have a load index — a number on the sidewall that shows how much weight each tyre can safely carry. Fitting tyres with too low a load rating is unsafe and can affect your insurance.',
        'Give us your registration and we will make sure the tyres we fit match what your vehicle needs.',
      ]}
      infoListTitle="Reading a van tyre size, e.g. 215/65 R16C 109/107T"
      infoList={['215 — tyre width in millimetres', '65 — sidewall height as a % of the width', 'R16 — fits a 16-inch wheel', 'C — reinforced "commercial" tyre for heavier loads', '109/107 — load index (single/twin wheels)', 'T — speed rating']}
      faqs={[
        { q: 'Do you fit van tyres at my depot in Coventry?', a: 'Yes. We fit van tyres at your home, yard, depot or work site anywhere in Coventry and the surrounding area.' },
        { q: 'What is a C-rated van tyre?', a: 'The "C" stands for commercial. These tyres are reinforced to carry the heavier loads vans are built for. Most vans should be fitted with C-rated tyres.' },
        { q: 'Do you fit 4x4 and SUV tyres?', a: 'Yes — road, all-season and all-terrain tyres for SUVs and 4x4s, from budget to premium brands.' },
        { q: 'Can you come out if my van gets a puncture on a job?', a: 'Yes. Our mobile service runs 24/7. Call us with your location and registration and we will come to you.' },
        { q: 'Do you look after business fleets?', a: 'Yes. If you run several vans or company vehicles, see our fleet and business tyre page or call us to talk it through.' },
      ]}
      ctaTitle="Van off the road?"
      ctaText="Call or WhatsApp us with your registration and location. We'll get the right tyre to you."
      whatsappLabel="WhatsApp Your Reg"
    />
  );
}

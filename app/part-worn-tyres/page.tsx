import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';

export const metadata: Metadata = {
  title: 'Part Worn Tyres Coventry | Cheap Part-Worn Tyres Fitted | Matrix Mobile Tyres',
  description:
    'Part-worn tyres in Coventry — a cheaper way to replace a damaged tyre. Checked to legal standards and fitted at your home, work, roadside or our Exhall shop. Call 07721570075.',
  keywords: ['part worn tyres Coventry', 'cheap part worn tyres Coventry', 'used tyres Coventry', 'second hand tyres Coventry', 'part worn tyres near me', 'cheap tyres Coventry'],
  alternates: { canonical: '/part-worn-tyres' },
  openGraph: {
    title: 'Part-Worn Tyres in Coventry — Checked and Fitted | Matrix Mobile Tyres',
    description: 'A cheaper way to replace a tyre. Checked to legal standards and fitted where you are.',
    url: '/part-worn-tyres',
  },
};

export default function PartWornTyresPage() {
  return (
    <ServicePage
      path="/part-worn-tyres"
      badge="Part-Worn Tyres"
      h1="Part-Worn Tyres in Coventry"
      h1Accent="— Checked and Fitted"
      intro="Need a tyre on a budget? Part-worn tyres are a cheaper option when you need to replace a damaged tyre. We check every part-worn tyre before fitting it at your home, work, the roadside or our Exhall shop."
      points={['Checked before fitting', 'Cheaper than new', 'Fitted where you are', 'New tyres also available']}
      serviceName="Part-Worn Tyres"
      serviceDescription="Part-worn tyres checked to legal standards and fitted at the customer's location or at the Exhall tyre shop in Coventry."
      itemsTitle="A budget-friendly way to replace a tyre"
      itemsIntro="A good-quality part-worn tyre can be a sensible choice when you need to replace one tyre quickly and keep costs down."
      items={[
        { title: 'Single tyre replacement', desc: 'Replace one damaged tyre with a part-worn that matches the tread of the tyre on the other side.' },
        { title: 'Emergency on a budget', desc: 'Flat tyre that can\'t be repaired? Ask about a part-worn when you call — we can often fit one the same day.' },
        { title: 'Checked before fitting', desc: 'We inspect each part-worn tyre for tread depth, cuts, bulges and other damage before it goes on your car.' },
        { title: 'Popular sizes', desc: 'Tell us your registration and we will check what part-worn tyres we have in your size.' },
        { title: 'Mobile or at the shop', desc: 'We fit part-worns at your home, work or roadside, or visit us at Unit 1 Bryant Road, Exhall.' },
        { title: 'New tyres too', desc: 'If a part-worn isn\'t right for you, we have budget, mid-range and premium new tyres available.' },
      ]}
      infoTitle="What the law says about part-worn tyres"
      info={[
        'In the UK, part-worn tyres must meet legal standards before they can be sold. That includes having at least 2mm of tread across the full width of the tyre, no cuts, bulges or exposed cords, and being clearly marked "PART-WORN".',
        'We only fit part-worn tyres that meet these rules. If we\'re not happy with a tyre, we won\'t fit it.',
      ]}
      infoListTitle="Part-worn or new — which should I choose?"
      infoList={['Part-worn: lower price, good for a single replacement or a car you won\'t keep long', 'New: full tread depth, so it lasts longer and performs best in the wet', 'Always try to match tyres on the same axle', 'Not sure? Ask us — we\'ll give you honest advice']}
      faqs={[
        { q: 'Do you sell part-worn tyres in Coventry?', a: 'Yes. We supply and fit part-worn tyres across Coventry — at your home, work, the roadside or at our Exhall tyre shop.' },
        { q: 'Are part-worn tyres safe?', a: 'Part-worn tyres that meet UK legal standards can be a safe, budget-friendly option. We inspect every part-worn tyre before fitting and won\'t fit one we aren\'t happy with.' },
        { q: 'How much tread do part-worn tyres have?', a: 'By law they must have at least 2mm of tread across the full width. Many have more. Ask us about tread depth when you call.' },
        { q: 'Do you have part-worn tyres in my size?', a: 'Stock changes regularly. Send us your registration or tyre size and we will tell you what we have.' },
        { q: 'Can you fit a part-worn tyre in an emergency?', a: 'Often, yes. If your tyre can\'t be repaired, ask about a part-worn when you call — subject to what we have in your size.' },
      ]}
      ctaTitle="Looking for a part-worn tyre?"
      ctaText="Send us your registration or tyre size and we'll tell you what we have and the price."
      whatsappLabel="WhatsApp Your Tyre Size"
    />
  );
}

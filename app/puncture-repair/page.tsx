import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';

export const metadata: Metadata = {
  title: 'Puncture Repair Coventry | Mobile Tyre Puncture Repair 24/7 | Matrix Mobile Tyres',
  description:
    'Mobile puncture repair in Coventry. Nail or screw in your tyre? We come to your home, work or roadside 24/7, repair it if it is safe to, or fit a replacement on the spot. Call 07721570075.',
  keywords: ['puncture repair Coventry', 'mobile puncture repair Coventry', 'tyre puncture repair near me', 'nail in tyre Coventry', 'slow puncture repair Coventry', 'flat tyre repair Coventry'],
  alternates: { canonical: '/puncture-repair' },
  openGraph: {
    title: 'Mobile Puncture Repair in Coventry | Matrix Mobile Tyres',
    description: 'Nail or screw in your tyre? We come to you 24/7 and repair it on the spot if it is safe to.',
    url: '/puncture-repair',
  },
};

export default function PunctureRepairPage() {
  return (
    <ServicePage
      path="/puncture-repair"
      badge="Mobile Puncture Repair"
      h1="Mobile Puncture Repair"
      h1Accent="in Coventry"
      intro="Nail, screw or slow puncture? We come to you at home, at work or at the roadside, check the tyre and repair it on the spot if it is safe to. If it can't be repaired, we can fit a new tyre there and then."
      points={['Open 24/7', 'Repair or replace on the spot', 'No callout fee', 'Free TPMS reset']}
      serviceName="Mobile Puncture Repair"
      serviceDescription="Mobile tyre puncture repair across Coventry — we inspect the tyre, repair it where safe, or fit a replacement at your location."
      itemsTitle="Puncture problems we sort out"
      itemsIntro="Most punctures are caused by something sharp in the tread. Whatever the cause, we check the tyre properly before deciding whether it can be repaired."
      items={[
        { title: 'Nail or screw in the tyre', desc: 'Leave it in place if you can — pulling it out can make the tyre go flat faster. We remove it and repair the tyre if it is safe to.' },
        { title: 'Slow puncture', desc: 'Tyre keeps losing air every few days? We find the leak and repair it, or tell you honestly if the tyre needs replacing.' },
        { title: 'Tyre pressure warning', desc: 'Warning light on and a tyre looks low? We check for a puncture and reset your TPMS after the repair.' },
        { title: 'Flat tyre', desc: 'Completely flat? We come to you, check whether the tyre can be saved and fit a replacement if needed.' },
        { title: 'Valve leaks', desc: 'Sometimes the air is escaping from the valve, not the tyre. We check and replace the valve if that is the cause.' },
        { title: 'Not repairable?', desc: 'If the damage is in an unsafe area, we can fit a new or part-worn tyre on the spot so you are not left stranded.' },
      ]}
      infoTitle="Can my puncture be repaired?"
      info={[
        'A puncture can usually be repaired if the hole is small and in the central part of the tread, and the tyre has not been damaged inside.',
        'We always inspect the tyre inside and out before repairing it. If a repair would not be safe, we tell you why and give you a price for a replacement before doing any work.',
      ]}
      infoListTitle="Usually NOT repairable"
      infoList={[
        'Damage to the sidewall or shoulder (the edge of the tyre)',
        'Holes that are too large, or several punctures close together',
        'A tyre that has been driven on while flat and is damaged inside',
        'Tyres that are already worn close to or below the legal limit',
        'Many run-flat tyres — manufacturers often advise replacing them instead',
      ]}
      faqs={[
        { q: 'Do you do mobile puncture repair in Coventry?', a: 'Yes. We come to your home, workplace or roadside anywhere in Coventry and the surrounding area, 24/7, and repair the puncture on the spot if it is safe to.' },
        { q: 'Should I pull the nail out of my tyre?', a: 'No — leave it in if you can. The nail often partly seals the hole. Pulling it out can make the tyre go flat much faster.' },
        { q: 'Is it safe to drive on a punctured tyre?', a: 'Not for long. Driving on a low or flat tyre can damage it beyond repair and make the car harder to control. Call us and we will come to you.' },
        { q: 'What if my tyre can\'t be repaired?', a: 'We will tell you before doing any work and give you a price for a replacement. We can fit a new or part-worn tyre on the spot.' },
        { q: 'How long does a puncture repair take?', a: 'Usually around 20–30 minutes once we arrive, including putting the wheel back on and checking the pressure.' },
      ]}
      ctaTitle="Got a puncture?"
      ctaText="Call or WhatsApp us with your location and registration. We'll come to you and get it sorted."
    />
  );
}

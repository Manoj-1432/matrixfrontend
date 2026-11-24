import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';

export const metadata: Metadata = {
  title: 'Run Flat Tyres Coventry | Mobile Run-Flat Tyre Fitting | Matrix Mobile Tyres',
  description:
    'Run-flat tyres supplied and fitted at your home, work or roadside in Coventry. BMW, Mini, Mercedes and more. TPMS reset included. Open 24/7 — call 07721570075.',
  keywords: ['run flat tyres Coventry', 'run flat tyre fitting Coventry', 'mobile run flat tyre fitting', 'BMW run flat tyres Coventry', 'Mini run flat tyres Coventry', 'run flat tyre replacement'],
  alternates: { canonical: '/run-flat-tyres' },
  openGraph: {
    title: 'Run-Flat Tyres Fitted at Your Door in Coventry | Matrix Mobile Tyres',
    description: 'Run-flat tyres supplied and fitted wherever you are in Coventry. TPMS reset included.',
    url: '/run-flat-tyres',
  },
};

export default function RunFlatTyresPage() {
  return (
    <ServicePage
      path="/run-flat-tyres"
      badge="Run-Flat Tyres"
      h1="Run-Flat Tyres Fitted"
      h1Accent="at Your Door in Coventry"
      intro="Many BMW, Mini and Mercedes models come with run-flat tyres and no spare wheel. We supply and fit the right run-flat tyres at your home, work or roadside — no trip to a dealer needed."
      points={['Open 24/7', 'Correct run-flat tyre for your car', 'TPMS reset included', 'No callout fee']}
      serviceName="Mobile Run-Flat Tyre Fitting"
      serviceDescription="Run-flat tyres supplied and fitted at the customer's location across Coventry, including TPMS reset."
      itemsTitle="Run-flat tyre fitting, done properly"
      itemsIntro="Run-flat tyres have very stiff sidewalls, so they need the right equipment and care to fit without damaging the tyre or wheel."
      items={[
        { title: 'Supply and fit', desc: 'Give us your registration and we find the correct run-flat size, load and speed rating for your car.' },
        { title: 'Damaged run-flat', desc: 'Driven on a deflated run-flat? We check it and replace it — most run-flats should not be repaired once driven flat.' },
        { title: 'TPMS reset', desc: 'Cars with run-flats rely on tyre pressure monitoring. We reset or check your TPMS after every fitting.' },
        { title: 'Matching pairs', desc: 'We can fit tyres in pairs on the same axle so your car handles evenly.' },
        { title: 'At home or work', desc: 'Book a time that suits you and we fit them on your drive or in the car park at work.' },
        { title: 'Roadside', desc: 'Run-flat warning on? You can usually drive a short distance slowly — call us and we will meet you somewhere safe.' },
      ]}
      infoTitle="What are run-flat tyres?"
      info={[
        'Run-flat tyres have reinforced sidewalls that support the car for a limited distance after losing air, so you can get somewhere safe instead of changing a wheel at the roadside.',
        'Because cars with run-flats usually have no spare wheel, it is important to replace a damaged run-flat with the correct type. Mixing run-flat and standard tyres is not recommended.',
      ]}
      infoListTitle="Common cars with run-flat tyres"
      infoList={['BMW (most models)', 'Mini', 'Mercedes-Benz (many models)', 'Some Audi, Lexus and Infiniti models', 'Check the tyre sidewall for RSC, ROF, ZP, SSR, RFT or DSST markings']}
      faqs={[
        { q: 'Do you fit run-flat tyres at home in Coventry?', a: 'Yes. We supply and fit run-flat tyres at your home, workplace or the roadside across Coventry and the surrounding area.' },
        { q: 'Can a run-flat tyre be repaired?', a: 'Often not. Many manufacturers advise replacing a run-flat once it has been punctured or driven while deflated, because the inside can be damaged. We will inspect it and advise you.' },
        { q: 'How far can I drive on a flat run-flat tyre?', a: 'Usually up to around 50 miles at no more than 50mph, but check your car\'s handbook. Call us and we can meet you somewhere safe.' },
        { q: 'Can I replace run-flats with normal tyres?', a: 'It is possible on some cars but not usually recommended, as your car has no spare and the suspension is set up for run-flats. We will explain your options.' },
        { q: 'How do I know if I have run-flat tyres?', a: 'Look on the tyre sidewall for markings such as RSC, ROF, ZP, SSR, RFT or DSST, or just send us your registration.' },
      ]}
      ctaTitle="Need run-flat tyres?"
      ctaText="Send us your registration and we'll find the right run-flat tyres for your car and fit them where you are."
      whatsappLabel="WhatsApp Your Reg"
    />
  );
}

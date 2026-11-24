import type { Metadata } from 'next';
import {
  Conduct,
  Facts,
  Faq,
  FinalCta,
  faqJsonLd,
  Hero,
  HowItWorks,
  JsonLd,
  Proof,
  ServiceIndex,
  Testimonials,
} from '@/components/Sections';
import { homeFaq, site } from '@/data/site';

export const metadata: Metadata = {
  title: {
    absolute: 'Ouromed: ambulância UTI, atendimento domiciliar e remoção em BH | Central 24 h',
  },
  description: site.description,
  alternates: { canonical: './' },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceIndex />
      <HowItWorks />
      <Facts />
      <Conduct />
      <Testimonials />
      <Proof />
      <FinalCta />
      <Faq />
      <JsonLd data={faqJsonLd(homeFaq)} />
    </>
  );
}

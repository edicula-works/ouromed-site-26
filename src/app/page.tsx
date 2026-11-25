import type { Metadata } from 'next';
import {
  AmbulanceTypes,
  Faq,
  faqJsonLd,
  Hero,
  JsonLd,
  Presentation,
  ServiceCards,
  Testimonials,
  WhenToCall,
} from '@/components/Sections';
import { homeFaq, site } from '@/data/site';

export const metadata: Metadata = {
  title: {
    absolute: 'Ouromed: ambulância UTI e atendimento domiciliar em BH | Central 24 h',
  },
  description: site.description,
  alternates: { canonical: './' },
};

export default function Home() {
  return (
    <div className="acts">
      <Hero />
      <Presentation />
      <ServiceCards
        id="para-voce"
        publico="voce"
        heading="Para você"
        lede="Para a sua família: da UTI móvel ao médico em casa."
      />
      <ServiceCards
        id="para-empresas"
        publico="empresa"
        heading="Para empresas"
        lede="Para quem tem gente sob a sua responsabilidade: clientes, funcionários, público."
      />
      <AmbulanceTypes />
      <WhenToCall />
      <Testimonials />
      <Faq />
      <JsonLd data={faqJsonLd(homeFaq)} />
    </div>
  );
}

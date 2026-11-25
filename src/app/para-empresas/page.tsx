import type { Metadata } from 'next';
import { CallButtons, Faq, faqJsonLd, JsonLd, PageHero, ServiceIndex } from '@/components/Sections';
import { audiencePages, servicesFor } from '@/data/site';

const p = audiencePages.empresa;

export const metadata: Metadata = {
  title: p.seoTitle,
  description: p.description,
  alternates: { canonical: './' },
};

export default function ParaEmpresas() {
  return (
    <>
      <PageHero title={p.h1} intro={p.intro} media="triagem">
        <CallButtons />
      </PageHero>
      <ServiceIndex list={servicesFor('empresa')} />
      <Faq items={p.faq} />
      <JsonLd data={faqJsonLd(p.faq)} />
    </>
  );
}

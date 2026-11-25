import type { Metadata } from 'next';
import {
  CallButtons,
  Faq,
  faqJsonLd,
  JsonLd,
  PageHero,
  ServiceSection,
} from '@/components/Sections';
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
      <PageHero title={p.h1} intro={p.intro} media="protegida">
        <CallButtons />
      </PageHero>
      {servicesFor('empresa').map((s, i) => (
        <ServiceSection key={s.slug} s={s} flip={i % 2 === 1} />
      ))}
      <Faq items={p.faq} />
      <JsonLd data={faqJsonLd(p.faq)} />
    </>
  );
}

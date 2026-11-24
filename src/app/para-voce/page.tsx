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

const p = audiencePages.voce;

export const metadata: Metadata = {
  title: p.seoTitle,
  description: p.description,
  alternates: { canonical: './' },
};

export default function ParaVoce() {
  return (
    <>
      <PageHero title={p.h1} intro={p.intro} media="uti">
        <CallButtons wa={p.wa} />
      </PageHero>
      {servicesFor('voce').map((s, i) => (
        <ServiceSection key={s.slug} s={s} flip={i % 2 === 1} />
      ))}
      <Faq items={p.faq} wa={p.wa} />
      <JsonLd data={faqJsonLd(p.faq)} />
    </>
  );
}

// Página de serviço: hero com a viatura do serviço, os blocos tipados do site.ts, FAQ e JSON-LD.

import { illustrationAlt, type Service } from '@/data/site';
import { BlockView, Faq, faqJsonLd, JsonLd, PageHero } from './Sections';

export function ServicePage({ service: s }: { service: Service }) {
  return (
    <>
      <PageHero
        read={s.read}
        title={s.h1}
        intro={s.intro}
        illustration={s.illustration}
        artTitle={illustrationAlt[s.illustration]}
        ctas={s.cta}
      />
      {s.blocks.map((b) => (
        <BlockView key={`${b.type}-${b.heading}`} block={b} />
      ))}
      <Faq items={s.faq} />
      <JsonLd data={faqJsonLd(s.faq)} />
    </>
  );
}

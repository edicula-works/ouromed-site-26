import type { Metadata } from 'next';
import { BlockView, Clients, Conduct, FinalCta, PageHero } from '@/components/Sections';
import { about, illustrationAlt, site } from '@/data/site';

export const metadata: Metadata = {
  title: about.seoTitle,
  description: about.description,
  alternates: { canonical: './' },
};

export default function Sobre() {
  return (
    <>
      <PageHero
        read={about.read}
        title={about.h1}
        intro={about.intro}
        illustration="triagem"
        artTitle={illustrationAlt.triagem}
        ctas={[{ label: 'Ligar para a Central 24 h', href: `tel:${site.phones.tel}` }]}
      />
      <BlockView
        block={{ type: 'prose', heading: about.what.heading, paragraphs: about.what.paragraphs }}
      />
      <BlockView block={{ type: 'prose', heading: about.team.heading, list: about.team.items }} />
      <BlockView
        block={{
          type: 'prose',
          heading: about.fleet.heading,
          paragraphs: about.fleet.paragraphs,
          note: about.fleet.note,
        }}
      />
      <BlockView
        block={{
          type: 'prose',
          heading: about.pqo.heading,
          paragraphs: [about.pqo.lede],
          list: about.pqo.items,
        }}
      />
      <Conduct />
      <section className="sec sec--tight" aria-label="Clientes">
        <div className="wrap">
          <Clients />
        </div>
      </section>
      <FinalCta />
    </>
  );
}

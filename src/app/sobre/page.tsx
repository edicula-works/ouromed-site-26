import type { Metadata } from 'next';
import { CallButtons, CtaBlock, PageHero, Prose } from '@/components/Sections';
import { about, conduct } from '@/data/site';

export const metadata: Metadata = {
  title: about.seoTitle,
  description: about.description,
  alternates: { canonical: './' },
};

export default function Sobre() {
  return (
    <>
      <PageHero title={about.h1} intro={about.intro} media="equipe">
        <CallButtons />
      </PageHero>
      <Prose id="o-que-e" block={about.what} />
      <Prose id="equipe" block={{ heading: about.team.heading, list: about.team.items }} />
      <Prose
        id="conduta"
        block={{ heading: conduct.heading, list: conduct.items.map((it) => it.text) }}
      />
      <Prose id="frota" block={about.fleet} />
      <Prose
        id="pqo"
        block={{ heading: about.pqo.heading, paragraphs: [about.pqo.lede], list: about.pqo.items }}
      />
      <section className="sec">
        <div className="wrap">
          <CtaBlock />
        </div>
      </section>
    </>
  );
}

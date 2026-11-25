import type { Metadata } from 'next';
import { CallButtons, CtaBlock, PageHero, Rows, Statement } from '@/components/Sections';
import { about } from '@/data/site';

export const metadata: Metadata = {
  title: about.seoTitle,
  description: about.description,
  alternates: { canonical: './' },
};

// Sobre (24/11): a frase do que a Ouromed é; equipe e frota lado a lado; o PQO numerado, com as
// linhas se traçando ao entrar na tela (único gesto da página). Sem listas repetidas.
export default function Sobre() {
  return (
    <>
      <PageHero title={about.h1} intro={about.intro} media="equipe">
        <CallButtons />
      </PageHero>
      <Statement label={about.what.heading} text={about.what.paragraphs[0]} />
      <section className="sec duo" aria-label="Equipe e frota">
        <div className="wrap duo__grid">
          <div className="duo__col" id="equipe">
            <h2 className="duo__h">{about.team.heading}</h2>
            <ul className="duo__list">
              {about.team.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
          <div className="duo__col" id="frota">
            <h2 className="duo__h">{about.fleet.heading}</h2>
            {about.fleet.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            <p className="duo__note">{about.fleet.note}</p>
          </div>
        </div>
      </section>
      <Rows id="pqo" heading={about.pqo.heading} lede={about.pqo.lede} items={about.pqo.items} />
      <section className="sec">
        <div className="wrap">
          <CtaBlock />
        </div>
      </section>
    </>
  );
}

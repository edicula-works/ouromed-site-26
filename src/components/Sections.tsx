// Seções do site (rodada 6: o padrão medido em docs/brief/PADRAO.md). Server Components; o motion
// é declarativo (data-split, data-reveal, data-parallax) e roda pelo motor em src/engine/.
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import {
  ambulanceTypes,
  type Faq as FaqItem,
  homeFaq,
  honesty,
  type MediaKey,
  type Publico,
  presentation,
  type Service,
  serviceHref,
  servicesFor,
  site,
} from '@/data/site';
import { Arrow, Phone, Plus } from './Icons';
import { Media } from './Media';
import { ServiceIcon } from './ServiceIcon';

/** Textura da marca: desenho em traço de BH (a cidade na 404 e a serra do rodapé; ver
 *  docs/brief/desenhos/CREDITOS.md) e, secundárias, as curvas de nível reais (scripts/curvas.py).
 *  `drift` liga a deriva lenta com a rolagem (só nas curvas; os desenhos ficam ancorados). */
export function Texture({ className, drift = false }: { className: string; drift?: boolean }) {
  return (
    <span
      className={`tex ${className}`}
      aria-hidden="true"
      data-parallax={drift ? '0.06' : undefined}
    />
  );
}

/** Ligar (ouro) e pedir orçamento (contorno). Sem WhatsApp até o cliente informar o número. */
export function CallButtons({ onDark = false }: { onDark?: boolean }) {
  return (
    <>
      <a href={`tel:${site.phones.tel}`} className="btn btn--gold btn--lg">
        <Phone className="ico" />
        Ligar {site.phones.display}
      </a>
      <Link href="/contato" className={`btn btn--ghost btn--lg${onDark ? ' btn--onink' : ''}`}>
        Pedir orçamento
      </Link>
    </>
  );
}

/** JSON-LD seguro (serializado, "<" escapado). */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: objeto próprio serializado com JSON.stringify e "<" escapado
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

/* ────────────────────────────── Home ────────────────────────────── */

/** Os sete desenhos novos de BH em traço do topo (public/textura/bh-*.svg, vetorizados por
 *  scripts/desenhos.mjs), na ordem do slideshow, depois do primeiro quadro: o desenho antigo da
 *  cidade (bh-cidade.png), o único que fica parado sem movimento. */
const DESENHOS_BH = [
  'liberdade',
  'mineirao',
  'pampulha',
  'serra-do-curral',
  'praca-do-papa',
  'praca-sete',
  'raul-soares',
];

/** Topo: o título centrado sobre o azul-noite e, na base, um slideshow lento dos desenhos de BH
 *  (o desenho antigo e depois os sete novos, 10 s cada, crossfade de 1,75 s), que deriva devagar e sobe em ritmo próprio ao rolar.
 *  Sem vídeo e sem curvas de nível. */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-h" data-hero>
      <div className="hero__bh" data-layer="bh" aria-hidden="true">
        <span className="tex tex--bh tex--bh-cidade" style={{ '--i': 0 } as CSSProperties} />
        {DESENHOS_BH.map((id, i) => (
          <span
            key={id}
            className="tex tex--bh"
            style={{ '--i': i + 1, '--d': `url("/textura/bh-${id}.svg")` } as CSSProperties}
          />
        ))}
      </div>
      <div className="wrap hero__content" data-hero-content>
        <h1 id="hero-h" className="hero__title">
          <span className="hl">
            <span>
              Padrão{'\u00a0'}
              <span className="hero__ouro">ouro</span>
            </span>
          </span>{' '}
          <span className="hl">
            <span>em saúde móvel.</span>
          </span>
        </h1>
        <p className="hero__lede">
          Ambulância UTI, médico em casa e remoção de pacientes. Central 24 h em Belo Horizonte,
          atendimento em todo o Brasil.
        </p>
        <div className="hero__cta">
          <CallButtons onDark />
        </div>
      </div>
    </section>
  );
}

/** Quem é a Ouromed: duas frases e três fatos publicados, com a textura atrás dos fatos. */
export function Presentation() {
  return (
    <section className="sec about" aria-labelledby="about-h">
      <div className="wrap about__grid">
        <h2 id="about-h" className="about__label">
          {presentation.label}
        </h2>
        {/* Duas camadas do mesmo texto: embaixo o rastro apagado do que ainda não foi lido (tinta a
            22 %) e por cima o escuro (AA), que acende por palavra com a rolagem só em opacidade
            (barato: não repinta o texto). Sem movimento, a de cima aparece inteira. */}
        <div className="lit">
          <p className="about__text">{presentation.text}</p>
          <p className="about__text lit__top" aria-hidden="true">
            {presentation.text}
          </p>
        </div>
      </div>
      <div className="about__facts">
        <Texture className="tex--facts" drift />
        <dl className="wrap facts">
          {presentation.facts.map((f) => (
            <div key={f.value} className="fact">
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ServiceCard({ s }: { s: Service }) {
  return (
    <li className="card">
      <Link href={serviceHref(s)} className="card__link">
        <Media k={s.media} ratio="4 / 3" reveal={false} className="card__media" />
        <span className="card__body">
          <span className="card__name">
            <ServiceIcon k={s.icon} className="card__icon" />
            {s.nav}
          </span>
          <span className="card__lede">{s.lede}</span>
        </span>
      </Link>
    </li>
  );
}

/** Serviços de um público em cartões com foto. */
export function ServiceCards({
  publico,
  heading,
  lede,
  id,
  feature = false,
  track = false,
}: {
  publico: Publico;
  heading: string;
  lede: string;
  id: string;
  /** O primeiro serviço vira destaque: a foto ocupa a largura toda desde o início e só surge por
   *  transparência (motor, reveal fade). */
  feature?: boolean;
  /** No computador, a seção fica parada e a rolagem leva os cartões para o lado. */
  track?: boolean;
}) {
  const list = servicesFor(publico);
  const [first, ...rest] = list;
  const grid = feature ? rest : list;
  return (
    <section className="sec cards" id={id} aria-labelledby={`${id}-h`}>
      <div className="wrap">
        <header className="sec__head">
          <h2 id={`${id}-h`} className="sec__title">
            {heading}
          </h2>
          <p className="sec__lede">{lede}</p>
        </header>
      </div>
      {feature && first && (
        <div className="feature" data-feature>
          <Link href={serviceHref(first)} className="feature__link">
            <Media k={first.media} ratio="auto" sizes="100vw" className="feature__media" />
            <span className="wrap feature__body">
              <span className="card__name">
                <ServiceIcon k={first.icon} className="card__icon" />
                {first.nav}
              </span>
              <span className="card__lede">{first.lede}</span>
            </span>
          </Link>
        </div>
      )}
      <div className="wrap">
        <ul
          className={`cards__grid cards__grid--${grid.length}`}
          data-row
          data-track={track ? '' : undefined}
        >
          {grid.map((s) => (
            <ServiceCard key={s.slug} s={s} />
          ))}
        </ul>
        {track && (
          <div className="track__rail" aria-hidden="true">
            <span className="track__bar" />
          </div>
        )}
      </div>
    </section>
  );
}

/** Suporte básico × UTI móvel, com a foto do interior. */
export function AmbulanceTypes() {
  const t = ambulanceTypes;
  return (
    <section className="sec types" aria-labelledby="types-h">
      <div className="wrap">
        <header className="sec__head">
          <h2 id="types-h" className="sec__title">
            {t.heading}
          </h2>
          <p className="sec__lede">{t.lede}</p>
        </header>
        <div className="types__grid">
          <Media k="uti-interior" ratio="4 / 3" reveal={false} className="types__media" />
          <div className="types__info">
            {t.types.map((x) => (
              <div key={x.name} className="type">
                <h3 className="type__name">{x.name}</h3>
                <p>{x.for}</p>
                <p className="type__team">{x.team}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Quando chamar a Ouromed (texto aprovado em 24/11): emergência, remoção, empresas; 192 como nota.
 *  Cada cartão abre com uma foto 16:9, colada nas bordas dele; a foto não tem reveal próprio porque o
 *  cartão inteiro é que entra (deslocamento curto, src/motion/setup.ts → scenes). */
export function WhenToCall() {
  return (
    <section className="sec when" aria-labelledby="when-h">
      <div className="wrap">
        <header className="sec__head">
          <h2 id="when-h" className="sec__title">
            {honesty.heading}
          </h2>
          <p className="sec__lede">{honesty.lede}</p>
        </header>
        <ul className="when__grid">
          {honesty.items.map((it) => (
            <li key={it.title} className="when__item">
              <Media
                k={it.media}
                ratio="16 / 9"
                reveal={false}
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="when__media"
              />
              <div className="when__body">
                <h3 className="when__title">{it.title}</h3>
                <p className="when__text">{it.text}</p>
                {it.href.startsWith('tel:') ? (
                  <a href={it.href} className="btn btn--gold">
                    <Phone className="ico" />
                    {it.cta}
                  </a>
                ) : (
                  <Link href={it.href} className="link-arrow">
                    {it.cta} <Arrow className="ico" />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
        <p className="when__note">
          <a href={site.emergency.tel} className="link">
            {honesty.note}
          </a>
        </p>
      </div>
    </section>
  );
}

/** Última ação antes do rodapé. */
export function CtaBlock() {
  return (
    <div className="cta-block">
      <h2 className="cta-block__h">Precisa falar com a Ouromed?</h2>
      <p className="cta-block__text">
        Central 24 h, todos os dias. Para empresas e eventos,{' '}
        <Link href="/contato" className="link">
          peça um orçamento
        </Link>
        .
      </p>
      <div className="cta-block__btns">
        <CallButtons />
      </div>
    </div>
  );
}

export function Faq({
  items = homeFaq,
  heading = 'Perguntas frequentes',
}: {
  items?: FaqItem[];
  heading?: string;
}) {
  return (
    <section className="sec faq" aria-labelledby="faq-h">
      <div className="wrap faq__grid">
        <div className="faq__aside">
          <h2 id="faq-h" className="sec__title" data-split="lines">
            {heading}
          </h2>
          <CtaBlock />
        </div>
        <div className="faq__list">
          {items.map((f, i) => (
            <details key={f.q} className="faq__item" name="faq" open={i === 0}>
              <summary>
                {f.q}
                <Plus className="ico" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/* ────────────────────────────── Páginas internas ────────────────────────────── */

/** Topo das páginas internas: claro, título, uma frase, ações e a foto ao lado. */
export function PageHero({
  title,
  intro,
  media: mk,
  children,
}: {
  title: string;
  intro: string;
  media?: MediaKey;
  children?: ReactNode;
}) {
  return (
    <section className="phero">
      <div className="wrap phero__grid">
        <div className="phero__text">
          <h1 className="phero__title">
            <span className="hl">
              <span>{title}</span>
            </span>
          </h1>
          <p className="phero__intro">{intro}</p>
          {children && <div className="phero__cta">{children}</div>}
        </div>
        {mk && (
          <div className="phero__media">
            <Media k={mk} ratio="4 / 3" priority reveal={false} />
          </div>
        )}
      </div>
    </section>
  );
}

/** Os serviços de uma página de público: índice que acompanha a leitura (fixo ao lado no
 *  computador, faixa de atalhos no celular) e um serviço por bloco, sem zigue-zague. O item
 *  atual do índice é marcado por src/motion/setup.ts → spy(); sem JS, os links levam à âncora. */
export function ServiceIndex({ list }: { list: Service[] }) {
  return (
    <div className="svcs">
      <div className="wrap svcs__grid">
        <nav className="svcs__nav" aria-label="Serviços desta página">
          <ol>
            {list.map((s, i) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} data-spy={s.slug}>
                  <span className="svcs__n" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.nav}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="svcs__list">
          {list.map((s) => (
            <ServiceSection key={s.slug} s={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Um serviço: foto larga, título e abertura; embaixo, o texto ao lado da lista. A âncora é o
 *  slug antigo (redirects do site de 2011). */
function ServiceSection({ s }: { s: Service }) {
  return (
    <section className="svc" id={s.slug} aria-labelledby={`${s.slug}-h`}>
      <Media k={s.media} ratio="16 / 9" sizes="(min-width: 1024px) 66vw, 100vw" />
      <div className="svc__head">
        <h2 id={`${s.slug}-h`} className="sec__title" data-split="lines">
          {s.title}
        </h2>
        <p className="svc__intro">{s.intro}</p>
      </div>
      <div className="svc__body">
        <div className="svc__text">
          {s.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
        <div className="svc__side">
          <h3 className="svc__list-h">{s.list.heading}</h3>
          <ul className="svc__list">
            {s.list.items.map((li) => (
              <li key={li}>{li}</li>
            ))}
          </ul>
          <div className="svc__cta">
            <a href={`tel:${site.phones.tel}`} className="btn btn--ghost">
              <Phone className="ico" />
              Ligar {site.phones.display}
            </a>
            {s.cta && (
              <a href={s.cta.href} className="link-arrow">
                {s.cta.label} <Arrow className="ico" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Lista numerada em linhas que se traçam ao entrar na tela (Sobre → PQO). */
export function Rows({
  id,
  heading,
  lede,
  items,
}: {
  id: string;
  heading: string;
  lede?: string;
  items: string[];
}) {
  return (
    <section className="sec rows" aria-labelledby={id}>
      <div className="wrap">
        <header className="sec__head">
          <h2 id={id} className="sec__title" data-split="lines">
            {heading}
          </h2>
          {lede && <p className="sec__lede">{lede}</p>}
        </header>
        <ol className="rows__list">
          {items.map((it, i) => (
            <li key={it} className="rows__item">
              <span className="rows__rule" aria-hidden="true" />
              <span className="rows__n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="rows__text">{it}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Frase de apresentação grande, sem animação (Sobre). */
export function Statement({ label, text }: { label: string; text: string }) {
  return (
    <section className="sec about statement" aria-labelledby="st-h">
      <div className="wrap about__grid">
        <h2 id="st-h" className="about__label">
          {label}
        </h2>
        <p className="about__text">{text}</p>
      </div>
    </section>
  );
}

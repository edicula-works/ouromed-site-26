// Seções do site (rodada 6: o padrão medido em docs/brief/PADRAO.md). Server Components; o motion
// é declarativo (data-split, data-reveal, data-parallax) e roda pelo motor em src/engine/.
import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ambulanceTypes,
  type Block,
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
  testimonials,
  waHref,
} from '@/data/site';
import { Arrow, Phone, Plus, Whats } from './Icons';
import { Media } from './Media';
import { ServiceIcon } from './ServiceIcon';

/** Textura da marca: desenhos em traço de BH (vista da cidade, Serra do Curral; ver
 *  docs/brief/desenhos/CREDITOS.md) e, secundárias, as curvas de nível reais (scripts/curvas.py).
 *  `drift` liga a deriva lenta com a rolagem (só nas curvas; os desenhos ficam ancorados). */
export function Texture({
  className,
  drift = false,
  layer,
}: {
  className: string;
  drift?: boolean;
  /** Camada do topo animada pela rolagem (src/motion/setup.ts → acts). */
  layer?: string;
}) {
  return (
    <span
      className={`tex ${className}`}
      aria-hidden="true"
      data-parallax={drift ? '0.06' : undefined}
      data-layer={layer}
    />
  );
}

/** Ligar (ouro) e WhatsApp (contorno). */
export function CallButtons({ wa, onDark = false }: { wa?: string; onDark?: boolean }) {
  return (
    <>
      <a href={`tel:${site.phones.tel}`} className="btn btn--gold btn--lg">
        <Phone className="ico" />
        Ligar {site.phones.display}
      </a>
      <a
        href={waHref(wa)}
        className={`btn btn--ghost btn--lg${onDark ? ' btn--onink' : ''}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Whats className="ico" />
        WhatsApp
      </a>
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

/** Topo: o título centrado sobre o azul-noite e a cidade em traço na base, que deriva devagar
 *  e sobe em ritmo próprio ao rolar. Sem vídeo e sem curvas de nível. */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-h" data-hero>
      <Texture className="tex--cidade tex--hero" layer="cidade" />
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
          <CallButtons wa="uma ambulância" onDark />
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
        <p className="about__text">{presentation.text}</p>
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
}: {
  publico: Publico;
  heading: string;
  lede: string;
  id: string;
}) {
  const list = servicesFor(publico);
  return (
    <section className="sec cards" id={id} aria-labelledby={`${id}-h`}>
      <div className="wrap">
        <header className="sec__head">
          <h2 id={`${id}-h`} className="sec__title">
            {heading}
          </h2>
          <p className="sec__lede">{lede}</p>
        </header>
        <ul className={`cards__grid cards__grid--${list.length}`}>
          {list.map((s) => (
            <ServiceCard key={s.slug} s={s} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Suporte básico × UTI móvel, com a foto do interior e o que leva a UTI. */
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
            <div className="kit">
              <h3 className="kit__h">{t.kit.heading}</h3>
              <ul className="kit__list">
                {t.kit.items.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Quando chamar a Ouromed (texto aprovado em 24/11): emergência, remoção, empresas; 192 como nota. */
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

/** Depoimentos publicados, com nome e cargo, sobre o azul-noite. */
export function Testimonials() {
  return (
    <section className="quotes" aria-labelledby="q-h">
      <div className="wrap">
        <h2 id="q-h" className="sec__title quotes__h">
          Quem já contou com a Ouromed
        </h2>
        <ul className="quotes__grid">
          {testimonials.map((t) => (
            <li key={t.name} className="quote">
              <figure>
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Última ação antes do rodapé. */
export function CtaBlock({ wa = 'um orçamento' }: { wa?: string }) {
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
        <CallButtons wa={wa} />
      </div>
    </div>
  );
}

export function Faq({
  items = homeFaq,
  heading = 'Perguntas frequentes',
  wa,
}: {
  items?: FaqItem[];
  heading?: string;
  wa?: string;
}) {
  return (
    <section className="sec faq" aria-labelledby="faq-h">
      <div className="wrap faq__grid">
        <div className="faq__aside">
          <h2 id="faq-h" className="sec__title" data-split="lines">
            {heading}
          </h2>
          <CtaBlock wa={wa} />
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

/** Um serviço na página do público: foto, texto curto, lista e ações. A âncora é o slug antigo. */
export function ServiceSection({ s, flip = false }: { s: Service; flip?: boolean }) {
  return (
    <section
      className={`sec svc${flip ? ' svc--flip' : ''}`}
      id={s.slug}
      aria-labelledby={`${s.slug}-h`}
    >
      <div className="wrap svc__grid">
        <Media k={s.media} ratio="4 / 3" className="svc__media" />
        <div className="svc__text">
          <h2 id={`${s.slug}-h`} className="sec__title" data-split="lines">
            {s.title}
          </h2>
          <p className="svc__intro">{s.intro}</p>
          {s.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          <h3 className="svc__list-h">{s.list.heading}</h3>
          <ul className="svc__list">
            {s.list.items.map((li) => (
              <li key={li}>{li}</li>
            ))}
          </ul>
          <div className="svc__cta">
            <a
              href={waHref(s.wa)}
              className="btn btn--ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Whats className="ico" />
              WhatsApp
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

/** Bloco de texto das páginas institucionais. */
export function Prose({ block, id }: { block: Block; id: string }) {
  return (
    <section className="sec prose-sec" aria-labelledby={id}>
      <div className="wrap prose-sec__grid">
        <h2 id={id} className="sec__title" data-split="lines">
          {block.heading}
        </h2>
        <div className="prose">
          {block.paragraphs?.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          {block.list && (
            <ul>
              {block.list.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          )}
          {block.note && <p className="prose__note">{block.note}</p>}
        </div>
      </div>
    </section>
  );
}

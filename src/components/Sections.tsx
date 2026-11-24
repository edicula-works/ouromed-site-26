// Seções da home e das páginas internas. Tudo é Server Component (o motion é declarativo,
// por data-attributes e pelo palco do "Como funciona"); só o formulário é client (ContactForm.tsx).
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Block, Faq as FaqItem, MediaKey } from '@/data/site';
import {
  clients,
  conduct,
  coverage,
  events,
  homeFaq,
  honesty,
  howItWorks,
  services,
  site,
  testimonials,
  waHref,
} from '@/data/site';
import { AudienceTabs, HeroAudience } from './Audience';
import { Arrow, Phone, Plus, Roll, Whats } from './Icons';
import { Media } from './Media';
import { ServiceIcon } from './ServiceIcon';
import { stagger } from './stagger';

type Cta = { label: string; href: string };

/** Grupo de botões: Ligar (pílula ouro) e WhatsApp (fantasma), depois os CTAs próprios da página. */
export function Ctas({
  items,
  large = false,
  tel = true,
  wa,
}: {
  items?: Cta[];
  large?: boolean;
  tel?: boolean;
  /** Assunto da mensagem pré-preenchida do WhatsApp (undefined = sem WhatsApp). */
  wa?: string;
}) {
  const size = large ? ' btn--lg' : '';
  const gold = `btn btn--gold${size}`;
  const ghost = `btn btn--ghost${size}`;
  const telHref = `tel:${site.phones.tel}`;
  const phoneBtn = (
    <a href={telHref} className={gold}>
      <Phone className="ico" />
      <Roll>Ligar {site.phones.display}</Roll>
    </a>
  );
  // O primeiro CTA próprio da página é o principal (pílula ouro); telefone e WhatsApp vêm depois.
  const own = items?.[0];
  const rest = items?.slice(1) ?? [];
  return (
    <>
      {own &&
        (own.href.startsWith('tel:') ? (
          <a href={own.href} className={gold}>
            <Phone className="ico" />
            <Roll>{own.label}</Roll>
          </a>
        ) : own.href.startsWith('mailto:') ? (
          <a href={own.href} className={gold}>
            <Roll>{own.label}</Roll>
          </a>
        ) : (
          <Link href={own.href} className="link-arrow">
            {own.label} <Arrow className="ico" />
          </Link>
        ))}
      {tel && own?.href !== telHref && phoneBtn}
      {wa && (
        <a href={waHref(wa)} className={ghost} target="_blank" rel="noopener noreferrer">
          <Whats className="ico" />
          <Roll>WhatsApp</Roll>
        </a>
      )}
      {rest.map((c) =>
        c.href.startsWith('tel:') ? (
          <a key={c.href} href={c.href} className={ghost}>
            <Phone className="ico" />
            <Roll>{c.label}</Roll>
          </a>
        ) : c.href.startsWith('mailto:') ? (
          <a key={c.href} href={c.href} className={ghost}>
            <Roll>{c.label}</Roll>
          </a>
        ) : (
          <Link key={c.href} href={c.href} className="link-arrow">
            {c.label} <Arrow className="ico" />
          </Link>
        ),
      )}
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

/** CTA compacto: a última ação antes do rodapé, sem seção só para ele. */
export function CtaBlock({
  heading = 'Precisa falar com a Ouromed?',
  wa = 'um orçamento',
}: {
  heading?: string;
  wa?: string;
}) {
  return (
    <div className="cta-block" data-reveal="fade">
      <h2 className="cta-block__h">{heading}</h2>
      <p className="cta-block__text">
        Central 24 h, todos os dias:{' '}
        <a href={`tel:${site.phones.tel}`} className="link">
          {site.phones.display}
        </a>
        . Para eventos, locação, área protegida e ambulatórios,{' '}
        <Link href="/contato" className="link">
          peça orçamento
        </Link>
        .
      </p>
      <div className="cta-block__btns">
        <Ctas large wa={wa} items={[]} />
      </div>
    </div>
  );
}

/* ────────────────────────────── Home ────────────────────────────── */

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="wrap hero__grid">
        <h1 id="hero-h" className="hero__title">
          {/* Espaço entre as linhas: com display:block não cria vão visual, mas o textContent
              (SEO, leitor de tela) lê "Padrão ouro em saúde móvel." em vez de uma palavra só. */}
          <span className="hl" style={stagger(0)}>
            <span>Padrão ouro</span>
          </span>{' '}
          <span className="hl" style={stagger(1)}>
            <span>em saúde</span>
          </span>{' '}
          <span className="hl" style={stagger(2)}>
            <span>móvel.</span>
          </span>
        </h1>
        <div className="hero__art">
          <Media
            k="hero"
            ratio="4 / 5"
            priority
            reveal={false}
            sizes="(min-width: 1024px) 34vw, 100vw"
          />
        </div>
        <HeroAudience />
        <ul className="hero__trust hero__fade" style={stagger(5)} aria-label="Por que a Ouromed">
          {site.trust.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServiceIndex() {
  return (
    <section className="sec svc" id="servicos" aria-labelledby="svc-h">
      <div className="wrap">
        <header className="sec__head">
          <h2 id="svc-h" className="sec__title" data-split="lines">
            O que a Ouromed faz
          </h2>
          <p className="sec__lede" data-reveal="fade">
            Da emergência em casa à UTI móvel entre estados, e do evento de fim de semana ao
            contrato com a empresa.
          </p>
          <p className="sec__read read to-spine">7 frentes · 24 h</p>
          <AudienceTabs id="svc" className="svc__aud" />
        </header>
        <ul className="svc__list" id="svc-panel">
          {services.map((s) => (
            <li key={s.slug} className="svc__row" data-publico={s.publico} data-reveal="clip">
              <Link href={`/${s.slug}`} className="svc__link">
                <ServiceIcon k={s.icon} className="svc__icon" />
                <span className="svc__name">{s.nav}</span>
                <span className="svc__lede">{s.lede}</span>
                <Arrow className="ico svc__arrow" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Quando chamar a Ouromed: emergência (se há viatura livre), remoção agendada, empresas.
 *  O 192 fica numa nota de segurança, sem destaque. */
export function Honesty() {
  return (
    <section className="sec sec--tight honesty" aria-labelledby="hon-h">
      <div className="wrap">
        <header className="sec__head">
          <h2 id="hon-h" className="sec__title" data-split="lines">
            {honesty.heading}
          </h2>
          <p className="sec__lede" data-reveal="fade">
            {honesty.lede}
          </p>
        </header>
        <ul className="honesty__grid">
          {honesty.items.map((it) => (
            <li key={it.title} className="honesty__item" data-reveal="clip">
              <span className="honesty__tag read">{it.tag}</span>
              <h3 className="honesty__title">{it.title}</h3>
              <p className="honesty__text">{it.text}</p>
              {it.href.startsWith('tel:') ? (
                <a href={it.href} className="btn btn--gold">
                  <Phone className="ico" />
                  <Roll>{it.cta}</Roll>
                </a>
              ) : (
                <Link href={it.href} className="link-arrow">
                  {it.cta} <Arrow className="ico" />
                </Link>
              )}
            </li>
          ))}
        </ul>
        <p className="honesty__note" data-reveal="fade">
          <a href={site.emergency.tel} className="link">
            {honesty.note}
          </a>
        </p>
      </div>
    </section>
  );
}

/** "Como funciona": palco fixo com uma foto por passo; a linha ouro avança com os passos. */
export function HowItWorks() {
  const steps = howItWorks.steps;
  return (
    <section className="sec how" aria-labelledby="how-h">
      <div className="wrap">
        <header className="sec__head">
          <h2 id="how-h" className="sec__title" data-split="lines">
            {howItWorks.heading}
          </h2>
          <p className="sec__lede" data-reveal="fade">
            {howItWorks.lede}
          </p>
          <p className="sec__read read to-spine">4 passos</p>
        </header>
        <div className="how__grid">
          <div className="how__stage" data-stage data-state="0">
            <div className="how__shots">
              {steps.map((s, i) => (
                <div key={s.title} className="how__shot" data-shot={i}>
                  <Media k={s.media} ratio="4 / 3" reveal={false} />
                </div>
              ))}
            </div>
            <div className="how__bar" aria-hidden="true">
              <span className="how__bar-draw" />
            </div>
          </div>
          <ol className="how__steps">
            {steps.map((s, i) => (
              <li key={s.title} className="how__step" data-chapter data-reveal="fade">
                <span className="how__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Facts() {
  return (
    <section className="facts onink" aria-labelledby="cov-h" data-facts>
      <div className="wrap">
        <h2 id="cov-h" className="facts__title" data-split="lines">
          {coverage.heading}
        </h2>
        <p className="facts__text" data-reveal="fade">
          {coverage.text}
        </p>
        <dl className="facts__grid">
          {coverage.facts.map((f) => (
            <div key={f.label} className="fact" data-reveal="fade">
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="facts__kit">
          <Media k="uti-interior" ratio="3 / 2" className="facts__kit-media" />
          <div className="facts__kit-text" data-reveal="fade">
            <h3 className="facts__kit-h">{coverage.kit.heading}</h3>
            <ul className="facts__kit-list">
              {coverage.kit.items.map((k) => (
                <li key={k}>{k}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Conduct() {
  return (
    <section className="sec rule" aria-labelledby="rule-h">
      <div className="wrap">
        <header className="sec__head">
          <h2 id="rule-h" className="sec__title" data-split="lines">
            {conduct.heading}
          </h2>
          <p className="sec__lede" data-reveal="fade">
            {conduct.lede}
          </p>
          <p className="sec__read read to-spine">{conduct.items.length} regras</p>
        </header>
        <ol className="rule__list">
          {conduct.items.map((it, i) => (
            <li key={it.reading} className="rule__row" data-reveal="clip">
              <span className="rule__num">{String(i + 1).padStart(2, '0')}</span>
              <p className="rule__text">{it.text}</p>
              <span className="rule__reading read to-spine">{it.reading}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Parede de eventos: as miniaturas públicas do portfólio, com o ano só onde ele é público. */
export function EventsWall({ heading = 'Eventos que a Ouromed já cobriu' }: { heading?: string }) {
  return (
    <div className="events">
      <h3 className="events__h" data-reveal="fade">
        {heading}
      </h3>
      <ul className="events__wall" data-reveal="clip">
        {events.map((e) => (
          <li key={e.name} className="event">
            <figure className={`event__frame event__frame--${e.kind}`}>
              <Image src={e.image} alt={e.alt} width={220} height={133} />
            </figure>
            <p className="event__name">{e.name}</p>
            <p className="event__what">
              {e.what}
              {e.year && <span className="event__year">{e.year}</span>}
            </p>
          </li>
        ))}
        <li className="event event--note">
          <p className="events__note">
            Do portfólio publicado pela Ouromed: do Pedro Leopoldo Rodeio Show (2010) à Minas Trend
            Preview (2014).
          </p>
        </li>
      </ul>
    </div>
  );
}

/** Clientes publicados no site atual. A lista acompanha a apresentação (docs/PENDENCIAS.md). */
export function Clients({ heading = 'Clientes' }: { heading?: string }) {
  return (
    <div className="clients-wrap">
      <h3 className="events__h" data-reveal="fade">
        {heading}
      </h3>
      <ul
        className="clients"
        aria-label="Clientes que já contaram com a Ouromed"
        data-reveal="clip"
      >
        {clients.map((c) => (
          <li key={c.name} className="client">
            <Image src={`/imagens/clientes/${c.logo}`} alt={c.name} width={207} height={102} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="sec sec--tight quote" aria-labelledby="q-h">
      <div className="wrap">
        <header className="sec__head">
          <h2 id="q-h" className="sec__title" data-split="lines">
            Quem já contou com a Ouromed
          </h2>
          <p className="sec__read read to-spine">{testimonials.length} depoimentos</p>
        </header>
        <div className="quote__grid">
          {testimonials.map((t) => (
            <div key={t.name} className="quote__off">
              <figure className="quote__item" data-reveal="clip">
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
                <dl className="quote__case">
                  <dt>Pedido</dt>
                  <dd>{t.case.need}</dd>
                  <dt>Estrutura</dt>
                  <dd>{t.case.setup}</dd>
                  <dt>Resultado</dt>
                  <dd>{t.case.result}</dd>
                </dl>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Proof() {
  return (
    <section className="sec sec--tight proof" aria-labelledby="proof-h">
      <div className="wrap">
        <header className="sec__head">
          <h2 id="proof-h" className="sec__title" data-split="lines">
            {site.since}
          </h2>
          <p className="sec__read read to-spine">
            {events.length} eventos · {clients.length} clientes
          </p>
        </header>
        <EventsWall />
        <Clients />
      </div>
    </section>
  );
}

export function Faq({
  items = homeFaq,
  heading = 'Perguntas frequentes',
  cta = false,
}: {
  items?: FaqItem[];
  heading?: string;
  cta?: boolean;
}) {
  return (
    <section className="sec faq" aria-labelledby="faq-h">
      <div className="wrap faq__grid">
        <div className="faq__aside">
          <h2 id="faq-h" className="sec__title" data-split="lines">
            {heading}
          </h2>
          {cta && <CtaBlock />}
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

export function PageHero({
  read,
  title,
  intro,
  media: mk,
  ctas,
  wa,
}: {
  read: string;
  title: string;
  intro: string;
  media?: MediaKey;
  ctas?: Cta[];
  wa?: string;
}) {
  return (
    <section className="phero">
      <div className="wrap phero__grid">
        <div className="phero__text">
          <p className="phero__read read">{read}</p>
          <div className="phero__mask">
            <h1 className="phero__title">{title}</h1>
          </div>
          <p className="phero__intro">{intro}</p>
          <div className="phero__cta">
            <Ctas items={ctas} wa={wa} tel={false} />
          </div>
        </div>
        {mk && (
          <div className="phero__art">
            <Media k={mk} ratio="4 / 3" priority reveal={false} />
          </div>
        )}
      </div>
    </section>
  );
}

/** Um bloco de conteúdo tipado (prose, compare, steps, list, channels, events). */
export function BlockView({ block }: { block: Block }) {
  const id =
    block.id ??
    block.heading
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  const cls = 'sec sec--tight block';
  switch (block.type) {
    case 'prose':
      return (
        <section className={cls} aria-labelledby={id}>
          <div className="wrap">
            <h2 id={id} data-split="lines">
              {block.heading}
            </h2>
            <div className="prose" data-reveal="fade">
              {block.chips && (
                <ul className="chips" aria-label="Opcionais">
                  {block.chips.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              )}
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
              {block.note && <p className="read">{block.note}</p>}
            </div>
          </div>
        </section>
      );
    case 'compare':
      return (
        <section className={cls} aria-labelledby={id}>
          <div className="wrap">
            {block.intro && <p className="block__intro">{block.intro}</p>}
            <table className="compare" data-reveal="fade">
              <caption id={id}>{block.heading}</caption>
              <thead>
                <tr>
                  <th scope="col">{'\u00a0'}</th>
                  <th scope="col">{block.columns[0]}</th>
                  <th scope="col">{block.columns[1]}</th>
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    <td data-th={block.columns[0]}>{r.a}</td>
                    <td data-th={block.columns[1]}>{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      );
    case 'steps':
      return (
        <section className={cls} aria-labelledby={id}>
          <div className="wrap">
            <h2 id={id} data-split="lines">
              {block.heading}
            </h2>
            {block.intro && <p className="block__intro">{block.intro}</p>}
            <ol className="steps" data-reveal="fade">
              {block.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="steps__num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      );
    case 'list':
      return (
        <section className={cls} aria-labelledby={id}>
          <div className="wrap">
            <h2 id={id} data-split="lines">
              {block.heading}
            </h2>
            {block.intro && <p className="block__intro">{block.intro}</p>}
            <ul className="list" data-reveal="fade">
              {block.items.map((it) => (
                <li key={it.title}>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
    case 'channels':
      return (
        <section className={cls} aria-labelledby={id}>
          <div className="wrap">
            <h2 id={id} data-split="lines">
              {block.heading}
            </h2>
            <dl className="channels" data-reveal="fade">
              {block.rows.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.href ? <a href={r.href}>{r.value}</a> : r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      );
    case 'events':
      return (
        <section className={cls} aria-label={block.heading}>
          <div className="wrap">
            <EventsWall heading={block.heading} />
          </div>
        </section>
      );
    default:
      return null;
  }
}

export function Section({
  className,
  children,
  labelledBy,
}: {
  className: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section className={className} aria-labelledby={labelledBy}>
      <div className="wrap">{children}</div>
    </section>
  );
}

// Seções da home e das páginas internas. Tudo é Server Component (o motion é declarativo,
// por data-attributes); só o formulário de orçamento é client (ContactForm.tsx).
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Block, Faq as FaqItem, IllustrationKey } from '@/data/site';
import {
  clients,
  conduct,
  coverage,
  events,
  homeFaq,
  howItWorks,
  services,
  site,
  testimonials,
} from '@/data/site';
import { Arrow, Phone, Plus, Roll, Whats } from './Icons';
import { Illustration } from './Illustrations';
import { stagger } from './stagger';

type Cta = { label: string; href: string };

/** Grupo de botões: Ligar (pílula ouro) e WhatsApp (fantasma), depois os CTAs próprios da página. */
export function Ctas({
  items,
  large = false,
  tel = true,
  wa = true,
}: {
  items?: Cta[];
  large?: boolean;
  tel?: boolean;
  wa?: boolean;
}) {
  const cls = `btn btn--gold${large ? ' btn--lg' : ''}`;
  const ghost = `btn btn--ghost${large ? ' btn--lg' : ''}`;
  const seen = new Set(items?.map((i) => i.href) ?? []);
  return (
    <>
      {tel && !seen.has(`tel:${site.phones.tel}`) && (
        <a href={`tel:${site.phones.tel}`} className={cls}>
          <Phone className="ico" />
          <Roll>Ligar {site.phones.display}</Roll>
        </a>
      )}
      {wa && (
        <a href={site.whatsapp.href} className={ghost} target="_blank" rel="noopener noreferrer">
          <Whats className="ico" />
          <Roll>WhatsApp</Roll>
        </a>
      )}
      {items?.map((c) =>
        c.href.startsWith('tel:') ? (
          <a key={c.href} href={c.href} className={cls}>
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
        <div className="hero__art" data-drive>
          <Illustration
            k="uti"
            title="Ambulância UTI móvel da Ouromed, de perfil, com a faixa ouro"
          />
        </div>
        <p className="hero__lede hero__fade" style={stagger(3)}>
          Ambulância UTI, atendimento domiciliar, remoção de pacientes e cobertura de eventos, em
          Belo Horizonte e em todo o Brasil. Central 24 h com triagem médica.
        </p>
        <div className="hero__cta hero__fade" style={stagger(4)}>
          <a href={`tel:${site.phones.tel}`} className="btn btn--gold btn--lg">
            <Phone className="ico" />
            <Roll>Ligar {site.phones.display}</Roll>
          </a>
          <a
            href={site.whatsapp.href}
            className="btn btn--ghost btn--lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Whats className="ico" />
            <Roll>WhatsApp</Roll>
          </a>
          <Link href="/contato" className="link-arrow">
            Solicitar orçamento <Arrow className="ico" />
          </Link>
        </div>
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
            Sete frentes, uma equipe. Da emergência em casa à UTI móvel entre estados.
          </p>
          <p className="sec__read read to-spine">7 frentes · 24 h</p>
        </header>
        <ol className="svc__list">
          {services.map((s, i) => (
            <li key={s.slug} className="svc__row" data-reveal>
              <Link href={`/${s.slug}`} className="svc__link">
                <span className="svc__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="svc__name">{s.nav}</span>
                <span className="svc__lede">{s.lede}</span>
                <span className="svc__art">
                  <Illustration k={s.illustration} />
                </span>
                <Arrow className="ico svc__arrow" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

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
            <div className="how__scenes" aria-hidden="true">
              {steps.map((s, i) => (
                <div key={s.title} className="how__scene" data-scene={i}>
                  <Illustration k={s.illustration} />
                </div>
              ))}
            </div>
            <div className="how__rail" aria-hidden="true">
              <span className="how__rail-draw" />
              {steps.map((s, i) => (
                <span key={s.title} className="how__mark">
                  {String(i + 1).padStart(2, '0')} {s.title.split(' ').slice(0, 2).join(' ')}
                </span>
              ))}
            </div>
          </div>
          <ol className="how__steps">
            {steps.map((s, i) => (
              <li key={s.title} className="how__step" data-chapter data-reveal>
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
    <section className="facts onink" aria-labelledby="cov-h">
      <div className="wrap">
        <h2 id="cov-h" className="facts__title" data-split="lines">
          {coverage.heading}
        </h2>
        <p className="facts__text" data-reveal="fade">
          {coverage.text}
        </p>
        <dl className="facts__grid">
          {coverage.facts.map((f) => (
            <div key={f.label} className="fact" data-reveal>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
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
            <li key={it.reading} className="rule__row" data-reveal>
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
      <ul className="events__wall">
        {events.map((e) => (
          <li key={e.name} className="event" data-reveal="fade">
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
      </ul>
      <p className="events__note">
        Do portfólio publicado pela Ouromed: do Pedro Leopoldo Rodeio Show (2010) à Minas Trend
        Preview (2014).
      </p>
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
        data-reveal="fade"
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
    <section className="sec quote" aria-labelledby="q-h">
      <div className="wrap">
        <header className="sec__head">
          <h2 id="q-h" className="sec__title" data-split="lines">
            Quem já contou com a Ouromed
          </h2>
          <p className="sec__lede" data-reveal="fade">
            Rodeio, shopping e televisão: três parceiros, três depoimentos publicados pela Ouromed.
          </p>
          <p className="sec__read read to-spine">{testimonials.length} depoimentos</p>
        </header>
        <div className="quote__grid">
          {testimonials.map((t) => (
            <div key={t.name} className="quote__off">
              <figure className="quote__item" data-reveal>
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
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
          <p className="sec__lede" data-reveal="fade">
            Alguns eventos e clientes do portfólio da Ouromed, em Minas e no Brasil.
          </p>
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

export function FinalCta() {
  return (
    <section className="sec cta" aria-labelledby="cta-h">
      <div className="wrap">
        <h2 id="cta-h" className="sec__title" data-split="lines">
          Precisa falar com a Ouromed?
        </h2>
        <p className="cta__text" data-reveal="fade">
          Central 24 h:{' '}
          <a href={`tel:${site.phones.tel}`} className="link">
            {site.phones.display}
          </a>
          . Para orçamento de eventos, locação, área protegida ou ambulatórios,{' '}
          <Link href="/contato" className="link">
            peça pelo formulário
          </Link>{' '}
          ou pelo WhatsApp.
        </p>
        <div className="cta__btns" data-reveal="fade">
          <Ctas large items={[{ label: 'Pedir orçamento', href: '/contato' }]} />
        </div>
      </div>
    </section>
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
        <h2 id="faq-h" className="sec__title" data-split="lines">
          {heading}
        </h2>
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
  illustration,
  artTitle,
  ctas,
}: {
  read: string;
  title: string;
  intro: string;
  illustration?: IllustrationKey;
  artTitle?: string;
  ctas?: Cta[];
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
            <Ctas items={ctas} />
          </div>
        </div>
        {illustration && (
          <div className="phero__art" data-drive>
            <Illustration k={illustration} title={artTitle} />
          </div>
        )}
      </div>
    </section>
  );
}

/** Um bloco de conteúdo tipado (prose, compare, steps, list, channels, events). */
export function BlockView({ block, wide = false }: { block: Block; wide?: boolean }) {
  const id =
    block.id ??
    block.heading
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  const cls = `sec sec--tight block${wide ? ' block--wide' : ''}`;
  switch (block.type) {
    case 'prose':
      return (
        <section className={cls} aria-labelledby={id}>
          <div className="wrap">
            <h2 id={id} data-split="lines">
              {block.heading}
            </h2>
            <div className="prose" data-reveal="fade">
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
            <ul className="list">
              {block.items.map((it) => (
                <li key={it.title} data-reveal="fade">
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
                  <dd>
                    {r.href ? (
                      <a href={r.href} className={r.href.startsWith('http') ? 'link' : undefined}>
                        {r.value}
                      </a>
                    ) : (
                      r.value
                    )}
                  </dd>
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

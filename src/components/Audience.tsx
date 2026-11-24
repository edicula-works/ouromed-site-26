'use client';
// Seletor "Para você / Para empresas". A escolha fica em <html data-aud> (o índice de serviços filtra
// por CSS) e no sessionStorage. Sem JS, nada é filtrado e o hero mostra a frase de "Para você".
import Link from 'next/link';
import { type KeyboardEvent, useEffect, useRef, useState } from 'react';
import { audiences, type Publico, site, waHref } from '@/data/site';
import { Arrow, Phone, Roll, Whats } from './Icons';

const KEY = 'om-aud';
const EVENT = 'om-aud';
const order: Publico[] = ['voce', 'empresa'];

function read(): Publico {
  try {
    const v = sessionStorage.getItem(KEY);
    return v === 'empresa' ? 'empresa' : 'voce';
  } catch {
    return 'voce';
  }
}

function useAudience() {
  const [aud, setAud] = useState<Publico>('voce');
  useEffect(() => {
    const sync = () => setAud(read());
    sync();
    document.documentElement.dataset.aud = read();
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);
  const choose = (v: Publico) => {
    try {
      sessionStorage.setItem(KEY, v);
    } catch {}
    document.documentElement.dataset.aud = v;
    window.dispatchEvent(new Event(EVENT));
  };
  return [aud, choose] as const;
}

/** As abas. `id` distingue as instâncias (hero e índice) para os ids de aria. */
export function AudienceTabs({ id, className = '' }: { id: string; className?: string }) {
  const [aud, choose] = useAudience();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = order[(order.indexOf(aud) + 1) % order.length];
    choose(next);
    refs.current[order.indexOf(next)]?.focus();
  };
  return (
    <div className={`aud ${className}`} role="tablist" aria-label="Para quem" onKeyDown={onKey}>
      {order.map((v, i) => (
        <button
          key={v}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="button"
          role="tab"
          id={`${id}-tab-${v}`}
          aria-selected={aud === v}
          aria-controls={`${id}-panel`}
          tabIndex={aud === v ? 0 : -1}
          className="aud__tab"
          onClick={() => choose(v)}
        >
          {audiences[v].tab}
        </button>
      ))}
    </div>
  );
}

/** Frase de apoio e botões do hero, conforme o público escolhido. */
export function HeroAudience() {
  const [aud] = useAudience();
  const a = audiences[aud];
  return (
    <>
      <AudienceTabs id="hero" className="hero__aud hero__fade" />
      <div
        id="hero-panel"
        role="tabpanel"
        aria-labelledby={`hero-tab-${aud}`}
        className="hero__panel hero__fade"
      >
        <p className="hero__lede" aria-live="polite">
          {a.lede}
        </p>
        <div className="hero__cta">
          <a href={`tel:${site.phones.tel}`} className="btn btn--gold btn--lg">
            <Phone className="ico" />
            <Roll>Ligar {site.phones.display}</Roll>
          </a>
          <a
            href={waHref(a.wa)}
            className="btn btn--ghost btn--lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Whats className="ico" />
            <Roll>WhatsApp</Roll>
          </a>
          <Link href={a.cta.href} className="link-arrow">
            {a.cta.label} <Arrow className="ico" />
          </Link>
        </div>
      </div>
    </>
  );
}

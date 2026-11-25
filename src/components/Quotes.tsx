'use client';

// Depoimentos, um por vez, num bloco azul-noite com setas; a troca é por transparência.
// Por ora são espaços reservados (o cliente ainda vai enviar depoimentos atuais).
import { useState } from 'react';
import { testimonialSlots } from '@/data/site';
import { Arrow } from './Icons';

export function Quotes() {
  const [i, setI] = useState(0);
  const n = testimonialSlots.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  return (
    <section className="quotes" aria-labelledby="q-h" aria-roledescription="carrossel">
      <div className="wrap quotes__inner">
        <h2 id="q-h" className="sec__title quotes__h">
          Quem já contou com a Ouromed
        </h2>
        <div className="quotes__stage" aria-live="polite">
          {testimonialSlots.map((t, k) => (
            <figure
              key={t.who}
              className="quote"
              data-active={k === i ? '' : undefined}
              aria-hidden={k !== i}
            >
              <blockquote>
                <p className="quote__ph">Espaço para o depoimento de um cliente atual.</p>
              </blockquote>
              <figcaption>
                <strong>{t.who}</strong>
                <span>{t.context} · depoimento a confirmar</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="quotes__nav">
          <button type="button" className="quotes__btn" onClick={() => go(-1)}>
            <Arrow className="ico quotes__prev" />
            <span className="sr-only">Depoimento anterior</span>
          </button>
          <span className="quotes__count">
            {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
          </span>
          <button type="button" className="quotes__btn" onClick={() => go(1)}>
            <Arrow className="ico" />
            <span className="sr-only">Próximo depoimento</span>
          </button>
        </div>
      </div>
    </section>
  );
}

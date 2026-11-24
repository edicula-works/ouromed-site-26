'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { services, site } from '@/data/site';
import { Phone, Roll, Whats } from './Icons';
import { Wordmark } from './Illustrations';
import { stagger } from './stagger';

export function Header() {
  const path = usePathname();
  const [drop, setDrop] = useState(false);
  const [menu, setMenu] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  // Cabeçalho marca a rolagem (fio no rodapé do header) e sincroniza a classe do menu.
  useEffect(() => {
    const h = document.documentElement;
    h.classList.toggle('menu-open', menu);
    if (!menu) h.classList.remove('header-away');
    return () => h.classList.remove('menu-open');
  }, [menu]);

  const closeOnBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!dropRef.current?.contains(e.relatedTarget as Node)) setDrop(false);
  };

  const current = (href: string) => (path === href ? 'page' : undefined);

  return (
    <header className="hdr">
      <div className="wrap hdr__row">
        <Link
          href="/"
          className="hdr__brand"
          aria-label="Ouromed, página inicial"
          aria-current={current('/')}
        >
          <Wordmark />
        </Link>

        <nav className="hdr__nav" aria-label="Principal">
          {/* biome-ignore lint/a11y/noStaticElementInteractions: abrir por hover é conveniência de mouse; o teclado usa o botão */}
          <div
            className="hdr__drop"
            ref={dropRef}
            onBlur={closeOnBlur}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setDrop(true)}
            onPointerLeave={(e) => e.pointerType === 'mouse' && setDrop(false)}
          >
            <button
              type="button"
              className="hdr__link draw"
              aria-expanded={drop}
              aria-controls={drop ? 'menu-servicos' : undefined}
              onClick={() => setDrop((v) => !v)}
            >
              Serviços
            </button>
            {drop && (
              <ul id="menu-servicos" className="hdr__panel">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/${s.slug}`}
                      onClick={() => setDrop(false)}
                      aria-current={current(`/${s.slug}`)}
                    >
                      <span className="hdr__panel-lede">{s.nav}</span>
                      <span className="hdr__panel-sub">{s.lede}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link href="/sobre" className="hdr__link draw" aria-current={current('/sobre')}>
            Sobre
          </Link>
          <Link href="/contato" className="hdr__link draw" aria-current={current('/contato')}>
            Contato
          </Link>
        </nav>

        <a href={`tel:${site.phones.tel}`} className="btn btn--gold hdr__cta">
          <Phone className="ico" />
          <Roll>Ligar {site.phones.display}</Roll>
        </a>

        <button
          type="button"
          className="hdr__burger"
          aria-expanded={menu}
          aria-controls={menu ? 'menu' : undefined}
          onClick={() => setMenu(true)}
        >
          <span className="hdr__burger-line" aria-hidden="true" />
          <span className="hdr__burger-line" aria-hidden="true" />
          <span className="sr-only">Abrir menu</span>
        </button>
      </div>

      {menu && <Menu onClose={() => setMenu(false)} current={current} />}
    </header>
  );
}

function Menu({
  onClose,
  current,
}: {
  onClose: () => void;
  current: (h: string) => 'page' | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  // Foco preso no painel, Escape fecha, o foco volta ao botão. Só existe no DOM enquanto aberto.
  useEffect(() => {
    const panel = ref.current;
    const opener = document.activeElement as HTMLElement | null;
    const focusables = () => [
      ...(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []),
    ];
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeRef.current();
      }
      if (e.key === 'Tab') {
        const list = focusables();
        const first = list[0];
        const last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, []);

  return (
    <div id="menu" className="menu" ref={ref} role="dialog" aria-modal="true" aria-label="Menu">
      <div className="menu__top">
        <Link
          href="/"
          onClick={onClose}
          className="hdr__brand"
          aria-label="Ouromed, página inicial"
        >
          <Wordmark />
        </Link>
        <button type="button" className="menu__close" onClick={onClose}>
          <span className="menu__close-x" aria-hidden="true" />
          <span className="sr-only">Fechar menu</span>
        </button>
      </div>
      <nav className="menu__nav" aria-label="Menu completo">
        <p className="menu__label">Serviços</p>
        <ul className="menu__list">
          {services.map((s, i) => (
            <li key={s.slug} style={stagger(i)}>
              <Link href={`/${s.slug}`} onClick={onClose} aria-current={current(`/${s.slug}`)}>
                {s.nav}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="menu__list menu__list--alt">
          <li style={stagger(services.length)}>
            <Link href="/sobre" onClick={onClose} aria-current={current('/sobre')}>
              Sobre a Ouromed
            </Link>
          </li>
          <li style={stagger(services.length + 1)}>
            <Link href="/contato" onClick={onClose} aria-current={current('/contato')}>
              Contato e orçamento
            </Link>
          </li>
        </ul>
      </nav>
      <div className="menu__cta">
        <a href={`tel:${site.phones.tel}`} className="btn btn--gold">
          <Phone className="ico" />
          <Roll>Ligar {site.phones.display}</Roll>
        </a>
        <a
          href={site.whatsapp.href}
          className="btn btn--ghost btn--onink"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Whats className="ico" />
          <Roll>WhatsApp {site.whatsapp.display}</Roll>
        </a>
        <p className="menu__note">{site.emergency.label.replace(' (SAMU)', '')}</p>
      </div>
    </div>
  );
}

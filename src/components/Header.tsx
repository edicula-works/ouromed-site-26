'use client';

// Cabeçalho (rodada 6). Desktop: marca · Para você ▾ · Para empresas ▾ · Sobre · Contato · Ligar.
// Transparente sobre o topo escuro da home; vidro claro depois de rolar; sai ao descer e volta
// ao subir (src/motion/setup.ts → header()). Os painéis abrem por clip-path com os itens em cascata
// (CSS, por [data-open]). Celular: botão "Menu" abre um overlay azul-noite de tela cheia.
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { audiencePages, type Publico, serviceHref, servicesFor, site } from '@/data/site';
import { Phone } from './Icons';
import { ServiceIcon } from './ServiceIcon';
import { Wordmark } from './Wordmark';

const groups: Publico[] = ['voce', 'empresa'];
const step = (i: number) => ({ '--i': i }) as CSSProperties;

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState<Publico | null>(null);
  const [menu, setMenu] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Classe do menu no <html> (a barra fixa some e o cabeçalho não sai de cena com o menu aberto).
  useEffect(() => {
    const h = document.documentElement;
    h.classList.toggle('menu-open', menu || open !== null);
    if (menu || open) h.classList.remove('header-away');
    return () => h.classList.remove('menu-open');
  }, [menu, open]);

  // Painel fecha com Escape, com clique fora e na troca de rota.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const btn = navRef.current?.querySelector<HTMLButtonElement>(`[data-drop="${open}"]`);
      setOpen(null);
      btn?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: fecha tudo a cada troca de rota
  useEffect(() => {
    setOpen(null);
    setMenu(false);
  }, [path]);

  const current = (href: string) => (path === href ? 'page' : undefined);

  return (
    <header className="hdr" data-home={path === '/' ? '' : undefined}>
      <div className="wrap hdr__row">
        <Link
          href="/"
          className="hdr__brand"
          aria-label="Ouromed, página inicial"
          aria-current={current('/')}
        >
          <Wordmark />
        </Link>

        <nav className="hdr__nav" aria-label="Principal" ref={navRef}>
          {groups.map((g) => {
            const page = audiencePages[g];
            const isOpen = open === g;
            return (
              <div key={g} className="hdr__drop" data-open={isOpen ? '' : undefined}>
                <button
                  type="button"
                  className="hdr__link"
                  data-drop={g}
                  aria-expanded={isOpen}
                  aria-controls={`drop-${g}`}
                  aria-current={path === page.path ? 'page' : undefined}
                  onClick={() => setOpen(isOpen ? null : g)}
                >
                  {page.nav}
                  <span className="hdr__caret" aria-hidden="true" />
                </button>
                <div id={`drop-${g}`} className="drop">
                  <ul className="drop__list">
                    {servicesFor(g).map((s, i) => (
                      <li key={s.slug} style={step(i)}>
                        <Link
                          href={serviceHref(s)}
                          className="drop__item"
                          tabIndex={isOpen ? undefined : -1}
                          onClick={() => setOpen(null)}
                        >
                          <ServiceIcon k={s.icon} className="drop__icon" />
                          <span className="drop__name">{s.nav}</span>
                          <span className="drop__lede">{s.lede}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={page.path}
                    className="drop__all"
                    tabIndex={isOpen ? undefined : -1}
                    onClick={() => setOpen(null)}
                  >
                    Tudo {page.nav.toLowerCase()}
                  </Link>
                </div>
              </div>
            );
          })}
          <Link href="/sobre" className="hdr__link" aria-current={current('/sobre')}>
            Sobre
          </Link>
          <Link href="/contato" className="hdr__link" aria-current={current('/contato')}>
            Contato
          </Link>
        </nav>

        <a href={`tel:${site.phones.tel}`} className="btn btn--gold hdr__cta">
          <Phone className="ico" />
          Ligar {site.phones.display}
        </a>

        <button
          type="button"
          className="hdr__menu"
          aria-expanded={menu}
          aria-controls={menu ? 'menu' : undefined}
          onClick={() => setMenu(true)}
        >
          Menu
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

  let i = 0;
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
        <button type="button" className="hdr__menu" onClick={onClose}>
          Fechar
        </button>
      </div>
      <nav className="menu__nav" aria-label="Menu completo">
        {groups.map((g) => (
          <div key={g} className="menu__group">
            <p className="menu__label" style={step(i++)}>
              {audiencePages[g].nav}
            </p>
            <ul className="menu__list">
              {servicesFor(g).map((s) => (
                <li key={s.slug} style={step(i++)}>
                  <Link href={serviceHref(s)} onClick={onClose}>
                    {s.nav}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <ul className="menu__list menu__list--alt">
          <li style={step(i++)}>
            <Link href="/sobre" onClick={onClose} aria-current={current('/sobre')}>
              Sobre a Ouromed
            </Link>
          </li>
          <li style={step(i++)}>
            <Link href="/contato" onClick={onClose} aria-current={current('/contato')}>
              Contato e orçamento
            </Link>
          </li>
        </ul>
      </nav>
      <div className="menu__cta">
        <a href={`tel:${site.phones.tel}`} className="btn btn--gold btn--lg">
          <Phone className="ico" />
          Ligar {site.phones.display}
        </a>
        <Link href="/contato" onClick={onClose} className="btn btn--ghost btn--onink btn--lg">
          Pedir orçamento
        </Link>
      </div>
    </div>
  );
}

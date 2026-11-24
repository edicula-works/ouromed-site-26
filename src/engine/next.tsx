'use client';

import { usePathname, useRouter } from 'next/navigation';
// Adaptador Next.js (App Router). Renderize <Engine setup={…} /> uma vez, como ÚLTIMO filho de
// <body> (React roda os efeitos dos filhos primeiro, então os componentes registram antes do boot).
// Links internos (<a> ou next/link) recebem a transição leave → push → enter automaticamente.
// Desative num link com data-no-transition. Voltar/avançar pula a cortina.
import { useEffect, useRef } from 'react';
import { boot, cleanup, enter, leave, onPage, type PageFn } from './index';

export function Engine({ setup }: { setup?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const mode = useRef<'idle' | 'push' | 'pop'>('idle');
  const first = useRef(true);

  // biome-ignore lint/correctness/useExhaustiveDependencies: setup roda uma vez, de propósito
  useEffect(() => {
    boot(setup);
  }, []);

  useEffect(() => {
    const onClick = async (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const a = (e.target as Element).closest('a');
      if (
        !a ||
        (a.target && a.target !== '_self') ||
        a.hasAttribute('download') ||
        a.hasAttribute('data-no-transition')
      )
        return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return; // externo, hash ou mesma página
      e.preventDefault(); // next/link vê defaultPrevented e não navega
      // Continuidade: a cortina diz para onde vai, com o nome do link clicado.
      const label = (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60);
      const target = document.querySelector<HTMLElement>('[data-curtain-label]');
      if (target) target.textContent = label;
      if (mode.current !== 'idle') return;
      mode.current = 'push';
      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);
      await leave();
      cleanup();
      router.push(href, { scroll: false });
    };
    const onPop = () => {
      mode.current = 'pop';
      cleanup();
    };
    document.addEventListener('click', onClick, true);
    addEventListener('popstate', onPop);
    return () => {
      document.removeEventListener('click', onClick, true);
      removeEventListener('popstate', onPop);
    };
  }, [router]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: roda a cada troca de rota; pathname é o gatilho
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const pop = mode.current === 'pop';
    mode.current = 'idle';
    enter({ transition: !pop, scrollTop: !pop });
  }, [pathname]);

  return null;
}

/** Código de motion de um componente: roda quando a página está pronta, revertido na saída. */
export function usePage(fn: PageFn) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: registra no mount, de propósito
  useEffect(() => onPage(fn), []);
}

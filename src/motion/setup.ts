// Motion global do site (rodada 6). Inventário fechado em docs/CRITERIOS-DE-ACEITE.md §5:
//   1. intro que surge e dissolve (CSS; aqui só pular e encerrar)
//   2. título por máscara (data-split, motor)
//   3. imagem que se revela e sai da escala 1,06 (data-reveal="clip", motor)
//   4. zoom leve da foto do cartão no hover (CSS)
//   5. textura de curvas de nível com deriva lenta (data-parallax, motor)
//   6. menu e painéis abrindo por clip-path com itens em cascata (CSS)
//   7. atos: na home, cada seção sobe e cobre a anterior, que escurece; no topo, as camadas do
//      desenho de BH andam em ritmos diferentes (pedido da pessoa, 24/11)
// Fora disso: só a troca de página em opacidade e o cabeçalho (vidro, sair e voltar).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, onPage, onScroll, prefersReducedMotion, setTransition } from '@/engine';

gsap.registerPlugin(ScrollTrigger);

export function setupMotion() {
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  intro();
  fade();
  header();
  hashTarget();
  videos();
  acts();
}

/** Atos da home: cada seção sobe e cobre a anterior. Cada ato é `position: sticky` (classe
 *  `acts-on`) e gruda no ponto em que o fim dele encosta no fim da tela; o próximo, que vem
 *  depois no HTML, passa por cima, e o que ficou para trás escurece. No topo, durante a saída, o
 *  título sobe e some, a cidade sobe mais rápido e a serra ao fundo mais devagar.
 *  Só no desktop (≥ 768 px) e com movimento permitido; senão é uma página comum. */
function acts() {
  onPage(() => {
    const root = document.querySelector<HTMLElement>('.acts');
    if (!root || prefersReducedMotion()) return undefined;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const list = gsap.utils.toArray<HTMLElement>(':scope > section', root);
      const place = () => {
        for (const act of list) act.style.top = `${Math.min(0, innerHeight - act.offsetHeight)}px`;
      };
      root.classList.add('acts-on');
      place();
      ScrollTrigger.addEventListener('refreshInit', place);
      list.forEach((act, i) => {
        const next = list[i + 1];
        if (!next) return;
        gsap.fromTo(
          act,
          { '--dim': 0 },
          {
            '--dim': 0.5,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
          },
        );
      });
      const hero = root.querySelector<HTMLElement>('[data-hero]');
      const next = list[1];
      if (hero && next) {
        const st = { trigger: next, start: 'top bottom', end: 'top top', scrub: 0.6 };
        gsap.to(hero.querySelector('[data-hero-content]'), {
          yPercent: -18,
          opacity: 0,
          scale: 0.96,
          ease: 'power1.in',
          scrollTrigger: st,
        });
        gsap.to(hero.querySelector('[data-layer="cidade"]'), {
          yPercent: -22,
          ease: 'none',
          scrollTrigger: st,
        });
        gsap.to(hero.querySelector('[data-layer="fundo"]'), {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: st,
        });
      }
      // Abrir uma pergunta do FAQ muda a altura: recalcula onde cada ato gruda.
      const refresh = () => ScrollTrigger.refresh();
      root.addEventListener('toggle', refresh, true);
      return () => {
        root.removeEventListener('toggle', refresh, true);
        ScrollTrigger.removeEventListener('refreshInit', place);
        root.classList.remove('acts-on');
        for (const act of list) act.style.top = '';
      };
    });
    return () => mm.revert();
  });
}

/** Intro da marca na primeira visita da sessão. A animação é CSS (começa antes do JS) e o script
 *  de flags tira a classe a 1,3 s; aqui só se pula com clique ou tecla. */
function intro() {
  const root = document.documentElement;
  if (!root.classList.contains('intro-on')) return;
  const end = () => {
    root.classList.remove('intro-on');
    removeEventListener('pointerdown', end);
    removeEventListener('keydown', end);
  };
  addEventListener('pointerdown', end, { once: true });
  addEventListener('keydown', end, { once: true });
}

/** Troca de página: o papel cobre em opacidade e descobre a página nova. Nada desliza. */
function fade() {
  setTransition({
    leave: (c) =>
      gsap
        .timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: ease.soft }),
    enter: (c) =>
      gsap
        .timeline()
        .to(c, { opacity: 0, duration: 0.35, ease: ease.soft })
        .set(c, { autoAlpha: 0 }),
  });
}

/** Cabeçalho: vidro depois da primeira rolagem; sai ao descer e volta ao subir (frame that steps
 *  aside, patterns.md §6), nunca com um painel ou o menu aberto. */
function header() {
  let last = 0;
  onScroll(({ y }) => {
    const root = document.documentElement;
    root.classList.toggle('is-scrolled', y > 8);
    if (Math.abs(y - last) < 4) return;
    if (!root.classList.contains('menu-open'))
      root.classList.toggle('header-away', y > 160 && y > last);
    last = y;
  });
}

/** Link para /para-voce#remocao vindo de outra página: o motor volta ao topo na troca, então
 *  a seção é levada à vista depois que a página nova está pronta. */
function hashTarget() {
  onPage(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return undefined;
    const el = document.getElementById(id);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: 'start' }));
    return undefined;
  });
}

/** Vídeos em loop param para quem pediu menos movimento (fica o pôster). */
function videos() {
  onPage(() => {
    if (!prefersReducedMotion()) return undefined;
    document.querySelectorAll<HTMLVideoElement>('video[data-media-video]').forEach((v) => {
      v.removeAttribute('autoplay');
      v.pause();
    });
    return undefined;
  });
}

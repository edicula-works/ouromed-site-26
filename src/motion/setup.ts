// Motion global do site (rodada 6). Inventário fechado em docs/CRITERIOS-DE-ACEITE.md §5:
//   1. intro que surge e dissolve (CSS; aqui só pular e encerrar)
//   2. título por máscara (data-split, motor)
//   3. imagem que se revela e sai da escala 1,06 (data-reveal="clip", motor)
//   4. zoom leve da foto do cartão no hover (CSS)
//   5. textura de curvas de nível com deriva lenta (data-parallax, motor)
//   6. menu e painéis abrindo por clip-path com itens em cascata (CSS)
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

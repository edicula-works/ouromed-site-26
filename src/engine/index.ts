// Núcleo do motor: ciclo de vida da página, sem acessar o DOM no import (seguro em SSR).
// Sem loader (ninguém em emergência espera um contador) e sem WebGL (decisão do brief).
//   boot(setup)            uma vez, na primeira carga: setup → init da página → intro
//   leave() → cleanup()    antes da troca de rota (leave roda em paralelo com o fetch)
//   enter()                com a nova página no DOM: init → animação de entrada → intro
// Código da página entra com onPage(fn): roda a cada carga dentro de um gsap.context, então
// tweens e ScrollTriggers são revertidos sozinhos. Devolva uma limpeza para o resto.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './env';
import { initReveals } from './reveal';
import { initScroll, resetScroll } from './scroll';
import { playEnter, playLeave } from './transition';

gsap.registerPlugin(ScrollTrigger);

export { ease, prefersReducedMotion } from './env';
export { onScroll } from './scroll';
export { setTransition } from './transition';

export type PageFn = (page: {
  intro: gsap.core.Timeline;
  path: string;
}) => undefined | (() => void);
const pageFns = new Set<PageFn>();
const cleanups: (() => void)[] = [];
let ctx: gsap.Context | null = null;
let intro: gsap.core.Timeline | null = null;
let ready = false;
let booted = false;

/** Roda fn a cada carga de página (e agora, se a página já está pronta). Devolve o cancelamento. */
export function onPage(fn: PageFn) {
  pageFns.add(fn);
  if (ready) runPageFn(fn);
  return () => {
    pageFns.delete(fn);
  };
}

function runPageFn(fn: PageFn) {
  ctx?.add(() => {
    const c = fn({
      intro: intro as gsap.core.Timeline,
      path: location.pathname,
    });
    if (typeof c === 'function') cleanups.push(c);
  });
}

// Classes em <html>. Reaplicadas a cada página porque alguns roteadores trocam atributos da raiz.
export function syncFlags() {
  const h = document.documentElement.classList;
  h.add('js', 'is-booted');
  h.toggle('motion', !prefersReducedMotion());
}

function initPage() {
  syncFlags();
  ctx = gsap.context(() => {
    intro = initReveals(document);
  });
  ready = true;
  pageFns.forEach(runPageFn);
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

/** Primeira carga. `setup` roda uma vez no cliente, antes da página: setTransition e módulos globais. */
export async function boot(setup?: () => void) {
  if (booted) return;
  booted = true;
  syncFlags();
  initScroll();
  setup?.();
  initPage();
  intro?.play();
}

/** Animação de saída (resolve quando a tela está coberta). */
export async function leave() {
  await playLeave();
}

/** Desmonta a página atual: reverte tweens, ScrollTriggers e splits. */
export function cleanup() {
  if (!ready) return;
  ready = false;
  cleanups.splice(0).forEach((c) => {
    c();
  });
  ctx?.revert();
  ctx = null;
}

/** Inicia a página nova. `transition: false` em voltar/avançar, onde não houve leave. */
export async function enter({ transition = true, scrollTop = true } = {}) {
  if (!booted) return;
  cleanup(); // no-op se o adaptador já limpou
  if (scrollTop) resetScroll();
  initPage();
  if (transition) await playEnter();
  intro?.play();
}

// Scroll nativo, sem Lenis: Namaha (referência de saúde do brief) também não usa, e um site de
// saúde não deve brigar com o polegar. ScrollTrigger lê o scroll nativo; este módulo só publica
// a posição para o cabeçalho (sair ao descer, voltar ao subir).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type ScrollState = { y: number };
const state: ScrollState = { y: 0 };
const listeners = new Set<(s: ScrollState) => void>();
let bound = false;

function tick() {
  state.y = scrollY;
  listeners.forEach((fn) => {
    fn(state);
  });
}

export function initScroll() {
  if (bound) return;
  bound = true;
  addEventListener('scroll', tick, { passive: true });
  tick();
}

export const onScroll = (fn: (s: ScrollState) => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export function resetScroll() {
  scrollTo(0, 0);
  state.y = 0;
  tick();
}

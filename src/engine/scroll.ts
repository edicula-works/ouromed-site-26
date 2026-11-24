// Scroll nativo, sem Lenis: Namaha (referência de saúde do brief) também não usa, e um site de
// saúde não deve brigar com o polegar. ScrollTrigger lê o scroll nativo; este módulo só publica
// posição, velocidade e progresso para quem pede (espinha, header, ambulância do hero).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './env';

gsap.registerPlugin(ScrollTrigger);

export type ScrollState = { y: number; velocity: number; progress: number };
const state: ScrollState = { y: 0, velocity: 0, progress: 0 };
const listeners = new Set<(s: ScrollState) => void>();
let bound = false;

function tick() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const y = scrollY;
  state.velocity = y - state.y;
  state.y = y;
  state.progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
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
export const scrollState = () => state;

export function resetScroll() {
  scrollTo(0, 0);
  state.y = 0;
  state.velocity = 0;
  tick();
}

export function scrollToTarget(target: string | HTMLElement | number) {
  const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';
  if (typeof target === 'number') scrollTo({ top: target, behavior });
  else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior, block: 'start' });
  }
}

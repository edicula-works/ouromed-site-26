// Transições de página. O adaptador roda leave() enquanto a próxima página carrega.
// A cortina é de tinta com uma linha ouro na borda que lidera: o padrão desenha a página.
import { gsap } from 'gsap';
import { ease, prefersReducedMotion } from './env';

export type Transition = {
  leave: (curtain: HTMLElement) => Promise<unknown> | gsap.core.Animation;
  enter: (curtain: HTMLElement) => Promise<unknown> | gsap.core.Animation;
};

let current: Transition = {
  leave: (c) =>
    gsap
      .timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(
        c.querySelector('.curtain__panel'),
        { yPercent: 100 },
        { yPercent: 0, duration: 0.7, ease: ease.inOut },
      ),
  enter: (c) =>
    gsap
      .timeline()
      .to(c.querySelector('.curtain__panel'), { yPercent: -100, duration: 0.8, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
};

const reduced: Transition = {
  leave: (c) => gsap.timeline().set(c, { autoAlpha: 1 }).fromTo(c, { opacity: 0 }, { opacity: 1, duration: 0.2 }),
  enter: (c) => gsap.to(c, { autoAlpha: 0, duration: 0.2 }),
};

export const setTransition = (t: Transition) => {
  current = t;
};
const pick = () => (prefersReducedMotion() ? reduced : current);
const curtain = () => document.getElementById('curtain') as HTMLElement;

export const playLeave = () => Promise.resolve(pick().leave(curtain()));
export const playEnter = () => Promise.resolve(pick().enter(curtain()));

// Motion global do site: roda uma vez no cliente, antes da primeira página. Só toca o DOM aqui
// dentro (módulos 'use client' também rodam no servidor).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobile, isTouch, onPage, onScroll, prefersReducedMotion } from '@/engine';

gsap.registerPlugin(ScrollTrigger);

export function setupMotion() {
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  spine();
  header();
  howItWorks();
  drive();
  serviceRows();
}

/** Índice de serviços: ao passar o ponteiro (ou focar), a viatura da linha anda: rodas giram. */
function serviceRows() {
  onPage(() => {
    if (isTouch()) return;
    const offs: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>('.svc__link').forEach((link) => {
      const wheels = link.querySelectorAll('[data-wheel]');
      if (!wheels.length) return;
      let spin: gsap.core.Tween | null = null;
      const start = () => {
        spin = gsap.to(wheels, {
          rotate: '+=360',
          duration: 1.2,
          ease: 'none',
          repeat: -1,
          overwrite: true,
          transformOrigin: '50% 50%',
        });
      };
      const stop = () => {
        spin?.kill();
        spin = null;
      };
      link.addEventListener('pointerenter', start);
      link.addEventListener('pointerleave', stop);
      link.addEventListener('focusin', start);
      link.addEventListener('focusout', stop);
      offs.push(() => {
        stop();
        link.removeEventListener('pointerenter', start);
        link.removeEventListener('pointerleave', stop);
        link.removeEventListener('focusin', start);
        link.removeEventListener('focusout', stop);
      });
    });
    return () =>
      offs.forEach((f) => {
        f();
      });
  });
}

/** A espinha: a linha ouro desenha-se do topo até perto da borda de baixo, conforme o scroll. */
function spine() {
  if (prefersReducedMotion()) return;
  let spine: HTMLElement | null = null;
  let draw: HTMLElement | null = null;
  let tip: HTMLElement | null = null;
  let total = 0;

  const update = () => {
    if (!spine || !draw || !tip || total === 0) return;
    const top = spine.getBoundingClientRect().top;
    const drawn = Math.min(total, Math.max(0, -top + innerHeight * 0.84));
    draw.style.scale = `1 ${drawn / total}`;
    tip.style.translate = `0 ${drawn}px`;
  };
  const off = onScroll(update);
  onPage(() => {
    spine = document.querySelector('[data-spine]');
    draw = spine?.querySelector('[data-spine-draw]') ?? null;
    tip = spine?.querySelector('[data-spine-tip]') ?? null;
    total = spine?.offsetHeight ?? 0;
    update();
    return () => {
      spine = draw = tip = null;
      total = 0;
    };
  });
  return off;
}

/** No celular, o header sai de cena ao descer e volta ao subir. A barra de CTA fica. Em qualquer
 *  tamanho, o header ganha fundo e fio depois da primeira rolagem (a espinha passa por baixo). */
function header() {
  let last = 0;
  onScroll(({ y }) => {
    const root = document.documentElement;
    root.classList.toggle('is-scrolled', y > 8);
    if (Math.abs(y - last) < 6) return;
    if (!root.classList.contains('menu-open'))
      root.classList.toggle('header-away', isMobile() && y > 140 && y > last);
    last = y;
  });
}

/** "Como funciona": cada passo, ao passar do meio da tela, muda o estado do palco sticky. */
function howItWorks() {
  onPage(() => {
    const stage = document.querySelector<HTMLElement>('[data-stage]');
    const chapters = gsap.utils.toArray<HTMLElement>('[data-chapter]');
    if (!stage || !chapters.length || prefersReducedMotion()) return;
    const triggers = chapters.map((ch, i) =>
      ScrollTrigger.create({
        trigger: ch,
        start: 'top 58%',
        end: 'bottom 58%',
        onToggle: (self) => {
          if (self.isActive) {
            stage.setAttribute('data-state', String(i));
            chapters.forEach((c, j) => {
              c.setAttribute('aria-current', j === i ? 'step' : 'false');
            });
          }
        },
      }),
    );
    return () =>
      triggers.forEach((t) => {
        t.kill();
      });
  });
}

/** A ambulância do hero anda: rodas e tracejado da via em loop lento no repouso, mais rápido com
 *  a velocidade do scroll. Pausado fora da tela e em prefers-reduced-motion. */
function drive() {
  if (prefersReducedMotion()) return;
  onPage(() => {
    const hero = document.querySelector<HTMLElement>('[data-drive]');
    if (!hero) return;
    const wheels = hero.querySelectorAll('[data-wheel]');
    const dashes = hero.querySelectorAll('[data-dash]');
    const spins = gsap.to(wheels, {
      rotate: 360,
      duration: 9,
      ease: 'none',
      repeat: -1,
      transformOrigin: '50% 50%',
    });
    const road = dashes.length
      ? gsap.to(dashes, {
          strokeDashoffset: -38,
          duration: 1.4,
          ease: 'none',
          repeat: -1,
        })
      : null;
    const off = onScroll(({ velocity }) => {
      const k = 1 + Math.min(Math.abs(velocity) / 5, 7);
      gsap.to([spins, road], { timeScale: k, duration: 0.5, overwrite: true });
    });
    const vis = ScrollTrigger.create({
      trigger: hero,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (s) => {
        if (s.isActive) {
          spins.play();
          road?.play();
        } else {
          spins.pause();
          road?.pause();
        }
      },
    });
    return () => {
      off();
      vis.kill();
    };
  });
}

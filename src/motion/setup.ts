// Motion global do site: roda uma vez no cliente, antes da primeira página. Só toca o DOM aqui
// dentro (módulos 'use client' também rodam no servidor).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ease,
  isMobile,
  isTouch,
  onPage,
  onScroll,
  prefersReducedMotion,
  setTransition,
} from '@/engine';

gsap.registerPlugin(ScrollTrigger);

export function setupMotion() {
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  curtain();
  spine();
  header();
  howItWorks();
  drive();
  serviceRows();
  readings();
  factsWipe();
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

/** Continuidade na troca de rota: a linha termina de se desenhar (chega ao número do rodapé)
 *  enquanto a cortina de tinta sobe com o fio ouro na borda. A linha entrega a página à linha. */
function curtain() {
  setTransition({
    leave: (c) => {
      const draw = document.querySelector<HTMLElement>('[data-spine-draw]');
      const tip = document.querySelector<HTMLElement>('[data-spine-tip]');
      const spine = document.querySelector<HTMLElement>('[data-spine]');
      if (draw && tip && spine && !prefersReducedMotion()) {
        const m = /1 ([\d.]+)/.exec(draw.style.scale);
        const from = m ? Number(m[1]) : 1;
        const total = spine.offsetHeight;
        const st = { k: from };
        gsap.to(st, {
          k: 1,
          duration: 0.6,
          ease: ease.inOut,
          onUpdate: () => {
            draw.style.scale = `1 ${st.k}`;
            tip.style.translate = `0 ${st.k * total}px`;
          },
        });
      }
      return gsap
        .timeline()
        .set(c, { autoAlpha: 1 })
        .set(c.querySelector('.curtain__label'), { autoAlpha: 1 })
        .fromTo(
          c.querySelector('.curtain__panel'),
          { yPercent: 100 },
          { yPercent: 0, duration: 0.55, ease: ease.inOut },
        );
    },
    enter: (c) => {
      const label = c.querySelector<HTMLElement>('[data-curtain-label]');
      return gsap
        .timeline()
        .to(c.querySelector('.curtain__label'), { autoAlpha: 0, duration: 0.3 })
        .to(
          c.querySelector('.curtain__panel'),
          { yPercent: -100, duration: 0.8, ease: ease.inOut },
          '<0.1',
        )
        .set(c, { autoAlpha: 0 })
        .set(label, { autoAlpha: 1, textContent: '' });
    },
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

/** "Como funciona": cada passo, ao passar do meio da tela, muda o estado do palco pinado e a
 *  ambulância anda até a estação seguinte, com as rodas girando e a linha se desenhando à frente. */
function howItWorks() {
  onPage(() => {
    const stage = document.querySelector<HTMLElement>('[data-stage]');
    const chapters = gsap.utils.toArray<HTMLElement>('[data-chapter]');
    if (!stage || !chapters.length || prefersReducedMotion()) return;
    const scene = stage.querySelector<HTMLElement>('.how__scene');
    const van = stage.querySelector<HTMLElement>('[data-van]');
    const draw = stage.querySelector<HTMLElement>('[data-road-draw]');
    const wheels = van?.querySelectorAll('[data-wheel]');
    const drive = (i: number) => {
      if (!scene || !van || !draw) return;
      const w = scene.offsetWidth;
      const vw = van.offsetWidth;
      const x = (i / (chapters.length - 1)) * (w - vw);
      gsap.to(van, { x, duration: 1.1, ease: ease.inOut, overwrite: true });
      gsap.to(draw, {
        scaleX: Math.min(1, (x + vw * 0.42) / w),
        duration: 1.1,
        ease: ease.inOut,
        overwrite: true,
      });
      if (wheels?.length) {
        gsap.fromTo(
          wheels,
          { rotate: 0 },
          { rotate: 200, duration: 1.1, ease: 'none', transformOrigin: '50% 50%', overwrite: true },
        );
      }
    };
    drive(0);
    const triggers = chapters.map((ch, i) =>
      ScrollTrigger.create({
        trigger: ch,
        start: 'top 58%',
        end: 'bottom 58%',
        onToggle: (self) => {
          if (!self.isActive) return;
          stage.setAttribute('data-state', String(i));
          chapters.forEach((c, j) => {
            c.setAttribute('aria-current', j === i ? 'step' : 'false');
          });
          drive(i);
        },
      }),
    );
    const ro = new ResizeObserver(() => {
      const i = Number(stage.dataset.state || 0);
      const w = scene?.offsetWidth ?? 0;
      if (van && w) gsap.set(van, { x: (i / (chapters.length - 1)) * (w - van.offsetWidth) });
    });
    if (scene) ro.observe(scene);
    return () => {
      triggers.forEach((t) => {
        t.kill();
      });
      ro.disconnect();
    };
  });
}

/** As leituras em mono acendem quando a ponta da espinha passa por elas (a ponta vai a 84% da tela). */
function readings() {
  if (prefersReducedMotion()) return;
  onPage(() => {
    const els = gsap.utils.toArray<HTMLElement>('.sec__read.to-spine');
    const triggers = els.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 84%',
        once: true,
        onEnter: () => el.classList.add('is-lit'),
      }),
    );
    return () =>
      triggers.forEach((t) => {
        t.kill();
      });
  });
}

/** A banda de cobertura entra como uma cortina de tinta que desce, com as leituras dentro dela. */
function factsWipe() {
  onPage(() => {
    const band = document.querySelector<HTMLElement>('[data-facts]');
    if (!band || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      band,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2,
        ease: ease.inOut,
        scrollTrigger: { trigger: band, start: 'top 85%', once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
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

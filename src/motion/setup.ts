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
  intro();
  curtain();
  spine();
  header();
  howItWorks();
  buttonFill();
  readings();
  factsWipe();
  videos();
}

/** Intro da marca na primeira visita da sessão. A animação é CSS (começa antes do JS); aqui só
 *  se pula com clique ou tecla e se tira a classe quando a cortina termina de subir, liberando a
 *  entrada do hero. */
function intro() {
  const root = document.documentElement;
  const el = document.getElementById('intro');
  if (!el || !root.classList.contains('intro-on')) return;
  const end = () => {
    root.classList.remove('intro-on');
    removeEventListener('pointerdown', end);
    removeEventListener('keydown', end);
  };
  el.addEventListener('animationend', (e) => {
    if (e.target === el) end();
  });
  addEventListener('pointerdown', end, { once: true });
  addEventListener('keydown', end, { once: true });
}

/** Botões: o preenchimento nasce do ponto por onde o ponteiro entra e sai por onde ele sai. */
function buttonFill() {
  if (isTouch()) return;
  const at = (e: PointerEvent) => {
    const b = (e.target as Element | null)?.closest?.<HTMLElement>('.btn');
    if (!b) return;
    const r = b.getBoundingClientRect();
    b.style.setProperty('--fx', `${e.clientX - r.left}px`);
    b.style.setProperty('--fy', `${e.clientY - r.top}px`);
  };
  document.addEventListener('pointerover', at, { passive: true });
  document.addEventListener('pointerout', at, { passive: true });
}

/** Vídeos em loop param para quem pediu menos movimento (fica o pôster). */
function videos() {
  onPage(() => {
    if (!prefersReducedMotion()) return;
    document.querySelectorAll<HTMLVideoElement>('video[data-media-video]').forEach((v) => {
      v.removeAttribute('autoplay');
      v.pause();
    });
    return undefined;
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

/** "Como funciona": cada passo, ao passar do meio da tela, troca a foto do palco fixo e avança a
 *  linha ouro (o CSS faz a troca a partir de data-state). */
function howItWorks() {
  onPage(() => {
    const stage = document.querySelector<HTMLElement>('[data-stage]');
    const chapters = gsap.utils.toArray<HTMLElement>('[data-chapter]');
    if (!stage || !chapters.length) return;
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
        },
      }),
    );
    return () => {
      triggers.forEach((t) => {
        t.kill();
      });
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

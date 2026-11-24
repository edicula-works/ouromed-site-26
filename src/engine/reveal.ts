// Motion declarativa por data-attributes (abaixo da dobra; o hero entra por keyframes CSS para o
// LCP ser texto HTML real, sem depender de hidratação):
//   data-split="lines|words|chars"   revelação de texto com máscara (SplitText)
//   data-reveal="up|fade|clip"       revelação de bloco
//   data-intro                       toca na entrada da página em vez de no scroll
//   data-delay="0.2"                 atraso extra (segundos)
//   data-parallax="0.15"             deriva vertical ligada ao scroll (fração da altura do elemento)
// Tudo é pulado em prefers-reduced-motion; o CSS mantém o conteúdo visível sem JS.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ease, prefersReducedMotion } from './env';

gsap.registerPlugin(ScrollTrigger, SplitText);

const durations = { lines: 1.1, words: 1.0, chars: 0.9 } as const;
const staggers = { lines: 0.08, words: 0.035, chars: 0.018 } as const;

function splitTween(el: HTMLElement, isIntro: boolean) {
  const type = (el.dataset.split || 'lines') as keyof typeof durations;
  const delay = parseFloat(el.dataset.delay || '0');
  const s = {
    tween: undefined as gsap.core.Tween | undefined,
    done: false,
    requested: false,
  };
  SplitText.create(el, {
    type: type === 'lines' ? 'lines' : `lines,${type}`,
    mask: 'lines',
    autoSplit: true,
    linesClass: 'split-line',
    onSplit(self) {
      gsap.set(el, { visibility: 'visible' });
      if (s.done) return;
      const targets = type === 'lines' ? self.lines : type === 'words' ? self.words : self.chars;
      s.tween = gsap.from(targets, {
        yPercent: 110,
        rotate: type === 'chars' ? 0 : 1.5,
        duration: durations[type],
        stagger: staggers[type],
        ease: ease.out,
        delay,
        paused: isIntro && !s.requested,
        onComplete: () => {
          s.done = true;
        },
        scrollTrigger: isIntro ? undefined : { trigger: el, start: 'top 88%', once: true },
      });
      return s.tween;
    },
  });
  return () => {
    s.requested = true;
    s.tween?.play();
  };
}

function blockTween(el: HTMLElement, paused: boolean) {
  const kind = el.dataset.reveal || 'up';
  const delay = parseFloat(el.dataset.delay || '0');
  const from: gsap.TweenVars =
    kind === 'fade'
      ? { autoAlpha: 0 }
      : kind === 'clip'
        ? { clipPath: 'inset(0% 100% 0% 0%)', autoAlpha: 1 }
        : { y: 32, autoAlpha: 0 };
  const to: gsap.TweenVars = kind === 'clip' ? { clipPath: 'inset(0% 0% 0% 0%)' } : {};
  gsap.set(el, { visibility: 'visible' });
  // Imagem que se revela: o conteúdo de dentro assenta de 1,06 para 1 junto com a máscara.
  const inner = kind === 'clip' ? el.querySelector<HTMLElement>('[data-reveal-scale]') : null;
  if (inner)
    gsap.fromTo(
      inner,
      { scale: 1.06 },
      {
        scale: 1,
        duration: 1.4,
        ease: ease.out,
        delay,
        paused,
        scrollTrigger: paused ? undefined : { trigger: el, start: 'top 90%', once: true },
      },
    );
  return gsap.fromTo(el, from, {
    ...to,
    y: 0,
    autoAlpha: 1,
    duration: kind === 'fade' ? 0.9 : 1.1,
    ease: ease.out,
    delay,
    paused,
    scrollTrigger: paused ? undefined : { trigger: el, start: 'top 90%', once: true },
  });
}

/** Liga todas as revelações dentro de `root`. Devolve a timeline de entrada (pausada). */
export function initReveals(root: ParentNode = document) {
  const intro = gsap.timeline({ paused: true });
  if (prefersReducedMotion()) return intro;

  root.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const isIntro = el.hasAttribute('data-intro');
    const play = splitTween(el, isIntro);
    if (isIntro) intro.add(play, 0);
  });
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    const isIntro = el.hasAttribute('data-intro');
    const t = blockTween(el, isIntro);
    if (isIntro) intro.add(() => t.play(), 0);
  });
  root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || '0.15');
    gsap.fromTo(
      el,
      { yPercent: -amount * 100 },
      {
        yPercent: amount * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });
  return intro;
}

// Motion global do site (rodada 7). Inventário em docs/CRITERIOS-DE-ACEITE.md §5 e
// docs/brief/PROPOSTA-R7.md:
//   1. intro que surge e dissolve (CSS; aqui só pular e encerrar)
//   2. título por máscara (data-split) e blocos que aparecem por transparência (data-reveal, motor)
//   3. zoom leve da foto do cartão no hover (CSS)
//   4. texturas com deriva lenta (data-parallax, motor; os desenhos do topo por CSS: deriva e
//      slideshow em crossfade)
//   5. menu e painéis abrindo por clip-path com itens em cascata (CSS)
//   6. topo que gruda e é coberto pela apresentação (acts) e um gesto por seção da home (scenes)
// Regra de desempenho: só transform, opacity e clip-path de elementos pequenos; nada de
// backdrop-filter, background-position ou cor animados. Prova: scripts/perf.mjs.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ease, onPage, onScroll, prefersReducedMotion, setTransition } from '@/engine';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function setupMotion() {
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  intro();
  fade();
  header();
  hashTarget();
  videos();
  acts();
  scenes();
  spy();
  rows();
}

/** Cenas da home (rodada 7, aprovadas pela pessoa; ajustadas em 25/11): um gesto por seção, nenhum
 *  repetido; uma coisa se move por vez; várias seções descansam. Só transform, opacity e clip-path (fps).
 *  - A Ouromed: a frase acende com a leitura (cor por palavra); os fatos ficam parados.
 *  - Para você: a foto em destaque cresce de um quadro no centro até a largura toda.
 *  - Para empresas: a seção segura e a rolagem leva os cartões para o lado (pin).
 *  - Quando chamar: os cartões entram com um deslocamento curto assim que a grade aparece; sem pin.
 *  - Suporte básico × UTI: tela dividida (a foto fica parada por CSS sticky); sem animação.
 *  - Depoimentos, perguntas: sem animação de rolagem (descanso). */
function scenes() {
  onPage(() => {
    const root = document.querySelector<HTMLElement>('.acts');
    if (!root || prefersReducedMotion()) return undefined;
    const splits: SplitText[] = [];

    // A leitura acende: a camada escura (aria-hidden) aparece por palavra, só em opacidade, sobre
    // o cinza AA de baixo. Animar a cor de cada palavra repintava o texto a cada quadro.
    const lit = root.querySelector('.lit__top');
    if (lit) {
      const sp = SplitText.create(lit, { type: 'words', wordsClass: 'lit__w', aria: 'none' });
      splits.push(sp);
      gsap.fromTo(
        sp.words,
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: { trigger: lit, start: 'top 85%', end: 'bottom 45%', scrub: true },
        },
      );
    }

    const feature = root.querySelector<HTMLElement>('[data-feature] .feature__media');
    if (feature) {
      // Escala (compositor) em vez de clip-path, que repintava a foto inteira a cada quadro.
      gsap.fromTo(
        feature,
        { scale: 0.6 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: feature, start: 'top 90%', end: 'center 55%', scrub: 0.5 },
        },
      );
    }

    // Momento em que a página segura (só no computador; no celular a faixa já desliza com o dedo):
    // - Para empresas: a seção fica parada e a rolagem leva os cartões para o lado, com a barra de
    //   progresso; termina com o último cartão alinhado à direita.
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const sec = root.querySelector<HTMLElement>('#para-empresas');
      const row = sec?.querySelector<HTMLElement>('[data-track]');
      if (sec && row) {
        row.classList.add('is-track');
        const dist = () => Math.max(0, row.scrollWidth - (row.parentElement?.clientWidth ?? 0));
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sec,
            start: 'center center',
            end: () => `+=${dist() * 1.3}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
        tl.to(row, { x: () => -dist(), ease: 'none' }, 0);
        const bar = sec.querySelector('.track__bar');
        if (bar) tl.fromTo(bar, { scaleX: 0.25 }, { scaleX: 1, ease: 'none' }, 0);
      }
      return () => row?.classList.remove('is-track');
    });

    // Quando chamar: os cartões entram assim que a grade aparece na base da tela, com um
    // deslocamento curto e cada um do seu lado (esquerda, baixo, direita). A seção não segura mais a
    // página: com o pin, o título ficava sozinho sobre um buraco até a rolagem trazer os cartões
    // (25/11). Em qualquer tamanho de tela; o cabeçalho da seção nunca se esconde.
    const whenGrid = root.querySelector<HTMLElement>('.when__grid');
    if (whenGrid) {
      const cartoes = [...whenGrid.querySelectorAll<HTMLElement>('.when__item')];
      const lado = [{ x: -24 }, { y: 24 }, { x: 24 }];
      const tl = gsap.timeline({
        scrollTrigger: { trigger: whenGrid, start: 'top 94%', once: true },
      });
      cartoes.forEach((el, i) => {
        tl.from(el, { ...lado[i % 3], autoAlpha: 0, duration: 0.7, ease: 'power3.out' }, i * 0.08);
      });
    }

    return () => {
      mm.revert();
      for (const sp of splits) sp.revert();
    };
  });
}

/** Saída do topo: o topo gruda (CSS) e a seção seguinte passa por cima; enquanto isso o título
 *  sobe e some antes e os desenhos de BH em traço descem devagar (assincronia). Uma vez só na
 *  página. */
function acts() {
  onPage(() => {
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    if (!hero || prefersReducedMotion()) return undefined;
    const st = { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 };
    gsap.to(hero.querySelector('[data-hero-content]'), {
      yPercent: -25,
      opacity: 0,
      ease: 'power1.in',
      scrollTrigger: st,
    });
    gsap.to(hero.querySelector('[data-layer="bh"]'), {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: st,
    });
    // Fora da tela, a luz, a deriva e o slideshow dos desenhos param.
    ScrollTrigger.create({
      trigger: hero.closest('.stage') ?? hero,
      start: 'top top',
      end: 'bottom top',
      onLeave: () => hero.classList.add('is-off'),
      onEnterBack: () => hero.classList.remove('is-off'),
    });
    return undefined;
  });
}

/** Índice das páginas de público: marca o serviço que está sendo lido e, no celular, rola a
 *  faixa de atalhos até ele. É orientação, não enfeite: roda também com menos movimento. */
function spy() {
  onPage(() => {
    const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-spy]')];
    if (!links.length) return undefined;
    const nav = links[0].closest<HTMLElement>('.svcs__nav');
    const mark = (slug: string) => {
      for (const a of links) {
        const on = a.dataset.spy === slug;
        if (on) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
        if (on && nav && nav.scrollWidth > nav.clientWidth)
          nav.scrollTo({ left: (a.parentElement?.offsetLeft ?? 0) - 16, behavior: 'smooth' });
      }
    };
    for (const a of links) {
      const el = document.getElementById(a.dataset.spy ?? '');
      if (!el) continue;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 45%',
        end: 'bottom 45%',
        onToggle: (self) => self.isActive && mark(a.dataset.spy ?? ''),
      });
    }
    mark(links[0].dataset.spy ?? '');
    return undefined;
  });
}

/** Sobre → PQO: a linha de cada item se traça da esquerda ao entrar na tela (só transform). */
function rows() {
  onPage(() => {
    if (prefersReducedMotion()) return undefined;
    for (const rule of document.querySelectorAll<HTMLElement>('.rows__rule')) {
      gsap.fromTo(
        rule,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: ease.out,
          scrollTrigger: { trigger: rule.parentElement, start: 'top 88%', once: true },
        },
      );
    }
    return undefined;
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

/** Cabeçalho sempre visível (25/11; antes saía ao descer): com fundo claro depois do topo. Na
 *  home ele fica transparente enquanto está sobre o topo escuro e só ganha o fundo claro quando a
 *  apresentação chega embaixo dele. */
function header() {
  onScroll(({ y }) => {
    const root = document.documentElement;
    const hero = document.querySelector<HTMLElement>('[data-hero]');
    const hdr = document.querySelector<HTMLElement>('.hdr');
    const solidAt = hero ? hero.offsetHeight - (hdr?.offsetHeight ?? 0) : 8;
    root.classList.toggle('is-scrolled', y > solidAt);
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

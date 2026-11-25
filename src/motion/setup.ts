// Motion global do site (rodada 6). Inventário fechado em docs/CRITERIOS-DE-ACEITE.md §5:
//   1. intro que surge e dissolve (CSS; aqui só pular e encerrar)
//   2. título por máscara (data-split, motor)
//   3. imagem que se revela e sai da escala 1,06 (data-reveal="clip", motor)
//   4. zoom leve da foto do cartão no hover (CSS)
//   5. textura de curvas de nível com deriva lenta (data-parallax, motor)
//   6. menu e painéis abrindo por clip-path com itens em cascata (CSS)
//   7. atos: na home, cada seção sobe e cobre a anterior, que escurece; no topo, as camadas do
//      desenho de BH andam em ritmos diferentes (pedido da pessoa, 24/11)
//   8. cenas: cada ato da home tem a própria coreografia (scenes()), nada de um efeito repetido
// Fora disso: só a troca de página em opacidade e o cabeçalho (vidro, sair e voltar).
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
}

/** Cenas da home: cada ato é pensado como unidade, com uma entrada própria.
 *  apresentação: a frase acende palavra por palavra conforme a leitura; os fatos chegam da direita.
 *  Para você: o cartão grande vem da esquerda, os pequenos da direita.
 *  Para empresas: a fileira de cartões desliza na horizontal com a rolagem.
 *  Tipos de ambulância: a foto do interior abre de cima para baixo; o kit cai item a item.
 *  Quando chamar: os três cartões chegam de lados diferentes, girando de leve até assentar.
 *  Depoimentos: o depoimento principal acende palavra por palavra; os outros vêm de lados opostos.
 *  Perguntas: as perguntas chegam da direita, uma a uma. */
function scenes() {
  onPage(() => {
    const root = document.querySelector<HTMLElement>('.acts');
    if (!root || prefersReducedMotion()) return undefined;
    const q = <T extends Element = HTMLElement>(sel: string) =>
      gsap.utils.toArray<T>(sel, root) as T[];
    const at = (el: Element | null, start = 'top 78%') =>
      el ? { trigger: el, start, once: true } : undefined;
    const splits: SplitText[] = [];
    const words = (el: Element | null) => {
      if (!el) return [];
      const sp = SplitText.create(el, { type: 'words' });
      splits.push(sp);
      return sp.words;
    };

    // Apresentação: leitura que acende (scrub) e fatos da direita.
    const about = root.querySelector('.about');
    const aboutText = root.querySelector('.about__text');
    gsap.fromTo(
      words(aboutText),
      { opacity: 0.18 },
      {
        opacity: 1,
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: { trigger: aboutText, start: 'top 85%', end: 'bottom 45%', scrub: true },
      },
    );
    gsap.from(q('.about .fact'), {
      x: 140,
      opacity: 0,
      duration: 1.1,
      stagger: 0.14,
      ease: ease.out,
      scrollTrigger: at(root.querySelector('.about .facts'), 'top 85%'),
    });
    gsap.from(q('.about .fact dd'), {
      fontStretch: '75%',
      duration: 1.4,
      stagger: 0.14,
      ease: ease.out,
      scrollTrigger: at(root.querySelector('.about .facts'), 'top 85%'),
    });
    void about;

    // Para você: grande da esquerda, pequenos da direita, título desliza em sentido oposto.
    const voce = root.querySelector('#para-voce');
    if (voce) {
      gsap.from(voce.querySelector('.sec__title'), {
        x: -120,
        opacity: 0,
        duration: 1.1,
        ease: ease.out,
        scrollTrigger: at(voce),
      });
      gsap.from(voce.querySelector('.sec__lede'), {
        x: 80,
        opacity: 0,
        duration: 1.1,
        ease: ease.out,
        scrollTrigger: at(voce),
      });
      const cards = gsap.utils.toArray<HTMLElement>('.card', voce);
      gsap.from(cards[0], {
        xPercent: -18,
        opacity: 0,
        duration: 1.3,
        ease: ease.out,
        scrollTrigger: at(cards[0], 'top 85%'),
      });
      gsap.from(cards.slice(1), {
        xPercent: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.16,
        ease: ease.out,
        scrollTrigger: at(cards[0], 'top 80%'),
      });
    }

    // Para empresas: a fileira desliza da direita para o lugar conforme a rolagem; os cartões
    // chegam em alturas diferentes.
    const emp = root.querySelector('#para-empresas');
    if (emp) {
      const grid = emp.querySelector('.cards__grid');
      gsap.fromTo(
        grid,
        { xPercent: 28 },
        {
          xPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: emp, start: 'top bottom', end: 'top 15%', scrub: 0.8 },
        },
      );
      gsap.from(gsap.utils.toArray<HTMLElement>('.card', emp), {
        y: (i: number) => [60, 140, 30, 110][i % 4],
        ease: 'none',
        scrollTrigger: { trigger: emp, start: 'top bottom', end: 'top 15%', scrub: 0.8 },
      });
      gsap.from(emp.querySelector('.sec__title'), {
        x: 120,
        opacity: 0,
        duration: 1.1,
        ease: ease.out,
        scrollTrigger: at(emp),
      });
    }

    // Tipos de ambulância: a foto abre de cima para baixo; colunas sobem; o kit cai item a item.
    const types = root.querySelector('.types');
    if (types) {
      const media = types.querySelector('.types__media');
      gsap.fromTo(
        media,
        { clipPath: 'inset(0% 0% 100% 0% round 8px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 8px)',
          duration: 1.4,
          ease: ease.inOut,
          scrollTrigger: at(media),
        },
      );
      gsap.from(q('.types .type'), {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.18,
        ease: ease.out,
        scrollTrigger: at(types.querySelector('.types__info')),
      });
      gsap.from(q('.types .kit__list li'), {
        y: -14,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: ease.soft,
        scrollTrigger: at(types.querySelector('.kit'), 'top 85%'),
      });
    }

    // Quando chamar: cada cartão de um lado, girando de leve até assentar.
    const when = q('.when__item');
    const from = [
      { x: -90, rotate: -4 },
      { y: 110, rotate: 0 },
      { x: 90, rotate: 4 },
    ];
    when.forEach((card, i) => {
      gsap.from(card, {
        ...from[i % 3],
        opacity: 0,
        duration: 1.2,
        delay: i * 0.1,
        ease: ease.out,
        scrollTrigger: at(root.querySelector('.when__grid')),
      });
    });

    // Depoimentos: o principal acende palavra por palavra; os outros vêm de lados opostos.
    const main = root.querySelector('.quote:first-child blockquote p');
    gsap.fromTo(
      words(main),
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: { trigger: main, start: 'top 80%', end: 'bottom 40%', scrub: true },
      },
    );
    q('.quote:not(:first-child)').forEach((el, i) => {
      gsap.from(el, {
        x: i % 2 ? 120 : -120,
        opacity: 0,
        duration: 1.2,
        ease: ease.out,
        scrollTrigger: at(el, 'top 88%'),
      });
    });

    // Perguntas: chegam da direita, uma a uma.
    gsap.from(q('.faq__item'), {
      x: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: ease.out,
      scrollTrigger: at(root.querySelector('.faq__list')),
    });

    return () => {
      for (const sp of splits) sp.revert();
    };
  });
}

/** Atos da home: cada seção sobe e cobre a anterior. Cada ato é `position: sticky` (classe
 *  `acts-on`) e gruda no ponto em que o fim dele encosta no fim da tela; o próximo, que vem
 *  depois no HTML, passa por cima, e o que ficou para trás escurece. No topo, durante a saída, o
 *  título sobe e some, a cidade sobe mais rápido e a serra ao fundo mais devagar.
 *  Só no desktop (≥ 768 px) e com movimento permitido; senão é uma página comum. */
function acts() {
  onPage(() => {
    const root = document.querySelector<HTMLElement>('.acts');
    if (!root || prefersReducedMotion()) return undefined;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px)', () => {
      const list = gsap.utils.toArray<HTMLElement>(':scope > section', root);
      const place = () => {
        for (const act of list) act.style.top = `${Math.min(0, innerHeight - act.offsetHeight)}px`;
      };
      root.classList.add('acts-on');
      place();
      ScrollTrigger.addEventListener('refreshInit', place);
      list.forEach((act, i) => {
        const next = list[i + 1];
        if (!next) return;
        gsap.fromTo(
          act,
          { '--dim': 0 },
          {
            '--dim': 0.5,
            ease: 'none',
            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
          },
        );
      });
      const hero = root.querySelector<HTMLElement>('[data-hero]');
      const next = list[1];
      if (hero && next) {
        const st = { trigger: next, start: 'top bottom', end: 'top top', scrub: 0.6 };
        gsap.to(hero.querySelector('[data-hero-content]'), {
          yPercent: -18,
          opacity: 0,
          scale: 0.96,
          ease: 'power1.in',
          scrollTrigger: st,
        });
        gsap.to(hero.querySelector('[data-layer="cidade"]'), {
          yPercent: -22,
          ease: 'none',
          scrollTrigger: st,
        });
        gsap.to(hero.querySelector('[data-layer="fundo"]'), {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: st,
        });
      }
      // Abrir uma pergunta do FAQ muda a altura: recalcula onde cada ato gruda.
      const refresh = () => ScrollTrigger.refresh();
      root.addEventListener('toggle', refresh, true);
      return () => {
        root.removeEventListener('toggle', refresh, true);
        ScrollTrigger.removeEventListener('refreshInit', place);
        root.classList.remove('acts-on');
        for (const act of list) act.style.top = '';
      };
    });
    return () => mm.revert();
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

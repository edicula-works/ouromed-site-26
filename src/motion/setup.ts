// Motion global do site (rodada 6). Inventário fechado em docs/CRITERIOS-DE-ACEITE.md §5:
//   1. intro que surge e dissolve (CSS; aqui só pular e encerrar)
//   2. título por máscara (data-split, motor)
//   3. imagem que se revela e sai da escala 1,06 (data-reveal="clip", motor)
//   4. zoom leve da foto do cartão no hover (CSS)
//   5. textura de curvas de nível com deriva lenta (data-parallax, motor)
//   6. menu e painéis abrindo por clip-path com itens em cascata (CSS)
//   7. saída do topo: título e cidade em ritmos diferentes da página
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

/** Cenas da home (rodada 7, aprovadas pela pessoa): um gesto por seção, nenhum repetido; uma coisa
 *  se move por vez; várias seções descansam. Só transform, opacity e clip-path (fps).
 *  - A Ouromed: a frase acende com a leitura (cor por palavra); os fatos ficam parados.
 *  - Para você: a foto em destaque cresce de um quadro no centro até a largura toda.
 *  - Para empresas: a fileira de serviços anda na horizontal com a rolagem.
 *  - Suporte básico × UTI: tela dividida (a foto fica parada por CSS sticky); sem animação.
 *  - Quando chamar, depoimentos, perguntas: sem animação de rolagem (descanso). */
function scenes() {
  onPage(() => {
    const root = document.querySelector<HTMLElement>('.acts');
    if (!root || prefersReducedMotion()) return undefined;
    const splits: SplitText[] = [];

    const aboutText = root.querySelector('.about__text');
    if (aboutText) {
      // aria: 'none': o leitor de tela lê o parágrafo inteiro, sem aria-label em <p>.
      const sp = SplitText.create(aboutText, { type: 'words', aria: 'none' });
      splits.push(sp);
      // A leitura acende por cor: o cinza de partida já tem contraste AA (6,9:1).
      gsap.fromTo(
        sp.words,
        { color: '#4f5b66' },
        {
          color: '#14202e',
          stagger: 0.04,
          ease: 'none',
          scrollTrigger: { trigger: aboutText, start: 'top 85%', end: 'bottom 45%', scrub: true },
        },
      );
    }

    const feature = root.querySelector<HTMLElement>('[data-feature] .feature__media');
    if (feature) {
      gsap.fromTo(
        feature,
        { clipPath: 'inset(16% 24% 16% 24% round 20px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          scrollTrigger: { trigger: feature, start: 'top 90%', end: 'center 55%', scrub: 0.5 },
        },
      );
    }

    // Só onde a fileira é fileira (4 colunas, ≥ 1024px); no celular os cartões empilham.
    const row = root.querySelector<HTMLElement>('#para-empresas [data-row]');
    if (row && matchMedia('(min-width: 1024px)').matches) {
      gsap.fromTo(
        row,
        { xPercent: 18 },
        {
          xPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
        },
      );
    }

    return () => {
      for (const sp of splits) sp.revert();
    };
  });
}

/** Saída do topo: o topo gruda (CSS) e a seção seguinte passa por cima; enquanto isso o título
 *  sobe e some antes e a cidade em traço desce devagar (assincronia). Uma vez só na página. */
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
    gsap.to(hero.querySelector('[data-layer="cidade"]'), {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: st,
    });
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

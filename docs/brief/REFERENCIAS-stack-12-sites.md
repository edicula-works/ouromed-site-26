# Mapa de stack e técnicas — 12 sites (refs.gallery)

Capturado em 2026-11-24 com `awwwards-mcp` 1.22.0: `analyze_stack` (HTML) → `analyze_bundle` (chunks JS) →
`get_motion_dna` (runtime headless) → grep de técnicas (`scripts/tecnicas.py`). Dados brutos em `raw/`.

**Limitações do método** — leia antes de confiar num número:
- Headless **sem interação**: contagens de ScrollTrigger em runtime só pegam o que registra no load (por isso
  `trig=0` em quase todos — o bundle mostra que há muito mais). GSAP module-scoped não aparece no registry;
  por isso "GSAP" abaixo é afirmado pela presença de `registerPlugin`/plugins, não pelo contador `gsap`.
- `analyze_bundle` tem cap de 40 chunks / 200 KB inline: `aspensearch` perdeu o script principal (three só
  aparece em runtime) e `lilguy.net` ficou **inconclusivo**.
- Contagens de grep são ocorrências, não "usos". Falsos positivos já removidos: "framer" casando com
  `FrameRoot`/`FrameRate` (scheduler do React) e "locomotive" casando com o crédito da agência Locomotive.

## Visão geral

| Site | Framework | CSS | GSAP | Outra animação | 3D / WebGL | Scroll | Áudio |
|---|---|---|---|---|---|---|---|
| raycorral.com | Webflow (+jQuery 3.5) | classes próprias | ST, SplitText, Flip, CustomEase, DrawSVG, Observer, ScrollSmoother | — | three.js + **curtains.js**, GLSL, VideoTexture | Lenis | — |
| olympic.no | **WordPress** | próprio | ST, SplitText, CustomEase | Swiper, Lottie, barba, **CSS view-timeline** | GLSL + postprocessing | Lenis | — |
| emotion-agency.com | Nuxt | Tailwind | ST, Flip, Observer, ScrollSmoother | — | three.js GLSL pesado, VideoTexture, postprocessing | Lenis | **howler** |
| brandonyasin.com | Nuxt | Tailwind | ST, Flip, Inertia, ScrollSmoother, Observer | — | — | Lenis | — |
| leoparpeix.com | estático (Vite) | próprio | ST, CustomEase, SplitText, Observer, ScrollSmoother | transições de página | three.js GLSL, postprocessing, VideoTexture | Lenis (sync c/ ST) | **howler** |
| aspensearch.com | Next.js | Tailwind | (não visto nos chunks) | **framer-motion**, dotLottie, Flip | three em runtime (chunks faltando) | Lenis | — |
| pensatori-irrazionali.com | Next.js | Tailwind | ST, SplitText, DrawSVG, ScrambleText, CustomEase | **framer-motion**, Swiper | three, **WebGPU real** (flags em mp4) | Lenis | — |
| butter.video | Next.js | próprio | ST, SplitType, SplitText, Flip, Observer, Inertia | — | **three + react-three-fiber**, GLSL, VideoTexture, build WebGPU, postprocessing | Lenis | — |
| lilguy.net | estático | — | — | CSS keyframes (cap 200) | WebGL (runtime) | ? | — |
| trionn.com | Next.js | Tailwind | ST, ScrollSmoother, SplitText, DrawSVG, Inertia, Observer | Swiper | three.js GLSL, VideoTexture | Lenis (sync c/ ST) | — |
| likova.space | estático | próprio (Bootstrap?) | — | **barba**, ASScroll, Splitting.js | three | **ASScroll** (pré-Lenis) | — |
| has.works | Webflow | próprio | — | **framer-motion** (código embutido), CSS keyframes (cap 200) | — | nativo? | — |

ST = ScrollTrigger.

## Padrões (o que os 12 têm em comum)

1. **Lenis + GSAP ScrollTrigger** é a base: Lenis em 9/12 (a exceção pré-Lenis é `likova` com ASScroll; Webflow
   `has.works` não usa), GSAP em 8/12. Os dois Next/Nuxt mais "clássicos" sincronizam `lenis.on('scroll',
   ScrollTrigger.update)` (`leoparpeix`, `trionn`).
2. **three.js com shader próprio** em 7/12 (`THREE.`/GLSL), quase sempre com **VideoTexture** (6/12) e
   **postprocessing** (5/12). `raycorral` usa curtains.js (planos WebGL sobre o DOM) em vez de three puro;
   `butter.video` é o único com react-three-fiber.
3. **Reveal de texto** com SplitText/SplitType + `yPercent` + `stagger` aparece em 9/12 — a técnica mais
   onipresente da lista, em qualquer framework.
4. **Flip** (transição de layout do GSAP) em 6/12; **CustomEase** em 6/12 — curvas próprias, não as padrão.
5. **Cursor customizado** (`cursor: none` / `mix-blend-mode`) em 7/12.
6. **Reveals com mask-image / clip-path** em 7/12 (`aspensearch`, `pensatori`, `butter`, `trionn`, `brandonyasin`,
   `emotion`, `raycorral`).
7. **Transição de página** em ~7/12: barba.js nos estáticos/WordPress (`likova`, `olympic`), transição de rota
   Nuxt/Next nos demais (`leoparpeix` é o mais pesado).
8. Webflow não significa "só CSS": `raycorral` é Webflow por fora e three + curtains + GSAP por dentro;
   `has.works` embute framer-motion. WordPress também não: `olympic.no` usa Lenis, GSAP, GLSL e **CSS
   scroll-driven animations nativas** (`view-timeline`), único da lista.
9. Durações medianas em runtime ficam entre **600 ms e 2 s** (exceções: `aspensearch` 6,9–12,8 s, animações
   longas de CSS; `raycorral` 600 ms mediana com p75 em 3 s para os scrubs). Easings mais vistos:
   `cubic-bezier(0.22, 1, …)` (ease-out-quint, o "Expo.out" do CSS) e `power4.inOut`.

## Por site

### raycorral.com — Webflow + three.js + curtains.js
- 32 chunks / 1,7 MB: jQuery 3.5.1 + runtime Webflow + código próprio.
- Movimento: GSAP com ScrollTrigger (4 triggers já no load, **todos com scrub**, `clamp(top center) → clamp(top top)`),
  SplitText, Flip, CustomEase, DrawSVG, Observer, ScrollSmoother (lib presente), Lenis. Mediana 600 ms, p75 3 s.
- 3D: three.js (622 ocorrências), curtains.js (60), GLSL (142), VideoTexture, lottie.
- CSS: cursor custom, sticky/pin. `analyze_stack` marcou "Tailwind" por prefixos `bg-*`; são classes próprias.

### olympic.no — WordPress com GLSL e view-timeline
- 10 chunks / 671 KB. Plugins GSAP: ScrollTrigger, SplitText, CustomEase (`registerPlugin(Lt,Hs)`).
- Outras: Swiper (57), Lottie (16), barba.js (8), GLSL (81) + postprocessing (10) — fundo WebGL.
- **Único com `css-view-timeline` em runtime (9)**: scroll-driven animations nativas ao lado do GSAP.
- Lenis + Swiper; mediana 1.200 ms; easing `cubic-bezier(0.22, 0.7…)`.

### emotion-agency.com — Nuxt + three.js + áudio
- 19 chunks / 2,0 MB. GSAP: Observer, Flip, ScrollSmoother, ScrollTrigger (29), CustomEase, SplitText.
- 3D: three.js (179) + GLSL (334, o mais pesado da lista em shaders), VideoTexture (16), postprocessing, ogl (1).
- **howler** (145): trilha/efeitos de áudio. Mediana 2 s; 3 CSS keyframes + 1 SMIL.

### brandonyasin.com — Nuxt, sem 3D, texto como protagonista
- 10 chunks / 547 KB. GSAP 3.15.1: ScrollTrigger (41), Flip, InertiaPlugin, Observer, ScrollSmoother, CustomEase.
- **`yPercent` (105) + `stagger` (45)**: reveals de linha (`from(i.lines,{yPercent:100…})`) em tudo; `clipPath`,
  `quickSetter` para o hover da lista (`.gsap-item-wrapper`), transições de rota (8).
- Lenis; sem three; mediana 1 s.

### leoparpeix.com — estático/Vite, three.js + howler (site feito pela **Locomotive**)
- 2 chunks / 1,4 MB (um bundle só). GSAP 3.14.1 com paths, CustomEase, ScrollTrigger, SplitText, Observer, ScrollSmoother.
- 3D: three.js (285) + GLSL (277), postprocessing (11), VideoTexture. `lenis→ScrollTrigger sync` (8).
- Transição de página (115, o maior da lista), **howler** (103). Lenis (129). Mediana 1 s.
- O bundle credita `agency: "@Locomotive"` — é a agência Locomotive (autores do Locomotive Scroll, hoje Darkroom/Lenis).

### aspensearch.com — Next.js + framer-motion + dotLottie (chunks incompletos)
- 40 chunks (cap) / 1,2 MB; **4 avisos**: 1 inline de 234 KB e 3 além do cap foram pulados — three só aparece em runtime.
- Visto: framer-motion (MotionValue/AnimatePresence), dotLottie (`SanityLottie` → CMS Sanity), Flip (3), Lenis,
  `mask-image` (43) e `clip-path` (40). Runtime: three + webgl, medianas **6,9 s / p75 12,8 s** (animações longas).

### pensatori-irrazionali.com — Next.js + WebGPU real
- 30 chunks / 1,9 MB. GSAP: ScrollTrigger (44), SplitText, DrawSVG, ScrambleText, CustomEase, Flip, Observer.
- **WebGPU**: `getContext("webgpu")`, `navigator.gpu.requestAdapter`, `flagsWebGPU` com mp4 — flags renderizadas
  como textura de vídeo via WebGPU, com fallback. Swiper (245), framer-motion (47), mask-image (44), cursor custom.
- Lenis; `get_motion_dna` não devolveu durações (censo vazio).

### butter.video — Next.js + react-three-fiber + VideoTexture
- 40 chunks (cap) / 3,8 MB, o maior. GSAP: ScrollTrigger, SplitType, SplitText, Flip, Observer, Inertia, CustomEase.
- 3D: three.js (147) + **react-three-fiber** (24), GLSL (206), VideoTexture (21), postprocessing, e o bundle inclui
  o **WebGPURenderer** do three (`three/webgpu`). Cursor custom, mask-image, clip-path.
- Lenis; 17 CSS keyframes; mediana 800 ms; easing `cubic-bezier(0, 0, 0…)` (linear, 17 usos).

### lilguy.net — inconclusivo
- 16 chunks / 162 KB; quase nada de JS capturado. Runtime: `render: webgl`, 200 CSS keyframes (cap), 300 ms.
- Vale re-rodar com `maxChunks: 100` ou inspecionar com `analyze_page_structure`/`record_site_motion`.

### trionn.com — Next.js + three.js + pin
- 30 chunks / 2,2 MB. GSAP: ScrollTrigger (82), ScrollSmoother (6), SplitText, DrawSVG, Inertia, Observer, CustomEase.
- 3D: three.js (558) + GLSL (109), VideoTexture. `sticky/pin` (24, o maior da lista), clip-path (27), `stagger` (70),
  `quickSetter` (10). Swiper. `lenis→ScrollTrigger sync` (3). Mediana 900 ms.

### likova.space — estático, stack pré-Lenis (2020-era)
- 6 chunks / 582 KB. Sem GSAP: **barba.js** (31) para transições, **ASScroll** (14) para smooth scroll,
  **Splitting.js** (13) para texto, Flip (7, via outro pacote?), three em runtime, clip-path (43).
- `bootstrap` marcado pelo detector por `btn-` — provavelmente falso positivo.

### has.works — Webflow + framer-motion embutido
- 16 chunks / 1,4 MB. Sem GSAP: **framer-motion** real (`MotionValue` 45, `data-framer-portal-id`, `framerAppearId`),
  CSS keyframes (cap 200 — o motor IX2 do Webflow), `IntersectionObserver` (18), mask-image (15), cursor custom.
- Runtime: `scrollModel: unknown`, mediana 750 ms.

## Awwwards (Design DNA)

O índice local cobre os ~31 sites mais recentes por tag de tecnologia (5.062 entradas), então **6 dos 12 não estão nele**
(`leoparpeix`, `aspensearch`, `lilguy`, `trionn`, `likova`, `has.works`). Textos completos em `raw/dna-*.md`.

| Site | Prêmio | Júri (D / U / C / C) | Paleta | Tags de tecnologia (Awwwards) |
|---|---|---|---|---|
| emotion-agency.com | **SOTD + Developer Award** (out/2026) | 7,56 (7,58 / 7,45 / 7,69 / 7,60) | `#9047FF` | GSAP, Three.js, Nuxt.js, Sound-Audio, Transitions, Typography |
| brandonyasin.com | **SOTD + Developer Award** (out/2026) | 7,31 (7,40 / 7,04 / 7,44 / 7,54) | `#505B44`, `#2C2922` | (sem tag de tech) — elementos: Clock & Colours, Editorial Menu, Preloader |
| pensatori-irrazionali.com | **SOTD + Developer Award** (set/2026) | 7,23 (7,20 / 7,19 / 7,33 / 7,31) | `#4C4C4C`, `#F5F5F5` | elementos: Universe, Loader, Transition |
| butter.video | **SOTD + Developer Award** (set/2026) | 7,50 (7,38 / 7,56 / 7,56 / 7,69) | `#1E1E1E`, `#F7F7F7` | elementos: Timeline, Navigation |
| raycorral.com | Honorable Mention (out/2026) | — | `#0C0C0C`, `#F8F7F2` | elementos: Artist-Led Homepage Experience |
| olympic.no (OLYMPIC SUBSEA) | Honorable Mention (out/2026) | — | `#F8F8F9`, `#1E2226` | HTML5, Parallax, WebGL — 3D vessel presentation, Magnetic CTA, Expand on scroll |

Nota: `emotion-agency` tem duas entradas — a de 2021 (`/en/`, HM, paleta rosa) é o site antigo.

Reparo: o júri do Awwwards pontua os SOTD desta lista entre **7,2 e 7,6**, e a dimensão mais baixa em 3 dos 4 é
**Usabilidade** — a mesma régua que a skill `/jury` usa (Design 40 / Usabilidade 30 / Criatividade 20 / Conteúdo 10).

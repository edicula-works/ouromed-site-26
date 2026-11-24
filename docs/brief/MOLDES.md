# Moldes aprofundados — butter.video (Edícula) e olympic.no (Ouromed)

Capturado em 2026-11-24 com `analyze_scroll_map`, `record_site_motion`, `export_design_tokens`,
`capture_component`, `analyze_hover_census`, `get_site_elements`. Brutos em `raw/pipeline.json`,
`raw/retry.json`, `raw/motion/<site>/` (webm + Motion Evidence Sheet). Ressalva do método: headless sem
interação real; triggers GSAP criados após o load não aparecem no censo.

## butter.video → molde para a Edícula (SOTD, júri 7,50 — Usabilidade 7,56, Conteúdo 7,69)

**Stack**: Next.js + react-three-fiber + GSAP (ScrollTrigger, SplitType/SplitText, Flip, Observer, Inertia,
CustomEase) + Lenis; 3,8 MB de JS (o maior da lista); bundle inclui o `WebGPURenderer` do three.

**Design tokens** (`export_design_tokens`): `#0f0f0f` `#1e1e1e` `#151515` `#2e2e2e` `#000` (escuros),
`#b6b6b6` `#808080` `#ebebeb` `#ededed` `#fafafa` (neutros), **um acento: `#00ffd0`** (menta). Fontes
**DieGrotesk** (principal, 165/185 amostras) + **ABCDiatype** (20). Escala: 13 / 13,49 / 16 / 18 / 60,4 /
107,6 px. **Um só peso (400)** em tudo. Line-height 1,5 (18/27, 16/24) e 1,2 (13,49/16,25); letter-spacing
`normal` e `0,7px`.

**Movimento no load** (`analyze_scroll_map`): 22 animações, **todas CSS keyframe** — os spans do SplitType
(reveal de texto) são animados por keyframes com **delay escalonado de 100 ms entre 18 irmãos** (`delay-delta`).
Zero ScrollTrigger registrados no load. Hover: **0 regras `:hover` no CSS** — a interação vive em JS/WebGL.
Runtime: 17 keyframes, mediana 800 ms, easing `cubic-bezier(0, 0, 0, …)` ×17 (linear: movimento contínuo/scrub,
 não "entradas"). cursor custom + `mix-blend-mode`, reveals por `mask-image`/`clip-path`, VideoTexture.

**Gravação** (37 s, página de 14.943 px ≈ 16,6 viewports): dwell → scroll → hover em y=10.800 → click →
hover → retorno. 6 keyframes, 5 máscaras de diff em `raw/motion/butter.video/`.

**Elementos no Awwwards (vídeos)**: Footer, Timeline, Home, Navigation —
`raw/pipeline.json` → `get_site_elements butter`.

### O que a Edícula pode pegar daqui
1. **Reveal de texto só com CSS**: spans + keyframes + delay escalonado. Barato, sem biblioteca, funciona
   com `prefers-reduced-motion`. (A Edícula já tem 57 keyframes — falta o stagger e a intenção.)
2. **Paleta = neutros + 1 acento**, uma família tipográfica com display própria (a Edícula já tem a
   fonte "edicula"), **um peso só**. Hoje a Edícula usa 11,5–15 px; butter usa 16/18 px de base.
3. **Vídeo como material dos cases** (VideoTexture/planos WebGL) — os reels da Edícula viram a cena.
4. **Transições por máscara** (`mask-image`/`clip-path`) entre seções/projetos.
5. Easing linear para o que é *scrub*; curvas próprias só para o que *entra*.

### O que não copiar
3,8 MB de JS é produto com login; site de estúdio deve ficar em <300 KB JS. Zero `:hover` em CSS só funciona
porque há um motor WebGL atrás — para a Edícula, hover em CSS + `transition` é mais honesto.

---

## olympic.no → molde para a Ouromed (Honorable Mention, out/2026) — institucional de frota

**Stack**: **WordPress** + Lenis + Swiper + GSAP (ScrollTrigger, SplitText, CustomEase) + Lottie + barba;
fundo em GLSL + postprocessing; **195 CSS keyframes + 5 `view-timeline` nativos** (CSS-first); 10 regras
`:hover`; mediana 1.200 ms; easing `cubic-bezier(0.22, 0.7…)` (ease-out). `networkidle` nunca chega
("Live fleet tracking" faz polling contínuo).

**Design tokens**: `#f8f8f9` (fundo) `#1e2226` (texto) **`#ff3c1e`** (vermelho de segurança marítima),
`#caccc4` `#bbbbbb` `#a5a7a8` `#626569` (neutros). **TT Commons Pro** + **TT Commons Pro Mono** (dados).
Escala 10 / 11,67 / 13,33 / 17,5 / 33,3 / 53,3 px; peso 450; header com 78 nós a 13,33 px — denso e calmo.

**Elementos no Awwwards (14 vídeos)**: Dropdown, Fleet grid – list view, 3D vessel presentation, Preloader,
Fleet presentation, Live fleet tracking, Loop carousel, Olympic Stories, Hover ×2, Board & Management,
Expand on scroll, **Magnetic CTA**, Dynamic slider. Página de 8.711 px ≈ 9,7 viewports.

### Transposição para a Ouromed (ambulância · atendimento domiciliar · remoção · eventos)

| Olympic (navios) | Ouromed (saúde móvel) | Observação |
|---|---|---|
| 3D vessel presentation | Apresentação interativa da **ambulância equipada** (UTI móvel, suporte básico, remoção) | é o "produto"; pode ser 3D leve ou fotos de 360° |
| Fleet presentation / Fleet grid – list view | **Tipos de serviço e viaturas** em grade ↔ lista | ambulatorial, domiciliar, remoção, eventos, UTI |
| Live fleet tracking | **Cobertura por região e tempo de resposta** | **nunca** posição/dados de pacientes em tempo real (LGPD) |
| Magnetic CTA | CTA fixo **"Ligar / Solicitar remoção"** (telefone é a conversão) | em saúde, CTA é ligar, não "ver demo" |
| Expand on scroll | Serviços que expandem no scroll | |
| Board & Management | **Equipe médica e credenciais** (CRM/COREN, ANVISA, licença sanitária, certificações) | confiança é o Conteúdo |
| Preloader | **curto (<1 s) ou nenhum** | ninguém em emergência espera loader |
| `#ff3c1e` vermelho | vermelho médico serve, com semântica: emergência ≠ seção | |
| TT Commons Pro + Mono | tipografia sóbria + mono para números (tempo de resposta, cidades atendidas) | |

**O que não copiar**: preloader, WebGL pesado no mobile, polling constante (custa dados e bateria),
3D de navio por 3D de ambulância se não houver asset de qualidade — foto boa ganha de 3D ruim.

**Stack sugerida para a Ouromed**: o que o olympic prova é que a stack não ganha prêmio — WordPress com
CSS-first chegou a HM. Para a Edícula manter: **Astro** (estático, rápido, SEO local) + Lenis + GSAP
ScrollTrigger só onde há scrub + CSS keyframes para o resto. Sem three.js na Ouromed.

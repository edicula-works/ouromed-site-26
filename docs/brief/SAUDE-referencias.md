# Referências de saúde no índice do Awwwards — para a Ouromed

Busca em 2026-11-24 no índice local (5.062 entradas = recentes por tag de tecnologia; não é o diretório
completo). Termos: health, healthcare, medical, clinic, hospital, care, emergency, dental, wellness, lab.
Capturas em `raw/capturas/saude/`; DNA em `raw/saude.json`.

## O padrão "saúde premiada" — e como difere dos sites de agência

| Dimensão | Agências (emotion, butter, trionn…) | Saúde (Namaha, Life Care, AXEL, Duyu) |
|---|---|---|
| Paleta | escuro + 1 acento neon | **quente e humana**: bege/areia/terracota (Namaha `#E0CEC3` `#A05941`), marrom (AXEL `#987654`), verde escuro (Duyu `#2F3834`). Azul clínico quase ausente |
| Imagem | vídeo, WebGL, texturas | **ilustração** (departamentos, ícones, rodapé ilustrado no Namaha); foto de gente real, não stock |
| Motion | Lenis + scrub + three.js | **calmo**: GSAP com `power4.ease` (Namaha, 27 triggers / 5 scrub / 1 pin), Lottie (Fifth Avenue), ou nada (Care Plus). Lenis aparece (Life Care), WebGL só em produto (Duyu, pílulas 3D) |
| Acessibilidade | cursor custom, `mix-blend` | **controles explícitos**: tradução, tamanho de texto, contraste, busca (Life Care) — requisito de saúde, não diferencial |
| Stack | Next/Nuxt + R3F | **WordPress + Tailwind** em 4 de 6; Namaha é estático. Ninguém precisou de three.js |
| Tom | "look at me" | **confiança e clareza**: credenciais, departamentos, "como funciona" (gematik: scrollytelling paciente-centrado) |

## Os sites

| Site | Prêmio | O que é | Stack detectada | Motion | O que roubar |
|---|---|---|---|---|---|
| **Namaha Healthcare** `namaha.healthcare` | **HM ago/2026** | hospital familiar, saúde da mulher | estático + Tailwind + GSAP (ScrollTrigger 27/5/1, `power4.ease` ×11) | 850 ms mediana, scroll nativo (sem Lenis) | paleta `#FFFBF6` / `#A05941` / `#C09C81`; **ilustração por departamento**; rodapé ilustrado; depoimentos em bloco terracota; 11 bandas em 10,4 k px |
| **Life Care** `lifecare.org.au` | — | home care de idosos (AU) | WordPress + Tailwind + Lenis | — | **barra de acessibilidade**: tradução, tamanho de texto, contraste, busca. Modelo direto para atendimento domiciliar |
| **AXEL Clinic** `axel.clinic` | HM out/2021 | clínica, "gerencie sua saúde" | WordPress | — | posicionamento claro ("easily and systematically"); paleta marrom sóbria |
| **Duyu Care** `duyu-care` (`duyucare.dops.agency`) | HM mai/2026 | produto de saúde (pílulas) | — | 3D, preloader, 404 game | **"Ingredients in Science"** (explicar o que tem) → transpor para "o que leva numa ambulância UTI"; "Appearance of Elements". Não: preloader, game no 404 |
| **Digital Health Journeys** `gematik.de` | — | microsite da agência nacional de saúde digital (DE) | — | — | **scrollytelling paciente-centrado** para explicar serviços → "como funciona uma remoção / um atendimento domiciliar", passo a passo |
| **Nicklaus Children's Hospital** | — | hospital infantil | (não carregou em 45 s) | — | tom "brilhante e compassivo"; **não** o peso: timeout no headless |
| Fifth Avenue Healthcare Services | — | *credentialing* (não é care) | WordPress + Tailwind + Lottie | — | Lottie para ícones animados |
| **Care Plus (Bupa)** `careplus.com.br` | — | operadora de saúde **brasileira** | estático, sem libs detectadas | — | referência de **português/tom institucional BR**; nada de motion — prova que o mercado BR está atrás |
| Raven Health, Healthx (HM 2021) | — | healthtech / software | — | — | não são prestador de serviço; ignorar para a Ouromed |

## Brief sugerido para a Ouromed (a partir do que os premiados fizeram)

**Posicionamento na tela**: "saúde móvel que chega" — a ambulância/unidade é a protagonista, como o navio no
olympic.no. Foto/360° de qualidade > 3D medíocre.

**Estrutura (11 bandas, ~10 k px como Namaha)**: hero com CTA telefônico fixo → serviços (ambulância UTI,
suporte básico, remoção, atendimento domiciliar, eventos) em ilustrações → "como funciona" em scrollytelling
(gematik) → cobertura e tempo de resposta por cidade (mapa estático, **sem** tracking de pacientes) →
equipe e credenciais (CRM/COREN, ANVISA, licença sanitária) → depoimentos em bloco de cor → rodapé ilustrado
com telefone grande.

**Visual**: fundo quente (`#FFFBF6`-`#F8F8F9`), 1 cor de marca, 1 cor de ação (vermelho só para
emergência). Ilustração própria dos serviços e da viatura; nenhuma foto de banco de imagens com gente de
jaleco sorrindo.

**Motion**: CSS-first (Namaha: sem Lenis, scroll nativo) + GSAP ScrollTrigger só para 3–5 reveals com
`power4.ease` ~850 ms; Lottie nos ícones; **zero** preloader, **zero** WebGL.

**Acessibilidade como requisito** (Life Care): tamanho de texto, contraste, `lang="pt-BR"`, alvos ≥ 44 px,
telefone em `tel:`, contraste ≥ 4,5:1 (AA) — o júri cobra, e saúde cobra mais ainda.

**Stack**: Astro (estático, rápido, SEO local "ambulância em BH") + Tailwind + GSAP; ou WordPress se o
cliente precisar editar. Namaha e Life Care mostram que as duas chegam.

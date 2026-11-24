# DESIGN — site da Ouromed

Registro das decisões de design (skill `/awwwards`, fases 0 a 2). O que está aqui deve ser
lido nas telas, não explicado: se o crítico do `/jury` não ler a ideia nas screenshots, o site
é que está errado.

## Fase 0: brief

- **Sujeito**: Ouromed, serviço móvel de saúde em Belo Horizonte. Ambulância (UTI móvel e
  suporte básico), atendimento domiciliar, remoção de pacientes, cobertura de eventos, locação de
  ambulâncias, área protegida e ambulatórios.
- **Público**: famílias em emergência ou com um idoso acamado (chegam pelo celular); empresas de
  home care; e quem decide segurança em mineradoras, obras, shoppings e eventos (orçamento).
- **Trabalho do site**: converter em ligação. Telefone e WhatsApp fixos em toda página.
- **Idioma**: português do Brasil. **Acervos**: nenhum (só a copy v1 e a pesquisa).
- **Restrições do AGENTS.md**: sem WebGL, sem preloader, sem cursor custom; acessibilidade como
  requisito de saúde; fato concreto no lugar de adjetivo; nunca inventar número, credencial,
  depoimento, cliente.

## Fase 1: conceito

Três candidatos, de territórios diferentes:

| | A. A linha do padrão ouro (nome + material) | B. A rota (material da profissão) | C. A central (metáfora de processo) |
|---|---|---|---|
| Ideia | O nome é ouro e a promessa é *padrão ouro*: a referência pela qual se mede. Uma linha dourada é a espinha de cada página: nasce no telefone, carrega os fatos como marcas de uma escala e termina no número do rodapé. | Todo serviço é um deslocamento. A página é a rota entre a ligação e o destino, com marcos de trecho. | A Central 24 h com triagem é o cérebro. Tudo passa pela ligação e a navegação é uma triagem. |
| Âncora | o posicionamento publicado pela própria Ouromed ("padrão ouro", ouro de Minas ↔ *gold standard*) e o vocabulário de calibração e norma que ela já usa (equipamentos calibrados, ABNT, Star of Life, COVE) | a natureza itinerante do serviço | a Central 24 h com triagem médica |
| Assinatura | "Como funciona" em scrollytelling: a linha se desenha nos 4 passos, do telefonema ao destino | um mapa que se desenha de BH para o Brasil | um seletor que encaminha para o serviço certo |
| Obj 1–5 | 4 | 3 | 3 |
| Ajuste 1–5 | 5 | 4 | 4 |
| Viável 1–5 | 4 | 3 (cidades e tempos não confirmados) | 4 |
| Portável (menor é melhor) | 3 | 4 (serve a qualquer logística) | 4 (serve a qualquer call center) |

**Escolha: A.** É a única que nasce do nome e do que a empresa já diz de si, e é a que sustenta o
conteúdo que o brief exige: fato como leitura de instrumento, não como adjetivo.

### Cartão do conceito

```
Idea:        Uma linha dourada percorre o site inteiro: começa no telefone, carrega os fatos
             como marcas de uma escala e termina no número do rodapé. O padrão ouro é a medida.
Metaphor:    régua e instrumento calibrado (a referência pela qual o resto é medido)
Signature:   "Como funciona" em scrollytelling: a linha se desenha do telefonema ao destino
             (receita "Pinned chapters" com palco sticky + desenho da linha)
Emotion:     calmo, sólido, "está tudo sob controle"; urgência só onde é urgência
Motion verb: traçar: a linha se desenha, o conteúdo entra no ritmo da linha, a ambulância anda na linha
Screenshot:  hero com o título grande, a ambulância sobre a linha e o telefone em ouro
```

**Teste de genericidade.** Um modelo genérico faria: creme + serifas + terracota, três cartões de
serviço com ícone, hero com gradiente. Aqui: papel osso + tinta quente + uma cor de marca (ouro) usada
só como linha, preenchimento e leitura; grotesca quente com mono para leituras; ilustração técnica
própria (traço de tinta, preenchimentos chapados); título nunca em ouro sobre papel (contraste).

**O que a linha faz (regra que gera decisões):**
1. É o indicador de progresso: desenha-se até perto da borda de baixo conforme se rola.
2. É a régua: cada seção pendura nela por uma marca; leituras em mono alinhadas à direita contra ela.
3. Em "Como funciona", é o caminho do cuidado (passos pendurados em marcas).
4. No rodapé, termina no número grande: o fim da linha é a ação.
5. Na 404, a linha para num beco: "Essa página não está aqui."
6. Na transição de página, uma linha ouro lidera a borda da cortina de tinta.

## Fase 2: sistema de direção de arte

### Paleta (por papel)

| Papel | Hex | Uso |
|---|---|---|
| `paper` | `#F5F0E8` | fundo |
| `bone` | `#E9E1D3` | superfície secundária, preenchimento de ilustração |
| `ink` | `#1E1B17` | texto, cortina, fundo do rodapé e das bandas escuras |
| `muted` | `#6A6258` | texto secundário (5,3:1 sobre papel) |
| `line` | `rgb(30 27 23 / 0.14)` | fios |
| `gold` | `#D4AD2A` | ouro do logotipo: a linha, preenchimento do CTA, leitura grande sobre o azul-noite (7,6:1). Nunca texto pequeno sobre papel (2,1:1) |
| `gold-deep` | `#B48F17` | estado hover do ouro |
| `navy` | `#034487` | azul-marinho do logotipo ("med"): títulos h1/h2 (8,6:1 sobre papel) e o "med" da marca |
| `night` | `#0B2545` | superfície escura: banda de cobertura, depoimentos, menu, rodapé, cortina |
| `steel` | `#4F5B66` | vidros e equipamentos na ilustração; texto alternativo (6,3:1) |
| `red` | `#B3261E` | só emergência (192, faixa de urgência) |
| `white` | `#FFFDF9` | carroceria das viaturas |

Duas cores de marca, as do logotipo (ouro e azul-marinho), e uma de ação (vermelho, com semântica
de emergência). A tinta é só texto corrido; superfícies escuras são azul-noite. (Revisão de
24/11/2026: o logotipo da Ouromed é ouro + azul-marinho; o papel quente continua.)

### Tipo

| Papel | Fonte | Fonte |
|---|---|---|
| display e texto | **Schibsted Grotesk** (400 a 900) | Google Fonts, `next/font/google` |
| leituras (telefone, horas, siglas, anos) | **IBM Plex Mono** (400, 500) | Google Fonts |

Escala fluida: mega `clamp(3.25rem, 1.5rem + 8.5vw, 9.5rem)` (hero) · xl `clamp(2.25rem, 1.4rem + 3.4vw, 4.75rem)`
(seções) · l `clamp(1.625rem, 1.25rem + 1.3vw, 2.5rem)` · m `clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem)` ·
corpo `clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)` (17 a 19 px, entrelinha 1,5) · s 0.9375rem · xs 0.8125rem.
Display com tracking -0.03em (mega) e -0.02em (xl), entrelinha 0,98 (o português tem muitos descendentes).
Mono em caixa de frase, tracking +0.02em, dígitos tabulares.

### Grid

12 colunas, gutters `clamp(1.25rem, 0.8rem + 1.6vw, 2.5rem)`. Duas linhas verticais fortes: a
esquerda (início do conteúdo) e a **espinha** (à direita, no meio do gutter). Títulos pendurados na
espinha por uma marca. Ritmo variado por seção: justo (6u), normal (14u), arejado (24u), tela cheia.

### Forma e motion

Raio 0 (tudo reto, como instrumento), exceto a pílula dos botões (raio total) que contrasta com o resto.
Um easing: `expo.out` para entradas, `expo.inOut` para cortinas. Durções: hover 0,35 s, linha 1,1 s,
cortina 0,8 s. Stagger 60 ms.

Tratamentos por papel (um por papel):
- **CTA primário** (Ligar): pílula ouro; no hover o rótulo rola e a pílula escurece; `:active` afunda 0,97.
- **Links de serviço** (linhas do índice): a ilustração da linha anima (rodas giram) e a seta anda.
- **Navegação**: sublinhado que se desenha; item atual marcado.
- **Links inline**: sublinhado em repouso que engrossa.
- **Utilitários** (rodapé, pequenos): só cor.

### Composição por seção (home)

```
[Ouromed]                        Serviços ▾  Sobre  Contato      (Ligar (31) 3786-1506) |
                                                                                     |
Padrão ouro                                                                          |
em saúde móvel.                                              [ambulância UTI]       |
                                                      ───────────────────────────────     |
Ambulância UTI, atendimento domiciliar, remoção de pacientes e cobertura de eventos,            |
em Belo Horizonte e em todo o Brasil. Central 24 h com triagem médica.                           |
[(Ligar (31) 3786-1506)] [WhatsApp]  Solicitar orçamento →                                       |
Fundada por médicos de urgência · Motoristas com COVE · Todo o Brasil mediante agendamento        |
------------------------------------------------------------------------------------------- |
O que a Ouromed faz                                                (2 col: índice)        |
 01 Ambulância e UTI móvel   Suporte básico e UTI móvel com médico…   [ilustração] →            |
 … 7 linhas                                                                                |
------------------------------------------------------------------------------------------- |
Como funciona, do telefonema ao destino       [palco sticky: linha + 4 cenas] | passos 1 a 4    |
------------------------------------------------------------------------------------------- |
Belo Horizonte hoje, o Brasil quando você precisar      (banda escura: leituras grandes)       |
------------------------------------------------------------------------------------------- |
Segurança começa antes do atendimento           (fatos à esquerda, leituras mono à direita)   |
------------------------------------------------------------------------------------------- |
Quem já contou com a Ouromed                    (depoimentos em bloco tinta + eventos/ano)    |
------------------------------------------------------------------------------------------- |
Precisa falar com a Ouromed?                                            [CTA]              |
Perguntas frequentes                                                          (details)       |
==================================================== rodapé (tinta) ====================== |
(número grande em ouro, encostado na espinha)  endereço · e-mails · navegação · 192           |
```

### Ilustração

Traço de tinta (3 px em viewBox 400), preenchimentos chapados de `white`, `bone`, `gold` e `steel`,
cantos levemente arredondados, sem gradiente e sem sombra. As viaturas são o produto: perfil lateral,
de frente para a direita (para a espinha), rodas com raios para girarem. No repouso, a ambulância do
hero segue em movimento: rodas lentas e tracejado da via passando (pausado em `prefers-reduced-motion`).

### Estados

- Sem JS: tudo visível; o hero entra por keyframes CSS (o LCP é texto HTML real).
- `prefers-reduced-motion`: sem Lenis (já não há), sem desenho de linha (linha inteira), palco do
  "como funciona" vira o diagrama estático das 4 cenas, sem rodas girando, cortina em fade curto.
- Celular (390): título re-afinado, índice com ilustração inline, palco sticky no topo com passos
  abaixo, barra fixa de CTA (Ligar / WhatsApp) na base, sem overflow.

### Genericidade: o que mudou após o teste

- Paleta: sem terracota nem creme puro; papel osso com tinta quente, e o ouro só como linha/preenchimento.
- Tipo: sem serifa editorial; grotesca quente + mono de leitura.
- Serviços: sem três cartões iguais; índice de linhas com ilustração.
- Sem *eyebrow* em caixa alta antes de cada título; o que era rótulo virou leitura em mono com informação real.

## Decisões da construção (fase 3)

- **Quieto em repouso, por decisão.** O estado de repouso do conceito é o do hero da home: a
  ambulância com rodas lentas e o tracejado da via passando (`data-drive`), mais rápido com a
  velocidade do scroll, pausado fora da tela e em `prefers-reduced-motion`. As páginas internas
  cuja ilustração tem rodas (ambulância, remoção, locação) herdam o mesmo movimento; as demais
  (casa, tenda, prédio, ambulatório, telefone, headset) ficam paradas em repouso, com a via
  tracejada animando quando existe. Nada flutua só para o `idleMotion` do relatório ser `true`.
- **Espinha**: caixa de 2 px posicionada pela fórmula `(100% − min(100%, max-w)) / 2 + gutter/2`
  à direita da página; o desenho é `scale` com origem no topo e a ponta é um losango levado por
  `translate` (GSAP), ambos em `setup.ts`. Sem JS ou com reduced motion, a linha aparece inteira.
- **Rodas**: todo giro em SVG é GSAP com `transformOrigin: '50% 50%'` explícito. CSS
  `transform-box`/`transform-origin` soma com a matriz do GSAP e faz a roda orbitar outro ponto.
- **Prova social com acervo de 2011**: as 8 miniaturas do portfólio (220 × 133) entram como
  "impressões" sobre cartão osso, nunca esticadas além de ~1,2×; os 29 logos de clientes em escala
  de cinza com `multiply` sobre o papel e cor no hover. O ano aparece só onde é público.

## Revisão de 24/11/2026 (rodada 4): imagem real no lugar da ilustração

A pessoa reprovou as ilustrações SVG das viaturas ("nem parece ambulância"). A direção passa a ser:
o premium vem de tipo, grid, espaço e imagem real bem tratada, não de desenho próprio.

- **Imagem**: fotos reais da Ouromed quando chegarem; até lá, imagens e loops gerados no Google
  Flow (sem texto, sem logo de terceiros, sem rosto em close). Um tratamento único para tudo
  (`.media`): cor levemente contida, granulação fina, base em azul-noite. Sem arquivo, o slot mostra
  em mono o que vai ali. Catálogo em `src/data/site.ts` (`media`), arquivos em `public/midia/`.
- **Ícones**: Phosphor, traço regular, só nas linhas de serviço.
- **Públicos**: seletor "Para você / Para empresas" no hero e no índice de serviços.
- **Intro**: a marca se monta sobre o azul-noite na primeira visita da sessão (≤ 1,3 s, pulável,
  fora em `prefers-reduced-motion`).
- **Botões**: preenchimento azul-marinho que nasce do lado por onde o ponteiro entra.
- **Emergência**: a Ouromed atende quando há viatura e equipe livres; o 192 vira nota de segurança.

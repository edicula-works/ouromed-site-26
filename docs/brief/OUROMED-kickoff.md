# Ouromed — kickoff do site novo

`ouromedbh.com.br` · saúde móvel em Belo Horizonte: ambulância (UTI e suporte básico), atendimento
domiciliar, remoção de pacientes, cobertura médica em eventos. Capturado em 2026-11-24; brutos em
`raw/ouromed/` (baseline.json, brief.md, atual-desktop.png, atual-mobile.png).

## 1. Situação atual (baseline de `ouromedbh.com.br`)

**É um site de 2011 — não há o que revisar; é site novo.**

| Item | Medida |
|---|---|
| Stack | HTML estático, jQuery **1.6.1**, menu com plugin **Kwicks**, `chili.pack.js`, Google Ads `conversion.js`; 8 chunks / 215 KB |
| Página | 3 bandas, **1.231 px** de altura; mobile só empilha (+938 px), sem responsivo |
| Motion | nenhuma (0 keyframes no load); só o hover do Kwicks animando `margin` (anti-padrão) |
| Acessibilidade | **4 `<h1>`**, sem `lang`, **4/4 imagens sem `alt`**, "Saiba Mais" branco sobre fundo claro (1,09:1 medido — botão com fundo em imagem, revisar) |
| SEO | título presente; sem semântica, sem conteúdo indexável de serviço |
| A manter | **tag de conversão do Google Ads** (há tráfego pago) |

## 2. Moldes (ver `MOLDES.md` e `SAUDE-referencias.md`)

- **Arquitetura narrativa**: olympic.no — a frota é a protagonista, "expand on scroll" nos serviços,
  CTA fixo ("Ligar / Solicitar remoção" — telefone é a conversão).
- **Pele**: Namaha Healthcare (HM) — fundo quente `#FFFBF6`, 1 cor de marca + 1 de ação, ilustração
  própria dos serviços e da viatura, depoimentos em bloco de cor, rodapé ilustrado.
- **Acessibilidade como requisito**: Life Care — tamanho de texto, contraste, `lang="pt-BR"`, alvos ≥ 44 px.
- **Explicar serviços**: gematik — scrollytelling "como funciona uma remoção / um atendimento em casa".
- **Não**: preloader, WebGL, cursor custom, tracking de pacientes em tempo real, foto de banco com jaleco.

Brief citado do Awwwards-mcp em `raw/ouromed/brief.md` (paleta `#1E2226` `#F8F8F9` `#E0CEC3` `#A05941`;
motion: Lenis 2/3, GSAP + ScrollTrigger 1/3; interação: pinned sections, scrubbed scroll, hover-interaction).

## 3. Estrutura proposta (SEO local)

| Rota | Objetivo | Seções |
|---|---|---|
| `/` | converter em 3 s | hero com telefone + WhatsApp fixos; serviços em ilustração; "como funciona" (scrollytelling); cobertura e tempo de resposta; credenciais; depoimentos |
| `/ambulancia` | "ambulância BH", "ambulância UTI" | UTI móvel × suporte básico; o que leva na viatura; quando chamar cada uma |
| `/atendimento-domiciliar` | "atendimento domiciliar BH" | enfermagem, medicação, curativos, acompanhamento; como agendar |
| `/remocao` | "remoção de pacientes BH" | alta hospitalar, transferência entre cidades, cadeirante/obeso; como funciona passo a passo |
| `/eventos` | "médico para evento BH", "ambulância para evento" | cobertura por porte; equipe e viaturas; orçamento |
| `/cobertura` | SEO local | cidades atendidas, tempo de resposta por região (mapa estático) |
| `/sobre` | confiança | equipe médica e credenciais (CRM/COREN, licenças), frota, história |
| `/contato` | — | telefone, WhatsApp, endereço, formulário de orçamento (B2B) |

Todos com `<h1>` único, `lang`, `alt`, título + descrição próprios, 404 real.

## 4. Stack sugerida

**Astro + Tailwind + GSAP (ScrollTrigger em 3–5 reveals, `power4.ease` ~850 ms) + CSS keyframes** no resto.
Estático, rápido no celular, SEO local. WordPress só se o cliente precisar editar conteúdo sozinho.
Júri: `/jury` com crítico glm-5.3-flash (visão) a cada rodada.

## 5. Decisões que eu preciso de você

1. **Onde nasce o projeto**: repo novo `edicula-works/ouromed`? Time no Linear (não existe time da Ouromed —
   novo time, ou dentro do EDC)? Domínio fica `ouromedbh.com.br`?
2. **Marca**: logo (vetor?), cores, fonte — existe manual? Fotos reais da frota/equipe ou precisamos produzir?
3. **Conteúdo**: lista exata de serviços e cidades atendidas; telefone/WhatsApp; 24 h?; convênios/seguros
   aceitos; credenciais e licenças que podem aparecer (equipe, viaturas, ANVISA/licença sanitária…).
4. **Quem edita depois**: só a Edícula (Astro serve) ou o cliente (WordPress)?
5. **Como começar**: (a) eu abrio a pasta do projeto aqui e rodo `/awwwards` com o brief, iterando com `/jury`;
   (b) fluxo formal — issue no Linear + `oficina lancar padrao --linear <ID>`.

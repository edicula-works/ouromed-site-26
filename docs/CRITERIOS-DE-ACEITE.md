# Critérios de aceite — site da Ouromed (v1)

Cada critério tem um número, de onde ele vem (a mediana medida em `docs/brief/PADRAO.md` ou uma regra do
`AGENTS.md`) e como checar. **Auto** = `scripts/aceite.mjs` mede no preview e imprime PASSA/FALHA.
**Manual** = alguém confere e marca. Um critério que depende de material do cliente fica **BLOQUEADO**
(nunca "passou") até o material chegar.

A versão vai para revisão quando todos os critérios estiverem PASSA ou BLOQUEADO, com o motivo do bloqueio
escrito.

## 1. Conversão

| # | Critério | Fonte | Como checar |
|---|---|---|---|
| 1.1 | Telefone e WhatsApp visíveis na 1ª tela de **todas** as páginas, no desktop e no celular | ambulâncias (4 de 6); AGENTS §3 | Auto |
| 1.2 | No celular, ligar com 1 toque a partir de qualquer ponto da página (barra fixa) | AGENTS §3 | Auto |
| 1.3 | No máximo **3** ações na 1ª tela do desktop | medianas: 1,5 Awwwards e 3 ambulâncias | Auto |

## 2. Topo

| # | Critério | Fonte | Como checar |
|---|---|---|---|
| 2.1 | Foto ou vídeo **de ponta a ponta** (largura ≥ 95 % da tela) ocupando **≥ 85 %** da altura da 1ª tela, no desktop e no celular | medianas: 100 % e 88 % | Auto · **BLOQUEADO** até chegar a imagem |
| 2.2 | Título com **≤ 8 palavras** e **48–80 px** no desktop | mediana ~56 px; 2 a 8 palavras | Auto |
| 2.3 | Texto sobre a imagem com contraste AA (com véu escuro se precisar) | WCAG | Auto (axe) |

## 3. Densidade

| # | Critério | Fonte | Como checar |
|---|---|---|---|
| 3.1 | Home com **≤ 10 telas** de altura no desktop | medianas: 9,7 e 8,5 | Auto |
| 3.2 | **≥ 1,2 imagens por tela** na home | medianas: 1,4 e 1,7 | Auto · **BLOQUEADO** até chegar a imagem |
| 3.3 | **≤ 120 palavras por tela** | entre 85 e 146 | Auto |
| 3.4 | **No máximo 2 famílias e 3 pesos de fonte**: Archivo (títulos e texto) e Martian Mono (só dados e legendas) | 1–2 famílias, 2–3 pesos; segunda voz a pedido da pessoa | Auto |
| 3.5 | Uma ideia por tela: nenhuma tela do desktop com mais de 2 blocos de assunto diferentes | Awwwards | Manual |
| 3.6 | Sem os tells de IA nº 1 (creme quente + acento), nº 3 (fios em tudo, raio zero) e nº 5 (eyebrow em todo título, mono em todo rótulo, seta em todo link) | `.agents/skills/awwwards/references/art-direction.md` | Manual + Auto (cor de fundo, fontes mono) |
| 3.7 | **No máximo 5 páginas**: home, Para você, Para empresas, Sobre, Contato | decisão da pessoa, 24/11 | Auto (sitemap) |

## 4. Confiança

| # | Critério | Fonte | Como checar |
|---|---|---|---|
| 4.1 | Viatura da Ouromed (ou imagem gerada fiel) no topo | ambulâncias | Manual · **BLOQUEADO** |
| 4.2 | Suporte básico × UTI móvel explicados, com a lista de equipamentos e a foto do interior | Bem Me Care, Minas Vida | Manual |
| 4.3 | Clientes, depoimentos com nome e cargo, endereço e telefones no rodapé; CNPJ quando o cliente enviar | ambulâncias; AGENTS §1 | Manual |
| 4.4 | Nenhum número, credencial, cliente, depoimento ou tempo de resposta inventado | AGENTS §1 | Manual |
| 4.5 | Emergência: "a Ouromed atende quando há viatura e equipe livres"; o 192 aparece só como nota de segurança | decisão da pessoa, 24/11 | Manual |

## 5. Motion

| # | Critério | Fonte | Como checar |
|---|---|---|---|
| 5.1 | No máximo estes **6 padrões** no site inteiro: (1) intro que surge e dissolve; (2) título entrando por máscara; (3) imagem que se revela e sai da escala 1,06 para 1; (4) cartão com zoom leve no hover; (5) textura de curvas de nível com deriva lenta; (6) menu e painéis abrindo por clip-path com itens em cascata | Awwwards (olympic, Namaha); o 6º a pedido da pessoa | Manual + Auto (lista de animações) |
| 5.2 | Intro: **≤ 1,2 s**, só na 1ª visita da sessão, pulável, **em fade**, sem nada deslizando | pedido da pessoa | Auto (quadros em 0, 0,4, 0,8 e 1,2 s) |
| 5.3 | Com `prefers-reduced-motion`, nenhum desses 5 roda | WCAG; AGENTS §5 | Auto |

## 6. Textura (curvas de nível da Serra do Curral)

| # | Critério | Fonte | Como checar |
|---|---|---|---|
| 6.1 | Gerada de dados reais de relevo, com o script no repositório | escolha da pessoa | Manual |
| 6.2 | Em **≤ 3 lugares**, opacidade **≤ 15 %**, arquivo **≤ 60 KB**, nunca sob texto corrido | — | Auto |
| 6.3 | Um crítico novo identifica "relevo" ou "linhas topográficas" sem ser avisado | — | Manual (júri) |

## 7. Técnica e acessibilidade

| # | Critério | Fonte | Como checar |
|---|---|---|---|
| 7.1 | Lighthouse mobile: LCP < 2,5 s e CLS < 0,1 | AGENTS §5 | Auto |
| 7.2 | JS da home **≤ 220 KB** | Awwwards ~155 KB; hoje 216 KB | Auto |
| 7.3 | axe sem nenhuma violação *serious* ou *critical* | AGENTS §5 | Auto |
| 7.4 | Alvos de toque ≥ 44 px; foco visível; `lang="pt-BR"`; um `<h1>` por página | AGENTS §4 e §5 | Auto |
| 7.5 | No celular (390 px), nenhum título passa da largura da tela | bug da rodada 6 | Auto |

## 8. Júri

| # | Critério | Fonte | Como checar |
|---|---|---|---|
| 8.1 | Um crítico novo, com visão, recebe as capturas da Ouromed **ao lado** das do olympic e do Namaha: nota **≥ 7,5** | régua do AGENTS §1 | Manual (`/jury`) |
| 8.2 | Nenhum item da lista do crítico marcado como "genérico" ou "previsível" | pedido da pessoa | Manual |
| 8.3 | **A aprovação da pessoa é o gate final.** O crítico automático deu 7,05–7,3 a versões que ela avaliou abaixo de 4/10: a nota dele orienta, não aprova | decisão da pessoa, 24/11 | Manual |

## Estado na rodada 4 (antes da reconstrução)

- **FALHA:**
  - 1.3 (4 ações);
  - 2.2 (135 px);
  - 3.1 (12,6 telas);
  - 3.4 (4 pesos);
  - 5.1 (espinha, leituras, cortinas, palco, preenchimento de botão);
  - 5.2 (a intro desliza).
- **BLOQUEADO:** 2.1, 3.2 e 4.1, por falta de imagens.
- **PASSA:** 1.1, 1.2, 3.3, 4.4, 4.5 e 7.2.

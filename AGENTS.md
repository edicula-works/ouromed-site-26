# AGENTS.md — site institucional da Ouromed

Manual cross-tool deste repositório (vale para Pi, Codex, Claude, OpenCode e pessoas). Leia antes de
escrever código. Em português: commits, PRs, comentários e interface.

## 1. O que é

O site de `ouromedbh.com.br`, construído do zero em novembro de 2026 no lugar do site de 2011. Saúde móvel:
ambulância (UTI móvel e suporte básico), atendimento domiciliar, remoção de pacientes (adulto, pediátrico,
neonatal, psiquiátrico), locação de ambulâncias, "área protegida" (contrato de urgência para empresas) e
ambulatórios em obras/empresas. Detalhes em `docs/brief/OUROMED-pesquisa.md`.

**A régua é Awwwards.** O objetivo é um site que segure diante daquele júri (estimativa ≥ 7,5), sem perder
o que um serviço de saúde exige: confiança, clareza, telefone visível, acessibilidade, velocidade no celular.
As referências e o porquê de cada escolha estão em `docs/brief/` (leia `OUROMED-kickoff.md` primeiro).

Quatro coisas que este repositório **não** controla:

- **O domínio e o DNS** de `ouromedbh.com.br`. Nada aqui mexe em domínio; o corte é decisão humana.
- **A ficha no Google Business** (3,6 em 25 avaliações, não reivindicada). O site pode linkar "Avaliar no
  Google", mas reivindicar e responder é ação do cliente.
- **A copy final de credenciais.** CRM/COREN, licenças e certificações só entram se o cliente fornecer por
  escrito. **Nunca invente** credencial, número, depoimento, cliente ou tempo de resposta.
- **Dado de paciente.** Nunca, em nenhum arquivo, fixture, exemplo ou screenshot — nem anonimizado de caso
  real. Cenários ilustrativos são declarados como tais na tela.

## 2. Stack e comandos

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Biome · Bun · Vercel — o mesmo stack do
`edicula-works/site`, para reaproveitar CI, hábitos e deploy. Site estático por natureza: prefira Server
Components e `output: 'export'` quando couber; nada de banco de dados.

```bash
bun install
bun dev              # desenvolvimento
bun run lint         # Biome — o mesmo que a CI roda
bun run typecheck    # tsc --noEmit
bun run build        # build de produção
```

A CI (`.github/workflows/ci.yml`) roda `lint`, `typecheck` e `build` nas pull requests para `main` (a org tem
limite de minutos de Actions; PRs para a `dev` são verificadas localmente antes de pedir revisão).

## 3. Conteúdo: de onde vem e como se escreve

- **Fonte de verdade**: `docs/conteudo-atual/textos-site-2011.txt` (tudo que a Ouromed publica hoje),
  `docs/conteudo-atual/google-avaliacoes.txt` (o que clientes elogiam e reclamam) e as imagens em
  `docs/conteudo-atual/imagens/`. Reescreva para a web de hoje; não copie o texto de 2011.
- **O que a Ouromed é**: "Padrão ouro em serviços de ambulância" — ouro de Minas ↔ *gold standard*;
  fundada e administrada por médicos de urgência e emergência; motoristas com COVE (exigência do
  CONTRAN); central 24 h com triagem médica; neonatal com incubadora de transporte; geriatria.
- **Prova social**: os 3 depoimentos têm nome e cargo; os 8 eventos têm ano (o mais recente é 2014 —
  mostre o ano, não esconda); a lista de clientes tem ~31 marcas — só exiba as que o cliente confirmar
  (lista em `OUROMED-pesquisa.md` §6). Foto de banco de imagens com jaleco sorridente: nunca.
- **Tom**: fato concreto no lugar de adjetivo. Não "viaturas luxuosas"; sim "maca retrátil, climatização,
  oxigenação fixa e portátil". Emergência é uma seção; não é o tom do site inteiro.
- **Telefone e WhatsApp** (`tel:` / `wa.me`) fixos em toda página — a conversão é ligar. Números oficiais
  em `OUROMED-pesquisa.md` §1; confirme qual é o WhatsApp antes de publicar.
- **Preservar a tag de conversão do Google Ads** (ID `955189289`, `gtag`/`conversion.js`) — há tráfego pago.

## 4. Estrutura (v1)

| Rota | Objetivo |
|---|---|
| `/` | converter em 3 s: hero com telefone/WhatsApp, serviços em ilustração, "como funciona" (remoção), cobertura, credenciais, depoimentos |
| `/ambulancia` | UTI móvel × suporte básico; o que leva na viatura; quando chamar cada uma |
| `/atendimento-domiciliar` | enfermagem, medicação, curativos, acompanhamento; como agendar |
| `/remocao` | alta hospitalar, transferência entre cidades, cadeirante/obeso; passo a passo |
| `/eventos` | cobertura por porte de evento; equipe e viaturas; orçamento |
| `/locacao-de-ambulancias` | 4×2/4×4, furgões, opcionais; mineração, obras, shoppings |
| `/area-protegida` | contrato de urgência para empresas, shoppings, condomínios, escolas |
| `/ambulatorios` | posto médico itinerante em obras; ambulatórios em empresas |
| `/sobre` | equipe, conduta (COVE, uniforme, uso de sirene), frota, PQO, história |
| `/contato` | telefone, WhatsApp, endereço, formulário de orçamento (B2B) |

Toda página: `<h1>` único, `lang="pt-BR"`, título e descrição próprios, `alt` em imagem de conteúdo,
dados estruturados `LocalBusiness`/`MedicalBusiness`, 404 real (`not-found.tsx`).

## 5. Qualidade: como se mede

- **Construir**: skill `/awwwards` (`.agents/skills/awwwards`) — Next.js por padrão. Referências e tokens
  dos moldes em `docs/brief/MOLDES.md`.
- **Avaliar**: skill `/jury` (`.agents/skills/jury`) a cada rodada. O crítico precisa **ver** screenshots:
  o glm-5.3 não recebe imagem; use um crítico fresco com a glm-5.3-flash ou o gpt-6.2-sol:
  `pi -p --no-session --no-mcp --no-skills --no-extensions --provider zai-coding-cn --model glm-5.3-flash --thinking medium --tools read "$(cat brief-do-critico.txt)"`.
  Nunca dê ao crítico código, intenção ou `calibration.md`.
- **Metas**: 0 FAIL no `audit.mjs`; axe 0 *serious*; LCP mobile < 2,5 s; CLS < 0,1; 60 fps de scroll;
  alvos de toque ≥ 44 px; `prefers-reduced-motion` completo; sem animar `margin`/`width`; listeners de
  scroll passivos; blur > 10 px nunca animado.
- **Motion**: CSS-first; GSAP + ScrollTrigger só onde há scrub (3–5 reveals, `power4.ease`, ~850 ms);
  Lenis opcional; **sem** WebGL, **sem** preloader, **sem** cursor custom que esconda o nativo.
- **Acessibilidade é requisito de saúde**, não diferencial: WCAG AA, foco visível, skip link primeiro,
  contraste ≥ 4,5:1 (o laranja/vermelho de marca em texto pequeno precisa checar).
- Ferramentas do Awwwards em `.pi/mcp.json` (`analyze_page_structure`, `verify_build`, `export_design_tokens`…).

## 6. Fluxo de trabalho

Vale a skill `github` da oficina: branch `feat/edc-<id>-<assunto>` a partir de `origin/dev`; PR **em
rascunho** para a `dev`; `Fixes EDC-<id>` só se conclui a issue; `gh pr ready` só com verificação local
verde; merge e promoção `dev` → `main` são de uma pessoa. Nunca push em `main`/`dev`, nunca `--force`.

Mantenha a issue no Linear com um comentário de andamento por marco (mostre o texto à pessoa antes de
publicar). `PROGRESSO.md` na worktree (fora do git) diz de onde retomar.

# Deploy — site da Ouromed

Hospedagem **Vercel**, como o `edicula-works/site`. O site é um export estático do Next.js (`output: 'export'`):
a Vercel detecta o framework e serve o `out/` sem configuração extra. O `vercel.json` na raiz define o que segue.

## O que o `vercel.json` decide

- **Preview automático só para branches de PR** (`git.deploymentEnabled`): `main` e `dev` **não** publicam sozinhos —
  produção e integração são deploy manual, por uma pessoa (regra da casa). Cada PR aberto ganha uma URL
  `https://ouromed-site-26-<hash>.vercel.app` para mostrar ao cliente.
- **Redirects 301 das URLs antigas** (`.php`) para as novas — o site de 2011 está indexado no Google e pode ser
  landing page do Google Ads. Confira os destinos antes do corte.
- **Cache imutável** para `_next/static/*` e cabeçalhos básicos de segurança. Sem CSP por enquanto (scripts inline
  de flags e do gtag exigiriam nonce/hash; fica para a v1.1).

## Criar o projeto (uma vez, por uma pessoa)

1. Vercel → *Add New → Project* → importar `edicula-works/ouromed-site-26`.
2. Framework Preset: **Next.js** (auto). Root: `/`. Sem variáveis de ambiente. Build Command e Output: padrão.
3. *Deployments*: deixar "Vercel Functions" e "Static" como padrão. Não conectar domínio ainda.
4. Primeiro deploy de produção: **só quando a pessoa decidir** (`main`), em *Deployments → Redeploy* ou
   `vercel --prod` na worktree.

## Fluxo de um PR

1. Branch a partir de `origin/dev` → PR em rascunho para `dev` → preview URL automática no PR (o bot da Vercel
   comenta). É a URL para o cliente ver.
2. Verificação local antes de pedir revisão: `bun run lint && bun run typecheck && carga-pesada bun run build`, e o
   `/jury` sobre `out/` servido (`node .agents/skills/jury/scripts/serve.mjs out --port 4400`).
3. Merge na `dev` (pessoa). Deploy da `dev` manual, se quiserem uma URL de integração estável.

## Corte para `ouromedbh.com.br` (decisão e clique são de uma pessoa)

Checklist, na ordem:

1. Promoção `dev` → `main` aprovada e mesclada.
2. Deploy de produção **sem domínio**; rodar o `/jury` e um passe manual por todas as rotas nessa URL.
3. **Conferir os redirects** do `vercel.json` contra o site antigo (cada `.php`) e a home.
4. **Google Ads**: a tag `AW-955189289` está no site (remarketing). Combinar com quem gere a conta (Xerxes
   Marques) as conversões de *ligar* e *WhatsApp* e trocar as URLs finais dos anúncios das `.php` para as novas —
   ou confiar nos 301 (funciona, mas URL final limpa é melhor para Quality Score).
5. **Domínio**: em Vercel → Settings → Domains → `ouromedbh.com.br` e `www`; a Vercel emite o TLS. No registrador,
   apontar conforme a Vercel indicar (A/ALIAS/AAAA ou CNAME). **Antes**, anotar os registros atuais (MX de e-mail
   `@ouromedbh.com.br` **não podem mudar** — só A/CNAME do site).
6. Depois da propagação: `curl -I https://ouromedbh.com.br/servicos-de-aph.php` → 301; `/qualquer-coisa` → 404.
7. **Google Search Console**: verificar o domínio, enviar o `sitemap.xml`, pedir reindexação da home.
8. **Google Business Profile**: reivindicar a ficha (hoje sem dono, 3,6 em 25), corrigir telefone/WhatsApp e site,
   e passar a responder avaliações. O site tem o link "Avaliar no Google".
9. Manter o servidor antigo ligado por 30 dias (plano de rollback: reverter o DNS).

## Rollback

Reverter o DNS para o servidor antigo devolve o site de 2011 em minutos; a Vercel mantém os deploys anteriores
(*Rollback* em Deployments) para voltar uma versão do site novo sem tocar no DNS.

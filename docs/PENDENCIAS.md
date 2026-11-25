# Pendências — o estado real do site (rodada 8, 25/11/2026)

Espelho do site no estado em que está: tudo o que é provisório, ausente ou depende de confirmação
está aqui. A fonte única do conteúdo é `src/data/site.ts`; o pedido que vai para a Ouromed, com o
porquê de cada item, é `docs/PEDIDO-AO-CLIENTE.md`.

Regra que vale para tudo: **nunca inventar** credencial, número, cliente, depoimento, tempo de
resposta ou dado de paciente. No lugar, frase verdadeira e genérica, ou nada.

## 1. O que o site é hoje

- **Cinco páginas**: `/` (home), `/para-voce`, `/para-empresas`, `/sobre`, `/contato`, e uma 404
  desenhada. As sete rotas da primeira versão (`/ambulancia`, `/remocao`, …) e os endereços do site
  de 2011 (`empresa.php`, `clientes.php`, …) têm redirecionamento permanente para as âncoras
  correspondentes (`vercel.json`).
- **Doze espaços com foto, um reservado** (`media` em `src/data/site.ts`): onze são **cenas
  ilustrativas geradas por IA** — sem texto, sem logo de terceiros, sem rosto em close — e uma é a
  única foto real, `locacao`, recortada de um post do Instagram da própria Ouromed. Os arquivos
  (AVIF e WebP em duas ou três larguras) estão em `public/midia/`, gerados por `scripts/fotos.mjs`;
  `hero` segue sem foto. Trocar as ilustrações pelas fotos reais da frota, da equipe, do interior e
  da Central é pendência com a Ouromed (§3).
- **Desenhos de BH em traço** no lugar de foto de banco: a vista da cidade no topo da home e na
  404 (foto de origem CC0) e a Serra do Curral no rodapé (foto de origem CC BY 2.0, crédito no
  rodapé). As curvas de nível da serra, geradas de dados de relevo (`scripts/curvas.py`), ficam só
  atrás dos três fatos da Ouromed. Origem e licenças: `docs/brief/desenhos/CREDITOS.md`.
- **Depoimentos**: três espaços reservados, um por vez, até o cliente enviar os atuais.
- **Sem WhatsApp, sem eventos com ano, sem logos de clientes** (decisão de 24/11, rodada 6), até o
  cliente confirmar o que pode aparecer.
- **Conferido, não é pendência**: CNPJ `11.263.858/0001-65` e razão social (enviados pela pessoa em
  24/11 e conferidos no cadastro público: ativa desde 20/10/2009 — é daí que vem o "desde 2009");
  endereço da Rua Senador Lúcio Bittencourt, 53; serviços, equipamentos e regras publicadas pela
  própria Ouromed em 2011 (COVE exigida pelo CONTRAN, ABNT, Star of Life, 24 h com triagem médica).

## 2. Provisório (está no site, à espera de confirmação)

| Item | O que está no site | Onde | O que falta |
|---|---|---|---|
| Fotos | Doze espaços com arquivo: 11 cenas ilustrativas geradas por IA e o recorte real de `locacao`; sem texto, logo de terceiros ou rosto em close | home e as quatro páginas | As fotos reais da Ouromed, com autorização de imagem; até lá, as ilustrativas ficam no lugar |
| Telefones da Central 24 h | (31) 3786-1506 no botão "Ligar"; (31) 4103-5452 e (31) 3786-7112 ao lado — os três fixos do site de 2011 | barra fixa do celular, cabeçalho, botões, rodapé, contato | Confirmar os três e qual é o principal. O cadastro público mostra outro número, (31) 2128-2020 (consulta de 24/11): perguntar |
| E-mails por setor | `agendamento@`, `luciano@` (eventos e locação) e `diretoria@ouromedbh.com.br` | contato, botões dos serviços, formulário | Confirmar que continuam válidos e quem responde a cada um |
| Marca | Marca tipográfica provisória em SVG ("Ouro" em ouro + "med" em azul-marinho, círculo com a cruz). O favicon, o cartão de compartilhamento (`og.png`) e o ícone da Apple seguem essa marca e a paleta atuais, gerados por `bun scripts/marca.tsx` | cabeçalho, menu, intro da marca, favicon, preview de link | O logo vetorial original; quando chegar, rodar `scripts/marca.tsx` de novo |
| Depoimentos | Três espaços reservados ("Espaço para o depoimento de um cliente atual." · "depoimento a confirmar") num carrossel azul-noite | home | Depoimentos atuais com nome e cargo; os de 2011–2014 não puderam ser confirmados |
| Frota | Texto genérico: veículos 4×4 e furgões pequenos e grandes, de diversas marcas, com o equipamento da UTI; "A composição atual da frota é confirmada na contratação." | `/sobre`, `/para-voce#ambulancia` | Modelos e quantidades em operação |
| Formulário de orçamento | Sem backend: compõe o e-mail conforme a pessoa digita e abre o aplicativo de correio; a confirmação oferece "Copiar mensagem". Nada fica guardado | `/contato` | Confirmar os destinos, o prazo de resposta e se um formulário por e-mail serve |
| "Avaliar no Google" | Link para a busca da Ouromed no Google Maps | rodapé | A ficha (3,6 em 25 avaliações, sem dono) reivindicada e o link direto de avaliação |
| Escritório | Endereço com link para o mapa; nenhum horário | `/contato`, rodapé | Se recebe clientes e em que horário |

## 3. Ausente (não renderiza até o cliente enviar)

**Fotos reais da Ouromed.** Os doze espaços têm hoje cenas ilustrativas geradas por IA e um recorte
de um post do Instagram (§1); as fotos atuais da frota, da equipe, do interior da UTI e da Central 24 h
dependem do cliente, com autorização de imagem de quem aparecer. Proporção em que cada slot é
recortado e onde aparece (a mesma tabela está em `scripts/fotos.mjs`, que confere estes slots contra o
código a cada execução):

| Slot | Onde aparece | Proporção |
|---|---|---|
| `hero` | reservado: o topo da home é o desenho de BH, sem vídeo (decisão da pessoa, 24/11) | — |
| `uti` | home (destaque de "Para você", largura toda) · `/para-voce#ambulancia` | 16:9 |
| `domiciliar` | home (cartão) · `/para-voce#atendimento-domiciliar` | 16:9 |
| `remocao` | home (cartão e cartão de "Quando chamar") · `/para-voce#remocao` | 16:9 |
| `protegida`, `eventos`, `locacao` | home (faixa de "Para empresas") · `/para-empresas` | 4:3 |
| `ambulatorios` | home (faixa de "Para empresas" e cartão de "Quando chamar") · `/para-empresas#ambulatorios` | 4:3 |
| `uti-interior` | home ("Suporte básico × UTI") | 4:3 |
| `destino`, `triagem`, `equipe` | topos de `/para-voce`, `/para-empresas`, `/sobre` | 4:3 |
| `central` | home (cartão de "Quando chamar") · topo de `/contato` | 4:3 |

Como entram: as fotos numa pasta, um mapa `slot → { arquivo, alt, foco?, posicao? }` (`alt` é
obrigatório; `foco` ancora o recorte do slot; `posicao` é o `object-position` nas caixas de outra
proporção) e `node scripts/fotos.mjs <pasta> <mapa.json> --manifest src/data/midia.json` grava AVIF e
WebP em duas ou três larguras e o índice que o `Media.tsx` lê para montar o `<picture>`. O `alt` vive
em `src/data/site.ts`. Antes de subir: autorização de imagem de quem aparecer e nenhum paciente
identificável. O mapa e as fontes desta rodada ficaram fora do git (pasta local do gestor); os
prompts do Google Flow (`docs/brief/PROMPTS-FLOW.md`) seguem como plano B.

**O resto:**

| Item | Estado no site |
|---|---|
| WhatsApp | Fora. O (31) 7818-7838 do site antigo tem 8 dígitos e não é celular atual; o segundo botão é "Pedir orçamento" |
| Eventos cobertos (nome, ano) | Fora. Os oito de 2010–2014 do portfólio estão no acervo (`docs/conteudo-atual/imagens/`); só a lista de tipos de evento, sem ano |
| Clientes (nomes, logos) | Fora. A lista publicada em 2011 está em `docs/brief/OUROMED-pesquisa.md` §3 |
| História da empresa | Só "em atividade desde outubro de 2009" (abertura do CNPJ). Sem fundadores, sem marcos |
| Cidades atendidas e tempo de resposta | "Belo Horizonte e todo o Brasil, mediante agendamento"; nenhum tempo em minutos |
| Convênios e seguros aceitos | A pergunta "Aceitam convênio?" fica no FAQ com resposta genérica (cada plano tem regra própria) |
| Preço e formas de pagamento | Nenhuma citação; o FAQ "Quanto custa?" manda ligar ou pedir orçamento |
| Regras internas: uniforme e crachá, uso de sirene, composição da equipe por viatura | Não citadas |
| Modalidades comerciais: locação com ou sem equipe, contrato de área protegida, mínimo de eventos | Texto genérico |
| Licenças e credenciais (CRM, COREN, licença sanitária, registro da frota) | Nenhuma citação |
| Google Ads | Tag `AW-955189289` mantida (só remarketing, como no site de 2011). Falta quem gere a conta configurar as conversões de "ligar" no site novo |

## 4. Do acervo, não usado

- `docs/conteudo-atual/imagens/cliente-*.jpg` e `cliente.jpg` (29 arquivos de logos de clientes)
  e as fotos e marcas de eventos: de 2011 a 2014, sem direito de uso confirmado.
- `empresa.jpg`: montagem de quartos hospitalares que parece foto de banco. Fora por decisão.
- `logomarca-ouromed.jpg`: raster de 387 × 65; a marca provisória é tipográfica.
- "Pioneira em qualidade em Belo Horizonte", "as mais modernas ambulâncias do mercado, luxuosas,
  novas": frases de 2011 que não são checáveis e o site novo não repete.
- `docs/brief/desenhos/bh-praca-liberdade-linha.png`: Praça da Liberdade desenhada (foto CC0),
  guardada sem uso.
- Um desenho da Praça Raul Soares visto de cima, enviado pela pessoa em 24/11: não está no
  repositório e não foi usado; a origem e a licença não foram informadas.

## 5. Terceiros e técnica

- **VLibras** (tradução para Libras, do governo federal): script de `vlibras.gov.br` carregado depois
  do carregamento da página; o tradutor só carrega ao clicar. O botão fica no canto de baixo à
  direita, acima da barra do celular, com a cor própria do widget (não dá para trocar).
- **Fontes**: Archivo e Martian Mono, do Google Fonts, baixadas no build pelo `next/font`.
- **Campos sem uso em `site.ts`**: `since`, `lede`, `trust`, `address.embed`, `about.read` e
  `contact.read` não são renderizados por nenhuma página; limpar quando for conveniente.

## 6. Como conferir

- `src/data/site.ts`: o conteúdo do site inteiro, com o resumo destas pendências no cabeçalho.
- `scripts/fotos.mjs --ajuda`: o formato do mapa de fotos; `src/data/midia.json`: os arquivos por
  slot; `scripts/aceite.mjs <preview>`: os critérios de `docs/CRITERIOS-DE-ACEITE.md` (com as fotos,
  o 3.2 passa a ser medido: 11 imagens em 8,64 telas na home).
- `vercel.json`: os redirecionamentos das rotas antigas.

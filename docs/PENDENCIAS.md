# Pendências da versão de apresentação

Este site é a **v1 para apresentação**: não haverá contato com o cliente antes. Tudo o que é
provisório, ausente ou depende de confirmação está listado aqui, e esta lista acompanha a
apresentação. A copy v1 (`docs/conteudo/copy-v1.md`, mesclada na `dev`) continua valendo com as
suas marcações ⚠️; `docs/PEDIDO-AO-CLIENTE.md` é o pedido que vai para a Ouromed com o porquê de
cada item. Esta lista é o espelho do site no estado em que ele é apresentado.

**Decisão de 2026-11-24 (a pessoa responsável pelo projeto):**

1. Usa-se todo dado público do site atual (2011): endereço, os 3 fixos, e-mails por setor,
   serviços, equipamentos, frota citada, depoimentos com nome e cargo, eventos com ano (o mais
   recente é 2014) e a lista de clientes.
2. WhatsApp provisório: (31) 7818-7838, público na página de APH, como `wa.me/553178187838`,
   marcado no código como "a confirmar".
3. CNPJ: `null` no `src/data/site.ts`; não renderiza enquanto for `null`.
4. Fotos: só as miniaturas públicas do portfólio (eventos e logos de clientes). Viaturas e equipe
   são ilustração SVG própria. Nenhuma foto de banco.
5. Nunca inventar credencial específica, convênio aceito, preço, tempo de resposta em minutos,
   depoimento ou cliente novo. No lugar, frases verdadeiras e genéricas.
6. História: só "cobrimos eventos desde 2010" (fato do portfólio). Sem ano de fundação.

## Provisório (está no site, marcado no código)

| Item | O que está no site | Onde | O que falta |
|---|---|---|---|
| WhatsApp | (31) 7818-7838 → `wa.me/553178187838` | `site.whatsapp` (comentário "provisório, a confirmar"): barra fixa do celular, hero, menu, rodapé, contato, formulário | Confirmar o número oficial e quem atende |
| Frota citada | Mercedes-Benz Sprinter 313 CDI, Ford Transit, Renault Master, Fiat Ducato, Land Rover Defender 4×4 (lista publicada em 2011) | `/ambulancia`, `/sobre` | Frota atual (modelos e quantidades) e fotos atuais; a página avisa "lista confirmada na contratação" |
| Eventos | Os 8 do portfólio, com ano só onde é público: rodeio de Pedro Leopoldo (2010 a 2013), Minas Trend Preview (2014), Mostra das Profissões da UFMG (2010, legível na marca) | home, `/eventos` | Eventos de 2015 em diante; ano dos demais |
| Depoimentos | Os 3 publicados, com nome e cargo, texto literal | home | Confirmar se ainda podem ser usados |
| Clientes | 29 logos publicados no site atual | home, `/sobre` | Confirmar quais podem continuar aparecendo (muitos são de 2011 a 2014) e o direito de uso das marcas |
| Fotos de eventos | 5 miniaturas públicas (220 × 133) e 3 marcas de eventos | home, `/eventos` | Fotos atuais em resolução; autorização de imagem (nenhum rosto é reconhecível nas miniaturas, mas as fotos são de público) |

## Ausente (não renderiza até o cliente enviar)

| Item | Estado no site |
|---|---|
| CNPJ | `site.cnpj = null`; o rodapé mostra a razão social sem CNPJ |
| Ano de fundação e história | Só "cobrimos eventos desde 2010" |
| Logotipo vetorial e manual de marca | Marca tipográfica provisória (Wordmark em SVG). O raster `logomarca-ouromed.jpg` (387 × 65) usa azul-marinho, que a paleta nova deliberadamente não usa (DESIGN.md) |
| Fotos atuais: viaturas por tipo, interior da UTI, equipe uniformizada, Central 24 h | Ilustrações SVG próprias no lugar |
| Cidades atendidas e tempo de resposta por região | Nenhuma citação |
| Convênios e seguros aceitos | Nenhuma citação (a pergunta "Atende convênio?" ficou fora do FAQ) |
| Preço e formas de pagamento | Nenhuma citação; o FAQ "Quanto custa?" manda ligar |
| Regras internas: uniforme e crachá, uso de sirene, composição da equipe por viatura | Removidas; a seção "Conduta" só traz o que o texto de 2011 publica (COVE, equipe própria, 24 h, calibração, ABNT e Star of Life, materiais) |
| Modalidades comerciais: locação com ou sem equipe, área protegida (contrato), eventos (mínimo, hora ou diária) | Texto genérico |
| Ficha no Google (3,6 em 25 avaliações, não reivindicada) | "Avaliar a Ouromed no Google" aponta para a busca; falta o place id e a reivindicação da ficha |
| Formulário de orçamento | Sem backend: compõe `mailto:` (por serviço) e `wa.me` no navegador. Confirmar tempo de resposta e se os e-mails por setor continuam certos |
| Escritório: recebe clientes? Em que horário? | A página de contato diz só "venha até o escritório na Carlos Prates" (texto do site atual), sem horário |
| Telefone principal do botão "Ligar" | `(31) 3786-1506`, o primeiro do site atual; confirmar qual é o principal |
| Google Ads | Tag `AW-955189289` mantida (remarketing). Pendente: quem gere a conta configurar as conversões de "ligar" e "WhatsApp" no site novo |
| Licenças e credenciais (CRM, COREN, licença sanitária, registro da frota) | Nenhuma citação; nunca inventar |

## Do acervo, não usado

- `docs/conteudo-atual/imagens/empresa.jpg`: montagem de quartos hospitalares que parece foto de
  banco. Fora, por decisão (nenhuma foto de banco).
- `docs/conteudo-atual/imagens/logomarca-ouromed.jpg`: raster de baixa resolução; a marca
  tipográfica provisória está em `src/components/Illustrations.tsx` (`Wordmark`).
- "Pioneira em qualidade em Belo Horizonte" e "as mais modernas ambulâncias do mercado, luxuosas,
  novas": frases de 2011 que o site novo não repete (não são checáveis).

## Como conferir

- `src/data/site.ts`: cabeçalho com o resumo destas decisões; `site.whatsapp.provisional`,
  `site.cnpj`, `events[].year`, `clients[]`.
- As imagens públicas estão copiadas em `public/imagens/eventos/` e `public/imagens/clientes/`
  (origem: `docs/conteudo-atual/imagens/`).

# O padrão: Awwwards × ambulâncias × Ouromed

Medido em 24/11/2026 com `scripts/padrao.mjs` (Playwright, 1440×900 e 390×844, as mesmas regras em
todos os sites, banners de cookie escondidos). Dados brutos: `padrao/medidas.json`. Capturas da 1ª tela:
`padrao/primeira-tela-desktop.jpg` e `padrao/primeira-tela-celular.jpg`.

**Amostra**
- **Awwwards:** olympic.no (HM), namaha.healthcare (HM), lifecare.org.au e rega.ch. O gematik.de saiu da
  amostra porque a URL devolveu 404.
- **Ambulância** (os melhores da matriz de 26 sites): Medical Save, Minas Vida, Bem Me Care (BH), Brasil
  Vida, DRF, Acadian.
- **Ouromed:** o preview da rodada 4.

**Ressalvas do método:**
- LCP e CLS foram medidos sem limitar a rede, então valem só para comparar os sites entre si.
- "Seções" conta blocos com mais de 25 % da altura da tela.
- O título do olympic e o do Namaha é dividido em spans, e por isso o script contou 1 palavra. Na tela,
  são 2 ("Conquering currents") e 6 ("Because care should always feel personal").

## Desktop

| Site | Topo | Topo % da tela | Ponta a ponta | Título (px) | CTAs na 1ª tela | Tel. na 1ª tela | Telas de altura | Palavras/tela | Imagens/tela | Fontes · pesos | JS (KB) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| olympic | vídeo | 100 | sim | 53 | 1 | não | 9,7 | 45 | 1,4 | 2 · 2 | 1208 |
| namaha | foto | 100 | sim | 60 | 0 | não | 11,4 | 146 | 1,4 | 1 · 2 | 112 |
| lifecare | foto | 49 | sim | 96 | 2 | não | 5,8 | 147 | 0,7 | 1 · 3 | 378 |
| rega | foto | 100 | sim | 24* | 4 | não | — | — | — | 1 · 3 | 155 |
| Medical Save | vídeo | 89 | sim | 76 | 1 | sim | 9,3 | 56 | 0,3 | 1 · 3 | 6 |
| Minas Vida | foto | 87 | sim | 27 | 2 | sim | 4,8 | 108 | 5,0 | 3 · 5 | 201 |
| Brasil Vida | foto | 87 | sim | 52 | 6 | sim | 9,8 | 173 | 2,5 | 2 · 4 | 45 |
| Bem Me Care | foto | 48 | sim | 36 | 2 | sim | 11,9 | 81 | 0,7 | 1 · 3 | 3 |
| DRF | foto | 100 | sim | 79 | 4 | não | 7,7 | 62 | 0,9 | 2 · 2 | 101 |
| Acadian | foto | 48 | sim | 60 | 4 | não | 5,7 | 107 | 3,3 | 2 · 4 | 269 |
| **Ouromed (r4)** | **texto** | **0** | **não** | **135** | 4 | sim | **12,6** | 62 | **0,6** | 2 · **4** | 216 |

\* A home da Rega mede 1 tela porque o conteúdo carrega depois e o script não pegou. Fica fora das
medianas de altura, palavras e imagens.

**Medianas** (Awwwards / ambulância):
- topo: 100 % / 88 %, sempre foto ou vídeo de ponta a ponta;
- título: ~57 px / ~56 px;
- CTAs na 1ª tela: 1,5 / 3;
- altura: 9,7 / 8,5 telas;
- palavras por tela: 146 / 85;
- imagens por tela: 1,4 / 1,7;
- famílias de fonte: 1 / 2; pesos: 2–3 / 3.

## O que todos os bons fazem

1. **Abrem com a operação em imagem.** Viatura, helicóptero, equipe ou mãos, em foto ou vídeo de ponta a
   ponta, ocupando quase toda a tela. Nenhum abre com título sobre fundo liso.
2. **Título médio sobre a imagem** (50–80 px), com 2 a 8 palavras e uma frase de apoio.
3. **Poucas ações na 1ª tela:** 1 ou 2 nos premiados, até 3 ou 4 nas ambulâncias, sempre com telefone ou
   WhatsApp entre elas.
4. **Mais imagem que interface.** Cerca de 1,5 imagem por tela; o resto é espaço vazio e texto curto.
5. **Poucas fontes e poucos pesos:** 1 ou 2 famílias e 2 ou 3 pesos. Mono só para rótulos (olympic).
6. **Motion discreto.** Os premiados animam texto e imagem ao entrar. Só o olympic usa Lenis e vídeo; o
   Namaha é quase estático e mesmo assim foi premiado.

## Onde a Ouromed foge do padrão

- **Topo sem imagem.** O lugar da foto é ocupado por um título de 135 px (mais que o dobro da mediana) e
  por um quadro azul vazio.
- **Imagem de menos:** 0,6 imagem por tela, contra 1,4–1,7. Por isso o site parece cheio, embora o volume
  de palavras esteja na média: a densidade vem de interface (abas, pílulas, selos, linhas, rótulos).
- **Página alta demais:** 12,6 telas, contra 8,5–9,7.
- **4 pesos de fonte**, contra 2–3.
- No que está certo, a Ouromed fica: telefone na 1ª tela (padrão das ambulâncias), LCP rápido, JS dentro
  da faixa.

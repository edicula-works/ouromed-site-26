# Proposta da rodada 7: motion por seção e revisão de conteúdo

Escrita em 24/11/2026, depois das críticas da pessoa:
- animações repetidas, bobas e lentas;
- atos arredondados cansativos;
- fotos sempre entrando com movimento;
- conteúdo antigo.

**Aguarda aprovação antes de implementar.**

## 1. O que as referências fazem (gravado, não suposto)

Gravei a rolagem real (roda do mouse, 28 quadros por site) e medi o fps durante a rolagem
(`.jury/motion/gravar.mjs`). O fps foi medido em headless sem GPU e serve só para comparar.

| Site | fps | Técnica | O que acontece ao rolar |
|---|---|---|---|
| olympic.no (HM) | 18 | Lenis, CSS scroll-timeline, clip-path, vídeo | ver abaixo |
| namaha.healthcare (HM) | 43 | GSAP (27 gatilhos, 1 pin) | ver abaixo |
| lifecare.org.au | 46 | Lenis | calmo; quase nada se move |
| Ouromed (rodada 6 sem atos) | **57** | CSS + GSAP | entradas variadas, mas todas do mesmo tipo |

**olympic.no**, um gesto por seção:
1. o topo se recolhe enquanto o conteúdo sobe;
2. "Fleet focus": uma imagem pequena no centro cresce até ocupar a tela;
3. tela dividida (escuro × imagem) com as coordenadas;
4. imagens que andam dentro da própria moldura.

**namaha.healthcare**:
1. o topo se recolhe e os cartões grudam embaixo;
2. a imagem do prédio cresce de pequena para larga;
3. muito vazio, com ilustração de linha ao fundo;
4. fileira de especialidades na horizontal;
5. depoimento em bloco de cor com setas;
6. rodapé ilustrado, com o desenho atrás do texto.

**O que os dois têm em comum:**
- **uma coisa se move por vez**;
- cada seção tem **um gesto próprio**, ligado à rolagem e não a "entrar na tela";
- várias seções **não se movem**: o descanso faz parte do ritmo;
- fotos não deslizam: crescem, recortam ou aparecem por transparência.

## 2. Coreografia proposta (um gesto por seção, nenhum repetido)

| Seção | Gesto | Referência | Técnica |
|---|---|---|---|
| Topo | A cidade em traço deriva devagar o tempo todo. Ao rolar, **o topo se recolhe de baixo para cima** e a seção seguinte aparece por baixo | olympic e Namaha | `clip-path` com scrub na saída do topo |
| A Ouromed | A frase **acende com a leitura** (já existe). Os 3 fatos ficam **parados** | — (descanso) | cor por palavra, com scrub |
| Para você | **A foto da UTI cresce** de um quadro no centro até a largura toda; os outros dois serviços aparecem em seguida, por transparência | olympic "Fleet focus" e Namaha | `clip-path` inset com scrub; um único `pin` curto |
| Para empresas | **A fileira de 4 serviços anda na horizontal** conforme se rola; as fotos não se mexem dentro dela | Namaha (especialidades) | `x` com scrub na fileira |
| Suporte básico × UTI | **Tela dividida**: a foto do interior fica parada à esquerda enquanto o texto passa à direita | olympic (coordenadas) | `position: sticky` só da foto |
| Quando chamar | **Nada se move**. Três cartões, pausa | — (descanso) | — |
| Depoimentos | **Um por vez**, num bloco azul, com setas; troca por transparência | Namaha | estado em React, `opacity` |
| Perguntas | Só o abrir e fechar do acordeão | — | — |
| Rodapé | A serra atrás do texto (feito), com deriva lenta | Namaha | — |

**Regras de desempenho** (critério novo): só animar `transform`, `opacity` e `clip-path`; nada de
sombra ou máscara animada. Gravação com `.jury/motion/gravar.mjs` ≥ 55 fps e ≤ 10 quadros longos.

## 3. Conteúdo: o que se confirmou e o que fazer

Conferência na web em 24/11 (agente) mais o CNPJ enviado pela pessoa (consulta pública).

| Informação no site | Situação | Proposta |
|---|---|---|
| Razão social, endereço (Carlos Prates) | **Confirmados** pelo CNPJ (ativa) | Manter |
| CNPJ 11.263.858/0001-65 | **Confirmado** | No rodapé (feito) |
| "Desde 2009" | **Confirmado** (início de atividade: 20/10/2009) | Usar como fato no lugar de "fundada por médicos" |
| Telefones (31) 3786-1506, 4103-5452, 3786-7112 | Só no site antigo; a Receita mostra **(31) 2128-2020** | **Perguntar** quais valem |
| WhatsApp (31) 7818-7838 | 8 dígitos, não é celular atual | **Perguntar** o WhatsApp real; até lá, tirar |
| E-mails @ouromedbh.com.br | Não confirmados | Perguntar; até lá, só formulário e telefone |
| Serviços (remoção, UTI, urgência, eventos, locação, área protegida, ambulatórios) | Confirmados pelos CNAEs do CNPJ e pelo site atual | Manter |
| "Fundada por médicos de urgência" | Não confirmado | Tirar até o cliente confirmar |
| Frota (Sprinter, Transit, Master, Ducato, Defender) | Não confirmada; o site atual diz "4×4, furgão pequeno e grande" | Trocar por "4×4, furgões pequeno e grande" |
| Depoimentos 2011–2014 | Não confirmados (sem resposta da empresa) | **Decisão da pessoa**: tirar, ou manter com o ano visível |
| Equipamentos da UTI e conduta (COVE etc.) | Do site antigo; não verificáveis por fora | Manter como "o que a Ouromed publica"; pedir confirmação |
| Instagram @ouromed_saude | Ativo (post em 24/11/2026) | Link no rodapé |

## 4. Estrutura da home proposta

Fica como está, sem a seção de depoimentos se a pessoa decidir tirar:

1. Topo
2. A Ouromed (desde 2009)
3. Para você
4. Para empresas
5. Suporte básico × UTI
6. Quando chamar
7. Perguntas
8. Rodapé

São 7 seções e cerca de 7 telas.

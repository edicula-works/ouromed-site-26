# Desenhos de BH — origem e licença

## Os sete pontos do topo (25/11/2026)

Sete desenhos em traço gerados pela ferramenta de imagem do Codex (missão `.fotos-ia/FASE3-IMAGENS.md`),
preto sobre branco puro, e vetorizados por `scripts/desenhos.mjs` em `public/textura/bh-*.svg` (um
`<path>` por desenho, traço de 1,5 px que não escala, pintado de ouro pela máscara). Entram no topo da
home num slideshow lento (10 s por desenho, crossfade de 1,75 s); sem movimento, só o primeiro.

As referências serviram só para conferir silhuetas e arquitetura — o pedido a cada geração foi "leia a
forma na referência e crie um desenho novo" —, e são fotos livres ou páginas oficiais. Por isso nenhum
desenho leva crédito obrigatório na tela.

| Desenho (`public/textura/`) | Ponto | Referência visual |
|---|---|---|
| `bh-liberdade.svg` (primeiro do slideshow; o que fica sem movimento) | Praça da Liberdade: coreto, alameda de palmeiras imperiais, prédios | [Portal oficial de BH](https://portalbelohorizonte.com.br/node/4826) |
| `bh-mineirao.svg` | Mineirão: fachada oval e pilares inclinados | [Portal oficial de BH](https://portalbelohorizonte.com.br/filmcommission/catalogo-de-locacoes/estadio-mineirao) |
| `bh-pampulha.svg` | Lagoa da Pampulha e Igrejinha de São Francisco | [Portal oficial de BH](https://portalbelohorizonte.com.br/pampulha/conjunto-moderno/igreja-sao-francisco-assis) |
| `bh-serra-do-curral.svg` | Perfil da Serra do Curral com as antenas | [Foto de Eduardo Gabão](https://commons.wikimedia.org/wiki/File:Serra_do_Curral.jpg), CC BY-SA 3.0 (só o relevo; o desenho é novo) |
| `bh-praca-do-papa.svg` | Praça do Papa: a cruz e a serra ao fundo | [Prefeitura de BH](https://prefeitura.pbh.gov.br/praca-do-papa) |
| `bh-praca-sete.svg` | Praça Sete: o Pirulito entre o Edifício Niemeyer e o Cine Theatro Brasil | [Portal oficial de BH](https://portalbelohorizonte.com.br/filmcommission/catalogo-de-locacoes/praca-sete-de-setembro) |
| `bh-raul-soares.svg` | Praça Raul Soares: o chafariz e os canteiros | [Portal oficial de BH](https://portalbelohorizonte.com.br/o-que-fazer/ao-ar-livre-e-esportes/pracas/praca-raul-soares) |

A vetorização foi conferida por re-renderização (cobertura de 93 a 100 % da tinta do PNG; o que
sobra são massas escuras do gerador, que viram poucas linhas de propósito) e por um modelo de visão
fresco, par a par com cada PNG: nenhum elemento faltou, nada quebrado ou inventado (notas 4–5).

## Desenhos de 24/11

Desenhos em traço gerados pelo Codex (geração de imagem) a partir de fotos com licença livre do
Wikimedia Commons, em 24/11/2026. As fotos de referência que a pessoa enviou (Shutterstock, O Eco,
BlaBlaCar, Google) **não** foram usadas: só serviram para escolher as vistas.

| Desenho (`public/textura/`) | Foto de origem | Autor | Licença |
|---|---|---|---|
| `bh-cidade.png` (vista da cidade a partir da serra) | [Belo Horizonte Brazil Skyline Aerial, December 2024](https://commons.wikimedia.org/wiki/File:Belo_Horizonte_Brazil_Skyline_Aerial,_December_2024.jpg) | Spicypepper999 | CC0 (domínio público) |
| `bh-serra.png` (Serra do Curral) | [Serra do Curral vista de dentro do Parque das Mangabeiras](https://commons.wikimedia.org/wiki/File:Serra_do_Curral_vista_de_dentro_do_Parque_das_Mangabeiras.jpg) | Eduardo Elias Camponez | **CC BY 2.0** (crédito obrigatório: está no rodapé do site) |
| `desenhos/bh-praca-liberdade-linha.png` (reserva) | [Vista da Praça da Liberdade a partir do Museu das Minas e dos Metais](https://commons.wikimedia.org/wiki/File:Vista_da_Pra%C3%A7a_da_Liberdade_a_partir_do_Museu_das_Minas_e_dos_Metais,_Belo_Horizonte,_Minas_Gerais,_Brasil,_Brazil_2022.jpg) | Tet | CC0 |

A primeira versão da vista da cidade inventou uma torre de observação que não existe em BH; foi
refeita com a regra "não invente nada que não esteja na foto". Conferir isso em todo desenho novo.

`scripts/desenho-mascara.py` converte o desenho (preto sobre branco) em máscara (traço opaco, fundo
transparente) para o CSS pintar com a cor do lugar.

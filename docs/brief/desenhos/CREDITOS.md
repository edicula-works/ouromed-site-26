# Desenhos de BH — origem e licença

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

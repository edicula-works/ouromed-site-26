# Copy v1 — rotas da Ouromed

Versão 1 da copy de todas as rotas, para revisão antes de virar página. **Fonte de verdade**:
`docs/conteudo-atual/textos-site-2011.txt` (tudo que a Ouromed publica hoje), as avaliações e a
concorrência do Google em `docs/conteudo-atual/`, e `docs/brief/OUROMED-pesquisa.md`.

**Marcações**
- Sem marca = fato publicado pela própria Ouromed em 2011 (reescrito, não inventado).
- ⚠️ = **só o cliente confirma** antes de publicar (dado, promessa, nome, regra interna).
- 🚫 = nunca entra sem confirmação por escrito: preço, convênio, tempo de resposta em minutos, credencial
  (CRM/COREN/licença), depoimento novo.

**Regras de voz**
1. Fato concreto no lugar de adjetivo: não "viaturas luxuosas", sim "maca retrátil, climatização, oxigênio
   fixo e portátil".
2. Frases curtas. Emergência é uma seção, não o tom do site: o resto é calmo.
3. "Você", nunca "V. Sa.". Português de Minas sem caipirice.
4. Telefone e WhatsApp aparecem em toda rota — a conversão é ligar.
5. Números só quando a Ouromed confirmar. Hoje não há nenhum número de tempo de resposta publicado.

**Palavras da casa** (manter): APH (atendimento pré-hospitalar), UTI móvel, suporte básico, remoção,
Central 24 h, triagem médica, área protegida, COVE, PQO (Padrão de Qualidade Ouromed), "padrão ouro".

---

## 0. Elementos globais

### Navegação (desktop e mobile)
`Início · Serviços ▾ · Sobre · Contato` + CTA fixo **"Ligar (31) 3786-1506"** e ícone WhatsApp ⚠️.

Serviços ▾: Ambulância e UTI móvel · Atendimento domiciliar · Remoção de pacientes · Cobertura de eventos ·
Locação de ambulâncias · Área protegida · Ambulatórios.

### Rodapé (todas as páginas)
- **Ouromed — Serviço Móvel de Saúde** · CNPJ ⚠️
- Rua Senador Lúcio Bittencourt, 53 — Carlos Prates · Belo Horizonte/MG · CEP 30710-070
- **Central 24 h:** (31) 3786-1506 · (31) 4103-5452 · (31) 3786-7112 · WhatsApp ⚠️
- Agendamento de remoção: agendamento@ouromedbh.com.br · Locação e eventos: luciano@ouromedbh.com.br ·
  Diretoria: diretoria@ouromedbh.com.br
- Link "Avaliar a Ouromed no Google" ⚠️ (URL da ficha) — a ficha tem 3,6 em 25 avaliações e não está reivindicada.
- Linha discreta: "Em caso de emergência, ligue 192." (SAMU) — saúde pública antes de nós.

### 404
Título: "Página não encontrada — Ouromed". H1: "Essa página não está aqui." Texto: "O endereço mudou ou foi
digitado com erro. Se você precisa de ajuda agora, ligue para a Central 24 h." Botões: Ligar · Ir para o
início. Status HTTP 404.

---

## 1. `/` — Início

**Title:** Ouromed — Ambulância UTI, atendimento domiciliar e remoção em BH | Central 24 h
**Description:** Ambulância UTI móvel e suporte básico, atendimento domiciliar, remoção de pacientes e cobertura
médica de eventos em Belo Horizonte e todo o Brasil. Central 24 h com triagem médica. Ligue (31) 3786-1506.

### Hero

**H1 — opção A (recomendada; usa o posicionamento da casa):**
> **Padrão ouro em saúde móvel.**
> Ambulância UTI, atendimento domiciliar, remoção de pacientes e cobertura de eventos — em Belo Horizonte e
> em todo o Brasil. Central 24 h com triagem médica.

**Opção B (mais direta, pensando em quem chega de uma emergência):**
> **Precisa de ambulância agora?**
> Central 24 h com triagem médica: (31) 3786-1506. UTI móvel, suporte básico, remoção e atendimento em casa.

**Opção C (promessa de cuidado, para o público de domiciliar e geriatria):**
> **Quem chega é médico, enfermeiro e socorrista.**
> Saúde móvel com padrão ouro: UTI móvel, atendimento domiciliar, remoção e eventos. Central 24 h.

CTA primário: **Ligar (31) 3786-1506** · CTA secundário: **WhatsApp** ⚠️ · CTA terciário: "Solicitar orçamento".

Abaixo do CTA, uma linha de confiança (sem número): "Fundada e administrada por médicos de urgência e
emergência · Motoristas com COVE · Atendemos todo o Brasil mediante agendamento."

### Seção 2 — Serviços (ilustrados; "expand on scroll")
H2: **O que a Ouromed faz**
Lede: "Sete frentes, uma equipe. Da emergência em casa à UTI móvel entre estados."

1. **Ambulância e UTI móvel** — "Suporte básico e UTI móvel com médico, enfermeiro e socorrista. Para exames,
   transferências e emergências." → `/ambulancia`
2. **Atendimento domiciliar** — "Médico e enfermagem em casa, com alta resolutividade e menos idas ao hospital." → `/atendimento-domiciliar`
3. **Remoção de pacientes** — "Alta hospitalar, transferência entre cidades, pacientes pediátricos, neonatais e
   psiquiátricos, 24 h." → `/remocao`
4. **Cobertura de eventos** — "Ambulância, ambulatório montado e equipe para qualquer porte, em todo o Brasil." → `/eventos`
5. **Locação de ambulâncias** — "Viaturas 4×2 e 4×4 para mineradoras, obras, shoppings e empresas." → `/locacao-de-ambulancias`
6. **Área protegida** — "Contrato de urgência para empresas, shoppings, escolas e condomínios: você aciona, a
   equipe vai até você." → `/area-protegida`
7. **Ambulatórios** — "Posto médico itinerante em obras e ambulatórios dentro de empresas e hotéis." → `/ambulatorios`

### Seção 3 — Como funciona (scrollytelling, 4 passos)
H2: **Como funciona, do telefonema ao destino**
1. **Você liga para a Central 24 h.** Atendente identifica o caso e passa para a triagem médica.
2. **A triagem define a viatura e a equipe.** Suporte básico ou UTI móvel; com médico, enfermeiro e socorrista
   quando o caso pede.
3. **A equipe chega, estabiliza e transporta.** Equipamentos calibrados, motorista com COVE.
4. **Você acompanha até o destino.** Alta em casa, transferência entre hospitais ou entre estados.
⚠️ Confirmar o passo a passo real (há acompanhamento para o familiar? orçamento antes ou depois?).

### Seção 4 — Cobertura
H2: **Belo Horizonte hoje, o Brasil quando você precisar**
"Atendemos Belo Horizonte e região 24 horas por dia. Remoções e eventos fora da cidade, em qualquer estado,
mediante agendamento." ⚠️ Lista de cidades atendidas e tempo de resposta por região.

### Seção 5 — Conduta e credenciais (a seção que responde às avaliações do Google)
H2: **Segurança começa antes do atendimento**
- "Todo motorista tem a capacitação **COVE** — Condutor de Veículo de Emergência, exigida pelo CONTRAN —
  além de treinamento de socorrista."
- "Equipe uniformizada e identificada em todo atendimento." ⚠️ confirmar crachá/nome
- "Sirene e prioridade de passagem só em emergência real, conforme o Código de Trânsito." ⚠️ confirmar regra interna e redação
- "Médicos, enfermeiros e socorristas próprios, com equipes de geriatria, pediatria e neonatologia."
- "Equipamentos com aferição e calibração periódicas."
- "Viaturas dentro das especificações da ABNT e da norma federal norte-americana para veículos de emergência
  (Star of Life)." ⚠️ linkar as normas

### Seção 6 — Prova social
H2: **Quem já contou com a Ouromed**
Depoimentos (ver §11) e eventos com ano (ver §12). Logos de clientes só os confirmados ⚠️.

### Seção 7 — CTA final
H2: **Precisa falar com a Ouromed?**
"Central 24 h: (31) 3786-1506. Para orçamento de eventos, locação ou área protegida, fale com o Luciano ⚠️ pelo
WhatsApp ou pelo formulário."

### FAQ (home)
- **A Ouromed atende 24 horas?** Sim. A Central funciona 24 horas, todos os dias, com triagem médica.
- **Faz remoção para outra cidade ou estado?** Sim. Remoções em todo o território nacional mediante agendamento.
- **Tem ambulância UTI?** Sim, UTI móvel com médico, enfermeiro e socorrista, equipada com respirador, bombas de
  infusão, cardioversor e incubadora de transporte para recém-nascidos.
- **Quanto custa?** Depende do tipo de viatura, da equipe e da distância. Ligue para a Central 24 h ou peça
  orçamento pelo WhatsApp. 🚫 não publicar preço sem o cliente.
- **Atende convênio?** ⚠️ Confirmar antes de publicar qualquer convênio.

---

## 2. `/ambulancia` — Ambulância e UTI móvel

**Title:** Ambulância UTI móvel e suporte básico em Belo Horizonte | Ouromed
**Description:** Ambulância UTI móvel com médico, enfermeiro e socorrista, e suporte básico para exames e
transferências em BH e todo o Brasil. Central 24 h: (31) 3786-1506.

**H1:** **Ambulância UTI móvel e suporte básico, com equipe própria**
**Lede:** "Duas categorias de viatura, uma só equipe. A triagem médica da Central decide qual é a certa para o
seu caso."

### Suporte básico × UTI móvel
| | Suporte básico | UTI móvel |
|---|---|---|
| Para quê | Transporte de paciente estável: exames, consultas, alta, transferência sem risco | Paciente que precisa de suporte avançado durante o trajeto |
| Equipe | Socorrista e motorista com COVE ⚠️ confirmar se sempre tem enfermeiro | Médico, enfermeiro e socorrista |
| Equipamento | Oxigênio, maca retrátil, pranchas de imobilização | Respirador pulmonar, bombas de infusão, cardioversor com ECG digital, oxigênio fixo e portátil, oxímetro, incubadora de transporte de recém-nascidos |

### O que leva numa UTI móvel da Ouromed
Lista concreta (do texto atual): "Ventilador pulmonar · Bombas de infusão · Cardioversor com eletrocardiografia
digital · Sistema de oxigenação fixo e portátil · Oxímetro digital · Incubadora de transporte de recém-nascidos ·
Maca retrátil · Cadeira de resgate tamanho especial · Suporte de soroterapia · Pranchas de imobilização em
polietileno, adequadas para levar o paciente a exames de ressonância magnética."
"Colchão das macas e revestimento macio dos bancos: viagens longas sem dor." "Equipamentos com calibração
periódica."

### Viaturas
"Mercedes-Benz Sprinter 313 CDI, Ford Transit, Renault Master, Fiat Ducato e Land Rover Defender 4×4 — novas,
espaçosas e climatizadas." ⚠️ confirmar frota atual (modelos e quantidades) e fotos.

### Quando chamar cada uma
- Suporte básico: alta hospitalar de paciente estável, ida a exame, consulta, retorno para casa.
- UTI móvel: paciente dependente de respirador ou medicação contínua, transferência entre hospitais,
  neonatal, viagens longas.
- Emergência: ligue 192 (SAMU) ou a Central 24 h da Ouromed — a triagem orienta.

### Para quem
"Famílias, hospitais e clínicas, home cares, operadoras ⚠️ confirmar." (O texto atual cita atendimento a
"clientes particulares e a empresas de Home Care".)

### CTA
"Ligue para a Central 24 h: (31) 3786-1506 · (31) 4103-5452 · (31) 3786-7112."

### FAQ
- **Levam paciente para ressonância?** Sim: as pranchas de imobilização são de polietileno, adequadas a exames
  de ressonância.
- **A UTI móvel tem médico?** Sim: médico, enfermeiro e socorrista.
- **Atendem bebês?** Sim: incubadora de transporte de recém-nascidos e equipe de neonatologia.
- **Fazem viagem para outro estado?** Sim, mediante agendamento.

---

## 3. `/atendimento-domiciliar` — Atendimento domiciliar (APH)

**Title:** Atendimento médico domiciliar em Belo Horizonte | Ouromed
**Description:** Médico e enfermagem em casa em Belo Horizonte: atendimento pré-hospitalar (APH) para
particulares e empresas de home care, com triagem médica pela Central 24 h. Ligue (31) 3786-1506.

**H1:** **Atendimento médico em casa, com a resolutividade de uma equipe de urgência**
**Lede:** "A Ouromed nasceu do atendimento de urgência e emergência. É essa experiência que chega à sua porta:
avaliação, medicação, curativo, encaminhamento — em casa, quando dá para ficar em casa."

### O que é o APH
"Atendimento Pré-Hospitalar: o cuidado que chega antes do hospital. Para pacientes particulares e para
empresas de home care que precisam de uma equipe de urgência como parceira."

### O que a equipe faz em casa ⚠️ confirmar a lista
"Avaliação médica · Aplicação de medicação e soroterapia · Curativos · Verificação de sinais · Encaminhamento
hospitalar quando necessário." ("Obtemos alta resolutividade em casa e baixa taxa de remoção hospitalar" — do
texto atual; sem números.)

### Como funciona
1. Ligue para a Central 24 h. Uma triagem médica decide o que o caso precisa.
2. A equipe adequada vai até você — com equipamento de urgência, não só uma bolsa.
3. Se precisar de hospital, a mesma equipe transporta, sem quebrar o cuidado.

### Para quem
"Idosos e pacientes acamados (equipe de geriatria e gerontologia), crianças e recém-nascidos (pediatria e
neonatologia), pacientes em home care, empresas de home care que querem uma parceira de urgência."

### CTA
"Central 24 h com triagem médica: (31) 3786-1506."

### FAQ
- **Precisa de encaminhamento médico?** ⚠️ Confirmar.
- **Atendem no mesmo dia?** ⚠️ Confirmar antes de prometer.
- **Fazem atendimento para empresas de home care?** Sim, é um dos serviços principais.

---

## 4. `/remocao` — Remoção de pacientes

**Title:** Remoção de pacientes em BH e todo o Brasil | Ambulância UTI | Ouromed
**Description:** Remoção de pacientes adulto, pediátrico, neonatal e psiquiátrico, 24 h, com UTI móvel e equipe
própria. Alta hospitalar e transferência entre cidades e estados. Ligue (31) 3786-1506.

**H1:** **Remoção de pacientes, do alta hospitalar à viagem entre estados**
**Lede:** "Cada remoção começa com uma pergunta: o que esse paciente precisa durante o caminho? A resposta define
a viatura, a equipe e o equipamento."

### Tipos de remoção
- **Alta hospitalar** — do hospital para casa, com o cuidado que o paciente ainda precisa no trajeto.
- **Transferência entre hospitais** — suporte básico ou UTI móvel conforme o caso.
- **Entre cidades e estados** — em todo o Brasil, mediante agendamento. (Uma família contratou a UTI móvel
  para ir de São Joaquim de Bicas a Campinas ⚠️ pediremos autorização para citar; sem citar, manter genérico.)
- **Pediátrica e neonatal** — incubadora de transporte, equipe de pediatria e neonatologia.
- **Psiquiátrica** — equipe treinada para o transporte seguro. ⚠️ confirmar detalhes e se há médico psiquiatra.

### Como funciona (passo a passo)
1. **Ligue para a Central 24 h** ou escreva para agendamento@ouromedbh.com.br.
2. **Triagem médica** avalia o paciente e o trecho.
3. **Viatura e equipe** adequadas: suporte básico ou UTI móvel; médico, enfermeiro e socorrista quando preciso.
4. **Equipamentos calibrados**, pranchas adequadas a ressonância, cadeira de resgate tamanho especial.
5. **Destino e entrega** com acompanhamento ⚠️ confirmar: familiar acompanha? laudo do transporte?

### Conforto no caminho
"Macas com colchão, bancos com revestimento macio, climatização. Viagens longas não precisam doer."

### CTA
"Agendar remoção: agendamento@ouromedbh.com.br · Central 24 h: (31) 3786-1506."

### FAQ
- **Fazem remoção para outro estado?** Sim, em todo o território nacional mediante agendamento.
- **Levam paciente cadeirante ou com obesidade?** Sim: cadeira de resgate tamanho especial e pranchas adequadas.
- **Têm incubadora para recém-nascido?** Sim.
- **Como funciona o pagamento?** 🚫 Confirmar com o cliente (particular, convênio, reembolso).

---

## 5. `/eventos` — Cobertura de festas e eventos

**Title:** Ambulância e médico para eventos em BH e todo o Brasil | Ouromed
**Description:** Cobertura médica para congressos, shows, casamentos, formaturas, rodeios e feiras: ambulância,
ambulatório montado e equipe de suporte básico e avançado. Orçamento pelo WhatsApp.

**H1:** **Cobertura médica para o seu evento, do casamento ao congresso**
**Lede:** "A Ouromed leva o suporte adequado ao porte do evento: uma ambulância, um ambulatório montado no local,
ou uma equipe completa. Em Minas ou em qualquer estado do Brasil."

### O que montamos ⚠️ confirmar opções e o que está incluso
- Ambulância de suporte básico ou UTI móvel em posição estratégica.
- Ambulatório médico no local: macas, desfibrilador, cadeira de rodas e medicamentos de pronto socorro.
- Equipe de suporte básico e avançado (médico, enfermeiro, socorristas).
- Cobertura para eventos em todo o território nacional, mediante agendamento.

### Para que tipo de evento
"Congressos, feiras empresariais, shows e festivais, casamentos e formaturas, rodeios, funerais, comboios VIP,
competições esportivas." (Tudo do texto atual.)

### Eventos que a Ouromed já cobriu (com ano quando existe)
Ver §12 — mostrar o ano com honestidade.

### CTA
"Peça orçamento: luciano@ouromedbh.com.br · WhatsApp ⚠️ · (31) 3786-1506."

### FAQ
- **Fazem eventos fora de Belo Horizonte?** Sim, em todo o Brasil mediante agendamento.
- **Qual o tamanho mínimo de evento?** ⚠️ Confirmar se há regra (ex.: obrigatório por lei acima de X pessoas).
- **A ambulância pode ficar o dia inteiro?** ⚠️ Confirmar modalidades (hora, diária, turno).

---

## 6. `/locacao-de-ambulancias` — Locação de ambulâncias

**Title:** Locação de ambulâncias 4×2 e 4×4 para empresas | Ouromed
**Description:** Locação de ambulâncias para mineradoras, siderúrgicas, construção civil, shoppings e empresas:
furgões pequenos e grandes, 4×2 e 4×4, com equipamentos médicos e telemetria. Fale com a Ouromed.

**H1:** **Locação de ambulâncias para quem não pode parar**
**Lede:** "Mineração, siderurgia, construção civil, shoppings: operações em que a ambulância faz parte do
planejamento de segurança. A Ouromed fornece a viatura certa, com os opcionais que a sua operação exige."

### Viaturas e opcionais
"Tração 4×2 e 4×4 · furgão pequeno e grande · ar-condicionado · freios ABS · airbag · tacógrafo digital ·
sistema de telemetria · equipamentos médicos conforme a necessidade." (Do texto atual.) ⚠️ frota atual e fotos.

### Para quem
"Empresas mineradoras, siderúrgicas e de construção civil, shoppings, indústrias, eventos ⚠️ confirmar."

### Com ou sem equipe ⚠️ confirmar
O texto atual não diz se a locação inclui equipe. Perguntar: viatura com motorista e socorrista? Só viatura?

### CTA
"Fale com o Luciano ⚠️: luciano@ouromedbh.com.br · (31) 3786-1506."

---

## 7. `/area-protegida` — Área protegida

**Title:** Área protegida: contrato de urgência para empresas e condomínios | Ouromed
**Description:** Área protegida Ouromed: sua empresa, shopping, escola ou condomínio aciona a Central e recebe
uma equipe de urgência no local, após triagem médica. Fale com a Ouromed.

**H1:** **Área protegida: a equipe de urgência a uma ligação do seu negócio**
**Lede:** "Clubes, shoppings, colégios, faculdades, condomínios, empresas, clínicas de exames e laboratórios já
aderiram. Em uma intercorrência com cliente ou funcionário, você aciona a Central e a equipe vai até você."

### Como funciona
1. **Contrato de área protegida** com a Ouromed ⚠️ modalidades e preço só com o cliente.
2. **Você aciona a Central 24 h.** Triagem médica avalia a urgência.
3. **Uma equipe se desloca imediatamente** para o atendimento no local.

### Para quem
"Shoppings, clubes, colégios e faculdades, condomínios, empresas, clínicas de exames e laboratórios."

### CTA
"Fale com a Ouromed: (31) 3786-1506 · diretoria@ouromedbh.com.br."

---

## 8. `/ambulatorios` — Ambulatórios

**Title:** Ambulatórios em obras e empresas | Ouromed
**Description:** Posto médico itinerante em obras e ambulatórios montados em empresas, hotéis e shoppings, com
equipe e equipamentos. Ouromed, Belo Horizonte.

**H1:** **Ambulatório onde a sua operação está**
**Lede:** "Obras, empresas, hotéis e shoppings: a Ouromed monta o posto médico e coloca a equipe — com a
infraestrutura que o local exige."

### O que a Ouromed monta
"Posto médico itinerante em obras. Ambulatórios em empresas, hotéis e shoppings, equipados com cardioversor com
desfibrilador e monitor cardíaco digital, oxímetros, glicosímetro, macas, cadeiras de rodas, armários de
medicamentos, sofás, televisores e computadores." (Do texto atual.)

### CTA
"Fale com a Ouromed: (31) 3786-1506 · diretoria@ouromedbh.com.br."

---

## 9. `/sobre` — Sobre a Ouromed

**Title:** Sobre a Ouromed — saúde móvel com padrão ouro, feita por médicos | Belo Horizonte
**Description:** A Ouromed foi fundada e administrada por médicos de urgência e emergência. Conheça a equipe, a
frota, o PQO (Padrão de Qualidade Ouromed) e a conduta que a Central 24 h segue.

**H1:** **Feita por médicos de urgência, do começo ao fim**
**Lede:** "Ouro de Minas, padrão ouro. A Ouromed nasceu da analogia entre o ouro das Minas Gerais e o *gold
standard* dos nossos serviços — e é administrada por quem vive urgência e emergência."

### O que a Ouromed é
"Fundada e administrada por médicos experientes no atendimento de urgência e emergência. Remoção de pacientes
em condições especiais, cobertura de eventos, gerenciamento de ambulatórios, atendimento domiciliar, locação de
ambulância para construção civil, mineradoras, shoppings e empresas."

### Equipe
- "Socorristas treinados. Motoristas com treinamento de socorrista **e** a capacitação COVE (Condutor de Veículo
  de Emergência), exigida pelo CONTRAN."
- "Médicos e enfermagem com anos de urgência e emergência."
- "Equipes de geriatria e gerontologia, pediatria e neonatologia."

### Frota
Ver `/ambulancia`. ⚠️ fotos atuais.

### PQO — Padrão de Qualidade Ouromed
"Segurança, modernidade e conforto. Viaturas dentro das especificações da ABNT e da norma federal norte-americana
para veículos de emergência (Star of Life). Materiais com tratamento antibacteriano, resistentes a fungos e
umidade. Equipamentos com aferição periódica. Dispositivos de segurança exigidos por setores hospitalar, de
mineração, siderúrgico, industrial, petroquímico e desportivo."

### Conduta
Ver home, seção 5. ⚠️ Confirmar com o cliente: regra de sirene, uniforme/crachá, treinamento contínuo.

### História ⚠️
Não existe linha do tempo publicada. Pedir ao cliente: ano de fundação, marcos, crescimento da frota.

### CTA
"Fale com a Ouromed: (31) 3786-1506."

---

## 10. `/contato` — Contato

**Title:** Contato Ouromed — Central 24 h em Belo Horizonte | (31) 3786-1506
**Description:** Fale com a Ouromed: Central 24 h (31) 3786-1506, WhatsApp, e-mails por setor e endereço na Rua
Senador Lúcio Bittencourt, 53, Carlos Prates, Belo Horizonte.

**H1:** **Estamos a uma ligação de distância**
**Lede:** "Para urgência, ligue. Para orçamento e eventos, WhatsApp ou e-mail. Para conhecer, venha tomar um café
na Carlos Prates."

### Canais
| Para | Como |
|---|---|
| Urgência e remoção | **Central 24 h:** (31) 3786-1506 · (31) 4103-5452 · (31) 3786-7112 |
| Agendar remoção | agendamento@ouromedbh.com.br |
| Locação de veículos e eventos | luciano@ouromedbh.com.br |
| Diretoria | diretoria@ouromedbh.com.br |
| WhatsApp | ⚠️ número oficial |

### Endereço
"Rua Senador Lúcio Bittencourt, 53 — Carlos Prates, Belo Horizonte/MG, CEP 30710-070." Mapa incorporado.
"Central 24 h" ⚠️ confirmar se o endereço recebe visitas e em que horário.

### Formulário (B2B: orçamento de eventos, locação, área protegida, ambulatórios)
Campos: Nome · Telefone/WhatsApp · E-mail · Empresa ⚠️ opcional · Tipo de serviço (select) · Mensagem.
"Para urgências, ligue. O formulário não é monitorado em tempo real." ⚠️ confirmar tempo de resposta.

---

## 11. Depoimentos (texto atual, literal — ⚠️ confirmar se ainda podem ser usados e o ano)

1. **Tiago de Brito** — Rope Eventos · Pedro Leopoldo Rodeio Show
   > "Nossa parceria com a Ouromed fortalece a cada ano. A equipe de profissionais são excepcionais e nos passa
   > muita tranquilidade, pois prestam serviço de alta qualidade, responsabilidade e total respeito com o público
   > do nosso evento."
2. **Henrique Freitas** — Coordenador de Segurança do Shopping Del Rey
   > "A Ouromed é parceira do Shopping Del Rey desde agosto de 2011. Pelo que temos de experiência, acreditamos
   > ter acertado na escolha pela Ouromed, pois, em todos os momentos emergenciais vividos em nosso shopping
   > desde a sua chegada, o atendimento tem sido ágil e perfeito, trazendo também comodidade e conforto aos
   > nossos clientes."
3. **Tatiana Duarte** — Coordenadora de Produção, Rede Record de Televisão
   > "A Ouromed oferece uma super estrutura de atendimento de urgência e emergência em eventos e nos atenderam
   > muito bem em Diamantina - MG durante as gravações da minissérie Rei Davi. Ficamos tranquilos quando sabemos
   > que as UTIs e equipes Ouromed estão presentes em nossas gravações."
   ("UTI´s" no original; grafia ajustada, texto literal.)

Depoimentos do Google (5★) podem ser citados com primeiro nome e link para a ficha ⚠️ pedir autorização.
🚫 Nunca escrever depoimento novo.

## 12. Eventos cobertos (do portfólio atual)

| Evento | O que foi | Ano |
|---|---|---|
| Pedro Leopoldo Rodeio Show | Cobertura médica | 2010, 2011, 2012 e 2013 |
| Minas Trend Preview | Cobertura médica | 2014 |
| Mostra das Profissões — UFMG | Cobertura médica | ⚠️ |
| Balanço Geral — Rede Record | Cobertura médica | ⚠️ |
| Jogos em Sete Lagoas | Cobertura | ⚠️ |
| Equipo Mining | Feira de mineração ("a maior da América Latina") | ⚠️ |
| AgroZ — Leilão de Nelore, Uberaba | Cobertura | ⚠️ |
| Pedalando no Topo | Ciclismo indoor nas montanhas de Minas | ⚠️ |

Mostrar o ano mais recente com honestidade ("desde 2010 cobrindo eventos em Minas") e pedir ao cliente os
eventos de 2015 em diante.

## 13. Clientes (logos do site atual) — ⚠️ só entram os confirmados

Amil · Unimed BH · Unimed Rio · Medial Saúde · Cassi · Socor · Mater Dei · Felício Rocho · Hospital Belo
Horizonte · Hospital da Baleia · Aterpa · Clinemge · Fiat · Volkswagen · Mercedes-Benz · Mitsubishi · Pirelli ·
Nestlé · Magazine Luiza · Ricardo Eletro · BAND · Record · UFMG · SESI · BRMALLS · Shopping Del Rey ·
Shopping Center Sete Lagoas · Diante do Trono · Azul Linhas Aéreas.

## 14. O que pedir ao cliente antes de publicar (resumo)

1. CNPJ e licenças que podem aparecer.
2. WhatsApp oficial e quem atende cada canal.
3. Frota atual (modelos, quantidades) e **fotos atuais** das viaturas, da equipe uniformizada e da Central.
4. Lista de clientes que podem aparecer; depoimentos que ainda valem; eventos desde 2015.
5. Cidades atendidas e tempo de resposta por região (se quiserem publicar).
6. Regra de uso de sirene, uniforme/crachá e treinamento contínuo (para a seção "Conduta").
7. Locação: com ou sem equipe. Área protegida: modalidades. Eventos: mínimo e modalidades.
8. Ano de fundação e marcos (para "Sobre").
9. Autorização para citar avaliações do Google.

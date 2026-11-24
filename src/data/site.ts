// Conteúdo do site inteiro, em um lugar só. Fonte: docs/conteudo/copy-v1.md (mesclada na dev),
// reescrita a partir de docs/conteudo-atual/textos-site-2011.txt.
//
// Regras de voz (AGENTS.md §3): fato concreto no lugar de adjetivo; "você"; frases curtas;
// emergência é uma seção, não o tom. Nunca inventar número, credencial, depoimento ou cliente.
//
// Versão de apresentação (decisão da pessoa, 2026-11-24): vale tudo que o site atual publica
// (endereço, 3 fixos, e-mails por setor, serviços, equipamentos, frota citada, depoimentos com
// nome e cargo, eventos com ano e a lista de clientes). Frases que a copy v1 marcava com ⚠️ e que
// o texto de 2011 não publica foram trocadas por fatos publicados ou por frases genéricas.
// O que é provisório ou ausente está em docs/PENDENCIAS.md. Resumo:
//   1. WhatsApp: (31) 7818-7838 é público na página de APH como telefone da central; usar como
//      WhatsApp é PROVISÓRIO, a confirmar (wa.me/553178187838).
//   2. CNPJ: null. Não renderizar enquanto for null.
//   3. Fotos: só as miniaturas públicas do portfólio de eventos e os logos de clientes
//      (public/imagens/); viaturas e equipe são ilustração SVG própria. Fotos atuais: pendência.
//   4. Frota citada é a de 2011 (modelos publicados); frota atual: pendência.
//   5. História: só "cobrimos eventos desde 2010" (fato do portfólio). Sem ano de fundação.
//   6. Nunca: credencial específica, convênio aceito, preço, tempo de resposta em minutos,
//      depoimento novo, cliente novo.

export type IllustrationKey =
  | 'uti'
  | 'basico'
  | 'domiciliar'
  | 'remocao'
  | 'eventos'
  | 'locacao'
  | 'protegida'
  | 'ambulatorios'
  | 'telefone'
  | 'triagem'
  | 'destino';

export type Block =
  | {
      type: 'prose';
      heading: string;
      id?: string;
      paragraphs?: string[];
      list?: string[];
      note?: string;
      /** Opcionais em fichas (locação), em vez de uma frase separada por pontos. */
      chips?: string[];
    }
  | {
      type: 'compare';
      heading: string;
      id?: string;
      intro?: string;
      columns: [string, string];
      rows: { label: string; a: string; b: string }[];
    }
  | {
      type: 'steps';
      heading: string;
      id?: string;
      intro?: string;
      steps: { title: string; text: string }[];
    }
  | {
      type: 'list';
      heading: string;
      id?: string;
      intro?: string;
      items: { title: string; text: string }[];
    }
  | {
      type: 'channels';
      heading: string;
      id?: string;
      rows: { label: string; value: string; href?: string }[];
    }
  | { type: 'events'; heading: string; id?: string };

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  nav: string;
  title: string;
  lede: string;
  illustration: IllustrationKey;
  seoTitle: string;
  description: string;
  h1: string;
  intro: string;
  read: string;
  /** Assunto da mensagem pré-preenchida do WhatsApp desta página ("preciso de …"). */
  wa: string;
  blocks: Block[];
  faq: Faq[];
  cta: { label: string; href: string }[];
};

export const site = {
  name: 'Ouromed',
  legalName: 'Ouromed, Serviço Móvel de Saúde Ltda.',
  tagline: 'Padrão ouro em saúde móvel',
  url: 'https://ouromedbh.com.br',
  description:
    'Ambulância UTI móvel, atendimento domiciliar, remoção de pacientes e cobertura médica de eventos em BH e todo o Brasil. Central 24 h com triagem médica.',
  phones: {
    display: '(31) 3786-1506',
    tel: '+553137861506',
    all: ['(31) 3786-1506', '(31) 4103-5452', '(31) 3786-7112'],
    allTel: ['+553137861506', '+553141035452', '+553137867112'],
  },
  // ⚠️ Provisório, a confirmar: (31) 7818-7838 é público na página de APH como telefone da central
  // para triagem; o site novo usa o número como WhatsApp até o cliente confirmar o oficial.
  whatsapp: { display: '(31) 7818-7838', href: 'https://wa.me/553178187838', provisional: true },
  // Ausente no site atual: null até o cliente enviar. Não renderizar enquanto for null.
  cnpj: null as string | null,
  emails: {
    agendamento: 'agendamento@ouromedbh.com.br',
    eventos: 'luciano@ouromedbh.com.br',
    diretoria: 'diretoria@ouromedbh.com.br',
  },
  address: {
    street: 'Rua Senador Lúcio Bittencourt, 53',
    district: 'Carlos Prates',
    city: 'Belo Horizonte',
    state: 'MG',
    zip: 'CEP 30710-070',
    maps: 'https://www.google.com/maps/search/?api=1&query=Ouromed+Servi%C3%83o+M%C3%B3vel+de+Sa%C3%BAde+Rua+Senador+L%C3%BAcio+Bittencourt+53+Belo+Horizonte',
    // Incorporado do Google Maps (sem chave): busca pelo endereço.
    embed:
      'https://www.google.com/maps?q=Rua+Senador+L%C3%BAcio+Bittencourt+53,+Belo+Horizonte&output=embed',
  },
  // Ficha no Google: 3,6 em 25 avaliações, não reivindicada. Link de avaliação depende do place id.
  googleReview:
    'https://www.google.com/maps/search/?api=1&query=Ouromed+Servi%C3%83o+M%C3%B3vel+de+Sa%C3%BAde+Belo+Horizonte',
  emergency: { label: 'Em caso de emergência, ligue 192 (SAMU).', tel: 'tel:192' },
  ads: { id: 'AW-955189289' },
  trust: [
    'Central 24 h com triagem médica',
    'Motoristas com COVE',
    'Fundada por médicos de urgência',
  ],
  // O que a hero diz em 3 s: o que é, para quem, onde. O telefone está no botão.
  lede: 'Ambulância UTI móvel, médico em casa e remoção de pacientes. Para famílias, hospitais, home cares e eventos, em Belo Horizonte e todo o Brasil.',
  // Único fato de história publicado: o evento mais antigo do portfólio.
  since: 'Cobrimos eventos desde 2010',
};

const equipeAvancada = 'Equipe de médicos, enfermagem e socorristas treinados da Ouromed.';

/** Texto alternativo das ilustrações (imagem de conteúdo: descreve o que se vê). */
export const illustrationAlt: Record<IllustrationKey, string> = {
  uti: 'Ambulância UTI móvel da Ouromed, de perfil, com a faixa ouro e a barra de luz',
  basico: 'Ambulância de suporte básico da Ouromed, de perfil, com a faixa ouro',
  locacao: 'Ambulância 4×4 para locação, de perfil, com a faixa ouro',
  domiciliar: 'Casa com bolsa médica ao lado: atendimento domiciliar',
  remocao: 'Cadeira de rodas sobre a via: remoção de pacientes',
  eventos: 'Tenda de evento com bandeirolas e cruz médica',
  protegida: 'Prédio cercado por área tracejada e escudo com cruz',
  ambulatorios: 'Ambulatório com porta e capacete de obra ao lado',
  telefone: 'Telefone com a central: ondas de chamada dos dois lados',
  triagem: 'Headset da triagem médica com a cabeça tracejada de quem ligou',
  destino: 'Hospital com cruz na fachada, o destino do atendimento',
};

export const services: Service[] = [
  {
    slug: 'ambulancia',
    nav: 'Ambulância e UTI móvel',
    title: 'Ambulância e UTI móvel',
    lede: 'Suporte básico e UTI móvel com equipe médica própria. Para exames, transferências e emergências.',
    illustration: 'uti',
    seoTitle: 'Ambulância UTI móvel e suporte básico em Belo Horizonte',
    description:
      'Ambulância UTI móvel com equipe médica própria, e suporte básico para exames e transferências em BH e todo o Brasil. Central 24 h: (31) 3786-1506.',
    h1: 'Ambulância UTI móvel e suporte básico, com equipe própria',
    intro:
      'Duas categorias de viatura, uma só equipe. A triagem médica da Central decide qual é a certa para o seu caso.',
    read: 'Central 24 h · triagem médica',
    wa: 'uma ambulância UTI móvel ou de suporte básico',
    blocks: [
      {
        type: 'compare',
        heading: 'Suporte básico ou UTI móvel',
        intro: 'O que muda de uma para a outra é o que o paciente precisa durante o caminho.',
        columns: ['Suporte básico', 'UTI móvel'],
        rows: [
          {
            label: 'Para quê',
            a: 'Transporte de paciente estável: exames, consultas, alta, transferência sem risco.',
            b: 'Paciente que precisa de suporte avançado durante o trajeto.',
          },
          { label: 'Equipe', a: 'Socorristas treinados e motorista com COVE.', b: equipeAvancada },
          {
            label: 'Equipamento',
            a: 'Oxigênio, maca retrátil, pranchas de imobilização.',
            b: 'Respirador pulmonar, bombas de infusão, cardioversor com ECG digital, oxigênio fixo e portátil, oxímetro, incubadora de transporte de recém-nascidos.',
          },
        ],
      },
      {
        type: 'prose',
        heading: 'O que leva numa UTI móvel da Ouromed',
        paragraphs: [
          'Ventilador pulmonar · Bombas de infusão · Cardioversor com eletrocardiografia digital · Sistema de oxigenação fixo e portátil · Oxímetro digital · Incubadora de transporte de recém-nascidos · Maca retrátil · Cadeira de resgate tamanho especial · Suporte de soroterapia · Pranchas de imobilização em polietileno, adequadas para levar o paciente a exames de ressonância magnética.',
          'Colchão das macas e revestimento macio dos bancos: viagens longas sem dor. Equipamentos com calibração periódica.',
        ],
      },
      {
        type: 'prose',
        heading: 'Viaturas',
        paragraphs: [
          'Mercedes-Benz Sprinter 313 CDI, Ford Transit, Renault Master, Fiat Ducato e Land Rover Defender 4×4: confortáveis e espaçosas, montadas para UTI móvel.',
        ],
        note: 'Frota publicada pela Ouromed; a lista atual é confirmada na contratação.',
      },
      {
        type: 'list',
        heading: 'Quando chamar cada uma',
        items: [
          {
            title: 'Suporte básico',
            text: 'Alta hospitalar de paciente estável, ida a exame, consulta, retorno para casa.',
          },
          {
            title: 'UTI móvel',
            text: 'Paciente dependente de respirador ou medicação contínua, transferência entre hospitais, neonatal, viagens longas.',
          },
          {
            title: 'Emergência',
            text: 'Ligue 192 (SAMU) ou para a Central 24 h da Ouromed: a triagem orienta.',
          },
        ],
      },
      {
        type: 'prose',
        heading: 'Para quem',
        paragraphs: [
          'Famílias, hospitais e clínicas, e empresas de home care que precisam de uma equipe de urgência como parceira.',
        ],
      },
    ],
    faq: [
      {
        q: 'Levam paciente para ressonância?',
        a: 'Sim. As pranchas de imobilização são de polietileno, adequadas a exames de ressonância magnética.',
      },
      {
        q: 'A UTI móvel tem médico?',
        a: 'Sim: equipe de médicos, enfermagem e socorristas treinados da Ouromed, com equipamento de suporte avançado a bordo.',
      },
      {
        q: 'Atendem bebês?',
        a: 'Sim. Incubadora de transporte de recém-nascidos e equipe de neonatologia.',
      },
      {
        q: 'Fazem viagem para outro estado?',
        a: 'Sim, em todo o território nacional mediante agendamento.',
      },
    ],
    cta: [{ label: 'Ligar para a Central 24 h', href: 'tel:+553137861506' }],
  },
  {
    slug: 'atendimento-domiciliar',
    nav: 'Atendimento domiciliar',
    title: 'Atendimento domiciliar',
    lede: 'Médico e enfermagem em casa, com alta resolutividade e menos idas ao hospital.',
    illustration: 'domiciliar',
    seoTitle: 'Atendimento médico domiciliar em Belo Horizonte',
    description:
      'Médico e enfermagem em casa em Belo Horizonte: atendimento pré-hospitalar (APH) para particulares e empresas de home care, com triagem pela Central 24 h.',
    h1: 'Atendimento médico em casa, com a resolutividade de uma equipe de urgência',
    intro:
      'A Ouromed nasceu do atendimento de urgência e emergência. É essa experiência que chega à sua porta: médico em casa, com a resolutividade de quem vive urgência. Em casa, quando dá para ficar em casa.',
    read: 'APH · particulares e home care',
    wa: 'atendimento médico em casa',
    blocks: [
      {
        type: 'prose',
        heading: 'O que é o APH',
        paragraphs: [
          'Atendimento Pré-Hospitalar: o cuidado que chega antes do hospital. Para pacientes particulares e para empresas de home care que precisam de uma equipe de urgência como parceira.',
        ],
      },
      {
        type: 'prose',
        heading: 'Alta resolutividade em casa',
        paragraphs: [
          'A Ouromed presta atendimento médico domiciliar obtendo alta resolutividade em casa e baixa remoção hospitalar. Quem chega é médico, com o equipamento que o caso pede.',
        ],
      },
      {
        type: 'steps',
        heading: 'Como funciona',
        steps: [
          {
            title: 'Você liga para a Central 24 h',
            text: 'Uma triagem médica decide o que o caso precisa.',
          },
          {
            title: 'Médico e enfermagem vão até você',
            text: 'Em casa, com o equipamento que o caso pede.',
          },
          {
            title: 'Se o caso pedir hospital, a Ouromed faz a remoção',
            text: 'Suporte básico ou UTI móvel, 24 horas por dia.',
          },
        ],
      },
      {
        type: 'prose',
        heading: 'Para quem',
        list: [
          'Idosos e pacientes acamados, com equipe de geriatria e gerontologia.',
          'Crianças e recém-nascidos, com pediatria e neonatologia.',
          'Pacientes em home care e empresas de home care que querem uma parceira de urgência.',
        ],
      },
    ],
    faq: [
      {
        q: 'Fazem atendimento para empresas de home care?',
        a: 'Sim, é um dos serviços principais da Ouromed.',
      },
      {
        q: 'Atendem idosos acamados?',
        a: 'Sim. Há equipe de geriatria e gerontologia para o atendimento ao idoso.',
      },
      {
        q: 'A equipe leva equipamento de urgência?',
        a: 'Sim. O atendimento é feito por uma equipe de urgência, com o equipamento que o caso pede.',
      },
    ],
    cta: [{ label: 'Ligar para a Central 24 h', href: 'tel:+553137861506' }],
  },
  {
    slug: 'remocao',
    nav: 'Remoção de pacientes',
    title: 'Remoção de pacientes',
    lede: 'Alta hospitalar, transferência entre hospitais e viagem entre estados: adulto, pediátrico, neonatal e psiquiátrico, 24 h.',
    illustration: 'remocao',
    seoTitle: 'Remoção de pacientes em BH e todo o Brasil',
    description:
      'Remoção de pacientes adulto, pediátrico, neonatal e psiquiátrico, 24 h, com UTI móvel e equipe própria, em BH e todo o Brasil. Ligue (31) 3786-1506.',
    h1: 'Remoção de pacientes, da alta hospitalar à viagem entre estados',
    intro:
      'Cada remoção começa com uma pergunta: o que esse paciente precisa durante o caminho? A resposta define a viatura, a equipe e o equipamento.',
    read: '24 h · todo o Brasil',
    wa: 'uma remoção de pacientes',
    blocks: [
      {
        type: 'list',
        heading: 'Tipos de remoção',
        items: [
          {
            title: 'Alta hospitalar',
            text: 'Do hospital para casa, com o cuidado que o paciente ainda precisa no trajeto.',
          },
          {
            title: 'Transferência entre hospitais',
            text: 'Suporte básico ou UTI móvel conforme o caso.',
          },
          { title: 'Entre cidades e estados', text: 'Em todo o Brasil, mediante agendamento.' },
          {
            title: 'Pediátrica e neonatal',
            text: 'Incubadora de transporte, equipe de pediatria e neonatologia.',
          },
          { title: 'Psiquiátrica', text: 'Equipe treinada para o transporte seguro.' },
        ],
      },
      {
        type: 'steps',
        heading: 'Como funciona, passo a passo',
        steps: [
          {
            title: 'Ligue para a Central 24 h',
            text: 'Ou escreva para agendamento@ouromedbh.com.br.',
          },
          { title: 'Triagem médica', text: 'Avalia o paciente e o trecho.' },
          {
            title: 'Viatura e equipe',
            text: 'Suporte básico ou UTI móvel, com a equipe que o caso pede.',
          },
          {
            title: 'Equipamentos calibrados',
            text: 'Pranchas adequadas a ressonância, cadeira de resgate tamanho especial.',
          },
          {
            title: 'Destino e entrega',
            text: 'O cuidado se mantém até o paciente estar onde deveria estar.',
          },
        ],
      },
      {
        type: 'prose',
        heading: 'Conforto no caminho',
        paragraphs: [
          'Macas com colchão, bancos com revestimento macio. Viagens longas não precisam doer.',
        ],
      },
    ],
    faq: [
      {
        q: 'Fazem remoção para outro estado?',
        a: 'Sim, em todo o território nacional mediante agendamento.',
      },
      {
        q: 'Levam paciente cadeirante ou com obesidade?',
        a: 'Sim: cadeira de resgate tamanho especial e pranchas adequadas.',
      },
      {
        q: 'Têm incubadora para recém-nascido?',
        a: 'Sim: incubadora de transporte de recém-nascidos.',
      },
    ],
    cta: [
      { label: 'Ligar para a Central 24 h', href: 'tel:+553137861506' },
      { label: 'Agendar por e-mail', href: 'mailto:agendamento@ouromedbh.com.br' },
    ],
  },
  {
    slug: 'eventos',
    nav: 'Cobertura de eventos',
    title: 'Cobertura de festas e eventos',
    lede: 'Ambulância, ambulatório montado e equipe para qualquer porte, em todo o Brasil.',
    illustration: 'eventos',
    seoTitle: 'Ambulância e médico para eventos em BH e todo o Brasil',
    description:
      'Cobertura médica para congressos, shows, casamentos, formaturas, rodeios e feiras: ambulância, ambulatório montado e equipe de suporte básico e avançado.',
    h1: 'Cobertura médica para o seu evento, do casamento ao congresso',
    intro:
      'A Ouromed leva o suporte adequado ao porte do evento: uma ambulância, um ambulatório montado no local, ou uma equipe completa. Em Minas ou em qualquer estado do Brasil.',
    read: 'Desde 2010 · todo o Brasil',
    wa: 'cobertura médica para um evento',
    blocks: [
      {
        type: 'list',
        heading: 'O que a Ouromed leva',
        items: [
          {
            title: 'Ambulância em posição',
            text: 'Suporte básico ou UTI móvel, conforme o porte e o risco do evento.',
          },
          {
            title: 'Ambulatório médico no local',
            text: 'Macas, desfibriladores, cadeiras de rodas e os medicamentos necessários para o pronto socorro.',
          },
          {
            title: 'Equipe de suporte básico e avançado',
            text: 'Equipe da Ouromed, com material médico-hospitalar suficiente para qualquer pessoa que precise.',
          },
          {
            title: 'Todo o território nacional',
            text: 'Eventos em qualquer estado, mediante agendamento.',
          },
        ],
      },
      {
        type: 'prose',
        heading: 'Para que tipo de evento',
        paragraphs: [
          'Congressos, feiras empresariais, shows e festivais, casamentos e formaturas, rodeios, funerais, comboios VIP e competições esportivas.',
        ],
      },
      { type: 'events', heading: 'Eventos que a Ouromed já cobriu' },
    ],
    faq: [
      {
        q: 'Fazem eventos fora de Belo Horizonte?',
        a: 'Sim, em todo o Brasil mediante agendamento.',
      },
      {
        q: 'Montam ambulatório no local?',
        a: 'Sim, com macas, desfibriladores, cadeiras de rodas e medicamentos de pronto socorro.',
      },
      {
        q: 'Qual o porte de evento?',
        a: 'De casamento a congresso e feira. A Ouromed dimensiona a equipe e a viatura para o porte.',
      },
    ],
    cta: [
      {
        label: 'Pedir orçamento',
        href: 'mailto:luciano@ouromedbh.com.br?subject=Or%C3%A7amento%20de%20cobertura%20m%C3%A9dica%20para%20evento',
      },
      { label: 'Ligar para a Central 24 h', href: 'tel:+553137861506' },
    ],
  },
  {
    slug: 'locacao-de-ambulancias',
    nav: 'Locação de ambulâncias',
    title: 'Locação de ambulâncias',
    lede: 'Viaturas 4×2 e 4×4 para mineradoras, obras, shoppings e empresas.',
    illustration: 'locacao',
    seoTitle: 'Locação de ambulâncias 4×2 e 4×4 para empresas',
    description:
      'Locação de ambulâncias para mineradoras, construção civil, shoppings e empresas: furgões 4×2 e 4×4, com equipamentos médicos e telemetria. Fale com a Ouromed.',
    h1: 'Locação de ambulâncias para quem não pode parar',
    intro:
      'Mineração, siderurgia, construção civil, shoppings: operações em que a ambulância faz parte do planejamento de segurança. A Ouromed fornece a viatura certa, com os opcionais que a sua operação exige.',
    read: '4×2 e 4×4 · normas ABNT e Star of Life',
    wa: 'locar uma ambulância',
    blocks: [
      {
        type: 'prose',
        heading: 'Viaturas e opcionais',
        chips: [
          'Tração 4×2',
          'Tração 4×4',
          'Furgão pequeno',
          'Furgão grande',
          'Ar-condicionado',
          'Freios ABS',
          'Airbag',
          'Tacógrafo digital',
          'Telemetria',
          'Equipamentos médicos',
        ],
        paragraphs: [
          'Viaturas dentro das especificações da ABNT e da norma federal norte-americana para veículos de emergência (Star of Life), com dispositivos de segurança exigidos por empresas dos setores hospitalar, de mineração, siderúrgico, industrial, petroquímico e desportivo.',
        ],
      },
      {
        type: 'list',
        heading: 'Para quem',
        items: [
          {
            title: 'Mineradoras e siderúrgicas',
            text: 'Viaturas 4×4 e dispositivos de segurança exigidos pelo setor.',
          },
          { title: 'Construção civil', text: 'Ambulância na obra e posto médico itinerante.' },
          {
            title: 'Shoppings e empresas',
            text: 'Ambulância locada com os equipamentos médicos que a operação exige.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'Locam para fora de Belo Horizonte?',
        a: 'Sim. Fale com a equipe de locação pelo e-mail luciano@ouromedbh.com.br ou pelo telefone (31) 3786-1506.',
      },
      {
        q: 'A viatura vem equipada?',
        a: 'Sim: os equipamentos médicos são definidos conforme a necessidade da operação.',
      },
    ],
    cta: [
      {
        label: 'Falar sobre locação',
        href: 'mailto:luciano@ouromedbh.com.br?subject=Loca%C3%A7%C3%A3o%20de%20ambul%C3%A2ncia',
      },
      { label: 'Ligar para a Central 24 h', href: 'tel:+553137861506' },
    ],
  },
  {
    slug: 'area-protegida',
    nav: 'Área protegida',
    title: 'Área protegida',
    lede: 'Contrato de urgência para empresas, shoppings, escolas e condomínios: você aciona, a equipe vai até você.',
    illustration: 'protegida',
    seoTitle: 'Área protegida: urgência para empresas e condomínios',
    description:
      'Área protegida Ouromed: sua empresa, shopping, escola ou condomínio aciona a Central e recebe uma equipe de urgência no local, após triagem médica.',
    h1: 'Área protegida: a equipe de urgência a uma ligação do seu negócio',
    intro:
      'Clubes, shoppings, colégios, faculdades, condomínios, empresas, clínicas de exames e laboratórios já aderiram. Em uma intercorrência com cliente ou funcionário, você aciona a Central e a equipe vai até você.',
    read: 'Para empresas e condomínios',
    wa: 'informações sobre área protegida',
    blocks: [
      {
        type: 'steps',
        heading: 'Como funciona',
        steps: [
          {
            title: 'Contrato de área protegida',
            text: 'Sua empresa, shopping, escola ou condomínio passa a ter a Ouromed de plantão.',
          },
          {
            title: 'Você aciona a Central 24 h',
            text: 'Triagem médica avalia a urgência pelo telefone.',
          },
          {
            title: 'Uma equipe se desloca imediatamente',
            text: 'Atendimento no local, com a equipe que o caso pede.',
          },
        ],
      },
      {
        type: 'prose',
        heading: 'Para quem',
        list: [
          'Shoppings e clubes.',
          'Colégios e faculdades.',
          'Condomínios.',
          'Empresas, clínicas de exames e laboratórios.',
        ],
      },
      {
        type: 'prose',
        heading: 'Por que contratar',
        paragraphs: [
          'Em caso de intercorrência com seu cliente ou funcionário, a Ouromed está pronta para atender sem que a sua equipe precise decidir sozinha para onde levar, com qual viatura e com qual equipe.',
        ],
      },
    ],
    faq: [
      {
        q: 'Como funciona o acionamento?',
        a: 'Pela Central 24 h. A triagem médica avalia a urgência e desloca uma equipe até o local.',
      },
      {
        q: 'Serve para condomínios residenciais?',
        a: 'Sim. Condomínios estão entre os que já aderiram ao serviço.',
      },
    ],
    cta: [
      {
        label: 'Falar com a diretoria',
        href: 'mailto:diretoria@ouromedbh.com.br?subject=%C3%81rea%20protegida',
      },
      { label: 'Ligar para a Central 24 h', href: 'tel:+553137861506' },
    ],
  },
  {
    slug: 'ambulatorios',
    nav: 'Ambulatórios',
    title: 'Ambulatórios em obras e empresas',
    lede: 'Posto médico itinerante em obras e ambulatórios dentro de empresas e hotéis.',
    illustration: 'ambulatorios',
    seoTitle: 'Ambulatórios em obras e empresas',
    description:
      'Posto médico itinerante em obras e ambulatórios montados em empresas, hotéis e shoppings, com equipe e equipamentos. Ouromed, Belo Horizonte.',
    h1: 'Ambulatório onde a sua operação está',
    intro:
      'Obras, empresas, hotéis e shoppings: a Ouromed monta o posto médico e coloca a equipe, com a infraestrutura que o local exige.',
    read: 'Obras, empresas, hotéis e shoppings',
    wa: 'informações sobre ambulatórios',
    blocks: [
      {
        type: 'prose',
        heading: 'O que a Ouromed monta',
        paragraphs: [
          'Posto médico itinerante em obras. Ambulatórios em empresas, hotéis e shoppings, com toda a infraestrutura necessária e pessoal capacitado.',
          'Os ambulatórios podem ser equipados com cardioversor com desfibrilador e monitor cardíaco digital, oxímetros, glicosímetro, macas, cadeiras de rodas, armários de medicamentos, sofás, televisores e computadores.',
        ],
      },
      {
        type: 'list',
        heading: 'Onde',
        items: [
          { title: 'Obras', text: 'Posto médico itinerante que acompanha a frente de trabalho.' },
          { title: 'Empresas', text: 'Ambulatório dentro da operação, com equipe da Ouromed.' },
          {
            title: 'Hotéis e shoppings',
            text: 'Atendimento de pronto socorro para clientes e colaboradores.',
          },
        ],
      },
    ],
    faq: [
      {
        q: 'A equipe é da Ouromed?',
        a: 'Sim. A Ouromed monta o ambulatório e coloca a equipe, com pessoal capacitado.',
      },
      {
        q: 'O posto médico acompanha a obra?',
        a: 'Sim, é itinerante: vai para onde a frente de trabalho está.',
      },
    ],
    cta: [
      {
        label: 'Falar com a diretoria',
        href: 'mailto:diretoria@ouromedbh.com.br?subject=Ambulat%C3%B3rios',
      },
      { label: 'Ligar para a Central 24 h', href: 'tel:+553137861506' },
    ],
  },
];

export const howItWorks = {
  heading: 'Como funciona, do telefonema ao destino',
  lede: 'Todo atendimento começa igual: uma ligação, uma triagem médica, uma viatura. O que muda é o que o paciente precisa no caminho.',
  // `station` é o rótulo curto da estação no palco; `glyph` o pictograma (Icons.tsx).
  steps: [
    {
      title: 'Você liga',
      text: 'Atendente identifica o caso e passa para a triagem médica.',
      station: 'Ligação',
      glyph: 'phone',
    },
    {
      title: 'A triagem decide',
      text: 'Suporte básico ou UTI móvel, com a equipe que o caso pede.',
      station: 'Triagem',
      glyph: 'headset',
    },
    {
      title: 'A equipe sai',
      text: 'Equipamentos calibrados, motorista com COVE. Chega, estabiliza e transporta.',
      station: 'Equipe',
      glyph: 'cross',
    },
    {
      title: 'Você acompanha',
      text: 'Até o destino: alta em casa, transferência entre hospitais ou entre estados.',
      station: 'Destino',
      glyph: 'house',
    },
  ] as {
    title: string;
    text: string;
    station: string;
    glyph: 'phone' | 'headset' | 'cross' | 'house';
  }[],
};

export const coverage = {
  heading: 'Belo Horizonte hoje, o Brasil quando você precisar',
  text: 'Central 24 horas por dia em Belo Horizonte. Remoções e eventos em qualquer estado, mediante agendamento.',
  facts: [
    { value: '24 h', label: 'Central com triagem médica, todos os dias' },
    { value: '7', label: 'frentes de serviço, uma só equipe' },
    { value: 'COVE', label: 'capacitação de todos os motoristas, exigida pelo CONTRAN' },
    { value: '2010', label: 'primeiro evento coberto no portfólio da Ouromed' },
  ],
  // Equipamento publicado pela Ouromed para a UTI móvel (texto do site atual).
  kit: {
    heading: 'O que leva numa UTI móvel',
    items: [
      'Ventilador pulmonar',
      'Bombas de infusão',
      'Cardioversor com ECG digital',
      'Oxigênio fixo e portátil',
      'Oxímetro digital',
      'Incubadora de transporte',
      'Maca retrátil',
      'Pranchas para ressonância',
    ],
  },
};

/** Honestidade: quando cada um é o caminho. Sem preço e sem convênio nomeado (nada disso é
 *  publicado pela Ouromed; a regra de cada plano é com o plano). */
export const honesty = {
  heading: 'Ouromed, SAMU 192 ou convênio?',
  lede: 'Três caminhos diferentes. Escolher o certo economiza o tempo que mais importa.',
  items: [
    {
      title: 'SAMU 192',
      tag: 'emergência',
      text: 'Risco de vida imediato: infarto, acidente grave, falta de ar. É o serviço público e gratuito. Ligue 192.',
      href: 'tel:192',
      cta: 'Ligar 192',
    },
    {
      title: 'Ouromed',
      tag: 'transporte médico',
      text: 'Remoção, alta, transferência, UTI móvel, evento ou viagem: particular, 24 h, com triagem médica pela Central. Em todo o Brasil mediante agendamento.',
      href: `tel:${site.phones.tel}`,
      cta: `Ligar ${site.phones.display}`,
    },
    {
      title: 'Convênio',
      tag: 'cobertura',
      text: 'Cada plano tem regra própria para transporte médico. Confirme a cobertura com o seu plano; a Central da Ouromed orienta a viatura certa para o caso.',
      href: '/contato',
      cta: 'Tirar dúvida',
    },
  ],
};

// Cada item é uma regra publicada pela própria Ouromed em 2011 (checável no texto do site atual).
export const conduct = {
  heading: 'Segurança começa antes do atendimento',
  lede: 'O que a Ouromed faz de verdade, e não o que ela promete. Cada item é uma regra da casa, checável.',
  items: [
    {
      reading: 'COVE',
      text: 'Todo motorista tem a capacitação COVE, Condutor de Veículo de Emergência exigida pelo CONTRAN, além de treinamento de socorrista.',
    },
    {
      reading: 'Equipe',
      text: 'Médicos, enfermagem e socorristas treinados, próprios da Ouromed, com equipes de geriatria e gerontologia, pediatria e neonatologia.',
    },
    {
      reading: '24 h',
      text: 'Remoções de pacientes adulto, pediátrico, neonatal e psiquiátrico 24 horas por dia, com equipes treinadas.',
    },
    {
      reading: 'Calibração',
      text: 'Equipamentos submetidos a padrões de calibração periódicos, com aferição para ganho de tempo e pontualidade.',
    },
    {
      reading: 'Norma',
      text: 'Viaturas dentro das especificações da ABNT e da norma federal norte-americana para veículos de emergência (Star of Life).',
    },
    {
      reading: 'Material',
      text: 'Materiais com tratamento antibacteriano e resistentes a fungos e umidade.',
    },
  ],
};

export const testimonials = [
  {
    quote:
      'Nossa parceria com a Ouromed fortalece a cada ano. A equipe de profissionais são excepcionais e nos passa muita tranquilidade, pois prestam serviço de alta qualidade, responsabilidade e total respeito com o público do nosso evento.',
    case: {
      need: 'Cobertura médica do Pedro Leopoldo Rodeio Show, evento de grande público.',
      setup: 'Ambulância em posição e equipe de suporte, quatro anos seguidos (2010 a 2013).',
      result: 'Parceira que voltou a chamar a Ouromed a cada ano, segundo a Rope Eventos.',
    },
    name: 'Tiago de Brito',
    role: 'Rope Eventos, Pedro Leopoldo Rodeio Show',
  },
  {
    quote:
      'A Ouromed é parceira do Shopping Del Rey desde agosto de 2011. Pelo que temos de experiência, acreditamos ter acertado na escolha pela Ouromed, pois, em todos os momentos emergenciais vividos em nosso shopping desde a sua chegada, o atendimento tem sido ágil e perfeito, trazendo também comodidade e conforto aos nossos clientes.',
    case: {
      need: 'Urgência com clientes e funcionários dentro do shopping, sem equipe própria para decidir.',
      setup:
        'Área protegida: a Central 24 h recebe o acionamento, faz a triagem e desloca uma equipe.',
      result:
        'Parceria desde agosto de 2011; "atendimento ágil e perfeito", nas palavras da segurança do shopping.',
    },
    name: 'Henrique Freitas',
    role: 'Coordenador de Segurança do Shopping Del Rey',
  },
  {
    quote:
      'A Ouromed oferece uma super estrutura de atendimento de urgência e emergência em eventos e nos atenderam muito bem em Diamantina, MG, durante as gravações da minissérie Rei Davi. Ficamos tranquilos quando sabemos que as UTIs e equipes Ouromed estão presentes em nossas gravações.',
    case: {
      need: 'Suporte de urgência e emergência nas gravações da minissérie Rei Davi, em Diamantina.',
      setup: 'UTIs móveis e equipes da Ouromed presentes nas gravações.',
      result:
        '"Ficamos tranquilos quando sabemos que as UTIs e equipes Ouromed estão presentes", segundo a produção.',
    },
    name: 'Tatiana Duarte',
    role: 'Coordenadora de Produção, Rede Record de Televisão',
  },
];

export type Event = {
  name: string;
  what: string;
  year: string;
  image: string;
  kind: 'foto' | 'logo';
  alt: string;
};

// Portfólio publicado pela Ouromed (miniaturas do site atual). O ano só aparece onde é público.
export const events: Event[] = [
  {
    name: 'Pedro Leopoldo Rodeio Show',
    what: 'Cobertura médica',
    year: '2010 a 2013',
    image: '/imagens/eventos/pedro-leopoldo-rodeio-show.jpg',
    kind: 'foto',
    alt: 'Arena de rodeio iluminada à noite, com tendas brancas e o público ao longe',
  },
  {
    name: 'Minas Trend Preview',
    what: 'Cobertura médica',
    year: '2014',
    image: '/imagens/eventos/minas-trend-preview.jpg',
    kind: 'logo',
    alt: 'Logotipo Minas Trend Preview em letras brancas sobre fundo preto',
  },
  {
    name: 'Mostra das Profissões, UFMG',
    what: 'Cobertura médica',
    year: '2010',
    image: '/imagens/eventos/mostra-das-profissoes-ufmg.jpg',
    kind: 'logo',
    alt: 'Logotipo da Mostra das Profissões da UFMG 2010, em letras coloridas',
  },
  {
    name: 'Balanço Geral, Rede Record',
    what: 'Cobertura médica',
    year: '',
    image: '/imagens/eventos/balanco-geral-record.jpg',
    kind: 'logo',
    alt: 'Logotipo do programa Balanço Geral em letras azuis com detalhes laranja',
  },
  {
    name: 'Jogos em Sete Lagoas',
    what: 'Cobertura',
    year: '',
    image: '/imagens/eventos/arena-do-jacare.jpg',
    kind: 'foto',
    alt: 'Arena do Jacaré lotada em dia de jogo, em Sete Lagoas',
  },
  {
    name: 'Equipo Mining',
    what: 'Feira de mineração',
    year: '',
    image: '/imagens/eventos/equipo-mining.jpg',
    kind: 'foto',
    alt: 'Máquinas de mineração iluminadas por refletores em feira à noite',
  },
  {
    name: 'AgroZ, leilão de Nelore em Uberaba',
    what: 'Cobertura',
    year: '',
    image: '/imagens/eventos/agroz.jpg',
    kind: 'foto',
    alt: 'Fachada iluminada com o logotipo Agroz à noite',
  },
  {
    name: 'Pedalando no Topo',
    what: 'Ciclismo indoor nas montanhas de Minas',
    year: '',
    image: '/imagens/eventos/pedalando-no-topo.jpg',
    kind: 'foto',
    alt: 'Multidão de ciclistas em longas filas em evento ao ar livre',
  },
];

// Clientes publicados no site atual (2011). A lista acompanha a apresentação: o cliente confirma
// quais podem continuar aparecendo (muitos são de 2011 a 2014).
export const clients: { name: string; logo: string }[] = [
  { name: 'Medial Saúde', logo: 'medial-saude.jpg' },
  { name: 'Amil', logo: 'amil.jpg' },
  { name: 'Aterpa', logo: 'aterpa.jpg' },
  { name: 'BAND', logo: 'band.jpg' },
  { name: 'Cassi', logo: 'cassi.jpg' },
  { name: 'Clinemge', logo: 'clinemge.jpg' },
  { name: 'Fiat', logo: 'fiat.jpg' },
  { name: 'Hospital Belo Horizonte', logo: 'hospital-belo-horizonte.jpg' },
  { name: 'Hospital da Baleia', logo: 'hospital-da-baleia.jpg' },
  { name: 'Nestlé', logo: 'nestle.jpg' },
  { name: 'Record', logo: 'record.jpg' },
  { name: 'Shopping Del Rey', logo: 'shopping-del-rey.jpg' },
  { name: 'Socor', logo: 'socor.jpg' },
  { name: 'Pirelli', logo: 'pirelli.jpg' },
  { name: 'UFMG', logo: 'ufmg.jpg' },
  { name: 'BRMALLS', logo: 'brmalls.jpg' },
  { name: 'Diante do Trono', logo: 'diante-do-trono.jpg' },
  { name: 'Magazine Luiza', logo: 'magazineluiza.jpg' },
  { name: 'SESI', logo: 'sesi.jpg' },
  { name: 'Shopping Center Sete Lagoas', logo: 'shopping-center-sete-lagoas.jpg' },
  { name: 'Unimed BH', logo: 'unimed-bh.jpg' },
  { name: 'Volkswagen', logo: 'volkswagen.jpg' },
  { name: 'Mitsubishi', logo: 'mitsubishi.jpg' },
  { name: 'Mercedes-Benz', logo: 'mercedes-benz.jpg' },
  { name: 'Mater Dei', logo: 'hospital-mater-dei.jpg' },
  { name: 'Felício Rocho', logo: 'hospital-felicio-rocho.jpg' },
  { name: 'Ricardo Eletro', logo: 'ricardo-eletro.jpg' },
  { name: 'Unimed Rio', logo: 'unimed-rio.jpg' },
  { name: 'Azul Linhas Aéreas', logo: 'azul-linhas-aereas.jpg' },
];

export const homeFaq: Faq[] = [
  {
    q: 'A Ouromed atende 24 horas?',
    a: 'Sim. A Central funciona 24 horas, todos os dias, com triagem médica.',
  },
  {
    q: 'Faz remoção para outra cidade ou estado?',
    a: 'Sim. Remoções em todo o território nacional mediante agendamento.',
  },
  {
    q: 'Tem ambulância UTI?',
    a: 'Sim, UTI móvel com equipe de médicos, enfermagem e socorristas, equipada com respirador, bombas de infusão, cardioversor e incubadora de transporte para recém-nascidos.',
  },
  {
    q: 'Quanto custa?',
    a: 'Depende do tipo de viatura, da equipe e da distância. Ligue para a Central 24 h ou peça orçamento pelo WhatsApp.',
  },
];

export const about = {
  seoTitle: 'Sobre a Ouromed: padrão ouro em saúde móvel',
  description:
    'A Ouromed é fundada e administrada por médicos de urgência e emergência. Conheça a equipe, a frota, o PQO e a conduta que a Central 24 h segue.',
  h1: 'Feita por médicos de urgência, do começo ao fim',
  intro:
    'Ouro de Minas, padrão ouro. A Ouromed nasceu da analogia entre o ouro das Minas Gerais e o gold standard dos nossos serviços, e é administrada por quem vive urgência e emergência.',
  read: 'Belo Horizonte · eventos desde 2010',
  what: {
    heading: 'O que a Ouromed é',
    paragraphs: [
      'Fundada e administrada por médicos experientes no atendimento de urgência e emergência. Remoção de pacientes em condições especiais, cobertura de eventos, gerenciamento de ambulatórios, atendimento domiciliar, locação de ambulância para construção civil, mineradoras, shoppings e empresas.',
    ],
  },
  team: {
    heading: 'Equipe',
    items: [
      'Socorristas treinados. Motoristas com treinamento de socorrista e a capacitação COVE (Condutor de Veículo de Emergência), exigida pelo CONTRAN.',
      'Médicos e enfermagem com anos de urgência e emergência.',
      'Equipes de geriatria e gerontologia, pediatria e neonatologia, com profissionais especializados no atendimento ao idoso, a crianças e a recém-nascidos.',
    ],
  },
  fleet: {
    heading: 'Frota',
    paragraphs: [
      'Mercedes-Benz Sprinter 313 CDI, Ford Transit, Renault Master, Fiat Ducato e Land Rover Defender 4×4: veículos robustos e funcionais, montados para UTI móvel, com ventilador pulmonar, bombas de infusão, cardioversor com eletrocardiografia digital, oxigênio fixo e portátil, incubadora de transporte de recém-nascidos e maca retrátil.',
    ],
    note: 'Frota publicada pela Ouromed; a lista atual é confirmada na contratação.',
  },
  pqo: {
    heading: 'PQO, Padrão de Qualidade Ouromed',
    lede: 'Segurança, modernidade e conforto.',
    items: [
      'Viaturas dentro das especificações da ABNT e da norma federal norte-americana para veículos de emergência (Star of Life).',
      'Veículos robustos e funcionais, com dispositivos de segurança exigidos por empresas dos setores hospitalar, de mineração, siderúrgico, industrial, petroquímico e desportivo.',
      'Materiais com tratamento antibacteriano, resistentes a fungos e umidade.',
      'Equipamentos com aferições periódicas, para ganho de tempo e pontualidade.',
    ],
  },
};

export const contact = {
  seoTitle: 'Contato Ouromed: Central 24 h em Belo Horizonte',
  description:
    'Fale com a Ouromed: Central 24 h (31) 3786-1506, WhatsApp, e-mails por setor e endereço na Rua Senador Lúcio Bittencourt, 53, Carlos Prates, Belo Horizonte.',
  h1: 'Estamos a uma ligação de distância',
  intro:
    'Para urgência, ligue. Para orçamento e eventos, WhatsApp ou e-mail. Para conhecer, venha até o escritório na Carlos Prates.',
  read: 'Carlos Prates, Belo Horizonte',
  channels: {
    heading: 'Por onde falar',
    rows: [
      {
        label: 'Urgência e remoção',
        value: '(31) 3786-1506 · (31) 4103-5452 · (31) 3786-7112',
        href: 'tel:+553137861506',
      },
      {
        label: 'Agendar remoção',
        value: 'agendamento@ouromedbh.com.br',
        href: 'mailto:agendamento@ouromedbh.com.br',
      },
      {
        label: 'Locação de veículos e eventos',
        value: 'luciano@ouromedbh.com.br',
        href: 'mailto:luciano@ouromedbh.com.br',
      },
      {
        label: 'Diretoria',
        value: 'diretoria@ouromedbh.com.br',
        href: 'mailto:diretoria@ouromedbh.com.br',
      },
      { label: 'WhatsApp', value: '(31) 7818-7838', href: site.whatsapp.href },
    ],
  },
  form: {
    heading: 'Peça um orçamento',
    intro:
      'Para eventos, locação, área protegida e ambulatórios. Para urgências, ligue: o formulário não é monitorado em tempo real.',
    note: 'Ao enviar, o seu aplicativo de e-mail ou o WhatsApp abre com a mensagem pronta. Nada fica guardado neste site.',
    services: [
      'Cobertura de eventos',
      'Locação de ambulâncias',
      'Área protegida',
      'Ambulatórios',
      'Remoção de pacientes',
      'Outro',
    ],
  },
};

/** Serviço por slug; lança se o slug não existe (as rotas são fixas, então isso é erro de build). */
/** Mensagem pré-preenchida do WhatsApp: todo CTA diz de onde a pessoa vem e do que precisa. */
export const waMessage = (topic?: string) =>
  topic
    ? `Olá, vim pelo site da Ouromed e preciso de ${topic}. Podem me ajudar?`
    : 'Olá, vim pelo site da Ouromed e preciso de falar com a Central.';
export const waHref = (topic?: string) =>
  `${site.whatsapp.href}?text=${encodeURIComponent(waMessage(topic))}`;

/** Tópicos por rota (para header, barra fixa e rodapé, que não sabem a página). */
export const waTopicByPath = (path: string): string | undefined => {
  const s = services.find((x) => path === `/${x.slug}` || path.startsWith(`/${x.slug}/`));
  if (s) return s.wa;
  if (path.startsWith('/contato')) return 'um orçamento';
  return undefined;
};

export const serviceBySlug = (slug: string): Service => {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Serviço '${slug}' não existe em src/data/site.ts`);
  return s;
};

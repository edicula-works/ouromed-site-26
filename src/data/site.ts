// Conteúdo do site inteiro, em um lugar só. Fonte: docs/conteudo/copy-v1.md (mesclada na dev),
// reescrita a partir de docs/conteudo-atual/textos-site-2011.txt.
//
// Regras de voz (AGENTS.md §3): fato concreto no lugar de adjetivo; "você"; frases curtas;
// emergência é uma seção, não o tom. Nunca inventar número, credencial, depoimento ou cliente.
//
// Versão de apresentação (decisões da pessoa, 2026-11-24): vale o que o site atual publica
// (endereço, 3 fixos, e-mails por setor, serviços, equipamentos, frota citada, depoimentos com
// nome e cargo). Rodada 6: 5 páginas por público; fotos de eventos (2010–2014) e logos de
// clientes (2011) fora do site até o cliente confirmar quais podem aparecer.
// O que é provisório ou ausente está em docs/PENDENCIAS.md. Resumo:
//   1. WhatsApp: (31) 7818-7838 é público na página de APH como telefone da central; usar como
//      WhatsApp é PROVISÓRIO, a confirmar (wa.me/553178187838).
//   2. CNPJ: null. Não renderizar enquanto for null.
//   3. Fotos: viaturas, equipe e interior são slots de foto (`media`), preenchidos com fotos
//      reais ou imagens do Google Flow. Fotos atuais: pendência.
//   4. Frota citada é a de 2011 (modelos publicados); frota atual: pendência.
//   5. História: só "cobrimos eventos desde 2010" (fato do portfólio). Sem ano de fundação.
//   6. Nunca: credencial específica, convênio aceito, preço, tempo de resposta em minutos,
//      depoimento novo, cliente novo.

export type MediaKey =
  | 'hero'
  | 'uti'
  | 'uti-interior'
  | 'domiciliar'
  | 'remocao'
  | 'eventos'
  | 'locacao'
  | 'protegida'
  | 'ambulatorios'
  | 'central'
  | 'triagem'
  | 'equipe'
  | 'destino';

export type Publico = 'voce' | 'empresa';

export type IconKey =
  | 'ambulance'
  | 'stethoscope'
  | 'wheelchair'
  | 'tent'
  | 'jeep'
  | 'shield'
  | 'hardhat';

/** Bloco de texto das páginas institucionais (sobre). */
export type Block = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  note?: string;
};

export type Faq = { q: string; a: string };

export type Service = {
  /** Âncora da seção na página do público (e o slug antigo, que redireciona para ela). */
  slug: string;
  nav: string;
  title: string;
  /** Uma linha: cartão da home e item do menu. */
  lede: string;
  /** Foto ou vídeo do serviço (public/midia/; até chegar, o slot mostra o que vai ali). */
  media: MediaKey;
  publico: Publico;
  icon: IconKey;
  intro: string;
  paragraphs: string[];
  list: { heading: string; items: string[] };
  /** Assunto da mensagem pré-preenchida do WhatsApp ("preciso de …"). */
  wa: string;
  /** Ação própria do serviço, além de Ligar e WhatsApp. */
  cta?: { label: string; href: string };
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
  emergency: {
    label: 'Risco de vida e sem viatura disponível na hora? Ligue 192 (SAMU).',
    tel: 'tel:192',
  },
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

/** Fotos e vídeos do site. Sem `src`, o slot mostra o rótulo do que vai ali (pendência de fotos:
 *  fotos reais da Ouromed ou imagens geradas no Google Flow, sempre sem texto, sem logo de terceiros
 *  e sem rosto em close; prompts em docs/brief/PROMPTS-FLOW.md). `alt` descreve o que se vê. */
export const media: Record<MediaKey, { label: string; alt: string; src?: string; video?: string }> =
  {
    hero: {
      label: 'Vídeo: viatura UTI em avenida de BH ao entardecer',
      alt: 'Ambulância UTI branca em movimento numa avenida de Belo Horizonte ao entardecer',
    },
    uti: {
      label: 'Foto: viatura UTI de perfil',
      alt: 'Ambulância UTI móvel branca, de perfil, estacionada',
    },
    'uti-interior': {
      label: 'Foto: interior da UTI móvel',
      alt: 'Interior de uma UTI móvel: maca, monitor, ventilador pulmonar e cilindros de oxigênio',
    },
    domiciliar: {
      label: 'Foto: atendimento em casa',
      alt: 'Profissional de saúde medindo a pressão de uma paciente idosa em casa',
    },
    remocao: {
      label: 'Foto: maca entrando na viatura',
      alt: 'Equipe colocando a maca com o paciente pela porta traseira da ambulância',
    },
    eventos: {
      label: 'Foto: equipe em evento',
      alt: 'Ambulância e equipe de plantão na lateral de um evento ao ar livre',
    },
    locacao: {
      label: 'Foto: ambulância 4×4 em mineração',
      alt: 'Ambulância 4×4 em estrada de terra de uma área de mineração',
    },
    protegida: {
      label: 'Foto: área protegida em empresa',
      alt: 'Ambulância de prontidão na entrada de um centro empresarial',
    },
    ambulatorios: {
      label: 'Foto: ambulatório em obra',
      alt: 'Ambulatório montado num canteiro de obras, com maca e armário de medicamentos',
    },
    central: {
      label: 'Foto: a Central 24 h',
      alt: 'Atendente da central com headset, diante de monitores',
    },
    triagem: {
      label: 'Foto: triagem médica',
      alt: 'Médico com headset fazendo a triagem de uma ligação',
    },
    equipe: {
      label: 'Foto: equipe saindo com a viatura',
      alt: 'Equipe uniformizada embarcando na ambulância',
    },
    destino: {
      label: 'Foto: chegada ao hospital',
      alt: 'Ambulância chegando à entrada de emergência de um hospital',
    },
  };

export const services: Service[] = [
  {
    slug: 'ambulancia',
    nav: 'Ambulância e UTI móvel',
    title: 'Ambulância e UTI móvel',
    lede: 'Suporte básico e UTI móvel com equipe médica própria.',
    media: 'uti',
    publico: 'voce',
    icon: 'ambulance',
    intro:
      'Duas categorias de viatura, uma só equipe. A triagem médica da Central decide qual é a certa para o seu caso.',
    paragraphs: [
      'Suporte básico para paciente estável: exames, consultas, alta e transferência sem risco. UTI móvel para quem precisa de suporte avançado no caminho, com médicos, enfermagem e socorristas da Ouromed.',
      'As pranchas de imobilização são de polietileno, adequadas para exames de ressonância magnética, e a UTI leva incubadora de transporte para recém-nascidos.',
    ],
    list: {
      heading: 'Viaturas publicadas pela Ouromed',
      items: [
        'Mercedes-Benz Sprinter 313 CDI',
        'Ford Transit',
        'Renault Master',
        'Fiat Ducato',
        'Land Rover Defender 4×4',
      ],
    },
    wa: 'uma ambulância UTI móvel ou de suporte básico',
  },
  {
    slug: 'atendimento-domiciliar',
    nav: 'Atendimento domiciliar',
    title: 'Atendimento médico em casa',
    lede: 'Médico e enfermagem em casa, com a resolutividade de uma equipe de urgência.',
    media: 'domiciliar',
    publico: 'voce',
    icon: 'stethoscope',
    intro:
      'A Ouromed nasceu do atendimento de urgência e emergência. É essa experiência que chega à sua porta: em casa, quando dá para ficar em casa.',
    paragraphs: [
      'Atendimento Pré-Hospitalar (APH) para pacientes particulares e para empresas de home care que precisam de uma equipe de urgência como parceira. Se o caso pedir hospital, a Ouromed faz a remoção.',
    ],
    list: {
      heading: 'Para quem',
      items: [
        'Idosos e pacientes acamados, com equipe de geriatria e gerontologia',
        'Crianças e recém-nascidos, com pediatria e neonatologia',
        'Empresas de home care que querem uma parceira de urgência',
      ],
    },
    wa: 'atendimento médico em casa',
  },
  {
    slug: 'remocao',
    nav: 'Remoção de pacientes',
    title: 'Remoção de pacientes',
    lede: 'Da alta hospitalar à viagem entre estados, 24 horas por dia.',
    media: 'remocao',
    publico: 'voce',
    icon: 'wheelchair',
    intro:
      'Cada remoção começa com uma pergunta: o que o paciente precisa durante o caminho? A resposta define a viatura, a equipe e o equipamento.',
    paragraphs: [
      'Adulto, pediátrico, neonatal e psiquiátrico, 24 horas por dia. Cadeira de resgate tamanho especial, macas com colchão e bancos com revestimento macio: viagens longas não precisam doer.',
    ],
    list: {
      heading: 'Tipos de remoção',
      items: [
        'Alta hospitalar, do hospital para casa',
        'Transferência entre hospitais',
        'Entre cidades e estados, mediante agendamento',
        'Pediátrica e neonatal, com incubadora de transporte',
        'Psiquiátrica, com equipe treinada',
      ],
    },
    wa: 'uma remoção de pacientes',
    cta: { label: 'Agendar por e-mail', href: 'mailto:agendamento@ouromedbh.com.br' },
  },
  {
    slug: 'area-protegida',
    nav: 'Área protegida',
    title: 'Área protegida',
    lede: 'Contrato de urgência: você aciona a Central, a equipe vai até você.',
    media: 'protegida',
    publico: 'empresa',
    icon: 'shield',
    intro:
      'Em uma intercorrência com cliente ou funcionário, a sua empresa aciona a Central 24 h e uma equipe se desloca até o local.',
    paragraphs: [
      'A triagem médica avalia a urgência pelo telefone. Sua equipe não precisa decidir sozinha para onde levar, com qual viatura e com qual equipe.',
    ],
    list: {
      heading: 'Quem já aderiu',
      items: [
        'Shoppings e clubes',
        'Colégios e faculdades',
        'Condomínios',
        'Empresas, clínicas de exames e laboratórios',
      ],
    },
    wa: 'informações sobre área protegida',
    cta: {
      label: 'Falar com a diretoria',
      href: 'mailto:diretoria@ouromedbh.com.br?subject=%C3%81rea%20protegida',
    },
  },
  {
    slug: 'eventos',
    nav: 'Cobertura de eventos',
    title: 'Cobertura médica de eventos',
    lede: 'Ambulância, ambulatório montado e equipe, do casamento ao congresso.',
    media: 'eventos',
    publico: 'empresa',
    icon: 'tent',
    intro:
      'O suporte adequado ao porte do evento: uma ambulância, um ambulatório montado no local ou uma equipe completa, em Minas ou em qualquer estado.',
    paragraphs: [
      'Congressos, feiras, shows e festivais, casamentos e formaturas, rodeios, funerais, comboios VIP e competições esportivas.',
    ],
    list: {
      heading: 'O que a Ouromed leva',
      items: [
        'Ambulância de suporte básico ou UTI móvel',
        'Ambulatório com macas, desfibriladores, cadeiras de rodas e medicamentos',
        'Equipe de suporte básico e avançado',
        'Qualquer estado, mediante agendamento',
      ],
    },
    wa: 'cobertura médica para um evento',
    cta: {
      label: 'Pedir orçamento',
      href: 'mailto:luciano@ouromedbh.com.br?subject=Or%C3%A7amento%20de%20cobertura%20m%C3%A9dica%20para%20evento',
    },
  },
  {
    slug: 'locacao-de-ambulancias',
    nav: 'Locação de ambulâncias',
    title: 'Locação de ambulâncias',
    lede: 'Viaturas 4×2 e 4×4 para mineradoras, obras, shoppings e empresas.',
    media: 'locacao',
    publico: 'empresa',
    icon: 'jeep',
    intro:
      'Para operações em que a ambulância faz parte do planejamento de segurança: mineração, siderurgia, construção civil e shoppings.',
    paragraphs: [
      'Viaturas dentro das especificações da ABNT e da norma norte-americana para veículos de emergência (Star of Life), com os dispositivos de segurança exigidos pelos setores de mineração, siderúrgico, industrial, petroquímico e hospitalar.',
    ],
    list: {
      heading: 'Viaturas e opcionais',
      items: [
        'Tração 4×2 ou 4×4',
        'Furgão pequeno ou grande',
        'Ar-condicionado, freios ABS e airbag',
        'Tacógrafo digital e telemetria',
        'Equipamentos médicos conforme a operação',
      ],
    },
    wa: 'locar uma ambulância',
    cta: {
      label: 'Falar sobre locação',
      href: 'mailto:luciano@ouromedbh.com.br?subject=Loca%C3%A7%C3%A3o%20de%20ambul%C3%A2ncia',
    },
  },
  {
    slug: 'ambulatorios',
    nav: 'Ambulatórios',
    title: 'Ambulatórios em obras e empresas',
    lede: 'Posto médico itinerante em obras e ambulatórios em empresas e hotéis.',
    media: 'ambulatorios',
    publico: 'empresa',
    icon: 'hardhat',
    intro: 'A Ouromed monta o posto médico e coloca a equipe onde a sua operação está.',
    paragraphs: [
      'Posto médico itinerante que acompanha a frente de obra, e ambulatórios dentro de empresas, hotéis e shoppings, com pessoal capacitado.',
    ],
    list: {
      heading: 'O ambulatório pode ter',
      items: [
        'Cardioversor com desfibrilador e monitor cardíaco digital',
        'Oxímetros e glicosímetro',
        'Macas e cadeiras de rodas',
        'Armários de medicamentos',
      ],
    },
    wa: 'informações sobre ambulatórios',
    cta: {
      label: 'Falar com a diretoria',
      href: 'mailto:diretoria@ouromedbh.com.br?subject=Ambulat%C3%B3rios',
    },
  },
];

export const servicesFor = (p: Publico) => services.filter((x) => x.publico === p);

/** As duas páginas de público. Os slugs antigos de serviço redirecionam para as âncoras. */
export const audiencePages: Record<
  Publico,
  {
    path: string;
    nav: string;
    seoTitle: string;
    description: string;
    h1: string;
    intro: string;
    wa: string;
    faq: Faq[];
  }
> = {
  voce: {
    path: '/para-voce',
    nav: 'Para você',
    seoTitle: 'Ambulância UTI, médico em casa e remoção de pacientes em BH',
    description:
      'Ambulância UTI móvel e suporte básico, atendimento médico em casa e remoção de pacientes em Belo Horizonte e todo o Brasil. Central 24 h: (31) 3786-1506.',
    h1: 'Para você e sua família',
    intro:
      'Ambulância, UTI móvel, médico em casa e remoção de pacientes. Uma ligação para a Central 24 h e a triagem médica decide o que o caso pede.',
    wa: 'uma ambulância',
    faq: [
      {
        q: 'A UTI móvel tem médico?',
        a: 'Sim: equipe de médicos, enfermagem e socorristas treinados da Ouromed, com equipamento de suporte avançado a bordo.',
      },
      {
        q: 'Levam paciente para ressonância?',
        a: 'Sim. As pranchas de imobilização são de polietileno, adequadas a exames de ressonância magnética.',
      },
      {
        q: 'Atendem bebês?',
        a: 'Sim. Incubadora de transporte de recém-nascidos e equipe de neonatologia.',
      },
      {
        q: 'Fazem remoção para outro estado?',
        a: 'Sim, em todo o território nacional mediante agendamento.',
      },
      {
        q: 'Levam paciente cadeirante ou com obesidade?',
        a: 'Sim: cadeira de resgate tamanho especial e pranchas adequadas.',
      },
      {
        q: 'Atendem idosos acamados em casa?',
        a: 'Sim. Há equipe de geriatria e gerontologia para o atendimento ao idoso.',
      },
    ],
  },
  empresa: {
    path: '/para-empresas',
    nav: 'Para empresas',
    seoTitle: 'Área protegida, eventos, locação de ambulâncias e ambulatórios',
    description:
      'Área protegida para empresas e condomínios, cobertura médica de eventos, locação de ambulâncias 4×2 e 4×4 e ambulatórios em obras. Ouromed, Belo Horizonte.',
    h1: 'Para empresas e eventos',
    intro:
      'Área protegida, cobertura de eventos, locação de ambulâncias e ambulatórios em obras: a Ouromed entra no planejamento de segurança da sua operação, com orçamento por escrito.',
    wa: 'um orçamento para empresa',
    faq: [
      {
        q: 'Como funciona o acionamento da área protegida?',
        a: 'Pela Central 24 h. A triagem médica avalia a urgência e desloca uma equipe até o local.',
      },
      {
        q: 'Serve para condomínios residenciais?',
        a: 'Sim. Condomínios estão entre os que já aderiram ao serviço.',
      },
      {
        q: 'Fazem eventos fora de Belo Horizonte?',
        a: 'Sim, em todo o Brasil mediante agendamento.',
      },
      {
        q: 'Montam ambulatório no local do evento?',
        a: 'Sim, com macas, desfibriladores, cadeiras de rodas e medicamentos de pronto socorro.',
      },
      {
        q: 'A ambulância locada vem equipada?',
        a: 'Sim: os equipamentos médicos são definidos conforme a necessidade da operação.',
      },
      {
        q: 'O posto médico acompanha a obra?',
        a: 'Sim, é itinerante: vai para onde a frente de trabalho está.',
      },
    ],
  },
};

/** Apresentação da home: quem é a Ouromed em duas frases e três fatos publicados. */
export const presentation = {
  label: 'A Ouromed',
  text: 'Fundada e administrada por médicos de urgência e emergência, em Belo Horizonte. Uma Central que atende 24 horas e faz a triagem médica de cada chamado, e uma equipe própria que vai até o paciente.',
  facts: [
    { value: '24 h', label: 'Central com triagem médica, todos os dias' },
    { value: 'COVE', label: 'Capacitação de todos os motoristas, exigida pelo CONTRAN' },
    { value: 'Todo o Brasil', label: 'Remoções e eventos em qualquer estado, com agendamento' },
  ],
};

/** Suporte básico × UTI móvel (texto publicado pela Ouromed) e o que leva a UTI. */
export const ambulanceTypes = {
  heading: 'Suporte básico ou UTI móvel',
  lede: 'O que muda de uma para a outra é o que o paciente precisa durante o caminho. A triagem médica da Central decide.',
  types: [
    {
      name: 'Suporte básico',
      for: 'Paciente estável: exames, consultas, alta e transferência sem risco.',
      team: 'Socorristas treinados e motorista com COVE.',
    },
    {
      name: 'UTI móvel',
      for: 'Paciente que precisa de suporte avançado durante o trajeto, inclusive neonatal.',
      team: 'Médicos, enfermagem e socorristas da Ouromed.',
    },
  ],
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

/** Quando chamar a Ouromed. A Ouromed atende emergência quando há viatura e equipe disponíveis
 *  (decisão da pessoa, 24/11/2026); o SAMU fica como nota de segurança, sem destaque. Sem preço,
 *  sem convênio nomeado e sem tempo de resposta em minutos. */
export const honesty = {
  heading: 'Quando chamar a Ouromed',
  lede: 'Toda chamada passa pela triagem médica, que define a viatura e a equipe. A Central diz na hora o que pode fazer pelo seu caso.',
  items: [
    {
      title: 'Emergência',
      tag: 'agora',
      text: 'A Ouromed atende emergência 24 h quando há viatura e equipe disponíveis. A Central confirma na própria ligação.',
      href: `tel:${site.phones.tel}`,
      cta: `Ligar ${site.phones.display}`,
    },
    {
      title: 'Remoção e transferência',
      tag: 'agendado',
      text: 'Alta hospitalar, exames, transferência entre hospitais ou entre estados, com UTI móvel ou suporte básico.',
      href: '/para-voce#remocao',
      cta: 'Solicitar remoção',
    },
    {
      title: 'Empresas e eventos',
      tag: 'contrato',
      text: 'Área protegida, ambulatório em obra, cobertura de eventos e locação de ambulâncias, com orçamento por escrito.',
      href: '/contato',
      cta: 'Pedir orçamento',
    },
  ],
  note: 'Risco de vida e a Central sem viatura livre na hora? Ligue 192 (SAMU).',
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
    name: 'Tiago de Brito',
    role: 'Rope Eventos, Pedro Leopoldo Rodeio Show',
  },
  {
    quote:
      'A Ouromed é parceira do Shopping Del Rey desde agosto de 2011. Pelo que temos de experiência, acreditamos ter acertado na escolha pela Ouromed, pois, em todos os momentos emergenciais vividos em nosso shopping desde a sua chegada, o atendimento tem sido ágil e perfeito, trazendo também comodidade e conforto aos nossos clientes.',
    name: 'Henrique Freitas',
    role: 'Coordenador de Segurança do Shopping Del Rey',
  },
  {
    quote:
      'A Ouromed oferece uma super estrutura de atendimento de urgência e emergência em eventos e nos atenderam muito bem em Diamantina, MG, durante as gravações da minissérie Rei Davi. Ficamos tranquilos quando sabemos que as UTIs e equipes Ouromed estão presentes em nossas gravações.',
    name: 'Tatiana Duarte',
    role: 'Coordenadora de Produção, Rede Record de Televisão',
  },
];

export const homeFaq: Faq[] = [
  {
    q: 'A Ouromed atende emergência?',
    a: 'Sim, quando há viatura e equipe disponíveis. A Central confirma na própria ligação. Com risco de vida e sem viatura livre na hora, ligue 192 (SAMU).',
  },
  {
    q: 'A Ouromed atende 24 horas?',
    a: 'Sim. A Central funciona 24 horas, todos os dias, com triagem médica.',
  },
  {
    q: 'Aceitam convênio?',
    a: 'Cada plano tem regra própria para transporte médico. Confirme a cobertura com o seu plano; a Central da Ouromed orienta a viatura certa para o caso.',
  },
  {
    q: 'Quanto custa?',
    a: 'Depende do tipo de viatura, da equipe e da distância. Ligue para a Central 24 h ou peça orçamento pelo WhatsApp.',
  },
  {
    q: 'Como a empresa pede um orçamento?',
    a: 'Pelo formulário da página de contato, pelo WhatsApp ou pelos e-mails de cada setor: eventos e locação, área protegida e ambulatórios.',
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

/** Mensagem pré-preenchida do WhatsApp: todo CTA diz de onde a pessoa vem e do que precisa. */
export const waMessage = (topic?: string) =>
  topic
    ? `Olá, vim pelo site da Ouromed e preciso de ${topic}. Podem me ajudar?`
    : 'Olá, vim pelo site da Ouromed e preciso de falar com a Central.';
export const waHref = (topic?: string) =>
  `${site.whatsapp.href}?text=${encodeURIComponent(waMessage(topic))}`;

/** Tópicos por rota (para header, barra fixa e rodapé, que não sabem a página). */
export const waTopicByPath = (path: string): string | undefined => {
  if (path.startsWith('/para-voce')) return audiencePages.voce.wa;
  if (path.startsWith('/para-empresas')) return audiencePages.empresa.wa;
  if (path.startsWith('/contato')) return 'um orçamento';
  return undefined;
};

/** Endereço da seção de um serviço na página do público. */
export const serviceHref = (x: Service) => `${audiencePages[x.publico].path}#${x.slug}`;

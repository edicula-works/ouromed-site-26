// Fotos dos slots do site (rodada 8): recorta cada foto pela proporção do seu slot e grava AVIF e
// WebP em 2–3 larguras em public/midia/, prontas para um <picture> no Media.tsx.
//   node scripts/fotos.mjs <pasta-das-fotos> <mapa.json> [--saida public/midia] [--dry] [--manifest saida.json]
//   node scripts/fotos.mjs --ajuda
// O mapa é { "<slot>": { "arquivo": "nome.jpg", "alt": "o que se vê", "foco"?: "…", "proporcao"?: "16/9" } }.
// `alt` é obrigatório (AGENTS.md §4: alt em imagem de conteúdo). Os slots e as proporções vêm do
// código: tabela SLOTS abaixo, com o lugar de cada um, conferida contra o código a cada execução.
// As fotos de origem não são alteradas. A saída não leva EXIF (o sharp não copia): localização e
// dados da câmera ficam fora dos arquivos publicados. Usa o `sharp` de devDependencies (mesma faixa
// ^0.35.5 que o next traz como dependência opcional).
import fs from 'node:fs';
import path from 'node:path';

const AJUDA = `Fotos dos slots do site.

  node scripts/fotos.mjs <pasta-das-fotos> <mapa.json> [--saida public/midia] [--dry] [--manifest saida.json]

mapa.json (alt é obrigatório; foco e proporcao são opcionais):
  {
    "uti": { "arquivo": "ambulancia-perfil.jpg", "alt": "Ambulância UTI móvel branca, de perfil" },
    "uti-interior": {
      "arquivo": "interior.jpg",
      "alt": "Interior da UTI: maca, monitor e ventilador",
      "foco": "esquerda"
    }
  }
foco: centro (padrão), topo, baixo, esquerda, direita ou atencao (o sharp acha o ponto de interesse).
proporcao: só para anular a do slot (ex.: "1/1"). Larguras maiores que a foto não são geradas (nunca
amplia); se a foto for menor que todas, sai uma só na largura original.

Antes de subir: autorização de imagem de quem aparecer e nenhum paciente identificável (AGENTS.md §1).`;

// Argumentos: --saida e --manifest levam um valor; --dry, --ajuda e -h não.
const COM_VALOR = new Set(['--saida', '--manifest']);
const posicos = [];
const opcoes = {};
for (let i = 0; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (COM_VALOR.has(a)) opcoes[a.slice(2)] = process.argv[++i];
  else if (a === '--dry' || a === '--ajuda' || a === '-h') opcoes[a.slice(2)] = true;
  else if (i > 1) posicos.push(a);
}
if (opcoes.ajuda || opcoes.h) {
  console.log(AJUDA);
  process.exit(0);
}
const [pasta, mapaPath] = posicos;
if (!pasta || !mapaPath) {
  console.error(
    'uso: node scripts/fotos.mjs <pasta-das-fotos> <mapa.json>   (--ajuda para o formato do mapa)',
  );
  process.exit(2);
}
const saida = opcoes.saida ?? 'public/midia';
const dry = Boolean(opcoes.dry);

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error(
    'sharp não está instalado nesta cópia: rode bun install (ele está em devDependencies) e tente de novo.',
  );
  process.exit(1);
}

/** Slots do site: a proporção em que cada um é recortado, as larguras geradas e onde aparece.
 *  Proporção = a do lugar em que a foto é maior; nos outros lugares o object-fit: cover do
 *  Media.tsx corta o que sobra pelo centro. Conferir ao mudar Sections.tsx ou globals.css. */
const WIDE = [800, 1280, 1920];
const TOPO_PAGINA = [640, 960, 1280];
const SLOTS = {
  hero: {
    proporcao: null,
    larguras: [],
    onde: 'reservado: o topo da home é o desenho de BH, sem mídia (decisão de 24/11)',
  },
  uti: {
    // Home: destaque de "Para você", Media ratio="auto" + .feature__media { height: min(82vh, 58vw) }
    // (de 1,7 a 2,2 : 1, na largura toda). /para-voce: ServiceSection em 16 / 9 (66vw).
    proporcao: '16/9',
    larguras: WIDE,
    sizes: '100vw',
    onde: 'home (destaque de Para você, largura toda) · /para-voce#ambulancia',
  },
  'uti-interior': {
    // Home: Suporte básico × UTI, coluna de 6fr (~690 px); no celular, largura toda.
    proporcao: '4/3',
    larguras: [720, 1080, 1440],
    sizes: '(min-width: 1024px) 50vw, 100vw',
    onde: 'home (Suporte básico × UTI)',
  },
  domiciliar: {
    // Home: cartão de 2 colunas em 16 / 9 (≥ 1024 px) e 4 / 3 abaixo. /para-voce: 16 / 9 (66vw).
    proporcao: '16/9',
    larguras: WIDE,
    sizes: '(min-width: 1024px) 66vw, 100vw',
    onde: 'home (cartão) · /para-voce#atendimento-domiciliar',
  },
  remocao: {
    proporcao: '16/9',
    larguras: WIDE,
    sizes: '(min-width: 1024px) 66vw, 100vw',
    onde: 'home (cartão) · /para-voce#remocao',
  },
  protegida: {
    // Home: faixa de Para empresas em 4 / 3 (cartão de até 500 px; sem JS, 3 / 4 em 4 colunas).
    // /para-empresas: 16 / 9 (66vw). 4 / 3 é o meio-termo entre os três recortes.
    proporcao: '4/3',
    larguras: WIDE,
    sizes: '(min-width: 1024px) 66vw, 100vw',
    onde: 'home (faixa de Para empresas) · /para-empresas#area-protegida',
  },
  eventos: {
    proporcao: '4/3',
    larguras: WIDE,
    sizes: '(min-width: 1024px) 66vw, 100vw',
    onde: 'home (faixa de Para empresas) · /para-empresas#eventos',
  },
  locacao: {
    proporcao: '4/3',
    larguras: WIDE,
    sizes: '(min-width: 1024px) 66vw, 100vw',
    onde: 'home (faixa de Para empresas) · /para-empresas#locacao-de-ambulancias',
  },
  ambulatorios: {
    proporcao: '4/3',
    larguras: WIDE,
    sizes: '(min-width: 1024px) 66vw, 100vw',
    onde: 'home (faixa de Para empresas) · /para-empresas#ambulatorios',
  },
  destino: {
    // Topos das páginas internas (PageHero): coluna de 5fr (~530 px); abaixo de 1024 px, largura toda.
    proporcao: '4/3',
    larguras: TOPO_PAGINA,
    sizes: '(min-width: 1024px) 40vw, 100vw',
    onde: '/para-voce (topo)',
  },
  triagem: {
    proporcao: '4/3',
    larguras: TOPO_PAGINA,
    sizes: '(min-width: 1024px) 40vw, 100vw',
    onde: '/para-empresas (topo)',
  },
  equipe: {
    proporcao: '4/3',
    larguras: TOPO_PAGINA,
    sizes: '(min-width: 1024px) 40vw, 100vw',
    onde: '/sobre (topo)',
  },
  central: {
    proporcao: '4/3',
    larguras: TOPO_PAGINA,
    sizes: '(min-width: 1024px) 40vw, 100vw',
    onde: '/contato (topo)',
  },
};

const FOCO = {
  centro: 'centre',
  topo: 'top',
  baixo: 'bottom',
  esquerda: 'left',
  direita: 'right',
  atencao: sharp.strategy.attention,
};

/** Slots que o código usa de fato: Media k="…", PageHero media="…", services[].media: '…'. */
function slotsNoCodigo() {
  const chaves = new Set();
  const ler = (dir) => {
    for (const nome of fs.readdirSync(dir)) {
      const p = path.join(dir, nome);
      if (fs.statSync(p).isDirectory()) ler(p);
      else if (/\.(tsx|ts)$/.test(nome)) {
        const t = fs.readFileSync(p, 'utf8');
        for (const re of [/\bk="([\w-]+)"/g, /\bmedia="([\w-]+)"/g, /\bmedia: '([\w-]+)'/g])
          for (const m of t.matchAll(re)) chaves.add(m[1]);
      }
    }
  };
  ler('src');
  return chaves;
}

// ── Validação: tudo antes de gravar qualquer arquivo ──
const erros = [];
const codigo = slotsNoCodigo();
for (const k of codigo)
  if (!(k in SLOTS))
    erros.push(`o código usa o slot "${k}", que não está na tabela SLOTS deste script`);
for (const k of Object.keys(SLOTS))
  if (k !== 'hero' && !codigo.has(k))
    erros.push(`o slot "${k}" está na tabela SLOTS, mas o código não usa mais`);

let mapa;
try {
  mapa = JSON.parse(fs.readFileSync(mapaPath, 'utf8'));
} catch (e) {
  console.error(`não consegui ler o mapa ${mapaPath}: ${e.message}`);
  process.exit(2);
}
if (!mapa || typeof mapa !== 'object' || Array.isArray(mapa)) {
  console.error('o mapa tem de ser um objeto { slot: { arquivo, alt } }');
  process.exit(2);
}
const entradas = [];
for (const [slot, v] of Object.entries(mapa)) {
  const onde = `slot "${slot}"`;
  if (!(slot in SLOTS)) {
    erros.push(`${onde}: não existe. Slots: ${Object.keys(SLOTS).join(', ')}`);
    continue;
  }
  if (!SLOTS[slot].proporcao) {
    erros.push(`${onde}: ${SLOTS[slot].onde}`);
    continue;
  }
  if (!v || typeof v !== 'object' || Array.isArray(v)) {
    erros.push(`${onde}: o valor tem de ser { "arquivo", "alt" }`);
    continue;
  }
  if (typeof v.arquivo !== 'string' || !v.arquivo) erros.push(`${onde}: falta "arquivo"`);
  if (typeof v.alt !== 'string' || !v.alt.trim()) erros.push(`${onde}: falta "alt" (obrigatório)`);
  if (v.foco && !(v.foco in FOCO))
    erros.push(`${onde}: foco "${v.foco}" desconhecido (${Object.keys(FOCO).join(', ')})`);
  const proporcao = v.proporcao ?? SLOTS[slot].proporcao;
  if (!/^\d+\s*\/\s*\d+$/.test(proporcao))
    erros.push(`${onde}: proporção "${proporcao}" tem de ser "largura/altura"`);
  if (typeof v.arquivo !== 'string') continue;
  const arquivo = path.resolve(pasta, v.arquivo);
  if (!fs.existsSync(arquivo)) {
    erros.push(`${onde}: não achei ${arquivo}`);
    continue;
  }
  let meta;
  try {
    meta = await sharp(arquivo).metadata();
  } catch (e) {
    erros.push(`${onde}: não consegui abrir ${arquivo} (${e.message})`);
    continue;
  }
  // Com o rotate() do sharp a foto fica na orientação do EXIF.
  const girada = (meta.orientation ?? 0) >= 5;
  entradas.push({
    slot,
    arquivo,
    foco: v.foco ?? 'centro',
    proporcao,
    alt: typeof v.alt === 'string' ? v.alt.trim() : '',
    fonte: { w: girada ? meta.height : meta.width, h: girada ? meta.width : meta.height },
  });
}
if (erros.length) {
  console.error(`Nada foi gerado. Corrija o mapa (${mapaPath}):`);
  for (const e of erros) console.error(`  - ${e}`);
  process.exit(2);
}
if (!entradas.length) {
  console.error('o mapa está vazio');
  process.exit(2);
}

// ── Geração ──
const kb = (n) => `${Math.round(n / 1024)} KB`;
// Caminho de URL da saída (public/ é a raiz do site). Fora de public/, os caminhos impressos não são URLs.
const rel = path.relative('public', path.resolve(saida));
const foraDePublic = rel.startsWith('..');
const raiz = foraDePublic ? saida : `/${rel.split(path.sep).join('/')}`;
if (foraDePublic)
  console.log(`saída fora de public/: os caminhos abaixo são locais, não URLs (${saida})`);
if (!dry) fs.mkdirSync(saida, { recursive: true });
const plano = [];
for (const e of entradas) {
  const s = SLOTS[e.slot];
  const [pw, ph] = e.proporcao.split('/').map((x) => Number(x.trim()));
  let larguras = s.larguras.filter((w) => w <= e.fonte.w);
  if (!larguras.length) larguras = [e.fonte.w];
  const item = {
    slot: e.slot,
    alt: e.alt,
    proporcao: e.proporcao,
    sizes: s.sizes,
    onde: s.onde,
    fonte: e.fonte,
    arquivos: [],
  };
  const base = sharp(e.arquivo, { failOn: 'error' }).rotate();
  for (const w of larguras) {
    const h = Math.round((w * ph) / pw);
    const recorte = { width: w, height: h, fit: 'cover', position: FOCO[e.foco] };
    const arquivos = {};
    // Duas codificações do mesmo recorte, cada uma direto da foto de origem (sem geração extra).
    for (const [ext, opcoes] of [
      ['avif', { quality: 55, effort: 6 }],
      ['webp', { quality: 78, effort: 5 }],
    ]) {
      if (dry) continue;
      const info = await base
        .clone()
        .resize(recorte)
        [ext](opcoes)
        .toFile(path.join(saida, `${e.slot}-${w}.${ext}`));
      arquivos[ext] = info.size;
    }
    item.arquivos.push({ w, h, ...arquivos });
  }
  const puladas = s.larguras.filter((w) => w > e.fonte.w);
  if (puladas.length)
    item.nota = `a foto tem ${e.fonte.w} px de largura; ${puladas.join(', ')} não ${puladas.length > 1 ? 'foram geradas' : 'foi gerada'} (nunca amplia)`;
  plano.push(item);
}

// ── Como usar ──
const srcset = (item, ext) =>
  item.arquivos.map((a) => `${raiz}/${item.slot}-${a.w}.${ext} ${a.w}w`).join(', ');
const meio = (item) => item.arquivos[Math.floor(item.arquivos.length / 2)];
console.log(dry ? '\nPlano (nada gravado; tire o --dry para gerar):' : '\nGerados:');
for (const item of plano) {
  console.log(
    `\n${item.slot} → ${item.proporcao} · ${item.onde} · foto ${item.fonte.w}×${item.fonte.h}`,
  );
  for (const a of item.arquivos)
    console.log(
      `  ${item.slot}-${a.w}: ${a.w}×${a.h}` +
        (a.avif ? ` · avif ${kb(a.avif)} · webp ${kb(a.webp)}` : ''),
    );
  if (item.nota) console.log(`  (${item.nota})`);
  if (dry) continue;
  console.log(`  em src/data/site.ts → media.${item.slot}:`);
  console.log(`    alt: ${JSON.stringify(item.alt)}`);
  console.log(
    `    src: '${raiz}/${item.slot}-${meio(item).w}.avif'   (uma largura: é o que o next/image do Media.tsx usa hoje)`,
  );
  console.log('  com as larguras (trocar o next/image por <picture> no Media.tsx, fase 2):');
  console.log(
    `    <source type="image/avif" srcset="${srcset(item, 'avif')}" sizes="${item.sizes}">`,
  );
  console.log(
    `    <img src="${raiz}/${item.slot}-${meio(item).w}.webp" srcset="${srcset(item, 'webp')}" sizes="${item.sizes}" width="${meio(item).w}" height="${meio(item).h}" alt="…">`,
  );
}
if (opcoes.manifest && !dry) {
  fs.writeFileSync(
    opcoes.manifest,
    JSON.stringify(
      Object.fromEntries(
        plano.map((item) => [
          item.slot,
          {
            alt: item.alt,
            proporcao: item.proporcao,
            sizes: item.sizes,
            larguras: item.arquivos.map((a) => ({
              w: a.w,
              h: a.h,
              avif: `${raiz}/${item.slot}-${a.w}.avif`,
              webp: `${raiz}/${item.slot}-${a.w}.webp`,
            })),
          },
        ]),
      ),
      null,
      2,
    ),
  );
  console.log(`\nManifesto: ${opcoes.manifest}`);
}
if (!dry) {
  const n = plano.reduce((t, i) => t + i.arquivos.length * 2, 0);
  const total = plano.reduce(
    (t, i) => t + i.arquivos.reduce((u, a) => u + (a.avif ?? 0) + (a.webp ?? 0), 0),
    0,
  );
  console.log(
    `\n${n} arquivos em ${saida} (${kb(total)} no total). Confira cada recorte antes de subir.`,
  );
}

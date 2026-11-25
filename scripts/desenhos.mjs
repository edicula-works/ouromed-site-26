// Desenhos de BH em traço: vetoriza os PNG preto e branco (bh-*.png, gerados pela ferramenta de
// imagem a partir de fotos livres; docs/brief/desenhos/CREDITOS.md) em SVG de traço único — um
// <path> sem preenchimento, com o traço de 1,5 px que não escala das curvas de nível
// (public/textura/serra-do-curral.svg). O site pinta cada desenho pela cor do lugar (CSS
// mask-image), como a cidade em traço e a serra do rodapé.
//
//   bun scripts/desenhos.mjs <pasta-com-bh-*.png> [--saida public/textura] [--checar]
//   bun scripts/desenhos.mjs --ajuda
//
// Por que não potrace: um traçador de contorno descreve cada linha pelos dois lados, com a
// espessura do bitmap (2–3 px, irregular, conforme o desenho) em polígonos preenchidos. Aqui a
// linha vira o seu eixo: o bitmap é afinado até o esqueleto de 1 px (afinamento sequencial, da
// borda para o centro, que preserva pontas e junções), o esqueleto vira polilinhas entre
// extremidades e junções, e cada polilha é alisada e simplificada. A espessura passa a ser uma só,
// dada pelo SVG, igual em todos os desenhos e em qualquer tamanho de máscara. Decodifica e
// re-renderiza com o sharp de devDependencies; nenhuma dependência a mais.
//
// --checar re-renderiza cada SVG com traço de 3 px e o compara com a tinta do PNG: cobertura
// (quanto do desenho original passou para o vetor) e precisão (quantas linhas o vetor inventou).
import fs from 'node:fs';
import path from 'node:path';

export { afinar, tracar, tirarManchas, dilatar };

const AJUDA = `Desenhos de BH em traço: PNG preto e branco → SVG de traço único.

  bun scripts/desenhos.mjs <pasta-com-bh-*.png> [--saida public/textura] [--checar]

Cada <pasta>/bh-<nome>.png vira <saida>/bh-<nome>.svg, com um <path> só (traço de 1,5 px que não
escala, sem preenchimento) e o viewBox aparado no desenho. Limpeza: manchas de menos de 12 px e
traços de menos de 8 px saem; o resto é alisado e simplificado com tolerância de 0,8 px (na
resolução do PNG). --checar compara o vetor re-renderizado com o PNG e mostra cobertura e precisão.`;

function tirarManchas(ink, w, h, limite) {
  const visto = new Uint8Array(ink.length);
  const pilha = new Int32Array(ink.length);
  let tiradas = 0;
  for (let p0 = 0; p0 < ink.length; p0++) {
    if (!ink[p0] || visto[p0]) continue;
    let topo = 0;
    pilha[topo++] = p0;
    visto[p0] = 1;
    const comp = [];
    while (topo) {
      const p = pilha[--topo];
      comp.push(p);
      const r = (p / w) | 0;
      const c = p % w;
      for (let i = 0; i < 8; i++) {
        const rr = r + DR[i];
        const cc = c + DC[i];
        if (rr < 0 || cc < 0 || rr >= h || cc >= w) continue;
        const q = rr * w + cc;
        if (ink[q] && !visto[q]) {
          visto[q] = 1;
          pilha[topo++] = q;
        }
      }
    }
    if (comp.length < limite) {
      for (const p of comp) ink[p] = 0;
      tiradas++;
    }
  }
  return tiradas;
}

const TRACO = 1.5; // px na tela, em qualquer tamanho de máscara (non-scaling-stroke)
const MANCHA = 12; // px de área: menor que isso é ruído do bitmap
const MINIMO = 8; // px de comprimento: traço mais curto que isso é serrilhado ou farpa
const TOLERANCIA = 1.5; // px: distância máxima entre a polilha e o esqueleto (1 px na tela a 1440; a partir de 2 perde linha)

/** Afinamento de Guo e Hall (1989), na forma do OpenCV (ximgproc/thinning.cpp): duas
 *  sub-iterações por ciclo, cada uma apagando da foto do início da sub-iteração os pixels de borda
 *  que são pontos simples (número de travessias C = 1), não são ponta nem nearly isolados
 *  (2 ≤ N ≤ 3) e estão do lado da borda da vez (m = 0: abaixo à esquerda, depois acima à direita).
 *  Preserva a topologia por construção e deixa linhas diagonais de 2 px inteiras — o que o
 *  afinamento sequencial em ordem raster e o Zhang–Suen não fazem (ambos apagaram essa diagonal no
 *  teste de formas sintéticas). Repete até nada mais sair: sobra o eixo das linhas, com 1 px.
 *  Vizinhos na convenção do OpenCV: p2 N, p3 NE, p4 E, p5 SE, p6 S, p7 SW, p8 W, p9 NW. */
function afinar(ink, w, h) {
  // Ordem de leitura dos vizinhos: p2, p3, p4, p5, p6, p7, p8, p9 = N, NE, E, SE, S, SW, W, NW.
  const marca = new Uint8Array(ink.length);
  const apaga = (p, iter) => {
    const r = (p / w) | 0;
    const c = p % w;
    if (r === 0 || c === 0 || r === h - 1 || c === w - 1) return false;
    const q = r * w + c;
    const p2 = ink[q - w];
    const p3 = ink[q - w + 1];
    const p4 = ink[q + 1];
    const p5 = ink[q + w + 1];
    const p6 = ink[q + w];
    const p7 = ink[q + w - 1];
    const p8 = ink[q - 1];
    const p9 = ink[q - w - 1];
    const C = (!p2 & (p3 | p4)) + (!p4 & (p5 | p6)) + (!p6 & (p7 | p8)) + (!p8 & (p9 | p2));
    const N1 = (p9 | p2) + (p3 | p4) + (p5 | p6) + (p7 | p8);
    const N2 = (p2 | p3) + (p4 | p5) + (p6 | p7) + (p8 | p9);
    const N = N1 < N2 ? N1 : N2;
    const m = iter === 0 ? (p6 | p7 | !p9) & p8 : (p2 | p3 | !p5) & p4;
    return C === 1 && N >= 2 && N <= 3 && m === 0;
  };
  let varreduras = 0;
  for (let mudou = true; mudou; ) {
    mudou = false;
    for (let iter = 0; iter < 2; iter++) {
      varreduras++;
      marca.fill(1);
      let algum = false;
      for (let r = 1; r < h - 1; r++)
        for (let c = 1; c < w - 1; c++) {
          const p = r * w + c;
          if (ink[p] && apaga(p, iter)) {
            marca[p] = 0;
            algum = true;
          }
        }
      if (algum) {
        for (let p = 0; p < ink.length; p++) if (!marca[p]) ink[p] = 0;
        mudou = true;
      }
    }
  }
  return varreduras;
}

/** Esqueleto → polilinhas: cada aresta do grafo de pixels pertence a uma polilha, que corre de uma
 *  extremidade ou junção até a próxima (ciclos sem junção fecham em si). Devolve índices de pixel. */
function tracar(ink, w) {
  const viz = (p, i) => {
    const r = (p / w) | 0;
    const c = p % w;
    return (r + DR[i]) * w + c + DC[i];
  };
  const grau = new Uint8Array(ink.length);
  for (let p = 0; p < ink.length; p++) {
    if (!ink[p]) continue;
    let g = 0;
    for (let i = 0; i < 8; i++) if (ink[viz(p, i)]) g++;
    grau[p] = g;
  }
  const aresta = new Uint8Array(ink.length * 8);
  const polis = [];
  const andar = (u, i) => {
    const marca = (p, k) => {
      aresta[p * 8 + k] = 1;
      const q = viz(p, k);
      aresta[q * 8 + ((k + 4) % 8)] = 1;
    };
    let prev = u;
    let v = viz(u, i);
    const pts = [u, v];
    marca(u, i);
    while (grau[v] === 2) {
      let j = -1;
      for (let k = 0; k < 8; k++) {
        const q = viz(v, k);
        if (q !== prev && ink[q]) {
          j = k;
          break;
        }
      }
      if (j < 0 || aresta[v * 8 + j]) break;
      marca(v, j);
      const q = viz(v, j);
      pts.push(q);
      prev = v;
      v = q;
    }
    return pts;
  };
  for (let p = 0; p < ink.length; p++) {
    if (!ink[p] || grau[p] === 2) continue;
    for (let i = 0; i < 8; i++) if (ink[viz(p, i)] && !aresta[p * 8 + i]) polis.push(andar(p, i));
  }
  for (let p = 0; p < ink.length; p++) {
    if (!ink[p]) continue;
    for (let i = 0; i < 8; i++) if (ink[viz(p, i)] && !aresta[p * 8 + i]) polis.push(andar(p, i));
  }
  return { polis, esqueleto: polis.reduce((t, pts) => t + pts.length - 1, 0) };
}

/** Média móvel de 3 pontos: tira o degrau do pixel sem deslocar a linha. */
function alisar(pts) {
  if (pts.length < 3) return pts;
  const out = [pts[0]];
  for (let i = 1; i < pts.length - 1; i++)
    out.push([
      (pts[i - 1][0] + pts[i][0] + pts[i + 1][0]) / 3,
      (pts[i - 1][1] + pts[i][1] + pts[i + 1][1]) / 3,
    ]);
  out.push(pts[pts.length - 1]);
  return out;
}

function simplificar(pts, eps) {
  if (pts.length < 3) return pts;
  const manter = new Uint8Array(pts.length);
  manter[0] = manter[pts.length - 1] = 1;
  const pilha = [[0, pts.length - 1]];
  while (pilha.length) {
    const [a, b] = pilha.pop();
    const [ax, ay] = pts[a];
    const [bx, by] = pts[b];
    const dx = bx - ax;
    const dy = by - ay;
    const tam = Math.hypot(dx, dy);
    let melhor = -1;
    let dist = eps;
    for (let i = a + 1; i < b; i++) {
      const d = tam ? Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / tam : 0;
      if (d > dist) {
        dist = d;
        melhor = i;
      }
    }
    if (melhor > 0) {
      manter[melhor] = 1;
      pilha.push([a, melhor], [melhor, b]);
    }
  }
  return pts.filter((_, i) => manter[i]);
}

const comprimento = (pts) => {
  let t = 0;
  for (let i = 1; i < pts.length; i++)
    t += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  return t;
};

/** Extremidade de uma polilha aberta que encosta noutra (junção): a linha já cobre com a cabeça
 *  arredondada; pontas soltas ficam como estão. */
/** Caminho SVG compacto: coordenadas relativas e inteiras (1 px do PNG vale 0,67 px na tela a
 *  1440), trechos alinhados com h/v, sem espaço antes de número negativo e sem repetir o comando
 *  (l-4 3-8-2). */
function caminho(polilinhas) {
  const num = (n) => (n < 0 ? `${n}` : ` ${n}`);
  let d = '';
  for (const pts of polilinhas) {
    let x = Math.round(pts[0][0]);
    let y = Math.round(pts[0][1]);
    d += `M${x} ${y}`;
    let cmd = '';
    for (let i = 1; i < pts.length; i++) {
      const nx = Math.round(pts[i][0]);
      const ny = Math.round(pts[i][1]);
      const dx = nx - x;
      const dy = ny - y;
      if (!dx && !dy) continue;
      const c = dx && !dy ? `h${num(dx)}` : dy && !dx ? `v${num(dy)}` : `l${num(dx)}${num(dy)}`;
      d += c[0] === cmd ? c.slice(1) : c;
      cmd = c[0];
      x = nx;
      y = ny;
    }
  }
  return d;
}

/** Dilatação de 1 px (Chebyshev) por máximos separáveis. */
function dilatar(a, w, h) {
  const t = new Uint8Array(a.length);
  const o = new Uint8Array(a.length);
  for (let r = 0; r < h; r++)
    for (let c = 0; c < w; c++) {
      const p = r * w + c;
      t[p] = a[p] || (c > 0 && a[p - 1]) || (c < w - 1 && a[p + 1]) ? 1 : 0;
    }
  for (let r = 0; r < h; r++)
    for (let c = 0; c < w; c++) {
      const p = r * w + c;
      o[p] = t[p] || (r > 0 && t[p - w]) || (r < h - 1 && t[p + w]) ? 1 : 0;
    }
  return o;
}

// Vizinhos em anel, do norte em sentido horário: N, NE, E, SE, S, SW, W, NW (o primeiro e o
// último também se tocam).
const DR = [-1, -1, 0, 1, 1, 1, 0, -1];
const DC = [0, 1, 1, 1, 0, -1, -1, -1];

async function principal() {
  const args = process.argv.slice(2);
  if (args.includes('--ajuda') || args.includes('-h')) {
    console.log(AJUDA);
    return;
  }
  const posicos = [];
  const opcoes = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--saida') opcoes.saida = args[++i];
    else if (a === '--checar') opcoes.checar = true;
    else if (a.startsWith('--')) {
      console.error(`opção desconhecida: ${a}`);
      return;
    } else posicos.push(a);
  }
  const pasta = posicos[0];
  if (!pasta) {
    console.error(
      'uso: bun scripts/desenhos.mjs <pasta-com-bh-*.png> [--saida public/textura] [--checar]',
    );
    return;
  }
  const saida = opcoes.saida ?? 'public/textura';

  const sharp = (await import('sharp')).default;
  const arquivos = fs
    .readdirSync(pasta)
    .filter((f) => /^bh-[\w-]+\.png$/.test(f))
    .sort();
  if (!arquivos.length) {
    console.error(`nenhum bh-*.png em ${pasta}`);
    process.exit(2);
  }
  fs.mkdirSync(saida, { recursive: true });

  /** Componentes de 8 vizinhos com menos de `limite` pixels saem (poeira do bitmap). */
  const resumo = [];
  for (const nome of arquivos) {
    const { data, info } = await sharp(path.join(pasta, nome))
      .greyscale()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const { width: w, height: h } = info;
    let tinta = 0;
    const cheio = new Uint8Array(w * h);
    for (let p = 0; p < cheio.length; p++)
      if (data[p] < 128) {
        cheio[p] = 1;
        tinta++;
      }
    const ink = cheio.slice();
    const manchas = tirarManchas(ink, w, h, MANCHA);
    const varreduras = afinar(ink, w, h);
    const { polis, esqueleto } = tracar(ink, w);
    const linhas = [];
    let curtas = 0;
    for (const pts of polis) {
      // Ciclo fechado (contorno de coluna, janela, faixa): o primeiro e o último pontos coincidem, e a
      // simplificação não serve — a corda inicial tem comprimento zero e o ciclo inteiro colapsava em
      // nada (perdia 6 % da tinta de Liberdade). Abre no ponto mais distante do início, em duas
      // polilinhas, que se encontram nas pontas.
      const xy = pts.map((p) => [(p % w) + 0.5, ((p / w) | 0) + 0.5]);
      const partes = [];
      if (xy.length > 3 && pts[0] === pts[pts.length - 1]) {
        let longe = 0;
        let max = -1;
        for (let i = 1; i < xy.length - 1; i++) {
          const d = Math.hypot(xy[i][0] - xy[0][0], xy[i][1] - xy[0][1]);
          if (d > max) {
            max = d;
            longe = i;
          }
        }
        partes.push(xy.slice(0, longe + 1), xy.slice(longe));
      } else partes.push(xy);
      for (const parte of partes) {
        const s = simplificar(alisar(parte), TOLERANCIA);
        if (comprimento(s) < MINIMO) {
          curtas++;
          continue;
        }
        linhas.push(s);
      }
    }
    // viewBox aparado no desenho (2 px de folga)
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    for (const s of linhas)
      for (const [x, y] of s) {
        x0 = Math.min(x0, x);
        y0 = Math.min(y0, y);
        x1 = Math.max(x1, x);
        y1 = Math.max(y1, y);
      }
    x0 = Math.max(0, Math.floor(x0) - 2);
    y0 = Math.max(0, Math.floor(y0) - 2);
    const W = Math.min(w, Math.ceil(x1) + 3) - x0;
    const H = Math.min(h, Math.ceil(y1) + 3) - y0;
    const base = nome.replace(/\.png$/, '');
    const id = base.replace(/^bh-/, '');
    const titulos = {
      'raul-soares': 'Praça Raul Soares',
      liberdade: 'Praça da Liberdade',
      'serra-do-curral': 'Serra do Curral',
      'praca-do-papa': 'Praça do Papa',
      mineirao: 'Mineirão',
      pampulha: 'Lagoa da Pampulha',
      'praca-sete': 'Praça Sete',
    };
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="${x0} ${y0} ${W} ${H}" ` +
      `fill="none" stroke="currentColor" stroke-width="${TRACO}" stroke-linecap="round" stroke-linejoin="round">` +
      `<!-- ${titulos[id] ?? id}: desenho em traço gerado por IA a partir de foto livre (docs/brief/desenhos/CREDITOS.md), ` +
      `vetorizado por scripts/desenhos.mjs a partir de ${nome}. -->` +
      `<path vector-effect="non-scaling-stroke" d="${caminho(linhas)}"/></svg>\n`;
    fs.writeFileSync(path.join(saida, `${base}.svg`), svg);

    let checagem = '';
    if (opcoes.checar) {
      // Re-renderiza no quadro inteiro do PNG (traço de 3 px, a espessura média) e compara com a tinta.
      const prova = svg
        .replace(
          `width="${W}" height="${H}" viewBox="${x0} ${y0} ${W} ${H}"`,
          `width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"`,
        )
        .replace('stroke-width="1.5"', 'stroke-width="3"')
        .replace(' stroke="currentColor"', ' stroke="#000"')
        .replace(' vector-effect="non-scaling-stroke"', '')
        .replace(/<!--[\s\S]*?-->/, '');
      const { data: rnd } = await sharp(Buffer.from(prova))
        .flatten({ background: '#fff' })
        .greyscale()
        .raw()
        .toBuffer({ resolveWithObject: true });
      const vec = new Uint8Array(w * h);
      let nv = 0;
      for (let p = 0; p < vec.length; p++)
        if (rnd[p] < 160) {
          vec[p] = 1;
          nv++;
        }
      const vDil = dilatar(vec, w, h);
      // A tinta original foi afinada no lugar; o original vem de novo do arquivo.
      let cobertos = 0;
      const orig = cheio;
      let t = 0;
      for (let p = 0; p < orig.length; p++)
        if (orig[p]) {
          t++;
          if (vDil[p]) cobertos++;
        }
      const oDil = dilatar(orig, w, h);
      let certos = 0;
      for (let p = 0; p < vec.length; p++) if (vec[p] && oDil[p]) certos++;
      checagem = ` · checagem: cobertura ${((100 * cobertos) / t).toFixed(1)} % · precisão ${((100 * certos) / nv).toFixed(1)} %`;
    }
    const nos = linhas.reduce((n, s) => n + s.length, 0);
    resumo.push({
      desenho: base,
      png: `${w}×${h}`,
      tinta,
      manchas,
      varreduras,
      esqueleto,
      linhas: linhas.length,
      curtas,
      nos,
      viewBox: `${W}×${H}`,
      kb: Math.round(Buffer.byteLength(svg) / 102.4) / 10,
      checagem,
    });
  }
  console.table(resumo);
}

if (import.meta.main) await principal();

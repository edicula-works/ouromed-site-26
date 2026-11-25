// Imagens de marca (fase 3, 25/11): o cartão de compartilhamento public/og.png (1200×630) e o ícone
// da Apple src/app/apple-icon.png (180×180), a partir da marca e da paleta atuais.
//   bun scripts/marca.tsx
// O cartão é composto em HTML (fundo azul-noite do topo, a cidade em traço, o Wordmark do site em 4×,
// a frase da marca) e capturado no Chromium do Playwright, com a Archivo do Google Fonts — a mesma do
// site; o script para se a fonte não carregar, para nunca sair um cartão com letra de fallback. O
// ícone é o src/app/icon.svg (que o Next também serve de favicon) rasterizado com o sharp.
// Por isso roda com Bun: importa o Wordmark (TSX) e o conteúdo do site sem build.
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { renderToStaticMarkup } from 'react-dom/server';
import sharp from 'sharp';
import { Wordmark } from '@/components/Wordmark';
import { site } from '@/data/site';

const raiz = process.cwd();
const cidade = fs.readFileSync(path.join(raiz, 'public/textura/bh-cidade.png')).toString('base64');

const pagina = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,500;1,700&display=block">
<style>
  :root {
    --c-night: #0b2545;
    --c-gold: #d4ad2a;
    --c-paper: #f7f8f9;
    --font-archivo: 'Archivo', system-ui, sans-serif;
  }
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
  body {
    position: relative;
    color: var(--c-paper);
    font-family: var(--font-archivo);
    background:
      radial-gradient(80% 60% at 50% 38%, rgb(3 68 135 / 0.55), transparent 70%),
      var(--c-night);
  }
  /* A cidade em traço, como no topo da home: 20 % da largura de altura, ouro a 15 %. */
  .cidade {
    position: absolute;
    left: -4%;
    right: -4%;
    bottom: 0;
    height: 240px;
    background: rgb(212 173 42 / 0.15);
    -webkit-mask: url(data:image/png;base64,${cidade}) center bottom / cover no-repeat;
    mask: url(data:image/png;base64,${cidade}) center bottom / cover no-repeat;
  }
  .conteudo {
    position: relative;
    display: grid;
    align-content: center;
    justify-items: start;
    gap: 44px;
    height: 100%;
    padding: 0 104px;
  }
  /* O Wordmark do site (src/components/Wordmark.tsx) em 4×: os SVGs têm viewBox, o texto escala junto. */
  .wordmark { display: inline-flex; align-items: center; gap: 0.4em; }
  .wordmark__mark { width: 96px; height: 96px; }
  .wordmark__text {
    width: 368px;
    height: 96px;
    overflow: visible;
    font-family: var(--font-archivo);
    font-size: 22px;
    font-weight: 700;
    font-style: italic;
    letter-spacing: -0.02em;
  }
  .wordmark__ouro { fill: var(--c-gold); }
  .wordmark__med { fill: var(--c-paper); }
  .frase {
    margin: 0;
    font-size: 48px;
    font-weight: 500;
    line-height: 1.15;
    letter-spacing: -0.01em;
  }
</style></head>
<body>
  <div class="cidade"></div>
  <div class="conteudo">
    ${renderToStaticMarkup(<Wordmark />)}
    <p class="frase">${site.tagline}</p>
  </div>
</body></html>`;

const browser = await chromium.launch();
const p = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await p.setContent(pagina, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
// A letra tem de ser a Archivo de verdade (itálica 700 para o nome, 500 para a frase).
const fontes = await p.evaluate(() => ({
  nome: document.fonts.check('italic 700 22px Archivo'),
  frase: document.fonts.check('500 48px Archivo'),
}));
if (!fontes.nome || !fontes.frase) {
  await browser.close();
  throw new Error(
    `a Archivo não carregou (${JSON.stringify(fontes)}); sem rede? O cartão não foi gerado.`,
  );
}
const captura = await p.screenshot({ type: 'png' });
await browser.close();

// PNG otimizado: paleta de 256 cores com pontilhado fica com o desvio médio de 0,14 por canal (o
// degradê do fundo não cria faixas) e cai de 244 para 114 KB.
const og = await sharp(captura)
  .png({ palette: true, colours: 256, dither: 1, compressionLevel: 9 })
  .toBuffer();
fs.writeFileSync(path.join(raiz, 'public/og.png'), og);

// Ícone da Apple: o favicon do site (src/app/icon.svg) em 180 × 180.
const icone = fs.readFileSync(path.join(raiz, 'src/app/icon.svg'));
const apple = await sharp(icone, { density: Math.round((72 * 180) / 32) })
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toBuffer();
fs.writeFileSync(path.join(raiz, 'src/app/apple-icon.png'), apple);

for (const [arquivo, buf] of [
  ['public/og.png', og],
  ['src/app/apple-icon.png', apple],
]) {
  const m = await sharp(buf).metadata();
  console.log(
    `${arquivo}: ${m.width}×${m.height} ${m.format}, ${Math.round(buf.length / 1024)} KB`,
  );
}
console.log(`frase: "${site.tagline}"`);

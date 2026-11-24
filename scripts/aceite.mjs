// Aplica os critérios automáticos de docs/CRITERIOS-DE-ACEITE.md num preview e imprime
// PASSA / FALHA / BLOQUEADO com o valor medido.
//   node scripts/aceite.mjs https://<preview>.vercel.app "?_vercel_share=<token>"
// O segundo argumento (opcional) é a query de acesso ao preview protegido.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const [, , base, q = ''] = process.argv;
if (!base) {
  console.error('uso: node scripts/aceite.mjs <url-base> [query de acesso]');
  process.exit(2);
}
const url = (p) => `${base.replace(/\/$/, '')}${p}${q}`;
const pages = ['/', '/para-voce', '/para-empresas', '/sobre', '/contato'];
const axeSrc = fs.readFileSync(
  createRequire(import.meta.url).resolve('axe-core/axe.min.js'),
  'utf8',
);
const rows = [];
const add = (id, ok, value, note = '') =>
  rows.push({ id, status: ok === null ? 'BLOQUEADO' : ok ? 'PASSA' : 'FALHA', value, note });

const browser = await chromium.launch();
const desk = { viewport: { width: 1440, height: 900 }, locale: 'pt-BR' };
const mob = {
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  locale: 'pt-BR',
};

// Visita sem intro (a intro é medida à parte): marca a sessão antes de carregar.
async function open(opts, path) {
  const ctx = await browser.newContext(opts);
  await ctx.addInitScript(() => {
    try {
      sessionStorage.setItem('om-intro', '1');
    } catch {}
  });
  const p = await ctx.newPage();
  await p.goto(url(path), { waitUntil: 'networkidle', timeout: 45000 });
  await p.waitForTimeout(1500);
  return { ctx, p };
}

const foldContact = () => {
  const vh = innerHeight;
  const vis = (a) => {
    const r = a.getBoundingClientRect();
    const cs = getComputedStyle(a);
    return (
      r.width > 0 &&
      r.top >= 0 &&
      r.bottom <= vh &&
      cs.visibility !== 'hidden' &&
      cs.display !== 'none'
    );
  };
  const tel = [...document.querySelectorAll('a[href^="tel:"]')].some(vis);
  const wa = [...document.querySelectorAll('a[href*="wa.me"]')].some(vis);
  const btns = [...document.querySelectorAll('.btn')].filter(vis).length;
  return { tel, wa, btns };
};

// 1.1, 1.2, 1.3, 3.7 e 7.4 por página
for (const path of pages) {
  for (const [name, opts] of [
    ['desktop', desk],
    ['celular', mob],
  ]) {
    const { ctx, p } = await open(opts, path);
    const f = await p.evaluate(foldContact);
    add(
      `1.1 ${path} ${name}`,
      f.tel && f.wa,
      `tel ${f.tel ? 'sim' : 'não'} · WhatsApp ${f.wa ? 'sim' : 'não'}`,
    );
    if (name === 'celular') {
      const bar = await p.evaluate(() => {
        const b = document.querySelector('.ctabar');
        return (
          !!b && getComputedStyle(b).position === 'fixed' && !!b.querySelector('a[href^="tel:"]')
        );
      });
      add(`1.2 ${path}`, bar, bar ? 'barra fixa com Ligar' : 'sem barra fixa');
      const over = await p.evaluate(() =>
        [...document.querySelectorAll('h1, h2')]
          .filter((h) => h.getBoundingClientRect().right > innerWidth + 1)
          .map((h) => h.textContent.trim().slice(0, 30)),
      );
      add(
        `7.5 ${path} celular`,
        over.length === 0,
        over.length ? `passa da tela: ${over.join(' | ')}` : 'títulos cabem na largura',
      );
    } else if (path === '/') {
      add('1.3 / desktop', f.btns <= 3, `${f.btns} ações na 1ª tela`);
    }
    if (name === 'desktop') {
      const a11y = await p.evaluate(async (src) => {
        // biome-ignore lint/security/noGlobalEval: axe-core local, injetado só no navegador de teste
        eval(src);
        const r = await window.axe.run(document, { resultTypes: ['violations'] });
        const bad = r.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
        const small = [
          ...document.querySelectorAll('a,button,summary,input,select,textarea'),
        ].filter((el) => {
          const b = el.getBoundingClientRect();
          return (
            b.width > 0 &&
            b.height > 0 &&
            (b.width < 24 || b.height < 24) &&
            getComputedStyle(el).visibility !== 'hidden'
          );
        }).length;
        return {
          bad: bad.map((v) => `${v.id}(${v.nodes.length})`),
          h1: document.querySelectorAll('h1').length,
          lang: document.documentElement.lang,
          skip: document.querySelector('a,button,input')?.classList.contains('skip-link'),
          small,
        };
      }, axeSrc);
      add(
        `7.3 ${path}`,
        a11y.bad.length === 0,
        a11y.bad.length ? a11y.bad.join(' ') : '0 serious/critical',
      );
      add(
        `7.4 ${path}`,
        a11y.h1 === 1 && a11y.lang === 'pt-BR' && a11y.skip && a11y.small === 0,
        `h1 ${a11y.h1} · lang ${a11y.lang} · skip-link 1º ${a11y.skip ? 'sim' : 'não'} · alvos < 24 px ${a11y.small}`,
      );
    }
    await ctx.close();
  }
}

// Home no desktop: topo, densidade, tipo, cor, textura, JS, vitais
{
  const { ctx, p } = await open(desk, '/');
  const m = await p.evaluate(() => {
    const vw = innerWidth;
    const vh = innerHeight;
    const hero = document.querySelector('.hero');
    const hm = hero?.querySelector('.media');
    const hr = hero?.getBoundingClientRect();
    const h1 = document.querySelector('h1');
    const H = document.documentElement.scrollHeight;
    const screens = H / vh;
    const medias = [...document.querySelectorAll('.media')].filter(
      (e) => e.getBoundingClientRect().width > 120,
    );
    const empty = medias.filter((e) => e.classList.contains('media--empty')).length;
    const words = (document.body.innerText || '').split(/\s+/).filter((w) => w.length > 1).length;
    const fams = new Set();
    const weights = new Set();
    let mono = 0;
    let texts = 0;
    let monoWrong = false;
    for (const el of document.querySelectorAll('body *')) {
      if (
        !el.childNodes.length ||
        ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
      )
        continue;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      fams.add(cs.fontFamily.split(',')[0].replace(/["']/g, '').trim());
      weights.add(cs.fontWeight);
      texts++;
      if (/mono/i.test(cs.fontFamily)) {
        mono++;
        if (el.closest('h1, h2, h3, nav, .btn')) monoWrong = true;
      }
    }
    const tex = [...document.querySelectorAll('.tex')].map(
      (t) => getComputedStyle(t).backgroundColor,
    );
    const js = performance
      .getEntriesByType('resource')
      .filter((r) => r.initiatorType === 'script')
      .reduce((a, r) => a + (r.encodedBodySize || r.transferSize || 0), 0);
    return {
      heroShare: hr ? Math.round((Math.min(hr.bottom, vh) / vh) * 100) : 0,
      heroFull: hr ? hr.width >= vw * 0.95 : false,
      heroEmpty: hm ? hm.classList.contains('media--empty') : true,
      title: h1 ? h1.innerText.replace(/\s+/g, ' ').trim() : '',
      titlePx: h1 ? Math.round(parseFloat(getComputedStyle(h1).fontSize)) : 0,
      screens: Math.round(screens * 10) / 10,
      perScreen: Math.round((medias.length / screens) * 10) / 10,
      empty,
      wordsPerScreen: Math.round(words / screens),
      fams: [...fams],
      weights: [...weights],
      monoShare: texts ? Math.round((mono / texts) * 100) : 0,
      monoWrong,
      bg:
        getComputedStyle(document.body).backgroundColor ||
        getComputedStyle(document.documentElement).backgroundColor,
      htmlBg: getComputedStyle(document.documentElement).backgroundColor,
      tex,
      jsKB: Math.round(js / 1024),
    };
  });
  const shareOk = m.heroFull && m.heroShare >= 85;
  add(
    '2.1 topo de ponta a ponta',
    m.heroEmpty ? null : shareOk,
    `${m.heroShare} % da tela · ponta a ponta ${m.heroFull ? 'sim' : 'não'}`,
    m.heroEmpty ? `layout ${shareOk ? 'pronto' : 'fora'}; falta o vídeo do topo` : '',
  );
  const words = m.title.split(' ').length;
  add(
    '2.2 título',
    words <= 8 && m.titlePx >= 48 && m.titlePx <= 80,
    `"${m.title}" · ${words} palavras · ${m.titlePx} px`,
  );
  add('3.1 altura da home', m.screens <= 10, `${m.screens} telas`);
  add(
    '3.2 imagens por tela',
    m.empty ? null : m.perScreen >= 1.2,
    `${m.perScreen} por tela`,
    m.empty ? `${m.empty} slots ainda vazios` : '',
  );
  add('3.3 palavras por tela', m.wordsPerScreen <= 120, `${m.wordsPerScreen}`);
  add(
    '3.4 fontes e pesos',
    m.fams.length <= 2 && m.weights.length <= 3,
    `${m.fams.join(', ')} · pesos ${m.weights.sort().join('/')}`,
  );
  const cream = /245, 240, 232|244, 241, 234/.test(m.htmlBg);
  add(
    '3.6 tells (auto)',
    !cream && !m.monoWrong && m.monoShare <= 30,
    `fundo ${m.htmlBg} · mono em ${m.monoShare} % dos textos${m.monoWrong ? ', inclusive em título/nav/botão' : ''}`,
    'mono só para dados e legendas; fios e eyebrows: manual',
  );
  const alphas = m.tex.map((c) => Number((/rgba?\([^)]*,\s*([\d.]+)\)/.exec(c) || [])[1] ?? 1));
  add(
    '6.2 textura',
    m.tex.length <= 3 && alphas.every((a) => a <= 0.15),
    `${m.tex.length} lugares · opacidades ${alphas.join(', ')}`,
  );
  add('7.2 JS da home', m.jsKB <= 220, `${m.jsKB} KB`);
  const tex = await p.evaluate(async () =>
    (await fetch('/textura/serra-do-curral.svg')).text().then((t) => t.length),
  );
  add('6.2 arquivo da textura', tex <= 60 * 1024, `${Math.round(tex / 1024)} KB`);
  const sitemap = await p.evaluate(async () => (await fetch('/sitemap.xml')).text());
  const n = (sitemap.match(/<loc>/g) || []).length;
  add('3.7 páginas', n <= 5, `${n} no sitemap`);
  await ctx.close();
}

// 5.2 intro: quadros numa visita nova; 5.3 reduced motion
{
  const ctx = await browser.newContext(desk);
  const p = await ctx.newPage();
  await p.goto(url('/'), { waitUntil: 'commit' });
  const t0 = Date.now();
  const frames = [];
  for (const ms of [300, 600, 900, 1250, 1600]) {
    await p.waitForTimeout(Math.max(0, ms - (Date.now() - t0)));
    frames.push(
      await p
        .evaluate(() => {
          const el = document.getElementById('intro');
          if (!el) return { on: false };
          const cs = getComputedStyle(el);
          return {
            on: document.documentElement.classList.contains('intro-on'),
            op: Number(cs.opacity),
            vis: cs.visibility,
            tr: cs.translate === 'none' && cs.transform === 'none',
          };
        })
        .catch(() => ({ on: false })),
    );
  }
  const slid = frames.some((f) => f.on && f.tr === false);
  const gone =
    frames.at(-1).on === false || frames.at(-1).vis === 'hidden' || frames.at(-1).op < 0.05;
  const seen = frames.some((f) => f.on && f.op > 0.9);
  add(
    '5.2 intro',
    seen && gone && !slid,
    frames.map((f) => (f.on ? `${f.op.toFixed(2)}` : 'fora')).join(' → '),
    slid ? 'deslizou' : 'sem deslizar',
  );
  await p.goto(url('/'), { waitUntil: 'commit' });
  await p.waitForTimeout(400);
  const again = await p.evaluate(() => document.documentElement.classList.contains('intro-on'));
  add('5.2 intro só na 1ª visita', !again, again ? 'rodou de novo' : 'não rodou na 2ª visita');
  await ctx.close();
  const rctx = await browser.newContext({ ...desk, reducedMotion: 'reduce' });
  const rp = await rctx.newPage();
  await rp.goto(url('/'), { waitUntil: 'networkidle' });
  await rp.waitForTimeout(800);
  const r = await rp.evaluate(() => ({
    intro: document.documentElement.classList.contains('intro-on'),
    motion: document.documentElement.classList.contains('motion'),
    running: document.getAnimations().filter((a) => a.playState === 'running').length,
  }));
  add(
    '5.3 reduced motion',
    !r.intro && !r.motion && r.running === 0,
    `intro ${r.intro ? 'sim' : 'não'} · animações rodando ${r.running}`,
  );
  await rctx.close();
}

await browser.close();
const w = Math.max(...rows.map((r) => r.id.length));
for (const r of rows)
  console.log(
    `${r.status.padEnd(9)} ${r.id.padEnd(w)}  ${r.value}${r.note ? `  (${r.note})` : ''}`,
  );
const c = (s) => rows.filter((r) => r.status === s).length;
console.log(
  `\n${c('PASSA')} passam · ${c('FALHA')} falham · ${c('BLOQUEADO')} bloqueados. Manuais: ver docs/CRITERIOS-DE-ACEITE.md.`,
);
process.exit(c('FALHA') ? 1 : 0);

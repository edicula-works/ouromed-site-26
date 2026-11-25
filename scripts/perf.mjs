// fps por seção numa rolagem contínua com o processador 4× mais lento + peso da página.
//   node scripts/perf.mjs <url> [cpu=4] [css extra]   (TOPO=1: só o topo, ida e volta 4×)
import { chromium } from 'playwright';

const [, , url, cpu = '4', css = ''] = process.argv;
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, locale: 'pt-BR' });
await ctx.addInitScript(() => {
  try {
    sessionStorage.setItem('om-intro', '1');
  } catch {}
});
const p = await ctx.newPage();
const net = { js: 0, css: 0, font: 0, img: 0, other: 0, n: 0 };
p.on('response', async (r) => {
  try {
    const len = Number(r.headers()['content-length'] || (await r.body()).length);
    const t = r.request().resourceType();
    net.n++;
    net[
      t === 'script'
        ? 'js'
        : t === 'stylesheet'
          ? 'css'
          : t === 'font'
            ? 'font'
            : t === 'image'
              ? 'img'
              : 'other'
    ] += len;
  } catch {}
});
await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
if (css) await p.addStyleTag({ content: css });
await p.waitForTimeout(2500);
const cdp = await ctx.newCDPSession(p);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: Number(cpu) });
await p.evaluate(() => {
  window.__f = [];
  let last = performance.now();
  const secs = [...document.querySelectorAll('main section, footer')];
  const name = (s) =>
    s.getAttribute('aria-labelledby') || s.id || s.className.split(' ')[0] || s.tagName;
  const tick = (t) => {
    const mid = innerHeight / 2;
    const s = secs.findLast((e) => {
      const r = e.getBoundingClientRect();
      return r.top <= mid && r.bottom > mid;
    });
    window.__f.push([t - last, s ? name(s) : '?']);
    last = t;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
await p.mouse.move(720, 450);
const H = await p.evaluate(() => document.documentElement.scrollHeight);
if (process.env.TOPO) {
  // Só o topo: desce e sobe 1,6 tela, 4 vezes; mede só os quadros do topo.
  for (let k = 0; k < 4; k++) {
    for (let y = 0; y < 1440; y += 60) {
      await p.mouse.wheel(0, 60);
      await p.waitForTimeout(16);
    }
    for (let y = 0; y < 1440; y += 60) {
      await p.mouse.wheel(0, -60);
      await p.waitForTimeout(16);
    }
  }
} else
  for (let y = 0; y < H; y += 60) {
    await p.mouse.wheel(0, 60);
    await p.waitForTimeout(16);
  }
await p.waitForTimeout(500);
const rows = await p.evaluate(() => {
  const by = new Map();
  for (const [d, s] of window.__f.slice(5)) {
    const a = by.get(s) || [];
    a.push(d);
    by.set(s, a);
  }
  return [...by].map(([s, a]) => ({
    s,
    fps: Math.round(1000 / (a.reduce((x, y) => x + y, 0) / a.length)),
    long: a.filter((x) => x > 50).length,
    n: a.length,
  }));
});
for (const r of rows)
  console.log(
    r.s.padEnd(22),
    String(r.fps).padStart(3),
    'fps',
    String(r.long).padStart(3),
    'quadros > 50 ms',
  );
const kb = (x) => Math.round(x / 1024);
console.log(
  `peso: JS ${kb(net.js)} KB · CSS ${kb(net.css)} KB · fontes ${kb(net.font)} KB · imagens ${kb(net.img)} KB · outros ${kb(net.other)} KB · ${net.n} pedidos`,
);
await b.close();

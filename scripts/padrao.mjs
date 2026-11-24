// Mede o "padrão" de uma lista de sites com as mesmas regras, para comparar a Ouromed com as
// referências do Awwwards e com os melhores sites de ambulância (docs/brief/PADRAO.md).
//   node scripts/padrao.mjs lista.tsv saida/      (tsv: grupo<TAB>nome<TAB>url)
// Grava saida/<nome>-{desk,mob}.jpg (1ª tela), saida/<nome>-full.jpg e saida/padrao.json.
import fs from 'node:fs';
import { chromium } from 'playwright';

const [, , list, out] = process.argv;
fs.mkdirSync(out, { recursive: true });
const rows = fs
  .readFileSync(list, 'utf8')
  .trim()
  .split('\n')
  .map((l) => l.split('\t'));

// Banner de cookies fora da medida (sem clicar em nada).
const hideCookies = () => {
  for (const e of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(e);
    if (
      (cs.position === 'fixed' || cs.position === 'sticky') &&
      /cookie|privacidade|privacy|datenschutz|consent|lgpd/i.test(e.innerText || '') &&
      (e.innerText || '').length < 2500 &&
      e.offsetHeight > 60
    )
      e.style.display = 'none';
  }
};

const measure = () => {
  const vw = innerWidth;
  const vh = innerHeight;
  const H = document.documentElement.scrollHeight;
  const vis = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return (
      r.width > 2 &&
      r.height > 2 &&
      cs.visibility !== 'hidden' &&
      cs.display !== 'none' &&
      Number(cs.opacity) > 0.05
    );
  };
  const inFold = (r) => r.top < vh && r.bottom > 0;
  // Mídia dominante da 1ª tela
  const medias = [
    ...document.querySelectorAll(
      'img,video,canvas,picture,svg,[style*="background-image"],div,section,header',
    ),
  ]
    .filter((el) => {
      if (!vis(el)) return false;
      const t = el.tagName;
      if (t === 'IMG' || t === 'VIDEO' || t === 'CANVAS') return true;
      if (t === 'svg') return el.getBoundingClientRect().width > 200;
      return getComputedStyle(el).backgroundImage.includes('url(');
    })
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => inFold(r))
    .map(({ el, r }) => ({
      kind:
        el.tagName === 'VIDEO'
          ? 'vídeo'
          : el.tagName === 'CANVAS'
            ? 'canvas'
            : el.tagName === 'svg'
              ? 'svg'
              : 'foto',
      area: Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0)) * Math.min(r.width, vw),
      h: Math.min(r.bottom, vh) - Math.max(r.top, 0),
      w: r.width,
    }))
    .sort((a, b) => b.area - a.area);
  const hero = medias[0];
  const heroShare = hero ? hero.area / (vw * vh) : 0;
  // Título: h1, ou o maior texto da 1ª tela
  const texts = [...document.querySelectorAll('h1,h2,p,span,a,div')].filter(
    (el) => vis(el) && el.children.length === 0 && (el.innerText || '').trim().length > 2,
  );
  const foldTexts = texts.filter((el) => inFold(el.getBoundingClientRect()));
  const h1 = document.querySelector('h1');
  const titleEl =
    h1 && vis(h1)
      ? h1
      : foldTexts.sort(
          (a, b) =>
            parseFloat(getComputedStyle(b).fontSize) - parseFloat(getComputedStyle(a).fontSize),
        )[0];
  const title = titleEl ? titleEl.innerText.trim().replace(/\s+/g, ' ') : '';
  const titlePx = titleEl ? parseFloat(getComputedStyle(titleEl).fontSize) : 0;
  // CTAs e telefone na 1ª tela
  const ctas = [...document.querySelectorAll('a,button')].filter((el) => {
    if (!vis(el)) return false;
    const r = el.getBoundingClientRect();
    if (!inFold(r) || r.top < 0) return false;
    const cs = getComputedStyle(el);
    const filled =
      cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && cs.backgroundColor !== 'transparent';
    const outlined = parseFloat(cs.borderTopWidth) > 0 || cs.boxShadow !== 'none';
    return (
      (filled || outlined) &&
      r.height >= 28 &&
      r.width >= 60 &&
      (el.innerText || '').trim().length > 1
    );
  });
  const foldText = foldTexts.map((e) => e.innerText).join(' ');
  const tel =
    [...document.querySelectorAll('a[href^="tel:"],a[href*="wa.me"],a[href*="whatsapp"]')].some(
      (a) => vis(a) && inFold(a.getBoundingClientRect()),
    ) || /\(?\d{2}\)?\s?\d{4,5}[-\s]?\d{4}|0800[\s\d]+|\+\d{2}[\s\d]{8,}/.test(foldText);
  // Estrutura
  const sections = [
    ...document.querySelectorAll('main > *, main section, body > section, body > div > section'),
  ].filter((el) => vis(el) && el.getBoundingClientRect().height > vh * 0.25);
  const uniqSections = sections.filter((s) => !sections.some((o) => o !== s && o.contains(s)));
  const words = (document.body.innerText || '').split(/\s+/).filter((w) => w.length > 1).length;
  const screens = H / vh;
  const imgs = [...document.querySelectorAll('img,video')].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 120 && r.height > 90;
  }).length;
  const interactiveFold = [...document.querySelectorAll('a,button,input,select')].filter(
    (el) => vis(el) && inFold(el.getBoundingClientRect()),
  ).length;
  // Tipo e cor
  const fams = new Map();
  const weights = new Set();
  const colors = new Set();
  for (const el of texts.slice(0, 1500)) {
    const cs = getComputedStyle(el);
    const f = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    const n = (el.innerText || '').length;
    fams.set(f, (fams.get(f) || 0) + n);
    weights.add(cs.fontWeight);
    colors.add(cs.color);
  }
  const totalChars = [...fams.values()].reduce((a, b) => a + b, 0) || 1;
  const families = [...fams.entries()]
    .filter(([, n]) => n / totalChars > 0.03)
    .sort((a, b) => b[1] - a[1])
    .map(([f]) => f);
  // Motion
  const anims = document.getAnimations ? document.getAnimations().length : 0;
  const withTransition = [...document.querySelectorAll('a,button,img,[class]')]
    .slice(0, 4000)
    .filter((el) => {
      const t = getComputedStyle(el).transitionDuration;
      return t && t.split(',').some((x) => parseFloat(x) > 0);
    }).length;
  const lenis =
    document.documentElement.classList.contains('lenis') || !!document.querySelector('.lenis');
  const video = !!document.querySelector('video');
  const gsap = !!window.gsap || !!window.ScrollTrigger;
  // Técnica
  const res = performance.getEntriesByType('resource').filter((r) => r.initiatorType === 'script');
  const jsKB = Math.round(
    res.reduce((a, r) => a + (r.encodedBodySize || r.transferSize || 0), 0) / 1024,
  );
  return {
    hero: hero ? hero.kind : 'texto',
    heroShare: Math.round(heroShare * 100),
    heroFullBleed: hero ? hero.w >= vw * 0.95 : false,
    title,
    titleWords: title ? title.split(/\s+/).length : 0,
    titlePx: Math.round(titlePx),
    ctasFold: ctas.length,
    telFold: tel,
    sections: uniqSections.length,
    screens: Math.round(screens * 10) / 10,
    wordsPerScreen: Math.round(words / screens),
    imgsPerScreen: Math.round((imgs / screens) * 10) / 10,
    interactiveFold,
    families,
    weights: weights.size,
    textColors: colors.size,
    anims,
    withTransition,
    lenis,
    video,
    gsap,
    jsKB,
  };
};

const vitals = () =>
  new Promise((resolve) => {
    let lcp = 0;
    let cls = 0;
    try {
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) lcp = Math.max(lcp, e.startTime);
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) if (!e.hadRecentInput) cls += e.value;
      }).observe({ type: 'layout-shift', buffered: true });
    } catch {}
    setTimeout(() => resolve({ lcp: Math.round(lcp), cls: Math.round(cls * 1000) / 1000 }), 300);
  });

const browser = await chromium.launch();
const ua =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const results = [];
const queue = [...rows];
await Promise.all(
  Array.from({ length: 3 }, async () => {
    while (queue.length) {
      const [group, name, url] = queue.shift();
      const r = { group, name, url };
      for (const [k, vp, mobile] of [
        ['desk', { width: 1440, height: 900 }, false],
        ['mob', { width: 390, height: 844 }, true],
      ]) {
        const ctx = await browser.newContext({
          viewport: vp,
          isMobile: mobile,
          hasTouch: mobile,
          userAgent: mobile ? undefined : ua,
          locale: 'pt-BR',
        });
        const p = await ctx.newPage();
        try {
          await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
          await p.waitForTimeout(5000);
          await p.evaluate(hideCookies).catch(() => {});
          const v = await p.evaluate(vitals);
          await p.screenshot({ path: `${out}/${name}-${k}.jpg`, type: 'jpeg', quality: 65 });
          r[k] = { ...(await p.evaluate(measure)), ...v };
          if (k === 'desk') {
            await p.evaluate(async () => {
              for (let y = 0; y < document.body.scrollHeight; y += 600) {
                scrollTo(0, y);
                await new Promise((s) => setTimeout(s, 120));
              }
              scrollTo(0, 0);
            });
            await p.waitForTimeout(800);
            await p.evaluate(hideCookies).catch(() => {});
            await p
              .screenshot({
                path: `${out}/${name}-full.jpg`,
                type: 'jpeg',
                quality: 45,
                fullPage: true,
              })
              .catch(() => {});
          }
        } catch (e) {
          r[k] = { error: String(e.message).slice(0, 140) };
        }
        await ctx.close();
      }
      results.push(r);
      console.error('ok', name);
    }
  }),
);
await browser.close();
fs.writeFileSync(`${out}/padrao.json`, JSON.stringify(results, null, 1));

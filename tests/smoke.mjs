// Smoke test: every class x mode x language x tab renders with no JS errors and no mobile overflow.
// Run: npm test   (needs `npm run build` first; installs Chromium once with `npx playwright install chromium`)
import { chromium } from 'playwright';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ORDER } from '../scripts/classes.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const url = pathToFileURL(join(root, 'site/index.html')).href;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
await page.goto(url);
await page.waitForTimeout(500);

const problems = [];
for (const width of [1280, 375]) {
  await page.setViewportSize({ width, height: 800 });
  // Home screen: class grid, timers with real numbers, no overflow.
  for (const lang of ['en', 'es']) for (const region of ['global', 'krtw']) {
    const h = await page.evaluate(([l, r]) => { S.view = 'home'; S.lang = l; S.region = r; renderAll();
      const t = document.getElementById('tmRows');
      return { cards: document.querySelectorAll('.ccard').length, timers: t ? t.querySelectorAll('.tmr').length : 0,
        txt: t ? t.textContent : '', w: document.documentElement.scrollWidth }; }, [lang, region]);
    if (h.cards !== ORDER.length) problems.push(`home/${lang}: ${h.cards} class cards`);
    if (h.timers !== 3 || /NaN|undefined|Invalid/.test(h.txt)) problems.push(`home/${lang}/${region}: broken timers "${h.txt.slice(0, 80)}"`);
    if (h.w > width) problems.push(`home/${lang}/${region}: overflow ${h.w}px at ${width}px`);
  }
  for (const cls of ORDER) for (const mode of ['simple', 'adv']) for (const lang of ['en', 'es']) {
    const tabs = await page.evaluate(([c, m, l]) => { S.view = 'class'; S.cls = c; S.mode = m; S.lang = l; S.tab = 'overview'; renderAll();
      return [...document.querySelectorAll('.tab')].map(t => t.dataset.t); }, [cls, mode, lang]);
    for (const tab of tabs) {
      const r = await page.evaluate(t => { S.tab = t; renderAll();
        const p = document.getElementById('p-' + t);
        return { kids: p ? p.querySelectorAll('*').length : -1, w: document.documentElement.scrollWidth }; }, tab);
      if (r.kids <= 0) problems.push(`${cls}/${mode}/${lang}/${tab}: empty panel`);
      if (tab === 'arcana') {
        const a = await page.evaluate(() => [...document.querySelectorAll('#p-arcana .arc')].map(c => c.querySelectorAll('.arc-line').length));
        if (a.length !== 5 || a.some(n => n < 1)) problems.push(`${cls}/${mode}/${lang}/arcana: cards/lines ${JSON.stringify(a)}`);
      }
      if (r.w > width) problems.push(`${cls}/${mode}/${lang}/${tab}: overflow ${r.w}px at ${width}px`);
    }
  }
}
// Content modes (PvP / Leveling) at phone width: every tab renders, no overflow.
await page.setViewportSize({ width: 375, height: 800 });
for (const cls of ORDER) for (const content of ['pvp', 'lvl']) {
  const tabs = await page.evaluate(([c, ct]) => { S.view = 'class'; S.cls = c; S.content = ct; S.mode = 'adv'; S.lang = 'en'; S.tab = 'overview'; renderAll();
    return [...document.querySelectorAll('.tab')].map(t => t.dataset.t); }, [cls, content]);
  if (content === 'lvl' && tabs[0] !== 'checklist') problems.push(`${cls}/lvl: first tab is ${tabs[0]}`);
  for (const tab of tabs) {
    const r = await page.evaluate(t => { S.tab = t; renderAll(); const p = document.getElementById('p-' + t);
      return { kids: p ? p.querySelectorAll('*').length : -1, w: document.documentElement.scrollWidth, note: document.getElementById('modeNote').textContent.length }; }, tab);
    if (r.kids <= 0) problems.push(`${cls}/${content}/${tab}: empty panel`);
    if (r.w > 375) problems.push(`${cls}/${content}/${tab}: overflow ${r.w}px at 375px`);
    if (!r.note) problems.push(`${cls}/${content}/${tab}: no mode banner`);
  }
}
// Checklist ticks survive a reload.
await page.evaluate(() => { S.cls = 'cleric'; S.content = 'pve'; S.tab = 'checklist'; S.done = {}; renderAll(); });
await page.click('#p-checklist input[data-ck="a1"] + .box');
await page.reload();
await page.waitForTimeout(300);
const kept = await page.evaluate(() => { location.hash = '#/cleric/checklist'; return new Promise(r => setTimeout(() => r(!!document.querySelector('#p-checklist input[data-ck="a1"]')?.checked), 150)); });
if (!kept) problems.push('checklist: tick not kept after reload');
await page.evaluate(() => { S.done = {}; S.content = 'pve'; save(); });
await page.setViewportSize({ width: 1280, height: 900 });

// Router: a deep link opens the class tab, and back returns to the previous view.
await page.evaluate(() => { location.hash = '#/'; });
await page.waitForTimeout(100);
await page.evaluate(() => { location.hash = '#/ranger/genus'; });
await page.waitForTimeout(100);
const deep = await page.evaluate(() => ({ v: S.view, c: S.cls, t: S.tab, on: document.querySelector('.panel.on')?.id }));
if (deep.v !== 'class' || deep.c !== 'ranger' || deep.t !== 'genus' || deep.on !== 'p-genus') problems.push(`router: #/ranger/genus gave ${JSON.stringify(deep)}`);
await page.goBack();
await page.waitForTimeout(100);
if (await page.evaluate(() => S.view) !== 'home') problems.push('router: back did not return home');
await page.evaluate(() => { location.hash = '#/nope/x'; });
await page.waitForTimeout(100);
if (await page.evaluate(() => S.view) !== 'home') problems.push('router: unknown class did not fall back to home');

await page.setViewportSize({ width: 1280, height: 900 });
await page.evaluate(() => { S.view = 'class'; S.cls = 'sorcerer'; S.mode = 'simple'; S.lang = 'en'; S.tab = 'overview'; renderAll(); });
await page.screenshot({ path: join(root, 'tests/last-run.png'), fullPage: true });
await browser.close();

const all = [...errors.map(e => 'JS error: ' + e), ...problems];
if (all.length) { console.error([...new Set(all)].slice(0, 30).join('\n')); process.exit(1); }
console.log('smoke test passed');

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
  for (const cls of ORDER) for (const mode of ['simple', 'adv']) for (const lang of ['en', 'es']) {
    const tabs = await page.evaluate(([c, m, l]) => { S.cls = c; S.mode = m; S.lang = l; S.tab = 'overview'; renderAll();
      return [...document.querySelectorAll('.tab')].map(t => t.dataset.t); }, [cls, mode, lang]);
    for (const tab of tabs) {
      const r = await page.evaluate(t => { S.tab = t; renderAll();
        const p = document.getElementById('p-' + t);
        return { kids: p ? p.querySelectorAll('*').length : -1, w: document.documentElement.scrollWidth }; }, tab);
      if (r.kids <= 0) problems.push(`${cls}/${mode}/${lang}/${tab}: empty panel`);
      if (r.w > width) problems.push(`${cls}/${mode}/${lang}/${tab}: overflow ${r.w}px at ${width}px`);
    }
  }
}
await page.setViewportSize({ width: 1280, height: 900 });
await page.evaluate(() => { S.cls = 'sorcerer'; S.mode = 'simple'; S.lang = 'en'; S.tab = 'overview'; renderAll(); });
await page.screenshot({ path: join(root, 'tests/last-run.png'), fullPage: true });
await browser.close();

const all = [...errors.map(e => 'JS error: ' + e), ...problems];
if (all.length) { console.error([...new Set(all)].slice(0, 30).join('\n')); process.exit(1); }
console.log('smoke test passed');

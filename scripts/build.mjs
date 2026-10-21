// Builds site/index.html from src/ + data/. Usage: node scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const rd = p => readFileSync(join(root, p), 'utf8');
import { ORDER } from './classes.mjs';

const data = {};
for (const id of ORDER) {
  const d = JSON.parse(rd(`data/classes/${id}.json`));
  delete d._notes;
  if (d.id !== id) throw new Error(`${id}.json has id "${d.id}"`);
  data[id] = d;
}
const layout = JSON.stringify(JSON.parse(rd('data/layout.json')));
const boards = JSON.stringify(JSON.parse(rd('data/boards.json')));

// Shared (non-class) data: data/shared/<name>.json -> SHARED.<name>
const shared = {};
for (const f of readdirSync(join(root, 'data/shared')).filter(f => f.endsWith('.json')).sort()) {
  const d = JSON.parse(rd(`data/shared/${f}`));
  delete d._notes;
  shared[f.slice(0, -5)] = d;
}

// App code: core first, feature files next, main.js (events + boot) last.
const SRC = ['app.js', 'home.js', 'arcana.js', 'genus.js', 'plan.js', 'main.js'];
const app = SRC.map(f => `/* ---- ${f} ---- */\n` + rd(`src/${f}`)).join('\n');

// Use split/join (not String.replace) so "$" in the data is never treated as a pattern.
const fill = (s, tag, val) => {
  const parts = s.split(tag);
  if (parts.length !== 2) throw new Error(`template must contain ${tag} exactly once`);
  return parts.join(val);
};
let html = rd('src/index.template.html');
html = fill(html, '/*DATA*/', JSON.stringify(data));
html = fill(html, '/*LAYOUT*/', layout);
html = fill(html, '/*BOARDS*/', boards);
html = fill(html, '/*SHARED*/', JSON.stringify(shared));
html = fill(html, '/*APP*/', app);

mkdirSync(join(root, 'site'), { recursive: true });
writeFileSync(join(root, 'site/index.html'), html);
cpSync(join(root, 'data/images.txt'), join(root, 'site/images.txt'));
console.log(`site/index.html  ${(html.length / 1024).toFixed(0)} KB  (${ORDER.length} classes)`);

// Downloads every image in data/images.txt into site/img/ (skips ones already there).
// The page also works without them: it falls back to the remote URLs.
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lines = readFileSync(join(root, 'data/images.txt'), 'utf8').split(/\r?\n/).filter(Boolean);
let ok = 0, fail = 0;
for (const line of lines) {
  const [path, url] = line.trim().split(/\s+/);
  const out = join(root, 'site', path);
  if (existsSync(out) && statSync(out).size > 0) { ok++; continue; }
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!r.ok) throw new Error(r.status);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, Buffer.from(await r.arrayBuffer()));
    ok++;
  } catch (e) { console.log('failed:', url, e.message); fail++; }
  await new Promise(r => setTimeout(r, 150));
}
console.log(`downloaded/kept: ${ok}  failed: ${fail}`);

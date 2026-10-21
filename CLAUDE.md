# Aion 2 Class Builds

Fan-made, single-page build guide for all 8 Aion 2 classes (global client), in English and Spanish.
It has Simple/Advanced modes, a Daevanion route planner, a skill-point simulator, macro/hotbar visuals, Genus Insight and a Sorcerer "Pro build" tab.
It is hosted on GitHub Pages (owner: Kinwan96). The owner plays on NA East (Azphel). He prefers visual explanations (diagrams, images) over long text.

## Commands
- `npm run build`: writes `site/index.html` (one self-contained file) from `src/` + `data/`.
- `npm test`: builds, then runs the Playwright smoke test (every class × mode × language × tab, desktop and 375px mobile). It fails on JS errors, empty panels or horizontal overflow.
  - First time only: `npm install` and then `npx playwright install chromium`.
- `npm run images`: downloads the icons and board art listed in `data/images.txt` into `site/img/`. This step is optional, because the page falls back to the remote URLs.
- `npm run serve`: builds and serves `site/` locally.

Always run `npm test` after any change to `src/` or `data/`.

## Layout
| Path | What |
|---|---|
| `src/index.template.html` | Page shell + all CSS. It has the placeholders `/*DATA*/ /*LAYOUT*/ /*BOARDS*/ /*SHARED*/ /*APP*/` (each exactly once). |
| `src/*.js` | App code (vanilla JS, no framework), joined in the order of `SRC` in `scripts/build.mjs`: `app.js` (core + class tabs), `home.js` (home screen, timers), `arcana.js` (Arcana tab), `main.js` (router, events, boot; always last). |
| `data/shared/<name>.json` | Non-class data, available as `SHARED.<name>`. `timers.json`: UTC event schedules per server region. `arcana.json`: the 5 global card slots, card art, god-stats, grades, sets and each class's skill pool per slot (generated from questlog.gg data; pools list skill `ic` keys). |
| `data/classes/<id>.json` | One file per class. Its shape is documented in `docs/SCHEMA.md`. |
| `data/layout.json` | Daevanion board layout: `[x, y, cost, statName\|null]` per node. It is shared by all classes. |
| `data/boards.json` | Per class and board: the cost-2/3 skill node names in layout order (`"Name~InGameName"`). |
| `data/images.txt` | `local/path remoteUrl` per line, for local image copies. |
| `scripts/` | `build.mjs`, `fetch-images.mjs`, `classes.mjs` (class order). |
| `tests/smoke.mjs` | Playwright smoke test. |
| `legacy/` | The older single-class guides (min-max guide EN/ES, Ranger Lv45, Sorcerer). These are reference only and are not built. |
| `site/` | Build output (gitignored). It is deployed by the Pages workflow. |
| `.github/workflows/deploy.yml` | GitHub Pages workflow: builds, fetches images and publishes `site/` on every push to `main`. Repo: `Kinwan96/aion2-builds`. |

## How app.js works
- **State:** `S` = `{view, cls, lang, mode, tab, lv, cr, auto, board, load, preset, macro, region}`. It is persisted in localStorage under `a2builds`.
- **Routing:** the URL hash decides the view. `#/` is home; `#/<class>/<tab>` is a class tab. No hash means home. `readHash()`/`syncHash()` live in `main.js`, and `tabsFor(C)` is the list of valid tabs.
  - `C` is the current class data and `SK` maps skill name → skill.
- **UI strings:** `U` is the UI dictionary. Each entry is `key: ['English', 'Español']`, read with `u('key')`.
  - Bilingual data fields are `{en, es}`, read with `T(obj)`.
  - `lab(name)` shows a skill's in-game name in the current language.
- **Render:** `renderAll()` → `header()` plus one renderer per tab:
  - Renderers: `pOverview`, `pPro`, `pSkills`, `pStigmas`, `pDaev`, `pMacro`, `pRotation`, `pLeveling`, `pGenus`, `pGear`.
  - Each renderer fills `#p-<tab>`.
  - The tab list is built in `header()`. The `pro` tab only appears when a class has a `pro` object; today only Sorcerer has one.
- **Skill-point simulator:** `simulate()`.
  - Income per character level: <4: 0, 4: 1, 5–7: 2, 8–10: 3, 11–15: 4, 16–30: 5, 31+: 6 (about 201 points by Lv45).
  - Cost to reach each skill level: `COST = [0,0,1,1,1,2,2,2,4,4,4]`.
  - Level gate: unlock level + 3×(skill level − 2).
- **Specialties:** slots open at skill level 8, 12 and 16. `eqSpecs()` picks from `pickLev` / `pickEnd`.
- **Daevanion:**
  - `buildBoards()` + `plan()` = a greedy route planner (Dijkstra frontier, value/cost ratio).
  - Node costs: 1 grey stat, 2 green passive, 3 blue active, 4 orange %.
  - Boards open at Nezekan 12, Zikel 20, Vaizel 30, Triniel 40. Azphel (45) is PvP.
  - Simple mode uses `PRESETS` `[level, crystals]`.
- **Macro rules (in-game):**
  - Up to 4 skills per hotbar slot. The bottom skill is checked first, and skills on cooldown are skipped.
  - A skill with no cooldown must be alone or on top of a stack.
  - Use a 10–20 ms delay.
  - Charge skills (e.g. Hellfire) can't be macroed, because they fire uncharged.

## Gotchas
- **Images:** `KB='img/skill/'`, `CI='img/class/'` and `TX='img/tex/'` point to local copies. `img/tex/<path>` mirrors questlog's `Texture/<path>` (item and Arcana art); use `itm(path, name, rarity)` for framed item art. `window.FB` swaps a broken local image to the remote URL (`KBR`/`CIR`), then hides it if that also fails. Every `<img>` uses `onerror="FB(this)"`.
- **Board sprites (`SPR`):** they load remote first, then local (`url(remote),url(local)`). Don't flip this: the local copies were corrupt once, and that caused white or black tiles. Also don't darken `.c1.on`, because the start node shares class `c1`.
- **Class order:** it lives in both `scripts/classes.mjs` and the top of `src/app.js` (`ORDER`). Keep them in sync.
- **Mobile:** test at 375px. Segmented controls need `flex-wrap`, and grids should use `minmax()`/`auto-fit`.
- **Data sources:**
  - questlog.gg tRPC (`database.getSkills` / `getSkill`, which include EN/ES/KO names). Spiritmaster is `elementalist` internally.
  - Skill icons: `https://cdn.questlog.gg/aion-2/assets/Game/UI/Resource/Texture/Skill/<ICON>.webp`
  - Wikily (Daevanion layouts, node art, Genus Insight). Fetch slowly, because it returns 429 if hammered.
  - Global ≠ KR/TW 1:1, so mark KR-only advice as such.

## Content rules
- Keep skill names exactly as in-game (EN `n`, ES `ne`). Never invent skills or specialties; copy them from questlog data.
- Spanish should be natural Latin-American gamer Spanish. Keep sentences short.
- Prefer visuals (icons, bars, hotbar mockups, route lines) over paragraphs.
- Add the source of any new build info to that class's `sources`.

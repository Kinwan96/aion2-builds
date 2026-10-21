# Aion 2 Class Builds (EN/ES)

Fan-made build guide for all 8 Aion 2 classes.
- Simple and Advanced modes.
- Daevanion route planner and skill-point simulator.
- Macro and hotbar visuals, plus Genus Insight.
- Sorcerer has a Pro build tab.

```bash
npm install
npx playwright install chromium   # once, for tests
npm run build                     # -> site/index.html
npm test                          # build + smoke test
npm run images                    # optional: local copies of icons/board art
```

To edit a class, change `data/classes/<class>.json` (see `docs/SCHEMA.md`). To change the UI, edit `src/app.js` or `src/index.template.html`.

## Deploy (GitHub Pages)
Push to `main`. The workflow in `.github/workflows/deploy.yml` builds the site, downloads the images and publishes `site/` (Pages source: GitHub Actions).

Data: questlog.gg (skills, EN/ES/KO) and Wikily (Daevanion layouts, node art), plus Korean and global community guides (see each class's `sources`).
Game art © NCSOFT. This is a non-commercial fan project.

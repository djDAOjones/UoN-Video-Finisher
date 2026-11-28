# Structure — Video Name Graphics

<!-- Written by hand on 2026-11-26 (VNG-11), recounted on 2026-11-27 (VNG-14) and 2026-11-28 (VNG-15), in tools/structure.mjs's form: below the repository's root that tool finds no `.git` of its own and walks the folder without the ignores. Counted with `git ls-files -co --exclude-standard -- name-graphics/`, its skip list applied (dot folders, `project/`, `node_modules/`, `dist/`). Directory counts include descendants; ./ counts root files only. -->

| Path | Files | Role |
| --- | --- | --- |
| `./` | 17 | the contract (AGENTS.md, CLAUDE.md), README.md, NEXT_STEPS.md, UI-STANDARDS.md, the page shell (`index.html`), `package.json` (what the folder uses, at the root's specifiers; the install is the root's), the TypeScript and ESLint configs on the root's bases (the core, app, tests and folder projects), the Vite config with the forms kind's merged in, Knip's from the pack, the accessibility pack's ESLint fragment, and the link checker |
| `brands/` | 2 | the brand packs, one folder each; the build picks one |
| `brands/neutral/` | 1 | the neutral pack's tokens: Carbon's grey ramp for every colour role |
| `docs/` | 2 | the accessibility pack's testing guide and its extended pack's setup |
| `scripts/` | 2 | the gate's build check, the page built in a temporary folder at the Pages base path, and its types for the tests |
| `src/` | 7 | the React entry (`src/root.tsx`), the page's stylesheet, the core and the interface; the shared core and Carbon tokens come from `../shared/` |
| `src/core/` | 2 | the seed's logic, the version line's words, on the root's core layer, and its test |
| `src/styles/` | 1 | `src/styles/app.css` |
| `src/ui/` | 2 | the interface: the seed's page in Carbon React, and Carbon's theme on the neutral pack's tokens |
| `test/` | 3 | the contrast test, the Carbon theme's mapping to the pack, and the build check's findings |
| `tests/` | 25 | the accessibility tests |
| `tests/a11y/` | 25 | the accessibility pack's copied harness and known-bad fixture, and this folder's declarations |
| `tools/` | 28 | pm-skills 5.0.3's tools and the accessibility and JSDoc packs', the release's bytes; never hand-edited |
| `verbs/` | 9 | pm-skills 5.0.3's verbs, the release's bytes; never hand-edited |

## Entry points

- `AGENTS.md` — the contract every session obeys
- `index.html` → `src/root.tsx` → `src/ui/App.tsx` — the page, React and Carbon React since VNG-15
- `tools/check.mjs` — the ledger's checker

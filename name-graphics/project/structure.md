# Structure — Video Name Graphics

<!-- Written by hand on 2026-11-26 (VNG-11), recounted on 2026-11-27 (VNG-14) and 2026-11-28 (VNG-15), in tools/structure.mjs's form: below the repository's root that tool finds no `.git` of its own and walks the folder without the ignores. Counted with `git ls-files -co --exclude-standard -- name-graphics/`, its skip list applied (dot folders, `project/`, `node_modules/`, `dist/`). Directory counts include descendants; ./ counts root files only. -->

| Path | Files | Role |
| --- | --- | --- |
| `./` | 17 | the contract (AGENTS.md, CLAUDE.md), README.md, NEXT_STEPS.md, UI-STANDARDS.md, the page shell (`index.html`), `package.json` (what the folder uses, at the root's specifiers; the install is the root's), the TypeScript and ESLint configs on the root's bases (the core, app, tests and folder projects), the Vite config with the forms kind's merged in, Knip's from the pack, the accessibility pack's ESLint fragment, and the link checker |
| `brands/` | 2 | the brand packs, one folder each; the build picks one |
| `brands/neutral/` | 1 | the neutral pack's tokens: Carbon's grey ramp for every colour role |
| `docs/` | 2 | the accessibility pack's testing guide and its extended pack's setup |
| `src/` | 8 | the page's entry and its stylesheet, and the React entry (`src/root.tsx`) the page moves to in VNG-15; the shared core and Carbon tokens come from `../shared/` |
| `src/core/` | 2 | the seed's logic, the version line's words, on the root's core layer, and its test |
| `src/styles/` | 1 | `src/styles/app.css` |
| `src/ui/` | 2 | the forms starter's interface: a stateless Carbon React shell and Carbon's theme |
| `test/` | 1 | the contrast test |
| `tests/` | 25 | the accessibility tests |
| `tests/a11y/` | 25 | the accessibility pack's copied harness and known-bad fixture, and this folder's declarations |
| `tools/` | 28 | pm-skills 5.0.3's tools and the accessibility and JSDoc packs', the release's bytes; never hand-edited |
| `verbs/` | 9 | pm-skills 5.0.3's verbs, the release's bytes; never hand-edited |

## Entry points

- `AGENTS.md` — the contract every session obeys
- `index.html` → `src/main.ts` — the page
- `src/root.tsx` — the React entry, served from VNG-15
- `tools/check.mjs` — the ledger's checker

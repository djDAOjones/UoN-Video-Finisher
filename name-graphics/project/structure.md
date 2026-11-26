# Structure — Video Name Graphics

<!-- Written by hand on 2026-11-26 (VNG-11) in tools/structure.mjs's form: below the repository's root that tool finds no `.git` of its own and walks the folder without the ignores. Counted with `git ls-files -co --exclude-standard -- name-graphics/`, its skip list applied (dot folders, `project/`, `node_modules/`, `dist/`). Directory counts include descendants; ./ counts root files only. -->

| Path | Files | Role |
| --- | --- | --- |
| `./` | 10 | the contract (AGENTS.md, CLAUDE.md), README.md, NEXT_STEPS.md, UI-STANDARDS.md, the page shell (`index.html`), `package.json` (no dependencies; the install is the root's), the Vite, TypeScript and ESLint configs extending the root's bases, and the link checker |
| `brands/` | 2 | the brand packs, one folder each; the build picks one |
| `brands/neutral/` | 1 | the neutral pack's tokens: Carbon's grey ramp for every colour role |
| `src/` | 3 | the page's entry and its stylesheet; the core and Carbon tokens come from `../shared/` |
| `src/styles/` | 1 | `src/styles/app.css` |
| `test/` | 1 | the contrast test |
| `tools/` | 15 | pm-skills 5.0.3's tools, the release's bytes; never hand-edited |
| `verbs/` | 9 | pm-skills 5.0.3's verbs, the release's bytes; never hand-edited |

## Entry points

- `AGENTS.md` — the contract every session obeys
- `index.html` → `src/main.ts` — the page
- `tools/check.mjs` — the ledger's checker

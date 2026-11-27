# UVT-8 — The root's packs: the lobby's accessibility testing at extended depth, JSDoc on the root's scripts, the architecture record, Playwright's browser in CI

## Intent

The root owns the lobby, the scripts, the deploy workflow and the
picture of the whole system. On the owner's word of 2026-11-26
("Extended, tools and lobby"; "JSdoc yes, promptfoo no"; "retrofit
everything in full") the root takes every pack that fits it, as the tools
do in their own items (PLAN-11), and makes CI run what the gate runs.

## Acceptance criteria

- The accessibility pack at extended depth, level AAA, copied by canon v5.0.3's a11y/install.mjs once UVT-7 has proved the runner from the root, the copy commit applying the harness policy UVT-7 proved (the pack's test files typechecked with no diagnostic and linted under the layer scoped to them). tests/a11y/project.mjs declares the lobby's real page served as Pages serves it: its states, reviewed ARIA snapshots, keyboard functions and journeys; the coverage file declares each feature present or absent with its evidence. `npm run a11y` (the standard command) in `check:root`, passing: a row that fails is fixed in `lobby/`; an exception is recorded as the pack's own mechanism allows and the owner signs, never by lowering the level or silencing the command. `npm run a11y:doctor` run and each blocked method named; the profile's Accessibility testing line and the By-task row.
- The lobby's lint evidence: the lint method is required on rows 1.1.1, 1.3.1, 1.3.5, 3.3.2 and 4.1.2, and the pack's report fails a required method left not run on an applicable row (1.3.1 is required and applies to the lobby), while eslint-plugin-jsx-a11y reads only JSX and TSX. So the lobby's markup is authored as a TSX component under `lobby/`, rendered to its static page at build time by react-dom/server: no script shipped to the browser, no service worker, the served HTML the render of that source. tests/a11y/project.mjs declares that TSX as its lint source, so the credited rules judge the markup that ships, and axe and the snapshots read the page as served; a test proves the built page is that render, so the source and the page cannot drift. No row is left not run.
- The JSDoc pack adapted to the root's plain-JavaScript scripts, by a recorded decision: the stock pack is for a JavaScript project and selects JavaScript under `src/`; here its configuration selects the `.mjs` files under `scripts/` and the root's configs, beside the TypeScript projects; the ratchet run from the root, its starting count in the decision; as intake asks, the digest adopted in the profile's Standards with its By-task row, the profile's JSDoc line as the template's comment gives it, and the type check in `check:root` and the Gate line.
- The architecture record at project/architecture.md from the pack's template, adopted on the owner's "retrofit everything in full": the system context (the two tools, the lobby, GitHub Pages, Xerte, the owner's upload) and its containers as they actually run, each text alternative in sentences; the By-task row; `node tools/view.mjs` run.
- CI: the deploy workflow runs every check the gate runs (it calls each tool's check and `check:root` apart, so a command added to the root `check` wrapper alone would be missed); Playwright's Chromium installed at the pinned revision into an explicit browser cache, the same path set for the run; the accessibility checks served a fresh temporary build at the real Pages base path; no gate step writes `dist/` or any tracked file.
- No promptfoo: no tool sends a prompt to a model (the owner's word).
- `node tools/check.mjs` 0 failures; the root gate green; each step's Checked line.

## Now

Updated: 2026-11-27

Next step: step 3, the lobby's declarations, `npm run a11y` in `check:root` and Playwright's Chromium in CI.

Open question: None.

## Context and sources

- [The plan, PLAN-11](../decisions.md)
- [The lobby](../../lobby/Lobby.tsx)
- [The deploy workflow](../../.github/workflows/deploy-pages.yml)

## Notes

- 2026-11-26 — The trial copied the extended pack's 40 files into the root of a clone with no conflict. Codex's review of the draft plan: the runner's lint step credits a rule applied to no file as not run, and its browser preflight defaults to a macOS cache path.
- 2026-11-26 — Codex's review of the record: a lobby lint row left not run fails the standard command (the pack's a11y-report.mjs), so the record names the TSX source above.
- 2026-11-27 — Step 1: the pack copied at extended depth, AAA, by canon v5.0.3's installer (40 files, no conflict), its harness type-checked and linted as UVT-7 proved; `a11y:doctor --no-canary` ready for engines, touch, media, flash capture and ai-review, VoiceOver, veraPDF, the iOS audit, Android and the native journey blocked. The checker's warning that no extended run is recorded is UVT-9's, the lobby's extended run.
- 2026-11-27 — Step 2: the lobby's markup is `lobby/Lobby.tsx`, rendered to its static page at build time by `scripts/build-lobby.mjs` (TypeScript's `transpileModule` and react-dom/server, no script shipped); `scripts/serve-lobby.mjs` serves a fresh build at the Pages base path for the gate; the deploy workflow gathers the built page; the hand-written page is gone.

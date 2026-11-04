<!-- markdownlint-disable -->

# VH-225 — Codex astra's blind design check

You are reviewing, read-only, the design of one item in the repository in your working directory (the UoN Video Helper app, a browser-only TypeScript/Vite app). You design independently: you are not shown the implementer's design. Answer every point below with your own recommendation and its reason, citing `file:line`.

## What you may read
- The repository (your working directory), read-only. Above all: `project/items/VH-225.md` (the item, whose six criteria are drafts to refine), `project/items/VH-203.md` (lines 9–16, the stage rule), `project/items/VH-204.md`, `project/rules.md`, `project/profile.md`, `project/digests/house-conventions.md`, `UI-STANDARDS.md`, `DEV-INFRASTRUCTURE.md`, `.github/workflows/deploy-pages.yml`, `vite.config.ts`, `src/`, `test/`, `scripts/`, `index.html`, `acceptance.html`, `docs/01-specification.md` line 1 and `docs/04-init-prompt.md`, `project/wish-list.md`, `project/backlog.md`.
- The walker, read-only: `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/` (`scenarios.mjs` `PLANS` from line ~1301, `SCENARIOS`, `footer-182.mjs`, `qualify.mjs` `VIEWS` and `setMode`, `matrix.mjs`).
- `/Users/joe/UoN-Video-Helper-side/plan8-owner-words.md` lines 185, 327, 336, 338, 339, 366, 369 only (the owner's words).
- **Forbidden:** every folder under `/Users/joe/Library/Application Support/Claude/side-session-notes/`; in `/Users/joe/UoN-Video-Helper-side/`, every file named `vh225-claude-*`, `vh225-*compare*`, `vh225-progress.md`, `vh225-handover-*`, and every `vh225-*brief*` but this one. Read nothing else in that folder.

## The owner's words that govern it (verbatim)
- 2026-10-28: "it is to be called UoN Video Finisher (rather than UoN Video Helper). please add to the backlog and let the orchestrator chat know - the next release must contain the rename" (`plan8-owner-words.md:327`).
- To "Should the GitHub repository and preview web address change to the new name too?": "Rename those too" (`:336`; the scope relayed at `:338`: the repository `github.com/djDAOjones/UoN-Video-Helper` and the Pages address `djdaojones.github.io/UoN-Video-Helper/`; GitHub redirects a renamed repository and its git remote but not a project Pages site).
- The project folder on his Mac: "Yes, at a quiet point" (`:339`) — VH-226's, after the release, not this item's.
- "Yes, move it" (`:369`): this item after VH-210, before VH-220. "Gateless covers the rest of Phase 8" (`:185`).

## The fixed constraints
- The repository rename is a GitHub setting: the owner's click, or a session's with his go-ahead at that step. No session renames it unasked. A push that leaves Pages broken is critical.
- `docs/`: the name swap in `docs/01-specification.md:1` and `docs/04-init-prompt.md` only; any other `docs/` edit is a stop.
- The walker may change only in its assertions of the app's name (the problem-report subject at `walker/scenarios.mjs` ~2799 and ~3005 and `walker/footer-182.mjs` ~169), proved "on both layouts"; any other walker change is a stop. Its instrument revision changes with it.
- Hidden identifiers stay: the `uon-video-helper:*` localStorage keys, the OPFS folder `uon-video-helper-jobs`, the worker/job name `uon-video-helper-job`, the package name. A test must pin them. A migration is out unless designed, tested and proved with no loss.
- No new element, control or checkbox; no dependency change; `project/rules.md` and `samples/` untouched.
- The before-and-after (VH-203's stage rule): en-GB, zh-Hans and ms-MY, in light, dark, forced light and forced dark, at every width and font the walker's `PLANS` give the scenarios that show the name; a state that could be staged and is not is a coverage reduction.

## Points to judge (answer each)
1. **Every surface of the name.** List every place the visible name appears in the app, its build and packaging, its tests and the docs the item names (search the tree yourself). Which belong in this item, and which should stay (with reasons): e.g. the 13 `spike-*.html` titles, `scripts/strings-sheet.mjs`, ledger headings (`project/brief.md`, `architecture.md`, `rules.md`, `structure.md`, the digests), dated review records under `reviews/`, the internal temp-dir prefixes, `.claude/launch.json`.
2. **The Pages and repository order.** How is the Pages base path set today (`vite.config.ts`, `deploy-pages.yml`)? Design the commit and push order around the owner's rename so Pages is never left broken by a push, state what each commit holds, what the old address shows afterwards, how long anything is broken and why, and whether the local git remote should change and by whom.
3. **The new names.** Propose a zh-Hans and an ms-MY name for "UoN Video Finisher" (the current "UoN 视频助手" and "Pembantu Video UoN" both say "Helper"), each with its reasoning and one alternative; or argue for keeping the English name untranslated. Give each language's new `statement.covers` sentence.
4. **The kept identifiers' test.** What should the pinning test assert, where should it live, and how does it pin the worker name and package name, which are literals?
5. **The walker change and its proof.** Exactly which assertions change, to what; what "proved on both layouts" should mean here; and how the before and after can each be walked at one instrument revision when the walker itself changes in this item.
6. **The cells.** Which scenarios show each surface (the tab title in its job states too), and the cell set for each: languages, colour modes, views and fonts (the walker's 32 px mode, the withheld-font `fallback`, text `spacing`). Give the total cell count. Say whether any surface may be read in fewer cells than the full cross without that being a coverage reduction, and why.
7. **The criteria.** Rewrite the item's six draft criteria as you would refine them.
8. **Risks.** Anything else that could lose data, break Pages or the release, or slip the owner's stops.

Write plainly, at most about 1,500 words.

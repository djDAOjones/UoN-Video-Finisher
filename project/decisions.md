# Decisions

<!-- Newest first. Never edit an old entry; supersede it. Rule 1 reads
     exactly the latest ten entries' heading, Decision line and Deferred
     line, newest first. The Decision line states the what and its
     one-line why; Rationale holds evidence and detail, read on demand,
     backwards as far as the task needs when Decision does not answer
     why. The slice fails at close over 1,000 words (about 80 words of
     slice per entry). An entry is inherited when the migration
     inventory, written at the snapshot, lists its heading; with no
     inventory, none is. While one stays among the latest ten it is
     read as heading and Deferred line, its Decision line on demand,
     and what is read counts towards the budget. A writer who
     needs an inherited Decision line in the slice supersedes the entry
     with a shorter one. Grammar:
     ## YYYY-MM-DD — ID — title
     **Decision:** what was decided and its one-line why.
     **Rationale:** evidence and detail, in the terms another session
     would need.
     **Supersedes:** YYYY-MM-DD — ID — title, or "none".
     Optional **Deferred:** comma-separated target IDs, or "none".
     The checker resolves these against open, shipped or retired work. Use it
     when targets already have IDs; ordinary wish capture stays cheap.
     A PLAN-N entry also has **Items:** with its phase IDs; keep that
     membership when open lines are removed. A later PLAN-N Items list
     replaces the whole list and supersedes the earlier; a closed phase
     is checked against the list no other supersedes. Optional
     **Retired:** names items retired unshipped, comma-separated, the
     reason in the entry: neither open nor shipped, never reopened.
     Do not edit past entries.
     Budget 45 live entries: when the validator warns, tools/archive.mjs moves the
     oldest entries verbatim to project/decisions-{YYYY-MM}.md, beside
     this file so their links still resolve, and adds one line to
     project/archive-index.md (date range, count, IDs). Archived
     entries are still the record; grep finds them. -->

## 2026-11-26 — UVT-6 — Stage 7, the parent's half: the root's docs current, a `NEXT_STEPS.md` naming each ledger's next item, every leftover a line

**Decision:** the parent's half of stage 7 closes: the root's `README.md` says what the root now owns and gives the three preview addresses; a new `NEXT_STEPS.md` names each ledger's next item and the order of work across them (VH-129, then UVT-4 with VH-247 and VNG-12, then UVT-5, then the PLAN-9 points); the structure table is recounted by hand; and every leftover of the restructure this ledger owns is a wish line, UVT-6.1 to UVT-6.21, the pm-skills findings among them — because the restructure prompt's stage 7 asks it and the owner said "Start stage 7" on 2026-11-26.

**Rationale:** The leftovers are the prompt's "Leave for later" list, the restructure log's "only a person verified" items and what was found since, each written once in the ledger that owns it, the others' named by ID: the Finisher's (VH-226.1 to VH-226.8, among them VH-129's questions and the 26 points waiting on a model policy) and Name Graphics' (VNG-11.1 to VNG-11.5) close with their items. Lines already held were not repeated: VH-129, VH-247, VNG-12, UVT-4, UVT-5, the PLAN-9 wishes, VH-14, VH-137, VH-161 and VH-246 for the untouched items, VH-225.3 for the address before the last. The pm-skills wishes (UVT-6.1 to UVT-6.9) are lines here with their evidence in RESTRUCTURE-LOG.md; nothing was sent to the pm-skills repository. `tools/structure.mjs` was not run at the root (ENOBUFS, UVT-6.2); the table was counted with `git ls-files -co --exclude-standard`. Old absolute paths in the tools' decisions and `reviews/` are history and stay as written. Outside the repository (the Codex trust entry, `.claude/settings.local.json`, the scheduled task) is the orchestrator chat's, with the owner. No code, UI or dependency changed; digest rule applied: house conventions, commit subjects `ID: summary` with a `Verify:` line. The root gate green before the commit.

**Supersedes:** none

**Deferred:** UVT-4, UVT-5

## 2026-11-26 — UVT-3 — The tool configs both tools share live at the root, one copy, each folder extending a base; stage 6 closes

**Decision:** `tsconfig.base.json` and `eslint.base.js` at the root are the one TypeScript and ESLint config: `shared/` and each tool extend them and add only their own `include` or `ignores`; `.editorconfig`, `.prettierrc.json` and `.markdownlint.json` are the one copy, at the root; each tool's `.prettierignore` and `.markdownlint-cli2.jsonc` stay, their ignores its own — D10, in three green steps. With it the phase closes; the next item is UVT-6, stage 7.

**Rationale:** The steps: c6d3de67 (this item) added the five files, the three plain ones in the tools' bytes, and switched the root's ESLint config and `shared/tsconfig.json`; 5fceceb4 (VH-226) and 82ab57b4 (VNG-11) switched each tool and deleted its copies. Proofs at each step, against captures taken before: `tsc --showConfig` and `eslint --print-config` (a TypeScript source, a script, the config itself) identical in every folder; Prettier's output on two files identical to the old layout's; probes in each folder still failed, a type error (TS2322) and an explicit `any`, and in each tool a skipped heading level (MD001), while a long line passed (MD013 off, so the root's markdownlint config is read). Resolution: Prettier and EditorConfig search upward, and the root's `.editorconfig` says `root = true` as the tools' did; markdownlint-cli2 does not look above its folder, so each tool's `.markdownlint-cli2.jsonc` extends `../.markdownlint.json` by path. The root's own scripts keep their narrower globals. The root gate green at every step: the Finisher 2,001 passed and 1 skipped, Name Graphics 126, `shared/` 25, node --test 9, commit-ID check 0 failures, the three checkers 0 and 0. No dependency changed. Digest rule applied: house conventions, tool configs at the root, each tool extending them, adding only what it alone needs, its gate green from its own folder. Phase close: reconciled against PLAN-1's Items, UVT-1, UVT-2 and UVT-3, each with its trajectory line and none open; the heading now reads "Phase 1 — … — CLOSED 2026-11-26" so the checker holds it to PLAN-1. The next item is UVT-6, stage 7 of the restructure, its blocker paid by this close, because the restructure prompt's sequence and the orchestration handed over on 2026-11-26 put stage 7 before UVT-4. Recall, local (this session, from the record alone, not a fresh session): 1, `project/trajectory.md` under Stage 6, newest first: UVT-3, UVT-2, UVT-1, the only three this ledger has shipped — 2; 2, "2026-11-26 — UVT-2 — The identical set lives in `shared/`, no second copy", because D10 wants code two tools need in one copy — 2; 3, deferred: UVT-4, UVT-5 and UVT-6 in `project/backlog.md` (INTAKE's Deferred line); `project/wish-list.md` has no open line — 2; 4, UVT-6, in the backlog's Next, outside a phase — 2.

**Supersedes:** none

**Deferred:** none

## 2026-11-26 — UVT-2 — The identical set lives in `shared/`, no second copy: the nine core files and the Carbon tokens, each tool's gate running the shared tests

**Decision:** `shared/core/` (diagnostics, egress, logger and redact with their tests, and version) and `shared/styles/tokens.carbon.css` are the one copy, both tools import them by path, and each tool's gate runs the four shared test files under its own build-time values while the root gate also lints, type-checks and tests `shared/` on its own — D10, in three green steps.

**Rationale:** The steps: e4710c79 (this item) added the files in the Finisher's bytes at 349b3ae4, with `shared/`'s own tsconfig, test config, declarations and type-checked lint; 9ad7635d (VH-226) switched the Finisher's 35 import lines and its stylesheet and deleted its copies, keep-awake and watchdog staying in the tool; 730e4b44 (VNG-11) did the same for Name Graphics' 3 lines, whose copies differed only by a two-line "copied" header. Every gate stayed green with the same counts: the Finisher 98 files, 2,001 passed and 1 skipped; Name Graphics 5 files, 126 passed; `shared/` 4 files, 25 passed. A tool's dev server reads only its folder unless told, so each tool's `vite.config.ts` allows `../shared/`: read on ports 5199 and 5198, 200 for the shared logger and 403 still for the other tool; a build reads from disk, and the Finisher's Xerte build stayed flat. The tools' checkers accept no path outside the tool's folder, so 17 backticked paths in the Finisher's closed items now name the file without its folder, and four links in old records point at its new place, their text as written; a wish for pm-skills goes with stage 7's. `version.ts` reads two build-time values each tool injects; `shared/env.d.ts` declares them for the root's check only. Digest rule applied: house conventions, a shared module's tests beside it and run in every gate that imports it.

**Supersedes:** none

**Deferred:** none

## 2026-11-26 — UVT-1 — The ID-folder check and the import-boundary rule in every gate: a root script and an ESLint rule of our own, no dependency

**Decision:** the root gate checks every commit after the founding against its folders (`scripts/check-commit-ids.mjs`), and an ESLint rule of the repository's own, `uvt/boundaries` in `eslint.boundaries.js`, resolves each import and fails `shared/` reaching a tool or one tool reaching the other; the root's config and both tools' configs include it — because D9 and the parent's rules ask for both, and a rule resolving paths catches what a name pattern misses.

**Rationale:** A commit's subject names one ID; `VH-` may write only `finisher/`, `VNG-` only `name-graphics/`, `UVT-` only the rest; another ID (INTAKE, PLAN-n, REFRESH-n) writes one ledger whose record names it, which lets REFRESH-503, in both tools, pass in each. Merges are left out, their commits checked. The check runs from the founding commit, 11af3017, so the restructure's earlier commits stay the rules' one exception: over c119477b..HEAD it flags the two that wrote two ledgers' folders, PLAN-10 (ae427d96) and VH-226's log commit (bdcd3790). The deploy workflow's checkout is shallow, so there the newest commit only is checked, and says so; every local gate checks them all. The gate runs before a commit exists, so a wrong commit fails the next gate; `EXCEPTIONS` would keep one, by SHA and decision, and is empty. The rule covers import, export from, `import()` and `import type`; CSS `@import` is not linted. Tests use Node's own runner (9), so no dependency was added. Each tool wired the rule in its own commit (VH-226 977d39c2, VNG-11 89c158ff), a probe import reported in each and deleted. Digest rule applied: house conventions, a shared rule's tests beside it and run in every gate.

**Supersedes:** none

**Deferred:** none

## 2026-11-26 — PLAN-1 — Stage 6 after the founding: the commit-folder check and boundary lint, the identical set in `shared/`, the shared tool configs

**Decision:** the phase "Stage 6 — the shared set, after the founding" is UVT-1 (the root check that a commit's ID matches its folders, and the import-boundary lint rule), UVT-2 (D10's identical set in `shared/`, in three green steps, each tool's gate running the shared tests) and UVT-3 (the identical tool configs shared at the root), in that order — because the restructure prompt's stage 6, steps 2 to 5, sets them so, on the owner's word of 2026-11-26.

**Rationale:** UVT-1 comes first so that every later commit, the shared set's among them, is checked against its folders. UVT-2's three steps are a commit here adding the files in the Finisher's bytes, a VH-226 commit switching the Finisher's imports and deleting its copies (`keep-awake` and `watchdog` stay in the tool), and a VNG-11 commit doing the same in Name Graphics; no commit leaves a gate red. Step 5's signature of D9's rule in the two tools' rules files is each tool's change, on the owner's word, in its own ledger.

**Supersedes:** none

**Items:** UVT-1, UVT-2, UVT-3

## 2026-11-26 — INTAKE — The parent's ledger founded at the root on pm-skills 5.0.3: IDs `UVT-n`, owning the root files, `shared/` and `lobby/`

**Decision:** the repository's root gets its own pm-skills 5.0.3 ledger (build d599678, the version both tools run since REFRESH-503), IDs `UVT-n`, which owns every file outside `finisher/` and `name-graphics/` — the root files, `shared/`, `lobby/` — the order of work across the tools and the decisions that bind every tool; its rules carry D9's rule and the ownership table; its gate is the root `npm run check`, every tool's gate in turn and then this ledger's checker — on the owner's decisions D3 and D7 of 2026-11-25.

**Rationale:** The structure is the one VH-226 (2026-11-26, "Widened to the UoN Video Tools restructure") and VNG-11 (2026-11-26, "Shared, not copied") record: one repository, each tool a folder with its own ledger, shared code by path under one install at the root. Until now the root had no contract, ledger or hooks, so the restructure's founding commits rode on VH-226 and VNG-11; from here the root is this ledger's. The install copy came from canon at d599678 (no tag `v5.0.3` yet), by `install.mjs --to .`, 41 files, no conflict. The hazard check found one worktree, no stash, no open pull request and no scheduled task naming the project; the three wip branches stay as they are (D13). The harness settings are not the generated ones: `tools/harness.mjs` would write a sandbox and a deny list the tools do not have, so `.claude/settings.json` takes the tools' hand-kept hooks, byte for byte, which name `${CLAUDE_PROJECT_DIR}/tools/…` and are right for a chat on the root; that a hook fires once in a live chat on the root is the owner's to see. Standards: the three official digests as pm-skills 5.0.3 ships them, and a house digest that points at the Finisher's rather than copying it. The gate runs `node tools/check.mjs` here as intake asks of an existing project, so a fault in this ledger fails the root gate. The parent's first items are the ones RESTRUCTURE-LOG.md wrote down for stage 6 (PLAN-10 in the Finisher, PLAN-2 in Name Graphics): UVT-4, the translation register, and UVT-5, the colleagues' first round; UVT-6 holds stage 7's half here. The owner signed the profile, rules and brief in this chat on 2026-11-26, choosing "Sign all three (Recommended)", and confirmed the Handoff and Network lines, never defaulted, with "Confirm both (Recommended)". The owner's words, 2026-11-25: "the parent project should be UoN Video Tools, and there are standalone tools within that which share a lot of base code"; 2026-11-26: "start stage 6, and insert upgrade to pm-skills 5.0.3 at the earliest advisable opportunity".

**Supersedes:** none

**Deferred:** UVT-4, UVT-5, UVT-6

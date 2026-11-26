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

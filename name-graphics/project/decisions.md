# Decisions

<!-- Newest first. Never edit an old entry; supersede it. Rule 1 reads
     exactly the latest ten entries' heading, Decision line and Deferred
     line, newest first. The Decision line states the what and its
     one-line why; Rationale holds evidence and detail, read on demand.
     The slice fails at close over 1,000 words. Grammar:
     ## YYYY-MM-DD — ID — title
     **Decision:** what was decided and its one-line why.
     **Rationale:** evidence and detail, in the terms another session
     would need.
     **Supersedes:** YYYY-MM-DD — ID — title, or "none".
     Optional **Deferred:** comma-separated target IDs, or "none".
     A PLAN-N entry also has **Items:** with its phase IDs; a later
     PLAN-N Items list replaces the whole list and supersedes the
     earlier; a closed phase is checked against the list no other
     supersedes. Optional **Retired:** names items retired unshipped.
     Budget 45 live entries: when the validator warns, tools/archive.mjs
     moves the oldest entries verbatim to project/decisions-{YYYY-MM}.md
     and adds one line to project/archive-index.md. -->

## 2026-11-26 — VNG-11 — Shared, not copied: Name Graphics joins the Finisher in one repository as `name-graphics/`, code two tools need in `shared/`

**Decision:** the project's history is merged into the Finisher's repository, renamed `djDAOjones/UoN-Video-Tools`, as the folder `name-graphics/` with its own ledger; code both tools need moves to `shared/` and is imported by path, not copied and owned; a parent ledger at the root owns `shared/`, and a change there is a parent item that closes only with every tool's gate green — because the owner chose one parent with shared base code on 2026-11-25.

**Rationale:** The owner's words of 2026-11-25, verbatim, are in VNG-11's item file; the plan and the fifteen answers (D1 to D15, "approves everything") are the Finisher's restructure prompt. Nothing shared had drifted since the copy at 27f51dd, and the open backlog names Finisher code five more times (VNG-2, VNG-4, VNG-5, VNG-8, VNG-9), so copying would make every shared fix twice. A throwaway spike on 2026-11-26 proved this project's tree byte-equal under `name-graphics/`, its two SHAs resolving and its gate green on the one root install. Brands stay packs chosen at build time.

**Supersedes:** 2026-11-05 — INTAKE — Video Name Graphics founded as the UoN Video Finisher's sibling: its own repository, code copied and owned, brands as build-time packs

**Deferred:** none

## 2026-11-26 — REFRESH-501 — The project runs pm-skills 5.0.1 (build fd5fb94), by the refresh route, after the lab build is restored to the 5.0.0 release

**Decision:** the project runs pm-skills 5.0.1, build fd5fb94 (the tag v5.0.1 of canon, its release folder `pm_skills/`), as the Finisher does, by the release's refresh route in its own commit (74b5d07), after a commit (9b81e5d) that puts back the 5.0.0 release's own copies over the lab build 4ab66b5 the project was founded on; nothing under `project/` is written — because the owner's decision D8 of 2026-11-25 takes Name Graphics to 5.0.1 before it is merged with the Finisher, so the merged repository holds one pm-skills version.

**Rationale:** The owner named the release on 2026-11-26: "<https://github.com/djDAOjones/PM-Skills>". It was cloned outside OneDrive; its tag v5.0.1 is fd5fb94, the build REFRESH-501 gave the Finisher, and all 26 of the Finisher's installed tool, verb and contract files equal `pm_skills/` there. The lab build 4ab66b5 is in no history of canon: not one of the project's tool files was a blob of it, only `AGENTS.md`. So the route, named any released build as the installed one, refused with 19 reasons, each "a local edit no decision carries ... or restore the pm-skills copy". The restore took the 5.0.0 release (a2a4b37), whose file list is the project's plus `tools/VERSION`; then the route replaced seven files (`tools/VERSION`, `check.mjs`, `harness.mjs`, `ledger.mjs`, `migrate.mjs`, `read.mjs`, `verbs/intake.md`) and found the 17 files under `project/` byte-equal. Both steps ran first on a throwaway clone with the same result. The ledger already passed 5.0.1's checker before either step. At each commit `node tools/check.mjs` gave 0 failures and 0 warnings and `npm run check` was green, 126 tests. A canon v5.0.2 exists; the repository stays on one version, 5.0.1, and a later refresh takes every ledger together. It supersedes INTAKE's "pm-next v3.1 ledger at PM-Skills lab 4ab66b5" and nothing else of it. Rollback: revert 74b5d07, then 9b81e5d.

**Supersedes:** 2026-11-05 — INTAKE — Video Name Graphics founded as the UoN Video Finisher's sibling: its own repository, code copied and owned, brands as build-time packs

**Deferred:** none

## 2026-11-05 — VNG-1 — The seed: the Finisher's tooling, core and shell copied at 27f51dd; the neutral pack a grey ramp; the gate without the neutral-build check until VNG-2

**Decision:** the seed copies the Finisher's dev tooling (its nine dev dependencies, no runtime one), `src/core/` and `tokens.carbon.css` at 27f51dd, cuts `app.css` to the rules the shell's elements use, and gives the neutral pack Carbon's grey ramp for every colour role; `app.css` imports `brands/neutral/tokens.css` directly and the gate is the Finisher's code and docs checks plus the v3 checker — because VNG-1's criteria say so, and the build-time pack choice and the neutral-build check are VNG-2's.

**Rationale:** The neutral pack's rule is "a palette chosen for contrast alone" (brands/README.md); a grey ramp is no organisation's colour, and Carbon's grey steps already sit beside its status ramp in `tokens.carbon.css`. Light: grey-10 page, white panels, grey-100 text, grey-70 secondary (7.1:1 on grey-10, the tightest pair), grey-90 primary; dark and `.on-brand`: grey-100 ground, white text, grey-20 secondary, grey-10 primary; every pair is held by `test/contrast.test.ts`. The neutral band has no logo, so `--brand-logo-height` is the 44 px target floor, room for VNG-4's switcher. `app.css` keeps only rules a shell element uses — skip link, focus, bands, title, lede, version line, the body and title type roles and the forced-colours focus ring — so the item's "Finisher lines 1–475 and the page title, status, mono and forced-colours rules" yielded no status or mono rule: the shell has neither element. Not copied: the Finisher's Xerte build mode (VNG-9), branding-asset plugins, the audio tests' 30 s timeout, `check:placeholders`, `check:build`, `check:memory`. The UoN-only contrast assertions (no black, Nottingham Blue grounds) go with VNG-2's UoN pack. `src/main.ts` is a new cut of the Finisher's: error capture and the version line. `.claude/launch.json` names this project's dev server.

**Supersedes:** none

## 2026-11-05 — PLAN-1 — Phases 1 and 2: the seed, the brand packs and the output format, then one graphic end to end

**Decision:** Phase 1 is VNG-1 to VNG-4, the seed, the brand packs, the output spike and the three languages; Phase 2 is VNG-5 to VNG-7, one graphic end to end; the release items VNG-8 and VNG-9 follow — because the owner approved this order on 2026-11-05.

**Rationale:** The output format carries the project's one real technical risk: Clipchamp's help pages list MP4, MOV and WebM as accepted formats but say nothing about transparency (searched 2026-11-05), so the format is settled by a spike a person checks in Clipchamp before any style is drawn. The brand seam comes before the first style so that no style is written against one brand. VNG-7 waits for the owner's design source; the owner's earlier lower-third projects sit in `2_Projects/Side Projects/` (2016-10-17 UoN Lower Third, 2017-09-09 UoN New Branding Lower 3rd AE) and may be it.

**Items:** VNG-1, VNG-2, VNG-3, VNG-4

**Supersedes:** none

## 2026-11-05 — INTAKE — Video Name Graphics founded as the UoN Video Finisher's sibling: its own repository, code copied and owned, brands as build-time packs

**Decision:** a new repository, djDAOjones/Video-Name-Graphics, with its own pm-next v3.1 ledger at PM-Skills lab 4ab66b5 and IDs `VNG-n`; code is copied from the Finisher at a named commit and owned here, not forked or shared; brands are packs chosen at build time, the neutral build the default — because the owner chose this approach on 2026-11-05.

**Rationale:** The owner asked for a sibling to the Finisher that makes lower thirds, keeps its simple, accessible form and look, and ports to a non-UoN context. A separate repository keeps the Finisher's brief ("a conveyor with one cut… nothing else") and its pending Xerte release untouched, and makes "carries no UoN branding" provable in a default build. A fork would carry the Finisher's history, record, media pipeline and EBU suite; a shared package or monorepo is premature with two consumers and would add a dependency to both. Copied files name their Finisher commit (27f51dd at founding); a shared package is reconsidered when a third app needs one. Installed from the lab's `lab/next-v31` at 4ab66b5 by `git archive`, its tools and verbs byte-identical to the Finisher's. The owner's answers in session: Handoff, Network, Secrets and standards as the Finisher's; signatures delegated, not reviewed, until the owner signs. Digests: carbon, nielsen, node and wcag-2.2-aaa are the lab's at 4ab66b5, each dated by its own header, not re-fetched; carbon gains the brand-pack typeface rule; house-conventions is the Finisher's at 27f51dd with its DSP and loudness rules dropped. The Session line is the template's 350k, which the Finisher's later planning also used. Settings: `.claude/settings.json` is the Finisher's, the session hooks only, as its own decision of October left it after the sandbox blocked Chrome and local ports; `.claude/settings.intake.json` is `tools/harness.mjs`'s; the Codex profile and hooks and the post-commit hook carry absolute paths, so they are regenerated in each checkout and ignored, not committed.

**Supersedes:** none

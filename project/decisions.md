# Decisions

<!-- Newest first. Never edit an old entry; supersede it. Rule 1 reads
     exactly the latest ten entries' heading, Decision line and Deferred
     line, newest first. The Decision line states the what and its
     one-line why; Rationale holds evidence and detail, read on demand.
     The slice fails at close over 1,000 words. Entries the migration
     inventory lists are inherited and read as heading and Deferred
     line only; this ledger inherits none — the canon decision log is
     frozen under pm_skills/ and indexed by project/history.md. Grammar:
     ## YYYY-MM-DD — ID — title
     **Decision:** what was decided and its one-line why.
     **Rationale:** evidence and detail, in the terms another session
     would need.
     **Supersedes:** YYYY-MM-DD — ID — title, or "none".
     Optional **Deferred:** comma-separated target IDs, or "none".
     A PLAN-N entry also has **Items:** with its phase IDs. A later
     PLAN-N Items list replaces the whole list and supersedes the
     earlier; a closed phase is checked against the list no other
     supersedes. Optional **Retired:** names items retired unshipped,
     comma-separated, the reason in the entry: neither open nor
     shipped, never reopened.
     Budget 45 live entries: when the validator warns, tools/archive.mjs
     moves the oldest entries verbatim to project/decisions-YYYY-MM.md,
     beside this file, listed in project/archive-index.md. -->

## 2026-11-04 — PLAN-8 — The walks and CPU- and GPU-heavy work move to the Mac Pro; main development stays on the MacBook Pro, on the owner's word

**Decision:** From 2026-11-04 the owner's 2019 Mac Pro runs Phase 8's walks and CPU- and GPU-heavy work: VH-220 to VH-224, fix items' before and after walks, and VH-203's after-run. The gate (`npm run check`) runs there too. Main development stays on the MacBook Pro in the OneDrive checkout: code, the record, the release cut (VH-204) and deployment. A commit made on the MacBook Pro reaches main through a branch that the Mac Pro gates and lands. The reason is that the Mac Pro is otherwise idle and takes the load off the development machine. No table mixes readings from the two machines.

**Rationale:** The owner's words, verbatim, in the chat "Backlog status" on 2026-11-04, in order:

- "could I viably do this on another machine that is otherwise idle? it's half the speed but would be good to offload";
- "no, I want all of the walks and checks on the other mac. just deploy here";
- "please instruct the current orchestrator(s) to end processes at a suitable point, and get me over to the new mac. I will install claude app there, so provide a prompt or documentation to get things kicked off over there";
- "we are moving to mac pro for the walks / and cpu/guy intensive stuff, but main development will be on the primary macbook pro computer. record what seems useful". This is read as "CPU/GPU"; it narrows "just deploy here" to the split this entry states.
- "the game is on the macbook. work should be on the mac pro". This was said when this entry's own gate timed out 5 DSP tests in `src/audio/chain.test.ts` on the MacBook Pro, under a load average of 14.7 (1,658 tests passed). It is read as the gate running on the Mac Pro too, and this entry is the first commit to take the branch route.

The machines:

- MacBook Pro: Apple M1 Max, 10 cores, macOS 26.6.2, Chrome 157.0.8103.39, Node 24.21.0, Homebrew ffmpeg 9.0.2.
- Mac Pro: Intel Xeon W-3223, 16 threads, x86_64, macOS 26.5.1, home `/Users/uazjob`, no battery. Homebrew refuses Intel Macs, so each tool comes from its maker's download, and its ffmpeg build is recorded.

The stop and the hand-over:

- Orchestrator #38 stopped VH-220 to VH-223 "interrupted" at about 14:35Z. Nothing was committed, pushed or landed; origin/main was `ca093da`. The worktrees and `side/vh22N` branches stay on the MacBook Pro until the owner confirms the Mac Pro has what it needs.
- The bundle is the OneDrive folder "2026-08-24 UoN Video Helper - new Mac handover" (482 MB, checked by `MANIFEST.sha1`). It holds the side contract, every item's hand-over and wip save, #38's transfer hand-over and the start prompt for Orchestrator #39, the first on the Mac Pro.

What changes on the Mac Pro:

- The walk scripts hard-code `/Users/joe` and are adapted, each edit recorded by sha1.
- The load threshold "below 8" was set for 10 cores; the Mac Pro's orchestrator rules its own before the first gate.
- The battery limits of the owner's power rule cannot arise there.

Each walk records its machine. Two questions remain for the owner:

- whether VH-220 to VH-223's cells already walked on the MacBook Pro are re-walked on the Mac Pro, which #38 recommends and which holds until they answer;
- how a fix item built on the MacBook Pro reaches its walks on the Mac Pro, beyond the branch route this entry takes.

**Supersedes:** none

**Deferred:** none

## 2026-11-04 — V31-REFRESH — The project takes pm-next v3.1 as the lab now builds it: tools and verbs replaced as a set, the record kept

**Decision:** the project runs pm-next v3.1 at PM-Skills lab 4ab66b5 from the commit carrying this entry: six tools and three verbs replaced, two tools and five add-on verbs added, as v3.1's set; rule 9 asks a Checked line only where a model policy requires it, and this project keeps none — because the owner asked on 2026-11-04 to upgrade the project after its first-month test.

**Rationale:** The lab's V31-REFRESH-1. No route in v3.1's change notes covers a later v3.1 build over an installed v3.1 (the upgrade tool refuses a second snapshot), so this follows the "Existing installations" rules by hand: every installed file matched b5c6f4b's bytes, so no local edit is carried; tools and verbs are replaced as a set from lab/next-v31 at 4ab66b5; the contract merges rule 9's one change; no project template is copied over the record, and the decisions template's sentences on Items and Retired are merged into this file's comment. Replaced: check.mjs and ledger.mjs (a closed phase is checked against the PLAN Items list no other supersedes, a Retired field, traces read in a Rationale, the trajectory read by each line's own date with a phase-order warning), handover.mjs (the start notice's recovery sentences), harness.mjs (the post-commit hook rebuilds the status site), view.mjs (the status site beside view.html, both ignored here), migrate.mjs (the upgrade checks), and the intake, plan and close verbs. Added: brief.mjs and lanes.mjs, for orchestration and parallel writers, and the add-on verbs orchestrate, control, sweep, stocktake and design-review, which no rule reads. The session hooks are unchanged, so no setting is regenerated. The new checker failed Phase 1 and Phase 7, whose PLAN lists were additive; the four PLAN entries below restate them whole. Rollback: revert the pull request's merge commit; nothing outside the repository changes.

- Migration edit: none — every replaced file was b5c6f4b's, byte for byte

**Supersedes:** 2026-10-22 — V31-UPGRADE — The project runs pm-next v3.1: tools, verbs and the start-notice hook replaced as a set, the record kept

**Deferred:** none

## 2026-11-04 — PLAN-7 — Phase 7's twelve items restated whole, in place of the 22 October list

**Decision:** Phase 7's items are VH-170 to VH-181, all shipped, the twelve its three PLAN-7 lists named between them; restated because v3.1's checker reads a later Items list as the whole list, and these lists were additive. No membership changes.

**Rationale:** Record-only, by V31-REFRESH. The new phase-close rule takes the PLAN-7 list no other supersedes and fails three different lists left standing. An entry supersedes one entry, so this and the next two restate the same twelve items, each in place of one of the three lists; nothing is re-judged.

**Supersedes:** 2026-10-22 — PLAN-7 — A second design, UX and accessibility pass, with Codex astra as partner at every stage, gates the cut

**Items:** VH-170, VH-171, VH-172, VH-173, VH-174, VH-175, VH-176, VH-177, VH-178, VH-179, VH-180, VH-181

## 2026-11-04 — PLAN-7 — Phase 7's twelve items restated whole, in place of the fix plan's list

**Decision:** Phase 7's items are VH-170 to VH-181, as the entry above restates them, here in place of the fix plan's list. No membership changes.

**Rationale:** Record-only, by V31-REFRESH; the reason is the entry above's.

**Supersedes:** 2026-10-23 — PLAN-7 — The fix plan: VH-178 to VH-180 for seven findings; the owner's ask decided on the standing instruction

**Items:** VH-170, VH-171, VH-172, VH-173, VH-174, VH-175, VH-176, VH-177, VH-178, VH-179, VH-180, VH-181

## 2026-11-04 — PLAN-7 — Phase 7's twelve items restated whole, in place of the four wish lines' list

**Decision:** Phase 7's items are VH-170 to VH-181, as the entries above restate them, here in place of the list of the owner's four wish lines. No membership changes.

**Rationale:** Record-only, by V31-REFRESH; the reason is the entries' above.

**Supersedes:** 2026-10-23 — PLAN-7 — The owner decides the four wish lines: one name for step 4, a forced-colour hover, V-18 accepted, the statement edited once

**Items:** VH-170, VH-171, VH-172, VH-173, VH-174, VH-175, VH-176, VH-177, VH-178, VH-179, VH-180, VH-181

## 2026-11-04 — PLAN-1 — Phase 1's five items restated whole, in place of the 18 October closing's list

**Decision:** Phase 1's items are VH-126, VH-127, VH-128, VH-131 and VH-132, all shipped, as the 19 October list names them; restated in place of the 18 October list of three, which v3.1's checker would otherwise leave standing beside it. No membership changes.

**Rationale:** Record-only, by V31-REFRESH, for the reason the PLAN-7 entries above give.

**Supersedes:** 2026-10-18 — PLAN-1 — Internal use only is the official closing with words added; no card text under 28 pt

**Items:** VH-126, VH-127, VH-128, VH-131, VH-132

## 2026-11-04 — VH-225 — Closes: the repository and the Pages address renamed, on the owner's word

**Decision:** VH-225 closes with commit 2: on the owner's "Renamed it", the profile's repository URL, the init prompt's address, the branding path's comment and test, and `vite.config.ts`'s comment take UoN-Video-Finisher; vite's base follows the repository's name through the deploy workflow. Pages serves at the new address; the old returns 404 (VH-225.3).

**Rationale:** The owner's word, 2026-11-04 at about 07:31Z, in Orchestrator #37's chat, their own turn, verbatim: "Renamed it" (`plan8-owner-words.md`), answering the rename ask made after commit 1, `72b103e8`, went green on Pages run 41749929086; and "Rename those too" (2026-10-28). Orchestrator #37 verified at 07:32Z that the renamed repository resolves with main at `72b103e8`, the new address returns 200 and the old 404. Commit 2's asset paths were proved before the ask by a local build with `BASE_PATH=/UoN-Video-Finisher/`: the page's script and stylesheet, the branding base and the job worker, all under `/UoN-Video-Finisher/`. No deploy was queued or running at the rename: commit 1's run completed at 00:53Z, and `gh run list` showed no later run at 00:54Z, 00:57Z and 07:32Z, with origin/main unmoved. Until commit 2's deploy the new address served commit 1's build, made for the old path, so its assets did not load: inferred from the workflow's `BASE_PATH`, not measured page by page; the ask said to finish and save any job first. Kept: the local `origin` URL, which GitHub redirects, with `.git/config` unchanged; the identifiers commit 1 pinned, so saved choices carry over on the same origin; the two scripts' temporary folder prefixes; the launch configuration's name; the records' file names. Shortfalls: the old address's 404, wish VH-225.3, for the owner; the names' native check, VH-105.2. Digest rules: house-conventions, "Fail loudly on data loss".

**Supersedes:** none

**Deferred:** none

## 2026-11-04 — VH-225 — Commit 1: the visible name UoN Video Finisher in three languages, no address changed, the item open

**Decision:** VH-225's first commit gives the app the name "UoN Video Finisher" on every surface it shows, with "Penyiap Video UoN" in Malay and "UoN 视频成片工具" in Chinese, an orchestrator's acceptance listed for the owner. The hidden identifiers keep their names, pinned by a test; no address changes. Wish VH-229.2 retired, its readings done. The item stays open: the repository rename is the owner's click, and commit 2 carries the addresses and the close.

**Rationale:** The owner's words (`plan8-owner-words.md`), apart from the orchestrators': "it is to be called UoN Video Finisher (rather than UoN Video Helper)" and "the next release must contain the rename" (2026-10-28, "Backlog review"); "Rename those too", the repository and the Pages address; "Yes, move it", the slot after VH-210; "Gateless covers the rest of Phase 8"; "Yes, leave them", the walker's old-order pins; and S-133's records "a named instrument gap", measured in VH-203's after-run (2026-10-27). The orchestrators' rulings, listed for the owner: #35, the two names, the 1,695 cells a side and S-133 skipped on both sides; #36, the build accepted and the subject fails at the old revision expected; #37, the proof's load recorded with no re-run, J1 the instrument, S-141, S-143 and S-144 not reached (wish VH-225.1), and S-59's and S-109's player row the instrument (VH-199.1). Measured: 1,695 cells planned a side, 1,694 attempted and 1,690 reached, every group on AC at power mode 2; every title, h1, "covers" line and email subject read the old name before and the new after. The walker's three subject assertions moved it from `fe44891d3c53f716` to `9c52269607bccc4c`: the after passes 87 of 87 and the flows 3 of 3, a read-only export of the base 0 of 87 and 0 of 3. At the old revision the subject rows fail as expected (S-146 121, S-78 118), and the old-order pins fail alike in 553 cells a side. [The table](../reviews/2026-10-25/design-pass-3/evidence/measurements/vh225-name-r1-2026-11-03.md) is the second by script from one walk; the first is on file and its notes were corrected on Codex's verdict check. A job in flight at the cutover is lost, since a reload orphans its scratch by design, so the rename ask says to finish and save first. Wishes VH-225.1 to VH-225.7 raised; VH-105.2 widened to take the two names, which the native check confirms; VH-229.2 retired, its four readings done in this walk: translation binding (S-04), reload (S-06a), the tab title (the titles group) and the open panel (S-03 with the "?" open). Codex's verdict: "Pass with conditions for commit 1". Shortfalls: the two names await the native check, the machine-translation notice kept; 32 px page shots show the default size (VH-217.5). Digest rules: house-conventions, "Fail loudly on data loss" (the kept identifiers' test); wcag-2.2-aaa, 2.4.2, 1.4.4, 1.4.10 and 1.4.12.

**Supersedes:** none

**Deferred:** VH-225

## 2026-11-03 — VH-210 — Closes: V-48 whole on the base, V-49's footer link spaced by the ring's room

**Decision:** VH-210 closes V-48 with no rule, its ring whole on the base, and V-49 by `--focus-room` between the footer list's items under forced colours: `#contact-creators` failing 418 forced cells to 0. Wish VH-209.3 retired, its condition applied. The orchestrators' rulings listed for the owner.

**Rationale:** The owner's words: the answer to VH-202's ask, "as reccomended, and convery me the 9 point ask here" (the "Backlog review" chat, 2026-10-27, point 1, the plan approved), and "Gateless covers the rest of Phase 8" (`plan8-owner-words.md`). V-48: VH-209 removed the sideways scroll, so the item's own condition applied: recorded, no rule; the finding's 4 px² went with the scroll and were not located. V-49: the theme paints a backplate behind each line of a wrapped link, and the ring of the link above, drawn past its box by its room, lay under the next link's first line; an inside ring would lie over the link's own glyphs, LinkText to Highlight not 3:1. `.footer-help-list > li + li { margin-block-start: var(--focus-room); }` in `app.css`'s forced-colours block, pinned by `test/stylesheet.test.ts` (a source-presence test). Each link keeps its 44 px box; the forced footer is 4 px taller, one-line cases included, explained, not unchanged. Walked before and after: 1,165 table cells a side, with S-ID1's two f3 records outside the script's count (VH-210.4), revision `fe44891d3c53f716`, mode 2, AC but after-f1 on battery 100% to 80%. [The table](../reviews/2026-10-25/design-pass-3/evidence/measurements/vh210-rings-r4-2026-11-02.md), the fourth by script from one walk, the first three on file: Codex's blind check found the notes' wording wanting, and the repaint check was added. Rulings, the orchestrators': #34, the forced records' groups, the staged records, the stale-palette spacing cells walked alone (sp), groups at load 8 or above standing on their first runs, `#accessibility-statement a` reported unmoved; #35, the export proof accepted with its exit 1 on `f.changedAny` alone (11 of 84, noise, VH-210.3), the re-walked pairs for ruling 4's repaint (rw4), S-76 (rw76) and S-109 (rw109; its timed `player` row flaky on the base, VH-199.1's), and the repaint check: in 418 fail-to-pass cells no ring reads 0 where the before read whole, and every other ring reads as before but `#contact-self-service`, which passes with equal or more area. Shortfalls: a real Windows theme stays the person checklist's task D; 32 px page shots show the default size (VH-217.5). Wish VH-209.3 retired: its condition is applied. UI-STANDARDS unchanged: its 2.4.13 rule already reads forced colours. Digest rules: wcag-2.2-aaa, 2.4.13 and "focus appearance"; carbon, "two token systems, never collapsed".

**Supersedes:** none

**Deferred:** none

## 2026-11-02 — VH-219 — Closes: step 4's selects whole when closed, at 32 px on a phone

**Decision:** VH-219 closes wish VH-189.1, CSS only: the selects' closed text wraps between words, its lane widened by tokens below 19.99rem. Options clipped closed 2,784 to 0 of 31,104 readings a side. Two rulings the orchestrators', listed for the owner.

**Rationale:** His words: "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" and "even old issues should be solved for" (the "Backlog review" chat, 2026-10-27, `plan8-owner-words.md`). The before, measured on `62fc265` (no VH-199 record matched the moved page): at 32 px the lane was 148, 203, 228 and 229 px at 320, 375, 400 and 401 px, and no token padding fits English's 304 px option on one line, so the text wraps; the lane is now 204 to 285 px and the box 76 to 118 px tall, 44 to 60 in the spacing mode. Evidence: [the third table](../reviews/2026-10-25/design-pass-3/evidence/measurements/vh219-selects-r2-2026-11-01.md), 5,184 + 84 cells a side: clipped 2,784 to 0, targeted 101 of 504 to 0, over the arrow 1,920 to 0, spacing at the default font 480 to 0; the default font unspaced unmoved; names, labels, 44 px targets and rings unchanged. No residue for the owner. Orchestrator #33: the matrix stands at 5,184 + 84, onset read by `selectedIndex`, not walked as a dimension. Orchestrator #34: groups with load at 8 or above re-walked where the battery allowed, all identical; the rest stand on their first runs, after-staff-fade and -none confirmed 2026-11-02. Codex's blind check, "pass with conditions": evidence qualifications, each verified, carried in the second table's notes, no re-walk; its close check, "FAIL" on one sentence of those notes, a void said moved that lies where it ran, corrected in the third. The first two tables stay on file. Shortfall: the open list unmeasured, a person's check (VH-219.3); 32 px page shots show the default size (VH-217.5), so the visual reading rests on 12 viewport captures; the walker's select rows and `type` read the wrong thing (VH-219.1, VH-219.2); the driver's `hold` labelled 2,592 cells a side failed with every reading whole, and the export runs' manifests name the checkout (VH-219.4). Sized at about 40k, it took two workers. UI-STANDARDS: no rule changes. Digest rules: carbon, "two token systems, never collapsed"; wcag-2.2-aaa, "44 px targets" and 1.4.10.

**Supersedes:** none

**Deferred:** none

## 2026-11-01 — VH-230 — Closes: each state word whole in the System check's mark column, on its own 3 rem token

**Decision:** VH-230 closes the item by the second remedy it names: `--system-check-mark-width`, `var(--spacing-09)`, 3 rem, on `tokens.carbon.css`, read by the three `.system-check .check` declarations, with `white-space: nowrap` on the mark. `--mark-width` keeps 1.5 rem for the base grid, so the acceptance page is unmoved. Broken mark readings 1,092 to 0 of 3,024 a side; label words broken 0 to 0. No element, string, DOM order or colour. Wish VH-230.1 holds the acceptance page's own marks. Orchestrator #33's ruling, listed for the owner.

**Rationale:** His words: "even old issues should be solved for"; "ensure everything passes UX / design / Accessibility" (`plan8-owner-words.md`). The widest mark is Malay's "Tidak", 44.72 px under the spacing sheet, 2.8 rem; 3 rem leaves 3.28 px and is the scale's own step. Both designs chose the token, as a rise in `--mark-width` reaches the acceptance page without curing its longer words. `nowrap` is Codex's, adopted on the arithmetic: a mark wider than its column stays whole, using the 12 px gap first, and reaches the label only 15.28 px beyond the walked widest; the walk reads containment apart from lines, and `nowrap` holds nothing in the matrix. Reported: 124 values newly beneath their labels, none back; labels gain a line in 212 readings, between words; Chinese's 制作 wraps across two lines in the warned AAC value at 320 px under spacing, 4 readings, ordinary Chinese line-breaking; en-GB's gutter wider than its words. Evidence: [the table](../reviews/2026-10-25/design-pass-3/evidence/measurements/vh230-check-marks-r2-2026-11-01.md), 432 cells a side, all reached, no verdict moved, overflow 0 to 0, the ellipsis 28, 56, 31.38 px. Shortfall: no true 32 px shot, the walker's capture effect; spacing with 32 px and widths between those named not walked; `type` fails alike in 108, the driver's combined spacing modes. The first two tables stay on file: Codex found the notes wanting, twice, repaired in the third, no re-walk. Digest rules: carbon, "two token systems, never collapsed"; wcag-2.2-aaa, 1.4.10 and 1.4.12.

**Supersedes:** none

**Deferred:** none

## 2026-11-01 — VH-230 — Raised: the state words broken in the mark's column, its own fix item before VH-220

**Decision:** VH-230 takes the state words too wide for the System check's 1.5 rem mark column, each broken over two lines, the same before and after VH-218: its own fix item, directly after VH-218 and before VH-219, landing before VH-220. Both remedies stay unchosen: widen the gutter for every row, or add a token. The orchestrator's ruling, not the owner's, listed for him.

**Rationale:** Orchestrator #33's ruling, 2026-10-31, by section 3 of the brief, a remedy that outgrows the item, with his "even old issues should be solved for" (`plan8-owner-words.md`, read by `sed`): "The mark's column is its own fix item, not a wish." Measured by VH-218: default font "Tidak" 36.33 of 24 px and 好的 28 of 24 px; under spacing "OK" 24.38 of 24 px. Codex astra's re-check confirmed the assignment and added Chinese's pending "……", two lines, width unmeasured. VH-220's checks read the final page, as the PLAN-8 entry on VH-225 says. The first table's "wish VH-218.1" was never issued.

**Supersedes:** none

**Deferred:** VH-230

## 2026-11-01 — VH-218 — Closes: the System check's labels break only between words, CSS only

**Decision:** VH-218 closes wish VH-186.1: each System check row wraps its value beneath its label when both won't fit, by a scoped flex rule, and at 32 px on a phone the mark takes its own line, in the existing 19.99rem query, so the label has the whole column. Label words broken 2,028 to 0 of 3,024 readings a side, no element, string or token value; the fallback stays, breaking no word now. One walker change, a fixed worker value, revision `fe44891d3c53f716`, proved. Four rulings the orchestrator's, listed for the owner.

**Rationale:** His words: "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility"; "even old issues should be solved for" (`plan8-owner-words.md`). Orchestrator #33's rulings, 2026-10-31, his to see: (1) the repair past the brief's "report the word"; (2) S-103 walked under the AAC warning on both sides, 108 cells each, the before from a read-only `git archive` of the base, as the earlier "those cells can't exist" was false: Codex showed one can; pending and failed can't stand with S-103's row (`src/main.ts:1335`, `:1349`, `:1372`, `:2558`; `src/ui/failure-text.ts`); (3) one source diff across the after; (4) VH-230. Evidence: [the table](../reviews/2026-10-25/design-pass-3/evidence/measurements/vh218-check-rows-r3-2026-10-31.md), 648 cells a side, 648 reached, no verdict moved; S-103's row identical 108 of 108 each way; `type` fails alike in 162, the walker's reading of the combined spacing modes. Shortfalls: no true 32 px page shot, the walker's known capture effect, so the stacked mark rests on the probes' boxes; the first five befores on AC and the after on battery, all mode 2; `after2-s103` 8 of 18 load samples at 8 or above, peak 40.41, the owner's, on which Codex asked no re-run. Codex astra: FAIL, FAIL, FAIL, then PASS, each repaired. Digest: carbon, "two token systems, never collapsed"; wcag-2.2-aaa, 1.4.10 and 1.4.12.

**Supersedes:** none

**Deferred:** VH-230

## 2026-10-31 — VH-209 — Closes: at a 32 px default font on a phone width the page keeps to its column, the insets on the orchestrator's ruling

**Decision:** VH-209 closes V-50, CSS only. One query below 20rem, unreached by the default font at 320 CSS px or wider, gives the page's and panels' insets `--spacing-03`, wraps the switchers and Set buttons, stacks the colours and breaks a long heading word. No element, control moved, word or token value. The insets are the orchestrator's ruling, not the owner's, listed for him. Sideways scroll 110 of 144 reached cells to 0 of 156. V-18's six and 180 default-font cells unmoved. Wish VH-229.3 retired: Malay's title no longer breaks mid-word.

**Rationale:** The owner took V-50 at rank 3 (VH-202's close, point 4); "CSS only, with the existing tokens; no element, no move of the switchers and no rewording" is the item's Intent. At 32 px the insets double and the window does not: the panel's column was 126 px at 320 and 207 at 401, under a control's padding and longest word together. Means, the criterion's bracket naming "wrapping, `min-width: 0`, a shrinking flex or grid track": Claude asked by rule 2, and Codex's design used the named means alone, by its count "one or two Latin letters per line" at 320 px. **The orchestrator's ruling, in its words:** "The criterion's bracket names means, not a closed list, and Set text at one or two letters per line would not meet the item's point of letting a person read the choices", on "below 20rem only, `--spacing-03`". It is a refined criterion in the item; Codex's blind check agreed "as an implementation choice", "not an assertion of owner endorsement". Column now 254 and 335 px. **Measured, on 92eaf65, revision e0a55331a7155cd3, AC, mode 2:** 336 cells each side, plus 120 in the repairs Codex asked for. At 32 px, in four colour modes, 156 cells: elements past the window and text past its column or control both 0 after. Rings: Set start and end, the page and video language, Staff video, Student submission, Blue, White and both summaries, 24 of 24 each. 1.4.12 with the rules active: overflow 12 of 12, with three long words past their column at 320 px, by 4, 7 and 33 px, none past the window, nothing lost. Targets: Set 254 x 118 or 160, segments 76 or 118 high. **Not moved:** V-18's six, 309, 480, 501, 471, 656, 724; 180 default-font cells, no instrument or row. One base rule's text, `border-left: 0` to `border-left-width: 0`, with no painted change. **Reported:** V-48's record 460 to 528 of 464, VH-210's (wish VH-209.3). The chooser's ring at 320 px and 32 px, 112 px² short on both sides (wish VH-209.1). Past 32 px at 320 px it does not all hold (wish VH-209.2). Wish VH-229.3 retired: Malay's title at 320 px and 32 px now reads two lines with "Pembantu" whole, from four, since its column grew, not worked on; the "?" keeps its own line there. Step 4's selects gained room, 20 to 148 and 101 to 229, still VH-219's. Wish VH-216.1's rows fail on both sides, his "Yes, leave them". Not walked: error, running and locked states at 32 px; S-03 and others at w375. Rule 8: wcag-2.2-aaa, "every exception recorded"; carbon, "our own code, never the packages". Evidence: `vh209-overflow-2026-10-31.md`, `vh209-repairs-2026-10-31.md`, the correction beside them.

**Supersedes:** none

**Deferred:** VH-203, VH-210, VH-219

## 2026-10-31 — VH-229 — Closes: the promises and the privacy line behind a "?" beside the title, on the owner's word

**Decision:** VH-229 closes the owner's change. One "?" follows the page title, outside the heading, named "About this tool", closed at every load. It opens the existing `.lede`, the five promises then the privacy line; the panel stays open until pressed again. `#browser-note` stays in view. Spec §9.2 takes wish VH-229.1's one line, which retires it. One string, one wrapper, no walker change. At 320 × 568, closed, zh-Hans is 88 px short and ms-MY 156 px short, reported, wish VH-175.4 kept. At 320 px and 32 px Malay's title breaks within a word: contained, not comfortable, reported.

**Rationale:** The owner, verbatim (`plan8-owner-words.md`, read by the orchestrators): "what about a question mark box after the app title, if clicked expands the promises follwoed by the "Your video is processed on your device, it is never uploaded, and the original file does not change." segment. users then aren't bother by text, the controls are self evident / self guiding, and novices can click the question mark"; "Hide both", told Claude recommended keeping the privacy line in view; "Approve both". Measured at one instrument revision, `e0a55331a7155cd3`, before on ff44a4f: 636 cells a side, the same 598 reached, 578 unmoved, the 58 others S-03 alone and none newly failing; 38 cells at w375 and 32 px reached on neither side, stated; 3,888 state readings a side and 1,944 of the new "?". The six cases: closed 309, 480, 501 and 471, 656, 724, from 380, 551, 572 and 540, 727, 828; open 525, 696, 765 and 807, 920, 1132. S-03's "About the video format" and "Tab from the top" and S-142's Tab and Shift+Tab fail both sides, reported, redrawn in wish VH-216.1, his at VH-203. Codex astra's blind check held on the table's headline, which counts re-walks twice; its numbers were reproduced from the records and stated in `vh229-title-help-reconciled-2026-10-31.md`, the table `vh229-title-help-2026-10-31.md` standing as placed; it also found the before's re-walk manifests describing the wrong tree, stated there, and that "read well" was not shown at 320 px and 32 px, restated in the item. Escape closes the format tip first, then the panel, except on a control elsewhere. The string's Chinese and Malay are machine translations, marked so. It supersedes VH-216's close for the promises' place alone; the switch stays below step 1. Wish VH-216.3 redrawn to the switch's half; new wish lines VH-229.2 (the rename reads the row), VH-229.3 (Malay's title, his), VH-229.4 (a person with a screen reader). Digest rules (rule 8): nielsen, 8 "Aesthetic and minimalist design" and 10 "Help and documentation", with 6 the trade he chose; carbon, "one primary per state"; wcag-2.2-aaa, 1.3.1, 1.3.2, 1.4.4, 2.1.1, 2.4.3, 2.4.6, 2.5.5 and 4.1.2 re-checked and 1.4.10 failing alike at the 32 px font, VH-209's.

**Supersedes:** 2026-10-30 — VH-216 — Closes: the owner's remedy raises the first action; four of V-18's six cases inside, two reported short

**Deferred:** VH-203

## 2026-10-31 — VH-217 — Closes: the format "?" nearer its words and both "?"s filled while open, on the owner's word

**Decision:** VH-217 closes the owner's two changes. The format "?" takes `--spacing-02`: 8.45 px from its words by the character's box in three languages, 9.85 px by the ink in English and Malay and 18.37 in Chinese, whose full stop's ink sits left, reported, not respaced. Its 44 × 44 target lies over 2.15 px of "format."'s ink, reported; every sampled point hits the "?". Both "?"s fill while open with the chosen segment's tokens, a state and no second primary, and under forced colours with Highlight. No element, string, token value or `docs/` change. The walker's one change is the combined 32 px modes the item names.

**Rationale:** The owner, verbatim (`plan8-owner-words.md`, read by the orchestrators): "I accept everything, but even old issues should be solved for. we also need to make sure that question mark about file formats looks good"; "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility". Measured at one instrument revision, `e0a55331a7155cd3`: 1,440 cells a side, 1,437 unmoved and the 3 others better after, a cause not shown; 108 cells at w375 and 32 px reached on neither side, stated. The clips found a forced-hover defect no number flagged, repaired; the blind check found the first states probe lost the 32 px font, repaired and re-read on both sides. Table: `vh217-format-help-2026-10-30.md`. Digest rules (rule 8): carbon, "one primary per state" and "two token systems, never collapsed"; wcag-2.2-aaa, "7:1 contrast against the brand palette" and "44 px targets".

**Supersedes:** none

**Deferred:** VH-203

## 2026-10-30 — VH-229 — Raised: the promises and the privacy line behind a "?" beside the title, on the owner's choice

**Decision:** VH-229 puts the five promises and the privacy line behind a "?" beside the page title, closed at every load, so the empty page opens on the title, step 1 and the switch. It is built after VH-217 and before VH-209. The owner approved §9.2's new wording, wish VH-229.1, within the 8,200-word budget, and the "?"'s name "About this tool": "Approve both", about 15:08Z.

**Rationale:** His words, in the "Upload controls and app promises layout" chat, about 14:39Z, typed by him: "what about a question mark box after the app title, if clicked expands the promises follwoed by the "Your video is processed on your device, it is never uploaded, and the original file does not change." segment. users then aren't bother by text, the controls are self evident / self guiding, and novices can click the question mark". Claude recommended the promises alone behind the "?", with the privacy line kept in view: §9.2 asks for it, no control can say a file is not uploaded, and it is what makes trying a file safe on a page that no longer says what the tool does. He was shown that, with the measurements, and asked "Which version shall I open an item for?"; he answered "Hide both". Measured by a mock-up on `bdf6b6d`, the button's painted bottom closed: 310, 481 and 502 at 1280 × 900, and 481, 657 and 734 at 320 × 568, in en-GB, zh-Hans and ms-MY, so V-18's two short cases stay short, by about 89 and 166 px, the translation notice being 187 and 229 px of it. The browser note stays outside the panel. Placed on his word, about 14:50Z: "schedule it at the most appripate point in the backlog". After VH-217, which reads the format "?" on today's page and whose open state reaches the new "?"; before VH-209 and VH-210, which then read the new title row at 32 px and its rings, and before VH-225, which then tests the longer title beside the "?". This raise builds nothing and supersedes nothing yet; VH-229's close supersedes VH-216 in where the promises sit. The criteria are drafts for its worker: `project/items/VH-229.md`.

**Supersedes:** none

**Items:** VH-182, VH-183, VH-184, VH-185, VH-186, VH-187, VH-188, VH-189, VH-190, VH-191, VH-192, VH-193, VH-194, VH-196, VH-197, VH-198, VH-205, VH-199, VH-200, VH-201, VH-202, VH-211, VH-206, VH-207, VH-208, VH-212, VH-213, VH-214, VH-215, VH-216, VH-227, VH-217, VH-229, VH-209, VH-218, VH-219, VH-210, VH-225, VH-220, VH-221, VH-222, VH-223, VH-224, VH-203, VH-195, VH-204, VH-226

**Deferred:** VH-229

## 2026-10-30 — PLAN-8 — The owner's five changes: nights, short notes, workers to 350k, VH-220 to VH-224 side by side, a one-page table

**Decision:** On the owner's "yes": a fresh orchestrator each evening; briefs of about 30 KB and hand-overs of about 5 KB, with no Codex check of briefs; workers run straight through, with 350k the ceiling and a hand-back at about 330k; VH-220 to VH-224 run side by side after VH-225 lands; a one-page table by script from VH-217 on. The walks, the before-and-after, Codex's design and final blind checks, VH-203's full run and his bar and every unconditional stop are unchanged.

**Rationale:** His word, verbatim, in the "Backlog review" chat on 2026-10-30 at about 11:36Z (source: the orchestrators' notes, `plan8-owner-words.md`, read `[user] yes` by Orchestrator #32): "yes". He was asked "Shall I send these five to Orchestrator #31 as your decision?" and shown each with its cost, the fifth's "every record is still kept, only the write-up shrinks". Orchestrator #32's rulings, on what his words leave open (`plan8-five-changes.md`): (1) the evening's hand-over and start prompt ready by about 19:30Z, a ready card until his turn. (2) From the next brief, `brief-template.md` and `handover-template.md` are the fixed forms, linking to files, orchestrators' hand-overs too, and the orchestrator adds the item's part without a brief agent; no Codex check of briefs: this supersedes the orchestrators' rule "Codex checks each new brief before it is used, retargets included", which no entry here or in the archive holds (`grep`), so the Supersedes line stays none; a start block still runs, and Claude's reading first, Codex's blind check, the compare and the check before each commit stay. (3) From VH-216 #3's (f), no per-chunk resume and no chunk test; a worker ends its turn only for a real problem or a count check; the check is one line at its own estimate of about 200k and each further 40k, because only a turn's end gives a true count (VH-208 #6's estimate ran 119k low), and the orchestrator replies with the true count; hand back when the true count plus the rest would pass about 330k, leaving about 5 KB for the hand-over; never past 350k. The profile's 200k Session line stays as written and open with him, wish PLAN-8.1, and the hook's notice is no stop. (4) Each of VH-220 to VH-224 in its own worktree, handing back by commit, one walk or gate at a time by the walk lock, on the 2026-10-28 pattern of VH-213 and VH-214; each lands on the orchestrator's go, one at a time, rebased, gated and re-checked; a landing that changes app code is told to the others, which re-read what it touches. VH-221 to VH-224's Next steps, each "Run after" the one before, are not rewritten; this entry governs how they run. (5) `table-1page.mjs`, built by VH-217's worker from VH-216's record and compare scripts, stays outside the walker, and later items reuse it; the table sits in the measurements folder with its records beside it; VH-216's table stands. Checked by `grep`: VH-203's item and the fix plan set no length for a table, so the stage rule's wording is unchanged. Left out, as he was shown: the controller trial and restructuring the code, unanswered, and neither raised as work.

**Supersedes:** none

**Deferred:** none

## 2026-10-30 — PLAN-8 — VH-225 moved between VH-210 and VH-220, so the checks read the renamed page, on the owner's word

**Decision:** VH-225 is built after VH-210 and before VH-220, not last before VH-203, so VH-220 to VH-224 read the renamed page and their "final build" is true; walks before it keep the old name, and the release still contains the rename.

**Rationale:** His word, verbatim, in the "Backlog review" chat on 2026-10-30 at about 10:14Z (source: the orchestrators' notes, `plan8-owner-words.md`, read `[user] Yes, move it` by Orchestrator #31): "Yes, move it", to "Should the rename move to just after VH-210, before the checks?". He was shown the order VH-216, 217, 209, 218, 219, 210, VH-225, VH-220 to 224, VH-203, VH-195, VH-204, VH-226; the flaw, that VH-220 to VH-224 say "the final build" while VH-225 changes the on-page name after them; that the move adds no work; and that their readings wouldn't be repeated, including VH-223's and VH-224's 214 cells, a claim that chat took from VH-203's item note and asked to be checked against `PLANS`. Checked, what holds: the move schedules no re-run because of the rename, and the 214 stand outside the after-run; that nothing is ever read twice is not established. `unrun-2026-10-27.json`'s `stillUnrun` has 214 keys, 108 in VH-223's rule and 106 in VH-224's. Loaded from `scenarios.mjs` and `parts.mjs`, none is in VH-199's twelve runs (`run-01` to `run-12`, 3,219 records), the matrix VH-203's after-run walks again, and none of their 23 scenarios is one of VH-203's added S-107, S-55c, S-92, S-93, S-133 or S-113; `PLANS.matrix` (1,886 records) holds all 214, but no run walks that plan. VH-203's Notes say B's checks are not folded into the after-run. What he must be told, from the check: VH-203's item has no "214", which stands in VH-223's and VH-224's Intents, wish VH-172.1 and three earlier entries; VH-220 to VH-222 cite a row VH-199 already read, which the after-run reads as it always would, walking only the rest; six of the 214 (S-90a and S-90b, three languages, w375, light) sit also within VH-220's six states at 375 px, whatever the order, and no rule makes one reading serve both; VH-203's Notes have the after-run re-read every item that lands out of order; and a check that finds a defect raises a fix item, which re-reads what it touches. Also moved: VH-210's Next step, which named the checks next. The earlier entries' Items lists stand, as written.

**Supersedes:** 2026-10-28 — PLAN-8 — VH-225 raised: the app renamed UoN Video Finisher, before VH-203, on the owner's word

**Items:** VH-182, VH-183, VH-184, VH-185, VH-186, VH-187, VH-188, VH-189, VH-190, VH-191, VH-192, VH-193, VH-194, VH-196, VH-197, VH-198, VH-205, VH-199, VH-200, VH-201, VH-202, VH-211, VH-206, VH-207, VH-208, VH-212, VH-213, VH-214, VH-215, VH-216, VH-227, VH-217, VH-209, VH-218, VH-219, VH-210, VH-225, VH-220, VH-221, VH-222, VH-223, VH-224, VH-203, VH-195, VH-204, VH-226

**Deferred:** VH-225, VH-220

## 2026-10-30 — VH-216 — The switch sits below step 1, not at the top, on the owner's choice

**Decision:** The Staff/Student switch sits below step 1, above steps 2–6; only its place changes.

**Rationale:** His choice "Promises + switch (Recommended)" and his spec wording; see the close entry below. VH-131's other decisions stand: it opens on Staff video, is remembered, and a submission may have no closing.

**Supersedes:** 2026-10-19 — VH-131 — The switch opens on Staff video and is remembered; a submission may have no closing

**Deferred:** none

## 2026-10-30 — VH-216 — Closes: the owner's remedy raises the first action; four of V-18's six cases inside, two reported short

**Decision:** VH-216 moves the five promises and the Staff/Student switch below step 1, the owner's choice: one order at every width, with no CSS `order`, script, word or element added. Four of V-18's six cases are inside the first screen; at 320 × 568 zh-Hans is 159 px short and ms-MY 260 px short, reported to him, wish VH-175.4 kept. The walker stays at one revision on his word, so two S-03 rows fail as he was told; the edit stays his at VH-203.

**Rationale:** His words (source: the orchestrators' notes, `plan8-owner-words.md`). His scope, in the "Backlog review" chat, 2026-10-27 14:51:20Z: "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility". The remedy, ~16:18Z, typed by him: "help me resolve VH-212, VH-213, and VH-216"; on VH-216 he chose, as the tool returned it, "Promises + switch (Recommended)": the order shown was header, title, privacy line, "1. Choose a video", the switch, then the promises, with steps 2–6 between them once a video is read; not taken, "Also the translation notice" and "Promises only". The budget, ~16:43Z: "Yes: raise docs/01-specification.md's budget from 8,100 to 8,200 words, for the approved rows in VH-206, VH-213 and VH-216. Record it as a decision." The spec's wording, ~18:06Z, his choice ""below step 1" (Recommended)": §2's and §9.1's two sentences, made as three substitutions; the spec is 8,125 words. ~23:07Z on 2026-10-28: "please spawn chats as needed as I'm going to bed - you have permission to proceed as reccomended". The walker's four checks, 2026-10-30 ~10:08Z: "Yes, leave them"; he was shown that the move fails S-03's Tab row, one `.lede` selector, S-142 and J1, and he has not approved the edit itself. The two stray node loops, ~11:05Z: "Leave them". **The six cases, painted top–bottom against the fold, before → after:** en-GB 1280 × 900 630–674 → 336–380; zh-Hans 780–824 → 507–551; ms-MY 870–914 → 528–572; en-GB 320 × 568 930–974 → 496–540; zh-Hans 1025–1069 → 683–727, short by 159 px; ms-MY 1267–1311 → 784–828, short by 260 px. No word shortened, no spacing tightened and the notice not moved; his to rule. **Measured:** 120 cells a side (S-03, S-144), the same 116 reached; only S-03's two rows move, pass to fail, in 58 cells; S-144 unmoved; the Tab order read apart, 60 cells a side, in the new order forward and reverse, the "?" as VH-184 left it. WCAG 1.3.1, 1.3.2, 1.4.4, 1.4.10, 2.4.3, 2.4.6, as the table's §8 has them. **Load:** Orchestrator #32's ruling, no re-run, these being layout, DOM and focus order; Claude and Codex each judged it right. **`ul.promises` after `#errors-panel`,** his words naming no errors panel: errors stay beside the work they report; Claude and Codex's blind check agree. **Repairs:** Claude's verdict and Codex's blind check and re-check found comments the move had made false and two test points: comments and titles only, no re-walk; the table's §12. VH-196's decision is superseded in where the promises sit only; the entry above does the same for VH-131's switch. The raise's `Deferred: VH-213, VH-216` is paid off for this item. Not walked: the states with a video read, the onset tip's exclusion, speech (table §10). Evidence: `reviews/2026-10-25/design-pass-3/evidence/measurements/vh216-first-action-2026-10-30.md`, with Codex astra's files beside it.

**Supersedes:** 2026-10-25 — VH-196 — The lede's five promises in the owner's words, and a "?" beside "Saves in a reliable format." that explains MP4

**Deferred:** VH-203

## 2026-10-30 — VH-215 — Closes: the submission card states the length the new video has, not the length its index declares

**Decision:** VH-215 closes wish VH-139.5: the submission card's running time is the length made, without the card or the closing. The picture's end is the index's one read wherever the last declared packet arrived, and one streamed read of the kept picture packets where it did not; for Student submission, a release guard refuses a card that would differ from the encode's own span. No element, control, string, walker check beyond the criteria, or spec change. Its walks were made on base 7750acb, before VH-227: the re-walk Codex asked for was skipped on the owner's decision ("Just the end"), and VH-203's after-run re-measures those 96 cells on the final page (VH-215.4).

**Rationale:** The owner's scope, verbatim, in the "Backlog review" chat, 2026-10-27 14:51:20Z: "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility"; group A holds VH-139.5 (the PLAN-8 entry of that date; source: the orchestrators' notes, `plan8-owner-words.md`); no VH-215 answer of his was owed. The route, traced and timed first: the sound's end from pre-flight's pass; the picture's from the index, which gave the decode's picture end on all five files probed, 2 ms and one read on the 4.55 GB whole file; where the index's last declared packet's bytes are missing (a cut file), one sequential streamed read of the kept picture packets, 1,440 ms on the 2.81 GB cut at low load. It branches on `lastPacketArrived` alone, never on the container. The held point, the picture's read (Claude's design reading took the index, Codex astra's blind design check the streamed read on every file), was settled by Codex's re-check, "Verdict: accept": the streamed read on every file would read every kept picture byte, 2,880 ms on the largest, where spec §7.1 says the re-check's cost "grows with the kept audio". The build: `pictureMadeEndSeconds`, `madeSpanSeconds` and `cardTellsMade` (`src/media/ends-early.ts`); the worker refuses, for Student submission, a job whose length made cannot be known before the card is drawn, and after the encode a card that differs from its span, nothing kept and the workspace disposed, in `failure.unknown`'s existing words; the page's `#submission-card-filled` line gives the length made where known, its words unchanged; `formatClockTime` moved to `src/ui/clock-time.ts`. The WebM finding: neither walk fixture shows the defect, since a Matroska-family file reads to its last whole cluster (S-23's cut 0:20 and the cut WebM 0:05, drawn and made, before and after, in all 96 cells each side, walker revision `17727d3522f7270d`, the four approved Student submission scenarios); it shows where an index declares more than arrived, as the cut MP4 does: 0:30 drawn on a 0:21 video at the base, 0:21 after (trimmed, 0:20 to 0:16), both outputs, a closing on and off, proved by the Node tests and the Chrome browser proof, base and candidate. The cut WebM's declared length is the page's inspected 5.121 s, not its Duration element's 10.008 s. §7.1's estimate and line 128's meaning are unchanged, so no spec wish; UI-STANDARDS has no rule change. WCAG 1.3.1, 2.4.6, 3.1.5 and 4.1.3 re-checked; the job's times beside the before's, the high-load readings re-run at low load; on AC, power mode 2. Claude's verdict, "Commit, after the close's own record", was saved before Codex astra's blind answer, "Verdict: Commit", "Musts: None", was opened; its one should, that the guard's Node test is a predicate regression (`cardTellsMade`), not the worker's refusal, non-retention or disposal, was adopted: the table repaired at §3 and §7 to say so, and wish VH-215.3; the re-check said "Verdict: Commit". The blind table copy is kept beside the evidence as what the blind check read: it differs from the table at line 147, its design history withheld to keep the check blind, and at the repair's two lines. Wish lines: VH-215.1, the guard's refusal words, for the owner; VH-215.2, S-22 read as Student submission in VH-203's after-run; VH-215.3, a regression through the worker's refusal at `job.worker.ts:278`; VH-215.4, VH-203's after-run walking `PLANS.vh215`. Digest rules: house-conventions, "Fail loudly on data loss" and "Streaming everywhere"; nielsen 1, "status visible and announced". Evidence: `vh215-card-length-2026-10-29.md` and its records. The re-walk: Codex astra's close check, must 1, asked for the 96 after cells to be renewed on the rebased tree. The owner's decision, verbatim, his own turn in the "Backlog review" chat, 2026-10-30 ~08:47Z (source: `plan8-owner-words.md`): "Just the end". The question: "Should VH-215 skip the 96 re-walk and rely on VH-203's full run at the end?" The option, in that chat's report: "Skip VH-215's 96-cell re-walk. Record that its walks predate VH-227 and that VH-203's full run on the final page re-measures those cells. Tell the orchestrator this is my decision." His reason and the cost, as he was shown them: the re-walk a one-off from VH-227 landing under VH-215 after its walks; about 17 minutes of walking and about an hour in all, by that chat's guess; the only change the name 简体中文 to 中文; the cost, that VH-215's record rests on walks made before VH-227, and that Codex wanted the re-walk so the record matches the code committed. He was told the full run re-measures those cells; `PLANS.matrix`, VH-203's after-run, leaves them out (`fixOnly`: 1,886 records, 0 of the 96), and VH-215.4 is what makes it so.

**Supersedes:** none

**Deferred:** VH-203

## 2026-10-29 — VH-227 — Raised and closes: the one Chinese named 中文, not 简体中文, on the owner's word

**Decision:** VH-227 names the page's one Chinese 中文 wherever a language's name shows, in place of 简体中文, because one Chinese is offered and naming its script suggested a Traditional one beside it; the tag `zh-Hans`, which tells the browser, the fonts and the screen reader the script, is unchanged. One constant changes: no element, table word, state or walker diff.

**Rationale:** Someone told the owner on 2026-10-29 that Chinese has two scripts, 简体 for the mainland and 繁體 for Hong Kong and Taiwan, that naming one may suggest the other is available, and that translation apps usually say 中文. Asked whether to change the name shown and keep the tag, the owner typed in this session's chat: "Yes, change to 中文". The page's Chinese readers are at Ningbo and the Malaysia campus, who read Simplified. Spec §9's "Simplified Chinese" and "each named in its own language" stand, so no `docs/` edit. `LANGUAGE_NAMES['zh-Hans']` in `src/config/languages.ts` feeds the switcher, the Video language choice, the summary and record line, the switch's announcement and the translation email's subject. The tests that assert it follow, the subject's percent-encoded bytes among them, as do the translator's note in `src/i18n/sheet.ts`, its two rows in the filled sheet and a comment in `tokens.brand.css`; no test deleted or skipped. Chrome, the dev server from this item's worktree: the Chinese segment 62 × 44 px with `lang="zh-Hans"` and the CJK face on the English, Chinese and Malay pages, at 1280 and 320 px, light and dark; no sideways scroll at 320 px; no console error; the Chinese page announces "页面语言：中文。" and its email subject ends ": 中文". Forced colours were not emulated. VH-227 is not one of pass 3's fix items, so VH-203's stage rule does not bind it: not walked with the pass's walker and not checked by Codex astra; VH-203's after-run reads it, as it re-reads every item that lands out of order. Built in its own worktree, `side/vh227` from `7750acb`, apart from the main checkout's uncommitted work, which this session did not make (rule 3). Digest rules: nielsen 2; wcag-2.2-aaa 2.5.5, and 3.1.2 held. Item: [VH-227](items/VH-227.md).

**Supersedes:** none

**Deferred:** VH-203

## 2026-10-28 — VH-212 — Closes: heavy limiting's advice in the owner's words, true whether or not the new video plays here

**Decision:** VH-212 closes F15b: heavy limiting's detail says "so play the new video before you use it", the owner's words, in place of "so play the new video before you save it", which a person whose player cannot play the new video (S-152) cannot do; the Chinese and Malay are machine translations, marked so. Only that clause changes: no element, state, listener or walker diff. VH-215 is next.

**Rationale:** The owner, in the "Backlog review" chat, 2026-10-27 ~16:18Z, typed by him: "help me resolve VH-212, VH-213, and VH-216"; for VH-212 (VH-211's ask, point 2) he chose, as the tool returned it, ""before you use it" (Recommended)": en-GB "so play the new video before you save it" → "so play the new video before you use it"; zh-Hans "所以请在保存之前播放新视频" → "所以请在使用之前播放新视频"; ms-MY "sebelum anda menyimpannya" → "sebelum anda menggunakannya"; not taken, "before you publish or submit it". At ~18:06Z, in the same chat, Backlog review recorded that he was never shown the ask's longer recommendation ("so play the new video here and listen. If it will not play here, save it and play the saved file before you share it."): his words are Backlog review's option, and they stand. Source: the orchestrators' notes, `plan8-owner-words.md`. Orchestrator #22's ruling at VH-212 #1's check-in: the walker's self-test words, `prove-8.mjs:54`'s `WARN_WORDS`, stay unchanged, since its proof is word-independent and a change is a walker change beyond the criteria (wish VH-212.1); the stale comments in `announce.ts` and `warnings.ts` change to his words. The walker's predicates read the served tables, so none needed a diff, and one instrument revision (`198cfe660331f1bf`) read the before on `b4ec37a` and the after: 192 cells each, 0 findings, 0 notes; S-138's player row moved in 12 cells both ways, the walker's timing, wish VH-199.1's. Claude's verdict, "Commit, after the close's own record", was saved before Codex astra's blind answer, "Commit after the musts below", was opened; its must, 3.1.5's reading level a person's to confirm (spec §9.3; zh-Hans and ms-MY not shown, wish VH-105.2), and its should, the before's load median, were repaired in the table, and the re-check said "Commit". Digest rules: nielsen 9; wcag-2.2-aaa 3.1.5 and 4.1.3. Evidence: `vh212-playback-advice-2026-10-28.md`.

**Supersedes:** none

**Deferred:** VH-203

## 2026-10-28 — VH-214 — Closes: the walk hung, not the page; S-140 and S-140n bounded, no product diff

**Decision:** VH-214 closes VH-193.3 with no product diff: the page refuses "UoN Closing Logo Fade Blue 2025.mov" and N13 before Create, by the pre-flight's `noSourceDecodeHere`, in every cell, so VH-193's ten minutes were its walk's Create test clicking the withdrawn step 6's hidden Create; S-140 and S-140n gain a bound and three accepted outcomes, proved before the after, the approved walker change.

**Rationale:** Before, on `5893d9d`: 12 of 12 groups (three languages, 1280 and 320 px, four modes each) show step 1's block 41–135 ms after the choosing, Create never shown, on Chrome 156.0.8078.48 and .74; the original read only from `samples/`. Replaying `heavy-193.mjs`'s bite routine reproduced the stall: its test `b && !b.hidden && !b.disabled` (`:147`) read the withdrawn step's button as offered, clicked it, and waited for a plan that never comes until the 720 s bound, the page still blocked, the worker logging `Unsupported video codec (sample entry type 'rle ')`. `QT_BOUND` (a verdict within 330 s, the selection's 120 s and 180 s deadlines with 30 s over; a job's end within 900 s; the boot 60 s, the walk's; each snapshot 10 s) and `QT_OUTCOME` judge each scenario: an accepted outcome passes, none by the deadline is the page's hang, a wait at its deadline beside an accepted outcome is the walk's. Each deadline is absolute: a result at or after it is its expiry, and the state at it is judged only from the page's own dated log of the outcome. An answer the page dated in time but the walk took late is late delivery, cannot-determine, the walk's, never the page's; a log that overflowed or changed across the deadline is cannot-determine too. The proof passed 41 of 41 (26 real, 15 job) before the after, which judged 12 of 12 "refused before Create", on AC in the before's power mode. 4.1.3: `#source-status` speaks the block and its next step; 2.4.3 and 3.3.1 hold; no token, control or document change. The same test elsewhere is outside the approval: wish VH-214.1; at the refusal `#page-announcer` also says "You can still set the times" with trimming withdrawn: wish VH-214.2. Codex astra: its blind check and three follow-ups said "Do not close", each point repaired inside the approval; its fourth follow-up said "Close", ruling the deadline timer's one-turn deferral inside the approval and no low-load re-run owed; its close check ran before the commit, its verdict the commit's `Checked:` line. Evidence: `reviews/2026-10-25/design-pass-3/evidence/measurements/vh214-quicktime-2026-10-27.md`.

**Supersedes:** none

**Deferred:** VH-203

## 2026-10-28 — PLAN-8 — VH-213 and VH-214 run beside the main line with walks queued; Codex's blind check alongside Claude's verdict

**Decision:** VH-213 and VH-214 run in their own worktrees beside the main line, one walk or gate at a time by the walk lock; each lands on the orchestrator's go, rebased, gated and re-checked. VH-213 lands before VH-212 or VH-215 starts. Codex's blind check starts alongside Claude's verdict, kept blind.

**Rationale:** The owner, 2026-10-27 ~20:12Z, verbatim: "Yes, pass both to Orchestrator #16: run VH-214 and VH-213 in their own worktrees beside the main line with the walks queued, and start Codex's blind check alongside Claude's verdict, keeping it blind." On power, 2026-10-27 ~22:57Z, verbatim: "Yes, send it to Orchestrator #17 with the conditions: walks run on battery while it is above 50%, stop at a clean point at 50%, a before and its after in the same power mode, and I'll take the battery off Low Power myself." Source of both: the orchestrators' notes, `plan8-owner-words.md`. He was shown the shared files that keep the line serial, the trade-off (a side item measured against the build it branched from, the combination in VH-203's after-run) and about 3–5 h saved from each change. VH-211's PLAN-8 entry is superseded for the build order only: VH-213 and VH-214 no longer wait their turn in it. VH-213 shares `src/i18n/sheet.ts` with VH-212 and `src/workers/job.worker.ts` with VH-215, and VH-203's after-run measures the combination. The blind check never sees Claude's verdict, which is saved before its answer is read. Walks and gates run on AC, or on battery above 50% and not in Low Power, stopping cleanly at 50%, with an item's before and after in the same power mode. The close check before commit is unchanged, so VH-203's stage rule ("Codex astra's check before commit … of the final candidate diff") holds. VH-213 landed first, on 39a56bc; the second side item to land doesn't repeat this.

**Supersedes:** 2026-10-27 — PLAN-8 — The owner's old issues planned: VH-212 to VH-224 for the format "?", A and B, before VH-203; VH-211 closes

**Deferred:** VH-214

## 2026-10-28 — VH-213 — Closes: a whole video with less than 400 ms of sound told so before Create, as a kept part is, on the owner's choice

**Decision:** VH-213 closes wish VH-185.1. An untrimmed source with under one block (`BLOCK_SECONDS`) of decoded sound is a silent job warned before Create, as VH-185 made a kept part, by a third typed reason, `whole-too-little`, in the owner's words; decoded sound decides, and `cut-short` and `ends-early` keep their precedence. Spec §5.4's row covers a whole video. A partly decoded file that ends early is the owner's exception, wish VH-213.1. VH-185's decision is superseded for its untrimmed scope only.

**Rationale:** The owner, in the "Backlog review" chat, 2026-10-27 ~16:18Z, typed by him: "help me resolve VH-212, VH-213, and VH-216"; for VH-213 he chose "Same rule as a trim (Recommended)", not "Refuse before Create", with the item's drafts verbatim. Codex astra's blind check said "Revise": its must 2, the none-decoded control, was measured, and its should 3, the load account, corrected. Its must 1, a partly decoded file that ends early told only that the video is silent after its decoded sound stops, went to the owner. On 2026-10-28 ~09:57Z, in his own turn to Orchestrator #19, he answered verbatim "Yes, all three" to "Go ahead on all three as recommended?", whose first point was "VH-213's must 1, option (a): a wish line for both paths, and VH-213 closes without the repair." A repair would change VH-185's and VH-206's settled precedence for both paths. The re-check said "Commit". The base's test "leaves an untrimmed file as it was" was replaced by whole-file cases, not deleted or skipped. Evidence: `vh213-whole-sub-block-2026-10-27.md`.

**Supersedes:** 2026-10-24 — VH-185 — A kept sound shorter than the meter's 400 ms block is no sound: a silent job, said before Create

**Deferred:** VH-203

## 2026-10-28 — PLAN-8 — VH-225 raised: the app renamed UoN Video Finisher, before VH-203, on the owner's word

**Decision:** VH-225 renames the app UoN Video Finisher, with its repository and Pages address, last before VH-203 so every earlier walk keeps one name and the release contains it; the project folder is VH-226, after VH-204.

**Rationale:** The owner's words, verbatim, typos kept, in the "Backlog review" chat on 2026-10-28 at about 11:50Z, typed by him, relayed to Orchestrator #20 (`plan8-owner-words.md`): "I have an time / change - it is to be called UoN Video Finisher (rather than UoN Video Helper). please add to the backlog and let the orchestrator chat know - the next release must contain the rename". Placed last before VH-203, so every earlier item's walks keep one name and VH-203's after-run measures the renamed page; before VH-204, so the release contains it. The hidden identifiers (the localStorage keys, the OPFS folder, the job name, the package name) are kept unless a migration is proved with no loss, since renaming them otherwise is data loss. The repository question, answered by him in "Backlog review", relayed to Orchestrator #21 and checked by Orchestrator #22 as his own turns: at about 15:00Z, to "Should the GitHub repository and preview web address change to the new name too?", verbatim: "Rename those too"; so the repository and the Pages address are renamed, with vite's base, the branding path, the profile's remote URL and every link to the old address, the repository's own rename a GitHub setting, his click or a session's with his go-ahead at that step, never done unasked. At about 15:18Z, to "Should the project folder on your Mac be renamed too?", whose shown option read "rename the project folder too, but only at a quiet point when no sessions or walks are running, after the release", verbatim: "Yes, at a quiet point". Orchestrator #22's ruling: the folder is not in VH-225's scope, since VH-225 lands before VH-203 and the folder goes after VH-204's release, when nothing runs; it is VH-226, its own line after VH-204, marked `[!]` because its open question is his: whether /Users/joe/UoN-Video-Helper-side follows, asked at its time. VH-225's six criteria and VH-226's one are drafts, which each item's own worker refines before its build, with Codex astra's blind check. Written by a ledger-only commit from the checkout's single writer after VH-208's push, under rule 3. Neither backlog line has a `from` field: the grammar takes only an ID there (`tools/ledger.mjs`, :288), so the owner's source is in the item files and here, as VH-204's line, raised on his word, carries none.

**Supersedes:** none

**Items:** VH-182, VH-183, VH-184, VH-185, VH-186, VH-187, VH-188, VH-189, VH-190, VH-191, VH-192, VH-193, VH-194, VH-196, VH-197, VH-198, VH-205, VH-199, VH-200, VH-201, VH-202, VH-211, VH-206, VH-207, VH-208, VH-212, VH-213, VH-214, VH-215, VH-216, VH-217, VH-209, VH-218, VH-219, VH-210, VH-220, VH-221, VH-222, VH-223, VH-224, VH-225, VH-203, VH-195, VH-204, VH-226

**Deferred:** VH-225, VH-226

## 2026-10-28 — VH-208 — Closes: the finished video's warnings before its player and Save, and heavy limiting's listening sentence in the completion line

**Decision:** VH-208 closes V-52. The output's warnings are the finished card's own content, after its title and lines and before the player, the lifetime line and Save, with no rail of their own, so no notification nests in another, in every paint: a "Previous video", after "Keep it", after a save and after a language change. The completion's live-region write carries heavy limiting's existing detail whole after the titles, Announce progress on or off; other warnings keep their titles alone. No element, no words; VH-193's and VH-192's decisions stand. VH-212 is next.

**Rationale:** Inside the card only, `renderWarnings` draws them content-only: the same region, named by its title, and the same list, as `section.result-warnings` with no `data-kind`, set apart by one token margin (`--spacing-05`). `warningsSpoken` adds `warningText(heavy).detail`, chosen by its code, after the line, so no string is new or split; the write is exposure, and what a screen reader says stays the person checklist's task A. VH-150's pin in `test/screen-text.test.ts` is rewritten to the new order and still forbids one notification nested in another; `announce.test.ts` matches. This supersedes VH-150's entry in the warnings' placement and treatment alone, their own notification after the card; its rule against one notification nested in another stands. The walker's approved changes were proved first at one revision, `a3a4267ad47d8bd5`: `warnBox` qualified in both layouts, the completion check rejecting heading-only speech for heavy limiting, and its `prove-8.mjs` fixture, 85 of 85; and, on the owner's ruling, "Yes, all three" (2026-10-28), S-136's and S-91's asserts changed from "beside the card, not inside it" to "no notification nested in the card", keeping the order check, 14 of 14. Measured before, on `a87e0f5` with the candidate walker overlaid (a `git archive` export, content-checked), and after: 198 cells, the three languages at 1280 and 320 px in four colour modes, on AC at power mode 2 (before-1, on battery, kept as a record), every after cell read below load 8; the player's keys and rings probed before and after. Besides the order, place, heights and completion text, one outcome changed: in 32 cells, where the card now outgrows the viewport, the focus instrument reads the card's own ring cannot-determine, "the clip is cut by the viewport", a limitation, not a pass (wish VH-208.1). S-138's player row is timing-dependent, a 1 s sample racing the walker's own next step: on Orchestrator #21's ruling it stands in the table as such, and its defect is the existing wish VH-199.1 ("the finish+1s player row … sampled before the scenario's next step plays or detaches the player"). S-152's state, F15b's, is recorded; its words are VH-212's. For VH-203's after-run: `heavy-193.mjs:78`'s selector, which the content-only warnings do not match (VH-208.2), and S-91's changed assert, proved on fixtures only (VH-208.3). Claude's verdict was saved before Codex astra's blind answer was opened, "Commit after the musts below"; the compare held nothing for the owner; Codex's re-check of the table's repairs, "Commit after the musts below", resolved musts 1 to 4 and both shoulds, leaving must 5, this close, which Codex astra checked before the commit. UI-STANDARDS unchanged: no rule changed. Evidence: `reviews/2026-10-25/design-pass-3/evidence/measurements/vh208-warnings-2026-10-28.md` and `vh208-records-2026-10-28/`. Digest rules applied: nielsen 1, "status visible and announced", 5 and 6; carbon, "one primary per state"; wcag-2.2-aaa, 4.1.3.

**Supersedes:** 2026-10-22 — VH-150 — The job's state: Show progress withdrawn, a fresh bar, the stop withdrawn, one primary, and pins

**Deferred:** VH-203, VH-212

## 2026-10-27 — VH-207 — Closes: focus handed on when the choosing or an unreadable file takes the focused control away, to the file input or the same control shown again

**Decision:** VH-207 closes V-46. One capture at the top of the file input's change handler hands focus on what the choosing withdraws, "Use the whole video" included, to the file input, and focus in the result to the same control shown again: Save, the player, the card, and the "discard it?" question to the card, as "Keep it" does. One capture in `clearTrim('unreadable')`, where both read failures meet, hands focus in the withdrawn steps to the file input, or to Stop saving. No element, no words, no other caller. The readings stand as walked, on the owner's answer to Codex astra's two held musts. VH-208 is next.

**Rationale:** The two read failures, the worker's failed reply and the exception, both call `clearTrim('unreadable')` and are its only callers with that notice, so the capture sits once, at its top, before `applyControlLock()` disables any control; its `shown` is the one `revealLaterSteps` receives. At the choosing, the capture precedes everything the handler withdraws (the check's Stop and Check again, the read, the verdict, Create's row, and the trim's controls the reading lock disables), since several go before `clearTrim('reading')`. The re-render moves the same `<video>` into a new card, so focus on it drops to the body and is put back on it. Claude's design reading was saved first, then Codex astra's, blind: they agreed on Save, the player, the card and a cleared saved card (the file input); Codex's two other points were taken on the evidence, the question to the card (the successor "Keep it" already names for the same outcome) and the earlier withdrawals built (the item's Intent: "Choosing the file is itself part of the transition"; spec §9.3). Measured before (a `git archive` export of `5893d9d`, the candidate walker overlaid, its source identity content-checked in `before-source-check.json`) and after, 168 cells and the eight routes, with the pass's keyboard instrument: (a) to (d) from the body to the file input ×24 each, (e) from the body to the re-rendered Save ×24, (f1) and (f2) unchanged, rings passing in all four colour modes, the routes as before. The capture is in `main.ts`, which `focus-hand-on.test.ts` cannot reach: the variants are its proof, (c) walking the exception path through F20; what no variant walks is proved by reading. Codex's blind check, "Commit after the musts below", found "Use the whole video" (`#trim-clear`) missing from the choosing's capture: it was added, and a probe from the walker's own modules reads focus on the body ×8 before and on `#file-input` ×8 after (`probe-trimclear-*.json`). Its re-check, "Commit after the musts below", resolved that and the before's source identity, and held two musts that Claude read as met and the evidence could not settle: "by keys", since the variants place focus with the pass's `focusByKeyboard` (a Shift press, then `.focus()`), not by Tab traversal; and the next Tab, read after the ring instrument, which puts focus back on the same element. The owner, 2026-10-27 about 22:57Z, verbatim: "A: accept VH-207's readings as they stand (focus placed by the pass's focusByKeyboard; the next Tab read after the ring instrument, which restores focus) and close it." Nothing was re-walked. Digest rules applied: wcag-2.2-aaa 2.4.3 and "focus appearance"; nielsen 3, user control and freedom.

**Supersedes:** none

**Deferred:** VH-203, VH-208

## 2026-10-27 — VH-206 — Closes: a kept part with too little audio told so in the owner's words, by a typed reason on the existing no-audio warning

**Decision:** VH-206 closes V-51. The `no-audio` warning carries a typed reason, `no-track` or `kept-too-little`, from `analyseSourceAudio`'s own silent result to `warningText`, not a second code, because spec §5.4 has one "No audio track" row and one outcome, and only the cause, and so the way forward, differs. The kept-part case says the owner's words; no track keeps "This video has no audio". VH-207 is next.

**Rationale:** `job.worker.ts` passes `measured`, not the reduced `analysis`, to `detectSourceWarnings`, which takes `AudioAnalysis | KeptSilence | null`: `null` is `no-track`, a `KeptSilence` `kept-too-little`, none decoded included, since the file has a track and keeping more is the recovery. A declared sound that never arrives stays `ends-early`; `cut-short` stays first; `detail` holds no reason; untrimmed files are unchanged, and `BLOCK_SECONDS` and `loudness.ts` are untouched. The words are the item's, verbatim, Chinese and Malay machine-translated as the ask marked them, with translator notes and the strings sheet's rows. Tests: 17 by VH-206 #1 and 3 for Codex's must 1, one per language composing detection and wording for every cause. The walker's S-99 state and wait read the kept-part heading; S-101's and S-153's negative reads reject either note; S-20 is unchanged; each was proved in three languages before the after (45 of 45 reads). 192 pre-flight and 36 job cells were measured on `446f702` and on the candidate, in three languages, two widths and four modes, on AC. The after's high-load groups were re-run at low load and came out identical. S-99, S-100 and the sliver N14 say the new words in all 72 reads. S-20 is unchanged, and S-101, S-153 and both exact blocks say nothing. S-100 and the sliver have one video track and no audio track, and the levelled cells' LUFS are unchanged. WCAG 3.3.1, 3.3.3, 3.1.5 (grade 3.7 and 3.8), 4.1.3, 2.4.6, 1.4.8, 1.4.10 and 1.4.12 are met for the change (`vh206-no-audio-2026-10-27.md`). Spec §5.4's row adds 21 words, so the spec is 8,121 under the new 8,200 budget. Codex astra, blind: "Commit after the musts below"; all four were done, and its compare is beside the table. Wish VH-202.1 retires, paid; VH-201.2 stays open, as only its sliver part is paid here; VH-206.1 records three probes still reading the old heading. Digest rules applied: nielsen 1, 2 and 9; house-conventions "Fail loudly on data loss"; wcag-2.2-aaa 3.1.5 and 4.1.3.

**Supersedes:** none

**Deferred:** VH-203, VH-207

## 2026-10-27 — VH-206 — The spec's budget raised from 8,100 to 8,200 words for three approved rows, on the owner's word

**Decision:** `project/rules.md`'s By task budget for `docs/01-specification.md` rises from 8,100 to 8,200 words, for the approved rows in VH-206, VH-213 and VH-216 only. VH-206's §5.4 row takes 21 (the spec 8,121), leaving 79 for VH-213's widening of that row and VH-216's §9.1 line; every other `docs/` edit still needs the owner's word.

**Rationale:** The owner, in his own turn in Orchestrator #15's chat, about 16:43Z on 2026-10-27, verbatim: "Yes: raise docs/01-specification.md's budget from 8,100 to 8,200 words, for the approved rows in VH-206, VH-213 and VH-216. Record it as a decision." He was answering #15's question "Raise the spec's word budget from 8,100 to 8,200 for Phase 8's approved spec rows?", and had been shown that the spec was exactly 8,100 words at `446f702` by `tools/ledger.mjs`'s count (whitespace words after comments and fences), so §5.4's approved row, which adds words (33 as first drafted, about 4 at the shortest), could not fit within VH-202's "within 8,100 words"; that VH-213 widens the same row and VH-216 changes §9.1; and that the other route was trims elsewhere in `docs/`, each his to approve. VH-206's first worker had stopped there, as its brief required. Recorded in VH-206's commit because VH-206 needs it first. The raise changes only that budget cell; `project/profile.md` and the rest of `project/rules.md` are unchanged, and the approval of each row stays as its own item records it. Of the VH-202 close decision, this supersedes point 8's "within the spec's 8,100 words" limit only; the rest of it stands.

**Supersedes:** 2026-10-27 — VH-202 — Closes: the owner's answer "as reccomended" on all nine points; the owner's addition and scope open VH-211, the format "?" and old issues A and B to plan

**Deferred:** VH-213, VH-216

## 2026-10-27 — PLAN-8 — The owner's old issues planned: VH-212 to VH-224 for the format "?", A and B, before VH-203; VH-211 closes

**Decision:** VH-211 closes, and Phase 8 gains thirteen items before VH-203, built after VH-208 in this order: VH-212 (F15b), VH-213 (VH-185.1), VH-214 (VH-193.3), VH-215 (VH-139.5), VH-216 (V-18), VH-217 (the format "?"), VH-209, VH-218 (VH-186.1), VH-219 (VH-189.1), VH-210, then B's checks, VH-220 to VH-224. Each keeps VH-203's stage rule and none adds a control; VH-212, VH-213, VH-216 and VH-203's sizing wait on the owner's ask.

**Rationale:** The owner's scope, verbatim, in the "Backlog review" chat on 2026-10-27 at 14:51:20Z: "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility", answering his addition at VH-202's close, "I accept everything, but even old issues should be solved for. we also need to make sure that question mark about file formats looks good". Not taken, their lines standing: C (native readers, screen-reader and listening checks), D (the statement: VH-137, VH-194.1, VH-162.1, VH-116.1) and E (tooling). Planned with `verbs/plan.md` beside Codex astra: Claude's plan saved first, Codex's blind items, the compare, and Codex's critique ("Revise before recording the plan; retain its overall scope, grouping and build order"), applied but for two refusals, all in `reviews/2026-10-25/design-pass-3/` as `vh211-*`. Settled on the record: the "?" at about 8 px with its 44 px target untouched and the overlap measured, as VH-211's criteria put it to the owner; F15b's words true whether the video plays or not, with no listener; one page order at every width recommended for V-18, since a width-dependent DOM order needs CSS `order` (2.4.3, 1.3.2) or script; VH-186.1 and VH-189.1 apart, and B as five check items, the 214 cells in two disjoint batches (108 and 106), to fit one worker each. Held for the owner: VH-213's route, the same rule as a trimmed keep or a refusal before Create (the earlier approval covered a trimmed keep only). Refused from the critique: a row-by-row scenario map in the plan, which is each check item's first step. Held for the owner after Codex's close check: VH-203's after-run outgrows one worker; Claude recommends running it across sessions under its ID, as VH-199 ran, Codex splitting it into bounded items (the ask, point 4). Order: behaviour and words first; V-18's DOM move before the CSS; the "?" before VH-209, qualifying the combined 32 px cells the later items reuse; the narrow-layout CSS, the rings, then the checks on the final build. Nine wish lines promoted whole and three narrowed (VH-153.1, VH-172.1, VH-175.4), each traced in the commit body. The backlog's Phase 8 lines are shortened to fit 1,000 words; each title stands whole in its item file. The ask is `vh211-owner-ask-2026-10-27.md` beside the plan, Codex's close check `vh211-codex-close-2026-10-27.md`. It supersedes VH-202's close on two rulings: point 5, F15b not a finding, now VH-212; and the old issues it routed to a plan, now these items.

**Supersedes:** 2026-10-27 — VH-202 — Closes: the owner's answer "as reccomended" on all nine points; the owner's addition and scope open VH-211, the format "?" and old issues A and B to plan

**Items:** VH-182, VH-183, VH-184, VH-185, VH-186, VH-187, VH-188, VH-189, VH-190, VH-191, VH-192, VH-193, VH-194, VH-196, VH-197, VH-198, VH-205, VH-199, VH-200, VH-201, VH-202, VH-211, VH-206, VH-207, VH-208, VH-212, VH-213, VH-214, VH-215, VH-216, VH-217, VH-209, VH-218, VH-219, VH-210, VH-220, VH-221, VH-222, VH-223, VH-224, VH-203, VH-195, VH-204

**Deferred:** VH-212, VH-213, VH-214, VH-215, VH-216, VH-217, VH-218, VH-219, VH-220, VH-221, VH-222, VH-223, VH-224, VH-203

## 2026-10-27 — VH-202 — Closes: the owner's answer "as reccomended" on all nine points; the owner's addition and scope open VH-211, the format "?" and old issues A and B to plan

**Decision:** VH-202 closes. The owner answered its ask as recommended, so VH-206 to VH-210 go ahead in the plan's order: VH-206 with the approved words and spec §5.4's row (point 8), VH-209 taken at rank 3. The owner's addition and scope ask that old issues be solved, not accepted: V-18's acceptance (point 6) is amended, and VH-211 plans the format "?"'s two changes and groups A and B into fix items before VH-203. VH-203's after-run captures the "?" for the owner, and its integrated check takes "ensure everything passes UX / design / Accessibility" as its bar.

**Rationale:**

- **The answer.** On 2026-10-27, in the "Backlog review" chat (`local_59428ffc-7efd-4ae6-b7ef-bd83074f4596`), the owner answered VH-202's ask, verbatim: "as reccomended, and convery me the 9 point ask here". That chat had asked: "Send "as recommended" for all nine points to Orchestrator #13?", showing the build order, point 2's en-GB words with Codex's alternative marked not recommended, and the other recommendations in short. As the owner asked, it then showed the nine points in full, at about 14:40Z. Orchestrator #13 read that chat's transcript: the words and what was shown match, and the nine points match the ask committed in `f0b4dae`.
- **Each point, as recommended:** (1) the plan approved; (2) Claude's V-51 words, in three languages, as the ask's table gives them; (3) the 400 ms rule kept; (4) V-50 taken at rank 3, as VH-209; (5) F15b not a finding, with VH-208 recording its state; (6) V-18's Phase 7 acceptance stands, and VH-203 measures the button and reports to the owner; (7) the statement's limitation left to VH-137, with no new item; (8) the spec correction, wish VH-202.1, approved within the spec's 8,100-word budget; (9) no controls.
- **The owner's addition,** the same day, in the same chat, verbatim: "I accept everything, but even old issues should be solved for. we also need to make sure that question mark about file formats looks good".
  - "I accept everything" confirms the nine points.
  - "even old issues should be solved for" asks for fixes, not acceptances. It amends point 6, and supersedes PLAN-7's decision of 2026-10-23 in its V-18 acceptance alone: V-18, accepted in Phase 7 as VH-175.4, is to be solved, its remedy still to plan; VH-203 still measures the button. Which other old issues were meant, the scope below settles.
  - "that question mark about file formats looks good" is VH-205's "?" beside the lede's fourth promise: it is to look right, not only measure right. VH-203's after-run now captures it in its states, in the three languages, the colour modes and at the 32 px font, for the owner; a change the owner asks for becomes a fix item before VH-203 closes.
- **The scope, a third message.** Typed by the owner in the Backlog review chat at 14:51:20Z, the same day (Orchestrator #13 checked that chat's transcript), verbatim: "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility". What was shown, as that chat relayed it:
  - **the "?"** (VH-205), from three screenshots of the preview at `cc12788`, two changes: the gap, 16 px today, to about 8 px (the 44 px `::after` target may then overlap the end of "format."); and an open state, filled dark while `aria-expanded="true"`, like the chosen "Staff video" segment, which the onset "?" takes too, since it shares `.help-button`. Neither touches the target or the words;
  - **group A, page defects:** V-18 (VH-175.4), its 320 × 568 remedy to the owner before it is built; VH-189.1, VH-186.1, VH-139.5, VH-185.1 and VH-193.3; F15b, its words to the owner first;
  - **group B, checks in Chrome:** VH-150.3, VH-153.1, VH-155.2, VH-156.1, VH-158.1, and VH-172.1's 214 unread matrix cells;
  - **not taken:** C, native readers, screen-reader and listening checks; D, the statement, which is VH-137's, and the stale spec and doc lines VH-194.1, VH-162.1 and VH-116.1; E, tooling.

  VH-211 holds this scope, `[ ]`, to plan into fix items before VH-203 with `verbs/plan.md`, Claude first and Codex blind, compared and critiqued; the plan step is the next worker's, and this close plans nothing. "ensure everything passes UX / design / Accessibility" becomes the bar for VH-203's integrated check: that reading is the Backlog review chat's, recorded as such.
- **What goes ahead.** VH-206 takes the approved words verbatim and is unblocked. Point 8 is routed to it, as Orchestrator #13 settled: its Documents criterion now makes spec §5.4's "No audio track" correction for the kept-part case. The owner's approval is narrow: point 8, this one row, within the spec's 8,100 words; no wider `docs/` permission follows. Wish VH-202.1 stays open until that correction is made and verified, then retires. VH-209 is unblocked; VH-207, VH-208 and VH-210 go ahead on the approved plan. The plan's items and order are unchanged, so PLAN-8 takes no note.
- **The record.** Wish VH-201.1 retires: the answer settles its five questions. VH-201.2 stays open for VH-203's after-run. The report's Disposition rows name the items, and the Now lines of VH-202, VH-203 and VH-206 to VH-210 are rewritten.
- **Codex astra,** on the owner's word: the close carries no new judgement, so Codex's check of the close diff before the commit is the comparison.
- **Digest rules:** none applied; no product code and nothing under `docs/` changed here.

**Supersedes:** 2026-10-23 — PLAN-7 — The owner decides the four wish lines: one name for step 4, a forced-colour hover, V-18 accepted, the statement edited once

**Deferred:** VH-206, VH-207, VH-208, VH-209, VH-210, VH-211, VH-203

## 2026-10-27 — VH-202 — Checkpoint: the fix plan, Codex astra's blind fix items compared, its critique applied, one ask to the owner; VH-202 stays open

**Decision:** VH-202 stays open, blocked on the owner's answer to its ask, which a short close step quotes. The plan, the compare, the critique and the ask are done. VH-206's words and VH-209 wait for him; nothing contested is built first, and the approved items need only his approval of the plan.

**Rationale:**

- **The ask** is the fix plan's last section (`reviews/2026-10-25/design-pass-3/fix-plan-2026-10-27.md`, "The owner's ask"): nine points, each with a recommendation. They are the plan and its order; V-51's words in three languages, marked as the owner's to approve as V-45's were; the 400 ms rule (kept); V-50's rank and whether to take it (taken, rank 3, as VH-209); F15b (not a finding); V-18 (the acceptance stands); the statement's limitation (VH-192.1, VH-137's words); the spec correction for V-51 (wish VH-202.1); and no control. The disagreements with Codex carry both positions: VH-201.1's five questions, V-51's words and V-50's place.
- **Codex astra, on the owner's word** ("please also do everything in partnership with codex as a comparison. codex astra should be used liberally but you decide"):
  - Claude's plan was saved first (`claude-fixplan-2026-10-27.md`). Codex then drafted fix items blind, from the report, the source, the schema and VH-203's stage rule (`codex-astra-fixitems-brief-2026-10-27.md`, `codex-astra-fixitems-2026-10-27.md`).
  - Compared in `fixplan-compare-2026-10-27.md`: the same items, order and remedies. Five Codex points were taken: a typed reason for V-51; V-46's capture before `clearTrim`'s lock; VH-150's test and the walker's `warnBox` moved for V-52; more scenarios; and 1.4.12. One was refused: an owner question in VH-208's file.
  - Its critique of the plan, `codex-astra-fixplan-critique-2026-10-27.md` from `codex-astra-fixplan-critique-brief-2026-10-27.md`, said "Approve after the musts below". All five musts were applied and none refused. P-01: VH-207 captures at the choosing too, where the trim's lock and the result's re-render act first. P-02: each before not in VH-199's records is measured on the item's own base, and the 32 px font in the dark and forced modes is qualified first. P-03: the walker's warning checks move with V-51 and V-52. P-04: the plan's approval, not V-51's words, is what the other items wait for. P-05: Codex's V-18 position, provisional until HEAD is measured, is stated as its own.
- **Digest rules applied:** nielsen 1, 2, 5, 6 and 9 ("errors say what next"); wcag-2.2-aaa 2.4.3, 2.4.13 and "every exception recorded"; carbon "one primary per state"; house conventions "Fail loudly on data loss". No product code changed.

**Supersedes:** none

**Deferred:** VH-206, VH-207, VH-208, VH-209, VH-210, VH-203

## 2026-10-27 — PLAN-8 — Pass 3's fix plan: VH-206 to VH-210 for six findings, built after VH-202 and before VH-203

**Decision:** Phase 8 gains five fix items, in this order: VH-206 (V-51, rank 1, in the owner's words), VH-207 (V-46), VH-208 (V-52), VH-209 (V-50, only if the owner takes it) and VH-210 (V-48 and V-49). Each keeps VH-203's stage rule, and none adds a control.

**Rationale:** Planned with `verbs/plan.md` from pass 3's report; the plan is `reviews/2026-10-25/design-pass-3/fix-plan-2026-10-27.md`. The order: V-51 first as the one rank 1, its data path and strings untouched by the CSS that follows; VH-207 leads if its words wait. V-46 next, the one level A failure and a regression, walked by keys before any CSS moves. V-52 third, the finished card's order in `main.ts`, before the CSS reads the card. V-50 before the rings, since V-48's one record is among its six. The rings last, on the final DOM and CSS. V-18 has no fix item; it was accepted in Phase 7 (VH-175.4), and whether that stands is in the ask. The backlog stands at 891 of 1,000 words after these lines.

**Supersedes:** none

**Items:** VH-206, VH-207, VH-208, VH-209, VH-210

**Deferred:** VH-206, VH-207, VH-208, VH-209, VH-210

## 2026-10-27 — VH-201 — Pass 3's report merged: D-05 and D-06 kept as V-51 and V-52, seven findings, Codex astra's blind ranks the same on six, five questions for the owner

**Decision:** VH-201 closes. `design-pass-3-2026-10-27.md` is Pass 3's report: seven findings, none needing a new element. V-51 (D-05) is at rank 1; V-52 (D-06), V-46 (regressed), V-48, V-49 and V-18 (incomplete) at rank 2; V-50 at rank 3. V-51's words wait for the owner. VH-202 is next.

**Rationale:**

- **The merge** (`reviews/2026-10-25/design-pass-3/design-pass-3-2026-10-27.md`, "How it was done"):
  - D-05 is V-51, its own: verified in source and the unit tests (`src/media/audio-plan.ts:120`; `src/media/sub-block-sound.test.ts:61`, `97`), and the notice read in S-99 ×31, whose sliver is encoder priming. A kept sliver of audible sound was not walked.
  - D-06 is V-52, its own: verified in source (`src/main.ts:3285`, `3327`, `3497`) and in S-135's records, the tree's order and the completion write.
  - Codex's V-46 is merged under V-46, regressed (S-149 ×3). None is set aside.
- **V-51's direction:** words the owner approves, carrying the cause, the consequence and a recovery that applies, with the omission's reason carried into the existing warning (`src/workers/job.worker.ts:535`, `src/audio/warnings.ts:92`). No control; the 400 ms threshold stays unless the owner changes it. The report drafts no words.
- **Codex astra**, on the owner's word ("please also do everything in partnership with codex as a comparison. codex astra should be used liberally but you decide"):
  - Claude's ranks were saved first (`ranks-claude-2026-10-27.md`). Codex then ranked blind from a neutral sheet of observations (`findings-neutral-2026-10-27.md`), forbidden every file that carries a rank. Compared in `ranks-compare-2026-10-27.md`: the same rank on six of seven.
  - Its corrections were taken: S-113's Malay record at 320 px reaches 528 px, and V-18's readings are VH-205's before, so its place at HEAD is unmeasured.
  - Three disagreements of judgement go to the owner: V-50 at rank 3 or 2; whether the warning's guidance when the finished video cannot play (F15b) is a finding; and whether the statement's preview-only media limitation is rank 2 debt under VH-192.1.
  - Its critique of the draft, `codex-astra-report-critique-2026-10-27.md`, said "Commit after the musts below". All five musts were applied and none refused: success claims scoped ("at most one filled action"; exposure, not speech); V-51's remedy through the data path; V-50's full list of offenders; the statement and V-50 kept contested; and VH-200's unread readings, the run's conditions and VH-205's labels carried.
- **Carried unchanged to VH-203's after-run:** the four accepted gaps, the 823 finish+1s rows, VH-200.1's three readings, VH-205's "?" with its labels, 1.4.3 and 1.4.6, VH-185's output tracks and V-46's J4 case. What pass 3 lacked besides is wish VH-201.2.
- **For the owner,** wish VH-201.1, for VH-202's ask: V-51's words and threshold, V-50's rank, the failed-playback guidance, V-18's Phase 7 acceptance, and the statement's limitation.
- **No product code changed,** and no page was walked. Digest rules applied:
  - nielsen, "status visible and announced; errors say what next" (V-51, V-52);
  - wcag-2.2-aaa, 2.4.3, 2.4.13 and "every exception recorded";
  - carbon, one primary per state.

**Supersedes:** none

**Deferred:** VH-202, VH-203

## 2026-10-27 — VH-200 — Pass 3 judged: seven draft findings, D-05 at rank 1, V-46 regressed; VH-205's "?" the owner's fix, labelled

**Decision:** VH-200 closes. `judged-2026-10-27.md`, `wcag-2026-10-27.md` and `person-checklist-2026-10-27.md` judge the Phase 8 page from VH-199's evidence. There are seven draft findings and none needs a new element: D-05 at rank 1; D-06, V-46 (regressed), V-48, V-49 and V-18 (incomplete) at rank 2; V-50 at rank 3. VH-201 is next.

**Rationale:**

- **The findings** (`reviews/2026-10-25/design-pass-3/judged-2026-10-27.md`, "Draft findings"):
  - **D-05, rank 1.** "This video has no audio" for real sound kept under one 400 ms block. The cause it states is false, but the notice comes before Create. The words that tell this case apart are the owner's to approve, and the threshold stays. Orchestrator #11 was told at once.
  - **D-06.** The heavy-limiting advice comes after the player and Save.
  - **V-46, regressed.** S-149 ×3: VH-191 moved Video language into the step the read-failure branch withdraws with no hand-on, VH-178's omission.
  - **V-48.** At the 32 px font, the onset "?"'s ring is 460 of 464 px².
  - **V-49.** In the forced palettes, the wrapped Creators team link's ring is lost over the next link.
  - **V-18, incomplete.** The first action sits inside the first screen at 1280 × 900 in English and Chinese, but not in Malay or at 320 px.
  - **V-50, rank 3.** At the 32 px font in a 320 or 401 px window, the choices and the trim's Set buttons push the page sideways (S-113 ×6). No adopted rule asks for it, and step 4's selects stay wish VH-189.1.
- **Read as the instrument's, not the page's:**
  - the 32 px radio ring, measured against a box where it rings a disc;
  - S-81's wrapped statement link, measured against an enclosing box;
  - S-127's player rings, whose background the walker did not read.
  Each is missing evidence for VH-203's after-run, wish VH-200.1.
- **WCAG:**
  - 35 met, 10 met-in-source and 17 n-a;
  - 2 defects (2.4.3, 2.4.13), 11 accepted limitations and 11 missing evidence, 1.4.3 and 1.4.6 among them for the file button's words at the 32 px font;
  - the finish+1s player class, 823 rows, counted as neither pass nor fail.
- **VH-205** is judged as the fix of the owner's finding. Its verdicts are labelled "manually checked in VH-205", "missing" or "to be measured in VH-203's after-run", and text spacing and forced colours are missing.
- **Codex astra**, on the owner's word ("please also do everything in partnership with codex as a comparison"):
  - its blind review is the comparison throughout;
  - it gave blind attributions, blind VH-205 verdicts and blind WCAG and finding verdicts, each compared under four headings;
  - its points on the radio's disc, the onset "?" and Creators ranks, S-127, 1.4.11, 1.4.12, 2.5.5 and 2.5.8 were taken on the evidence, and Claude's 1.4.2 kept on S-126's assert;
  - nothing is held for the owner;
  - its close check, `codex-astra-judged-check-2026-10-27.md.txt`, said "Commit after the musts below". All four musts and both shoulds are applied, and none is refused:
    - must 1: 1.4.3 and 1.4.6 become missing evidence;
    - must 2: S-113's choices and Set buttons are judged as V-50, rank 3, so no blind step;
    - must 3: the checklist's setup order is fixed;
    - must 4: the gate and the checker are recorded on the final content;
    - should 5: 1.4.8's mixed-line and line-height wording;
    - should 6: the statement's +288 px and S-149's next Tab;
    - its may (7) keeps the rest.
- **No product code changed,** and no page was walked or probed. Digest rules applied:
  - wcag-2.2-aaa, 2.4.13 Focus Appearance and "every exception recorded";
  - nielsen 1, 2, 5 and 9;
  - carbon, one look per component kind.

**Supersedes:** none

**Deferred:** VH-201, VH-202, VH-203

## 2026-10-27 — VH-199 — Pass 3's evidence run: 3,207 of 3,219 records and 48 transitions, four gaps the owner accepted, the Phase 8 contract verified, VH-191 regressed

**Decision:** VH-199 closes. The matrix is whole but for four gaps the owner accepted, each measured in VH-203's after-run on a walker fixed as wish VH-199.1. Eighteen digests sit beside VH-176's after-run. The contract: 12 hold, 5 partial, and VH-191 regressed, focus lost when an unreadable file withdraws step 3's Video language. Codex astra drafted the table blind and checked the close. VH-200 is next.

**Rationale:**

- **The account** (`reviews/2026-10-25/design-pass-3/evidence/measurements/matrix-2026-10-27.md`): twelve runs on `a3039c3` at instrument revision `2e7b0c044ce11f2b`, Chrome 156.0.8078.48, every page visible. 3,207 of 3,219 records are ok and the 48 transitions whole. The 12 missing records and one assert are the gaps below. No failed or missing record counts as a pass. The finish+1s player row counts as unverified in all 823 rows that carry it, its 769 nominal passes included, and so do F15b's intended failures (12 records).
- **The four gaps**, with the owner's rulings verbatim:
  - **S-107 `fallback` ×3** (run-04): the walker's `fonts` route takes F1's held worker (`qualify.mjs:1017`, `faults.mjs:19`). "Yes: accept run-04 at 355/358 with the three S-107 fallback records named as a gap, and measure them in VH-203's after-run once the walker is fixed alongside VH-198.1 and VH-198.2."
  - **S-92 ×31 and S-93 ×6, the check count**: the assert reads 0 (`STATUS_SINCE`, `scenarios.mjs:1521`). **S-55c `fallback` ×3** (run-06): the same `fonts` route. One ruling covers both: "Yes: accept both gaps in run-04's pattern. Run-05 stands whole with S-92/S-93's check-count assert named an instrument gap, run-06 is accepted at 335/338 with the three S-55c fallback records named a gap, and VH-203's after-run measures both once the walker is fixed."
  - **S-133 ×6** (run-09 ×4, run-11 ×2), not recorded: `goto` (`walk.mjs:297`) has no `beforeunload` handler. "Yes: accept S-133's 6 records (4 in run-09, 2 in run-11) as a named instrument gap in run-04's pattern, and measure them in VH-203's after-run once the walker is fixed (VH-198.1 plus a beforeunload handler)."
- **The digests:** one per instrument, eighteen, each beside VH-176's after-run on part 1's 699 keys, with every changed reading explained by subject. A timing, readiness or paint difference is "attribution unresolved" (M-05): run-01 ran on battery, and run-11's later records and run-12 in macOS High Power.
- **The contract** (`contract-2026-10-27.md`):
  - **Partial:** VH-182 (S-81's statement link, 1,361 of 1,865 px², passed in VH-176's after-run and fails ×11 since VH-182's contact line wraps it; the shortfall is the enclosing box's perimeter, so the verdict waits for VH-200), VH-183 (the one-check rule), VH-185 (the output's tracks not read), VH-188 (the 32 px ring, 284 of 304, attribution unresolved) and VH-192 (the finish+1s rows, S-133, S-127's controls and their 2.4.13 exceptions).
  - **VH-191 regressed:** `3c20550` moved Video language into `#step-title`, which the read-failure branch withdraws with no hand-on (`clearTrim('unreadable')`, `src/main.ts:1486`, `1500`), so focus on a radio goes to `body` (S-149 ×3). VH-200 judges it with V-46.
  - **Five readings** the contract names and the runs did not take were taken for the close on `a3039c3`: `rings-179.mjs` `v18`, `colours` and `held`; `note-180.mjs`; `name-181.mjs` (`readings-2026-10-27/`).
- **Codex astra**, on the owner's words of 2026-10-27: "is everything being done in partnership with codex? codex astra should be used liberally"; "please also proceed gatelessly as I'm going to bed. only ask if critical"; "please also do everything in partnership with codex as a comparison. codex astra should be used liberally but you decide".
  - Each run from run-05 had a blind attribution, compared with Claude's (`evidence/runs/`, verbatim).
  - The contract table was drafted blind and compared (`contract-compare-2026-10-27.md`). Seven verdicts differed. Codex's VH-182, VH-185, VH-188 and VH-191 were taken, and Claude's VH-187, VH-189 and VH-178 were kept, each with its reason. Codex also found S-133 hidden from VH-192's tally, and S-59's "focus on the card" ×9 to be the walker blurring before its asserts.
  - Its "close concern", VH-185's sub-400 ms rule, is VH-198's D-05, rank 1, already in VH-200's Notes.
  - The close check said "Commit after the musts below" (`codex-astra-close-check-2026-10-27.md.txt`). Its five musts were applied, none refused: the finish+1s class is unverified in all 823 rows, S-98 re-reads VH-184's edge, `#contact-creators` is an existing link VH-182 reworded, the measure's cannot-determine rows are mixed-script lines, and S-127's 2.4.13 rows need their exceptions interpreted. Its three mays were applied too.
- **The record:**
  - wish VH-199.1 is the walker change;
  - VH-172.1 is narrowed to the 214 cells still unrun;
  - VH-192.2 retires, since the player is walked (S-126 to S-134, K-player);
  - VH-203's Notes name the after-run's records;
  - VH-200's Notes point to the held rows.
- **No product code changed.** No capture is committed; the full run stays in `/Users/joe/UoN-Video-Helper-evidence/pass3-vh199`.
- **Digest rule applied**, WCAG 2.2 AAA's "every exception recorded": 2.4.13's and 2.5.5's user-agent exceptions and the declared person checks are named row by row, never counted as passes.

**Supersedes:** none

**Deferred:** VH-200, VH-203

## 2026-10-27 — VH-205 — The lede's "?" drawn at the text's own size with its 44 px target round it, built before Pass 3's fix stage and deployed to the preview

**Decision:** The format "?" beside the fourth promise is a checkbox glyph's square, `--control-size` (20 px at the default font), so every promise keeps the 24 px line; a centred `::after` draws its 44 × 44 px target, so 2.5.5 needs no exception, and the gap beside it and the tip's step down, `--spacing-04`, clear that target. Built now on the owner's word, not in VH-203.

**Rationale:** The owner, in chat on 2026-10-27, first "Keep the "?" fix where it is: judged in VH-200, planned in VH-202, fixed in VH-203.", then, the same morning, "do the fix turbo please and deploy". The remedy is the one VH-200's note of 2026-10-26 proposed, adding no control. Checked in Chrome at 1024 px, light: the five promises 24, 24, 24, 24 and 24 px high (the fourth was 44), the "?" 20 × 20 px, a point 21 px from its centre hits it and 23 px does not, the tip's top 0.65 px below the target, opened and closed by click and by Enter with the ring visible, no console error; at 320 px in English, Chinese and Malay every promise a whole number of lines and no sideways scroll; dark the same; at a 32 px default font the "?" 40 px in a 48 px line. Forced colours were not emulated; the button keeps `.button--secondary`'s forced-colour rules. Turbo, on the owner's word: not walked with the pass's walker and not checked by Codex astra. VH-200 judges VH-199's 44 px row as fixed here, and VH-203's after-run and integrated check measure it once the walker's 2.5.5 reading counts a target drawn round the control (VH-205.1). Digest rule applied: wcag-2.2-aaa, 2.5.5 Target Size (Enhanced). Built in a worktree apart from VH-199's close in the main checkout (rule 3).

**Supersedes:** none

**Deferred:** VH-200, VH-203

## 2026-10-26 — VH-198 — Pass 3's instruments qualified at revision 2e7b0c044ce11f2b: Codex astra's method check and three re-checks, 3,267 records, about 9.8 h

**Decision:** VH-198 closes. The walker is extended for Phase 8, re-proved and qualified at instrument revision `2e7b0c044ce11f2b`, and every page is walked visible. Codex astra's method check gave five points and its first two re-checks four rank 1 musts; all were applied, none refused, and the third re-check said "Fit for VH-199". The matrix is 3,267 records in twelve runs, about 9.8 h, with S-104 source-only. The blind review's D-05 (rank 1), D-06 and V-46 go to VH-200. VH-199 is next.

**Rationale:**

- **Walker.** The design-pass-2 walker was copied byte for byte (`SOURCE.md`, source `4ec3d31`) and extended for each element Phase 8 added: the finished video's player, the second "?", the footer's headings, the limiting warning and Video language. The extension adds S-92 to S-153, S-140n and S-144p; faults F15 to F19 and F4e; and fixtures N6 to N14.
- **Proofs** at `2e7b0c044ce11f2b` (`56e373c`): prove 93/93, prove-172 8/8, prove-8 76/76, player 41/41, the app run 11/11, faults 27/27, fixtures 8 of 9 (N11 the declared exception), prove-resume 12/12, prove-m04 8/8.
- **The visible-page method.** Headless Chrome hid every page but the first: timers throttled to 1 s, media deferred, as Phase 7's later walk pages ran. A record now fails unless its page is visible. Chrome runs with `--disable-backgrounding-occluded-windows`, `--disable-background-timer-throttling` and `--disable-renderer-backgrounding`, and each manifest reads them from the browser process. It is a comparison-method change against VH-176 (M-05): a timing, readiness or paint difference is "attribution unresolved" unless a matched probe settles it.
- **Parts.** 1: 699 · 2: 157 + 48 · 3: 2,131 · 3b: 216 · 4: 16. That is 3,267, the sizing script's 3,298 less S-104's 31, and at least the approved 3,266, so there is no reduction. 3b's +32 are counted as the script counts them, which is more coverage.
- **S-104 is source-only** by its own contingency: N11's duration reads as 10 seconds.
- **The pilot** `pilot3-2026-10-26T09-47-41-142Z-db5c25`: 77 of 77 whole, keys `fdc4e3dd17ebc634`. The qualification runs were part 4 16/16, the transitions 48/48, the route cells 7/7 and the subresults 6/6, at `2cbba731c59d8036`. They stand at the final revision: its only change is the player's ring reading, which only S-127 opts into and none of them calls. The calibration is about 9.8 h (9.83 h) against the script's 11.4 h, which stays the upper bound.
- **The blind review** was saved verbatim before any finding (`dad952b`). D-05 is rank 1: VH-185's "This video has no audio" is said for real sound under one 400 ms block. D-06 is rank 2, and so is V-46/VH-178. They go to VH-200 (its Notes) with three pilot readings:
  - S-15's ring at 32 px, 284 of 304 px²;
  - T-46.1's card past the window;
  - S-149's read-failure branch, with focus left on the body.
- **The method check** said "Fit after the musts below" (`1cd71f2`). M-01 to M-05 were applied at `2d16e337abe51539`.
- **Re-check 1** said "Not fit" (`6df3490`), with three rank 1 musts, all applied at `2cbba731c59d8036`:
  - real declarations carry `expects`;
  - the completion's write is bound to the card's mutation;
  - 2.4.13's area is the ring's own pixels. S-127's volume ring at 320 px moved from pass, by the whole redraw (446 of 384), to "cannot determine", by its own pixels (103 of 384); no record's outcome changed.
- **Re-check 2** said "Not fit" (`6df3490`), with one rank 1 must: an outline drawn whether focused or not passed 2.4.13, its contrast read against the ring-removed image. A ring pixel now counts only where it meets 3:1 against unfocused, for 2.4.7 too, at `2e7b0c044ce11f2b` (`56e373c`). The rerun found two repairs. At 3:1 the ring must also stand at 3:1 (`kr >= 3 && ko >= 3`), because faint removal pixels inside a disclosure had passed M-02's 2.4.7 negative. And the first exception's `ringAny` read a missing field. No outcome changed in the pilot.
- **Re-check 3** said "Fit for VH-199" (`codex-astra-method-recheck-3-2026-10-26.md`). It confirmed the `kr >= 3 && ko >= 3` judgement and found no regression, coverage reduction or qualification run needing a rerun. Its one may goes to wish line VH-198.2: 2.4.7's "cannot determine" words name one comparison where two apply. The outcome is sound and the row carries both counts; changing the words now would move the revision.
- **Records that would have hung.** S-132's "Leave site?" hang is fixed in its setup. Part 4's first attempt hung 21 minutes at J4 in Malay, cause not found. The guard is wish line VH-198.1; VH-199 watches each run, restarts Chrome and resumes.
- **VH-193.2** is narrowed to two absent tests for VH-202, after a 6 of 6 scratch probe.
- **No product code changed.**
- **CI was red on three checkpoints.** The Verify lines of `877f3ab`, `cc5a52b` and `20440da` read "review files only; node tools/check.mjs 0/0". They overstated the gate by omission: `npm run lint` lints the walker, and the full gate did not run on those commits. CI was red on Pages runs 40229271406, 40232548332 and 40233727718 (`Buffer` and `setInterval` undefined; `k`, `APP` and `w` unused). Each failed before deploying, so the preview stayed on the last green build. `d43a7f5`'s lint fixes made run 40234029957 green. History is not rewritten. Since then every commit is gated on exactly what it holds.
- **The owner's gateless word** for Phase 8 decided each point (VH-197's entry).
- **Digest rules applied**, from WCAG 2.2 AAA, as instruments rather than verdicts:
  - 2.4.13, by the ring's own pixels at 3:1 against unfocused, each exception on its own evidence;
  - 2.4.7, by the same pixels;
  - 2.4.11 and 2.4.12, author content only;
  - 2.5.5, the user agent's exception only where no author rule sizes a control;
  - 1.4.6, measured contrast;
  - 2.1.3, keyboard.

  Every exception is recorded: where the user agent draws the player's controls, the exception is named or "cannot determine" is left per control, for VH-200. The Carbon and Nielsen lenses go to VH-200 unchanged.

**Supersedes:** none

**Deferred:** VH-199, VH-200, VH-202

## 2026-10-25 — VH-204 — raised: a new release is cut after Phase 8 closes, and that one goes to Xerte; 0.2.0 is not uploaded

**Decision:** Phase 8 gains VH-204 after VH-195: a release cut once Phase 8 has closed, which the owner uploads to Xerte. 0.2.0 is not uploaded; VH-14 waits on VH-204's package.

**Rationale:** The owner, to orchestrator #5 on 2026-10-25, verbatim: "Wait: cut a new release after Phase 8 closes and I'll upload that one to Xerte." 0.2.0 was cut on 2026-10-24 for Xerte (VH-162), before Phase 8 changed the page (VH-182 to VH-196, and pass 3's fixes to come), so its package is no longer the app. VH-204 repeats VH-162's method: the version on the cut chat's recommendation (0.3.0 unless it argues otherwise), the statement brought up to date where the release needs it, the gate, a tag, a push, then `npm run package:xerte` and the zip's path to the owner. The words are in orchestrator #5's notes, `plan8-owner-words.md`, "VH-14, the Xerte upload". VH-197's commit could not record them, since rule 3 kept it to VH-197's own lines, so they go in as VH-198's first record commit. No product code changed.

**Supersedes:** 2026-10-24 — VH-162 — The cut: 0.2.0 does not wait for VH-137's November review; Xerte is the public home, GitHub Pages the preview

**Deferred:** VH-204, VH-14

## 2026-10-25 — VH-197 — Pass 3's plan approved on the owner's standing word: 3,266 records, about 10.9 h, no reduction

**Decision:** The third pass runs as `reviews/2026-10-25/design-pass-3/` plans it: scenarios to S-154, an eighteen-row Phase 8 contract, and the matrix in five parts by `sizing-2026-10-25.mjs`'s recipes, with Codex astra's ten points applied. VH-198 is next.

**Rationale:** The owner, in this item's chat: "please go gateless where possible, you have my permission to use your recommendations"; relayed by the orchestrator and confirmed to it directly: "Gateless covers the rest of Phase 8: approve VH-197's plan and every later choice on the sessions' recommendations; only stop for me on something the recommendations don't settle, and keep reporting outcomes". The plan is at least as broad as Phase 7's in every dimension. Part 1 holds VH-172's 699 keys and its baseline in every class; part 2 re-verifies VH-178 to VH-181 (205); part 3 walks Phase 8 in full (2,162); part 3b meets VH-199's light-cell criterion (184) and is the only possible cut, not recommended and not taken; part 4 completes the routes (16). The 63 new scenarios, S-92 to S-154, trace to VH-182 to VH-194 and VH-196; S-153 is walked only if fixture N14 can be made, and S-154 is source-only. Codex astra on the draft (`7e520f3`): "Revise", nine musts and one should, saved verbatim (`codex-astra-plan-critique-2026-10-25.md`); all ten applied, none refused, each listed under the plan's "After Codex astra's critique". A scenario check's sixteen errors and six omissions were applied too. VH-193.2's non-finite and lowered-ceiling paths are verified in VH-198, not left to VH-202. No product code changed. Digest rules applied: the three digests are the plan's lenses unchanged; WCAG 2.2 AAA, every exception recorded (the player judged under spec §9.3's recorded exception); Nielsen, no control for power users (the rule that holds binds every remedy).

**Supersedes:** none

**Deferred:** VH-198

## 2026-10-25 — VH-194 — Spec §9.3 and UI-STANDARDS take Phase 7's five corrections, S26 to S31, U1 and U2, verbatim

**Decision:** Spec §9.3 counts a CJK glyph as two, hands focus on by the transition, narrows the thumbs' person-only check, records the file chooser's exception and names "Announce progress"; UI-STANDARDS adds a larger default font to 2.4.13's conditions. Documents only, as the owner approved the sheet.

**Rationale:** The owner approved the wording sheet on 2026-10-24, "all seems good." (PLAN-8 — the sheet approved), promoting VH-177.1 to VH-177.5. Each old text matched once with its wrapping ignored, and each new text is in place word for word. The ledger's count takes the spec from 8,074 to 8,100 of 8,100 and UI-STANDARDS from 2,400 to 2,393 of 2,400, as the sheet said. The readability test's list and the statement were read against S29 and S30: neither is contradicted, but two gaps are wish lines, VH-194.1 (§9.3's "holds this list" now follows the file chooser, which the test does not hold) and VH-194.2 (the statement names only the Chinese and Malay pages for the file chooser). Codex astra: "Commit", with no musts (`reviews/2026-10-24/codex-astra-vh194-check-2026-10-25.md`). Digest rules applied: WCAG 2.2 AAA, every exception recorded (2.5.3) and focus appearance's conditions (2.4.13); Nielsen 3, focus handed on, never taken.

**Supersedes:** none

**Deferred:** VH-197

## 2026-10-25 — VH-193 — A warning with the finished video when levelling needed over 3 LU of limiting, measured in the job; first, and unchanged after a save

**Decision:** The plan carries the limiter's measured bite, unrounded: the unlimited chain plus the solved gain, less the last limited pass before the codec. Over `HEAVY_LIMITING_LU` = 3, the finished video shows B11's warning, first among its warnings and spoken with it, and a save leaves it as it is (the owner's 1A and 2A). Spec §5.4 takes S25 and S32.

**Rationale:** The owner on the open points, verbatim: "1A and 2A: heavy limiting first, before the metadata warning; after a save the warning stays as it is, with no new words". The solver returns the gain it last measured, so the last limited pass ran at that gain (`gain-solve.ts`). A non-finite pass gives no bite. `detectProductionWarnings` returns the post-processing warnings in that order, and the pipeline's `outputWarnings` carries them through the worker as before. Measured in Chrome (`reviews/2026-10-24/vh193-heavy-2026-10-25.md`): the Teams recording bites 7.94 LU and warns. Every lecture, edited piece and phone clip bites 0.00 to 2.42 LU and does not. Three files have no audio and five branding assets have no audio stream. C0413.MP4, an unedited studio interview camera original with a 19.2 LU range, bites 5.17 LU and warns. It went to the owner under the item's criterion, and his answer, verbatim: "it's not typical, so ship as is". The matrix passed 36 of 36, the under-threshold cells 3 of 3, and the completed-save flows 3 of 3. The Chinese and Malay rows are agent drafts. Codex astra: "Commit after the musts below". Its three musts are done: the evidence; the corpus walker's rounding, skips and silent jobs; and a save proven complete. Its translation flags are taken. The rest is wish lines VH-193.1 and VH-193.2 (`reviews/2026-10-24/codex-astra-vh193-check-2026-10-25.md`). Digest rules applied: Nielsen 1 (the cost of processing is visible before the save) and 9 (a cause and a way forward, without blame); Carbon's existing notification pattern, with no new control; WCAG 2.2 AAA 4.1.3 (the warning is spoken with the result); house conventions, numbers in `src/config/`.

**Supersedes:** none

**Deferred:** VH-194

# Decisions archive

## 2026-11-01 — VH-218 — Closes: the System check's labels break only between words, CSS only

**Decision:** VH-218 closes wish VH-186.1: each System check row wraps its value beneath its label when both won't fit, by a scoped flex rule, and at 32 px on a phone the mark takes its own line, in the existing 19.99rem query, so the label has the whole column. Label words broken 2,028 to 0 of 3,024 readings a side, no element, string or token value; the fallback stays, breaking no word now. One walker change, a fixed worker value, revision `fe44891d3c53f716`, proved. Four rulings the orchestrator's, listed for the owner.

**Rationale:** His words: "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility"; "even old issues should be solved for" (`plan8-owner-words.md`). Orchestrator #33's rulings, 2026-10-31, his to see: (1) the repair past the brief's "report the word"; (2) S-103 walked under the AAC warning on both sides, 108 cells each, the before from a read-only `git archive` of the base, as the earlier "those cells can't exist" was false: Codex showed one can; pending and failed can't stand with S-103's row (`src/main.ts:1335`, `:1349`, `:1372`, `:2558`; `src/ui/failure-text.ts`); (3) one source diff across the after; (4) VH-230. Evidence: [the table](../reviews/2026-10-25/design-pass-3/evidence/measurements/vh218-check-rows-r3-2026-10-31.md), 648 cells a side, 648 reached, no verdict moved; S-103's row identical 108 of 108 each way; `type` fails alike in 162, the walker's reading of the combined spacing modes. Shortfalls: no true 32 px page shot, the walker's known capture effect, so the stacked mark rests on the probes' boxes; the first five befores on AC and the after on battery, all mode 2; `after2-s103` 8 of 18 load samples at 8 or above, peak 40.41, the owner's, on which Codex asked no re-run. Codex astra: FAIL, FAIL, FAIL, then PASS, each repaired. Digest: carbon, "two token systems, never collapsed"; wcag-2.2-aaa, 1.4.10 and 1.4.12.

**Supersedes:** none

**Deferred:** VH-230

## 2026-11-01 — VH-230 — Raised: the state words broken in the mark's column, its own fix item before VH-220

**Decision:** VH-230 takes the state words too wide for the System check's 1.5 rem mark column, each broken over two lines, the same before and after VH-218: its own fix item, directly after VH-218 and before VH-219, landing before VH-220. Both remedies stay unchosen: widen the gutter for every row, or add a token. The orchestrator's ruling, not the owner's, listed for him.

**Rationale:** Orchestrator #33's ruling, 2026-10-31, by section 3 of the brief, a remedy that outgrows the item, with his "even old issues should be solved for" (`plan8-owner-words.md`, read by `sed`): "The mark's column is its own fix item, not a wish." Measured by VH-218: default font "Tidak" 36.33 of 24 px and 好的 28 of 24 px; under spacing "OK" 24.38 of 24 px. Codex astra's re-check confirmed the assignment and added Chinese's pending "……", two lines, width unmeasured. VH-220's checks read the final page, as the PLAN-8 entry on VH-225 says. The first table's "wish VH-218.1" was never issued.

**Supersedes:** none

**Deferred:** VH-230

## 2026-11-01 — VH-230 — Closes: each state word whole in the System check's mark column, on its own 3 rem token

**Decision:** VH-230 closes the item by the second remedy it names: `--system-check-mark-width`, `var(--spacing-09)`, 3 rem, on `tokens.carbon.css`, read by the three `.system-check .check` declarations, with `white-space: nowrap` on the mark. `--mark-width` keeps 1.5 rem for the base grid, so the acceptance page is unmoved. Broken mark readings 1,092 to 0 of 3,024 a side; label words broken 0 to 0. No element, string, DOM order or colour. Wish VH-230.1 holds the acceptance page's own marks. Orchestrator #33's ruling, listed for the owner.

**Rationale:** His words: "even old issues should be solved for"; "ensure everything passes UX / design / Accessibility" (`plan8-owner-words.md`). The widest mark is Malay's "Tidak", 44.72 px under the spacing sheet, 2.8 rem; 3 rem leaves 3.28 px and is the scale's own step. Both designs chose the token, as a rise in `--mark-width` reaches the acceptance page without curing its longer words. `nowrap` is Codex's, adopted on the arithmetic: a mark wider than its column stays whole, using the 12 px gap first, and reaches the label only 15.28 px beyond the walked widest; the walk reads containment apart from lines, and `nowrap` holds nothing in the matrix. Reported: 124 values newly beneath their labels, none back; labels gain a line in 212 readings, between words; Chinese's 制作 wraps across two lines in the warned AAC value at 320 px under spacing, 4 readings, ordinary Chinese line-breaking; en-GB's gutter wider than its words. Evidence: [the table](../reviews/2026-10-25/design-pass-3/evidence/measurements/vh230-check-marks-r2-2026-11-01.md), 432 cells a side, all reached, no verdict moved, overflow 0 to 0, the ellipsis 28, 56, 31.38 px. Shortfall: no true 32 px shot, the walker's capture effect; spacing with 32 px and widths between those named not walked; `type` fails alike in 108, the driver's combined spacing modes. The first two tables stay on file: Codex found the notes wanting, twice, repaired in the third, no re-walk. Digest rules: carbon, "two token systems, never collapsed"; wcag-2.2-aaa, 1.4.10 and 1.4.12.

**Supersedes:** none

**Deferred:** none

## 2026-11-02 — VH-219 — Closes: step 4's selects whole when closed, at 32 px on a phone

**Decision:** VH-219 closes wish VH-189.1, CSS only: the selects' closed text wraps between words, its lane widened by tokens below 19.99rem. Options clipped closed 2,784 to 0 of 31,104 readings a side. Two rulings the orchestrators', listed for the owner.

**Rationale:** His words: "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" and "even old issues should be solved for" (the "Backlog review" chat, 2026-10-27, `plan8-owner-words.md`). The before, measured on `62fc265` (no VH-199 record matched the moved page): at 32 px the lane was 148, 203, 228 and 229 px at 320, 375, 400 and 401 px, and no token padding fits English's 304 px option on one line, so the text wraps; the lane is now 204 to 285 px and the box 76 to 118 px tall, 44 to 60 in the spacing mode. Evidence: [the third table](../reviews/2026-10-25/design-pass-3/evidence/measurements/vh219-selects-r2-2026-11-01.md), 5,184 + 84 cells a side: clipped 2,784 to 0, targeted 101 of 504 to 0, over the arrow 1,920 to 0, spacing at the default font 480 to 0; the default font unspaced unmoved; names, labels, 44 px targets and rings unchanged. No residue for the owner. Orchestrator #33: the matrix stands at 5,184 + 84, onset read by `selectedIndex`, not walked as a dimension. Orchestrator #34: groups with load at 8 or above re-walked where the battery allowed, all identical; the rest stand on their first runs, after-staff-fade and -none confirmed 2026-11-02. Codex's blind check, "pass with conditions": evidence qualifications, each verified, carried in the second table's notes, no re-walk; its close check, "FAIL" on one sentence of those notes, a void said moved that lies where it ran, corrected in the third. The first two tables stay on file. Shortfall: the open list unmeasured, a person's check (VH-219.3); 32 px page shots show the default size (VH-217.5), so the visual reading rests on 12 viewport captures; the walker's select rows and `type` read the wrong thing (VH-219.1, VH-219.2); the driver's `hold` labelled 2,592 cells a side failed with every reading whole, and the export runs' manifests name the checkout (VH-219.4). Sized at about 40k, it took two workers. UI-STANDARDS: no rule changes. Digest rules: carbon, "two token systems, never collapsed"; wcag-2.2-aaa, "44 px targets" and 1.4.10.

**Supersedes:** none

**Deferred:** none

## 2026-11-03 — VH-210 — Closes: V-48 whole on the base, V-49's footer link spaced by the ring's room

**Decision:** VH-210 closes V-48 with no rule, its ring whole on the base, and V-49 by `--focus-room` between the footer list's items under forced colours: `#contact-creators` failing 418 forced cells to 0. Wish VH-209.3 retired, its condition applied. The orchestrators' rulings listed for the owner.

**Rationale:** The owner's words: the answer to VH-202's ask, "as reccomended, and convery me the 9 point ask here" (the "Backlog review" chat, 2026-10-27, point 1, the plan approved), and "Gateless covers the rest of Phase 8" (`plan8-owner-words.md`). V-48: VH-209 removed the sideways scroll, so the item's own condition applied: recorded, no rule; the finding's 4 px² went with the scroll and were not located. V-49: the theme paints a backplate behind each line of a wrapped link, and the ring of the link above, drawn past its box by its room, lay under the next link's first line; an inside ring would lie over the link's own glyphs, LinkText to Highlight not 3:1. `.footer-help-list > li + li { margin-block-start: var(--focus-room); }` in `app.css`'s forced-colours block, pinned by `test/stylesheet.test.ts` (a source-presence test). Each link keeps its 44 px box; the forced footer is 4 px taller, one-line cases included, explained, not unchanged. Walked before and after: 1,165 table cells a side, with S-ID1's two f3 records outside the script's count (VH-210.4), revision `fe44891d3c53f716`, mode 2, AC but after-f1 on battery 100% to 80%. [The table](../reviews/2026-10-25/design-pass-3/evidence/measurements/vh210-rings-r4-2026-11-02.md), the fourth by script from one walk, the first three on file: Codex's blind check found the notes' wording wanting, and the repaint check was added. Rulings, the orchestrators': #34, the forced records' groups, the staged records, the stale-palette spacing cells walked alone (sp), groups at load 8 or above standing on their first runs, `#accessibility-statement a` reported unmoved; #35, the export proof accepted with its exit 1 on `f.changedAny` alone (11 of 84, noise, VH-210.3), the re-walked pairs for ruling 4's repaint (rw4), S-76 (rw76) and S-109 (rw109; its timed `player` row flaky on the base, VH-199.1's), and the repaint check: in 418 fail-to-pass cells no ring reads 0 where the before read whole, and every other ring reads as before but `#contact-self-service`, which passes with equal or more area. Shortfalls: a real Windows theme stays the person checklist's task D; 32 px page shots show the default size (VH-217.5). Wish VH-209.3 retired: its condition is applied. UI-STANDARDS unchanged: its 2.4.13 rule already reads forced colours. Digest rules: wcag-2.2-aaa, 2.4.13 and "focus appearance"; carbon, "two token systems, never collapsed".

**Supersedes:** none

**Deferred:** none

## 2026-11-04 — VH-225 — Commit 1: the visible name UoN Video Finisher in three languages, no address changed, the item open

**Decision:** VH-225's first commit gives the app the name "UoN Video Finisher" on every surface it shows, with "Penyiap Video UoN" in Malay and "UoN 视频成片工具" in Chinese, an orchestrator's acceptance listed for the owner. The hidden identifiers keep their names, pinned by a test; no address changes. Wish VH-229.2 retired, its readings done. The item stays open: the repository rename is the owner's click, and commit 2 carries the addresses and the close.

**Rationale:** The owner's words (`plan8-owner-words.md`), apart from the orchestrators': "it is to be called UoN Video Finisher (rather than UoN Video Helper)" and "the next release must contain the rename" (2026-10-28, "Backlog review"); "Rename those too", the repository and the Pages address; "Yes, move it", the slot after VH-210; "Gateless covers the rest of Phase 8"; "Yes, leave them", the walker's old-order pins; and S-133's records "a named instrument gap", measured in VH-203's after-run (2026-10-27). The orchestrators' rulings, listed for the owner: #35, the two names, the 1,695 cells a side and S-133 skipped on both sides; #36, the build accepted and the subject fails at the old revision expected; #37, the proof's load recorded with no re-run, J1 the instrument, S-141, S-143 and S-144 not reached (wish VH-225.1), and S-59's and S-109's player row the instrument (VH-199.1). Measured: 1,695 cells planned a side, 1,694 attempted and 1,690 reached, every group on AC at power mode 2; every title, h1, "covers" line and email subject read the old name before and the new after. The walker's three subject assertions moved it from `fe44891d3c53f716` to `9c52269607bccc4c`: the after passes 87 of 87 and the flows 3 of 3, a read-only export of the base 0 of 87 and 0 of 3. At the old revision the subject rows fail as expected (S-146 121, S-78 118), and the old-order pins fail alike in 553 cells a side. [The table](../reviews/2026-10-25/design-pass-3/evidence/measurements/vh225-name-r1-2026-11-03.md) is the second by script from one walk; the first is on file and its notes were corrected on Codex's verdict check. A job in flight at the cutover is lost, since a reload orphans its scratch by design, so the rename ask says to finish and save first. Wishes VH-225.1 to VH-225.7 raised; VH-105.2 widened to take the two names, which the native check confirms; VH-229.2 retired, its four readings done in this walk: translation binding (S-04), reload (S-06a), the tab title (the titles group) and the open panel (S-03 with the "?" open). Codex's verdict: "Pass with conditions for commit 1". Shortfalls: the two names await the native check, the machine-translation notice kept; 32 px page shots show the default size (VH-217.5). Digest rules: house-conventions, "Fail loudly on data loss" (the kept identifiers' test); wcag-2.2-aaa, 2.4.2, 1.4.4, 1.4.10 and 1.4.12.

**Supersedes:** none

**Deferred:** VH-225

## 2026-11-04 — VH-225 — Closes: the repository and the Pages address renamed, on the owner's word

**Decision:** VH-225 closes with commit 2: on the owner's "Renamed it", the profile's repository URL, the init prompt's address, the branding path's comment and test, and `vite.config.ts`'s comment take UoN-Video-Finisher; vite's base follows the repository's name through the deploy workflow. Pages serves at the new address; the old returns 404 (VH-225.3).

**Rationale:** The owner's word, 2026-11-04 at about 07:31Z, in Orchestrator #37's chat, their own turn, verbatim: "Renamed it" (`plan8-owner-words.md`), answering the rename ask made after commit 1, `72b103e8`, went green on Pages run 41749929086; and "Rename those too" (2026-10-28). Orchestrator #37 verified at 07:32Z that the renamed repository resolves with main at `72b103e8`, the new address returns 200 and the old 404. Commit 2's asset paths were proved before the ask by a local build with `BASE_PATH=/UoN-Video-Finisher/`: the page's script and stylesheet, the branding base and the job worker, all under `/UoN-Video-Finisher/`. No deploy was queued or running at the rename: commit 1's run completed at 00:53Z, and `gh run list` showed no later run at 00:54Z, 00:57Z and 07:32Z, with origin/main unmoved. Until commit 2's deploy the new address served commit 1's build, made for the old path, so its assets did not load: inferred from the workflow's `BASE_PATH`, not measured page by page; the ask said to finish and save any job first. Kept: the local `origin` URL, which GitHub redirects, with `.git/config` unchanged; the identifiers commit 1 pinned, so saved choices carry over on the same origin; the two scripts' temporary folder prefixes; the launch configuration's name; the records' file names. Shortfalls: the old address's 404, wish VH-225.3, for the owner; the names' native check, VH-105.2. Digest rules: house-conventions, "Fail loudly on data loss".

**Supersedes:** none

**Deferred:** none

## 2026-11-04 — PLAN-1 — Phase 1's five items restated whole, in place of the 18 October closing's list

**Decision:** Phase 1's items are VH-126, VH-127, VH-128, VH-131 and VH-132, all shipped, as the 19 October list names them; restated in place of the 18 October list of three, which v3.1's checker would otherwise leave standing beside it. No membership changes.

**Rationale:** Record-only, by V31-REFRESH, for the reason the PLAN-7 entries above give.

**Supersedes:** 2026-10-18 — PLAN-1 — Internal use only is the official closing with words added; no card text under 28 pt

**Items:** VH-126, VH-127, VH-128, VH-131, VH-132

## 2026-11-04 — PLAN-7 — Phase 7's twelve items restated whole, in place of the four wish lines' list

**Decision:** Phase 7's items are VH-170 to VH-181, as the entries above restate them, here in place of the list of the owner's four wish lines. No membership changes.

**Rationale:** Record-only, by V31-REFRESH; the reason is the entries' above.

**Supersedes:** 2026-10-23 — PLAN-7 — The owner decides the four wish lines: one name for step 4, a forced-colour hover, V-18 accepted, the statement edited once

**Items:** VH-170, VH-171, VH-172, VH-173, VH-174, VH-175, VH-176, VH-177, VH-178, VH-179, VH-180, VH-181

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

## 2026-11-04 — V31-REFRESH — The project takes pm-next v3.1 as the lab now builds it: tools and verbs replaced as a set, the record kept

**Decision:** the project runs pm-next v3.1 at PM-Skills lab 4ab66b5 from the commit carrying this entry: six tools and three verbs replaced, two tools and five add-on verbs added, as v3.1's set; rule 9 asks a Checked line only where a model policy requires it, and this project keeps none — because the owner asked on 2026-11-04 to upgrade the project after its first-month test.

**Rationale:** The lab's V31-REFRESH-1. No route in v3.1's change notes covers a later v3.1 build over an installed v3.1 (the upgrade tool refuses a second snapshot), so this follows the "Existing installations" rules by hand: every installed file matched b5c6f4b's bytes, so no local edit is carried; tools and verbs are replaced as a set from lab/next-v31 at 4ab66b5; the contract merges rule 9's one change; no project template is copied over the record, and the decisions template's sentences on Items and Retired are merged into this file's comment. Replaced: check.mjs and ledger.mjs (a closed phase is checked against the PLAN Items list no other supersedes, a Retired field, traces read in a Rationale, the trajectory read by each line's own date with a phase-order warning), handover.mjs (the start notice's recovery sentences), harness.mjs (the post-commit hook rebuilds the status site), view.mjs (the status site beside view.html, both ignored here), migrate.mjs (the upgrade checks), and the intake, plan and close verbs. Added: brief.mjs and lanes.mjs, for orchestration and parallel writers, and the add-on verbs orchestrate, control, sweep, stocktake and design-review, which no rule reads. The session hooks are unchanged, so no setting is regenerated. The new checker failed Phase 1 and Phase 7, whose PLAN lists were additive; the four PLAN entries below restate them whole. Rollback: revert the pull request's merge commit; nothing outside the repository changes.

- Migration edit: none — every replaced file was b5c6f4b's, byte for byte

**Supersedes:** 2026-10-22 — V31-UPGRADE — The project runs pm-next v3.1: tools, verbs and the start-notice hook replaced as a set, the record kept

**Deferred:** none

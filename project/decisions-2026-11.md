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

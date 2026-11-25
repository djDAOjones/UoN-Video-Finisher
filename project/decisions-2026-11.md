# Decisions archive

## 2026-11-01 — VH-218 — Closes: the System check's labels break only between words, CSS only

**Decision:** VH-218 closes wish VH-186.1: each System check row wraps its value beneath its label when both won't fit, by a scoped flex rule, and at 32 px on a phone the mark takes its own line, in the existing 19.99rem query, so the label has the whole column. Label words broken 2,028 to 0 of 3,024 readings a side, no element, string or token value; the fallback stays, breaking no word now. One walker change, a fixed worker value, revision `fe44891d3c53f716`, proved. Four rulings the orchestrator's, listed for the owner.

**Rationale:** His words: "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility"; "even old issues should be solved for" (`plan8-owner-words.md`). Orchestrator #33's rulings, 2026-10-31, his to see: (1) the repair past the brief's "report the word"; (2) S-103 walked under the AAC warning on both sides, 108 cells each, the before from a read-only `git archive` of the base, as the earlier "those cells can't exist" was false: Codex showed one can; pending and failed can't stand with S-103's row (`src/main.ts:1335`, `:1349`, `:1372`, `:2558`; `src/ui/failure-text.ts`); (3) one source diff across the after; (4) VH-230. Evidence: [the table](../reviews/2026-10-25/design-pass-3/evidence/measurements/vh218-check-rows-r3-2026-10-31.md), 648 cells a side, 648 reached, no verdict moved; S-103's row identical 108 of 108 each way; `type` fails alike in 162, the walker's reading of the combined spacing modes. Shortfalls: no true 32 px page shot, the walker's known capture effect, so the stacked mark rests on the probes' boxes; the first five befores on AC and the after on battery, all mode 2; `after2-s103` 8 of 18 load samples at 8 or above, peak 40.41, the owner's, on which Codex asked no re-run. Codex astra: FAIL, FAIL, FAIL, then PASS, each repaired. Digest: carbon, "two token systems, never collapsed"; wcag-2.2-aaa, 1.4.10 and 1.4.12.

**Supersedes:** none

**Deferred:** VH-230

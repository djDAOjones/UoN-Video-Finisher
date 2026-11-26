<!-- markdownlint-disable -->

# VH-231: the verdict's compare, Claude and Codex astra (VH-231 #5, 2026-11-05)

- **Claude's verdict:** `vh231-claude-verdict.md` (7b51fead7dcc589e), saved 19:09:34Z: "Commit, at the close". It raised no musts on the code. Its shoulds were for the decision. The gate, the close check, the Disposition row and the design files were open for the close.
- **Codex's blind check:** brief `vh231-codex-blind-brief.md` (c9595b9ee9f6fcc7), run 19:10:47Z–19:17:47Z from `$W` with read-only access. Its answer is `vh231-codex-blind.md` (daa39f576bc4b64b), "Commit after the musts below". The answer was opened at 19:17:58Z, after Claude's verdict was saved.
- **The candidate:** base 4bc3a40, diff hash 18bd9c46d0e81dec. **The evidence:** `vh231-cut-whole-2026-11-05.md` (60be715f8e2a7506).

## Agreed

- **The criteria in the code are met:**
  - the trim's and the record's approved words in three languages, untrimmed and trimmed;
  - only the two approved keys added, no string changed, the notes and the machine-draft mark in place;
  - `cut-short` first among the finished warnings and in the completion announcement, kept by "Keep it" and "Previous video", with `endedEarly` not borrowed;
  - the spec row verbatim, at 8,153 words;
  - "Duration", the truncated MP4, the pre-flight order and whole files unchanged;
  - no element added;
  - the named tests present, and `matroska-cut.test.ts` unchanged.
- **The route:** the detector runs once per worker step and never twice in pre-flight. That makes three bounded reads per ordinary job for a Matroska or WebM file, where the base made one, and VH-82 stays open. The close decision states the counts. The read is bounded: no decode pass and no whole-file buffer.
- **Diagnostics:** the dev-only bundle gains a non-identifying boolean. The decision names it.
- **Failure path:** a rejection of the bounded read now fails inspection, or processing, by their existing paths. Either way the job cannot go on.
- **Open for the close:** the Disposition row naming VH-231 and its evidence (Codex's must 2), and the full gate on the final candidate (must 3).
- **Evidence and load:**
  - The readings are words and states, so they stand.
  - The estimate is a timing reading. a1t's handling is sound: a1t of record, a1's 44 kept and set aside. The 4 cells that differ below load 8 show that load was not the only cause. They are estimate variability, and the calculation code is unchanged. They are not a regression, and not a performance comparison.
  - The probe counts were matched independently (trim 360, status 260, result 216, steps 18). `sources.txt` validates.
  - Setting aside the first generation was acceptable.
- **WCAG and nielsen:** supported in the measured states. The native check is VH-231.1's.

## Codex only

1. **Must 1: the retained result's transitions were read in light mode only, on both sides.** Checked: `steps` is present in 18 of 72 S-171s/S-172s cells a side, all `light` (b1 18, a1 18). The driver reads the transitions in the setup, once per ID, language and width, and each mode then reads the final card. The item's stage rule asks for its readings, transitions and the discard question among them, at three widths, in three languages and in four modes.
   - **Claude agrees, on re-reading.** The verdict cited "the 18 transition cells a side" without seeing that they are one mode. As walked, this falls short of the stage rule, so criterion 9 is **not met** until it is repaired.
   - **The repair** is a walk of the transitions in dark, forced light and forced dark, before (on the base) and after, by a driver change outside the walker (reading the transitions per mode). The walker stays at 9c52269607bccc4c.
   - It is the orchestrator's to plan: it needs the base walked again beside a changed tree, and its own proof first. If it is accepted unwalked, it is a coverage reduction, a stop for the owner.
2. **Should: tests** for `cutShort: true` with a differing `made` range, and for a rejection or abort of the bounded read through inspection and processing. Claude adopts both for the close. A test-only addition changes the diff hash but not the walked app behaviour, which the close check states.
3. **Should: the table's notes.**
   - The sentence "every probe field equals b1's in all 72 cells" needs "except `status` in 4". Claude agrees. A placed table is never rewritten, so the correction goes in the next table's notes (after the repair walk) and in the decision.
   - The p1 median (5.42, the upper middle of an even set) is `table-1page.mjs`'s convention, VH-217's tool, and is noted only.
4. **Notes, adopted as notes:**
   - `inspectFile`'s other callers (the acceptance tooling and the spikes) now make the detector read for Matroska and WebM. The decision says so.
   - The record's flag comes from the selection's inspection and the warning from processing's fresh one. These are coherent for an ordinary `File`, unreconciled if successive reads saw different bytes, and not walked.
   - Cancellation is checked after the read rather than during it.
   - "0 failing" includes unchanged `cannot-determine` outcomes (targets and extra contrast in all 540 cells, measure in 60).
   - The `samples/CULT2011.mp4` checker warning is an existing one.

## Claude only

- The table's "mode ?" comes from this Mac's `pmset`, which prints no powermode line (macpro-40). Note only.

## Disagreed

None left. The verdicts differed ("Commit, at the close" against "Commit after the musts below") on must 1 alone. Claude now accepts it, so the evidence settles it and nothing is held for the owner.

## The follow-up verdict

**Commit after the repairs.** First, the transitions' walk in the three other modes, before and after (must 1), with the next table's notes corrected. Then the two tests (the should), the Disposition row (must 2), and the gate and checker (must 3). Then Codex's close check (`close2`, because the raise's `close` and `recheck` names are taken) covers the repaired points.

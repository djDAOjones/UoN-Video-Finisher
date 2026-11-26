<!-- markdownlint-disable -->

# VH-231 #1 — the design compare

Claude's design `vh231-claude-design.md` saved 05:57Z (c05ff47aba9dfdd4). Codex's blind design brief `vh231-codex-design-brief.md` (cefa4e2972dc53d3); Codex started 05:54:41Z, exited 05:57:55Z; its answer `vh231-codex-design.md` (9,094 bytes) opened 05:58Z, after Claude's was saved. "Design verdict: Raise VH-231 as a complete truthfulness fix with explicit wording and specification wishes, but do not authorize its build under the current approvals."

## Agreed

- The readings: the numbers are the readable length; the cut WebM before Create is unread on this Mac; the warning is nowhere on the finished page: `#audio-warnings` withdrawn at the job's end (`main.ts:995`, `:3173`), the card's warnings (`renderResult`, `:3388`–`:3465`) and the status line take only the production warnings, and `endedEarly` finds nothing for a Matroska file.
- `cut-short` is carried into the processed result, the card's existing warnings region, the completion announcement and the retained result ("Keep it", "Previous video"), with `warnings.cutShort` and `warnings.finishedHeading` unchanged: each stays true after Create in all three languages. `result.endedEarly` is not borrowed.
- No element, control or checkbox: the existing result-warnings region, VH-208's treatment.
- Unchanged: the truncated MP4 (VH-139's indexed shortfalls and ended-early passage, VH-215's card and release guard); the precedence, `cut-short` then `ends-early`, both able to stand.
- Streaming: VH-158's bounded read (1 KB head, 4–32 MiB tail), no whole-file buffer, no decode pass.
- The walk: S-23, S-23s, S-23sn, S-23w, S-23wn; a new, qualified scenario for the cut WebM before Create; MP4 controls S-22 and S-64; S-136 for the finished card's existing warnings; 1280, 375, 320 px, three languages, four modes.
- Size: one worker, about 45k, once the scope is settled.

## Codex only

- Open "Video properties" for visible readings; walk cut-source trims and the retained-result transitions; controls S-20 (no audio) and S-91 too. Adopted for the item.
- The discard question carries the same account as the record. Adopted: it follows the record (`recordPassage`, `result-summary.ts:204`).
- The route: the fact carried in the source report from inspection, the pre-flight's own call removed. Left to the build, bounded and not doubled; needed only if the panel or trim words change, since they show before pre-flight.
- VH-203 must name VH-215's `fixOnly` scenarios and the new one explicitly. Recorded as a note for VH-203, unclaimed.
- Re-reads in VH-220 (a kept result with warnings) and VH-221 (save and outcome). Checked by `grep`: neither walks a cut file, and nothing changes for a file not said cut short; named only if a cut file is in their cells.

## Claude only

- The two routes for carrying the warning (the job's own bounded re-read, or the main thread carrying the pre-flight's fact).

## Disagreed, and how it settles

- **Whether "the whole video" (the trim's "Keeping the whole video, N seconds." and the record's "the whole video (N seconds)") is false beside the warning.** Claude: true, with the warning beside it. Codex: it asserts completeness, and a warning beside it does not cancel it. **Settled toward Codex by the record:** VH-139 took the cut MP4's record off "the whole video" to the made range (`jobSummaryText`'s `made`, `result-summary.ts:167`–`:178`), and VH-158.1 names "give a cut file's read length as its whole" as the thing to read. Claude concedes. An honest record and trim need words: **wish VH-231.1, a stop** (brief, section 0).
- **The panel's "Duration N seconds".** Claude: true, the length the file holds, in a closed disclosure. Codex: misleading unqualified; a label "Length that can be read". Not settled by evidence; put to the owner inside VH-231.1 as an option.
- **A spec §5.4 line.** Claude: not needed for truth. Codex: a wish for the row and the preamble. With the finished video carrying the warning, and the record's words changing, the spec and page agree only with the row extended: put in VH-231.1, the owner's.

## Result

The remedy needs new words and a `docs/` line: a stop. VH-231.1 drafted (`vh231-progress.md`), one line to the orchestrator; no ledger edit until the word.

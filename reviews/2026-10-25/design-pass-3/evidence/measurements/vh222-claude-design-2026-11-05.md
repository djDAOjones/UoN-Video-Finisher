<!-- markdownlint-disable -->

# VH-222 — Claude's design reading (saved 2026-11-04, before any Codex output exists)

Base ca093da (VH-225 commit 2), walker revision 9c52269607bccc4c, worktree `$S/vh222` on `side/vh222`. A check item: no product diff unless a defect is found.

## 1. The rows: 39, from the three wish lines' own groups
The wish lines (text at `446f702^:project/wish-list.md:46–48`) name groups of "the VH-155 rows" and "the VH-156 rows". The concrete keys are what VH-155 (9d033ec, 36 keys) and VH-156 (16e49eb, 47 keys) changed in `en-GB.ts`, filtered to each line's groups; VH-158's two are the keys d17a46e added. List: `$S/vh222-walk/rows.json`.
- **VH-155.2, 19:** ends-early lines `result.endedEarly.{sound,together,both}`, `warnings.endsEarly.detail`; no-audio `warnings.noAudio.{heading,detail}`; clipping and level headings `warnings.clipping.heading`, `warnings.targetMissed.heading`, `warnings.soundHeading`; browser refusals `preflight.reasons.{noAacEncodeHere,noAacEncodeElsewhere,noSourceDecodeHere,noSourceDecodeElsewhere}`; audio-only and loudness failures `failure.unreadable.soundOnly`, `failure.{unlevellable,outputLoudness,outputPeak}.what`; System check `systemCheck.rows.aac`, `systemCheck.values.aacNotSupported`.
- **VH-156.1, 21 (3 shared):** `preflight.reasons.{veryLongJob,veryLongJobUnknown,longJob,longJobUnknown}`; `failure.{badTrim,unlevellable,encoderRefused,checkFailed}.next`, `failure.tryAgain`; `result.endedEarly.{picture,sound,together,both}`; `status.saved`; `warnings.decodeDamage.detail.{one,other}`, `warnings.veryQuiet.detail`, `warnings.metadataLost.{heading,detail}`; `feedback.tooLong`, `feedback.someOmitted`.
- **VH-158.1, 2:** `warnings.cutShort.{heading,detail}`, read with the source panel's length and the finished record.
- **Cells:** each row at 1280, 375, 320 × en-GB, zh-Hans, ms-MY × light, dark, forced light, forced dark = 36; **1,404 row-cells.**

## 2. What a reading is
A read-only probe after each cell's own `afterMode` (VH-225's driver pattern), using the page's own tables (`window.__mx`): for every one of the 39 keys, each smallest visible element whose text matches it (`M.matches`, literal parts), its container, text, box, lines, Latin words broken across lines, clipping (its own and any clipping ancestor's scroll vs client box), inside the viewport, and the page's sideways scroll. **Read** = shown, whole (no clip, inside the viewport, no word broken), in its expected container, in a cell whose scenario state the walker found reached. "True of the state" is Claude's reading per scenario from the probe's text: the ends-early variant against the file's facts; beside the cut-short warning, the source panel's length line and the record's lines.

## 3. Mapped first: what VH-199 cites
VH-199 ran source a3039c3 at revision 2e7b0c04. No string of the 39 changed since in any table (checked, three tables). Since then VH-208 changed the finished card's warnings, VH-218/VH-230 the System check, VH-215 the cut files' length, VH-206/213 the no-audio routing; the pre-job `#audio-warnings` and `#preflight-report` renderers and their CSS at the default font are unchanged. **Cited, not walked:** VH-199's records of S-18, S-19, S-20, S-22, S-24, S-25a, S-25b, S-27 and S-89 in the cells it read (about 80, light at three widths, and S-24's three English 1280 dark and forced), where the same reader finds the row whole in the record's `measure`/`contrastText` items with no `overflow` clip and the state reached. A row the reader can't find there is walked. Everything else is walked on the base.

## 4. Walked on the base (about 760 cells)
- Pre-job, the 27 other cells each: S-18 quiet, S-19 clipped, S-20 silent, S-22 truncated MP4, S-27 decode damage, S-89 (F10); S-24, S-25a, S-25b (F13), slow, about 2 min a cell.
- All 36: S-23 cut MKV; S-23w cut WebM finished (`cut-short-10s.webm`, the walker's fixture); S-56 (F12); S-62 saved; S-64 the previous ended-early line; S-79a, S-79b; S-82 System check; S-91 (F6a); S-106 (F17); S-147 (F18); S-90b (F11, the watchdog, slow).
- S-23s (cut MKV finished) in the nine light cells, the MKV's record read beside S-23's warning.
- **New, in memory (no walker file changed, revision unchanged), named and proved on the base at 1280 and 320:** N-222a, F17 with `lecture-30s.mp4` chosen, expecting `noAacEncodeHere`, 36 cells; N-222b, the same as a phone (S-26's `asPhone`), expecting `noAacEncodeElsewhere`, 375 only (the phone verdict needs the phone view), 12 cells; N-222c, an audio-only file made under `$S/vh222-walk/fix-222/` by ffmpeg (a sine, `-vn`), expecting `failure.unreadable.soundOnly`, 36 cells.

## 5. Rows no existing scenario or fault reaches: wish lines naming why
`noSourceDecode{Here,Elsewhere}` (no fault refuses the decoder; a new one is new fault code), `failure.unlevellable.{what,next}` (the walker's own S-147: "no fault is known that makes a recording unlevellable"), `failure.output{Loudness,Peak}.what` (no fault alters the output's measurement), `warnings.targetMissed.heading` (no fixture misses the level by more than 1 LU), `{veryLongJob,longJob}Unknown` (SOURCE_ONLY S-154: no fixture gives a non-finite estimate), `failure.badTrim.next` (a `KeptRangeError` the page's own validation prevents), and whichever of `decodeDamage.detail.{one,other}` and of the four `result.endedEarly` variants no fixture gives. Each stays outstanding as one wish line naming why (the item's "Every row ends read"); none is retired, since the page still has each sentence. New fault code for these would outgrow a 45k check item: a question for Codex's design check, not a plan.

## 6. Points the walk must settle
- The cut-short warning: a cut MKV or WebM's source panel giving the read length as the whole, beside "shorter than expected", is a defect (a fix item before VH-203); the finished record likewise.
- Timed rows by #37's ruling; S-24/S-25 and the watchdog depend on timing, so a group with load samples at 8 or above is re-walked.
- Power AC, mode 2 throughout; the before is the walk (no edit).
- WCAG: 1.4.10 (no sideways scroll, whole at 320), 2.4.6 (headings say what follows), 3.1.5 (reading level, the tables' own test), 3.3.1 (errors identified in text), 4.1.3 (status and alerts announced: the probe reads each row's live region from the walker's `ax`).

<!-- markdownlint-disable -->

# VH-221 #4 — Claude's verdict

Saved 2026-11-05 11:56Z, after Codex's blind run started (11:55:42Z) and before its answer was opened.

**Verdict: PASS.** No defect; no product diff; one walker change (S-155), the one the criteria name. Evidence: `vh221-browser-rows-2026-11-05.md` and `vh221-records-2026-11-05/` (267 cells, all reached, failing 0), on this Mac only.

## The criteria
1. **Every row read** in zh-Hans and ms-MY, en-GB the control: all ten rows pass in every language, view and mode (`vh221-sum-<group>.txt`: R1 S-02 and S-106, R2 S-48, R3 S-56, R4 S-66, R5 S-67, R6 S-69, R7 S-74, R8 S-02 and S-155, R9 S-62, each 12/12/3 at w1280/w375/w320, R8 S-02 at w375 "other"). Each row's text is the language table's string (`vh221-read.txt`: one text per row and language), whole (present, visible, in view, not clipped, no broken word), in place and true of its state (the scenario's state held).
2. **Retired:** only `browserNote.pending` and `.passed`; `browserNote()` at `src/ui/system-check.ts:71`–`:73` returns `notPassed` or null (by `83be720`). The failed-browser sentence is read (R1, 54 cells).
3. **The file kind:** read by a CDP breakpoint at the served `showSaveFilePicker(options)` (no function replaced; the stub is not counted as the dialog): 27 of 27 S-62 cells, one type, `video/mp4: [.mp4]`, described in each language's string. The native dialog stays wish VH-153.1, narrowed to it.
4. **Mapped first:** 0 cited (settlement 7: VH-199's per-cell "whole" readings sit outside the repository, and VH-208 reordered the result area), so all 240 row cells walked: more coverage, not less.
5. **S-155:** named in VH-221's range, qualified on this Mac at w1280 and w375 (6/6 reached; S-155:phoneua fails its state at w375 3/3), both revisions recorded (`9c526996` → `c27c325f`); it reaches R8 at 375 px, which S-02's phone user agent cannot. No other walker change: `git diff` holds `scenarios.mjs` alone.
6. **Every row ends read:** no live row unreached; no wish line needed but VH-153.1 narrowed.
7. **The stage rule:** 1280 and 375 px, three languages, four modes, plus w320; tokens, literals, controls and elements untouched (no product diff). WCAG: 1.4.10 no sideways scroll in 267 page readings, each row whole at 320 and 375; 3.1.5 en-GB by the gate's reading-grade test, zh-Hans and ms-MY a non-native plain-language reading (short sentences, one idea each, what to do next), the native check the owner's; 3.3.1 not applicable (system failures, not input errors), each still said in text with what next (Nielsen 9, "errors say what next"); 4.1.3 R2–R7 in `role=status` / `aria-live` regions, heard without focus moving; a speech reading is a person's.

## The points
- **One walk, both columns:** right for a check item with an empty product diff (settlement 15); the table says "Nothing moved" only of that.
- **Load:** 2 samples in job (S-48 en-GB w1280's last three modes) and 10 in save (12 S-66 cells): every reading passed, R2 and R4 are strings, no timing claim rests on them (#40's ruling). Load can only fail a reading falsely.
- **R8 at 375 in S-02:** the designed branch: the phone user agent gives the try-Chrome sentence, true of that state; S-155 reads the out-of-date reason at 375.
- **R2:** the visible `#status` shows the stage line ("Encoding video") at the probe; the Creating sentence is the spoken row, heard in the region's history (settlement 10). True of the state.
- **R6:** `#save-error`'s two sentences are two blocks (3 lines), so textContent joins them without a space; the spoken twin in `#save-status` has the space. Not a defect.
- **R3:** `[dev: fault F12]` is the dev build's fault tag, not a product string.
- **Fixtures:** all three differ by sha1 on this Mac's ffmpeg; proof-fix reached each ID's state on them (6/6) before any group read them. Enough: the rows read text and state, not media bytes.
- **Defects:** none found.

## What a person must still check
The native save dialog as a person sees it (VH-153.1); a speech reading; a native reading of zh-Hans and ms-MY; non-text contrast of painted controls (the pass's, not this item's).

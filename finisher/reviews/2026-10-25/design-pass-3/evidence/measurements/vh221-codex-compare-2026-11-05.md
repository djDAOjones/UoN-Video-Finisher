<!-- markdownlint-disable -->

# VH-221 #4 — the verdict compare

- **Claude's verdict:** `vh221-claude-verdict.md`, saved 2026-11-05 11:56Z, before Codex's answer was opened: PASS, no defect.
- **Codex astra's blind verdict:** `vh221-codex/blind.md`, from `vh221-codex/blind-brief.md` (11:55:42Z to 12:00:27Z), opened after it ended and after Claude's verdict was saved: PASS WITH NOTES, the row evidence passing, close tasks named.

## Agreed
1. Every row read in three languages, both widths, four modes, 267 cells (240 + 27 at w320), no targeted row failing; no product defect.
2. Retired: only the pending and passed browser sentences, `browserNote()` in `src/ui/system-check.ts` returning the not-passed sentence or null; the failed-browser sentence read (R1).
3. The file kind: 27 of 27 S-62 cells, one type, `video/mp4: [.mp4]`, each language's description, read by a CDP breakpoint at the served call; the argument, not the native dialog, which stays wish VH-153.1.
4. S-155: the sole walker change, qualified (6 correct, the wrong branch failing 3 of 3 at 375 px), both revisions recorded; it reads R8 in all 24 cells.
5. One walk serving both columns is valid for the unchanged product; self-pairing shows identity only, as the table says.
6. Load: the same cells named (S-48 en-GB w1280's last three modes; S-66 en-GB w375, zh-Hans w1280 and w375); wording and state readings, no timing claim; they stand.
7. S-02 at 375 px: the designed branch (`blockContextFor()`), S-155 supplying desktop Chrome at narrow width. R6's joined text and R3's `[dev: fault F12]`: no defect. The proof group suffices for text and state readings.
8. WCAG 1.4.10, 3.1.5 (no native reading), 3.3.1 (not applicable), 4.1.3 (exposure, not speech); Nielsen's "errors say what next" named at close. Person checks: the native dialog, speech, native-language reading.

## Codex only, taken
9. **Spoken rows described as such.** R2 (Creating) and R3 (could not create) are spoken-only status text in `#status`, read in its text and history (`heard`, the S-48 captures' mutations), not by geometry; "shown whole" belongs to the visible rows. Taken: a repaired table, `-r1`, with the notes saying so.
10. **The VH-199 mapping auditable.** The bundle gave the conclusion, not the map. Taken: `vh221-map.mjs` and its output, VH-199's keys per scenario on the item's grid (for example S-02 6 of 24, S-66 3 of 24), go into the `-r1` records, the notes naming why none is cited.
11. **The checker** (`node tools/check.mjs`, run on the working tree during the review): the trajectory's latest four at 308 of 300 words, and the item's `src/ui/system-check.ts:71` read as a path. Taken: the trajectory line shortened and the path written without its line suffix. The VH-122 warning (`samples/CULT2011.mp4`) is pre-existing and environmental, `samples/` being gitignored and absent from this Mac's clone. First linked here to wish VH-122.1; by Orchestrator #40's ruling (~12:20Z, as for VH-223) not linked, since VH-122.1 is about hearing VH-122's warning, but named in `Verify:` as worktree-only: `samples/` is absent from the worktree, and the owner's checkout reads 0 warnings.

## Claude only, kept
12. Nothing of substance; Claude's "whole" wording covered the spoken rows by settlement 10, which Codex's point 9 makes explicit.

## Disagreed
None.

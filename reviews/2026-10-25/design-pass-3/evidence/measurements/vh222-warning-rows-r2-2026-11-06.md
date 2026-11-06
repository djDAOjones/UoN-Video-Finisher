<!-- markdownlint-disable -->
# VH-222 r2: group g1r re-reads g1's 81 cut-short cells on VH-231's landing, on the Mac Pro

VH-222's stage-rule measure, one page by `table-1page.mjs`. The records are in [`vh222-records-r2-2026-11-06/`](vh222-records-r2-2026-11-06/): each cell's outcomes and rows, the probes, states and logs whole, and in `detail/` the whole record of each moved or named failing cell.

## Provenance

| | Before | After |
| --- | --- | --- |
| Commit | `1cb3cbad7197` | `1cb3cbad7197` |
| Diff hash | `eccc2099995dddd5` (5 lines of status) | `eccc2099995dddd5` (5 lines of status) |
| Instrument revision | `29c3acfcad7eb29c` | `29c3acfcad7eb29c` |

- `renamed.txt` sha1 `56cac54de0123c1a3aa7d09671de1d597edb9469`
- `vh222-claude-g1r.md.txt` sha1 `c461dfb85212e2cafd7c5124e15bbea25ed1722d`
- `vh222-codex-g1r-brief.md.txt` sha1 `9a62829800f06fc4444a34dd833c41a114d5dad4`
- `vh222-codex-g1r.md.txt` sha1 `69d790ac820b7bde0bcdbcbc78eb52de2b5d573b`
- `vh222-cut-g1r.txt` sha1 `d76b5fbba8b37be8b2241711ee7e0c8bb9839282`
- `vh222-cut-read-2.mjs.txt` sha1 `5be9b47d632be597cbd725d44071709cd8034768`
- `vh222-driver.mjs.txt` sha1 `ebf764cc05f7d2c48f1384e8808d2cb56a514d83`
- `vh222-g1r-compare.md.txt` sha1 `e0b572b826673b23fefc79b21ea5a1f2dd6bc06f`
- `vh222-go.sh.txt` sha1 `cd055e76f7f1e341f2ad868f91ab46998bd26f23`
- `vh222-rows.json` sha1 `231734787a8330dfe230ef2d59507b47a0bc86c4`
- `vh222-sum-g1r.txt` sha1 `3369c0972941f8cac4fd27fc787ef7f32e093f7f`
- `vh222-sum.mjs.txt` sha1 `f56b42cf477b5506ee891cc58c1139351bd8ade8`
- `vh222-walk.sh.txt` sha1 `30fc48d1ec6caf81e8bd4d79ce2300111a63f461`
- `vh222-walker-s173-s174-r2.diff.txt` sha1 `eccc2099995dddd5b9f729d3060697246942f834`
- `walk-queue-wait-seq.zsh.txt` sha1 `d1e0f151179d2e2fa40fd72992ac35c6b917eb70`

## Runs, power and load

| Group | UTC | Cells, reached | Power | Load median, peak | Samples at 8 or above |
| --- | --- | --- | --- | --- | --- |
| g1r | 00:14:40–00:29:45 | 81, 81 | AC Power, mode ? | 4.35, 6.96 | 0 of 31 |

## Before → after

Scenario cells: 81 before (81 reached), 81 after (81 reached); **81 unmoved**. Not on the other side: 0 after-only, 0 before-only.

Nothing moved, row by row.

Page probe, 81 readings a side: nothing moved.

## Notes

- **What this page is.** r2 adds group g1r to the first table, `vh222-warning-rows-2026-11-05.md` (g1 to g8, 1,285 scenario cells, 1,245 reached), and to r1, `vh222-warning-rows-r1-2026-11-05.md` (g9, 24 cells). Both stand as placed and are not rewritten. g1r re-reads g1's 81 cells on VH-231's landing, as the orchestrator directed after the fix item VH-231 landed: S-23 and S-23w at 1280, 375 and 320 px, in en-GB, zh-Hans and ms-MY, in light, dark, forced light and forced dark; S-23s in light at the three widths. The first table's g1 stands as read on the base, `95d18eed5db1`. Across the three pages, 1,390 scenario cells were walked and 1,350 reached; g1r's 81 re-read conditions g1 had already read, so the distinct conditions stay 1,309, with 1,269 reached.
- **On which tree.** g1r ran on `1cb3cbad7197` (VH-231's landing on main, over VH-232's raise `d079b8c9257c`), not on VH-222's base. `side/vh222` was rebased onto it by the orchestrator's route: the walker diff was reversed, rebased and re-applied with no conflict. The product is VH-231's landing with no VH-222 diff. The commit row's diff hash is the walker's (`vh222-walker-s173-s174-r2.diff.txt`, the same +24 lines at new line numbers). Walker revision `29c3acfcad7eb29c` is main's walker, which carries VH-221's S-155 and VH-223's `--keys`, plus VH-222's S-173 and S-174; g1r uses none of the four. `PLANS` hashes the same as main's walker. Earlier records: the first table's `9c52269607bccc4c`; r1's `6e7fd163e4f3d0bc`.
- **The before and after columns** are g1r paired with itself, one walk, as in the first table and r1, so "Nothing moved" says only that. **g1 → g1r, on a different commit:** in the captured context, only `#process-result` and `#status` differ, in the 45 finished cells, and both differences are VH-231's. They are read by the cut reading (`vh222-cut-g1.txt` in the first table's records; `vh222-cut-g1r.txt` here). Not every difference is VH-231's: the walker's `asserts` instrument moves from `cannot-determine` to `pass` in the 45 finished cells, because g1's decode of the burned card timed out on this Mac and g1r's did not. That is better measurement availability, not a VH-231 effect, and job times vary. The cells:
  - S-23 (the cut MKV before the job, 36 cells): reached, the panel's warning shown, the status names it, no record, as in g1.
  - S-23w (the cut WebM, finished, 36) and S-23s (the cut MKV, finished, 9): in g1, the warning on no finished page, the status silent, and the record "the whole video (5 seconds)" or "(20 seconds)" in 45 of 45. In g1r, the finished video's own warning list (`section.result-warnings` in `#process-result`, under "Worth knowing about the finished video") carries the cut-short heading and detail. The completion announcement in `#status` (polite) names it: "Your video is ready. Worth knowing about the finished video: The video file is shorter than expected." and its zh-Hans and ms-MY forms. The record gives the kept span by `result.keptCut`, for example "then 5 seconds, from 0:00.0 to 0:05.1" and "20 seconds, from 0:00.0 to 0:20.0". "the whole video", "完整视频" and "keseluruhan video" appear in 0 of 81 probe records.
- **The readings** (`vh222-sum-g1r.txt`): 81 of 81 reached. `warnings.cutShort.heading` and `.detail` were read 81/81 in S-23, S-23s and S-23w (g1: 36/36, S-23 only); `warnings.soundHeading` 36/36 in S-23. Each is whole, inside the viewport's width, unclipped, with no Latin word broken and no sideways scroll; the status span's `self-x` clip is the visually-hidden technique. The probe's `inside` checks the left and right bounds only (driver `:65`). Vertically, the warning lies below the first screen in all 36 S-23 cells and 27 of the non-light S-23w cells, in the page's flow and reached by scrolling the page. It is announced whole and is not clipped. S-23s is read in light only, as in g1.
- **Nothing false beside the warning (VH-158.1).** The source panel's Duration gives the read length (5 s and 20 s) under the label "Duration", which VH-231's decision keeps by the owner's approval. On the finished page it stands with the warning that the file is shorter than expected, and the record no longer calls the read length the whole. The trim's "Keeping {kept}." is VH-231's reading, in its own tables; it is not among VH-222's rows.
- **The reader.** `vh222-cut-read-2.mjs` is a copy of `vh222-cut-read.mjs` (the first table's reader, unchanged). It adds `result.keptCut` in three languages and a column for the heading inside `#process-result`. On g1 it reproduces g1's tally exactly. It classifies faithfully, but its span capture keeps the record's joining word ("then", "随后是", "kemudian") and, in zh-Hans, the text after the end time. Its result-card column tests only that the heading is present. Exact claims rest on the probe's rows and raw text.
- **WCAG and Nielsen, for these cells:** 1.4.10, no sideways scroll at 320 px. 2.4.6, the list's heading names what it holds. 3.1.5, the wording is the language table's; the reading level and the speech are a person's checks, and the native reading of VH-231's new wording is wish VH-231.1. 3.3.1, the warning names the cause in text. 4.1.3, the completion announcement carries the warning in the polite status. Nielsen 1 ("status visible and announced") and 9 ("errors say what next") hold: the detail says to check the new video and to choose a complete copy.
- **Load and power:** AC throughout (this Mac prints no power-mode line). g1r started at loads 6.06 and 4.51, peak 6.96, with no sample at 8 or above. No reading here depends on timing.
- **Checks:** Claude's g1r reading (`vh222-claude-g1r.md.txt`, saved 00:31:51Z) and Codex astra's blind reading from its brief (`vh222-codex-g1r-brief.md.txt`; answer `vh222-codex-g1r.md.txt`, verbatim, "PASS with notes", opened 00:35:2xZ) are compared in `vh222-g1r-compare.md.txt`, all in this page's records. They agree: no new defect, and VH-158.1's criterion holds on VH-231's landing. Codex's notes are adopted: the vertical position, the `asserts` change and the reader's extraction. Claude conceded that its "g1 → g1r is VH-231's effect" was too broad.

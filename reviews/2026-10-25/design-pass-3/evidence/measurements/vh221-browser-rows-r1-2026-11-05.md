<!-- markdownlint-disable -->
# VH-221: VH-153's rows a job or a failing browser reaches, in Chrome, 267 cells, one walk serving both columns, the notes repaired

VH-221's stage-rule measure, one page by `table-1page.mjs`. The records are in [`vh221-records-r1-2026-11-05/`](vh221-records-r1-2026-11-05/): each cell's outcomes and rows, the probes, states and logs whole, and in `detail/` the whole record of each moved or named failing cell.

## Provenance

| | Before | After |
| --- | --- | --- |
| Commit | `95d18eed5db1` | `95d18eed5db1` |
| Diff hash | `335461b545a32fe1` (2 lines of status) | `335461b545a32fe1` (2 lines of status) |
| Instrument revision | `c27c325ffc8c3b6f` | `c27c325ffc8c3b6f` |

- `errors.turn.txt` sha1 `e2c7bfa4579d3bd79eadfc05a20fc6305cb02934`
- `job.turn.txt` sha1 `d50ed815dbb6aaa26eb5163bc8442c3d31abaa2c`
- `proof-fix.conditions.txt` sha1 `bb8eba11ea8962d97c2c0eb883c6bb968a83093d`
- `proof-fix.digest.md.txt` sha1 `c646e60d7aaff84ede9018a011aef14088b9a8bd`
- `proof-fix.launcher.log.txt` sha1 `f3f1b70879d78d51b91829a1f1e697420d9d4f12`
- `proof-fix.load.log.txt` sha1 `10621aec554a4add2ed5bb00aca51827ef1fd32a`
- `proof-fix.vh221-ledger.jsonl` sha1 `5902e866cbaab6610cae785d930da48b0f87f605`
- `proof-fix.vh221-probe-vh221-proof-fix.jsonl` sha1 `9e95ed5fae0bc7570afd8ecaad2794f270e5d336`
- `qual-s155.conditions.txt` sha1 `847732582b9bf4acf508b36528e0a2b6592c960e`
- `qual-s155.digest.md.txt` sha1 `8dc529138a5a1a234e39a84a265977eb6d407429`
- `qual-s155.launcher.log.txt` sha1 `d52d05e11faff0ca9b18a626e1a01213606b6696`
- `qual-s155.load.log.txt` sha1 `4a599f7ac7ac41892944edc1b3847ee24c2dd50d`
- `qual-s155.vh221-ledger.jsonl` sha1 `5e524d74a1aa4835016032e5e2605594fde7bc47`
- `qual-s155.vh221-probe-vh221-qual-s155.jsonl` sha1 `d8e4b31cfa2df2cba72b7069a7d56942c6360a99`
- `renamed.txt` sha1 `8aec566a6186a440221d18ee411fc56a9aa4566c`
- `save.turn.txt` sha1 `75229e3d380b52911210c029f00216da0bfd144c`
- `vh221-driver.mjs.txt` sha1 `7c50e098c8d89306481040da9f92c347f5601bd2`
- `vh221-fix.sh.txt` sha1 `9b3e964c306e3a3ad8002f0c21ca56af9b95095e`
- `vh221-fix.sha1.txt` sha1 `8f83e0e11475939a0b1af4fabdc5f2e6722081b3`
- `vh221-go.sh.txt` sha1 `8ebfc04219f916518651a528e91e6bf3f77be3fd`
- `vh221-map.mjs.txt` sha1 `a82414ba4579ceec736f69e6ad7417e1d874c5aa`
- `vh221-map.out.txt` sha1 `672930dd317838f08e6dc4f1c4c72f38a413fdf4`
- `vh221-read.mjs.txt` sha1 `12c43c61f55868b6067d004b3151a661a1616345`
- `vh221-read.txt` sha1 `377410e011073835dbed9aacad62d169411ae896`
- `vh221-sum-errors.txt` sha1 `43237ca56655cd040a7cb0cc35c77047215f90d5`
- `vh221-sum-job.txt` sha1 `69738c36096177b4aa7ec79b5a0595d060dfac38`
- `vh221-sum-proof-fix.txt` sha1 `df741f73d22ba4ea0ca3ab078e349958ccdc61ab`
- `vh221-sum-qual-s155.txt` sha1 `c6cce620398dfbed9f7cd5604afe645e7e8511d1`
- `vh221-sum-save.txt` sha1 `512f3143154cd6584c1d2a829c154032b0181e68`
- `vh221-sum-startup.txt` sha1 `a142b89d6dcd2204478b69fe76aa16f3909248e1`
- `vh221-sum.mjs.txt` sha1 `9735642da025ecc57b227529c09ac86f244f14b1`
- `vh221-turn.sh.txt` sha1 `df34a9445d9174fa631432dbbbbe2d535100bfcd`
- `vh221-wait-seq.sh.txt` sha1 `a7954d66f11a737e0057425f4e2824f11c92a300`
- `vh221-walk.sh.txt` sha1 `114ff57958934301e026b331f855da999b1d15a5`

## Runs, power and load

| Group | UTC | Cells, reached | Power | Load median, peak | Samples at 8 or above |
| --- | --- | --- | --- | --- | --- |
| startup | 06:09:22–06:15:00 | 78, 78 | AC Power, mode ? | 3.63, 3.99 | 0 of 12 |
| job | 08:16:43–08:54:34 | 54, 54 | AC Power, mode ? | 5.08, 9.39 | 2 of 76 |
| save | 09:52:36–10:26:31 | 108, 108 | AC Power, mode ? | 6.3, 10.18 | 10 of 68 |
| errors | 11:48:18–11:50:10 | 27, 27 | AC Power, mode ? | 6.79, 7.26 | 0 of 4 |

## Before → after

Scenario cells: 267 before (267 reached), 267 after (267 reached); **267 unmoved**. Not on the other side: 0 after-only, 0 before-only.

Nothing moved, row by row.

Page probe, 267 readings a side: nothing moved.

## Notes

- **Repaired** after Codex's blind check (`vh221-codex-blind-2026-11-05.md.txt`): the spoken rows described as such, and the VH-199 map added. The walk and its records are those of `vh221-browser-rows-2026-11-05.md`, unchanged.
- **One walk serves both columns.** VH-221 is a check item: its product diff (`src/`, `index.html`, `public/`) is empty at the walk, so each group is paired with itself (the design compare's settlement 15), and "Nothing moved" says only that. The rows' readings are in `vh221-sum-<group>.txt` and `vh221-read.txt`. The walker's one change is S-155 (`scenarios.mjs`, revision `9c52269607bccc4c` to `c27c325ffc8c3b6f`): the out-of-date Chrome reason at 375 px with a desktop user agent, qualified on this Mac (`vh221-s155-qualification-2026-11-04.txt`; `qual-s155.*` here). S-155 reached its state 6 of 6; the wrong branch, S-155:phoneua, fails it at w375 3 of 3 (tryChrome).
- **Rows and cells.** Ten rows (VH-153's rows a job or a failing browser reaches; a failed save gives two) × 24 cells (1280 and 375 px; en-GB, zh-Hans, ms-MY; light, dark, forced light, forced dark) = 240 row cells. Mapped first to VH-199's records: `vh221-map.out.txt` (by `vh221-map.mjs`, read-only, over `matrix-coverage-2026-10-27.json` and the walker's plans) gives VH-199's keys per scenario on this grid, for example S-02 6 of 24, S-48 6, S-56 12, S-66 3, S-74 6. None is cited (settlement 7): those records' per-cell readings of each row are not in this repository, VH-208 later reordered the result area that holds `#save-status`, and the owner's answer of 2026-11-05 rests each table on one machine. So all 240 are walked here, plus each scenario at w320 light in three languages for 1.4.10. The 267 scenario cells: S-02 and S-106 (the failed-browser sentence, R1; S-02 also R8), S-155 (R8), S-48 (Creating, R2), S-56 (could not create, R3), S-66 (save stopped, R4), S-67 (not saved, R5), S-69 (a failed save's two sentences, R6), S-74 (Errors captured, R7), S-62 (the file kind, R9). Every row reads true of its state in all three languages: failing 0. The visible rows (R1, R4 to R6, R7's heading and intro, R8) read whole and in place. The spoken rows, R2 (Creating) and R3 (could not create) in `#status`, are read in the region's text and its history (`heard`), not by geometry: R2's snapshot shows the stage line "Encoding video", while the Creating sentence and its notice are in the live history and the S-48 captures' mutations. R9 is read at the call. At w375, S-02's R8 is the phone sentence (tryChrome), as designed, and S-155 reads R8 there. R3's text carries the dev build's `[dev: fault F12]`, the walker's fault, not a product string. R6's two sentences are two blocks (three lines), so their joined text has no space; the spoken twin in `#save-status` has it.
- **Retired:** only the pending and passed browser sentences. `browserNote()` in `src/ui/system-check.ts:71`–`:73` returns the not-passed sentence or nothing (by `83be720`). The failed-browser sentence is read (R1).
- **The save dialog's file kind** (R9) is read from `showSaveFilePicker`'s argument by a CDP breakpoint at the served call. No function is replaced, and the walker's stub is not the dialog. In all 27 of S-62's cells, `types` is one entry, accepting `video/mp4: [.mp4]` and described "MP4 video (.mp4)", "Video MP4 (.mp4)" or "MP4 视频（.mp4）". The native dialog as a person sees it stays wish VH-153.1, narrowed to it.
- **This Mac:** Mac Pro 2019 (Xeon W-3223, x86_64, macOS 26.5.1), Chrome 157.0.8103.39 headless, Node 24.22.2, ffmpeg 9.0.2-tessus. On AC throughout; `pmset -g` prints no powermode line, so "mode ?" above (#39's ruling). The MacBook Pro's groups are support only and not in this table (the owner's answer 1, PLAN-8 of 2026-11-05).
- **Fixtures:** this Mac's ffmpeg changes all three fixtures' sha1s (`vh221-fix.sha1.txt`). Each ID that reads one was proved on it first: proof-fix reached 6 of 6 states at w1280, light, en-GB (`proof-fix.*`). Those records are proof, outside the item's cells.
- **Load:** job was walked under load at or above 8 for 2 samples (peak 9.39; S-48 en-GB w1280, dark to forced dark), and save for 10 samples (peak 10.18; S-66 en-GB w375, zh-Hans w1280 and zh-Hans w375). Every reading passed, and no timing claim rests on them (#40's ruling): R2 and R4 are strings, none an elapsed time, an estimate or a timeout margin.
- **Settled:** 32 px page shots show the default size (VH-217.5), so no visual approval rests on such a shot. `f.changedAny` moves by 1–2 px from run to run, and no claim rests on it. The walker's own instruments' outcomes in these cells are the pass's, not this item's claims.
- **WCAG re-checked.** 1.4.10: none of the 267 page readings scrolls sideways, and each row reads whole at 320 and 375 px. 3.1.5: en-GB by the gate's reading-grade test; zh-Hans and ms-MY by Claude's plain-language reading, with no native reading. 3.3.1: not applicable, since these are system failures, not input errors; each is still said in text with what to do next (Nielsen 9). 4.1.3: R2 to R7 are said through `role=status` or `aria-live` regions without focus moving; a speech reading is a person's.

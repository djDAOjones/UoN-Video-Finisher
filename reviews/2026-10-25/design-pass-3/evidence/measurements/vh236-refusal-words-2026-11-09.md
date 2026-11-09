<!-- markdownlint-disable -->
# VH-236 — the refused preview's second sentence where step 1 refuses

VH-236's stage-rule measure, one page by `table-bundle.mjs`: `table-1page.mjs`'s reading unchanged, each record named by its group and run, none overwritten. The records are in [`vh236-records-2026-11-09/`](vh236-records-2026-11-09/): each cell's outcomes and rows, the probes and their results, states and logs whole, and in `detail/` the whole record of each moved or named failing cell. Each record's sha1 is its line in `sources.txt`.

## Provenance

| | Before | After |
| --- | --- | --- |
| Commit | `1f7fc6679420` | `1f7fc6679420` |
| Diff hash | `da39a3ee5e6b4b0d` (1 lines of status) | `9f9a386eb587d581` (5 lines of status) |
| Instrument revision | `7db38f355f3c46c2` | `7db38f355f3c46c2` |

- `vh236-driver.mjs.txt` sha1 `a1d3f189d0ffb42ad0b67670f46f335fb14c0c94`
- `vh236-split.zsh.txt` sha1 `127ce8919eb8593355137a247b77904a04c6f337`
- `vh236-read.mjs.txt` sha1 `061d7775b70f460aabaf18f719945bca35bf97c6`
- `b1-read.txt` sha1 `766dd62003d778a9b2874eedfe231d9db8e1d985`
- `r1-read.txt` sha1 `558ad306bec1fb5c240dd0ae1763efd336b4d0a7`
- `keys-group.txt` sha1 `d6e6b8433731bea0df2c21f4225013f29bb5e25d`
- `keys-s149.txt` sha1 `c0baabd40c7bbafeea0dc8716e6e22b81866ee38`
- `go.sh.txt` sha1 `a5e318433f32d7fd2ce9a0cbc5d2ff21d0117de8`
- `walk.sh.txt` sha1 `f0b907e2644c612d39cdbde7863c7c727f6925b2`
- `fix.sha1.txt` sha1 `7a34d2b7a8550a900569bad0fb5eb623a6848bce`
- `chain-b1.zsh.txt` sha1 `99a5e3e21541a0b52e1e5b37777218002582950c`
- `chain-r1.zsh.txt` sha1 `aafda78e0e75ae0f5e398f769075f53f8dd949c1`

## Runs, power and load

| Group | UTC | Cells, reached | Power | Load median, peak | Samples at 8 or above |
| --- | --- | --- | --- | --- | --- |
| b1 | 01:32:17–01:46:40 | 52, 52 | AC Power, mode ? | 3.87, 6.11 | 0 of 29 |
| r1 | 01:50:53–02:05:13 | 52, 52 | AC Power, mode ? | 3.93, 5.45 | 0 of 29 |

## Before → after

Scenario cells: 52 before (52 reached), 52 after (52 reached); **52 unmoved**. Not on the other side: 0 after-only, 0 before-only.

Nothing moved, row by row.

## Notes

- **The headline.** All 52 outcome classifications unchanged; the refusal text changed in 43 cells, the item's change, the first sentence kept byte for byte; the nine S-32 controls unchanged. The generated "52 unmoved" above counts the outcome classifications, not the announced text.
- **This page's generation.** Made by `table-bundle.mjs` (VH-203's bundler, `a69215ce`, copied into `vh236-walk/`) from the same walk folder, on Orchestrator #46's ruling: `table-1page.mjs`'s reading unchanged, each record named by its group and run. The first generation, by `table-1page.mjs` (`fe920345`, page `5684ade4`), kept only the last of each group's 25 runs' `manifest.json` and `run.json`, so 96 of its 124 sources lines differed from their records; it is set aside whole outside the repository.
- **One pair.** `b1` → `r1`, 52 keys a side: S-28 ×9 (w1280, w375, w320, light, three languages), S-149 ×24 (w1280 and w320, four modes, three languages; 12 in one driver run per key, `vh236-split.zsh`, as S-149 is focus-bound), S-140n ×1 (w1280, en-GB, light), S-29 ×9 and the control S-32 ×9. `b1`: commit `1f7fc66` (VH-235's landing, the base after the orchestrator's ruling 1), diff hash `da39a3ee5e6b4b0d`, 1 line of status (the item file), walked with `git diff --quiet 1f7fc66 -- src index.html public package.json package-lock.json vite.config.ts` true at 01:31:22Z. `r1`: tracked diff hash `9f9a386eb587d581` (`src/main.ts`, `test/screen-text.test.ts`) with `src/ui/preview-refusal.ts` (sha1 `addfbd21`) and `src/ui/preview-refusal.test.ts` (`25addcbc`) untracked, 5 lines of status. Walker revision `7db38f355f3c46c2` both sides; the same driver `vh236-driver.mjs` (`a1d3f189`), keys, `go.sh` (`a5e31843`) and `walk.sh` (`f0b907e2`, WHO "VH-236 #2"). Fixtures: the five used match `vh203-walk/fix.sha1.txt` (`fix.sha1.txt`). AC Power, no powermode line on this Mac. Load: `b1` GO 4.23 and 4.02, peak 6.11; `r1` GO 4.73 and 5.17, peak 5.45; no sample at 8 or above either side.
- **The reader** `vh236-read.mjs` (`061d7775`; from `vh203-walk/v2142-read.mjs`, a model, not the instrument) reads, per key, `#page-announcer`'s text sequence from the walker's `__mutations` `live-text` entries (the walker's label: exposure, not speech), each text as F (both sentences), S (the first sentence alone, exact), or "": `b1-read.txt` (`766dd620`), `r1-read.txt` (`558ad306`). The walker's observer takes `characterData`, so the in-place deletion is logged as a `live-text` entry with the shortened text.
- **What moved, the 43 refusals:** S-28 9, S-149 24, S-140n 1 and S-29 9 read `""→F` before (ending on F, "You can still set the times." present, `#step-trim` withdrawn) and `""→F→S` after (ending on S, the first sentence byte-equal, the second absent, `#step-trim` withdrawn). All 43 are the order the walks reach, the preview's `error` before the block. S-29 ends with the read failure of `notvideo.mp4` (step 1's line is its failure, "refusal no" at the end): its refusal is `prores-1080p.mov`'s, before the read failure, which writes `#source-status` only; the orchestrator's ruling: case (a), covered by the approved removal, no read-failure code.
- **Unmoved:** S-32 ×9, the control, where the file reads and trimming is offered: `""→F` both sides, `#step-trim` offered, both sentences kept. Every key's walker status `ok` both sides.
- **Not walked, tested only:** the block before the error (`"" → S`), the storage block the setup steps resolve (either order, `"" → F`, no write at the block), a change of language between the error and the block, another sentence said since, an earlier file's words and a second block: forced on stand-ins in `src/ui/preview-refusal.test.ts` (35 tests with the screen-text wiring test, all three languages), which drive the helper production uses.
- **WCAG, from the readings:** 4.1.3, the same `#page-announcer`, its text changed in the same node by `deleteData`, not said afresh; 3.3.1 and 3.3.3, the refusal's first sentence kept where step 1 refuses, the second, offering a withdrawn step, gone; 3.1.5, words removed only. DOM and live-region exposure only: no speech reading was made, and none is claimed; a person's reading is theirs.
- **The finding, not built (wish VH-236.1, the orchestrator's word):** (1) after an offered refusal (S-32's state), a read failure leaves "You can still set the times." standing with the trim withdrawn; (2) on a new selection, an earlier file's first sentence stays standing for a file that previews. Neither is walked here.
- **Tests:** `npm run test` on the walked candidate, 89 files, 1,774 passed, 1 skipped (the standing EBU cases 7 and 8, VH-27), against the base's 1,739; `tsc --noEmit` 0; eslint on the four changed files 0. No i18n table, `index.html`, `docs/` or sheet changed.
- **Cited, never paired:** VH-203's records (the finding's source, `vh203-walk/v2142-read.mjs`). The re-reads after the landing (VH-214's groups) are the orchestrator's word.

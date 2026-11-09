<!-- markdownlint-disable -->
# VH-234: the format "?" back on its type role

VH-234's stage-rule measure, one page by `table-bundle.mjs`: `table-1page.mjs`'s reading unchanged, each record named by its group and run, none overwritten. The records are in [`vh234-records-2026-11-09/`](vh234-records-2026-11-09/): each cell's outcomes and rows, the probes and their results, states and logs whole, and in `detail/` the whole record of each moved or named failing cell. Each record's sha1 is its line in `sources.txt`.

## Provenance

| | Before | After |
| --- | --- | --- |
| Commit | `a28086f4af59` | `a28086f4af59` |
| Diff hash | `da39a3ee5e6b4b0d` (1 lines of status) | `f1db7eff73f12f1e` (3 lines of status) |
| Instrument revision | `7db38f355f3c46c2` | `7db38f355f3c46c2` |

- `vh234-driver.mjs.txt` sha1 `fe14f01cfbb0a50f286986342292bd5e52292c0f`
- `format-help-c.mjs.txt` sha1 `1485d64ed9c66d76431bb9bb08b33bbebcd598e8`
- `format-sheets-c.mjs.txt` sha1 `624c18de8fb6e210b58ba93d6263f7e1949f2ded`
- `format-scroll-s.mjs.txt` sha1 `13c6c65367b2c914af5fe89c28fcebb2a8c880de`
- `scroll-sheets.mjs.txt` sha1 `23c5eabe0863beb9b09574d91544853240e11c90`
- `side-job.zsh.txt` sha1 `ef55e7bef210a1b060d4342211a66445ac5a5ae5`
- `keys-loop.zsh.txt` sha1 `7a88bf59767d953edca0596623a884b8a030e027`
- `group.zsh.txt` sha1 `2eed270c0d55b2403d9bfb481931fe3cfefef8ea`
- `go.sh.txt` sha1 `2f4aeb7d26d240538b53b4d9c26ebe7805457b21`
- `walk.sh.txt` sha1 `452bebd38439c71654f1f16b6aa8a5b7e068de5c`
- `png-compare.mjs.txt` sha1 `cf0c2dcb3a277d1ec11a7c26bfdf29ffb7035f5e`
- `record-compare.mjs.txt` sha1 `c8f76f86c14c4cced8f7be75222568198af39c5b`
- `cell-compare.mjs.txt` sha1 `cf2ab912ff17ae4a36c872e041441002b3ace86d`
- `record-diff.mjs.txt` sha1 `cfc92f473cb0ca5a9a902cafd00df5c87c99dd42`
- `outcomes-sum.mjs.txt` sha1 `d7729ad8c04a80ba62b594521a8e396af0ad7f7c`
- `keys-102.txt` sha1 `cea268b188baad3d15bb4139ddd6111294c48630`
- `keys-a3g2.txt` sha1 `29fd24d0348f32f3a30334bfa4de44d5d5459c4f`
- `keys-a3g4.txt` sha1 `787e94363b8abfafc648f022cee3e97b4581b669`
- `keys-a3g9.txt` sha1 `32d82ce2700fb063637d9631a2d3586e07fa03ba`
- `keys-split-38.txt` sha1 `3e19bf497f76c76a3bf7e917ed55d6d046612de5`
- `targets-56.txt` sha1 `2cc87b952f1b892e6e578cad7c4b0b5b72c392cd`
- `png-b1-a1.jsonl` sha1 `e40db3b395de178ccb80bfc76accf12df1fa5dcc`
- `rec-b1-a1.jsonl` sha1 `da39a3ee5e6b4b0d3255bfef95601890afd80709`
- `cells-b1-a1.txt` sha1 `148ce8d50e3da711b7a1d754d11706b974ad1070`
- `records-b1-a1.txt` sha1 `a2b9f40a3bce1f37f222dfea6dcd35b05eeccc58`
- `b1-base-check.txt` sha1 `e7cdd056fae029966d412b7ee4f5ac8674d803f3`
- `a1-base-check.txt` sha1 `58da877727f3272ae98b14ec155c2a598c4df65b`
- `s1-base-check.txt` sha1 `78e98a548d070e09c425a34d43778308014d0140`

## Runs, power and load

| Group | UTC | Cells, reached | Power | Load median, peak | Samples at 8 or above |
| --- | --- | --- | --- | --- | --- |
| b1 | 02:25:12–02:45:57 | 102, 102 | AC Power, mode ? | 4.32, 7.8 | 0 of 42 |
| a1 | 02:48:05–03:08:46 | 102, 102 | AC Power, mode ? | 4.33, 8.08 | 1 of 42 |
| s1 | 03:10:24–03:12:19 | probe | AC Power, mode ? | 3.75, 3.94 | 0 of 4 |

## Before → after

Scenario cells: 102 before (102 reached), 102 after (102 reached); **9 unmoved**. Not on the other side: 0 after-only, 0 before-only.

| What moved | Cells |
| --- | --- |
| type: fail → pass | 93; across cells |

States probe: 243 readings before, 243 after; 243 unmoved.

## Notes

- **The change:** one declaration deleted, `line-height: var(--line-height-heading);` from `.promise-with-help .help-button` (`src/styles/app.css`), and one `it` added inside the VH-205 `describe` of `test/stylesheet.test.ts`. The after's diff hash is `f1db7eff73f12f1e`; its app paths' hash is `3b3d1adc7f842cbd` (`a1.base-check.txt`).
- **The base:** `a28086f`, VH-233's landing, on the orchestrator's ruling 1 (main moved twice since `73d16f0`, by VH-235 and VH-233; no package, Vite or walker change between; the walker reads `7db38f355f3c46c2` at both). The before was walked with `git diff --quiet a28086f -- src index.html public package.json package-lock.json vite.config.ts` true (`b1.base-check.txt`). The test file was edited during b1, outside the app's paths.
- **The cells:** S-141 to S-144's 102 keys as VH-203 walked them: its 64 grouped keys one driver run per VH-203 group (a3g2 12, a3g4 21, a3g9 31), its 38 split keys one run per key; 41 runs a side, every cell reached. VH-203's records (`vh203-a3-records-2026-11-08/`, `vh203-b-records-2026-11-08/`) are the finding's source, cited and never paired: the base reads as they did, `type` failing in 93 and passing in 9.
- **What moved, by outcome:** `type` alone, fail → pass in 93 cells; it passes in all 102 after, and no other instrument's or row's outcome moved (`cells-b1-a1.txt`). **By record** (`records-b1-a1.txt`), outcomes unchanged, passing both sides: `contrastText` and `measure` in 7 cells each, whose element and line texts carry the device check's estimate sentence ("about 30 seconds" or "about 20 seconds", the machine's speed at that moment); `ax` in 36, its saved tree's node ids and the estimate's names; `focus` in 3 (S-142 en-GB w1280 forced light, S-143 en-GB and ms-MY w1280 forced dark), the focused captures differing by 1 to 2 pixels, channel 3 at most, the focus readings equal; `motion` in 3, S-141's and S-142's observation durations, and S-143 en-GB w1280 reduced motion's rows 1 → 7 and exemptions 0 → 6, six 0 ms transitions on the "?" seen running in a1 only, none counted. The `reached` record differs in the same 7 cells only in that sentence.
- **Part C's 192 states and 3 outlined images (route 1),** by `format-help-c.mjs` byte for byte, each side: the 243 readings are equal field by field (`rec-b1-a1.jsonl` is empty): the "?"'s box, the `rows` reading (each promise's text span, the fourth's 17 px span not its row), the words' gap, the 44 px target's hits, the tip's place, the contrasts and each clip's origin and size. Of the 195 images 179 are the same pixels; 16 differ only in a column at most 7 px wide at the clip's right edge, the overlay scrollbar's thumb in another shade of its fade (largest channel difference 28; `png-b1-a1.jsonl`). No pixel of the "?", its words or its tip moved.
- **Why the glyph stays put:** in the 20 px square, centred by `align-items: center`, the glyph's line box grows from 17.5 px to 21 px and its half-leading with it, so the glyph's top stays at 10 px less half its content height either way.
- **The promise's row:** the fourth promise lies 24 px high at the 16 px root and 48 px at 32 px both sides, read from the w1280 closed clips, 72 and 96 px with the clip's 24 px above and below.
- **The scrolled shots (s1, after only):** the 52 states Part C clipped at the viewport's edge, and the 4 the image compare moved that were not among them (zh-Hans, w320, 16 px, focused, four modes): 56 states, 80 viewport tiles with 64 px of overlap, every state covered whole and re-read as named after each scroll (`s1.scroll.jsonl`), 14 labelled sheets (`s1.png.scroll-sheet-*`). They went to the owner for the look.
- **Load:** b1's peak 7.80 and s1's 3.94, none at 8; a1 had one sample at 8.08 (02:48:35Z, at its first run's start). The table's "median" is the bundler's upper middle sample; the even-sample medians are 4.30, 4.325 and 3.49. No reading this item rests on is a duration; the motion instrument's observation durations vary, as above.
- **Fixture:** S-143's `lecture-60s.mp4`, sha1 `f9b2439a7052131d…`, equal to VH-203's, not copied.
- **Sheets:** the sheets' HTML sources are kept with `.txt` added; route (1)'s images and sheets, and s1's tiles and sheets, are flat copies in each group's `png/`, as are the states copies `runs/format-help-states.jsonl`, all made after the walks from the groups' own files.

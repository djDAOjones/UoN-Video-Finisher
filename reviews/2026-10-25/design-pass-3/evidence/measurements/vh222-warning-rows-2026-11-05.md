<!-- markdownlint-disable -->
# VH-222: VH-155.2's, VH-156.1's and VH-158.1's rows that a warning, a failure or a record reaches, in Chrome, 1,285 cells on the Mac Pro, one walk serving both columns

VH-222's stage-rule measure, one page by `table-1page.mjs`. The records are in [`vh222-records-2026-11-05/`](vh222-records-2026-11-05/): each cell's outcomes and rows, the probes, states and logs whole, and in `detail/` the whole record of each moved or named failing cell.

## Provenance

| | Before | After |
| --- | --- | --- |
| Commit | `95d18eed5db1` | `95d18eed5db1` |
| Diff hash | `da39a3ee5e6b4b0d` (0 lines of status) | `da39a3ee5e6b4b0d` (0 lines of status) |
| Instrument revision | `9c52269607bccc4c` | `9c52269607bccc4c` |

- `proof5.conditions.txt` sha1 `a8767b7173e03f4fe2f8664287f93e46749019fe`
- `proof5.launcher.log.txt` sha1 `ee09a1bcfff6295b10ca7c30d31d4204551f5296`
- `proof5.load.log.txt` sha1 `8d149a344b7da9b077cc8ad0ce5158e10ee0219d`
- `proof5.vh222-ledger.jsonl` sha1 `74060f9047d66d0d87b8038a4dfbfb01b593a1c8`
- `proof5.vh222-probe-vh222-base-proof5-375.jsonl` sha1 `ded205cf78c380ecb1366b49f35a66d3f787d60a`
- `proof5.vh222-probe-vh222-base-proof5-fix.jsonl` sha1 `aa4cbd23aaaa5d63952c54d29c6771a3f2f527f6`
- `proof5.vh222-probe-vh222-base-proof5.jsonl` sha1 `d9494dbae409cc2d19b1be6f2fe825ce9cd7647c`
- `proof7.conditions.txt` sha1 `d7de6f24b46500908af07a5092c406af944e41ae`
- `proof7.launcher.log.txt` sha1 `d5f6f5a95cef77f95d9ab387cb0fbcc38d4e85ef`
- `proof7.load.log.txt` sha1 `c9527a5aacce0f96b00d2123764a301a7c8bb1fa`
- `proof7.vh222-ledger.jsonl` sha1 `9af50925fb2d0e0096f296553d595d04e7ddd369`
- `proof7.vh222-probe-vh222-base-proof7.jsonl` sha1 `ad43160b1e7e956624f3a23307c0c2e42aa1430b`
- `renamed.txt` sha1 `dcd18d8920c97d4b5d6c3a8c02679512e612e118`
- `vh222-arm-g1.zsh.txt` sha1 `eded199d5323e85521ff3027940047392fc5b10c`
- `vh222-arm-proof6.zsh.txt` sha1 `f2ee1d0128f459092c756f3fa7231e991454ed9d`
- `vh222-arm.zsh.txt` sha1 `e792379e6eabe941ec7ecfa60e5df45c52c188f7`
- `vh222-cite-vh199-2.json` sha1 `fee35d9753c14a8ff5cadea4855417aad524d03e`
- `vh222-cite.mjs.txt` sha1 `9423c4c5a7cf8035f42a252a60520658b93c262c`
- `vh222-cut-g1.txt` sha1 `6153afb3257e5408a6e5e6cd7e2b37bb6e49e85b`
- `vh222-cut-read.mjs.txt` sha1 `497e4d1b546b809b8eabc1c98b8632ecb9dd8891`
- `vh222-cut-tracks.mjs.txt` sha1 `4a9a4cc40c6229ff74f2c2770d51fedc8c4d4ce8`
- `vh222-diffkeys.mjs.txt` sha1 `953077601edbd5f94d8ea8a009620260e7748a7a`
- `vh222-driver.mjs.txt` sha1 `ebf764cc05f7d2c48f1384e8808d2cb56a514d83`
- `vh222-fix-4.sha.txt` sha1 `fdce923416c20c310d295e42793e9e45baa85288`
- `vh222-fix-4.zsh.txt` sha1 `3005e3489c5f54db9b7f14ec0b7fb76df76208e6`
- `vh222-go.sh.txt` sha1 `cd055e76f7f1e341f2ad868f91ab46998bd26f23`
- `vh222-keys-vh155.txt` sha1 `270060ea72183d6cffa23ac6c07d21b6249b743b`
- `vh222-keys-vh156.txt` sha1 `c468c96ea8848d0d5dfb677ae86a0175f34f0303`
- `vh222-keys-vh158.txt` sha1 `0cc9ccff23cd4117eaf9e0fbcbde4f3c61c25a77`
- `vh222-live-read.txt` sha1 `21b42f2340c84be047234bbabf3f1e876aaea210`
- `vh222-livesum.mjs.txt` sha1 `dc2e0d980a567742c47eed92562165aae1bc2e4b`
- `vh222-rows-read.txt` sha1 `56c97187b2524bea2bf5d9434540eb8cabd6aab6`
- `vh222-rows.json` sha1 `231734787a8330dfe230ef2d59507b47a0bc86c4`
- `vh222-rowsum.mjs.txt` sha1 `8b72e3b54124cd7fdb8cd52117a7faa1dfeebab3`
- `vh222-sum-g1.txt` sha1 `0705ac8a2341e5637015f3f3160e05c5743a7fbb`
- `vh222-sum-g2.txt` sha1 `150edcf92f9d040f26c056d0d26a5f2501506c87`
- `vh222-sum-g3.txt` sha1 `450d494a002c897db69d8f473faec999ac9f8137`
- `vh222-sum-g4.txt` sha1 `cab0a33cf395b4d1d2f65159b84a544be5bdb515`
- `vh222-sum-g5.txt` sha1 `070e2fe205f6f0a8470a4b7235891a4c01c9e666`
- `vh222-sum-g6.txt` sha1 `da8607c25a663930a18994d7db35a719cf6ee2c2`
- `vh222-sum-g7.txt` sha1 `4dfedb4a205a107de5c88b0c9d6d8faaa80a1b2c`
- `vh222-sum-g8.txt` sha1 `f13bb583b7c32055886a937b8aa927b48ca80d9b`
- `vh222-sum-proof5.txt` sha1 `6df9d1eb60c6b8a600c66a5157f79e031326f0d0`
- `vh222-sum-proof6.txt` sha1 `32d8034e407fd8b1dd14edd33f2dfdfe652137b2`
- `vh222-sum-proof7.txt` sha1 `32d8034e407fd8b1dd14edd33f2dfdfe652137b2`
- `vh222-sum.mjs.txt` sha1 `f56b42cf477b5506ee891cc58c1139351bd8ade8`
- `vh222-wait-seq-all.zsh.txt` sha1 `6f78939765ff07884a62b0e5ca61c72f79d17d35`
- `vh222-wait-seq.zsh.txt` sha1 `25b3755c159366a44e4cb09c66102b9afad4b92b`
- `vh222-walk.sh.txt` sha1 `9aa0eab5d9a660c220219de8f706c1e878b35b9f`
- `walk-queue-wait-seq.zsh.txt` sha1 `d1e0f151179d2e2fa40fd72992ac35c6b917eb70`

## Runs, power and load

| Group | UTC | Cells, reached | Power | Load median, peak | Samples at 8 or above |
| --- | --- | --- | --- | --- | --- |
| g1 | 06:38:52–07:02:59 | 81, 81 | AC Power, mode ? | 4.1, 5.23 | 0 of 49 |
| g2 | 12:00:37–12:18:33 | 162, 162 | AC Power, mode ? | 6.85, 9.84 | 4 of 36 |
| g3 | 13:12:50–14:22:50 | 118, 90 | AC Power, mode ? | 3.56, 10.33 | 1 of 140 |
| g4 | 14:34:41–14:55:00 | 180, 180 | AC Power, mode ? | 4.03, 5.45 | 0 of 41 |
| g5 | 15:58:42–16:42:24 | 216, 216 | AC Power, mode ? | 4.95, 7.89 | 0 of 88 |
| g6 | 16:50:24–17:05:41 | 240, 228 | AC Power, mode ? | 6.44, 9.48 | 5 of 31 |
| g7 | 18:00:01–18:19:29 | 108, 108 | AC Power, mode ? | 4.72, 6.39 | 0 of 39 |
| g8 | 19:05:55–19:44:54 | 180, 180 | AC Power, mode ? | 4, 6.68 | 0 of 78 |
| proof6 (set aside) | 09:08:14–09:24:27 | 2, 2 | AC Power, mode ? | 27.7, 32.58 | 31 of 33 |

## Before → after

Scenario cells: 1285 before (1245 reached), 1285 after (1245 reached); **1285 unmoved**. Not on the other side: 0 after-only, 0 before-only.

Nothing moved, row by row.

Failing alike on both sides, so not moved by this change:

| Instrument or row | Cells |
| --- | --- |
| focus | 444 |

Page probe, 1285 readings a side: nothing moved.

## Notes

- **One walk serves both columns.** VH-222 is a check item: its product diff (`src/`, `index.html`, `public/`) is empty at every walk (commit `95d18eed`, 0 lines of status, diff hash `da39a3ee5e6b4b0d`), so each group is paired with itself and "Nothing moved" says only that. The rows' readings are in `vh222-sum-<group>.txt`, the cut-short reading in `vh222-cut-g1.txt`, and row by row across groups in `vh222-rows-read.txt`. **The walker that made these records** is the worktree's at revision `9c52269607bccc4c` (95d18ee's), unchanged before and after; main's later walker (`14479eb`: VH-223's `matrix.mjs` key list and VH-221's S-155, neither used here) passed by the orchestrator's word and made none of them. The new IDs S-156 to S-169 and the cut fixtures live in the driver (`vh222-driver.mjs.txt`), outside the walker.
- **Rows and cells.** 41 rows: VH-155.2's 20, VH-156.1's 22 and VH-158.1's 2 (`vh222-rows.json`, from the three wish lines' commits, `vh222-keys-*.txt`), the three shared `result.endedEarly` rows counted once; 36 cells a row (1280, 375 and 320 px; en-GB, zh-Hans, ms-MY; light, dark, forced light, forced dark) = 1,476 row cells. **Mapped first:** 80 grid cells are cited from VH-199's records (the MacBook Pro, revision `2e7b0c04`), S-18, S-19, S-20, S-22, S-25a, S-25b, S-27 and S-89 9 each and S-24 8, named as VH-199's (MacBook Pro), outside the walked cells, and left out of the walks by `vh222-cite-vh199-2.json` (its 8 further records in other modes are not counted). **Walked on this Mac:** 1,285 scenario cells in g1 to g8, 1,245 reached.
- **Every row ends read.** 39 rows are read whole, in place and true of their state on this Mac; `vh222-rows-read.txt` gives each row's scenarios, groups and counts. The other two: `warnings.targetMissed.heading` is retired, a sentence the page no longer has (VH-50's decision of 2026-08-26 and `12f4dd4` removed its only call; `failure.outputLoudness.what`, read by S-163, stands in its place); `preflight.reasons.longJobUnknown` cannot be reached (the long-job band is always finite, `src/media/preflight.ts`), so it stays a wish line naming why. Splits by design, not missing readings (the sums' ABSENT counts come from their "expected in every cell of a scenario" rule): `warnings.decodeDamage.detail.one` shows in en-GB only, since zh-Hans and ms-MY have only the plural `other`, and S-167 reads en-GB's `other`; S-28 reads `noSourceDecodeHere` at 1280 and 320 px and `noSourceDecodeElsewhere` in the phone view at 375 px, as S-160 does; S-157 and S-160 are phone refusals, walked at 375 px only (12 cells each); **S-156's 12 cells at 375 px are not reached:** that is the walker's phone view, where S-156's state is false by design and the phone's refusal is S-157's, read 12 of 12. **S-24 is not reached here, 0 of 28, by this Mac's speed:** every cell estimates more than an hour (`veryLongJob`), so S-169, S-24's state on `still-6600s.mp4`, reads the `longJob` row, 36 of 36; S-24's 8 cited cells read it on the MacBook Pro.
- **The cut-short truth (VH-158.1) is VH-231's defect.** In g1, all 81 of 81 cells give a cut file's read length as its whole. In S-23 (the cut MKV before Create, 36 cells), the panel says "Duration 20 seconds" ("时长 20秒钟", "Tempoh 20 saat") beside the warning. In S-23s (that MKV finished, 9 light cells) and S-23w (the cut WebM finished, 36), the record says "the whole video (20 seconds)" or "(5 seconds)" in 45 of 45 cells, and the warning shows on no finished page. That is the fix item VH-231, raised from these readings and built on its own branch, not here. g1 is stated as read on `95d18ee`; it is re-read after VH-231 lands, on the orchestrator's word. The cut WebM before Create is VH-231's S-170, walked in VH-231's before and after; VH-222 adds no ID for it.
- **The feedback status at 320 px (17 cells).** In S-79a's 3 cells at 320 px in light, and S-79b's 14 (320 px in all four modes, and 375 px light in en-GB and ms-MY), `#feedback-status` is whole, inside the viewport's width and unbroken. But it runs past the visible area of `#feedback-dialog`, which is `overflow: auto` and as tall as the window less 32 px, so its last lines (the row) are reached by scrolling the dialog. The sums count these cells FLAWED by the probe's clip rule; Claude's reading is not a defect: 1.4.10 allows scrolling in one dimension, 4.1.3 is met by `role="status"` holding the whole message, and Nielsen 1 holds, the status shown at once and in place, its start in view. Whether the keyboard alone scrolls the dialog was not measured.
- **Proofs, outside the item's cells.** proof5 (`vh222-sum-proof5.txt`, `proof5.*`), 01:50:44–02:25:19Z: 66 cells, 62 reached. Every new ID qualified on this Mac in both layouts (S-157 and S-160 at 375 px) by VH-198's method; the control S-156:f17only was not reached, as expected; every group ID on a changed fixture reached 2 of 2, except S-24 (0 of 2, by speed). proof7 (`proof7.*`) is S-169's proof of record: 2 of 2, "about 35 minutes", the `longJob` row read. **proof6 is set aside:** this worker's own fixture making (ffmpeg, 16 threads) overlapped its walk, the load fell from 28.8 to 7.2, so its "about 40 minutes" bears no claim; its records are kept.
- **Fixtures.** This Mac's ffmpeg (9.0.2-tessus) changed 35 fixture sha1s from the MacBook Pro's list (`vh222-fix-4.sha.txt`, made by `vh222-fix-4.zsh.txt`); the three `endsearly-*` were remade by `vh222-cut-tracks.mjs.txt`; `still-6600s.mp4` is new (sha1 `a784c39e…`, S-169's). Each ID that reads a changed fixture was proved on it in proof5 before any group read it.
- **Load.** g2 peaked at 9.84 (4 samples at 8 or above), g3 at 10.33 (1), g6 at 9.48 (5); the rest stayed under 8. No claim rests on a timed reading under such a sample. g2's and g6's readings are text after analysis or set by a fault. g3's one sample (13:17:50Z) fell in S-24 zh-Hans w1280's setup, a cell not reached by speed, and g3 was accepted as read with no re-walk (Orchestrator #40). The timed rows (S-169's `longJob`, S-25a's and S-25b's `veryLongJob`) were read under no sample at 8 or above.
- **This Mac:** a 2019 Mac Pro (Xeon W-3223, x86_64, macOS 26.5.1), Chrome 157.0.8103.39 headless, Node 24.22.2. It ran on AC throughout; `pmset -g` prints no powermode line, so the table shows "mode ?" (#39's ruling). The MacBook Pro's groups (`vh222-walk/macbook-pro/`) are support only and not in this table (the owner's answer 1, PLAN-8 of 2026-11-05). Groups g1 to g7 ran `walk.sh` with WHO "VH-222 #5" (`3729c509`) and g8 with "VH-222 #6" (`9aa0eab5`, the copy here); nothing else differs.
- **Settled:** 32 px page shots show the default size (VH-217.5), so no visual approval rests on such a shot. `f.changedAny` moves by 1–2 px from run to run, and no claim rests on it alone. No row pinning the old order is among these cells' asserts. The walker's own instruments' outcomes in these cells are the pass's, not this item's claims. **`focus`, failing alike in 444 cells,** is the 2.4.13 ring reading on `#file-input` in the driver's IDs (S-156 to S-167 and S-161's variants). The ring is the same everywhere, 704 px² at 3:1. In the walker's own S-28 and S-106 it passes at every width against a 640 px² perimeter. In the driver's IDs the instrument takes the input's whole box (836, 251 or 196 by 52 px) as the perimeter, 3,536, 1,196 or 976 px². The page draws the same ring in both, so these fails follow the instrument's basis in the in-memory scenarios. They are not this item's claim, and no claim rests on them.
- **WCAG re-checked.** 1.4.10: none of the 1,285 page readings scrolls sideways, and each row reads whole at 320 and 375 px, the 17 feedback cells above apart (a vertical scroll inside the dialog). 2.4.6: the warnings' headings (`soundHeading`, `noAudio`, `clipping`, `metadataLost`, `cutShort`) name their topic in all three languages. 3.1.5: en-GB by the gate's reading-grade test; zh-Hans and ms-MY by Claude's plain-language reading, with no native reading. 3.3.1: not applicable, since these are conditions of the file, the browser or the job, not input errors; each is still said in text with what to do next (Nielsen 9). 4.1.3: each heading and failure is spoken through `#status`, `#source-status`, `#save-status` or `#feedback-status` (`role="status"`, polite) without focus moving; the detail lines are read on demand beside their spoken headings (UI-STANDARDS, System status); System check's AAC row is a table read when opened. A speech reading is a person's.

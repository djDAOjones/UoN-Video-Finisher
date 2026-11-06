<!-- markdownlint-disable -->
# VH-222 r1: group g9 adds the two Here browser refusals at 375 px, 24 cells on the Mac Pro, to the first table

VH-222's stage-rule measure, one page by `table-1page.mjs`. The records are in [`vh222-records-r1-2026-11-05/`](vh222-records-r1-2026-11-05/): each cell's outcomes and rows, the probes, states and logs whole, and in `detail/` the whole record of each moved or named failing cell.

## Provenance

| | Before | After |
| --- | --- | --- |
| Commit | `95d18eed5db1` | `95d18eed5db1` |
| Diff hash | `47a2c49b19299a60` (3 lines of status) | `47a2c49b19299a60` (3 lines of status) |
| Instrument revision | `6e7fd163e4f3d0bc` | `6e7fd163e4f3d0bc` |

- `proof8.conditions.txt` sha1 `4783030dc4575acb71dfe8090cda3cf1d78feddb`
- `proof8.launcher.log.txt` sha1 `813f46fa2209d42654f6a6cb706d0f7e0b4e68d5`
- `proof8.load.log.txt` sha1 `f2071ebe633fe30e3d240fb3b2ed5bcb9b937419`
- `proof8.vh222-ledger.jsonl` sha1 `25386f1f43e9e6b0543d8761b74a58682924112f`
- `proof8.vh222-probe-vh222-base-proof8.jsonl` sha1 `b56d204bca56bcaa707f1fb94d597a8e540d09d6`
- `renamed.txt` sha1 `f5c5d52781692a2afc432eea543b3da8da2a0ca8`
- `table-1page.mjs.txt` sha1 `fe9203451770e75559ee150bfb7ee9d6a2cba498`
- `vh222-cite-vh199-2.json` sha1 `fee35d9753c14a8ff5cadea4855417aad524d03e`
- `vh222-claude-g9.md.txt` sha1 `4aeab00d2ccfbbb14dcbda1c99ebde74d7480909`
- `vh222-codex-g9-brief.md.txt` sha1 `5d5566979ee1417da6247929216202c2ea126b53`
- `vh222-codex-g9.md.txt` sha1 `4f19d7e94a286eaf72386e3cf59b4642fad1cb10`
- `vh222-driver.mjs.txt` sha1 `ebf764cc05f7d2c48f1384e8808d2cb56a514d83`
- `vh222-g9-compare.md.txt` sha1 `6f7b99e943f9fadcf9f3662b0c85ac902b7517f4`
- `vh222-go.sh.txt` sha1 `cd055e76f7f1e341f2ad868f91ab46998bd26f23`
- `vh222-rows.json` sha1 `231734787a8330dfe230ef2d59507b47a0bc86c4`
- `vh222-sum-g9.txt` sha1 `ffe7b2406801d3a61cfbf306dd414b365210f23c`
- `vh222-sum-proof8.txt` sha1 `b971323259ea9316004dc4648c3cfdfbab5b4934`
- `vh222-sum.mjs.txt` sha1 `f56b42cf477b5506ee891cc58c1139351bd8ade8`
- `vh222-walk.sh.txt` sha1 `3c1489354327ff4a84fa0f362f2b07dd4b910592`
- `vh222-walker-s173-s174.diff.txt` sha1 `47a2c49b19299a607f045467ea291a9066cdcaa0`
- `walk-queue-wait-seq.zsh.txt` sha1 `d1e0f151179d2e2fa40fd72992ac35c6b917eb70`

## Runs, power and load

| Group | UTC | Cells, reached | Power | Load median, peak | Samples at 8 or above |
| --- | --- | --- | --- | --- | --- |
| g9 | 23:27:17–23:28:47 | 24, 24 | AC Power, mode ? | 6.4, 6.5 | 0 of 4 |

## Before → after

Scenario cells: 24 before (24 reached), 24 after (24 reached); **24 unmoved**. Not on the other side: 0 after-only, 0 before-only.

Nothing moved, row by row.

Page probe, 24 readings a side: nothing moved.

## Notes

- **What this page is.** r1 adds group g9 to the first table, `vh222-warning-rows-2026-11-05.md` (g1 to g8, 1,285 scenario cells, 1,245 reached), which stands as placed and is not rewritten. g9 walks the 24 cells the first table left without a reading: `preflight.reasons.noAacEncodeHere` and `preflight.reasons.noSourceDecodeHere` at 375 px, in en-GB, zh-Hans and ms-MY, in light, dark, forced light and forced dark. Across both pages: 1,309 scenario cells, 1,269 reached; the two `Here` rows are now read at 1280, 375 and 320 px.
- **Why the 375 px cells needed new scenarios.** The walker's 375 view sets a phone user agent (`qualify.mjs`, `setViewport`), so `blockContextFor` (`src/ui/preflight-panel.ts`) gives the `Elsewhere` sentences there: S-156 is not reached at 375 px and S-28 reads `noSourceDecodeElsewhere` (first table). On the orchestrator's word, on VH-221's S-155 precedent (a desktop user agent at 375 px), two IDs were added: **S-173** (S-156's setup, F17 and F22 with `lecture-30s.mp4`) and **S-174** (S-28's `prores-1080p.mov`). Each restores the browser's own desktop user agent after the view is set; the state asks `!M.phone()`, no phone token in the user agent, and the `Here` sentence in `#source-status` (S-173 with the `chromeLacks` remedy). The condition is emulated: headless Chrome 157 on macOS with the 375 view's mobile metrics and five-point touch kept and the desktop user agent restored, so the page classes it as Chrome on a computer (`userAgentData.mobile` false); not a physical phone or a real narrow window.
- **Which walker made which records.** The first table's records (g1 to g8, proof5 to proof7): walker revision `9c52269607bccc4c`. This page's records (proof8, g9): **`6e7fd163e4f3d0bc`**, the same walker plus S-173 and S-174 in `scenarios.mjs` (+24 lines after S-28, `vh222-walker-s173-s174.diff.txt`, whose sha1 is the diff hash in each group's `conditions.txt`). Both are `fixOnly`, as S-149a to S-149f: S-173 applies F22, the item's fault defined in memory by `vh222-driver.mjs` (not in `faults.mjs`; reused, no new fault ID), so the pass's own plans must not take them. All 35 `PLANS` entries are the same before and after; the named gaps (`GAPS`) gain the two lines "only at w375". The product is the base, `95d18eed5db1`, with no product diff; the commit row's diff hash is the walker's.
- **Qualified by VH-198's method (proof8, outside the item's cells):** on the base at 375 px, the IDs' only layout, en-GB, light: S-173 and S-174 each reached 1 of 1; the controls with the view's phone user agent read the other branch (S-156 not reached, its page saying `noAacEncodeElsewhere` with `tryChrome`; S-28 reads `noSourceDecodeElsewhere`). proof8 qualifies the user agent's restoration; F22's necessity rests on proof5's control (S-156:f17only, F17 alone, not reached 0 of 2). S-173 runs by `vh222-driver.mjs` only; `fixOnly` keeps it out of the plans but does not make it runnable without F22.
- **The readings.** 24 of 24 reached; each row read 12 of 12 (`vh222-sum-g9.txt`): shown in the status span (`#source-status`, `role=status`, polite, the whole message) and the visible `#source-block` body (5 lines in zh-Hans, 6 in en-GB, 7 in ms-MY), unclipped, no Latin word broken, no sideways scroll, and inside the viewport's width: the probe's `inside` tests the left and right bounds only, here and in the first table. Vertically, in 20 of the 24 cells part or all of the visible body lies below the first 812 px screen (S-173 en-GB 716–842, zh-Hans 884–989, ms-MY 977–1124; S-174 588–714, 780–885, 825–972 px), in the page's flow after the chosen file's panel and reached by scrolling the page; the first table's 375 px phone-view cells (S-157, S-160) and 320 px cells (S-28) sit the same. Not clipped, not hidden, announced whole: no defect, by Claude and Codex both. The status span's `self-x` clip is the visually-hidden technique. The probe's resolved reading of `noAacEncodeHere` stops at the remedy's first full stop, an instrument limit (the first table's notes); Codex's full-text check found all 24 visible bodies equal to the language table's string, the whole `chromeLacks` remedy ("… Update Chrome, or ask whoever manages the computer." and its zh-Hans and ms-MY forms) included. Every walker instrument reads 0 failing; `focus` reads 0 here because S-173 and S-174 name the file button as the walker does.
- **WCAG and Nielsen, for these cells:** 1.4.10, no sideways scroll at 375 px (the 320 px condition for these rows is S-156's and S-28's, in the first table); 2.4.6, the block's heading names the state; 3.1.5, the wording is the language table's, the reading level and the native reading a person's check, as is the speech; 3.3.1, the refusal names the cause in text; 4.1.3, the whole message in the polite status. Nielsen 1 ("status visible and announced") and 9 ("errors say what next") hold: each refusal says what to do.
- **Load and power:** AC throughout (this Mac prints no power-mode line). proof8 started at loads 5.37 and 6.63, g9 at 4.44 and 6.16, peak 6.50, no sample at 8 or above. No reading here depends on timing.
- **Not on this page:** g1 is re-read after VH-231 lands (group g1r, by the next worker); the first table states g1 as read on `95d18eed5db1`. The cited cells and the rest stand in the first table's notes; the feedback status at 320 px is VH-232's, a fix item by the orchestrator's ruling after that table.
- **The before and after columns** are one walk on the base, each group paired with itself, as in the first table; "Nothing moved" says only that.
- **Checks:** Claude's g9 reading (`vh222-claude-g9.md.txt`, saved 23:30:10Z) and Codex astra's blind reading from its brief (`vh222-codex-g9-brief.md.txt`; answer `vh222-codex-g9.md.txt`, verbatim, "PASS with notes", opened 23:32:10Z), compared in `vh222-g9-compare.md.txt`, all in this page's records: agreed, no defect; Claude conceded "inside the viewport" as width only.

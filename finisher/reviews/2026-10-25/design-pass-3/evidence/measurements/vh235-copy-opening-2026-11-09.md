<!-- markdownlint-disable -->
# VH-235's before and after: Copy's result only in the opening that started it

VH-235's stage-rule measure, one page by `table-1page.mjs`. The records are in [`vh235-records-2026-11-09/`](vh235-records-2026-11-09/): each cell's outcomes and rows, the probes, states and logs whole, and in `detail/` the whole record of each moved or named failing cell.

## Provenance

| | Before | After |
| --- | --- | --- |
| Commit | `73d16f085fc2` | `73d16f085fc2` |
| Diff hash | `da39a3ee5e6b4b0d` (1 lines of status) | `867c8580445d3bd9` (8 lines of status) |
| Instrument revision | `7db38f355f3c46c2` | `7db38f355f3c46c2` |

**Differs between groups:** diff hash: da39a3ee5e6b4b0d, 867c8580445d3bd9, b11f3bd30099844d, 3f02c76f6f6634b6.

- `keys.mjs` sha1 `e41045a4be15f8e9345ca4f7200e3851accecb97`
- `mx.mjs` sha1 `cb4be7e3c4345d32c5a63ce9d8ca4c8786d80464`
- `late.mjs` sha1 `21b85ae6f35a0e0782269f3189e62d80d2b9c783`
- `late-sum.mjs` sha1 `09bd4df7a7870e255f73b413b555153728f7f40f`
- `late-b1-a1.txt` sha1 `b942d85c4c3da304b544e2bb40fa71f0ec8779b8`
- `late-b1.jsonl` sha1 `5d30ead4c9b01c47ca105d799e305c3f383b9b5e`
- `late-a1.jsonl` sha1 `88cd37f34769bc15b4d4c41e7fac59113b7ade5f`
- `go.sh` sha1 `d0959104a60bc26011569d76937b25d3f956c969`
- `walk.sh` sha1 `5d3fff583a582b19a4bf6ce73ee85bca977d5bfe`
- `mx78.mjs` sha1 `ea8f563e40d4893b9457e5b4dd349be9feaef2c9`
- `raw78.mjs` sha1 `673450072024e4b25d4d22c1bbbac58c9a001062`
- `raw78-sum.txt` sha1 `a37917feaf891bfb1c845abd220b71cb829b6d77`

## Runs, power and load

| Group | UTC | Cells, reached | Power | Load median, peak | Samples at 8 or above |
| --- | --- | --- | --- | --- | --- |
| b1 | 00:20:36–00:28:17 | 45, 45 | 6.41 5.75 AC Power, 6.23 5.70 AC Power, 7.06 6.02 AC Power, 8.52 6.58 AC Power, 10.95 7.53 AC Power, 13.26 8.48 AC Power, 14.72 9.17 AC Power, 17.58 10.40 AC Power, 19.29 11.27 AC Power, 20.74 12.07 AC Power, 22.29 12.94 AC Power, 23.86 13.83 AC Power, 22.17 13.56 AC Power, 20.35 13.20 AC Power, 18.59 12.81 AC Power, 17.36 12.56 AC Power, mode ? | 24.68, 36.91 | 14 of 16 |
| a1 | 00:40:47–00:47:27 | 45, 45 | 4.44 7.14 AC Power, 4.75 7.16 AC Power, 4.36 6.93 AC Power, 4.52 6.90 AC Power, 4.41 6.78 AC Power, 4.46 6.71 AC Power, 4.27 6.56 AC Power, 4.03 6.40 AC Power, 3.82 6.24 AC Power, 3.76 6.13 AC Power, 3.73 6.04 AC Power, 3.77 5.97 AC Power, 3.71 5.87 AC Power, 4.03 5.91 AC Power, mode ? | 3.49, 4.92 | 0 of 14 |
| b2 | 00:59:19–01:01:06 | 12, 12 | 4.31 5.02 AC Power, 4.21 4.96 AC Power, 4.09 4.89 AC Power, 4.16 4.89 AC Power, mode ? | 4.04, 4.49 | 0 of 4 |
| a2 | 01:01:24–01:03:11 | 12, 12 | 4.34 4.92 AC Power, 4.21 4.85 AC Power, 4.12 4.80 AC Power, 4.07 4.76 AC Power, mode ? | 4.14, 5.04 | 0 of 4 |

## Before → after

Scenario cells: 57 before (57 reached), 57 after (57 reached); **57 unmoved**. Not on the other side: 0 after-only, 0 before-only.

Nothing moved, row by row.

## Notes

- **Four groups, two pairs.** `b1` → `a1` is the whole walk (45 matrix cells and 36 late-route cells a side); `b2` → `a2` re-walks S-78k's 12 at low load on both sides (the orchestrator's ruling after Codex's blind check, below), and **S-78k is read from `b2` → `a2`**; `b1` → `a1`'s twelve are kept in the records, their outcomes alike. The before groups are on the base's source, the after groups on the candidate's. `b1`: commit `73d16f0`, diff hash `da39a3ee5e6b4b0d`, 1 line of status (the item file). `a1`: tracked diff hash `867c8580445d3bd9` (`src/main.ts`, `src/workers/job.worker.ts`, `src/config/thresholds.ts`, `src/ui/reveal-status.test.ts`), with the new `src/ui/feedback-opening.ts` (sha1 `4feaf82b`), `src/ui/feedback-opening.test.ts` (`848869d2` when walked) and `src/config/thresholds.test.ts` (`e240ca61`) untracked, 8 lines of status. `b2`: the candidate's source set aside whole and restored after (`git diff --quiet 73d16f0 -- src index.html public package.json package-lock.json vite.config.ts` true and no untracked file under `src/` at 00:54:32Z), the ledger and the first table in place, so its whole diff hash is `b11f3bd30099844d` with 10 lines of status. `a2`: the same source as `a1` (`src/` diff hash `867c8580445d3bd9` restored), the ledger and the first table in place: `3f02c76f6f6634b6`, 17 lines. Each before was walked with that `git diff --quiet` check true. Walker revision `7db38f355f3c46c2` in all four; the same drivers, `keys.mjs` (`e41045a4`), `mx.mjs` (`cb4be7e3`; `mx78.mjs`, `ea8f563e`, the same with S-78k's 12 keys only), `late.mjs` (`21b85ae6`), and `go.sh` (`d0959104`); `walk.sh` line 10 only, WHO "VH-235 #1" (`eb34ed49`, `b1`) or "VH-235 #2" (`5d3fff58`, `a1`, `b2`, `a2`). AC Power throughout, no powermode line on this Mac.
- **Load.** `b1` sampled 14 of 16 loads at 8 or above, peak 36.91, the siblings' set-up beside it. The orchestrator's ruling: `b1` stands as the before, since its readings are states, not timings, the defect shows as the item predicts, and a late result's delay is the stand-in's (the driver settles it), not the machine's; the after starts only with the 1- and 5-minute loads below 8, and a reading that moves outside the change's expected moves is re-walked both sides at low load. `a1` started at 3.19 and 4.44, none of its 14 samples at 8 or above, peak 4.92. `b2` started at 4.49 and 4.31, peak 4.49; `a2` at 5.04 and 4.34, peak 5.04; none of their 4 samples each at 8 or above. The Power column lists each sample's 5- and 15-minute loads before "AC Power", because `go.sh` here logs all three averages; the median, peak and count of 8 or above are the 1-minute load's. The median column is the script's upper-middle sample of an even count; the conventional medians, the mean of the two middle samples, are 23.35 (`b1`), 3.42 (`a1`), 3.975 (`b2`) and 3.915 (`a2`).
- **"Nothing moved, row by row"** compares each cell's outcomes and assertion rows, not every raw reading. The raw readings are read beside it: `raw78.mjs` (`67345007`) flattens each S-78k record (times, paths and run ids excepted) and `raw78-sum.txt` lists the fields that differ, pair by pair.
- **S-78k, the reopen, 12 a side, and the job estimate.** The page behind the dialog shows the preflight's "This should take about …" estimate, a timing reading of the device check, which the change does not reach. It varies between runs on identical source: `b1` → `b2`, both on the base's source, moves it in all 12 ("about 1 minute" under `b1`'s load, "about 20 seconds" or "about 30 seconds" at low load), with the accessibility-tree hash and, in most, the mutation and page hashes; `a1` → `a2`, both on the candidate's source, moves the same kinds of hash (accessibility nodes, mutations, page bytes). `b2` → `a2`: the estimate equal in 11 of 12; in zh-Hans at 375 px it reads "30 seconds" before and "20 seconds" after, within that variance; the rest differ only in those hashes. The orchestrator's ruling: alike. The outcomes and rows of all 12 are equal each side, in `b1` → `a1` and in `b2` → `a2`.
- **The matrix, 45 a side** (S-80a and S-80b 12 each, S-78k 12, S-76 9), all reached, all unmoved row by row: Copy in the same opening written and revealed as before, the reopen, the status empty at each opening.
- **The late route, 36 cells a side in `b1` and `a1`, all reached** (`late.mjs`, a driver route outside the walker, in memory; the reader `late-sum.mjs`, `09bd4df7`, its output `late-b1-a1.txt`, both in the records with each side's `late.jsonl` as `late-b1.jsonl` and `late-a1.jsonl`). Copy's `writeText` is replaced through CDP after the setup and before the click by a stand-in whose promise is held, the step is taken, and the promise is then resolved or rejected. Each cell's JSONL line holds snapshots read before and after the settle and at the next opening, not a trace of every mutation.
  - **Qualification, 12 a side:** in the same opening, the stand-in's resolved and rejected texts equal the real clipboard's under F5 granted and denied, in full, in each language, both sides; one warn on each failure, none on success, alike.
  - **The before, the defect:** after Close and after Escape the late "Copied…" or "Could not copy…" is written into the closed dialog (`open` false, the live region ignored in the accessibility tree, focus on `#feedback-open`) and emptied, unread, at the next opening; after a close and reopen it is written into the new opening (role status, polite, not ignored; focus on `#feedback-message`), the dialog growing by the line (560 to 581 px, 536 to 557 px in zh-Hans) at 1280 px.
  - **The after, 18 of 18:** the text after the settle equals the text before it (empty): nothing written, into the closed dialog or the new opening; the next opening empty; one warn on each failure, none on success. The only fields that moved are the after-settle text (18) and, in the six reopen cells, the open dialog's `scrollHeight` and `clientHeight`, 581 back to 560 (536 in zh-Hans; the line not added). 0 moves not expected.
  - **Same opening, focus moved by the user, 6:** unmoved: written, focus kept on `#feedback-message`; at 320 px the reveal scrolls 83 to 252, 59 to 237 and 107 to 276 (en-GB, zh-Hans, ms-MY) each side.
- **WCAG, from the readings:** 2.1.1, Copy, Close and the reopen pressed by pointer and Escape by key, by the same controls and key each side; no keyboard-only walk is claimed. 2.4.3, the focused element identical each side in every cell. 3.2.1 and 3.2.2, no new change of context: a late result writes into no opening that did not ask for it. 4.1.3, the same `<p class="status" role="status" aria-live="polite">`, its text by `textContent`, the result exposed in the accessibility tree only in the opening that pressed Copy. No speech reading was made, and none is claimed.
- **Not walked:** the `1000` (`MADE_LENGTH_LOG_ROUNDING_SCALE`, the release guard's warn line in the job worker): a log's precision, which no state shows; `src/config/thresholds.test.ts` pins the constant and both uses. `job.worker.ts`'s other `/ 1000` (the analysis pass's `wallSeconds`) is unchanged: wish VH-235.1.
- **Tests:** `npx vitest run` in the worktree on the walked candidate, 88 files, 1,738 passed, 1 skipped, against the base's gate, 86 files, 1,721 passed, 1 skipped; the one skip is the standing one, `test/ebu3341/tech3341.test.ts:124`, EBU cases 7 and 8 (VH-27). After the walks, Codex's blind check asked for one test more, that a late failure is logged before the opening is asked about: added to `src/ui/feedback-opening.test.ts` (`848869d2` to `d746a64d`, 16 tests there), a test only, so nothing was re-walked. The 18 more than the base are the new tests, 16 in `feedback-opening.test.ts` and 2 in `thresholds.test.ts`. The close's gate is in the commit's `Verify:` line.
- **Cited, never paired:** VH-232's table (`vh232-feedback-status-2026-11-06.md`, its S-80a and S-80b) and VH-203's records. Their re-reads after the landing are the orchestrator's word.

<!-- markdownlint-disable -->

# VH-236: Codex astra's re-check after the close check's must

You are Codex astra, reviewing read-only. Write nothing to any file. Re-check the close of VH-236 before its one commit, in your own reading.

**The checkout** is `/Users/uazjob/UoN-Video-Helper-side/vh236` (your working directory), on `side/vh236`, base `1f7fc66794203b06cef8918b7dce63a152c06e1e` (VH-235's landing). **Your close check** froze the close at `/Users/uazjob/UoN-Video-Helper-side/vh236-frozen/`; its answer was "Commit after the musts", with one must (point 1): the qualification in the item's close note and the Disposition row too. **The fresh freeze** is `/Users/uazjob/UoN-Video-Helper-side/vh236-frozen-r1/` (`diff.binary`, `status.txt`, `untracked.sha1`), taken after gate 2.

**What changed since your close check, all of it:**
1. **The must.** The qualification is in the item's close note (`project/items/VH-236.md`, its Notes line of 2026-11-09), the Disposition row (`reviews/2026-10-25/design-pass-3/design-pass-3-2026-10-27.md:759`) and the decision's Rationale (`project/decisions.md:31`), in the orchestrator's words: "All 52 outcome classifications unchanged; the refusal text changed in 43 cells, the item's change, the first sentence kept byte for byte; the nine S-32 controls unchanged".
2. **The table, remade on Orchestrator #46's rulings.** The placed page (`5684ade4`) and its records were set aside whole outside the repository (`/Users/uazjob/UoN-Video-Helper-side/vh236-table-set-aside-1/`, 30 sha1s matched after the move). Its records did not equal their sources lines: `table-1page.mjs` named each run's `manifest.json` and `run.json` by its group alone, so of b1's 25 runs and r1's 25 only the last of each survived, 96 of 124 lines differing. The page was made again from the same walk folder by `vh236-walk/table-bundle.mjs` (VH-203's bundler, `a69215ce`, `table-1page.mjs`'s reading unchanged, each record named by its group and run), the same pairs and sources, its notes `vh236-walk/vh236-3-table-notes.md.txt` (the earlier notes with two lines first: the orchestrator's headline sentence above, and the page's generation). `vh236-walk/check-bundles.mjs` (VH-203's `check-bundles-20.mjs` with the records folder given) reads 124 records, 0 differences (`vh236-walk/check-bundles-3.out`). The decision's Rationale and the commit message name the remake.
3. **Added in the evidence folder:** your close pair, `vh236-codex-close-brief-2026-11-09.md` and `vh236-codex-close-2026-11-09.md.txt`, sha1-equal to their sources.
4. **Gate 2,** after all of the above: `zsh vh236-2-gate.zsh 2` by the walk queue, 02:23:35–02:25:05Z, exit 0: 89 test files, 1,774 passed and 1 skipped (the standing EBU cases 7 and 8), build and the docs and ledger checks passing (`/Users/uazjob/UoN-Video-Helper-side/vh236-2-gate-2.log`). `node tools/check.mjs`: 0 failures, the same two warnings your close check accepted.

Nothing else changed: no product file or test since the close freeze (compare the two freezes' `diff.binary`).

**The owner's words:** "Yes, all six" (2026-11-08 ~23:03Z), point 6: "The false "You can still set the times" (VH-214.2): a fix item that drops that sentence when step 1 refuses, removing words only"; "ensure everything passes UX / design / Accessibility" (2026-10-27).

**Check, numbered, each with its evidence:**
1. Is the must met: the qualification in the item's close note, the Disposition row and the decision, true to the table and the readers' outputs?
2. The remade table: is its reading the placed one's (compare the set-aside page and records with the new), its records each equal to its sources line and to its source in `vh236-walk/`, its headline's sense stated in its notes, and the remake recorded truly in the decision?
3. Is the difference between `vh236-frozen/` and `vh236-frozen-r1/` exactly the wording, the remade table and records, and the close pair, with nothing outside this item?
4. Gate 2 and the checker: green, no test deleted or skipped beyond the standing EBU cases 7 and 8?
5. Anything that should stop the commit.

**You may read** anything in the checkout, `/Users/uazjob/UoN-Video-Helper-side/vh236-frozen/`, `/Users/uazjob/UoN-Video-Helper-side/vh236-frozen-r1/`, `/Users/uazjob/UoN-Video-Helper-side/vh236-table-set-aside-1/`, `/Users/uazjob/UoN-Video-Helper-side/vh236-2-gate-2.log`, `/Users/uazjob/UoN-Video-Helper-side/vh236-codex-close.md` and `/Users/uazjob/UoN-Video-Helper-side/vh236-walk/`. **You may not read** any folder under `side-session-notes/`, nor in `/Users/uazjob/UoN-Video-Helper-side/` `vh236-progress.md`, any `vh236-handover-*` file, or any `vh236-*brief*` file but this one.

**Answer** with a verdict line first (commit, commit after the musts, or do not commit), then each point, numbered.

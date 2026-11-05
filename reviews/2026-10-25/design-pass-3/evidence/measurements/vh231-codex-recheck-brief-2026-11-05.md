<!-- markdownlint-disable -->

# Re-check: VH-231's raise after the close check's repairs (read-only)

You are re-checking, read-only, the repairs made after your close check. Do not edit, stage or commit anything. Answer in the file you are writing to, beginning with one line `Verdict: <Commit | Commit after repairs | Do not commit>`, then numbered points marked **must** or **should**, each naming file and line.

## Where
- Worktree: `/Users/uazjob/UoN-Video-Helper-side/vh231`, branch `side/vh231-plan`, base `95d18eed5db1ae56d1fe6512053bad714357d899` (HEAD). The candidate is the uncommitted working tree. The tracked diff is unchanged since your close check (diff hash `03166c8f5fddcded`). The only file changed since then is the untracked `project/items/VH-231.md`, now sha1 `81fed25897aedfff84d1e25449e7e8512d941d55`, which was `3b0a4ac09f921df543bc0951b8c2fd627fa3e0d3` when you checked it.
- Your close check's brief is `/Users/uazjob/UoN-Video-Helper-side/vh231-codex-close-brief.md`, and your answer is `/Users/uazjob/UoN-Video-Helper-side/vh231-codex-close.md` ("Verdict: Commit after repairs"). The brief's reading rules still hold: you may read what it allows, and you must not read what it forbids. You may also read this brief.

## What was repaired, point by point
1. **must, trimmed cut-source readings.** The item's stage rule adds the trimmed cut files: the cut MKV and the cut WebM with the start or the end moved, before Create and finished, their IDs the orchestrator's at the build, qualified as S-170 is. It notes that VH-215's S-23 variants set no trim (`vh215Job`, `scenarios.mjs`, `:3508`–`:3529`). The readings now say "the trim line trimmed and untrimmed".
2. **must, proof5's claim narrowed.** The Notes line now says the sum gives the cells reached and the strings read. The readings come from proof5's six S-23 records, as VH-222's progress notes read them in their "cut-short truth" line.
3. **should, re-reads.** The searched files are now named: the four item files, and the side folder's `vh220-progress.md`, `vh221-progress.md` and `vh223-progress.md`. The conclusion is qualified: every change acts only on a file said cut short, and none of their cells is a cut file, so their readings stay the same. A cut file added later would be re-read. The line also no longer claims that g1 reads the trim line.
4. **should, the Verify line.** The commit's Verify line will state the gate as "1,663 passed, 1 standing skip (EBU cases 7 and 8)", not zero skips.
5. **should, keep the rest.** Nothing else was changed.

One further change was made: a backticked folder path in the proof5 line was read by the checker as a missing local path, so it is now plain words. `node tools/check.mjs` now gives 0 structural or budget failures and 1 warning: `VH-122.md`'s `samples/CULT2011.mp4`, which is missing in a worktree and present in the owner's checkout. `git diff --check` passes. The full gate (`npm run check`) will run again on this exact tree, under the walk lock, before the commit.

## Points to judge
1. Does each repair answer its point fully and truly? Is any repaired line now false or untestable?
2. Does the trimmed-files criterion stay inside the raise: no new string, element or `docs/` line, the IDs left to the orchestrator, and the walker unchanged unless the criteria name the plan?
3. Has anything else changed against your close check? Use `git diff` and the sha1s above.
4. Is there anything that would make the commit's `Verify:` or `Checked:` line untrue?

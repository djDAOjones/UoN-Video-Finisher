<!-- markdownlint-disable -->

# VH-221 — Codex astra's re-check brief, after the close check

You are Codex astra, re-checking read-only the close of item VH-221 of the UoN Video Finisher, from the repository at the current directory (a worktree on `side/vh221`). Change nothing. This re-check covers the points your close check failed or left open, and everything added since that check's freeze.

**The candidate** is the working tree against HEAD `95d18eed5db1ae56d1fe6512053bad714357d899` (the base), frozen afresh at `/Users/uazjob/UoN-Video-Helper-side/vh221-frozen-r1/`: `tracked.diff` (`git diff --binary`, hash `3e03bd6835f81ac6`, 9 files), `status.txt` and `untracked.sha1.txt` (344 files). Check that the tree still matches it. Your close check's freeze is `/Users/uazjob/UoN-Video-Helper-side/vh221-frozen/` (`d7dc1eb91aad60a0`, 171 untracked files).

**Your close check** (`vh221-codex/close.md`, from `vh221-codex/close-brief.md`; copied verbatim into the measurements folder as `vh221-codex-close-2026-11-05.md.txt`): FAIL, the row evidence passing (its points 4 and 5), with these to correct:
1. Coverage overstated as "1280, 375 and 320 px in four modes" in the decision, the trajectory line and the item, and the `-r1` table's notes saying each scenario was walked at w320.
2. The speech-check remainder with no ledger line, and the Deferred line.
3. The map's provenance: the input revision and invocation, and the three COUNT MISMATCH lines on the candidate walker preserved or explained.
6. The review copies' equality to their originals, and the owner's-words line references, unverifiable from the permitted reads.

**What changed since that freeze:**
- **Tracked, record wording only:** the decision, trajectory line and item's Notes now say "at 1280 and 375 px in four modes and at 320 px in light"; wish VH-221.1 added (the status rows heard with a screen reader, in each language); the decision names VH-153.1, VH-221.1 and VH-105.2 as the person checks and keeps `Deferred: none`, because the checker's graph takes item IDs only (a wish ID there failed it); the item's Notes, the decision and the report's Disposition row now link `vh221-browser-rows-r3-2026-11-05.md`; the decision's evidence clause names the repairs.
- **Untracked, added:** `vh221-browser-rows-r2-2026-11-05.md` and `vh221-records-r2-2026-11-05/` (after your close check: the 320 px cells described exactly; the map re-run on the base walker `9c52269607bccc4c` and the candidate `c27c325ffc8c3b6f`, outputs `vh221-map-base.out.txt` and `vh221-map-candidate.out.txt`, its invocation in the notes); `vh221-browser-rows-r3-2026-11-05.md` and `vh221-records-r3-2026-11-05/` (after Claude's reading of the close found `-r2`'s sentence on the three count differences inexact: the plans compared key by key by `vh221-plandiff.mjs.txt`, output `vh221-plandiff.out.txt`); your close brief and answer and the close compare, copied into the measurements folder. The first table, `-r1` and `-r2` stay as placed; every table rests on the same walk.
- **Not changed:** no product file, no protected path, the walker's one change (S-155 in `scenarios.mjs`) as before.

**The gate since:** `npm run check` exit 0 in this worktree, 14:28:56Z–14:30:26Z, run after every change above: 84 files, 1,663 passed and the 1 standing skip (EBU cases 7 and 8); on AC; load 5.29 and 4.64 (1- and 5-minute) at the start, samples 5.29, 4.03 and 4.55 (`/Users/uazjob/UoN-Video-Helper-side/vh221-gate-2.load.log`), all below 8; the canon checks' 8 warnings the same as gate 1's. `node tools/check.mjs`: 0 failures, 1 warning (VH-122's `samples/CULT2011.mp4`: by the orchestrator's ruling worktree-only, since `samples/` is gitignored and absent from this worktree and the owner's checkout reads 0 warnings).

**The owner's words,** verbatim, with their lines in `/Users/uazjob/UoN-Video-Helper-side/plan8-owner-words.md` (446 lines, sha1 `7c7b1169…`): "Gateless covers the rest of Phase 8: …" (:185); "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" (:275); "Yes, leave them" (:366); "Yes, move it" (:369); "yes" (:375); "just powered back up. gateless run where possible" (:395). Their answers of 2026-11-05 are the PLAN-8 entry in `project/decisions.md`.

**Check:**
- Points 1, 2, 3 and 6 above: each now answered, or what still fails, with file and line.
- `-r3`'s notes against its records and both walkers: the count differences' cause, the map's keys, the 267 cells. The base walker is at `/Users/uazjob/UoN-Video-Helper-side/vh221-walk/base-walker-95d18ee/`, a `git archive` of the walker folder at the base (compare it with `git show 95d18eed:<path>` if you wish); the candidate walker is this worktree's.
- Each review copy in the measurements folder against its original (below): sha1-equal, or differing by the provenance header alone (`<!-- markdownlint-disable -->` and a blank line).
- The owner's quotations in the decision against the file's lines.
- Everything added since the first freeze: true against the records, in scope, and following `AGENTS.md` rules 4 to 6 and each ledger file's grammar comment; no product or protected path (`project/rules.md`, `samples/`, `docs/`) touched.

**You may read:** the repository at the current directory; in `/Users/uazjob/UoN-Video-Helper-side/`: `vh221-frozen/`, `vh221-frozen-r1/`, `vh221-gate-1.log`, `vh221-gate-1.load.log`, `vh221-gate-2.log`, `vh221-gate-2.load.log`, `vh221-walk/` (not `macbook-pro/`), `vh221-codex/*.md`, the originals `vh221-claude-design.md`, `vh221-codex-design-brief.md`, `vh221-codex-design.md`, `vh221-design-compare.md`, `vh221-claude-verdict.md`, `vh221-codex-compare.md` and `vh221-codex-close-compare.md`, and lines 185, 275, 366, 369, 375 and 395 of `plan8-owner-words.md`; this brief. **Never read:** any folder under `/Users/uazjob/Library/Application Support/Claude/side-session-notes/`; in `/Users/uazjob/UoN-Video-Helper-side/`, `vh221-progress.md`, `vh221-handover-*`, `vh221-wip-*`, `vh221-commit-draft*`, any other item's files, or any brief but those named here.

**Answer** as: a verdict line (PASS, PASS WITH NOTES or FAIL), then each point with its evidence, then what must change before the commit, if anything.

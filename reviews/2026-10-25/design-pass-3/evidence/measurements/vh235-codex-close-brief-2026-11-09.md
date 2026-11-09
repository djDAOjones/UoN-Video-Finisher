<!-- markdownlint-disable -->

# VH-235: the close check

You are Codex astra, reviewing read-only. Say what you find, in your own reading. You are given no other reviewer's reading. Write nothing to any file.

**The close.** The checkout is `/Users/uazjob/UoN-Video-Helper-side/vh235` (your working directory), on `side/vh235`, base `73d16f085fc2bda8a76c79263b67d3034262aa78`, nothing committed or staged. The complete close is frozen in `/Users/uazjob/UoN-Video-Helper-side/vh235-frozen/`: `tracked.diff` (`git diff --binary` against the base), `status.txt`, `untracked.list`, `untracked.sha1.txt` and copies of the untracked files, `base-sha.txt`. The checkout should equal the freeze; say if it does not. The commit message to be made is drafted in `/Users/uazjob/UoN-Video-Helper-side/vh235-commit-msg.txt`; its `{CLOSE}`, `{VERIFY}` and `{CHECKED}` are placeholders filled after this check and the last gate.

**What every earlier check said:**
- The design: Claude's and your blind design agreed, "Build as designed below" (`reviews/2026-10-25/design-pass-3/evidence/measurements/vh235-design-compare-2026-11-09.md`, your answer `vh235-codex-design-2026-11-09.md.txt`).
- The verdict: Claude's "Commit, at the close"; your blind check "Commit after the musts below" (`vh235-codex-blind-2026-11-09.md.txt`), musts 1 to 3 and a should adopted; your recheck "Commit" (`vh235-codex-recheck-2026-11-09.md.txt`); the compares in `vh235-codex-compare-2026-11-09.md`. All in the measurements folder beside the table.
- The gate: `npm run check` by the walk lock in the checkout on the frozen tree, its result in `/Users/uazjob/UoN-Video-Helper-side/vh235-walk/gate1.out` and `gate1.load.log`. `node tools/check.mjs`: 0 failures, 1 warning (VH-122's `samples/`, absent from a side worktree).

**Read:** the freeze; `git diff 73d16f085fc2bda8a76c79263b67d3034262aa78` and `git status` in the checkout; every untracked file; the ledger: `project/items/VH-235.md`, the VH-235 entry in `project/decisions.md`, `project/backlog.md`, `project/trajectory.md`, `project/wish-list.md`, `project/archive-index.md`, `project/decisions-2026-10.md`, and the Disposition row in `reviews/2026-10-25/design-pass-3/design-pass-3-2026-10-27.md`; the table, its records and the review copies in the measurements folder; `/Users/uazjob/UoN-Video-Helper-side/vh235-walk/` (the groups, logs, drivers, readers, `gate1.*`); the commit message draft; `AGENTS.md`, `project/profile.md`, `project/rules.md`, the digests named; your own earlier answers. You may run `node tools/check.mjs` in the checkout; nothing that writes.

**Do not read:** any folder under `side-session-notes/`, or `/Users/uazjob/UoN-Video-Helper-side/starts/`. In `/Users/uazjob/UoN-Video-Helper-side/`, do not read `vh235-claude-*`, `vh235-*compare*`, `vh235-progress.md`, `vh235-handover-*`, or any `vh235-*brief*` but this one. (The copies of Claude's design and verdict and of the compares inside the checkout's measurements folder are part of the close; you may read them.)

**The owner's words:** "Yes, all six" (2026-11-08 ~23:03Z), point 4: "The problem report's late "Copied" (VH-232.2): a fix item so a Copy result shows only in the opening that started it."; point 5: "the 1000 moves into `src/config/` with the next code change."; "ensure everything passes UX / design / Accessibility" (2026-10-27); "Here on the Mac Pro (Recommended)"; "Gateless covers the rest of Phase 8: approve VH-197's plan and every later choice on the sessions' recommendations; only stop for me on something the recommendations don't settle". No new or changed user-facing string, `docs/` line, element or control is approved.

**Settled, do not reopen:** the design of record; the walker at `7db38f355f3c46c2`; the late route; the orchestrator's rulings on b1's load and on S-78k ("alike").

**Answer each:**
1. Is the freeze the complete close, and does the checkout equal it?
2. The contract (`AGENTS.md`), rules 4 to 10, against the ledger: the decision (heading, Decision, Rationale with the owner's words, Supersedes, Deferred); deferrals as lines (VH-235.1); the backlog line struck, one trajectory line, VH-232.2 and VH-203.4 retired with traces; the item's Now and Notes; the Disposition row; the archive move; the digest rules named.
3. Does every claim in the commit message draft, the decision and the item follow from the diff, the records and the reviews? Is anything overstated or missing?
4. Is any user-facing string, element, CSS, `docs/` line or file outside the item's list changed?
5. Anything else that should block the commit.

**Verdict:** one of "Commit", "Commit after the musts below", or "Do not commit". Give musts, shoulds and notes apart, each with its evidence. Write nothing to the repository.

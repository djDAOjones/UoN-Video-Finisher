<!-- markdownlint-disable -->

# VH-233 — Codex astra's re-check after the close check (brief)

You are Codex astra, the project's read-only reviewer, re-checking VH-233's close after your close check ("Commit after the musts below"). You are run from the worktree `/Users/uazjob/UoN-Video-Helper-side/vh233`, on `side/vh233`, at base `73d16f085fc2bda8a76c79263b67d3034262aa78`, the candidate uncommitted in its working tree. Change nothing. Write nothing to any file. No network.

**What you may read:** the worktree you are run in; the freezes `/Users/uazjob/UoN-Video-Helper-side/vh233-frozen/` (before your close check) and `/Users/uazjob/UoN-Video-Helper-side/vh233-frozen-r1/` (now: `tracked.diff`, `status.txt`, `untracked.sha1.txt`, `staged.diff`, `base.txt`); and, read only, in `/Users/uazjob/UoN-Video-Helper-side/`: the draft commit message `vh233-commit-msg.txt`, the gates' logs `vh233-3-gate-2.*` and `vh233-3-gate-3.*` (by tail or search), and `vh216-3-brief.md` line 173 only. Your close brief and answer and the close compare are in the worktree's measurements folder, dated 2026-11-09. **Read nothing else outside the worktree:** no other checkout or worktree, no other side-folder file, never `vh233-progress.md`, `vh233-handover-*` or `vh233-wip-*`, and never any folder under `Library/Application Support/Claude/side-session-notes/`.

## What changed since your close check

Between `vh233-frozen/` and `vh233-frozen-r1/` the tracked diff is identical (`0ac0c878…`); the untracked files differ only by:

1. `project/items/VH-233.md` (ed51fd7b → fc4b27f3): your must 1. The Open question now says "every other instrument's outcome unchanged (the motion instrument's detail in two cells, in the Notes)".
2. Added in the measurements folder: your close brief `vh233-codex-close-brief-2026-11-09.md` (a98ed9dc, the side-folder brief byte-equal) and your answer `vh233-codex-close-2026-11-09.md.txt` (9e1a9373, verbatim); and the close compare `vh233-codex-close-compare-2026-11-09.md` (401d4b60).

Outside the repository: `vh233-commit-msg.txt`, your must 2: "Its must 1 (the motion instrument's detail) is in the decision and the item, its should (the ring tight to the ink) in the decision". `Verify:` and `Checked:` stay to be filled at the commit, from the final gate and from your verdict here.

**Your must 3 is not adopted**, settled by the rule: `vh216-3-brief.md:173`, which the item's brief cites for these copies, says "each Codex answer verbatim as `.md.txt`, with nothing added"; the absolute-link bar there is for the `.md` copies, which `docs:links` checks. In the main checkout's measurements folder 37 of the 126 committed `.md.txt` answers hold absolute links (VH-208's, VH-213's, VH-215's, VH-218's, VH-220's to VH-225's, VH-229's, VH-231's, VH-232's and VH-235's). The close brief's "no absolute link" for every copy was the brief's error. The blind answer stays verbatim.

**Your must 4:** gate 2 (01:46:57Z–01:48:28Z) exited 0 but sampled 8.24 and 8.54. Gate 3, by the queue on exactly `vh233-frozen-r1/`, before this re-check: 02:05:32Z–02:07:02Z, AC Power, start load 2.83 (1-min) and 3.49 (5-min), samples 2.83, 3.69 and 4.53, none at 8 or above, its START line showing diff `0ac0c878eca530a4` with 23 status lines; exit 0: 86 test files, 1,723 passed and the 1 standing skip, none deleted or skipped; markdownlint 0 issues in 704 files; links 0 broken in 759; check-memory 0 structural; `node tools/check.mjs` 0 failures, 1 warning (VH-122's `samples/`); after it the worktree's tracked diff and untracked sha1s equal `-r1`'s. A gate after this re-check, on `-r1` plus this brief and your answer, is the commit's `Verify:`.

## Answer each

1. Is the worktree exactly `vh233-frozen-r1/`, and does it differ from `vh233-frozen/` only as listed above?
2. Musts 1 and 2: met?
3. Must 3: is the rule read rightly, and is keeping the blind answer verbatim right? If you still hold it a must, say what in the rule or record requires it.
4. Must 4 and gate 3: is gate 3 a settled, green run on `-r1` (its START line's diff hash, its load samples)?
5. The close compare: true to your close answer and to the record?
6. Anything else that should block the commit.

Close with one verdict line, as you would want it quoted in the commit's `Checked:` line: "Commit", "Commit after the musts below", or "Do not commit", with any musts, shoulds and notes apart.

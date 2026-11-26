<!-- markdownlint-disable -->

# VH-237 — re-check of the repaired candidate

You are Codex astra, reviewing read-only. Say what you find, in your own reading. Write nothing to any file.

**The checkout** is `/Users/uazjob/UoN-Video-Helper-side/vh237` (your working directory), on `side/vh237` at `8bbb6e92c3f42e9e1e11bbd7d87db8a14e73f1e5`, still origin/main. **The candidate** is everything uncommitted there, as in your close check, with two changes since its freeze (`/Users/uazjob/UoN-Video-Helper-side/vh237-frozen/`): (1) your three musts repaired in the VH-237 decision's Rationale in `project/decisions.md`: the probes "proved on the base and kept proved (p0's 16 states, b1's 192 and a1's 192, 0 failing in each)"; "`measure` 24, the box narrowed and rewrapped, one line longer in 10"; "`ax` 65, the InlineTextBox entries changed in 24 as the box rewrapped, no other role or name changed"; (2) your close check's brief and verbatim answer added in `reviews/2026-10-25/design-pass-3/evidence/measurements/` as `vh237-codex-close-brief-2026-11-09.md` and `vh237-codex-close-2026-11-09.md.txt`. The new freeze is `/Users/uazjob/UoN-Video-Helper-side/vh237-frozen-r1/` (`diff.patch`, `status.txt`, `untracked.sha1.txt`); the checkout must equal it.

**The gate:** `npm run check` in the checkout on this content, gate 2 by the queue under the walk lock, 16:17:0xZ–16:18:23Z on 2026-11-09, exit 0, AC Power, start load 2.97 3.19, sampled peak 3.78, none at 8 or above: 1,778 passed, 1 skipped (EBU, standing); markdownlint 0 issues in 749 files; links 0 broken in 804 files; check-memory 0 structural; `node tools/check.mjs` 0 failures, 1 warning (`samples/CULT2011.mp4`, standing). Its log: `/Users/uazjob/UoN-Video-Helper-side/vh237-walk/gate-2.out` with `gate-2.load.log`.

**The owner's look** is pending with them, as your close check judged it honestly recorded.

**Read:** what you need of the candidate; the two freezes; your close answer (the copy above). **Do not read:** any folder under `side-session-notes/`; in `/Users/uazjob/UoN-Video-Helper-side/`, `vh237-progress.md`, `vh237-handover-*` or `vh237-wip-*`.

**Answer each:**
1. Are your three musts repaired faithfully, each statement now supported by the records, and is the commit draft's same wording consistent (`/Users/uazjob/UoN-Video-Helper-side/vh237-commit-msg.txt`, its placeholders aside)?
2. Does the tracked diff differ from the first freeze's only by those three statements, and the untracked files only by the close pair?
3. Is the gate green on this content, no test deleted or skipped, and does the checkout equal the new freeze?

**Verdict:** one of "Commit", "Commit after the musts below", or "Do not commit", leaving aside only the owner's answer. Give musts, shoulds and notes apart, each with its evidence. Write nothing to the repository.

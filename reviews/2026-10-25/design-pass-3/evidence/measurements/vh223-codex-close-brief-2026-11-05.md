<!-- markdownlint-disable -->

# VH-223 — Codex astra's close check brief

You are Codex astra, checking the complete close of item VH-223 of the app UoN Video Finisher, read-only, from the repository at the current directory (the worktree `/Users/uazjob/UoN-Video-Helper-side/vh223`, branch `side/vh223`), before its commit. The candidate is the whole working tree against HEAD `95d18eed5db1ae56d1fe6512053bad714357d899` (= origin/main): `git diff` for the tracked changes and `git status --porcelain=v1` with `git ls-files --others --exclude-standard` for the untracked files. The freeze is `/Users/uazjob/UoN-Video-Helper-side/vh223-frozen/` (`tracked.patch`, diff hash `90761325ba699d6f`; `status.txt`, 19 lines; `untracked.sha1.txt`, 133 files): the tree must match it.

**The item:** `project/items/VH-223.md`, a check of VH-172.1's batch A, 108 matrix keys with no after-reading. A check item: no product diff unless it finds a defect, and a defect becomes a fix item before VH-203.

**The change, as your blind verdict saw it:** only `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/matrix.mjs`, the exact key list `--keys <file>` (one `recordKey` per line), walker revision `9c52269607bccc4c` to `e377132ba6f70227`, qualified by `proof-keys.out.txt`; VH-224 is to pass its own 106 keys as `node matrix.mjs matrix --keys <file>`, unchanged. Nothing in `src/`, `test/`, `index.html`, `docs/` or the tokens changes.

**The evidence, placed before your blind verdict and unchanged since:** the table `reviews/2026-10-25/design-pass-3/evidence/measurements/vh223-matrix-a-2026-11-05.md` and its records `vh223-records-2026-11-05/`, all walked on the owner's Mac Pro.

**Added since your blind verdict:**
- In `vh223-records-2026-11-05/`: the 16 record sources (`.mjs`, `.zsh`, `.sh`, `.log`) renamed in place to `<name>.txt`, contents and sha1 unchanged, so eslint and markdownlint read no record; `renamed.txt` lists them and the copies below. The table names each by its run name and sha1.
- In the measurements folder, dated 2026-11-05, each sha1-equal to its source: the design pair (`vh223-claude-design`, `vh223-codex-design-brief`, `vh223-codex-design` as `.md.txt`, `vh223-design-compare`) and the verdict pair (`vh223-claude-verdict-mp`, `vh223-codex-blind2-brief`, `vh223-codex-blind2` as `.md.txt`, your blind answer verbatim, `vh223-verdict-compare-mp`). The design pair was written on the MacBook Pro by VH-223 #1; the verdict pair on the Mac Pro.
- `project/backlog.md`: VH-223's line struck.
- `project/wish-list.md`: VH-223.1 (S-24's 15 keys, not reached because of this Mac's speed) and VH-223.2 (the trim thumbs' and track's 1.4.11, a person's reading).
- `project/trajectory.md`: one VH-223 line under Phase 8.
- `project/items/VH-223.md`: Now, Open question and a 2026-11-05 Notes line. The wish lines are named there without their numbers, because the checker reads item files on disk as history and flags a new wish's number already named in one.
- `project/decisions.md`: the 2026-11-05 VH-223 entry, newest first, Deferred none; `tools/archive.mjs` moved the oldest entry (2026-10-25, VH-194) to `project/decisions-2026-10.md`, indexed in `project/archive-index.md`.
- `reviews/2026-10-25/design-pass-3/design-pass-3-2026-10-27.md`: the Disposition row for the owner's old issues links VH-223 and its table.
- VH-172.1 is left as written, for VH-224 to narrow.

**What the earlier checks said:** your design check and its compare (the copies above); your blind verdict, "Pass with conditions for the walker change; VH-223 is not ready to close", with its conditions (point 10). The verdict compare took them: the counts kept apart (108 attempted, 93 reached, 89 structurally whole), the `.gitignore` provenance line, the player row as VH-199.1's instrument, no blanket pass. It settled your labels and the pilot's count by the design rule and `fixturesFor`, and your S-66 point by its records' times, all below load 8. Orchestrator #40 ruled: S-66's three stand, and the re-walks are rewalk-a5 (15) and rewalk-a6t (12), each identical to its first walk; S-43 ms-MY and S-49 en-GB are "read against the load logs, no timing claim rests on them"; S-24's 15 are recorded as not reached because of this Mac's speed, with nothing changed; the new IDs are VH-223.1 and VH-223.2 alone, and S-03's `formatTip` gap is held by VH-216.1 with no new line. These rulings are in the table's notes and the decision, listed for the owner.

**The owner's words** (`plan8-owner-words.md`, quoted): "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" (2026-10-27; group B holds this item); "Yes, leave them" (2026-10-30, the rows pinning the old order); "Gateless covers the rest of Phase 8" (2026-10-25); "gateless run where possible" (2026-10-31); "no, I want all of the walks and checks on the other mac. just deploy here" (2026-11-04); "Re-walk here (Recommended)" (2026-11-05). The owner's pronouns are unrecorded: the record says "the owner" and "they".

**The gate:** `npm run check` in the worktree, under the walk lock, its log `/Users/uazjob/UoN-Video-Helper-side/vh223-gate-1.log` with `vh223-gate-1.load.log` beside it and the wait log `vh223-walk/gate-1.wait.log` (power, load and the lock's times); then `node tools/check.mjs`. Gate 1 ran on the frozen candidate: green, 84 test files, 1,663 tests passed and the 1 existing EBU skip; started 11:43:43Z at 1- and 5-minute loads 4.90 and 4.59 on AC Power, 4 load samples, peak 6.38, none at 8 or above; markdownlint 0 issues, links 0 broken, check-memory 0 structural with the frozen canon record's 8 warnings, `node tools/check.mjs` 0 failures and 1 warning (below). The base's last gate (VH-225 commit 2, `ca093da`) had 84 test files, 1,663 tests passed and the 1 existing EBU skip; `95d18ee` differs from it only in `tools/`, `verbs/`, `AGENTS.md`, `project/` and `.gitignore`. The checker's one warning, `project/items/VH-122.md: local path missing … samples/CULT2011.mp4`, is the worktree's: `samples/` is gitignored and absent here, and the same checker reads 0 warnings in the owner's clone at `95d18ee`, where it exists.

Read what you need of the repository, the freeze, the gate files, the walk folder `/Users/uazjob/UoN-Video-Helper-side/vh223-walk/` (its `macbook-pro/` folder is the MacBook Pro's earlier walk, support only) and the owner's words `/Users/uazjob/UoN-Video-Helper-side/plan8-owner-words.md`, read-only. Never read any folder under `side-session-notes/`; in `/Users/uazjob/UoN-Video-Helper-side/` read nothing else: not `vh223-progress.md`, `vh223-handover-*`, `vh223-wip-*`, `starts/`, any other brief or any `vh223-claude-*` or `*compare*` file there (their copies in the measurements folder are part of the candidate), and no other item's files.

Answer each, citing file and line:

1. Does the tree match the freeze, and does it hold only this item's files?
2. Is each acceptance criterion of `project/items/VH-223.md` met, met with a stated shortfall, or rightly left to a named later line?
3. Were your blind verdict's conditions (point 10) met, or settled by the compare and the orchestrator's rulings as stated above?
4. The ledger, by each file's grammar comment and the contract (`AGENTS.md`, rules 4 to 6 and 8): the decision (newest first, its fields, the owner's words with sources, the shortfall), the wish lines (format, numbers, each claim checkable), the trajectory line, the backlog strike, the item's Now and Notes, the archive move, and the digest rules named: wcag-2.2-aaa 1.4.3, 1.4.6, 1.4.10, 1.4.11, 2.4.7, 2.4.13 and 2.5.5.
5. Are the evidence copies sha1-equal to their sources, the renames contents-unchanged, and is any claim in the record not borne out by the table or records?
6. Is the gate green with no test deleted or skipped, and did it start below load 8 on the 1- and 5-minute loads?
7. Is VH-224's interface, `node matrix.mjs matrix --keys <file>`, as the walker change and the record state it?

End with a verdict: pass, pass with conditions, or fail, and the short list of what must change before the commit. Be concrete and brief.

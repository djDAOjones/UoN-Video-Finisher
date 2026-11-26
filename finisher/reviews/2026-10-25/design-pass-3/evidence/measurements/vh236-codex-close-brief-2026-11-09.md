<!-- markdownlint-disable -->

# VH-236: Codex astra's check of the complete close

You are Codex astra, reviewing read-only. Write nothing to any file. Check the complete close of VH-236 before its one commit, in your own reading.

**The checkout** is `/Users/uazjob/UoN-Video-Helper-side/vh236` (your working directory), on `side/vh236`, base `1f7fc66794203b06cef8918b7dce63a152c06e1e` (VH-235's landing). **The frozen close** is `/Users/uazjob/UoN-Video-Helper-side/vh236-frozen/` (`diff.binary`, `status.txt`, `untracked.sha1`): the tracked diff `git diff 1f7fc66794203b06cef8918b7dce63a152c06e1e` (`src/main.ts`, `test/screen-text.test.ts`, `project/backlog.md`, `project/decisions.md`, `project/decisions-2026-10.md` and `project/archive-index.md` by `tools/archive.mjs`, `project/trajectory.md`, `project/wish-list.md`, the Disposition row in `reviews/2026-10-25/design-pass-3/design-pass-3-2026-10-27.md`) and the untracked files: `src/ui/preview-refusal.ts`, its test, `project/items/VH-236.md`, the table `reviews/2026-10-25/design-pass-3/evidence/measurements/vh236-refusal-words-2026-11-09.md`, its records `vh236-records-2026-11-09/`, and beside them the design and verdict files, briefs, answers and compares (`vh236-*-2026-11-09.md` and `.md.txt`).

**What every earlier check said:** Codex astra's blind design check "Build as designed below"; Claude's verdict "pass", with a point on the table's "52 unmoved" headline; Codex astra's blind check of the candidate "Pass with points — the scoped fix is sound. Correct the evidence summary and the unsupported speech claim before close; the close gate and ledger obligations remain outstanding." Both are in `vh236-verdict-compare-2026-11-09.md`. Since then: the helper's header comment no longer claims anything about speech (a comment only; nothing re-walked); the placed table is not rewritten (a remake is the orchestrator's ruling), and the decision, the item and the Disposition row carry the wording "all 52 outcome classifications unchanged, the refusal text changed in 43 cells, nine controls unchanged"; the ledger written; the gate and checker results are in `/Users/uazjob/UoN-Video-Helper-side/vh236-2-gate-1.log` and below.

**The owner's words:** "Yes, all six" (2026-11-08 ~23:03Z), point 6: "The false "You can still set the times" (VH-214.2): a fix item that drops that sentence when step 1 refuses, removing words only"; "ensure everything passes UX / design / Accessibility" (2026-10-27). The orchestrator's rulings: that one sentence in three languages, the first kept byte for byte, nothing else; S-29 covered, no read-failure code; wish VH-236.1 for two further cases, not built.

**Check, numbered, each with its evidence:**
1. Did either earlier point remain unresolved, or is the resolution of the table point (ledger wording, table as placed) acceptable for the close?
2. The ledger by the contract (`AGENTS.md`): rule 4, the decision newest first with a Decision and a Rationale quoting the owner's words; rule 5, VH-236.1 one line in `project/wish-list.md`, VH-214.2 retired; rule 6, the backlog line struck, one trajectory line, the item's Now true; rule 8, the digest rules named (nielsen 1 and 9, wcag-2.2-aaa 4.1.3). Is every claim in them true to the diff and the evidence?
3. Is the frozen product diff the one walked (tracked `src/` and `test/` as in the blind check, the helper changed in its comment only), and is anything in the freeze outside this item?
4. The gate and `node tools/check.mjs`: green, no test deleted or skipped beyond the standing EBU cases 7 and 8? The checker's two warnings (VH-122's `samples/` path, absent in a worktree; VH-236.1 "reuses a number", the checker matching this item's own file): acceptable?
5. Anything that should stop the commit.

**You may read** anything in the checkout, `/Users/uazjob/UoN-Video-Helper-side/vh236-frozen/`, `/Users/uazjob/UoN-Video-Helper-side/vh236-2-gate-1.log` and `/Users/uazjob/UoN-Video-Helper-side/vh236-walk/`. **You may not read** any folder under `side-session-notes/`, nor in `/Users/uazjob/UoN-Video-Helper-side/` `vh236-progress.md`, any `vh236-handover-*` file, or any `vh236-*brief*` file but this one.

**Answer** with a verdict line first (commit, commit after the musts, or do not commit), then each point, numbered.

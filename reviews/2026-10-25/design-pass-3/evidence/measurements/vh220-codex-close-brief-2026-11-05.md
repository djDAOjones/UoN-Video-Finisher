<!-- markdownlint-disable -->

# VH-220 — Codex astra's close check

You are checking, read-only, VH-220's complete close before its one commit on `side/vh220`. VH-220 is a check item with no product diff. Write your answer as Markdown. Its **first line** is one sentence: your verdict ("pass", "pass with conditions", "fail" or "cannot say") and why. Then answer each point below as met, not met or cannot say, with the file and line or record that shows it. Say plainly if anything needs more than a change of record wording.

## What the close is

- **The worktree** you run from: `/Users/uazjob/UoN-Video-Helper-side/vh220`, branch `side/vh220`, HEAD the base `95d18eed5db1ae56d1fe6512053bad714357d899`. The walker is `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/` at revision `9c52269607bccc4c`.
- **The freeze:** `/Users/uazjob/UoN-Video-Helper-side/vh220-frozen/`: `tracked.diff` (`git diff --binary` against the base), `status.txt` (`git status --porcelain=v1`) and `untracked.sha1.txt` (a sha1 for every untracked file). Check that the worktree matches it.
- **The tracked diff is the ledger alone:** `project/backlog.md` (VH-220's line struck), `project/trajectory.md` (one line), `project/wish-list.md` (wish VH-220.1), `project/items/VH-220.md` (Now and two Notes lines), `project/decisions.md` (the closing decision, newest first), `project/decisions-2026-10.md` and `project/archive-index.md` (`tools/archive.mjs` moving the oldest entry verbatim), and `reviews/2026-10-25/design-pass-3/design-pass-3-2026-10-27.md:759` (the Disposition row's link).
- **The untracked evidence,** in `reviews/2026-10-25/design-pass-3/evidence/measurements/`: the first page `vh220-states-2026-11-05.md` with `vh220-records-2026-11-05/` (115 files); the r1 page `vh220-states-r1-2026-11-05.md` with `vh220-records-r1-2026-11-05/` (151 files, 22 under `detail/`); and eight Codex and Claude files named `vh220-*-2026-11-05.md` or `.md.txt`.

## The item and the owner's words

- `project/items/VH-220.md`, its acceptance criteria in full; the states in `project/items/VH-150.md:48–54`.
- The owner's words, verbatim, in `/Users/uazjob/UoN-Video-Helper-side/plan8-owner-words.md`: `:275` "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" (group B holds this item); `:185` "Gateless covers the rest of Phase 8: …"; `:366` "Yes, leave them"; `:369` "Yes, move it"; `:375` "yes" (the side-by-side run); `:395` "gateless run where possible"; `:425` "no, I want all of the walks and checks on the other mac. just deploy here"; `:438` "Re-walk here (Recommended)".
- The orchestrators' rulings, as rulings: #38, no new fault, F3 with the in-memory `S-31:recheck`, its three conditions (the proof on both layouts; a dated Notes line in the item on why no new fault was needed, the closing decision carrying the ruling as the orchestrator's; the table naming the variant, its driver sha1 and the one revision). #39, before-fixproof as the fixtures' proof and the launcher's power condition. #40, S-115 counted 6 + 15 = 21, the 15 walked one setup per mode, and wish VH-220.1. #41, the two variants `S-115:afterCreate` and `S-90b:langAfter` (group gv), which read ok and pass with no load sample at 8 or above, so no defect, no fallback and no further wish; the decision is to say they settle the blind check's disagreement on R2-2 and R2-1.

## What every earlier check said

- **The design check:** `vh220-codex-design-2026-11-05.md.txt`, compared in `vh220-design-compare-2026-11-05.md` with Claude's design reading `vh220-claude-design-2026-11-05.md`.
- **The verdict:** Claude's, `vh220-claude-verdict-2026-11-05.md`: pass, no defect. Your blind check, `vh220-codex-blind-2026-11-05.md.txt` (brief `vh220-codex-blind-brief-2026-11-05.md`): "Fail: the evidence reaches all 144 conditions, but does not demonstrate the second job's immediate progress reset, …". The compare, `vh220-codex-compare-2026-11-05.md`, lists what was agreed, what each alone raised, the two disagreements and three repairs for the successor.
- **The follow-up:** group gv and the r1 page, whose notes carry the three corrections and gv's readings.
- **The gate and checker:** gate 1, `npm run check` in the worktree on the frozen tree, 2026-11-05 17:57:58–17:59:58Z: exit 0, 84 test files, 1,663 passed and the 1 standing skip (`test/ebu3341/tech3341.test.ts:124`), docs:lint 0 issues, docs:links 0 broken; AC Power, loads 6.17 and 7.55 at the start, peak 6.17, none at 8 or above. `node tools/check.mjs`: 0 failures, 1 warning, `project/items/VH-122.md`'s `samples/CULT2011.mp4`, absent from this worktree because `samples/` is gitignored (worktree-only by Orchestrator #40's ruling).

## Answer each

1. **The blind check's points:** do gv's records and the r1 page settle R2-2's reset instant and R2-1's change of language? Are its three Codex-only notes (the five fixture proofs of cited keys, the player row's two items, `detail/`) applied?
2. **The criteria:** is each met now, "Every row ends read" and "Linked" among them?
3. **The ledger,** by `AGENTS.md` rules 4, 5, 6 and 8 and each file's grammar comment: the backlog line, the trajectory line, wish VH-220.1 (is its claim about VH-199's matrix plan and `scenarios.mjs:2283` true?), the item's Now and Notes, the decision (the owner's words quoted with sources; #38's ruling as the orchestrator's and the premise corrected for the owner; #40's and #41's rulings; both verdicts as given; the digest rules named: nielsen, "status visible and announced" and "errors say what next"), the archive move, the Disposition row.
4. **Every number and statement** in the ledger against the records and the r1 page.
5. **The copies,** by sha1 alone, without opening the sources: the answers verbatim, `vh220-codex-design-2026-11-05.md.txt` `8c25018a…` and `vh220-codex-blind-2026-11-05.md.txt` `9056ea0b…`; each other file its source with only a two-line provenance header added, so `tail -n +3 <copy> | shasum` gives the source's sha1: `claude-design` `acecae1e…`, `codex-design-brief` `4758a33c…`, `design-compare` `941aea92…`, `claude-verdict` `4e3e0d4e…`, `codex-blind-brief` `8b61389a…`, `codex-compare` `0a1921e8…`.
6. **Nothing else:** no product diff, no `docs/` edit, no protected path, no dependency change, no new fault, scenario or walker change.

## What you may not read

Any folder under `/Users/uazjob/Library/Application Support/Claude/side-session-notes/`. In `/Users/uazjob/UoN-Video-Helper-side/`: `vh220-progress.md`, `vh220-handover-*`, `vh220-claude-*`, `vh220-*compare*` and every `vh220-*brief*` except this file; their committed copies in the worktree's measurements folder are part of the close and may be read. Write nothing anywhere except your answer.

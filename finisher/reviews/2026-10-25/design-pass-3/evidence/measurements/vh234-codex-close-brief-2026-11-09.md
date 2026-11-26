<!-- markdownlint-disable -->

# VH-234: close check of the complete candidate

You are Codex astra, reviewing read-only. Say what you find, in your own reading. Write nothing to any file.

**The checkout** is `/Users/uazjob/UoN-Video-Helper-side/vh234` (your working directory), on `side/vh234` at `a28086f4af5935b09bb33e3d999644542a993741` (VH-233's landing, the item's base). **The candidate** is everything uncommitted there: the tracked diff `git diff a28086f4af5935b09bb33e3d999644542a993741` (the product's two files as you checked them blind, and the ledger: `project/backlog.md`, `project/decisions.md`, `project/decisions-2026-10.md`, `project/archive-index.md`, `project/trajectory.md`, `project/wish-list.md`, `reviews/2026-10-25/design-pass-3/design-pass-3-2026-10-27.md`) and the untracked files (`git status --porcelain=v1`): `project/items/VH-234.md`, and in `reviews/2026-10-25/design-pass-3/evidence/measurements/` the table `vh234-format-type-2026-11-09.md`, its records `vh234-records-2026-11-09/`, and the `vh234-*-2026-11-09.*` design, verdict, brief, answer and compare files. The freeze is `/Users/uazjob/UoN-Video-Helper-side/vh234-frozen/` (`diff.patch`, `status.txt`, `untracked.sha1.txt`); the checkout must equal it.

**What the earlier checks said:** Codex astra's blind design and Claude's design agreed on the remedy (`vh234-design-compare-2026-11-09.md`). Your blind check of the candidate said "Commit after the musts below." (`vh234-codex-blind-2026-11-09.md.txt`); its compare (`vh234-codex-compare-2026-11-09.md`) adopts musts 1 and 2: the table's notes corrected, the first table and records set aside outside the repository and made again by the same command with the same readings; must 3 is this close.

**The gate:** `npm run check` in the checkout on this content, gate 1, under the walk lock: its log is `/Users/uazjob/UoN-Video-Helper-side/vh234-walk/gate-1.out` with `gate-1.load.log`. `node tools/check.mjs`: 0 failures, 1 warning (`samples/CULT2011.mp4`, absent in a worktree).

**The owner's look:** the 14 sheets went to the owner on 2026-11-09; their answer has not yet come. The commit waits for it; any words of theirs will be added to the item, the decision and the commit, and checked again. Judge everything else.

**Read:** `AGENTS.md`; `project/profile.md`; `project/rules.md`; the item and every criterion; the ledger diff; the table, its notes and records; the Codex files and compares; `/Users/uazjob/UoN-Video-Helper-side/vh234-walk/` as your blind brief named it; `plan8-owner-words.md` lines 456–464, 275 and 185 in `/Users/uazjob/UoN-Video-Helper-side/`.

**Do not read:** any folder under `side-session-notes/`. In `/Users/uazjob/UoN-Video-Helper-side/`, do not read `vh234-claude-*`, `vh234-progress.md`, `vh234-handover-*`, `vh234-wip-*`, or any `vh234-*brief*` but this one (the copies of the briefs in the evidence folder may be read).

**Answer each:**
1. Is every criterion in `VH-234.md` met or, for the owner's look, honestly open?
2. The ledger by the contract: the backlog line struck; one trajectory line; the decision newest first with a short heading and Decision line and the full Decision in its Rationale, the owner's words with sources, the evidence and the Codex result; the archive move verbatim; wish VH-217.2 and VH-203.3 retired and nothing deferred left without a line; the Disposition row linked; the digest rules named (rule 8). Is any claim in the ledger unsupported by the records?
3. Were your blind musts 1 and 2 applied faithfully, the table made again only in its notes and two sources, and is every reading in it supported?
4. Are the evidence files named, headed and copied as the item's precedent (briefs and Claude's files with the provenance header; Codex answers verbatim as `.md.txt`), with no absolute link in a linted file?
5. Is the gate green on this content, with no test deleted or skipped, and does the checkout equal the freeze?

**Verdict:** one of "Commit", "Commit after the musts below", or "Do not commit", leaving aside only the owner's answer. Give musts, shoulds and notes apart, each with its evidence. Write nothing to the repository.

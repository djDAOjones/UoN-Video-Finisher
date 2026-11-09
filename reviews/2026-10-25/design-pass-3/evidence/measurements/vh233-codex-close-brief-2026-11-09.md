<!-- markdownlint-disable -->

# VH-233 — Codex astra's close check (brief)

You are Codex astra, the project's read-only reviewer. You are run from the worktree `/Users/uazjob/UoN-Video-Helper-side/vh233`, on `side/vh233`, at base `73d16f085fc2bda8a76c79263b67d3034262aa78` (VH-203's landing), with the candidate's changes uncommitted in its working tree. Change nothing. Write nothing to any file. No network.

**What you may read:** the worktree you are run in (`git diff 73d16f085fc2bda8a76c79263b67d3034262aa78`, `git status`, `git ls-files --others --exclude-standard`, every file in it); the frozen candidate `/Users/uazjob/UoN-Video-Helper-side/vh233-frozen/` (`tracked.diff`, `status.txt`, `untracked.sha1.txt`, `staged.diff`, `base.txt`); and, read only, in `/Users/uazjob/UoN-Video-Helper-side/`: the walk folder `vh233-walk/` (as your blind check read it); the draft commit message `vh233-commit-msg.txt`; the gates' logs `vh233-3-gate-1.log`, `vh233-3-gate-1.load.log`, `vh233-3-gate-1.chain.log`, `vh233-3-gate-2.log`, `vh233-3-gate-2.load.log`, `vh233-3-gate-2.chain.log` (read by tail or search); `plan8-owner-words.md` lines 185, 275, 437, 438 and 456–464. The review files you need (Claude's design and verdict, the compares, your design and blind briefs and answers) are already in the worktree's measurements folder, dated 2026-11-09. **Read nothing else outside the worktree:** no other checkout or worktree, no other side-folder file, never `vh233-progress.md`, `vh233-handover-*` or `vh233-wip-*`, and never any folder under `Library/Application Support/Claude/side-session-notes/`. Read large files by range or search.

## What this close is

VH-233's **build and close**, one commit on `side/vh233`, not pushed; it lands only on the orchestrator's go, by a rebase onto main as it then stands (main has moved since this base: VH-235 landed as `1f7fc66`, touching `src/main.ts`, `src/config/`, `src/ui/`, `src/workers/` and the ledger; the rebase, its fresh `tools/archive.mjs` run and a re-check of the rebased diff come at the landing, not now). Judge the close on this base.

**The candidate, frozen** (`vh233-frozen/`): the tracked diff, sha1 of `git diff --binary` beginning `0ac0c878eca530a4`, nine files:

- the app, as walked in `a1`: `src/styles/app.css` (+12, the commented `.statement-body a:focus-visible { outline-offset: 0; }` after `.statement-body li + li`) and `test/stylesheet.test.ts` (+20, one `describe` of two `it`s after VH-209's block);
- the ledger: `project/backlog.md` (VH-233's line struck), `project/trajectory.md` (one line, at Phase 8's end), `project/wish-list.md` (VH-203.1 retired, VH-233.1 added in its place), `project/decisions.md` (the entry "2026-11-09 — VH-233 — Closes", newest first; and `tools/archive.mjs`'s move of one entry out), `project/decisions-2026-10.md` and `project/archive-index.md` (that move), and the Disposition row in `reviews/2026-10-25/design-pass-3/design-pass-3-2026-10-27.md`.

The 85 untracked files (`untracked.sha1.txt`): `project/items/VH-233.md`; the table `reviews/2026-10-25/design-pass-3/evidence/measurements/vh233-statement-ring-2026-11-09.md` and its 75 records in `vh233-records-2026-11-09/`; nine review copies dated 2026-11-09 beside it (Claude's design, the design compare, your design brief and answer, the blind brief and answer, Claude's verdict, the verdict compare). After your answer, this brief and your answer are added there as the one allowed addition (`vh233-codex-close-brief-2026-11-09.md`, `vh233-codex-close-2026-11-09.md.txt`).

**Since your blind check** ("Commit after the musts below."): the ledger was written; your must 1 (the motion instrument's detail in `w1280` reduced motion, en-GB and zh-Hans) and your should (the ring tight to the ink) are adopted in the decision's Rationale and, for must 1, in the item's Notes (the item had said "nothing else moved"; it now says no other outcome moved and names the motion detail); must 2 is this close. The table is not rewritten once placed (VH-232's precedent). The Tab arrival is wish VH-233.1 on the orchestrator's ruling, not built.

**The owner's words:**

- "Yes, all six" (2026-11-08 ~23:03Z, `plan8-owner-words.md:456`–`:464`), point 1: "The accessibility statement link's focus ring at 2.4.13 (VH-203.1): a fix item, CSS only on the existing tokens."
- "Here on the Mac Pro (Recommended)" and "Re-walk here (Recommended)" (2026-11-05, `:437`, `:438`).
- "ensure everything passes UX / design / Accessibility" (2026-10-27, `:275`).
- "Gateless covers the rest of Phase 8" (`:185`).

No string, element, attribute, new token or `docs/` line is approved.

**The gate and checker:** gate 1, `npm run check` by the walk queue in the worktree, 01:30:35Z–01:32:05Z, AC Power, start load 3.48 (1-min) and 3.59 (5-min), peak 5.85, none at 8 or above, exit 0: 86 test files, 1,723 passed and the 1 standing skip (EBU cases 7 and 8), none deleted or skipped; markdownlint 0 issues in 702 files; links 0 broken in 757 files; check-memory 0 structural (8 warnings); `node tools/check.mjs` 0 failures, 1 warning (VH-122's `samples/CULT2011.mp4`, absent from a worktree). The item's Notes line was then corrected (the item file is untracked; the tracked diff unchanged) and gate 2 run on exactly the frozen tree: gate 2, 01:46:57Z–01:48:28Z, AC Power, start load 4.62 (1-min) and 3.81 (5-min), its START line showing the frozen diff hash `0ac0c878eca530a4`, exit 0 with the same counts as gate 1 (86 files, 1,723 passed, 1 skipped; markdownlint 0 in 702; links 0 broken in 757; check-memory 0; `node tools/check.mjs` 0 failures and the one warning); **but the load rose to 8.24 and 8.54 in its second and third samples**, so by the project's rule it is re-run on a settled machine: that run is the gate after your check, on the frozen tree plus this brief and your answer. The worktree's status and untracked sha1s were compared with the freeze after gate 2: identical.

## Check the complete close and answer each

1. **The diff against the freeze:** is the worktree exactly `vh233-frozen/` (tracked diff, status, untracked sha1s)?
2. **The item file** against its own criteria and `project/items/_schema.md`: is each criterion met by the evidence, or stated as not met; are its Now, Open question and Notes true to the table, the decision and the diff; does it name the re-reads and say why none follow?
3. **The ledger edits:** the backlog line struck and nothing else there changed; the trajectory line's form (`- ID — outcome (date) — see decisions`), place and the checker's budget; the wish list: VH-203.1 retired (paid off by the evidence?), VH-233.1's form, number, `(from: …)` and truth against the records, VH-210.2 left open rightly; the decision: heading and Decision short for the slice, the full Decision in the Rationale, the owner's words verbatim with sources, must 1 and the should, Supersedes and Deferred right; the archive move verbatim (compare the moved entry byte for byte) and the index; the Disposition row's link and words.
4. **The commit message draft** (`vh233-commit-msg.txt`): true to the diff and the record, the owner's words verbatim with sources, the measured results, the digest rules (wcag-2.2-aaa 2.4.13, 2.4.7, 1.4.11; carbon "Tokens, not literals"), the new wish line, the attribution; `Verify:` and `Checked:` are filled at the commit from the gate and from your verdict here.
5. **The review copies:** each in the measurements folder verbatim or with its provenance header, no absolute link, the answers as `.md.txt`; does any committed file claim something the record does not hold?
6. Anything else that should block the commit.

Close with one verdict line, as you would want it quoted in the commit's `Checked:` line: "Commit", "Commit after the musts below", or "Do not commit", with musts, shoulds and notes apart, each with its evidence.

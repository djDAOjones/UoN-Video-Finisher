<!-- markdownlint-disable -->

# VH-225 — Codex astra's close check brief (commit 1)

You are Codex astra, checking the complete close of commit 1 of item VH-225 of the app now named UoN Video Finisher, read-only, from the repository at the current directory, before its commit. The candidate is the whole working tree against HEAD `a5475cda0ca29a45f9f8b4f31c5e626b5b5547ff` (= origin/main): `git diff` for the tracked changes and `git status --porcelain=v1` with `git ls-files --others --exclude-standard` for the untracked files. The freeze is `/Users/joe/UoN-Video-Helper-side/vh225-frozen/` (`tracked.patch`, diff hash `fac9d3128d313126`; `status.txt`, 56 lines; `untracked.sha1.txt`, 1,921 files): the tree must match it.

**This is commit 1 of two, with the item kept open** (the settled design's settlement 4, and your verdict's point 7): commit 1 is the visible name with no address changed; commit 2, after the owner renames the repository, carries the addresses, the backlog strike, the trajectory line and the closing decision. So VH-225's backlog line stays open and there is no trajectory line in this commit.

**The change** (as your blind verdict saw it, diff hash `b026e012eb065a73` with the walker's two files): the visible name in `index.html`, the en-GB strings, zh-Hans "UoN 视频成片工具" and ms-MY "Penyiap Video UoN" through the filled sheet and both tables, the two email subjects, the Xerte script, the sheet's translator note and instructions, the boot log, README, four ledger headings, `acceptance.html`, the thirteen spike titles, `docs/01-specification.md`'s first line and `docs/04-init-prompt.md`'s name line, the four tests, and the walker's three subject assertions (`scenarios.mjs`, `footer-182.mjs`, revision `9c52269607bccc4c`); `test/kept-identifiers.test.ts` (untracked, new).

**Added since your blind verdict:**
- `project/wish-list.md`: VH-225.1 corrected for S-143's predicate (your point 1); otherwise VH-225.1 to VH-225.7 as you saw them, VH-105.2 widened, VH-229.2 removed.
- The `-r1` table, `reviews/2026-10-25/design-pass-3/evidence/measurements/vh225-name-r1-2026-11-03.md`, with `vh225-records-r1-2026-11-03/`: the same command and sources, new notes (`vh225-table-notes-r1.md.txt`) on your point 2. The placed table and records are unchanged.
- `project/items/VH-225.md`: criteria 2 and 5 reworded only so no backticked path is missing (the checker's three warnings); Now and Open question; a 2026-11-04 Notes line (the names an orchestrator's acceptance; the stored-jobs qualification, your point 3; the `-r1` table linked).
- `project/decisions.md`: the 2026-11-04 VH-225 entry, Deferred VH-225, VH-229.2 retired on its Decision line; `tools/archive.mjs` moved the oldest entry to `project/decisions-2026-10.md`, indexed in `project/archive-index.md`.
- The evidence copies in the measurements folder, dated 2026-11-03: `vh225-claude-design`, `vh225-codex-design-brief`, `vh225-design-compare` (each its source with the provenance header added); `vh225-claude-verdict`, `vh225-codex-blind-brief`, `vh225-codex-compare` (sha1-equal to their sources); `vh225-codex-design` and `vh225-codex-blind` as `.md.txt`, verbatim.

**What the earlier checks said:** your design check and its compare (in the copies); your blind verdict, "Pass with conditions for commit 1. VH-225 is not yet complete:", with seven points taken in the compare: S-143's wording, the notes' load, reach, export-proof and median wording, the stored-jobs qualification, the English subjects (a fact, no change), the checker's warnings, the owner's mandate apart from the rulings with the digest rules named, and commit 2 carrying the close. The orchestrators' rulings are in the notes and the decision, listed for the owner.

**The owner's words** (`plan8-owner-words.md`, quoted): "it is to be called UoN Video Finisher (rather than UoN Video Helper). please add to the backlog and let the orchestrator chat know - the next release must contain the rename"; "Rename those too" (the repository and the Pages address); "Yes, move it" (after VH-210, before VH-220); "Gateless covers the rest of Phase 8"; "Yes, leave them" (the walker's old-order pins); S-133's records "a named instrument gap", measured "in VH-203's after-run once the walker is fixed". The owner's pronouns are unrecorded: the record says "the owner" and "they".

**The gate:** `npm run check`, its log `/Users/joe/UoN-Video-Helper-side/vh225-gate-1.log` with `.load.log` and `.power.txt` beside it; then `node tools/check.mjs`. The base's gate had 83 test files, 1,658 tests and the 1 existing EBU skip (`git log -1 a5475cd`).

Read what you need of the repository, the freeze, the gate files, the walk folder `vh225-walk/` and the table sources `vh225-table-src/`, read-only. Never read any folder under `side-session-notes/`; in `/Users/joe/UoN-Video-Helper-side/` read nothing else: not `vh225-progress.md`, `vh225-handover-*`, `vh225-wip-*`, `starts/`, any other brief or any `vh225-claude-*` or `*compare*` file there (their copies in the measurements folder are part of the candidate).

Answer each, citing file and line:

1. Does the tree match the freeze, and does it hold only this item's files?
2. Is each acceptance criterion of `project/items/VH-225.md` met for commit 1, met with a stated shortfall, or rightly left for commit 2?
3. Were your blind verdict's points met: VH-225.1's wording, the `-r1` notes against the records, the item's stored-jobs qualification, the checker's warnings, the decision's split of the owner's words from the rulings and its digest rules?
4. The ledger, by each file's grammar comment and the contract (`AGENTS.md`, rules 4 to 6 and 8): the decision (newest first, its fields, the owner's words with sources, the rulings listed for the owner), the item kept open with no trajectory line, the wish lines (form, IDs, every deferral named in the record a line), VH-229.2's trace, VH-105.2's widening, the item file.
5. Are the evidence copies verbatim or header-only, and is any claim in the record not borne out by the tables or records?
6. Is the gate green with no test deleted or skipped, and did it start below load 8 on the 1- and 5-minute loads?

End with a verdict: pass, pass with conditions, or fail, and the short list of what must change before commit 1. Be concrete and brief.

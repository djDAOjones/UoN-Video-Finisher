<!-- markdownlint-disable -->

# VH-210 — Codex astra's close check brief

You are Codex astra, checking the complete close of item VH-210 of the UoN Video Helper, read-only, from the repository at the current directory, before its commit. The candidate is the whole working tree against HEAD `96f564786e488af3398c2d86454b5d18b9b78fc0` (= origin/main): `git diff` for the tracked changes and `git status --porcelain=v1` with `git ls-files --others --exclude-standard` for the untracked evidence. The freeze is `/Users/joe/UoN-Video-Helper-side/vh210-frozen/` (`tracked.patch`, `status.txt`, `untracked-sha1.txt`): the tree must match it.

**The change:** `src/styles/app.css`, one rule in the one `forced-colors` block, `.footer-help-list > li + li { margin-block-start: var(--focus-room); }`, with its comment; `test/stylesheet.test.ts`, one test. **The ledger:** `project/backlog.md` (VH-210's line struck), `project/trajectory.md` (one line), `project/decisions.md` (the 2026-11-03 VH-210 entry; `tools/archive.mjs` moved the oldest entry to `project/decisions-2026-10.md`, indexed in `project/archive-index.md`), `project/items/VH-210.md` (Now, Open question, Notes), `project/wish-list.md` (VH-210.1 to VH-210.4 added; VH-209.3 retired, named in the decision), `reviews/2026-10-25/design-pass-3/design-pass-3-2026-10-27.md` (the Disposition rows for V-48 and V-49). **The evidence,** untracked under `reviews/2026-10-25/design-pass-3/evidence/measurements/`: four tables by script from one walk, `vh210-rings-2026-11-02.md`, `-r2-`, `-r3-` and `-r4-`, each with its records folder, the first three kept on file; the design and verdict files, `vh210-claude-design-2026-11-02.md`, `vh210-codex-design-brief-…`, `vh210-codex-design-….md.txt`, `vh210-design-compare-…`, `vh210-codex-blind-brief-…`, `vh210-codex-blind-….md.txt`, `vh210-claude-verdict-…`, `vh210-codex-compare-…`.

**What the earlier checks said:** Codex's design check and its compare (in the files above); Codex's blind verdict, pass with conditions: wording and disclosure in the table's notes (S-ID1's two f3 records outside the script's count, reached against expired, S-76's availability, S-109's causal wording, the re-walked cells named beside equality claims, the test a presence test) and the close record (retire VH-209.3; link VH-199.1, VH-200.1, VH-216.1, VH-217.5). Those were repaired as `-r3`. The orchestrator then asked for a repaint check (a repaint can make a false pass): `vh210-repaint-check.mjs`, in `-r4`'s records, 418 fail-to-pass cells, 0 with the signature, 0 undecidable, stated in `-r4`'s notes. The orchestrators' rulings are in the notes and the decision, listed for the owner.

**The owner's words:** the answer to VH-202's ask, "as reccomended, and convery me the 9 point ask here" (point 1, the fix plan approved); "Gateless covers the rest of Phase 8: approve VH-197's plan and every later choice on the sessions' recommendations; only stop for me on something the recommendations don't settle"; on the walker rows pinning the old order, "Yes, leave them". The owner's pronouns are unrecorded: the record says "the owner" and "they".

**The gate:** `npm run check`, its log `/Users/joe/UoN-Video-Helper-side/vh210-gate-1.log` with `.load.log` and `.power.txt` beside it; then `node tools/check.mjs`.

Read what you need of the repository, the freeze and the gate files. Never read any folder under `side-session-notes/`; in `/Users/joe/UoN-Video-Helper-side/` read nothing else but the walk folder `vh210-walk/`, read-only.

Answer each, citing file and line:

1. Does the tree match the freeze, and does the commit hold only this item's files?
2. Is each acceptance criterion of `project/items/VH-210.md` met, or met with a stated shortfall?
3. Were the blind verdict's conditions met in `-r3` and `-r4`, and does `-r4`'s repaint check do what its paragraph says?
4. The ledger, by each file's grammar comment and the contract (`AGENTS.md`, rules 4 to 6 and 8): the decision (newest first, Decision and Rationale, the owner's words quoted with sources, the rulings listed for the owner, the digest rules named), the trajectory line, the struck backlog line, the wish lines (form, IDs, every deferral named in the record a line), VH-209.3's trace, the item file, the Disposition rows' links.
5. Are the evidence copies verbatim (the Codex answers as `.md.txt`) and are any claims in the record not borne out by the tables or records?
6. Is the gate green with no test deleted or skipped, and did it start below load 8?

End with a verdict: pass, pass with conditions, or fail, and the short list of what must change. Be concrete and brief.

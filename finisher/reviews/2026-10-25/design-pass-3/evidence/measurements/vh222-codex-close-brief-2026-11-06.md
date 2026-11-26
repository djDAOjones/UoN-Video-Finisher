<!-- markdownlint-disable -->

# VH-222 — Codex astra's close check brief

You are Codex astra, checking the complete close of item VH-222 of the UoN Video Finisher, read-only. Read from the repository at the current directory: a worktree on `side/vh222`, HEAD `1cb3cbad71972f3d14caa3c5ea1c64f802f5be9f`, which is VH-231's landing on main and over VH-232's raise `d079b8c`. The close is uncommitted. It is frozen in `/Users/uazjob/UoN-Video-Helper-side/vh222-frozen/`: `tracked.diff` (`git diff --binary`), `status.txt` and `untracked.sha1.txt`. Check that the working tree matches the freeze.

**The item:** `project/items/VH-222.md`, a check item with no product diff unless it finds a defect. A defect becomes a fix item that VH-222 never builds. Answer every acceptance criterion in it, as the close states it.

**The owner's words** (quoted in the decision; the record is `plan8-owner-words.md`, which you need not open): "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" (:275), group B covering a new fault or scenario named and qualified by VH-198's method; "Gateless covers the rest of Phase 8" (:185); "gateless run where possible" (:395); "Yes, leave them" (:366); "yes" to the side-by-side run (:375); "Yes, move it" (:369). Their answers of 2026-11-05 (the PLAN-8 entry of that date): re-walk on the Mac Pro, fix items built there.

**The candidate:**
- The tracked diff: the walker's `scenarios.mjs` (S-173 and S-174, +24) and the ledger. That is `project/decisions.md` (the new entry "2026-11-06 — VH-222 — Closes: …" and one entry archived by `tools/archive.mjs`), `decisions-2026-10.md`, `archive-index.md`, `backlog.md`, `trajectory.md`, `wish-list.md` (VH-222.1), `items/VH-222.md`, and the Disposition row in `reviews/2026-10-25/design-pass-3/design-pass-3-2026-10-27.md`.
- Untracked, in `reviews/2026-10-25/design-pass-3/evidence/measurements/`: the three tables `vh222-warning-rows-2026-11-05.md`, `-r1-2026-11-05.md` and `-r2-2026-11-06.md`, each with its records folder; and the design and verdict files `vh222-claude-design-2026-11-05.md`, `vh222-codex-design-brief-2026-11-05.md`, `vh222-codex-design-2026-11-05.md.txt`, `vh222-design-compare-2026-11-05.md`, `vh222-claude-verdict-2026-11-05.md`, `vh222-codex-blind-brief-2026-11-05.md`, `vh222-codex-blind-2026-11-05.md.txt` and `vh222-codex-compare-2026-11-05.md`.
- The gate: `npm run check` exit and counts in `/Users/uazjob/UoN-Video-Helper-side/vh222-gate-1.log`, its load in `vh222-gate-1.load.log`. The checker: `node tools/check.mjs`.

**What every earlier check said:**
- The design's blind check: "design sound with changes: explicit row coverage, qualified missing routes, conditional evidence reuse, and a decision on the cut-file completeness claim."
- The verdict's blind check: "FAIL — the candidate does not yet satisfy VH-222’s close criteria." Its points were the open close tasks; the feedback status at 320 px, ruled a defect under Nielsen's "status visible and announced", not a WCAG failure, and raised as fix item VH-232; and the `Here` refusals at 375 px, walked as g9 under S-173 and S-174 by the orchestrator's word.
- g9's blind reading: "PASS with notes". g1r's (g1 re-read on VH-231's landing): "PASS with notes", its notes adopted in r2.

**Check, with evidence (file and line, or record):**
1. Is each acceptance criterion met, or its shortfall stated: every row read or outstanding with a reason; nothing false beside the cut-short warning; mapped first; the stage rule; the WCAG criteria; no product diff; Codex's checks; the Disposition row linked?
2. Is the decision true to the three tables and their records? Check the counts, the defects, the IDs, the walker revisions, WCAG, the digest rules and the person checks. Are its Deferred line (VH-231, VH-232) and wish VH-222.1 right and traced (rules 4 and 5)?
3. Rule 6: is the backlog line struck, one trajectory line added, the item's Now and Notes true, and any open line the work paid off retired?
4. Is the archive move verbatim and indexed? Is the new decision the newest, and does the slice fit its budget?
5. Is the walker change additive, within the criteria and recorded, with no plan moved? Is the Disposition row's link right?
6. Are the evidence copies faithful to their sources: the answers verbatim, the rest differing only by the two-line header? Is every link relative?
7. Did the gate pass with no test deleted or skipped, and at what load? Does the checker report no structural or budget failure, and are its warnings explained?
8. Anything that blocks the commit.

**Do not read:** any folder under `/Users/uazjob/Library/Application Support/Claude/side-session-notes/`. In `/Users/uazjob/UoN-Video-Helper-side/`, do not read any `vh222-claude-*`, `vh222-*compare*`, `vh222-progress.md`, `vh222-handover-*`, `vh222-wip-*`, any `vh222-*brief*` but this one, or any other item's files. The same-named copies in the measurements folder are part of the candidate and may be read.

Give a verdict line first ("PASS", "PASS with notes" or "FAIL", with a reason), then each answer. Keep it under about 1,000 words.

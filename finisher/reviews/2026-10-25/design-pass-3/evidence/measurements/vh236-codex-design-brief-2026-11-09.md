<!-- markdownlint-disable -->

# VH-236 — Codex astra's blind design check (brief)

You are Codex astra, asked by the project's Claude worker for an independent design reading, read-only. You run in the worktree `/Users/uazjob/UoN-Video-Helper-side/vh236`, branch `side/vh236`, at base `73d16f085fc2bda8a76c79263b67d3034262aa78` (no product change yet). Write "the owner" and "they".

## What you may read

- This worktree: `project/items/VH-236.md` (the item and its criteria, in full), `src/main.ts`, `src/i18n/*.ts`, `src/ui/*.ts`, `index.html`, `test/screen-text.test.ts`, `src/i18n/tables.test.ts`, `src/ui/reveal-status.ts` and its test (a model of a stand-in tested helper), `project/digests/nielsen.md`, `project/digests/wcag-2.2-aaa.md`, `project/digests/house-conventions.md`, `UI-STANDARDS.md`, `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/scenarios.mjs` (S-28, S-29, S-31, S-32, S-140n, S-149).
- VH-203's walk records, read-only: `/Users/uazjob/UoN-Video-Helper-side/vh203-walk/` (group folders `a1g*` to `a4g*`, `b3`, `b3-split`; each run's `captures/<key>__mutations.json` holds the DOM and live-region changes, labelled exposure, not speech), and `/Users/uazjob/UoN-Video-Helper-side/vh203-walk/v2142-read.mjs` with its output `v2142-read.txt`.
- The owner's words: `/Users/uazjob/UoN-Video-Helper-side/plan8-owner-words.md`, lines 456–464.

**Forbidden:** every folder under `side-session-notes/`; in `/Users/uazjob/UoN-Video-Helper-side/`, any file named `vh236-claude-*`, `vh236-*compare*`, `vh236-progress.md`, `vh236-handover-*`, and every `vh236-*brief*` but this one. Do not write any file.

## The owner's word and the approval

The owner, 2026-11-08 ~23:03Z, "Yes, all six", point 6 verbatim: "The false "You can still set the times" (VH-214.2): a fix item that drops that sentence when step 1 refuses, removing words only." The orchestrator's ruling: the approval covers removing "You can still set the times." from the refused-preview announcement in en-GB, zh-Hans and ms-MY, the first sentence kept byte for byte, and nothing else. Any other new or changed text, element, `docs/` line or change to another caller's behaviour is outside it. On S-29 (the read failure): if S-29's sentence is left over from the earlier refusal in the same scenario, the approved removal covers it; if the read-failure path itself announces it, dropping it there needs the owner's further answer.

## Answer each, with file:line evidence

1. **Every path that withdraws the trim step** (`#step-trim`), and whether each is "step 1 refuses a file".
2. **S-29:** where its sentence comes from — left over from the earlier refusal in its own scenario, or announced by the read-failure path itself. Read the code and S-29's records' `__mutations.json` (the order of `#page-announcer` and `#source-status` writes).
3. **The orders:** in VH-203's refusal records, does the preview's `error` come before or after the block's verdict? Why did `v2142-read.txt` count S-149 at 1280 px only?
4. **The first sentence:** the key route (a new message key carrying exactly the three first sentences) or the code route (derived at run time from `trim.noPreview`): which, and why. Note `#trim-preview-note`'s binding, the filled sheet `reviews/2026-10-18/VH-105-strings-filled.csv` and its tests, and the strings sheet `src/i18n/sheet.ts`.
5. **Where the choice of text is made,** and for each order (the preview's `error` before the block's verdict; after it; the recoverable storage block where trimming stays; the offered case, S-32) the expected sequence of `#page-announcer`'s text, including what becomes of a full refused-preview text already in the region when step 1 then withdraws trimming. Weigh re-saying, emptying, a quiet rewrite and deferring the announcement, against "removing words only", the first sentence kept byte for byte, and another caller's behaviour.
6. **Guards and edge cases:** a language switch between the error and the verdict; another sentence said in the region since; a full text left by an earlier file.
7. **Tests:** which stand-in tests force each order and assert the sequences; what `test/screen-text.test.ts:256`–`:259` becomes without weakening it.
8. **Any other state** where "You can still set the times." stays exposed while trimming is withdrawn, beyond the 22 refusal records and S-29 — a finding, not built.
9. **The walk's reader:** what it should read per key from the walker's records to show the change (exact text kept, second sentence present or absent, the region's sequence, trim step offered).
10. **Stops:** anything in a sound remedy that would need a new word, a changed text, an element, a `docs/` line or a change to another caller.

End with a one-line verdict: "Build as designed below" or "Stop: <reason>".

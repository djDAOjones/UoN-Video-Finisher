<!-- markdownlint-disable -->

# VH-235: blind check of the candidate

You are Codex astra, reviewing read-only. Say what you find, in your own reading. You are given no other reviewer's reading. Write nothing to any file.

**The checkout** is `/Users/uazjob/UoN-Video-Helper-side/vh235` (your working directory), on `side/vh235`. **The candidate** is the uncommitted change against `73d16f085fc2bda8a76c79263b67d3034262aa78` (VH-203's landing): the tracked diff `git diff 73d16f085fc2bda8a76c79263b67d3034262aa78 -- src`, four files (`src/main.ts`: one import, the `feedbackOpening` const, `begin()` after `showModal()` in `openFeedback`, the `#feedback-copy` handler by `settleCopy`; `src/workers/job.worker.ts`: one import and the release guard's two `1000`s; `src/config/thresholds.ts`: `MADE_LENGTH_LOG_ROUNDING_SCALE`; `src/ui/reveal-status.test.ts`: comments only), diff hash `867c8580445d3bd9` (`git diff --binary | shasum -a 1 | cut -c1-16`) as walked in `a1`; and three new untracked source files, `src/ui/feedback-opening.ts` (sha1 `4feaf82b`), `src/ui/feedback-opening.test.ts` (`848869d2`) and `src/config/thresholds.test.ts` (`e240ca61`), with the item file `project/items/VH-235.md`. `npx vitest run` read 88 files, 1,738 passed and 1 skipped, against the base's gate, 86 files, 1,721 passed and 1 skipped; `tsc --noEmit` 0; eslint on the seven changed `.ts` files 0. The gate (`npm run check`) runs at the close. The untracked evidence is the table `reviews/2026-10-25/design-pass-3/evidence/measurements/vh235-copy-opening-2026-11-09.md`, its notes inside it, and its records `vh235-records-2026-11-09/` beside it.

**Read:**
- in the checkout: `project/items/VH-235.md`, every criterion; the entry "2026-11-08 — VH-203 — Closes" in `project/decisions.md`; `project/wish-list.md` (VH-232.2, VH-203.4); `UI-STANDARDS.md` (System status, Operable); `project/digests/nielsen.md`, `wcag-2.2-aaa.md` and `house-conventions.md`; `index.html` (`#feedback-dialog`); `src/main.ts`'s feedback block and anything else in it you need; `src/ui/reveal-status.ts` and its test; `src/ui/feedback.ts` and its test; `src/workers/job.worker.ts`; `src/config/thresholds.ts`; the walker under `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/` (`scenarios.mjs`: S-76, S-78k, S-80a, S-80b; `matrix.mjs`, `walk.mjs`, `faults.mjs` (F5), `qualify.mjs`); VH-232's table `vh232-feedback-status-2026-11-06.md` (cited, never paired); the table and records.
- in `/Users/uazjob/UoN-Video-Helper-side/vh235-walk/`: the groups `b1/` (the before, on the base) and `a1/` (the after, on the candidate), each with `conditions.txt`, `keys.txt`, `runs/` (each matrix cell's record), `late.jsonl` (the late route) and `logs/`; the `*.launcher.log` and `*.load.log` files; the drivers `keys.mjs`, `mx.mjs`, `late.mjs`, the reader `late-sum.mjs` and its output `late-b1-a1.txt`; `go.sh`, `walk.sh`; `fix/`.
- your own design answer for this item, `/Users/uazjob/UoN-Video-Helper-side/vh235-codex-design.md`.

**Do not read:** any folder under `side-session-notes/`, or `/Users/uazjob/UoN-Video-Helper-side/starts/`. In `/Users/uazjob/UoN-Video-Helper-side/`, do not read `vh235-claude-*`, `vh235-*compare*`, `vh235-progress.md`, `vh235-handover-*`, or any `vh235-*brief*` but this one.

**The owner's words:**
- To VH-203's points, "Yes, all six" (2026-11-08 ~23:03Z), point 4: "The problem report's late "Copied" (VH-232.2): a fix item so a Copy result shows only in the opening that started it." Point 5: "The three literals (Codex's point 11): an exception for the media-query breakpoints (25rem, 19.99rem); the 1000 moves into `src/config/` with the next code change."
- "ensure everything passes UX / design / Accessibility" (2026-10-27).
- "Here on the Mac Pro (Recommended)": a fix item is built, walked, gated and landed on the Mac Pro, on its own branch. "Re-walk here (Recommended)": other machines' records are cited only.
- "Gateless covers the rest of Phase 8: approve VH-197's plan and every later choice on the sessions' recommendations; only stop for me on something the recommendations don't settle".

No new or changed user-facing string, in any language, no `docs/` line, and no new element or control is approved.

**Settled, do not reopen:**
- the design of record, from the design check (yours among them): the guard is a fresh `Symbol` per opening, begun just after `showModal()`, AND `dialog.open` at the settle; a helper in `src/ui/feedback-opening.ts` (`createFeedbackOpening`, and `settleCopy` carrying the handler's try/catch); the failure's `log.warn` kept, before the guard; the constant in `src/config/thresholds.ts`; `job.worker.ts`'s other `/ 1000` (`wallSeconds`) unchanged here, recorded as a follow-up wish line;
- the walker unchanged at revision `7db38f355f3c46c2` both sides; the late route a driver route outside the walker, its `writeText` stand-in installed through CDP after setup and before the click, qualified against the real clipboard under F5 (granted and denied) in the same opening;
- the orchestrator's ruling on the before's load (b1: 14 of 16 load samples at 8 or above, peak 36.91): b1 stands as the before, its readings being states, not timings, and a late result's delay being the stand-in's; the after was to start only with the 1- and 5-minute loads below 8, and any after cell that moves outside the change's expected moves is a finding, re-walked both sides at low load;
- the `1000` is not walked: no state shows it.

**Answer each:**
1. Every acceptance criterion in `VH-235.md`: met, or how not, with file and line or record.
2. **The guard.** Is a result written only into the opening that pressed Copy? Judge Close (`dialog.close()` and the later `close` event), native Escape, a close and reopen, a settle between `close()` and the `close` event, a capture before the first opening, two Copies in one opening, a `showModal()` that throws, and a change of language while the dialog is closed or open after an accepted or a dropped result.
3. **The handler's shape.** Against the base's handler: a clipboard that throws at the call, a throw from the success write, the order of the warn and the write, when the guard is asked, any unhandled rejection, and whether `feedbackText` and `feedbackLines` are read at the same moment.
4. **Nothing else moves.** Each opening's status emptied; VH-232's reveal; `#feedback-status`'s node, role, `aria-live` and `textContent`; focus; no scroll of the change's own; no string, element or `docs/` line; nothing outside the feedback block in `main.ts` but the import.
5. **The evidence.**
   - Is every reading in the table and its notes supported by the records, before and after?
   - Does the before show the defect, and the after nothing written after Close, after Escape and after a close and reopen, as success and as failure, with one warn on each failure? Is the same-opening case, focus moved by the user included, unchanged? Is the qualification sound (the stand-in's texts and warns against the real clipboard's)?
   - Do the 45 matrix cells a side read unmoved, and is any move outside the expected ones?
   - Load and power for each group; samples at 8 or above; does any reading rest on a timing measure?
   - Is coverage reduced anywhere against the item's stage rule (scenarios, widths, languages, modes, the late route's 24 and its qualification)?
6. **WCAG and nielsen.** From the readings, judge WCAG 2.1.1, 2.4.3, 3.2.1, 3.2.2 and 4.1.3, and nielsen's "status visible and announced". A speech reading is a person's.
7. **Tests.** Do they cover what the item lists? Is anything the change does left untested? In `src/ui/reveal-status.test.ts`'s "Copy's delayed result", is any title or comment false after the change, and is the least true edit to it made (the item allows comments only there)?
8. **The `1000`.** Is the constant named, placed and tested as the item says, value unchanged, both uses replaced, and is the house rule ("Config is the only home for numbers") met for what the item names? Does the other `/ 1000` need more than the follow-up wish line?

**Verdict:** one of "Commit", "Commit after the musts below", or "Do not commit". Give musts, shoulds and notes apart, each with its evidence. Write nothing to the repository.

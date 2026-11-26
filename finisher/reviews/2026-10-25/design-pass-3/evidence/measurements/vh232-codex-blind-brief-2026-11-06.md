<!-- markdownlint-disable -->

# VH-232: blind check of the candidate

You are Codex astra, reviewing read-only. Say what you find, in your own reading. You are given no other reviewer's reading. Write nothing to any file.

**The checkout** is `/Users/uazjob/UoN-Video-Helper-side/vh232` (your working directory), on `side/vh232`. **The candidate** is the uncommitted change against `1cb3cbad71972f3d14caa3c5ea1c64f802f5be9f` (VH-231's landing): the tracked diff `git diff 1cb3cbad71972f3d14caa3c5ea1c64f802f5be9f -- src`, one file, `src/main.ts` (one import; `setFeedbackStatus`'s paint callback and its doc comment), diff hash `3dba5c0267998195` as walked in `r1`–`r3`, and two new untracked files, `src/ui/reveal-status.ts` (sha1 91185c1a) and `src/ui/reveal-status.test.ts` (4c1a5267). An earlier candidate (diff hash `ef6e077c3449817c`, without the focus rule below) was walked as `a1`–`a3`; those groups are superseded and kept in the records, set aside. The untracked evidence is the table `reviews/2026-10-25/design-pass-3/evidence/measurements/vh232-feedback-status-2026-11-06.md`, its notes inside it, and its records `vh232-records-2026-11-06/` beside it. The tests ran under the walk lock: 86 files, 1,718 passed and 1 skipped, against the base's 85 files, 1,690 passed and 1 skipped (+28, all in the new test file). `tsc --noEmit` reads 0, and eslint on the three changed `.ts` files reads 0.

**Read:**
- in the checkout: `project/items/VH-232.md`, every criterion; the entry "2026-11-05 — VH-232 — Raised" in `project/decisions.md`; `project/wish-list.md` (VH-232.2); `UI-STANDARDS.md` (System status, Operable); `project/digests/nielsen.md`, `wcag-2.2-aaa.md` and `house-conventions.md`; `index.html` (`#feedback-dialog`), `src/styles/app.css` (`.dialog`), `src/styles/tokens.carbon.css`, `src/ui/focus-hand-on.ts`, `src/ui/feedback.ts`, the rest of `src/main.ts` and any other source you need; the walker under `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/` (`scenarios.mjs`: the feedback scenarios S-75 to S-80b, `K-dialog`, `DIALOG_ENLARGED_SUB`; `matrix.mjs`, `qualify.mjs`); the table and records.
- in `/Users/uazjob/UoN-Video-Helper-side/vh232-walk/`: the group folders `q1/`, `q2/` (qualification), `b1/`, `b2/`, `b3/` (the before, on the base) `r1/`, `r2/`, `r3/` (the after, on the candidate) and `a1/`, `a2/`, `a3/` (the superseded earlier candidate), each with `conditions.txt`, `runs/` (each cell's record and the probe and states readings) and `logs/`; the `*.launcher.log`, `*.load.log` and `*.go.out` files; `vh232-driver.mjs`, `go.sh`, `walk.sh`, `side.zsh`, `vh232-sum.mjs`, `before.sum.txt`, `after-r.sum.txt` (the after), `after.sum.txt` (superseded) and their `.json`; `fix.sha1.txt`.
- VH-222's cited finding: `/Users/uazjob/UoN-Video-Helper-side/vh222-walk/g4/` and `g4.sum.txt` (base `95d18ee`, walker revision `9c522696`; cited, never paired).

**Do not read:** any folder under `side-session-notes/`. In `/Users/uazjob/UoN-Video-Helper-side/`, do not read `vh232-claude-*`, `vh232-*compare*`, `vh232-progress.md`, `vh232-handover-*`, or any `vh232-*brief*` but this one.

**The owner's words:**
- "ensure everything passes UX / design / Accessibility" (2026-10-27).
- "Here on the Mac Pro (Recommended)": a fix item is built, walked, gated and landed on the Mac Pro, on its own branch.
- "Re-walk here (Recommended)": the before is walked on the Mac Pro on the build's base; other machines' records are cited only.
- "Gateless covers the rest of Phase 8: approve VH-197's plan and every later choice on the sessions' recommendations; only stop for me on something the recommendations don't settle".

No new or changed user-facing string, in any language, no `docs/` line, and no new element, control or checkbox is approved.

**Settled, do not reopen:**
- the design of record from the raise: a dialog-only scroll by geometry in a `src/ui/` helper, run in the paint callback; no CSS, string, element or `docs/` change; a late copy result tied to its opening is not built (wish VH-232.2);
- the walker unchanged at one revision, `77a0a0bc2e2c1e5d`, before and after; one plan per mode on both sides, a driver choice the orchestrator accepted on condition the same plans run before and after;
- the before walked on the base on this Mac (365 cells, all reached);
- the orchestrator's ruling on the earlier candidate, whose reveal scrolled Open email app out of view at the 400% zoom proxy (a 191 px client area, the actions stacked, 298 to 319 px from the button's top to the status's end): **focus wins**. When the focused control is inside the dialog, the reveal takes the scrollTop nearest the status's whole reveal within the range that keeps that control's box and its ring (computed outline width and offset) wholly in the client area; where both cannot fit, focus is kept and the status is partial, recorded as the enlargement fallback, never as "whole and in view";
- S-79b en-GB 320 px in text spacing: the walker sets the mode after setup, so spacing is applied after the status is revealed; accepted as the walker's order (a variant, not a matrix cell).

**Answer each:**
1. Every acceptance criterion in `VH-232.md`: met, or how not, with file and line or record.
2. **The geometry.** Is the scroll the least vertical distance that brings the status's whole box into the dialog's client area, with the end padding kept below, clamped to the range, and nothing moved where it is already in view? Judge the clipped-above, over-height and exact-fit branches, a repeated call, fractional and rounded `scrollTop` in Chrome, the dialog's border (`clientTop`), and a `paddingBlockEnd` that does not parse.
3. **Only the dialog, and focus.** Can anything scroll but `#feedback-dialog`'s `scrollTop`? Is focus untouched, and does the focused control stay wholly in view with its ring in every walked cell? Is the announcement unchanged (the same node, role, `aria-live`, `textContent`)?
4. **Other behaviour.** Does the change alter behaviour for any caller or path the criteria don't name? Consider each `setFeedbackStatus` call, the empty status on opening, the `regions` repaint on a change of language (with the dialog closed, and while it is open), Copy's late result after Close, Escape, a close and reopen and moved focus, and the controls S-75, S-77 and S-78k, including a reopened dialog's kept scroll.
5. **The evidence.**
   - Is every reading in the table and its notes supported by the records, before and after?
   - Do the after's matrix cells read the status whole and in view, with the walker's clip rule (the sum's FLAWED count) at 0? Are any cells taller than the visible area, or unable to hold the status and the focused control together, and are they recorded as the fallback, never as "whole and in view"? Is the focus rule's clamp sound, and does it leave the cells where both fit as the earlier candidate read them?
   - Load and power for each group; any sample at 8 or above; does any reading rest on a timing measure?
   - Is coverage reduced anywhere against the item's stage rule (scenarios, widths, languages, modes, the enlargements, the variants, `K-dialog`, the keyboard route both ways)? J3 is not walked, by the design.
6. **WCAG and nielsen.** From the readings, judge WCAG 1.3.2, 1.4.4, 1.4.10, 1.4.12, 2.1.1, 2.1.2, 2.1.3, 2.3.3, 2.4.3, 2.4.7, 2.4.11, 2.4.12, 2.4.13, 3.2.1, 3.2.2, 3.2.5 and 4.1.3, and nielsen's "status visible and announced" and "errors say what next". A speech reading is a person's.
7. **Tests.** Do they cover what the item lists? Is anything the change does left untested? What outcome do they record for Copy's late result after a close and reopen, and is it a defect?

**Verdict:** one of "Commit", "Commit after the musts below", or "Do not commit". Give musts, shoulds and notes apart, each with its evidence. Write nothing to the repository.

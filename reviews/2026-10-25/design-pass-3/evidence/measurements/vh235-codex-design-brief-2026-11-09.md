<!-- markdownlint-disable -->

# VH-235 — a blind design check for Codex astra (read-only)

You are reviewing the design of a small fix, blind: you are not given anyone else's design. Work read-only in this repository (your current directory is the worktree `side/vh235` at base `73d16f085fc2bda8a76c79263b67d3034262aa78`). You may read anything in this repository. Do not read any folder under `side-session-notes/`, and in `/Users/uazjob/UoN-Video-Helper-side/` read nothing whose name starts `vh235-claude`, contains `compare`, or is `vh235-progress.md`, `vh235-handover-*`, or any `vh235-*brief*` other than this file.

## The item
`project/items/VH-235.md` (read it in full): the problem report's Copy result shown only in the opening that started it. Wish line VH-232.2 in `project/wish-list.md` records the current outcome. `src/main.ts`'s feedback block (`// --- Feedback (VH-93)`, about `:3649`–`:3828`): `setFeedbackStatus`, `openFeedback`, the `#feedback-copy` and `#feedback-close` handlers. `src/ui/reveal-status.ts` and its test's "Copy's delayed result" block. `index.html`'s `#feedback-dialog`.

## The owner's words (verbatim, 2026-11-08 ~23:03Z, "Yes, all six" to VH-203's points)
- Point 4: "The problem report's late "Copied" (VH-232.2): a fix item so a Copy result shows only in the opening that started it."
- Point 5: "The three literals (Codex's point 11): an exception for the media-query breakpoints (25rem, 19.99rem); the 1000 moves into `src/config/` with the next code change."
- Earlier (2026-10-27): "ensure everything passes UX / design / Accessibility". No new or changed string, element or `docs/` line is approved.

## Rules that bind
`project/rules.md` (Always), `project/digests/house-conventions.md` ("Config is the only home for numbers", "Minimal change discipline", Testing), `project/digests/nielsen.md` ("status visible and announced"), `project/digests/wcag-2.2-aaa.md` (4.1.3). Another item (VH-236) edits `src/main.ts` near `:2095`–`:2103`; this item's edit stays inside the feedback block.

## Settle, with reasons
1. **The guard:** what must be true when a Copy result settles for it to be written; where the state lives and where it is changed (consider Close, Escape as the native dialog's cancel, a close and reopen, a settle between `close()` and the `close` event, and whether anything else opens or closes the dialog). Whether a counter, a token or a check of `open` (or a combination) is the smallest correct guard; whether any number it needs is a house-rule literal.
2. **Where the logic lives:** inline in `src/main.ts`, or a small helper in `src/ui/` tested on stand-ins. The item requires tests of each late case (after Close, after Escape, after a close and reopen, each as success and as failure) and the same-opening case; `main.ts` has no unit tests. Name the helper's shape if you choose one.
3. **The failure's `log.warn('feedback', 'could not copy', …)`:** kept when the result is late, or not, and why.
4. **`src/ui/reveal-status.test.ts`'s "Copy's delayed result":** the item says it stays, its recorded-outcome comments made true, never deleted or skipped. Which comments or titles become false after the fix, and what the least true edit is.
5. **The `1000`** in `src/workers/job.worker.ts` (`Math.round(result.madeSeconds * 1000) / 1000`, the release guard's warn line, about `:284`): the constant's name and `src/config/` file; how a test pins the constant and the worker's use. And `:574`'s `/ 1000` (`wallSeconds`): does the owner's point 5 or the house rule reach it?
6. **The walk:** the item's cells (S-76, S-78k, S-80a, S-80b in the walker's `scenarios.mjs`) and its late route (a stand-in for `writeText` installed through CDP before the click, its promise held, then settled after Close, Escape, or a close and reopen). Is that route sound, and is it outside the walker (no file under `reviews/.../measurements/walker/` changed)? What must it read to prove the before (the defect) and the after (nothing written)? What qualifies it before use?
7. **Anything else** the fix could move: the live region's announcement, VH-232's reveal, focus, the status emptied at each opening, a language switch's repaint while closed or open, a second Copy in one opening.

## Answer
Numbered by the points above, each with a verdict and file:line evidence, then a short list of required changes to the item's plan, if any, and an overall line: "Build as designed below", or "Stop: <why>". Keep it under 1,200 words.

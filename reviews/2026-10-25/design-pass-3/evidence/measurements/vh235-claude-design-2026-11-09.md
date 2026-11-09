<!-- markdownlint-disable -->

# VH-235 #1 — Claude's design (saved 2026-11-09, before Codex's `design` answer is opened)

Base `73d16f0`; walker `7db38f355f3c46c2`. Item: `project/items/VH-235.md` in `$W`.

## 1. The defect, as the code stands
`#feedback-copy`'s handler (`src/main.ts` `:3807`–`:3821`) calls `navigator.clipboard.writeText(...)` synchronously in the click, then, when it settles, calls `setFeedbackStatus(copied)` or logs `could not copy` and calls `setFeedbackStatus(couldNotCopy)`. Nothing ties the settle to the dialog's state.
- **Close** (`#feedback-close`, `:3823`) calls `feedbackDialog.close()`. **Escape** is the native modal `<dialog>`'s cancel, then close; the app has no `cancel` or `close` listener on it. Both leave `open` false; neither touches `#feedback-status`.
- **Reopen** is `openFeedback` (`:3729`), the only `showModal()` caller: `setFeedbackStatus('')`, error hidden, `showModal()`, details gathered.
- So, VH-232.2's recorded outcome, the before to prove: a result settling after Close or Escape is written into the closed dialog's status (`show()` registers its paint; VH-232's reveal moves nothing, `dialog.open` false) and emptied, unread, by the next `openFeedback`; one settling after a close and reopen is written into the new opening, which never asked, and revealed there by VH-232's reveal as focus allows (focus on the message field), and announced by its polite live region.
- **How Chrome shows it:** a closed modal dialog is not rendered, so a write into it is neither seen nor announced; the visible defect is the reopen case: the next opening shows "Copied…" or "Could not copy…" with no Copy pressed in it.

## 2. The guard and where it sits
**An opening token, compared by identity, plus `open`.** A result is written only if, when it settles, the dialog is open AND its current opening is the one captured at the click. Either half alone fails a case: the token alone writes into a dialog closed but not yet reopened (and a token bumped on the `close` event races the clipboard's task, since `close` is fired by a queued task after `close()`); `open` alone writes into a reopened dialog. The token is a fresh `{}` per opening, so no number is kept (the house rule) and nothing can wrap.
- **Bumped in `openFeedback`, first line,** synchronously before `showModal()`, the only way the dialog opens. Close and Escape change only `open`; a reopen changes both.
- **Where the logic lives:** a small helper in `src/ui/`, because the item's tests (each late case, success and failure, and the same opening) cannot reach `main.ts`, which has no unit tests. Proposed `src/ui/copy-result.ts`:
  - `openings(dialog: { readonly open: boolean })` → `{ opened(): void; current(): () => boolean }`; `current()` captures the opening at the call and answers later `dialog.open && captured === latest`.
  - `settleCopy(copy: Promise<void>, here: () => boolean, on: { copied(): void; warn(cause: unknown): void; couldNotCopy(): void }): Promise<void>`: the same try/catch shape as now (`await copy; if (here()) on.copied()`; catch: `on.warn(cause)` always, then `if (here()) on.couldNotCopy()`), so a throw from the success write still falls to the catch as now.
- **`main.ts`, inside the feedback block only** (`:3650`–`:3830`, clear of VH-236's `:2095`–`:2103`): `const feedbackOpenings = openings(feedbackDialog)` beside the consts; `feedbackOpenings.opened()` as `openFeedback`'s first line; the Copy handler keeps `feedbackMessageOrError()` and calls `void settleCopy(navigator.clipboard.writeText(feedbackText(message, feedbackLines)), feedbackOpenings.current(), {...})`, `writeText` still called synchronously in the click (user activation), the three callbacks the existing two `setFeedbackStatus` thunks and the existing `log.warn` line, unchanged in text.
- **The failure's log is kept either way:** the warn is diagnostic, carries no media or name (only `cause.message`), and a failed copy is worth reporting whichever opening is on screen; nothing argues for dropping it.
- **The smaller alternative,** the guard inline in `main.ts` (a `let` token and two `if`s), is a few lines shorter but leaves the item's tests untestable; I take the helper. Not `feedback.ts` (its report functions, VH-232's line).

## 3. What stays
Each opening's `setFeedbackStatus('')`; VH-232's reveal and `setFeedbackStatus` unchanged; `#feedback-status` the same `<p class="status" role="status" aria-live="polite">`, text by `textContent`; no `focus()`, no scroll, no string, element, CSS or `docs/` line. A same-opening result is written and revealed exactly as now (S-80a, S-80b; focus moved by the user, VH-232's focus-wins). A language switch while closed has nothing new to repaint, since nothing late is written.

## 4. Tests
- `src/ui/copy-result.test.ts`, stand-ins (a dialog `{ open }`, a deferred clipboard promise, spies): same opening, success and failure, written; after Close, after Escape (the browser closing: `open` false, no app call), after a close and reopen, each as success and failure: nothing written, the warn still called on failure; a settle before Close written; two Copies in one opening both written; a Copy before a reopen dropped while one after it is written; a throw from `copied` falls to the catch as now.
- `src/ui/reveal-status.test.ts`'s "Copy's delayed result" stays and still tests the helper `revealStatus`; **comments only:** the describe's comment and the reopen case's "Recorded outcome" comment say that since VH-235 `main.ts` no longer writes a late result, so these cases record what the reveal would do if a late text reached it. The `it` titles stay (the brief's "comments only"); Codex is asked whether a title made false needs more.
- `src/ui/feedback.test.ts` intact.

## 5. VH-203.4, the `1000`
`src/workers/job.worker.ts:284`, `Math.round(result.madeSeconds * 1000) / 1000` in the release guard's warn line: both `1000`s become `MILLISECONDS_PER_SECOND` (value 1000) in `src/config/thresholds.ts`, beside `ENDS_EARLY_MARGIN_SECONDS`, imported by the worker. A test (`src/config/thresholds.test.ts`) pins the value and reads the worker's source: the warn line rounds by the constant, both places, with no bare `* 1000) / 1000` left. **`:574`'s `/ 1000`** (`wallSeconds`, the analysis pass's ms to s) is not named by the owner's answer: unchanged here; if Codex holds it to the rule, a `VH-235.n` wish line, not an edit. Not walked: no state shows a warn line; the table says so.

## 6. The walks
- **Matrix cells,** by a driver on `matrix.mjs --keys` with plans in memory (walker unchanged): S-80a, S-80b (12 each), S-78k (12), S-76 (9): 45 a side, before on clean `73d16f0`, after on the change.
- **The late route,** a driver route outside the walker, in memory, qualified before use: through CDP before the click, `navigator.clipboard.writeText` replaced by a stand-in whose promise is held; the step (Close by click, Escape by `Input.dispatchKeyEvent`, or Close then `#feedback-open`); then the held promise resolved or rejected (`NotAllowedError`). Read at once and after a settle: `#feedback-status` text, its `role`/`aria-live`, `dialog.open`, `scrollTop`, the focused element, and the AX tree's live region. Qualification: the stand-in settled in the same opening reproduces S-80a's and S-80b's texts. 18 + 6 = 24 a side. Before: the reopen case shows the late text in the new opening; Close and Escape show it written into the closed dialog. After: nothing written in all six; same opening unchanged.
- **Not a walker change:** nothing in `$M/walker/` is edited; the route is the driver's own.

## 7. Risks and points for Codex
1. The token and `open` together: is either half removable? 2. The helper vs inline. 3. The warn kept. 4. The reveal test titles. 5. `:574`. 6. Any path that opens the dialog other than `openFeedback`, or a reopen inside one task.

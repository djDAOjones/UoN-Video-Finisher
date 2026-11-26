# VH-239 — evidence note

A status that has stopped being true is taken away, and one that has not changed is not said again. Built 2026-11-25 by the builder for VH-239, in the owner's checkout, nothing committed. Read in Chrome (the app's built-in browser pane, one tab of my own, closed afterwards) at `http://localhost:5174/`, en-GB, 1280 px, and C-03 once more at 375 px.

## What changed, file by file

- `src/ui/drop-zone.ts` (C-03). New exported rule `refusalEnded(refusedFor, busyNow)`: a refusal ends when it was raised for what the page was busy with and the page is no longer busy with that. `installDropZone` now returns `{ repaint, settle }` (type `DropRefusal`) in place of the one repaint function: `repaint` is the old function unchanged, `settle` forgets and empties a refusal whose cause has ended and writes nothing otherwise. The analyst's design, checked against the code and kept.
- `src/ui/preview-refusal.ts` (wish VH-236.1). `createPreviewRefusal` gains `fileChanged()`: if the node the last refusal wrote is still the announcer's only child, the announcer is emptied; either way that node is forgotten. `RefusalAnnouncer.replaceChildren` now takes zero or more nodes, so it can be called empty. The analyst's design, kept.
- `src/ui/progress.ts` (C-11). New exported rule `outcomeEndsAtNewCheck(of)`: true for `failed` and `cancelled`, false for `ready`, `stage` and `none`. Put beside `outcomeTitle` so a Node test can hold "Ready stays".
- `src/main.ts`:
  - C-03: `applyControlLock` calls `dropRefusal.settle()`. Every end of a cause already comes through there: `setJobInFlight(false)` (finished, failed, cancelled), `setSaveInFlight(false)`, `settleStartup`. The constant is renamed `repaintDropRefusal` → `dropRefusal`; the language change calls `dropRefusal.repaint()`.
  - C-11: new `titleMovesOn()` beside `setTitle`, called in `commitTrim` and in the output choice's `change` handler, each after the "this file has been read" guard, beside `beginSelection()`.
  - VH-236.1: the file `change` handler calls `previewRefusal.fileChanged()` straight after `clearTrim('reading')`.
  - C-06: `renderTrim` paints the two error lines with the page's existing `paintLine` (compare before write) in place of the unconditional `textContent` and `hidden` writes; `commitTrim` says its status sentence through a local `sayOnce`, which calls `setStatus` only when `#status` does not already hold that sentence. `setStatus` itself and every other caller are untouched.
- Tests: `src/ui/drop-zone.test.ts`, `src/ui/preview-refusal.test.ts`, `src/ui/progress.test.ts` (below).

No key in `src/i18n/` added, removed or edited. No element, control, CSS, number literal, dependency or `docs/` line. `index.html`, `src/styles/app.css`, `test/stylesheet.test.ts`, `DEV-INFRASTRUCTURE.md`, `scripts/check-placeholders.mjs` and `project/` not touched.

## Acceptance criteria

### 1. A refused drop's message goes when its cause ends (C-03)

Read with a `MutationObserver` on `#drop-error`; the drop is a synthetic `dragenter`/`dragover`/`drop` on `#drop-zone` carrying one `File`.

| Case | Before (analyst, and the code) | After (measured) |
| --- | --- | --- |
| Job finished (`dynamic-40s.mp4`, 1280 px) | "A video is being made. Cancel it, or wait for it to finish, before choosing another." still there with the chooser enabled | Said once during the job; emptied when the job finished (2 writes in all: the sentence, then empty). Line height 42 px → 0 |
| Job cancelled (1280 px) | same | Still there straight after Cancel was pressed, while "Cancelling…" showed (the job had not yet answered: its cause still held); emptied 9 ms later when the job answered "Cancelled" |
| Job cancelled (375 px) | same | Line 63 px → 0; `#drop-zone` 149 px → 78 px, its idle height; no sideways scroll (`scrollWidth` 375) |
| Start-up settled | "The tool is still getting ready. Drop the video again in a moment." stays | Read in a same-origin frame so the drop could land before the check settled: refused at 74 ms with that sentence, chooser disabled; empty at 132 ms, chooser enabled |
| Two files dropped while idle, then a job started and cancelled | not cleared | "That was 2 files. Drop one video at a time." through the job and after its end: 1 write, never cleared |
| Save ended | stays | NOT read in Chrome: Save opens the native dialog, which the brief forbids. Held by the stand-in test (`saving` → `null`) and by `setSaveInFlight` calling `applyControlLock` |
| Job failed | stays | NOT raised in Chrome (see C-11). Same path as finished and cancelled: `setJobInFlight(false)` in the job's `finally` |

A refusal in a browser the start-up check blocked (`unavailable`) stays: that cause does not end (stand-in test).

### 2. The tab's title returns to the page's name when a choice is changed after a cancelled or failed job (C-11)

| Step | Before (analyst) | After (measured) |
| --- | --- | --- |
| Job cancelled | "Cancelled — UoN Video Finisher" | same |
| End time changed (0:30 → 0:25) | stayed "Cancelled — …" through "Checking…" and the new "Ready to go" | "UoN Video Finisher" at once, and after the check |
| Output choice changed (best → smaller) after another cancel | stayed "Cancelled — …" | "UoN Video Finisher" at once, and after the check |
| Job finished, End time changed, check re-run, result still on the page | "Ready — UoN Video Finisher" (today's behaviour) | "Ready — UoN Video Finisher" throughout: kept |

Which choice changes are covered, and why. The rule I took from the code: the title's outcome goes when the status line's outcome goes. `commitTrim` (both handles, both fields, Set start here, Set end here, Use the whole video) and the output choice replace "Cancelled." on `#status` with "Checking…" or the trim error; those two are covered. The title card box, the closing's controls, Video type and Video language start no new check (their handlers only withdraw the discard question), and I read in Chrome that after each of them `#status` still says "Cancelled. Nothing was saved, and your original file is unchanged." and the title still says "Cancelled — …": the two agree, the page has not moved on, so they are left alone. "Check again" cannot be reached with a stale title (it is offered only after a check that a trim, output or file change started, each of which has already reset it). A new file already resets the title.

Not raised in Chrome: a failed job. The dev-only "Trigger test error (worker)" pressed during a job did not fail it (the job finished, "Ready"). `failed` takes the same line of code as `cancelled`, and the rule is held by the Node test.

Seen, not changed (outside the criterion, a person's call): when a new job starts, the title keeps the last outcome ("Ready — …" read at the press of "Discard it and start again") until the job's first stage report replaces it, about a second later in my run at the latest.

### 3. A refused preview's announcement is emptied when a new file is chosen (wish VH-236.1)

No fixture has a preview the player refuses and the job accepts (`clip-8s.webm`, `portrait-10s.mp4`, `silent-10s.mp4` and `talk-30s.mp4` all preview here), so the refusal was raised as S-32's walker fault F7 does: an `error` event dispatched on `#trim-preview` after the file is read. `#page-announcer` read with a `MutationObserver`.

| Route | Before (the wish) | After (measured) |
| --- | --- | --- |
| Case 1: `talk-30s.mp4`, preview refused, then `notvideo.mp4` | "…You can still set the times." stands after the read fails and the trim is withdrawn | "A preview is not available for this file. You can still set the times." → empty at the choosing → still empty after the read failed (step 2 hidden) |
| Case 2: `talk-30s.mp4`, preview refused, then `silent-10s.mp4` (previews) | the first file's words stand | empty at the choosing and after the read |
| Another announcement: preview refused, then "Trigger test error (main)", then `notvideo.mp4`, then `talk-30s.mp4` | n/a | "A problem was found. Use Report this problem in Errors captured to send the details." unchanged through both choosings and the read failure; no write to the announcer after it |
| "A problem was found…" standing, four files chosen in turn, no refusal | n/a | 0 writes to the announcer |

The first-sentence-alone form (step 1 refused the file) then a new file is held by the stand-in test, not walked.

### 4. An unchanged trim error or status sentence is not written again (C-06)

`talk-30s.mp4`; `MutationObserver` (child list, character data, subtree) on `#trim-end-error`, `#trim-start-error` and `#status`. Keys are `keydown` events dispatched on `#trim-start-range`.

| Step | Writes to `#trim-end-error` | Writes to `#status` |
| --- | --- | --- |
| Before, by the analyst: `abc` in End, ArrowRight ×3 on the Start handle | 6 | 3 |
| After: `abc` typed in End | 1 | 1 ("Correct the start and end times in step 2 to continue.") |
| After: ArrowRight ×3 on the Start handle (handle moved 0 → 3) | 0 | 0 |
| After: five `input` events on the Start handle (a drag) | 0 | 0 |
| End fixed (0:20) | 1 (emptied, hidden) | 1 ("Checking…") |
| End broken again (`abc`) | 1 | 1 |
| Fixed, then broken a third time (`xyz`) | 1 each time | 1 each time |
| Language changed to zh-Hans with the error standing | 1 (the sentence in Chinese) | 1 |
| ArrowRight ×3 in zh-Hans | 0 | 0 |

`#trim-start-error`: 0 writes throughout. One step further than the analyst's finding, by the same rule and the task's wording ("does not call `setStatus` with the sentence the status line already holds"): with no error, ArrowRight ×3 on a handle now writes "Checking this video against your device…" once, not three times.

Not changed, as told (`setStatus`'s other callers): `runPreflight` writes "Checking…" again when the re-check starts after the trim's pause, and writes the trim sentence again if the output choice is changed while a trim error stands. One write per deliberate change, not per key.

### 5. No word, key, control, `docs/` line or dependency; no test deleted, skipped or weakened

Held: see "What changed". The existing tests in the three test files are unedited; only added to. Two older tests in `preview-refusal.test.ts` ("a refusal, then an unreadable file: the first sentence stands…", "does not take an earlier file's words as this file's") model a new file without the new call; they still pass and still hold `trimWithdrawn`'s own guards. The page's real sequence is now in the new tests beside them. If the orchestrator would rather their titles said so, that is a wording change to a test I did not make.

### 6. The gate, and the reading

`npm run check` is the orchestrator's. Mine, all green:

- `npx vitest run src/ui/drop-zone.test.ts src/ui/preview-refusal.test.ts src/ui/progress.test.ts test/kept-identifiers.test.ts test/readability.test.ts test/screen-text.test.ts src/ui/reveal-status.test.ts` → 7 files, 239 tests passed (the last four read `src/main.ts` as text).
- `npm run typecheck` → clean.
- `npx eslint` on the seven files changed → clean.

## Tests added

- `drop-zone.test.ts`: `refusalEnded`'s table (holds while the cause holds; ends at `null`, at making → saving, at starting → unavailable; never for a refusal of the drop itself). The zone installed on stand-in elements, every write to the message logged: a making, saving and starting refusal each stays while it holds with no second write (it is `role="alert"`), goes when it ends, and is not brought back by a repaint; an `unavailable` one stays; a two-file and a not-a-video refusal survive a later job and save and their ends with one write; nothing is written when no refusal shows. (10 tests.)
- `preview-refusal.test.ts`, in each of the three languages: a refusal then a new file empties the announcer, both sentences or the first alone; then a file that cannot be read: empty at the choosing, nothing at the read failure; another sentence said since is left alone, at this file and later ones; nothing written to an emptied announcer or where no preview was refused; the next file's own refusal is said and shortened as the first was. (5 tests × 3 languages.)
- `progress.test.ts`: `outcomeEndsAtNewCheck` for all five states. (1 test.)

`paintLine` in `renderTrim` and `sayOnce` in `commitTrim` are in `src/main.ts`, which has no Node test; they are the Chrome counts above.

## Console

No error from this change. Seen in the tab, for the record: my own two deliberate dev-button errors; Chrome's "Blocked attempt to show a 'beforeunload' confirmation panel" when I reloaded over an unsaved result; mediabunny's "A VideoSample was garbage collected without first being closed" after cancelled jobs (worker code, not touched here; I cannot say whether it is new, having no before to run); and once, on one page load of six, "Worker did not answer "ping" within 5000 ms" from the start-up check while other work was running on the machine. It did not recur on later loads. The orchestrator may want to look at the last two.

## Left as I found it, and what I changed in the shared origin

My video-language click wrote `uon-video-helper:video-language` = `ms-MY` to the dev origin's `localStorage`; I removed the key (the page follows its own language again, en-GB). `language` = `en-GB` and `video-kind` = `staff` stand, as they read when my tab opened. The output choice went back to Best quality on reload.

## Only a person, or the full walk, can read

- What a screen reader says of any of this: an emptied `#drop-error` (an alert) and an emptied `#page-announcer` (polite), and that the unwritten trim error and status are indeed not said again.
- The page moving when the refusal leaves: `#drop-zone` gives back 42 px at 1280 px and 71 px at 375 px at the moment the job ends, so everything below step 1 moves up by that much while the reader is at step 6. It is the same move a new drag already makes; whether it is felt is a person's.
- The save-ended and job-failed cases of C-03 and the failed case of C-11 in a real browser (Save's native dialog; no way to fail a job with the fixtures).
- zh-Hans and ms-MY, dark, and the Mac Pro's walk: nothing visible moves except `#drop-error` leaving, so I read en-GB only, and one zh-Hans pass of C-06.

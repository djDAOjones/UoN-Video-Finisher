# VH-243 — the review's three mends: evidence (builder, 2026-11-25)

Answers the independent review of VH-238, VH-239 and VH-241 (`scratchpad/ux-loop2/review-of-fixes.md`): one behaviour risk, one phone risk, the unpinned wiring. Built on the working tree after the orchestrator committed VH-240 (`3ae6877a`). No word, key, element, token, dependency or docs line added or changed; nothing in `project/` touched; no git command that changes anything.

## What changed, file by file

- `src/ui/trim.ts` — new exported type `TrimCommit = 'handle' | 'given'` and pure rule `trimStatusOwed(by, held, sentence)`: `by === 'given' || held !== sentence`. JSDoc says why.
- `src/main.ts` — `commitTrim()` became `commitTrim(by: TrimCommit)`. Its local `sayOnce` is now `say`, which asks `trimStatusOwed(by, statusLine.textContent, sentence())` before `setStatus`. The seven callers name their source: the two handles' `change` (a drag's end) and the handles' `keydown` pass `'handle'`; a time field's `change`, "Set start here", "Set end here" and "Use the whole video" pass `'given'`. Two imports added at the top. Nothing else in the function moved.
- `src/styles/app.css` — `.dialog`: `max-height: calc(100vh - 2 * var(--spacing-05))` → `calc(100dvh - 2 * var(--spacing-05))`; two lines added to the comment above it. `max-width` and `width` (`100vw`) untouched.
- `src/ui/trim.test.ts` — one new `describe`, four tests, for `trimStatusOwed`.
- `test/stylesheet.test.ts` — the VH-241 assertion now pins `100dvh`, refuses `100vh` in `.dialog`, and pins the `width` line's `100vw`; the literal-length guard learned the unit `dvh` (below).
- `test/screen-text.test.ts` — four new `describe`s appended (13 tests): VH-238, VH-239, VH-240 and VH-243's own wiring.

## 1. `sayOnce` narrowed to the handle's path

How `commitTrim` was called, read from the code: `trimStartRange`/`trimEndRange` `change` (fires once when a drag ends; the keys never reach it, their `keydown` is `preventDefault`ed); the handles' `keydown`; the two time fields' `change`; three buttons' `click`. The distinction is passed as one argument, the simplest way the code allows; the rule is a pure function with a Node test, as `pickedAgain` is.

Read in Chrome (the built-in browser's own tab, Chrome 156, `http://localhost:5174/`, en-GB, 1280 × 900, `talk-30s.mp4`). `MutationObserver` (child list, character data, subtree) on `#trim-end-error`, `#trim-start-error` and `#status`, counted with `takeRecords()` synchronously after each step. Typed times are `value` set then a `change` event; keys are `keydown` events on the handle.

C-06's measured result, kept:

| Step | `#trim-end-error` | `#trim-start-error` | `#status` | Status line after |
| --- | --- | --- | --- | --- |
| `abc` typed in End time | 1 | 0 | 1 | "Correct the start and end times in step 2 to continue." |
| ArrowRight ×3 on the Start handle (0 → 3) | **0** | 0 | **0** | unchanged |
| Five `input` events on the Start handle (a drag) | 0 | 0 | 0 | unchanged |
| The drag's `change` on the Start handle | 0 | 0 | 0 | unchanged |
| PageUp on the Start handle (8 → 18) | 0 | 0 | 0 | unchanged |

The reviewer's scenario, mended (continuing, End still `abc`):

| Step | `#trim-end-error` | `#trim-start-error` | `#status` | Status line after |
| --- | --- | --- | --- | --- |
| `xyz` typed in Start time (both bad now) | 0 | 1 | 1 | "Correct the start and end times…" |
| **End corrected to `0:20` by typing, Start still bad** | 1 (emptied, hidden) | 0 | **1** (was 0 after VH-239; the same sentence, written again) | "Correct the start and end times…" |
| The same good End typed again | 0 | 0 | 1 | same |
| ArrowLeft ×3 on the End handle, Start still bad | 0 | 0 | 0 | same |
| "Set end here", Start still bad | 0 | 0 | 1 | same |
| Start corrected to `0:02` (End now before Start) | 1 | 1 | 1 | same sentence; End says "The end must come after the start." |

Create (`#process-actions`) stayed hidden throughout. The other sentence, "Checking this video against your device…":

| Step | `#status` |
| --- | --- |
| "Use the whole video" with the range problem standing | 1 ("Checking…") |
| ArrowRight ×3 on the Start handle inside the pause | 0 |
| End typed `0:25` inside the pause | 1 ("Checking…" again, as before VH-239) |
| "Set start here" inside the pause | 1 |

After the pause the check ran and landed: "Device check complete. Ready to go…", Create back, `#step-create` with no inline `min-height` left (VH-240's hold released), no console error.

The "before" for the mended row is the reviewer's reading of the committed code, not a measurement of mine (no stash); the code then read `if (statusLine.textContent !== sentence()) setStatus(sentence)` for every caller, which is 0 by inspection.

## 2. The dialog's `max-height` on the dynamic viewport

`test/stylesheet.test.ts`, the literal guard: its unit list was `px|rem|em|ch|vh|vw|vmin|vmax|s|ms`, so `100dvh` passed, but only because the regex did not see `dvh` at all, and `37dvh` would have passed with it. So `dvh` does not pass "the same way `vh` does" unless the guard knows the unit. **The exemption is extended, and this is the one place a test's rule changed:** `dvh` joins the unit list, and the filter that lets `100vh`/`100vw` through became `/^100(?:v[hw]|dvh)$/`. Checked in Node against samples: `calc(100dvh - …)` → nothing flagged; `calc(37dvh - 1px)` → `37dvh` and `1px` flagged (the old regex flagged only `1px`); `1100dvh` flagged; `100vw`, `100vh` still exempt. The guard is stricter than before, not weaker. The comment naming the exemptions says so ("the dynamic viewport's height … among them (VH-243)"). `UI-STANDARDS.md` already calls these "viewport fills"; not edited.

Measured in Chrome 156, the feedback dialog opened from the footer, each language, "What will be sent with it" closed then open. In each state the dialog was read as shipped (`100dvh`) and again with the previous rule set inline on that element in my tab (`calc(100vh - 2 * var(--spacing-05))`, removed afterwards): a same-session before and after. On a desktop the two viewports are equal, so the result should be identical, and is:

| Window | Language | Closed: x, y, w × h | Open: h | Computed `max-height` | Same with `100vh`? | VH-241's evidence, item 7 |
| --- | --- | --- | --- | --- | --- | --- |
| 1280 × 900 | en-GB | 320, 16, 640 × 562 | 868 | 868px | yes | 562 at y 16; summary y 396 → 396 (396 measured) |
| 1280 × 900 | zh-Hans | 320, 16, 640 × 538 | 845 | 868px | yes | 538; summary y 372 (372 measured) |
| 1280 × 900 | ms-MY | 320, 16, 640 × 562 | 868 | 868px | yes | 562 |
| 375 × 812 | en-GB | 16, 16, 343 × 624 | 780 | 780px | yes | 624 at y 16; summary y 362 (362 measured) |
| 375 × 812 | zh-Hans | 16, 16, 343 × 568 | 780 | 780px | yes | 568 |
| 375 × 812 | ms-MY | 16, 16, 343 × 568 | 780 | 780px | yes | 568; summary y 362 |
| 320 × 568 | en-GB | 16, 16, 288 × 536 | 536 | 536px | yes | full height, no move (content 622) |
| 320 × 568 | zh-Hans | 16, 16, 288 × 536 | 536 | 536px | yes | content 622 |
| 320 × 568 | ms-MY | 16, 16, 288 × 536 | 536 | 536px | yes | content 670 (670 measured) |

Same sizes and positions as VH-241 left them, at all three sizes. The served rule was read back from the page's stylesheet: `max-height: calc(100dvh - 2 * var(--spacing-05))`, `width` and `max-width` still on `100vw`. No horizontal scroll at 320 px. The language was put back to en-GB (the stored value read back as `en-GB`; video type untouched, `staff`).

## 3. The wiring pinned (`test/screen-text.test.ts`)

Source-text assertions over `src/main.ts`, in the file's own style. Three small helpers at the margin (`functionBody`, `listenerBody`, `preflightBody`) cut out a function's or a listener's body.

- **VH-238** (4 tests): the `change` handler opens `const file = fileInput.files?.[0]` / `if (!file) return` / `chosenFile = file`, and `chosenFile =` appears once in the file; `fileInput.files` appears exactly three times (the take-up, the `cancel` rule's argument, the redaction set's loop, each pinned where it is); the six later readers ask `chosenFile` (output change, trim commit, Check again, `resultOnScreen`, `resultOfChosenFile`, the card's "Previous video"); the `cancel` listener's body is exactly the `pickedAgain(` guard and the `change` dispatch, and `pickedAgain(` is called once.
- **VH-239** (4 tests): `dropRefusal.settle()` inside `applyControlLock`, once in the file; `previewRefusal.fileChanged()` in the `change` handler after `clearTrim('reading')`, once; `titleMovesOn()` after the read-file guard and `beginSelection()` in both `commitTrim` and the output's `change`, with the definition's body; `paintLine(line, own)` in `renderTrim`, no direct `textContent` write of a line there, and `paintLine`'s own compare-before-write.
- **VH-240** (3 tests): `createStepHold.hold()` three times in the file, in `commitTrim` and the output's `change` before `processActions.hidden = true` and `withdrawVerdict()`, and in Check again directly before `runPreflight`; `runPreflight` ends `} finally { if (current()) createStepHold.release() }`; the two "trim cannot be used" paths release.
- **VH-243** (2 tests): `commitTrim` asks `trimStatusOwed` and calls `setStatus` nowhere else; three `commitTrim('handle')` (two `change` listeners, the `keydown`), four `commitTrim('given')` (the fields' `change`, three buttons); no `commitTrim()` without a source.

**Each pin fails when its wiring is reverted: proved, not reasoned.** Product source was not edited. A throwaway test file (`test/zz-vh243-throwaway.test.ts`, the same 13 tests over a copy of `main.ts`'s text doctored in memory, chosen by an environment variable) was run once per doctoring and then deleted (`ls test | grep zz` → nothing; `git status` shows only my six files). Each doctoring also threw if it changed nothing.

| Doctored copy | Tests failing (of 13) |
| --- | --- |
| none | 0 |
| 238: `chosenFile = file` removed | 1: takes the file up… |
| 238: `commitTrim` reads `fileInput.files?.[0]` again | 2: six later readers; three places and no more |
| 238: `resultOnScreen` reads the list again | 2: same two |
| 238: `cancel` listener removed | 2: three places; the same file picked again |
| 238: `cancel` listener without the dispatch | 1: the same file picked again |
| 239: `dropRefusal.settle()` removed | 1: settles a refused drop |
| 239: `previewRefusal.fileChanged()` removed | 1: takes a refused preview's words away |
| 239: `titleMovesOn()` removed from `commitTrim` | 1: moves the tab's title on |
| 239: `titleMovesOn()` removed from the output's `change` | 1: same |
| 239: `paintLine(line, own)` back to two direct writes | 1: writes the trim's two error lines |
| 240: `hold()` removed from `commitTrim` | 1: takes the hold in three places |
| 240: `hold()` removed from the output's `change` | 1: same |
| 240: `hold()` removed from Check again | 1: same |
| 240: the `finally` release unguarded | 1: gives the hold up when its check ends |
| 240: the `finally` release removed | 1: same |
| 243: the fields' `change` passes `'handle'` | 1: names what committed |
| 243: the rule replaced by VH-239's plain comparison | 1: asks the rule |
| 243: every caller `'handle'` | 1: names what committed |

The stylesheet assertion fails on a revert by construction: it requires `100dvh` and refuses `100vh` in `.dialog`.

## Tests added

- `src/ui/trim.test.ts`: `whether a commit says its status sentence (VH-243)`, 4 tests. Categories: happy path (a new sentence is said by either source), regression C-06 (handle, same sentence: not said), regression for the review's scenario (given, same sentence: said), empty (`null` text). Boundary, permission and persistence: not applicable to a two-term rule.
- `test/screen-text.test.ts`: 13 tests as above.
- `test/stylesheet.test.ts`: no new test; one assertion updated and two added inside the VH-241 test; the guard's unit list extended.

## Commands run

- `npx vitest run test/screen-text.test.ts test/stylesheet.test.ts src/ui/trim.test.ts` → 3 files, 236 tests passed.
- The same plus the other tests that read `main.ts` (`test/readability.test.ts`, `test/kept-identifiers.test.ts`, `src/ui/reveal-status.test.ts`) → 6 files, 281 passed.
- `npm run typecheck` → clean.
- `npx eslint src/main.ts src/ui/trim.ts src/ui/trim.test.ts test/screen-text.test.ts test/stylesheet.test.ts` → clean, exit 0.
- Not run, by the brief: `npm run check`, the whole suite, the build, `node tools/check.mjs`.

One comment line in `commitTrim` was reworded after the Chrome reading (comment only; tests, typecheck and lint re-run after it).

## Not done, and why

- No fallback `max-height` line for a browser without `dvh` (Chrome before 108, Safari before 15.4): the task asked for the one value, and there the declaration is dropped and the browser's own modal limit (`calc(100% - 6px - 2em)`) still bounds the dialog. If the owner wants the old line kept as a fallback beneath, it is one declaration and one assertion.
- The review's two NITs left alone, as not in this task: `runPreflight` writing "Checking…" again after its pause, and the narrow message box's four and a quarter lines.
- VH-238's premise (a plain Cancel leaves the list's objects as they were) is still unread in a real chooser: the native dialog is not mine to open (wish VH-238.1 stands).
- Dark, and zh-Hans/ms-MY for item 1: no colour and no word changed; the rule compares the line's text with the sentence in whatever language is showing, as VH-239's did.

## Only a person or a device can read

- What a screen reader says: that the re-written, unchanged sentence is spoken again when End is corrected (the DOM write is measured; the speech is not), and that a handle's keys stay quiet.
- The `dvh` fix itself: on a phone with Chrome's address bar showing, that the full-height dialog's foot is inside the visible window. A desktop cannot show the difference; here the two units compute to the same pixels, which is all the table above proves.

## Digest rules applied

UI-STANDARDS "System status" (a live region is for validation and outcomes, never a control's own result on the keystroke that produced it); WCAG 4.1.3; house conventions: pure function with its test, numbers in tokens (the literal guard extended, not loosened), minimal change, no hollow test (each pin shown to fail).

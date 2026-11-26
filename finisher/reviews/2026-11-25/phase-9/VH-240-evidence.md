# VH-240 — Step 6 keeps its height while the device check runs again: evidence

Date: 2026-11-25. Builder's note for the orchestrator. Read in the built-in browser (my own tab, closed at the end) at `http://localhost:5174/`, Chrome on the MacBook Pro, light scheme. Nothing committed, nothing staged, no `git add`.

## What changed, file by file

### `src/ui/height-hold.ts` (new)

`createHeightHold(element)` returns `{ hold(), release() }`.

- `hold()` reads the element's own rendered height (`getBoundingClientRect().height`) and writes it as the element's inline `min-height` in px. A hold already standing is left as it is.
- `release()` takes the inline `min-height` off.
- The hold IS the inline style: there is no second flag to fall out of step with it. No number is written in the code; the value is measured. No CSS was added, so `app.css` and the tokens are untouched.

### `src/ui/height-hold.test.ts` (new)

Nine Node tests over a stand-in element (a border box as tall as its content or its `min-height`, whichever is more).

### `src/main.ts` (42 lines added, none removed or moved)

One `createStepHold = createHeightHold(#step-create)` and nine call sites:

| Where | Call | Why |
| --- | --- | --- |
| `presetChoice` `change` handler, before Create's row is hidden | `hold()` | an output change starts a re-check |
| `commitTrim()`, before Create's row is hidden | `hold()` | a trim change starts a re-check (after the 500 ms pause) |
| `checkAgainButton` click, before `runPreflight` | `hold()` | Check again starts a re-check |
| `runPreflight`, new `finally` on its existing `try`: `if (current()) release()` | `release()` | every end of a check that still belongs to the selection: verdict (proceed, warn), block, failed reply, thrown or timed-out request, a `cancelled` reply. It runs after the painting in the same task, so the step moves once. A check that was replaced (`!current()`) leaves the hold to whatever replaced it |
| `runPreflight`, the trim-problem early return | `release()` | no check runs |
| `commitTrim()`, the trim-problem branch | `release()` | no check follows until the trim is put right |
| `stopCheckButton` click | `release()` | "Check stopped." is painted; no check is running |
| `fileInput` `change` handler | `release()` | a new file: the room held was the previous file's |
| `beginJob()` | `release()` | belt and braces; see "Create pressed" below |

## Design points, and what I chose

- **Where the hold lives: `#step-create` itself.** What a check withdraws lies on both sides of the status line: `#preflight-report` and `#audio-warnings` above it, `#process-actions` and `#create-note` below it. Holding the parts would need four holds and would leave a blank gap above "Checking…". Holding the step keeps everything outside it still (the footer, the page's scroll height) and shows "Checking…" exactly where it showed before this change: straight under the heading.
- **Exact height.** The stylesheet sets `box-sizing: border-box` on everything, so the border-box height read is the height `min-height` sets. Fractions are kept (a 905.062 px step was held at `905.062px`).
- **The first check holds nothing.** `hold()` is called only by the three things that start a RE-check. The file's first check comes through the `inspect` path, which never calls it, and choosing a file releases any hold standing.
- **A shorter new verdict shrinks once.** The release is in `runPreflight`'s `finally`, after the new content is painted and in the same task, so no frame shows the step both empty and unheld.
- **A second change mid-check keeps the ORIGINAL height.** `hold()` does nothing while a hold stands. It cannot ratchet (it does not measure again) and cannot collapse (nothing clears it but a release).
- **A language switch mid-check** leaves the hold alone: the check is still running. The held px is the old language's height; it goes when the verdict lands.
- **No stale hold.** A hold is taken only when a check or its pause begins, and every path that ends one releases. The one path that ends without a release is a check replaced by a newer selection, which either took the hold over (trim, output) or released it (new file, Stop).

## Acceptance criteria

### 1. While a re-check runs, step 6 is no shorter than when the check began; released on the verdict, a refusal, a failure, and a new file

Method. A sampler in the page recorded `#step-create` height, `document.documentElement.scrollHeight`, `scrollY`, whether "Create the video" is displayed, the inline `min-height`, `#status` text, the text length of `#preflight-report` and `#audio-warnings`, the stop row's button and `document.activeElement`. It sampled on every DOM mutation inside step 6 (the state at the end of each task, which is all a frame can paint), on every animation frame and every 16 ms. The page was scrolled to the bottom before each action.

BEFORE was read two ways: the analyst's numbers, and on this build with the hold made ineffective by an injected rule (`#step-create { min-height: 0 !important }`, which outranks the inline style). The emulated BEFORE reproduces the analyst's numbers exactly.

A cell reads: step height | scroll height | `scrollY`.

| Viewport, language, file | Action | BEFORE | AFTER |
| --- | --- | --- | --- |
| 1280 × 900, en-GB, talk-30s | trim | 605→183→605 \| 3917→3495→3917 \| 3017→2595→3017 | 605 \| 3917 \| 3017 |
| | output | 605→183→605 \| 3917→3495→3917 \| 3017→2595→3017 | 605 \| 3917 \| 3017 |
| 1280 × 900, en-GB, silent-10s | trim | 584→183→584 \| 3896→3495→3896 \| 2996→2595→2996 | 584 \| 3896 \| 2996 |
| | output | 584→183→584 \| 3896→3495→3896 \| 2996→2595→2996 | 584 \| 3896 \| 2996 |
| 1280 × 1300, en-GB, talk-30s | trim | 605→183→605 \| 3917→3495→3917 \| 2617→2195→2617 | 605 \| 3917 \| 2617 |
| | output | 605→183→605 \| 3917→3495→3917 \| 2617→2195→2617 | 605 \| 3917 \| 2617 |
| 1280 × 1300, en-GB, silent-10s | trim | 584→183→584 \| 3896→3495→3896 \| 2596→2195→2596 | 584 \| 3896 \| 2596 |
| | output | 584→183→584 \| 3896→3495→3896 \| 2596→2195→2596 | 584 \| 3896 \| 2596 |
| 375 × 812, en-GB, talk-30s | trim | 813→183→813 \| 4663→4033→4663 \| 3851→3221→3851 | 813 \| 4663 \| 3851 |
| | output | 813→183→813 \| 4663→4033→4663 \| 3851→3221→3851 | 813 \| 4663 \| 3851 |
| 375 × 812, en-GB, silent-10s | trim, output | the same three sequences | 813 \| 4663 \| 3851 |
| 375 × 812, zh-Hans, talk-30s | trim, output | 771→183→771 \| 4653→4065→4653 \| 3841→3253→3841 | 771 \| 4653 \| 3841 |
| 375 × 812, ms-MY, talk-30s | trim, output | 942→183→942 \| 5102→4343→5102 \| 4290→3531→4290 | 942 \| 5102 \| 4290 |
| 1280 × 900, zh-Hans, talk-30s | trim, output | 563→183→563 \| 3968→3588→3968 \| 3068→2688→3068 | 563 \| 3968 \| 3068 |
| 1280 × 900, ms-MY, talk-30s | trim, output | 605→183→605 \| 4137→3715→4137 \| 3237→2815→3237 | 605 \| 4137 \| 3237 |

The analyst's BEFORE for the first and fifth rows: 605 → 183 → 605; 3917 → 3495 → 3917; `scrollY` 2617 → 2195 → 2617. The same.

At 375 × 812 the pane emulates a phone (Android user agent), so the verdict is the warning "This may not finish on a phone or tablet" with "Continue anyway": the warn outcome was read there, the proceed outcome at 1280 px.

Check again, read after Stop the check (the only way to reach it without a failure), in every row above: the step is 183 px with "Check stopped."; the hold is taken at `183px`; the step grows once, 183 → 605 (584, 813, 771, 942, 563), when the verdict is painted. No intermediate height.

Every way a check ends, read at 1280 × 900, en-GB, talk-30s unless said:

| Path | Read |
| --- | --- |
| Verdict painted (proceed) | hold `605px` at 1 ms, off in the same sample that shows the verdict (395 to 1249 ms); height 605 throughout |
| Verdict painted (warn) | the 375 × 812 rows: hold `813px`, off with the verdict |
| The check failing (SIMULATED: the next `preflight` request kept from the worker and answered `check-failed` after 400 ms) | hold `605px`; at 404 ms the failure box is painted and the hold is off in the same sample; the step shrinks ONCE, 605 → 324 |
| Check again from that failure's box | hold `324px` at 2 ms; 324 held to 900 ms; then 605 with the verdict. One move |
| Stop the check | hold `605px`; at 130 ms "Check stopped." and Check again are painted, hold off, 605 → 183 once |
| A new file chosen mid-check (silent-10s, 150 ms into talk-30s's re-check) | hold off at the choosing (176 ms); the new file's reading and first check hold nothing; its verdict lands at 584 with no inline style |
| A language switch mid-check (to ms-MY at 150 ms) | hold stays `605px`, height 605; status and Stop repaint in Malay; hold off with the Malay verdict at 738 ms. The page's scroll height moved 3917 → 4137 from the other steps' words, not from step 6 |
| A second, third, fourth and fifth change mid-check (output, trim, trim, output, trim inside 600 ms) | hold `605px` from the first to the verdict at 1769 ms; never re-measured, never cleared; height 605 throughout |
| A time that cannot be read, typed mid-check | hold off at once with "Correct the start and end times in step 2 to continue"; 605 → 115 once. Put right: hold `115px` (nothing to keep), 183 while checking, 605 at the verdict |
| A file's first check | inline `min-height` empty in every sample |
| Create pressed | not reachable mid-check: "Create the video" is not displayed in any sample taken while a check runs (its row is `hidden`). The release in `beginJob` is belt and braces |
| A job starting and finishing (silent-10s, Create, 1.7 s; Save not pressed) | inline `min-height` empty in every mutation through the job |
| A re-check with a finished video standing in the step | hold `905.062px`; then 1256.06 with the verdict above the result. One move |

Not read in Chrome: a blocking verdict and the storage block (no fixture produces one after a re-check). Both leave `runPreflight` by `return` inside the `try`, so the same `finally` releases them.

### 2. No stale verdict, estimate or audio note visible or exposed during the check

- In every sample taken while "Stop the check" is offered, across every row above: `#preflight-report` and `#audio-warnings` hold 0 characters and 0 child elements.
- Read mid-check (150 ms in): the step's whole text is "6. Create Checking this video against your device… Stop the check". The elements with text that are not under `hidden`: the heading's two spans, `p#status`, the Stop button. `#process-actions` and `#create-note` are `hidden`, so Create and its note are out of the accessibility tree as before.
- The hold adds no element, no text, no attribute but the inline `min-height`.

`#status` announcements, compared between BEFORE (hold made ineffective) and AFTER in every row: the same sentences in the same order at the same moments. Output: "Checking this video against your device…" then the verdict sentence. Trim: "Checking…" at about 1 ms and again at about 503 ms, then the verdict. Stop: "Checking…", "Check stopped."

Focus, the same BEFORE and AFTER: it stays on the trim handle or the output radio through a re-check; Stop the check hands it to Check again; Check again hands it to Stop the check and then to Create the video (Continue anyway under the phone warning).

### 3. Measured in Chrome before and after at 1280 px and 375 px

The table above.

### 4. No word, key or control added or changed; no `docs/` line; no dependency; no test deleted, skipped or weakened

- No file under `src/i18n/`, `docs/`, `project/` or `src/styles/` was touched. `index.html` was not touched. No dependency. No existing test was edited.
- Changed: `src/main.ts`. New: `src/ui/height-hold.ts`, `src/ui/height-hold.test.ts`.

### 5. `npm run check`, and what only a person can read

The gate is the orchestrator's; I did not run it. See "Commands".

## Does the Create button still disappear? Yes

The space is held; the button is not shown. During a re-check the step shows its heading, "Checking this video against your device…" and "Stop the check" at the top, and below them an empty stretch of the panel's own background: 447 px of it at 1280 px with talk-30s (the step is 605 px). Create and its note come back, in the place they left, with the verdict. They are away for 0.33 to 1.25 s (measured: output 332 to 700 ms, trim 908 to 1249 ms, which includes the 500 ms pause).

An option, NOT built because it changes what is shown during a check, which is the owner's: keep "Create the video" in its place through a re-check, disabled, with the step's status line as its reason. The button would stop blinking and the empty stretch would have its anchor at the foot. It needs a decision on VH-124 and review R-05 (Create came down for the interval because the verdict that revealed it priced a different trim or output), and a disabled button wants a reason beside it, which may be a new sentence.

## Tests added

`src/ui/height-hold.test.ts`, nine, by category:

- Happy path: the step keeps its height when its content is withdrawn; a fractional height is held in px.
- Gating: no style is written and nothing is measured until a hold is taken (a first check holds nothing).
- Boundary: shorter new content shrinks once, at the release; taller new content shows through the hold.
- Regression guards for the brief's risks: a second and third hold mid-check keep the original height and do not measure again; a hold after a release measures what is shown then (no ratchet).
- Empty and error: release with nothing held, and twice; a step that is off the page (height 0) holds nothing.

`src/main.ts` has no test of its own; its nine call sites were read in Chrome as above.

## Commands

- `npx vitest run src/ui/height-hold.test.ts test/readability.test.ts test/screen-text.test.ts test/kept-identifiers.test.ts test/stylesheet.test.ts`: 5 files, 199 tests passed. The three `test/` files that read `src/main.ts` and `src/ui/` as text are in that run.
- `npm run typecheck`: clean.
- `npx eslint src/main.ts src/ui/height-hold.ts src/ui/height-hold.test.ts`: clean, exit 0.
- Not run, as the brief orders: `npm run check`, `npm test`, `npm run build`, `node tools/check.mjs`.

## Standards applied

- UI-STANDARDS, Empty and no-data states: "Loading states must preserve layout stability — no content jumps".
- House conventions: "Config is the only home for numbers" (the hold is a measured value, no literal); the rule kept in a small module tested with a stand-in, as `reveal-status.ts` is.

## Console

- A final pass on a fresh load with listeners on `error`, `unhandledrejection`, `console.error` and `console.warn` through the full talk-30s matrix: none. The page's own Errors captured panel stayed hidden.
- The tool's console buffer had dropped 147 earlier messages unread, so for the earlier loads the evidence is the Errors captured panel, hidden when checked after the special-path runs.
- ONE load to report: on a forced reload, with my script driving the page the instant it loaded, start-up reported "Worker did not answer "ping" within 5000 ms" (Background processing: No response) and the Errors captured panel showed it. The next reload answered in 69 ms and the full matrix ran clean. This change touches neither the worker nor start-up, and I could not reproduce it; I cannot say what stalled that load.

## Not done, and why

- **A real failed check.** The failure was simulated in the page (the request withheld, a `check-failed` reply dispatched). The timeout path's deadline is 180 s; I did not wait one out. It leaves by the same `catch` and `finally`.
- **A blocking verdict and the storage block.** Not produced; reasoned from the code.
- **Real key presses.** The trim and output changes were dispatched as `input`, `change` and `click` events from script, with focus set on the control first.
- **Create kept visible and disabled.** The owner's; described above.

## Seen, not mine to change

- On a trim change "Checking this video against your device…" is written to `#status` twice, at the change and again when the 500 ms pause ends (`runPreflight`'s own `setStatus`). The same BEFORE and AFTER. A screen reader may say it twice.
- Stop the check shrinks the step once, 605 → 183, and at the foot of the page `scrollY` follows (3017 → 2595 at 1280 × 900; at 375 px focus moving to Check again scrolls further). Check again then grows it back with the verdict. The brief asks for the release at "Check stopped."; the alternative, holding through a stopped check, would leave a tall empty step for as long as the user leaves it.
- A new file chosen over a previous file's verdict still moves the step 605 → 115 → 183 → 605 (the first check holds nothing, by the brief).
- After a release Chrome leaves an empty `style=""` attribute on `#step-create`. Harmless.

## Only a person or the full walk can read

- A screen reader's actual speech through a re-check (VoiceOver, NVDA): that nothing stale is said and the announcements are as before. I read the DOM, not the speech.
- How the held, empty stretch LOOKS for half a second to a second, and whether it reads as "working" or as "broken", at 1280 px and on a phone.
- A real phone or tablet; Safari and Firefox; forced colours; 400% zoom. The 375 × 812 reading is Chrome's emulation.
- Animation-frame sampling ran on the first two loads (1280 × 900 and 1280 × 1300, en-GB: 86 to 212 frames per run). On later loads the pane was hidden and no frame callback fired; those rows rest on the mutation and 16 ms timer samples.
- The Mac Pro's walk.

## Left in the browser

My tab is closed and its size reset. The page's language was switched to zh-Hans and ms-MY and put back to en-GB; the pane's `localStorage` for `localhost:5174` holds `uon-video-helper:language` as en-GB.

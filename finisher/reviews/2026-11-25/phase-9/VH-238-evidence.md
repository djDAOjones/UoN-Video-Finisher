# VH-238 — evidence note (builder, 2026-11-25)

A file chosen again is read again, and every choice asks about the file the page read.

## What changed, file by file

- `src/main.ts`
  - New `let chosenFile: File | null` beside `inspectedFile`: the file the page took up at the last choice. Set in the picker's `change` handler, on the line after it takes `fileInput.files?.[0]` and finds it present.
  - Six readers moved from `fileInput.files?.[0]` to `chosenFile`: the output choice (`presetChoice` `change`), `commitTrim`, `resultOnScreen`, `resultOfChosenFile`, Check again's click, and the result card's "Previous video" test in `renderResult`'s `paint`. (The analyst says "seven places" and cites these six sites; a search of `src/` for `.files` found no others.)
  - New `cancel` listener on the picker, straight after the `change` handler. If `pickedAgain(...)` says the list holds a file that is not the held one and the picker is not disabled, it dispatches a bubbling `change` on the input, exactly as `drop-zone.ts` does for a drop. So a re-pick runs every `change` listener there is (the read, the drop zone's refusal clearing, the feedback report's name set), not a copy of one of them.
  - Two readers of the live list are left on purpose: the `change` handler itself (it is where the choice is taken up) and the feedback redaction set at `chosenFileNames`, which wants every name the list holds and compares nothing by identity.
- `src/ui/chosen-file.ts` (new): `pickedAgain(listed, held, shut)`, pure. True only when the picker is not shut, the list has a file, and that file is not the held object.
- `src/ui/chosen-file.test.ts` (new): five tests (below).
- `src/ui/failure-text.ts`: for `unreadable-source`, reason `took-too-long` takes `failure.tryAgain` as its next step; every other reason keeps `failure.unreadable.next`.
- `src/ui/failure-text.test.ts`: three expectations added to "fits the next step to the cause"; none removed or loosened.
- `src/ui/drop-zone.ts`: one header comment sentence only. It said later readers read `input.files`; that is no longer true, so it now says they ask about the file the `change` code took up. No code change.

No key added, removed or edited in any language table; no control or element; no number literal; no dependency; no `docs/`, `project/`, `index.html`, `app.css` or `test/stylesheet.test.ts` touched.

## Why the `cancel` path cannot do harm

- A chooser closed with nothing picked leaves the list holding the held object (or empty): `pickedAgain` is false and the listener returns before touching anything. It reads two values and writes none.
- While a job or a save runs, or before start-up settles, `applyControlLock` disables the picker. A disabled picker cannot open the chooser, so a real `cancel` cannot fire then; the `change` path relies on the same lock. The listener reads `fileInput.disabled` as well, so a `cancel` that did arrive then is ignored (checked in Chrome with a synthetic one, below).
- A re-pick with a finished unsaved video on screen behaves as any new choice does: the `change` handler keeps and re-renders the result; nothing is discarded and the discard question is asked only when Create is pressed.

## Acceptance criteria

1. **Held in one place, set where the page reads it; every handler asks that.** Met. `grep -n "fileInput.files" src/main.ts` now gives three lines: the `change` handler's take-up, the `cancel` listener's argument, and the redaction set.
2. **Same file picked again is read again; a chooser closed with nothing picked changes nothing.** Met as far as a simulation can show; the native chooser itself is a person's or the walker's (see "Not done").
3. **Timed-out read takes `failure.tryAgain`.** Met; Node test. No fixture raises a timeout, so this was not read in Chrome.
4. **No word, key, control, `docs/` line, dependency; no test deleted, skipped or weakened.** Met.
5. **`npm run check` green; read in Chrome.** The gate is the orchestrator's to run. Chrome reading below.

## Chrome reading (MacBook Pro, built-in browser, own tab, `http://localhost:5174/`, en-GB, default desktop size)

The trigger was simulated as Chromium behaves: `#file-input.files` set to a fresh `File` of the same fixture (new object, same name and bytes), then a bubbling `cancel` dispatched. Texts were read from the DOM; a `MutationObserver` recorded which live texts passed.

Before (analyst C, same simulation, before this change): after the fresh `File` + `cancel`, End time `0:10` gave no "Checking this video against your device…", the verdict stayed "Estimated size up to 12.4 MB", and Create made "Previous video — 9.5 MB / Made from talk-30s.mp4: the whole video (30 seconds)…".

After:

| Check | Result |
| --- | --- |
| `talk-30s.mp4` through `change` | Reading the video… → Checking… → "Ready to go … Estimated size up to 12.4 MB." |
| `cancel`, list still holding the held object | No DOM mutation at all in 1.5 s; snapshot identical |
| `cancel`, list emptied | No DOM mutation in 1.5 s; snapshot identical |
| Fresh `File` of `talk-30s.mp4` + `cancel` | Step 1 at once "Reading the video…"; then Checking… → "Ready to go … up to 12.4 MB."; trim "Keeping the whole video, 30 seconds." |
| then End time `0:10` + `change` | Status at once "Checking this video against your device…"; verdict "Ready to go This should take a few seconds. Estimated size up to 6.2 MB."; trim "Keeping 10 seconds of 30 seconds." |
| then Create | "Finished video — 3.4 MB / Made from talk-30s.mp4: 10 seconds of 30 seconds, from 0:00.0 to 0:10.0, high quality, a cut to the blue closing card." |
| During that job: picker `disabled` true; fresh `File` + `cancel` | No "Reading the video…"; step 1 stayed "Video read."; status "Encoding video"; the job finished normally |
| Unsaved video on screen: `cancel` with held object, then with empty list | Snapshot identical both times; result card and Save still there; no question |
| Unsaved video on screen: `silent-10s.mp4` through `change` | Read and checked; card became "Previous video — 3.4 MB / Made from talk-30s.mp4: 10 seconds of 30 seconds…" with Save |
| then Create | "This video is not saved yet … Starting again will discard it." with "Discard it and start again" and "Keep it", as before |
| Question on screen: plain `cancel` | Snapshot identical; question still asked |
| Question on screen: fresh `File` of `silent-10s.mp4` + `cancel` | "Reading the video…"; question retired, the "Previous video" card and Save restored (what `change` does) |
| `notvideo.mp4` through `change` | "This file could not be read as a video. … Choose a different file, or save this one again…"; trim "There is no video to trim, because that file could not be read." |
| then plain `cancel` | Nothing |
| then fresh `File` of `notvideo.mp4` + `cancel` (C-02's retry) | "Reading the video…", the failure box emptied, then the same failure again |
| then `talk-30s.mp4` through `change` | Read, checked, "Ready to go … up to 12.4 MB." |
| After a re-pick: output choice best → smaller | "Checking…" at once; verdict "up to 6.3 MB"; back to best: "up to 12.4 MB" |
| After a re-pick: Stop the check, then Check again | "Check stopped."; Check again shown; pressed: Checking… → Ready to go |
| Drop route: `drop` on `#drop-zone` with `clip-8s.webm` | "Reading the video…", read and checked, no refusal; End `0:05` re-checked: "Keeping 5 seconds of 8 seconds.", "up to 3.3 MB" (was 4 MB) |
| Made from that, then fresh `File` of `clip-8s.webm` + `cancel` | Card became "Previous video — 1.4 MB / Made from clip-8s.webm: 5 seconds of 8 seconds…"; trim back to the whole 8 seconds; Create asked the discard question; "Keep it" restored the card |

Console: no error from the page. One browser line appeared after I reloaded my tab by script with an unsaved video on screen ("Blocked attempt to show a 'beforeunload' confirmation panel for a frame that never had a user gesture"): Chrome's answer to an automated reload, not a page fault.

Not measured at 375 px, in zh-Hans or ms-MY, or in dark: nothing visible, no word and no layout changes, so there is nothing those readings could differ on.

## Tests added

- `src/ui/chosen-file.test.ts`: regression (a new object for the same file is a pick: C-01, C-02); happy path that is no pick (list still holds the held object); empty (empty list, with and without a held file); boundary (nothing held yet, list has a file); gating (picker shut: never a pick).
- `src/ui/failure-text.test.ts`: `took-too-long` → `failure.tryAgain` and not "different file"; `not-a-video` still → `failure.unreadable.next`.

`src/main.ts` has no Node test, so the wiring (the variable's six readers and the listener) is covered by the Chrome reading above, not by the suite.

## Commands run

- `npx vitest run src/ui/chosen-file.test.ts src/ui/failure-text.test.ts src/ui/drop-zone.test.ts test/readability.test.ts test/kept-identifiers.test.ts test/screen-text.test.ts` — 6 files, 155 tests passed.
- `npm run typecheck` — clean.
- `npx eslint src/main.ts src/ui/chosen-file.ts src/ui/chosen-file.test.ts src/ui/failure-text.ts src/ui/failure-text.test.ts src/ui/drop-zone.ts` — clean (exit 0).
- Not run, as the brief orders: `npm run check`, the whole suite, the build.

## Not done, and why

- **The native chooser.** I cannot drive it. That Chrome fires `cancel` (not `change`) with new `File` objects for the same path is the analyst's reading of Chromium's `FileInputType::SetFiles`; the simulation shows the page does the right thing given that. A person picking the same file twice in Chrome, or the walker through CDP `DOM.setFileInputFiles`, confirms the trigger. Other engines were not read.
- **A walker step** for the re-pick (the analyst's proposed test): not added; the walker is outside this item's files and the brief's commands.
- **A saved result** (`savedResultFor`): Save was not clicked, so the two readers that compare it with the chosen file were read in code only.
- **A read timeout** (C-08) and a file re-copied to the same path: no fixture raises either; Node test and code reading only.
- **A changed consequence worth the owner knowing:** a result made from a file is named "Previous video" once that same file is picked again, because the pick is a new choice and may be a new copy. A drop of the same file already did this.

## Seen, not mine

`git status` showed `DEV-INFRASTRUCTURE.md` and `scripts/check-placeholders.mjs` modified before I changed anything. I did not touch them.

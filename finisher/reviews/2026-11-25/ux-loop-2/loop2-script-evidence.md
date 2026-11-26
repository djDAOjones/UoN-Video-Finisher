# VH-243 — the second analysis's script and markup findings mended: evidence

Date: 2026-11-25. Builder's note for the orchestrator. Six findings of loop 2: E-01, E-02, E-03, E-06 (analyst E) and D-01, D-02 (analyst D). All six built; none left out. Nothing committed, nothing staged, no git command that changes anything. `src/styles/app.css`, `test/stylesheet.test.ts`, the three language tables, `project/` and `docs/` untouched. No word added or changed in any language, no element added, one element moved (E-06).

Read in the built-in browser, my own tab, closed at the end with the viewport reset. The tab was at `http://[::1]:5174/`, the same dev server as `http://localhost:5174/` under another origin, so the page's stored preferences, which E-01 has to change, never touched the other builder's tab. That origin's two stored preferences were left at `en-GB` and `staff`. Chrome on the Mac, light scheme, fixture `talk-30s.mp4`. Positions were read synchronously in a `MutationObserver` at every change to the page, so each list below is every distinct layout the page passed through.

## What changed, file by file

| File | Change | Finding |
| --- | --- | --- |
| `index.html` | `autocomplete="off"` on all 6 radios, 3 checkboxes and 2 selects; one comment saying why; the student IDs error's live box moved above its helper | E-01, E-06 |
| `src/ui/language-switcher.ts` | `input.autocomplete = 'off'` on each radio `languageSegments` builds (the page language's and the video language's) | E-01 |
| `src/config/trim.ts` | `TRIM_TIME_FOLD = 'NFKC'`, beside the other trim constants, its comment naming `STUDENT_ID_FOLD` | E-03 |
| `src/ui/trim.ts` | `parseTrimTime` folds the text with it before parsing | E-03 |
| `src/ui/height-hold.ts` | `createPlaceHold(spacer, place)` added beside `createHeightHold`, which is unchanged | D-02 |
| `src/ui/progress-reveal.ts` (new) | `progressRevealScroll(progress, cancel, windowHeight, inset)`, pure | E-02 |
| `src/main.ts` | two holds defined; `holdCheckRoom()` and `releaseCheckRoom()` in place of the nine `createStepHold` calls; two `resultPlaceHold.settle()` calls; the line's hold in `paintSubmissionFilled` and one release at a new file; `revealProgress()` called from `onStage` at a job's first report | D-01, D-02, E-02 |
| Tests | `src/ui/trim.test.ts` (+20), `src/ui/height-hold.test.ts` (+12), `src/ui/progress-reveal.test.ts` (new, 18), `src/ui/language-switcher.test.ts` (+2), `test/screen-text.test.ts` (+15, 3 of VH-240's pins restated) | all |

## E-01 — controls and page disagree after Back or Forward

**Reproduced first, before any change.** Two entries of the page in the tab (`/` then `/index.html`). On the first: page 中文, video language English, Student submission, Fade, A held last frame, White, Smaller file, Announce progress off. On the second: page Bahasa Malaysia, video language 中文, Staff video, Announce progress on. Then `history.back()`. `performance.getEntriesByType('navigation')[0].type` was `back_forward`.

| Choice | Control showed (before) | Page said and used (before) | Control (after) | Page (after) |
| --- | --- | --- | --- | --- |
| Page language | 中文 | `lang="ms-MY"`, title "Penyiap Video UoN" | Bahasa Malaysia | `ms-MY` |
| Video language | English | quotes “仅供内部使用”, stored `zh-Hans` | 中文 | `zh-Hans` |
| Video type | Student submission | stored `staff`, Submission's fields hidden | Staff video | `staff` |
| Title card box | ticked | its fields hidden, not locked | not ticked | hidden |
| Animation type | Fade | "Video anda dipotong ke kad penutup biru. Menambah 4 saat." (Cut), Plays over disabled | Cut | Cut |
| Colour | White | blue, in the same line | Blue | blue |
| Internal use only | ticked | Staff video, not locked | not ticked | Staff |
| Preset | Smaller file | (read from the radio when used) | High quality | same |
| Announce progress | not ticked | stored `on` | ticked | `on` |

More than E reported: the Video type switch, both checkboxes and Announce progress were also put back. The "Plays over" select, disabled when the restore ran, was the one control not put back.

**Does `autocomplete="off"` stop Chrome for each kind?** Yes for all three, measured: radio (five groups), select (`#closing-type`), checkbox (three). So no `pageshow` re-sync was needed and none was written. Repeated with `history.forward()` to the other entry (controls and page agreed: `en-GB`, video language `ms-MY`, Student submission with its box ticked and locked), and again at the end with the final markup (the table's "after" columns).

**Tests.** `test/screen-text.test.ts`: every radio, checkbox and select in the markup is found (the eight names, 6 + 3 + 2) and each carries `autocomplete="off"`; the eight typed card fields too. `src/ui/language-switcher.test.ts`: `languageSegments` run against a stand-in `document`, every input it builds is a radio with `autocomplete` `off`, for both names; and a scan of every non-test `.ts` file under `src/` finds `createElement('input' | 'select' | 'textarea')` in that one file only.

**Not checked, and worth a person's look.**

- The HTML standard lists `autocomplete` as not applying to radios and checkboxes, so a strict validator will flag it. Browsers read it there for exactly this purpose; the gate has no markup validator. Firefox and Safari were not run.
- A file chosen in the NATIVE chooser: Chrome may put the file input's name back after Back or Forward while the page has read nothing. The fixtures are set by script, which Chrome did not restore (0 files after Back), so this could not be raised. `#file-input` was left alone: it is not a radio, select or checkbox.
- The two range inputs carry no attribute: with no file their `max` is 0, and both read 0 after Back.
- The feedback dialogue's message box is still restored (a typed message is the user's own words).
- A phone discarding and restoring a tab, E's likeliest trigger there.

## E-03 — full-width digits and colon in the trim's time fields

`parseTrimTime` now reads `text.normalize(TRIM_TIME_FOLD).trim()`. The constant is in `src/config/trim.ts` rather than reusing `STUDENT_ID_FOLD`: a time field read "in the student ID's fold" would read wrong, and the two may one day differ.

| Typed | Before (E) | After |
| --- | --- | --- |
| `３` | refused | 3 s, field rewritten `0:03.0` |
| `０：０５` (real key events, 中文 page, 375 × 812, then Tab) | refused | 5 s, rewritten `0:05.0`, no error, re-check started, "保留 30秒钟 中的 25秒钟。" |
| `0：25` | refused | 25 s, `0:25.0` |
| `0：２５．５` | refused | 25.5 s, `0:25.5` |
| `1：05．5` (Node) | refused | 65.5 s |
| `ａｂｃ` | refused | still refused, same sentence beside the field |

Tests (`src/ui/trim.test.ts`): six accepted forms, and fourteen still refused once folded: full-width letters, minutes of 75, a full-width and a plain minus, a fraction before a colon, three colons in both widths, a bare colon either side, a full-width comma, `、`, Arabic-Indic `٣`, `三`, and `1：05。5`.

**Two things to know.** NFKC also folds other compatibility digits to Latin ones (a circled `①`, a superscript `²`), exactly as the IDs box already does. And the ideographic full stop `。` is NOT folded, so `1：05。5` is still refused: a Chinese keyboard in Chinese punctuation mode types `。` for the full-stop key, so tenths typed that way still fail (whole seconds and `m:ss` now work). Taking `。` as a decimal point is a rule beyond the fold and was not in the brief; it is a possible follow-up.

## E-06 — the student IDs error under its box

The error's `<div aria-live="polite">` now comes straight after the `textarea`, the helper after it. `aria-describedby` is unchanged (`submission-card-ids-helper submission-card-ids-error`), every id kept. No test read the old order; two were added.

| Width | Box to error (before, E) | Box to error (after) | Error to helper | Box to helper with no error | The other three fields |
| --- | --- | --- | --- | --- | --- |
| 375 (ms-MY) | 79 px | 8 px | 8 px | 8 px | 8 px each |
| 1280 (en-GB) | (not read) | 8 px | 8 px | 8 px | 8 px each |

The stylesheet needed nothing: `.field-error` and `.helper` both take `--spacing-03` above. Error weight 600, helper 400, as before.

## D-01 — step 3's line withdrawn at every re-check (Student submission)

`submissionLineHold = createHeightHold('#submission-card-fields')`. **Where it is taken differs from the brief, for a reason found in the code:** the line is not withdrawn at `createStepHold`'s three hold sites but earlier. `commitTrim` calls `renderTrim()` first, which paints the line away before the step's hold is reached, and a handle's drag paints it away on its first `input`, before any commit. So the hold is taken where the withdrawal is: in `paintSubmissionFilled`, as the line goes from words to none, and given up there when the line is painted again. It is also given up with step 6's at the same six places (`releaseCheckRoom`), for a check that ends without the line, and once more at a new file, whose first check holds nothing.

`#submission-card-fields` is the smallest element that works: the line itself is `hidden` without words, so it can hold no room.

1280 × 900, en-GB, Student submission. Before (D): `#step-title` 1008 → 966 → 1008, step 6's top 3262 → 3220 → 3262.

| Sequence | `#step-title` | Step 4 top | Step 6 top | Page | Hold |
| --- | --- | --- | --- | --- | --- |
| typed trim | 1008, 1008, 1008 | 2709.88 throughout | 3282.88 throughout | 4578 throughout | `553px`, then none |
| output change | the same | the same | the same | the same | the same |
| two keys on a handle | the same | the same | the same | the same | the same |
| a drag (`input`, `input`, `change`) | 1008 from the first `input` | the same | the same | the same | taken at the first `input` |
| a drag back to where it began (no `change`) | 1008 | the same | the same | the same | given up as the line returned |
| a bad typed time | 1008 → 966 at once | | | | none: no check follows, as step 6 |
| Stop the check | 1008 → 966 at the press | | | | given up with step 6's |
| Staff video | 397 throughout | | | | `0px` on a hidden box, harmless |

375 × 812 (phone verdict), ms-MY, with D-02's card also standing: `#step-title` 1202 throughout (before, D: 63 px), step 4 top 3186.81, step 6 top 4065.81, page 6345, all constant through a trim and an output change; hold `616px`.

Nothing stale is shown: the line is off the page for the whole hold.

## D-02 — the card under the verdict moved 304 px at each re-check

`resultPlaceHold = createPlaceHold('#preflight-report', place)`, where `place` is the card's top measured from the verdict box's top, or `null` when `#process-result` is empty. One spacer, not one hold per block: a plain height hold on the two blocks would have left the card 68 px LOW for the length of the check, because "Checking…" and Stop the check arrive between the verdict and the card. So the hold is in two parts: `hold()` notes the place before the withdrawal (in `holdCheckRoom`, beside the step's hold, at its three sites), and `settle()` opens in the verdict's box exactly the room that puts the card back, once the line and its stop are painted (`commitTrim` after `offerStop('check')`; `runPreflight` after the same, before its first wait). The step's own hold stays, for Create's row and its note below the card. `release()` goes with the step's.

1280 × 900, en-GB, a video made, the file chosen again ("Previous video" under a verdict):

| | Card top | "Save the video" top | Step 6 | Page |
| --- | --- | --- | --- | --- |
| Before (D) | 3137 → 2833 → 3137 | 3774 → 3470 → 3774 | held 1277.06, 372 px empty at its foot | |
| Before, here (the natural place, read after Stop the check) | 3136.88 → 2832.88 | 3794.94 → 3490.94 | | |
| After: typed trim | 3136.88, 3136.88, 3136.88 | 3794.94 throughout | 1298.06 throughout | 4639 throughout |
| After: output change | the same | the same | the same | the same |
| After: four keys on a handle across the pause | the same | the same | the same | the same |

During the check the verdict's box is held at `292px` and the status line stands 68 px higher than the verdict's foot did; the blank is above "Checking…", as D proposed. 375 × 812, ms-MY: card 4867.81 and Save 5280.81 through a trim and an output change, verdict box `608px`, step `1369px`.

**With no card, unchanged** (the measure in `reviews/2026-11-25/phase-9/VH-240-evidence.md`): 1280 × 900, step 605 held `605px`, page 3896 constant, `#preflight-report` no inline style; 375 × 812 after a reload, step 813 held `813px`, page 4663 constant, no inline style.

**As before, by VH-240's own design, and still a movement.** Stop the check and a bad typed time give the room up at once (the card rises 304 px then). The first trim change after a job has just finished has no verdict above the card, so the card moves down 68 px as "Checking…" and its stop arrive and 304 px more as the verdict does: content arriving, nothing held. With the discard question open, a trim change brings the card back in place of the question at the same top (3115.88 throughout).

## E-02 — the progress above the window after Create

**Where it runs differs from the brief, for a reason found in the code:** the bar and its stage line are not on the page at the hand-on of focus. `beginJob` shows the job line, the notice and Cancel; the bar arrives with the worker's FIRST report, in `onStage`, and it is that arrival above the already-focused Cancel that leaves it over the top edge. So `revealProgress()` runs there, once per job (`const arriving = processProgress.hidden`), after the bar is shown. One `window.scrollBy({ top, behavior: 'instant' })`, only when `progressRevealScroll` returns other than 0. The inset is the root's computed `scroll-padding-top` (the `--spacing-03` token), not a number in the script. Chrome applies its scroll anchoring at the synchronous layout the measurement forces (checked with a probe), so the rects read are final.

375 × 812, phone path, Bahasa Malaysia, Student submission, step 6 942 px (E's state). "Without it" is the bar's top less the one scroll made, and matches E's table to the pixel:

| Create's top before | Bar top without it (E's) | Bar top after | Stage line | Cancel (focused) | Scroll made |
| --- | --- | --- | --- | --- | --- |
| 700 | −70.4 (−70) | 7.81 | 23.81–44.81 | 325.81–369.81 | −78.19 |
| 560 | −210.4 (−210) | 7.81 | the same | the same | −218.19 |
| 384, a real click | −51.4 (−51) | 7.81 | the same | the same | −59.19 |
| 300 | −135.4 (−135) | 7.81 | the same | the same | −143.19 |
| 120 | −310.4 (−310) | 7.81 | the same | the same | −318.19 |

Unchanged 0.7 s later in every case.

375 × 812, phone path, en-GB, Staff video: Create at 700 → bar 132.81, no scroll; 560 → −81.4 without, 7.81 after; 384 → −257.4, 7.81; 300 → bar 25.81, no scroll; 120 → −228.4, 7.81. Cancel 325.81–369.81 whenever it scrolled.

812 × 375: Create at 300 → bar 68, no scroll; 150 → −156 without, 8 after, Cancel 263–307; 40 → bar 32, no scroll.

**1280 × 900, en-GB.** Create at 800 → bar 456.88, no scroll, `scrollY` untouched; at 600 → bar 219.88, no scroll; started from the discard question → bar 30.88, no scroll. But the fault is at desktop too, which E had not measured: with Create at 400, 200 or 91 px (91 is where it sits with the page scrolled to its foot) the bar would have landed at −54, −106 and −114, and is now brought to 7.88 with Cancel at 262.88–306.88. So at 1280 × 900 nothing moves when the bar is in the window, and one scroll of 62 to 122 px is made when it is not.

Tests: `src/ui/progress-reveal.test.ts`, 18, with E's five readings; `test/screen-text.test.ts` pins the wiring (first report only, the four things read, one instant `scrollBy`, no `scrollIntoView`, nothing smooth, never behind the dialogue).

**To know.** The reveal waits for the first report; the time from the press to it was not measured (the machine was shared). Someone who scrolls elsewhere inside that moment is brought back to the bar. Where the window cannot hold the bar and Cancel together (362 px between them at 375 px wide; 375 px of window with an on-screen keyboard would be short), the bar wins and Cancel may leave the window while holding focus: covered in Node, not met in Chrome.

## VH-240's wiring pins, restated not weakened

`createStepHold.hold()` and `.release()` are now each called once, inside `holdCheckRoom` and `releaseCheckRoom`. The three pins that named them at the call sites now name the two functions at the same sites, with the same order assertions, and two pins were added: each function's body exactly, and the six release sites counted.

## Each new test shown to fail on revert

Seventeen single reverts, each run against its test file and each failing as it should, the file restored after: one radio, one select and one checkbox without the attribute; the script's `autocomplete` line; the fold; the line's hold and its release in the painter; `settle()` at the commit; the place hold out of `holdCheckRoom`; its release out of `releaseCheckRoom`; the `finally` release made unconditional; the reveal made unconditional; `instant` made `smooth`; the place hold's second measure; its first-place guard; the reveal's both-or-alone choice; its in-view early return.

## Commands and results

- `npx vitest run test/screen-text.test.ts test/kept-identifiers.test.ts src/ui/trim.test.ts src/ui/height-hold.test.ts src/ui/progress-reveal.test.ts src/ui/language-switcher.test.ts`: 6 files, 250 tests passed (130, 5, 67, 21, 18, 9). With `video-language`, `title-card-step`, `focus-hand-on` and `reveal-status` beside them: 10 files, 362 passed.
- `npm run typecheck`: clean.
- `npx eslint` on the eleven changed `.ts` files, `--max-warnings 0`: clean. (`index.html` has no ESLint configuration.)
- Not run, by the brief: `npm run check`, `npm test`, `npm run build`, `node tools/check.mjs`.

## Standards applied (rule 8)

UI-STANDARDS: "Show current selection, mode, and state explicitly" (E-01); "Loading states must preserve layout stability" (D-01, D-02); "Every async action must show status" (E-02); errors beside their field (E-06). House conventions: numbers in `src/config/` or a CSS token (`TRIM_TIME_FOLD`; the reveal's inset read from the root's token; held heights measured, never written); pure functions tested in Node with stand-ins; named test categories (happy path, boundary, regression, one per fixed fault).

## Not done, and for a person or the full walk

- The gate, the ledger and the commit: the orchestrator's.
- E-01 in Firefox and Safari, with a natively chosen file, and on a phone that discards the tab.
- E-02 on a real phone with its address bar and on-screen keyboard, and with reduced motion set (the scroll is instant in every case, so it should not differ).
- E-03's `。` (above).
- Seen, not from these changes: after each cancelled job the console carries mediabunny's "A VideoSample was garbage collected without first being closed" lines (fourteen jobs were cancelled in this walk). Not investigated; no changed file touches the worker.

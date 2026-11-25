# VH-243 — the last five points (after the third analysis and the second review of commit `162c802c`) — builder's evidence, 2026-11-25

All five were built. No word, key, element or token was added or changed. Nothing in `project/`, `docs/`, `samples/` or the i18n tables was touched; no git command that changes anything was run.

Driven in the built-in browser, my own tab at `http://localhost:5174/` (closed at the end, viewport reset to "desktop"). Fixtures only (`dynamic-40s.mp4`, `talk-30s.mp4`, `silent-10s.mp4`); Save never pressed. The origin's stored preferences were left as found (`language` `en-GB`, `video-kind` `staff`; the `video-language` key my walk added was removed).

## Files changed

| File | What and why |
| --- | --- |
| `src/ui/progress-reveal.ts` | F-01. `progressRevealScroll`: where the bar and its line are in the window, the window can hold them and Cancel together, and Cancel's foot is past the bottom edge less the inset, it returns `Math.max(0, Math.min(cancel.bottom - bottom, progress.top - top))`; otherwise 0 as before. The both-or-alone rule is now one named value (`holdsBoth`) used by both branches. |
| `src/ui/progress-reveal.test.ts` | The rule's new tests (below); two older expectations restated. |
| `src/main.ts` | F-01: the comment over `revealProgress` (no code change there). F-05: `setStatus` calls `titleMovesOn()` before it writes; the two explicit calls (trim commit, output change) are removed as redundant; `setTitle('failed')` is written again after the one place a failure's own sentence is written a second time (after `await settled(id)`). |
| `src/ui/progress.ts` | Comment only, over `outcomeEndsAtNewCheck` (name and behaviour unchanged). |
| `index.html` | `#file-input` takes `autocomplete="off"`; the Date field's error box moved before its helper. Ids and `aria-describedby` unchanged. |
| `src/config/trim.ts` | `TRIM_TIME_FULL_STOPS` (U+3002, U+FF61) and `TRIM_TIME_DECIMAL_POINT`, beside `TRIM_TIME_FOLD`. |
| `src/ui/trim.ts` | `parseTrimTime` reads those two full stops as the decimal point after the NFKC fold. |
| `src/ui/trim.test.ts` | The pinned refusal of `1：05。5` restated as the new truth; new accept and refuse rows. |
| `test/screen-text.test.ts` | The VH-239 title pins restated; the file input's attribute; the staff card's error order. |

## 1. F-01 — Cancel pushed below the window by a bar that is in it

The rule against the function's own: F's expression is used inside the existing both-or-alone choice. Where the window holds both, `cancel.bottom - bottom` is never more than `progress.top - top`, so the `Math.min` is a guard, and the `Math.max(0, …)` stops any backward scroll (a bar sitting inside the top inset with Cancel in view returns 0). Where the window cannot hold both, the documented choice stands: the progress alone, which is in the window, so 0.

Readings, `window.scrollBy` wrapped to count; each read at the first report (3 to 6 ms after the press) and again 1 s later, identical both times; focus on Cancel in every row.

| Window, case | Create's top | Before: bar / Cancel / scrolls | After: bar / Cancel / scrolls |
| --- | --- | --- | --- |
| 1280 × 900, en-GB, Staff, first job, `dynamic-40s.mp4` | 770 | 666.9–674.9 / 921.9–965.9 (wholly below) / 0 | 592.9–600.9 / 847.9–891.9 / 1 (+73.9) |
| the same | 720 | 612.9–620.9 / 867.9–911.9 (cut) / 0 | 592.9–600.9 / 847.9–891.9 / 1 (+19.9) |
| the same | 640 | 532.9–540.9 / 787.9–831.9 / 0 | unchanged, 0 scrolls |
| 1280 × 900, retry after Cancel, `talk-30s.mp4` | 600 | 665.9–673.9 / 920.9–964.9 / 0 | 592.9–600.9 / 847.9–891.9 / 1 (+72.9) |
| the same | 500 | 528.9–536.9 / 783.9–827.9 / 0 | unchanged, 0 scrolls |
| 1280 × 900, first job with a verdict standing, `talk-30s.mp4` | 400 | 7.9–15.9 / 262.9–306.9 / 1 (−62.1) | unchanged, 1 (−62.1) |
| 375 × 812 (preset "mobile"), ms-MY, retry after Batal, `talk-30s.mp4` | 480 | 487.8–495.8 / 805.8–849.8 / 0 | 441.8–449.8 / 759.8–803.8 / 1 (+45.8) |
| the same | 505 | 494.8–502.8 / 812.8–856.8 / 0 | 441.8–449.8 / 759.8–803.8 / 1 (+52.8) |
| the same | 450 | (F: 775.8–819.8) | 441.8–449.8 / 759.8–803.8 / 1 (+15.8) |
| the same | 350 | 320.8–328.8 / 638.8–682.8 / 0 | unchanged, 0 scrolls |
| the same, first job | 300 | 7.8–15.8 / 325.8–369.8 / 1 (−143.2) | unchanged, 1 (−143.2) |

- Cancel's foot lands on the inset exactly (892 of 900; 804 of 812). With a real Return on Create (1280, top 770): Cancel `:focus-visible`, outline 2 px at offset 2 px, so the ring ends at 895.9 of 900.
- One scripted scroll per job at most: counted to each cancel, and through one whole job to "Ready" (1280, top 770, 9.2 s): `[73.875]` and no second.
- The "before" numbers are my own readings on `162c802c`, taken before any edit, and match F's.

Tests (`src/ui/progress-reveal.test.ts`, 18 → 29 cases): F's five measured cases scroll by exactly the distance that puts Cancel's foot on the inset, the bar still at or below it; a bar in view with Cancel cut or below (443, 456, 700, 775 px) scrolls by the least; a bar in view with Cancel in view returns 0 (0, 8, 132, 442 px, and the 640 and 500 readings); a foot 2 px inside the inset moves 2 px; a window too short for both returns 0, and one just tall enough scrolls; never a negative result, and the bar never above the inset; no Cancel on the page returns 0.

Two older expectations pinned what F-01 found wrong and were restated, not dropped: the rows at 456 and 775 px of "moves nothing where the bar and its line are in the window" (Cancel's foot at 818 and 1137 of 812), and "moves nothing for a bar in the window whose Cancel is not: the browser has seen to focus" (700 px; Cancel 1018–1062). All three numbers are kept, now expecting the least scroll.

Not done: the window too short for both keeps Cancel out, as the brief asked (the existing choice). Only a real phone can show its address bar and keyboard.

## 2. F-05 — the tab's title follows the status line

Where the rule lives: every write to `#status` goes through `setStatus` (one `show(statusLine, …)`, no direct write; a language change repaints through `show` and does not call `setStatus`). So `setStatus` calls `titleMovesOn()` first. The guard for an outcome's own sentence is order: each of the four `setTitle('cancelled' | 'failed')` comes after its `setStatus`, and the one later rewrite of a failure's sentence is followed by `setTitle('failed')` again. The two explicit calls were removed because the status write in the same path now does it (a trim commit's `say`, a check's "Checking…" or its trim error, both before any wait). "Ready" is untouched: `outcomeEndsAtNewCheck` is false for it.

1280 × 900, en-GB, `talk-30s.mp4`, Student submission, four fields filled:

| Step | Status line | Title before | Title after |
| --- | --- | --- | --- |
| Job cancelled | "Cancelled. Nothing was saved, and your original file is unchanged." | Cancelled — UoN Video Finisher | the same |
| Module emptied | the same | Cancelled — | Cancelled — |
| Create pressed (refused) | "Correct the title card in step 3 to continue." | Cancelled — | UoN Video Finisher |
| Module filled | empty | Cancelled — | UoN Video Finisher |
| Cancelled again, then closing colour White; video language 中文; closing Fade; Video type Staff; title card ticked, unticked | still "Cancelled. …" each time | — | Cancelled — each time (they agree) |
| Page language 中文, then English | "已取消。…", then "Cancelled. …" | — | "已取消 — UoN 视频成片工具", then "Cancelled — …" |
| Trim Start typed `0:02` | "Checking this video against your device…" | — | UoN Video Finisher at once, and after the verdict |
| A job run to the end | "Your video is ready." | — | Ready — UoN Video Finisher |
| then Student submission, Module emptied, "Create the video again" (refused), Module filled, a trim change and its re-check | "Correct the title card…", empty, "Checking…", the verdict | — | Ready — throughout (the card stands) |

Tests (`test/screen-text.test.ts`): the one pin became three. `setStatus`'s body exactly, `titleMovesOn()` called once and defined once, no other write to the line; the trim commit and the output change still sit behind the file-read guard, hold no call of their own, and reach a status write before any wait; every cancelled or failed title follows a status write with no other title between (four), the rewrite after `await settled(id)` followed by its title, one `setTitle('ready')`. `outcomeEndsAtNewCheck` keeps its test in `src/ui/progress.test.ts`; no new pure function was needed.

Not checked in Chrome: a failed job (none can be raised with the fixtures). Its two paths are read in the source and pinned by the order test.

## 3. `#file-input` takes `autocomplete="off"`

I cannot choose a file in the native chooser, so the restore after Back or Forward was not reproduced and the attribute's effect on it is not shown. Confirmed only that nothing else changes with it present (1280 × 900): the live input reads `autocomplete` "off"; a file given by `change` is read ("Video read.", the button steps down); the same file picked again (a `cancel` with a new `File` in the list) is read again (two writes to the source line); a `cancel` with the list unchanged writes nothing; a drop of `silent-10s.mp4` on the zone is read ("Video read. No audio."), no drop error. Test: the E-01 block now reads the page's one file input and requires the attribute.

## 4. The ideographic full stop as the decimal point

NFKC leaves U+3002 as it is and turns U+FF61 into it, so both are replaced by `.` after the fold. 中文 page, `talk-30s.mp4` (30 s), typed with real keys:

| Typed in Start | Before | After |
| --- | --- | --- |
| `0：05。5`, Tab | refused (not a time) | 5.5 s; field `0:05.5`; "保留 30秒钟 中的 25秒钟。" |
| `５。５`, Return | refused (F's table) | 5.5 s, no error (the field keeps its typed text after Return: F-04, not in this batch) |
| `1：05。5`, Tab | refused as not a time | read as 65.5 s: "开始时间在视频结束后，视频时长为 0:30.0。" (right for a 30 s video; no fixture is long enough to take it) |
| `1。2。3`, `。`, `abc` | not a time | not a time, the same sentence |
| `0：07．5` | 7.5 s | 7.5 s |

Tests (`src/ui/trim.test.ts`): `1：05。5`, `１：０５。５`, `65。5`, `1:05｡5` → 65.5; `５。５` → 5.5; `１：０２：０３。４` → 3723.4; refused: `。`, `｡`, `1。2。3`, `1。`, `。5`, `1。5：00`, `1：05。`, `1。.5`, `1、5`, `1·5`, each checked against its Latin form. The old row that pinned `1：05。5` as refused is replaced by `1。2。3` with the reasoning corrected. One side effect, not pinned: U+FE12, the vertical presentation form, also folds to U+3002 under NFKC and is now read as a point.

## 5. The Date field's error before its helper

The error was raised with a date longer than the field takes ("This field is full, so the rest was not added.", the value cut at 40).

| Window | Field to error | Error to helper | Field to helper, no error | Before (derived from the helper's height, not measured) |
| --- | --- | --- | --- | --- |
| 1280 × 900, en-GB | 8 px (2418.9 → 2426.9) | 8 px (2447.9 → 2455.9) | 8 px | error 58 px under the field, below a 42 px helper |
| 375 × 812, en-GB | 8 px (2545.8 → 2553.8; the error two lines) | 8 px (2595.8 → 2603.8) | 8 px | 79 px, below a 63 px helper |
| 375 × 812, ms-MY | 8 px | 8 px | — | — |

The same 8 px as the IDs box and as Title's own error (read: 8 px). `aria-describedby` is still `title-card-date-helper title-card-date-error`. Test: the E-06 block now reads all four staff fields' error boxes straight after their inputs, and Date's helper after its error. No existing test read the old order.

## Commands

- `npx vitest run test/screen-text.test.ts src/ui/trim.test.ts src/ui/progress-reveal.test.ts src/ui/progress.test.ts src/ui/drop-zone.test.ts test/readability.test.ts test/stylesheet.test.ts src/ui/accessibility-statement.test.ts src/i18n/tables.test.ts src/config/branding.test.ts src/core/egress.test.ts test/package-xerte.test.ts`: 12 files, 535 tests passed (the last eight are the other tests that read `index.html`).
- `npm run typecheck`: clean.
- `npx eslint` on the eight `.ts` files changed: clean.
- Not run, by the brief: `npm run check`, the whole suite, the build.

## Console

Errors only, after a marker: nothing but Chrome's note that it blocked a `beforeunload` panel on a page with no user gesture (a video made and not saved when I navigated away; F records the same).

## Open, or for a person

- The new source-text pins were not each run against a reverted `main.ts`; they are exact-string or counted matches. The reveal's new tests do fail on the old function (it returned 0).
- A failed job's title; the native chooser's restore; a real phone's address bar and keyboard; a video longer than 65.5 s typed as `1：05。5`.
- Seen once: a script that chose a new file straight after a page-language change in the hidden pane ran past the tool's 45 s limit, and the page had finished reading when next looked at. Not reproduced, not from these changes as far as I can tell; timers are slowed while the pane is hidden.

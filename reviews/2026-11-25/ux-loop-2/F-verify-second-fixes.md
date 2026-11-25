# Analyst F — the second batch of fixes (commit `162c802c`, VH-243) tested as a sceptic — loop 3, 2026-11-25

Read-only. Driven in the built-in browser, my own tab at `http://localhost:5174/` (closed at the end, viewport reset to "desktop"). Fixtures only (`talk-30s.mp4`, `dynamic-40s.mp4`, `silent-10s.mp4`, `clip-8s.webm`, `portrait-10s.mp4`, `notvideo.mp4`); nothing in `samples/` touched; Save never pressed. About 45 jobs started, 8 run to the finished card, the rest cancelled. The origin's stored preferences were put back as found (`language` `en-GB`, `video-kind` `staff`; the two keys my walk added, `video-language` and `announce-progress`, removed).

Every fix was tested before the builders' evidence was read; the two evidence files were then read for what they did not check, and that was checked (marked "not in the builders' evidence" below).

## Method, and its limits

- **Sampling.** A sampler read, at every 30 ms tick and in a `MutationObserver` at every change to the page: `#step-create`'s height; `getAttribute('style')` of `#step-create`, `#submission-card-fields` and `#preflight-report`; the document tops of steps 3 to 6, of the result card and of "Save the video"; `document.documentElement.scrollHeight`; `scrollY`. Rows were kept only when something changed. After each scenario settled it read the three inline styles again and, for each of the three elements, the room between its last visible child and its own inner foot ("gap", 0 when the element is no taller than its content).
- **The pane was hidden for the run**, and for most of it `requestAnimationFrame` did not fire in my tab (0.4 ms at the start, never within 800 ms later). So "painted" below means "seen at a 30 ms tick between tasks", not "seen at a frame"; the `MutationObserver` rows are stricter than the eye (they include states inside one task) and showed nothing the ticks did not.
- **Synthetic and real input.** Typed times, radios, selects and drags were mostly sent by script (`input` then `change`; a drag as eight to ten `input` events 50 ms apart, then `change`). Real keys were used for a handle's arrow keys, the skip link, the dialog (Return, Escape, Tab), and full-width typing; a real click for one Create; real wheel gestures for the dialog, each with a control gesture on the page without the dialog to prove the wheel reached the page (the page moved 3346 → 2846 and 4545 → 4345 in the controls).
- **"Same file again"** was simulated as the builders and analyst D did: a `cancel` event on `#file-input` with a new `File` in its list.
- **Machine load.** Near the end one device check took over 6 s and returned "This should take about 2 minutes" (another process was busy on the Mac). The holds stood for its whole length and were released at the verdict.

## Counts

5 findings. By kind: REGRESSION 0, INCOMPLETE 4, NEW 1. By severity: S1 0, S2 1, S3 4. By fix class: FIX-NOW 5.

No fix failed in the cases its finding named. No inline style was left behind in any of the scenarios below, and no gap stayed open after a check settled.

---

## Per fix

### D-01 (step 3's line, Student submission) — confirmed

Student submission, title card locked on, four fields filled.

| Window | Scenario | Step 4 top | Step 5 top | Step 6 top | Page height | `#submission-card-fields` style |
| --- | --- | --- | --- | --- | --- | --- |
| 1280 × 900, en-GB | typed trim | 2688.9 throughout | 3039.9 | 3261.9 | 4557 | `min-height: 553px;` from 124–153 ms to 1060–1082 ms, then empty |
| | output change | the same | the same | the same | the same | `553px` 123–813 ms |
| | a drag (10 `input`, then `change`) | the same | the same | the same | the same | `553px` from the first `input` (128 ms); step 6's own hold from the `change` (694 ms); both empty at 1861 ms |
| | three real ArrowRight on the Start handle | the same | the same | the same | the same | `553px` 4–1179 ms |
| 375 × 812 (phone path), en-GB | typed trim; output; drag; two real ArrowLeft on the End handle | 2836.8 throughout | 3430.8 | 3715.8 | 5387 | `574px`, then empty |
| 375 × 812, ms-MY, a card standing | trim; output; drag | 3186.8 throughout | 3780.8 | 4065.8 | 6366 | `616px`, then empty |

D's numbers (step 6's top 3262 → 3220 → 3262 at 1280; 63 px at 375) are gone.

### D-02 (the card under the verdict) — confirmed

A video made and not saved, a verdict standing above its card.

| Window | Scenario | Card top | "Save the video" top | `#preflight-report` style |
| --- | --- | --- | --- | --- |
| 1280 × 900, en-GB, Student submission | output change; typed trim; drag | 3776.9 throughout | 4434.9 throughout | `min-height: 292px;` for the check, then empty |
| | same file chosen again ("Previous video"), then typed trim; output change | 3776.9 throughout | 4434.9 throughout | `292px`, then empty |
| | five changes inside 300 ms; five changes across 2.5 s (three checks) | constant | constant | taken and given up three times, empty at the end |
| 375 × 812, ms-MY | output; typed trim; drag; "Video sebelumnya" then trim and output | 4867.8 throughout | 5301.8 throughout | `608px`, then empty |
| 375 × 812, en-GB | five fast changes, twice | 4438.8 throughout | 4830.8 throughout | `479px`, then empty |

D's 304 px (card 3137 → 2833 → 3137) is gone. As the builders say, and still a movement: the FIRST trim change after a job has just finished moves the card down twice (1280: 3404.9 → 3472.9 as "Checking…" arrives → 3776.9 at the verdict; 375 ms-MY: 4179.8 → 4247.8 → 4867.8), because nothing stood above it to hold the room of.

### Held room: what could strand a hold — nothing did

After every scenario: all three inline styles empty, gap 0 on `#step-create` and `#submission-card-fields`, `#preflight-report` exactly as tall as its verdict (124 px at 1280, 269 to 311 px on the phone path).

| Scenario (1280 × 900 unless said) | During | After it settled |
| --- | --- | --- |
| Staff: typed trim; output; five fast changes | step `605px`; `#submission-card-fields` (hidden) `min-height: 0px;` | all empty; step 605, page 3917 constant |
| Staff: Stop the check at 100 ms, then Check again | released at the press (605 → 183, page 3917 → 3495); Check again holds `183px` | empty; 605 |
| The same at 375 × 812 (phone path) | `813px`; 813 → 183 at Stop; `183px` | empty; 813 |
| Student: `abc` typed in Start, left 5 s, then put right | all three empty at once (no check follows); steps 4–6 move 13 px up, step 6 605 → 115; put right: `115px` held, 115 → 183 → 605 | empty |
| Student: End typed to keep under 3 s, left 3 s, put right | the same shape | empty |
| Student → Staff → Student in the pause; during the check; Staff kept to the verdict then back | `605px` and `553px` (the latter on the box while hidden) | empty each time |
| Staff: "Add a title card" unticked and ticked three times in the pause and in the check (a card standing) | holds stay; step 3 grows and shrinks as its fields do | empty |
| Page language to 中文 then Bahasa Malaysia in a check; back to English in the next | the old language's px: a 63 px gap in the fields' box, 47 to 89 px at the step's foot, for the hold's length | empty; no gap |
| New file (`silent-10s.mp4`) during a check | all three empty at the file's read | empty |
| Unreadable file (`notvideo.mp4`) during a check | all three empty; steps 2–6 off the page | empty |
| Create "immediately after a change" | not possible: Create is off the page from the commit (735 ms until it returns) | — |
| Create pressed the tick it returned, Cancel at 1.5 s | no hold during the job | empty; "Cancelled." |
| An output change after Cancel | `233px` held, 233 → 605 at the verdict | empty |
| The discard question open, trim changed | `826px`, `553px`, `292px`; the card back in the question's place at the same top (3776.9) | empty |
| "Keep it"; then "Discard it and start again" | no hold | empty |
| Window 1280 → 375 → 1280 inside one check (22 ms and 37 ms after the change) | the 1280 px values stand at 375: 334 px empty at the step's foot | empty at the verdict (1293 ms) |
| A drag held 4 s with no `change` (375) | the fields' hold alone, 63 px open where the line was | empty after the `change` and its check |
| A drag back to where it began, no `change` | `574px` for 300 ms | empty as the line returned |
| A drag in progress, then Video type switched twice; then an output change that ran its whole check before the drag's `change` | holds taken and given up twice | empty |
| The same time typed in another form (`3` for `0:03.0`) | a whole re-check, held as any | empty |
| "Use the whole video" pressed when it already is | nothing written | empty |
| A card standing: `abc`, then put right | all empty at once; the card rises 385 px (3776.9 → 3391.9), back at the verdict | empty |
| A card standing: Stop the check, Check again | 3776.9 → 3430.9 at Stop; back at the verdict | empty |
| A check that took over 6 s (machine busy) | `233px` and `553px` for its whole length | empty |

Not in the builders' evidence and checked here: the kind switch, the title-card box, both file cases, the language switch with a card standing, the resize, the held drag, the drag with other changes inside it, five fast changes with a card, the same time retyped, the slow check.

One edge found: F-02.

### E-01 (controls after Back and Forward) — confirmed

Every radio (6), checkbox (3) and select (2) carries `autocomplete="off"` (a scan of the live page found none without it). Four history traversals and one reload, `performance.getEntriesByType('navigation')[0].type` read each time:

| Traversal | Left the entry with | On return, every control | The page |
| --- | --- | --- | --- |
| `/?a=1` → `/acceptance.html` → Back (`back_forward`) | 中文, video language Bahasa Malaysia, title card ticked, Fade, "A held last frame", White, Internal use ticked, Smaller file, a typed title and department, trim `0:04` | 中文, Bahasa Malaysia (both stored), Staff, box not ticked, Cut, Plays over disabled, Blue, not ticked, High quality, Announce ticked; card fields empty | `lang="zh-Hans"`, title "UoN 视频成片工具", legend "页面语言"; with a file: "视频切换到蓝色结束卡。增加 4 秒。", 12.4 MB (High quality) |
| `/?a=1` → `/?b=2` (there: Bahasa Malaysia, Student submission, video language 中文, Smaller file) → Back (`back_forward`): E's case 1 | 中文, English, Fade, White, Smaller, Internal ticked, box ticked | Bahasa Malaysia, Student submission, 中文, Cut, Blue, High quality, box ticked and locked, Internal ticked and locked | `lang="ms-MY"`, "Penyiap Video UoN", "Bahasa halaman"; a job from that state: "Video ini: Serahan pelajar. Bahasa video: 中文."; the card: "Bahasa video: 中文." |
| Forward to `/?b=2` (`back_forward`) | Smaller file | High quality; the rest as stored | agrees |
| `/?b=2` set to English and Staff, Back to `/?a=1` (`back_forward`) | Bahasa Malaysia, Student submission | English, Staff, English | `lang="en-GB"`, "UoN Video Finisher", "Page language" |
| Reload (`reload`) with Fade, White, Smaller, three boxes changed | | Cut, Blue, High quality, boxes at rest; Announce progress as stored (`off` stayed off: the page reads its own key) | agrees |

The selection shown was the selection used in every case. Text controls: the ten typed fields (two trim, four staff card, three submission, the IDs box) carry `autocomplete="off"` and came back empty or at the page's own defaults; the one control still put back is the dialog's `#feedback-message` (no attribute): a typed message returned after Back, the dialog showed it when opened, and nothing on the page counts or reads it apart: not out of step. The page was reloaded on each traversal (my helpers were gone), so the back/forward cache did not hold it here.

Could not raise: a tab restored after being discarded or duplicated; a file chosen in the native chooser and put back by Chrome.

### E-03 (full-width trim times) — confirmed, one small side (F-04)

中文 page, `talk-30s.mp4` (30 s).

| Typed in Start | Read as | The field after focus leaves by Tab | Error |
| --- | --- | --- | --- |
| `３` (real keys, then Tab; 1280) | 3 s | `0:03.0` | none |
| `０：０５` (real keys, then Tab; 375 × 812) | 5 s | `0:05.0`; "保留 30秒钟 中的 25秒钟。" | none |
| `0：25` (End) | 25 s | accepted, kept 20 s of 30 | none |
| `３．５` | 3.5 s (handle at 3.5) | accepted | none |
| `0:０7` (mixed) | 7 s | accepted | none |
| a full-width 4 between two ideographic spaces (ideographic spaces) | 4 s | accepted | none |
| `１：０５．５` | 65.5 s | refused: "开始时间在视频结束后，视频时长为 0:30.0。" (right: the video is 30 s) | after-end |
| `1０0` (mixed) | 100 s | refused with the same after-end sentence | after-end |
| `1:2:3` and `1：2：3` | 1 h 2 min 3 s (the h:mm:ss form is taken) | refused with the after-end sentence, not the not-a-time one | after-end |
| `abc`, `-5`, `+5`, `½`, `٣`, `0:5:`, `２:７５`, `1e1`, `0x10`, `１,５`, `５。５` | not a time | field kept as typed, red edge | "开始时间以分钟和秒的形式写出，例如 1:05.5，或者以秒的形式写出，例如 65.5。" |

`５。５` (the ideographic full stop) is refused, as the builders record. A time committed with Return keeps its typed text: F-04.

### E-02 (progress brought into view) — confirmed for the bar; Cancel can be left below the window (F-01)

`window.scrollBy` was wrapped to count scripted scrolls. Readings at the first progress report and 1 s later were identical in every case; `document.activeElement` was Cancel (Batal) in every case.

| Window, state | Create's top before | Bar | Stage line | Cancel | Scripted scrolls |
| --- | --- | --- | --- | --- | --- |
| 375 × 812 phone path, ms-MY, Student submission, verdict standing (E's state) | 700 | 7.8–15.8 | 23.8–44.8 | 325.8–369.8 | 1 (−78.2) |
| | 560 | the same | the same | the same | 1 (−218.2) |
| | 384 | the same | the same | the same | 1 (−59.2) |
| | 300 | the same | the same | the same | 1 (−143.2) |
| | 120 | the same | the same | the same | 1 (−318.2) |
| 375 × 812 phone path, en-GB, Student submission | 700 | 132.8–140.8 | 148.8–169.8 | 450.8–494.8 | 0 |
| | 560 | 7.8–15.8 | 23.8–44.8 | 325.8–369.8 | 1 (−89.2) |
| | 384 | the same | the same | the same | 1 (−265.2) |
| | 300 | 25.8–33.8 | 41.8–62.8 | 343.8–387.8 | 0 |
| | 120 | 7.8–15.8 | 23.8–44.8 | 325.8–369.8 | 1 (−236.2) |
| 1280 × 900, en-GB, Staff, verdict standing | 820 | 476.9–484.9 | 492.9–513.9 | 731.9–775.9 | 0 |
| | 600 | 219.9–227.9 | 235.9–256.9 | 474.9–518.9 | 0 |
| | 400 | 7.9–15.9 | 23.9–44.9 | 262.9–306.9 | 1 (−62.1) |
| | 250 | the same | the same | the same | 1 (−64.1) |
| | 100 (Student) | the same | the same | the same | 1 (−122.1) |
| From the discard question, 1280 | (Discard at 194) | 7.9–15.9 | 23.9–44.9 | 262.9–306.9 | 1 (−122.1) |
| From the discard question, 375 ms-MY | (Buang at 299) | 7.8–15.8 | 23.8–44.8 | 325.8–369.8 | 1 (−310.2) |

- One scripted scroll per job at most, never a second (counted to each job's end or its cancel, about 45 jobs).
- Scrolled away to the top during a job: at 1280, `scrollY` 0 through 31 progress writes, 0 scripted scrolls, until the finished card took focus (2610); at 375 ms-MY, 0 through 23 writes. The page does not pull back.
- The first report came 6 ms after the press (three readings), so there is no real moment to scroll away in before it.

### D-03 (the dialog) — confirmed

Computed `overscroll-behavior: contain` on `.dialog` and on its `::backdrop`; the root's `overflow` is `visible`.

| Window | Gesture | Page `scrollY` | Dialog `scrollTop` |
| --- | --- | --- | --- |
| 1280 × 900, dialog 16–578, nothing to scroll | wheel up over the message box | 3346 → 3346 | 0 |
| | wheel up over the dimming at the left | 3346 | 0 |
| 1280 × 900, details open (16–884, 867 in 866) | five gestures up and down over the heading | 3346 throughout | 0 at the end |
| 320 × 568, dialog 16–552 (622 in 534) | wheel down over the dialog | 4545 | 0 → 88 (its end) |
| | down again at its end; up; up twice at its top | 4545 throughout | 88; 0; 0 |
| | wheel up over the dimming above, at the left and below the dialog | 4545 throughout | 0 |

Escape: focus on `#feedback-open` at 710.9–754.9 of 900 (1280) and 353.9–397.9 of 568 (320), `:focus-visible`, page not moved. D's 500 px moves and the opener at 1711 px are gone.

### D-04 (the skip link) — confirmed

Real Tab to the link, real Return. 1280 × 900: `location.hash` `#main`, `scrollY` 87, `#main` top 0, the band's bottom 0; next Tab: `#about-help-button` at 32–76, ring from 28. 375 × 812: `scrollY` 179, `#main` top 0, band's bottom 0; next Tab: a control at 160–204, ring from 156, 40–338 across a 375 px window. `#main` computes `scroll-margin-top: -8px`; the root's `scroll-padding-top` is still 8 px.

### D-05 and E-06 (the IDs box) — confirmed

`max-height: 224px` (`--detail-max-height`, 14rem), `field-sizing: content`, `overflow-y: auto`.

| Lines | 1280 × 900: height, hidden below | 375 × 812: height, hidden below |
| --- | --- | --- |
| 0, 1 | 128, 0 | 128, 0 |
| 8 | 218, 0 | 218, 0 |
| 9 | 224, 18 | 224, 18 |
| 12 / 13 / 14 | 224; 90 / 114 / 138 | |
| 40 | 224, 762 | 224, 762 |

Error and helper, after a refused Create with `2031456` in the box and Module empty:

| Window | Box to error | Error to helper | Box to helper, no error | Module's box to its error |
| --- | --- | --- | --- | --- |
| 1280 × 900 | 8 px (2627 → 2635) | 8 px (2656 → 2664) | 8 px (2627 → 2635) | 8 px (2307 → 2315) |
| 375 × 812 | 8 px (2667 → 2675; the error two lines, 42 px) | 8 px (2717 → 2725) | 8 px (2638 → 2646) | 8 px (2376 → 2384) |

Module and Assignment have no helper in this view, so "the same spacing as Module's error and helper" was read as error 8 px under its box in both, and the helper 8 px after. `aria-describedby` on the box is still `submission-card-ids-helper submission-card-ids-error`.

### The whole path, twice — no console error

- en-GB, 1280 × 900: Staff video, trim from `0:02`, title card with three fields, Fade, Smaller file; Create (bar 47.9–55.9, Cancel 302.9–346.9, no scroll); 6.2 s; "Finished video — 4.9 MB … a 5-second staff title card, then 28 seconds of 30 seconds, from 0:02.0 to 0:30.0, a smaller file, the blue closing graphics fading in over the picture."; title "Ready — UoN Video Finisher"; focus on the card. "Create the video again": focus on the question; "Keep it": focus on the card; again, "Discard it and start again": job started, card gone; Cancel: focus on Create, "Cancelled — UoN Video Finisher".
- ms-MY, 375 × 812 (phone path): Student submission, four fields (two IDs), trim from `0:02`; "Teruskan juga"; "Cipta video itu" (one scroll of −59.2, bar 7.8–15.8, Batal 325.8–369.8); 3.4 s; "Video siap — 9.4 MB … kad serahan 5 saat, kemudian 28 saat daripada 30 saat … bertanda “Internal use only”. Bahasa video: English."; no sideways scroll (`scrollWidth` − `innerWidth` = 0).
- `read_console_messages`, errors only, after a marker written at the start of each walk: nothing after either marker. Outside the two walks the console held only mediabunny's "A VideoSample / An AudioSample was garbage collected without first being closed" lines after cancelled jobs (the builders record them), Chrome's note that it blocked a `beforeunload` panel on a page that had had no user gesture, and the dev button's own "Deliberate test error".

---

## Findings

### F-01 — INCOMPLETE (E-02) — With the bar in the window, the arriving progress pushes the focused Cancel below the window's bottom edge, and nothing brings it back (S2, FIX-NOW)

- **What happens.** Create hands focus to Cancel; the first report then puts the bar, its line and the job's notes ABOVE Cancel, about 250 px at 1280 and 300 px at 375. `progressRevealScroll` returns 0 whenever the bar and its line are in the window (`src/ui/progress-reveal.ts:39`), so where Cancel stood within that distance of the window's foot it is pushed out, holding focus, and stays out.
- **Evidence, a first job (no earlier job), 1280 × 900, en-GB, Staff, `dynamic-40s.mp4` whole (a video with no sound note, step 6 369 px).** Create's top at 720: bar 612.9–620.9, Cancel 867.9–911.9 in a 900 px window (its last 12 px and the ring cut). At 770: bar 666.9–674.9, Cancel 921.9–965.9, wholly below, the same 1 s later, 0 scripted scrolls. At 640: Cancel 787.9–831.9, in. At 820: the browser's own focus scroll had already run, Cancel 501.9–545.9.
- **Evidence, a retry after Cancel, `talk-30s.mp4`.** 1280 × 900: Create at 600: Cancel 920.9–964.9. Read three times, once with a real click; the screenshot then shows the bar, "Analysing audio", the notes and "Announce progress", and no Cancel. At 500: 783.9–827.9, in. 375 × 812, ms-MY: Create at 450: Batal 775.8–819.8 of 812; at 480: 805.8–849.8; at 505: 812.8–856.8, wholly below; at 350 and at 550: in.
- **Not met** with a sound note standing (the usual fixture): the 372 px verdict leaving lifts Cancel more than the progress lowers it (Cancel at 474.9 to 775.9 in every row of the table above). So the builders' and E's states never showed it.
- **Breaks.** WCAG 2.4.11 Focus Not Obscured and 2.4.7 Focus Visible at the moment a job starts; Nielsen 3 (the way out of a job is off screen). A keyboard user's next Return cancels a job through a button they cannot see.
- **Fix.** In `progressRevealScroll`, before the early return: where the progress is in the window and Cancel's box (plus the inset) is past the bottom edge, return the least distance that brings Cancel in while keeping the progress's top at or below the inset: `Math.min(cancel.bottom - (windowHeight - room), progress.top - room)`. The function already has both boxes and the both-or-alone rule; `src/ui/progress-reveal.ts` and its test. No word, element or token.

### F-02 — INCOMPLETE (D-01) — The line's hold is taken at 0 px while Submission's fields are hidden, so a switch to Student submission during a check still jumps steps 4 to 6 by 42 px (S3, FIX-NOW, seen once)

- **Evidence.** 1280 × 900, en-GB, a card standing, Video type Staff. Output changed; 100 ms later Video type set to Student submission. `#submission-card-fields` carried `min-height: 0px;` from 125 ms (the hold taken on the box while it was hidden) to 571 ms. Step 4's top 2675.9 → 2717.9 at the verdict, step 6's 3248.9 → 3290.9, the card 3734.9 → 3776.9: the 42 px the hold exists to keep. Read once; the builders' table lists "`0px` on a hidden box, harmless".
- **Also for the record, not a finding:** a hold taken in one language or width keeps that px for its length: 21 to 63 px open inside the fields' box and 47 to 334 px at step 6's foot after a language change or a 1280 → 375 resize mid-check, all gone at the verdict.
- **Fix.** In `paintSubmissionFilled` (`src/main.ts`, the `submissionLineHold.hold()` line), take the hold only when the fields' box is on the page; or give the hold up in the Video type handler so the next paint can take it at the real height. Low value: a half-second window.

### F-03 — NEW — With a card standing, "Check again" ends with focus on "Create the video again" under the card and the verdict above the window (S3, FIX-NOW)

- **Evidence.** 1280 × 900, a finished video not saved, a verdict above its card. Output changed, "Stop the check" pressed (focus passes to "Check again" at 123.9–167.9, `scrollY` 3089), "Check again" pressed (focus on "Stop the check", same place). At the verdict: focus on "Create the video again" at 427.9–471.9, `scrollY` 3900, the verdict the press asked for at −732.1 to −608.1, the status line at −360.1, the card at −315.1 to 403.9. The page moved 811 px and the answer is two-thirds of a window above the top edge. Seen twice (the first time by script: 2935 → 4092). Without a card Create is straight under the verdict, so the same hand-on is harmless.
- **Not from the night's fixes:** the hand-on of focus is older (`src/ui/focus-hand-on.ts`); found because the place hold made the state worth walking.
- **Breaks.** Nielsen 1 (the result of the action just taken is not in view); UI-STANDARDS System status.
- **Fix.** When a check ends and a card stands between the verdict and Create, hand focus to Create with `{ preventScroll: true }` where the verdict is in the window, or to the verdict's own heading. Behaviour only.

### F-04 — INCOMPLETE (E-03) — A time committed with Return keeps its full-width text in the field after focus leaves (S3, FIX-NOW)

- **Evidence.** 中文, 1280 × 900. `３` typed in Start with real keys, then Tab: the field reads `0:03.0`. `０：２０` typed in End, then Return: taken (handle at 20, "保留 30秒钟 中的 17秒钟。"), the field still `０：２０`; Tab away: still `０：２０`, beside a Start of `0:03.0`. The field is rewritten only when it is painted while not focused (`src/main.ts:2048`), and no paint follows the blur. The same holds for a half-width `2` committed with Return (it stays `2`), so the rule is older than the fix; the fix makes it show as two scripts side by side.
- **Breaks.** Nielsen 4 (consistency), polish. Nothing is read wrongly.
- **Fix.** Rewrite a trim field from the trim on `focusout` where it has no problem standing. `src/main.ts`, beside the two fields' `change` handler.

### F-05 — INCOMPLETE (VH-239; D-06, not in this batch) — The tab's title still says "Cancelled —" after the status line has moved on and emptied (S3, FIX-NOW)

- **Evidence.** Student submission, a job cancelled: title "Cancelled — UoN Video Finisher", status "Cancelled. Nothing was saved, and your original file is unchanged." Module emptied, Create pressed: status "Correct the title card in step 3 to continue.", title unchanged. Module filled again: status EMPTY, step 6 showing only Create and its note, title still "Cancelled — UoN Video Finisher". Read twice (375 × 812 and 1280 × 900). D-06 found the title and the status agreeing on "Cancelled"; here they no longer agree, which is the builder's own ground for leaving D-06.
- **Fix.** `titleMovesOn()` wherever the status line is given other words than the outcome's: the refused Create (`refuseTitleCard`), and the handlers D-06 names. `src/main.ts`.

---

## Checked and found fine

- No inline style left on `#step-create`, `#submission-card-fields` or `#preflight-report` after any of about sixty scenarios at two sizes and three languages; no gap after settling.
- The step's own hold is unchanged from VH-240 where no card stands (605 held `605px` at 1280, 813 held `813px` on the phone path, page height constant).
- A real click on an Output radio with step 5 and the verdict both in the window: `scrollY` 2200 throughout the re-check.
- The feedback dialog and the reveal: the reveal makes no scroll while the bar is in the window; nothing scrolled behind the dialog in any gesture.
- "Announce progress" is the page's own stored choice: unticked, it stays unticked over a reload and Back, and the box shows it.
- After Back with the stored language changed elsewhere, the header switch, `<html lang>`, the title and the legend agree in all three languages.
- The IDs box grows from 128 to 218 px as IDs are typed and stops at 224; steps below move 96 px at most.
- Focus after "Keep it" (the card), after Discard (Cancel), after Cancel (Create), after Escape in the dialog (its opener).

## Seen, not reported as findings

- With the window's top edge cut through step 6 below the verdict (the page scrolled to its foot at 1280), a scripted output change moved `scrollY` 3017 → 2869 and it did not return: Chrome's scroll anchoring on the status line as the verdict left above it. No control that starts a re-check is in the window in that position, so a user cannot do it as I did; not reproduced with a control in view.
- A new file chosen from far down the page puts `scrollY` at 0 (1002 → 0): the page as it was before the night.
- Steps 3 to 5 grow by 103 to 214 px in total while a job runs (the "Locked while your video is being made." lines) and return at its end: older than the night's work, and the reason Create's place and Cancel's differ.
- "Set start here" with the preview at the video's end makes the trim invalid ("Correct the start and end times in step 2 to continue."): correct, noted only because it emptied step 6 in one of my runs.
- `1:2:3` is told "the start is after the end of the video", not "write the time as…": right for a 30 s video, since hours are a form the field takes.

## Could not check

- A failed or timed-out device check (the dev button's worker error is only logged; the check completed), a block verdict reached from a re-check, a failed job.
- Frames: `requestAnimationFrame` did not run in the hidden pane, so no reading here is per frame; a movement lasting under 30 ms inside one task would be missed by the ticks, though the `MutationObserver` rows showed none.
- A real drag with a pointer, a touch flick, a real phone's address bar and keyboard, reduced motion, forced colours, classic scrollbars.
- A tab discarded and restored, a duplicated tab, a natively chosen file after Back; Firefox and Safari.
- Save and its end.

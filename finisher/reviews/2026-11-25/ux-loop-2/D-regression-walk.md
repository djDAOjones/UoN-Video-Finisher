# Analyst D — regression walk over the night's fixes (VH-238, VH-239, VH-240, VH-241) — loop 2, 2026-11-25

Read-only. Driven in the built-in browser, my own tab at `http://localhost:5174/` (closed at the end, viewport reset), Chrome on the Mac, the working tree the dev server serves (so the VH-243 mends to `trimStatusOwed` and the dialog's `100dvh` were in it). Fixtures only; no file in `samples/` touched; Save never pressed.

Method. The pane was hidden for most of the run, so timers and animation frames are throttled there: facts were read with `MutationObserver`s (every change inside `#step-create`, `#drop-error`, `#status`, `#page-announcer`, the two trim error lines, the `<title>`), with `getBoundingClientRect` and computed styles, and short waits were made on a message channel, not `setTimeout`. A file picked again was simulated as the builder's was: a `cancel` event on `#file-input` with a new `File` object in its list. Real key presses (Tab, Shift+Tab, Return, Escape) and real wheel scrolls were used for the skip link, the dialog and focus return.

A note on widths: below 768 px the pane also sends an Android user agent, so a page RELOADED at 375 px shows the phone verdict ("This may not finish on a phone or tablet", "Continue anyway"). I used both: 375 px reached by resizing a desktop-loaded page (668 px step 6) and 375 px after a reload (813 px step 6).

## Counts

8 findings. By kind: REGRESSION 2, INCOMPLETE 3, NEW 3. By severity: S1 0, S2 2, S3 6. By fix class: FIX-NOW 7, WORDS 1.

No fix failed outright. Nothing found that leaves a status, title or announcement saying something untrue after the orders I tried.

---

## Per fix: confirmed, with the numbers read

### VH-238 — confirmed (in the simulated form; the native chooser not driven)

- A chooser closed with nothing picked (a bare `cancel`, list untouched): 0 writes to `#source-status`, trim `0:01.0`–`0:30.0` kept, result card and title unchanged. Read twice: after a good file, and after a failed read.
- The same file again (`cancel` with a new `File`): `#source-status` wrote "Reading the video…" then "Video read." (15 ms apart), the trim went back to `0:00.0`–`0:30.0`, the tab's title from "Ready — UoN Video Finisher" to "UoN Video Finisher", the standing card from "Finished video — 8.8 MB" to "Previous video — 8.8 MB", Create from "Create the video again" to "Create the video". All as a new choice does.
- After that re-pick, a trim change re-checks ("Checking this video against your device…" then the verdict; fields `0:05.0`–`0:30.0`), and so does an output change (C-01 gone).
- `notvideo.mp4` failed, then picked again by `cancel`: read again ("Reading the video…" then the same failure sentence). C-02 gone.
- The same after a drop: a file chosen by a drop, then a bare `cancel`: no `change` followed (a standing "That was 2 files…" line, which any `change` empties, stayed), so the list's object is the one held.
- "Try again" for a read that timed out: read in code only (`src/ui/failure-text.ts:60`); no fixture times out. See D-08.

### VH-239 — confirmed, with one criterion read narrowly (D-06)

- Refused drop during a job: "A video is being made. Cancel it, or wait for it to finish, before choosing another." written at 0 ms, emptied at 3526 ms, the moment `#status` said "Your video is ready." Two writes in all.
- Refused drop, then Cancel: emptied within about 5 ms of the press (54 ms after the drop), with "Cancelled. Nothing was saved…" on the status line and the chooser enabled.
- Two files dropped during a job get the job's sentence, not "That was 2 files", and it goes with the job.
- Tab title: "Cancelled — UoN Video Finisher" became "UoN Video Finisher" in the same task as a trim change (read before the check ran) and stayed so after the verdict. "Ready — UoN Video Finisher" stayed through a trim change and its re-check while "Finished video" stood. A new file or a re-pick sets it to "UoN Video Finisher".
- Refused preview (an `error` dispatched on `#trim-preview`): `#page-announcer` held "A preview is not available for this file. You can still set the times."; emptied at a new file, at a failed read, and at a re-pick of the same file; said again when the preview was refused again after the re-pick. A page-language change empties the announcer and leaves the visible note translated.
- Trim: with "abc" in End, three ArrowRight keys on the Start handle (handle 0 → 3): 0 writes to `#status`, 0 to `#trim-end-error`. A second bad End ("xyz") wrote the status once (the VH-243 mend), the unchanged error line not at all. With Start and End both bad, End put right wrote "Correct the start and end times in step 2 to continue." again. Confirmed.
- Seen again, already in the review of fixes: "Checking this video against your device…" is written twice per trim change, once at the commit and once when the pause ends.
- Not read: the save's end, a failed job, start-up (my drop landed 211 ms after load, after start-up had settled).

### VH-240 — confirmed for step 6's own box; two things inside and beside it still move (D-01, D-02)

`#step-create`'s inline `min-height` was empty, and the step no taller than its content (gap 0), at the end of every sequence below.

| Sequence (talk-30s.mp4 unless said) | Held | End |
| --- | --- | --- |
| 1280: trim; output | `605px`, 422 px of it empty, 0.9–1.3 s | 605, empty `min-height` |
| 1280: trim, output, trim, trim inside 300 ms | one hold of `605px` | 605 |
| 1280: trim, Stop the check at 100 ms | released at once, step 183 ("Check stopped.") | then an output change holds `183px` and ends at 605 |
| 1280: handle trim, then a typed time keeping under 3 s inside the pause | released at once, step 115 | min-height empty; put right: holds `115px`, step 183 then 605 |
| 1280: output change while a trim error stands | no hold left | 115 |
| dynamic-40s: trim to the quiet 15 s (verdict gains the audio note), then back | `369px` then 605; `605px` then 369 | one move each way, no gap after |
| 1280: page language changed in the pause and in the check (zh, ms, en) | the old language's px (605 over a 563 px Chinese verdict) | released at the verdict, gap 0 |
| 1280: Video type to Student submission in the pause; staff/submission/staff inside 90 ms of an output change | `605px` | 605 |
| 1280: the three "?" opened during a hold | `605px` | 605 |
| 1280 → 375 during a hold kept open 9 s | `605px` | 668 at the verdict |
| 375 → 1280 during a hold | `668px`, 63 px more than the content needs, for the hold's length | 605 |
| 375 (desktop page): trim; output | `668px` | 668 |
| 375 after a reload (phone verdict, "Continue anyway") | `813px` | 813, before and after the acknowledgement |
| The discard question open, trim changed | `569px`, step 905 | 1041 |
| A finished video standing, trim changed | `905.062px` | 1277 (the verdict arrives above the card) |
| New file, re-pick, failed read, prores block | released | empty |

Not produced: a failed or timed-out check, a block verdict reached from a re-check (no fixture gives one).

By design and still a movement, measured for the record: Stop the check gives up the room at once (605 → 183, the page 3917 → 3495), and Check again grows it back at the verdict; a typed bad time takes the step 605 → 115 while the user is in step 2.

### VH-241 — confirmed, reading by reading; two side effects (D-04, D-05)

- Skip link, light and dark (it takes the band's roles in both): box `rgb(250, 246, 239)` on the band `rgb(16, 38, 59)` 14.31:1; ring 2 px white, offset 2 px, 15.41:1; words 14.31:1 on the box. Shown at 16, 16, 177 × 48 on Shift+Tab from the language switch.
- Scroll inset: `scroll-padding-block: 8px` on the root. Every tabbable control was put 10–12 px past the window's top and bottom edge in turn and focused: the least room left was 7.9 px at 1280 × 900 (72 placements), 7.8 px at 375 × 812 (80), 7.9 px at 320 × 568 (60). The ring is 2 px + 2 px, so it is whole with about 4 px to spare, on the checkbox, radio and segment faces too. `scrollY` is 0 after load at 1280 and 375. Focus moved by the page: the result card after a job came to rest at 56–754 in a 900 px window; the first invalid field after a refused Create (Student submission, empty) at 428–472, centred.
- Reduced motion: NOT rendered (the pane cannot set it). Read in the stylesheet: the bar's own `background-position: 50% 0` is what the collapsed animation falls back to.
- Error line weight: 600 on every error line raised, helper 400. At 320 px in English, 中文 and Bahasa Malaysia: the trim's two, Submission's four (and "“123” is not a student ID number. Each is 8 digits."), the staff card's three "This field is full…" lines, the dialog's "Write a message first.": no line past its panel's inner edge, none clipped, page `scrollWidth` − `innerWidth` = 0. Longest: three lines. Dark: `rgb(255, 215, 217)` on `rgb(28, 49, 69)`, 10.14:1.
- Set buttons at 320 px (without the text-spacing sheet, which I did not apply): inside the panel's 24–296 in all three languages; Malay 49–266 and 49–241, "Use the whole video" wrapping to 60 px tall.
- Footer help links at 320 px: each link's box 56 px (English), 80 px (Malay), 4 px of padding inside each, so the two texts are 8 px apart. One-line links are still 44 px at 1280.
- Dialog: 320 × 568: 16–552, scrolls inside itself (622 in 534), Close reached by Tab at 499–543 with 9 px under it and its ring whole, Escape closes, focus back on "Report a problem"; with "What will be sent with it" open the top stays at 16. 375 × 812: 16–640, no scroll; open: 16–796. 1280 × 900: 320–960 across, 16–578; open: 16–884. Padding 16 px and message box 128 px below 400 px, 32 px and 170 px above.
- Student IDs box: 128 px empty and with one ID, 218 px with eight lines, nothing hidden (`scrollHeight` = `clientHeight`).

---

## Findings

### D-01 — INCOMPLETE (VH-240) — In a Student submission, steps 4, 5 and 6 still jump at every trim or output change, because a line in step 3 is withdrawn for the check (S2, FIX-NOW)

- **Evidence.** Video type "Student submission", talk-30s.mp4. At 1280 × 900: `#step-title` 1008 px → 966 px during "Checking…" → 1008 px at the verdict; `#step-create`'s top 3262 → 3220 → 3262 while its own height stays 605. At 375 × 812: step 6's top 3716 → 3653 → 3716 (63 px). Read four times (two trims and an output change at 1280, one trim at 375). The line that goes is `#submission-card-filled`, "The card also shows the running time, 0:26, and today’s date, marked as the date the card was made, not the submission date." (42 px, two lines at 1280; three at 375). Staff video with the title card on: step 3 does not move (853 px throughout).
- **Why.** `keptSecondsNow()` (`src/main.ts:2749`) is `null` through a re-check, by VH-215's rule that an old length is never said of a new trim, so `paintSubmissionFilled` hides the line and paints it again at the verdict. That is the same withdrawal VH-240 held room for in step 6, one step up, and it moves step 6 itself.
- **Breaks.** UI-STANDARDS "Loading states must preserve layout stability"; the commit's own sentence, "the step and the page no longer bounce".
- **Fix.** A second `createHeightHold` on `#submission-card-fields` (or `#step-title`), taken and released at the same nine call sites as `createStepHold`. Nothing stale is shown; only the room is kept. `src/main.ts:315` and the calls beside each `createStepHold`.

### D-02 — INCOMPLETE (VH-240) — With a finished or previous video's card in step 6, each re-check still moves the card, its player and "Save the video" 304 px up and back (S3, FIX-NOW)

- **Evidence.** 1280 × 900, talk-30s.mp4, a video made and not saved, then the file chosen again so a verdict stands above the card. Trim changed: the card's top 3137 → 2833 → 3137, "Save the video" 3774 → 3470 → 3774, `#step-create` held at `1277.06px` with 372 px empty at its FOOT. Read twice. The hold keeps the step's outer box; what the check withdraws is above the card, so the card rises into the space and the emptiness opens below it.
- **Breaks.** Same rule as D-01. It is the state in which the user most needs "Save the video" to stay where it is (the card says "It is not saved yet").
- **Fix.** When `#process-result` holds a card, keep the room where it was taken from: hold the height of the verdict's own blocks (`#preflight-report` and `#audio-warnings`) instead of, or as well as, the step's. The builder's reason for holding the step (no blank above "Checking…") applies only when nothing stands below. `src/main.ts`, the hold's three call sites.

### D-03 — NEW — The page behind the Report a problem dialog scrolls, and Escape then returns focus to a button that is off screen (S2, FIX-NOW)

- **Evidence.** 1280 × 900, dialog open with its details open, page at `scrollY` 3099. One wheel gesture up over the dialog (which had nothing left to scroll): page 3099 → 2599. One over the backdrop: 2599 → 2099. Escape: dialog closed, `document.activeElement` is `#feedback-open`, its top at 1711 px in a 900 px window. At 320 × 568: first gesture scrolled the dialog 43 → 0, the second moved the page 4388 → 3888; after Escape the opener was at 854 px in a 568 px window. `overscroll-behavior` on `.dialog` is `auto`; nothing stops the root scrolling while a modal is open.
- **Why it matters now.** At 320 × 568 the dialog must be scrolled to reach Close (wish VH-241.2), so a flick past its end is the ordinary gesture there, and it moves the page instead. On closing, the user is somewhere else on the page with no visible focus; the next Tab jumps the view.
- **Breaks.** Nielsen 3 (user control), WCAG 2.4.7 Focus Visible and 2.4.11 Focus Not Obscured at the moment the dialog closes. Pre-existing; not in loop 1's reports or the wish list.
- **Fix.** CSS only: `overscroll-behavior: contain` on `.dialog`, and `html:has(dialog[open]) { overflow: hidden; }` with `scrollbar-gutter: stable` if the scrollbar's going would shift the page. `src/styles/app.css`, the `.dialog` block near line 1695.

### D-04 — REGRESSION (VH-241) — After the skip link, 8 px of the header band stay at the top of the window (S3, FIX-NOW)

- **Evidence.** 1280 × 900, light. Shift+Tab to the skip link, Return: `location.hash` `#main`, `scrollY` 79, the band 87 px tall, `#main`'s top at 8 px. The root's new `scroll-padding-block: 8px` applies to the fragment jump as to focus, so the jump stops 8 px short and the band's bottom 8 px show as a dark strip above the title. Before the fix the jump put `#main` at 0.
- **Breaks.** Carbon alignment, polish only; nothing is hidden or unreachable.
- **Fix.** Either accept it, or give `#main` a `scroll-margin-top` of minus the same token; `test/stylesheet.test.ts` asserts "no `scroll-margin`", so that test line would change with it. `src/styles/app.css`.

### D-05 — REGRESSION (VH-241) — The student IDs box now has no greatest height (S3, FIX-NOW)

- **Evidence.** `#submission-card-ids`: `field-sizing: content`, `max-height: none`, no `maxlength`. 8 lines: 218 px. 40 lines: 986 px. Before the fix it stayed at its three rows and scrolled inside. Anything pasted by mistake (a class list, a paragraph) now pushes steps 4 to 6 down by its whole length, at 320 px more so.
- **Breaks.** Nielsen 5 (error prevention), polish. The fix's aim, eight IDs all showing, is met at 218 px.
- **Fix.** A `max-height` on the box from an existing length token, with its own scroll past that. `src/styles/app.css`, the `#submission-card-ids` rule.

### D-06 — INCOMPLETE (VH-239) — "Cancelled —" leaves the tab's title only at a trim or output change, not at "a choice" (S3, FIX-NOW or the criterion reworded)

- **Evidence.** 1280 × 900, job cancelled: title "Cancelled — UoN Video Finisher". Then Video type changed, the closing colour changed, the title card box ticked, the page language changed and changed back: the title still "Cancelled — UoN Video Finisher" after each (in Chinese, "已取消 — UoN 视频成片工具"). A trim change cleared it at once. The item's criterion says "when a choice is changed after a cancelled or failed job".
- **Reading.** The builder's note explains it: the title follows `#status`, which also still says "Cancelled. Nothing was saved…" after those four choices, so the two agree. That is defensible; it is narrower than the criterion as written, and analyst C's C-11 ("after the page has moved on") is only half answered for a user who cancels, changes the closing graphics and looks at the tab.
- **Fix.** Call `titleMovesOn()` from the handlers that already withdraw the discard question (Video type, title card, closing, video language), or reword the criterion to "at the next check". `src/main.ts:2282`.

### D-07 — NEW — A Start time typed past the End is marked invalid, but the reason is written only under End (S3, FIX-NOW)

- **Evidence.** 1280 × 900, End `0:25`, typed `0:27` into Start and left the field: `#trim-start` and `#trim-end` both `aria-invalid="true"`; `#trim-start-error` empty and hidden; `#trim-end-error` "The end must come after the start." Start `0:23`: the same, with "Keep at least 3 seconds of the video." under End. Start's `aria-describedby` (`trim-format trim-start-error trim-result`) then carries no reason at all, since `#trim-result` is emptied too. The status line does say "Correct the start and end times in step 2 to continue."
- **Breaks.** WCAG 3.3.1 Error Identification for the field just edited; Nielsen 9. At 320 px the two fields are stacked, so the sentence is a field away from the one typed in. Pre-existing; seen while reading VH-239's trim lines.
- **Fix.** Write the same existing sentence under the field that was edited (or under both). No new words. `src/main.ts`, `renderTrim`.

### D-08 — NEW — "Try again." after a read that timed out names no way to try again (S3, WORDS)

- **Evidence.** Read in code, not raised (no fixture times out): `src/ui/failure-text.ts:60` gives a timed-out read `failure.tryAgain`, "Try again. If the problem happens again, report it with the Report a problem button, which adds details that will help." That sentence was written for failed jobs, where "Create the video" is on the page to press. After a failed read there is no button: the way to try again is to choose the same file again, which VH-238 has just made work and which nothing says.
- **Breaks.** Nielsen 9 (help users recover): the remedy is right and its route is unstated.
- **Fix (owner's words).** Proposed English for a timed-out read: "Choose the file again. If the problem happens again, report it with the Report a problem button, which adds details that will help." `src/i18n/en-GB.ts` near line 813 (a new key beside `tryAgain`), and the two other languages.

---

## Checked and found fine

- No status, title or live region left untrue across: re-pick, bare cancel, drop refused during a job, job cancelled, failed read, failed read picked again, good file; and the same with a refused preview standing. After the failed reads: title "UoN Video Finisher", `#status` empty, step 6 hidden (or showing only "Previous video" when one stands), `#drop-error` empty, `min-height` empty.
- A re-pick with the discard question open, and with a result standing, behaves as a new file does.
- `#drop-error` is `role="alert"`; the trim and card error lines are plain paragraphs reached by `aria-describedby`, so the heavier weight changes nothing that is spoken.
- The picker is disabled during a job, so a `cancel` then cannot be taken for a pick.
- Dialog: the error "Write a message first." comes into view with focus on the message box; no sideways scroll in the dialog or the page at 320 px in three languages.
- The acknowledged phone verdict: "Continue anyway" is asked again after each trim change (the verdict is new each time); the hold behaves the same either side of it.
- prores-6s.mov blocks in step 1 with steps 2 to 6 hidden and no hold left.

## Seen, not reported as findings

- "That was 2 files. Drop one video at a time." stays through trim changes, a job and its end, until the next drag or choice. The builder recorded the same and left it: it is not a refusal for something that ends.
- The 1 px scroll in the open dialog at exactly 1280 × 900 (content 867 in 866): an accident of that height.
- `#trim-start-error`'s `hidden` attribute is set again on each commit while it is already hidden and empty: not a live region, nothing spoken.
- A preset radio or checkbox focused at the window's bottom edge shows its whole ring, but its label's last lines can be below the edge (up to 12 px): the browser scrolls the input, not its label. As before the fix.
- The dialog one step from the top of a wide window: the owner's open question in VH-241, not repeated.

## Could not check

- The native file chooser (wish VH-238.1), Save and its end, a failed job ("Not made —"), a read or a check that times out, a block verdict reached from a re-check.
- A real reduced-motion setting, forced colours, the text-spacing sheet, 200 % zoom, a real phone's address bar against `100dvh`.
- A refused drop during start-up (not timed).
- "Open email app" with a message, and "Copy message and details" (they act outside the page), so the dialog's status line being brought into view was not read.
- Anything a screen reader says; every "said" above is a write to a live region.

# Analyst A — the first-time novice's whole journey

Date: 2026-11-25. Build on screen: `v0.3.0+20261125.b18a4fcb · development`.
Driven in the built-in browser (my own tab, closed at the end), `http://localhost:5174/`, 1280 × 900, en-GB, light and dark, Chrome 156 on macOS.
Judged against Nielsen's ten heuristics and `UI-STANDARDS.md`. Read-only: nothing in the project was changed. Save was never pressed.

Method: every fact below was read from the DOM (`getBoundingClientRect`, `getComputedStyle`, `document.activeElement`, a MutationObserver on every `[aria-live]`, `[role=status]`, `[role=alert]` and `#page-announcer`), with screenshots only for the look. Keys were real key presses; files were loaded with the brief's `__loadFixture` and, for drops, synthetic `DragEvent`s.

Counts: 21 findings. Severity 1: 0. Severity 2: 5. Severity 3: 16.
Class: FIX-NOW 16, WORDS 4, ELEMENT 1, PERSON 0.

---

## Severity 2 — friction or a standards miss

### A-01 — Step 6 collapses by 422 px on every re-check, and the Create button vanishes for up to a second

- **Evidence.** talk-30s.mp4, staff video, light, 1280 × 900. Any change that re-runs the device check (a trim field, a slider key, "Set start here", "Use the whole video", either File size / quality radio) withdraws the verdict and the audio note, shows "Checking this video against your device… [Stop the check]", then draws them again.
  Sampled every 50–100 ms: `#step-create` height 605 → 183 → 605 px; `document.scrollHeight` 3917 → 3495 → 3917; "Create the video" absent for 0.4–0.9 s (four samples).
  At 1280 × 1300, scrolled to the bottom, one click on a File size radio: `scrollY` 2617 → 2195 → 2617 inside 400 ms, so the whole page bounces 422 px and back. At 1280 × 900 the scroll does not clamp, but the footer rises 422 px and drops again under the radios the user has just pressed.
- **Breaks.** UI-STANDARDS, Empty and no-data states: "Loading states must preserve layout stability — no content jumps". Nielsen 1.
- **Fix — FIX-NOW.** Keep VH-124's rule (no stale verdict above "Checking…") but hold the space: while `status.checking` is up, give `#step-create` a `min-height` of its last rendered height and release it when the new verdict is painted. Touches `src/main.ts:1627` and `:2018` (`withdrawVerdict()` then `setStatus(checking)`), no words, no new element.

### A-02 — After one refused Create, the Student ID box calls every half-typed number wrong, on every key, in a live region

- **Evidence.** Student submission, press Create with the fields empty (refused, as the spec says). Then type in "Student ID numbers": after the first key the line under the box reads "“1” is not a student ID number. Each is 8 digits." and it is rewritten with the longer fragment on each key until the eighth digit. The line is `aria-live="polite"`; my observer logged a new announcement per key. With several IDs the same happens for each one ("“1234567810000001” is not a student ID number…" appeared mid-typing).
  The opposite holds before the first Create: "1234" then Tab gives no message at all (`aria-invalid` absent), so the same mistake is silent until Create.
- **Breaks.** UI-STANDARDS, System status: a live region is "never a control's own result on the keystroke that produced it". Nielsen 9 (the message blames a number the user has not finished typing) and 5 (validate early).
- **Fix — FIX-NOW.** In `paintTitleCardErrors` (`src/main.ts:2766–2772`), while the IDs box has focus do not report the token under the caret when it is fewer than 8 digits of digits only; report it on blur. Apply the same blur check before any refusal, so a short ID is said when the user leaves the box. Existing words only (`“{id}” is not a student ID number. Each is 8 digits.`).

### A-03 — After a video is finished, steps 2–5 stay editable but only "Video type" says a change is for the next video

- **Evidence.** talk-30s.mp4 finished with a title card. Every control in steps 2–5 is enabled. Only the Video type switch gains "Changes to the video type apply to the next video you make." (`en-GB.ts:122`).
  I changed the Title text: step 6 did not change at all; the finished video is the one made with the old title, and "Save the video" is still the primary button.
  I then changed File size / quality: step 6 now reads, top to bottom, "Ready to go — This should take about 10 seconds. Estimated size up to 12.4 MB." … "Finished video — 5.3 MB — Made from talk-30s.mp4: … a smaller file …" — two sizes and two outputs on screen, and nothing says the upper block is about a video not yet made.
  A novice who spots a typo on the card, fixes it and presses Save gets the uncorrected video.
- **Breaks.** Nielsen 1 and 6; UI-STANDARDS, Recognition over recall: "Show current selection, mode, and state explicitly"; spec §9 gives the "next video" line to the switch only (VH-140).
- **Fix — WORDS.** One line in step 6, shown above the verdict whenever a finished video is on screen and a choice has changed since it was made. Proposed English: "Your changes are for the next video. This one stays as it was made." It reuses the `nextVideo` idea and the existing status-line component.

### A-04 — In the dark scheme an invalid field looks almost the same as a valid one

- **Evidence.** Dark, Student submission, Create refused. Error line colour `rgb(255, 215, 217)` (`--support-error`, red-20, `tokens.brand.css:181`); ordinary helper colour `rgb(207, 212, 216)`. Those two measure 1.14:1 against each other; both pass 7:1 on the panel. The invalid border is 2 px of the same pink against the normal 1 px grey. Error weight is 400, there is no icon and no prefix. In the 0.6-scale and full-scale screenshots I could not tell the error lines from the helper lines.
  In light the pair is dark red on dark blue (1.4:1 in luminance, but the hue carries it).
- **Breaks.** Nielsen 9 (recognise an error); Carbon's invalid text input (icon plus colour); UI-STANDARDS "Do not rely on colour alone" is met only because the sentence itself is the message.
- **Fix — FIX-NOW.** Give the field error line the existing "compact emphasis" type role (14/21/600) in every scheme, so weight carries the state where colour cannot. `src/styles/app.css` near `:1612` and `:1698` (`[aria-invalid='true']`) and the error-line rule. Carbon's error icon would be the fuller fix; that is a new element for the owner.

### A-05 — A student submission keeps "High quality, for publishing" selected

- **Evidence.** Switch Video type to Student submission: step 3 and step 4 change and lock ("A student submission always has a title card.", "Always on for a student submission."), step 5 does not: `preset/best` stays checked, although the other option is named "Smaller file, for assignments and sharing — For Moodle assignment uploads, email, and messages." Estimate for talk-30s.mp4: "up to 12.4 MB" against "up to 6.3 MB".
- **Breaks.** Nielsen 5 (safe defaults) and 6; UI-STANDARDS "Prefer safe defaults".
- **Fix — FIX-NOW, with the owner's word.** When the switch moves to Student submission and step 5 has not been touched in this page, select "Smaller file"; moving back restores "High quality". No new words. It changes the default that spec §9 (line 594) describes for a staff video only, so it needs a decision entry.

---

## Severity 3 — polish

### A-06 — With Fade, the encoding percentage stops for about three seconds, then jumps to "Finishing the file"

- **Evidence.** Same source (talk-30s.mp4), same machine: closing None 2.75 s, Cut 3.5 s, Fade 5.5 s. Unfiltered 100 ms trace on silent-10s.mp4 with Fade: "Encoding video — 74%" at 1.0 s, "79%" at 3.9 s, "Finishing the file" at 4.2 s. Fade runs were slower by about this much in all five I made; none of five Cut or None runs paused. Slide not timed. The cause was not traced in code.
- **Breaks.** UI-STANDARDS "The UI must never appear frozen"; Nielsen 1. On this Mac it is 3 s; on a slow laptop the same fixed stretch will be longer.
- **Fix — FIX-NOW.** Count the closing build's frames in the encode fraction so the bar keeps moving (`src/ui/progress.ts` and the worker's progress posts). A stage name of its own would be new words.

### A-07 — The discard question removes the player and "Save the video"

- **Evidence.** Finished, unsaved video; press "Create the video again". The card (719 px, player, Save) is replaced by "This video is not saved yet — You have not saved the video you just made. Starting again will discard it." with "Discard it and start again" and "Keep it". The one thing the sentence prompts, saving, is not offered: the route is Keep it, then find Save again. Escape does nothing.
- **Breaks.** Nielsen 3 and 7.
- **Fix — ELEMENT.** Keep the existing "Save the video" button in the question's action row (existing words; a control in a new place, so the owner's).

### A-08 — By keyboard, "Save the video" is eight Tab presses after the finished card

- **Evidence.** After finish, focus is on the card (`section.notification`, `tabindex="-1"`). Tab order: the `<video>` and its six internal controls, then "Save the video", then "Create the video again". Nine Tab presses reached "Create the video again".
- **Breaks.** Nielsen 7; the comment in `index.html` for step 6: "when it is done, [the eye lands] on the result and Save".
- **Fix — FIX-NOW.** In the result card, put the lifetime line and the action row before the player in the DOM (`src/ui/result-summary.ts`, `src/ui/notification.ts`). It changes the card's look, so it wants the owner's glance.

### A-09 — After Cancel, step 6 forgets the verdict, the estimate and the audio note

- **Evidence.** Cancel at 39%: step 6 reads only "Cancelled. Nothing was saved, and your original file is unchanged. [Create the video] The finished video stays here…". "Ready to go", the time, the size and "Worth knowing about the audio" are gone until some choice is changed. The same holds after a finished video.
- **Breaks.** Nielsen 6; UI-STANDARDS "Surface context near the point of action".
- **Fix — FIX-NOW.** Paint the retained pre-flight summary again when a job ends in cancel (`renderPreflight`, `src/main.ts:1714`).

### A-10 — Every trim or output change speaks the whole verdict again, unchanged audio note included

- **Evidence.** `#status` (`role="status"`), after three arrow presses on the Start slider: "Checking this video against your device…" then "Device check complete. Ready to go. This should take a few seconds. Estimated size up to 4 MB. Worth knowing about the audio: This recording is very quiet." The pair repeats for each settled change (six pairs in one session), and only the time and size differed.
- **Breaks.** UI-STANDARDS, System status: a live region is for "what the user did not cause or cannot see"; Nielsen 8.
- **Fix — FIX-NOW.** On a re-check started by the user's own change, speak only the sentences that differ from the last spoken verdict (existing words). A person with a screen reader should confirm the result reads well.

### A-11 — The trim's result line and slider text round to whole seconds while the fields show tenths

- **Evidence.** Start 0:20.0, End 0:25.5: "Keeping 6 seconds of 30 seconds." (5.5 s kept). Start slider at 22.5: `aria-valuetext="23 seconds"` beside a field reading "0:22.5". The finished record is exact ("12 seconds of 30 seconds, from 0:00.0 to 0:12.3").
- **Breaks.** Nielsen 4.
- **Fix — FIX-NOW.** Format both through the clock-time formatter when the value is not a whole second (`trimHandleText`, `src/ui/trim.ts:164`; the result line's `{kept}`).

### A-12 — A slider stops at the 3-second floor without saying why

- **Evidence.** End 0:25.5; Start slider: three ArrowRight from 20 give 22.5, then PageUp and End leave it at 22.5. Nothing on screen or in a live region changes. The typed route says "Keep at least 3 seconds of the video."
- **Breaks.** Nielsen 1 and 4.
- **Fix — FIX-NOW.** When a key press is clamped by the floor, show that same sentence under the fields as a note (existing words), cleared on the next valid move.

### A-13 — A file dropped outside the dashed box is swallowed with no message

- **Evidence.** Synthetic `dragover` + `drop` of one MP4 on the `h1` and on the footer: `defaultPrevented` true, nothing read, nothing written to `#drop-error` or any live region (`src/ui/drop-zone.ts:178–188`). The code sets `dropEffect = 'none'` outside the zone, so a real drag should show the no-drop cursor; I could not see a real cursor.
- **Breaks.** UI-STANDARDS "No blank panels or silent failures"; Nielsen 9.
- **Fix — FIX-NOW.** Treat a one-file drop anywhere on the page as a drop on the zone (behaviour only). The zone is the only drop target the page has.

### A-14 — The Report a problem dialog jumps when "What will be sent with it" opens

- **Evidence.** Dialog 640 × 562 at y = 169; open the disclosure: 868 px high at y = 16. The summary just pressed moves 153 px up from under the pointer because the modal re-centres.
- **Breaks.** UI-STANDARDS layout stability.
- **Fix — FIX-NOW.** Anchor the dialog to the top (`.dialog { margin-block-start: var(--spacing-05) }` or the equivalent, `src/styles/app.css:1661`) so it grows downwards.

### A-15 — "Ready to go" shows over an empty required card

- **Evidence.** Student submission, four empty required fields: step 6 says "Ready to go" with an enabled primary "Create the video". After the refusal the same green "Ready to go" sits directly above "Correct the title card in step 3 to continue."
- **Breaks.** Nielsen 1 and 5. The refusal itself works well (focus to the first field, a line per field).
- **Fix — FIX-NOW.** While `submissionRefused` is true, draw the existing "Correct the title card in step 3 to continue." line above the verdict rather than below it, so the two are not read as one message. No new words.

### A-16 — "Adds opening and closing graphics." names something the page calls a title card

- **Evidence.** The title's "?" list, second line (`en-GB.ts:87`). Step 3 is "Title card"; "opening graphics" appears nowhere else on the page and is the name of an unbuilt item (VH-23).
- **Breaks.** Nielsen 4; UI-STANDARDS "Do not create synonyms for existing concepts".
- **Fix — WORDS.** "Adds a title card and closing graphics." These five lines are the owner's own (VH-196), so his to change.

### A-17 — "None of these stop you continuing." under a single note

- **Evidence.** One audio note ("This recording is very quiet" or "This video has no audio") is followed by "None of these stop you continuing. Your original file is not changed either way." (`en-GB.ts:664`).
- **Breaks.** Nielsen 2.
- **Fix — WORDS.** A singular form for one note: "This does not stop you continuing. Your original file is not changed either way."

### A-18 — The focused card's ring is cut off at the top of the window in one state

- **Evidence.** Light, finished video with a re-drawn verdict above it; "Create the video again" then "Keep it": both times the focused `section.notification` sat at y = −0.125 (`scrollY` 3585 of a possible 3715), so the top side of its 2 px outline at 2 px offset is above the viewport. In the plain finished state the card sits at y = 56 and the ring is whole. Seen twice in one session, not in dark.
- **Breaks.** WCAG 2.4.13 as UI-STANDARDS reads it (a whole perimeter).
- **Fix — FIX-NOW.** This is wish VH-233.1's remedy (a scroll margin for the ring on an existing token), with a second place it bites: `scroll-margin-block` on the focusable notification.

### A-19 — "Errors captured" is a plain panel that reads as an unnumbered seventh step and cannot be put away

- **Evidence.** "Trigger test error (worker)": `section.panel#errors-panel` (`index.html:677`) appears under step 6 with an `h2`, no status rail, no kind, no dismiss. `#page-announcer` said "A problem was found. Use Report this problem in Errors captured to send the details." Seen only through the development trigger.
- **Breaks.** UI-STANDARDS: "One inline notification … for everything worth knowing: a rail in the status colour, a title".
- **Fix — FIX-NOW.** Draw it with the existing notification, kind `error`.

### A-20 — Switching Video type moves everything below it by 21 px

- **Evidence.** Staff helper wraps to two lines at the 28rem measure, Submission's to one: `#step-trim` top 659 → 638 px.
- **Breaks.** UI-STANDARDS layout stability (small).
- **Fix — FIX-NOW.** Reserve two lines for the helper (`min-height` of two `--line-height` rows on the helper under `#video-kind`).

### A-21 — "until you start another video" is true only of pressing Create

- **Evidence.** After choosing a second file the card stays, retitled "Previous video — 21.6 MB", still saying "It stays here until you start another video or close this tab." A novice has, in their own terms, just started another video.
- **Breaks.** Nielsen 2.
- **Fix — WORDS.** "It stays here until you make another video or close this tab." (`en-GB.ts:401`, `:457`, `:458`).

---

## Checked and found fine

- **Empty page.** One obvious first action; the native chooser is the only primary control; Tab order is skip link, language, "?", chooser, Video type, footer. The "?" opens and closes in place, `aria-expanded` kept, Escape closes the inner toggletip first and the outer second, focus stays on the button. The small "?" is 20 px drawn with a 44 px hit area.
- **Footer.** System check and the statement open and close; links name themselves and say "(new tab)". Report a problem: modal, labelled, focus to the message box, Escape closes, focus returns to its button; nothing sent.
- **Step 1 messages.** notvideo.mp4, prores-6s.mov and clip-8s.webm each get a specific message with a next step; silent-10s.mp4 says "Video read. **No audio.**" and a note in step 6; portrait and dynamic read cleanly. Every one recovered by choosing another file, no reload. Two files dropped: "That was 2 files. Drop one video at a time."
- **Trim by typing.** "abc", an end before the start, 0:45 on a 30 s video and a 2-second part each get their own sentence beside the field; step 6 swaps Create for "Correct the start and end times in step 2 to continue."; "Use the whole video" restores and passes focus to the Start slider.
- **Title card.** Limits stop typing and say so (Title 100, Assignment 80); an empty ticked card is refused with "…or untick Add a title card." and focus on Title. Submission: nine IDs, a duplicate and a wrong length each have their own sentence; both locks say why.
- **Closing graphics.** Each combination rewrites the result sentence; disabled controls take the dashed edge and one reason line.
- **Job.** Tab title follows the stage; focus goes Create → Cancel → finished card; Cancel answers in under 100 ms with a clear sentence and focus on Create; each step says "Locked while your video is being made."
- **Discard.** Asked on "Create the video again" and on Create after a second file, never on choosing the file; the question takes focus, the danger button does not.
- **Contrast.** Every visible text node at 7:1 (4.5:1 large) in the five states I measured (dark: finished, submission refused; light: submission idle, submission refused, no closing graphics); no opacity tricks.
- **Targets.** No visible control under 44 × 44 px in the state measured (light, video read, submission).
- **Focus rings.** In dark, a 2 px solid white outline at 2 px offset on every Tab stop from the skip link to the footer; the chooser and the two sliders draw theirs another way (the chooser's seen in a screenshot, the sliders' not measured). Light was seen in screenshots only.

## Not checked

- "Save the video" and everything after it (native dialog).
- The time-left line and long-job states: every job here finished in 3–8 s.
- "Stop the check" and "Check again": the check lasts under a second.
- A real drag from Finder, the native file dialog, and playback in either player (the pane was hidden, so the players showed a loading spinner I treat as an artefact).
- Screen readers, forced colours, Chinese and Malay, widths other than 1280 px (one reading at 1280 × 1300 for A-01).

## Already known, seen again, not re-reported

- The statement's review date, "18 November 2026", is a week past: backlog VH-137, the owner's.
- The native player's own Tab stops: wish VH-138.4.

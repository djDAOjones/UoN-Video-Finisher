# Analyst E — a student handing in coursework, on a small screen, not in English (2026-11-25, loop 2)

Driven in the built-in browser, own tab, at `http://[::1]:5174/`, 375 × 812 (the pane's phone emulation: Android Chrome user agent, touch points, so the app took its phone path: "This may not finish on a phone or tablet", then "Continue anyway", then "Create the video"). Whole Student submission journey walked twice, 中文 then Bahasa Malaysia, light scheme; landscape 812 × 375 mid-form, mid-job and on the finished card; dark once at the end. Fixtures `talk-30s.mp4`, `portrait-10s.mp4`, `silent-10s.mp4`, `dynamic-40s.mp4` (for a longer job), `prores-6s.mov`, `notvideo.mp4`. About fifteen jobs started, eight run to the finished card and seven cancelled. Save was not clicked. Read-only: no project file touched. The origin's two stored preferences were put back as found before the tab was closed.

Translation quality is not reported. Line numbers are from the working tree as it stood (it held uncommitted changes to `src/ui/trim.ts`, `src/main.ts` and `app.css`, so they may move).

## Summary

| ID | Sev | Class | Finding |
| --- | --- | --- | --- |
| E-01 | 1 | FIX-NOW | After Back or Forward, the browser puts radios and selects back as that history entry left them and the page does not re-sync: the switcher shows a language the page is not in, "Video language" shows one language while the job is made in another, and step 4's line and lock describe a different choice from its select |
| E-02 | 2 | FIX-NOW | At 375 × 812, pressing "Create the video" scrolls the progress bar and the stage line above the top of the window; the student is left looking at Cancel and the footer |
| E-03 | 2 | FIX-NOW | The trim time fields refuse full-width digits and the full-width colon, with an error that shows the pattern the student believes they typed, and Create leaves the page; the ID box folds the same characters |
| E-04 | 2 | FIX-NOW | The keypad hints work against the formats the page asks for: Start/End time ask for a decimal keypad, which has no colon; the ID box asks for a numeric keypad, which on some phones has no space, comma or new line |
| E-05 | 2 | FIX-NOW | Typed card text is lost on a reload, with no warning; the page language, video type and video language come back, the four fields do not |
| E-06 | 3 | FIX-NOW | The ID box's error is 79 px under its box, below three lines of helper; the other three fields' errors are 8 px under theirs |
| E-07 | 3 | WORDS | The line under "Video type" tells a student only about "Internal use only"; the four needed fields are 1,065 px further down and nothing at the switch says a card with their ID numbers is added |
| E-08 | 3 | WORDS | "Keep this tab visible and your computer awake" straight after the page has said it is on a phone or tablet |
| E-09 | 3 | FIX-NOW | "Video language" breaks onto two rows (2 + 1) in step 3 at 375 px; the same three choices in the header sit on one |
| E-10 | 3 | FIX-NOW | A portrait video's trim preview is 277 × 487 px, so "Set end here" is under the fold while the preview is in view, and step 2 takes 1.5 screens |
| E-11 | 3 | FIX-NOW | With a previous unsaved video, step 6 reads new, old, new: the new file's verdict, the old video's card with the only primary button, then the new file's "Continue anyway" |
| E-12 | 3 | FIX-NOW | The finished card of a video with no audio says nothing about audio (seen once) |

Counts: severity 1 × 1, severity 2 × 4, severity 3 × 7. Class: FIX-NOW × 10, WORDS × 2, ELEMENT × 0, PERSON × 0 (the person checks these need are under "Could not check").

## Findings

### E-01 — After Back or Forward the controls and the page disagree, and a card is made in a language the page does not show (S1, FIX-NOW)

- **What happens.** On a history navigation (`performance.getEntriesByType('navigation')[0].type === 'back_forward'`) Chrome restores every radio and select to what that history entry held when it was left. The page has already painted itself from `localStorage` and its defaults, and does not look again. The four card fields carry `autocomplete="off"` and are not restored; the radios and selects carry none.
- **Seen three times, 375 × 812.**
  1. Entry A left with page 中文, video language English. On a later entry the page was switched to Bahasa Malaysia and the video language to 中文. `history.back()` to A: `<html lang="ms-MY">`, title "Penyiap Video UoN", legend "Bahasa halaman", and the header switcher shows **中文** chosen. Step 3 shows **English** chosen under "Bahasa video", while the line under Video type quotes “仅供内部使用”. A job made from that state said "Video ini: Serahan pelajar. Bahasa video: 中文." and its record "Bahasa video: 中文." The student saw English selected and got a Chinese card.
  2. The other way: page switched to English on A, `history.forward()`: `lang="en-GB"`, title "UoN Video Finisher", legend "Page language", switcher shows **Bahasa Malaysia** chosen.
  3. Entry A left with Animation type Fade, Colour White, Smaller file. Back to it: the select shows "Fade" and White is chosen, but the line under them reads "Your video cuts to the blue closing card. Adds 4 seconds." and "Plays over" is disabled as for Cut. The job followed the controls ("a smaller file, the white closing graphics fading in"), so here the description and the lock are the stale part.
- **Not on a plain reload.** `location.reload()` gave defaults and matching radios (type `reload`), checked once.
- **Who meets it.** Case 3 needs only: set step 4, go Back to the page that linked here, come Forward. Cases 1 and 2 need the stored language to have changed since the entry was left (a second tab, or two entries of the tool in one tab). A phone that discards the tab in the background and restores it uses the same restore; not checked on a phone.
- **Breaks.** Nielsen 1 (the selection shown is not the selection used); UI-STANDARDS "Show current selection, mode, and state explicitly", "No silent propagation of invalid states"; WCAG 3.2.2 / 4.1.2 (state exposed is wrong).
- **Fix — FIX-NOW.** Either stop the restore: `autocomplete="off"` on the radios and selects (the radios built at `src/ui/language-switcher.ts:72–76`; `index.html:161,165` video type, `:461` closing-type and the onset select, `:519,525` colour, `:565,572` preset, the two checkboxes); or re-sync on `pageshow`: set each control from the page's own state and repaint step 4's line and lock. The first is one attribute per control and no behaviour change elsewhere.

### E-02 — Pressing Create scrolls the progress out of the window (S2, FIX-NOW)

- **Evidence.** 375 × 812, ms-MY, `talk-30s.mp4`, the phone path (two notifications above the button, step 6 942 px high). After "Teruskan juga", "Cipta video itu" was pressed with the button at five heights in the window. `getBoundingClientRect().top` straight after, and again 0.7 s later:

  | Create button's top before | `#process-progress` top after | `#process-progress-text` | "Batal" (focused) | `scrollY` before → after |
  | --- | --- | --- | --- | --- |
  | 700 | −70 | −54 | 248 | 4110 → 4419 |
  | 560 | −210 | −194 | 108 | 4250 → 4559 |
  | 384 (a real click) | −51 | −35 | 267 | 4426 → 4400 |
  | 300 | −135 | −119 | 183 | 4510 → 4484 |
  | 120 | −310 | −294 | 8 | 4690 → 4659 |

  In every case the bar and the "Menganalisis audio" / "Pengekodan video — 42%" line are above the top edge; what is in the window is the job line, "Pastikan tab ini kelihatan…", "Umumkan kemajuan", Batal, and the footer. The same happened in 中文 on the first job (`scrollY` 3981 → 4269). When the job is started from the discard question instead, the heading lands at 25 and the bar at 106: in view.
- **Cause, as far as read.** The verdict's notifications (652 px in Malay, 481 px in Chinese) leave, the progress block arrives, and focus passes to Cancel (`src/main.ts:2613–2616`, through `src/ui/focus-hand-on.ts`); nothing in the code scrolls (`grep scrollIntoView` finds none), so the place the window ends up is the browser's own, from the focus move and scroll anchoring.
- **Breaks.** UI-STANDARDS "Every async action must show status… The UI must never appear frozen"; Nielsen 1. A phone has no tab title to fall back on.
- **Fix — FIX-NOW.** When the job starts, hand focus to Cancel with `{ preventScroll: true }` and then bring step 6's heading (or `#process-progress`) to the top of the window with one `scrollIntoView({ block: 'start' })`, which `scroll-padding-block` at `app.css:21` already insets. Not measured at desktop sizes.

### E-03 — Full-width digits and colon are refused in the trim's time fields (S2, FIX-NOW)

- **Evidence.** zh-Hans, 375 × 812. Typed with the real keyboard into "开始时间": `３` then Tab. The field shows what looks like "3", takes the red edge, and says "开始时间以分钟和秒的形式写出，例如 1:05.5，或者以秒的形式写出，例如 65.5。" Step 6 loses its button: "在步骤 2 中更正开始时间和结束时间，即可继续。" The same for `０：０５` and for `0：25` (half-width digits, full-width colon). A half-width `2` in the same field was taken and rewritten "0:02.0".
- **Why.** `parseTrimTime` (`src/ui/trim.ts:51–59`) tests each part with `/^\d+(\.\d+)?$/`, and `\d` is ASCII only. The ID box folds first: `studentIdTokens` normalises with `STUDENT_ID_FOLD = 'NFKC'` (`src/ui/title-card-step.ts:200–205`, `src/config/cards.ts:186`), and took `１２３４５６７８` and `，` `、` as separators in this walk.
- **Breaks.** Nielsen 9 (the message names the pattern the student sees in the box); consistency (one field on the page folds, two do not).
- **Fix — FIX-NOW.** `text.normalize('NFKC').trim()` at the top of `parseTrimTime`, with the same constant. `：` folds to `:` and `．` to `.` under NFKC.

### E-04 — The keypad each field asks for cannot type the format its helper gives (S2, FIX-NOW)

- **Evidence (attributes read in the page).** `#trim-start` and `#trim-end`: `type="text" inputmode="decimal"` (`index.html:215,237`). The helper under them: "Minutes and seconds, like 1:05.5, or seconds, like 65.5." and the fields themselves show "0:30.0". A decimal keypad has digits and a decimal point; no colon. `#submission-card-ids`: a `textarea` with `inputmode="numeric"` (`index.html:423`); its helper: "Type up to 8, with spaces, commas, or new lines between them." A numeric keypad on iOS has digits only, so a second ID cannot be set apart from the first, and `2031456720314568` is refused ("“2031456720314568”不是学号。") as measured here.
- **Limits.** The emulation shows no keypad; what each phone's keypad carries is from knowledge of the platforms, not from this walk. On a decimal keypad the seconds form still works, so trim is hindered, not blocked; a group's ID list on a digits-only keypad is blocked short of pasting.
- **Breaks.** UI-STANDARDS "Helper text… clarifies format" (the format given cannot be typed); WCAG 3.3.2.
- **Fix — FIX-NOW.** Drop `inputmode` from the two time fields (or `inputmode="text"`), and from the ID box, or keep `numeric` there only if a person finds a separator on the keypads students use. No words change.

### E-05 — A reload loses the four card fields, unwarned (S2, FIX-NOW)

- **Evidence.** With a file chosen and Assignment and Module typed, a synthetic cancelable `beforeunload` came back `defaultPrevented === false`; with an unsaved finished video it came back `true`. `shouldWarnBeforeLeaving` (`src/main.ts:2592–2603`) is given the job, the save and the unsaved result only. After a reload: language zh-Hans, Video type Student submission and Video language English all returned from `localStorage`; all four fields were empty and the file was gone. Card text does survive a refused file, a new file, a rotation, a cancel and a finished job.
- **Why it matters here.** The four fields are the longest typing in the journey (module code and title, convenor's name, up to eight 8-digit numbers), and a student on a phone leaves the tab to look them up.
- **Breaks.** UI-STANDARDS "Auto-save… and recovery states must be visible", "Warn before… data loss"; Nielsen 3 and 5.
- **Fix — FIX-NOW, with the owner's word on which half.** Arm the existing leave warning while any card field holds text (one more input to `shouldWarnBeforeLeaving`; its comment already weighs "a page that always warns"), or keep the fields in `sessionStorage` beside the three preferences. The second stores student ID numbers in the browser until the tab closes, which is the owner's to decide. No new words either way.

### E-06 — The ID box's error is the far side of its helper (S3, FIX-NOW)

- **Evidence.** After a refused Create, 375 × 812: the box at 380–508, the helper 516–579, the error "“2031456”不是学号。学号为 8 位数字。" at 587–608: 79 px under the box. Assignment, Module and Convenor: 8 px. At 812 × 375 the box is 162–290 and the error 348–369, 6 px inside the window. Focus does go to the box and the page does bring it to mid-window, so without a keyboard the error is in view; an on-screen keyboard that keeps the caret in view would cover it.
- **Fix — FIX-NOW.** Put the error's `div` before the helper (`index.html:428–434`), as the other three fields have it; the `aria-describedby` order can stay.

### E-07 — Nothing at the Video type switch says what a submission asks of the student (S3, WORDS)

- **Evidence.** Under the switch, for Student submission: "如果视频有结尾图形，图形会显示“仅供内部使用”。" / "Jika video mempunyai grafik penutup, grafik itu memaparkan “…”." (`video.kind` hint, `en-GB.ts:115`: "If the video has closing graphics, they say “{words}”."). The switch is at 756 px, step 3 at 1,821 px: the four needed fields first appear 1.3 screens below, past the whole of Trim. A student learns of them at step 3 ("All four fields are needed.") or when Create is refused.
- **Proposed English.** "Adds a card with your module, assignment, tutor, and student ID numbers. If the video has closing graphics, they say “{words}”."

### E-08 — "your computer awake" on a phone (S3, WORDS)

- **Evidence.** Phone path, during every job: "视频制作过程中，请保持此标签页可见且电脑处于唤醒状态。" / "Pastikan tab ini kelihatan dan komputer anda terjaga semasa video dibuat." (`en-GB.ts:594`: "Keep this tab visible and your computer awake while the video is made."), one step after "This may not finish on a phone or tablet".
- **Proposed English.** "Keep this tab visible and your device awake while the video is made. Closing the tab ends the job."

### E-09 — "Video language" wraps to two rows where "Page language" holds one (S3, FIX-NOW)

- **Evidence.** 375 px, both languages: the header's switcher is one row, 291 px (English, 中文, Bahasa Malaysia). In step 3 the panel's column is 277 px, so the same three become "English | 中文" over "Bahasa Malaysia", a 2 + 1 block that reads as two controls; with the chosen segment on the first row the second row looks like a separate button. Read from screenshots at 375 px; not measured at 812 × 375.
- **Fix — FIX-NOW.** Below the width where three do not fit, stack the three one per row (a `flex-direction: column` on `.segmented` inside the step at the existing narrow breakpoint), so it reads as one list of three. Existing tokens only.

### E-10 — A portrait video pushes "Set end here" under the fold (S3, FIX-NOW)

- **Evidence.** `portrait-10s.mp4` (720 × 1280), 375 × 812: `#trim-preview` is 277 × 487. With its top at the window's top the track is at 524–568, Start time 613–657, "将开始设在此处" 665–709, End time 754–798, "将结束设在此处" **806–850**. Step 2 is 1,235 px, 1.52 screens (904 px for a landscape video). At 812 × 375 the preview is capped at 225 px and the picture is 127 px wide in it.
- **Fix — FIX-NOW.** Cap the trim preview's height on a narrow window at what leaves both Set buttons in view (the rule at `app.css:1471–1475` already takes `--preview-max-height`; a lower value under the narrow breakpoint), picture contained as now.

### E-11 — New, old, new in step 6 (S3, FIX-NOW)

- **Evidence.** zh-Hans, 375 × 812, `portrait-10s.mp4` chosen while `talk-30s.mp4`'s video is unsaved. Step 6 is 1,198 px (1.48 screens): the new file's two notifications (4163–4668), then "上一个视频 — 7 MB" with its player and the page's only primary button "保存视频" (4725–5199), then the new file's "继续" (5223). The button that starts the new video sits directly under the old video's card and reads as part of it.
- **Fix — FIX-NOW.** Draw the previous video's card after the Continue/Create button (or before the verdict), so the new file's verdict and its button are together. No words change.

### E-12 — A finished video with no audio does not say so (S3, FIX-NOW, seen once)

- **Evidence.** ms-MY, `silent-10s.mp4`. Step 1: "Video dibaca. Tiada audio." Step 6 before Create: "Video ini tiada audio… Jika anda menjangkakan audio, semak rakaman sebelum menerbitkan." The finished card: "Dibuat daripada silent-10s.mp4: kad serahan 5 saat, kemudian keseluruhan video (10 saat), kualiti tinggi, potongan kepada kad penutup biru, bertanda “仅供内部使用”. Bahasa video: 中文." Nothing about audio; the only sign is the player's greyed speaker. This is the card the student reads before handing in.
- **Fix — FIX-NOW.** Carry the existing "This video has no audio" title into the record as one of its warnings (`src/ui/result-summary.ts`, which already holds whether the file has sound).

## How many screens (375 × 812, Student submission, `talk-30s.mp4`)

| Part | 中文 px | screens | Bahasa Malaysia px | screens |
| --- | --- | --- | --- | --- |
| Header band | 179 | 0.22 | 179 | 0.22 |
| Machine translation note | 168 | 0.21 | 189 | 0.23 |
| 1. Choose a video | 269 | 0.33 | 269 | 0.33 |
| Video type | 105 | 0.13 | 126 | 0.16 |
| 2. Trim | 904 | 1.11 | 952 | 1.17 |
| 3. Title card | 1,052 | 1.30 | 1,202 | 1.48 |
| 4. Closing graphics | 528 | 0.65 | 570 | 0.70 |
| 5. File size / quality | 240 | 0.30 | 261 | 0.32 |
| 6. Create (phone verdict) | 771 | 0.95 | 942 | 1.16 |
| Whole page | 5,314 | 6.54 | 5,868 | 7.23 |

At 812 × 375: 12.4 to 13.4 screens; Trim 2.0, Title card 2.5, Create 1.8 to 2.9.

Scrolled past without applying to a submission: in step 3, the card's intro, the locked "Add a title card" box and its reason (about 190 px before the first field); in step 6 on the phone path, 481 px (中文) or 652 px (Malay) of notifications before the only button. The staff card's four fields are hidden, not scrolled past. Nothing else in the page is staff-only once the switch is set.

## Checked and found fine

- **No sideways scroll, nothing clipped, no target under 44 px** in any state walked, both languages, 375 × 812 and 812 × 375 (`scrollWidth` = window width throughout; the one clipped reading was a 33-character title in a single-line field, which is B-06).
- **English left showing:** none beyond what is known or a name. 中文 page swept with every disclosure open, after a refused file, in progress, finished, at the discard question and after Cancel: only "Choose file / No file chosen" (the statement's S30), the two other languages' own names, the dev buttons, the version line, and names (Teams, Self Service, EchoVideo, YouTube, Moodle, WebCodecs, AAC, WAVE). Malay page read through in the same states: none seen.
- **The phrase from the other language carries its language:** “仅供内部使用” inside a Malay sentence is a `span lang="zh-Hans"`, as is "中文" in the record; each switcher segment sits in its own `lang`.
- **Page language against video language:** the legends differ ("页面语言" / "视频语言"); changing the video language repaints the quoted phrase under Video type and in step 4 at once; the job says "This video: Student submission. Video language: English." while it runs and the record ends "视频语言：English。"; when the two are the same the record leaves the line out. The card in the player matched each time (English, 中文 and Malay labels; typed text as typed).
- **Locks say why:** the ticked title-card box ("学生提交作品始终带有标题卡。"), Internal use only ("学生提交作品始终启用。" / "Sentiasa dihidupkan untuk serahan pelajar."), Plays over with Cut ("不与“切”一起使用。").
- **Card mistakes, each refused beside its own field, focus on the first wrong field, the window moved to it:** all four empty (four messages, focus on Assignment); two empty (focus on Convenor); a 7-digit ID, a 9-digit, letters, a name before a number ("“张伟”不是学号。"), names only, nine IDs ("这里有 9 个学号。卡片最多可容纳 8 个。"), one twice, a hyphen, a leading `#`. Full-width digits, `，` and `、` and a new line between IDs are taken. A 70-character token in the message wraps inside 277 px. An over-long title stops at 80 Latin or 40 Chinese characters with "此字段已满，其余内容未添加。" beside it.
- **Trim:** typed and dragged both ends, arrow keys on a thumb, "Use the whole video" hands focus to the Start slider; refusals for letters, past the end, under 3 seconds and an empty field each beside the field, and step 6 names step 2. Card text, trim and choices all survive a rotation.
- **Cancel:** mid-job at 812 × 375, "Dibatalkan. Tiada apa yang disimpan dan fail asal anda tidak berubah.", focus on "Cipta video itu".
- **Finished card:** size, record, player (240 × 135 for 16:9; 240 × 427 for a portrait output, the card whole in the window, Save at 732–776; 677 × 225 in landscape), "not saved yet… until you start another video or close this tab", Save primary. Choosing the next file keeps the old video as "上一个视频" with Save; the discard question comes only at Create, with the danger button first in reading order and focus on the question; "留着它" returns the card and focus to it.
- **Back with an unsaved video:** the browser's leave warning is armed (synthetic `beforeunload` prevented); with one history entry `history.back()` does nothing and the video stays.
- **Dark, 375 × 812:** discard question, running job and finished card read cleanly.

## Seen again, already reported (not counted)

- A-05: "High quality, for publishing" stays chosen for a submission, in both languages; the record says "高质量" / "kualiti tinggi".
- A-07: the discard question takes away the player and Save. A-09: after Cancel the phone warning and the audio note are gone. A-03 / A-21: the "next video" note under Video type; "until you start another video".
- B-03 (file name), B-06 (single-line fields), B-09 (the player's size: at 375 px the 16:9 player is 240 × 135 and its controls sit over the card's ID line, so a student cannot read their typed IDs back without full screen).
- Wish VH-143.4: "保留 30秒钟 中的 20秒钟" beside "5 秒" and "10秒钟".

## Could not check

- **Save** (native dialog), by instruction.
- **Any real on-screen keyboard:** E-04's keypads, and whether the keyboard covers E-06's error. A person with an Android phone and an iPhone.
- **The native "Leave site?" dialog itself:** the automation passes through it; only the handler's arming was read.
- **Rotation on a real phone:** in the emulation a rotation keeps `scrollY` in pixels, so mid-job the progress bar ended 636 px above the window and on the finished card Save ended above it. Chrome on Android anchors the view on rotation and the emulation does not, so this is not reported as a finding; a person should rotate once mid-job.
- **A phone discarding and restoring the tab** (E-01's and E-05's likeliest trigger on a phone).
- **E-02 at desktop sizes**, and with reduced motion.
- Job speed varied between 3 s and 25 s for the same file during the walk (the machine was shared), so no timing is reported.

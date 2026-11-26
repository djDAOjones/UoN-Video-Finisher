# Analyst C — words, states and recovery read from the code; wish-list triage

2026-11-25. Read-only. Base: `main` at `bd4632a3`, working tree clean before and after.

**How this was read.** `src/i18n/en-GB.ts` whole (528 leaves), `index.html` whole, `src/main.ts` whole (4,050 lines), every non-test module in `src/ui/`, `src/workers/job.worker.ts` and `failure.ts`, `src/media/save.ts`, the parts of `src/media/preflight.ts`, `probe.ts`, `inspect.ts`, `kept-range.ts` and `src/audio/warnings.ts` that choose a message, `src/styles/app.css` for the focus and file-input rules, `test/readability.test.ts`, `UI-STANDARDS.md`, the Nielsen digest, `project/wish-list.md`, `project/backlog.md` and the five item files named. A script flattened the table's keys and searched `src/` and `index.html` for each (scratch only).

**Browser use.** The task said none was needed; I used one tab of my own (`tab-3`, `http://localhost:5174/`, en-GB, default desktop size, closed afterwards) for four short checks with `talk-30s.mp4`, to confirm what the code reading predicted: C-01 (downstream half), C-03, C-06, C-11. Each is marked "confirmed in Chrome". Everything else is code-level and marked so. Save was not clicked. Note for the other analysts: the shared origin's `localStorage` held Video type = Student submission when my tab loaded; I did not change it.

Proposed English was run through a copy of the test's own Flesch–Kincaid function; every proposal of eight words or more scores under 8.2 (limit 10). No proposal uses a banned word or a new abbreviation.

---

## Part 1 — findings

Counts: 23 findings. Severity 1: 1 · severity 2: 9 · severity 3: 13. Class FIX-NOW: 8 · WORDS: 14 · ELEMENT: 1 · PERSON: 0 (three FIX-NOW findings also ask a person to confirm a screen reader's or a native dialog's behaviour; said in each).

### C-01 — After the same file is chosen again, the trim and the output choice stop re-checking, and Create makes the old trim

- **Severity 1** (a video made that is not the one the page describes, no error). **Class FIX-NOW** (behaviour only, no word). Downstream half confirmed in Chrome once; the trigger is from Chromium's source, not exercised through the native dialog: **seen once, simulated**.
- **Evidence.** Every handler asks "is the chosen file the one that was read?" by object identity against the input's live list: `src/main.ts:1770–1772` (output choice), `:2005–2006` (`commitTrim`), `:2465–2466` (Check again), and `:2285`, `:2293–2294`, `:3469` (which label and title a result takes). Chromium's `FileInputType::SetFiles` replaces the input's `FileList` with new `File` objects even when the same path is picked again, and then fires `cancel`, not `change` (it compares by path). So after "Choose File → the same file → Open", `fileInput.files[0]` is a new object, `inspectedFile` is the old one, nothing runs, and from then on each of those handlers returns early.
- **Confirmed in Chrome (the downstream half).** Loaded `talk-30s.mp4`, waited for "Ready to go … Estimated size up to 12.4 MB". Set `#file-input.files` to a fresh `File` of the same fixture and dispatched `cancel`, as Chromium does. Typed End time `0:10` and fired `change`. Result: step 2 read "Keeping 10 seconds of 30 seconds."; step 6 kept the old verdict "Ready to go This should take about 10 seconds. Estimated size up to 12.4 MB.", no "Checking this video against your device…", Create enabled. Pressed Create: the card read "**Previous video** — 9.5 MB / Made from talk-30s.mp4: **the whole video (30 seconds)**, high quality, a cut to the blue closing card." while step 2 still said "Keeping 10 seconds of 30 seconds."
- **Heuristic.** Nielsen 1 and 5; UI-STANDARDS "No silent propagation of invalid states".
- **Fix.** Hold the chosen file in one variable set by the `change` handler (`src/main.ts:1450`) and read that variable at the seven places above instead of `fileInput.files?.[0]`. Then add a `cancel` listener on the input: if `fileInput.files[0]` is not that variable, a file was picked again, so run the same read as `change` does (this also pays C-02). Test: a walker step that sets the same path twice through CDP `DOM.setFileInputFiles` and reads whether a second "Reading the video…" follows; stand-in unit test for the identity rule. Risk: medium-low, it touches the selection state every job starts from. **A person (or the walker through CDP) confirms the trigger in the native dialog first.**

### C-02 — Choosing the same file again does nothing at all, so a failed read cannot be retried and a re-copied file is not re-read

- **Severity 2. Class FIX-NOW.** Code-level, not exercised (native dialog).
- **Evidence.** Only `change` is listened to (`src/main.ts:1450`) and the input's value is never reset (no `fileInput.value = ''` anywhere). Chrome fires no `change` for the same path. Two messages send people straight into this: `warnings.endsEarly.detail` and `warnings.cutShort.detail` (`src/i18n/en-GB.ts:671`, `:676`) end "If you have a complete copy, choose that one instead." (a file re-copied to the same place has the same path), and a read timeout (C-08) invites another try. The page then shows nothing new: no "Reading the video…", no error. The drop route does work, because `src/ui/drop-zone.ts:168–171` dispatches `change` itself.
- **Heuristic.** Nielsen 1 and 9 ("a way forward").
- **Fix.** The `cancel` listener in C-01. Not `fileInput.value = ''`: that would blank the file name beside the browser's button.

### C-03 — A refused drop's message stays after it stops being true

- **Severity 2. Class FIX-NOW.** Confirmed in Chrome.
- **Evidence.** `src/ui/drop-zone.ts:113–118`: the refusal is cleared only by the next drag entering (`:134`) or by a file chosen (`:172–176`). Dropped a file while a job ran: `#drop-error` (`role="alert"`, and the file input's `aria-describedby`, `index.html:129–132`) read "A video is being made. Cancel it, or wait for it to finish, before choosing another." After the job had finished and the chooser was enabled again, the same sentence was still there, and it is what a screen reader reads as the chooser's description on focus. The same holds for `choose.drop.saving` after the save ends and `choose.drop.starting` ("The tool is still getting ready. Drop the video again in a moment.") after start-up settles a second later.
- **Heuristic.** Nielsen 1 (stale status); UI-STANDARDS "System status".
- **Fix.** Let `installDropZone` return a second function that forgets a refusal whose `busy` cause no longer holds (`refused.busy !== null && busy() !== refused.busy`), and call it from `applyControlLock` (`src/main.ts:2570`), which already runs at every one of those state changes. No word. Test: `drop-zone.test.ts` stand-in. Risk: low.

### C-04 — A save that fails at the place the user picked turns into a download without saying so, and can leave an empty file under the name they typed

- **Severity 2. Class WORDS** (one new sentence; the empty-file part is FIX-NOW). Code-level, not exercised (Save opens the native dialog).
- **Evidence.** `src/media/save.ts:176–187`: any picker-route error that is not a user abort is logged and "falls through to the download route". The page then says only `save.download` (`src/i18n/en-GB.ts:1010`): "Saving to your downloads folder — the browser may still be finishing it. …" Nothing says the chosen place failed (a full USB stick, a locked or read-only folder). The empty file the picker created there is removed on a *stopped* save (`:160–172`) but not on a *failed* one, so a 0-byte file with the chosen name can remain beside the real one in Downloads. Because of that fall-through, the page's own "The video could not be saved." notification (`status.saveFailedWhat`, `saveFailedNext`; `src/main.ts:3631–3645`) is reached only if `URL.createObjectURL` or the anchor click throws: in practice never.
- **Heuristic.** Nielsen 9; UI-STANDARDS "Error messages must say what happened and what to do next".
- **Fix.** (a) FIX-NOW: on a failed, not stopped, picker write, remove the file the picker created, as the stopped path does (`createdHere`, `handle.remove?.()`). (b) WORDS: return a distinct outcome (say `downloaded-after-failure`) and say it. Current: "Saving to your downloads folder — the browser may still be finishing it. Once it is there, upload it to where you will use it, or choose another video in step 1." Proposed, for this case only: "**The video could not be saved where you chose.** The browser is saving it to your downloads folder instead, and may still be finishing it. Once it is there, upload it to where you will use it, or choose another video in step 1." (grade 5.1)

### C-05 — "Choose the smaller file" is offered as the way out of too little space when the smaller file is already chosen

- **Severity 2. Class WORDS.** Code-level (the storage block cannot be raised with the fixtures).
- **Evidence.** Three places name the smaller output with no look at the output chosen: `src/ui/preflight-panel.ts:107` → `preflight.reasons.insufficientStorageResolvable` ("… Free some space and try again, keep less of the video, or choose the smaller file."); `src/main.ts:1701` → `status.storageWayOut` ("Keep less of the video, choose the smaller file, or free some space, then press Check again."); `src/ui/failure-text.ts:76` → `failure.outOfSpace.next` ("Free some space, or choose the smaller file, and try again."). `summary.presetId` is in hand at the first two and the job's record at the third.
- **Heuristic.** Nielsen 9 (a way forward that exists); UI-STANDARDS "specific … actionable".
- **Fix.** A second form of each for `presetId === 'smaller'`. Proposed: "There is not enough free space on this device. This job needs about {size} of working space. Free some space and try again, or keep less of the video." · "Keep less of the video, or free some space, then press Check again." · "Free some space, or keep less of the video, and try again." (grades 2.4, 3.1, 2.9). Three new keys in three languages, so the owner's.

### C-06 — A standing trim error and the status line are written again on every arrow key of the other handle

- **Severity 2. Class FIX-NOW.** Confirmed in Chrome (the DOM writes); what a screen reader does with them is a person's to hear.
- **Evidence.** `renderTrim` sets each error line's text unconditionally (`src/main.ts:1964–1965`), inside `aria-live="polite"` wrappers (`index.html:226`, `:246`), and `commitTrim` sets the status line whenever a problem stands (`:2019–2021`). Typed `abc` in End time, then pressed ArrowRight three times on the Start handle: `#trim-end-error` took 6 child-list writes of the same sentence ("Write the end time as minutes and seconds, like 1:05.5, or as seconds, like 65.5.") and `#status` took 3 of "Correct the start and end times in step 2 to continue." The page's own rule is the opposite: `paintLine` (`:2733`) exists "so a live region is not read again on every key", and `announce` (`:314`) relies on a fresh text node being said again. A mouse drag of the handle writes the line on every `input` event.
- **Heuristic.** UI-STANDARDS "System status": a live region is never "a control's own result on the keystroke that produced it"; WCAG 4.1.3.
- **Fix.** Use `paintLine(line, own)` at `:1964–1965` (same result, no write when unchanged). In `commitTrim`, skip `setStatus` when the line already holds that sentence (the comparison `paintTitleCardErrors` makes at `:2774`). No word. Risk: low.

### C-07 — Failure messages name "the Report a problem button" but not where it is

- **Severity 2. Class WORDS.** Code-level.
- **Evidence.** Five messages send the reader to it: `failure.tryAgain` (`en-GB.ts:813`), `failure.unlevellable.next` (`:785`), `failure.encoderRefused.next` (`:800`), `failure.checkFailed.next` (`:804`), `failure.startup.workerNotStarted` (`:823`). The button (`#feedback-open`) is in the footer band under "Something not working?" (`index.html:852–857`), a long scroll below a failure box in step 6. The page already has the words for this: `browserNote.notPassed` says "The system check **at the foot of the page** says what is missing."
- **Heuristic.** Nielsen 6 (recognition, context at the point of action) and 9.
- **Fix (words only, existing phrase).** e.g. `failure.tryAgain`, current: "Try again. If the problem happens again, report it with the Report a problem button, which adds details that will help." Proposed: "Try again. If the problem happens again, use the Report a problem button at the foot of the page. It adds details that will help." (grade 3.2). `unlevellable.next` proposed: "Use the Report a problem button at the foot of the page. It adds details that will help." (2.3). `checkFailed.next` proposed: "Press Check again to run the check once more. If the check fails again, use the Report a problem button at the foot of the page." (3.5). The alternative, a Report a problem button in the failure box's own action row (the notification has one; the label exists), is an ELEMENT and the owner's.

### C-08 — A read that timed out, or that the page itself tripped on, is told "Choose a different file"

- **Severity 2. Class FIX-NOW** (an existing sentence chosen instead). Code-level.
- **Evidence.** `src/main.ts:1589–1598`: the `catch` covers the 120-second deadline (`SELECTION_DEADLINE_MS.inspect`) and any unexpected reply, and shows `failure.unreadable.tookTooLong` ("Reading this file took longer than expected, or the tool had a problem.") with `failure.unreadable.next` ("Choose a different file, or save this one again from the app that made it, as a file whose name ends .mp4."). The code knows the file was not found unreadable; a worker that has died gives the same timeout for every file after it, and the cure there is a reload. `src/ui/failure-text.ts:54–55` gives every unreadable reason the same next step.
- **Heuristic.** Nielsen 9: the next step should fit the cause (the module's own header says so).
- **Fix.** For reason `took-too-long`, return `failure.tryAgain` as the next step ("Try again. If the problem happens again, report it with the Report a problem button, which adds details that will help."). One line in `failure-text.ts`, one expectation in `failure-text.test.ts`. "Try again" with the same file only works once C-02 is fixed.

### C-09 — "The card says “Internal use only” under the logo." follows sentences that call it "the closing graphics", in a page where "the card" is step 3's title card

- **Severity 2. Class WORDS.** Code-level.
- **Evidence.** `src/ui/closing-choice.ts:55–57` appends `closing.result.internal` (`en-GB.ts:353`) to every closing sentence. With Fade or Slide step 4 reads: "The blue closing graphics fade in over your last second of video, covering it as they build. Adds 3 seconds. **The card** says “Internal use only” under the logo." Step 3's strings use "card" for the title card throughout ("A card shown for 5 seconds…", "too long to fit on the card"). The Video type line already has the consistent form: "…and whether **they say** “Internal use only”" (`:114–115`).
- **Heuristic.** Nielsen 4 (one meaning per word).
- **Fix.** Current: "The card says “{words}” under the logo." Proposed: "The closing graphics say “{words}” under the logo." (grade 5.7)

### C-10 — The same choice is "The last second of video" on the control and "the picture" in the record and the fallback notes

- **Severity 3. Class WORDS.** Code-level.
- **Evidence.** Option and step-4 line: "The last second of video", "fade in over your last second of video" (`en-GB.ts:328`, `:372–379`). Record and notes: "the blue closing graphics fading in over the picture" (`:484–489`), "instead of over the picture" (`:539–546`), "fade in over the picture, not over a held last frame as chosen" (`:551–558`). Elsewhere "picture" means the video's image track ("one picture and one audio track", "Its picture stops at", "picture size").
- **Fix.** Use the control's words. e.g. current "the blue closing graphics fading in over the picture" → proposed "the blue closing graphics fading in over the last second of video" (6.8); current "The white closing graphics slide in over the picture, not over a held last frame as chosen." → "The white closing graphics slide in over the last second of video, not over a held last frame as chosen." (8.1). Twelve leaves.

### C-11 — The tab title keeps the last job's outcome after the page has moved on

- **Severity 3. Class FIX-NOW.** Confirmed in Chrome.
- **Evidence.** `setTitle('none')` is called only on a new file (`src/main.ts:1494`) and on Cancel's press (`:3374`). Cancelled a job, then changed End time: status read "Checking this video against your device…", then a fresh "Ready to go" landed; the tab title stayed "Cancelled — UoN Video Finisher" throughout. The same holds for "Not made — …" after a failure.
- **Heuristic.** Nielsen 1 (stale status).
- **Fix.** In `commitTrim` and the output-choice handler, `if (titleOf === 'failed' || titleOf === 'cancelled') setTitle('none')`. "Ready — …" may stay while its result stands. No word.

### C-12 — "Errors captured" cannot be put away, and goes on saying a video "may not finish" after it has

- **Severity 2. Class ELEMENT.** Code-level.
- **Evidence.** `errorsPanel.hidden` is set once, to `false` (`src/main.ts:1101`), and never back. Its intro (`failure.captured`, `en-GB.ts:826`): "Something in the tool went wrong. A video being made may not finish; your original file is not affected. …" stands for the rest of the session, through a job that finished and saved. The only way to clear it is a reload, which discards an unsaved result.
- **Heuristic.** Nielsen 1 and 3; UI-STANDARDS "Do not trap users in modes".
- **Fix.** A dismiss control on the panel (the existing `feedback.close` word "Close" would serve). A new control, so the owner's.

### C-13 — Three vocabularies for one job: create, make, "the job"; and cancel beside stop

- **Severity 3. Class WORDS.** Code-level.
- **Evidence.** The button and status say create ("Create the video", "Creating your video", "The video could not be created."). The locks, the drop refusal and the tab title say make ("Locked while your video is being made.", "A video is being made.", "Not made — …", "so the video was not made"). Twelve strings say "job" ("Locked while the job stops.", "The job is stopping. Please wait before trying again.", "The job stopped reporting progress, so it was stopped.", "Closing the tab ends the job.", "This job needs about {size}…", "The rest of the job still runs."). Pressing **Cancel** shows "Cancelling…" in step 6 and "Locked while the job **stops**." under steps 1 to 5 at the same moment (confirmed in Chrome). Three different checks have near-names: "System check" (footer), "Device check complete." / "Stop the check" / "Check again" (step 6), and the stage "Checking the file".
- **Heuristic.** Nielsen 4; UI-STANDARDS "Do not create synonyms for existing concepts"; "user language, not implementation terms" for "job".
- **Fix.** The owner picks one verb; the smallest set is the three a person meets together. `create.lockedStopping`, current "Locked while the job stops." → proposed "Locked while your video is being cancelled." (a label, 7 words; it also shows while a failed job winds down, where "Locked while the video stops." is the neutral form). `progress.title.failed`, current "Not made — {app}" → "Not created — {app}". `choose.drop.making`, current "A video is being made. Cancel it, or wait for it to finish, before choosing another." → "A video is being created. Cancel it, or wait for it to finish, before choosing another."

### C-14 — Five phrasings of "your original is safe"

- **Severity 3. Class WORDS.** Code-level.
- **Evidence.** "Your original file has not been changed." (`failure.originalUnchanged`) · "your original file is unchanged" (`status.cancelled`) · "Your original file is not changed either way." (`warnings.reassurance`) · "Your original file is not affected." (`preflight.reasons.storageUnknown`, `failure.captured`) · "the original file does not change" (`lede.privacy`) · "this tool never changes your original" (`status.refusedSource`). And the source file itself is "your original", "the file you chose" (`result.endedEarly`), "the file you started with" (`status.refusedSource`), "this recording".
- **Heuristic.** Nielsen 4.
- **Fix.** One form after the fact, "Your original file has not been changed.", and one before, "Your original file will not be changed." e.g. `status.cancelled`, current "Cancelled. Nothing was saved, and your original file is unchanged." → "Cancelled. Nothing was saved, and your original file has not been changed."; `status.refusedSource`, current "That is the file you started with. …" → "That is your original file. Choose a different name or folder, because this tool never changes your original."

### C-15 — Smaller word pairs: sound and audio, opening graphics and title card, resolution and picture size, format for two things

- **Severity 3. Class WORDS.** Code-level.
- **Evidence.** (a) The page settled on "audio" ("No audio.", "Audio format", "Worth knowing about the audio") but `warnings.heavyLimiting.detail` ends "try adjusting how you record the **sound**" and `warnings.wholeTooLittleAudio.detail` says "less than half a second of **sound** … Your original file keeps its **sound**" (the owner's words, VH-213). (b) The second promise says "Adds **opening** and closing graphics." (`lede.promises[1]`, the owner's words, VH-196); the page never says "opening graphics" again, the step is "Title card", and it is optional for a staff video. (c) Video properties says "Resolution"; the feedback dialog says "picture size" (the second is pinned by `test/readability.test.ts:224`; "Duration" is the owner's settled choice, VH-231). (d) "format" is the codec in "Video format" / "Audio format", where the container is "File type", but the container in the "?" help ("saves your video as an MP4, the most interoperable video format") and in "Saves in a reliable format." (e) "your video" is the source in "A card shown … before your video starts" and "Your video cuts to the blue closing card", and the output in "Your video is ready." and "Locked while your video is being made." (f) Trim's intro says "unwanted **material**", the first promise "unwanted **footage**".
- **Fix.** Proposed for (a): "Next time, try changing how you record the audio." and "It has less than half a second of audio, too short to level, so the new video will have no audio. Your original file keeps its audio." (grades 4.9, 5.8). For (b): "Adds a title card and closing graphics." For (c): the row label "Picture size". The rest are the owner's to weigh; (b) and the second of (a) change words he wrote.

### C-16 — The discard question calls "Create the video" "starting again", and a previous video "the video you just made"

- **Severity 3. Class WORDS.** Seen in Chrome (the question's words).
- **Evidence.** The button pressed is "Create the video" or "Create the video again". The question that follows (`discard.unsaved`, `en-GB.ts:450`; `create.discard`, `:415`): "You have not saved the video you just made. **Starting again** will discard it." with the button "Discard it and **start again**". When another file has been chosen since, the unsaved result's card is titled "Previous video", it is not being started again, and it may not be "just made".
- **Heuristic.** Nielsen 4: a button's label matches what the next state calls the action.
- **Fix.** Current "You have not saved the video you just made. Starting again will discard it." → "You have not saved the video you just made. Creating another video will discard it." (3.9). Current "Your download may still be finishing. Starting again will discard the video you just made." → "Your download may still be finishing. Creating another video will discard the video you just made." (6.0). Button, current "Discard it and start again" → "Discard it and create the video".

### C-17 — Step 3 says the date is filled in twice

- **Severity 3. Class WORDS** (a sentence removed). Code-level.
- **Evidence.** Under the ticked box (`titleCard.fieldsRule`, `fieldsRuleNext`, `en-GB.ts:273–274`): "Type a title, department, or authors to make a card. **The date is filled in for you.**" Under the Date field, four fields lower (`dateHelper`, `:268`): "**Filled with today’s date** in the video language. You can change it or clear it."
- **Heuristic.** Nielsen 8; UI-STANDARDS "helper text only when it prevents error, clarifies format, or explains consequence".
- **Fix.** Drop `fieldsRuleNext` from the line (`src/main.ts:2809`, `src/ui/title-card-step.ts:125`); the Date field's helper says it where it is needed.

### C-18 — "is 8 digits. Type up to 8," reads as up to 8 digits

- **Severity 3. Class WORDS.** Code-level.
- **Evidence.** `titleCard.submission.idsHelper` and `idsHelperNext` (`en-GB.ts:294–296`) with `STUDENT_ID_DIGITS = 8` and `STUDENT_IDS_MAX = 8` (`src/config/cards.ts:175`, `:189`): "Each student ID (identity) number is 8 digits. Type up to 8, with spaces, commas, or new lines between them. Do not add names."
- **Fix.** Current "Type up to {max}, with spaces, commas, or new lines between them. Do not add names." → "Type up to {max} numbers, with spaces, commas, or new lines between them. Do not add names." (1.5)

### C-19 — "None of these stop you continuing" under one warning

- **Severity 3. Class WORDS.** Code-level.
- **Evidence.** `src/ui/warning-text.ts:146` appends `warnings.reassurance` (`en-GB.ts:664`) whatever the count; the verdict's heading beside it does count ("Ready, with one thing to know"). With one warning, as on `talk-30s.mp4` ("This recording is very quiet"), the box reads one item and then "None of these…".
- **Fix.** A counted pair. `one`, proposed: "This does not stop you continuing. Your original file is not changed either way." (4.8); `other`: as now.

### C-20 — Control names are quoted in some sentences and bare in others, with three verbs

- **Severity 3. Class WORDS.** Code-level.
- **Evidence.** Quoted, with "choose": "choose “Copy message and details”" (`feedback.tooLong`, `opened`). Bare, with "press": "Press Check again", "then press Check again". Bare, with "use": "Use the Report a problem button", "Use Report this problem in Errors captured". Bare, with "untick": "untick Add a title card". Bare, with "try": "Try the other option under File size / quality". And one dialog has two names for its opener: "Report a problem" in the footer, "Report this problem" in Errors captured.
- **Fix.** One pattern: press for buttons, the name unquoted (the majority form). e.g. `feedback.tooLong`, current "…Choose “Copy message and details” and paste them into an email to {address}." → "…Press Copy message and details and paste them into an email to {address}."

### C-21 — Strings and code no route shows

- **Severity 3. Class FIX-NOW** (for the code lines; the table's keys are "settled" with the translators' sheet, so I would leave the keys). Code-level; the second confirmed in Chrome.
- `trim.unreadable` (`en-GB.ts:233`, "There is no video to trim, because that file could not be read."): written by `renderTrim` (`src/main.ts:1919`) only when `clearTrim('unreadable')` has, in the same call, taken step 2 off the page (`:1865`, `:1877`). Never visible, never read.
- `progress.ready` ("Ready"): written at `src/main.ts:3224–3225` and hidden by `hideProgress` in the same promise chain (`:3302`). Read after a finished job: `#process-progress-text` holds "Ready" with `hidden` set. The comment "100% is said here" is not true of the screen.
- `failure.unreadable.what` and `failure.badTrim.what` (`:767`, `:780`): defaults in `src/ui/failure-text.ts:41`, `:64`; every sender gives a reason (`job.worker.ts:448`; `UnreadableFileError` and `KeptRangeError` always carry one).
- `preflight.reasons.longJobUnknown` (wish VH-222.1) and, by the same reasoning, `veryLongJobUnknown`: `probe.ts:251–275` returns a finite estimate or `null`, and `null` goes to `estimate-unavailable`. Both are read by a Node test (`src/ui/preflight-panel.test.ts:177–178`).
- `status.saveFailedWhat` / `saveFailedNext`: see C-04.
- Unused exports: `formatApproximateDuration` (`src/ui/format.ts:79`), `closingTypeLabel` (`src/ui/closing-choice.ts:27`), `joinNouns` (`src/ui/source-panel.ts:276`).

### C-22 — A throw while the outcome is being shown is reported as a failed job, and locks the page for ten seconds on a job that has already answered

- **Severity 3. Class FIX-NOW.** Code-level, not reproduced (needs a throw inside the `then`).
- **Evidence.** `src/main.ts:3258–3296`: the comment says "anything else reaching here threw while the outcome was being shown, and is not the job going quiet", yet the path shows `failure.unknown` ("Something went wrong while creating the video."), writes "The job is stopping. Please wait before trying again." and awaits `settled(id)`. The worker has already replied, so `abandoned` is never called for that id and the wait always runs the full `WORKER_ACKNOWLEDGEMENT_LIMIT_MS` (10 s). If the reply was `processed`, the finished file stays retained in the worker with no card to save it from.
- **Fix.** Await `settled(id)`, and say "The job is stopping", only for `WorkerSilenceError`. Specific words for the other case would be new (the owner's).

### C-23 — A finished file that fails its loudness or peak check is told "Try again", which repeats the same job

- **Severity 3. Class WORDS** (a choice between two existing sentences, the owner's). Code-level.
- **Evidence.** `src/ui/failure-text.ts:69–72` gives `output-loudness` and `output-peak` the next step `failure.tryAgain`. The plan and the limiter are deterministic for one file and one set of choices, so a second run of an encode that may take many minutes ends the same way. The sibling failure `unlevellable` (`:67`) already says only "Use the Report a problem button, which adds details that will help."
- **Fix.** Give the two the `unlevellable` next step, or new words that offer the other output first, as `encoderRefused.next` does ("Try the other option under File size / quality. …").

---

## What I checked and found fine

- Every leaf of the table has a reader in `src/` or `index.html`; none is orphaned outright (the dead ones in C-21 have readers that no route reaches).
- Sentence case throughout; labels and headings carry no full stop and sentences do; no label ends in a colon (`feedback.onlyInCopy` is a lead-in over a list, not a label).
- Every step number named in a message matches its heading ("step 1", "step 2", "step 3"); "Check again", "Add a title card" and "File size / quality" are quoted as their controls read.
- Each async step has a visible or spoken status with a stop: start-up ("Checking whether this browser can run the tool…"), reading (another file may be chosen), the device check (Stop the check, Check again), the job (Cancel, "Cancelling…"), the save ("Saving…", Stop saving, "Stopping the save…"), copy in the feedback dialog.
- Stale-answer guards: `selectionEpoch` drops a late inspection or verdict; `withdrawVerdict` and `withdrawDiscardQuestion` are called on every change that invalidates them; `clearResult` clears the save's line with its card.
- Progress announcements: stage changes and three milestones only, switchable off; a language change quietens every live region for two frames.
- Title card and Submission errors use `paintLine`, so a field held at its limit is not re-announced on each key.
- Failure texts each give what, the one reassurance and a next step; apart from C-05, C-07, C-08 and C-23 the next step fits the cause.
- The start-up block names the remedy by browser; the blocked chooser is disabled and says why.

## What I could not check

- What a screen reader says for any of this (C-06's rewrites, the announcer's stale text): a person's.
- The native file and save dialogs (the trigger of C-01 and C-02; C-04's failing write).
- The storage block and out-of-space states (C-05), a read timeout (C-08), a non-silence throw (C-22): no fixture raises them.
- Chinese and Malay: not read, by the brief. Every WORDS finding here would need its two drafts.

---

## Part 2 — triage of `project/wish-list.md` (69 open lines)

Verdicts: **AGENT-NOW** 7 · **OWNER-WORDS** 16 · **PERSON** 24 · **TOOLING** 22 · **STALE** 0. Nothing on the list has been done since it was written; I checked each code-checkable line against `bd4632a3`.

A caution on four of the AGENT-NOW lines: Phase 8's close (`project/decisions.md:83`) lists VH-233.1, VH-235.1 and VH-236.1 (and VH-209.1) among the lines "kept" for the owner, and I found no later answer from him. None needs a word or a design choice, which is why I call them agent-doable, but whether tonight's word covers a kept line is the orchestrator's call.

### The seven AGENT-NOW lines, with the change

| Wish | Change | Files | Test | Risk |
| --- | --- | --- | --- | --- |
| **VH-233.1** focus ring below the viewport's edge | Yes, a scroll inset on the existing token fixes it. One rule: `html { scroll-padding-block: var(--focus-room); }` (`--focus-room` is the ring's width plus its offset, 4 px, `tokens.carbon.css:101`). Chrome honours `scroll-padding` on the root for the scroll that focus causes, so the box stops 4 px short of the edge and the ring is in view. Preferred over `scroll-margin` on `:focus-visible`, which depends on the style being resolved before the scroll. It also moves a `#accessibility-statement` fragment jump by 4 px, harmlessly. It does not help the segmented switches, whose focused element is the hidden radio, not the face that draws the ring: not in the wish, and worth one reading. | `src/styles/app.css` (beside the `html` rule, `:15`) | `test/stylesheet.test.ts` passes a token length; add an assertion that the rule exists. In Chrome: Tab to the statement's second link at zh-Hans 320 px and ms-MY 1280 px with a 32 px font, read `rect.bottom + 2 <= innerHeight`. | Low. Scroll positions after Tab move by up to 4 px, so walker records that compare `scrollY` move too. |
| **VH-236.1** stale "You can still set the times." | Both cases, with words removed only. Give `createPreviewRefusal` one more method, `fileChanged()`: if the node it last wrote is still the announcer's only child, empty the announcer. Call it in the `change` handler beside `clearTrim('reading')` (`src/main.ts:1512`). That clears an earlier file's refusal at every new selection (case 2) and so also before a later read failure (case 1), and never touches "A problem was found…", which is a different node. Emptying a polite region is not an addition, and the page already does it twice (`:318` on a language change; `unsayDiscardQuestion`, `:888`). The wish's narrower remedy for case 1 (delete the second sentence at `clearTrim('unreadable')`) cannot use `trimWithdrawn()` as written: its `refused()` guard reads `#trim-preview-note`, which the new selection has already hidden. | `src/ui/preview-refusal.ts`, `src/main.ts`, `src/ui/preview-refusal.test.ts` | Stand-in tests as the module has; in Chrome, S-32's route then `notvideo.mp4`, read `#page-announcer`. | Low. What a screen reader says of an emptied region is a person's, as for the two precedents. |
| **VH-147.1** placeholder check walks worktrees | In `walk()`, skip the directory whose path relative to the root is `.claude/worktrees` (not all of `.claude`, whose settings files should stay in the key scan). Still true today: `SKIP_DIRS` (`scripts/check-placeholders.mjs:21`) has neither. Useful tonight if any writer works in a worktree inside the checkout. Note the same hole elsewhere: `eslint.config.js:9` and Vitest's default excludes do not skip `.claude/worktrees` either, so the gate would lint and run a worktree's copy too. | `scripts/check-placeholders.mjs` (and, if wanted, `eslint.config.js`, `vite.config.ts`) | Make an empty-file worktree folder holding a marker, run `npm run check:placeholders`, remove it. | Low. Gate tooling only. |
| **VH-162.1** DEV-INFRASTRUCTURE's hosting lines | Still true: `DEV-INFRASTRUCTURE.md:414–417` ("the intended home is still an internal server, and **D5 remains open**") and `:479` ("The intended home is a UoN-hosted app on xerte…"). Rewrite both to what the brief (`project/brief.md:86–88`, D5 row `:178`) and the profile (`:26`) say: Xerte is the public home, a flat upload by the owner from each release; GitHub Pages is the unadvertised preview from `main`. The file is not a protected path. | `DEV-INFRASTRUCTURE.md` | `npm run docs:lint`, `docs:links`, `node tools/check.mjs` for its 4,600-word budget. | Low. |
| **VH-193.2** two absent audio-plan tests | Still absent (`grep limiterBiteLu src/**/*.test.ts`: only the finite case, `sub-block-sound.test.ts:254–270`). Turn the kept probe into tests: `reviews/2026-10-25/design-pass-3/evidence/measurements/vh193-2-bite-probe-2026-10-25.ts.txt` drives the real `planAudio` and passed 6 of 6. Cases: a null bite on digital silence; the solver's stop on a non-finite limited pass (`gain-solve.ts:118`); the bite measured under a ceiling lowered by an encoder config (`audio-plan.ts:441–448`). | `src/media/sub-block-sound.test.ts` or a new test beside it; no product file | The tests themselves; the gate on a settled machine (these are DSP tests). | Low for the product (test only). The probe wraps `AudioChain`; keep that out of the product path. |
| **VH-215.3** a regression through the worker for the release guard | Still absent: `cardTellsMade` is tested as a predicate only (`src/media/ends-early.test.ts:411–421`) and nothing imports `job.worker.ts` in a test. A Vitest file that stubs `self` (`addEventListener`, `postMessage`) and `vi.mock`s `../media/inspect`, `../media/pipeline` (`runPipeline` resolving with a `madeSeconds` that prints other than the card's `runningTime`), `../media/opfs` and `../media/title-card-frame`, sends one `process` message with a Submission card, and expects: one `failed` reply with code `unknown`, no `processed`, the workspace's `dispose` called, and a later `discard` finding nothing retained. | `src/workers/job.worker.test.ts` (new); no product file | Itself. | Low for the product; moderate effort, since it is the first test to boot the worker module and its mocks must not leak (the module registers listeners at import). |
| **VH-235.1** the worker's other `/ 1000` | Still there: `src/workers/job.worker.ts:577`. Add `MILLISECONDS_PER_SECOND = 1000` beside `MADE_LENGTH_LOG_ROUNDING_SCALE` (`src/config/thresholds.ts:107`) and use it. Honest size of it: the same unit conversion stands as a literal in about twenty other places (`src/media/probe.ts:104`, `:113`; `src/ui/progress.ts:68`; `src/audio/limiter.ts:105–106`; `src/media/pipeline.ts:347–348`, `:854–857`; `job.worker.ts:345–346` rounds by `100`), and no test enforces the rule. | `src/config/thresholds.ts`, `src/workers/job.worker.ts` | `typecheck`; the worker has no test of its own. | Nil in behaviour. Low value; the wish itself says "for the next change to the worker", so do it as a rider on VH-215.3 or not at all. |

### Every open line

| # | Wish | Gist | Verdict | Note |
| --- | --- | --- | --- | --- |
| 1 | INTAKE.2 | Listen to the Teams recording's output: 8 LU of limiting | PERSON | A listening judgement. |
| 2 | INTAKE.8 | Retire the canon copies under `pm_skills/` and `check:memory` | OWNER-WORDS | "On the owner's word". Recommend yes after the release; `pm_skills/project` stays. Still present, still in the gate (`package.json:29`). |
| 3 | V3-HARNESS.1 | Clear `npm audit`'s dev-only findings | OWNER-WORDS | Dependencies change only by decision. Recommend the nine fixable without a major bump, as one decision. |
| 4 | VH-105.1 | Language switcher in forced colours, screen readers, zoom; English flash before a remembered language | PERSON | By construction a flash is possible: `index.html` is English and `main.ts` is a deferred module that sets the language when it runs (`src/main.ts:255–260`). A person sees whether it shows. |
| 5 | VH-105.2 | Apply the campus colleagues' corrections through the sheet | PERSON | Waits on native readers. |
| 6 | VH-127.1 | Title card heard with a screen reader; a made card watched | PERSON | |
| 7 | VH-128.1 | Submission card heard and watched | PERSON | |
| 8 | VH-122.1 | Damage warning heard; CULT2011 listened to at two times | PERSON | Uses `samples/`. |
| 9 | VH-135.1 | "Saving…" and "Saved." heard; switchers in Windows high contrast | PERSON | |
| 10 | VH-116.1 | `project/structure.md` is stale | TOOLING | Still true: no `src/i18n/` row, `reviews/` stops at 2026-10-01. Agent-doable (run `node tools/structure.mjs`, write the missing roles), record only. |
| 11 | VH-136.1 | Time-left line heard; watched through a half-hour encode | PERSON | |
| 12 | VH-138.4 | The 20 October audit's remaining person checks | PERSON | |
| 13 | VH-143.4 | Malay and Chinese form questions | PERSON | Native readers. |
| 14 | VH-139.2 | "The file ends early" heard | PERSON | |
| 15 | VH-139.3 | Run the real corpus through pre-flight and one encode each | PERSON | The owner's checkout and `samples/`. |
| 16 | VH-148.2 | No-sound read outcome heard; real Windows contrast theme; Teams link | PERSON | |
| 17 | VH-147.1 | Placeholder check walks `.claude/worktrees/` | **AGENT-NOW** | See above. |
| 18 | V31-UPGRADE.1 | The profile's Gate line says "the v3 checker" | OWNER-WORDS | The profile is his to sign. Recommend "then the pm-next checker". Still as written (`project/profile.md:25`). |
| 19 | VH-150.2 | NVDA and VoiceOver on VH-150's announcements | PERSON | |
| 20 | VH-153.1 | The native save dialog's file kind in Chinese and Malay | PERSON | |
| 21 | VH-172.1 | Four readings unresolved at device scale 3 | TOOLING | Accepted and deferred by the owner at Phase 8's close. |
| 22 | VH-173.1 | A walked state that draws the code role and a fact note | TOOLING | Likewise. |
| 23 | VH-175.4 | Shorter Chinese and Malay wording above step 1 | PERSON | The owner's "wait for the campus colleagues, no layout change". |
| 24 | VH-181.1 | 结束卡 or 结束卡片; 结束 or 结尾 | PERSON | Native reader. |
| 25 | VH-162.1 | DEV-INFRASTRUCTURE's stale hosting lines | **AGENT-NOW** | See above. |
| 26 | VH-196.1 | A Colours setting (Automatic, Light, Dark) in the header | OWNER-WORDS | A new control; he has given its English words and placement but has not promoted it. Not small: the dark roles sit inside `@media (prefers-color-scheme: dark)` (`tokens.brand.css:161`), so it needs a second selector, a pre-paint script, a fourth contrast context, two drafts and a walk. Recommend: promote to the backlog after the release. |
| 27 | VH-192.1 | The statement's media limitation names only the preview | OWNER-WORDS | Still true (`en-GB.ts:924`). Recommend: "The preview and the finished video’s player play your own video. Its captions, audio description and other alternatives, and whether it flashes, depend on your recording. The title card and closing graphics the tool adds have no sound, and you choose their words on the page." (grade 7.3) |
| 28 | VH-193.1 | Native readers check "flat or squashed" drafts | PERSON | |
| 29 | VH-193.2 | Two absent audio-plan tests | **AGENT-NOW** | See above. |
| 30 | VH-194.1 | Spec §9.3 misdescribes what `test/readability.test.ts` holds | OWNER-WORDS | `docs/` is protected. Recommend: "`test/readability.test.ts` holds the short forms left unexpanded; the other exceptions are recorded here." |
| 31 | VH-194.2 | The statement says "On the Chinese and Malay pages" of the Choose File button | OWNER-WORDS | Still true (`en-GB.ts:926`). Recommend: "The Choose File button belongs to your browser. If the page is in a different language from your browser, the button’s words stay in your browser’s language. To use it by voice, say the step’s name, “Choose a video”." (4.9) |
| 32 | VH-213.1 | A silent job whose file also ends early is told only "ends early" | OWNER-WORDS | He chose the line, not a repair. Still so (`src/audio/warnings.ts:115`). Recommend: say the too-little-audio warning as well as "The file ends early" in that case; both sets of words exist. |
| 33 | VH-215.1 | Specific words for the Submission card's release guard | OWNER-WORDS | Still `failure.unknown` (`job.worker.ts:252`, `:289`). Recommend: "The title card would not show the right running time, so the video was not made." and, before the draw, "The running time for the title card could not be worked out, so the video was not made." (4.7, 5.2), each with the existing "Try again. …". |
| 34 | VH-215.3 | A regression through the worker for the release guard | **AGENT-NOW** | See above. |
| 35 | VH-216.2 | Four walker cells not reached at 375 px and 32 px | TOOLING | |
| 36 | VH-216.3 | What a heading reader takes the Video type switch to belong to | PERSON | A heading would be a new element and new words. |
| 37 | PLAN-8.1 | The profile's 200k Session line against his 350k | OWNER-WORDS | His to settle. Still 200k (`project/profile.md:20`). |
| 38 | VH-217.4 | 108 of 120 walker cells refused at 375 px and 32 px | TOOLING | |
| 39 | VH-229.4 | A screen reader on the title's "?" | PERSON | |
| 40 | VH-209.1 | The chooser's ring clipped at 320 px and a 32 px font | OWNER-WORDS | "A fix item or kept" is his. Recommend a fix item, as a trial. The cause as read: the browser's button (238 px) is wider than the input (196 px) and Chrome clips a file input to its own box, which `app.css:581–594` already pads by `--focus-room`. A CSS-only attempt: on `.file-input::file-selector-button`, `max-width: 100%` and `white-space: normal`, so "Choose File" wraps to two lines inside the box and the ring fits. Whether Chrome lets that button wrap is not something the code settles; it needs S-113 walked at 320 px and 32 px, and a look at ordinary sizes, where nothing should move. It is the page's primary control, so not for an unattended change without that walk. |
| 41 | VH-209.2 | Past a 32 px font at 320 px the page does not all hold | OWNER-WORDS | Beyond 200%, so beyond 1.4.4's measure. Recommend: keep, and say so in the statement's review (VH-137). |
| 42 | VH-230.1 | The acceptance page's marks break in their column | TOOLING | A development page, never in the release build. |
| 43 | VH-219.2 | The walker treats only the literal `spacing` mode as spacing | TOOLING | |
| 44 | VH-219.3 | Step 4's selects opened at a 32 px font | PERSON | Beside the phone walk (VH-113). |
| 45 | VH-219.4 | A note for drivers that copy the closing variants | TOOLING | |
| 46 | VH-210.2 | Walker's statement-link check fails in forced cells at 1280 px | TOOLING | Its cause is untraced; a trace might turn up a real forced-colours fault, so it is worth one reading when the walker is next run. |
| 47 | VH-210.3 | The ring probe's `changedAny` moves 1–2 px run to run | TOOLING | |
| 48 | VH-210.4 | `table-1page.mjs` leaves S-ID1's records out | TOOLING | |
| 49 | VH-225.2 | J1 fails "page hidden" in the side-session's headless Chrome | TOOLING | |
| 50 | VH-225.3 | The old preview address returns 404 | OWNER-WORDS | His decision. Recommend: leave it, unless the address was given to staff. |
| 51 | VH-225.4 | `project/rules.md`'s heading still says "UoN Video Helper" | OWNER-WORDS | Protected, his edit. Still so (`project/rules.md:1`). Recommend "Rules — UoN Video Finisher". |
| 52 | VH-225.5 | Tell the team the report's subject line changed | OWNER-WORDS | His message to send. |
| 53 | VH-225.7 | The house-conventions digest's front matter keeps the old name | OWNER-WORDS | Still so (`project/digests/house-conventions.md:2`). Recommend: leave; it names the standard as frozen. |
| 54 | VH-231.1 | Native readers check "Keeping {kept}." drafts | PERSON | |
| 55 | VH-223.1 | S-24's 15 batch A keys not reached on this Mac | TOOLING | |
| 56 | VH-223.2 | A person reads the trim thumbs' and track's contrast | PERSON | |
| 57 | VH-221.1 | VH-221's status rows heard | PERSON | |
| 58 | VH-224.1 | S-24's 13 batch B keys not reached | TOOLING | |
| 59 | VH-222.1 | `preflight.reasons.longJobUnknown` unreachable | TOOLING | Still true, and I agree with the reading: a long job's estimate is finite, and `null` goes to `estimate-unavailable` (`src/media/preflight.ts:123–128`). It is read in Node (`preflight-panel.test.ts:177`); only the walker cannot reach it. Recommend keep: it is a harmless fallback, and retiring it deletes a settled key from three tables and the sheet for no gain a user sees. `veryLongJobUnknown` is in the same position. |
| 60 | VH-203.2 | `table-1page.mjs` reads only `S-<number>` records | TOOLING | |
| 61 | VH-235.1 | The worker's other `/ 1000` | **AGENT-NOW** | See above; low value. |
| 62 | VH-233.1 | Focus ring below the viewport's edge on Tab | **AGENT-NOW** | See above. |
| 63 | VH-236.1 | Refused-preview words outlast what is true | **AGENT-NOW** | See above. |
| 64 | VH-195.1 | One `sources.txt` line's sha1 differs in a remade table | TOOLING | |
| 65 | VH-195.2 | 49 conditions lack a record after VH-236 | TOOLING | Re-walk them after VH-236.1 if it is done tonight, not before. |
| 66 | VH-195.3 | Deferred re-reads after VH-237 | TOOLING | |
| 67 | VH-195.4 | Deferred re-reads after VH-235 | TOOLING | |
| 68 | VH-195.5 | T-46.3's ready-during-save branch not shown on this Mac | TOOLING | |
| 69 | REFRESH-501.1 | pm-skills 5.0.1's checker fails on a quoted `{word}` | TOOLING | Upstream's; mended here by code marks. |

### The backlog's five

| Item | What it would take | Risk | Tonight, unattended? |
| --- | --- | --- | --- |
| **VH-82** `inspectFile` three times per job | Carry the first inspection's report to pre-flight and the job (a protocol field), or cache it in the worker by name, size and modified time; a `File` crosses `postMessage` as a new object each time, so identity will not key it. Since VH-231 a Matroska or WebM file also has its 4–32 MiB tail read three times. | A stale report for a file that changed between steps (the second and third reads are what notice today); data crossing the worker boundary trusted where it is now re-derived. | No. The canon line measured ~130 ms a job and set a trigger ("if inspect ever appears in a profile") that has not fired. No user sees it. |
| **VH-161** offline after first load | A service worker, or proof that Chrome's HTTP cache does it, under a relative base on a flat Xerte upload with no special headers; a cache that a new build replaces. The item's own next step is to find out whether a service worker can be scoped under Xerte's play path. | High: a wrong cache holds every user on an old build, and it cannot be checked without the Xerte upload, which is the owner's. | No. The item says after the release, and its check needs Xerte. |
| **VH-97** fold the finished stages | A redesign of the page: one step open at a time, each finished one folding to a line. New elements, new words, focus rules, and it reverses VH-91's recorded choice that steps stay open (`index.html:103–112`). | High, and across everything three design passes measured. | No. Signed off as not built; revisit only after staff are watched (VH-M4). The owner's design call. |
| **VH-119** skip true peak in planning passes B and B′ | Reshape `traverse` in `src/media/audio-plan.ts` so those passes skip the detector (9% of planning), then prove warnings, gain and output do not move "on the real corpus". | Medium: beside the protected meter files, and the proof needs `samples/`, which is the owner's. | No. Its trigger is a complaint about planning time, and the proof cannot be made without the corpus. |
| **VH-27** EBU Tech 3341 cases 7 and 8 | Fetch the EBU's programme segments and the signal files for cases 20–23, keep them as gitignored fixtures, extend the harness in `test/ebu3341/`. | Low in code; but it is a download from outside (an ask-first action, and the files' licence is unread), and `test/ebu3341/` is "never weakened". | No. An agent should not fetch them unasked. |

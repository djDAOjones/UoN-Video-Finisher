# The overnight run of 25 November 2026: what was done, and what waits on you

For Joe. Written by the orchestrator (Claude Code, on the MacBook Pro) at the end of the run you started with these words: "act as an orchestrator, and try to develop this project as much as you can according to rpoject intentions and backlog, but without my input (I am going to sleep). do loops of UX analysis to try and hone things."

## Since this sheet was written

- **0.3.1 is cut**, on your word of 25 November, "Cut 0.3.1" (VH-245): tag `v0.3.1`, the page of 0.3.0 with the fixes below, and none of the 33 points. Its Xerte zip is in `release/`, named `uon-video-finisher-v0.3.1+…-site.zip`. That answers point 2 of "Before you upload anything"; points 1 and 3 stand.

## In one minute

- **Release 0.3.0 is cut.** Tag `v0.3.0`, and the Xerte zip is `release/uon-video-finisher-v0.3.0+20261125.bd4632a3-site.zip` (33 files). It is the page Phase 8 closed on, cut before anything else was touched tonight.
- **Three rounds of UX analysis ran**, six analysts in all, on synthetic test videos (never the samples): 79 findings across six reports (54 in the first round, 20 in the second, 5 in the third, which re-walked the second round's fixes). Two of them could make a video other than the one the page describes: a file picked again whose new trim was ignored, and controls restored out of step after the browser's Back button. Both are mended.
- **Phase 9 mended what needed no new word**: about thirty findings, in seven items, all on `main` and on the preview, each read in Chrome here and gated green. No word, sentence or control changed in any language.
- **33 points wait on you** below, each with a recommendation. They need a new word, a new control or a changed default, and those are yours.
- **Nothing tonight had the Mac Pro's walk or a Codex check.** Fresh Claude sub-agents reviewed the fixes twice and a third analysis re-walked the second batch: no bug found in either review, every fix confirmed by the re-walks, and the small points they raised mended or listed.

## Before you upload anything

1. **The statement's review date has passed.** The page says "We will review it again by 18 November 2026." I did not move it: a date moves when you have reviewed (VH-137). The statement is otherwise true of 0.3.0. Review it first and I cut again, or upload as it is: your call.
2. **Which page goes to Xerte.** 0.3.0 is the walked page. `main` (the preview, `https://djdaojones.github.io/UoN-Video-Finisher/`) is 0.3.0 plus tonight's fixes, read in Chrome on this Mac only. I did not cut 0.3.1: what goes public is yours to choose. Say "cut 0.3.1" and it is five minutes (VH-245). My recommendation: look at the preview, answer section A below, then cut 0.3.1 with the fixes and upload that.
3. **One 30-second check only you can do** (wish VH-238.1): in Chrome, choose a video, then open the chooser and pick the same file again: the page should read it again. Then open the chooser and press Cancel: nothing should happen. The fix rests on how Chrome reports those two, which no tool here can drive.

## What was mended

Each line is an item in the ledger with its evidence in `reviews/2026-11-25/phase-9/`.

| Item | What changes for a person | How it was read |
| --- | --- | --- |
| VH-238 | Picking the same file again reads it again. Before, by the analyst's simulation, a trim made after a re-pick was ignored and Create made the whole video while step 2 said "Keeping 10 seconds". A read that timed out says "Try again", not "choose a different file". | Simulated in Chrome; rule tested; the native chooser is the check above. |
| VH-241 | The skip link can be seen on the blue band in light (it was blue on blue, 1.00:1). A control reached by Tab at the window's edge shows its whole focus ring. Under reduced motion the "working" bar is a still band, not an empty track. A field's error line is bolder, so it can be told from the helper in dark. The trim's Set buttons wrap inside their panel. The footer's two help links no longer run together. The Report a problem dialog opens its details downward, and shows two of its buttons at 320 px. The student IDs box grows as IDs are typed. | Measured before and after at 1280, 375 and 320 px, three languages, light and dark. |
| VH-239 | A refused drop's message goes when the job that refused it ends. The tab's title stops saying "Cancelled" at the next check. A refused preview's announcement goes with its file. An unchanged trim error is not written again on every arrow key (6 and 3 writes to 0 and 0). | Read in Chrome with a mutation observer; 26 tests. |
| VH-240 | Step 6 no longer collapses and springs back at every trim or output change (605 → 183 → 605 px, and a 422 px bounce of the page, both gone). | Sampled through a re-check at 1280 and 375 px, three languages. |
| VH-242 | Nothing on the page: DEV-INFRASTRUCTURE.md names Xerte the public home; the placeholder check skips a worktree; NEXT_STEPS.md is current. | Gate. |
| VH-244 | Nothing on the page: eleven regression tests the wish list asked for (the heavy-limiting figure's paths; the submission card's release guard through the worker). | Gate: 1,854 tests. |
| VH-243 | After the browser's Back or Forward button the page's switches no longer show one choice while the page uses another (before, a card was made in Chinese while "English" showed selected). The trim's time fields take full-width digits and colon from a Chinese keyboard. On a phone, pressing Create no longer leaves the progress bar above the window. The student IDs box's error sits straight under the box, and the box stops growing at 14rem. The page no longer scrolls behind the Report a problem dialog. Step 3's running-time line and a finished video's card no longer jump during a re-check. The skip link lands at the top of the page again. The Cancel button stays in the window as a job's progress arrives, and the tab's title stops saying "Cancelled" whenever the status line does. | Each finding reproduced, then read gone, at 1280 and 375 px; 1,924 tests. |

### Looks to glance at on the preview

These are mine to flag, yours to keep or undo; each is one line of CSS.

- The Report a problem dialog now sits near the top of a wide window, not centred, so that it grows downward when its details open.
- Field error lines are semibold.
- Two Malay error sentences take a third line at 320 px at that weight.

## What waits on you: 33 points

Each point below was found by the analysis and left alone, because the fix needs a new word, a new control or a changed default, and those are yours. Answer with the number and "yes", "no" or your own words. Where I recommend "yes", the English is ready; the Chinese and Malay would be machine drafts for the campus colleagues, as before. The letter and number in brackets is the finding in the analysts' reports.

### A. Things that can mislead (I would do these first)

1. **A changed choice after a finished video (A-03).** When a video is finished, steps 2 to 5 stay open. Someone who spots a typo on the title card, fixes it and presses Save gets the old video, and nothing says so. Only Video type says "Changes … apply to the next video you make." Proposed, one line in step 6 once a choice has changed: "Your changes are for the next video. This one stays as it was made." Recommended: yes.
2. **A save that fails where the person chose (C-04).** If the chosen folder is full or locked, the page quietly saves to Downloads instead and never says the first place failed; an empty file with the chosen name can be left behind. Proposed, for that case only: "The video could not be saved where you chose. The browser is saving it to your downloads folder instead, and may still be finishing it. …" and the empty file removed. Recommended: yes. Not built tonight because Save opens the browser's own dialog, which I cannot drive to test it.
3. **"Choose the smaller file" when it is already chosen (C-05).** Three out-of-space messages offer the smaller file as the way out even when it is the one selected. Proposed: a second form of each without that clause, for example "Keep less of the video, or free some space, then press Check again." Recommended: yes.
4. **A student submission starts on "High quality, for publishing" (A-05).** The other option is the one named "for assignments". Proposed: when Video type moves to Student submission and step 5 has not been touched, select "Smaller file"; moving back restores "High quality". No new words, but it changes a default the specification describes. Recommended: yes.

5. **A reload loses the Submission card's four fields, unwarned (E-05).** They are the longest typing in the journey, and a student on a phone leaves the tab to look a number up. Two ways, neither needing a word: warn before leaving while a card field holds text (the page already warns for an unsaved video), or keep the fields until the tab closes, which would store student ID numbers in the browser. Recommended: the warning.
6. **A finished video with no audio does not say so (E-12).** Step 6 says "This video has no audio" before Create; the finished card, the thing a student reads before handing in, says nothing. Proposed: carry that existing title into the card's warnings. Recommended: yes.

### B. One word for one thing

1. **"The card says “Internal use only”" (C-09).** In step 4 "the card" follows sentences about "the closing graphics", and on this page "card" is the title card. Proposed: "The closing graphics say “{words}” under the logo." Recommended: yes.
2. **"Adds opening and closing graphics." (A-16, C-15).** Your second promise. The page never says "opening graphics" again; the step is "Title card". Proposed: "Adds a title card and closing graphics." Recommended: yes, but they are your words.
3. **"None of these stop you continuing." under a single note (A-17, C-19).** Proposed, when there is one note: "This does not stop you continuing. Your original file is not changed either way." Recommended: yes.
4. **Where the Report a problem button is (C-07).** Five failure messages say "use the Report a problem button" and do not say it is at the foot of the page, a long scroll away. Proposed: "… use the Report a problem button at the foot of the page. It adds details that will help." Recommended: yes.
5. **"Type up to 8" reads as up to 8 digits (C-18).** Proposed: "Type up to 8 numbers, with spaces, commas, or new lines between them." Recommended: yes.
6. **The date is said twice in step 3 (C-17).** "The date is filled in for you." under the tick box, and "Filled with today's date…" under the Date field. Proposed: drop the first. Recommended: yes.
7. **"until you start another video" (A-21).** After a second file is chosen, the card still says the finished video stays "until you start another video"; a novice feels they just did. Proposed: "until you make another video". Recommended: yes.
8. **A failed loudness check told "Try again" (C-23).** The same file and choices will fail the same way. Proposed: give it the sentence the sibling failure has, "Use the Report a problem button, which adds details that will help." Recommended: yes.
9. **"Try again." after a read that timed out (D-08).** Since tonight a timed-out read says "Try again", which is truer than "Choose a different file", but there is no button: the way is to choose the file again. Proposed: "Choose the file again. If the problem happens again, report it with the Report a problem button, which adds details that will help." Recommended: yes.
10. **Nothing at the Video type switch says what a submission asks for (E-07).** The four fields appear 1.3 phone screens lower. Proposed, under the switch: "Adds a card with your module, assignment, tutor, and student ID numbers. If the video has closing graphics, they say “{words}”." Recommended: yes.
11. **"your computer awake" on a phone (E-08).** Proposed: "Keep this tab visible and your device awake while the video is made." Recommended: yes.
12. **Create, make and "the job"; cancel beside stop (C-13); five ways of saying the original is safe (C-14); the last second "of video" against "the picture" (C-10); sound and audio, Resolution and picture size (C-15); "starting again" in the discard question (C-16); quoted and bare control names (C-20).** Each is small and none misleads. Recommended: one pass over the words with you, not tonight's piecemeal changes. The analyst's proposed English for each is in the report.

### C. Small new things

1. **The chosen file's name cannot be read on a phone (B-03).** At 320 px the browser's chooser shows "Le…p4", and the name is nowhere else until the finished card. Proposed: a first row in Video properties, "File name". Recommended: yes.
2. **"Errors captured" cannot be put away (C-12, A-19).** After any error it stays for the session, still saying a video "may not finish" after one has. Proposed: draw it as the page's error notification, with a Close button (the word exists). Recommended: yes.
3. **The discard question hides Save (A-07).** "You have not saved the video you just made" replaces the card, and saving is not offered there. Proposed: keep "Save the video" in the question's row. Recommended: yes.
4. **Save is eight Tab presses after the finished card (A-08).** The player's own controls come first. Proposed: the lifetime line and the buttons before the player. It changes the card's look. Recommended: your glance first.
5. **Long title-card text shows through a short slot (B-06).** A 100-character title shows 30 to 60 per cent of itself in its field. Proposed: those fields become two-line boxes. Recommended: maybe; it is the largest change here.

### D. Behaviour, your call

1. **After Cancel, step 6 forgets the verdict (A-09).** "Ready to go", the time, the size and the audio note are gone until a choice is changed. Proposed: paint them again. Recommended: yes.
2. **The trim's result line rounds to whole seconds (A-11).** 5.5 seconds kept reads "Keeping 6 seconds". Proposed: show tenths when the value is not whole. Recommended: yes.
3. **A slider stops at the 3-second floor without saying why (A-12), and a Start typed past End has its reason only under End (D-07).** The typed route says "Keep at least 3 seconds of the video."; the slider says nothing. Proposed: show the same sentence, and write a pair's reason under the field just edited. Recommended: yes.
4. **A file dropped outside the dashed box is swallowed (A-13).** Proposed: a one-file drop anywhere on the page counts. Recommended: yes.
5. **"Ready to go" above an empty required card (A-15).** For a submission with empty fields. Proposed: after a refusal, the "Correct the title card in step 3" line above the verdict, not below. Recommended: yes.
6. **The student ID box's error on every key (A-02).** After one refused Create, each half-typed number is called wrong as it is typed, and before a refusal a short number is silent. Proposed: judge a number when the box is left, not while it is typed. Recommended: yes; it needs a screen reader's ear.
7. **The whole verdict spoken again after every change (A-10).** Proposed: speak only what differs. Recommended: after a person has listened.
8. **The percentage pauses about three seconds with Fade (A-06).** Seen in timings, cause not traced. Recommended: trace it on a slow laptop first.
9. **Looks on a phone, for your glance.** A third of a 320 px screen is margin, and the finished video's player is 185 px wide (B-09: 16 px insets below 400 px would help). "Video language" wraps two and one at 375 px where "Page language" holds one row (E-09). A portrait video's preview pushes "Set end here" under the fold (E-10). A previous video's card stands between the new file's verdict and its button (E-11).
10. **Phone keypads, for your phone walk (E-04, VH-113).** The trim's time fields ask for a decimal keypad, which has no colon (seconds alone still work), and the student IDs box asks for a numeric one, which on an iPhone may have no way to separate two numbers. Read on real phones; dropping the two `inputmode` attributes is the fix if so.

## What only a person or the Mac Pro can read

- The native file chooser (the 30-second check above) and Save, which opens the browser's own dialog: nothing after Save was exercised tonight.
- A screen reader on any of it. Tonight changed what is announced in four places (VH-239, and the trim's status in VH-243): wish VH-239.1 lists what to listen for.
- A real phone: touch, the on-screen keyboard over the dialog and the IDs box, the address bar and the dialog's height, the keypads.
- A real reduced-motion setting, a real Windows contrast theme, browser zoom and the 32 px font: wish VH-241.1.
- The Mac Pro's walk of pass 3's matrix on `main`. Scroll positions after Tab move by up to 8 px (VH-241's inset), so records that compare them will move.

## Not done, and why

- **No 0.3.1.** What goes public is yours (VH-245).
- **The statement.** Untouched; its three open points are VH-137's.
- **The Icebox and Next items** an agent could in principle start (VH-161 offline, VH-97 folding, VH-82, VH-119, VH-27): the analyst who read each judged none sensible unattended, and I agree. Folding and offline are design; VH-119 and VH-27 touch the protected audio files.
- **Anything in sections A to D above**, by the rule the night ran under: existing words, tokens and components only.
- **No Codex.** You named no second model tonight and the project keeps no model policy. Say so if you want Codex astra to read `v0.3.0..main` before a cut.

## Where everything is

- The analysts' reports: `reviews/2026-11-25/ux-loop-1/` (A, B, C and their brief) and `reviews/2026-11-25/ux-loop-2/` (D, E, F, the two code reviews).
- Each fix's measurements: `reviews/2026-11-25/phase-9/` and the two `loop2-…-evidence.md` files.
- The ledger: PLAN-9's two entries and the closes of VH-204, VH-238 to VH-244 in `project/decisions.md`; every point above is a wish line, PLAN-9.1 to PLAN-9.37.
- The diff of the product since the release: `git diff v0.3.0..main -- src index.html`.

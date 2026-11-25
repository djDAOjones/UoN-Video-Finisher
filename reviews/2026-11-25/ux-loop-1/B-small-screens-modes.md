# Analyst B — small screens, languages and modes (2026-11-25)

Browser tools were available. Driven in my own tab at `http://[::1]:5174/` (dev build v0.3.0+20261125.b18a4fcb), Chrome 156, device pixel ratio 2. Read-only: nothing in the project was edited; the only things injected into the page were measuring scripts, a WCAG 1.4.12 text-spacing style, and three short-lived test styles/elements named below, each removed again. Tab reset to preset "desktop" at the end.

Note on the small widths: the browser pane's emulation below 768 px also sends an Android user agent and touch points. After a reload at 320/375 px the app therefore took its phone path ("This may not finish on a phone or tablet", "Continue anyway", then "Create the video"; the drop hint hidden by `pointer: coarse`). Both paths were measured: the first file-chosen pass ran before a reload (desktop path, "Ready to go"), everything after ran on the phone path.

## Summary

10 findings. No severity 1. The page is very clean on the things the earlier passes measured: in every state, language, width and theme below there was **no horizontal overflow, no element past the right edge, no text under 7:1, no control under 44 x 44 px outside the inline-text exception, and no focus ring clipped by an ancestor or covered by another element**. What is left is at the edges the walker did not read: the skip link when shown, reduced motion's resting state, the native file chooser's own text, the dialog's height, and text spacing in Malay.

| ID | Sev | Class | One line |
| --- | --- | --- | --- |
| B-01 | 2 | FIX-NOW | Light theme: the skip link is a Nottingham Blue box with a Nottingham Blue ring on the Nottingham Blue band — box edge and focus ring both 1:1 — drawn over the logo |
| B-02 | 2 | FIX-NOW | Under reduced motion the indeterminate progress bar rests as an empty track (reads as 0%), not the "still band" the stylesheet says |
| B-03 | 2 | WORDS | At 320 px the chosen file's name shows as "Le…p4" (empty: "No…sen") and is written nowhere else on the page until the result card |
| B-04 | 2 | FIX-NOW | Report a problem at 320 x 568: the dialog's three buttons are below its fold (Malay: all three; English: 16 px of the first) |
| B-05 | 3 | FIX-NOW | Text spacing (1.4.12) at 320 px, Malay: "Tetapkan permulaan di sini" is 267 px in a 222 px column and crosses the panel border by 20 px, 4 px short of a sideways scroll |
| B-06 | 3 | ELEMENT | Title-card fields are single-line: an at-limit entry shows 30–47% of itself on a phone and 60–75% at 1280 px |
| B-07 | 3 | FIX-NOW | The student IDs box hides part of eight IDs typed with full-width digits (18–42 px) or one per line |
| B-08 | 3 | FIX-NOW | Footer: the two help links wrap and stack with 0 px between them — four to six unbroken underlined lines |
| B-09 | 3 | FIX-NOW | 320 px: 31% of the width is gutters; the finished-video player is 185 x 104 px and the page is 8.5–9.5 screens long |
| B-10 | 2 | FIX-NOW | Wish VH-233.1 (ring cut by the viewport on arrival) re-measured, with a tested one-line fix: `scroll-padding-block` on `html` (scroll-margin on `:focus-visible` does not work) |

By severity: S1 0, S2 5, S3 5. By class: FIX-NOW 8, WORDS 1, ELEMENT 1, PERSON 0.

---

## Findings

### B-01 — The skip link has no visible edge or focus ring in the light theme, and sits on the logo (S2, FIX-NOW)

- **State:** any page state, light theme, first Tab from the top. Reproduced twice with a real Tab key: 375 x 812 and 1280 x 900. Same in all three languages (the link is 177 px wide in English, 96 px in Chinese, 247 px in Malay).
- **Selector:** `a.skip-link` (`index.html:18`, `src/styles/app.css:90–103`).
- **Measured (light):** background `rgb(16, 38, 59)`, text `rgb(255, 255, 255)` (15.41:1, fine), outline `2px solid rgb(16, 38, 59)`, offset 2 px. The band behind it (`header.band--header.on-brand-blue`) is `rgb(16, 38, 59)`. Ring against band **1.00:1**; box against band **1.00:1**. Rect 16,16 177 x 48; the logo is at 20,12 169.6 x 62 (1280) or 24,12 (375): the link overlaps the logo by 169.6 x 48 px, so what shows is white words between two thin white slivers of the crest tile (the logo runs from 12 to 74 px down, the link from 16 to 64), with nothing marking a control.
- **Measured (dark):** background `rgb(250, 246, 239)`, text `rgb(16, 38, 59)` 14.31:1, ring `rgb(255, 255, 255)` 15.41:1 against the band. Dark is fine.
- **Cause:** the link is a child of `body`, outside `.on-brand-blue`, so in light it takes the page's roles (`--interactive` and `--focus` are both Nottingham Blue) while being drawn on the blue band.
- **Breaks:** WCAG 2.4.13 Focus Appearance (a 2 px perimeter changing by 3:1), 2.4.7; UI-STANDARDS "Focus appearance … checked on the rendered control, in light, dark, a blue band". Design pass 3 left this as a person check and never measured it ("P: the skip link when shown", `reviews/2026-10-25/design-pass-3/wcag-2026-10-27.md` rows 1.4.3, 2.4.1, 2.5.5); not in the wish-list.
- **Fix (FIX-NOW):** give the link the band's roles: `<a class="skip-link on-brand-blue" …>` at `index.html:18`. Tried live by adding the class in the page (then removed): box `rgb(250, 246, 239)` 14.31:1 against the band, text 14.31:1, ring white 15.41:1 — the same as dark, both themes then identical. It still covers the logo while focused; moving it clear of the logo would be a layout choice for the owner.

### B-02 — Reduced motion leaves an indeterminate stage with an empty bar (S2, FIX-NOW)

- **State:** job running, a stage with no measured progress ("Analysing audio": `#process-progress` matches `:indeterminate`, no `value`).
- **Selector:** `.progress:indeterminate` (`src/styles/app.css:761–789`), reduced-motion block `app.css:556–564`.
- **Evidence:** the reduced-motion block is `animation-duration: 0.01ms; animation-iteration-count: 1; transition-duration: 0.01ms` on `*, *::before, *::after`. The keyframes have no fill mode, so after its single 0.01 ms run the bar falls back to its base `background-position: 0% 0%`. With `background-size: 250% 100%` the element then shows the gradient's first 40%, which is all `--border-divider`: no band. I could not emulate `prefers-reduced-motion`, so I put two `<progress class="progress">` elements under the Create heading and applied exactly those three declarations to the second: the first showed the travelling band (`background-position` 66.2% at the moment read), the second read `background-position: 0% 0%`, `animation-duration: 1e-05s`, iteration count 1 and was a plain grey track in the screenshot. Both elements and the style were removed.
- **Why it matters:** the comment at `app.css:758–760` says "Reduced motion collapses the animation above, leaving a still band — which still reads as 'working', not as 0%." It leaves no band. A reduced-motion user sees an empty bar for the whole analysing stage; the stage words beneath ("Analysing audio") are the only sign of work.
- **Breaks:** Nielsen 1, UI-STANDARDS "Every async action must show status … The UI must never appear frozen"; the stylesheet's own stated intent.
- **Fix (FIX-NOW):** add `background-position: 50% 0;` to `.progress:indeterminate` (`app.css:761`). While the animation runs the keyframes override it; when motion is reduced the band rests centred (the visible window is then the gradient's 30–70%, the band at 40–60%). A percentage is one of the stylesheet test's structural exemptions.
- **Coverage of the block otherwise:** the stylesheet has exactly two moving things — `transition: transform var(--motion-fast)` on `.disclosure-summary::before` (`app.css:917`) and the `progress-indeterminate` animation (`app.css:771`). Both are caught by the universal rule. No `scroll-behavior`, no scripted animation or smooth scrolling in `src/main.ts` or `src/ui/*.ts` (the one `requestAnimationFrame` at `main.ts:3937` restores focus, it moves nothing).

### B-03 — On a phone-width window the chosen file's name cannot be read (S2, WORDS)

- **State:** file chosen, 320 x 568 and 375 x 812, all languages, both themes.
- **Selector:** `#file-input` inside `#drop-zone`.
- **Measured at 320 px:** the input's content box is 188 px (196 px less 2 x 4 px padding); its `::file-selector-button` is 120 px plus 12 px margin; **56 px** is left for the name. The browser's own middle-ellipsis then gives: empty page "**No…sen**" (for "No file chosen"), `notvideo.mp4` → "**not…p4**", `prores-6s.mov` → "**pro…ov**", a 126-character name → "**Le…p4**". At 375 px (input 251 px): "Lecture…5x.mp4". At 1280 px (input 836 px) the name reads nearly whole.
- **And it is nowhere else:** with a 126-character name loaded, a walk of every text node on the page found the name in none (`Video read.`, the Video properties rows, the refusal and unreadable-file messages do not carry it). It first appears in the result card ("Made from {name}: …"), after the job.
- **Breaks:** Nielsen 1 and 6 (show the current selection); WCAG 1.4.10 in spirit — the information is lost at 320 px, though it is the browser, not an author rule, that clips it.
- **Fix (WORDS):** write the name on the page, where it can wrap (running text already has `overflow-wrap: anywhere`). Proposed English, either: a first row in Video properties, label **"File name"**; or the read line as **"Video read: {name}"** (`source.readSummary`, `src/i18n/en-GB.ts:169`). A CSS-only trim of the drop zone's padding would gain about 16–32 px and still clip, so it is not offered as the fix.

### B-04 — The Report a problem dialog hides its buttons at 320 x 568 (S2, FIX-NOW)

- **State:** `#feedback-dialog` open, 320 x 568, light and dark.
- **Measured:** dialog 288 x 536 (`max-height: calc(100vh - 2 * 16px)`), padding 32 px all round, content 744 px (en), 720 px (zh), 768 px (ms); `overflow: auto`, so it scrolls. Positions on opening:

| Language | Message box | "What will be sent" | Open email app | Copy message… | Close |
| --- | --- | --- | --- | --- | --- |
| en-GB | top 282, 222 x 170 | in | top 536 — **cut**, 16 px showing | below | below |
| zh-Hans | top 258 | in | top 512 — cut | below | below |
| ms-MY | top 306 | in | top 560 — **below** | below | below |

- At 375 x 812 everything is in (dialog 698 / 642 / 722 px tall). By the same sums a 375 x 667 window cuts Close in Malay only (722 against 635); I did not load that size.
- Nothing overflows sideways, with the details open, a 200-character unbroken word in the message, and under text spacing ("Copy message and details" wraps to 222 x 60).
- **Breaks:** Nielsen 3 (the way out is out of sight; a touch screen has no Esc), Nielsen 6. Focus opens in the message box, so on a real phone the keyboard will take more of the height (person check, VH-113).
- **Fix (FIX-NOW):** under the existing `@media (max-width: 25rem)` set `.dialog { padding: var(--spacing-05); }` (`app.css:1661`) and lower the message box from `rows="6"` to `rows="3"` (`index.html:885`). By the measured numbers that takes the English content from 744 to about 616 px: Open email app and Copy whole, Close still cut by about 28 px. Getting all three in at 568 px would need the intro shortened (words) or the buttons on one row.

### B-05 — Text spacing at 320 px: the Malay "Set start here" button leaves its panel (S3, FIX-NOW)

- **State:** file chosen, 320 x 568, WCAG 1.4.12 style injected (`line-height: 1.5; letter-spacing: 0.12em; word-spacing: 0.16em` on `*`, `p { margin-bottom: 2em }`), measured twice (staff and submission pages).
- **Result overall:** no horizontal scroll (`scrollWidth` 320) in any language, nothing clipped, both selects wrap their option to two lines rather than clip ("The last second of video" needs 192 px of a 168 px lane and wraps).
- **The exception:** `#trim-set-start` "Tetapkan permulaan di sini" is **267 px** wide in the 222 px column: left 49, right 316; the panel's border is at 296, the window's edge at 320. `#trim-set-end` "Tetapkan hujung di sini" is 238 px (right 287). English: `#closing-colour .segments` is 228 px in 222 (6 px). Chinese: nothing.
- **Cause:** `.control-with-help .button { flex: none; }` (`app.css:1639`); the rule that lets these two buttons shrink and wrap, `.trim-time-row .button { flex: 0 1 auto; overflow-wrap: break-word; }`, sits inside `@media (max-width: 19.99rem)` (`app.css:1763`), which 320 px at the default font does not reach.
- **Breaks:** nothing outright — 1.4.12 asks for no loss of content and none is lost — but the button is drawn across the panel's edge with 4 px to spare before the page scrolls sideways. Wish VH-209.2 records the like at a 32 px font only.
- **Fix (FIX-NOW):** move `.trim-time-row .button { flex: 0 1 auto; }` out of the media query so the label wraps whenever the row is narrower than it (the dialog's buttons already do: 222 x 60 under the same style).

### B-06 — Single-line title-card fields show a fraction of an at-limit entry (S3, ELEMENT)

- **State:** step 3, staff card and Student submission, fields typed to their column limits (the page's own limiter cut my 400-character input to 100 / 80 / 80 / 40 columns for Title / Department / Authors / Date, and 80 / 60 / 40 for Assignment / Module / Convenor).
- **Measured (`scrollWidth` against `clientWidth`):**

| Field at its limit | Text width | 320 px field | 375 px field | 1280 px field |
| --- | --- | --- | --- | --- |
| `#title-card-title`, 100 columns, long words | 739 px | 220 (30%) | 275 (37%) | 446 (60%) |
| `#submission-card-assignment`, 80 columns, a realistic title | 591 px | 220 (37%) | 275 (47%) | 446 (75%) |
| the same, 40 Chinese glyphs | 664 px | 220 (33%) | 275 (41%) | — |
| `#submission-card-module`, 60 columns | 481 px | 220 (46%) | 275 (57%) | 446 (93%) |

- The page never widens (checked in all three languages), and eight IDs, the error lines ("This field is full, so the rest was not added.", "This is too long to fit on the card. Shorten it.") and the invalid field's 2 px border (`rgb(117, 14, 19)`, 10.66:1) all fit.
- **Why it matters:** these are the words that go on the card, and a student cannot see a long assignment title whole in any window; on a phone they proofread it through a 16–20 character slot.
- **Fix (ELEMENT):** the fields whose limit is wider than the field (Title, Department, Authors, Assignment, Module) become the existing `.textarea` at two rows with Enter refused — a change of element, so the owner's. A CSS-only part-fix: at 1280 px the inputs stop at the 28rem measure (446 px) in an 836 px panel; letting `.text-input` take the panel's width there would show a 100-column title whole on a desktop, and does nothing for a phone.

### B-07 — The student IDs box hides part of eight IDs (S3, FIX-NOW)

- **Selector:** `#submission-card-ids` (`index.html:417–420`, `rows="3"`, `resize: vertical`, `overflow-y: auto`).
- **Measured:** eight IDs with spaces, half-width digits, 320 px: `scrollHeight` 126 = `clientHeight` 126 — fits exactly. The same eight in full-width digits with full-width commas (as a Chinese keyboard types them, which the field accepts): 144 against 126 at 375 px, **168 against 126 at 320 px**. One ID per line, which the helper invites ("spaces, commas, or new lines"), is 8 x 24 px of text in a box showing about four lines (arithmetic, not loaded).
- **Fix (FIX-NOW):** `field-sizing: content` on `.textarea` (`app.css:1684`; Chrome 123 and later, the browser this tool is built for) so the box grows with what is typed, `rows` staying as the floor; or `rows="8"` at `index.html:420`.

### B-08 — The footer's two help links run together on a phone (S3, FIX-NOW)

- **Selector:** `#contact-creators`, `#contact-self-service` (`.footer-help-list li`, `app.css:211–229`).
- **Measured at 320 px:** each link is 272 px wide and wraps: 48 px + 48 px in English and Chinese, **72 px + 72 px in Malay**, with **0 px** between the two. Both are underlined throughout, so the eye gets four to six continuous underlined lines and only the words "Staff:" / "Students:" mark where one target ends. At 1280 px each is one 24 px line in a 44 px box, which is where the visible gap comes from.
- **Breaks:** Nielsen 4 / 8 at polish level; targets themselves are fine (each ≥ 44 px high).
- **Fix (FIX-NOW):** `.footer-help-list li + li { margin-top: var(--spacing-03); }`.

### B-09 — At 320 px a third of the width is inset, and the result player is 185 px wide (S3, FIX-NOW)

- **Measured at 320 px:** `#main` padding 24 + 24, `.panel` border 1 + 1 and padding 24 + 24: the text column is **222 px** (69% of the window). Inside a notification (rail 4, border 1, padding 16 + 16) text is **185 px**. So: `#trim-preview` 222 x 125 px; the finished video `#process-result video.result-player` **185 x 104 px**, with Chrome's play, mute, menu and scrubber over most of the frame; "Finished video — 10.5 MB" breaks over two lines.
- **Page length with a file chosen, nothing opened:** 4,832 px (en), 4,740 (zh), 5,372 (ms) — 8.5 to 9.5 screens of 568 px. Header band 222 px (39% of the first screen).
- The stylesheet already drops these insets to 8 px, but only under `@media (max-width: 19.99rem)` (`app.css:1735`), which a 320 px window at the default font does not reach.
- **Fix (FIX-NOW, a look to be judged):** under the existing `max-width: 25rem` query, `--spacing-05` (16 px) for `.main`, `.panel` and `.band-inner` inline padding (`app.css:237`, `265`, `121`, `162` — the band must follow so the logo and title keep one edge, VH-166). Column 222 → 254 px, player 185 → 217 px, and every wrapped paragraph a line or two shorter.

### B-10 — Wish VH-233.1, re-measured, with a tested fix (S2, FIX-NOW)

- **This is wish VH-233.1** (a control arriving at the viewport's bottom edge has its ring outside the viewport). Not new; reported because the wish's proposed remedy does not work as written and another does.
- **Measured at 375 x 812, finished-video page, focus moved through all 36 stops from the top:** 4 arrive with the box flush to the bottom edge and the ring's bottom side 2.8 px outside (`#trim-set-end`, the first dev button, `#contact-creators`, `#contact-self-service`); an earlier pass on the file-chosen page gave 3 of 30 (3.8 px: `#trim-set-end`, `#system-check summary`, `#feedback-form-link`). Light and dark alike. (Read with `element.focus()` in keyboard modality; a real Tab from far away centres the control instead, so which stops are hit depends on where the page was.)
- **Tried live (injected, then removed):**
  - `:focus-visible { scroll-margin: 8px }` (the wish's "scroll margin for the ring"): **still 4 of 36** — Chrome scrolls before the pseudo-class applies.
  - `html { scroll-padding-block: 8px }`: **0 of 36**.
- **Fix (FIX-NOW):** `scroll-padding-block: var(--spacing-03);` on `html` (`app.css:15`). Breaks without it: WCAG 2.4.12 Focus Not Obscured (Enhanced) in the letter, 2.4.13.

---

## The six tasks, what was measured

### 1. Layout at 375 x 812, 320 x 568 and 1280 x 900

For each state, in en-GB, zh-Hans and ms-MY: `documentElement.scrollWidth > innerWidth`, every visible element's right and left edge against the viewport, `scrollWidth > clientWidth` on every element (with its overflow mode), every Latin word's line boxes (a word on two lines = broken), `getBoundingClientRect` on every `button, input, select, textarea, summary, a[href], [role=slider], video[controls]` (radio and checkbox measured with their label), pairwise overlap of those rects.

| State | 320 | 375 | 1280 | Result |
| --- | --- | --- | --- | --- |
| Empty page | x3 lang, light + dark | x3 | x3 | clean; 17–18 targets, none small |
| File chosen (talk-30s), every step | x3 | x3 | x3 | clean; 39–40 targets |
| Title "?" open | x3 | x3 | x3 | clean; the inline format "?" is drawn 20 x 20 with a 44 x 44 hit area (`::after`, confirmed by an `elementFromPoint` scan) |
| Student submission, form at its limits (Latin and Chinese, 8 IDs) | x3 | x3 | x3 | page never widens; B-06, B-07 |
| Staff card at its limits, Slide closing, "Plays over ?" open | x3 | x3 | x3 | clean; select options need at most 152 of 168 px |
| Phone warning ("This may not finish…", Continue anyway) | x3 | — | — | clean |
| Job running, indeterminate and measured | x3 light | zh dark | — | clean |
| Finished video card | x3 light, en dark | zh dark, x3 light | x3 | clean; B-09 |
| Unreadable file (notvideo.mp4) | x3, light + dark | — | — | clean |
| Refused file (prores-6s.mov) | x3, light + dark | — | — | clean |
| Errors captured (dev "Trigger test error"), details open | x3 | zh dark | — | clean; the stack is `pre-wrap` and wraps |
| Discard question (unsaved result, Create again) | x3 | — | — | clean; "Discard it and start again" wraps to 185 x 60, white on `rgb(117, 14, 19)` 11.48:1 |
| Footer, statement and System check open | x3 | x3 | x3 | clean; the two statement links are inline in sentences (42 px line boxes, the inline exception); B-08 |
| Report a problem dialog, details open | x3 light | x3 dark | — | no sideways overflow; B-04 |

- **Horizontal overflow:** none, anywhere.
- **Overlapping controls:** only `#trim-start-range` over `#trim-end-range`, the two halves of one slider sharing a 222 x 44 box by design (`pointer-events: none` on the inputs, 44 px thumbs, `.range-input--on-top`). With a kept part of 0.5 s on a 30 s video at 320 px the two discs are drawn as one; the typed times and Set buttons are the equivalent.
- **Words broken mid-word:** none in any interface string in any language at 320 px. Only a 126-character file name in the result card ("Thermodyna/mics", by `overflow-wrap: anywhere`, VH-165's intent) and the version string in the dialog's monospace details.
- **Clipped text:** only what is typed into single-line fields (B-06) and the native chooser's label (B-03).

### 2. First screen

| Viewport | Language | Choose file (top–bottom) | Inside? |
| --- | --- | --- | --- |
| 320 x 568 | en-GB | 423–475 | yes, 93 px spare |
| 320 x 568 | zh-Hans | 634–686 | no, 118 px below |
| 320 x 568 | ms-MY | 676–728 | no, 160 px below |
| 375 x 812 | en-GB | 353–405 | yes |
| 375 x 812 | zh-Hans | 545–597 | yes |
| 375 x 812 | ms-MY | 566–618 | yes |
| 1280 x 900 | en-GB | 261–313 | yes |

What pushes it down at 320 x 568: the header band 222 px (logo row 86, then the "Page language" legend and a switcher on two rows, 120 px); the machine-translation notice, 187 px in Chinese and 229 px in Malay, absent in English; the title on two lines, 70 px. **This is wish VH-175.4, same numbers (fileTop 634 and 676), kept by the owner's word ("no layout change"); nothing new is proposed.**

### 3. Focus

Read on every stop at 375 x 812, light and dark, file-chosen page (30 stops) and finished page (36–37 stops), after a real Tab to set keyboard modality; a real-Tab run through the trim fields and the top of the page as a check.

- Every indicator is `2px solid`, offset 2 px. Light: `rgb(16, 38, 59)` on page 14.00:1, on panel 14.31:1, on notification 14.93:1. Blue bands and dark: `rgb(255, 255, 255)` 15.41:1 on band, 13.34:1 on dark panel.
- Segmented controls draw it on `.segment-face` (the radio itself is `opacity: 0`); file chooser on `::file-selector-button`; sliders on the thumb, inset (seen in a screenshot as a whole ring round the disc; its numbers are not readable from script — wish VH-138.4).
- No ring was clipped by an ancestor with `overflow` other than visible (none of 30 + 37 stops), and none lay under another element: `elementFromPoint` at the ring's corners and edge midpoints returned only the parent, in-flow siblings, or a neighbouring transparent radio input.
- Exceptions: **B-01** (skip link, light) and **B-10** (arrival at the bottom edge, wish VH-233.1).

### 4. Contrast

Computed `color` over the first opaque ancestor background (alpha and `opacity` composited), every text node, field value, the chooser's text and button, in every state above, light and dark. **Nothing under 7:1** (nothing needed the large-text allowance). No field has placeholder text.

| Lowest pairs | Light | Dark |
| --- | --- | --- |
| Secondary text on page (`Video type`, helper lines) | `64,81,98` on `243,244,245` — 7.42:1 | `207,212,216` on `16,38,59` — 10.32:1 |
| Secondary text on panel (step numbers, helpers, status) | on `250,246,239` — 7.58:1 | on `28,49,69` — 8.93:1 |
| Notification body | on `253,251,249` — 7.91:1 | `207,212,216` on `40,60,79` — 7.60:1 |
| Disabled / locked label and value (`Plays over`, `#closing-onset`, `#trim-clear`, locked fields in a job) | 7.58–7.91:1 | 7.60–8.93:1 |
| Error line under a field | `117,14,19` on panel — 10.66:1 | `255,215,217` — 10.14:1 |
| Links in the footer | `250,246,239` on `16,38,59` — 14.31:1 | same |
| Status marks "OK" | `167,240,186` on `28,49,69` — 10.0:1 | same |

Non-text (3:1): field, select and drop-zone edges 7.58:1 light / 8.93:1 dark; disabled dashed edges 3.91 / 5.53; panel edges 3.83 / 6.39; notification rails 10.0–10.7; invalid field edge 10.66. **Progress bar:** fill against track 10.31:1 light (`16,38,59` on `207,212,216`), about 7.6:1 dark (`250,246,239` on `64,81,98`); the track against its panel is 1.39:1 light and about 1.6:1 dark, so the unfilled remainder is faint — the percentage is written beside it, so not raised as a finding. The white swatch's own 2 px border is 1.08:1 on the light panel (decorative; "White" is written beside it).

### 5. Reduced motion and text spacing

- **Reduced motion:** read from `src/styles/app.css:554–564`; every transition and animation in the stylesheet is covered (two exist). **B-02** is what the covered animation leaves behind.
- **Text spacing at 320 px:** file-chosen, finished, submission, error-panel and dialog states, title "?" and both footer panels open, three languages: no page overflow (`scrollWidth` 320 throughout), no clipped text, selects wrap. **B-05** is the one thing out of place.

### 6. Long content

- **A 126-character file name with no spaces:** page never widens at 320, 375 or 1280 px; wraps in the result card over six lines at 185 px. Its only trouble is B-03.
- **Longest title-card text:** B-06; nothing widens.
- **Eight student IDs:** accepted and fit at 320 px in half-width digits; B-07 for full-width digits.
- **A 200-character unbroken word in the feedback message:** wraps inside the box.

---

## Checked and found fine

- No horizontal scroll and nothing past the viewport in any of roughly 150 state x language x width x theme readings.
- Every pointer target ≥ 44 x 44 px or a true inline-in-sentence link; language, video-kind, video-language and colour segments 44 px high in every wrap; "?" buttons 44 x 44.
- Text contrast ≥ 7.42:1 everywhere, both themes; disabled text keeps 7.58:1 or better and takes a dashed edge.
- Dark theme: `color-scheme: light dark` is set; every role flips; the discard button, error rails and status marks keep their ratios.
- The phone path (warning, "Continue anyway", then "Create the video") lays out cleanly at 320 px in three languages.
- Dialog: modal, focus lands in the message box, no sideways overflow with long content, backdrop is the brand blue at 60%.
- The stylesheet's reduced-motion block covers every animation and transition.

## Seen, outside my lens (for the other analysts)

- "This field is full, so the rest was not added." stays in error red under a field while the job runs and after it, on a field that is then locked.
- After a refused file (prores-6s.mov) "Choose file" is drawn secondary and the page has no primary button; after an unreadable file (notvideo.mp4) it is primary.
- 80 capital W's are accepted as 80 columns in "Assignment title or number", then the field says "This is too long to fit on the card. Shorten it." — two limits, one after the other.

## Could not check

- `prefers-reduced-motion` and forced colours cannot be emulated here: B-02 rests on the same declarations applied to a test element.
- The browser's own zoom at 200% / 400%, a 32 px default font, landscape 568 x 320, and 375 x 667 (estimated from sums in B-04) were not loaded.
- A real phone: the on-screen keyboard over the dialog, touch on the slider discs, the native select lists (wishes VH-113, VH-219.3).
- The native chooser's truncated label and the slider thumb's ring are browser-drawn: read from screenshots, not from the DOM.
- Native unchecked radio and checkbox edges in dark are the browser's own drawing; not measured.
- Save was not clicked (native dialog). Hover and pressed states were not measured.
- The running state was read at 320 px light (en, zh, ms) and 375 px dark (zh) only; not at 1280 px.

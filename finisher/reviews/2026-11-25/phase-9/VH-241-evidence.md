# VH-241 — evidence (builder, 2026-11-25)

Eight readings mended in the stylesheet. Read in the built-in browser pane, my own tab at `http://[::1]:5174/` (dev build v0.3.0+20261125.b18a4fcb, Chrome 156, device pixel ratio 2), fixture `talk-30s.mp4`. Small widths were reached by resizing after loading at 1280 px, so the desktop path ("Create the video") was the one measured unless said. The tab was reset to preset "desktop" and closed; the page's stored language (en-GB) and video type (submission) were put back as found; every injected style and test element was removed.

## What changed, file by file

- `index.html` — line 18, one class added: `class="skip-link on-brand-blue"`. No element, no word.
- `src/styles/app.css`
  - `html`: `scroll-padding-block: var(--spacing-03)`.
  - `.skip-link`: comment only (why the markup carries the band's class).
  - new `.footer-help-list .footer-contact-link { padding-block: var(--spacing-02) }`.
  - `.progress:indeterminate`: `background-position: 50% 0`; comment made true.
  - new `.trim-time-row .button { flex: 0 1 auto; overflow-wrap: break-word }` after `.control-with-help .button`; the same rule removed from the `max-width: 19.99rem` block and that block's comment corrected.
  - `.dialog`: `margin-block-start: var(--spacing-05)` and `scroll-padding-block: var(--spacing-03)`.
  - new `#submission-card-ids { field-sizing: content }`.
  - new `@media (max-width: 25rem)` block after the dialog and textarea rules: `.dialog { padding: var(--spacing-05) }`, `#feedback-message { height: var(--textarea-min-height) }`.
  - type roles: `.field-error` moved from the Supporting rule to the Compact emphasis rule; both role comments updated.
  - No new token. No literal length.
- `test/stylesheet.test.ts` — one new `describe('eight readings mended (VH-241)')` with eight tests; two existing assertions moved to where the rules now are (below).
- `test/screen-text.test.ts` — one string, outside the file list I was given: see "Open points".
- `test/contrast.test.ts`, `src/styles/tokens.carbon.css` — not changed.

## Criteria, how checked, numbers

### 1. Skip link on the band's roles (B-01)

Real Tab from the top, 1280 × 900; then each language by its switcher with the link focused (`:focus-visible` true each time).

| | Box | Words | Ring | Box v band | Words on box | Ring v band |
| --- | --- | --- | --- | --- | --- | --- |
| Light, before | `16,38,59` | `255,255,255` | `16,38,59` 2 px +2 px | **1.00** | 15.41 | **1.00** |
| Light, after | `250,246,239` | `16,38,59` | `255,255,255` 2 px +2 px | **14.31** | 14.31 | **15.41** |
| Dark, after (unchanged from before) | `250,246,239` | `16,38,59` | `255,255,255` | 14.31 | 14.31 | 15.41 |

Same in en-GB (177 × 48), zh-Hans (96 × 48) and ms-MY (247 × 48), light and dark. Seen in a screenshot in light: a Portland Stone box with a white ring on the blue band.

- The item's criterion says "its box, words and ring each at least 3:1 against the band". Box and ring are. The words are the band's own blue, drawn on the box (14.31:1 on it); words against band is 1.00:1 by construction and is not an adjacent pair. Read as the task put it (box v band, words v box, ring v band), all three pass.
- `test/contrast.test.ts` already measures these three pairs in its "on a blue band" context (`--interactive` on `--layer-00`, `--text-on-interactive` on `--interactive`, `--focus` on `--layer-00`). Before, the link drew a cross-context pair the test never saw; now what is drawn is what is tested. No pair added. The new stylesheet test pins the class in `index.html` and the role tokens in `.skip-link`.
- Not done: the link still covers the logo while focused (B's note; a layout choice for the owner).

### 2. Scroll inset, the ring whole at the window's edge (B-10, A-18, wish VH-233.1)

375 × 812, file-chosen page, light. Counted: stops whose ring edge (box ± outline width + offset) lies outside the viewport. Two methods: `element.focus()` through every stop in order after a real Tab (forward from the top, then backward from the bottom), and real Tab / Shift+Tab key presses read at each `keyup`.

| | `focus()` forward | `focus()` backward | Real Tab forward | Real Shift+Tab |
| --- | --- | --- | --- | --- |
| Before | 2 of 32 (`#trim-set-end` 3.81 px below; a secondary button 3 px above) | 3 of 32 (4 to 4.19 px above) | 3 (`#trim-set-end`, System check summary, `#feedback-form-link`, each 3.81 px below) | 2 (`#trim-end` 4.19, `#about-help-button` 4 px above) |
| `--focus-room` (4 px), tried | 0 | 2 of 32, 0.19 px above | 0 | 1, 0.19 px above |
| `--spacing-03` (8 px), adopted | **0 of 32** | **0 of 32** | **0** | **0** |

- Token choice: `--focus-room` is the ring's exact room, and it leaves 0.19 px of the ring outside at fractional layout positions. `--spacing-03`, the next step up, leaves none. Hence `--spacing-03`.
- After, also 0 of 31 both ways in ms-MY and zh-Hans at 375 × 812 and in ms-MY at 1280 × 900.
- Real Tab does cut rings before the fix (B thought it centred the control).
- A-18, reached: 1280 × 900, light, finished video, focus on "Create the video again", Return: the discard question (`section.notification[tabindex="-1"]`) is focused with its box at y = 7.88 and its ring's top at 3.88. Tab, Tab to "Keep it", Return: the result card is focused at y = 7.9, ring top 3.88, ring bottom 709.94 of 900. A's reading before was y = −0.125. Whole ring both times.
- One addition in the same spirit: at 320 × 568 the dialog scrolls, and Tab to Close left 4 px of Close's ring past the dialog's clip edge (the dialog is its own scroll container, so the page's inset does not reach it). With `scroll-padding-block` on `.dialog` the ring is 4 px inside. Measured before and after, real Tab.
- The key logger caught 34 of 40 presses each run (the video's own controls take some); the set of stops logged covered the page from the language switcher to the last footer link.

### 3. Reduced motion's resting band (B-02)

`prefers-reduced-motion` cannot be emulated in the pane. Proved as B did: two `<progress class="progress">` under the Create heading, the second given exactly the reduced-motion block's three declarations.

- First: `background-position` 67.1% at the moment read, one running animation.
- Second, after: `background-position: 50% 0px`, `animation-duration: 1e-05s`, iteration count 1, no running animation; in the screenshot a still band centred on the track. Before (B's reading): `0% 0%`, a plain track.
- Both elements and the style removed. The comment above the rule now says where the band rests and why.
- Not checked: a real reduced-motion setting on a real machine.

### 4. Error line told from helper without colour (A-04)

`.field-error` now wears compact emphasis (14 px / 21 px / 600); the helper stays 14 / 21 / 400.

| Where | Weight | Light, on its ground | Dark, on its ground | Error v helper colour |
| --- | --- | --- | --- | --- |
| Trim start, trim end | 600 | 10.66 | — | — |
| Title card (empty, title, date) | 600 | — | 10.14 | 1.14 (dark) |
| Submission (assignment, module, convenor, IDs) | 600 | 10.66 | 10.14 | 1.41 light, 1.14 dark |
| Feedback dialog | 600 | — | 10.14 | — |
| `#drop-error` (same class) | 600 computed | not triggered | not triggered | — |

- Dark screenshot at 320 px: the error lines read as bold beside regular labels and helpers.
- Wrapping at 320 px, compared with the same lines forced to 400 in the page: en-GB and zh-Hans, no line gains a line. **ms-MY: two sentences go from 2 lines to 3** (21 px each): "Ini terlalu panjang untuk dimuatkan pada kad. Pendekkannya." (title and assignment) and the title card's empty-card line. Nothing overflows, `scrollWidth` 320. This is the cost of the weight; it is not "no worse", so it is named.
- Trim's two lines were read in light only; the title card's and the dialog's in dark only. One rule draws them all.

### 5. Trim's Set buttons wrap inside their panel (B-05)

320 × 568, ms-MY, text-spacing style injected (line-height 1.5, letter-spacing 0.12em, word-spacing 0.16em on `*`).

| | `#trim-set-start` | `#trim-set-end` | Page `scrollWidth` |
| --- | --- | --- | --- |
| Before | 266.9 × 44, **19.9 px past the panel's border** | 237.8 × 44, 9.2 px inside | 320 |
| After | **222 × 60**, 25 px inside (the column's edge) | 222 × 60, 25 px inside | 320 |

Without text spacing, width × height, before = after in every cell:

| | en-GB | zh-Hans | ms-MY |
| --- | --- | --- | --- |
| 1280 | 134 × 44, 130.2 × 44 | 148 × 44, 148 × 44 | 216.5 × 44, 192.4 × 44 |
| 375 | the same | the same | the same |
| 320 | the same | the same | the same |

Positions unchanged too. Under text spacing en-GB and zh-Hans are unchanged at all three widths, ms-MY at 1280 and 375.

- Not touched: B's other note in B-05, English `#closing-colour .segments` 228 px in 222 under text spacing at 320 px. It was not in this item's list.

### 6. Space between the footer's help links when they wrap (B-08)

Checked first: "at 1280 each is one line" holds for English only. At 1280 px the first link wraps in zh-Hans and both wrap in ms-MY (the 28rem measure), so a media query cannot scope the fix to where they wrap.

Chosen instead of `li + li` margin: 4 px of block padding inside each link in the list. A one-line link is 24 + 8 = 32 px, under its 44 px floor, so it does not change; a wrapped link grows by 8 px and two wrapped links stand 8 px further apart.

| | Before (boxes, list) | After (boxes, list) |
| --- | --- | --- |
| 1280 en-GB | 44 + 44, 88 | **44 + 44, 88 (unchanged)** |
| 1280 zh-Hans | 48 + 44, 92 | 56 + 44, 100 |
| 1280 ms-MY | 48 + 48, 96 | 56 + 56, 112 |
| 375, all three | 48 + 48, 96 | 56 + 56, 112 |
| 320 en-GB, zh-Hans | 48 + 48, 96 | 56 + 56, 112 |
| 320 ms-MY | 72 + 72, 144 | 80 + 80, 160 |

Between the glyph boxes of two wrapped links: 14 px after, against 6 px between two lines of one link (so 6 px before, the same as within a link). `#feedback-form-link` is outside the list and unchanged (48 px at 320, 44 px at 1280).

- Forced colours: VH-210's rule (`.footer-help-list > li + li`, 4 px margin) is untouched and now adds to the padding. Forced colours cannot be emulated here; not read.

### 7. The dialog grows downward (A-14) and shows more buttons at 320 px (B-04)

A-14, the summary's y closed then open:

| | Before | After |
| --- | --- | --- |
| 1280 × 900 en-GB | 549 → 396 (153 px up); dialog y 169 → 16 | 396 → 396; dialog y 16 → 16 |
| 1280 × 900 zh-Hans | 537 → 383.5 | 372 → 372 |
| 375 × 812 en-GB | 461 → 420 | 362 → 362 |
| 375 × 812 ms-MY | 473 → 444 | 362 → 362 |
| 320 × 568 | no move (already at full height) | no move |

`--spacing-05` because the dialog's `max-height` is `100vh − 2 × --spacing-05`: a top margin of that step keeps a full-height dialog inside the window, where a larger one would push its foot out.

B-04, the three buttons in the dialog's first view, details closed:

| | Before | After |
| --- | --- | --- |
| 320 × 568 en-GB (content 744 → 622) | Open email cut, 16 px showing; Copy, Close below | **Open email in, Copy in**, Close cut, 10 px showing |
| 320 × 568 zh-Hans (720 → 622) | Open email cut, 40 px showing; others below | Open email in, Copy in, Close cut, 10 px showing |
| 320 × 568 ms-MY (768 → 670) | all three below | Open email in, Copy cut, 18 px showing, Close below |
| 375 × 812, all three | all in (dialog 698 / 642 / 722 at y 57 / 85 / 45) | all in (624 / 568 / 568 at y 16) |
| 1280 × 900, all three | all in (562 / 538 / 562) | all in, same sizes, at y 16 |

- Message box: a CSS height under the query (`--textarea-min-height`, 170 → 128 px), not a lower `rows`: `rows="6"` stays, so 1280 px is untouched (170 px before and after). The box still scrolls and can still be resized.
- The `25rem` query also covers 375 px (padding 16 px, box 128 px there too).
- Not all three buttons are in at 320 × 568; that needs the intro shortened or the buttons on one row (B's note), which are words or layout for the owner.
- **A look for the owner:** at 1280 × 900 the closed dialog now sits at the top of the window (y = 16, 322 px of dimmed page beneath) instead of centred. That is the fix as planned; he may want a glance.

### 8. The student IDs box grows (B-07)

| Eight IDs | Before (box, hidden) | After (box, hidden) |
| --- | --- | --- |
| Empty | 128 | 128 |
| With spaces | 128, 0 | 128, 0 |
| One a line, 375 px | 128, **90 px hidden** | 218, 0 |
| Full-width digits, 375 px | 128, 18 px hidden | 146, 0 |
| Full-width digits, 320 px | 128, 42 px hidden (B) | 170, 0 |
| One a line, 1280 px | — | 218, 0 |

Width unchanged (222 / 277 / 448).

- Scoped to `#submission-card-ids`, not `.textarea`. Tried on `.textarea` first: with `field-sizing: content` a textarea stops reading `rows`, so the feedback message shrank from 170 to 128 px empty at every width and grew without limit as typed. So `rows` is not the floor B expected; the floor is `.textarea`'s `min-height` token (128 px), which is what the IDs box already rested at (`rows="3"` is 98 px, under it).
- Feedback message after: `field-sizing: fixed`, 170 px at 1280 and 128 px under 400 px, ten lines scroll inside it.

## Tests

New, `test/stylesheet.test.ts`, `describe('eight readings mended (VH-241)')`: the skip link's class and role tokens; the scroll inset on `html` and `.dialog` and no `scroll-margin`; the resting `background-position` and the keyframes it yields to; `.field-error` on the compact emphasis role with no font of its own; the footer links' padding with the 44 px floor kept; the dialog's top margin beside its `max-height`; the narrow dialog's two rules, after the rules they outrank, `rows="6"` kept; `field-sizing` on the IDs box alone.

Existing assertions moved, none removed:

- VH-166 role table: `.field-error` moved from the supporting list to the compact emphasis list (it is still asserted to wear exactly one role).
- VH-209 "lets the two Set buttons wrap": the rule is now looked up outside the `19.99rem` block, with the same two declarations, plus that it exists once and stands after `.control-with-help .button`.

## Commands

- `npx vitest run test/stylesheet.test.ts test/contrast.test.ts test/screen-text.test.ts test/readability.test.ts src/i18n/tables.test.ts src/ui/accessibility-statement.test.ts src/ui/drop-zone.test.ts` — 7 files, 416 tests passed (the seven that read `index.html` or the stylesheet).
- `npm run typecheck` — clean.
- `npx eslint test/stylesheet.test.ts test/screen-text.test.ts` — clean.
- Not run, as briefed: `npm run check`, `npm test`, `npm run build`.

## Open points

1. **`test/screen-text.test.ts:1005` was changed, outside the files named for this item.** It asserted `markup.indexOf('class="skip-link"') < markup.indexOf('<header')`. With the class added the string is no longer in the page, `indexOf` returns −1 and the assertion passes without testing anything. I changed the one string to `class="skip-link on-brand-blue"` so it still tests the order. If that file must stay out of this item, revert the line and the skip-link order is unprotected.
2. Two Malay error sentences take a third line at 320 px (item 4).
3. The dialog's new place at a wide window is a visible change (item 7).
4. `.dialog` also got the scroll inset (item 2), a ninth small declaration beyond the eight listed.
5. Footer spacing is padding inside the link, not the `li + li` margin proposed (item 6).

## Only a person or the full walk can read

- A real reduced-motion setting; forced colours (the footer list's VH-210 margin beside the new padding, the skip link in a contrast theme).
- A real phone: the on-screen keyboard over the dialog at 320 px, touch.
- The 63-cell walk (font 32, zoom 200%, forced colours) for the scroll inset and the Set buttons; browser zoom; 375 × 667.
- The phone path after a reload at a small width was not re-walked for focus; the same rule applies to it.
- Hover and pressed states; Save (native dialog) was not clicked.

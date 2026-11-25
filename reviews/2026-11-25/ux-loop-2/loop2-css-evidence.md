# VH-243 — the second analysis's three CSS findings mended (D-03, D-04, D-05) — evidence

Builder's note, 2026-11-25. Files changed: `src/styles/app.css` and `test/stylesheet.test.ts`. No token added (`src/styles/tokens.carbon.css` untouched), no word, no element, no script.

Measured in the built-in browser, my own tab at `http://[::1]:5174/` (closed at the end, viewport reset), Chrome 156 on the Mac, fixture `talk-30s.mp4`, Video type "Student submission" where the IDs box is read. Real wheel gestures and real key presses (Return, Tab, Escape); the rest read with `getBoundingClientRect` and computed styles. The Mac has overlay scrollbars (`clientWidth` = `innerWidth`), which matters for D-03 below. The other builder's edits reloaded the page several times; each reading below was taken again after a reload where it was cut.

## What changed

### `src/styles/app.css`

1. `.dialog` gains `overscroll-behavior: contain`; `.dialog::backdrop` gains `overflow: hidden` and `overscroll-behavior: contain` (D-03). The dialog's comment says why, and why the root is left alone.
2. A new rule after `html`: `#main { scroll-margin-top: calc(-1 * var(--spacing-03)); }` (D-04).
3. `#submission-card-ids` gains `max-height: var(--detail-max-height)` (D-05), the existing 14rem token.

### `test/stylesheet.test.ts`

- A new `describe`, "three side effects of the night's fixes mended (VH-243)", three assertions, one per finding.
- Two lines of the VH-241 `describe` changed to pin the new truth, not weakened: "no `scroll-margin`" is now "exactly one `scroll-margin` in the sheet, and the `#main` rule is that declaration alone" (so none on focus, still); the IDs rule, which was "`field-sizing: content` alone", is now "`field-sizing: content` then one `max-height`, nothing else".

## D-03 — the page behind the dialog scrolls

Confirmed before the change, 1280 × 900, dialog open, page at `scrollY` 3657: one wheel gesture up over the dialog (nothing in it to scroll, 560 in 560): page 3657 → 3157. One over the dimmed page: 3157 → 2657. Escape: focus on `#feedback-open`, its top at 1711 px in a 900 px window. As D read it.

### A different mechanism from the one proposed, and why

The task proposed `overscroll-behavior: contain` on `.dialog` plus the root not scrolling (`html:has(dialog[open])` or `:modal`, with `overflow: hidden`). I built the first and replaced the second with the same property on the dialog's dimming. Reasons, each measured:

- `overscroll-behavior: contain` on `.dialog` alone (injected, not yet in the file): the gesture over the dialog was held (3678 → 3678) even though the dialog had nothing to scroll; the gesture over the dimming still moved the page (3678 → 3178). So a second rule is needed, for the dimming.
- Locking the root does cure it, and both selectors match a dialog opened with `showModal()` (`:modal` is the exact one; `[open]` would also match a non-modal `show()`). But it takes the root's scrollbar away. This Mac's scrollbars have no width, so I gave the root a 15 px one for the measurement (`html::-webkit-scrollbar`, injected in my tab only): `clientWidth` 1265 closed → 1280 with the dialog open, `#main`'s left edge 152.5 → 160. The page moves 7.5 px sideways at open and back at close, on every system whose scrollbars have a width (Windows, and a Mac set to always show them).
- `scrollbar-gutter: stable` could not be shown to cure that. With the 15 px bar it reserved the room on an ordinary box (200 px box: 185 px inside, `overflow: hidden` included) but not on the root, with `overflow: hidden` or without (1280 open; a 400 px frame with a short page: 400). That may be the simulated bar rather than Chrome, and I cannot tell which from here. Put on the root at rest it would also narrow a page shorter than its window by the bar's width.
- Making the dimming a scroll container that hands nothing on (`overflow: hidden; overscroll-behavior: contain`) held the gesture over it (3678 → 3678) with the root untouched: no scrollbar goes, so nothing can move sideways on any system, and `clientWidth` cannot change at rest or open. This is also what Chrome's own guidance page for this exact problem recommends, and it advises against root `overflow: hidden` for the layout shift above (`https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/prevent-page-scroll-under-modal-dialog.md.txt`).

The cost: containment on a box with nothing to scroll is a newer Chrome behaviour (it works in the 156 here; the guidance says it cannot be feature-detected). In an older Chrome the dialog still holds a scroll past its end wherever it scrolls inside (the 320 × 568 case), and elsewhere behaves as it did before tonight: no worse. If the orchestrator prefers the root lock, it is one rule, `html:has(dialog:modal) { overflow: hidden; }`, and the test's three "root left to scroll" lines would go; the sideways move then needs a look on a machine with classic scrollbars.

### After, as built

| Window | Reading | Before | After |
| --- | --- | --- | --- |
| 1280 × 900, dark | wheel up over the dialog (560 in 560) | page 3657 → 3157 | 3678 → 3678 |
| | wheel down over the dialog, wheel up over the dimming at the left, below the dialog, down at the right | page 3157 → 2657 (one gesture) | 3678 throughout |
| | Escape | focus on `#feedback-open` at 1711 px of 900 | focus on `#feedback-open` at 711 px, `scrollY` 3678 |
| | wheel after closing | — | page 3678 → 3178: the page scrolls again |
| 1280 × 900, light, details open (dialog 16–884, 867 in 866) | wheel up at the dialog's top; two long gestures down over the details pane; wheel up over the dimming | (D: 3099 → 2599 → 2099) | details pane scrolled to its end (451 of 451), dialog at 1 of 1, page 3678 throughout; Escape: opener at 711 |
| 320 × 568, dark (dialog 16–552, 622 in 534) | wheel down over the dialog | (D: dialog 43 → 0, then page 4388 → 3888) | dialog 0 → 88, its end; page 5088 |
| | wheel down again, at its end | | dialog 88, page 5088; Close at 454–498 |
| | wheel up twice | | dialog 88 → 0, then 0; page 5088 |
| | wheel over the 16 px of dimming at the left and at the foot | | page 5088 |
| | Escape | (D: opener at 854 px of 568) | opener at 354 px of 568, `scrollY` 5088 |
| 375 × 812 (dialog 16–640, no scroll) | open and close by script | | `scrollY` 4430 before, open and after; focus back on the opener at 619 |

- Scroll position kept on open and close: yes at all four sizes (3678, 3678, 5088, 4430).
- `document.documentElement.clientWidth`, dialog closed, before and after the change: 1280 and 1280 at 1280; 375 and 375 at 375; 320 and 320 at 320; and the same with the dialog open. The root has no new declaration, so on a system with classic scrollbars nothing changes either; that follows from the rules, it was not rendered.
- The dialog still scrolls inside at 320 × 568 (0 → 88 → 0), and the details pane inside it still scrolls.
- The dimming: computed `background-color` unchanged, `color(srgb 0.063 0.149 0.231 / 0.6)`, `position: fixed`, `inset: 0`, in light and in dark; a screenshot in each shows the whole window dimmed and the dialog as before. `overflow: hidden` on it changes nothing drawn.
- Keys: with focus on Close, Page Down, Arrow Up × 3 and Home did not move the page before the change (2000 → 2000), so the keyboard was never a route.

Not read: a touch flick (the pane sends a wheel, not a touch); the rule is the same property a touch scroll obeys. Dragging the page's own scrollbar while the dialog is open still moves the page, as before; that is a deliberate act and not what D reported.

## D-04 — 8 px of the header band above the title after the skip link

| Window | Reading | Before | After |
| --- | --- | --- | --- |
| 1280 × 900 | skip link focused, Return: `scrollY`, `#main`'s top, the band's bottom | 79, 8, 8 | 87, 0, 0 |
| 375 × 812 | the same | (not read before) | 179, 0, 0 |

A negative `scroll-margin-top` behaves in Chrome 156: computed `-8px`, and the jump lands `#main` at 0. It is the only element in the page with a scroll margin (every element checked: one, `main`). The next Tab after the jump goes to `#about-help-button`, at 32–76.

The inset's purpose kept, 375 × 812, each control put 11 px past the edge and focused:

| Control | Top edge: room left | Bottom edge: room left |
| --- | --- | --- |
| `#about-help-button` (the first in `#main`) | 8.0 | (page top, not reachable) |
| `#trim-start` | 7.8 | 8.2 |
| `#trim-end` | 7.8 | 8.2 |
| Video type, Staff radio | 8.0 | (not reachable) |
| `#feedback-open` | (not reachable) | 8.2 |

The ring is 2 px + 2 px, so it is whole with about 4 px to spare, as D read before the change (7.8 px least). A scroll margin applies to the box being scrolled to, so one on `#main` cannot reach a control inside it.

Seen while reading this, not from tonight's rules and not mended: the student IDs box, a textarea, is not brought clear of the edge when focused. With its bottom 10.8 px below the window's bottom edge, a real Tab into it left it there (−10.8), and from above the top edge it came to −7.7: Chrome scrolls a textarea by its caret, not its box. The same with `max-height: none` and with `field-sizing` off, so it predates VH-241 and VH-243. A wish line, if the orchestrator agrees: "the IDs box's ring can be cut at the window's edge when it is tabbed to there".

## D-05 — the student IDs box has no greatest height

`max-height: var(--detail-max-height)`: 14rem, 224 px at the default font. Past it the box scrolls inside (computed `overflow-y: auto`, the textarea's own). Each cell: box height, then px hidden below (`scrollHeight` − `clientHeight`).

| Window, font | 0 and 1 line | 8 lines | 9 lines | 40 lines |
| --- | --- | --- | --- | --- |
| 1280, before | 128, 0 | 218, 0 | 242, 0 | 986, 0 |
| 1280, 16 px | 128, 0 | 218, 0 | 224, 18 | 224, 762 |
| 1280, 16 px, text spacing | | 218, 0 | 224, 18 | 224, 762 |
| 1280, 32 px | | 434, 0 | 448, 34 | 448, 1522 |
| 1280, 32 px, text spacing | | 434, 0 | 448, 34 | 448, 1522 |
| 640, 32 px (the layout's least width, 20rem) | | 434, 0 | 448, 34 | 448, 1522 |
| 640, 32 px, text spacing | | 434, 0 | 448, 34 | 448, 1522 |
| 320, 16 px | 128, 0 | 218, 0 | 224, 18 | 224, 762 |
| 320, 16 px, text spacing | | 218, 0 | 224, 18 | 224, 762 |
| 320, 32 px | | 448, 370 | 448, 466 | 448, 3442 |
| 320, 32 px, text spacing | | 448, 754 | 448, 898 | 448, 5362 |

- Step 6's top at 1280: 3283 with the box empty, 3373 with 8 lines, 3379 with 9 and with 40. Before, 40 lines moved it 858 px (3262 → 4120); now 96 px at most.
- Eight IDs one per line all show at the default font and at a 32 px default font, with and without the text-spacing style (line height 1.5, letter spacing 0.12em, word spacing 0.16em, paragraph space 2em), down to the layout's least width of 20rem. Eight lines with the invalid field's 2 px border: 220 px, nothing hidden. Eight IDs in full-width digits: 218 px, nothing hidden, at 640 and 320.
- What does not all show: at 320 px wide with a 32 px default font, a window half the layout's least width (10rem), the box is 126 px wide and each 8-digit ID wraps to two lines (three with text spacing), so eight IDs need 818 px (1202 px) and the 448 px box shows four of them (under three), the rest by scrolling inside. No existing token is tall enough for that case (`--log-max-height`, 18rem, is 576 px there), and none should be: it is the pasted-list height the finding is about.
- The "32 px default font" was made with `html { font-size: 32px }` injected in my tab; the browser's own setting was not changed.
- One consequence to know: the box's resize handle (`resize: vertical`, as on every `.textarea`) now stops at the same 14rem.

## Tests

`test/stylesheet.test.ts`, the VH-243 `describe`:

1. "stops a scroll past the dialog's end, or over the dimmed page, from moving the page behind": `.dialog` has `overflow: auto` then `overscroll-behavior: contain`; `.dialog::backdrop` has `overflow: hidden` then `overscroll-behavior: contain`; the property appears twice in the sheet; `html` has no `overflow`, no root rule names `[open]` or `:modal`, and there is no `scrollbar-gutter`.
2. "rests the skip link's target at the window's top, by the step the scroll inset takes": the token is read from `html`'s `scroll-padding-block`, and `#main`'s whole rule is `scroll-margin-top: calc(-1 * <that token>)`; `#main` is named once.
3. "gives the student IDs box a ceiling eight lines fit under, and scrolls it inside past that": the `max-height` is `var(--detail-max-height)`, the token is 14rem, the textarea's padding is the step the sum rests on, and neither rule sets `overflow`.

Each shown to fail on revert, in a copy of the test, the page and the stylesheets in the scratchpad (the working tree's `app.css` was not reverted, so the other builder's tab never saw it):

| Change to the copy | Result |
| --- | --- |
| as built | 77 passed |
| `.dialog`'s `overscroll-behavior` removed | 1 failed (assertion 1) |
| the dimming's two declarations removed | 1 failed (assertion 1) |
| the `#main` rule removed | 2 failed (assertion 2, and VH-241's scroll inset) |
| the IDs box's `max-height` removed | 2 failed (assertion 3, and VH-241's IDs box) |
| the root locked instead (`html:has(dialog:modal)`) | 1 failed (assertion 1) |
| a `scroll-margin` added on `:focus-visible` | 1 failed (VH-241's scroll inset) |

## Commands run

- `npx vitest run test/stylesheet.test.ts test/contrast.test.ts`: 2 files, 185 tests, all passed.
- `npx vitest run test/stylesheet.test.ts test/contrast.test.ts test/screen-text.test.ts`: 294 passed, 6 failed, all six in `test/screen-text.test.ts` and none of them mine: three read `index.html`'s default markup (Announce progress, the closing defaults, the Video type default) and three read `src/main.ts`'s height-hold wiring, the two files the other builder had part-edited at the time (the page itself threw "releaseCheckRoom is not defined" for a while). They need running again once that builder has finished.
- `npx eslint test/stylesheet.test.ts`: clean.
- `npm run typecheck`: clean (run at the end, over the tree as it then stood, the other builder's edits included).
- The three test files run again at the end: the same 294 passed and 6 failed.

## Not done, and why

- The root is not locked while the dialog is open (see D-03 above): it moves the page sideways where scrollbars have a width, and the cure for that could not be shown to work here.
- No token added.
- The IDs box's ring at the window's edge (above): seen, not from these rules, left for a wish line.

## Only a person or the full walk can read

- A touch flick past the dialog's end and over the dimming, on a real phone.
- The dialog on a machine with classic scrollbars (Windows, or a Mac set to always show them): nothing should move sideways, since the root's scrollbar stays; and the page's own scrollbar remains draggable behind the dimming.
- An older Chrome (before containment applied to a box with nothing to scroll): expected to behave as before tonight on a wide window, and to be mended at 320 × 568.
- A real browser default font of 32 px, rather than the injected one.

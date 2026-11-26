<!-- markdownlint-disable -->

# VH-219 #1 — Claude's design reading (saved before Codex's answer is opened)

## The state of the base, by arithmetic, the before measures it

VH-209's query (`max-width: 19.99rem`) already gives room: at 32 px the column is 254 px at 320 and 335 px at 401, up from VH-189's 20 to 101. Each `.field` has basis 12rem and `min-width: 0`, so each takes a line; each label is above (`.label` is block; `.field--wide` puts the "?" beside "Plays over"). So the item's "room" and "gutters" are done by VH-209, to be read, not redone. What is left is the lane: at 320 px, 254 − 2 border − 24 left − 80 right = 148 px; English's onset is 304 px on one line (VH-189). No token padding gets 304 into 254, so **no single-line remedy exists at 401 and below**. Measured on a static page in this Chrome (156): a native `appearance: none` select with `white-space: normal` wraps its closed text and its box grows, 56 to 132 px, three lines, nothing clipped.

## The change: CSS only, `src/styles/app.css`, no element, string or token value

```css
.select { …; white-space: normal; }           /* everywhere: wraps only what would clip */

@media (max-width: 19.99rem) {                 /* the existing query */
  .select { padding-left: var(--spacing-03); padding-right: var(--spacing-06); }
  .select-wrap::after { right: var(--spacing-03); }
}
```

- **`white-space` unscoped.** It does nothing while the text fits, so the default font's reading stays; a query would miss what it doesn't name (the spacing mode at the default font on a phone, a 20 px font, an Xerte frame). Only two `.select`s exist, both in step 4.
- **The lane in the query, not everywhere.** 19.99rem holds at 32 px from 639 px down and never at the default font at 320 (20rem), so the default-font padding is unmoved. Lane at 320 becomes 252 − 16 − 48 = 188 px, 148 before; arrow's box right edge 16 px, about 13 px clear of text.
- **No `overflow-wrap`.** Malay's and English's longest words are about 120 px at 32 px, under 188 even in spacing mode; the before's reader states it. Add only if measured.
- **Never a smaller font, never a custom control** (`appearance: base-select` is not used).
- **The list.** A native list isn't in the DOM; `white-space` doesn't reach Chrome's macOS menu. Headless, no reading exists. Options' widths against the column read by canvas and stated. Opening it on a real device is named as what only a person verifies.

## The cells: 5,184 a side

S-111, S-112, S-113 × both types × four closings × 1280, 640, 401, 400, 375, 320 × 3 languages × 12 modes (light, dark, forced-light, forced-dark, each at default font, 32 px, spacing) = 3 × 2 × 4 × 6 × 3 × 12 = **5,184**, in 8 groups of 648, by type and closing.

- **"Both types" read as Staff video and Student submission,** the switch above the closing ("both switch positions", VH-143). The record has no other pair of types here. Named in the table's notes.
- **"Every closing":** the type select's Cut, Fade, Slide and No closing graphics. Colour and Internal use only don't touch either select's lane, read in the first cell by height, stated as a note. Every option of both selects is read in every cell regardless, so the closed text of each option is read, including the type not chosen.
- **S-112 at 1280 and 640, S-113 at 400 and 375, S-113 outside 32 px:** the scenarios' `views` bound their own plans; the item's matrix doesn't. The state is reachable, so they're walked; a `views` limit is no "can't reach". S-112's first row (`beside at 401, by the label at 400 and below`) is expected to report at 1280 and 640 as not its view; reported alike each side.
- **Cells a state can't reach:** none expected; any found named with how I know.
- **Staged in the driver's memory, as VH-218's S-82 variants:** `S-111-staff-cut` etc., spreading the scenario, the setup wrapped so `w.select('#closing-type','fade')` chooses the kind (the walker's `chooseKind`) and then this closing; the state tightened to that kind and closing. `views` dropped. `matrix.mjs` unchanged, revision `fe44891d3c53f716`.

## The reader, in each cell, read-only

For both selects, each option in turn (`selectedIndex` set and restored in the reader, no event fired, the value checked after): the UA block inside the select, by CDP's `DOM.describeNode` with `pierce` and `Runtime.callFunctionOn`: its `scrollWidth`/`clientWidth`, a Range's lines and right edge, against the lane and the arrow; the select's height; so **clipped** is a measurement and not canvas arithmetic. Also canvas width of each option, as S-111's row reads it. And: rects of the select, the "?" and each step-4 field against the control grid, label above select, target sizes, the `aria-label`, each label's `for`, document overflow, mode read (font px, forced, dark, spacing).

Rings and names: the walker's own `focus:` instrument at `#closing-type`, `#closing-onset`, `#onset-help-button`; S-111's accessible-name row.

## What moves, and what will read as failing

- **Moves:** at 32 px, ≤401 px: select height (2–3 lines), lane, arrow. Options clipped to 0, expected, in every cell; at the default font with spacing at 320/375 any clip to 0.
- **Stays:** default font, no spacing: every rect, as text fits one line (reader proves). 1280 and 640 at 32 px: lane unchanged, 20rem not below 19.99rem.
- **Walker rows that will say the wrong thing:** S-111's and S-112's "every option inside its select's room" and S-113's "options clipped" read a one-line canvas width against the lane, blind to wrapping: they keep failing at 32 px and ≤401 px after the fix though nothing clips. Reported, not edited: a walker change is the owner's stop. Wish line for it, its claim about VH-203 checked by loading the plan.

## WCAG

1.3.1: native select, label association untouched. 1.4.4, 1.4.10: no loss, no sideways scroll; better. 1.4.8: left-aligned, wrapped at spaces; a 3-line select at 32 px is taller, not worse. 1.4.12: wrapping absorbs spacing, the case single-line lanes can't. 2.4.13: the ring follows the box, read by the instrument. 2.5.5: min-height stays 44; the box only grows.

## Risks

- **A tall closed select reads as a text box:** the arrow is still centred, the border still there; design judged by the walker's shots at the default size only, since 32 px page shots show the default size (VH-217.5), so 32 px layouts are probed, and any visual look comes from a one-off emulated shot, labelled so.
- **`select` line-height:** `.select` has `--line-height-body`, unchanged.
- **Records' size:** VH-218's folder was 7 MB for 864 cells; this table's would be about 85 MB. Ask my orchestrator at the count check.

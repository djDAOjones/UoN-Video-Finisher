<!-- markdownlint-disable -->

# VH-237 — Claude's design

Saved 2026-11-09 before Codex astra's blind design was opened (Codex started 14:31:02Z). Base `8bbb6e9`; the readings below are arithmetic from the stylesheet and Arial's metrics, to be proved by route (1')'s probes on the base and after.

**The font.** `--font-body` is `Arial, system-ui, …` and, under `[lang]:lang(zh)`, `Arial, var(--font-cjk)` (`src/styles/tokens.brand.css:84`, `:147`): the `li`'s primary font, and so its strut, is Arial in en-GB, zh-Hans and ms-MY alike; the CJK glyphs fall back, and with a fixed `line-height` (1.5) each inline box takes its height from the primary font. Arial: ascent 0.905 em, descent 0.212 em, cap height 0.716 em, x-height 0.519 em.

## (a) The "?" on its line

**Target: the square's centre on the centre of the `li`'s capitals** (Arial's "H", the same in all three languages). An icon beside words reads centred when it is centred on their capitals; under `middle` (CSS 2.2, 10.8.1) the square's centre sits half the x-height above the baseline, 4.15 px at 16 px, so it reaches 5.85 px below the baseline and only 2.7 px above the capitals: it reads low, the owner's word.

**Declarations,** in `.promise-with-help .help-button`: `vertical-align: middle` becomes `vertical-align: top`, and `margin-top: var(--spacing-01)` is added. `top` aligns the top of the aligned subtree, for this atomic inline-flex its margin box, with the top of the line box (10.8.1); the margin box is 0.125rem + 1.25rem, so the square lies 0.125rem below the line box's top and, the line being 1.5 × 1rem, 0.125rem above its bottom: centred in the line box at any root size (2 px at 16 px, 4 px at 32 px), `--spacing-01` being exactly (1.5 − 1.25) / 2 rem. With Arial and a 1.5 line, the line box's centre is (0.905 − 0.212) / 2 = 0.3465 em above the baseline and the capitals' centre 0.358 em: 0.18 px apart at 16 px and 0.37 px at 32 px, inside the 0.5 px and 1 px criteria. Predicted: the square up about 1.4 px at 16 px (2.8 at 32), now 3.95 px above the capitals and 4.3 px below the baseline.

**The row kept.** A `top`-aligned box takes no part in the baseline-aligned subtree; the line box is the taller of the strut's 24 px and the 22 px margin box, so 24 px (48 at 32 px), and the promise stays a whole number of lines, open included. Wrapped onto a line of its own, the "?" is centred in that line by the same rule (the strut still sets the line).

**Rejected:** `middle` with a `margin-bottom` (it needs cap less x-height, 3.15 px, no token; `--spacing-01` leaves 0.58 px); a length on `vertical-align` (the `cap` unit or a number: a literal); `baseline` (the "?" glyph on the words' baseline: still 1.75 px low against the capitals, and tied to the button's own line height); `text-top` and `text-bottom` (anchored to the content area: low).

**History.** `vertical-align: middle` came with VH-196 (`28db91e`, `git log -S`); VH-205's entry (2026-10-27) records the square at `--control-size`, every promise 24 px and the tip's step down `--spacing-04` clearing the target, all kept; VH-217's Closes records the gap `--spacing-02`, horizontal, untouched. Neither entry records `middle`. **Supersedes: none.**

## (b) Equal space above and below the opened box

**The pair: line box to border, each side**: above, from the bottom of the last line box of the fourth promise (the "?"'s line) to the box's top border edge; below, from its bottom border edge to the top of the fifth promise's first line box. **Token: `--spacing-04` both sides**: `margin-bottom: var(--spacing-04)` added in `.promise-with-help .toggletip`, its `margin-top: var(--spacing-04)` kept (VH-205's step down). The bottom margin collapses through `.promise-help` and the `li` (no border or padding) with the fifth `li`'s zero top margin: 12 px each side at 16 px, 24 at 32, equal by construction. Closed, `hidden` removes the box and its margins: nothing moves.

**The ink pair, read, not the criterion** (Arial, 16 px): above, the line's bottom lies 6.45 px under the baseline, so 18.45 px from the words' baseline to the border (about 14.3 from the square's bottom after (a)); below, 12 + 3.06 (half the leading) + 3.03 (ascent less cap height) = 18.1 px to the next capitals: 0.36 px apart.

**The target still cleared after (a):** its bottom at the square's centre plus 22 px = line top + 12 + 22 = 34 px; the box's top at 24 + 12 = 36 px: 2 px clear (before, 0.65 px, VH-205's reading). At 32 px: 24 + 22 = 46 against 48 + 24 = 72.

## (c) The box within the text measure

**Why it overshoots:** the box is a block inside the fourth `li`; `li` takes `max-width: var(--measure)` (`:36`–`:40`) and begins at the list's indent (`.promises`, `padding-left: var(--spacing-06)`), so the box is 448 px wide from the column's left + 24 and ends 24 px past the privacy paragraph, whose own `max-width: var(--measure)` starts at the column's left.

**Declaration,** in `.promise-with-help .toggletip`: `max-width: calc(var(--measure) - var(--spacing-06));`, the `calc(var(--a) - var(--b))` form the stylesheet already uses (`:1533`), on `border-box` sizing (`:12`). At w1280: 424 px at 16 px and 848 px at 32 px, the right edge exactly on the measure (the privacy paragraph's right edge). At w320, where the column is narrower than the measure, the `li` is narrower than the cap, so the box keeps the `li`'s width and ends on the column's right, as the privacy paragraph does. It can only narrow the box: no overflow added. **Rejected:** `margin-right: var(--spacing-06)` (it would also pull the box 24 px short of the column at w320, against the text above it). The left edge is the `li`'s content edge, on the promise's words, unchanged.

**Not this item's:** the other promises' text measure also starts at the list's indent, so a promise line longer than 424 px would end past the privacy paragraph; if the readings show one, it is a finding for the orchestrator, not a change here.

## (d) The method

As the item fixes it, in `$WK/format-help-d.mjs` (VH-234's `format-help-c.mjs` with the probe readings added): zero-size `inline-block` probes with `vertical-align` `baseline` (its bottom on the baseline), `top` and `bottom`; a `top` probe first in the fourth `li` (inserted after its leading white space, before the `span`, so no space is rendered); a set inside the `span` after the last non-space character; a set after the button; a set first in the fifth `li`; a set after the first promise's last word. The CSS x-height and cap height read as computed lengths on the first probe (`scroll-margin-top: 1ex`, `scroll-margin-bottom: 1cap`, properties that lay nothing out); the ink by canvas `measureText` in the computed font (content area, "H" and "x" ink, each promise run's own ink); the "?" glyph's baseline from its character's box plus the button font's content ascent, a glyph reading, never a line box. Every box of the lede, the scroll and the document's width read before, during and after: equal, or the reading fails. **Validation on the base,** within 0.25 px (16 px) and 0.5 px (32 px), all 192 states: the first promise's line box equal to the computed `line-height`; its baseline at half the leading plus the content ascent below its top; where the words and the "?" share a line, their two sets equal; the square's centre at the baseline less half the CSS x-height (`middle`). A failing probe is revised and route (1') re-walked on the base before any change. **Risks:** zero-width boxes add soft wrap opportunities but no width, so no break moves (guarded by the equal-boxes check); the "?" set after the button reads its line when it wraps.

## (e) The owner's width

Agreed: at the 16 px root `--layout-width` (60rem) caps `.main` at 960 px, so every window above it lays the column out alike and w1280 stands for theirs (their window about 1280 to 1500 px). At 32 px the cap is 1920 px and w1280 is not capped: no equivalence is claimed; w1280 and w320 are walked as they are.

## Tests, risks, the rest

- **Tests,** one `it` in the VH-205 describe: the "?"'s block has `vertical-align: top` and `margin-top: var(--spacing-01)` and no `middle`; the tip's block has `margin-top` and `margin-bottom: var(--spacing-04)` and `max-width: calc(var(--measure) - var(--spacing-06))`. VH-234's `it` and "one type set" unchanged.
- **Forced colours:** no colour declaration moves. **Text spacing (1.4.12):** the override's line height is 1.5, ours; a larger user line height would leave the square 0.125rem under the line's top, still on its line, nothing clipped. **Reduced motion:** nothing animates.
- **Nothing outside the two blocks** is needed; no word, element, attribute or token.

## Addendum, 14:4xZ, on the probe trial `p0` (the base, en-GB and zh-Hans, w320, light and 32 px, 16 states; before b1 and any change to `src/`)

The probes work: every box and line equal with and without them, the square's centre at the baseline less half the CSS x-height within 0.01 px (`middle` proved), the line boxes exactly the computed `line-height`. One reading differs from the arithmetic above: Chrome rounds the content metrics (Arial at 16 px: ascent 14, descent 3) and floors the half leading to the whole pixel above the baseline, so the 24 px line box runs from 17 px above the baseline to 7 px below (at 32 px, 35 above and 13 below, exact). The line box's centre is then 0.73 px under the capitals' centre at 16 px (0.45 at 32): `margin-top: var(--spacing-01)` would miss the 0.5 px criterion at 16 px. **Revised declaration:** `vertical-align: top; margin-top: calc(var(--spacing-01) - var(--border-width));` (the `calc(var(--a) - var(--b))` form at `:1533`; `--border-width` is 1px): the square's top 1 px under the line's top at 16 px (3 px at 32), its centre 0.275 px above the capitals' centre at 16 px and 0.55 px above at 32, inside 0.5 and 1 px; the margin box 21 px (43 px) inside the 24 px (48 px) line, so the row is kept; the target's bottom 33 px under the line's top against the box's 36: 3 px clear. The target stays the capitals' centre. The validation's baseline equation takes Chrome's split: the baseline at the half leading, floored, plus the content ascent, below the line's top.

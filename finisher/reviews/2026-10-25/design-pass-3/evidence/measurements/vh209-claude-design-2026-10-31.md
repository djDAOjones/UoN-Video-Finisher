<!-- markdownlint-disable -->

# VH-209 — Claude's design reading (saved before Codex's design answer is opened)

Saved 2026-10-31, on base 92eaf65, from the item, the owner's words, `src/styles/app.css` and a read-only probe (`vh209-walk/probe-design2`: S-113's six records, closed and with the title's "?" open; AC, mode 2; no change to `src/`).

## The cause, measured
At the 32 px font every inset doubles and the window does not. Page inset 48 + panel border 1 + panel padding 48: the panel's column is 126 px at 320 and 207 px at 401 (97..223, 97..304). A word at the compact size is 110 to 135 px ("Malaysia", "permulaan", "submission"), a control's padding is 64 to 96 px on top. So **wrapping alone cannot contain them at 320 px**: "permulaan" (122 px) + the button's padding (96) + borders = 220 > 126; "Malaysia" + the segment's 64 = 176 > 126; the colour's face (swatch 64 + gap 16 + word 71 + padding 64) = 216 is wider than the column by itself. The only other way is breaking inside the word at nearly every control ("Malaysi/a", "permulaa/n") with most of the column spent on padding.

The probe also finds more than V-50 lists, past the window in zh-Hans w320 (`.radio-label`, its detail, 161..324) and past the column but not the window in several places (B6's names and details; "Create the video"; "Use the whole video"; "Internal use only"; "Plays over"; the system check's heading in Malay).

## The principle
Every offender is in a window narrower than 20rem. At exactly 20rem (320 px at 16 px, 640 px at 32 px) the page is the 320 px default layout scaled, which passes. So one media query, `(max-width: 19.99rem)`, fires only where a large font has made the window narrower than the layout's own minimum: never at the default font at 320 px or wider, at any zoom; so "Nothing else moves" holds by construction, and the walks confirm it. rem follows the browser's font in a media query, as `25rem` does (S-113's first row).

## The rules: one `@media` block in `src/styles/app.css`, after the rules it overrides, before the type roles
1. **The insets give way.** `.band-inner`, `.band--header .band-inner`, `.main`: `padding-inline: var(--spacing-03)`, all three so the logo and the title keep one edge (V-36) and the logo keeps more than its 12 px clear space. `.panel`: `padding-inline: var(--spacing-03)`; `.system-check > .disclosure-summary` and `.statement > .disclosure-summary`: `margin-inline: calc(-1 * var(--spacing-03)); padding-inline: var(--spacing-03)`, so the bar stays edge to edge. Inline only; vertical rhythm unchanged. Column: 254 px at 320, 335 at 401.
2. **The switchers' segments shrink.** `.language-switcher .segment, .video-kind .segment, .video-language .segment`: `flex: 0 1 auto` in place of `flex: none`, so a segment wider than its line wraps its words. `.segment-face`: `text-align: center`, so wrapped words stay centred as one line is. No switcher moves; the order and the wrap are as now.
3. **The closing colour stacks.** `#closing-colour .segments`: `flex-direction: column`; second face: `border-left` restored by the existing tokens, `border-top: 0`, so the seam stays one hairline. Forced colours: the left-edge rules name the three switchers, so the new left edge needs `ButtonText` / `Highlight` by the same lines or by `border-left-color` inheriting from the face's own rule: to be read in the walk, not assumed. Column, not wrap: in Chinese the min-content is one glyph, so `flex-wrap` would not trigger.
4. **The Set buttons shrink.** `.trim-time-row .button`: `flex: 0 1 auto`, in place of `.control-with-help .button`'s `flex: none`, in this row only; onset's "?" keeps its `flex: none`.
5. **A heading's long word breaks.** `.system-check > .disclosure-summary h2, .statement > .disclosure-summary h2`: `min-width: 0; overflow-wrap: break-word`. "kebolehcapaian" at the heading size is 295 px, against about 281 at 401 and 200 at 320: it must break. Words only ever break there.

`test/stylesheet.test.ts` pins each rule, and that no rule of the block escapes the query.

## What it does not do
No element, control, string or token value; no move of a switcher. `--spacing-03` is an existing token; the breakpoint is a media prelude, which the literal check exempts. Step 4's selects gain room but stay VH-219's: their `found` row will move, reported, not claimed fixed. V-48's record is re-read, not fixed. Wish VH-229.3: the title's column grows from 224 to 288 px, so Malay's break at 320 px and 32 px may go; if so, say so in the table.

## The judgement to state
The criterion names "wrapping, `min-width: 0`, a shrinking flex or grid track"; rule 1 is a fourth means, an inset giving way, not named there. The Intent's bound is "CSS only, with the existing tokens; no element, no move of the switchers and no rewording", which it keeps. I read the parenthesis as examples, since wrapping alone cannot do it without breaking most words at 320 px. The alternative: keep the insets, and take the controls' own padding and break words inside controls: a 126 px column with words split. It reports its own limits, and I reject it. If the owner reads the parenthesis as a closed list, this is the point to ask.

## The walks, both sides, on base and on the build
`six`: V-18's six by `rings-179.mjs v18`. `f32`: S-113 at w1280, w640, w401, w400, w375, w320 × 3 languages × font32, dark-font32, forced-light-font32, forced-dark-font32 (72; w375 stated unreached). `pages32`: S-03, S-15, S-119 at w401, w320 × 3 × the same four (72). `def-a`: S-03, S-15 at w1280, w401, w320 × 3 × light, dark, forced-light, forced-dark (72). `def-b`: S-119, S-83 at the same (72); S-111 at w1280 and S-112 at w401, w320 (36). `open`: S-03 and S-113, the title's "?" pressed, w320, w401, font32, 3 languages (12), with the containment reading.

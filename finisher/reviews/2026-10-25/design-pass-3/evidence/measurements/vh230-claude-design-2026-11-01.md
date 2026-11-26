<!-- markdownlint-disable -->

# VH-230 — Claude's design reading, saved before Codex's answer is opened

**The defect.** The System check's mark column is `--mark-width`, 1.5 rem. Readings from VH-218's table and locale files: `Tidak` 36.33 px default, 44.73 spacing, 72.64 at 32 px; `好的` 28, 31.38, 56; `OK` 24.38 under spacing; `……` unmeasured, by arithmetic two ideographic-width glyphs, so 28 and about 31.4. Every mark in the walk: en-GB OK, No, !, …; zh-Hans 好的, 不, !, ……; ms-MY OK, Tidak, !, ….

**The width each needs, in rem.** All scale with the root, so the widest is 44.73 / 16 = 2.796 rem; at 32 px, 72.64 / 32 = 2.27 rem without the spacing sheet. So the column must be at least 2.8 rem.

**The other caller.** `src/acceptance/main.ts` imports `app.css` and builds `li.check` rows outside any `.system-check`, on the base grid at `app.css:320`, reading `--mark-width`. Its marks are PASS, FAIL, NEEDS A PERSON, CHECKED ELSEWHERE: they break in that column today (by width, not yet measured), and a rise to 3 rem would change that page without curing it. So the first of the item's two remedies, changing `--mark-width`'s value, reaches a page the criteria don't name.

**Choice: the second remedy, add a token.** In `tokens.carbon.css`, beside `--mark-width`: `--mark-width-words: 3rem`, read by the three `.system-check .check` declarations that now read `--mark-width` (padding-inline-start, width, negative margin). Every row in every language gets the same gutter, so labels stay aligned down the list. `--mark-width` keeps its value and now serves the base grid alone. Acceptance is unmoved by construction: it matches no `.system-check` rule and reads no changed value; prove it by one live reading on each side.

**Why 3 rem.** 2.8 rem would leave 0.07 px; 3 rem leaves 3.27 px under the spacing sheet and equals the scale's `--spacing-09`, so the gutter stays on the grid. The literal lives in the token file, as the rule asks.

**What it costs.** Each label loses 24 px at the default font, 48 at 32 px on 1280. By VH-218's records: 320 px default row 222, label 182 to 158, longest word 98.72 (`Pemprosesan`); spacing 119.84, still inside. 1280 px at 32 px: 856 to 768, longest 197.44. At 32 px on a phone the mark has its own line and the hanging padding is 0 (the 19.99rem query), so nothing moves there. So no label word should break. Some value that sat beside its label at 320 or 375 will move beneath it: that is VH-218's wrapping doing its job, counted and reported as a finding, not designed away. en-GB's "OK" sits in a wider gutter than it needs, the price of one column for all three languages.

**Rejected.**
- `--mark-width: 3rem` for every caller: reaches acceptance.
- `.system-check { --mark-width: 3rem }`, a rebinding: a literal outside the token file. With `var(--spacing-09)` it has no literal and is one line, a true third; a named token says what the width is for, so I prefer the token, and it is a remedy the item names.
- A width per language by `:lang()`: en-GB gets 1.6 rem, Malay 3; three values for 24 px, and each new language or string re-opens it.
- A `max-content` column by subgrid: needs a wrapper or undoes VH-218's flex row, and the column would jump as states change.
- Each mark at its own width: labels misalign row to row.
- `white-space: nowrap` on the mark: not in the design. Nothing in the matrix would exercise it once the column fits; the width is the remedy, and nowrap alone would overlap the label by 4.73 px under spacing. A point Codex may judge.

**What stays.** DOM order, words, the marks' colour and type role, the base `.check` grid, the 19.99rem query, S-103's `.facts` (no mark, no `--mark-width`; checked by `grep -n 'mark-width' src/styles/*.css`: only `app.css` lines 320, 362, 367, 368 and the token).

**The walk.** VH-218's S-82 driver copied; one added reading inside its `read()`: the whole mark's text by a Range, lines, summed width, its right edge against its column, its gap to the label, so `……` is measured. 432 cells a side, the before on clean base. Plus one small live reading of the acceptance page's `.check` each side.

**Standards.** Carbon: two token systems, never collapsed: the new token is shape, in `tokens.carbon.css`, no colour. WCAG 1.4.10: no sideways scroll, read by overflow; 1.4.12: the spacing sheet loses nothing, the mark whole under it. Contrast unchanged, no colour touched. 44 px targets: the marks aren't controls.

<!-- markdownlint-disable -->

# VH-237 — The design compare, Claude and Codex astra

Claude's design saved 14:32:14Z (`vh237-claude-design.md`, b94302f0); Codex's `design` started 14:31:02Z from its saved brief (4a1b312a), exited 14:34:03Z, opened 14:34:05Z, after Claude's was saved.

**Agreed**
- (b) The pair: line box to border each side, the "?"'s last line box to the box's top border and its bottom border to the fifth promise's first line box; `--spacing-04` both sides, `margin-bottom: var(--spacing-04)` added, VH-205's top step kept; 12/12 px at 16 px, 24/24 at 32; the ink pair not promised equal.
- (c) The cause (the `li`'s measure starts at the list's indent) and the declaration, word for word: `max-width: calc(var(--measure) - var(--spacing-06))` in `.promise-with-help .toggletip`, on `border-box`; 424 / 848 px at w1280, the `li`'s width at w320.
- (d) The probe method, with the base's validation and its tolerances; CSS `1ex` kept apart from the canvas ink.
- (e) w1280 stands for the owner's window at 16 px; no general equivalence at 32 px.
- Supersedes none: VH-196's and VH-205's recorded placements stay true; VH-217's gap and fill and VH-234's role untouched; no block beyond the two; tests inside the VH-205 describe; static tests prove declarations, not geometry.

**Disagreed: (a), the "?"'s target**
- Claude: the square's centre on the `li`'s capitals' centre (Arial "H"), by `vertical-align: top` and `margin-top: var(--spacing-01)`: the square centred in the 24 px line box, 0.18 px from the capitals' centre at 16 px (0.37 at 32); up about 1.4 px; the target cleared by 2 px.
- Codex: the square's top on the `li`'s content-area top, by `vertical-align: text-top` alone; clearance `H/2 − 8` at 16 px.
- **Settled by the evidence, kept as Claude's:** with Arial (content 17.87 px at 16 px, so `t` = 3.06 px), `text-top` puts the square's centre 13.06 px below the line's top against the capitals' centre at 11.82: 1.24 px low, 0.34 px higher than `middle` leaves it, so it would not answer the owner's "a little off"; and its clearance, 0.94 px, is less than half of Claude's 2 px. The base's probes read the content area, the line box and the capitals in every state, so both predictions are checked from b1's records and named in the table; if they contradict this arithmetic, the choice is re-opened before any change to `src/`.

**Codex only, adopted:** the unchanged-layout check widened to each promise's and the privacy paragraph's per-line text rectangles (wrapping and line membership), the fonts' status recorded (`format-help-d.mjs` d6f45ab5, before b1); the pseudo-element's geometry and hit sampling kept as the target reading (route 1's `target`, unchanged); the wrapped "?"'s own row recorded, never compared with the previous line's word; the retained square, target and gap declarations pinned in the test beside the new ones; 1.4.12's wider spacing read by the walker's text-spacing keys.

**Claude only:** the rejected alternatives (`middle` with a margin, a `vertical-align` length, `baseline`, `text-top`); the 32 px arithmetic for the target's clearance; the other promises' measure, which also starts at the list's indent, a finding if a reading shows a promise past the privacy paragraph.

**Addendum, after the probe trial `p0` (14:35Z, on the base):** Chrome floors the half leading (Arial 16 px: the line box 17 px above the baseline, 7 below), so centring the square in the line box would leave it 0.73 px under the capitals' centre at 16 px. Claude's declaration is revised, its target kept: `margin-top: calc(var(--spacing-01) - var(--border-width))` with `vertical-align: top`, predicted 0.275 px (16 px) and 0.55 px (32 px) above the capitals' centre, the row kept, 3 px clear of the target. Codex's `text-top` would leave the centre 1.73 px low at 16 px on these metrics (content top 14 px above the baseline). Both predictions are read from b1's records.

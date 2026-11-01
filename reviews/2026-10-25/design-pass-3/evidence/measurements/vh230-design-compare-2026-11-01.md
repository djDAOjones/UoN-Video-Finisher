<!-- markdownlint-disable -->

# VH-230 — Design compare, Claude's reading against Codex astra's blind check

Claude's reading saved 02:49Z (`vh230-claude-design.md`, sha1 starting `4fa8d5bce733`), before Codex started; Codex's answer written and opened 02:53Z, after it.

**Agreed.**
- The item's second remedy: a new token on `tokens.carbon.css`, read by the three `.system-check .check` declarations (padding, width, negative margin). `--mark-width` and its value stay, for the base grid and the acceptance page.
- Width 3 rem, 48 px, 96 at 32 px: holds `Tidak` 44.73 and 72.64.
- One column for every language and state, for aligned labels; en-GB's whitespace is the price. Rejected a per-language value.
- Two `.check` producers (`src/main.ts`, `src/acceptance/main.ts`) and four `--mark-width` consumers. Acceptance's words break in its 1.5 rem column today and stay so; prove it unmoved live, each side.
- No label word can break: the widest are 98.72, spacing 119.84 and at 32 px 197.44, all inside. Some values move beneath their labels at 320 and 375 px and at 32 px on 1280: VH-218's rule working, reported, not designed away.
- Measure the ellipsis, containment and every row's placement; 432 cells a side; font32 shots prove nothing.

**Codex only.**
- `white-space: nowrap`, scoped to the System check's mark.
- The token's value as `var(--spacing-09)`, and the name `--system-check-mark-width`.
- A list of the values it predicts move beneath. To be checked against the after, not taken.
- A re-check of 1.3.1, 1.4.4 and 1.4.8, and browser zoom.

**Claude only.**
- The rebinding (`.system-check { --mark-width: var(--spacing-09) }`) as a true third, rejected.
- Costs in the row's terms, 182 to 158 at 320 px by VH-218's row width 222 less the gutter and gap; Codex's budgets, 186 to 162, are its calculation. The after's own readings settle it.

**Disagreed: `white-space: nowrap`.** Claude left it out as nothing in the matrix exercises it; Codex adds it. Settled by the arithmetic on the readings, not by preference. With the width alone, the mark breaks once it is 3.27 px wider than the walked widest, 7%, as a wider fallback face could make it. With nowrap, it stays whole and contained until that excess, spills only into the 16 px gap after it, and touches the label at 19.27 px over, by which point the mark would otherwise have broken, the defect this item ends. It is one keyword, no literal, and the walk reads containment apart from lines, so it can't hide a mark that doesn't fit. **Codex's reading adopted.**

**Decided.** Codex's three lines as written: `--system-check-mark-width: var(--spacing-09)` beside `--mark-width`, its comment saying why, the three declarations reading it, and `white-space: nowrap` on `.system-check .check .mark`. The reading to watch: `markWhole.room` at or above 0 in every cell, so a mark is held by its column and not by nowrap alone. No stop: the remedy is one the item names, and neither a new element nor a string.

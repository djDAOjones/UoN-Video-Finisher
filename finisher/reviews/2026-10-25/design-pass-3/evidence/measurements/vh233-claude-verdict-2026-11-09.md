<!-- markdownlint-disable -->

# VH-233: Claude's verdict on the candidate (VH-233 #2)

Saved before Codex astra's blind answer (`vh233-codex-blind.md`, started 01:18:33Z) is opened.

**The candidate:** `src/styles/app.css` +12 (the commented `.statement-body a:focus-visible { outline-offset: 0; }` after `.statement-body li + li`), `test/stylesheet.test.ts` +20 (a `describe` of two `it`s after VH-209's block), against `73d16f0`. **Verdict: commit**, once the ledger is written and the gate, checker and Codex's close check are green.

## The criteria

- **The ring.** Both statement links pass 2.4.13 by the walker's `focusArea` in all 63 cells after (the probe: contact 40 → 63, service 12 → 63; the smallest margin −2,744 → +52 px²). The walker's own focus instrument (the contact link) moves fail → pass in 23 cells, VH-203's 11 among them, and no instrument fails after. 2.4.7: `:focus-visible` true 126 of 126. 1.4.11: the best ratio 8.73 at the lowest, both sides. The captures show why: before, one contour round the wrapped lines, the edges between lines gone (b1 ms-MY w320 light, service); after, one ring per line, apart across the line gap, in light and in forced dark alike.
- **CSS only, on the existing tokens.** One declaration, the offset; width, style and colour from the global ring's tokens; the unitless `0` is a structural zero (the sheet holds many `: 0;` declarations; the "tokens, not literals" test passes). No new token. Scoped by `.statement-body a`, which matches the statement's two links only (the summary holds no link); its specificity (0,2,1) beats the global `:focus-visible` (0,1,0) and leaves the forced-colours `:focus-visible { outline-color: Highlight }` acting, as the probe's colours show (the same in 126 of 126 readings).
- **Nothing else moves.** Unfocused colour, underline, fragments and paragraph identical in 126 of 126; focused fragments identical; 40 cells unmoved and every instrument but focus as before. No word, element, attribute or DOM order; `accessibility-statement.ts` and `index.html` untouched; no `docs/` line. At offset 0 the ring sits at the inline box, outside the glyphs and the underline; between lines it leaves about 3 px (7 px less 2 × 2 px); no capture shows it over text.
- **Tests.** The pin holds the rule present and offset-only, the selector once, and the global and forced-colours rings unchanged; placed after VH-209's block, not at the end.
- **The stage rule.** One revision each side; the before on the base with "app as base: true"; the same driver, probe and scripts; AC, peak load 6.05 and 5.28, no sample at 8 or above; no reading rests on timing beyond the probe's settle waits. VH-203's records cited, never paired; t1 and t2 design evidence only.
- **WCAG for what it touches:** 2.4.13, 2.4.7, 1.4.11 as above; 2.4.11 and 2.4.12 centred (ring in view, centres hit, 126 of 126); 1.3.2, 1.4.4, 1.4.10, 1.4.12, 2.5.8 by the unmoved overflow, measure, type and targets instruments at w320, w375, font32, the zoom proxies and spacing.

## Points

- **The Tab arrival (finding, wish VH-233.1, the orchestrator's ruling):** 7 cells alike both sides where Chrome scrolls the service link's box flush with the viewport's bottom edge; 6 short of area until scrolled. Pre-existing, app-wide, its remedy wider than this item's rule; the criterion is read centred. Named in the table.
- **VH-210.2** reads pass both sides at w1280 forced in the three languages: not paid off by this change; the line stays open, named in the table.
- **The table was generated twice:** the first placement failed markdownlint on two records' Markdown files and was set aside unreviewed (`vh233-table-set-aside-1/`); the second names them `.md.txt`. The readings are the same groups' (b1, a1).
- **Re-reads after landing:** none further: the rule reaches only S-81's links, and this table is that re-read.

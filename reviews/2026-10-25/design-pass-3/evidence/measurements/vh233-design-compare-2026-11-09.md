<!-- markdownlint-disable -->

# VH-233 — the design compare (VH-233 #1)

- Codex astra's `design`: brief `vh233-codex-design-brief.md` (b654b48f), started 00:19:39Z from `$S/vh233`, ended 00:22:01Z; answer `vh233-codex-design.md` (5,585 bytes), **opened 00:41:11Z**.
- Claude's design `vh233-claude-design.md` (dd19cf8f), **saved 00:41:08Z**, before the answer was opened. Claude's reading drew on two design probes on the base, t1 and t2; Codex's brief named neither (it could not run Chrome, and the candidates would have led it).

## Agreed

- **The cause:** adjoining outlines merge. The 17 px fragments sit 7 px apart; the global 2 px offset and 2 px stroke reach 4 px from each, so where the lines overlap horizontally Chrome paints one contour and the inner edges vanish; at w1280 the same fragment sizes sit apart and pass (1,361 of 1,236 against 1,025). Not viewport clipping; the contrast is fine (13.34:1); it is missing area.
- **The remedy:** the statement links' outline offset brought to zero on focus, scoped to those links, offset only, so the global ring's width and colour and the forced-colours `Highlight` rule still apply; dark and the blue band keep their white `--focus`. No layout, wrapping, underline or colour change unfocused.
- **Rejected alike:** `inline-block`, padding or margins (layout), `box-shadow` (forced colours), a wider outline (the same merged contour, and it reaches neighbouring text).
- **The measure:** the walker reads only the first match (`scenarios.mjs` S-81, `matrix.mjs` `instruments`, `qualify.mjs` `querySelector`); a probe outside the walker reads `#statement-enforcement a` with the same keyboard focus and paired pixels at all 63 cells, recording identity, fragments, computed outline, focus state, area, reference, clipping and captures. The fragments' summed strips stay the reference; never the smaller enclosing box.
- **The cells:** the 45 keys and 18 neighbours suffice for an offset-only change if both links are measured throughout.
- **The risk** that offset 0 still merges for the second link: settled by t2 (below). No owner decision needed: in scope, no token, word, element or `docs/` line.

## Codex only

- **The value as `calc(var(--focus-offset) - var(--focus-width))`**, zero on today's tokens, to keep to "token-only" wording. **Not adopted:** it computes to the same 0 and draws the same pixels; Codex itself notes `test/stylesheet.test.ts` exempts a structural zero (the sheet holds 62 `: 0;` declarations). The expression would say "offset less width", which no design means, and would become an inset ring over the text if the two tokens ever differed; `outline-offset: 0` says what is meant, the ring at the link's text box. The ring's width, style and colour still come from the tokens.
- **The selector `#accessibility-statement a:focus-visible`.** **Not adopted:** the same two links (the summary holds no link); the criteria place the rule in the `.statement-body` rules, and the sheet styles by class.
- **Tab and Shift+Tab arrival without centring**, a supplementary reading within the cells. **Adopted:** the probe (now `042b7cb9`) reads, before `focusArea`, the summary focused by keyboard, then Tab, Tab, Shift+Tab by the walker's own keys, recording where focus lands, the ring in the viewport and the fragments' hit tests, with no scroll of its own. t1 and t2 ran the earlier probe (`5c9c0872`); they are design evidence only, never paired with the before or after.

## Claude only

- **The second link fails far more than the first, as built** (t2, 63 cells on the base): the contact link fails 23 (VH-203's 11 and 12 of the 18 neighbours), the service link 51 (zh-Hans and ms-MY wrap it even at w1280).
- **`box-decoration-break: clone`** was tried and does nothing to Chrome's outline (t1, identical areas); **`outline-width: var(--focus-room)`** was tried and still fails the service link over 4–6 lines (t1).
- **The chosen rule measured before building** (t2): `outline-offset: 0` passes both links in all 63 cells, 126 of 126, smallest margin +52 px², every ring inside the viewport and every fragment's centre on its link, `:focus-visible` true, the lowest best ratio 8.73.
- The look is named for the report: these two links' ring drawn against their text box, one ring per line.

## Disagreed

None. The two Codex-only points not adopted are form, not substance: the rendered rule is the same either way, and the reasons are above.

**Settled design:** `.statement-body a:focus-visible { outline-offset: 0; }` in the `.statement-body` block of `src/styles/app.css`, a pin beside the statement's expectations in `test/stylesheet.test.ts`; before and after by the matrix on the 63 keys and the two-link probe with its Tab reading.

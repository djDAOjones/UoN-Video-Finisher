<!-- markdownlint-disable -->

# VH-233 — Claude's design (VH-233 #1)

Written before Codex astra's `design` answer was opened (its run ended 00:22:01Z, unread). Evidence: VH-203's records and raw groups (a1g3, a3g15, b5; D1's g1 at `a3039c3`), and two design probes on the base `73d16f0` (app as base, walker `7db38f355f3c46c2`), `$S/vh233-walk/t1` and `t2`, by `vh233-probe.mjs` (the walker's `focusArea`, unchanged, on both links by their paragraphs, with candidate CSS injected in memory only).

## 1. Why the wrapped ring falls short

Chrome 157 draws an inline element's outline, where its line fragments' rings meet, as **one contour round the union of the fragments**, not one ring per line. The statement's paragraphs set 1.5 line height on a 16 px body: each fragment is 17 px high and the next line's fragment starts 7 px below it (every cell but font32, where the gap is 12). Each ring reaches `--focus-offset` + `--focus-width` = 4 px beyond its fragment, so two lines' rings meet across the 7 px gap (8 > 7) and are drawn as one outline: the edges where the lines join are never painted and the gap between them is enclosed (b5's capture `S-81__ms-MY__zoom400proxy__light__focus-1-…-on.png`; t1's service-link capture at ms-MY w375 dark, four lines inside one contour).

The walker's 2.4.13 reference for a wrapped inline element (VH-200.1's third reading, `qualify.mjs` `focusArea`) is the sum of each fragment's own 2 px perimeter, 4(w + h) − 16 each. The merged contour's band is roughly twice the union's outline, so it falls short, and further short the more lines a link takes:

- Contact link, 89 × 17 over 194 × 17, left-aligned on consecutive lines (w320, zoom400proxy, zh-Hans w375): the union at offset 2 is an L of perimeter 486; its 2 px band is 2 × 486 + 5 × 4 − 4 = 988, read 985–1,026 against 1,236.
- The same fragments with no horizontal overlap (w1280: the first ends its line, the second starts the next, x-overlap −146 px): the rings stay apart, 472 + 892 = 1,364, read 1,361 against 1,236: pass. Same sizes, different placement, so pass and fail.
- Not a clip: in every probed cell each fragment's ring lies inside the viewport and every fragment's centre hit-tests to the link (t1). Against the enclosing box (b5's `readings.box` 925) the merged ring would pass; against the fragments it fails. The item takes the walker's measure at `$REV`, the stricter reading.

## 2. The measure: both links

S-81's focus subject `#accessibility-statement a` is `document.querySelector`'s first match: the contact address only. The Equality Advisory Service link (`#statement-enforcement a`, `accessibility-statement.ts` `:120`–`:123`) has never been measured. It is longer and wraps over 2 to 6 lines, and t1 reads it failing in cells where the contact link passes (ms-MY w375 dark 1,508 of 3,527; en-GB w1280 spacing 1,772 of 1,860) and passing where its lines do not overlap (en-GB w1280 light 1,584 of 1,456). The criterion covers both links, so the before and after carry a read-only probe of both by their paragraphs (`#statement-contact a`, `#statement-enforcement a`), at the same 63 cells, each on a page of its own, with the walker's `focusArea` unchanged. The matrix's own S-81 records stay exactly as the walker declares them.

## 3. The CSS

**Rejected, by t1 (16 cells, both links):**

- `box-decoration-break: clone`: Chrome still draws one contour; every area identical to as built (computed `clone` confirmed). It would have kept the ring's look.
- `outline-width: var(--focus-room)` on focus: a heavier ring; the contact link passes everywhere, but the merged contour grows with the block's outline while the reference grows with every line, so the service link over 4 to 6 lines still fails (ms-MY w320 light 2,864 of 3,558; w320 spacing 3,512 of 4,484; zoom400proxy 2,869 of 3,558; w375 dark 3,032 of 3,527).
- Changing line height, `display: inline-block`, padding or margins: they move text and breaks (1.4.10, 1.4.12, the measure) and still leave the merge where the gap is small. A `box-shadow` ring vanishes in forced colours.

**Chosen:** the statement links' ring at the text box, so each line keeps its own ring:

```css
.statement-body a:focus-visible {
  outline-offset: 0;
}
```

Each fragment's ring then reaches 2 px (`--focus-width`), 4 px between two lines' rings against a 7 px gap, so Chrome draws one ring per line, each (w + 4)(h + 4) − wh = 4(w + h) + 16 against the reference's 4(w + h) − 16: 32 px² over per line, however many lines. Width, style and colour stay the global rule's (`--focus-width`, `--focus`); in forced colours the forced rule's `outline-color: Highlight` still applies, so only the offset differs. No token is added; `0` names no length (the token tests count only lengths with a unit, and the sheet already uses `0`). Scoped to `.statement-body a`, the two statement links only; the global `:focus-visible` and the forced-colours rule unchanged. The unfocused link is untouched (the rule matches only while focused): colour, underline and line breaks as now, and an outline takes no space, so nothing reflows when focused.

What the user sees: the two statement links' ring drawn against the text with no 2 px gap, in place of one shape round the wrapped lines. 2.4.7 holds (the same ring, shown on `:focus-visible`); 1.4.11 and 2.4.13's 3:1 hold on the same tokens (t1's best ratio 13.34 light, 9.1 forced dark, 11.31 forced light). In forced colours the ring stays inside its own line box (2 px into a 3.5 px half-leading), so V-49's backplate overlap cannot arise here.

**Measured before building (t2):** in section 6, the rule passes both links in all 63 cells.

## 4. The cells

S-81's 45 keys and the 18 neighbours are the right set: the rule moves only the statement links' focused ring, so the cells are where those links wrap (w320, w375, the zoom proxies, spacing), where they do not (w1280, landscape, short), the 32 px font, and the palettes the ring is drawn in (light, dark, the blue band in both themes, forced light and dark). The summary's ring, the footer links and every other ring are outside the selector; the matrix's other instruments at the same cells show nothing else moved. Nothing missing.

## 5. Risks, and for the owner

- The look: the ring sits on the text box, not 2 px off it, for these two links only. The owner's word is "CSS only on the existing tokens"; no token, word or element is needed, so it is not a stop, but the report names it.
- The service link's shortfall is new evidence (never measured before), inside this item's criterion; VH-203's 11 are its contact-link half.
- Re-reads after landing: the rule is scoped to `.statement-body a:focus-visible`, so only checks whose cells focus a statement link move; this item's own before and after are those cells.

## 6. t2: the chosen rule on all 63 cells, before building

`$S/vh233-walk/t2`, 00:34:22–00:40:37Z, AC, load 3.27 at GO (peak 4.32), base `73d16f0`, app as base, walker `7db38f355f3c46c2`, probe `5c9c0872`, candidate `trial-offset0.css` (6a46642f), every cell reached, each link read as built and then with the rule injected in memory:

| Link | As built | With `.statement-body a:focus-visible { outline-offset: 0; }` |
| --- | --- | --- |
| Contact (`#statement-contact a`, the walker's subject) | pass 40, fail 23: VH-203's 11 and 12 of the 18 neighbours (w320 dark and both forced ×3 languages; zh-Hans w375 dark and both forced) | pass 63 |
| Service (`#statement-enforcement a`, never measured) | pass 12, fail 51 (zh-Hans and ms-MY wrap it even at w1280: 1,941 of 2,451; 1,964 of 3,459) | pass 63 |

With the rule: smallest margin +52 px² (zh-Hans zoom200proxy, the service link over 2 lines); `:focus-visible` true, computed offset 0, every fragment's centre hit-testing to its link and every ring inside the viewport in all 126 readings; the lowest best ratio 8.73 (forced). The ring per line is seen in `t2/png/S-81__ms-MY__w375__dark__trial-offset0.css__service-on.png` (four separate rings, 3 px apart).

So the before will show 23 contact and 51 service readings failing, and the after should show all 126 passing, with the matrix's own S-81 records moving only in the contact link's focus row.

**Design verdict (Claude):** build `.statement-body a:focus-visible { outline-offset: 0; }` in the `.statement-body` block, with a stylesheet pin; walk the 63 cells before and after with the matrix and the two-link probe. In scope: no token, word, element or `docs/` line.

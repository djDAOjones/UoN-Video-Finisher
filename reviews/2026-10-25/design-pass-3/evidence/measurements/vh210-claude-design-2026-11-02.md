<!-- markdownlint-disable -->

# VH-210 — Claude's design (saved before Codex's design answer was opened)

Base `96f564786e488af3398c2d86454b5d18b9b78fc0`; walker `fe44891d3c53f716`, unchanged. Read on the base by `$S/vh210-walk/vh210-driver.mjs` (the walker's own `focusArea`, imported read-only, then the outline's band, what clips it, what it crosses, and each band pixel short of 3:1 put to what lies under it), 2026-11-02, on AC, powermode 2.

## 1. V-48 on the base: whole, so no rule

`probe-v48`: S-113 at font32, dark-font32, forced-light-font32, forced-dark-font32, three languages, six widths, 72 cells, all reached. The walker's own focus row for `#onset-help-button` reads 528 of 464 in all 72, V-48's record (`S-113__ms-MY__w320__font32`) among them; the probe's band is 528, all at 3:1, nothing clipped or crossed. VH-199's 460 of 464 no longer matches: the page has moved (VH-209's query below 20rem, VH-219's lane). By the criterion, recorded and no rule added. The title "?" reads 528 of 464 in all 72 too.

## 2. V-49 on the base: located

`probe-v49`: S-83 at 1280 and 320 px, forced light and dark, three languages, 12 cells. `#contact-creators` fails in 8: en-GB w320 1108 of 1264 (as VH-199), ms-MY w1280 1595 of 1968 (as VH-199), and two more VH-199 did not walk, zh-Hans w320 1058 of 1264 and ms-MY w320 1182 of 1360; each in forced light and dark. Every short pixel (220, 437, 270, 242) lies in the ring's outermost bottom row, inside `#contact-self-service`'s text line box, and is the page's own Canvas, unchanged between off and on (white in forced light, black in forced dark). So: the link wraps, its box (48 or 72 px) has no slack under its text, the ring reaches 4 px below the box into the next item, and Chrome's forced-colours backplate behind the next link's text, painted after the first link (an inline-flex box paints whole, its ring with it), covers the ring's outer row. Outside forced colours there is no backplate and no glyph ink that high, so it passes; at 32 px the half-leading clears it (probe-v48: every footer ring passes at 32 px, wrapped or not).

## 3. The remedy: the list's items spaced by the ring's room, under forced colours only

In the existing `@media (forced-colors: active)` block of `src/styles/app.css`:

```css
  /* A wrapped footer link's ring reaches into the next item, where the
     theme's backplate behind that link's text paints over it (V-49): the
     list's items are spaced by the ring's room. */
  .footer-help-list li + li {
    margin-top: var(--focus-room);
  }
```

- **Why spacing, not the ring inside the box.** An inside ring's band is exactly the 2 px perimeter, so its need has no slack; a wrapped inline-flex link is as wide as its text, so the inside ring lies over its own first and last glyphs, and in a forced palette LinkText to Highlight is not 3:1 (yellow to cyan in forced dark). It would trade one failure for another.
- **Why a margin between items, not padding in the link.** `padding-block` on the link leaves a one-line link at the default font as now (44 px absorbs it) but grows every link at 32 px, where nothing fails. A margin on the second item moves it 4 px down in forced colours only, at any font, and leaves each link's own box, and so its 44 px target, untouched.
- **Why `--focus-room`.** It is the existing token for "the room a ring needs" (tokens.carbon.css ~99–101, V-40's file input); 4 px is exactly the ring's reach below the box, so the next item's box starts where the ring ends, and its text's backplate starts inside its own line box below that. `--spacing-02` is the same 4 px but says nothing of why.
- **Why forced colours only.** Outside them the footer reads as now: no layout change, no reading change.
- **Callers.** `.footer-help-list` is one list (index.html ~844); `li + li` is its second item only. `.footer-contact-link`, `.notification-link`, `:focus-visible` and the forced block's `outline-color: Highlight` are untouched. In forced colours the footer is 4 px taller and everything below the first item moves 4 px; the first screen does not reach the footer.
- **V-48:** none.
- **Test:** `test/stylesheet.test.ts` pins the rule inside the forced block, with `--focus-room`, and its absence outside it.
- **Tokens and documents:** no token added or changed; no element, string, control; UI-STANDARDS unchanged (its 2.4.13 rule already says forced colours); no `docs/` change.

## 4. The matrix, a side: 384 cells

- `s113`: S-113 × en-GB, zh-Hans, ms-MY × w1280, w640, w401, w400, w375, w320 × light, dark, forced-light, forced-dark, font32, dark-font32, forced-light-font32, forced-dark-font32 = 144 (its `views` limit dropped in memory, as VH-219 did).
- `s112`: S-112, the same 144: its four narrow widths are the item's "narrow cases"; 1280 and 640 come with them, a superset.
- `footer`: S-83 and S-145 × three languages × w1280, w320 × the same eight modes = 96 (the item names four modes; the four 32 px ones are added because the rule reaches them).
- In every cell the probe reads seven rings where rendered: the title "?" (every page), the format "?" (the empty page: S-83, S-145), the onset "?" (step 4: S-112, S-113), and the footer's four. So the footer's and the toggletips' rings, the title's among them, are read at six widths and eight modes in three languages on both pages.
- **Rules reach:** the footer list under forced colours, in every page. Only S-83 and S-145 focus the list's links in the walker's own plans; S-02 and S-03 focus `#feedback-open`, which the rule moves 4 px but whose box and ring it does not touch, and which the probe reads in every walked cell. No rule touches a "?", so the open toggletips' states (S-17, S-141 to S-144) are not reached by a rule and not walked; their closed rings are read in every cell.
- **Unreachable:** none known before the walk; the format "?" is not rendered once a video is chosen (step 4 cells), read as absent. Any record not reached is stated each side.
- **Timing:** ring readings do not depend on load: no transition on any ring (the only one in app.css, ~917, is the disclosure chevron's `transform`), the walker waits 150 ms after focus and `Page.captureScreenshot` draws a fresh frame. A group with load samples at 8 or above is reported, not re-walked for its ring readings.

## 5. What moves, what doesn't

- Moves: `#contact-creators` fail → pass in the forced cells where it wraps (8 known on S-83; S-145's alike); the footer 4 px taller in forced colours, the second item and everything after it 4 px lower.
- Unmoved: every reading outside forced colours; every "?" reading; the 44 px targets; the first screen.
- WCAG: 2.4.13 met for the footer's links in the forced palettes; 2.4.7, 2.4.11, 2.4.12 unchanged (ring visible, unobscured); 1.4.4, 1.4.10, 1.4.12 unchanged (no text size or reflow change; 4 px more room only); 1.4.11 the ring's colour is the theme's, unchanged; 2.5.5 and 2.5.8 the link boxes unchanged.
- Walker rows: none expected to mislead; S-83 and S-145's own focus rows move with the probe. Rows pinning the old order (wish VH-216.1), if any appear on these scenarios, fail alike both sides and are reported so.
- A person's check: a real Windows contrast theme (task D); Chromium's emulation is what is measured.

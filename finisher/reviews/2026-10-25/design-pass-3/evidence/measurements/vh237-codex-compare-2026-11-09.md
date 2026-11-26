<!-- markdownlint-disable -->

# VH-237 — The verdict compare, Claude and Codex astra (blind)

Codex's `blind` started 15:50:21Z from its saved brief (`vh237-codex-blind-brief.md`, 400471bb; #2's draft kept as `vh237-codex-blind-brief-draft-2.md`, 19ea3993), exited rc 0 at 15:55:51Z. Claude's verdict (`vh237-claude-verdict.md`, 2227e953) was saved at 15:5xZ, before Codex's answer (`vh237-codex-blind.md`, 4ce5721c) was opened at 15:55:54Z.

**Both:** "Commit after the musts below." No product defect.

**Agreed**
- Criteria (1) to (7) and the stage rule met on the records: 0.27 / 0.55 px in the 176 same-line states; the 16 wrapped states reported (0.55 px above the capitals' centre, 1 px above the line box's centre), acceptable; rows whole in all 192; 12/12 and 24/24 px in all 48 open states; the box on the words and on the privacy paragraph's right at w1280, inside the column at w320, no overflow; no outcome moved in the 102 cells; every record difference accounted for (focus 95 clip bytes, formatTip 101 the gap, measure 24 the rewrapped tip, ax 65 with no role or name change, motion 3).
- The remedy rests on Chrome's line metrics for Arial (ascent 14, descent 3, the baseline 17 px below the line's top at 16 px): a measured optical adjustment for this font and browser, not an engine-independent primitive; the zoom proxies keep CSS-pixel geometry and prove no native zoom.
- The tip's two declarations are minimal and scoped; no further block, token or selector.
- The scope: only the two `.promise-with-help` blocks; the about and onset controls untouched (`aboutButton` equal in 192, its viewport shift the capture's scroll).
- The evidence: the before on the base; one revision, driver, keys and probe logic each side; the probes proven on the base; b1's 9.18 sample touches no compared reading; the motion difference re-walked at low load and judged the sampler's; the sources check 0 differing (Codex re-ran it, and the 923 flat copies and the 476 s1 tiles); the first table generation differing only in the bundler's path and `walk-files.sha1.txt`'s line.
- WCAG 1.3.2, 1.4.4, 1.4.8, 1.4.10, 1.4.11, 1.4.12, 2.4.7, 2.4.13, 2.5.5 and 2.5.8 preserved or improved; Carbon's "Tokens, not literals" met.
- The gate, `check.mjs`, the ledger and the close check remain (Codex's must 2; Claude's must 1).
- The CSS comment's last clause is ambiguous (Codex's should; Claude's note).
- Static tests prove declarations, not geometry; the geometry rests on the walk (Codex's should and note; the design compare).

**Codex only**
- **Must 1, the table's notes, adopted:** `formatTip`'s gap is 13.2 → 15 px at the 16 px root (92 cells) **and 25.3 → 29 px at 32 (9 cells)**; the notes gave only the first. The motion records differ in 3 cells, but **the transitions seen differ b1 → a1 in two** (S-141 3 → 0, S-143 6 → 3; rows 4 → 1 and 7 → 4); S-142 sees the same three, its watched duration differs; and "b1 = b2" means the same transitions and outcomes, **not identical records** (`watchedMs` differs in all three). Claude's verdict repeated the first two imprecisions. Repair: the notes corrected, the table made again from the same groups (the second generation set aside unchanged), the sources check re-run; no walk.
- Target clearance 3 px at the 16 px root and 27 px at 32; 484 of 484 sampled hits in every route (1') state; the probes' `middle` / CSS-ex check good to 0.01 px on the base; a focus example (S-141 en-GB w1280 light, 208 px² at 3:1 or more against 144 required).
- **Should, the test's regexes:** whitespace-sensitive around `calc()` and blind to a later duplicate declaration. Taken as a note, not changed: they follow the describe's existing form (`block()` and `toMatch`), and the stylesheet's other pins share the limit.

**Claude only**
- **Must 2, rule 8:** name Carbon's Spacing rule's reading in the decision. Codex judges the Spacing rule satisfied: the steps between elements stay on the scale, and the border-token subtraction is an optical alignment within the permitted token arithmetic. **Settled together:** the decision names the Spacing rule as applied, with this reading: the 1 px (3 px at 32) `margin-top` aligns the square inside its own line box, from tokens; it is not a step between elements, which stay `--spacing-02` and `--spacing-04`. Recorded as the rule's reading, so rule 8 is met either way.
- Shoulds: the records' size (55 MB) and the Chrome line metrics in the decision. Codex states the second in its remedy reading; both go in the decision.
- Note: the ink pair (15 above, 17.55 below at 16 px) is not equal and was never promised; the look is the owner's.

**Disagreed**
- **The comment's wording.** Codex: a should, make it precise ("Chrome floors the half-leading contribution above the baseline"). Claude: leave the walked tree as walked, the decision carrying the mechanism. **Settled as Claude's, with Codex's words in the decision:** rewording a comment changes the app paths' hash the table and records name (`41d3c199e42ad5b2`) for no rendered difference; the decision states the mechanism in Codex's precise terms. No deferral.

**Next:** the notes repaired and the table made again; the ledger (rule 1's read first), `check.mjs`, the gate by the queue, the freeze, Codex's `close`, which sees this compare and checks the repaired notes.

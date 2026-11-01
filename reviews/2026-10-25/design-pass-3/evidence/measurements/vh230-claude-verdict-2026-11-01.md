<!-- markdownlint-disable -->

# VH-230 — Claude's verdict, saved before Codex's blind answer is opened

**Verdict: PASS on the item's criteria so far; gate, close check and Disposition link to come at the close.** Diff hash walked `fca65efa03373697`. Table `vh230-check-marks-2026-11-01.md`.

**1. Each mark whole on one line.** Mark readings over one line 1,092 → 0, of 3,024 a side, all 432 cells reached a side, the ellipsis measured: `……` 28, 56 at 32 px, 31.38 under spacing. Least room in the column after: 3.28 px, `Tidak` under spacing, so the column holds every mark; `white-space: nowrap` covers nothing in the matrix. Before, room was negative only by that word breaking, so "room" alone doesn't prove the before: lines do. DOM order and words: strings proof same.

**2. A remedy, chosen by both designs; the label's result kept.** The item's token, 3 rem. Label words broken 0 → 0.

**3. Measured.** 432 cells a side, same driver sha1 and revision `fe44891d3c53f716`, AC mode 2 each side. 0 probe errors; 0 modes not as declared.

**4. VH-203's stage rule.** WCAG 1.4.10: sideways overflow 0 → 0 cells; label or value past its row 0 → 0. 1.4.12: every mark whole under the sheet and contained. Tokens: one new shape token on the Carbon file, from `--spacing-09`, no colour, `tokens.brand.css` untouched: "two token systems, never collapsed". No literal in `app.css`; `white-space: nowrap` is a keyword. No control or element. Walker row outcomes: 432 unmoved; `type` fails alike in 108 on both sides, unmoved by this. Gate, Codex and Disposition: at the close.

**5. Lands before VH-220:** next in the backlog's order, nothing between.

**The other caller.** The acceptance page's live reading is byte-identical each side: 24 px column, `--mark-width` 1.5rem. Unmoved. Its marks break there (PASS 2 lines, NEEDS A PERSON 6), the same each side; a developer page, not this item's. A wish line.

**Findings, reported, not designed away.**
- **Values moved beneath their labels:** 124 readings (31 conditions by four colours), none the other way; 1,648 → 1,772 of 3,024. VH-218's wrap at work, each value still beside the same row; at 320 and 375 px mostly, and at 1280 px in ms-MY and en-GB under spacing on the longer failed wording, in zh-Hans on the AAC warning, 32 px included.
- **Labels gain a line:** 232 readings, at 320 and 375 px (ms-MY at 320 spacing 2 → 3). Between words, 0 broken.
- **One value wraps inside a Chinese word:** the warned AAC value at 320 px under spacing, 制作 across two lines, 4 readings, 0 before. Label words stay 0. Chinese breaks between characters as normal line-breaking; the value's box is 162 px, far wider than the word, 31.39. It isn't the defect the item names, and keep-all across Chinese would be a change nobody has asked for. Reported as a wrap, not a loss.
- **en-GB's gutter is wider than its words:** least room 23.63 px. The shots at 1280 and 320 px read as a clean column, labels aligned, no gap large enough to loosen a mark from its row. The price of one column; judged acceptable.
- **The before ran under more load** than the after: `before-warned` peak 30.57, 8 of 10 samples at 8 or above. Layout readings, not timings: not a reason to re-run, the orchestrator's ruling if it thinks otherwise.

**Not proved here.** 32 px with spacing together; widths between; other browsers; real assistive technology; a wider fallback face: nowrap's guard is by arithmetic.

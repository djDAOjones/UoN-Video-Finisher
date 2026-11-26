<!-- markdownlint-disable -->

# VH-232 — the verdict compare (Claude's verdict against Codex astra's blind check)

- Claude's verdict `vh232-claude-verdict.md`: saved 03:04:31Z (sha1 abd7e19a60f96ac3), "Commit, at the close". Codex ran from `$W` on `vh232-codex-blind-brief.md` (86cb4166) from 03:03:30Z to 03:12:35Z (exit 0, 16,175 bytes); its answer `vh232-codex-blind.md` was **opened at 03:12:47Z**, after that save. Compare written by VH-232 #4, 2026-11-06 ~03:14Z.
- Codex's verdict, verbatim: "**Commit after the musts below.**"

## Agreed
- The product change follows the settled design; no regression in the reveal itself. The geometry (client top with `clientTop`, the least scroll, the end padding not bought by clipping the start, the clamp to the range, unparsable padding as 0) and the focus interval (projection onto the scrollTops that keep the ring inside; void for a control taller than the client area) are sound.
- Only `dialog.scrollTop` is written; no `focus()`, `scrollIntoView`, attribute, node, page or horizontal scroll. 180 of 180 matrix status cells whole with focus and ring in view, FLAWED 0 (68 before); 18 of 18 route results at once; 12 of 12 S-76 hand-offs keep focus, the three `zoom400proxy` ones the focus-first fallback, rightly never "whole and in view".
- The spacing variant's FLAWED is the walker's order; the page's `scrollY` differs only in four later key readings (R-232b, 375 px, PageUp and ArrowUp), scroll chaining, not the reveal; 365 of 365 reached each side, no coverage dropped, no load at 8 or above, nothing rests on a timing reading; g4 cited, not paired; J3 not walked; the earlier candidate's groups match but for S-76's hand-off.
- WCAG and nielsen as judged, a speech reading a person's; the close still owes the full gate, the checker (its one known warning, `samples/CULT2011.mp4`), the Disposition row and the ledger (Codex's must 2 is Claude's "at the close").

## Codex only (adopted)
1. **Must 1, the lifecycle tests.** The close-and-reopen and moved-focus tests call `revealStatus` without the focus argument, so they record the helper's unrestricted outcome, not the production call `main.ts` now makes; the moved-focus test's `doc.activeElement` is never read. Adopted: both pass focus through `focusInside`, with a case where the kept focus leaves the status partial; the Close and Escape guards stay. Claude's verdict missed this: it was written against the first candidate's tests and not re-read after the repair.
2. **Should, a rounded-scroll stand-in.** Chrome may quantise `scrollTop`; the fractional test keeps every fraction. Adopted: a stand-in that rounds, showing containment within the probe's 0.5 px and no oscillation.
3. **Should, the lifecycle comment.** "the opening empties the status and starts at its top" is not true where Chrome keeps a reopened dialog's scroll (S-77, S-78k at 320 px). Adopted: the comment says the opening empties the status and keeps the browser's scroll.
4. **Should, the table's labels.** "335 unmoved" counts instrument outcomes and rows, not geometry; group 3's "11 cells" leaves out its 30 route records. Adopted as a note in the close's record (the decision's Rationale and the hand-over): the table is never rewritten once placed.
5. **Note, focus in the empty S-76 state at `zoom400proxy`:** the focused message field reads 88–258 against a 17–208 client area, alike before and after (the baseline, not the reveal). Adopted: Claude's verdict claimed focus and ring in view "in every walked cell"; that holds for every status-setting state and route result, not for this empty state. The record says so; it is no regression and no new item (the opening's focus is unchanged by this item).
6. **Note, VH-232.2:** the stale Copy result in a reopened dialog is an existing lifecycle defect, now also revealed there, constrained by focus. Agrees with the orchestrator's ruling: kept open, its line amended.

## Claude only
- The 64 px end padding in the three 32 px font cells (a rem token) and the probe's `scroll-behavior: auto` in all 335.

## Disagreed
None.

## Standing
Repair must 1 and shoulds 2 and 3 in `src/ui/reveal-status.test.ts` alone (no product line, nothing re-walked: the tests touch no walked path), run the two test files and `npm run test` through the queue; then the close (must 2) with should 4 and note 5 in the record, and a Codex re-check of the repaired points within the close check.

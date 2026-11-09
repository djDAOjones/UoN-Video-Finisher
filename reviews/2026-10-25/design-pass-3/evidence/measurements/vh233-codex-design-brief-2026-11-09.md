<!-- markdownlint-disable -->

# VH-233 — Codex astra's blind design check (brief)

You are Codex astra, asked for an independent design reading for a small fix item in the UoN Video Finisher repository. You run read-only from the item's worktree, `/Users/uazjob/UoN-Video-Helper-side/vh233` (branch `side/vh233`, at `73d16f085fc2bda8a76c79263b67d3034262aa78`, VH-203's landing). Nothing is built yet: only the item file is new. Give your own reading; you are not shown any other reading of this question.

## What you may read

- Anything in the worktree: `project/items/VH-233.md` (the item, criteria and all), `project/items/VH-232.md` (the form of a fix item and VH-203's stage rule), `project/items/VH-203.md`, `project/wish-list.md` (VH-203.1, VH-210.2, VH-200.1), `src/styles/app.css`, `src/styles/tokens.carbon.css`, `src/styles/tokens.brand.css`, `src/ui/accessibility-statement.ts`, `index.html`, `test/stylesheet.test.ts`, `UI-STANDARDS.md` (Operable), `project/digests/wcag-2.2-aaa.md`, `project/digests/carbon.md`, `project/digests/house-conventions.md`.
- The walker, read-only: `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/` (`qualify.mjs`'s `focusArea`, `scenarios.mjs`'s S-81, `matrix.mjs`'s `instruments`).
- VH-203's committed records, the finding's source: in `reviews/2026-10-25/design-pass-3/evidence/measurements/`, `vh203-a1-records-2026-11-08/a1g3.*`, `vh203-a3-records-2026-11-08/a3g15.*`, `vh203-b-records-2026-11-08/b5.*`, and `vh203-d1-records-2026-11-08/d1g1*.*` (the before at `a3039c3`); `vh203-claude-verdict-2026-11-08.md` and `vh203-codex-blind-2026-11-08.md.txt` where they name S-81.
- VH-203's raw groups, with every cell's JSON and its focus captures (`captures/*focus-1-accessibility-statement-a-{off,on}.png`): `/Users/uazjob/UoN-Video-Helper-side/vh203-walk/a1g3/runs/`, `/Users/uazjob/UoN-Video-Helper-side/vh203-walk/a3g15/runs/`, `/Users/uazjob/UoN-Video-Helper-side/vh203-walk/b5/runs/` (S-81's cells: files named `S-81__<lang>__<view>__<mode>*`).
- The owner's words: `/Users/uazjob/UoN-Video-Helper-side/plan8-owner-words.md`, lines 456–464 (point 1), and `/Users/uazjob/UoN-Video-Helper-side/vh203-walk/owner-points.md`, point 1.

**Do not read** any folder under `/Users/uazjob/Library/Application Support/Claude/side-session-notes/` or `/Users/joe/Library/Application Support/Claude/side-session-notes/`, and in `/Users/uazjob/UoN-Video-Helper-side/` nothing named `vh233-claude-*`, `vh233-*compare*`, `vh233-progress.md`, `vh233-handover-*`, any `vh233-*brief*` but this one, and nothing in `vh233-walk/` or `vh233-codex-*` but this brief. Do not read the sibling worktrees `vh234`, `vh235`, `vh236`.

## The finding, in brief

VH-203's after-run (walker revision `7db38f355f3c46c2`, on the Mac Pro) read S-81's focus subject `#accessibility-statement a` short of 2.4.13 in 11 cells: w320 light ×3, w320 spacing ×3, zoom400proxy light ×3, w1280 spacing en-GB, w375 light zh-Hans (b5's worst: 986 px² at 3:1 against a 1,236 px² perimeter by line fragments). Nine were alike at `a3039c3` (D1). The other S-81 cells pass, some with the same fragment sizes. The owner chose "a fix item, CSS only on the existing tokens".

## The owner's words (verbatim)

- 2026-11-08 ~23:03Z, "Yes, all six", point 1: "The accessibility statement link's focus ring at 2.4.13 (VH-203.1): a fix item, CSS only on the existing tokens."
- 2026-10-27: "ensure everything passes UX / design / Accessibility".
- No word, element or `docs/` change is approved: any such need is a stop for the owner.

## Answer each, with the evidence you used (paths and values)

1. **Why the wrapped ring falls short.** From the fragments and captures: is it the fragments' outlines overlapping or merging at the line joins, an outline clipped (by the viewport, an ancestor or the next line), the measure's own perimeter, or something else? Say why the same fragment sizes pass in some cells (for example en-GB w1280 light, 1361/1236) and fail in others (en-GB w320 light, 1025/1236).
2. **The smallest CSS that makes the ring whole** on a wrapped statement link, on the existing tokens only (`--focus-width`, `--focus-offset`, `--focus-room`, `--focus`, the spacing tokens; no new token, no literal length or colour; `test/stylesheet.test.ts`'s "tokens, not literals"), scoped to the statement's links so no other link or ring moves, with the global `:focus-visible` and the forced-colours `:focus-visible { outline-color: Highlight }` unchanged. Say what it changes in the unfocused link (colour, underline, line breaks) and in forced colours, dark and the blue band, and whether 2.4.7 and 1.4.11 hold. Name any remedy you rejected and why. If no CSS on those tokens can do it without a new token, a word or an element, say so.
3. **The measure.** Does the walker's focus reading (`scenarios.mjs` S-81's `focus` subjects, `qualify.mjs`'s `focusArea`) measure both statement links (the contact address and the Equality Advisory Service link) or only the first match? If only the first, what should a read-only probe in a driver outside the walker read for the second at the same cells, and is the walker's area-by-fragments perimeter the right reference for 2.4.13 on a wrapped inline link?
4. **The cells.** Are S-81's 45 keys and the 18 neighbours (w320 and w375 in dark, forced light and forced dark, three languages) the right before-and-after set for this change? Anything missing a CSS change of the kind you propose could move?
5. **Risks:** anything in the criteria (`project/items/VH-233.md`) the remedy could break, and anything for the owner.

Keep the answer under about 900 words. End with one line: `Design verdict: <your verdict>`.

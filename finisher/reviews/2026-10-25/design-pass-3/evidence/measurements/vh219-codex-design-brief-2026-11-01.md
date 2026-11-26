<!-- markdownlint-disable -->

# VH-219 — Codex astra's blind design brief

You are Codex astra, giving a blind design check, read-only, for item VH-219 of the UoN Video Helper. You work from the repository at the current directory, at its HEAD. Nothing is built yet.

The item: `project/items/VH-219.md`. The defect's reading: `reviews/2026-10-24/vh189-labels-2026-10-25.md`, "200% text", measured before VH-209; the page has moved since (VH-209's query below 20rem, VH-229's title "?", VH-218 and VH-230's System check rules). The owner's words: "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" and "even old issues should be solved for".

Read what you need of: `src/styles/app.css` (`.control-grid`, `.field`, `.select`, `.select-wrap`, the `max-width: 25rem` and `max-width: 19.99rem` queries), `src/styles/tokens.carbon.css`, `index.html` (step 4's two selects), the three sheets in `src/i18n/` (`closing.types`, `closing.onsets`), `test/stylesheet.test.ts`, `UI-STANDARDS.md`, `project/digests/wcag-2.2-aaa.md`, `project/digests/carbon.md`, and the walker under `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/` (`scenarios.mjs`: S-111, S-112, S-113, `PLANS`, `ROUTES`; `matrix.mjs`; `walk.mjs`), read-only. Never read any folder under `side-session-notes/`; in `/Users/joe/UoN-Video-Helper-side/` read nothing whose name starts `vh219-claude`, nothing matching `vh219-*compare*`, `vh219-progress.md`, `vh219-handover-*`, or any `vh219-*brief*` but this one.

Rules that bind the design: CSS only; `index.html` unchanged; never a smaller font; no custom control, element, checkbox or string; numbers by existing tokens; the two token files never collapsed. A native select's closed text that still clips after the remedy is measured and put to the owner, the item stays open. The walker is not changed. A change to another caller's behaviour the criteria don't name is not allowed.

Answer each, with your own proposal and its reasons, citing file and line:

1. What the column and the select's text lane are on this base at a 32 px root font at 401, 400, 375 and 320 px, by your arithmetic from the CSS, and what the longest option needs in each language. Which of the item's "room" criteria are already met?
2. The CSS remedy: exactly which rules, in which scope (which query, or none), so each option of both selects is readable. What can a native Chrome select's closed text do at this width, one line or otherwise, and how sure are you? Name the failure modes at 320 px with a 32 px font, in Malay and Chinese, and in the spacing mode.
3. Every caller of the rules you change, and what your rule does to each; what it does at the default font.
4. How to read honestly whether a closed native select's text clips, for each option, in a read-only probe, including whether it can be read at all; and what can be read of the open list.
5. The item's matrix, whole: S-111 to S-113 "with both types and every closing", its widths, fonts, spacing mode, languages and colour modes. What do "both types" and "every closing" mean, by the record? Work out the cell count a side. Which cells can't a state reach, and how do you know? How can a driver in a side folder, running `matrix.mjs` unchanged on a plan in memory, stage them?
6. Which of the walker's existing rows on these scenarios will mislead after your remedy, and how must they be reported, given the walker stays unchanged?
7. What you expect to move and to stay unmoved; each WCAG reading the item names (1.3.1, 1.4.4, 1.4.8, 1.4.10, 1.4.12, 2.4.13, 2.5.5); and the design judgement, as a person using a phone with 32 px text would see it. Anything the plan as stated misses.

End with a short list of what must hold. Be concrete and brief.

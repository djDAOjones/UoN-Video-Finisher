<!-- markdownlint-disable -->

# Codex astra — VH-234's design, a blind check (read-only)

You are reviewing, read-only, the design of one fix item in the UoN Video Finisher repository. Your working directory is the item's worktree, `/Users/uazjob/UoN-Video-Helper-side/vh234`, on branch `side/vh234` at base `73d16f085fc2bda8a76c79263b67d3034262aa78`. It is clean apart from the new item file. Give your own independent design. Nothing here tells you what another reviewer concluded, and you must not look for it.

## What you may read
- Anything in the worktree: `project/items/VH-234.md` (the item and its criteria), `src/styles/app.css`, `src/styles/tokens.carbon.css`, `index.html`, `test/stylesheet.test.ts`, `UI-STANDARDS.md`, `project/digests/*.md`, `project/decisions.md`, `project/decisions-2026-10.md`, and `git log` / `git show` (in particular `git show cc12788`, VH-205).
- The walker, read-only: `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/` (`qualify.mjs` `TYPE_ROLES`/`typeRoles`, `scenarios.mjs` S-141 to S-144, `matrix.mjs`).
- VH-203's evidence, read-only: `reviews/2026-10-25/design-pass-3/evidence/measurements/vh203-format-help-2026-11-08.md` (Part C) and its records folder; `vh203-a3-records-2026-11-08/`.
- Capture scripts, read-only: `/Users/uazjob/UoN-Video-Helper-side/vh203-walk/format-help-c.mjs`, `format-sheets-c.mjs`, `vh203-driver.mjs`, `split-7.zsh`.
- The owner's words: `/Users/uazjob/UoN-Video-Helper-side/plan8-owner-words.md`, lines 456–464 (and 275).

## What you must not read
Any folder under `/Users/uazjob/Library/Application Support/Claude/side-session-notes/` or `/Users/joe/Library/Application Support/Claude/side-session-notes/`. In `/Users/uazjob/UoN-Video-Helper-side/`: any `vh234-claude-*` file, any `vh234-*compare*` file, `vh234-progress.md`, any `vh234-handover-*`, and every `vh234-*brief*` file except this one. Write nothing anywhere.

## The owner's words that govern it (verbatim, `plan8-owner-words.md:456`–`:464`, 2026-11-08 ~23:03Z, "Yes, all six", point 3)
"The format "?" (VH-217.2): a fix item putting its text back on an existing type role, CSS only, no word or element; and its look: the scrolled shots of the 52 clipped captures are sent to the owner, who approves the look or names a change."

## The finding
VH-203 found the format "?" (`#format-help-button`) on none of the eight type roles: 0.875rem, line height 1.25, weight 600. `.promise-with-help .help-button` in `src/styles/app.css` (about `:1187`–`:1200`) sets `line-height: var(--line-height-heading)` (VH-205's `cc12788`). The walker's `type` reading fails in 93 of S-141 to S-144's 102 cells; the 9 at w320 in text spacing pass. Part C's capture of 192 states clipped 52 at the viewport's edge: 48 at w320 and 32 px, and 4 "open" at 16 px in ms-MY.

## Answer each, with file:line evidence
1. Why did VH-205 set `--line-height-heading` there, as far as the record and the CSS show?
2. Which remedy puts the text back on an existing role, CSS only, with no new token, literal, word or element? Weigh dropping the declaration against naming the role's own token there. Which do you recommend, and why?
3. Does your remedy keep, at the 16 px and 32 px root:
   - the "?" centred in its `--control-size` square;
   - its 44 px `::after` target;
   - its gap and open fill;
   - the promise's 24 px row;
   - the tip's place;
   - `#about-help-button` and `#onset-help-button` unchanged?

   Say what to measure to prove each.
4. How does the walker's `type` reading resolve a role, and will your remedy pass it in all 102 cells?
5. The test: what should be pinned, inside `describe('the fourth promise’s "?" (VH-205)')` in `test/stylesheet.test.ts`? The "one type set" test stays unchanged.
6. The walks. The before is on the base before any `src/` change; the after is at the same walker revision.
   - How should the 102 keys be walked so they compare with VH-203's? VH-203 walked 38 of them one key per driver run (its `-split` groups) and the rest grouped.
   - How should the comparison capture (Part C's script) be kept identical before and after, so a moved image is the CSS's doing? How should images be compared, with no new dependency?
   - How should the scrolled shots of the 52 clipped states be made: the steps, the overlap, the labels, and re-checking each state (`aria-expanded`, `:hover`, `:focus-visible`, the root font) after the scroll? Which states, beyond the 52, should be shot?
7. Which WCAG criteria and digest rules does it touch, and what could make this item stop (a word, an element, a new token)?
8. Anything else you would change in the item's criteria (`project/items/VH-234.md`).

Answer in plain Markdown, numbered as above, under 1,500 words. End with one line: your recommended remedy in one sentence.

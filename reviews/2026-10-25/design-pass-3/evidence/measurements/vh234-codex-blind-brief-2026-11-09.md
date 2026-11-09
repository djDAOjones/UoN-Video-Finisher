<!-- markdownlint-disable -->

# VH-234: blind check of the candidate

You are Codex astra, reviewing read-only. Say what you find, in your own reading. You are given no other reviewer's reading. Write nothing to any file.

**The checkout** is `/Users/uazjob/UoN-Video-Helper-side/vh234`, on `side/vh234`. **The candidate** is the uncommitted change against `a28086f4af5935b09bb33e3d999644542a993741` (VH-233's landing; the orchestrator moved this item's base there from `73d16f0` before the before-walk): `git -C /Users/uazjob/UoN-Video-Helper-side/vh234 diff a28086f4af5935b09bb33e3d999644542a993741 -- src test`, two files: `src/styles/app.css` (one declaration deleted from `.promise-with-help .help-button`) and `test/stylesheet.test.ts` (one `it` inside the VH-205 `describe`), as walked in `a1` (`git diff --binary | shasum -a 1` begins `f1db7eff73f12f1e`, the untracked item file and evidence beside it). The untracked evidence is the table `reviews/2026-10-25/design-pass-3/evidence/measurements/vh234-format-type-2026-11-09.md`, its notes inside it, and its records `vh234-records-2026-11-09/` beside it. `npm run test` read 88 files, 1,742 passed and 1 skipped (the base's EBU `it.skip`); `tsc --noEmit` 0; eslint on the test file 0. The ledger is not yet written; a later check covers it.

**Read:**
- in the checkout: `project/items/VH-234.md`, every criterion (its base line still names `73d16f0`; read it as `a28086f`); the entry "2026-11-08 — VH-203 — Closes" in `project/decisions.md`; the VH-205 entry of 2026-10-27 in `project/decisions-2026-10.md`; `project/wish-list.md` (VH-217.2, VH-203.3); `UI-STANDARDS.md` (Type roles); `project/digests/carbon.md` and `wcag-2.2-aaa.md`; `src/styles/app.css` (the `.help-button` rules, the role rules, the forced-colours block), `src/styles/tokens.carbon.css`, `index.html`, `test/stylesheet.test.ts`, and any other source you need; the walker under `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/` (`qualify.mjs`: `TYPE_ROLES`, `typeRoles`); VH-203's Part C page `vh203-format-help-2026-11-08.md` and its records, and `vh203-a3-records-2026-11-08/`, `vh203-b-records-2026-11-08/` (cited, never paired); the table and records.
- in `/Users/uazjob/UoN-Video-Helper-side/vh234-walk/`: the groups `b1/` (the before, on the base), `a1/` (the after) and `s1/` (the scrolled shots, after only), each with `conditions.txt`, `logs/`, `runs/` (each cell's record), `format-help.jsonl` or `scroll.jsonl`, `route1-records/` or `scroll-records/`; the `*.base-check.txt`, `*.launcher.log`, `*.load.log`, `*.go.out` and `*.chain.out` files; `vh234-driver.mjs`, `format-help-c.mjs`, `format-sheets-c.mjs`, `format-scroll-s.mjs`, `scroll-sheets.mjs`, `side-job.zsh`, `keys-loop.zsh`, `group.zsh`, `go.sh`, `walk.sh`, the `keys-*.txt`, `targets-52.txt`, `targets-56.txt`, `png-compare.mjs`, `record-compare.mjs`, `cell-compare.mjs`, `png-b1-a1.jsonl`, `rec-b1-a1.jsonl`, `cells-b1-a1.txt`, `vh234-table-notes.md.txt`, `walk-files.sha1.txt`.

**Do not read:** any folder under `side-session-notes/`. In `/Users/uazjob/UoN-Video-Helper-side/`, do not read `vh234-claude-*`, `vh234-*compare*`, `vh234-progress.md`, `vh234-handover-*`, `vh234-wip-*`, or any `vh234-*brief*` but this one.

**The owner's words:**
- "ensure everything passes UX / design / Accessibility" (2026-10-27).
- "Yes, all six" (2026-11-08), approving point 3: "The format "?" (VH-217.2): a fix item putting its text back on an existing type role, CSS only, no word or element; and its look: the scrolled shots of the 52 clipped captures are sent to the owner, who approves the look or names a change."
- "Gateless covers the rest of Phase 8: approve VH-197's plan and every later choice on the sessions' recommendations; only stop for me on something the recommendations don't settle".

No string, element, attribute, new token or `docs/` line is approved. The owner's answer on the look is awaited; judge everything else.

**Settled, do not reopen:**
- the remedy, from the design and Codex's blind design: delete the scoped `line-height`, so the role's one rule gives the "?" its line height; no `font` shorthand in the scoped rule;
- the walker unchanged at `7db38f355f3c46c2` each side; the cells: S-141 to S-144's 102 keys as VH-203 walked them (64 grouped, one run per VH-203 group; 38 one run per key); Part C's 192 states and three outlined images by its own script byte for byte; the scrolled shots after only.

**Answer each:**
1. Every acceptance criterion in `VH-234.md`: met, or how not, with file and line or record.
2. **The rule.** Is deleting the declaration the smallest sound remedy? Does the "?" now read 0.875rem / 1.5 / 600 from the role's one rule? Does anything else set its line height or font (the forced-colours block, the open state, a media query)? Does the glyph stay centred in its `--control-size` square at 16 and 32 px, and does the promise's row keep its height?
3. **Nothing else moves.** Do the records show every other instrument, the 243 route (1) readings (box, target, gap, open fill, contrasts, rows, tip, clips) and the images unchanged? Is the table's reading of the 16 differing images (the overlay scrollbar thumb's shade, nothing of the "?") right? Are `#about-help-button` and `#onset-help-button` untouched?
4. **The evidence.**
   - Is every reading in the table and its notes supported by the records, before and after?
   - Was the before walked with the app as the base (`b1.base-check.txt`)? Are the driver, scripts, keys and revision the same each side?
   - Load and power for each group; any sample at 8 or above (a1 had one); does any reading rest on a timing measure? The 7 cells whose `reached` record differs: is the table's reading right?
   - The scrolled shots: do they cover the 52 states and every state the change or the compare moved, each covered whole and re-read as named after its scroll, with `captureBeyondViewport: false` and the root font kept?
   - Is coverage reduced anywhere against the item's stage rule?
5. **WCAG and carbon.** From the readings, judge WCAG 1.3.2, 1.4.4, 1.4.10, 1.4.11, 1.4.12, 2.4.7, 2.4.13, 2.5.5 and 2.5.8 for the format "?", and carbon's "Tokens, not literals" and its type set (VH-166's eight roles).
6. **Tests.** Does the new `it` pin what the item asks (inside the VH-205 describe, the role's line height taken, no line height or font of its own), and is "one type set" green and unchanged? Is the pin brittle, or is anything the change does left untested?

**Verdict:** one of "Commit", "Commit after the musts below", or "Do not commit". Give musts, shoulds and notes apart, each with its evidence. Write nothing to the repository.

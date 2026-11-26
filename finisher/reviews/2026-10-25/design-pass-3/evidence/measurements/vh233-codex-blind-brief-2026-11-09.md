<!-- markdownlint-disable -->

# VH-233: blind check of the candidate

You are Codex astra, reviewing read-only. Say what you find, in your own reading. You are given no other reviewer's reading. Write nothing to any file.

**The checkout** is `/Users/uazjob/UoN-Video-Helper-side/vh233` (your working directory), on `side/vh233`. **The candidate** is the uncommitted change against `73d16f085fc2bda8a76c79263b67d3034262aa78` (VH-203's landing): the tracked diff `git diff 73d16f085fc2bda8a76c79263b67d3034262aa78 -- src test`, two files, `src/styles/app.css` (one commented rule after `.statement-body li + li`) and `test/stylesheet.test.ts` (one `describe` of two `it`s after VH-209's block), as walked in `a1` (`git diff --binary | shasum -a 1` begins `b590b5f26928b1a9` with the untracked item file beside it). The untracked evidence is the table `reviews/2026-10-25/design-pass-3/evidence/measurements/vh233-statement-ring-2026-11-09.md`, its notes inside it, and its records `vh233-records-2026-11-09/` beside it. `npm run test` read 86 files, 1,723 passed and 1 skipped (the EBU `it.skip`, the base's); `tsc --noEmit` 0; eslint on the test file 0. The ledger is not yet written; a later check covers it.

**Read:**
- in the checkout: `project/items/VH-233.md`, every criterion; the entry "2026-11-08 — VH-203 — Closes" in `project/decisions.md`; `project/wish-list.md` (VH-203.1, VH-210.2, VH-200.1); `UI-STANDARDS.md` (focus, Operable); `project/digests/wcag-2.2-aaa.md` and `carbon.md`; `src/styles/app.css` (the global `:focus-visible`, the `.statement-body` rules, the forced-colours block), `src/styles/tokens.carbon.css` and `tokens.brand.css` (the focus tokens), `src/ui/accessibility-statement.ts`, `index.html`, `test/stylesheet.test.ts`, and any other source you need; the walker under `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/` (`qualify.mjs`: `focusArea`, `focusByKeyboard`, `key`; `scenarios.mjs`: S-81; `matrix.mjs`); the table and records; VH-203's committed records it cites (`vh203-a1-records-2026-11-08/`, `vh203-a3-records-2026-11-08/`, `vh203-b-records-2026-11-08/`, `vh203-d1-records-2026-11-08/`).
- in `/Users/uazjob/UoN-Video-Helper-side/vh233-walk/`: the groups `b1/` (the before, on the base) and `a1/` (the after, on the candidate), each with `conditions.txt`, `runs/` (each cell's record), `logs/`, `vh233-probe.jsonl` (the item's probe of both links) and `png/` (the probe's unfocused and focused captures per link); `t1/` and `t2/`, design probes on the base with candidate stylesheets injected in memory (design evidence, never paired); the `*.base.txt`, `*.launcher.log`, `*.load.log` and `*.go.out` files; `vh233-driver.mjs`, `vh233-probe.mjs`, `vh233-probe-read.mjs`, `go.sh`, `walk.sh`, `group.zsh`, `keys-63.txt`, `probe-b1-a1.md.txt`, `vh233-table-notes.md.txt`, `trial-*.css`.
- VH-203's raw cells the finding came from: `/Users/uazjob/UoN-Video-Helper-side/vh203-walk/b5/` (cited, never paired).

**Do not read:** any folder under `side-session-notes/`. In `/Users/uazjob/UoN-Video-Helper-side/`, do not read `vh233-claude-*`, `vh233-*compare*`, `vh233-progress.md`, `vh233-handover-*`, `vh233-table-set-aside-*`, or any `vh233-*brief*` but this one.

**The owner's words:**
- "ensure everything passes UX / design / Accessibility" (2026-10-27).
- "Yes, all six" (2026-11-08), approving point 1: "The accessibility statement link's focus ring at 2.4.13 (VH-203.1): a fix item, CSS only on the existing tokens."
- "Here on the Mac Pro (Recommended)": a fix item is built, walked, gated and landed on the Mac Pro, on its own branch. "Re-walk here (Recommended)": the before is walked here; other records are cited only.
- "Gateless covers the rest of Phase 8: approve VH-197's plan and every later choice on the sessions' recommendations; only stop for me on something the recommendations don't settle".

No string, element, attribute, new token or `docs/` line is approved.

**Settled, do not reopen:**
- the walker unchanged at one revision, `7db38f355f3c46c2`, before and after; its focus subject for S-81 is `#accessibility-statement a`, the first match only, so the item's own read-only probe reads both links at the same 63 cells, beside the matrix, on both sides;
- the cells: S-81's 45 keys as VH-203 walked them and 18 neighbours (w320 and w375 in dark, forced light and forced dark, the three languages), 63 a side;
- the orchestrator's ruling on the Tab arrival: where Chrome's own scroll into view leaves the ring's lower stroke beyond the viewport's bottom edge, that is pre-existing and app-wide, its remedy (a scroll margin for the ring) wider than this item's rule, recorded as wish VH-233.1 and not built here; this item's criterion is read centred, as the walker reads it.

**Answer each:**
1. Every acceptance criterion in `VH-233.md`: met, or how not, with file and line or record.
2. **The cause and the rule.** From the records and captures, why did the wrapped ring fall short before? Is `outline-offset: 0` on `.statement-body a:focus-visible` the smallest sound remedy? Which elements can the selector match, now and if the statement's markup gains a link; does it win over the global `:focus-visible` for those links only; and what does it do under forced colours, in dark, on the blue band, for a mouse focus and for a link that does not wrap?
3. **Tokens.** Is the unitless `0` a literal under the project's "tokens, not literals" rule and carbon's digest, or a structural zero the sheet already uses? Does the ring keep its width, style and colour from the tokens in every mode?
4. **Nothing else moves.** Do the records show the unfocused links' colour, underline, fragments (line breaks) and paragraph unchanged, and every other instrument as before? Does the ring at the text box now overlap or obscure the link's text, its underline, a descender or a neighbouring line in any capture?
5. **The evidence.**
   - Is every reading in the table and its notes supported by the records, before and after?
   - Was the before walked with the app as the base (`b1.base.txt`)? Are the driver, probe, walk scripts and revision the same each side?
   - Load and power for each group; any sample at 8 or above; does any reading rest on a timing measure?
   - Is the probe sound as an instrument: the same setup as the matrix, each link focused by keyboard, the walker's `focusArea` reading, its geometry and hit tests? Are the Tab arrival readings right, in which cells, and is the ruling above applied faithfully?
   - Is coverage reduced anywhere against the item's stage rule?
6. **WCAG and carbon.** From the readings, judge WCAG 1.3.2, 1.4.4, 1.4.10, 1.4.11, 1.4.12, 2.4.7, 2.4.11, 2.4.12, 2.4.13 and 2.5.8 for both links, and carbon's "Tokens, not literals". For 2.4.13, judge the area and the ring's change of contrast between the unfocused and focused states.
7. **Tests.** Does the pin hold what the item lists (the rule present, the offset only, the global and forced-colours rings unchanged)? Is anything the change does left untested, or the pin brittle?

**Verdict:** one of "Commit", "Commit after the musts below", or "Do not commit". Give musts, shoulds and notes apart, each with its evidence. Write nothing to the repository.

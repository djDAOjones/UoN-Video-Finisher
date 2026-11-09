<!-- markdownlint-disable -->

# VH-234 — Claude's verdict on the candidate (VH-234 #2, saved before Codex's blind answer is opened)

**Candidate:** `side/vh234` at `a28086f` plus the uncommitted diff `f1db7eff73f12f1e`: `src/styles/app.css` −1 line (`line-height: var(--line-height-heading);` out of `.promise-with-help .help-button`), `test/stylesheet.test.ts` +8 (one `it` in the VH-205 describe). Evidence: `vh234-format-type-2026-11-09.md` and `vh234-records-2026-11-09/` (919 records, 0 differing from their sources lines).

**Verdict: Commit after the musts below, and only after the owner's answer on the look.**

## Criteria
1. **The role — met.** The scoped rule now sets no line height and no font, so `.help-button`'s one role rule (compact emphasis, `--type-body-compact` / `--type-weight-emphasis` / `--line-height-body`) gives the "?" 14 / 21 / 600. The walker's `type` passes in 102 of 102 cells after (93 fail → pass, the 9 at w320 spacing pass both sides); every cell reached both sides.
2. **CSS only, no word or element — met.** One declaration deleted; no token, literal, string, element or `docs/` line. Route (1)'s 243 readings are equal field by field: the square's box (20 × 20 at 16 px), centring, the 44 px target's hits, the gap, the open fill's colours and contrasts, the four rows, the tip's place, each clip's origin and size. 179 of 195 images are the same pixels; the 16 others differ only in the overlay scrollbar thumb's shade at the clip's right edge (max channel 28), not the change. The glyph cannot move: centred in a fixed 20 px square, its line box grows 17.5 → 21 px with its half-leading, so its top stays at 10 − c/2. `#about-help-button` and `#onset-help-button` are outside the scoped selector and their rules are untouched.
3. **Tests — met.** The new `it` pins no `line-height` and no `font` in the scoped block and the role's `--line-height-body`; red on the base, green after. "One type set" unchanged and green. 88 files, 1,742 passed, 1 skipped (the base's EBU skip); tsc 0; eslint 0.
4. **The look — pending.** 56 states (Part C's 52, and the 4 zh-Hans w320 16 px focused images the compare moved), 80 tiles, every state covered whole and re-read as named; 14 sheets sent to the owner. The item does not close before their answer.
5. **Stage rule — met, with one wording must.** Before on the base (`b1.base-check.txt` true), one revision each side, the same driver, keys and scripts each side, 204 records, 390 images compared with their clips, VH-203's records cited not paired. WCAG: 1.3.2 (no order change), 1.4.4 and 1.4.10 (32 px root and w320 read, overflow passes in all, the shots whole), 1.4.11 (contrasts equal), 1.4.12 (spacing cells pass), 2.4.7 and 2.4.13 (focused images equal but the scrollbar), 2.5.5 and 2.5.8 (the target's 484 of 484 hits equal). Load: one a1 sample at 8.08 at its start; no timing reading is compared, so no re-walk.

## Musts
- The item file still names the base `73d16f0` and the rule at `:1187`–`:1200`; make them `a28086f` (the orchestrator's ruling 1) and the rule's lines now.
- The ledger: backlog struck, a trajectory line, the decision with the owner's words and their answer on the look, wish VH-217.2 and VH-203.3 retired, the Disposition row linked; rule 8's digest rules named.

## Shoulds
- The records are 32 MB (two sides' 195 images and the 80 tiles); say so in the decision.

## Notes
- The `rows` field reads each promise's text span, not the item's box; it is equal both sides, and VH-205's 24 px rows rest on the button's fixed 20 px height, which this change does not touch.

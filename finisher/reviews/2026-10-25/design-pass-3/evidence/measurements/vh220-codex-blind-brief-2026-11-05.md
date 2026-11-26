<!-- markdownlint-disable -->

# Codex astra — VH-220's blind check of the verdict

You are checking, read-only and blind, whether VH-220's evidence meets its acceptance criteria. You are not given Claude's verdict or reasoning. Judge from the evidence alone. Write your answer as Markdown. Its **first line** is one sentence: your verdict ("pass", "fail" or "cannot say", and why).

## What you check

- **The item:** `project/items/VH-220.md`, its "Acceptance criteria" in full. The states are in `project/items/VH-150.md:48–54`, and their expectations in R2-1, R2-2, R2-3, Rank 3's "Two notifications, one inside the other" and "Dead restore code", and Rank 3's small items ("Set end here" hands focus to the end time field).
- **The candidate diff against the base `95d18eed5db1ae56d1fe6512053bad714357d899`:** none. `git diff 95d18ee` in this worktree is empty. The item is a check item, and its untracked evidence is all there is: `reviews/2026-10-25/design-pass-3/evidence/measurements/vh220-states-2026-11-05.md` (the one-page table, with notes) and `…/measurements/vh220-records-2026-11-05/` (each cell's outcomes and rows, probes, conditions, load and launcher logs, sources as `.txt`, `renamed.txt`).
- **The walks behind them, read-only:** `/Users/uazjob/UoN-Video-Helper-side/vh220-walk/` (group folders `before-*`, each with `conditions.txt`, `runs/`, `.load.log`, `.launcher.log`; the driver `vh220-driver.mjs`). Not part of this table: `vh220-walk/macbook-pro/` (another machine's walks, support only, never paired) and `vh220-walk/void/` (waits that walked nothing).
- **VH-199's records for the cited cells:** `…/measurements/matrix-coverage-2026-10-27.json`, `matrix-2026-10-27.md` and the `digest-*-2026-10-27.md` files. The walker is at `…/measurements/walker/` (`scenarios.mjs`, `faults.mjs`, `matrix.mjs`), read-only. Source is in `src/`, read-only.

## The owner's words that govern it (`/Users/uazjob/UoN-Video-Helper-side/plan8-owner-words.md`, verbatim)

- `:275` "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility". Group B covers a new fault or scenario named and qualified by VH-198's method.
- `:375` "yes", to five changes, one of which is running VH-220 to VH-224 side by side. `:369` "Yes, move it": the checks read the renamed page. `:366` "Yes, leave them": walker rows that pin the old page order stay failing.
- `:185` "Gateless covers the rest of Phase 8: …". `:395` "gateless run where possible".
- `:235` "please also do everything in partnership with codex as a comparison. …"; `:299`: "… start Codex's blind check alongside Claude's verdict, keeping it blind."
- The owner's answers of 2026-11-05 (its last entry): walked cells are re-walked on the Mac Pro, so each table rests on one machine; cited VH-199 rows stay cited, named as the MacBook Pro's.

## Orchestrators' rulings recorded for this item (as rulings, not reasoning)

- #38: F3 with an in-memory `S-31:recheck` variant (Check again pressed and let finish) reaches the storage re-check that still fails, with the walker unchanged at `9c52269607bccc4c`. No new fault is written. The item's "needs a new fault" is to be corrected in its Notes. Conditions: the proof qualifies the variant on both layouts; the table states the variant, its driver sha1 and the one revision.
- #39: this Mac's ffmpeg changed four fixtures' sha1s. before-fixproof is their proof of record. `go.sh` passes on "AC Power" with no powermode line.
- #40: S-115's 15 cells that g115 did not reach are walked one setup per mode (g115fl, g115fd, g115d375), and the table counts g115 as 6 + 15 = 21.

## Answer every criterion and each point

1. Every state read: all six of VH-150's states at 1280 and 375 px, in en-GB, zh-Hans and ms-MY, in the four modes (144 conditions). Count cited and walked. Is any condition missing or unreached?
2. Faults: does F11 reach the watchdog's failure? Does the evidence show a storage re-check that still fails, without "Video read." said first? Is the absence of a new fault justified by the walker and the source (`faults.mjs` F3, `src/main.ts` `runPreflight`)?
3. Mapped first: are exactly the conditions VH-199's records read cited, and none walked again?
4. Expected: is each state's string whole, in place and true of its state, in the three languages?
5. Every row ends read.
6. The stage rule: the before; the table's name and place.
7. WCAG 1.4.10, 2.4.3, 3.3.1 and 4.1.3, for what the states touch. Is 375 px a fair limit for the 1.4.10 claim?
8. Tokens and documents: no product diff, no `docs/` edit.
9. **Points to judge:** each group's power and its peak load and samples at 8 or above (in the table and the `.load.log`s), and whether any reading depends on timing. The player instrument's failures in S-138 (compare VH-199's `matrix-2026-10-27.md:63`). The "cannot determine" outcomes of measure, targets, contrastExtra and limiting. F7 as a synthetic error event. The second job's reset instant (R2-2). Whether every walked cell rests on one machine. Anything the table claims that its records do not show.

Say for each: met, not met, or cannot say, with the file and line or record that shows it. List any defect in the app you find, which would become its own fix item.

## What you may not read

Any folder under `/Users/uazjob/Library/Application Support/Claude/side-session-notes/`. In `/Users/uazjob/UoN-Video-Helper-side/`: `vh220-claude-*`, `vh220-*compare*`, `vh220-progress.md`, `vh220-handover-*`, and every `vh220-*brief*` except this file. Write nothing anywhere except your answer.

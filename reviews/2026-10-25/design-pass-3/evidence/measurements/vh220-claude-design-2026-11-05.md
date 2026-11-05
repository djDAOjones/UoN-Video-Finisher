<!-- markdownlint-disable -->

# VH-220 — Claude's design reading

Saved 2026-11-04 by VH-220 #1, before Codex astra's design answer is opened. Base `ca093da` (VH-225 commit 2). Walker revision `9c52269607bccc4c`.

## The cells

VH-203's stage rule as VH-220 keeps it: VH-150's six states (`project/items/VH-150.md:49–54`) × 1280 and 375 px × en-GB, zh-Hans, ms-MY × light, dark, forced light, forced dark = **144 conditions**.

## Each state, its scenario

| # | VH-150's state | Scenario | Fault | Why this one |
| --- | --- | --- | --- | --- |
| 1 | a watchdog failure | S-90b, "Failed after the watchdog, locks lifted" | F11 | R2-1 is the settled state: the worker settled, Create back, the status no longer "The job is stopping". S-90a (locks held) is transient and outside the 144. |
| 2 | a second job | S-115, "Create again, saved" | none | The second job running, no result standing: R2-2's bar and progress text are the second job's own. |
| 3 | an unreadable file chosen beside an unsaved result | S-30, "Unreadable beside a kept result" | none | `finished()` then `notvideo.mp4`, no save: R2-3, the chooser secondary, Save the one primary. |
| 4 | a kept result with warnings | S-138, "Both warnings on a retained result" | F16, F4d | Both warnings on a result kept by "Keep it": the Rank 3 nesting reading. |
| 5 | a storage re-check that fails | **S-31:recheck**, in memory | F3 | See below. |
| 6 | both Set buttons | **S-32:set-start** and **S-32:set-end**, in memory | F7 | See below. |

## Mapped first: VH-199's records

From `PLANS['run-01']…['run-12']` less every key `matrix-coverage-2026-10-27.json` lists missing, at 1280 or 375 px in the four modes: S-90b 3 (1280, light, three languages), S-115 3 (1280, light), S-30 6 (1280 and 375, light), S-138 3 (1280, light); S-31 and S-32 were read only as the first block and the plain preview failure, not these states. **Cited: 15 conditions. Walked: 129**, as 153 records (state 6 is two records per condition). Each group sets up once per scenario, variant, language and view (matrix.mjs groups so), so 42 setups.

## The storage re-check that still fails: no new fault needed

The criteria say it "needs a new fault". Read in source and walker, it does not:
- F3 is a worker prelude (`faults.mjs`, F3) rewriting `navigator.storage.estimate` in the worker module as it is fetched, so it holds for the page's worker and any later one; every re-check `runPreflight` sends (`src/main.ts:1597`, by Check again, a trim or the preset) meets the same 5 MB quota and blocks again (`:1658–1687`).
- What no record has is **the re-check let finish**: S-31 is the first block; the keyboard route presses Check again and then Stop the check at once (S-35, `scenarios.mjs:1234–1236`).
- So the walker change the criteria name is not needed: S-31:recheck is S-31's setup, then Check again pressed and the block awaited again, in the driver's memory, as VH-225's `S-03:open` was. matrix.mjs and the walker stay at `9c52269607bccc4c`, one revision before and after. Its proof, on the base at 1280 and 375 px before the walk: the block shown again after a "Checking" seen, Check again offered again, and, as VH-150's Rank 3 asks, no "Video read." written to the source line between the press and the block.
- If the record holds that a fault must still be added, that is the owner's or the orchestrator's word; no fault is written without it.

## Both Set buttons

The focus hand-over at the preview's failure (`src/main.ts:2091–2099`): with focus on "Set start here" or "Set end here", an `error` on the preview gives focus to that button's own time field. S-32 sets F7 with focus elsewhere. S-32:set-start and :set-end, in memory: `ready`, focus on the button, F7 in place; the state adds focus on `#trim-start` or `#trim-end`.

## The probe (read-only), per record

Focus (the active element's id), `#status` and `#source-status` text, the status line's writes since setup (`__p8.writes`), the state's key strings by `__mx`, and for S-31:recheck the source line's texts between the press and the block (a `MutationObserver` the variant's setup installs before it presses; it writes nothing to the page).

## Expected, per row

Each state's strings as the language table holds them, shown whole (the walker's overflow and clip instruments), in place, and true of the state; focus where VH-150 puts it. WCAG for what it touches: 1.4.10 (no sideways scroll at 375 px; overflow), 2.4.3 (focus after the re-check, the Set buttons and the unreadable file), 3.3.1 (the failure, the block and the unreadable file named in text), 4.1.3 (the status line and source line: said once, not repeated).

## No product diff

A check item: a defect found becomes its own fix item before VH-203, raised as a stop, not built here.

## The tools

`$S/vh220-walk/`: `go.sh`, `walk.sh` and `vh220-driver.mjs` copied from `$S/vh225-walk/`, the originals untouched; the table by `$S/table-1page.mjs` as `vh220-states-2026-11-04.md`.

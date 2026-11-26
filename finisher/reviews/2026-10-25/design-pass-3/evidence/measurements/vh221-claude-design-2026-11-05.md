<!-- markdownlint-disable -->

# VH-221 #1 — Claude's design reading

Saved 2026-11-04, before any Codex design answer exists. Base `ca093da` (VH-225 commit 2), walker revision `9c52269607bccc4c`, worktree `$S/vh221` on `side/vh221`. A check item: no product diff; a defect found becomes its own fix item before VH-203, raised to the orchestrator, not fixed here.

## 1. The rows (VH-221's Intent, by `grep -n` in `src/i18n/en-GB.ts` and the callers in `src/`)

| # | Row group | Keys | Where it shows | Scenario that reaches it |
| --- | --- | --- | --- | --- |
| R1 | the failed-browser sentence | `browserNote.notPassed` | `#browser-note`, visible | S-02 (F2, a check fails), S-106 (F17, a warn) |
| R2 | Creating | `status.creating` with `{notice}` = `progress.jobNotice` | `#status` (role=status), spoken only (`main.ts:3145`, a `.visually-hidden` span) | S-48 |
| R3 | could-not-create | `status.couldNotCreate` with `{sentence}` | `#status`, spoken only (`main.ts:3223`, `:3244`, `:3266`) | S-56 |
| R4 | a stopped save | `status.saveStopped` | `#save-status`, visible (`main.ts:3527`) | S-66 |
| R5 | an unsaved save | `status.notSaved` | `#save-status`, visible | S-67 |
| R6 | a failed save's two sentences | `status.saveFailedWhat`, `status.saveFailedNext` | `#save-error` notification (title, line), and spoken in `#save-status` (`main.ts:3604–3610`) | S-69 |
| R7 | Errors captured | `errors.heading`, `failure.captured`, `errors.revealed` | `#errors-panel` heading and intro, visible; `errors.revealed` spoken in `#page-announcer` (`main.ts:1083`) | S-74 |
| R8 | the out-of-date Chrome reason | `preflight.chromeLacks` inside `failure.startup.noWebCodecs` | `#source-status`, visible, only where `blockContextFor` (`preflight-panel.ts:49–52`) says Chrome on a computer | S-02 |
| R9 | the save dialog's file kind | `save.pickerDescription` | the `types[0].description` of `showSaveFilePicker`'s argument (`src/media/save.ts:130`) | S-62 |

**Retired, not walked:** the pending and passed browser sentences, `browserNote.pending` and `browserNote.passed`, removed by VH-187 (`83be720`, 2026-10-24) from the three tables; the page's source now is `src/ui/system-check.ts:71–73`, which returns `notPassed` on a fail or a warn and `null` otherwise. Every row string above is unchanged between VH-199's source `a3039c3` and the base, in all three tables (`vh221-rows-*.txt`, read by `git show`).

## 2. The grid and the map

Each row at w1280 and w375, in en-GB (control), zh-Hans and ms-MY, in light, dark, forced light and forced dark: 24 cells a row, 9 rows, **216 row cells**.

**Mapped first** (`vh221-map.mjs`, read-only: VH-199's twelve runs are the walker's `PLANS` `run-01`…`run-12`, whose counts match `matrix-coverage-2026-10-27.json`'s expected, less its missing keys). A cell is cited when all hold: VH-199 recorded the same scenario, language, view and mode; its record read the row itself (the key in the scenario's state predicate); the row's strings are unchanged since `a3039c3`; and nothing since changed the row's element, its writing code or its CSS (`git diff a3039c3 HEAD`).
- R4: S-66's state reads `status.saveStopped` in `#save-status`; VH-199 holds 3 cells (w1280 light, three languages). Cited: **3**.
- R5: S-67's state reads `status.notSaved`; 6 cells (w1280 and w375 light). Cited: **6**.
- R6: S-69 reads `saveFailedWhat` only, not `saveFailedNext`: not cited, walked.
- R1: S-106 and S-107 read `browserNote.notPassed` in 15 cells each, but VH-229 moved `#browser-note` out of the lede and gave it its own rule (`index.html`, `app.css`): not cited, walked.
- R2, R3, R7, R8, R9: no VH-199 state reads the row's key, and no record holds the picker's argument: walked.

**Cited 9, walked 207** row cells. A new scenario or fault: **none**. Every row is reached at 1280 by an existing scenario and fault. At 375 every row is reached but R8: the 375 view is a phone (`qualify.mjs:969`, UA_MOBILE at `:992`), where the page rightly gives `preflight.tryChrome` instead. Those 12 cells are stated as not reached, with `tryChrome` read in its place. R8's narrow reading is added at the walker's existing w320 view, a desktop width: S-02, 3 languages × 4 modes, **12 cells added**, no walker change. No coverage is reduced.

## 3. How it is walked

VH-225's driver and launchers are copied to `$S/vh221-walk/` (originals untouched): `matrix.mjs` unchanged on a plan in memory (`--plan cross`), and the driver's probe replaced by a read-only row probe after each scenario's own `afterMode`. Per cell, the probe reads each row's element:
- its text, with `M.is`, `M.says` or `M.has` against the page's own table (`window.__mx`);
- whether it is shown (`M.vis`) or spoken only (a `.visually-hidden` child of a `role=status` or `aria-live` region);
- its box inside the viewport, its own `scrollWidth` against its `clientWidth`, the page's sideways scroll, its lines, and any Latin word broken inside it;
- the region's live-region history from `window.__audit.live`, for R2, R3, R6 and R7's spoken rows.

For R9 the driver adds one document-start script. It wraps whatever `showSaveFilePicker` the page holds (the walker's stub, or a fault's), records the argument's `types` into `window.__vh221`, and calls through with the same argument and result. It records; it never answers. The stub is not the dialog. The native dialog as a person sees it stays wish VH-153.1, narrowed to it.

Groups run one at a time by `vh221-go.sh` under the lock, at AC, below load 8:
- startup: S-02, S-02 at w320, S-106;
- job: S-48, S-56;
- save: S-66, S-67, S-69, S-62;
- errors: S-74.

**Before and after.** The before is walked on clean `$BASE` in `$W`. With no product diff, the final build is the base: the after is a second walk of the same groups on the final tree, recording its diff hash. A cell that differs between the two is a timed row, re-walked by #37's ruling. The table is `$M/vh221-browser-rows-2026-11-04.md`, built by `$S/table-1page.mjs`, records beside it, notes as `.txt`.

## 4. Expected, and what would be a finding

Each row's string as its table holds it, placeholders filled. Shown whole: not clipped, no sideways scroll, no Latin word broken. In place: in the element named above. True of the state the scenario's predicate holds. A spoken-only row counts as present only inside its live region. A row missing, clipped, out of place, or not true of its state is a defect: a fix item before VH-203, raised to the orchestrator.

**WCAG re-checked for what it touches:**
- **1.4.10:** no sideways scroll at 375 and 320, each row whole.
- **3.1.5:** the en-GB rows against the project's reading-grade gate (the gate's own test). The zh-Hans and ms-MY rows are the agent's drafts awaiting the native check, so no reading-level claim is made for them.
- **3.3.1:** R3, R6, R7 and R8 say the error in text.
- **4.1.3:** R2, R3, R4, R5, R6 and R7's spoken rows sit in `role=status` or `aria-live` regions and are said without focus moving.

Digest rules named at close: nielsen and "errors say what next".

## 5. Points I hold for the compare
1. Citing 9 cells, by the four-part condition, rather than walking them.
2. R8 at 375 not reached, `tryChrome` read there and w320 added, rather than a new scenario with a desktop UA at 375.
3. The picker wrapper as a read-only probe, not a walker change.
4. Two walks, before and after, on one build, rather than one walk serving both.

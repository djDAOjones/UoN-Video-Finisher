<!-- markdownlint-disable -->

# VH-221 #1 — the design compare

- **Claude's design:** `vh221-claude-design.md`, saved 2026-11-04 ~09:25Z, before Codex's run started.
- **Codex astra's blind design:** `vh221-codex-design.md`, run from `vh221-codex-design-brief.md` (~09:33Z to 10:12:50Z). It was opened after it ended, and after Claude's design was saved.

## Agreed
1. **The rows and their elements.** Codex counts ten rows (a failed save gives two), Claude nine groups: the same keys.
   - Visible: `#browser-note`; `#save-status`; `#save-error` with its spoken twin; `#errors-intro` with `errors.heading`; `#source-status`.
   - Spoken only: `#status`'s hidden span; `errors.revealed` in `#page-announcer`.
   - The file kind: the picker argument's `types[0].description`.
2. **Retired:** `browserNote.pending` and `.passed`, by `83be720`; the source now is `system-check.ts:71–73`.
3. **Reach:** S-02/F2, S-48, S-56/F12, S-66/F4b, S-67/F4a, S-69/F4e, S-74/F8 and S-62 with the walker's stub. The out-of-date Chrome reason is not reached at 375, because the 375 view's phone user agent (`qualify.mjs:992`) makes `blockContextFor` choose `tryChrome`.
4. **The stub is not the dialog.** The file kind is checked as the description and `video/mp4: ['.mp4']` against `save.ts:130`. The native dialog stays wish VH-153.1.
5. **Expected:** the whole resolved string in its visible or spoken place, true of its state. Missing evidence is unresolved, never a pass. A defect becomes a fix item before VH-203.
6. **4.1.3:** live-region role and exposure, said without focus moving. A speech reading is a person's.

## Codex only, taken
7. **The map's condition:** complete row evidence, the same fixture, user agent, fonts and rendering, with the 28 commits audited. Claude's nine cited cells rest on S-66's and S-67's `M.has` state. Their "whole" reading lives in VH-199's per-cell records outside this repository, which rule 2 forbids fetching. And VH-208 (`905e103`) reordered the result area that holds `#save-status`. **Settled: 0 cited.** All 240 row cells (10 rows × 24) are walked on the base. That is more coverage, not less.
8. **1.4.10 at 320 CSS px:** 375 alone is not the reflow width. **Taken:** each scenario is also walked at the walker's w320, a desktop view, in light, in three languages.
9. **3.3.1:** these rows are system failures, not input errors. Non-applicability is recorded with its reason; the errors are still said in text (Nielsen 9).
10. **Risks:**
    - Creating is read from the region's spoken history (`window.__audit.live`), not only the line at the state.
    - The spoken rows hold across modes because one transition serves each; the visible rows are read per mode.
    - The user agent is recorded per cell.

## Claude only, kept
11. **S-106 (a warn) beside S-02 (a fail)** for the failed-browser sentence: the second state the sentence names. It is an addition.
12. **3.1.5:** en-GB by the gate's reading-grade test. zh-Hans and ms-MY get Claude's plain-language reading, marked as no native reading; the drafts await the native check. This covers Codex's "assess each translation" as far as a non-native reading can go.

## Disagreed, settled
13. **The out-of-date Chrome reason at 375.**
    - Claude: not reached, `tryChrome` read there, w320 added.
    - Codex: a new named scenario at 375 geometry with a desktop Chrome user agent and the existing F2, qualified, and the revision frozen.
    - **Codex's taken.** The item's criteria ("where none reaches a row, a new one, named and qualified by VH-198's method") and section 0 of the brief, which gives this reason as the example, both name it.
    - So: one new scenario, S-02's fault with the desktop user agent restored after the view is set. Its state requires `noWebCodecs` with `chromeLacks` in `#source-status`.
    - It is qualified on the base at w1280 and w375. The correct case must hold. The wrong-branch case, the phone user agent kept, must fail its state.
    - Both revisions are recorded: `9c52269607bccc4c` before, and the new one.
14. **The file kind's reading.**
    - Claude: a pass-through wrapper on `showSaveFilePicker`.
    - Codex: a CDP breakpoint at the call, reading `options`, with the function never replaced.
    - **Codex's taken, as strictly read-only.** The driver sets `Debugger.setBreakpointByUrl` on the served `src/media/save.ts` at the line holding `showSaveFilePicker(options)`, found in the served text. On `Debugger.paused` it evaluates `options.types` on the top frame, records it and resumes. The walker's stub is untouched.
15. **Before and after.**
    - Claude: two walks of one build.
    - Codex: one measurement may serve both columns where build equivalence is shown.
    - **Codex's taken.** One walk on the base. Its product diff (`src/`, `index.html`, `public/`) is empty at the walk and at the close, by `git diff`. The table states that it serves both columns. No reading is duplicated, and none is invented.

## The plan, as settled
- Startup: S-02, S-106, S-155. Job: S-48, S-56. Save: S-66, S-67, S-69, S-62. Errors: S-74.
- Each at w1280 and w375 in four modes, plus w320 light. S-155 runs at w375 and w1280 only, in four modes.
- One background group at a time, under the lock.
- No other walker change.

## Outcome: the ID taken
- **S-155**, on Orchestrator #38's word (2026-11-04): S-154 already exists on the base as a `SOURCE_ONLY` entry (VH-186's estimate with no time; `scenarios.mjs:1328`, `:1488`, `:2901`, `parts.mjs:41`, `:79`). The ranges: VH-221 takes S-155 and F21; VH-222 takes S-156 to S-159 and F22 to F25. VH-221 needs no new fault, so F21 stays unused.
- Added to `$W`'s walker, `scenarios.mjs`, after S-02: revision `9c52269607bccc4c` before, `c27c325ffc8c3b6f` after.

<!-- markdownlint-disable -->

# VH-221 — Codex astra's blind design check (read-only)

You are checking, blind, how a check item should be walked. Give your own design. You are not shown anyone else's design or reasoning. Read-only: change no file, run no walker, browser or server.

## Where
The working directory is the item's worktree, a checkout of base `ca093da0c8c5f91aae5f964e6c4e2b12bd61b2b1`. The measurement bundle is `reviews/2026-10-25/design-pass-3/evidence/measurements/` (call it `$M`), the walker at `$M/walker/`, instrument revision `9c52269607bccc4c`.

**You may read:**
- `project/items/VH-221.md` (the contract), `project/items/VH-153.md` and `project/items/VH-203.md`;
- `src/` and `index.html`;
- `$M/walker/*.mjs` (read-only);
- `$M/matrix-coverage-2026-10-27.json`, `$M/matrix-2026-10-27.md` and the `$M/digest-*-2026-10-27.md` files;
- `project/wish-list.md` (VH-153.1's line), `UI-STANDARDS.md` and `project/digests/*.md`;
- `git log` and `git show` in this checkout.

**You must not read:**
- any folder under `/Users/joe/Library/Application Support/Claude/side-session-notes/`;
- anything under `/Users/joe/UoN-Video-Helper-side/` but this brief;
- anything outside this checkout.

## The item
VH-221 checks, in Chrome, in zh-Hans and ms-MY with en-GB as the control, VH-153's rows that only a job or a failing browser reaches (VH-221's Intent):
- the browser sentence before and after a failed check;
- Creating, and could-not-create;
- a stopped save, and an unsaved save;
- a failed save's two sentences;
- Errors captured;
- the out-of-date Chrome reason;
- the save dialog's file kind.

Every criterion in `project/items/VH-221.md` holds. A check item has no product diff: a defect it finds becomes its own fix item before VH-203. VH-199's records were walked on source `a3039c3`, 28 commits before this base.

## The owner's words (verbatim)
- "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" (2026-10-27; group B covers a new fault or scenario, named and qualified by VH-198's method)
- "Yes, leave them" (2026-10-30, on the walker checks that pin the old page order: they fail on the base and stay failing)
- "gateless run where possible" (2026-10-31)

## Fixed by the orchestrator
- The walker stays at one revision unless a new scenario or fault is needed for a row no existing one reaches. A driver outside the walker may run `matrix.mjs` unchanged on a plan in memory, with a read-only probe; that is no walker change. Any other walker change is a stop.
- A cell is (row, scenario, language, view, mode). The grid is w1280 and w375 × en-GB, zh-Hans, ms-MY × light, dark, forced light, forced dark.
- A stub is never counted as the save dialog. The native dialog as a person sees it stays wish VH-153.1.

## Answer each, with file:line evidence
1. **The rows:** each row's table key or keys, the element that shows or speaks it, and whether it is visible or spoken only.
2. **Retired rows:** which browser sentences the page no longer has, and their source (the commit and the current code).
3. **Reach:** for each row, an existing scenario and fault that reaches it at 1280 and at 375, or none and why. Say whether a new scenario or fault is needed, and for which row.
4. **The map:** which cells VH-199's records already read, so they are cited and not walked. Say what "the condition matches" should require, given the 28 commits since `a3039c3`. Give the cited and walked counts.
5. **The file kind:** how to read it from the `showSaveFilePicker` call's argument without changing the walker or counting a stub as the dialog.
6. **Before and after:** with no product diff, what the before and the after should each be.
7. **Expected, and a finding:** what each cell must show, and what counts as a defect.
8. **WCAG:** how to re-check 1.4.10, 3.1.5, 3.3.1 and 4.1.3 for these rows.
9. **Risks:** timing (the worker ping's 5 s deadline, job states), the 375 view's user agent, and anything else that could make a reading false.

Keep the answer under 1,200 words. Number your points to match.

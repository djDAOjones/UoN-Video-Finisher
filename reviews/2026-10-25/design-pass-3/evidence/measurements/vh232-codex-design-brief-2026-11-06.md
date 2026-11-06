<!-- markdownlint-disable -->

# VH-232 — Codex astra's blind design check (brief)

You are Codex astra, the project's read-only reviewer. You are run from a worktree of the repository at `926b2d7eaed980f882f20b1223a976aeba48b0f3` (VH-220's landing), which is also origin/main; its tracked tree is clean. Change nothing. No network.

**What you may read:** the repository you are run in, at HEAD; and, read only, these files in the side folder `/Users/uazjob/UoN-Video-Helper-side/`:
- `vh222-wip-6/untracked/reviews/2026-10-25/design-pass-3/evidence/measurements/vh222-warning-rows-2026-11-05.md` (VH-222's table, sha1 `ae037863`), above all its line 99, "The feedback status at 320 px (17 cells)";
- in its records folder beside it, `vh222-records-2026-11-05/`: `vh222-sum-g4.txt` (lines 37–38 and 45–46), `g4.vh222-probe-vh222-base-g4.jsonl` (180 lines, one a cell: search it for `"S-79a"` and `"S-79b"`, never print it whole), `g4.outcomes.jsonl` and `vh222-driver.mjs.txt` (by search);
- `vh222-codex-blind.md` (sha1 `7524d58e`), your own blind verdict on VH-222, its point (b), lines 96–100 and 134–141;
- `plan8-owner-words.md` (sha1 `7c7b1169`), lines 185, 275, 395, 437 and 438 only.

**Read nothing else outside the repository:** no other checkout or worktree (not `vh222/`, `vh224/`, `vh231/`), no other file in the side folder, and never any folder under `/Users/joe/Library/Application Support/Claude/side-session-notes/` or `/Users/uazjob/Library/Application Support/Claude/side-session-notes/`. In the side folder, never `vh232-claude-*`, `vh232-*compare*`, `vh232-progress.md`, `vh232-handover-*`, or any `vh232-*brief*` but this one. Read large files by line range or search, never whole.

## The task

VH-232 is a fix item being raised, ledger only: nothing is built in this step. A later worker builds it from the item file this step writes. Give your own **design**: the remedy, stated as criteria a builder can test, and the stage rule's measure. You are blind: you are not given Claude's design.

## The defect, as ruled

VH-222 (a check item) walked S-79a ("Feedback oversized: no mailto") and S-79b ("Feedback fits, its details do not") on the owner's Mac Pro, in g4, 36 cells each (1280, 375 and 320 px; en-GB, zh-Hans, ms-MY; light, dark, forced light, forced dark). In S-79a's 3 cells at 320 px in light, and S-79b's 14 (320 px in all four modes, and 375 px light in en-GB and ms-MY), `#feedback-status` is whole and unbroken, but it runs past the visible area of `#feedback-dialog` (`overflow: auto`, as tall as the window less 32 px): only its first two lines show, and the row's own sentence (`feedback.someOmitted`, the omitted details, or `feedback.tooLong`'s address to write to) lies wholly below; nothing reveals it. The orchestrator's ruling (2026-11-05 ~23:30Z): **a defect under Nielsen's "status visible and announced"** (the profile's digest rule, `project/profile.md`, Standards adopted; `project/digests/nielsen.md`, heuristic 1), **not a WCAG failure**: 1.4.10 and 4.1.3 pass. **Whether the keyboard alone scrolls the dialog was not measured.**

## The owner's words, verbatim, with their source (`plan8-owner-words.md`)

- `:437`, answer 1: "Here on the Mac Pro (Recommended)" — a fix item raised by VH-220 to VH-224 is built, walked, gated and landed on the Mac Pro, on its own branch.
- `:438`, answer 2: "Re-walk here (Recommended)" — each table rests on one machine; the MacBook Pro's records are cited as support only.
- `:275`: "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" (group B; VH-222's stage rule: a defect it finds becomes a fix item, planned the same way, before VH-203).
- `:185` and `:395`: gateless ("gateless run where possible").
- **The owner approved no new or changed wording for this item.** A new or changed user-facing string in any language, or any `docs/` edit, would need the owner's approval; a new element, control or checkbox likewise.

## Where to read (at HEAD)

- `src/main.ts`: the feedback block from `:3640` (`setFeedbackStatus` `:3656–3660`; `openFeedback` `:3707`; the sets at `:3772`, `:3780–3782`, `:3791`, `:3796`); `show()` and `regions` at `:267–285`; `handOnFocus` at `:952`.
- `index.html:870–909`: the dialog; `#feedback-status` is `<p class="status" role="status" aria-live="polite">`, last in the form, after the actions.
- `src/styles/app.css`: `.status` `:464–469`; `.dialog` `:1641–1650`; the narrow-window rules from `:1699`; reduced motion `:556`. Tokens: `src/styles/tokens.carbon.css` (`--spacing-05` `:36`, `--spacing-07` `:38`, `--dialog-width` `:83`), `tokens.brand.css`.
- `src/ui/feedback.ts` and `src/ui/feedback.test.ts`; `src/ui/focus-hand-on.ts` (a model of a DOM helper tested with stand-ins).
- The standards: `UI-STANDARDS.md` (System status `:123`; Motion discipline `:180`; Operable `:236`); `project/digests/nielsen.md`; `project/digests/wcag-2.2-aaa.md`; `project/digests/house-conventions.md` ("Patterns to follow", "Minimal change discipline"); `project/rules.md` (Always: numbers in `src/config/` or a CSS token).
- The walker, read only: `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/` — `scenarios.mjs` (the feedback scenarios S-75 to S-80b at `:932–1002`; the keyboard route `K-dialog` at `:1132`; J3's feedback steps at `:1262–1268`; `PLANS` at `:1311`; the views 1280 × 900, 375 × 812, 320 × 568 at `:2776`), `qualify.mjs` (`key()` at `:533`, CDP `Input.dispatchKeyEvent`).
- The form of a raised fix item: `project/items/VH-231.md` (and `VH-215.md`); `project/items/_schema.md`; `project/items/VH-222.md`, `VH-220.md`, `VH-221.md`, `VH-223.md`, `VH-224.md`, `VH-203.md`.

## Answer each, with file and line

1. **The remedy.** What should happen when `#feedback-status` is set, so that its whole text, the row's own sentence included, is in view in `#feedback-dialog` at 1280, 375 and 320 px in every language and mode, without taking focus from where it is (4.1.3's status stays a status) and announced as now? Weigh the options you see (for example: revealing the status by scrolling the dialog; moving the status in the DOM; a sticky status; a shorter text; a taller dialog) and choose one. Say exactly what moves and what must not (focus, the page behind, the dialog's size and layout, the other elements), and what happens when the status is taller than the dialog's visible area, when it is emptied, when the dialog is closed before an asynchronous set lands, and on a change of language.
2. **The code it reaches,** by file and line: `setFeedbackStatus`, the dialog's styles, the tokens. Any number in `src/config/` or a CSS token, none a literal. Whether a helper belongs in `src/ui/` with a stand-in test, and what the tests must cover.
3. **Words and elements.** Does your remedy need any new or changed string, `docs/` line or element? If so, say which, as a draft for the owner, not a design choice.
4. **The standards it touches:** which Nielsen and WCAG 2.2 AAA criteria (for example 1.4.10, 2.3.3, 2.4.11/2.4.12, 3.2.1/3.2.5, 4.1.3) the remedy reaches, and how each is checked.
5. **The stage rule's measure** (VH-203's stage rule, kept whole as `VH-231.md` keeps it): the before walked on the Mac Pro on the build's base; which scenarios set `#feedback-status` (S-79a and S-79b at least) and which controls; at 1280, 375 and 320 px, in en-GB, zh-Hans and ms-MY, light, dark, forced light and forced dark; what reading decides "whole and in view"; and **how the build measures whether the keyboard alone scrolls the dialog** (before and after), without changing the walker (a driver outside it may add a route or a plan in memory, with a read-only probe). The table is `vh232-feedback-status-2026-11-DD.md`.
6. **Re-reads after it lands:** which other checks' cells read the feedback dialog (VH-222's S-79a and S-79b at least; search VH-220, VH-221, VH-223 and VH-224's item files), and which of them the remedy changes.
7. **Size and risk:** whether it fits one worker (about 45k of work under VH-211's sizing rule) and what would make it outgrow that.

Close with one verdict line: whether the item should be raised as you design it, and anything that must go to the owner first.

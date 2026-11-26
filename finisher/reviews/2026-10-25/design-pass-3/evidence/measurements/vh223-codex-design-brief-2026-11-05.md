<!-- markdownlint-disable -->

# VH-223 — Codex astra's blind design check

You are reviewing, read-only, the design of one check item in the repository in your working directory (the UoN Video Finisher app, a browser-only TypeScript/Vite app, with a measurement walker under `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/`). You design independently: you are not shown the implementer's design. Answer every point with your own recommendation and its reason, citing `file:line`. Write nothing.

## The item and the owner's words
- `project/items/VH-223.md`: every criterion holds. A check item: no product diff unless it finds a defect, which becomes its own fix item before VH-203.
- The owner, verbatim: "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" (group B covers this item); "Yes, leave them" (the four walker checks that pin the old page order wait for VH-203; see `project/wish-list.md`, VH-216.1); "Gateless covers the rest of Phase 8"; "gateless run where possible".
- Settled: rows pinning the old order fail on the base and stay failing, reported as expected; a 32 px page shot shows the default size and no visual approval rests on it; `f.changedAny` moves 1–2 px between runs, no claim rests on it alone; the walker is changed only by the key list the criteria name, one revision before (`9c52269607bccc4c`) and one after.

## What you may read
The repository, read-only: `project/items/VH-223.md`, `VH-203.md`, `VH-198.md`, `VH-199.md`, `VH-172.md`; `project/rules.md`, `project/profile.md`, `project/digests/*.md`, `UI-STANDARDS.md`, `project/wish-list.md`, `project/backlog.md`, `project/decisions.md`; the walker (`matrix.mjs`, `runner.mjs`, `scenarios.mjs`, `qualify.mjs`, `phase8.mjs`, `wcag-checks.mjs`, `cdp.mjs`, `parts.mjs`); in `reviews/2026-10-25/design-pass-3/evidence/measurements/`: `unrun-2026-10-27.json`, `matrix-2026-10-27.md`, `matrix-coverage-2026-10-27.json`, the `digest-*-2026-10-27.md` files; `reviews/2026-10-22/design-pass-2/evidence/measurements/after-manifest-2026-10-24.json` and `matrix-manifest-2026-10-23.json`. Outside it, read-only: `/Users/joe/UoN-Video-Helper-side/table-1page.mjs`, and `/Users/joe/UoN-Video-Helper-side/vh225-walk/` (`vh225-driver.mjs`, `go.sh`, `walk.sh`, `vh225-seq.zsh`).
**Forbidden:** every folder under `/Users/joe/Library/Application Support/Claude/side-session-notes/`; in `/Users/joe/UoN-Video-Helper-side/`, every `vh223-claude-*`, `vh223-*compare*`, `vh223-progress.md`, `vh223-handover-*` and every `vh223-*brief*` but this one; any other item's files there not named above.

## Points to judge
1. **The keys.** Derive batch A from `stillUnrun` by the item's rule and check the count 42 + 24 + 24 + 6 + 6 + 6 = 108, and that no key is in two classes. Which PLANS entry declares them, and how often each? Does a VH-176 (or VH-172) before reading exist for any of them, and where would one be linked?
2. **The walker change.** The runner filters by scenario (`matrix.mjs:196`–`:198`). Design the exact key list: where it goes, its input format and how it is passed so that VH-224 reuses it unchanged with its own 106 keys, what it refuses (and when, relative to the run directory), the run's name, and what must stay byte-same for existing callers (ids after the plan name, `--resume`, parts and runs). The smallest change.
3. **Qualifying it by VH-198's method** (`project/items/VH-198.md`, criteria): what "named", "proved to detect", "pilot" and "manifest" mean for a key filter; which proofs (planted failures included) you require; whether a proof that declares records but reaches no browser needs the walk lock.
4. **The walk.** Groups, order and sizes for the 108; one job per group in sequence; the driver's role given the walker now selects keys (is a plan in memory or a page probe needed or wanted?); fixtures; power, load and void rules; what to re-walk when load samples reach 8.
5. **Judging each key.** What makes a key OK or NOT-OK from its record (status, reached, instrument outcomes, assert rows, `cannot-determine`, `n/a`); the attribution classes for a NOT-OK; what makes a NOT-OK a new defect needing its own fix item before VH-203.
6. **WCAG.** Which of 1.4.3, 1.4.4, 1.4.6, 1.4.10, 1.4.11, 1.4.12, 2.3.3, 2.4.7, 2.4.13, 2.5.5 apply to batch A's views and modes, by which instrument; which do not, and why.
7. **The table.** `table-1page.mjs` compares before → after groups. With no before walk, how should it be driven so the page is true (what its Before column and counts say)? How should "the accepted record per key" be listed so VH-224's reconcile can read it?
8. **Risks.** Anything in the walker, the plan or the scenarios that would make a batch A key unreachable, slow, or misread (for example a job scenario, a timed row, a scenario that declares subresults), and how to handle it.

## Answer
Numbered by point, each with a recommendation, its reason and `file:line`; then "Musts" (what the design must do to pass) and "Mays". Verbatim, no preamble.

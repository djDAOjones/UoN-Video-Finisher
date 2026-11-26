<!-- markdownlint-disable -->

# VH-220 — Codex astra's design check, blind

You are Codex astra, checking the design of a check item before it is walked. Work read-only. Answer from the repository and the files named here; give your own design, not a review of someone else's.

## Where

- The repository: the current directory, at commit `ca093da0c8c5f91aae5f964e6c4e2b12bd61b2b1` (the base). The same tree is checked out at `/Users/joe/UoN-Video-Helper-side/vh220`.
- The item, your contract: `project/items/VH-220.md`. The states it names: `project/items/VH-150.md`, lines 48–54, and its criteria above them (R2-1 to R2-5, the Rank 3 items).
- The walker: `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/` (`scenarios.mjs`, `faults.mjs`, `matrix.mjs`, `phase8.mjs`, `parts.mjs`, `qualify.mjs`). Its revision: `9c52269607bccc4c`.
- VH-199's records: `reviews/2026-10-25/design-pass-3/evidence/measurements/matrix-coverage-2026-10-27.json` (each run's missing keys; a record key is `scenario__lang__view__mode`), with `PLANS['run-01']` to `PLANS['run-12']` in `scenarios.mjs`/`parts.mjs` as the declared records.
- The app: `src/main.ts` (`runPreflight` from about line 1597; the Set buttons and the preview's error handler about lines 2067–2100; `offerStop` about 2404), `src/i18n/en-GB.ts`.

**Do not read** anything under `/Users/joe/Library/Application Support/Claude/side-session-notes/`, and in `/Users/joe/UoN-Video-Helper-side/` nothing but this brief: in particular no `vh220-claude-*`, `vh220-*compare*`, `vh220-progress.md`, `vh220-handover-*` or any other `vh220-*brief*`.

## The owner's words that govern it

- "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" (group B covers this check and a new fault or scenario it needs, named and qualified by VH-198's method).
- "Gateless covers the rest of Phase 8"; "gateless run where possible".
- "Yes, leave them" (walker rows pinning the old page order fail on the base and stay failing).

## The stage rule

VH-150's six states at 1280 and 375 px, in en-GB, zh-Hans and ms-MY, in light, dark, forced light and forced dark: 144 conditions. A condition one of VH-199's records already read is cited, not walked again; the rest are walked on the base with the existing scenarios and faults or, where none reaches a state, a new one named and qualified. The walker is run unchanged by a driver on a plan in memory where it can be; any change to the walker's files is a walker change and must be the one the criteria name.

## Answer each, with file and line evidence

1. For each of VH-150's six states, which scenario (and fault) reaches it best, and why; name any state no existing scenario reaches.
2. How many of the 144 conditions VH-199's records already read (by state), and how many must be walked.
3. "A storage re-check that still fails": the item says it "needs a new fault". Does it? Say exactly what the existing faults (F3 above all) do across a re-check, and what, if anything, no existing scenario does. If a fault is needed, specify it; if a scenario or in-memory variant is enough, specify that instead and say whether it is a walker change.
4. "Both Set buttons": what state is meant, which source lines hold it, and how a walk reaches it.
5. What each walked record should read beyond the walker's instruments, for "each row's string as the language table holds it, shown whole, in place and true of the state it names", and for WCAG 1.4.10, 2.4.3, 3.3.1 and 4.1.3.
6. Any risk: a state that is transient, a fault that cannot compose, a timing-dependent reading, a cell the walker cannot reach.

Keep it under 1,200 words. End with one line: `Design: <your summary verdict>`.

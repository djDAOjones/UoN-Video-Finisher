<!-- markdownlint-disable -->

# VH-231: blind check of the candidate

You are Codex astra, reviewing read-only. Say what you find, in your own reading. You are given no other reviewer's reading. Write nothing to any file.

**The checkout** is `/Users/uazjob/UoN-Video-Helper-side/vh231` (your working directory), on `side/vh231`. **The candidate** is the uncommitted diff against `4bc3a40fd771042b971d235a55404f76a7ae7693`: `git diff 4bc3a40fd771042b971d235a55404f76a7ae7693`, 18 files, diff hash `18bd9c46d0e81dec`. It touches `src/media/inspect.ts`, `src/workers/job.worker.ts`, `src/audio/warnings.ts`, `src/ui/trim.ts`, `src/ui/result-summary.ts`, `src/main.ts`, `src/i18n/{en-GB,zh-Hans,ms-MY,sheet}.ts`, `reviews/2026-10-18/VH-105-strings-filled.csv` and `docs/01-specification.md`, plus tests. The untracked evidence is the table `reviews/2026-10-25/design-pass-3/evidence/measurements/vh231-cut-whole-2026-11-05.md` and its records `vh231-records-2026-11-05/` beside it. The tests ran under the walk lock: 84 files, 1686 passed and 1 skipped, against the base's 1663 passed and 1 skipped. `tsc --noEmit` reads 0, and eslint on the changed `.ts` files reads 0.

**Read:**
- in the checkout: `project/items/VH-231.md`, every criterion; the entry "2026-11-05 — VH-231 — Raised" in `project/decisions.md`; `project/wish-list.md` (VH-231.1); `docs/01-specification.md` §5.4; `UI-STANDARDS.md`; `project/digests/nielsen.md`, `wcag-2.2-aaa.md` and `house-conventions.md`; `src/media/matroska-cut.ts`, `src/media/probe.ts`, `src/ui/format.ts` and `src/ui/preflight-panel.ts`, and any other source you need; the table and records.
- in `/Users/uazjob/UoN-Video-Helper-side/vh231-walk/`: the group folders `p1/`, `p2/`, `b1/`, `a1/` and `a1t/` (their `conditions.txt`, `runs/` with each cell's record and the page probes `*-probe-*.jsonl`, and `logs/`); the `*.launcher.log` and `*.load.log` files; `vh231-driver.mjs`, `walk.sh`, `go.sh`, `fix-make.sh`, `sum-b1.mjs`, `transitions.mjs`, the three `*.sum.txt` files and `transitions-b1-a1.txt`; `strings-proof.mjs` and `strings-proof.txt`.
- also `/Users/uazjob/UoN-Video-Helper-side/vh231-table-set-aside-1/` (the table's first generation, set aside).

**Do not read:** any folder under `side-session-notes/`. In `/Users/uazjob/UoN-Video-Helper-side/`, do not read `vh231-claude-*`, `vh231-*compare*`, `vh231-progress.md`, `vh231-handover-*`, or any `vh231-*brief*` but this one.

**The owner's words:**
- "ensure everything passes UX / design / Accessibility" (2026-10-27).
- To "Which wording should VH-231 build?": "Yes, as drafted". This approves the trim's and the record's words and spec §5.4's row, as the item gives them, with the zh-Hans and ms-MY machine drafts, whose native check is wish VH-231.1. Video properties' "Duration" stays as it is, by the owner's choice.
- "Here on the Mac Pro (Recommended)": a fix item is built, walked, gated and landed on the Mac Pro.
- "Re-walk here (Recommended)": the before is walked on the Mac Pro, and the MacBook Pro's records (VH-199's) are cited only.

Any other new or changed user-facing string, in any language, is outside these words.

**Settled, do not reopen:**
- the design of record from the raise: the warning keeps its existing words and adds no element;
- the approved wording;
- "Duration" unchanged;
- the walker unchanged at one revision, `9c52269607bccc4c`, before and after;
- the before walked on the base on this Mac.

**Answer each:**
1. Every acceptance criterion in `VH-231.md`: met, or how not, with file and line or record.
2. **The route.** Where is the cut-short fact read, and how many times per job and per worker step, before and after? Is each read bounded and streaming? Judge it against the criterion's "the file is read once, never twice (VH-82)" and the rule "Streaming, not buffering".
3. **Other behaviour.** Does the change alter behaviour for any caller or path the criteria don't name? Consider `inspectFile`'s callers, the dev diagnostics context (`setDiagnosticsContext` in `main.ts`), a throw or an abort during the bounded read, a file changed between inspection and Create, and the trim line before and after the inspection reply.
4. **The strings and the spec.** Are only the approved strings added, in each of the three languages, and is any existing string changed? Check the sheet's notes and machine-draft marking, the tables' tests, the spec row verbatim, and the spec's 8,200-word limit.
5. **The evidence.**
   - Is every reading in the table and its notes supported by the records?
   - Load: b1 peaked at 13.02 and a1 at 10.89, both with many samples at 8 or above, raised by their own three parallel jobs. a1t, S-64 and S-91 walked again with the languages in sequence, peaked at 5.41. Does any reading rest on a timing measure? Is the time estimate's handling sound: a1t of record for those 72 cells, a1's 44 set aside, and 4 cells still differing below load 8?
   - Is coverage reduced anywhere against the item's stage rule (IDs, readings, widths, languages, modes)?
   - Was setting aside the first generation and regenerating right?
6. **WCAG and nielsen.** From the readings, judge WCAG 1.3.1, 1.4.10, 2.4.6, 3.1.5, 3.3.1, 3.3.3 and 4.1.3, and nielsen's "status visible and announced" and "errors say what next".
7. **Tests.** Do they cover what the item lists? Is anything that the change does left untested?

**Verdict:** one of "Commit", "Commit after the musts below", or "Do not commit". Give musts, shoulds and notes apart, each with its evidence. Write nothing to the repository.

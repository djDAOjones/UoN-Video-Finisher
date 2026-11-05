<!-- markdownlint-disable -->

# VH-223 #1 — Claude's design (saved before Codex's answer is opened)

Base `ca093da0c8c5` (VH-225 commit 2). Walker `9c52269607bccc4c` at the base. Written 2026-11-04 ~10:00Z. A check item: no product diff.

## 1. The keys
`keys-a.mjs` (outside the walker) applies the item's exclusive rule to `unrun-2026-10-27.json`'s `stillUnrun` (214): view `w375`, `landscape` or `short`, or mode `dark`, `forced-dark` or `forced-light`; it throws on a key in two classes and exits 1 on any count but 42 + 24 + 24 + 6 + 6 + 6 = 108. Result: 108, 23 scenarios, no key in two classes. Of the walker's PLANS only `matrix` (1,886 records) declares them, each once; `priority` none. VH-176's before: the 108 appear only in `after-manifest-2026-10-24.json`'s `unrunAfter` (641), and VH-172's before was `PLANS.priority`, so a before exists for 0 of 108: each key's before is "no previous after-reading", that file linked as the proof.

## 2. The walker change, the one the criteria name
`walker/matrix.mjs` filters by scenario (`:196`–`:198`, `only.includes(r.id)`). Added:
- `export function keepKeys(records, keys)`: the records whose `recordKey` (runner.mjs:30, `id[~variant]__lang__view__mode`) the list names, in the plan's order. Refused (throws, before any run directory): a key repeated in the list; a listed key the plan does not declare (named); a key the plan declares twice. No record is added, reordered or changed.
- In `main()`: `node matrix.mjs <plan> --keys <file>`, the file one key per line, blank lines ignored; `--keys` with no file, or with anything after it, refused; ids after the plan name keep their meaning. The run is named `<plan>-keys`; the console names the list's count and sha256. `readFileSync` imported at the top. The header comment gains one line. Nothing else in the walker moves.
- Revisions: `9c52269607bccc4c` before, one new revision after, recorded; every walk at the new one.
- **How a key list is passed (VH-224 unchanged):** `node matrix.mjs matrix --keys <file>`, or by the driver's `--keys <file>`.

## 3. Qualified by VH-198's method
- **Named:** file, lines, both revisions, in the table's notes and the decision.
- **Proved, no browser:** `CDP_PORT` at a closed port, so `Run.create` writes the declared records and the connect fails at once; a scratch `RUN_ROOT`. (i) `--keys keys-a.txt` declares exactly the 108; (ii) a planted unknown key, (iii) a repeated key, (iv) a trailing argument: each refused, no run directory; (v) the old paths: `matrix S-03` and `smoke` declare the same keys at the new revision as at the old one, from a `git archive` of the base's walker in scratch. No Vite, no Chrome, no page: no walk or probe, so no lock.
- **Pilot:** 4 keys (one w375, one landscape, one short, one forced-dark), every declared instrument, checked whole before the groups; method evidence only.
- **Manifest:** the runner's own per run (source, revision, browser, scaling, fixtures by hash, coverage).

## 4. The walk
- Copied from `vh225-walk/` (originals untouched): `vh225-driver.mjs` → `vh223-driver.mjs`, reduced to power and ledger then `matrix.mjs matrix --keys <file>`: no plan in memory, no probe, no hook; `go.sh`, `walk.sh`, `vh225-seq.zsh` → `seq.zsh`, paths and `WHO` changed, one job line per group. Fixtures by APFS clone of `vh225-walk/fix/`, hashed by each manifest.
- Groups, in sequence: `pilot` 4; `w375` 42; `land` 24; `short` 24; `colour` 18 (each list a slice of `keys-a.txt`, the union proved equal). App and walker both `$W` at the base plus the walker change only. AC, powermode 2, both loads below 8 at each start, the lock; void and re-run as VH-225's sequence (a sleep gap, a power change, unfinished). Samples at 8 or above recorded; a reading that could depend on timing in such a group is re-walked or reads "no claim rests on it".

## 5. The judgement, per key
- **OK:** `status` ok, `reached` pass, no instrument `fail`, no assert row `fail`. `cannot-determine` and `n/a` are not NOT-OK; counted by instrument and explained.
- **NOT-OK, attributed** to one of: (A) already recorded: a wish, backlog or V-nn line naming that element and condition, cited; (B) the rows pinning the old order, wish VH-216.1, the owner's "Yes, leave them": expected failing; (C) the instrument's own limit or ordering, cited (e.g. wish VH-199.1); (D) a new defect: its own fix item before VH-203, one line to the orchestrator. Claude's attribution saved first; Codex's blind; compared.
- **WCAG where it applies:** 1.4.3 and 1.4.6 (contrastText), 1.4.10 (overflow), 1.4.11 (contrastExtra), 2.4.7 and 2.4.13 (focus), 2.5.5 (targets) in every key; 1.4.4, 1.4.12 and 2.3.3 need font32 or zoom, spacing, reduced motion: none in batch A, said so.

## 6. The table and records
`table-1page.mjs` unchanged, `--pairs no-before:after-w375,no-before:after-land,no-before:after-short,no-before:after-colour` (`no-before` a name with no folder: every key after-only, the Before column `?`), `--superseded` for the pilot, `--sources` the `.txt` copies of every script and the key lists, and `vh223-accepted-a.txt`: one line per key with its accepted group, run, record and judgement, for VH-224's reconcile. Notes: the before, the change and its proof, the judgements, the WCAG mapping, the 32 px rule (no 32 px key here). As `$M/vh223-matrix-a-2026-11-04.md`, records in `vh223-records-2026-11-04/`, `renamed.txt` written.

## 7. The close
Backlog line struck; one trajectory line; the decision; Now and Notes; wish VH-172.1 left as it is (VH-224 narrows it), the hand-over saying what batch A paid off; the Disposition row linked; Codex files in `$M`. Gate and checker green.

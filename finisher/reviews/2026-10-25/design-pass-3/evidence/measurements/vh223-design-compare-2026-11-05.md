<!-- markdownlint-disable -->

# VH-223 #1 — the design compare: Claude's design against Codex astra's blind check

Claude's design (`vh223-claude-design-2026-11-04.md`) saved ~10:01Z, sha1 `b36d1e62`, before Codex's answer was opened. Codex's run started 10:02:15Z, exited 10:13:37Z, its answer (`vh223-codex-design-2026-11-04.md.txt`) opened ~10:14Z. Compared ~10:20Z.

## Agreed
- **The keys:** 108 = 42 + 24 + 24 + 6 + 6 + 6, no key in two classes, each declared once by `PLANS.matrix` alone; no VH-176 or VH-172 reading for any (all 108 in VH-176's `unrunAfter`, none in `PLANS.priority`), so each before is "no previous after-reading", those manifests linked.
- **The walker change** at `matrix.mjs`'s selection (`:196`–`:198`): exact `recordKey` strings, filtered in the plan's order, full records kept before `declareRecord`; refused before `Run.create` on a repeated or undeclared key; run named `matrix-keys`; `runner.mjs`, scenarios, instruments and `parts.mjs` untouched; one new revision after `9c52269607bccc4c`; VH-224 passes its own list the same way.
- **No lock** for a declaration-only proof that reaches no browser.
- **The driver:** the real runner only; no plan in memory, no probe, no hook, no title panel opened.
- **Sequential groups,** one job each; void rules; samples at 8 or above named.
- **WCAG mapping:** 1.4.3/1.4.6 contrastText (and contrastExtra's text rows), 1.4.10 overflow, 1.4.11 contrastExtra, 2.4.7/2.4.13 focus, 2.5.5 targets; 1.4.4, 1.4.12, 2.3.3 not exercised by batch A.
- **The table:** an empty before, never after paired with itself.

## Codex only — applied
- **Refusals widened:** an empty list, a line not of the key's shape, `--keys` anywhere but straight after the plan name (so never mixed with ids or `--resume`).
- **Proofs widened:** the 106-key complement selected exactly; each selected declaration byte-equal to the same record in the unfiltered `matrix` declaration; every walker file but `matrix.mjs` byte-same at the new revision (so the instruments' VH-198 proofs stand).
- **Groups by scenario,** Codex's seven (15, 27, 15, 15, 15, 15, 6 keys; S-24, S-48 and S-90a/b apart), after a 4-key pilot (w375 job S-24, landscape, short, forced-dark), which stays method evidence, not counted.
- **Judgement in three:** OK; NOT-OK; **unresolved** for `cannot-determine` or a missing subject not settled by a documented reading. "Record complete" is the runner's own coverage (no problem for that key, `reachedAfter` held). Attribution by row, more than one cause allowed: known product issue (linked); the old-order rows (VH-216.1); known instrument or scenario mismatch; new product defect (its own fix item before VH-203); new instrument, fixture or selection failure; environment or timing; unresolved interpretation.
- **An accepted-record index** as JSONL, one row per key (record path and sha1, run, manifest, source, revision, group, judgement, attribution), checked equal to the 108.
- **The launcher's GO line** names the real power source; each job's exit read from `conditions.txt`.
- **Risks noted for the judgement:** S-03's format "?" subjects with the title panel closed; S-24's long-job band; S-90a's ten-second window; S-76's subresults not declared for landscape and short.

## Codex only — refused, with reason
- **A JSON array file.** Kept as one key per line: the proved list itself, no conversion; the refusals above give the same validation.
- **Re-running VH-198's browser instrument proofs and planting failed outputs.** No instrument or runner file changes: the proof shows every file's sha256 but `matrix.mjs` unchanged, so those proofs and the runner's accounting stand.
- **VH-224's conditional declarations** (reduced motion, S-76's subresults) piloted here: VH-224's own walk; the byte-equal declaration proof covers them for the selector.
- **An adapter rewriting the table's page.** The brief fixes the page as `table-1page.mjs`'s output; the notes say what it cannot: the Before column's `?` and "Nothing moved" mean no before walk, not stability.
- **Every group re-walked when a sample reaches 8.** The brief's rule: the table names the peak and the samples; a reading that could depend on timing in such a group is re-walked on the orchestrator's ruling, or reads "no claim rests on it".

## Claude only
- Fixtures by APFS clone of `vh225-walk/fix/`, sha1-matched (36 files).

## Disagreed
None unsettled.

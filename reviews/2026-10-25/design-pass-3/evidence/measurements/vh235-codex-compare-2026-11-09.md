<!-- markdownlint-disable -->

# VH-235 — the blind compare: Claude's verdict and Codex astra's blind check (VH-235 #2, 2026-11-09)

Claude's verdict `vh235-claude-verdict.md` (e8130c2c) saved 00:49:49Z, "Commit, at the close". Codex's brief `vh235-codex-blind-brief.md` (da2aee5b), run from `$W` at 00:49Z; its answer `vh235-codex-blind.md` opened 00:53:11Z, after Claude's was saved: "Commit after the musts below".

## Agreed
- The guard (symbol per opening begun after `showModal()` AND `open`) meets every boundary: Close, the settle before the `close` event, native Escape, a close and reopen, a capture before the first opening, two Copies in one opening, a throwing `showModal()`, a language change after an accepted or a dropped result.
- `settleCopy` keeps the base handler's shape: a throw at the call, a throw from the success write, warn before the guard, the predicate asked at the settle, `feedbackText` read at the click.
- Nothing else moves in source: the status node, role, `aria-live`, `textContent`, VH-232's reveal, the empty status at each opening, no focus or scroll of its own, no string, element, CSS or `docs/` line; `main.ts` outside the feedback block only the import.
- The late route: 18 of 18 write nothing after, the before writing into the closed dialog or the new opening; the 6 focus cells and 12 qualification cells unmoved; qualification sound.
- The `1000`: placed, documented, both uses, tested; the other `/ 1000` a wish line, not an edit.
- The held point, `reveal-status.test.ts`'s titles: with the added comments they no longer claim the current behaviour; comments only suffice. **Settled, agreed; nothing for the orchestrator.**

## Codex only — adopted
- **Must 1, S-78k:** all 12 S-78k cells moved raw readings outside the change's expected moves: the page's job estimate "about 1 minute" before, "about 20 seconds" (en-GB w1280 "30 seconds") after, in `reached.seen.status` and `reachedAfter.seen.status`, with text widths (202 → 220 px at w375). The table compares outcomes and assertion rows only, so its "45 unmoved" and the notes' "no cell moved outside the expected moves" are not true of the raw readings. Claude missed it (it relied on the table's outcome compare). Cause, Claude's reading: the estimate is timed preflight work, so b1's load (peak 36.91) moved it, not the change. **By ruling 1 it is a finding: one line to the orchestrator, and S-78k's 12 re-walked on both sides at low load.** The table and notes as placed are not final.
- **Must 2:** the median is the script's upper-middle sample (24.68, 3.49), the conventional median 23.35 and 3.42: the notes label the convention. "Announced only in the opening" becomes "exposed in the accessibility tree only in the opening"; no speech claim; the late JSONL is snapshots, not a mutation trace. 3.2.1 and 3.2.2: "no new change of context", not "improved". 2.1.1: the route presses by pointer and Escape by key; no keyboard-only walk claimed.
- **Must 3:** the checker's failures Codex saw were mid-edit; fixed since (0 failures, 2 warnings reviewed).

## Codex only — weighed
- **Should, a test of warn-before-guard order:** cheap, in `feedback-opening.test.ts`; adopt at the repair.
- **Should, language repaint after accepted or dropped results, and `begin()` wired after `showModal()`:** `main.ts` has no unit tests (the design's reason for the helper); the walk carries the wiring (the same-opening cells write only if `begin()` ran; the reopen cells write nothing only if each opening has its own symbol). Declined, with that reason.

## Claude only
- The table's Power column carries the 5- and 15-minute loads (`go.sh` logs all three); in the notes.

## Disagreed
- None.

# The recheck: Claude's reading of the repairs and Codex astra's recheck (VH-235 #3, 2026-11-09)

Claude's reading of the repairs saved in the progress notes at 01:11:36Z, "Repaired, Commit, at the close", no must. Codex's brief `vh235-codex-recheck-brief.md` (af62baa8), run from `$W` at 01:11:17Z; its answer `vh235-codex-recheck.md` opened 01:13:48Z, after Claude's was saved: "Commit".

## Agreed
- Must 1 repaired: b2 and a2 as described (12 of 12 each, walker `7db38f355f3c46c2`, AC, peaks 4.49 and 5.04, none at 8 or above); `raw78-sum.txt` follows from the records (Codex re-ran it: byte for byte); the remade notes read S-78k from b2 → a2 and state the orchestrator's "alike" with both identical-source comparisons, claiming no identical raw records.
- Must 2 repaired: each wording point; the conventional medians 23.35, 3.42, 3.975, 3.915 (Codex computed them); no new unsupported claim.
- Must 3 repaired: the checker at 0 failures and 1 warning (VH-122's `samples/`); the "reuses a number" account true of `tools/check.mjs` and `tools/ledger.mjs`; the item, decision, trajectory, wish list, Disposition row and table agree; `{RECHECK}` the pending insertion.
- The added test pins `['warn', 'here']` and would fail on the reverse order.
- Nothing added since is wrong or out of scope.

## Codex only
- The set-aside records' shared files byte-identical but `sources.txt`; `late-b1-a1.txt` reproduces byte for byte; the trajectory's 81 cells are b1/a1's 45 + 36, the re-walk accounted for in the table. Its Vitest run could not start in the read-only sandbox (source inspection only); the gate runs the tests.

## Claude only
- None.

## Disagreed
- None.

# The close: Claude's reading of the complete close and Codex astra's close check (VH-235 #3, 2026-11-09)

Claude's reading saved in the progress notes at 01:17:08Z, "Commit", no must. Codex's brief `vh235-codex-close-brief.md`, run from `$W` at 01:17Z on the freeze `vh235-frozen/` (tracked 40f5d09298201f66, 54 untracked files); its answer `vh235-codex-close.md` opened 01:19:59Z, after Claude's was saved: "Commit after the musts below", both on the commit message draft only.

## Agreed
- The freeze is the complete close and the checkout equals it; rules 4 to 10 met by the ledger (the decision, VH-235.1 a wish line, the backlog line struck, one trajectory line, VH-232.2 and VH-203.4 retired with traces, the item, the Disposition row, the archive move, the digest rules); the checker at 0 failures and 1 pre-existing warning; gate 1 green; no string, element, CSS or `docs/` line; the claims supported but the one below.

## Codex only — adopted
- **Must 1:** the draft's "(b1 to b2, a1 to a2)" implied the estimate moved in both identical-source comparisons; it moves in b1 → b2 only, a1 → a2 moving hashes and byte counts. Claude missed it. Reworded in the draft as the table states it.
- **Must 2:** house-conventions' "Short imperative subject" (`project/digests/house-conventions.md:200`): the subject shortened to an imperative, the detail left in the body.

## Claude only
- None.

## Disagreed
- None. The repairs are to the commit message draft, outside the tree; re-checked by `recheck2`.

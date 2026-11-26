<!-- markdownlint-disable -->

# VH-224 #1 — the design compare: Claude's design and Codex astra's blind design check

- Claude's design `vh224-claude-design.md` saved 2026-11-05 12:58:46Z (sha1 `879ac4be` after a time correction at 12:59Z, before Codex started). Codex's brief `vh224-codex-design-brief.md` (`451f3c18`), run from `$W` 12:59:20Z, exited 13:04:12Z; its answer `vh224-codex-design.md` opened 13:04:18Z, after Claude's was saved.

## Agreed
1. **The keys:** 214 − 108 = 106, classes 22/20/22/22/10/10, no overlap, mode keys at w1280; the same 11 scenario counts; only `PLANS.matrix` declares them, once each; no VH-176 or VH-172 before (all in `unrunAfter`, none in `priority`): "no previous after-reading", the manifest linked.
2. **The walker:** VH-223's `--keys <file>` as it stands, revision `e377132ba6f70227`; no plan injection, hook or walker edit; VH-223's qualification linked; the driver only records conditions and the key list and calls the matrix CLI.
3. **Fixtures and the pilot:** the same fixture map (S-16 captioned-12s; S-24 still-10800s; S-41 lecture-60s; S-48 still-3600s; S-53/56/58 lecture-30s; S-63 lecture-30s and -60s; S-03/76/81 none); `after-pilot` reused once the bytes are proved the same; a proof group first only where a fixture differs; S-24 is never a fixture proof or a pass.
4. **The walk:** the same four groups, order and sizes (b1 28, b2 52, b3 13, b4 13), one driver job per launcher call, sequential; AC, lock, ports, both loads below 8; voids kept with their reason.
5. **Judging:** status, reached, every declared instrument and assert row; `cannot-determine` never a pass; the expected NOT-OKs (S-03's old-order rows, S-24 ×13 by speed, S-81's wrapped link); a demonstrated product failure with no existing disposition is a fix item before VH-203; Claude's attribution then Codex's blind, compared.
6. **WCAG:** the same criterion-to-instrument map; fallback is not an enlargement, spacing or motion test.
7. **The table and reconcile:** `--pairs no-before:after-bN`; an accepted-record index; a reconcile that fails unless A and B are disjoint, their union `stillUnrun`, one selected record per key, retries traceable; VH-172.1 narrowed to the four DPR-3 landscape readings, B's S-24 non-reaches on their own wish line (Claude: VH-224.1).

## Codex only (adopted)
- **Multiplicity before sets:** `keys-b.mjs` gains a check that `keys-a.txt` has 108 distinct lines (a Set would hide a repeat); the reconcile checks `stillUnrun`'s and each accepted list's raw multiplicity.
- **Provenance per group, not only at launch:** each group's `conditions.txt` revision and commit, and each manifest's fixture hashes, are checked against `fix-compare.txt` and VH-223's `after-pilot` manifest after every group.
- **`table-1page.mjs`'s detail copy iterates before records,** so after-only failures are not copied by `--detail-failing`: every NOT-OK key's whole record is bundled into the records folder explicitly (as VH-223's root S-* records are), and the accepted index, not directory order, selects each key's record.
- **Qualified claims:** 1.4.4 by proxy zoom and the 32 px default font is qualified evidence, not real browser zoom; 1.4.12's `type` relaxes line-height under spacing; 2.3.3 covers the sampled interactions; a `cannot-determine` kept under "OK with a documented limit" leaves that criterion's claim qualified, named in the notes.
- **Risks checked per record:** S-76's operated-dialog subresults at enlargement must be present; S-48's live-job state not expired; fallback's observed font state; timed player rows read with the load log (VH-199.1); each job's exit read from `conditions.txt`, not the wrapper's last line.
- **Load at 8 or above:** re-walk the timing-dependent keys of that group (S-48, and S-53/S-58/S-63's timed rows if used), not every static record; both attempts kept (the Settled timed-row ruling).

## Claude only
- Each group its own queue chain (Orchestrator #40's ruling, 12:45Z); `go.sh`'s AC-with-no-powermode pass kept, never widened.
- The S-24 judgement made mechanical in `judge-b.mjs`: one state-predicate problem on `longJob` while the page reads hours, no failing row.
- The two fixtures outside VH-223's list (`loud-30s.mp4`, `noduration-10s.webm`) recorded, read by no B ID.

## Disagreed
- **"Gateless":** Codex reads it as the gate's disposition. Settled by the evidence: the owner's word (`plan8-owner-words.md:185`) approves plans and choices on the sessions' recommendations; the item's criterion is `npm run check` green then `node tools/check.mjs` (`project/items/VH-224.md`, "The gate"). The gate runs. Nothing is held for the owner.

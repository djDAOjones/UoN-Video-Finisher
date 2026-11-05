<!-- markdownlint-disable -->

# VH-224 #1 — Claude's design (saved before Codex's answer is opened)

Base `57a55ddcbf9e` (VH-223's landing, Pages 42029971071 green). Walker `e377132ba6f70227` at the base, unchanged. Written 2026-11-05, saved 12:58Z, on the Mac Pro. A check item: no product diff, no walker change.

## 1. The keys
`keys-b.mjs` (outside the walker, from VH-223's `keys-a.mjs`) applies the item's exclusive rule to `unrun-2026-10-27.json`'s `stillUnrun` (214, sha1 `075127e0`): view `zoom200proxy` or `zoom400proxy`, or mode `reduced-motion`, `spacing`, `fallback` or `font32` (each at w1280). It reads VH-223's `keys-a.txt` (108, sha1 `759cf581`, as VH-223's table states) and exits 1 on a key in two classes, a mode key off w1280, a key in A, a stillUnrun key in neither, or any count but 22 + 20 + 22 + 22 + 10 + 10 = 106. Result: 106, 11 scenarios (S-03 8, S-16 12, S-24 13, S-41 8, S-48 13, S-53 4, S-56 12, S-58 8, S-63 8, S-76 8, S-81 12), `keys-b.txt` sha1 `e8ae270c`. Of the walker's PLANS only `matrix` (1,886) declares them, each once. VH-176's before: all 106 are in `after-manifest-2026-10-24.json`'s `unrunAfter` (641), none in `PLANS.priority` (699) or `outcomesByRecord`: each key's before is "no previous after-reading", that file linked.

## 2. No walker change
VH-223's `--keys <file>` is used as it stands: `node matrix.mjs matrix --keys <file>`, by the driver's `--keys`. VH-223's `proof-keys.out.txt` already shows the complement (stillUnrun less A) declares exactly 106 at `e377132ba6f70227`, plan order kept. Revision read before the first group and after the last; any other is a stop. The driver is VH-223's, renamed and with its ledger file named `vh224-ledger.jsonl`; `go.sh` and `walk.sh` take this kit's folder and WHO "VH-224 #1"; `go.sh`'s AC-with-no-powermode-line pass is kept, never widened.

## 3. Fixtures and the pilot
`vh224-walk/fix/` is an APFS clone of `vh223-walk/fix/`; all 36 files of VH-223's `fix-mac-pro.sha1.txt` check OK (two further files there, `loud-30s.mp4` and `noduration-10s.webm`, are outside that list and read by no batch B ID). So VH-223's `after-pilot` (`keys-a-pilot3.txt`, 23 keys; its records on main in `vh223-records-2026-11-05/after-pilot.*`) is the proof of record for every fixture-reading ID here: S-16 (captioned-12s), S-24 (still-10800s), S-41 (lecture-60s), S-48 (still-3600s), S-53, S-56, S-58 (lecture-30s), S-63 (lecture-30s, -60s). S-03, S-76 and S-81 read no fixture. No proof group runs. Each manifest hashes the fixtures it read; the table names the pilot.

## 4. The walk
Four groups, in sequence, each its own chain (`walk-queue-wait-seq.zsh` then `go.sh` once): `b1` 28 (S-03, S-76, S-81; no fixture), checked whole before `b2` 52 (S-16, S-41, S-53, S-56, S-58, S-63), then `b3` 13 (S-24), then `b4` 13 (S-48). The union of the four lists equals `keys-b.txt`, none twice. App and walker both `$W` at the base, porcelain 0. Each start: AC, both loads below 8, the lock free. Void and re-run as a new chain: a sleep gap above 180 s in the load log, a power change, unfinished. Samples at 8 or above recorded per group; a timed row that moves is read against the load log, no claim resting on it.

## 5. The judgement, per key
- **OK:** `status` ok, `reached` pass, no instrument `fail`, no assert row `fail`. `cannot-determine` and `n/a` counted by instrument and explained, not NOT-OK.
- **NOT-OK, attributed** to one of: (A) already recorded (a wish, backlog or V-nn line naming that element and condition), cited; (B) the rows pinning the old order, wish VH-216.1, "Yes, leave them"; (C) the instrument's own limit, cited; (S) not reached because of this Mac's speed: S-24 reading veryLongJob on still-10800s, wish VH-224.1; (D) a new defect: one line to the orchestrator at once, its fix item planned by them and built here before VH-203. Claude's attribution saved first; Codex's blind; compared.
- Expected from batch A's readings: S-03's old-order rows (B), S-81 ms-MY's wrapped link (A, VH-200.1 and VH-210.2), S-24 ×13 (S). Anything else is judged on its record.

## 6. WCAG where it applies
Every key: 1.4.3 and 1.4.6 (contrastText), 1.4.11 (contrastExtra), 2.4.7 and 2.4.13 (focus), 2.5.5 (targets), 1.4.10's overflow row. By class: 1.4.4 in font32 (the 32 px default font) and zoom200proxy (200 % zoom's CSS viewport and scale); 1.4.10 in zoom400proxy (400 %: a 320 CSS px viewport); 1.4.12 in spacing (the type instrument under the spacing override, with overflow); 2.3.3 in reduced-motion (the motion instrument). fallback (fonts withheld) reads the every-key criteria with the fallback face. A criterion with no instrument in a class is said so, not claimed.

## 7. The table and the reconcile
`table-1page.mjs` unchanged, `--pairs no-before:after-b1,no-before:after-b2,no-before:after-b3,no-before:after-b4` (no before folder: every key after-only, Before `?`), `--sources` the `.txt` copies of every script and key list, notes for what records cannot state (the before, the pilot of record, the judgements, the WCAG mapping, S-24, load). `vh224-accepted-b.jsonl`: one line per key with its accepted group, run, record and judgement. `reconcile-214.mjs`: A's accepted list (VH-223's `vh223-accepted-a.jsonl`) and B's pairwise disjoint, union equal to `stillUnrun`, none extra or missing, one accepted record per key; void and re-walked runs listed by name, so retries stay traceable. As `$M/vh224-matrix-b-$D.md`, records in `vh224-records-$D/`.

## 8. The close
Backlog line struck; one trajectory line; the decision; Now and Notes; wish VH-172.1 narrowed to the four device-scale-3 readings (`after-run-2026-10-24.md` line 77, all landscape); wish VH-224.1 for S-24 "(from: VH-224, $D)", naming VH-223.1 and VH-222's S-169; the Disposition row linked; Codex files in `$M`. Gate and checker green. Digest rules named: wcag-2.2-aaa (the criteria NOT-OK records touch), carbon and nielsen where a judgement cites them.

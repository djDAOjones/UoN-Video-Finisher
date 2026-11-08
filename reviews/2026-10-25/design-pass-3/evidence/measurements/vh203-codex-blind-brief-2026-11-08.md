<!-- markdownlint-disable -->

# VH-203 — Codex astra's blind read of Pass 3's after-run (D2)

You are reading, read-only and blind, the whole after-run of one item: the third design pass's after-evidence for the UoN Video Finisher (a browser-only TypeScript/Vite app). You are not shown the implementer's readings or verdict. Judge every point below from the records yourself, with your own verdict and its reason, citing `file:line` or the record's path. Write nothing; your final message is your answer. Keep it under 3,000 words: one numbered section per point, each opening with **Verdict:**, then an **Overall** section and a list **For the owner** (points only the owner can decide), and a list **New defects** (each with its evidence), empty if none.

## Paths
- `$W` = your working directory, `/Users/uazjob/UoN-Video-Helper-side/vh203` (branch `side/vh203`, HEAD `756b425`, VH-232's landing; Phase 8 started at VH-177's close, `452334e`). `$M` = `$W/reviews/2026-10-25/design-pass-3/evidence/measurements`; the walker is `$M/walker/`.
- `$S` = `/Users/uazjob/UoN-Video-Helper-side`. The after-run's walk folder is `$S/vh203-walk/`: each group's records in `<group>/` (`conditions.txt`, `out/<run>/<key>/`, `runs/`, `logs/job1.log`), its sum `<group>.sum.txt`, its load log `<group>.load.log`; pairings `*.pair.tsv`, `*.pair.txt`; comparisons `*.cmp.txt`; key lists `keys-*.txt`.
- **You may read:** everything in `$W` (the repository: ledger `project/`, the item, the spec `docs/`, UI-STANDARDS, digests, `src/`, `$M`'s pages, digests and records); in `$S`: `vh203-walk/` except the files named below, `vh203-run-rev.txt` (the run revision's provenance: W1 to W20 and what each changed), `vh203-codex-plan.md`, `plan8-owner-words.md`, `vh203-before-a3039c3/` and `vh203-vh206-5893d9d/` (the two exports).
- **You must not read:** any folder under `/Users/uazjob/Library/Application Support/Claude/side-session-notes/` or `/Users/joe/Library/Application Support/Claude/side-session-notes/`; in `$S`: `vh203-claude-*`, any file whose name holds `compare`, `vh203-progress.md`, `vh203-handover-*`, every `vh203-*brief*` but this one, `starts/`, `orchestrator-*/`, `vh203-wip-*/`; in `vh203-walk/`: `*-reading.md`, `*.why.tsv`, `d1-pair.tsv` (its reading column is the implementer's; read `d1g1.pair.tsv`, `d1g1-split.pair.tsv`, `d1g2.pair.tsv` instead), `draft/`, `superseded/`.

## The item, the bar and the owner's words
- `project/items/VH-203.md`: every acceptance criterion holds. The after-run's: "VH-199's matrix walked again with VH-198's instruments, beside VH-199's before, through the manifest, every changed measurement explained; the Phase 8 contract and the new fixes re-verified." The format "?" criterion and the bar are in the same file.
- The owner's words, verbatim (`$S/plan8-owner-words.md`): `:275` "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" (the bar: the journeys and Nielsen, Carbon and the tokens, WCAG 2.2 AAA; `project/digests/`, `UI-STANDARDS.md`); `:247` "Codex reads the after-run blind before Claude's verdict."; `:446`–`:454` the owner's "Yes, all three": (1) the walker may read the page as it now stands, opening the title's panel first where a check needs the format "?" (VH-216.1); (2) page shots may keep the 32 px font (VH-217.5); (3) D1, a before walked on this Mac only for the keys whose after isn't a pass, everything else compared with VH-199's MacBook Pro records, cited.
- Settled: one walker revision for the whole after-run; the MacBook Pro's records (VH-199's) are cited as support only, never paired with this Mac's in a table; a coverage reduction, a walker change beyond W1 to W20, a new element, a `docs/` edit and a dependency change are the owner's; a new fix item or wish ID needs the orchestrator's word; a defect found is reported, never built here.

## The machine and the instrument
- The owner's 2019 Mac Pro (Xeon W-3223, x86_64, macOS 26.5.1, Chrome 157, Node 24.22.2, ffmpeg 9.0.2-tessus), about half the MacBook Pro's speed; AC power throughout; `pmset -g` prints no powermode line here. A group started with the 1- and 5-minute loads below 8; samples at 8 or above are in each `.load.log`.
- Run revision `7db38f355f3c46c2`: `$W`'s walker, its nine changed files (diff hash `b28b608c84617b04`; `git -C $W diff --stat`), against the base walker `29c3acfcad7eb29c` (`/Users/uazjob/UoN-Video-Finisher/reviews/2026-10-25/design-pass-3/evidence/measurements/walker/`, read-only). The matrix walked by exact key lists through in-memory plans (`vh203-walk/vh203-driver.mjs`, `b-plan.mjs`), `matrix.mjs --keys` unchanged; the transitions by `transitions.mjs` without `--plan` (the parts' frozen hashes refuse S-155, which VH-221 added: `parts.mjs:39`, `:179`, `:282`, `:291`).
- VH-199's before (the MacBook Pro, revision `2e7b0c044ce11f2b`, source `a3039c3`): `$M/matrix-2026-10-27.md`, `$M/matrix-coverage-2026-10-27.json`, `$M/digest-*-2026-10-27.md`, `$M/contract-2026-10-27.md`, `reviews/2026-10-25/design-pass-3/design-pass-3-2026-10-27.md` (its "Unresolved, kept as such"), `reviews/2026-10-25/design-pass-3/fix-plan-2026-10-27.md`.
- The same-machine before of the run revision's moves: `vh203-walk/rev-before-rb1` to `-rb4` (and re-walks), at `29c3acfc`, same build; pair runs `pair-rb*`, `pair-w5`, `pilot3*`.

## The after-run's tables (facts as walked)
**A1** (run-01, run-02: 699 core keys + S-155 ×1, apart). `keys-a1g1.txt` to `keys-a1g6.txt`.
| Group | Keys | Sum | Walked (Z, 11-07) | s | Peak load | ok / failed / not reached |
|---|---|---|---|---|---|---|
| a1g1 | 162 | 7e563e4a | 07:43–08:34 | 3086 | 8.17 (1 sample) | 162/0/0, coverage whole false |
| a1g2 | 141 | 42348d88 | 15:22–16:09 | 2845 | 4.98 | 141/0/0 |
| a1g3 | 123 | e8064229 | 16:11–16:39 | 1704 | 5.72 | 123/0/0 |
| a1g4 | 81 | 802fba6a | 16:41–17:20 | 2308 | 6.73 | 81/0/0 |
| a1g5 | 169 | da9e2a5f | 17:22–18:02 | 2397 | 7.17 | 169/0/0 |
| a1g6 | 24 | ffc40234 | 18:03–18:15 | 748 | 7.53 | 24/0/0 |

**A2** (run-03, 157 keys, `keys-a2g1.txt`; the 48 transitions: `all` = 12 ids en-GB light w1280; `cases` = T-46.1 to T-46.3 × three languages × four modes).
| Group | Keys | Sum or run | Walked (Z, 11-07) | Peak load | Outcome |
|---|---|---|---|---|---|
| a2g1 | 157 | db49f2ee | 18:18–18:42 | 9.72 (5 samples) | 157/0/0, whole false |
| a2t-all | 12 | `a2t-all/` | 18:44–18:54 | 5.98 | 11 pass, 1 fail |
| a2t-cases | 36 | `a2t-cases/` | 18:56–19:12 | 9.44 (1) | 24 pass, 12 fail |
| a2t-cases-rw | 2 | `a2t-cases-rw/` | 19:14–19:16 | 7.51 | T-46.3 en-GB forced-light and dark re-walked |

**A3** (run-04 to run-09, 2,131 keys, `keys-a3.txt`; 15 groups `a3g1` to `a3g15`, with `-split` walks one key a setup and `-rw` re-walks): 2,125 ok, 0 failed, 6 not reached (S-140 ×1 a3g4, S-93 ×4 a3g8, S-24 ×1 a3g12). Peak loads above 8 in a3g1, a3g2, a3g5, a3g9, a3g12 (see each `.load.log`).

**A4** (run-10 to run-12, 232 core + S-155 ×8, `keys-a4.txt`; `a4g1` to `a4g5`): 239 ok, 0 failed, 1 not reached (S-93 ms-MY w320, a4g2).

**B** (supplements outside the core, from each source item's definitions): b1 `PLANS.vh215` 96; b2 W20 48; b3 VH-207's 156 + b3-split 12; b4 VH-208's 111 outside the core; b5 the 53 of `PLANS.matrix`'s 214 that the run revision moves (S-03 ×12, S-81 ×9, S-76 ×4, S-48 ×12, S-56 ×6, …); b6 W19, VH-206's sliver probe (`b6.cmp.txt`); b7 V-18 `top-187.mjs`; b8r VH-179's rings; b9 VH-180; b10 VH-181; b11 VH-231's re-read by its own driver (90). 566 matrix records, 566 ok; each group compared against its own source item's readings (`b4.cmp.txt`, `b5.cmp.txt`, `b3.nexttab.txt`, `b11.diff.txt`).

**C** (the format "?" captures): `$M/vh203-format-help-2026-11-08.md` and its records folder: 192 images (4 states × 3 languages × 4 modes × 2 fonts × w1280 and w320) + 3 at rest with the 44 px target outlined, `format-help.jsonl`, six contact sheets. The images are PNGs you may open.

**D1** (the bounded before, the owner's item 3): the app at `a3039c3` (`$S/vh203-before-a3039c3/`, an export, no worktree) walked by the run revision's walker for the 121 core keys whose after fails in some instrument or is not reached (`keys-d1-nocd.txt`, listed by `d1-list.mjs`), and A2's 48 transitions:
| Group | Keys | Sum or pairing | ok / failed |
|---|---|---|---|
| d1g1 | 54 | 5f286c6f, `d1g1.pair.tsv` | 15 / 39 |
| d1g1-split | 32 | db9da3b1, `d1g1-split.pair.tsv` | 0 / 32 |
| d1g2 | 35 | 51981b42, `d1g2.pair.tsv` | 7 / 28 |
| d1t-all | 12 | `d1t-all.pair.txt` | 12 pass |
| d1t-cases | 36 | `d1t-cases.pair.txt` | 35 pass / 1 fail |
| d1w19 | sliver-N14 × 6 at VH-206's landed commit 5893d9d | `d1w19.cmp.txt` | 6 ok |
The 2,554 keys short of pass only by cannot-determine are not walked; `d1-cd.mjs` accounts the 2,675 (`d1-cd.tsv`, `d1-cd.txt`) by instrument and subject, each set beside VH-199's digest line.

## The points to judge
1. **Coverage.** Is VH-199's core (3,219 records + 48 transitions) walked whole at the run revision, with S-155 tallied apart? Is any key, instrument or condition reduced against VH-199's matrix (`matrix-coverage-2026-10-27.json`)? Are B's supplements the item's Notes and the fix plan's "The order, and why" list, each accounted?
2. **Every reading short of pass, by key and instrument.** For each, say what it is: pre-existing (failing alike at `a3039c3` or in VH-199's records), a landed item's or a W1 to W20 change's own, this machine's speed, an absent sample, or a defect. At least: S-03 formatTip "expected subjects missing" (a1g1 ×23, a2g1 ×5, b5 ×12); S-81 focus fail on `#accessibility-statement a` (A1 ×6, A3 ×3, b5 ×2 at zoom400proxy); S-132 and S-152 player fails; S-141 to S-144 type fails (61); S-93 not reached ×5 ("timeout waiting for the settled verdict"); S-24 ms-MY w1280 not reached; S-140 en-GB w1280 not reached; T-46.3 ×13 in the transitions; and the cannot-determine sets (`d1-cd.tsv`).
3. **D1's pairing.** Read the three pair files and the two transition pairings. Is each failing after shown pre-existing or introduced, on one machine? Of the befores that fail in setup at `document.getElementById('about-help').hidden`, is that the route or the app? Is any failure introduced since `a3039c3` that no landed commit's diff and no W1 to W20 change explains?
4. **What moved, and by which change.** Against `rev-before-rb*` (same build, same Mac) and against each B source: is every move one change's own by that change's diff or the walker's? Name any move you cannot tie to a commit or a W change. Include b3's next Tab ×120, b4's targets and type moves, b4's completion clause words, b6's zh-Hans page-language line, b7/b8r's file-input place.
5. **W19's sliver.** b6's finished file 1,682,811 → 1,583,347 bytes against VH-206's records, and d1w19's probe at 5893d9d. What does the evidence prove, and what does it not?
6. **The format "?" (Part C).** Does it look right in all four states, three languages, four modes and both fonts, at both widths, as the owner asked? Judge the images and contact sheets, the target's measured box (44 × 44 px, 484 of 484), its overlap with "format." (and its zh-Hans and ms-MY counterparts), the w320 32 px wrap, and the clips that end at the viewport's edge.
7. **The load and the re-walks.** Were records taken near samples at 8 or above handled soundly (re-walked where a timing reading is near, kept where the state is static)? Were the split re-walks (one key a setup, `focus-split-*.mjs`) sound, and does any replaced first record hide a defect?
8. **VH-214.2** (`project/wish-list.md`): read `#page-announcer` in S-140n's records and in every step-1 refusal record you can find in the after-run. Report what it says, as a reading only; no fix is built here.
9. **S-03's formatTip line.** What should the after-run's account say of S-03's "expected subjects missing" (the title's closed panel, VH-205's "?" and VH-216.1)?
10. **The bar.** On this evidence, does Phase 8 pass UX / design / accessibility: the journeys and Nielsen, Carbon and the tokens, WCAG 2.2 AAA? Name each failure that must be fixed before VH-203 closes, or put to the owner, and each unresolved reading the after-run must carry as unresolved.
11. **The after-run criterion.** Is "every changed measurement explained"? Give the one verdict: **pass**, **pass with points** (list them), or **fail** (list what blocks).

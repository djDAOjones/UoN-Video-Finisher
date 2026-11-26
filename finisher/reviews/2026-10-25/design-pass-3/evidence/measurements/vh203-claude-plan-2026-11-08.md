<!-- markdownlint-disable -->

# VH-203 — Claude's plan for Pass 3's after-run (VH-203 #1, 2026-11-06)

Saved before Codex astra's blind plan (`vh203-codex-plan.md`) is opened. Base `756b425` (VH-232's landing), walker `29c3acfcad7eb29c`, `$W` = `$S/vh203` on `side/vh203`. Every line below was read at the base by `grep` or by loading the walker read-only (no lock, no browser). Sources: the item `project/items/VH-203.md` (criteria and Notes), brief §0's seven points, the owner's words in `plan8-owner-words.md` (7c7b1169) by line.

## 0. Three facts found at the base that shape the plan

- **F1. VH-199's key set is intact, plus nine.** VH-199's 3,219 declared keys, computed from its own walker (`git archive 25b6ccb`, revision `2e7b0c044ce11f2b` reproduced, `parts.mjs` `RUNS`), are all still declared at HEAD. HEAD adds S-155 ×9 (VH-221, `14479eb`: en-GB, zh-Hans, ms-MY × w1280, w375, w320, light): **3,228 records + 48 transitions**. Keys moved between runs (run-01↔02: 18 and 19; run-10↔11: 56 and 61); runs 03 to 09 and 12 hash as VH-199's.
- **F2. The walker refuses its own parts at HEAD.** `node parts.mjs check` fails: "part 1's keys hash to e8f29040b422bfb5, not VH-172's 7a700694a512de97" and "the runs' split is 66480cf82cc32734, not the declared RUNS_SHA 05493ee20ebbfc06" (`parts.mjs:39`, `:179`, `:282`, `:291`). So `node matrix.mjs run-NN` and `partN` (`matrix.mjs:216`) and `node transitions.mjs --plan run-03` (`transitions.mjs:63`, `:69`) throw. Cause: VH-221 put S-155 into `PLANS.priority` without re-freezing the two hashes. A walker inconsistency, reported to the orchestrator as a finding; not a product defect.
- **F3. VH-199's full records are on the MacBook Pro only.** In the repository: `matrix-2026-10-27.md`, `matrix-coverage-2026-10-27.json` (counts and missing keys, not every key's reading), 19 `digest-*-2026-10-27.md`, `contract-2026-10-27.md` with `contract-evidence-2026-10-27.json`, `readings-2026-10-27/`, `evidence/runs/` (Claude's and Codex's run readings). Rule 2 ("never fetch a record from outside this repository") and the owner's answer 2 keep it so.

## 1. The keys (brief §0.1), each source accounted

**Walked (Part A): the matrix, 3,228 + 48**, by exact key lists through an in-memory plan (§4), so F2 needs no walker change. The S-155 nine are kept (more cells, no reduction). The 214 `PLANS.matrix` cells outside `RUNS` (wish VH-172.1, walked on this Mac by VH-223 and VH-224 at `57a55dd`, revision `e377132ba6f70227`) are **not** VH-199's matrix: cited as those items' readings, outside the walked cells. **For the orchestrator's ruling:** the app commits since `57a55dd` are VH-231 (cut MKV/WebM words) and VH-232 (the feedback dialog's status); VH-232 #4's notes name VH-224's four S-76 zoom-proxy keys; walking those four (and any of the 214 a VH-231 fixture reaches; none of batch A's or B's IDs read `cut-short-30s.mkv` by `fixturesFor`, to be re-checked) at the run revision in Part B costs about 10 minutes.

**The item's Notes:**
- S-107 `fallback` ×3, S-55c `fallback` ×3 (the fonts route), S-92 ×31 and S-93 ×6 (the check count), S-133 ×6 (not recorded), the finish+1s row in all 823 rows (S-128 ×31, S-109 ×13, S-88 ×6, S-138 ×3, S-59 ×1 failing): in Part A, on the changed walker (W1, W2, W3, W5). Each also in the differential group (§3).
- VH-191's regression, S-149's read-failure branch: S-149 ×12 in run-04 (Part A), and VH-207's variants S-149a to S-149f (fixOnly, `scenarios.mjs:1853`) in Part B, VH-207's 24 cells each (`vh207-focus-2026-10-27.md` §2) = 144 records, by a plan in memory.
- VH-201's list (= design-pass-3's "Unresolved, kept as such", `design-pass-3-2026-10-27.md:131`, and wish VH-201.2): the four gaps and 823 rows (above); VH-200.1's three readings (W8, W9, W10); VH-205's "?" with its labelled verdicts (W11 and Part A's 137 records carrying `formatTip`; 2.4.13 and 2.5.5/2.5.8 "to be measured in VH-203's after-run" read there); 1.4.3 and 1.4.6 at S-113 ×18 (Part A, run-05 and run-11) for V-50 and V-48; the kept sliver with output tracks (W19); V-46's case with a finished video standing: S-149d and S-149e (VH-207's variants, Part B), so no new scenario; V-18 at HEAD (Part B, `top-187.mjs` at the run revision, its six cases); the player by keys and a screen reader (S-127 ×39 in Part A; the screen reader stays a person's check, VH-229.4's kind); the 17 target rows (Part A); the 214 (above).
- VH-202's fix plan, "For VH-203's after-run" (`fix-plan-2026-10-27.md:58`): VH-207's and VH-208's variants on the final build (S-149a–f, Part B; VH-208's `warnBox`, S-136 and S-91 asserts in Part A); VH-206's sliver (W19); V-18's six cases (Part B); S-113's six records (they are 18 at HEAD's recipe, all walked).
- VH-211's plan: "the after-run re-reads every item that lands out of order": every fix item's touched scenarios are in Part A, on the final build; each item's own cells outside the matrix are listed in Part B or cited (§2).

**The 19 wish lines naming VH-203** (`project/wish-list.md`, line as read):

| Line | Outcome in the plan |
| --- | --- |
| VH-205.1 (:57) | W11, built; Part A's `formatTip` records; retire at the close |
| VH-199.1 (:58) | W1 to W7, built; with VH-198.1 (:55) and VH-198.2 (:56), which it carries; retire all three |
| VH-200.1 (:59) | W8 to W10, built; retire |
| VH-201.2 (:60) | walked: S-113 ×18, S-149d/e, V-18's six, W19's sliver; retire |
| VH-206.1 (:61) | W14 (the three probes read the kept-part key beside the old); retire |
| VH-208.1 (:62) | W12 (the card's ring read whole by scrolling the clip); S-151 ×6, S-137 ×31 in Part A; retire |
| VH-208.2 (:63) | W13; retire |
| VH-208.3 (:64) | walked: S-91 ×12 in Part A; retire |
| VH-214.1 (:66) | W15; retire |
| VH-214.2 (:67) | read: `#page-announcer` in S-140n and every step-1 refusal record; reported; a fix with words is its own item, the owner's words: keep the line, or raise it (needs the orchestrator's word) |
| VH-212.1 (:68) | W16; retire |
| VH-215.2 (:70) | W20 (S-22 as Student submission, closing on and off): needs the orchestrator's word for the scenario IDs; else kept |
| VH-215.4 (:72) | walked: `PLANS.vh215`, 96 records, Part B; VH-227's 简体中文 → 中文 attributed; retire |
| VH-216.1 (:73) | **the owner's** (§3, Q1); built only on their word |
| VH-217.5 (:79) | **the owner's** too, by its own words ("a change is his"): Q2 |
| VH-209.1 (:81) | read: `#file-input`'s ring at w320 font32 in S-113's three records; located or kept |
| VH-219.1 (:84) | W17; S-111 ×31, S-112 ×12, S-113 ×18 in Part A; retire |
| VH-210.1 (:88) | W18 (the forced palette cleared between modes); retire |
| VH-220.1 (:103) | no key needs it: `RUNS` holds S-115 ×6, all light, one mode per setup; no added plan reads S-115 in two modes; retire with that reading |

Not naming VH-203 but touched: VH-223.1 and VH-224.1 (S-24 not reached by this Mac's speed): S-24 ×13 in Part A will read so again; kept. VH-172.1 stays at its four device-scale-3 readings.

## 2. The before for each key (§0.2)

- **The before is VH-199's, cited as the MacBook Pro's, outside the walked cells, never paired in a table** (`macpro-39.md`, the owner's answer 2; `macpro-40.md`, "Cited VH-199 rows"). It is cited at the grain the repository holds: each instrument's tallies by language, view and mode (the digests' tables), every not-passing group by subject and key list, the coverage counts, the contract's rows. "Every changed measurement explained" is met group by group: each of VH-199's not-passing groups is accounted (still failing, now passing with the item that moved it, or measured on the changed walker); each new not-passing group in the after is attributed to a fix item (its commit and own table), the walker change (§3's differential), this Mac (timing and speed, M-05's "attribution unresolved"), or is a finding.
- **A before walked here, and why:**
  - **The differential group** (`rev-before`): the keys W1 to W18 move, walked on `756b425` at the base revision `29c3acfc` before any walker edit. With the same keys in Part A at the run revision, same build, same machine, each changed row is the change's alone. About 330 keys: S-107 fb ×3, S-55c fb ×3, S-92 ×31, S-93 ×6, S-133 ×6, S-128 ×31, S-109 ×13, S-88 ×6, S-138 ×3, S-59 ×9, S-21 ×9, S-62 (its w375), S-15, S-24, S-108, S-110 at font32 (×10), S-81 ×26, S-127 ×39, S-151 ×6, S-137 ×31, S-111 ×31, S-112 ×12, S-113 ×18, the `formatTip` records' sample (one per language, view and mode, about 30), and the spacing cells walked after a forced mode in one setup (about 20). Final list by script from the changes' own declared rows.
  - **A settle group, only by need:** a key whose after differs from VH-199's cited reading with no item, change or speed reading to explain it is walked here on `a3039c3` at the run revision, paired in its own one-page table. None is planned; each is decided by the orchestrator.
- **Fix items' cells outside the matrix:** those walked on this Mac (VH-220 to VH-224, VH-231, VH-232) are cited from their tables (one machine) where no later app commit touched them; those walked on the MacBook Pro (VH-205 to VH-219, VH-225 to VH-230) are support only, and their findings are re-read in Part A's records on the final build.

## 3. The walker changes, one revision (§0.3)

Each still open at the base (re-checked by `grep`; line numbers as now). Each gets a proof case in the walker's own self-test pages where it reads a page (`prove-8.mjs`, `prove.mjs`) and its rows in the differential group.

| # | Change | Where now | Source |
| --- | --- | --- | --- |
| W1 | the `fonts` route pauses and answers only `resourceType === 'Font'` | `qualify.mjs:1028` | VH-199.1 |
| W2 | the check counter counts check starts or status writes, not the suppressed observer's | `scenarios.mjs:1564` (`STATUS_SINCE`), `phase8.mjs` | VH-199.1 |
| W3 | a `beforeunload` accept in `goto`, and VH-198.1's guard: a page that stops answering fails its record | `walk.mjs:297` | VH-199.1, VH-198.1 |
| W4 | 2.4.7's cannot-determine words name both comparisons | `phase8.mjs` (the player ring) | VH-199.1, VH-198.2 |
| W5 | finish+1s sampled before the scenario's next step plays or detaches the player | `phase8.mjs:82` | VH-199.1 |
| W6 | asserts that read focus run before the blur | `matrix.mjs:126`, `:145` | VH-199.1 |
| W7 | a disabled control declared as a focus target reads not applicable | `qualify.mjs` (focus) | VH-199.1 |
| W8 | a native radio's ring against its disc's 2 px perimeter | `qualify.mjs` (focus, ~`:767`) | VH-200.1 |
| W9 | a wrapped inline link's ring against its line fragments' perimeter | `qualify.mjs` (~`:732`) | VH-200.1 |
| W10 | the background behind each player control's ring, for 2.4.13's second exception | `phase8.mjs` (~`:311`) | VH-200.1 |
| W11 | 2.5.5 and the "?" row count a target drawn by `::after` | `qualify.mjs:133`, `phase8.mjs:634` | VH-205.1 |
| W12 | a focused element taller than the viewport: its ring read whole by scrolling the clip | `qualify.mjs:767–772` | VH-208.1 |
| W13 | `heavy-193.mjs` reads the card's `section.result-warnings` beside the old region | `heavy-193.mjs:78` | VH-208.2 |
| W14 | the three probes read `warnings.keptTooLittleAudio.heading` beside `noAudio` | `prove-fixtures-8.mjs:41`, `sliver-185.mjs:37`, `heavy-193.mjs:157` | VH-206.1 |
| W15 | Create and Cancel offered by `M.create()` and the shown state, not `hidden`/`disabled` | `walk.mjs:776`, `:698`, `heavy-193.mjs:147` | VH-214.1 |
| W16 | `WARN_WORDS` and its comment to the served words | `prove-8.mjs:53–54` | VH-212.1 |
| W17 | "every option inside its select's room" and S-113's clipped list read the closed text's own block | `scenarios.mjs:2265`, `:2287`, S-113's row | VH-219.1 |
| W18 | the forced palette cleared when a group moves to the next mode | `qualify.mjs:1000` (`setMode`) | VH-210.1 |
| W19 | N14 kept to 0:04.0, the output's tracks read (`outputTracks`, `scenarios.mjs:1581`), beside S-153 | a scenario row or variant | VH-201.2, fix plan |
| W20 | S-22 as Student submission, a closing on and off, the card's running time against the length made | a fixOnly scenario pair, as S-23s/S-23sn | VH-215.2 |

**IDs:** W19 and W20 add scenario IDs (or variants): the orchestrator's word first; without it they are walked by a driver's in-memory plan if that is no walker change, or kept as wish lines. **Not a walker change:** F2's in-memory plan; W1 to W18 change no plan's keys.

**The re-proof, before the first Part A group:** (1) fixtures regenerated into `$S/vh203-walk/fix/` by `fixtures.sh`, `fixtures-8.sh` and VH-215's WebM recipe; sha1s against VH-223's `fix-mac-pro.sha1.txt` (36); the run reads 35 (one, `UoN Closing Logo Fade Blue 2025.mov`, read in place from `samples/`, never written) plus `cut-short-10s.webm`; a differing sha1 means a proof group for every ID reading it; (2) the differential group at the base revision (§2); (3) the edits; typecheck and eslint 0 on the walker files; (4) the walker's proofs whole at the new revision (`prove.mjs`, `prove-8.mjs`, `prove-172.mjs`, `prove-m04.mjs`, `prove-resume.mjs`, `prove-fixtures-8.mjs`, `faults.mjs` check, `parts.mjs` check as F2 leaves it, reported), each change's proof case passing; (5) `pilot3` (77 records) at the new revision; (6) the revision to `$S/vh203-run-rev.txt`. A proof that moves a row outside its change's own is a stop.

**Q1 for the owner (VH-216.1), drafted:** "Pass 3's walker still checks the page order from before VH-216 and VH-229: S-03's two order rows, S-142's Tab neighbours, J1's route to the format "?", J2's and J4's Tab counts, and VH-207's variant f2 meet a "?" and a privacy line now inside the title's closed panel; S-141 to S-144 cannot reach their states without the panel opened first. May VH-203's walker read the page as it now stands (skip link, Page language, the notice's link, the title's "?", then Choose file and Video type), opening the panel first where a check needs the format "?"? Recommended: yes. The after-run then reads true order rows and reaches S-141 to S-144's 102 records; leaving them keeps S-03's two order rows (36 records) and S-142's two Tab rows (31 records) failing as expected, and those states unreached." Options: "Update the checks (Recommended)" / "Leave them failing". The edit joins the one revision before Part A; refused, the rows are reported as expected.

**Q2 for the owner (VH-217.5), drafted:** "The walker's page shots drop the 32 px font, so a 32 px page image shows the page at 16 px (the measurements keep 32 px). May VH-203's walker take its page shots so the 32 px font holds? Recommended: yes: only the images change, no reading, and the 222 font32 records' images become true." The format "?" captures (§5) do not wait on it.

## 4. The parts and groups (§0.4)

**The route:** a driver in `$S/vh203-walk/` (from `vh224-driver.mjs`, its original untouched) registers `PLANS['vh203-after']` in memory as `RUNS`' records (their press lists kept) and runs `matrix.mjs vh203-after --keys <group file>`, VH-223's interface, unchanged; the transitions by `transitions.mjs` with `--langs`/`--modes` (no `--plan`), the two sets as part 2 declares them. Launchers from `$S/vh216-walk/` as VH-224 adapted them (WHO "VH-203 #k", `go.sh`'s AC rule as #39 ruled), each chain `walk-queue-wait-seq.zsh "VH-203 #k <group>" && zsh go.sh …`, one background job, in sequence.

**Sizing:** the walker's `est()` × this Mac's ratio on VH-223's and VH-224's groups (0.65 static, 1.0–1.2 S-24 and S-90, 1.5–1.7 job and state scenarios; about 1.4 overall). `RUNS` estimate 39,738 s + transitions 1,250 s ≈ **16 h here (range 13–25 h)**, recalibrated after the first two groups. Groups of about 60–90 minutes, whole scenarios (a scenario's records in one group, as `split()` does), in `RUNS` order, so a resume never crosses a group:

| Part | What | Groups | Cost here | Worker |
| --- | --- | --- | --- | --- |
| P0 | fixtures; `rev-before` (~330 keys); the edits; proofs; `pilot3`; run-rev | 4 walks | walks ~3.5 h; the build the heaviest token cost | #1 to #2 |
| A1 | part 1 (run-01, run-02: 700 + S-155 placed) | 6 | ~3.5 h | #2 |
| A2 | part 2 (run-03, 157) + transitions (48) | 2 | ~1 h | #2 or #3 |
| A3 | part 3 (run-04 to run-09, 2,131) | 14 | ~9 h | #3, #4 |
| A4 | part 3b (run-10, run-11, 224) + part 4 (run-12, 16) | 4 | ~2.5 h | #4 |
| B | `PLANS.vh215` 96; S-149a–f 144; W19, W20 if allowed; V-18's six; `rings-179`, `note-180`, `name-181` (the contract's readings); the ruled S-76 four | 4 | ~3 h | #5 |
| C | the format "?" captures (§5) | 1 | ~0.5 h | #5 |
| D | report, Codex blind, verdict, integrated check, ledger, gate, close check, commit | — | Codex ~1 h; gate ~20 min | #6, #7 |

About 22 h of walks and probes in all; six to seven workers. **Hand-back points:** any group's clean end (PIDs exited, lock released, its sum saved); between parts, the part's Claude reading saved. Each group's judging is by script (from VH-224's `check-group.mjs`, `judge-b.mjs`, `sum-b.mjs`): reached, structurally whole, outcomes by instrument, each NOT-OK classed (known reading with its wish ID, the walker's expected row, this Mac's speed, or new). A new defect is one line to the orchestrator at once. **Load:** both loads below 8 at each start; a timing reading taken under a sample at 8 or above (motion under reduced motion, a running state, S-24's band, a job's time) is re-walked by its own small group, records compared. **Known not reachable here:** S-24 ×13 (veryLongJob on `still-10800s.mp4`, VH-223.1, VH-224.1), recorded so, nothing changed.

## 5. The format "?" captures (§0.5)

By a probe in `$S/vh203-walk/` from VH-217's `vh217-states2.mjs.txt` (`$M/vh217-records-2026-10-30/`, sha1 9b2eac6c): clips inside the viewport with `captureBeyondViewport: false`, so the 32 px font holds (VH-217.5's cause avoided without the walker). The title's "?" pressed first to open the panel (VH-229). At w1280: 4 states (at rest, hovered, focused, open) × 3 languages × 4 modes × 2 fonts (16 px, 32 px) = **96 images**, plus 3 at rest, one per language, with the 44 px target's box outlined by the probe over "format." (the overlap). One background job (~30 min), an index page (`vh203-format-help-<date>.md` in `$M`), images in its records folder; sent to the owner through the orchestrator. A change the owner asks for becomes a fix item before VH-203 closes.

## 6. Codex's two checks (§0.6)

- **The blind read (`blind`)**, the owner's ":247": once Parts A to C are walked and their tables placed, Codex reads the after-run blind (the tables, records, the cited VH-199 files, the item, the owner's words, every criterion and the points to judge) while Claude's verdict is written; Claude's verdict saved before Codex's answer is opened; then `vh203-verdict-compare.md`.
- **The integrated check (`integrated`)**: the diff `452334e..HEAD` (Phase 8 from VH-177's close: 90 commits; the app paths and `docs/`) against the after-run's evidence, judged by the bar's lenses (the journeys and Nielsen, Carbon and the tokens, WCAG 2.2 AAA); saved verbatim as `codex-astra-integrated-check-<date>.md` in `reviews/2026-10-25/design-pass-3/`; each point applied (a fix item, before VH-203 closes), refused with a reason, or for the owner.
- Then the close check (`close`, re-checks `recheck`, `recheck2`), its verdict on the `Checked:` line.

## 7. The report (§0.7)

- **One-page tables** by `table-1page.mjs` in `$M`: `vh203-differential-<date>.md` (`rev-before` → Part A's same keys: a true before and after, one machine, one build); then one after-only page per part (A1 to A4, B), as VH-224's with "no before walk, by the plan", their notes citing VH-199's tallies.
- **The after-run page**, `after-run-<date>.md` in `$M`, on Phase 7's model: what ran; coverage by class against VH-199's counts; the stage rule audited for every fix item VH-205 to VH-232 (commit, evidence, Codex replies and `Checked:` lines, gate counts, digest rules); "Changed against VH-199's before", cited as the MacBook Pro's, instrument by instrument, every not-passing group accounted; the gaps and the 823 rows re-measured; WCAG by criterion; the 19 lines' outcomes; the "?" captures' index; the Disposition rows (`design-pass-3-2026-10-27.md`) linked.

## 8. Stops and risks

- Stops for the owner: Q1, Q2; a coverage reduction (none planned: 3,228 ≥ 3,219); a walker change beyond W1–W20.
- For the orchestrator: F2 (the in-memory plan, or a re-freeze if it rules that a walker change); W19's and W20's IDs; the 214 and S-76's four; VH-214.2's raise; a defect found.
- Risks: this Mac's speed (S-24; running states; job timeouts are one-line check-ins, never lengthened); the walker changes are many (eighteen edits) and each must move only its own rows, proved by the differential; Chrome profile per group; OneDrive and Sophos load.

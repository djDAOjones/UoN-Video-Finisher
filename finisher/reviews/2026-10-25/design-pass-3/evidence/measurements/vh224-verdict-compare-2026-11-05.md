<!-- markdownlint-disable -->

# VH-224 — the verdict compare (VH-224 #2)

- Claude's verdict `vh224-claude-verdict.md` (057f330c) was saved at 20:24:57Z. Codex astra's blind answer `vh224-codex-blind.md` was opened after it, once Codex exited at 20:28:36Z. The brief was `vh224-codex-blind-brief.md` (c6ef6abd).
- Claude says "pass with conditions". Codex says "fail, pending evidence repair". Both say "the batch-B measurements stand".

## Agreed

- **The keys:** 106 = 22 + 20 + 22 + 22 + 10 + 10, disjoint from A, union `stillUnrun`, walked once each in the four counted groups. Walker `e377132ba6f70227`, unchanged.
- **Fixtures:** every reached fixture-reading ID has its proof (VH-223's after-pilot, the same bytes). S-24 is not proved and is not reached.
- **Judgements:** 81 OK, 12 NOT-OK (S-03 ×8, S-81 ms-MY ×4, all in b1) and 13 not reached (S-24, b3 with b3t for zh-Hans zoom400proxy). Nothing is unresolved and there is no new product defect or fix item.
- **Attribution:**
  - S-03: the old-order rows, VH-216.1.
  - S-81: VH-200.1's wrapped-link reading (1,361 of 1,571 px²; font32 2,644 of 3,166; best 13.34). These are not VH-210.2's forced cases.
  - S-24: speed (Orchestrator #40; VH-223.1's class).
- **The four cannot-determine classes:** the thumbs (a person check, VH-223.2, 65 keys), the disc (VH-173, 52), mixed script (VH-173, 28), and S-76's textarea at 400 % (2). None is a measured pass.
- **Conditions:** AC Power throughout, no void, the start loads as listed, the five samples at 8 or above. The right keys were re-walked, all six are identical to their first walks, and no timing claim rests on a high sample.
- **WCAG** over the 93 reached, with no blanket conformance claim.
- **For the close:** VH-224.1 for B's 13 S-24 keys (VH-223.1 covers only A's 15); VH-216.1, VH-200.1 and VH-223.2 reused; VH-172.1 narrowed to the four at device scale 3; the Disposition row; the gate, the checker and the close check.

## Codex only, adopted

- **The reconcile's proof of record and retries.** `reconcile-214.mjs` checks only that each accepted line has a record and an outcome line. It does not check record hashes or list retries.
  - Repair: a new script `reconcile-214-r1.mjs` (the original kept, as run) also checks each B accepted record's sha1 against the walk folder. For each batch it lists every key with more than one run in the records folder's outcomes files, naming the accepted run and the other runs.
  - It applies each batch's own rule: A's, "a re-walk identical to its first walk is cited, and the first walk stands" (VH-223's table notes, `vh223-matrix-a-2026-11-05.md:118–122`); B's, "the re-walk's record is of record" (Orchestrator #40, carried by #41).
  - Its output goes beside the original in the records folder, added and not rewritten, with a sha1 list.
- **S-03's ten `formatTip` subjects** are absent in its eight reached keys (not-applicable, the closed title panel). This is the same old-order cause, VH-216.1. It is a structural shortfall to state in the decision and the commit, as VH-223's commit stated its four.
- **WCAG nuances, carried to the decision:**
  - 1.4.4 reached through 19 zoom200proxy and 8 font32 keys; 1.4.10 through 18 zoom400proxy keys.
  - 2.4.7 holds, since focus is visible even in S-81's four, while 2.4.13 fails there.
  - Batch B does not reach real browser zoom, dark or forced modes, a screen reader, or the four device-scale-3 cases.
- **Mixed script:** the house's weighted-count reading is settled; a strict WCAG interpretation stays qualified (`UI-STANDARDS.md:208`).

## Claude only

- The judging script's widened S-24 rule (`judge-b.mjs` 90caee18 → 1551bc47) and the walker kept at `e377132ba6f70227` while origin/main is at `14479eb`. Both are in the table's notes, which the blind brief barred Codex from reading.
- The digest rules to name: wcag-2.2-aaa (the ten criteria). No judgement cites carbon or nielsen.

## Disagreed, settled by the evidence

- **"A's 15 a5 and 12 a6t accepted entries name the first walk, though rewalk-a5 and rewalk-a6t hold replacements."** This is A's rule, not a defect. VH-223's table, on main, says: "The re-walks are set aside in the Runs table: cited, and not the accepted record unless they differ". It also says rewalk-a5 is "15 of 15 identical… So a5 stands" and rewalk-a6t "12 of 12 identical to a6. So a6 stands". So A's accepted records are right by A's ruling. B's ruling differs (#40, #41: the re-walk is of record), and both are applied as made. The r1 reconcile states each rule and lists the retries, which meets "retries stay traceable". A's accepted file on main is not this item's to change.
- **"The table: replace `?` before provenance, distinguish 106 keys from 112 attempts, 'Nothing moved' is no comparison, state 81/12/13, the c-d qualifications and the six supersessions."** Codex was barred from the Notes. The notes already state:
  - "No before walk, by the item", with VH-176's `unrunAfter` linked as each key's before;
  - "106 attempted, 93 reached… The page above counts records, not keys: 112 after and 98 reached…";
  - the 81 / 12 / 13 judgements;
  - the four c-d classes as "none a measured pass";
  - the six set aside under load, by group.

  The table is placed and never rewritten. The `?` cells and "Nothing moved" are the generator's output for a pair with no before, as in VH-223's table. The decision and the commit say so in words.

## Outcome

- Repair: the r1 reconcile, as above.
- Then a Codex re-check of the repaired point and of this compare's settlements (`recheck`), keeping its follow-up verdict.
- If Codex still disagrees on A's rule after reading VH-223's notes, the point is held for the owner, one line, with the item open.

## The re-check (added after it ran)

- Claude's reading of the three points was saved in the progress notes before Codex's answer was opened. Codex's re-check, `vh224-codex-recheck.md` (brief `vh224-codex-recheck-brief.md`), exited at 20:33:01Z and was opened afterwards.
- **The follow-up verdict: "pass with conditions".**
  - The r1 repair passes.
  - On A's selection: "My earlier objection is withdrawn; VH-224 has nothing to repair there".
  - The table's Notes suffice.
- Codex and Claude agree on all three points. No disagreement is left for the owner.
- What must still hold for the close: the ledger and Disposition link; VH-224.1 for B's 13; VH-172.1 narrowed. The decision and commit must explain the generated `?` and "Nothing moved", S-03's ten absent `formatTip` subjects, and the WCAG qualifications, and name the digest rules. Then the freeze, keeping both reconcile versions; a green settled gate; `node tools/check.mjs`; and Codex's close check.

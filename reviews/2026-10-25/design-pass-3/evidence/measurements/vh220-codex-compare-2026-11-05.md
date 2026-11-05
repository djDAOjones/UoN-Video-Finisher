<!-- markdownlint-disable -->

# VH-220 — the verdict compare

Claude's verdict was saved 2026-11-05 ~15:04Z (`vh220-claude-verdict.md`, sha1 `4e3e0d4e`), before Codex's brief was written. Codex astra's blind brief (`vh220-codex-blind-brief.md`, `8b61389a`) ran from `$W` at 15:05:19Z. That first run exited at 15:09:26Z with "Selected model is at capacity" and no answer; its log is kept as `vh220-codex-blind-try1.log`. The re-run started at 15:09:49Z. Its answer (`vh220-codex-blind.md`, `9056ea0b`) was written by 15:16:23Z and opened by Claude afterwards.

**The verdicts as given.** Claude: pass, no defect. Codex: "Fail: the evidence reaches all 144 conditions, but does not demonstrate the second job's immediate progress reset, and the candidate still has incomplete acceptance records and an insufficient basis for a full WCAG 1.4.10 claim." Both find no app defect.

## Agreed

- **Coverage:** 144 conditions, 15 cited and 129 walked as 153 records, all reached. S-115 counts 6 + 6 + 6 + 3 = 21. The cited keys match the driver's `--uncited` mapping.
- **Faults:** F11 reaches the settled watchdog failure. `S-31:recheck` runs, and the re-check fails again with no "Video read." first (block → "" → block). No new fault is needed: F3 holds and `runPreflight` takes the block branch. Ruling #38's conditions (1) and (3) are met.
- **R2-3** is met: Save is the only primary. **The kept warnings** are not nested. **The Set buttons** hand focus to their own time fields. **2.4.3 and 3.3.1** are met for the recorded transitions and errors. **4.1.3** is met for programmatic exposure (no speech claimed).
- **One machine:** every walked cell is on the Mac Pro. The MacBook Pro's and void folders are not in the table.
- **Power and load:** all groups on AC Power with no numeric mode, which meets #39's ruling. Codex's load table matches Claude's; no reading rests on a timing.
- **The "cannot determine" outcomes** (measure, targets, contrastExtra, limiting) stay qualifications, not passes. **The player finish+1s row** is the known instrument class (VH-199.1), not an app failure.
- **1.4.10** is claimed at 375 px only, not as 320 px conformance. Both say so. Codex reads it as "cannot say for conformance", and Claude as met within the bound.
- **R2-1's language change** after the failure is not observed: S-90b sets the language in its setup. Claude named it "not read, not claimed".
- **Pending at the close, not done yet:** the item's Notes correction (#38's condition 2), wish VH-220.1 in the ledger, the Disposition row's link (`design-pass-3-2026-10-27.md:759`), the gate, and the close check.

## Codex only

- **"Cited, not walked" is too absolute.** before-fixproof re-reads five cited en-GB light keys as fixture proofs (#39), outside the 144. The notes should say so. Claude agrees.
- **The player row has two items.** The "control target" item is a user-agent-size exemption (the native scrubber), not the finish+1s timing class, so the notes should describe them apart. Claude agrees.
- **The page's opening sentence promises `detail/`,** which is absent: no cell moved and no `--detail-failing` was passed. Claude agrees this is a wording point. An r1 page could pass `--detail-failing player`.
- **"Every row ends read" is not met as a complete claim** while R2-2's start instant and R2-1's language change stay unobserved. Claude reads both as sub-expectations of the states, not cells of the 144. Their outcome is the disagreement below.

## Claude only

- None beyond the verdict's framing: the criterion is met cell by cell, and the open items are the close's.

## Disagreed

- **R2-2's reset instant.** Claude held that the running second job at 4–5 % with its own stage words answers "no job shows another job's percentage or words". Codex holds that it proves the later running state only, not the interval after Create (`src/main.ts:3128`, `resetProgress()` `:3282` support the implementation, not the reading). **The evidence does not settle it.** S-115's setup waits for encoding before any reading. Two ways out, each beyond this item's record, so it goes to the orchestrator:
  - (a) an in-memory variant that reads the bar's value and text immediately after Create is pressed, walked on 95d18ee with the walker unchanged, as `S-31:recheck` was (a new variant needs the orchestrator's word);
  - (b) narrow the claim to the running state and add a wish line for VH-203 that names why.
- **R2-1's language change** goes the same way: an in-memory variant (S-90b settled, then the page language changed, then the status line read), or a wish line.
- **The verdict itself:** pass (Claude) against fail (Codex). It turns on the two points above and on the pending close items. Nothing here is a coverage reduction or an app defect.

## For the successor (repairs before the close check, adding, never rewriting)

1. The orchestrator's word on R2-2's instant and R2-1's language change: variant walks or wish lines (new wish IDs need that word).
2. An r1 page (`vh220-states-r1-2026-11-05.md` with `vh220-records-r1-2026-11-05/`), its notes corrected: the five fixture-proof re-reads of cited keys; the player row's two items; "answers R2-2" narrowed or replaced by the variant's reading; `--detail-failing player`.
3. The ledger as the brief's section 10 gives it, with #38's condition (2) Notes line and wish VH-220.1; then the gate, `node tools/check.mjs`, the freeze, the close check and the commit on `side/vh220`.

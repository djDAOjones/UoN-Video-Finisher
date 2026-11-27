# Model policy — UoN Video Finisher

Each step's models, efforts and second-model check; read when
briefing any session or model, and at every close (rule 9).

## Steps

| Step | Claude | Codex, `gpt-6.2-astra`, read-only | Second model |
| --- | --- | --- | --- |
| Scoping, design, a new mechanism, owner questions | Opus, high | high | blind draft from the same sources, differences settled in writing; then a review |
| An item's step, record-only ones included | Opus or Sonnet, high | high | review of the candidate diff before its commit lands; recheck after fixes |
| Finding, evidence reading, a hard disagreement | Opus, high | xhigh | independent reading; claims reviewed against evidence |
| Close of an item or phase | as the session | high | close check against the criteria, the record and Always |
| Record-only outside an item's step: a ruling, wish line, merge or mode fix | Sonnet, medium | — | skipped |
| Mechanical or read-only helper | Haiku or Sonnet, low–medium | — | none |

## How

- Name model and effort at every start or brief.
- Every step of an item is its own commit and gets its row's
  review, record-only work included; a step that is also design,
  evidence or a close keeps that row's check as well.
- One model's work gets the other's check; a rerun is no second model.
- A stricter method wins, such as the design review's checkpoints.
- Brief a second model from the record: the item file, the Always
  rules and the documents they route; blind where the table says so,
  the candidate diff and its revision added at the review.
- Findings are fixed or answered in writing, then rechecked.
- A review that cannot run: `Checked: none — blocked — <step>:
  <reason>`; the step waits.

## Close evidence

- A checked step: `Checked: gpt-6.2-astra — <verdict> — <scope>`,
  the scope naming the revision checked.
- A skipped step: `Checked: none — skipped — <step>: <reason>`.
- Claude's model and effort: in `Verify:`'s harness.
- At a close, the digest rule applied (rule 8).
- The checker warns when a close has none; no line proves a check.

## Signed

- Owner (delegated, not reviewed): Joe, 2026-11-27 — see PLAN-11, "everything approved", and VH-249

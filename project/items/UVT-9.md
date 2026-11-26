# UVT-9 — Phase 11's close: the shared defaults switched on for every folder, the lobby's extended run, NEXT_STEPS rewritten, the phase closed

## Intent

UVT-7 offers the app pack's compiler checks and lint layers for each
tool to take up in its own item, because a parent commit cannot mend a
tool's files. Once both tools have taken them up, the root makes them
the default for every folder, so the repository is as though it began
on the stack, and closes the phase in this ledger.

## Acceptance criteria

- The pack's compiler checks (`erasableSyntaxOnly` among them) and ESLint layers switched on in the root's base for every folder, `shared/` included, every gate green; each resolved config that changes named in the decision.
- The lobby's extended accessibility run (`npm run a11y:extended`, which UVT-8 installs), attended by the owner, its outcome dated and its coverage reconciled.
- `NEXT_STEPS.md` rewritten: VH-129 first again, then the order PLAN-11 deferred; VH-129 waits on this item as well as on the Finisher's Phase 12, so the Finisher does not start it before the parent's close.
- Phase 11 closed: reconciled against PLAN-11's Items, marked closed, the next phase's first item named with a reason, `verbs/recall.md` run.
- `node tools/check.mjs` 0 failures; the root gate green; each step's Checked line.

## Now

Updated: 2026-11-26

Next step: after UVT-8, VH-252 and VNG-15.

Open question: None.

## Context and sources

- [The plan, PLAN-11](../decisions.md)
- [The order of work](../../NEXT_STEPS.md)

## Notes

- 2026-11-26 — Opened by PLAN-11 after Codex's review of the draft plan found that switching the shared defaults on in UVT-7 would break the Finisher's gate (25 compiler errors, 10 lint errors) in files a parent commit cannot change.

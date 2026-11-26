---
standard: UoN Video Tools house conventions — the Finisher's, for code in shared/, lobby/ and the root
source: finisher/project/digests/house-conventions.md
version: 2026-11-26, pointing at the Finisher's digest of 2026-10-01 (commit 029ae1e), not copying it
retrieved: 2026-11-26
next-check: 2027-05-26
licence: the owner's; a house digest with a repository source
---
# House conventions — digest

The owner's own standards for code in `shared/`, `lobby/` and the root
files. The full text is the Finisher's digest, the source above; this
file names the rules that bite in the parent and routes there rather
than holding a third copy (the tools' digests are copies today; moving
them here is a parent item, when a change would otherwise be made
twice). A task that touches them names the rule it applied at close
(rule 8).

## Rules that bite here

- TypeScript `strict: true` with `noUncheckedIndexedAccess`; ES modules
  only; all imports at the top; no `any`.
- Files `kebab-case.ts`; units in the identifier, always.
- Config is the only home for numbers: a tool's `src/config/`, or a CSS
  token.
- JSDoc on everything exported; skip it on trivial internal helpers.
- Vitest; a shared module's tests live beside it in `shared/` and run
  in every gate that imports it.
- Commit subjects `ID: summary`, with a `Verify:` line.

## Checklist by task type

- Code in `shared/`: imports from no tool; every tool that imports it
  green before the close; no behaviour change hidden in a move.
- Tool configs at the root: each tool extends them, adds only what it
  alone needs, and its gate stays green from its own folder.
- The lobby: the four digests' UI rules, and the student side never
  names the staff side.

## Exceptions recorded

- none yet; an exception is a decision in project/decisions.md

## Deeper references

- [The Finisher's house conventions](../../finisher/project/digests/house-conventions.md), the full text
- [Name Graphics' copy](../../name-graphics/project/digests/house-conventions.md), its DSP rules dropped
- [The rules file](../rules.md)

---
standard: JSDoc on exported JavaScript, its types checked by the project's own TypeScript compiler under a ratchet — house digest from pm-skills 5's JSDoc pack
source: project/digests/jsdoc.md (copied from lab/next-v31/jsdoc/README.md in pm-skills' source, "The house rules")
version: pm-skills 5, 2026-11-07
retrieved: 2026-11-07
next-check: 2027-05-07
licence: the owner's, as the repository's
---

# JSDoc and the ratchet type check: house digest

<!-- cspell:ignore typedef checkJs typescriptlang -->

A project adopts this digest only by its signed profile. Each rule's
origin is in the pack's README; rules 3 to 6 come from one scratch
trial, not from a published standard.

## Rules that bite here

1. Exported functions, classes and modules carry JSDoc: purpose,
   parameters, return values and side effects.
2. Comments say why, not what, and earn their place; no boilerplate.
3. A JSDoc type counts only where the gate checks it: the ratchet runs
   the project's own compiler over tsconfig.jsdoc.json with checkJs,
   and its error count may not rise. A fall is recorded with
   `--lower`; a raise is a decision that edits the baseline by hand.
4. A shared object shape is named once with `@typedef` and imported
   where it is used, never written as a bare Object type; every type
   name in JSDoc resolves.
5. A parameter defaulting to an empty object is marked optional, its
   properties optional too, or loses the default.
6. A value crossing a module through `this` in a mixin or an untyped
   callback parameter is typed at the caller as well; annotations on
   the exports alone do not reach it.

## Checklist by task type

- Adding or changing an export: parameter and return types, a typedef
  for a shape used twice; run the ratchet; the count does not rise.
- Changing a shape: change its typedef first; the check then names the
  readers.
- DOM code: narrow once, where the element is queried, not at each use.
- Prose: why, not what; side effects named.
- A fix that lowers the count: record it with `--lower` in the same
  change.

## Exceptions recorded

None in the pack. A project lists here the decisions granting its
own.

## Deeper references

- pm-skills' source, lab/next-v31/jsdoc/README.md: each rule's origin
  and the ratchet's contract.
- PM-Skills 4.x, templates/AGENTS.md, Code documentation: rules 1
  and 2.
- TypeScript handbook, JSDoc Reference and Type Checking JavaScript
  Files, typescriptlang.org; not retrieved; a host a project's
  Network line may not list.

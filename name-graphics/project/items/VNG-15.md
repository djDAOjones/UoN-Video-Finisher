# VNG-15 — The seed rebuilt on the stack: its page in React and Carbon React in the forms kind's layout, the neutral palette at AAA, `npm run a11y` in the gate

## Intent

The owner asked for the apps rebuilt "as though it was made with this
stack in the first place". Name Graphics is still its seed — a page
shell, the neutral palette and its contrast test — so it is rebuilt
first, proving React, Carbon React, the boundaries and the accessibility
gate on this repository before the Finisher's larger rebuild. Its later
items (VNG-2 to VNG-9) then build on the stack.

## Acceptance criteria

- Starts after VNG-14 and the parent's UVT-8, which installs Playwright's browser in CI for the accessibility command this item puts in the gate.
- The pilot proves the shared tooling, the theme and the accessibility gate on the root install; it does not prove the Finisher's trim, encode, cancel, save or offline behaviour, which VH-251 proves for itself.
- The seed's page rebuilt in React with Carbon React's components from the forms starter's entry, its logic in the core and its interface in the interface folder. The starter's sample model, validation and persistence adapter stay out, as VNG-14 kept them: nothing typed is stored.
- The neutral brand pack owns colour and typeface, as the rules say: the Carbon theme takes its tokens, never the reverse; text at 7:1, the 3 px focus outline, 44 px targets, motion stopped under reduced motion; the neutral build carrying no University name, logo, typeface or colour. The contrast test, which reads the two token files today, kept and joined by checks of the rendered Carbon controls in light and dark.
- tests/a11y/project.mjs declares the page's states, reviewed snapshots, keyboard functions and journeys; `npm run a11y`, the standard command, in the gate and CI, passing at AAA: a row that fails is fixed; an exception is carried only as the pack's own mechanism allows and the owner signs, never by lowering the level or silencing the command.
- The gate: typecheck over all five projects UVT-7 defines (core, app, workers, tests and the accessibility pack's tests), the React entry named apart from any `.ts` of the same basename, lint, boundaries, deadcode, test, the build checked in a temporary folder (never `dist/`), `npm run a11y`, the docs checks and the checker; CI running it; the preview at `/UoN-Video-Tools/name-graphics/` building.
- No language switcher and no step pattern here: they stay with VNG-4 and VNG-5, as the parent's UVT-6.13 lists them. Code the Finisher also needs, the theme first among it (the parent's wish-list names it), moves to `shared/` only as a parent item first, as the rules say.
- `npm run a11y:extended` at the phase close with the owner attending, its outcome dated, the coverage reconciled; Phase 13 closed against PLAN-13's Items, the next item named with a reason, `verbs/recall.md` run; `NEXT_STEPS.md` in this folder brought to the close, VNG-2 next once the parent's UVT-9 lands.
- No test deleted or skipped; `node tools/check.mjs` 0 failures; each step's Checked line.

## Now

Updated: 2026-11-27

Next step: after the parent's UVT-8, the page's first component on the forms starter's entry, `src/root.tsx`, which VNG-14 left typechecked, linted and unserved.

Open question: None.

## Context and sources

- [The brand packs](../../brands/README.md)
- [The contrast test](../../test/contrast.test.ts)
- [The UI standards](../../UI-STANDARDS.md)

## Notes

- 2026-11-26 — Opened by PLAN-13.
- 2026-11-26 — Codex's review of the draft plan (gpt-6.2-astra): the pilot's narrower proof, the brand's ownership of colour and type, the starter's local-storage persistence, the rendered controls in both themes, this ledger's own extended run and close. Folded in above.
- 2026-11-26 — Codex's review of the record (gpt-6.2-astra): the dependency on UVT-8, the five typecheck projects, and the switcher and step pattern kept with VNG-4 and VNG-5. Folded in above.
- 2026-11-27 — VNG-14's forms step, by the orchestrator's ruling A, which the owner kept: `npm run typecheck` runs three of the five projects, the app, tests and accessibility harness, since UVT-7's entry check fails an empty project. This item's "all five" is met for the core here, its criterion putting the seed's logic in the core; the workers project joins with Name Graphics' first worker file (a wish-list line). This item's gate runs the projects that hold files, never an empty one.

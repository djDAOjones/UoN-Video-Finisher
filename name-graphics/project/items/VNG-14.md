# VNG-14 — Name Graphics' packs and signed lines: the model policy, accessibility testing at extended depth, the app opinion's forms kind, JSDoc on its scripts, the architecture record, Set 1

## Intent

On the owner's word of 2026-11-26 Name Graphics is rebuilt as though it
were begun on pm-skills 5's app opinion, every pack that fits taken in
full and each step reviewed by Codex (the parent's PLAN-11, this
ledger's PLAN-13). It is the pilot: a seed small enough to prove the
stack on the root's one install before the Finisher's rebuild.

## Acceptance criteria

- project/model-policy.md from the pack's template, as the parent's (UVT-7): per step, Claude's model and effort and Codex on `gpt-6.2-astra`, read-only, before the commit lands, a recheck after fixes, the revision named; the rules file's routed row; signed, delegated on "everything approved". This pays wish VNG-11.2, promoted here.
- Name Graphics' Codex hooks: a Codex hooks file (`hooks.json` in a `.codex` folder) written by hand in `name-graphics/` (the session and handover hooks with `--harness codex`, their paths the folder's own; never by `tools/harness.mjs`), and checked in a fresh checkout: a new clone with its own install, Codex opened on `name-graphics/`, its `.codex` layer and each hook trusted, each hook firing once and exiting 0, the run recorded; what only a person sees in a live Codex chat named as the owner's.
- Node: `package.json`'s `engines` brought to the root's (UVT-7, `^22.19.0 || ^24.0.0 || >=26.0.0`), the profile's Runtime line with it.
- The word budgets kept: each signed line and By-task row the packs add fits the profile's 400 and the rules' 600 words, compressing signed lines first where needed (VNG-13's trim), signed.
- The accessibility pack at extended depth, level AAA, copied by canon v5.0.3's a11y/install.mjs once UVT-7 has proved the runner, its extended command included, reaches the root install from this folder; the copy commit applying the harness policy UVT-7 proved, the pack's eight test files typechecked with no diagnostic and linted under the layer scoped to them, Name Graphics' own tests keeping their rules; `npm run a11y:doctor` run, each blocked method named; the profile's Accessibility testing line and the By-task row, with the command entering the gate in VNG-15.
- The app opinion's forms kind copied by canon v5.0.3's app/install.mjs; its `tsconfig.json`, `index.html`, Vite and Vitest configurations merged into Name Graphics' own, never beside them, the pack's tool-local `tsconfig.base.json` not copied; its configurations reaching the root install (the pm-skills finding in the parent's wish-list); the starter's React entry given a basename of its own, never `main` beside today's `src/main.ts` (TypeScript drops a `main.tsx` for the `.ts` of the same name even when both are named in `include`), a check proving the compiler and ESLint's project service read it; the starter's example model, validation and persistence adapter never entering as they are, since its sample form keeps typed names in local storage, which the rules' "nothing typed leaves the device" and the brief do not ask for: removed or replaced before the commit that would carry them; the seed's page still the live entry and the preview until VNG-15; the profile's App opinion line (forms, 2026-11-26), the app-opinion digest in Standards with its By-task row, Set 1's signed record carried as project/app/set1.json from the parent's (UVT-7).
- Name Graphics takes up the root's offered compiler checks and lint layers under its own ID.
- The JSDoc pack adapted by a recorded decision to its `.mjs` script, `check-links.mjs` (the stock pack selects JavaScript under `src/`): its configuration, the ratchet measuring this folder's configuration and baseline with the root's compiler as UVT-7 proved, the starting count in the decision; as intake asks, the digest adopted in Standards with its By-task row, the profile's JSDoc line as the template's comment gives it, and the type check in the gate and the Gate line.
- The architecture record from the pack's template at project/architecture.md, adopted on the owner's "retrofit everything in full" though the tool is one container: the system context as the seed actually runs (a page that says it cannot make a graphic yet, served by GitHub Pages, its Xerte upload to come), and apart from it, marked planned, the interactions later items bring (the browser's encoders, VNG-3 and VNG-6; Clipchamp, where a person takes the output); its By-task row.
- The signed lines rewritten to the stack, signed as delegated on "everything approved": the profile's Runtime, Dependencies, Standards (Carbon by its React package), Gate and Harness lines; the rules file's runtime-dependency line; the brief's Direction where it says Carbon in our own code, and its Constraints line "WCAG 2.2 AAA and Carbon productive for the page in every brand pack"; `UI-STANDARDS.md` brought to Carbon React in both places that forbid the package, its Design system introduction ("matched in the project's own code and never installed as a package") and its token systems table ("implemented to match Carbon's spec, never installed as a package"), each citing the Carbon rule as the parent's signed lines state it once (UVT-7), the brand pack still owning colour and typeface.
- The gate green at 126 passed or more, no test deleted or skipped, `npm run typecheck` running all five projects UVT-7 defines (core, app, workers, tests and the accessibility pack's tests); `node tools/check.mjs` 0 failures; each step's Checked line.

## Now

Updated: 2026-11-27

Next step: the Node range with Set 1's signed record, and the architecture record (the early start, 2026-11-27); the rest after UVT-7's close.

Open question: None.

## Context and sources

- [The profile](../profile.md)
- [The rules](../rules.md)
- [The brief](../brief.md)
- [The brand packs](../../brands/README.md)

## Notes

- 2026-11-26 — Opened by PLAN-13. The trial of 2026-11-26 copied both packs into `name-graphics/` of a clone: the accessibility pack's 40 files with no conflict; the forms kind's 20 once `tsconfig.json` and `index.html` were set aside. There, both no-emit checks and the three starter tests passed; ESLint, dependency-cruiser, Knip and the build failed. Codex's review of the record corrected the diagnosis: ESLint's project service missed the `main.tsx` in `src` because TypeScript kept the `main.ts` beside it and dropped the `.tsx` (removing `main.ts` made it read `main.tsx` on the same install); dependency-cruiser, Knip and the build failed because the pack assumes the app owns its `node_modules`.
- 2026-11-26 — Codex's review of the draft plan (gpt-6.2-astra): the pack's configs merged, never beside; the runner's reach to the root install proved first; the JSDoc pack's stock selection misses `.mjs`; the architecture record's opt-in stated against what actually runs. Folded in above.
- 2026-11-26 — Codex's review of the record (gpt-6.2-astra): the same-basename trap, the five typecheck projects, the JSDoc entries intake asks for, the Codex hooks' fresh-checkout check, `UI-STANDARDS.md` and the brief's Constraints among the signed edits, and the architecture's planned interactions told apart from the seed. Folded in above.
- 2026-11-26 — Codex's third review (gpt-6.2-astra): naming the `.tsx` in `include` does not save it, so the entry takes its own basename; this item copies the whole starter, so the local-storage sample is kept out here, not first in VNG-15. Folded in above.
- 2026-11-26 — Codex's fourth review (gpt-6.2-astra): the copied harness's passing policy, and the Design system introduction as well as the token table. Folded in above.
- 2026-11-27 — The model policy's row leaves the rules file at 583 words of 600: 17 to spare for the four By-task rows to come, so the signed lines are compressed first where needed.

# Profile — Video Name Graphics

<!-- What the owner brings. Hot: read before the first change. Under
     400 words (hard budget). Agents never change anything above the
     signature without a decision. Written by the intake on 2026-11-05
     from the owner's answers in session and from the sibling UoN Video
     Finisher's profile at 27f51dd, whose stack, standards and posture
     the owner chose to keep; every field intake could not source
     carries [guess]. -->

## Identity

- Product: a browser-only lower-third maker: transparent video for Clipchamp, or a PNG
- Owner: Joe · Repository: <https://github.com/djDAOjones/UoN-Video-Tools>, folder `name-graphics/`
- Push: the harness pushes to origin after every close, never to an
  upstream the project does not own
- Network: listed hosts github.com, registry.npmjs.org
- Budget: total 4,000 words for the base set; contract 500, profile 400,
  rules 600, Direction 150, whole backlog 1,000, decisions slice 1,000,
  trajectory item lines 300
- Session: 350k tokens of context

## Stack and infrastructure

- Runtime: TypeScript (strict), React, Vite, Vitest; Chrome with WebCodecs [guess]; Node ^22.19.0 || ^24.0.0 || >=26.0.0
- Gate: `npm run check` — non-mutating: `npm run typecheck` (four of five, workers with the first worker file; entry check; JSDoc ratchet), lint, `npm run boundaries`, dead code, `npm test`, docs checks, the checker; CI runs it before every publish
- Hosting and deploy: Xerte (public), the owner's flat upload per release; GitHub Pages (unadvertised preview) from each `main` push
- Harness: Claude Code and Codex, hooks by hand, never `tools/harness.mjs`; this ledger outranks a harness's memory
- Handoff: Claude Code plans and executes; Codex reviews read-only, per the model policy
- Secrets: none held; never in source, URLs, logs or the bundle; a leak rotated first, then a `[!]` line and a decision
- Accessibility testing: extended
- JSDoc type check: ratchet
- Dependencies: the root's one install (UVT-7), Set 1 exact; at runtime, the rules' line
- App opinion: forms, 2026-11-26
- Structure: `project/structure.md` (generated)

## Standards adopted

- IBM Carbon, productive style, through Carbon React → digest: carbon
  - the root brief's Carbon rule; the brand pack owns colour and typeface; one primary per state
- WCAG 2.2, level AAA → digest: wcag-2.2-aaa
  - 7:1 contrast in every pack, 44 px targets, focus appearance; exceptions recorded
- Nielsen's ten usability heuristics → digest: nielsen
  - status visible and announced; errors say what next; no power-user controls
- JSDoc house digest → digest: jsdoc
- House conventions, carried from the Finisher → digest: house-conventions
- The owner's app opinion → digest: app-opinion

## Conventions

- Prose: en-GB; commits per the contract's rule 9
- Naming: IDs `VNG-n`; files kebab-case.ts; units in identifiers

## Signed

- Owner (delegated, not reviewed): Joe, 2026-11-28 — see the parent's PLAN-11, VNG-15

Changes above this line are decisions.

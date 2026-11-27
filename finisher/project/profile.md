# Profile — UoN Video Finisher

<!-- What the owner brings. Hot: read before the first change. Within
     its hard budget on the Budget line. Agents never change anything above the
     signature without a decision. Written by the v3 intake from the
     canon record at 029ae1e on 2026-10-01; every field intake could
     not source carries [guess]. -->

## Identity

- Product: a browser-only app that brands, loudness-normalises and encodes one educational video for University of Nottingham staff
- Owner: Joe · Repository: <https://github.com/djDAOjones/UoN-Video-Tools>, folder `finisher/`
- Push: the harness pushes to the project's origin after every close,
  never to an upstream the project does not own; a push to `main`
  publishes the preview
- Network: listed hosts github.com, registry.npmjs.org
- Budget: total 4,000 words for the base set; contract 500, profile 500,
  rules 650, Direction 150, whole backlog 1,000, decisions slice 1,000,
  trajectory item lines 300
- Session: 200k tokens of context

## Stack and infrastructure

- Runtime: TypeScript (strict), React from VH-251, Vite, Vitest; Chrome with WebCodecs is the one supported browser; Node ^22.19.0 || ^24.0.0 || >=26.0.0
- Gate: `npm run check` — non-mutating: the canon checks, `npm run typecheck` with the scripts' JSDoc ratchet, then the v3 checker; CI runs it before every publish; browser-only checks by hand, recorded
- Hosting and deploy: Xerte, the public home: a flat upload by the owner from each release, `npm run package:xerte`; GitHub Pages, the unadvertised preview from `main`
- Harness: Claude Code and Codex, hooks kept by hand, never by `tools/harness.mjs`; this ledger outranks a harness's memory
- Handoff: Claude Code plans and executes; Codex reviews read-only; one writer per checkout, a second session in its own clone, handed back by commit
- Secrets: none held; never in source, URLs or logs; a leak is rotated first, then a `[!]` line and a decision
- Dependencies: the root's one install; direct runtime mediabunny, react, react-dom, @carbon/react (spec §3.1); any other stops and asks — a decision
- App opinion: forms, 2026-11-26
- JSDoc type check: ratchet
- Structure: `project/structure.md` (generated)

## Standards adopted

- IBM Carbon, productive style, through Carbon React → digest: carbon
  - the root brief's Carbon rule; the UoN brand owns colour and typeface; one primary per state
- WCAG 2.2, level AAA → digest: wcag-2.2-aaa
  - 7:1 contrast against the brand palette; 44 px targets; focus appearance; every exception recorded
- Nielsen's ten usability heuristics → digest: nielsen
  - status visible and announced; errors say what next; no control for power users
- House conventions → digest: house-conventions
  - the owner's code, naming, documentation and testing rules, carried from canon
- JSDoc house digest → digest: jsdoc
  - the `.mjs` scripts and `check-links.mjs`: exports documented (1); types count only where checked (3); shared shapes an imported `@typedef` (4)
- The owner's app opinion → digest: app-opinion
  - the forms kind: React and Carbon React render the interface, plain TypeScript the engine; AAA aim, an AA failure blocks

## Conventions

- Prose: en-GB; commits `ID: summary` with a `Verify:` line
- Naming: IDs `VH-n`; files kebab-case.ts; units in identifiers
- `docs/01-specification.md` is authoritative; a correction is proposed, never made

## Signed

- Owner (delegated, not reviewed): Joe, 2026-11-27 — see PLAN-11, VH-249

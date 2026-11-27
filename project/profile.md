# Profile — UoN Video Tools

<!-- What the owner brings. Hot: read before the first change. Under
     400 words (hard budget). Agents never change anything above the
     signature without a decision. Written by the intake verb at
     pm-skills 5.0.3 (d599678) on 2026-11-26, in stage 6 of the UoN
     Video Tools restructure, from the repository, its two tools'
     ledgers and RESTRUCTURE-LOG.md; every field intake could not
     source carries [guess]. -->

## Identity

- Product: the parent of the UoN Video Tools: the root files, `shared/` and `lobby/`; each tool has its own ledger
- Owner: Joe · Repository: <https://github.com/djDAOjones/UoN-Video-Tools>
- Push: the harness pushes to the project's origin after every close,
  never to an upstream the project does not own; a push to `main`
  publishes the whole preview
- Network: listed hosts github.com, registry.npmjs.org
- Budget: total 4,000 words for the base set; contract 500, profile 400,
  rules 600, Direction 150, whole backlog 1,000, decisions slice 1,000,
  trajectory item lines 300
- Session: 350k tokens of context

## Stack and infrastructure

- Runtime: TypeScript (strict), React, Vite, Vitest; Chrome with WebCodecs; Node ^22.19.0 || ^24.0.0 || >=26.0.0
- Gate: `npm run check` — non-mutating, at the root: each tool's gate from its folder, then this ledger's checker; CI runs it before every publish
- Hosting and deploy: GitHub Pages, the unadvertised preview from `main`, the staff lobby at the top and each tool in its folder; Xerte, the public home, a flat upload per tool by the owner
- Harness: Claude Code and Codex, hooks kept by hand (UVT-7); this ledger outranks a harness's memory
- Handoff: Claude Code plans and executes; Codex reviews read-only; one writer per checkout, a second session in its own clone, handed back by commit
- Secrets: none held; never in source, URLs or logs; a leak is rotated first, then a decision
- Accessibility testing: extended
- Dependencies: one install and lockfile, `node_modules` at the root in OneDrive (UVT-7 exception, recovery in `project/rules.md`); Set 1 exact; no install scripts; runtime mediabunny, react, react-dom, @carbon/react, a fifth on asking
- Structure: `project/structure.md` (generated)

## Standards adopted

- WCAG 2.2, level AAA → digest: wcag-2.2-aaa
  - 7:1 contrast, 44 px targets, focus appearance; every exception recorded
- IBM Carbon, productive style → digest: carbon
  - Carbon's components and patterns first, per the brief; two token systems, never collapsed
- Nielsen's ten usability heuristics → digest: nielsen
  - status visible and announced; errors say what next
- House conventions → digest: house-conventions
  - the owner's rules, in the Finisher's digest

## Conventions

- Prose: en-GB; commits `ID: summary` with a `Verify:` line
- Naming: IDs `UVT-n`; files kebab-case.ts; units in identifiers

## Signed

- Owner (delegated, not reviewed): Joe, 2026-11-26 — see PLAN-11, UVT-7

Changes above this line are decisions.

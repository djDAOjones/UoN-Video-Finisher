# Structure — UoN Video Finisher

<!-- Written by hand on 2026-11-26 (VH-226) in tools/structure.mjs's form: below the repository's root that tool finds no `.git` of its own and walks the folder without the ignores, so it would count `samples/`, `release/` and `_archive/`. Counted with `git ls-files -co --exclude-standard -- finisher/`, its skip list applied (dot folders, `project/`, `node_modules/`, `dist/`). Directory counts include descendants; ./ counts root files only. -->

| Path | Files | Role |
| --- | --- | --- |
| `./` | 26 | the app shell (`index.html`), the spike pages, the Vite, TypeScript, ESLint and lint configs (extending the repository root's bases), the contract (`AGENTS.md`, `CLAUDE.md`), `package.json` (no dependencies of its own; the install is the root's) and the kept rulebooks `UI-STANDARDS.md` and `DEV-INFRASTRUCTURE.md` |
| `docs/` | 5 | the specification set — protected; docs/01-specification.md is authoritative, docs/02-technical-rationale.md the settled why, docs/03-open-decisions.md the human questions |
| `pm_skills/` | 37 | the frozen canon 4.9.2 record and framework copy, pinned by `project/migration/inventory.json`; never edited (`project/history.md`) |
| `pm_skills/integrations/` | 6 | canon workflows, frozen |
| `pm_skills/prompts/` | 14 | canon prompts, frozen |
| `pm_skills/scaffold/` | 4 | canon scaffold scripts, frozen (`pm_skills/scaffold/check-memory.mjs` still runs in the gate over the frozen memory) |
| `pm_skills/templates/` | 4 | canon templates, frozen |
| `public/` | 26 | static assets copied verbatim |
| `public/branding/` | 26 | the closing masters, browser-ready, stable URLs |
| `reviews/` | 14,615 | review dossiers and their evidence, by date; old absolute paths in them are history |
| `reviews/2026-08-26/` | 7 | the repository review and its critiques (VH-54 to VH-68) |
| `reviews/2026-10-01/` | 272 | the UX review, the spec gap review and VH-124's audit and screenshots |
| `reviews/2026-10-18/` | 7 | VH-105's translation sheets, sent and returned |
| `reviews/2026-10-20/` | 130 | Codex astra's audit, critique and design pass, with evidence |
| `reviews/2026-10-21/` | 49 | the Codex run's handoff and report, and its browser readings |
| `reviews/2026-10-22/` | 210 | design passes 1 and 2 and their evidence |
| `reviews/2026-10-24/` | 73 | Codex astra's briefs and checks for PLAN-8, VH-137 and VH-162 |
| `reviews/2026-10-25/` | 13,847 | design pass 3, its walker and measurements; two load logs tracked though the log pattern ignores them, on purpose (VH-226) |
| `reviews/2026-11-25/` | 20 | Phase 9's UX loops, the owner's sheet and the restructure prompt |
| `scripts/` | 11 | maintainer and gate scripts: placeholders, the temp-directory build, the Xerte package, the cross-engine runner, branding builds, the strings sheet and table |
| `src/` | 212 | the app |
| `src/acceptance/` | 5 | the §13 harness, dev-only |
| `src/assets/` | 4 | brand files wanted and optional at build time |
| `src/audio/` | 25 | the loudness meter and chain — pure functions over Float32Array; three files protected |
| `src/config/` | 14 | every tuneable value; the home of numbers |
| `src/core/` | 4 | the wake lock and the watchdog; the logger, diagnostics, redaction, egress watch and version are `../shared/core/` (UVT-2) |
| `src/i18n/` | 12 | the three languages' tables, the compiler, the binder, the preference and the translation sheet |
| `src/media/` | 56 | inspect, capability, probe, pre-flight, conform, pipeline, branding, OPFS, save |
| `src/offline/` | 6 | the service worker, its registration and the offline file list (VH-161) |
| `src/spike/` | 14 | maintainer probes, dev-only |
| `src/styles/` | 2 | `src/styles/app.css` and the brand tokens; the Carbon tokens are `../shared/styles/` |
| `src/ui/` | 59 | panels, choices, text and formatting |
| `src/workers/` | 9 | the job worker, cancellation, the typed protocol |
| `test/` | 14 | the Vitest suite and its helpers |
| `test/ebu3341/` | 2 | the EBU Tech 3341 acceptance harness — protected, never weakened |
| `test/helpers/` | 4 | shared signal generators and test helpers |
| `tools/` | 15 | pm-skills 5.0.3's tools, the release's bytes |
| `verbs/` | 9 | pm-skills 5.0.3's verbs, the release's bytes |

## Entry points

- [`index.html`](../index.html) → [`src/main.ts`](../src/main.ts) — the whole UI, the worker client, the job lifecycle
- [`src/workers/job.worker.ts`](../src/workers/job.worker.ts) — the whole job
- [`package.json`](../package.json) — the scripts; npm run check is the gate
- [`README.md`](../README.md) — the product description

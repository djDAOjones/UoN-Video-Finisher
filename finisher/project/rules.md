# Rules — UoN Video Finisher

<!-- Owner-signed; rule 1 reads this file. Always holds the invariants,
     the protected paths and the Environment; By task routes the
     documents a task type reads, with budgets. Written by the v3 intake
     from the canon AGENTS.md at 029ae1e on 2026-10-01; the census in
     project/migration/census.md traces every canon obligation to its
     home. [guess] marks what intake could not source. -->

## Always

- No media egress: no network or analytics call carries media, a filename or media characteristic; branding assets travel inbound only.
- The source file is never modified; every output is a new file.
- WebCodecs, not ffmpeg.wasm (rationale §1): no wasm codec, `SharedArrayBuffer` or COOP/COEP headers.
- Direct runtime dependencies: mediabunny, react, react-dom, @carbon/react; others stop and ask.
- Measure loudness on source content only, never the joined timeline; the meter is proved against EBU Tech 3341 (±0.1 LU) before use.
- Streaming, not buffering: no step holds the whole file; `fastStart` set explicitly, never `'in-memory'`.
- Numbers live in `src/config/` or a CSS token; a literal elsewhere is a defect.
- Silent data loss is the worst outcome: what cannot be carried through warns before processing starts; cancel leaves no partial file or orphaned OPFS data.
- All imports at the top; build output is read-only. Search the full source tree before proposing a change, and `src/config/` and existing controls before adding a value or control.
- One structured logger; the diagnostics bundle is dev-only and redacted: no filename, path or media bytes.
- A two-part version identity (product version, build id); no secret in the bundle.
- Protected paths: `docs/*.md` — corrections are wish lines the owner approves; `src/audio/kweighting.ts`, `loudness.ts`, `truepeak.ts` — changes re-run the EBU harness; `test/ebu3341/` — never weakened; `samples/` — never written, moved or deleted; `test/fixtures/`, `dist/`, `node_modules/` — generated; `pm_skills/` — frozen canon record.

### Environment

- Run the environment preflight at session start (warn-only; blocking before memory-file surgery). The working copy is the owner's pinned OneDrive checkout, `core.fileMode` false; a change no session made is reported, never committed (checks and recovery: DEV-INFRASTRUCTURE.md).
- Every file belongs to one ledger, by its folder: `finisher/` to VH, `name-graphics/` to VNG, the rest to UVT. An item changes only what its ledger owns. `shared/` is common to every tool: code moves there when a second tool needs it, a change there is a parent item, and it closes only with every tool's gate green. Shared source is not a dependency.
- Run `npm run check` on a settled machine, never beside `run-in-engines.mjs`; a slow DSP failure reports the machine.
- The owner owns structure and design: do the work; explain only when asked.
- `CLAUDE.local.md` holds personal instructions.
- The spike pages and cross-engine runs are the manual gate; name what only a person verified.

## By task

| Task type | Document to read | Budget (words) | Approver |
| --- | --- | --- | --- |
| UI, controls, text, states, accessibility, user-facing behaviour | UI-STANDARDS.md | 2,400 | AAA exceptions documented (design review gate) |
| UI | project/digests/carbon.md | 460 | |
| UI | project/digests/nielsen.md | 350 | |
| UI | project/digests/wcag-2.2-aaa.md | 600 | |
| build, dev server, scripts, deploy, versioning, diagnostics | DEV-INFRASTRUCTURE.md | 4,700 | |
| code change | project/engineering.md | 3,100 | |
| a container, external system, boundary or interface change | project/architecture.md | 400 | none |
| code change | project/digests/house-conventions.md | 1,700 | |
| a change the specification governs | docs/01-specification.md | 8,200 | the owner approves every edit to docs/ |
| re-opening a settled choice | docs/02-technical-rationale.md | 2,600 | the owner |
| briefing a session or second model; any close | project/model-policy.md | 400 | the owner signs the policy |

## Signed

- Owner (delegated, not reviewed): Joe, 2026-11-27 — see PLAN-11, VH-249

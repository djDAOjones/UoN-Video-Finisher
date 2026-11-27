# Rules — Video Name Graphics

<!-- Owner-signed; rule 1 reads this file. Always holds the invariants,
     the protected paths and the Environment; By task routes the
     documents a task type reads, with budgets. Written by the intake on
     2026-11-05, adapted from the UoN Video Finisher's rules at 27f51dd
     with its media and loudness invariants dropped. [guess] marks what
     intake could not source. -->

## Always

- Nothing typed leaves the device: no network or analytics call carries a name, a role line or a graphic; brand assets travel inbound only.
- Brands are packs under `brands/<id>/`, chosen at build time. Nothing outside a pack names a brand. The neutral build carries no University name, logo, typeface or colour, and the gate proves it. Every pack offers the neutral styles beside its own.
- Output: transparent video native at 3840 × 2160 with a 1920 × 1080 option, or a still PNG; transparency kept in every output; as small and as cheap to make as the format allows.
- Runtime dependencies: react, react-dom and @carbon/react (PLAN-13), mediabunny by VNG-3's decision; any other stops and asks.
- Numbers live in `src/config/`, a brand pack or a CSS token; a literal elsewhere is a defect.
- All imports at the top; build output is read-only. Search the whole source, `src/config/` and existing controls included, before proposing a change or adding a value or control.
- One structured logger; the diagnostics bundle is redacted (never a typed name or role) and dev-only.
- A two-part version identity (product version, build id); no secret in the bundle (the profile's Secrets line).
- Protected paths: `brands/uon/assets/` — the University's trademark and typeface, changed only on the owner's word; `dist/`, `release/`, `node_modules/`, `package-lock.json` — generated.
- Push and network follow the profile's lines; a blocked push is reported as pending.

### Environment

- The working copy is the owner's pinned OneDrive checkout, `core.fileMode` false; a change no session made is reported, never committed. Recovery: `finisher/DEV-INFRASTRUCTURE.md`, "When the toolchain stalls on this filesystem".
- Every file belongs to one ledger, by its folder: `finisher/` to VH, `name-graphics/` to VNG, the rest to UVT. An item changes only what its ledger owns. `shared/` is common to every tool: code moves there when a second tool needs it, a change there is a parent item, and it closes only with every tool's gate green. Shared source is not a dependency.
- The owner owns structure and design: do the work; explain only when asked.
- `CLAUDE.local.md` holds personal instructions; harness memories are not the record.
- A person checks by hand what no tool can (what Clipchamp accepts, real browsers, the Xerte upload), recorded as a person's.

## By task

| Task type | Document to read | Budget (words) | Approver |
| --- | --- | --- | --- |
| UI, controls, text, states, accessibility, user-facing behaviour | UI-STANDARDS.md | 2,500 | AAA exceptions documented (design review gate) |
| UI | project/digests/carbon.md | 460 | |
| UI | project/digests/nielsen.md | 350 | |
| UI | project/digests/wcag-2.2-aaa.md | 600 | |
| code change | project/digests/house-conventions.md | 1,300 | |
| build, dev server, scripts, deploy, versioning | README.md | 1,200 | |
| a brand pack | brands/README.md | 500 | the owner approves each UoN asset |
| briefing a session or second model; any close | project/model-policy.md | 400 | the owner signs the policy |
| a container, external system, boundary or interface change | project/architecture.md | 400 | none |
| UI state, component or journey | docs/accessibility.md | 300 | the owner signs each exception |
| JavaScript exports, shapes or callers | project/digests/jsdoc.md | 400 | the owner signs each exception |

## Signed

- Owner (delegated, not reviewed): Joe, 2026-11-27 — see the parent's PLAN-11, VNG-14

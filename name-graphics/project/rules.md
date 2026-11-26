# Rules — Video Name Graphics

<!-- Owner-signed; rule 1 reads this file. Always holds the invariants,
     the protected paths and the Environment; By task routes the
     documents a task type reads, with budgets. Written by the intake on
     2026-11-05, adapted from the UoN Video Finisher's rules at 27f51dd
     with its media and loudness invariants dropped. [guess] marks what
     intake could not source. -->

## Always

- Nothing typed leaves the device: no fetch, upload, beacon or analytics call carries a name, a role line or a graphic; brand assets travel inbound only.
- Brands are packs under `brands/<id>/`, chosen at build time. Nothing outside a pack names a brand. The neutral build carries no University name, logo, typeface or colour, and the gate proves it. Every pack offers the neutral styles beside its own.
- Output: transparent video native at 3840 × 2160 with a 1920 × 1080 option, or a still PNG; transparency kept in every output; as small and as cheap to make as the format allows. What Clipchamp accepts is checked by a person and recorded.
- No runtime dependency without a decision; a second stops and asks.
- Numbers live in `src/config/`, a brand pack or a CSS token; a literal elsewhere is a defect.
- All imports at the top; build output is read-only. Search the full source tree before proposing a change; check `src/config/` and existing controls before adding a value or a control.
- One structured logger; the diagnostics bundle is redacted (never a typed name or role) and dev-only.
- A two-part version identity (product version, build id). Secrets never in source, URLs, logs or the bundle; a leak is rotated first, then a `[!]` line.
- Protected paths: `brands/uon/assets/` — the University's trademark and typeface, changed only on the owner's word; `dist/`, `release/`, `node_modules/`, `package-lock.json` — generated.
- Push and network follow the profile's Push and Network lines: push by that route after every close, never to an upstream the project does not own; a blocked push is reported as pending.

### Environment

- The working copy is the owner's OneDrive checkout, `core.fileMode` false; a change no session made (a revert, a conflict copy) is reported, never committed. If the toolchain stalls, the Finisher's DEV-INFRASTRUCTURE.md, "When the toolchain stalls on this filesystem", is the recovery.
- The sibling UoN Video Finisher (`../2026-08-24 UoN Video Helper`) is the source of copied code: a copy names the Finisher commit it came from; this project reads its code, never its record, and never writes there.
- The owner, a vibe coder, owns structure and design: do the work; explain only when asked.
- `CLAUDE.local.md` holds personal instructions; harness memories are not the record.
- Name what only a person verified: Clipchamp, real browsers, the Xerte upload.

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

## Signed

- Owner (delegated, not reviewed): Joe, 2026-11-05 — see the INTAKE decision, 2026-11-05

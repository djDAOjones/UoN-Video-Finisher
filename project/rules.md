# Rules — UoN Video Tools

<!-- Owner-signed; rule 1 reads this file. Written by the intake verb
     on 2026-11-26 from the restructure prompt's "Three ledgers and who
     owns what", its decisions D3, D7, D9 and D14 and the two tools'
     rules files. -->

## Always

- Every file belongs to one ledger, by its folder: `finisher/` to VH, `name-graphics/` to VNG, the rest to UVT. An item changes only what its ledger owns. `shared/` is common to every tool: code moves there when a second tool needs it, a change there is a parent item, and it closes only with every tool's gate green. Shared source is not a dependency.
- The ID says where a commit may write: `VH-n` only `finisher/`, `VNG-n` only `name-graphics/`, this ledger's IDs only the rest; the restructure's founding commits excepted.
- `shared/` imports from no tool; no tool imports from another. A tool item needing a shared change raises a parent item, which ships first; the tool's line reads "blocked: UVT-n". Code moves into `shared/` in three green steps: added, switched, taken up.
- A decision is written once, in the ledger that owns it; another cites it by date and ID. Deferred work crossing ledgers is a line in the other ledger.
- One pm-skills version for all three ledgers, refreshed together; the three contracts are the same file.
- Editions are build-time modes inside a tool. No preview folder inside another's; no service worker for the lobby; the student side never names the staff side.
- Protected paths: `finisher/samples/` — never written, moved or deleted; `package-lock.json`, `node_modules/`, `_site/` — generated.
- Push and network follow the profile's Push and Network lines: push by that route after every close, never to an upstream the project does not own; a blocked push is reported as pending.

### Environment

- The working copy is the owner's pinned OneDrive checkout, `core.fileMode` false; a change no session made is reported, never committed. Recovery: `finisher/DEV-INFRASTRUCTURE.md`, "When the toolchain stalls".
- A chat on a tool's folder works that tool, one on the root this ledger. One writer per checkout across all three; a second chat needs its own clone or worktree.
- Never regenerate a tool's hooks with `tools/harness.mjs`: below the root it writes the tool's folder into the hook's path, which suits only a chat on the root. The hand-kept settings stand.
- The handover is one per checkout: if the start notice names another ledger's item or says it is held, ask the owner.
- The owner, a vibe coder, owns structure and design: do the work; explain only when asked.
- Name what only a person verified.

## By task

| Task type | Document to read | Budget (words) | Approver |
| --- | --- | --- | --- |
| the Finisher's files, after `node tools/read.mjs` in its folder | finisher/AGENTS.md | 500 | its ledger |
| Name Graphics' files, after `node tools/read.mjs` in its folder | name-graphics/AGENTS.md | 500 | its ledger |
| build, install, scripts, deploy, the preview | finisher/DEV-INFRASTRUCTURE.md | 4,700 | |
| the restructure, its proofs and the owner's words | RESTRUCTURE-LOG.md | 9,000 | |
| code change | project/digests/house-conventions.md | 350 | |
| UI | project/digests/wcag-2.2-aaa.md | 600 | |
| UI | project/digests/carbon.md | 460 | |
| UI | project/digests/nielsen.md | 350 | |

## Signed

- Owner: Joe, 2026-11-26.

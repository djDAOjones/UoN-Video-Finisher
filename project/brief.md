# Brief — UoN Video Tools

<!-- Owner-signed. Direction lives here and in the backlog; agents do
     not change it without a decision. Written by the intake verb on
     2026-11-26 from the owner's words of 2026-11-25 and 2026-11-26 and
     the restructure prompt, `finisher/reviews/2026-11-25/UoN-Video-Tools-restructure-prompt.md`. -->

## Direction

UoN Video Tools: standalone browser-only tools for University of
Nottingham staff and students that share base code, in one repository.
Each tool is a folder with its own ledger: the Video Finisher
(`finisher/`) and Video Name Graphics (`name-graphics/`). This ledger
owns the root files, `shared/` and `lobby/`, the order of work across
the tools, and the decisions that bind every tool: structure,
dependencies, hosting, brand and standards. Code two tools need lives
in `shared/`, imported by path; variants of a tool are build-time
editions inside it. A lobby names the tools: a staff lobby on the
preview and on Xerte, a student lobby on Xerte only.

## What we are building

The common ground of the tools and the way between them. `shared/`
holds the code a second tool needs, moved there in three green steps
and never copied. The root holds the one install, the one lockfile,
the shared tool configs and the one deploy workflow, which builds every
tool into its own folder of the preview after the root gate. `lobby/`
is a small app of the parent's: today a placeholder staff lobby on the
preview; later a staff edition for the preview and Xerte and a student
edition for Xerte, in the UoN look and three languages. The
translation register every tool shares is the parent's too.

## Who it is for

University of Nottingham staff, who get every tool and every student
edition, and can pass the student lobby on; and students, who get only
what is marked for them. The owner, a solo vibe coder working through
AI sessions, and the colleagues at the campuses who check translations.

## Constraints

- Browser-only, static, no media or typed text leaving the device, as
  each tool's rules say.
- One repository, one install at the root; four runtime dependencies,
  mediabunny, react, react-dom and @carbon/react, a fifth only on
  asking; shared source imported by path, never a package.
- The checkout is the owner's OneDrive copy, pinned (D2), with
  `node_modules` at its root (UVT-7).
- WCAG 2.2 AAA, and Carbon in its productive style. The Carbon rule,
  which each tool's `UI-STANDARDS.md` cites rather than restates
  (UVT-7): a tool's interface uses Carbon React's components
  (@carbon/react, Set 1) and Carbon's patterns wherever one fits; a
  control of the tool's own code, built on Carbon's conventions, only
  where none fits, with a decision in the tool's ledger saying why; two
  token systems, the brand's for colour and typeface and Carbon's for
  shape, motion and status colour, never collapsed; where Carbon's
  defaults meet AA only, the profile's AAA lines (7:1 contrast, 44 px
  targets, focus appearance) override them.
- On Pages: one site, the staff lobby at the top, each tool or edition
  a folder beside the others, never inside another's; no service worker
  for the lobby.

## Out of scope

- Each tool's own product, which its own brief governs.
- npm workspaces, while the checkout stays on OneDrive (D2).

## Open questions

- Which tools students get, entry by entry (the owner's, with the real
  lobbies).
- Whether the checkout leaves OneDrive (D2), and npm workspaces if it
  does.

## Signed

- Owner (delegated, not reviewed): Joe, 2026-11-26 — see PLAN-11 (2026-11-26), "everything approved"; UVT-7 rewrote the Constraints

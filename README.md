# UoN Video Tools

Browser-only video tools for University of Nottingham staff and students,
in one repository.

## What each folder is

| Folder | What it is | Its ledger |
| --- | --- | --- |
| `finisher/` | The UoN Video Finisher: brands, loudness-normalises and encodes one educational video | `finisher/project/`, IDs `VH-n` |
| `name-graphics/` | Video Name Graphics: a lower-third name graphic as transparent video or a PNG | `name-graphics/project/`, IDs `VNG-n` |
| `lobby/` | The placeholder staff lobby at the top of the preview: the tools' names and a link to each | the parent's, once founded |
| `shared/` | Code two tools need, imported by path; it arrives after the move | the parent's, once founded |

The root holds the one install (`package.json` and `package-lock.json`),
the deploy workflow and this file. The parent's own ledger, IDs `UVT-n`, is
founded after the move; until then the restructure's log is
`RESTRUCTURE-LOG.md`.

## Working on a tool

- **Open a chat on the tool's folder**, `finisher/` or `name-graphics/`,
  not on the root. Each tool has its own contract (`AGENTS.md`), ledger,
  tools and hooks, and they expect the tool's folder as the project.
- **Install once, at the root:** `npm ci`. Each tool finds the install by
  walking up; no tool has a lockfile or `node_modules` of its own.
- **The gate:** `npm run check` in a tool's folder runs that tool's gate;
  at the root it runs every tool's in turn.
- **One writer per checkout.** Two chats on two tools at the same time need
  a second clone or worktree.

## The preview

Every push to `main` runs every tool's gate, builds each tool into its own
folder of one GitHub Pages site and puts the placeholder lobby at the top.

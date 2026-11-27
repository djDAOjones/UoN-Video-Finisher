# UoN Video Tools

Browser-only video tools for University of Nottingham staff and students,
in one repository, `djDAOjones/UoN-Video-Tools`.

## What each folder is

| Folder | What it is | Its ledger |
| --- | --- | --- |
| `finisher/` | The UoN Video Finisher: brands, loudness-normalises and encodes one educational video | `finisher/project/`, IDs `VH-n` |
| `name-graphics/` | Video Name Graphics: a lower-third name graphic as transparent video or a PNG | `name-graphics/project/`, IDs `VNG-n` |
| `shared/` | Code two tools need, imported by path, one copy (`shared/README.md`) | the parent's |
| `lobby/` | The placeholder staff lobby at the top of the preview: the tools' names and a link to each, a TSX component rendered to a static page at build time (`scripts/build-lobby.mjs`) | the parent's |

The root holds the parent's ledger (`project/`, IDs `UVT-n`), which owns
every file outside the two tool folders and the order of work across the
tools; the one install (`package.json` and `package-lock.json`); the tool
configs every folder extends (`tsconfig.base.json`, `eslint.base.js`,
`.editorconfig`, Prettier and markdownlint); the deploy workflow; and
`RESTRUCTURE-LOG.md`, the record of how the two tools came together. Its
architecture record, [project/architecture.md](project/architecture.md),
draws the whole system: the lobby, the two tools and where each is served.
What comes next, ledger by ledger, is [NEXT_STEPS.md](NEXT_STEPS.md).

## Working here

- **Open a chat on the folder you are working on:** `finisher/` or
  `name-graphics/` for a tool, the root for `shared/`, the lobby, the
  root files or the order of work. Each has its own contract
  (`AGENTS.md`), ledger, tools and hooks.
- **Every file belongs to one ledger, by its folder**, and a commit's ID
  says where it may write: `VH-n` only `finisher/`, `VNG-n` only
  `name-graphics/`, `UVT-n` the rest. The root gate checks it.
- **Install once, at the root:** `npm ci`. Each tool finds the install by
  walking up; no tool has a lockfile or an install of its own (a tool's
  `node_modules/`, where present, holds links to the root's copies, made
  by `scripts/link-root-install.mjs`, and the caches Vite and Vitest
  write, such as `.vite` and `.vitest-cache`).
- **The gate:** `npm run check` in a tool's folder runs that tool's gate;
  at the root it runs every tool's in turn, then the commit-ID check, the
  root's lint (`shared/`, the lobby, the scripts and configs, `tests/`) and
  types (`npm run typecheck`: `shared/`, the lobby, `tests/a11y/`, and the
  scripts' and configs' JSDoc by a ratchet, which `npm run jsdoc` runs
  behind a guard; its modes go through it, never to the ratchet alone:
  `npm run jsdoc -- --init` for a first baseline, `-- --lower` for a
  lower count, `-- --lower --accept-environment-change` after a reviewed
  compiler or config change), its tests, the
  lobby's accessibility gate (`npm run a11y`, which needs Playwright's
  Chromium headless shell in its cache) and the parent's checker. CI runs
  each part.
- **One writer per checkout.** Two chats on two tools at the same time need
  a second clone or worktree.
- **Chats from before 2026-11-26** were filed under the old folders' paths
  and cannot be resumed.

## The preview

Every push to `main` runs every gate, builds each tool into its own
folder of one GitHub Pages site and puts the placeholder lobby at the top:

- the lobby: <https://djdaojones.github.io/UoN-Video-Tools/>
- the Finisher: <https://djdaojones.github.io/UoN-Video-Tools/finisher/>
- Name Graphics: <https://djdaojones.github.io/UoN-Video-Tools/name-graphics/>

The public home of each tool is a flat upload to Xerte, made by the owner.

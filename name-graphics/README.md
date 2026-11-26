# Video Name Graphics

A browser-only app that makes a name graphic — a lower third with a name
and an optional second line — from a short form, and saves it as a
transparent video to lay over other video in Clipchamp, or as a still
PNG. Nothing typed leaves the device.

It is one of the [UoN Video Tools](../README.md): this folder,
`name-graphics/`, in the repository `djDAOjones/UoN-Video-Tools`, beside
the UoN Video Finisher (`../finisher/`), whose simple, accessible form
and look it keeps, and the code they share (`../shared/`). Unlike the
Finisher it is built to travel: brands are packs chosen at build time
(see [brands/README.md](brands/README.md)), and the default build
carries no University branding.

## Status

Founded 2026-11-05; the seed (VNG-1) is a page shell. The plan is in
[project/backlog.md](project/backlog.md) and the why in
[project/decisions.md](project/decisions.md). Since 2026-11-26 it lives
in the shared repository (VNG-11); its old repository,
`djDAOjones/Video-Name-Graphics`, is archived and its preview address
returns 404.

## Build, run and check

- **Install once, at the repository's root:** `npm ci` there (or
  `npm install`). This folder has no lockfile or `node_modules` of its
  own; Node and Vite find the root's by walking up, and its dev tools
  run at the root lockfile's versions.
- **Dev server:** `npm run dev` here, at <http://localhost:5173> (Vite
  moves to the next free port if that one is taken).
- **The gate:** `npm run check` here: types, lint, tests (including the
  shared core's tests from `../shared/`), Markdown lint and links, then
  this ledger's checker. At the root, `npm run check` runs every tool's
  gate and the parent's checks.
- **Shared code:** the core modules and the Carbon tokens are imported
  by path from `../shared/`, never copied; a change there is the parent
  ledger's item (`UVT-n`). The base TypeScript and ESLint configs are the
  root's, extended here.
- **The preview:** every push to `main` builds this tool into
  <https://djdaojones.github.io/UoN-Video-Tools/name-graphics/>, beside
  the Finisher and under the staff lobby, from the repository's one
  workflow, `../.github/workflows/deploy-pages.yml`.
- **Versioning:** a two-part version identity, the product version in
  `package.json` and a build id from the date and commit.
- **The working copy** is the owner's OneDrive checkout of the whole
  repository. If the toolchain stalls, the Finisher's
  [DEV-INFRASTRUCTURE.md](../finisher/DEV-INFRASTRUCTURE.md), "When the
  toolchain stalls on this filesystem", is the recovery.

## The record

This tool runs pm-skills 5.0.3 with its own ledger, IDs `VNG-n`. The
contract is [AGENTS.md](AGENTS.md); the ledger is [project/](project/);
what comes next is [NEXT_STEPS.md](NEXT_STEPS.md). Open a chat on this
folder to work on Name Graphics; one writer per checkout, so a second
chat at the same time needs its own clone or worktree.

# Next steps

Written 2026-11-12 during a repository tidy. The live record is the
ledger in [`project/`](project/); this page is a short summary of it.

## Current state

- `main` is level with GitHub at the PR #5 merge (pm-next v3.1 tooling
  refresh, 2026-11-12). Phase 8 closed 2026-11-09; no code is in flight.
- The GitHub repository is now `djDAOjones/UoN-Video-Finisher`; the local
  folder and `package.json` name still say "helper" (VH-226).
- Heavy work (walks, the gate, GPU work) runs on the Mac Pro (PLAN-8);
  main development stays on the MacBook Pro.
- The GitHub Pages preview deploys from `main` and was green on the last run.

## Known problems

- `reviews/` holds about 640 MB and 8,700 tracked files of test evidence and
  keeps growing.
- Some sample-video file names quoted in tracked docs and tests identify
  people or sensitive topics, and this repository is public.
- `npm audit` reports 22 issues, all in development tools (6 high); the
  runtime dependency `mediabunny` is clean. Dependency changes need a
  decision (AGENTS.md rule 7).
- There is no `LICENSE` file, although `package.json` says MIT.
- The repository sits on OneDrive; Files-On-Demand can dehydrate
  `node_modules` and git worktrees.

## Next three tasks

1. **VH-204**: cut the release for Xerte (likely 0.3.0), on the MacBook Pro.
2. **VH-137**: the owner's review of the accessibility statement, due
   2026-11-18.
3. **VH-14 / VH-226**: the Xerte upload, then rename the project folder and
   the `package.json` name to "finisher".

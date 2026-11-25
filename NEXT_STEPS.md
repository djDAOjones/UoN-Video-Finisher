# Next steps

Written 2026-11-12 during a repository tidy; brought up to date on
2026-11-25, after the overnight UX loops (Phase 9) and the 0.3.1 cut. The live record is the ledger in [`project/`](project/); this
page is a short summary of it.

## Current state

- Release 0.3.1 is cut (VH-245, 2026-11-25): tag `v0.3.1`, and its Xerte
  zip is in `release/`, built from the tag. It is 0.3.0, the page Phase 8
  closed on (VH-204), with Phase 9's fixes. Nothing is uploaded: the
  upload is the owner's (VH-14).
- Phase 9, the overnight UX loops of 2026-11-25 (PLAN-9), is closed: three
  rounds of analysis, and what they found mended in existing words only.
  The analysts' reports, each fix's evidence and the sheet of 33 points
  that wait on the owner are in [`reviews/2026-11-25/`](reviews/2026-11-25/);
  start with `owner-sheet-2026-11-25.md`.
- `main` on GitHub and the preview are the release.
- The GitHub repository is `djDAOjones/UoN-Video-Finisher`; the local
  folder and `package.json` name still say "helper" (VH-226).
- Heavy work (walks, GPU work) runs on the Mac Pro (PLAN-8); main
  development stays on the MacBook Pro. Phase 9's fixes were read in
  Chrome on the MacBook Pro and have not had the Mac Pro's walk.

## Known problems

- `reviews/` holds about 640 MB and 8,700 tracked files of test evidence and
  keeps growing.
- Two sample names that identified a person and a health topic were
  replaced by aliases on 2026-11-12 (PRIVACY-NAMES); older commits still
  carry them.
- `npm audit` reports 22 issues, all in development tools (6 high); the
  runtime dependency `mediabunny` is clean. Dependency changes need a
  decision (AGENTS.md rule 7).
- There is no `LICENSE` file, although `package.json` says MIT.
- The repository sits on OneDrive; Files-On-Demand can dehydrate
  `node_modules` and git worktrees.

## Next three tasks

1. **The owner's sheet**: answer the points in
   [`reviews/2026-11-25/`](reviews/2026-11-25/) that wait on him, the
   words, the small new things and the defaults.
2. **VH-137**: the owner's review of the accessibility statement, whose
   date of 2026-11-18 has passed; the statement still promises it.
3. **VH-14, then VH-226**: the owner uploads the 0.3.1 zip to Xerte;
   then rename the project folder and the `package.json` name to
   "finisher".

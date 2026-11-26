# Next steps

Written 2026-11-12 during a repository tidy; brought up to date on
2026-11-26 for Phase 12, the full pm-skills stack (PLAN-12). The
live record is the ledger in [`project/`](project/); this page is a short
summary of it. The order of work across every tool is in the
repository's [`NEXT_STEPS.md`](../NEXT_STEPS.md).

## Current state

- The restructure is done (VH-226, 2026-11-26): the Finisher is
  `finisher/` in the repository `djDAOjones/UoN-Video-Tools`, beside Video
  Name Graphics and `shared/`, on one install at the repository's root.
  Its preview is <https://djdaojones.github.io/UoN-Video-Tools/finisher/>;
  the old `/UoN-Video-Finisher/` address returns 404. The running record is
  `RESTRUCTURE-LOG.md` at the root.
- Open a chat on this folder to work on the Finisher. Chats from before the
  move were filed under the old folder's path and cannot be resumed. One
  writer per checkout: two chats on two tools at once need a second clone.
- The owner's sheet is answered (decisions, PLAN-9, 2026-11-25): every
  recommendation accepted, 26 points to build with Codex checking each,
  seven waiting on a person's check. The 26 wait for Phase 12, whose
  VH-249 brings the Codex model policy.
- Release 0.3.1 is cut (VH-245, 2026-11-25): tag `v0.3.1`, its Xerte zip
  in `release/`. Nothing is uploaded: the upload is the owner's (VH-14).
  `main` and the preview are ahead of it: VH-161's offline after first
  load and VH-246's first fix.
- Heavy work (walks, GPU work) runs on the Mac Pro (PLAN-8), which needs
  the new path set up when it next takes work (D15).

## Known problems

- `reviews/` holds about 860 MB and 14,600 tracked files of test evidence.
- Two sample names that identified a person and a health topic were
  replaced by aliases on 2026-11-12 (PRIVACY-NAMES); older commits still
  carry them.
- `npm audit` reports issues in development tools only; the runtime
  dependency `mediabunny` is clean. Dependency changes are the parent
  ledger's decision.
- There is no `LICENSE` file, although `package.json` says MIT.
- The repository sits on OneDrive; Files-On-Demand can dehydrate
  `node_modules` and git worktrees.

## Next three tasks

1. **Phase 12, the full pm-skills stack** (PLAN-12, the owner's word of
   2026-11-26 in the parent's PLAN-11): the Finisher rebuilt on the app
   opinion's forms kind with React and Carbon React, each step reviewed
   by Codex. First **VH-249**, after the parent's UVT-7: the packs, the
   baseline accessibility run and the correction of the specification,
   which the owner approves before **VH-250** starts; then VH-251 (after
   Name Graphics' pilot, VNG-15) and VH-252.
2. **VH-129**, the staff and student editions, on the rebuilt Finisher,
   after Phase 12 and the parent's UVT-9; its plan asks the owner what
   each edition keeps and is called.
3. **VH-247**, the Finisher's words in the shared translation register,
   with the parent's UVT-4; then the colleagues' first round (UVT-5) and
   **the 26 accepted points** of the owner's sheet (PLAN-9); beside them
   the owner's own: VH-137 (the statement's review) and VH-14 (the Xerte
   upload).

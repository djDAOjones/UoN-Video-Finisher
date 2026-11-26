# VNG-11 — The UoN Video Tools restructure: Name Graphics becomes `name-graphics/` in one repository with the Finisher and shared code

## Intent

The Finisher's VH-226 counterpart, on the owner's word of 2026-11-25: "the parent project should be UoN Video Tools, and there are standalone tools within that which share a lot of base code, the tools include the Video Name Graphics Generator and the Video Finisher (which soon must be split into staff and student versions). We need to figure out how to maintain a shared code base and differences." The plan is the Finisher's restructure prompt, committed there under reviews/2026-11-25 (its 1a9927ca), answered "approves everything".

## Acceptance criteria

- This project's two commits are merged into djDAOjones/UoN-Video-Tools with their own SHAs, its files under name-graphics/, the tree byte-equal; this repository is then archived and its Pages site turned off.
- `npm ci` at the new repository's root, then `npm run check` from name-graphics/: green, no test deleted or skipped.
- A chat opened on name-graphics/ gets this contract and start notice once.
- The preview serves this tool at its own folder beside the Finisher's.
- The identical core files, `tokens.carbon.css` and the identical tool configs come from the shared folder with no copy here, or the owner deferred it and a line says so (D10).

## Now

Updated: 2026-11-26

Next step: the folder has moved in and its history is merged with its own SHAs; the gates from each folder and the root, the deploy of the one preview, then this repository's archiving and its Pages site turned off, on the owner's word.

Open question: None.

## Context and sources

- [INTAKE, the founding entry this supersedes in part](../decisions.md)

## Notes

- 2026-11-26 — Opened as VH-226's counterpart (D6). The project took pm-skills 5.0.1 first (REFRESH-501), as the merged repository holds one version (D8).

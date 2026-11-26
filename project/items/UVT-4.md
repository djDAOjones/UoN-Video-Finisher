# UVT-4 — The translation register: one record of every tool's words, and change-only requests to the colleagues

## Intent

Colleagues at the campuses will check the tools' Chinese and Malay. On
the owner's word of 2026-11-26, every tool's words go into one register
owned by this ledger, in `shared/`, so a word two tools share is
translated once, and each colleague is asked only for what is new,
changed or unreviewed in their language. The tools' halves are VH-247
and VNG-12, each blocked on this item.

## Acceptance criteria

- One register in the repository, one row per message, built from each tool's English table by a script, never kept by hand. Each row: the key; which tools use it (the Finisher, its student edition, Name Graphics; a message two tools share is one row); the English; where it shows; the translator's note; whether it is drawn into a video or graphic; when the English last changed and a fingerprint of it. For each language: the translation, its status (machine draft, reviewed, out of date), when it was reviewed, and the fingerprint of the English it was made from.
- When a tool's English changes, the script gives the row a new fingerprint and date and marks every language's translation out of date, keeping the old one as a starting point.
- A request is one Excel workbook per language, holding only that language's new, out-of-date and unreviewed rows: which tools, where it shows, the note, the English now, the English before (for a changed row), the current translation to correct, a column for the answer and one for comments; the key and fingerprint in locked columns.
- A returned workbook is merged by a script: a row is taken only if its fingerprint still matches (otherwise reported as changed while out for translation), its placeholders are checked, and it is marked reviewed with the date. The tools' zh-Hans and ms-MY tables are written from the register; the gate fails if a table and the register disagree.
- The register records that a row was reviewed and when, not the colleague's name, unless the owner says otherwise: the repository is public.
- The Finisher's sheet and scripts (`finisher/src/i18n/sheet.ts`, `finisher/scripts/strings-sheet.mjs`, `finisher/scripts/strings-table.mjs`) are the starting point, moved to `shared/` in three green steps, not rewritten.
- Every tool's gate and the root gate green.

## Now

Updated: 2026-11-26

Next step: after stage 6's shared set (UVT-1 to UVT-3), plan the register's file format and the move of the Finisher's sheet with the owner.

Open question: None.

## Context and sources

- [The owner's words and choices, 2026-11-26](../../RESTRUCTURE-LOG.md)
- [The Finisher's half, VH-247](../../finisher/project/items/VH-247.md)
- [Name Graphics' half, VNG-12](../../name-graphics/project/items/VNG-12.md)
- [The Finisher's sheet](../../finisher/src/i18n/sheet.ts)

## Notes

- 2026-11-26 — Opened at the founding (INTAKE) from the item the restructure log wrote down for stage 6; the decisions are PLAN-10 in the Finisher and PLAN-2 in Name Graphics. The owner's words: "I have collegues willing to help with translation - how should that be managed accross apps? a single excel for all the apps with a field for which app(s)? it would be good to date translation so updated translation requests are only requested on parts needed". He chose "Stage 6 first (Recommended)" and "Requests of changes only (Recommended)".

# VNG-12 — Name Graphics' words in the translation register every tool shares

## Intent

Name Graphics is to speak en-GB, zh-Hans and ms-MY (VNG-4). On the owner's word of 2026-11-26, every tool's words go into one translation register owned by the parent ledger, checked by colleagues at the campuses through change-only requests. This item puts Name Graphics' words into that register, so its Chinese and Malay come from the same record and the same colleagues as the Finisher's, and a word both tools share is translated once.

## Acceptance criteria

- Every message in Name Graphics' English table is in the parent's register with its key, where it shows and its translator's note, tagged as Name Graphics'; a test fails if a key is missing or out of step.
- A message whose English and meaning are the same as a Finisher message (the language switcher, the problem report, the accessibility statement's shared lines) is one row tagged with both tools, not two.
- Words drawn into the graphic itself, if any, are marked as drawn.
- The zh-Hans and ms-MY tables are written from the register by the parent's script, never by hand; each language shows the machine-translation note until its rows are reviewed.
- `npm run check` green from `name-graphics/` and from the root.

## Context and sources

- [VNG-4, the three languages](../backlog.md)
- [The parent's register, written down for stage 6 to open](../../../RESTRUCTURE-LOG.md)
- [PLAN-2](../decisions.md)

## Notes

- 2026-11-26 — Opened on the owner's word: "I have collegues willing to help with translation - how should that be managed accross apps? a single excel for all the apps with a field for which app(s)?" Answers: the register is the parent's, after stage 6; colleagues get change-only requests (decisions, PLAN-2). Name Graphics' words can join a later round than the Finisher's first; only what changed is asked for.

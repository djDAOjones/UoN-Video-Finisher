<!-- markdownlint-disable -->

# VH-236 — the design compare

- Claude's design: `vh236-claude-design.md`, saved 00:18Z, sha1 189ac84c (before Codex started).
- Codex astra's blind design: brief `vh236-codex-design-brief.md` (49855dba), run 00:19:04–00:22:06Z, answer `vh236-codex-design.md` (6487ef5d), opened 00:24:18Z. Verdict as given: "Build as designed below".
- Orchestrator #46's word, ~00:20Z: S-29 is case (a), built as part of the approved change with no read-failure code; the second finding not built; one line at this compare.

## Agreed

- Every path that withdraws `#step-trim` goes through `revealLaterSteps`; only the non-recoverable block is "step 1 refuses" in the approval's sense; the storage block keeps the trim; the read failure (`clearTrim('unreadable')`, both branches) withdraws it but never announces, its `previewUrl` cleared first.
- **S-29 is case (a):** all nine records write `#page-announcer` once, the prores refusal's full text before its block; the read failure writes `#source-status` only. Shortening at the block fixes S-29; no read-failure code.
- All 22 refusal records are order 1 (the error before the block); order 2 is forced in tests.
- The sequences, F the full text, S its first sentence: error then refusing block `"" → F → S`; refusing block then error `"" → S`; storage block, either order, `"" → F`, no block-time write; offered (S-32) `"" → F`; S-29 `"" → F → S`, the read failure leaving S.
- Guards: a language switch empties the region, so nothing is re-said; another sentence said since is left alone; an earlier file's full text is not claimed as this file's.
- Emptying drops the approved first sentence; deferring changes the offered case's timing: both rejected. Nothing needs a new word beyond the approved removal, an element, a `docs/` line or another caller's change.
- The finding: an offered refusal (S-32) then an unreadable file leaves F standing with the trim withdrawn; code-derived; not built.
- The reader reads final state and history apart, per key, from `__mutations.json` and the settled record; never a whole-record grep for the second sentence (order 1's history holds F legitimately).
- Tests on stand-ins drive the helper production uses; `screen-text.test.ts:256`–`:259` becomes an exact wiring assertion, its negative (never step 1's line) kept.

## Codex only, adopted

- **Shorten in place, not re-say.** At the refusing block, the helper deletes the second sentence (and the gap before it) from the text node it wrote, rather than writing a fresh node through `announce`. A fresh node is a new announcement of S; deleting the suffix is a removal (ARIA's default `aria-relevant` is "additions text", so a removal is not among what a polite region reports), and is the closest fit to "removing words only". Claude's re-say is dropped. A speech reading stays a person's; nothing claims it silent.
- **The helper owns its node:** it writes its own fresh text node into `#page-announcer` (as `announce` does) and keeps it; it shortens only if that node is still the region's sole child holding exactly F. With Claude's "this file's preview refused" condition (`#trim-preview-note` shown, which every new file hides), no selection hook is needed.
- Behavioural tests assert the source status is untouched and record fresh-node writes against in-place deletions.

## Claude only, kept

- S-149's 12 at 320 px do carry F at the base: they were walked only in VH-203's bounded before (`b3`, `b3-split`), outside `v2142-read.mjs`'s `a[1-4]g` filter. Codex read the filter, not the b-groups.

## Disagreed, settled by Claude on the evidence

- **The first sentence: the code route, not the key route.** Codex proposed a key `trim.noPreviewRefused`. Kept to the code route: `Intl.Segmenter(locale(), { granularity: 'sentence' })` takes the first segment of `t().trim.noPreview`, trailing white space trimmed. Reasons: no text is added anywhere (the approval removes words); a key would add three table rows, a filled-sheet row and a sheet place, and its default place "Step 2, Trim" is wrong for a sentence said only once step 2 is gone, while a new place text is allowed only "if its tests ask one" and they do not (they ask a non-empty place). The bytes are pinned per table in Node (ICU 78.3) and read in Chrome by the walk; a test pins two sentence segments per table and F = S + gap + the removed sentence, so a later translation that breaks the shape fails the gate. Codex's concern, runtime parsing, is met by those pins. Not a point for the owner: both routes are within the approval.

## The design as built

`src/ui/preview-refusal.ts`: `firstSentence(text, locale)`; a small object made from the announcer, `trimOffered`, `refused`, `words` and `locale`, with `said()` (on the preview's `error`: a fresh node, F while the trim is offered, S once withdrawn) and `trimWithdrawn()` (after the block: if the trim is withdrawn, this file's preview refused, and its own node is still the sole child holding F, `deleteData` from S's length). `src/main.ts`: the handler calls `said()` in place of `announce(() => t().trim.noPreview)`; the block calls `trimWithdrawn()` after its `setSourceStatus`. Tests as agreed. Walk and reader as agreed.

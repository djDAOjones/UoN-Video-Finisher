<!-- markdownlint-disable -->

# VH-236 — Claude's design (saved 2026-11-09, before Codex's blind design is opened)

Base `73d16f0`. Read from the code at the base and from VH-203's records (`$S/vh203-walk/`, read-only).

## 1. Every path that withdraws the trim step

`#step-trim` is `laterSteps[0]`; only `revealLaterSteps` sets its `hidden` (`src/main.ts:967`), called at four places:
- `:1550`, a file read: shown.
- `:1674`, step 1's block (`summary.verdict.outcome === 'block'`, `:1653`–`:1688`): `shown.setup = setupStepsResolve(verdict)`. False for every block but too little storage: **step 1 refuses**, the trim withdrawn. True for the storage block: the trim stays (S-31).
- `:1694`, a storage block cleared: shown.
- `:1858`, `clearTrim('unreadable')` (`:1841`), from the read failure's two branches (`:1564`, `:1578`): the trim withdrawn, but the file was never read; it is not "step 1 refuses" in the sense of the block, and `clearTrimPreview()` and `trimPreviewNote.hidden = true` run first, so this file has no preview and its `error` handler returns at `if (!previewUrl) return`.

So the refused preview's announcement can meet a withdrawn trim only at step 1's block. Before any file, the trim is hidden but the preview has no `src`.

## 2. S-29: case (a), covered by the approved removal

S-29's setup reads `prores-1080p.mov` (preview refused, then blocked), then chooses `notvideo.mp4` (read failure). In all nine of VH-203's S-29 records (a-groups, `__mutations.json`) `#page-announcer` is written **once**, with the full text, 80–90 ms before the prores block's `#source-status` write (e.g. en-GB w1280: announcer t=832, block t=914, read failure t=1491–1494). The read failure writes `#source-status` only. In the code, `announce` (`:312`) is called only by the errors panel (`:1084`) and the preview's `error` (`:2101`); the read-failure path (`clearTrim('unreadable')`, `:1564`, `:1578`) never writes the announcer, and `clearTrimPreview()`'s `removeAttribute('src')` + `load()` cannot reach the handler (the spec removes pending media-element tasks, and `previewUrl` is null). **S-29's sentence is left over from the earlier refusal in its own scenario: case (a).** The change at the block (section 5) makes S-29 hold the first sentence alone, with no S-29-specific code. The orchestrator's branch (b) does not arise; nothing is built for the read-failure path.

## 3. The two orders in VH-203's records

All 43 refusal records read (S-28 ×9, S-149 ×24 incl. w320 in `b3`/`b3-split`, S-140n, S-29 ×9) are **order 1**: the preview's `error` (full text) before the block's verdict. S-149's 12 at w320 carried the sentence too: they were walked only in VH-203's bounded before (`b3`, `b3-split`), outside `v2142-read.mjs`'s `a[1-4]g` filter, not absent. Order 2 (block first, then the error) is not seen in Chrome here; the tests force it.

## 4. The first sentence: the code route

`#trim-preview-note` binds `data-i18n="trim.noPreview"` (`index.html:193`) and must keep both sentences, so the key's text cannot change. Two routes:
- **Key route:** a new key with the three first sentences; it adds three table rows, a row in the filled sheet `reviews/2026-10-18/VH-105-strings-filled.csv` (its test regenerates each table from it), a sheet place (the `trim` prefix would say "Step 2, Trim", wrong for a sentence said only once step 2 is gone), and a text that can drift from `noPreview`'s.
- **Code route (chosen):** the first sentence taken from `t().trim.noPreview` at run time by `Intl.Segmenter(locale(), { granularity: 'sentence' })`, its first segment with trailing white space trimmed. Node 24 (ICU 78.3) gives exactly "A preview is not available for this file." / "此文件没有预览功能。" / "Pratonton tidak tersedia untuk fail ini."; Chrome 157 is walked. No word is added anywhere; one source of truth. Tests pin, per table, the result byte-equal to the approved first sentence and the remainder byte-equal to the removed sentence.

## 5. Where the choice is made, and the both-orders sequences

The choice is made from the steps' state, at two moments, by one small helper in `src/ui/preview-refusal.ts` (stand-in tested, as `src/ui/reveal-status.ts`), given a page object from `main.ts` (`said` = the announcer's text, `announce`, `trimOffered` = `!#step-trim.hidden`, `refused` = `!#trim-preview-note.hidden`, i.e. this file's preview was refused, `words` = `t().trim.noPreview`, `locale`):
- **On the preview's `error`** (`sayPreviewRefused`): both sentences while the trim is on the page; the first alone once step 1 has withdrawn it.
- **After step 1's block** (`keepPreviewRefusalTrue`, called after `revealLaterSteps(shown)` and the block's `setSourceStatus`): if the trim is withdrawn, this file's preview was refused, and the announcer still holds the full text, it says the first sentence alone (through `announce`, a fresh node). Otherwise nothing.

Expected `#page-announcer` sequences (from its state before the file, "" on a fresh page):
- **Order 1, refused after the error** (all 22, S-29's first file): `"" → full` (at the error; the trim then on the page, its times working, so the sentence is true) `→ first` (at the block). Ends holding the first sentence.
- **Order 2, refused before the error:** `"" → first`. Ends first.
- **Storage block, either order:** `"" → full`; the block writes nothing. Ends full.
- **Offered (no block; S-32's F7):** `"" → full`. Ends full.
- **S-29:** `"" → full → first` (prores block) and nothing at the read failure. Ends first.
- **Guards:** a language switch empties the announcer (`:316`), so a full text in the old language is never re-said; another sentence said since (Errors captured) is left; a full text left by an earlier file whose own preview did play (`refused` false) is not re-said as this file's.

Why re-say the first sentence rather than empty the region or change it quietly: the criteria keep the first sentence byte for byte, and the walk expects the 22 to keep it; emptying drops it. A quiet rewrite needs `aria-live` toggled on the announcer, which collides with the language switch's `quietLiveRegions` bookkeeping (`:3897`): rejected. Deferring the error's announcement until the verdict would change the offered case's timing: another caller's behaviour, rejected. Cost, stated in the table: in order 1 a person may hear the full text, then the block, then the first sentence again; a speech reading is a person's.

## 6. The tests

- `src/ui/preview-refusal.test.ts`, stand-ins: the first sentence per table byte-equal; order 1, order 2, the storage block, the offered case, each sequence asserted; the guards (language switch emptied, another sentence held, an earlier file's text with `refused` false); the full text never re-said once the trim is withdrawn.
- `test/screen-text.test.ts:256`–`:259` strengthened: the handler calls `sayPreviewRefused(previewRefusal)` and never step 1's line; the page object binds `words: () => t().trim.noPreview` and `announce`; the block calls `keepPreviewRefusalTrue(previewRefusal)` after `revealLaterSteps(shown)`.
- The i18n tables' tests unchanged and green (no table edited).

## 7. The walk and the reader

52 keys a side at `7db38f355f3c46c2`, by the driver on `matrix.mjs --keys`: S-28 ×9, S-149 ×24, S-140n ×1, S-29 ×9, S-32 ×9. The reader (`$S/vh236-walk/`, from `v2142-read.mjs`) reads every group's records, per key: `#page-announcer`'s final text (`instruments.ax.live` and the last announcer write), the sequence of its writes from `__mutations` with the `#source-status` block and read-failure times, first sentence exact, second sentence present or absent, trim step offered (the state expression's flags), status reached. Expect after: S-28, S-149, S-140n `full → first`; S-29 `full → first`; S-32 `full`, unchanged.

## 8. A finding, not built

The announcer is never emptied for a new file (`clearTrim('reading')` and `resetTrim` leave it). So an offered refusal's full text (a file that reads but does not preview) survives a next file's read failure that withdraws the trim (`#step-trim` hidden, "You can still set the times." standing), and a next file's block where its own preview played (`refused` false). Beyond the 22 and S-29: one line to the orchestrator; not built without word.

## 9. Files

`src/ui/preview-refusal.ts` (new), its test, `src/main.ts` (the handler, the block, the page object), `test/screen-text.test.ts`; ledger and evidence. No i18n table, `index.html`, `docs/`, CSS or sheet edit.

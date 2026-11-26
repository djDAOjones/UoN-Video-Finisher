<!-- markdownlint-disable -->

# A blind design check: VH-231, a fix item's raise (ledger only)

You are Codex astra, checking a design blind and read-only. You write nothing. Your working directory is a git worktree of the UoN Video Finisher repository at commit `95d18eed5db1ae56d1fe6512053bad714357d899` (call it the base). Another session is writing its own design for the same item; you are not shown it. Answer from the evidence and the code.

## What is being designed

VH-231 is a new fix item, raised from a check (VH-222) that found a defect. The raise writes only the item's file and ledger lines under `project/`; a later worker builds it from the criteria the raise writes. Nothing is built now. Your job is to say what the remedy should be, stated as criteria a builder can test, and to judge the points below.

The defect, as VH-222's proof of record read it on this Mac (en-GB, light, 1280 and 320 px), from the walker's records:

- **S-23** (a 30 s Matroska file, `cut-short-30s.mkv`, cut at 70% of its bytes; Staff; before Create): the source panel's "Video properties" (a closed disclosure) lists "Duration 20 seconds"; the trim says "Keeping the whole video, 20 seconds."; `#audio-warnings` holds "Worth knowing about the audio", then "The video file is shorter than expected" with its detail; the status line says "… Worth knowing about the audio: The video file is shorter than expected."
- **S-23s** (that file as Student submission, closing Cut, finished): `#process-result` holds "Finished video — 9.2 MB", the record "Made from cut-short-30s.mkv: a 5-second submission card, then the whole video (20 seconds), high quality, a cut to the blue closing card, marked “Internal use only”.", the lifetime line and Save; `#audio-warnings` is empty; the status says only "Your video is ready."; the panel still lists "Duration 20 seconds". No warning heading appears anywhere on the finished page.
- **S-23w** (`cut-short-10s.webm`, a 10 s WebM cut at 90% of its bytes; Student submission, Cut, finished): the record "… then the whole video (5 seconds) …", the panel "Duration 5 seconds", `#audio-warnings` empty, status "Your video is ready.".
- **Not read anywhere on this Mac:** the cut WebM before Create (S-23w is a finished state), so whether its warning shows before Create is unread.

The check item's criterion that this breaks (`project/items/VH-222.md`): "Nothing false beside the cut-short warning. The source panel, the warning and the finished record read together on a cut MKV or WebM; a false statement is a defect." Its origin, the retired wish VH-158.1: "the source panel and the result record, which still give a cut file's read length as its whole, say nothing false beside it".

## What you may read

- The worktree, read-only: `src/`, `docs/01-specification.md` (§5.4, around `:310`–`:330`; the finished video's summary around `:637`), `project/` (items, `decisions.md`, `decisions-2026-10.md`, `backlog.md`, `wish-list.md`, `trajectory.md`, `profile.md`, `rules.md`, `digests/`), `UI-STANDARDS.md`, and the walker at `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/` (`scenarios.mjs` around `:385`–`:400` and `:3486`–`:3570`).
- Start from: `src/media/matroska-cut.ts`; `src/workers/job.worker.ts` (the pre-flight around `:539`–`:660`, the job around `:225`–`:360`); `src/audio/warnings.ts` (`detectSourceWarnings`, `detectProductionWarnings`); `src/ui/warning-text.ts`; `src/ui/result-summary.ts`; `src/ui/source-panel.ts` (`:135`); `src/main.ts` (`withdrawVerdict` near `:995`, the pre-flight render near `:1690`–`:1715`, the job's end near `:3165`–`:3210`, `renderResult` near `:3388`–`:3465`); `src/media/ends-early.ts`; `src/media/pipeline.ts` (near `:840`–`:895`); the strings `warnings.cutShort`, `warnings.finishedHeading`, `result.keptWhole`, `result.endedEarly` in `src/i18n/en-GB.ts`, `zh-Hans.ts`, `ms-MY.ts`, and their notes in `src/i18n/sheet.ts`.
- The decisions to read by heading: "2026-10-22 — VH-158 — A cut-short Matroska or WebM file is said from its own bytes" (`project/decisions-2026-10.md`); VH-139's and VH-215's entries; VH-208's (the finished video's warnings moved into its card). Item files `project/items/VH-215.md`, `VH-206.md`, `VH-222.md`, `VH-203.md`, `_schema.md`.
- The evidence, outside the worktree, read-only, in `/Users/uazjob/UoN-Video-Helper-side/`: `vh222-progress.md`, lines 156–162 only; `vh222-handover-4.md`, its "For the owner" section only; `vh222-walk/proof5.sum.txt`; the records `vh222-walk/proof5/runs/vh222-base-proof5-fix-2026-11-05T01-59-59-941Z-e590f4/S-23*.json` and the probe log `vh222-walk/proof5/runs/vh222-probe-vh222-base-proof5-fix.jsonl` (its S-23 lines; each has a `ctx` with `#source-report`, `#audio-warnings`, `#process-result`, `#status`).
- The owner's words, `/Users/uazjob/UoN-Video-Helper-side/plan8-owner-words.md`, lines 185, 275, 395, 437 and 438 only.

**Forbidden:** every folder under any `side-session-notes/` path; in `/Users/uazjob/UoN-Video-Helper-side/`, every file named `vh231-claude-*`, `vh231-*compare*`, `vh231-progress.md`, `vh231-handover-*`, and every `vh231-*brief*` but this one; every other file there not named above. Run nothing that writes, builds, walks or starts a browser.

## The owner's words that bind the design

- No new or changed user-facing string, in any language, is approved; existing strings in all three languages are preferred. A new element, control or checkbox is not approved. A `docs/` edit is not approved: if the remedy needs one, it is drafted as a wish line for the owner and the item stops.
- The remedy keeps VH-203's stage rule whole, as `project/items/VH-215.md` keeps it: before and after, walked on the build's base, at 1280, 375 and 320 px, in en-GB, zh-Hans and ms-MY, in light, dark, forced light and forced dark.
- Sized to one worker, about 45k of work.

## Points to judge, each answered

1. **What is false.** On a cut MKV and a cut WebM, before Create and on the finished page: is the panel's "Duration N seconds" false? The trim's "Keeping the whole video, N seconds."? The record's "the whole video (N seconds)"? The warning's absence from the finished page? Say which statements are false, misleading or true, and why, against the code's and the record's own stated rules.
2. **Where the warning is and is not** on the finished page, by element, and why, from the code.
3. **The remedy,** as criteria a builder can test: what changes, where (file and line), and what stays. Prefer existing strings; say for each string you use whether it stays true where it would be shown, in all three languages.
4. **Words and documents.** Does your remedy need any new or changed user-facing string, or a `docs/01-specification.md` line (spec §5.4's row at `:317`, its preamble at `:310`)? If yes, draft the words.
5. **Elements.** Does your remedy add an element, control or checkbox?
6. **What stays unchanged:** the truncated MP4's handling (VH-139, VH-215: the record's length made and the ended-early line), and the precedence of `cut-short` and `ends-early`. Does anything in the evidence say they should change?
7. **The route's cost and rules:** streaming, not buffering; any repeated read; where the fact is known and how it reaches the finished card; the retained result ("Keep it", "Previous video").
8. **Tests** that pin it in Node, and what only the walker can read.
9. **The walk:** which existing scenarios reach the panel, the warning or the record on a cut file, and whether the cut WebM before Create needs a new scenario. Name the controls for what stays unchanged.
10. **Re-reads after it lands:** which other checks' cells read what this changes.
11. **Size:** does the remedy fit one worker at about 45k, or does part of it belong in its own item?
12. Anything else wrong, missing or risky in this item as raised.

## Your answer

Numbered to match, under 1,500 words, plain Markdown. End with one line: `Design verdict: <one sentence>`.

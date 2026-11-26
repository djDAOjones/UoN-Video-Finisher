<!-- markdownlint-disable -->

# VH-231 #1 — Claude's design reading (saved before Codex's answer is opened)

Base `95d18eed5db1ae56d1fe6512053bad714357d899`, worktree `$S/vh231` on `side/vh231-plan`. Evidence: VH-222 #4's proof5 (`vh222-progress.md:156`–`:162`; `vh222-walk/proof5.sum.txt`, 6df9d1eb60c6b8a6; the six S-23 records under `proof5/runs/vh222-base-proof5-fix-2026-11-05T01-59-59-941Z-e590f4/`, sha1 first 16 b7666bbd, f9426e3e, df59be79, 25d66daf, d1be98c5, d5056c6e; the probe log `vh222-probe-vh222-base-proof5-fix.jsonl`, aa4cbd23aaaa5d63); hand-over 4's "For the owner". VH-222 #5's g1 sum: not in when this was written (only `g1.go.out` in `vh222-walk/`).

## 1. What the evidence reads (en-GB, light, 1280 and 320, each cell alike at both widths)

- **S-23, cut MKV, Staff, before Create:** `#source-report`'s closed "Video properties" lists "Duration 20 seconds"; the trim "Keeping the whole video, 20 seconds."; `#audio-warnings` "Worth knowing about the audio" → "The video file is shorter than expected" → its detail → the reassurance; `#status` "… Worth knowing about the audio: The video file is shorter than expected."
- **S-23s, that MKV, Submission, Cut, finished:** `#process-result` "Finished video — 9.2 MB", the record "Made from cut-short-30s.mkv: a 5-second submission card, then the whole video (20 seconds), high quality, a cut to the blue closing card, marked “Internal use only”.", lifetime, Save; `#audio-warnings` empty; `#preflight-report` empty; `#status` "Your video is ready."; the panel still "Duration 20 seconds".
- **S-23w, cut WebM, Submission, Cut, finished:** the same with "(5 seconds)" and "Duration 5 seconds".
- **Unread on this Mac:** the cut WebM before Create.

## 2. Where the warning is and is not on the finished page, and why

- **Before Create** it is the first item of `#audio-warnings` (rendered at `src/main.ts:1695`–`:1697` from `summary.audioWarnings`, built at `src/workers/job.worker.ts:543` and `:585`, `detectSourceWarnings`, `src/audio/warnings.ts:100`), and the status line speaks its heading (`main.ts:1699`–`:1704`).
- **On the finished page it is nowhere:** not in `#audio-warnings`, which `withdrawVerdict()` empties when the job ends (`main.ts:3173`, `:995`–`:997`; "the output warnings below take the sound notes' place"); not in the card's warnings list (`resultWarnings`, `main.ts:3419`–`:3420`, painted at `:3460` from `kept.warnings` = `reply.outputWarnings`, `:3187`), because the job's `outputWarnings` (`job.worker.ts:289`, `:357`) hold only `detectProductionWarnings`' heavy limiting and lost metadata (`warnings.ts:225`–`:236`; `pipeline.ts:880`–`:883`); not beside the record (`endedLine`, `main.ts:3448`–`:3452`), because `endedEarly` (`pipeline.ts:847`–`:851`) compares each track with its own index, and Mediabunny's Matroska index is only what it could read (`matroska-cut.ts:4`–`:7`), so nothing ends early; not in the status line (`main.ts:3200`–`:3207`).
- The code's own rule says otherwise: "The length made, never the length the file promised, and why beside it (VH-139): a file cut short is said here as well as before Create." (`main.ts:3443`–`:3444`). For an MP4 it is (the ended-early line); for a Matroska or WebM file it is not. That is the defect.

## 3. What is false, and what is not

- **The record's length is the length made** (20 s, 5 s), VH-139's rule; "the whole video" is the record's word for nothing trimmed (`result.keptWhole`, `result-summary.ts:68`–`:78`). Alone on the finished page, with the warning withdrawn, it states a cut file's read length as the whole recording with nothing beside it: misleading, and a person checking the page after Create is told nothing was lost. That is VH-158.1's case. The fix is the "why beside it", not a different length: the file declares no length the tool trusts alone (VH-158: Duration alone is not trusted, and the WebM's Duration, 10.008 s, is not its length).
- **The panel's "Duration N seconds"** (`src/ui/source-panel.ts:135`, `report.durationSeconds` from `computeDuration`) is the length the file holds, the trim's end and the length made: true, with the warning on the page.
- **The trim's "Keeping the whole video, N seconds."**: true before Create, with the warning beside it in the same step.

## 4. The remedy (criteria)

- **The finished video's card says a cut Matroska or WebM file is cut short:** `cut-short` first among the finished video's warnings, under "Worth knowing about the finished video" (`warnings.finishedHeading`), with the existing heading and detail (`warnings.cutShort`, all three languages), whatever the trim and the kind, as before Create; and spoken in the status line at the end, `warningsSpoken(finishedHeading, …)` (`main.ts:3206`), first among the titles. The retained result keeps it ("Keep it", "Previous video"), as `kept.warnings` already does for the others.
- **Route** (the build chooses and says why): (a) the job reads `matroskaCutShort(file, report.container, openInput(file))` again, VH-158's bounded read (1 KB at the start, a 4–32 MiB tail), and puts `cut-short` first in `outputWarnings` (`job.worker.ts:289`, or `detectProductionWarnings` taking it, `warnings.ts:225`), so the card, the status and the retained result read one list; or (b) the main thread carries the pre-flight's `cut-short` into the result, as `jobMadeSeconds` carries the length made (`main.ts:3373`). My lean: (a), the job's own reading of the file it made, never the withdrawn verdict; VH-82's repeated reads noted, the read bounded.
- **Words:** none new. Each string stays true where shown: the heading names the file; the detail's "Check the new video before you use it" is the advice after Create; "If you have a complete copy, choose that one instead" is a step still open after Create (choose another file). zh-Hans and ms-MY say the same. If the blind check judges "choose that one instead" untrue after Create, that is words: wish VH-231.1, a stop.
- **No element, control or checkbox:** the card's warnings list exists (VH-208) and already shows heavy limiting and lost metadata (S-136, "Both production warnings").
- **No `docs/` line needed:** spec §5.4's row (`docs/01-specification.md:317`) says "said first among the warnings", true in both places; the preamble (`:310`) stays true. Point to judge.
- **Unchanged:** the panel, the trim line, the record's text and length; the MP4's handling (VH-139's ended-early line, VH-215's card length and release guard, `job.worker.ts:274`–`:283`), since `matroskaCutShort` is false for any other container (`matroska-cut.ts:238`–`:239`); the precedence before Create (`cut-short`, then `ends-early`, `warnings.ts:100`–`:118`); the discard question's passage (`result-summary.ts:204`–`:213`), which names the video by its record. Point to judge: whether the passage needs the cut fact (it would need words: a heading has no full stop).
- **Tests:** `warnings.test.ts` (cut-short first among the finished warnings, whole files and MP4 none, the pre-flight order unchanged); `announce.test.ts` (the spoken line, heavy limiting's detail still last); `matroska-cut.test.ts` unchanged; the walker reads the page.

## 5. VH-203's stage rule, and the walk

- Before on the build's base, on this Mac: S-23, S-23s, S-23sn, S-23w, S-23wn, and **the cut WebM before Create** (S-23's state on `cut-short-10s.webm`; no scenario has it: a new ID, the orchestrator's at the build, in the driver's plan, qualified by VH-198's method in a proof); controls S-22 and S-64 (the MP4) and S-136 (the finished card's two existing warnings); at 1280, 375 and 320 px, en-GB, zh-Hans, ms-MY, four colour modes. The table `vh231-cut-whole-2026-11-DD.md`.
- WCAG 1.3.1, 1.4.10, 2.4.6, 3.3.1, 3.3.3, 4.1.3. Digest rules: nielsen, "status visible and announced", "errors say what next".

## 6. Re-reads after it lands

- VH-222: g1's S-23s and S-23w (and proof5's), whose finished cells gain the warning; S-23 unchanged. VH-220, VH-221, VH-223, VH-224: none (`grep` of their items and VH-220, VH-221, VH-223's progress notes: no S-23, cut-short or finished-warning cell; VH-223/224's 214 cells hold no S-23 family). VH-203's after-run reads the final page anyway.

## 7. Size

One worker, about 45k: one list item and its spoken title, two or three tests, one proof and two walks of about 324 cells a side.
- Saved 05:57Z, before Codex's answer was opened (S-91 corrected to S-136 before saving).

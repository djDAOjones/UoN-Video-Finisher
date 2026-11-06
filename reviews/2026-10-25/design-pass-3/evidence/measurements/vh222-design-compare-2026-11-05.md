<!-- markdownlint-disable -->

# VH-222 — the design compare (Claude's design against Codex astra's blind design check)

- Claude's reading `vh222-claude-design.md` saved 10:03:52Z, before Codex started (10:04:28Z, PID 63507). Codex's answer `vh222-codex-design.md` (8,470 bytes) written by 10:16:10Z, **opened 10:16:51Z**, after the count check. Compare written by VH-222 #1, 2026-11-04 ~10:20Z.
- Codex's verdict, verbatim: "design sound with changes: explicit row coverage, qualified missing routes, conditional evidence reuse, and a decision on the cut-file completeness claim."

## Agreed
- The rows come from the three wish lines' groups by VH-155's, VH-156's and VH-158's commits; 36 cells a row under the stage rule.
- Existing reach: S-18 (`soundHeading`, `veryQuiet.detail`), S-19, S-20, S-22, S-23 and S-23w/wn (cut MKV, cut WebM), S-24, S-25a/b (F13), S-27, S-62, S-64, S-79a/b, S-82, S-89 (F10), S-90b (F11, `failure.tryAgain`), S-91 (`metadataLost`), S-147 (F18).
- No existing fault reaches `failure.unlevellable.{what,next}`, `failure.output{Loudness,Peak}.what`, `failure.badTrim.next`; the audio-only failure needs a new scenario; `longJobUnknown`/`veryLongJobUnknown` are not reached by any scenario.
- VH-199's records are cited only where scenario, language, width, mode, branch and container match; the System check (VH-218/VH-230) and the finished card's warnings (VH-208) are excluded and walked.
- Timing-dependent groups serialised, load and power recorded, a pilot before the main groups.

## Codex only (adopted unless marked)
1. **41 rows, not 39:** adds `failure.unreadable.noTracks` and `failure.startup.workerNotStarted` (both in VH-155's/VH-156's commits; S-01b with F1 reaches the second). **Adopted:** a wider reading never reduces coverage. 1,476 row-cells.
2. **`noSourceDecode{Here,Elsewhere}` are reached by S-28** (`prores-1080p.mov`), Here on the desktop UA, Elsewhere by a phone UA at 375. Claude missed it. Adopted.
3. **`systemCheck.values.aacNotSupported`:** S-106 leaves the System check closed; it needs F17 with the check opened. Adopted: an in-memory **S-159** (S-106's setup, then the summary pressed).
4. **`warnings.targetMissed.heading` is unreachable:** `detectOutputWarning` (`src/audio/warnings.ts:202`) has no caller outside tests (Claude checked by `grep`). Claude's "no fixture" was wrong. The page cannot show this sentence: for #2 to decide, by the item's "only a sentence the page no longer has is retired, with its source", whether it retires (source: no production caller) or stays a wish line.
5. **`result.endedEarly`:** S-64 reaches `together` only; `picture`, `sound`, `both` need qualified cut fixtures or faults. **`decodeDamage.detail`:** English gives `one`, Chinese and Malay `other` by plural selection (`src/i18n/compile.ts:96`), so their `one` cells are inapplicable, not missing; English `other` needs a multi-burst fixture. **`longJobUnknown`** cannot follow the finite long-job band (`src/media/preflight.ts:123`): unreachable; `veryLongJobUnknown` needs a non-finite-estimate fault. **`noTracks`** needs a valid trackless fixture (`notvideo.mp4` gives another failure).
6. **The cut-short truth:** by the code, a cut Matroska file can drop a partial cluster with no index shortfall, so the finished record can say "the whole video" at the shortened length with no ended-early line, and the source panel labels the read extent as the duration. Codex judges the completeness claim misleading, a defect decision. **Adopted as the walk's first question,** read on S-23 and S-23s (MKV) and S-23w (WebM): if the page says it, it is a defect and a fix item before VH-203 (rule: VH-158.1, "a false statement beside the warning … is a defect").
7. The reading contract: resolved text with substitutions and plural branch, the actual text, container, line bounds, clipping, the state's evidence and live-region exposure (not claimed speech); 4.1.3 judged on the status transition, 3.3.1 separating input errors from operational failures. Claude's probe has all but the plural branch and substitutions: #2 adds them.

## Claude only
- The phone-UA cell for `noAacEncodeElsewhere` (**S-157**, 375 only, S-26a's `asPhone`).
- The citing reader (`vh222-walk/vh222-cite.mjs`): 88 VH-199 records of S-18, S-19, S-20, S-22, S-24, S-25a, S-25b, S-27, S-89, every found row read, none clipped.
- The audio-only fixture made by ffmpeg (`fix/audio-only-30s.mp4`, **S-158**); Codex names the repository's `pcmMp4` test helper instead. The proof decides which the page reads as "audio only".

## Disagreed, and how each is settled
1. **`noAacEncode{Here,Elsewhere}`:** Claude, F17 with a file chosen (S-156, S-157); Codex, F17 changes only the page's encoder check, so the refusal needs a worker AAC fault. **Settled by the proof walk:** if S-156 does not reach `noAacEncodeHere`, a new worker fault (F22) is the criteria's route.
2. **Rows that need new fault code:** Claude, wish lines naming why; Codex, build and qualify them, since "needs new code" is no ground for deferral. **Settled for Codex by the item's own criterion** ("where none reaches a row, a new one, named and qualified by VH-198's method; the owner's 'yes to … A and B' covers it"); the item's size is a hand-back line, not a reason to defer. Only rows the page cannot reach (`targetMissed`, `longJobUnknown`, the inapplicable plural cells) become wish lines or retire. The IDs allotted are S-156–S-159 and F22–F25: S-156–S-159 are now taken (S-156, S-157, S-158 and S-159 above), so any further scenario or a fifth fault needs the orchestrator's word: **a point for the orchestrator**.

## Outcome, by VH-222 #2 (2026-11-04, the orchestrator's word; S-160 to S-168 and F22 to F28 allotted)
Which ID reaches which row (in memory, `vh222-walk/vh222-driver.mjs`; walker revision unchanged). **Proved on the base:** none of the new IDs yet. The first proof run (10:30Z) read false on every in-memory state by an instrument error since repaired (the walker's `M` wrap); its probes showed S-156's, S-157's, S-158's, S-159's and S-160's rows on the page, and S-156:f17only's control at "Ready to go" (disagreement 1 settled for Codex: F17 alone does not refuse).
- `preflight.reasons.noAacEncodeHere`: **S-156** (F17 + **F22**, F17's answer in the worker); control `S-156:f17only`. `noAacEncodeElsewhere`: **S-157** (the same as a phone, 375).
- `noSourceDecodeHere`: S-28. `noSourceDecodeElsewhere`: **S-160** (S-28's file as a phone, 375).
- `failure.unreadable.soundOnly`: **S-158**. `failure.unreadable.noTracks`: **S-166** (`fix/notracks-text.mp4`, one text track).
- `systemCheck.rows.aac`, `systemCheck.values.aacNotSupported`: **S-159** (S-106's F17, the check opened).
- `result.endedEarly.picture`: **S-161** (**F23**, picture to 20 s); `.sound`: **S-161:sound** (sound to 20 s); `.both`: **S-161:both** (15 s, 22 s); `.together`: S-64.
- `failure.unlevellable.{what,next}`: **S-162** (**F24**). `failure.outputLoudness.what`: **S-163** (**F25**); `failure.outputPeak.what`: **S-163:peak**. `failure.badTrim.next`: **S-164** (**F26**). `preflight.reasons.veryLongJobUnknown`: **S-165** (F13 + **F27**).
- `warnings.decodeDamage.detail.other` in en-GB: **S-167** (`fix/burst2-float-30s.mov`); in zh-Hans and ms-MY by S-27 (plural `other` only); their `one` cells "not applicable, plural has only `other`".
- `warnings.targetMissed.heading`: **retired**, by VH-50's decision of 2026-08-26 and 12f4dd4 (the worker's only call removed; a miss is the failure `failure.outputLoudness`, the reading that stands in its place). `preflight.reasons.longJobUnknown`: a wish line (the long-job band is always finite, `src/media/preflight.ts:126`).
- Unused: S-168, F28.

## Proved, by VH-222 #3 (2026-11-04, proof2 12:33Z to proof4 13:37Z)
Every new ID reached its row on the base in both layouts (S-157 and S-160 at 375 only), the control `S-156:f17only` not reached. **Changed from the Outcome above:** `result.endedEarly.{picture,sound,both}` are reached by three cut fixtures (`vh222-walk/vh222-cut-tracks.mjs` from `lecture-30s.mp4`: picture to 20 s; sound to 20 s; picture 15 s and sound 22 s), not F23, which hung the job (proof2) and is unused. Two driver errors repaired before the groups: a variant's own state wrapped with `M`, and the probe's plural branch.

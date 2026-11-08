<!-- markdownlint-disable -->
# VH-203 — Pass 3's after-run, the differential: the base revision against the run revision on the same build, on the Mac Pro (2026-11-08)

VH-203's stage-rule measure, one page by `table-bundle.mjs`: `table-1page.mjs`'s reading unchanged, each record named by its group and run, none overwritten. The records are in [`vh203-differential-records-2026-11-08/`](vh203-differential-records-2026-11-08/): each cell's outcomes and rows, the probes and their results, states and logs whole, and in `detail/` the whole record of each moved or named failing cell. Each record's sha1 is its line in `sources.txt`.

## Provenance

| | Before | After |
| --- | --- | --- |
| Commit | `756b425d333f` | `756b425d333f` |
| Diff hash | `da39a3ee5e6b4b0d` (0 lines of status) | `9a6d71b58eeae384` (9 lines of status) |
| Instrument revision | `29c3acfcad7eb29c` | `b88e80721720ae15` |

**Differs between groups:** diff hash: da39a3ee5e6b4b0d, 9a6d71b58eeae384, b28b608c84617b04.

**Differs between groups:** revision: 29c3acfcad7eb29c, b88e80721720ae15, 7db38f355f3c46c2.

- `rb-other.outcomes.jsonl` sha1 `7adecb858052093712b61713e8007f14ed9c4497`
- `vh203-run-rev.txt` sha1 `4351fc8fddf3090efabf991d499ece2d0a500727`
- `other-outcomes.mjs.txt` sha1 `4907c197f286f41c872e1d948ceff899ac0b874a`
- `whole-records.mjs.txt` sha1 `42e23673b037d4c3f5f60e582f8ac34f90f8b131`

## Runs, power and load

| Group | UTC | Cells, reached | Power | Load median, peak | Samples at 8 or above |
| --- | --- | --- | --- | --- | --- |
| rev-before-rb1 | 13:26:41–14:19:55 | 243, 240 | AC Power, mode ? | 3.83, 6.61 | 0 of 107 |
| pair-rb1 | 02:17:56–03:19:58 | 243, 243 | AC Power, mode ? | 4.61, 8.2 | 2 of 124 |
| rev-before-rb2 | 14:20:50–14:41:55 | 121, 48 | AC Power, mode ? | 3.55, 5.91 | 0 of 43 |
| pair-rb2 | 03:27:47–03:55:47 | 121, 72 | AC Power, mode ? | 4.17, 6.25 | 0 of 56 |
| rev-before-rb3 | 14:43:06–15:24:05 | 172, 131 | AC Power, mode ? | 3.13, 4.91 | 0 of 82 |
| pair-rb3 | 04:14:57–05:22:00 | 172, 167 | AC Power, mode ? | 3.84, 8.26 | 3 of 134 |
| rev-before-rb4 | 15:24:42–23:37:06 | 51, 51 | AC Power, mode ? | 2.66, 5.73 | 0 of 982 |
| pair-rb4 | 05:54:53–06:12:44 | 61, 61 | AC Power, mode ? | 4.29, 5.32 | 0 of 36 |
| rev-before-rb4r6 | 00:42:11–00:44:12 | 4, 4 | AC Power, mode ? | 4.8, 5.65 | 0 of 5 |
| pair-rb1-rw | 03:23:38–03:27:24 | 2, 2 | AC Power, mode ? | 3.57, 4.77 | 0 of 8 |
| pair-rb2-split | 07:09:55–07:24:02 | 48, 48 | AC Power, mode ? | 4.31, 6.31 | 0 of 29 |
| pair-rb3-rw | 05:24:41–05:31:07 | 1, 0 | AC Power, mode ? | 3.03, 5.57 | 0 of 13 |
| pair-w5 | 06:30:31–07:09:27 | 115, 112 | AC Power, mode ? | 3.28, 5.7 | 0 of 78 |
| pair-w5-split | 07:24:21–07:25:48 | 3, 3 | AC Power, mode ? | 5.25, 5.32 | 0 of 3 |
| rev-before-rb4r1 (set aside) | 23:49:46–23:59:53 | probe | AC Power, mode ? | 3.55, 5.45 | 0 of 21 |
| rev-before-rb4r2 (set aside) | 00:00:23–00:10:30 | probe | AC Power, mode ? | 3.4, 3.91 | 0 of 21 |
| rev-before-rb4r3 (set aside) | 00:10:50–00:20:57 | probe | AC Power, mode ? | 3.48, 5.02 | 0 of 21 |
| rev-before-rb4r4 (set aside) | 00:21:16–00:31:23 | probe | AC Power, mode ? | 3.15, 4.35 | 0 of 21 |
| rev-before-rb4r5 (set aside) | 00:31:43–00:41:50 | probe | AC Power, mode ? | 3.66, 4.16 | 0 of 21 |

## Before → after

Scenario cells: 1784 before (1360 reached), 1057 after (993 reached); **422 unmoved**. Not on the other side: 297 after-only, 1024 before-only.

| What moved | Cells |
| --- | --- |
| overflow: undefined → pass | 121; across cells |
| ax: undefined → pass | 121; across cells |
| contrastText: undefined → pass | 121; across cells |
| footer: undefined → pass | 121; across cells |
| videoLanguage: undefined → pass | 121; across cells |
| reached: failed/fail → ok/pass | 115; across cells |
| focus: undefined → pass | 110; across cells |
| player: undefined → not-applicable | 93; across cells |
| limiting: undefined → not-applicable | 93; across cells |
| measure: undefined → pass | 90; across cells |
| contrastExtra: undefined → cannot-determine | 78; across cells |
| formatTip: undefined → pass | 70; across cells |
| focus: cannot-determine → pass | 66; across cells |
| targets: undefined → pass | 65; across cells |
| type: undefined → fail | 65; across cells |
| targets: undefined → cannot-determine | 56; across cells |
| type: undefined → pass | 56; across cells |
| player: fail → pass | 52; across cells |
| formatTip: undefined → not-applicable | 51; across cells |
| contrastExtra: undefined → pass | 43; across cells |
| row "the hint word for word": undefined → pass | 39; S-141 |
| row "the "?" 44 x 44 after its promise's text; the tip under it, in the ite": undefined → pass | 39; S-141 |
| row "said by its polite region": undefined → pass | 39; S-141 |
| row ""About the video format" 44 x 44, collapsed, controlling #format-help": fail → undefined | 36; S-03 |
| row "Tab from the top: skip link, Page language, (the notice's link), About": fail → undefined | 36; S-03 |
| row ""About the video format" 44 x 44, collapsed, controlling #format-help ": undefined → pass | 36; S-03 |
| row "Tab from the top: skip link, Page language, (the notice's link), the t": undefined → pass | 36; S-03 |
| measure: undefined → cannot-determine | 31; across cells |
| row "never both open; each closes the other; Escape closes only the open on": undefined → pass | 31; S-143 |
| formatTip: not-applicable → pass | 31; S-142 |
| row "Tab: closed, focus on Video type's checked radio": fail → undefined | 31; S-142 |
| row "Escape: closed, focus on the "?"": fail → pass | 31; S-142 |
| row "a click on its text keeps it open; a click on the page title closes it": fail → pass | 31; S-142 |
| row "Tab: closed, focus on Choose file, the next stop after the title's pan": undefined → pass | 31; S-142 |
| row "Shift+Tab: closed, focus on the title's "?", the stop before its panel": undefined → pass | 31; S-142 |
| limiting: undefined → pass | 28; across cells |
| type: pass → fail | 28; S-142 |
| player: undefined → pass | 25; across cells |
| row "it plays: currentTime advancing about 0.76 s in 0.8 s": undefined → pass | 22; S-128 |
| row "renamed in the new language, the same element, playing on": undefined → pass | 22; S-128 |
| row "the question takes it off the page, paused": undefined → pass | 22; S-128 |
| row "Keep it puts back the same element and URL": undefined → pass | 22; S-128 |
| row "start handle 0, 10, 20, 10, 11, 127, 127, 0, 0": undefined → pass | 19; S-92 |
| row "end handle 130, 120, 130, 3, 3, 130": undefined → pass | 19; S-92 |
| row "each value said in words; focus stays on the handle": undefined → pass | 19; S-92 |
| row "the first press withdraws the verdict and offers Stop at once": undefined → pass | 19; S-92 |
| row "one check after the keys settle": undefined → pass | 19; S-92 |
| row "focus on the card": fail → pass | 18; S-59, light |
| row "Shift+Tab: closed, focus on Page language's radio in English, the noti": fail → undefined | 18; S-142 |
| focus: fail → pass | 17; across cells |
| row "Shift+Tab: closed, focus on Page language's radio in English, the noti": pass → undefined | 13; S-142 |
| row "one check after the keys settle": fail → pass | 12; S-92 |
| focus: undefined → cannot-determine | 11; S-92 |
| focus: pass → fail | 9; S-81 |
| reached: failed/undefined → ok/pass | 6; S-55c, w1280, fallback |
| row "Create reads "Create the video again" (VH-190)": undefined → pass | 6; S-55c, w1280, fallback |
| row "the record's output in its short form, without the purpose (VH-188)": undefined → pass | 6; S-55c, w1280, fallback |
| row "the card holds its player (VH-192)": undefined → pass | 6; S-55c, w1280, fallback |
| reached: ok/pass → failed/undefined | 5; S-93, light |
| overflow: pass → undefined | 5; S-93, light |
| ax: pass → undefined | 5; S-93, light |
| targets: cannot-determine → undefined | 5; S-93, light |
| contrastText: pass → undefined | 5; S-93, light |
| contrastExtra: cannot-determine → undefined | 5; S-93, light |
| type: pass → undefined | 5; S-93, light |
| focus: cannot-determine → undefined | 5; S-93, light |
| player: not-applicable → undefined | 5; S-93, light |
| formatTip: not-applicable → undefined | 5; S-93, light |
| footer: pass → undefined | 5; S-93, light |
| limiting: not-applicable → undefined | 5; S-93, light |
| videoLanguage: pass → undefined | 5; S-93, light |
| row "start handle 0, 36, 72, 36, 37, 3597, 3597, 0, 0": pass → undefined | 5; S-93, light |
| row "end handle 3600, 3564, 3600, 3, 3, 3600": pass → undefined | 5; S-93, light |
| row "the words in English: 36 seconds, 1 minute 12 seconds, 59 minutes 57 s": not-applicable → undefined | 5; S-93, light |
| row "the first press withdraws the verdict and offers Stop at once": pass → undefined | 5; S-93, light |
| row "exactly one check after the last press": fail → undefined | 5; S-93, light |
| motion: undefined → pass | S-141__en-GB__w1280__reduced-motion, S-128__en-GB__w1280__reduced-motion, S-143__en-GB__w1280__reduced-motion, S-92__en-GB__w1280__reduced-motion |
| measure: pass → undefined | S-93__ms-MY__w1280__light, S-93__ms-MY__w320__light, S-93__zh-Hans__w320__light, S-93__ms-MY__w1280__light |
| row "with F2: still pending, the note shown above the starting line": undefined → pass | S-107__en-GB__w1280__fallback, S-107__ms-MY__w1280__fallback, S-107__zh-Hans__w1280__fallback |
| row "a check settling after a file is chosen": undefined → not-counted | S-107__en-GB__w1280__fallback, S-107__ms-MY__w1280__fallback, S-107__zh-Hans__w1280__fallback |
| player: undefined → fail | S-128__en-GB__w1280__font32, S-128__ms-MY__w1280__font32, S-128__zh-Hans__w1280__font32 |
| focus: fail → cannot-determine | S-15__en-GB__w1280__font32, S-15__ms-MY__w1280__font32, S-15__zh-Hans__w1280__font32 |
| row "nothing off the page with the tip open": undefined → pass | S-144__en-GB__w320__light |
| row "exactly one check after the last press": fail → pass | S-93__en-GB__w1280__light |
| measure: cannot-determine → undefined | S-93__zh-Hans__w1280__light |

Failing alike on both sides, so not moved by this change:

| Instrument or row | Cells |
| --- | --- |
| player | 12 |

## Notes

- **The differential,** a true before and after on one machine and one build. The base revision is `29c3acfcad7eb29c` (`rev-before-rb1` to `rb4`, and `rb4r6`). The after is the run revision, for the keys each W change moves (`pair-rb1` to `rb4`, with their re-walks and splits, and `pair-w5`). Each move is tied to its W change in the run's notes and in `vh203-claude-verdict.md` §4.
- **Revisions on the after side:** `pair-rb1` to `pair-rb3` were walked before W5's correction. Their finish+1s rows stand at `pair-w5` and `pair-w5-split`, which were walked at `7db38f355f3c46c2` after the proofs (proofs-6) showed no row moved outside finish+1s.
- **Re-walks and splits count twice:** each `-rw` or `-split` pair lists the before's other keys as "before-only". Its own keys are the standing after.
- **rb4r1 to rb4r5:** S-133's five keys hung at the save's result click at the base revision. The outer bound stopped each at 600 s, so they hold 0 records. They are not reached at the base.
- **One machine:** every record on this page is the owner's Mac Pro's, walked by VH-203's workers between 2026-11-06 and 2026-11-08, AC power throughout. Each group started below load 8 on both loads; samples at 8 or above are counted in the runs table, and the re-walks are named.
- **The run revision:** the walker at `7db38f355f3c46c2` (W1 to W20, proved before the first after-run group; `vh203-run-rev.txt` sha1 4351fc8f), in the side worktree at `756b425`, its nine walker files changed (diff hash `b28b608c84617b04`). The keys went to `matrix.mjs --keys <file>` unchanged, by a driver on a plan in memory.
- **The befores, by the plan** (`vh203-claude-plan.md` §2; the owner's "Yes, all three", item 3): VH-199's MacBook Pro records (`matrix-2026-10-27.md`), cited and never paired here; and on this Mac, D1's before at `a3039c3` for every core key not passing after (`vh203-d1-2026-11-08.md`).
- **Splits and re-walks win by key:** a `-split` group re-walks, one run a key, the non-first-of-setup records that lost their state inside the worker's ping; a `-rw` group re-walks the records near a load sample at 8 or above. Such a key's standing record is the split's or re-walk's. The page counts both.
- **Records the script does not read:** `table-1page.mjs` reads only records named `S-<number>`. The identity scenarios (S-ID1 to S-ID3), the journeys (J1 to J4) and the keys records (K-…) are in `*-other.outcomes.jsonl` (by `other-outcomes.mjs`), in the script's own row form. The transitions (T-…) are bundled whole in `*t-records.jsonl` (by `whole-records.mjs`).

<!-- markdownlint-disable -->

# VH-223 #4 — the verdict compare, the Mac Pro's walk

Claude's verdict `vh223-claude-verdict-mp.md` (f73d9cbf) was saved 06:10Z, before Codex's run started. Codex's blind answer `vh223-codex-blind2.md` (e9f0c6ce; brief `vh223-codex-blind2-brief.md` 16938f33, run 06:10:54–06:15:28Z from `$W`) was opened after the true count at about 06:25Z. Both verdicts are **pass with conditions**.

## Agreed
- **The walker change:** only `matrix.mjs` changes; it adds the exact key list and refuses what it should; `proof-keys.out.txt` qualifies it; VH-224 passes its 106 keys by `matrix --keys <file>`, with no second filter.
- **The keys:** exactly 108 (42 + 24 + 24 + 6 + 6 + 6), each walked once in a1–a7 (15, 27, 15, 15, 15, 15, 6), in its own language, view and mode.
- **The attributions:**
  - S-03 ×4: the old-order rows, VH-216.1.
  - S-81 ms-MY ×5: the known wrapped-link reading, 1,360–1,362 of 1,571, VH-200.1 and VH-210.2.
  - S-24 ×15: not reached because of this Mac's speed (veryLongJob, about 1 h 5 min), environment, #40's ruling, not S-169.
- **The cannot-determine classes** are the documented ones: contrastExtra (78 keys, 156 rows), targets (36 keys), measure (23 keys).
- **No new product defect** and no fix item.
- **WCAG:** 1.4.4, 1.4.12 and 2.3.3 are not reached in batch A (batch B's).
- **Conditions:** every group ran on AC Power, with both loads below 8 at its start and no void. a5 had 8 of 120 samples at 8 or above, a6 had 2 of 51, and the other groups had none.
- **a5 is re-walked whole.**
- **For the close:** a wish line for S-24's 15 keys; VH-172.1 left for VH-224; the existing wishes not duplicated; the Disposition row; each before reads "no previous after-reading", with VH-176's linked; no "108 passed".

## Codex only, accepted
1. **Provenance:** `95d18ee` also differs from `ca093da0` in `.gitignore` (+2 lines, `git diff --stat`). It is no app file, and the table says so.
2. **The table separates the counts:** 108 attempted, 93 reached and 89 structurally whole, with S-03's four keys lacking `formatTip`'s ten declared subjects. a1's manifest reads `coverage.whole: false`. The cause is VH-229's closed panel, the page order VH-216.1 holds: "the format "?" is in the panel". Claude's verdict named the not-applicable reading but not the coverage gap.
3. **The player row** ("paused a second after the card appeared") passes nominally in 20 cells. It is VH-199.1's instrument, as the brief settles ("that is the instrument"), and no claim rests on it. The table says so.
4. **No blanket pass:** each cannot-determine row stays a documented reading or a person check, never a measured pass.

## Codex only, settled by the evidence
5. **The labels.** Codex counts 6 OK, 4 NOT-OK, 83 unresolved and 15 not reached, by "evidence completeness". Claude counts 84 OK, 9 NOT-OK, 0 unresolved and 15 not reached. The design compare's three-way rule, agreed with Codex's design check, labels a key OK when every cannot-determine row is a documented reading, and unresolved only when no documented reading settles it. Codex attributes each of its 83 to a documented or known reading ("not 87 product failures"). Claude's labels stand. The table shows Codex's distinction row by row (point 4).
6. **The pilot's count.** Codex counts 20 IDs proved, with S-81 in and S-03 out; Claude counts 19 fixture-reading IDs. By `fixturesFor`, S-03 and S-81 read no fixture, so they have nothing to prove on one. The substance agrees: every fixture-reading ID is proved but S-24, which is not reached because of this Mac's speed.

## Disagreed: S-66 ×3, re-walked or standing
Codex would re-walk all 15 of a6 (30 in all). Claude follows the MacBook Pro's accepted plan: rewalk-a6t's 12, with S-66 standing as a settled state read as text and geometry (#38's ruling). #40 has named rewalk-a6t. The evidence on this Mac settles it: a6's two samples at 8 or above (05:44:09 and 05:44:39Z) fall inside S-65 ms-MY's record (05:43:10–05:44:52Z). S-66's three records were walked from 05:44:52 to 05:49:45Z, with every sample below 8. So S-66's readings stand on low load whatever its timing. It is held unless #40 rules otherwise.

## Needs #40's word (new IDs)
- **VH-223.1:** S-24's 15 batch A keys, not reached on the Mac Pro because of its speed (still-10800s reads veryLongJob, about 1 h 5 min, against S-24's 20–60 min band), with nothing changed; their after-reading is still owed on a faster device or a band-sized fixture. Agreed by both.
- **VH-223.2 (Codex's ask):** the trim thumbs' and track's non-text contrast (1.4.11). `judged-2026-10-27.md:502` says "a person reads them". `grep` finds no wish, backlog or person-checklist line holding that person's reading (VH-138.4 holds only the thumbs' focus ring). The targets disc is VH-173's reading, which settles it.
- **Not new:** S-03's formatTip gap is held by VH-216.1, so it gets no new line.

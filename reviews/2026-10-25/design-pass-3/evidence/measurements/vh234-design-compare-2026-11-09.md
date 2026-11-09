<!-- markdownlint-disable -->

# VH-234 #1 — design compare (Claude's design vs Codex astra's blind `design`)

Claude's design `vh234-claude-design.md` (5ea2187d) was saved at 2026-11-09 00:16:29Z. Codex's brief `vh234-codex-design-brief.md` (46312a0e) was run from `$W` by `cd`, and its answer `vh234-codex-design.md` (1,156 words) was opened at 00:2xZ, after that save.

## Agreed
- **The remedy:** delete `line-height: var(--line-height-heading)` from `.promise-with-help .help-button` (`app.css:1198`). The compact emphasis role's one rule then gives 14/21/600, or 28/42/600 at 32 px. Naming `--line-height-body` there was rejected by both, as a second source of the role (VH-166, UI-STANDARDS Type roles).
- **VH-205's reason** is not recorded. Both infer the line box was tightened to fit the 20 px square (17.5 px in 18), and that it is not necessary to it.
- **What is unchanged by construction:** the square, the target, the gap, the fill, the tip, and the other two "?". Proved by measurement, not inferred.
- **The walker's `type`** matches computed family, rem size, weight and line-height ratio, with tolerances 0.01 and 0.02, and skips the line height under spacing. The 9 spacing cells pass both sides.
- **The test:** in the VH-205 describe, the scoped rule has no `line-height`, and `roleOf('.help-button')` has `--line-height-body`. The "one type set" test stays unchanged.
- **Route (1)** is Part C's script frozen, except paths and labels. All 195 pairs are compared, with no dependency.
- **Route (2)** uses overlapping viewport tiles with labels, re-reads the state after every scroll, and repositions the pointer for hovered shots. A tile where the "?" is out of view is labelled truthfully, never as hovered. It covers the 52 states plus every state the compare finds moved.
- **Stops:** a word, an element, a new token or a literal.

## Codex only — adopted
- **The 102 keys' partition:** as VH-203 walked them. Its 38 split keys are walked one driver run per key (a3g2-split 19 S-143, a3g4-split 19 S-141). Its 64 grouped keys are walked by one driver run per VH-203 group: a3g2 12 S-143, a3g4 20 S-141 and 1 S-144, a3g9 31 S-142. Claude had all 102 one per key. Built as `side-job.zsh`, the same both sides. A grouped record that loses its state is re-walked per key, as VH-203 did, and the table says so.
- **Clip origins and sizes** (`clip` in `format-help.jsonl`) are compared beside the pixels. A clip's height is the promise's actual box ±24 px, so it measures the row as laid out, not only the span.
- Side-by-side and difference images for any moved pair.
- A 64 px tile overlap (Claude had 48).
- The test also forbids a `font` shorthand in the scoped rule.
- 1.4.3/1.4.6, glyph on fill, read from Part C's `contrast` both sides.
- The item's wording: "all 102 keys reached and compared"; 24 px is the unwrapped line at the default root; unexplained regressions block.

## Claude only — kept
- **The image compare:** a Node PNG reader on `node:zlib` (`png-compare.mjs`), not a canvas in Chrome. It needs no browser and no lock, and it was tested on Part C's images: rest against hovered moved 308 px in an 18 × 18 box, and identical files read as the same bytes. Codex's requirement, no dependency and RGBA with bounds and counts, is met.
- **S-143's fixture,** `lecture-60s.mp4`, was regenerated on this Mac by `fixtures.sh` line 13. Its sha1 `f9b2439a` equals VH-203's.

## Disagreed
- None the evidence cannot settle.

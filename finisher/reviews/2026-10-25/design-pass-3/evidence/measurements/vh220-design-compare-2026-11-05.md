<!-- markdownlint-disable -->

# VH-220 — the design compare

Claude's design reading saved 2026-11-04T10:00:55Z (`vh220-claude-design.md`). Codex astra's blind brief saved 10:01:14Z; its answer written 10:08:35Z and opened by Claude at 10:08:48Z, after Claude's was saved.

## Agreed

- **A watchdog failure: S-90b with F11,** the settled state R2-1 names; S-90a is transient (about 10 s) and outside the 144. Both: 3 conditions cited, 21 walked.
- **An unreadable file beside an unsaved result: S-30.** Both: 6 cited, 18 walked.
- **The storage re-check: no new fault.** F3 rewrites the worker's `navigator.storage.estimate` on every call; a re-check meets the same 5 MB quota. What no record has is Check again let finish (the keyboard route stops it at once). Both: an in-memory variant of S-31 in the driver, walker files unchanged, the item's "needs a new fault" premise corrected explicitly, no fault manufactured. Both: 0 cited, 24 walked; no "Video read." between the press and the block.
- **Both Set buttons: the preview's error handler** (`src/main.ts:2090–2099`), one variant per button with F7 in place; all 24 conditions walked for the hand-over, two records each.
- **No product diff;** a defect becomes its own fix item.
- **The readings:** whole strings, focus as the transition left it, the live lines without a stale or repeated message; WCAG 1.4.10, 2.4.3, 3.3.1 and 4.1.3; nielsen's "status visible and announced" and "errors say what next".

## Codex only

- **Transition readings before the instruments move focus.** Taken: the variants' setups now record focus, the Set buttons, the preview note and Check again once the action settles, before matrix.mjs sets a mode or runs an instrument (`matrix.mjs:203–228`). The state checks that the action ran; it does not require focus, so a wrong hand-over is a reading, not an unreached cell.
- **Apply each colour mode before capturing a transition.** Not taken, settled by source: `src/main.ts` has no `matchMedia` or forced-colours branch (its one `matchMedia` mention is a comment about the worker), so focus hand-over and live-line writes are the same in every mode. They are read once per language and view, in setup; the colour modes are read settled, per cell.
- **A second job's reset captured before its first stage.** Not taken as a transition: the probe reads the second job's bar value, label, text and time left as it runs; a value below the first job's 100 % and its own stage words answer R2-2's "no job shows another job's percentage or words". The table says the reset instant is not captured.
- **S-32's six light snapshots reused for the rendering.** Taken in the table: cited for the preview-unavailable rendering; the hand-over is still walked in all 24.
- **1.4.10 at 375 px is not 320 px reflow.** Taken: the table claims 375 px only.
- **F7 is a synthetic error event,** not a real decoder refusal. Taken: the table says so.

## Claude only

- **The `--uncited` plan,** computed in the driver from PLANS and the coverage account, and the 168 records it makes (153 walked).

## Disagreed

- **A second job: S-115 (Claude) or S-60 (Codex).** Both are a second job after a first finished; S-115 saves first and presses Create again, the common path; S-60 discards. Each has 3 cited. Kept: S-115; S-60 named in the table as the other route. Codex says S-115 declares no 375 px view; the driver sets the viewport itself (as VH-225's did), and VH-199 read 375 px cells, so the view is reachable.
- **A kept result with warnings: S-138 (Claude) or S-91 (Codex).** S-91 (F6a + F16) holds the closing fallback line and one warning, with a nesting assert; S-138 (F16 + F4d) holds both warnings on a result kept by "Keep it". VH-150's words are "a kept result with warnings": kept S-138, the plural and the literal "Keep it"; the probe reads nested notifications in every cell. S-91's 6 cited cells are named in the table as the other route's evidence.

Neither disagreement needs the owner: the evidence settles each, and each other route is named.

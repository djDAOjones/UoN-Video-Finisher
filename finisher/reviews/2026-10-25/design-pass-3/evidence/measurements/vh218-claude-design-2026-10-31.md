<!-- markdownlint-disable -->

# VH-218 #1 — Claude's design reading (saved before Codex's answer is opened)

## The change: CSS only, `src/styles/app.css`, after the `.check .value` rule

The row is three sibling spans (mark, label, value). A grid cannot move the value beneath only when the content will not fit, and a wrapper would change the DOM. So the System check's rows become a wrapping flex line:

```css
.system-check .check { display: flex; flex-wrap: wrap; row-gap: 0; column-gap: var(--spacing-04); padding-inline-start: calc(var(--mark-width) + var(--spacing-04)); }
.system-check .check .mark { flex: none; width: var(--mark-width); margin-inline-start: calc(-1 * (var(--mark-width) + var(--spacing-04))); }
.system-check .check .mark + span { flex: 1 1 auto; max-width: 100%; }
.system-check .check .value { text-align: start; }
```

- **Why it works.** The mark hangs in the padding: its outer size plus the gap cancels, so it costs the line nothing but keeps `align-items: baseline` (the mark is .875 rem and the label 1 rem, so `position: absolute` would lose the baseline). The label's hypothetical size is its max-content capped at the row, so it never wraps away from its mark. Label plus value fit on one line: the value stays at the row's end, because the label grows. They do not: the value wraps to a line of its own, starting beneath the label, and left-aligned, since a long value ("Not supported — a video with audio cannot be made here") must not read right-ragged. On one line its box is max-content, so `text-align` changes nothing there.
- **The row "holds both" means one line for each.** A label that would need two lines beside a value now takes the row and puts the value beneath. That moves rows at 375 px too, on purpose: criterion one says every row.
- **Words.** `overflow-wrap: anywhere` stays inherited from `li` (`:40`, VH-165). It reduced the label's min-content, which is how the auto column starved it; with the column gone, it is only the last resort for a word wider than the column. So: nothing runs past the window, and a word wider than the column at 32 px on 320 px is broken and reported by name and width.
- **Scoped to `.system-check`.** `.check` has a second caller, `src/acceptance/main.ts:35`, with long labels and an empty value. Scoping leaves it exact, since a change to another caller is a stop. The base grid stays for that page.
- **No token, literal, element, string, or order change.** Tab and heading order untouched: spans only. Forced colours: no rule touched. S-103's row is `.facts`, untouched: it should read unmoved. UI-STANDARDS names no check-row rule (by `grep`): no edit.

## The walker change: one, in `MX_INIT` (`walker/scenarios.mjs`)

An init script wraps the `Intl.NumberFormat.prototype.format` getter: for `unit === 'millisecond'` the bound format formats 101, the defect's own value, through the real formatter and locale. `src/main.ts:1316` is the only millisecond unit in `src/` (by `grep`). The app's code and its strings run unchanged. Proof: one small group on clean base at the old revision, before the edit, and one at the new revision; only the worker row's value may differ.

## The walks: 540 cells a side, in memory by a driver, `matrix.mjs` unchanged

S-82 pending, passed, warned, failed and S-103; w1280, w375, w320; en-GB, zh-Hans, ms-MY; {light, dark, forced-light, forced-dark} x {default, font32, spacing}. One plan, one group, per state.
- **Passed:** S-82 itself.
- **Warned:** walker fault F17. Only `aac` can warn: `renderCheck(…, 'warn', …)` occurs only at `src/main.ts:1167`.
- **Failed, all six rows:** an init script (`isSecureContext` false; `VideoEncoder` deleted; `StorageManager.prototype.getDirectory` deleted) and F1 holding the worker's script past the 5 s ping deadline, so the worker row reads "No response". "Failed to start" is that row's other wording and lasts until the deadline; the probe also reads it by swapping the text and restoring it inside one evaluate. The panel opens itself on a failure, so setup opens it by state, never a blind click.
- **Pending:** `isConfigSupported` never answers, F1 holds the worker, and an init script drops the 5,000 ms watchdog's `setTimeout`. `Walk.goto`'s boot wait refuses "checking", so setup navigates itself. `secure`, `webcodecs` and `opfs` cannot be seen pending: `:1108`'s loop is overwritten in the same tick at `:1111–1126`. Named per row in the table.
- **Spacing with a colour:** the walker has `spacing` alone. `dark-spacing`, `forced-light-spacing` and `forced-dark-spacing` run `setMode` (which reads the prefix) and the driver's `afterMode` adds `w.spacing(true)`. The walker's `assertReached` has no qualification for those names, so the probe records dark, forced and the sheet, and the table checks them. `typeRoles` reads them as not spacing, so its `type` row is expected to fail alike each side, declared.
- **Reader:** per row, state, mark, label and value text, label and value line counts, whether the value is beneath, each word's width and lines (space-split; `Intl.Segmenter` for Chinese), the longest word, any word broken, the label box, page overflow. For S-103 the same on its `dt`/`dd`.
- **Expected:** at the default font, no English or Malay word broken at any width; the worker row at 320 px is 1 line of label (or 2 between words) with the value beneath, from 4 and 10; 1280 px unmoved; S-103 unmoved; no new page overflow. At 32 px on 320 px the column is about 182 px (254 less the 72 px mark and gap), so some words will be broken: reported. Chinese breaks between characters, and any break inside a segmenter word is reported, not called a failure.

## WCAG and tokens

1.3.1 order and association unchanged; 1.4.4 and 1.4.10: the value stops taking the label's width; 1.4.8: left-aligned value text, none justified; 1.4.12: the row grows with the spacing, no fixed height. Carbon, "two token systems, never collapsed": only `--mark-width` and `--spacing-04`, both in `tokens.carbon.css`, already used by this rule.

## Risks to check

- The exact fit of mark, gap and 100% label: `-gap + gap + 100%`. A subpixel tip would drop the label under its mark; the reader's `labelTop` and mark line show it.
- Baseline of a mark with a label broken over lines: first baseline, as today.
- A row of an empty value: not in the System check.

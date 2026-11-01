<!-- markdownlint-disable -->

# VH-218 #1 — Claude's verdict (saved before Codex's answer is opened)

**Verdict: pass, with one old defect found and not this item's: the marks, wish VH-218.1.**

- **Value beneath, every row, DOM and words unchanged.** Beneath in 1,696 of 3,024 row readings after, from 0. CSS only: 28 lines in `src/styles/app.css`. Strings proof: tables and `data-i18n` the same. No element, control, token value or literal; only `--mark-width` and `--spacing-04`.
- **The label wraps only between words.** Readings with a label word broken: 2,028 → 152. English and Malay: none at the default font or in spacing mode, at any width and state. The defect's own reading: English worker 4 → 1 line at 320 px, Malay 10 → 2, one line where the defect read "Backgrou / nd / processin / g". What remains is at 32 px on 320 px, by name and width: `(WebCodecs)` 195.03 of 182 px, `Pemprosesan` 197.44 of 182 px, and in Chinese ordinary line breaking. The fallback is what keeps them inside the window, as the brief says.
- **A fixed value.** One statement in `MX_INIT`, revision `fe44891d3c53f716`, proved at both revisions on the clean base before any cell read: only the worker value and, where its width changed, its boxes. A real wrap of the format getter, not a DOM write.
- **540 cells a side, all reached, all at the one revision; 540 unmoved in the walker's own outcomes.** `type` fails alike in 135 cells, the three colour-with-spacing modes' 27 per state... as declared: the walker reads them as not spacing. Probe: `rows` moved in 384, every other field in none. 1280 px in English is the same to 0.01 px.
- **S-103:** 108 of 108 identical in its `dt` and `dd`, as expected: this is what the scoped rule proves. Its before is on AC and its after on battery, both power mode 2, after the crossing group was voided; a layout reading, and identical.
- **WCAG.** 1.3.1, 1.4.4, 1.4.8, 1.4.10, 1.4.12, as in the table's notes: 0 page overflow, 0 text past the row, either side. Colour modes agree in every condition. Checked one Malay 320 px page shot by eye: label, then value at its start, tinted; reads well.
- **`row-gap: 0`.** Taken against Codex's design. In the shot, the value sits close under its label with the row's divider clearly further away: right.
- **Load.** Four groups have 1 or 2 samples at 8 or above, peak 9.19, all but one a first sample; layout, not timing. I would not re-run; a re-run is the orchestrator's ruling.
- **The acceptance page:** untouched by scope; not walked, because no rule reaches it.
- **Tests:** 1,655 pass, 1 skipped as on the base. The gate is at the close.

**Reported, not fixed:** the marks. "Tidak" 36.33 of 24 px and 好的 28 of 24 px at the default font, and "OK" 24.38 of 24 px in spacing mode, each break over two lines, the same both sides. A remedy widens the mark's column for every row or adds a token, a design choice beyond this item: wish VH-218.1, told to the owner by the orchestrator.

**Weakest points:** a four-digit worker value not walked (content-driven, so it only wraps earlier). The staged pending rows are a swap, labelled.

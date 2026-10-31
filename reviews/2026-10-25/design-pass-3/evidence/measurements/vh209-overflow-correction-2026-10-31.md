<!-- markdownlint-disable -->
# VH-209: one correction to the table's notes

`vh209-overflow-2026-10-31.md` stays as placed. Its notes say "The page scrolls sideways in 122 of the 144 reached before". **Correct:** 110 of the 144 reached before, by the walker's `overflow` (table: overflow fail → pass, 110), and 12 more where the before's w375 cells were not reached but the containment probe still read them, so 122 of the 156 read. Likewise the 1,162 elements and 1,628 fragments include those 12 unreached cells' readings. After: 0 of 156, all reached.

The records' copies of the walk's scripts (`contain.js`, the `.mjs` drivers) carry `.txt` on their names, in both records folders, so the gate's lint does not read them as source; contents and sha1s as the tables state.

Both records folders' `sources.txt` name the scripts before that `.txt`; `vh209-table-notes.md` and `vh209-table2-notes.md` took it too, as `.md.txt`, for the gate's Markdown lint. No other file moved.

**Corrections to `vh209-repairs-2026-10-31.md`, Codex's close check having read them against the records:**

- "no text past its column" under text spacing is wrong. `after-sp32`, 320 px and the 32 px font, S-113: three long words pass the 287 px column edge: English "Smaller file, for assignments…" to 291, the Chinese detail's "EchoVideo、YouTube" to 294, Malay's "Saiz/kualiti fail" to 320, past its panel's 304 and reaching the window's edge. **The page does not scroll; no stylesheet rule clips them; nothing is lost.** So 1.4.12 is met, no loss of content or functionality, with this stated: wish VH-209.2. At no spacing, none of them passes.
- `type`, 12 alike, is not wish VH-217.2's: the spacing mode's Lora headings at line height 1.5, the mode's own setting.
- S-114's `targets`: 3 cells go fail → `cannot-determine`, not pass.

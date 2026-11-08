<!-- markdownlint-disable -->
# VH-203 Part C: the format "?" in four states, 8 November 2026

Plan section 5 at ruling 11's size: **192 images**, 4 states × 3 languages × 4 modes × 2 fonts × w1280 and w320, plus **3 at rest with the 44 px target's box outlined** over the words before the "?", one per language. The records are in [`vh203-format-help-records-2026-11-08/`](vh203-format-help-records-2026-11-08/): the images, the readings (`format-help.jsonl`, one line a state), the probe and the sheet script as `.txt`, the conditions and the load log, and six labelled contact sheets for the owner.

## Provenance

| | |
| --- | --- |
| App | `756b425`, the walker's nine files modified (diff hash `b28b608c84617b04`), 9 lines of status |
| Instrument revision | `7db38f355f3c46c2` (VH-203's run revision) |
| Machine | the Mac Pro, AC Power, headless Chrome on the walker's port 9251 |
| Run | c1, 2026-11-08 15:24:43Z to 15:28:12Z (209 s), one job through the walk queue; load 5.56 at the start, peak 8.01 (1 of 8 samples at 8 or above; static states, no timing reading) |

- `format-help-c.mjs` sha1 `1485d64e`: VH-217's `vh217-states2.mjs.txt` (`9b2eac6c`) with its READ, moves and in-viewport clips unchanged; the title's panel opened first by its own button, only the format "?", only the four states, and the outlined images added.
- `format-sheets-c.mjs` sha1 `88d1d6e4`: copies the images here, writes one HTML grid page per sheet, and shoots each with the same Chrome over CDP. No dependency added.
- `format-help.jsonl` sha1 `eed85e25`: 243 lines (192 states, 48 focus-reached checks, 3 outlined images), no condition errored.

## What each image is

The title's "?" (`#about-help-button`) is pressed first by the walker's own click, so the panel holding the five promises is open in every image (VH-229); each reading checks it open. Then, on the format "?" (`#format-help-button`):

- **rest:** the tip closed, the pointer away, nothing focused.
- **hovered:** the pointer on the "?"'s middle.
- **focused:** reached by Shift+Tab then Tab, `:focus-visible` true in all 48.
- **open:** pressed by the pointer, then the pointer moved away; the tip open, no ring.

Each image is a clip inside the viewport (`captureBeyondViewport` false, so the 32 px font holds; VH-217.5's cause avoided), 24 px round the promise and its "?". The root font is read before and after each clip: 16 px in 96 and 32 px in 96, as set.

## Readings

- **States as named:** rest, hovered and focused read `aria-expanded` false ×48 each, and open reads true ×48. `:hover` holds only in hovered, and `:focus-visible` only in focused.
- **The target, measured open:** the 2 px grid over the 44 × 44 px square round the "?" hits the button at 484 of 484 points in all 192 (the ::after's 44 × 44 px).
- **The words before it:** the "?" sits on the same line as the promise's last word in 176. In the other 16, en-GB at w320 and 32 px in all 4 modes and 4 states, it wraps to the line after "format.".
- **The outlined box over the words** (light, 16 px, w1280, at rest):
  - en-GB: 2.15 px over the ink of "format.", with 4 ink pixels on the target;
  - ms-MY: 2.15 px over "dipercayai.", with 3;
  - zh-Hans: 0 px over "。", with 0.
- **The viewport's edge:** 52 clips end at the 568 px viewport's edge, marked "(edge)" below. At w320 and 32 px these are all 48, where the promise, and when open its tip, run past the screen. At 16 px they are the four "open" clips in ms-MY, whose tip ends below the screen. Each image shows only what was in view; nothing here is a reading of the hidden part.

## Contact sheets, for the owner

One PNG a language and width, each of that set's 32 images, labelled by language, width, mode, font and state:

- [sheet-en-GB-w1280.png](vh203-format-help-records-2026-11-08/sheet-en-GB-w1280.png), [sheet-en-GB-w320.png](vh203-format-help-records-2026-11-08/sheet-en-GB-w320.png)
- [sheet-zh-Hans-w1280.png](vh203-format-help-records-2026-11-08/sheet-zh-Hans-w1280.png), [sheet-zh-Hans-w320.png](vh203-format-help-records-2026-11-08/sheet-zh-Hans-w320.png)
- [sheet-ms-MY-w1280.png](vh203-format-help-records-2026-11-08/sheet-ms-MY-w1280.png), [sheet-ms-MY-w320.png](vh203-format-help-records-2026-11-08/sheet-ms-MY-w320.png)

## The three outlined images

- [en-GB](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-light-rest-target.png)
- [zh-Hans](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-light-rest-target.png)
- [ms-MY](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-light-rest-target.png)

## The 192, by language and width

### en-GB at w1280

Sheet: [vh203-format-help-records-2026-11-08/sheet-en-GB-w1280.png](vh203-format-help-records-2026-11-08/sheet-en-GB-w1280.png) (its page: `sheet-en-GB-w1280.html`).

| Mode | Font | rest | hovered | focused | open |
| --- | --- | --- | --- | --- | --- |
| light | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-light-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-light-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-light-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-light-open.png) |
| dark | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-dark-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-dark-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-dark-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-dark-open.png) |
| forced light | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-light-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-light-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-light-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-light-open.png) |
| forced dark | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-dark-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-dark-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-dark-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-dark-open.png) |
| light | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-font32-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-font32-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-font32-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-font32-open.png) |
| dark | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-dark-font32-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-dark-font32-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-dark-font32-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-dark-font32-open.png) |
| forced light | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-light-font32-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-light-font32-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-light-font32-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-light-font32-open.png) |
| forced dark | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-dark-font32-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-dark-font32-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-dark-font32-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w1280-forced-dark-font32-open.png) |

### en-GB at w320

Sheet: [vh203-format-help-records-2026-11-08/sheet-en-GB-w320.png](vh203-format-help-records-2026-11-08/sheet-en-GB-w320.png) (its page: `sheet-en-GB-w320.html`).

| Mode | Font | rest | hovered | focused | open |
| --- | --- | --- | --- | --- | --- |
| light | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-light-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-light-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-light-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-light-open.png) |
| dark | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-dark-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-dark-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-dark-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-dark-open.png) |
| forced light | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-light-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-light-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-light-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-light-open.png) |
| forced dark | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-dark-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-dark-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-dark-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-dark-open.png) |
| light | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-font32-rest.png) (edge) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-font32-hovered.png) (edge) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-font32-focused.png) (edge) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-font32-open.png) (edge) |
| dark | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-dark-font32-rest.png) (edge) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-dark-font32-hovered.png) (edge) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-dark-font32-focused.png) (edge) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-dark-font32-open.png) (edge) |
| forced light | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-light-font32-rest.png) (edge) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-light-font32-hovered.png) (edge) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-light-font32-focused.png) (edge) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-light-font32-open.png) (edge) |
| forced dark | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-dark-font32-rest.png) (edge) | [hovered](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-dark-font32-hovered.png) (edge) | [focused](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-dark-font32-focused.png) (edge) | [open](vh203-format-help-records-2026-11-08/images/format-en-GB-w320-forced-dark-font32-open.png) (edge) |

### zh-Hans at w1280

Sheet: [vh203-format-help-records-2026-11-08/sheet-zh-Hans-w1280.png](vh203-format-help-records-2026-11-08/sheet-zh-Hans-w1280.png) (its page: `sheet-zh-Hans-w1280.html`).

| Mode | Font | rest | hovered | focused | open |
| --- | --- | --- | --- | --- | --- |
| light | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-light-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-light-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-light-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-light-open.png) |
| dark | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-dark-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-dark-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-dark-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-dark-open.png) |
| forced light | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-light-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-light-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-light-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-light-open.png) |
| forced dark | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-dark-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-dark-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-dark-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-dark-open.png) |
| light | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-font32-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-font32-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-font32-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-font32-open.png) |
| dark | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-dark-font32-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-dark-font32-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-dark-font32-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-dark-font32-open.png) |
| forced light | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-light-font32-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-light-font32-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-light-font32-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-light-font32-open.png) |
| forced dark | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-dark-font32-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-dark-font32-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-dark-font32-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w1280-forced-dark-font32-open.png) |

### zh-Hans at w320

Sheet: [vh203-format-help-records-2026-11-08/sheet-zh-Hans-w320.png](vh203-format-help-records-2026-11-08/sheet-zh-Hans-w320.png) (its page: `sheet-zh-Hans-w320.html`).

| Mode | Font | rest | hovered | focused | open |
| --- | --- | --- | --- | --- | --- |
| light | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-light-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-light-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-light-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-light-open.png) |
| dark | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-dark-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-dark-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-dark-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-dark-open.png) |
| forced light | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-light-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-light-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-light-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-light-open.png) |
| forced dark | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-dark-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-dark-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-dark-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-dark-open.png) |
| light | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-font32-rest.png) (edge) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-font32-hovered.png) (edge) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-font32-focused.png) (edge) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-font32-open.png) (edge) |
| dark | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-dark-font32-rest.png) (edge) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-dark-font32-hovered.png) (edge) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-dark-font32-focused.png) (edge) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-dark-font32-open.png) (edge) |
| forced light | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-light-font32-rest.png) (edge) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-light-font32-hovered.png) (edge) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-light-font32-focused.png) (edge) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-light-font32-open.png) (edge) |
| forced dark | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-dark-font32-rest.png) (edge) | [hovered](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-dark-font32-hovered.png) (edge) | [focused](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-dark-font32-focused.png) (edge) | [open](vh203-format-help-records-2026-11-08/images/format-zh-Hans-w320-forced-dark-font32-open.png) (edge) |

### ms-MY at w1280

Sheet: [vh203-format-help-records-2026-11-08/sheet-ms-MY-w1280.png](vh203-format-help-records-2026-11-08/sheet-ms-MY-w1280.png) (its page: `sheet-ms-MY-w1280.html`).

| Mode | Font | rest | hovered | focused | open |
| --- | --- | --- | --- | --- | --- |
| light | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-light-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-light-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-light-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-light-open.png) |
| dark | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-dark-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-dark-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-dark-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-dark-open.png) |
| forced light | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-light-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-light-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-light-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-light-open.png) |
| forced dark | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-dark-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-dark-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-dark-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-dark-open.png) |
| light | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-font32-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-font32-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-font32-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-font32-open.png) |
| dark | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-dark-font32-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-dark-font32-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-dark-font32-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-dark-font32-open.png) |
| forced light | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-light-font32-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-light-font32-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-light-font32-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-light-font32-open.png) |
| forced dark | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-dark-font32-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-dark-font32-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-dark-font32-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w1280-forced-dark-font32-open.png) |

### ms-MY at w320

Sheet: [vh203-format-help-records-2026-11-08/sheet-ms-MY-w320.png](vh203-format-help-records-2026-11-08/sheet-ms-MY-w320.png) (its page: `sheet-ms-MY-w320.html`).

| Mode | Font | rest | hovered | focused | open |
| --- | --- | --- | --- | --- | --- |
| light | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-light-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-light-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-light-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-light-open.png) (edge) |
| dark | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-dark-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-dark-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-dark-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-dark-open.png) (edge) |
| forced light | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-light-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-light-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-light-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-light-open.png) (edge) |
| forced dark | 16 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-dark-rest.png) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-dark-hovered.png) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-dark-focused.png) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-dark-open.png) (edge) |
| light | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-font32-rest.png) (edge) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-font32-hovered.png) (edge) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-font32-focused.png) (edge) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-font32-open.png) (edge) |
| dark | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-dark-font32-rest.png) (edge) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-dark-font32-hovered.png) (edge) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-dark-font32-focused.png) (edge) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-dark-font32-open.png) (edge) |
| forced light | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-light-font32-rest.png) (edge) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-light-font32-hovered.png) (edge) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-light-font32-focused.png) (edge) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-light-font32-open.png) (edge) |
| forced dark | 32 px | [rest](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-dark-font32-rest.png) (edge) | [hovered](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-dark-font32-hovered.png) (edge) | [focused](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-dark-font32-focused.png) (edge) | [open](vh203-format-help-records-2026-11-08/images/format-ms-MY-w320-forced-dark-font32-open.png) (edge) |

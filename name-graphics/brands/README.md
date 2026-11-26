# Brand packs

A brand pack is everything that makes the app look like one
organisation, in one folder: `brands/<id>/`. The build picks one pack;
nothing outside a pack names a brand.

| Pack | What it is |
| --- | --- |
| `neutral` | The default. No organisation's name, mark, typeface or colour; system font stacks; a palette chosen for contrast alone. Its styles appear in every build. |
| `uon` | The University of Nottingham: its palette, its logo and heading face, its words and its own styles, beside the neutral ones. |

## What a pack holds

Arriving with VNG-2:

- `tokens.css` — the palette and the colour roles the page uses, in
  light, dark and the header band (UI-STANDARDS.md → Token systems)
- `assets/` — the logo and fonts, if the pack has any
- `pack.ts` — the app's name, help links and words that differ by
  organisation, and the list of styles the pack offers
- `styles/` — the pack's own lower-third styles, as data
- `README.md` — the pack's brand rules and where its assets came from

## Rules

- The neutral build carries nothing of any other pack; the gate checks
  the built files for it.
- Every pack offers the neutral styles beside its own.
- A pack's colour pairs meet WCAG 2.2 AAA contrast on the page, tested
  for every pack.
- `brands/uon/assets/` holds the University's trademark and typeface;
  they change only on the owner's word.
- To make a pack for another organisation, copy `brands/neutral/`,
  rename it and change its values; no code changes.

<!-- markdownlint-disable -->

# VH-219 #1 — Claude's verdict reading (saved before Codex's blind answer is opened)

Candidate: `src/styles/app.css` alone against `62fc265`, diff hash `2498bfa9afdb5243`: `white-space: normal` on `.select`; in the existing `max-width: 19.99rem` query, `.select` `padding-left: var(--spacing-03)`, `padding-right: var(--spacing-05)` and `.select-wrap::after` `right: var(--spacing-02)`; one comment line in the query's header. Evidence: `vh219-selects-2026-11-01.md` and `vh219-records-2026-11-01/`.

## The criteria

- **Room for the select: met.** Each step-4 field already took the full column with its label above at the condition (VH-209's query, `min-width: 0`, the `field--wide` grid); the reader shows it both sides: labels above in every cell, no document overflow, targets at least 44 px. The lane and arrow space are set by tokens in the query: 148 → 204 px at 320 and 229 → 285 at 401 at 32 px. `index.html` unchanged; no font size touched.
- **Every option read: met, no residue.** Every option of both selects, three languages, closed, in every cell: clipped 2,784 of 31,104 → 0, and 101 of 504 → 0 in the targeted group, over the arrow 1,920 → 0; measured in the select's own shadow block, not by canvas. Names, the 44 px targets and the rings: names and labels unchanged in every cell; rings by the walker's focus instrument, unmoved by the table (no focus move listed). **No native closed text still clips: no residue to put to the owner.** The open list isn't readable headlessly: a person's check, named.
- **VH-209's line moved:** still to do at the close: its "Out of scope, kept" names this item (`project/items/VH-209.md:11`).
- **Stage rule:** the matrix whole, 5,184 + 84 a side, by #33's ruling; before measured on the base (no VH-199 record matches a moved page; none used); WCAG below; tokens only, both files untouched, no control, element or string; UI-STANDARDS: no rule changes, so no edit; no `docs/` change; the gate and Codex's close check are the successor's; the Disposition row is the close's.

## WCAG

1.3.1: native selects, labels and descriptions untouched. 1.4.4: at 32 px nothing is lost now, where options were cut. 1.4.8: text left-aligned, wrapped between words; Chinese breaks between glyphs, none alone at 32 px (both seven-glyph onsets fit 204 px). 1.4.10: no sideways scroll at 320 in any cell. 1.4.12: spacing at the default font clipped 480 options at 320, 401 and 640 px before; 0 after: the wrap absorbs spacing, which a lane can't. 2.4.13: rings follow the box, no move. 2.5.5: the boxes only grow, 44 → 60 in spacing, 76 → 118 at 32 px.

## The design, as a person would see it

The targeted viewport captures at 32 px show two-line closed selects, the arrow centred at right, words whole ("Tiada grafik / penutup", "Saat terakhir / video", "The last second / of video"), the focused select's ring whole. A taller field, not a clipped one; Carbon's field shape is kept. Judged on the captures, not the 32 px page shots, which show the default size.

## Points for the record

- **Walker rows that mislead:** S-111/S-112's "every option inside its select's room" (canvas, one line): 160 fail alike, 128 fail → pass. S-113's clipped list likewise. `type` fails the combined spacing modes alike. A wish line: those rows read the closed text's own block, for VH-203's after-run; its claim checked against `PLANS` before it is written.
- **Load:** after-target and after-staff-cut re-walked at low load, identical; before-staff-fade re-walked on a proved export, identical; the rest stand by #34's ruling; after-staff-fade (2) and after-staff-none (3) stand on its reasoning, flagged.
- **Verdict:** the change meets the item. Pass, pending the gate, the close's ledger and Codex's checks.

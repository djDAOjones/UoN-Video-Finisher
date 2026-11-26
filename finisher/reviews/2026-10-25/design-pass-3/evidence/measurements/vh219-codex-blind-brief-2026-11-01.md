<!-- markdownlint-disable -->

# VH-219 — Codex astra's blind verdict brief

You are Codex astra, giving a blind verdict, read-only, for item VH-219 of the UoN Video Helper, from the repository at the current directory. The candidate is the working tree's uncommitted change against HEAD `62fc265531188688ceb692822faebb395d14877f`: run `git diff` (only `src/styles/app.css`). The evidence: `reviews/2026-10-25/design-pass-3/evidence/measurements/vh219-selects-2026-11-01.md` and its records folder `vh219-records-2026-11-01/` (per-cell outcomes `*.outcomes.jsonl`, probes `*probe*.jsonl`, conditions and load logs, the driver and launchers as `.txt`, `shots/` with 32 px viewport captures, `renamed.txt`).

The item: `project/items/VH-219.md`; every criterion must hold. The owner's words: "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" and "even old issues should be solved for". Rules: CSS only; `index.html` unchanged; never a smaller font; no custom control, element or string; numbers by tokens; the two token files never collapsed; the walker unchanged; a native select's closed text that still clips after the remedy is the owner's residue, keeping the item open.

Read what you need of: the diff, `src/styles/app.css`, `src/styles/tokens.carbon.css`, `index.html` (step 4), `src/i18n/*.ts` (`closing.types`, `closing.onsets`), `UI-STANDARDS.md`, `project/digests/wcag-2.2-aaa.md`, `project/digests/carbon.md`, the walker under `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/` read-only, the table and records. Never read any folder under `side-session-notes/`; in `/Users/joe/UoN-Video-Helper-side/` read nothing whose name starts `vh219-claude`, nothing matching `vh219-*compare*`, `vh219-progress.md`, `vh219-handover-*`, or any `vh219-*brief*` but this one.

Answer each, citing file and line or record:

1. Does the CSS do what the item asks, and only that? Every selector's callers; anything at the default font, at wide widths or in other controls that it changes.
2. Each acceptance criterion: met, not met, or not yet (a close task), with the evidence.
3. Is the reader honest: does its "clipped" reading (the select's shadow text block over CDP) prove the closed text is whole? Any cell, language or mode it could miss? Is any option's closed text still clipped after the change: the residue?
4. The matrix: is it whole as the item and its table's notes state (5,184 cells a side plus 84 targeted; both types; every closing; onset values read by the reader, not crossed)? Any state that could have been staged and wasn't?
5. The walk's conditions: each group's power, mode and load, the voids, the re-walks (identical) and the orchestrators' rulings in the notes. Does anything in them make a reading unsafe?
6. The walker rows that fail or move (S-111/S-112's "every option inside its select's room", S-113's clipped list, `type` in combined spacing modes): read as the notes say?
7. WCAG 1.3.1, 1.4.4, 1.4.8, 1.4.10, 1.4.12, 2.4.13, 2.5.5; and the design as a person would see it, judged on the viewport captures in `shots/` (the 32 px page shots show the default size).
8. Anything the close must carry: wish lines, the Disposition row, VH-209's line, UI-STANDARDS.

End with a verdict: pass, pass with conditions, or fail, and a short list of what must hold. Be concrete and brief.

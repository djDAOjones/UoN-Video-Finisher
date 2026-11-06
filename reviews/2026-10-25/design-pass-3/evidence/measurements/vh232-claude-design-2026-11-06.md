<!-- markdownlint-disable -->

# VH-232 — Claude's design reading (VH-232 #1, saved before Codex's blind design is opened)

Base `926b2d7` (VH-220's landing); the worktree `side/vh232-plan`, ledger only. Read at HEAD: `src/main.ts:3640–3805`, `index.html:870–909`, `src/styles/app.css` (`.status` `:464–469`, `.dialog` `:1641–1650`, reduced motion `:556`), `tokens.carbon.css`, the walker's feedback scenarios (`scenarios.mjs:932–1002`), `K-dialog` (`:1132`), `DIALOG_ENLARGED_SUB` (`:1790`), `walk.mjs:334` (the click is a CDP mouse or touch event), `qualify.mjs:517–533` (keys), VH-222's table line 99 and its g4 sum, Codex's VH-222 blind point (b), the owner's words (`plan8-owner-words.md:185`, `:275`, `:395`, `:437`, `:438`).

## The defect

`setFeedbackStatus` (`src/main.ts:3657–3661`) writes the text and nothing else. `#feedback-status` is the last child of the form, after the actions (`index.html:907`); the dialog is `overflow: auto` at most the window less 32 px (`app.css:1644`). Where the content is taller than that, the new status lands below the visible area: in VH-222's g4, 17 cells (S-79a ×3, S-79b ×14) showed only its first two lines, the row's own sentence wholly below. No code in the app scrolls anything (`grep scrollIntoView|scrollTo|scrollTop src`: none). Nielsen 1, not WCAG (the orchestrator's ruling).

## The remedy (chosen): reveal the status inside the dialog, by the least scroll, focus untouched

When `setFeedbackStatus` writes a **non-empty** text and the dialog **is open**, the status's box is brought into the dialog's visible area by the least vertical scroll of `#feedback-dialog` (`scrollIntoView({ block: 'nearest', inline: 'nearest' })` on `#feedback-status`, the dialog being its nearest scroll container). Then:
- **What moves:** only `#feedback-dialog`'s `scrollTop`, by the least distance that brings the whole status into view; where it is already in view (1280 px), nothing moves.
- **What must not move:** focus (`document.activeElement` is the same element before and after; nothing calls `focus()`); the page behind (`window.scrollY`, `scrollX` unchanged); the dialog's size and position; every element's place inside the dialog's content; `scrollLeft` (0 before and after). The text, its role (`status`), `aria-live="polite"` and how it is written (`textContent`) are unchanged, so it is announced as now.
- **Room below:** the revealed status keeps the dialog's own padding beneath it: `scroll-margin-block: var(--spacing-07)` on the dialog's status (`.dialog .status`, beside `.dialog` in `app.css`), the token the dialog's padding already uses (`tokens.carbon.css:38`). No new number; no new token.
- **Focus stays in view:** in every walked cell the focused control (the button pressed: Open email app, or Copy message and details) stays wholly inside the dialog's visible area after the reveal. The actions sit directly above the status, so at 320 × 568 the pressed button and the whole status fit together (by VH-222's g4 boxes: status 189–210 px tall; the visible area about 534 px). A cell where both cannot hold is a stop (the remedy outgrows the item).
- **Taller than the visible area** (no cell of this item's matrix; possible at the 32 px font or a zoom proxy): `nearest` aligns the status's start with the top of the visible area (less the margin), so its first line shows and the rest is reached by scrolling, as any long content in the dialog is. No criterion rests on that case beyond "its start in view"; the table names the cells where it occurs.
- **Emptied** (`openFeedback`, `:3708`, sets `''`): no reveal. The dialog opens with its scroll at the top and focus on the message field, as now.
- **Closed before an asynchronous set lands** (Copy's status follows `navigator.clipboard.writeText`, `:3790–3797`): no reveal while the dialog is closed; the text is set as now and cleared on the next open.
- **A change of language:** the reveal is outside the paint thunk `show()` registers (`:276`), so a repaint never scrolls. (While the modal is open the switcher is inert.)
- **Motion:** an instant jump: no `behavior: 'smooth'`, and no `scroll-behavior` anywhere in the styles (none today). 2.3.3 is not reached; the reduced-motion rule (`app.css:556`) is unchanged.

**Rejected:** moving the status above the actions or to the top of the dialog (DOM and reading order change, every control below it moves, the result is parted from the button pressed); a sticky status (it would cover the textarea or the focused control when scrolled: 2.4.11/2.4.12 and UI-STANDARDS Operable "not obscured by sticky headers or overlays"); a shorter text (a string change: none approved); a taller dialog (it is already the window less 32 px); focus moved to the status (turns a status into a focus change; the brief and 4.1.3's intent forbid it).

## The code it reaches

- `src/main.ts:3656–3661`, `setFeedbackStatus`: after `show(…)`, the reveal, guarded by a non-empty text and `feedbackDialog.open`. The four callers (`:3772`, `:3780`, `:3791`, `:3796`) and `openFeedback` (`:3708`) are unchanged.
- A small helper in `src/ui/feedback.ts`, beside the dialog's other helpers, decides and does the reveal on stand-ins (the model: `src/ui/focus-hand-on.ts`, tested with stand-ins in `focus-hand-on.test.ts`). `src/ui/feedback.test.ts` covers: a non-empty text in an open dialog calls `scrollIntoView` once with `block: 'nearest'`, `inline: 'nearest'` and no smooth behaviour; an empty text, none; a closed dialog, none; `focus()` never called. The scroll itself is proved in Chrome by the walk.
- `src/styles/app.css`: one declaration, `scroll-margin-block: var(--spacing-07)`, on `.dialog .status` beside `.dialog` (`:1641`). Tokens: none new (`--spacing-07`, `tokens.carbon.css:38`). `src/config/`: no value (no number is needed).
- Not touched: `index.html`, the i18n tables, `docs/`, the walker.

## Words and elements

None. No new or changed string in any language, no `docs/` line, no element, control or checkbox. So no VH-232.1. Nothing in the spec (§9.2's feedback lines, `docs/01-specification.md:682–688`) is made false.

## Standards

- **Nielsen 1, "status visible and announced"** (the digest rule named at the build's close): the status whole in view when set, and announced as now.
- **WCAG 2.2 AAA re-checked:** 1.3.2 (DOM order unchanged); 1.4.10 (no sideways scroll; `scrollLeft` 0); 2.1.1/2.1.3 and 2.4.3 (the keyboard reading below; Tab order unchanged); 2.3.3 (no motion: an instant jump); 2.4.7/2.4.13 (the ring unchanged); 2.4.11/2.4.12 (nothing new covers the focused control; it stays in view); 3.2.1/3.2.2/3.2.5 (a scroll inside the dialog is no change of context); 4.1.3 (role and live region unchanged; announced without focus moving). A speech reading is a person's.

## The stage rule's measure (VH-203's stage rule, kept whole, as `VH-231.md` keeps it)

- **Measured before and after with the pass's walker, on the Mac Pro:** the before on the build's base, before any `src/` change (the owner's re-walk answer, `:438`); the walker at the build's base, unchanged before and after; a driver outside it adds only a route and a read-only probe, in memory. VH-222's g4 records (base `95d18ee`, revision `9c522696`) are the finding's source, cited, never paired with the before.
- **The cells that set `#feedback-status` with text:** S-78 (opened), S-79a (too long), S-79b (opened, some details left out), S-80a (copied), S-80b (could not copy), at 1280, 375 and 320 px, in en-GB, zh-Hans and ms-MY, in light, dark, forced light and forced dark: 180 a side. **S-76** too: its subresults (`DIALOG_ENLARGED_SUB`, `scenarios.mjs:1790`) hand the email off by Enter on Open email app, which sets "opened", at 320 px in light and at enlargement: its 36 matrix cells, plus the 32 px font at 1280 and the two zoom proxies in light in the three languages (9), where the taller case may occur: 45 a side.
- **Controls (the status empty: nothing may move):** S-75, S-77 and S-78k (opened again: the status emptied, the dialog at its top) at 1280, 375 and 320 px in the three languages, light (27); `K-dialog` in en-GB at the three widths, light (3).
- **The keyboard-only reading** (VH-222 left it unmeasured): a route in the driver, on the walker's own keys (CDP `Input.dispatchKeyEvent`, `qualify.mjs:533`): Tab to Send feedback, Enter, the scenario's message typed, Tab to Open email app, Enter (S-79a's and S-79b's states reached by keys); then ArrowDown ×3, PageDown, End, PageUp, Home, and Shift+Tab to the message field, reading after each step: the focused element; the dialog's `scrollTop`, `scrollHeight`, `clientHeight`, `scrollLeft`; the status's line boxes against the dialog's visible area; the focused control's box in view; the heading's box in view; `window.scrollY`. At 1280, 375 and 320 px, in the three languages, light (scrolling and focus do not depend on colour; the four modes are read by the cells above): 18 a side. **Before:** whether the keys alone bring the status's last line into view, and from where. **After:** the status whole in view with no key pressed and focus still on Open email app; the keys still reach the dialog's top and its end.
- **"Whole and in view," decided by a read-only probe at the state, before the walker's focus readings move focus:** every line box of the status's text (`Range.getClientRects()`) lies inside the dialog's visible area (its padding box, by `getBoundingClientRect()` with `clientTop` and `clientHeight`) and inside the window; the text holds the row's whole sentence(s); the walker's own clip rule (the sums' FLAWED count) reads 0 in the after's cells. Also read each side: the focused element and its box in view; `window.scrollY`; the dialog's rect; each control's offset inside the form (nothing else moved).
- **Readings:** the dialog's heading and Tab order where it touches them; `role`, `aria-live` and the accessibility tree's live region.
- **WCAG re-checked:** as above. **Tokens:** our own CSS on the two token files, never collapsed; no literal outside `src/config/` or a token; no element, control or checkbox; the progress bar kept. **Documents:** UI-STANDARDS unchanged (no rule changes: System status already asks it); no `docs/` edit.
- **The gate,** **Codex astra's check** before commit (`Checked: gpt-6-astra — <verdict as given> — VH-232`), the Disposition row linked at the close, and the table `vh232-feedback-status-2026-11-DD.md` in the measurements folder with its records beside it.

## Re-reads after it lands

- **VH-222's g4:** S-79a and S-79b, 72 cells (the 17 should then read whole and in view; the other 55 the same).
- **VH-224's batch B:** S-76's 8 keys; VH-224's progress notes say its subresults "pass at enlargement", and those subresults hand the email off, which sets the status, so the reveal acts there: re-read on the orchestrator's word.
- **VH-223's batch A:** S-76's 4 keys are the landscape and short views (`keys-a.txt`), where the subresults do not run (`DIALOG_ENLARGED_SUB.when`: the 32 px font, or light at 320 px or the two proxies) and the status is empty: no re-read. Its manifests count `dialogOperated` 0.
- **VH-220 and VH-221:** no feedback scenario in their item files or progress notes; every manifest in their records counts `dialogOperated` 0: no re-read.
- **VH-231:** cut files and controls S-20, S-22, S-64, S-91, S-136: no feedback cell; none.

## Size and risk

One worker, about 45k: a few lines in `main.ts`, a helper and its stand-in test, one CSS declaration, and the walk (about 273 cells and routes a side). It outgrows that, and stops, if a cell cannot hold both the whole status and the focused control in view; if Chrome's reveal scrolls the page behind; or if any string, element or `docs/` line turns out to be needed.

**Verdict:** raise VH-232 as designed; nothing goes to the owner first (no words, no element, no `docs/`).

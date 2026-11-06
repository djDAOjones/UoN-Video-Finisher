<!-- markdownlint-disable -->

# VH-232 — the design compare (Claude's design against Codex astra's blind design)

- Claude's reading `vh232-claude-design.md`: saved 23:30:57Z (sha1 6c221bed4d63a208). Codex ran from the worktree on `vh232-codex-design-brief.md` (660abdf7) from 23:26:55Z to 23:30:29Z (exit 0, 17,160 bytes). Its verdict line was first seen at 23:30:57Z, after that save, by the log's tail; the answer `vh232-codex-design.md` was **opened whole at 23:31:35Z**. The orchestrator accepted the design as saved (Orchestrator #42, 23:31Z). Compare written by VH-232 #1, 2026-11-05 ~23:4xZ.
- Codex's verdict, verbatim: "**Raise VH-232 as designed; no owner approval is needed first for this remedy. Any required new wording, element, `docs/` edit, or unresolved visibility-versus-focus conflict goes to the owner before implementation proceeds beyond this design.**"

## Agreed
- The remedy: reveal the status inside `#feedback-dialog` by the least vertical scroll, instantly, when a non-empty status is set in an open dialog; no focus call, no `tabindex`, the same node, role and live region, so it is announced as now; DOM order, layout, size and the page behind unchanged; nothing moves where the status is already in view.
- Rejected alike: the status moved in the DOM, a sticky status, a shorter text, a taller dialog, focus moved to the status.
- An over-height status (taller than the visible area): its start aligned, the rest reached by scrolling; not a "whole and in view" pass. Every cell of the matrix must hold the whole status in view; a normal cell that cannot, or that cannot also keep the focused control in view, stops the build (the remedy outgrows the item).
- No words, no `docs/` line, no element, control or checkbox: no VH-232.1, nothing to the owner first.
- A small helper in `src/ui/`, tested on stand-ins as `focus-hand-on.ts` is; the scroll, keys and announcement proved in Chrome. No literal; no new token.
- The stage rule: the before on the build's base on the Mac Pro; VH-222's g4 records cited, not paired; S-78, S-79a, S-79b, S-80a and S-80b in the 36 conditions; S-75, S-77 and S-78k as controls; K-dialog; the keyboard route in an external driver on the walker's real CDP keys (`qualify.mjs:533`), the walker unchanged; "whole and in view" read at the state, before any instrument moves focus; the table `vh232-feedback-status-2026-11-DD.md`.
- Re-reads: VH-222's S-79a and S-79b (72 cells); VH-220 and VH-221 none; VH-223's four S-76 keys (landscape and short, light) none.
- One worker, about 45k.

## Codex only (adopted unless marked)
1. **Scroll the dialog only, never `scrollIntoView`:** it can scroll ancestors. Adopted: the helper sets `#feedback-dialog`'s `scrollTop` from DOM geometry (the status's box against the dialog's client area, clamped to its scroll range). It replaces Claude's `scrollIntoView` and, with it, Claude's `scroll-margin-block` declaration: the room below is the dialog's own end padding, read from its computed style, so `app.css` is unchanged.
2. **The reveal inside the paint callback**, after the text is written, so a repainted translation is measured afresh. Adopted: the guard (open dialog, non-empty text) keeps a repaint of a closed dialog from scrolling; while the modal is open the switcher is inert. Claude's "outside the callback" is withdrawn; the result is the same in every reachable state.
3. **Focus visibility, measured, not only identity:** the focused control and its ring wholly in view after the reveal. Adopted (Claude had the control's box; the ring is added).
4. **Lifecycle tests on stand-ins:** already visible, clipped below, clipped above, exact fit, fractional geometry, clamping; over-height without oscillation on repeated calls; empty, closed and disconnected targets; no focus call, no ancestor or horizontal scroll, no content change; a delayed copy result after Close, after Escape, and with focus moved by the user (its outcome recorded). Adopted.
5. **Not adopted: discarding a late copy result tied to the opening that started it** (Close, Escape, close-and-reopen). That changes what the Copy route writes, a behaviour the defect does not reach and no record has measured; the item keeps "no reveal while closed" and leaves the text a late result writes unchanged. For the orchestrator's word: a further ID only on it.
6. **All four controls in the 36 conditions,** not light only. Adopted: S-75, S-76, S-77 and S-78k at 1280, 375 and 320 px, three languages, four modes.
7. **Extra variants.** Adopted, bounded: S-79b with "What will be sent" open (a taller dialog, the status below even at 1280) at the three widths and languages, light; S-79b at 320 px in reduced motion and text spacing, en-GB; repeated status, language repaint, delayed copy and moved focus on stand-ins only. **Not adopted:** J3's feedback segment (a long route with a job and faults; its S-80 step's assert, focus unmoved on Copy, is what the keyboard route reads), stated in the table as not walked.
8. **The keyboard route in both directions:** after the reveal, PageUp/ArrowUp first, then down; Tab and Shift+Tab through the actions; Escape returns focus to the opener; the textarea's and the disclosure's own scrolling told apart from the dialog's; no `.focus()`, `.scrollTo()` or wheel in the route; the route and probe qualified before use. Adopted.
9. **Separate booleans** (complete text, whole visibility, focus visibility, keyboard reach) and the text read whole, since the row resolver ends `tooLong`'s address at "nottingham" (an instrument limit, VH-222's compare). Adopted.
10. **Digest rules:** nielsen "status visible and announced" and "errors say what next" (`tooLong`'s and `couldNotCopy`'s way forward was the hidden part). Adopted. WCAG adds 1.4.4, 1.4.12 and 2.1.2 to the re-check. Adopted.

## Claude only
1. **S-76 sets the status.** Its subresults (`DIALOG_ENLARGED_SUB`, `scenarios.mjs:1790`, `dialogByKeys`) hand the email off by Enter, "opened" said, wherever `when` holds: the 32 px font, or light at 320 px and the two zoom proxies. So S-76 is a status cell there, not only an empty control; its enlargement cells (the 32 px font at 1280 and both proxies, light, three languages: 9) are walked too, where the over-height case may occur. Codex listed S-76 as "opening empty".
2. **VH-224's S-76 keys.** Of its 8 (`unrun-2026-10-27.json:606–617`, Codex's own citation), the 4 zoom-proxy keys (zh-Hans and ms-MY, zoom200proxy and zoom400proxy, light) run those subresults, so the reveal acts there: re-read on the orchestrator's word. The 4 at w1280 reduced motion and spacing do not run them: none. **Codex's "they should not change" is settled against it by `DIALOG_ENLARGED_SUB.when`;** VH-223's four keys (landscape, short) stand as Codex says.
3. VH-220's, VH-221's and VH-223's manifests count the walker's `dialogOperated` at 0 records (65 manifests).

## Disagreed
None that the evidence leaves open: point 2 above is settled by the walker's own `when`; Codex-only point 5 is out of scope by the brief ("a change to another caller's behaviour the criteria don't name"), not a disagreement on the defect.

## Standing
Raise VH-232 as merged here: the dialog-only reveal by geometry in a `src/ui/` helper, in the paint callback; no CSS, string, element or `docs/` change; the matrix of nine scenarios in 36 conditions plus S-76's 9 enlargement cells, K-dialog, the disclosure-open and motion/spacing variants and the keyboard route both ways; re-reads VH-222 (72 cells) and VH-224's four S-76 zoom-proxy keys.

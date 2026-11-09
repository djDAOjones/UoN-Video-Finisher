<!-- markdownlint-disable -->

# VH-235 #1 — design compare (2026-11-09)

Claude's design `vh235-claude-design.md` saved 00:14:58Z; Codex's brief `vh235-codex-design-brief.md`, run 00:15:20Z from `$W`; Codex's answer `vh235-codex-design.md` written 00:17:02Z, opened 00:17:34Z, after Claude's was saved. Codex's verdict: "Build as designed below".

## Agreed
- The guard is an opening token AND `dialog.open`, each half needed (token alone writes into a closed dialog, including between `close()` and the queued `close` event; `open` alone writes into a reopened one). No `close` listener; no number (a fresh identity per opening). One opener, `openFeedback`; no `method="dialog"` close.
- A small tested helper in `src/ui/`, not inline, since `main.ts` has no unit tests; not `feedback.ts`.
- The failure's `log.warn` kept unconditionally, before the guard.
- Guard the call to `setFeedbackStatus`, not its paint: an accepted status still repaints on a language switch; a late one registers nothing.
- `reveal-status.test.ts`'s assertions kept; its comments made true.
- `:574`'s `/ 1000` unchanged here; a follow-up wish line records it (Codex: the house rule reaches it; the item excludes it).
- The walk: 45 cells and the 24-cell late route; the stand-in installed through CDP after setup and before the click; real Close and native Escape; raw `textContent` read while closed; no walker file changed; speech is a person's.

## Codex only, adopted
- The token is a `Symbol()`, `null` before the first opening (Claude: `{}`).
- The token replaced just after `showModal()` succeeds, not before it (both synchronous in one task; only a successful opening counts).
- The helper's name, `src/ui/feedback-opening.ts`, `createFeedbackOpening(dialog)` with `begin()` and `capture()`.
- The constant's name, `MADE_LENGTH_LOG_ROUNDING_SCALE`, and its test pinning the import and both uses in the release-guard expression, not the identifier anywhere.
- The late route's evidence: invocation and the pending state confirmed before the step; readings just before the settle compared with after it (closing moves focus by itself); qualification by held, resolved and rejected stand-ins against the real F5 granted and denied results in the same opening.
- Tests for a settle between `close()` and the `close` event, a reopen before it, and overlapping Copies; no "latest Copy wins".

## Claude only, kept
- `settleCopy(copy, here, on)` in the same helper, carrying the handler's exact try/catch (a throw from the success write still falls to the catch), so the item's success and failure tests run production code and the warn's "either way" is tested, not pinned by a source read. Codex's narrower shape (guard only the two writes inline) was weighed: it is two lines shorter in `main.ts` but leaves the success and failure paths untested except by a source pin. It is not a general framework: Copy only.
- The constant in `src/config/thresholds.ts` beside `ENDS_EARLY_MARGIN_SECONDS` (the made length's other number), not a new `src/config/diagnostics.ts`.

## Disagreed
- **The reveal tests' titles.** Codex would rename the four `it` titles that describe app behaviour; section 0 lists `reveal-status.test.ts` as "comments only". Kept to comments: the describe's comment and one comment on each affected case say that since VH-235 `main.ts` writes no late result, so the case is the reveal given such a text; titles unchanged. Held as a point for the verdict's blind check; if it holds a title false, the orchestrator's word.

No stop: no string, element, `docs/` line or walker change; nothing for the owner.

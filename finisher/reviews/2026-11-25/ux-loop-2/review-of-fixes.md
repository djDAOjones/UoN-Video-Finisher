# Independent review of the night's first three fixes (VH-238, VH-241, VH-239)

A fresh Claude sub-agent, read-only, given the three commits and not the builders' conclusions, on 2026-11-25. It read the committed code at `ce9cd969` and ran the six changed test files (189 tests, passing). Its verdict: no bug in any of the three; three risks and four test gaps.

## VH-238 — no defect found in the code

- `chosenFile` is set in one place and every later reader asks it; the remaining reads of the picker's own list are correct. A drop, an empty `change`, a failed read, the discard question and a running check all behave as for a new file. The synthetic `change` cannot loop. "Previous video" is consistent across the card's title, Create's label and the saved card.
- RISK: the premise is unverified in a real Chrome. If a plain Cancel ever hands the list new `File` objects, every cancelled chooser would read the file again, reset the trim and name the result "Previous video". The check: pick the same file twice; open the chooser and cancel it (wish VH-238.1).
- NIT: the wiring is unpinned. Reverting the six readers or the `cancel` listener fails no test; only the three-term rule is tested.

## VH-239 — no defect found; one behaviour risk

- `settle()` cannot clear a refusal that is still true and cannot miss one; `paintLine` keeps `hidden` right; `fileChanged()` is guarded by node identity; `titleMovesOn` cannot fire during a job.
- RISK: `sayOnce` in `commitTrim` also quietens deliberate commits, not only repeated keys. Start and End both hold bad times; the user corrects End and tabs out; End's error empties, Start's is unchanged, the status is unchanged, so a screen-reader user hears nothing though Create is still withheld. Before, the sentence was said again. Remedy: say once only on the handle's key path; keep the plain status for a field's change and the Set and whole-video buttons.
- NIT: `runPreflight` still writes "Checking…" again after its pause.
- NIT: nothing pins the calls of `settle()`, `titleMovesOn()`, `fileChanged()` or the two compare-before-write changes in `src/main.ts`; their unit rules are pinned.

## VH-241 — no defect found on a desktop; one phone risk

- The Set buttons' rule matches only those two buttons; the error line loses nothing but weight; the scroll inset touches no scripted scroll (there is no `scrollIntoView` in `src/`); the dialog's horizontal centring is unaffected; `field-sizing` is floored by the box's `min-height` and ignored where unsupported.
- RISK: on a phone with Chrome's address bar showing, `100vh` is the large viewport, so a full-height dialog held at the top puts its last 40 px or so off screen; centred, it lost about 12 px at each end, inside its padding. Not confirmed on a device. Remedy: `100dvh` in the dialog's `max-height`.
- NIT: the narrow message box, 8rem, shows about four and a quarter lines.
- Every new stylesheet assertion fails if its rule is reverted; they pin declarations, not rendering.

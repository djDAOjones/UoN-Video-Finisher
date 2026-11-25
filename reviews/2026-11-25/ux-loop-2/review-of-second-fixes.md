# Independent review of the second batch of fixes (VH-243, commit `162c802c`)

A fresh Claude sub-agent, read-only, given the commit and not the builders' conclusions, on 2026-11-25. It ran the six touched test files (322 tests, passing) and the type check. Its verdict: no bug; three risks and four smaller points.

## The switches after Back or Forward

- Sound for its scope: every radio, checkbox and select in `index.html` has `autocomplete="off"`, the language switcher's builder is the only script that makes form controls, and the markup test fails if one control lacks the attribute.
- RISK: Chrome also restores a file input's selection after Back or Forward without a `change`, so the chooser would show a file name the page has not read. Not checked by the builder. Remedy: the attribute on the file input too.

## The trim's folded times

- No previously accepted input changes meaning; Arabic-Indic digits, a half, a ratio sign and Roman numerals are still refused.
- RISK: a Chinese keyboard in Chinese-punctuation mode types `。` for the decimal point, which the fold does not reach, so `1：05。5` is refused; a test pins that refusal on mistaken grounds. Remedy: fold that stop and its half-width form to a full stop.
- Smaller: the fold now accepts `5²` as 52 and circled digits; untested. A commit by Return leaves the typed full-width text while focus stays, as plain `75` already did.

## The held room

- No defect found: every path that takes a hold reaches a release, the Submission line's hold cannot be stranded, and only `height-hold.ts` writes the inline `min-height`, on three distinct elements.
- Smaller: where the first measure is less than a collapsed margin the computed room is negative and refused, so the card sits up to about 12 px low for the length of the check; `settle()` is not run again on a resize or language switch mid-check; a hold taken while the fields are hidden is 0 px. All transient.

## The progress brought into view

- No defect found: once per job, after the hand-on of focus, never behind the dialog; an `auto` inset is guarded; a scroll is not a change of context under WCAG 3.2.
- Smaller: in a window too short for the bar and Cancel together, under about 378 px high, the focused Cancel is partly out of view; the choice is documented.

## The moved error, and the stylesheet

- The IDs box's ids, its description and its script agree. Smaller: the staff card's Date field still has its helper before its error, so the two orders now differ.
- No cascade or specificity problem; the negative `scroll-margin-top` touches only scrolls that target `#main` itself.
- RISK, unconfirmed: on a dialog or backdrop that does not overflow, `overscroll-behavior` is honoured only by recent Chrome (the builder read it working in 156; older Chrome is no worse than before).

## The tests

- Each new test fails if its fix is reverted; the restated VH-240 pins are no weaker.

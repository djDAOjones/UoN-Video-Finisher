---
standard: Video Name Graphics house conventions — code style, naming, documentation, testing, patterns
source: project/digests/house-conventions.md
version: 2026-11-05, carried from the UoN Video Finisher's digest at 27f51dd, its DSP and loudness rules dropped
retrieved: 2026-11-05
next-check: 2027-05-05
licence: the owner's; a house digest with a repository source
---
# House conventions — digest

The owner's own standards, carried from the UoN Video Finisher at its
commit 27f51dd when this project was founded. The rules that served
only the Finisher's audio and media pipeline are dropped; everything
else is the Finisher's text, its examples adjusted to this app. Routed
by the rules file for every code change; a task that touches them names
the rule it applied at close (rule 8).

## Rules that bite here

### Code style

- TypeScript, `strict: true`, `noUncheckedIndexedAccess` on: an
  off-by-one in a pixel or frame loop is invisible at runtime.
- ES modules only. All imports at the top.
- Prefer pure functions over classes. Layout maths, timing and style
  resolution are pure; only the renderer, the encoder run and the UI
  hold state.
- No `any`. Where a browser API is ahead of its types, declare a narrow
  local interface and comment why.

### Naming

- Files: `kebab-case.ts`. Directories: lower-case, singular where it
  reads better (`config/`, `render/`).
- Units live in the identifier, always: `durationSeconds`, `widthPx`,
  `fadeMilliseconds`, `bitrateBitsPerSecond`. An unqualified number in a
  signature is a bug waiting to happen.
- Timestamps: WebCodecs works in **microseconds**. Say so in the name
  (`timestampUs`) whenever a number crosses a module boundary.

### Patterns to follow

- **Config is the only home for numbers.** Every size, duration,
  bitrate, margin and colour lives in `src/config/`, a brand pack or a
  CSS token. A literal anywhere else is a defect, not a style
  preference.
- **A brand is data.** A brand pack holds its tokens, assets, words and
  styles; code reads the active pack and never names a brand.
- **The worker owns the job; the main thread owns the UI.** No DOM in
  the worker; no encoding on the main thread.
- **Transfer, never copy.** Buffers and frames cross the worker
  boundary as transferables.
- **Fail loudly.** Text a style cannot draw (a glyph its font lacks, a
  line too long to fit) is shown before the graphic is made, never
  silently clipped or substituted.

### Patterns to avoid

- Reaching for a library. Each runtime dependency is a decision.
- Exposing a technical setting "just in case". Every exposed control is
  a decision a novice is forced to make.
- Branching on a brand's name in code instead of reading the pack.

### Minimal change discipline

- Don't reorganise code you weren't asked to touch.
- Don't add or remove comments in code you weren't asked to touch.
  New code should follow the documentation rules below.
- Don't introduce new abstractions for a single use case.
- Match existing style (indent size, quote style, semicolons, etc.).
- Avoid speculative abstractions unless there is duplication, unstable
  logic, or a clear reuse case.

### Code documentation

JSDoc is the standard.

- New and modified functions, classes, and modules should have
  meaningful comments explaining **why**, not restating **what**.
- Use **JSDoc** for exported functions, classes, and modules. Document
  purpose, parameters, return values, and side effects.
- Comments are for AI agents first and future humans second. Write
  them to provide context that is not obvious from the code alone.
- Do not add boilerplate or redundant comments that restate the code.
  Every comment should earn its place.
- A file copied from the Finisher keeps its comments and says, in its
  header, the Finisher commit it came from.

### Testing

Tests protect invariants — behaviours that would do real damage if they
silently broke. Write a test to prove an invariant, not to chase a
coverage number.

**Named categories, never "add tests" in the abstract.** When a change
warrants tests, cover the categories that apply: happy path, empty,
error, boundary, permission/gating, regression (one per fixed bug), and
a persistence round-trip for stateful changes. **"Not applicable" is a
valid outcome.**

**Fast and hermetic.** Prefer in-process injection, fakes and temp
directories over live servers and real I/O.

**Two layers.** The automated safety net never replaces the manual gate
(real browsers, Clipchamp, the Xerte upload). Name what only a human
can verify.

**Hard rules.**

- Run build and tests after every change; if no runner exists yet,
  verify manually and note what was checked.
- Never silently delete, skip, or weaken a test to make a change pass.
- Never write hollow tests (assertion-free, snapshot-everything, or
  mocking the unit under test).
- Rigour ramps with maturity; before invariants stabilise, deferring
  tests and saying so is correct.

### Anti-patterns to reject

- Mocking `VideoEncoder` in a test. A mocked encoder proves nothing
  about whether the real one accepts the config.
- Anything needing `SharedArrayBuffer` or COOP/COEP headers: Xerte and
  GitHub Pages cannot send them.
- A UoN name, logo, typeface or colour outside `brands/uon/`.
- Hard-coding a size, duration, bitrate or colour outside `src/config/`,
  a brand pack or a CSS token.

## Checklist by task type

### Documentation

- JSDoc on everything exported.
- Every magic-looking constant in `config/` or a pack carries a
  one-line comment saying where the number came from. If the answer is
  "we chose it", say that too.
- Skip JSDoc on trivial internal helpers.

### Testing

- Runner: **Vitest**, in Node, for the pure modules.
- Anything touching WebCodecs, canvas rendering or the File System
  Access API is verified in a real browser and the check is recorded.
- Invariants this project must protect, in priority order:
  1. Nothing typed leaves the device.
  2. The neutral build carries no UoN branding.
  3. Every output keeps its transparency, at the size asked for.
  4. Every page colour pair meets its contrast in every brand pack.

### Commit messages

`ID: summary`, the ID from the backlog, and a `Verify:` line with the
gate's result.

### Tooling

- Bundler / dev server: **Vite**; test runner: **Vitest**; types:
  `tsc --noEmit`
- Linter: **ESLint** + `typescript-eslint`, strict on correctness,
  taste rules off
- Formatter: **Prettier**, never a `check` failure; Markdown is out of
  its scope, markdownlint governs it
- Docs: `markdownlint` + `check-links.mjs`

## Exceptions recorded

- none yet; an exception is a decision in project/decisions.md

## Deeper references

- The Finisher's house-conventions digest, at
  `../2026-08-24 UoN Video Helper/project/digests/house-conventions.md`,
  the source of this one
- [The project's rules](../rules.md)

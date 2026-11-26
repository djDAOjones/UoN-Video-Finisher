# VH-244 — evidence note

Two absent regression tests the record asked for (wish lines VH-193.2 and VH-215.3), written with no product change. Builder's note, 2026-11-25. Paths are relative to the repository root. The browser was not opened.

## Files

| File | State | Why |
| --- | --- | --- |
| `src/audio/gain-solve.test.ts` | new, 37 lines | The solver's stop on a limited pass that measures no level, proved on the solver alone. |
| `src/media/audio-plan-bite.test.ts` | new, 248 lines | The bite at the plan level, through the real `planAudio`: no figure on digital silence, no figure when a limited pass measures no level, and the figure under a ceiling the encode lowered. Made from the kept probe. |
| `src/workers/job.worker.test.ts` | new, 273 lines | The release guard through the worker's own message path. The first test to import the worker module. |
| `test/helpers/pcm-mp4.ts` | changed, +30 −2 | One optional option, `level`, so a test can ask for a tone or digital silence. Without it the helper fills every block with 1000 exactly as before; its three other users (`sub-block-sound`, `ends-early`, `matroska-cut` tests) pass unchanged. |

No product file, `index.html`, stylesheet, config, language table or `project/` file was touched. `git status --short` shows the one changed helper and the three new test files, nothing else. The optional rider was not taken: `job.worker.ts` is untouched and wish VH-235.1's literal stays for the owner.

One choice to name: the helper was extended rather than a second PCM muxer written inside the new test. It is a test file, not a product file, but it is a changed file, not an added one. If "add only" was meant strictly, the 25 lines move into `audio-plan-bite.test.ts` with no other change.

## VH-193.2 — what each test pins and what it would catch

Line numbers are the product's as read tonight.

### `src/audio/gain-solve.test.ts` (2 tests)

`stops at the first estimate, with nothing measured` for a limited pass of −∞ and of NaN. The measure function is injected, as the solver's design allows, so no chain is involved.

- Pins `src/audio/gain-solve.ts:118` (`if (!Number.isFinite(measured)) break`).
- Asserts the calls made were exactly `[null, target − unlimited]` and the whole solution: that gain, `measuredLufs: null`, `refinementPasses: 1`, `converged: false`.
- Without line 118, −∞ gives an error of +∞, a bounded 6 dB step, and five more passes: the call list and `refinementPasses` both fail. NaN gives a NaN step and a NaN gain: `gainDb` fails.

### `src/media/audio-plan-bite.test.ts` (5 tests)

The real `planAudio` over in-memory PCM MP4s. Two modules are wrapped, never replaced: the real `AudioChain` is subclassed to note each pass's gain, ceiling and input, and in one case to blank a limited pass's output (no real signal measures a level unlimited and none limited); the real `limiterCeilingFor` stands and only `CodecProbe` is stood in, since Node has no WebCodecs encoder.

**(a) `is no figure for digital silence, which no limited pass ever hears`** — one second of zeros.

- Asserts: the source's integrated loudness is not finite; `plan.gainDb` is 0; the only chain pass is the measuring one; `plan.limiterBiteLu` is `null`; the `chain planned` log line's `limiterBiteLu` is `null`; no production warning follows.
- Catches a change to `src/audio/gain-solve.ts:96` (silence gets no gain and no limited pass: without it the gain is +∞ and limited passes run, failing the gain and the pass list) and to `src/media/audio-plan.ts:473–476` if the conditional's `null` arm came to return a number.
- Proof by reasoning from the assertion. `plan.limiterBiteLu` is returned at `audio-plan.ts:520` and written only at `:473–476`: `limited !== null && isFinite(limited) && isFinite(solution.unlimitedLufs) ? unlimitedLufs + gainDb − limited : null`. The test first shows the source measures no level and that the plan's gain is 0 with no limited pass run: that is the solver's early return (`gain-solve.ts:96–104`), taken only when `unlimitedLufs` is not finite, and it leaves `limited` at `null`. Take the guard away and the arithmetic is `−∞ + 0 − null`, which JavaScript evaluates to −∞: a number, so `toBeNull()` fails. Honest limit: three guards overlap on silence, so this case alone does not say which one does the work; removing any single one still gives `null` here. Case (b) is the one that isolates `isFinite(limited)`.

**(b) `is no figure when the limited pass measures no level, and the solver stops there`** — one second of a speech-like tone, the limited pass's output blanked to silence, then to NaN.

- Asserts: the unlimited loudness is finite; exactly one limited pass ran, at `plan.gainDb`; that gain is finite; `predictedOutputLufs` is `null`; the bite is `null` in the plan and in the log; no production warning follows.
- Catches `src/audio/gain-solve.ts:118` at the plan level (six limited passes instead of one, or a NaN gain) and `src/media/audio-plan.ts:474`'s `Number.isFinite(limited)`.
- Proof by reasoning. `chainLufs` is assigned at `audio-plan.ts:458` on every limited pass, before the solver sees the figure, so here `limited` is −∞ (or NaN), not `null`. Without `isFinite(limited)` the bite is `unlimited + gain − (−∞)` = +∞: `toBeNull()` fails, and `detectProductionWarnings` would say `heavy-limiting` (+∞ > 3), which the last assertion also fails on. With NaN the bite is NaN: `toBeNull()` fails (the log line would still round to `null`, so the plan's own value is what catches it).

**(c1) `measures the probed gain again under the lowered ceiling, and takes the bite there`** — two seconds of the same tone, a stood-in probe reporting a 2.5 dB overshoot and no loudness cost.

- First plans the same file with no encoder and asserts it converges on its first limited pass under the standing ceiling (two chain passes). That is the precondition that makes the next assertions bite.
- Then asserts: `plan.limiterCeilingDbtp` is `limiterCeilingFor(2.5)` and lower than `LIMITER.ceilingDbtp`; the passes ran as measuring, probed at the standing ceiling, the same gain again at the lowered ceiling, every later pass at the lowered one, the last at `plan.gainDb`; the plan's bite equals, to six places, the bite of a fresh real chain at the plan's gain and lowered ceiling over the same input; that figure is more than 0.05 LU above the standing ceiling's at the same gain; the logged bite agrees to two places.
- Measured tonight: bite 0.5166 LU at −5 dBTP; the unencoded plan's bite 0.0592 LU at −3 dBTP; passes `[null, −3] [14.068, −3] [14.068, −5] [14.511, −5]`.
- Catches `audio-plan.ts:448` (the ceiling not lowered: the ceiling assertion fails), `:416` (a pass not reading the current ceiling: the pass list fails) and `:454` (not measured again: the solver would accept 14.068 dB on the standing ceiling's figure, the plan would carry the −5 ceiling with a 0.06 LU bite, and both the pass list and the six-place comparison fail).

**(c2) `takes the bite from the chain's own loudness, never the loudness after the codec`** — the same, with a 0.2 LU cost.

- Asserts `predictedOutputLufs` is the fresh chain's loudness less 0.2 (so the cost is really in play) and the bite is still the fresh chain's.
- Catches a change of `audio-plan.ts:470` or `:475` to the solver's figure (`solution.measuredLufs`), which would add the cost to the bite. Not asked for by name, added because no other test passes an encoder config and so none could see it. Measured: bite 0.5688 LU against 0.2146 at the standing ceiling.

Signal lengths are the shortest that exercise each path: 1 s for (a) and (b), since a plan needs one 400 ms gating block decoded; 2 s for (c). All are deterministic: computed samples, no random source, no timers.

## VH-215.3 — what each test pins and what it would catch

`src/workers/job.worker.test.ts` stands in the worker's global scope (`self.postMessage`, `self.addEventListener`, and `globalThis.addEventListener` for the error capture), mocks five modules Node cannot run (`../media/inspect`, `../media/pipeline`, `../media/opfs`, `../media/title-card-frame`, `../media/output-integrity`), imports the module afresh per test and delivers real protocol messages. The guard's predicate (`cardTellsMade`), `JobFailureError` and `classifyFailure`, `RetainedResults` and `CancellationRegistry` are the real ones.

**`refuses a submission whose encode made …: one failure, nothing kept`**, twice: a made length of 7.04 s against a card saying `0:10`, and no length at all (`null`).

- Asserts: the reply is `failed` with code `unknown` (the code the guard throws with, `job.worker.ts:289`); `runPipeline` was called once (refused after the encode, not by the earlier "no length made" check at `:251`); the finished file's read-back was never started; the worker's own log, drained by a `drainLogs` message, holds the guard's warn line with the made length; the workspace's `dispose` was called once and before the `failed` reply was posted; a `discard` naming the job's id is answered `discarded` and disposes of nothing more; the job's only reply, at the end, is that one `failed`.
- Catches: the guard removed or inverted (`:282`: the reply becomes `processed`); the guard moved after `finished.retain` and the post (a `processed` reply appears); the catch's `workspace.dispose()` removed (`:377`: zero calls); the guard's code or its log line changed (`:283`, `:289`).
- The mirror test is this one's control: same stubs, only the made length differs, so the refusal is the guard's and not a stub that fails the job by accident.

**`lets a submission go whose encode made the length its card says, and keeps it`** — 10.4 s, which prints `0:10`.

- Asserts: `processed`, with the job id the workspace was opened under; the read-back ran; no guard line in the log; `dispose` not called; then `discard` disposes once, which is what shows the result was retained; one reply only.
- Catches: a guard that refuses a true card; `finished.retain` removed (`:358`: the discard would dispose of nothing).

**`holds no other job to it: without a Submission card, any length made is let go`** — no card, then a staff card, each with no made length.

- Catches a guard that loses its `layout === 'submission'` condition (`:250`). Not asked for by name; it is the guard's third arm and cost four lines.

### What could not be pinned from outside, and why

- **"Nothing retained" is inferred, not read.** The protocol has no message that asks what is retained. The test reads it through `discard`: answered, and `dispose` not called again. The mirror case shows the same message does dispose when something is retained.
- **`finished.forget(jobId)` at `:376` is not pinned by the refusal.** The guard throws before `finished.retain`, so there is nothing for it to drop; removing it would not fail these tests. It matters for a cancel between retain and post, which is not this item.
- **The order of dispose and reply is call order only.** The test shows `dispose` was called before the reply was posted, not that the worker awaited it.
- **The working store is stood in.** Node has no OPFS: that a real directory is removed is the browser's to show (`spike-opfs.html`, the acceptance run).
- **The made length is given, not measured.** `runPipeline` is stood in, so the test pins what the worker does with the encode's `madeSeconds`, not how the encode arrives at it (`ends-early.test.ts` covers the arithmetic).
- **No real worker boundary.** Messages are handed to the listener directly: no structured clone, no real `self`.
- **Two assertions rest on English log wording** (`the card would misstate the length made`, and the `chain planned` line in the bite test, as `sub-block-sound.test.ts` already does). A rewording of either line needs the test's constant changed with it.

### Isolation

- Every test calls `vi.resetModules()` and imports the worker afresh, so `finished`, `running` and the logger buffer are new each time.
- `afterEach` calls `vi.unstubAllGlobals()` (restoring `self` and `addEventListener`, both `undefined` in Node 24 before the stub) and `vi.resetModules()`.
- The stand-in functions are reset before each boot (`vi.resetAllMocks()`); `vi.mock` is scoped to its file, and the project runs files isolated (Vitest's default; `vite.config.ts` does not change it).
- The neighbour run below, 33 files, shows nothing else moved.

## Commands and results

| Command | Result |
| --- | --- |
| `npx vitest run src/media/audio-plan-bite.test.ts src/audio/gain-solve.test.ts src/workers/job.worker.test.ts`, run 1 | 3 files, 11 of 11 passed, 545 ms; slowest test 159 ms |
| the same, run 2 | 3 files, 11 of 11 passed, 560 ms; slowest test 175 ms |
| the same, run 3 | 3 files, 11 of 11 passed, 539 ms; slowest test 155 ms |
| `npx vitest run src/media src/workers src/audio/gain-solve* 2>&1 \| tail -15` | 33 files, 441 of 441 passed, 1.43 s |
| `npm run typecheck` | clean |
| `npx eslint src/workers/job.worker.test.ts src/media/audio-plan-bite.test.ts src/audio/gain-solve.test.ts test/helpers/pcm-mp4.ts` | clean, no warnings |

The slowest test in every run is the worker's first, which pays for the module's first import (155–175 ms; 251 ms on its very first run). The slowest DSP test is (c1) at 116–125 ms. Two analysts were driving the dev server throughout.

Not run, by the brief: `npm run check`, `npm test`, `npm run build`, `node tools/check.mjs`, any git command that changes anything.

## Not done, and for a person or the full gate

- No product code was edited to prove a test fails; the proofs above are by reasoning from the assertions, as asked. A mutation run on a settled machine would turn them into observations.
- The full gate is the orchestrator's. These are new test files, so the gate's test count rises by 11.
- The two new files were formatted with Prettier; the helper already passed it.
- Wish lines VH-193.2 and VH-215.3 are paid off by these tests if the orchestrator agrees; VH-193.2's other sentence (the feedback report's 140-character clip) is a statement of fact in the line, not work. `project/` was not edited.

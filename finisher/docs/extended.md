# The extended pack: setup, recipes and formats

<!-- cspell:ignore Guidepup guidepup veraPDF verapdf XCUITest Espresso ffprobe a11y simctl avds TalkBack -->

Not a routed document: read it when a project on `Accessibility
testing: extended` sets up a machine, runs a recipe or hands a result
to the extended command. The command is `npm run a11y:extended`; the
doctor is `npm run a11y:doctor`. Neither installs, downloads or changes
a permission; every install below is the owner's, on his word, outside
the gate, and the browsers go in the user's Library cache, never in a
synced folder.

## The attended VoiceOver setup, once per machine

1. VoiceOver Utility, General: switch on "Allow VoiceOver to be
   controlled with AppleScript". The doctor reads the setting and
   reports vo blocked while it is off.
2. From the project, with the Guidepup packages installed, run
   Guidepup's two commands, as its README gives them:
   `npx @guidepup/setup setup --macos-ignore-tcc-db` configures macOS
   once per machine without writing the system permission database
   (never switch SIP off), and `npx @guidepup/setup install` fetches
   the VoiceOver preferences asset from Guidepup's GitHub release (a
   github.com download, on the owner's word). Grant in person what
   macOS asks of the app that runs the doctor, a terminal or the agent's
   app: Accessibility; Automation of VoiceOver and of each browser
   (Playwright for WebKit, Chromium); and Full Disk Access, since
   Guidepup links its preferences into VoiceOver's group container,
   which macOS otherwise refuses without a prompt (heard 2026-10-29).
3. Run the doctor. Its spoken canary starts VoiceOver through Guidepup
   (whose start writes VoiceOver preferences of its own), hears a
   phrase and stops it; vo reads ready only when a phrase was heard.
   The canary runs only once the setting reads on; `--no-canary` skips
   it. The run
   then needs a headed Chromium and WebKit, the keyboard free and
   nothing else speaking: run it attended, serially.
4. The first live run is the first reading of each journey's expected
   phrases, and of each phrase bound to a step (`{ phrase, step }`,
   step 0 the entry, a wait binding nothing). A phrase changed after it names the speech log it was
   changed from, and never drops what a claimed row needs heard.

## Recipes: methods the doctor checks and a session runs by hand

Each writes one result file into a results folder; the command copies
it into the run with `--results <folder>` and refuses a file for a
method the doctor reports blocked. The folder is read, and refused for
a file that is not JSON, a method a session does not make by hand, a
second file for a method or a method the doctor blocks, before the run
folder is made, so a refusal leaves none behind; a refusal after the
folder exists names it. A file is `{ "method", "date",
"rows": { "<id>": { "state", "note" } }, "note" }`; a tool's date is
the run's date, a human's or a record's may be earlier.

- **pdf** (needs Java and veraPDF on PATH): for each PDF the product
  offers, `verapdf --flavour ua1 --format json <file>`; rows 1.1.1,
  1.3.1, 1.3.2, 2.4.2, 3.1.1 and 4.1.2 pass when the report shows no
  failed rule for the matching clause, fail naming the rule and file.
  PDF/UA alone never establishes WCAG conformance; the note says which
  files were checked.
- **ios-audit** (full Xcode selected, a simulator available): an
  XCUITest that calls `performAccessibilityAudit` on each screen;
  rows SUP03, N02 and N06 from the audit's issues, the device and OS
  named in the note.
- **android-checks** (an SDK with a device or emulator image): Espresso
  with `AccessibilityChecks.enable()` on each screen; rows SUP03 and
  N06 from the check results.
- **native-journey** (either platform ready): authored XCUITest or
  Espresso journeys on a simulator or emulator for 1.3.4, 2.5.4, SUP02,
  SUP04, N01, N02, N03 and N07; never real VoiceOver or TalkBack use.

## Formats the command reads from the results folder

- **sheet** (`"method": "sheet"`, a `reviewer` field): the optional
  review sheet, offered at the keep decision, never required; rows
  pass, fail or unverified with the reviewer's note. A fail fails the
  row; a pass is shown, never counted as a check.
- **participation** (`"method": "participation"`): row P08 pass with
  the date and a note of who took part, or fail; recommended, dated,
  never gated. The report's footer takes its date.
- **ai-review** (`"method": "ai-review"`): the candidates file the
  session step writes from the material in the run's ai-review folder
  and the speech logs, starting from the candidates template there: a row is
  `candidate` with a note naming what and where, `reviewed` with a note
  of what was looked at when the review flagged nothing, or `not_run`
  when it was not looked at; never a pass (ruling 12), and a reviewed
  row's status is unchanged. Label it heuristic in the note.

## At phase close and the keep decision

With `Accessibility testing: extended`, Phase close (verbs/close.md)
and the keep decision run `npm run a11y:extended` in full, an `--only`
run being a diagnostic, before the phase is marked closed. Then keep
the run folder at the bundle path run.json names; review
coverage-next.json and apply it to project/a11y/coverage.json by hand,
keeping unrelated coverage changes; run `node tools/a11y-coverage.mjs`
and `node tools/check.mjs`; and record the run's date and outcome —
passed, failed, blocked, empty or errored, as the summary gives it — in
the close's entry. A run that left no valid proposal records its
outcome and advances no date. The command's exit is no veto: failures
follow the project's decisions and backlog, and VoiceOver stays
attended and serial, never arranged for an unattended runner.

## What the command writes in the checkout

Only the project's summary file for the view, project/a11y/summary.json. The run folder stays
outside the checkout; `coverage-next.json` beside it is the proposal
the phase-close session applies by hand, keeping the run folder at the
bundle path run.json names.

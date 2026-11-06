<!-- markdownlint-disable -->

# VH-222 — Codex astra's blind design check

You are checking the design of a check item, blind: you are given no other model's reading. Work read-only. Answer in English, at most about 900 words.

**Repository:** the current directory, at commit ca093da (`git rev-parse HEAD`). The item is `project/items/VH-222.md`; read it whole: every criterion in it is yours to answer. The owner's words that govern it (verbatim): "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" (group B covers a new fault or scenario named and qualified by VH-198's method); "Gateless covers the rest of Phase 8"; "Yes, leave them" (rows pinning the old page order fail and stay failing).

**You may read:** the repository (git history included: the three wish lines' text is at `446f702^:project/wish-list.md`, lines 46–48; VH-155 is 9d033ec, VH-156 16e49eb, VH-158 d17a46e); the walker at `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/` (`scenarios.mjs` with `SCENARIOS`, `PLANS`, `SOURCE_ONLY`; `faults.mjs`; `parts.mjs`; `fixtures*.sh`), read-only; VH-199's summary in `reviews/2026-10-25/design-pass-3/evidence/measurements/matrix-2026-10-27.md` and `matrix-coverage-2026-10-27.json`; VH-199's full records in `/Users/joe/UoN-Video-Helper-evidence/pass3-vh199/runs/` (one JSON per cell, `S-xx__lang__view__mode.json`). Derive the rows yourself; no list is given. **You may not read** anything under `/Users/joe/Library/Application Support/Claude/side-session-notes/`, nor, in `/Users/joe/UoN-Video-Helper-side/`, any `vh222-claude-*`, `vh222-*compare*`, `vh222-progress.md`, `vh222-handover-*` or any `vh222-*brief*` but this one.

**Facts given:** VH-199 ran source a3039c3 at walker revision 2e7b0c044ce11f2b; the base's walker is revision 9c52269607bccc4c. The walk is VH-203's stage rule: each row at 1280, 375 and 320 px, in en-GB, zh-Hans and ms-MY, in light, dark, forced light and forced dark. A new scenario may be defined in memory by a driver that runs the walker's `matrix.mjs` unchanged on a plan in memory with a read-only probe (no walker file changed); a change to a walker file beyond what the criteria name is a stop for the owner. `samples/` is never written; a cut or audio-only file needed is made outside the repository.

**Answer each, with file:line evidence:**
1. **The rows.** Which concrete string keys do the three wish lines' groups name? Derive them yourself from the commits and the tables. Give the count, and the cell count under the stage rule.
2. **Reach.** For each row, which existing scenario (with its fault and fixture) reaches it, if any. Which rows does no existing scenario reach? For each of those, is there an existing fault plus an existing fixture or helper that would reach it as an in-memory scenario, or would it need new fault code, a new fixture, or is it unreachable from the page (say why)?
3. **Mapped first.** Which of VH-199's records can be cited as already reading a row, given the source changes between a3039c3 and ca093da (`git diff a3039c3 ca093da -- src index.html`)? State the rule you would use for "where the condition matches", and which rows or containers it excludes and why.
4. **The cut-short warning.** On a cut MKV or WebM, what do the source panel, the warning and the finished record say about the file's length, by the code? Is anything false beside the warning, by your reading of the code alone (the walk will check the page)?
5. **What a reading must record** so that "shown whole, in place and true of the state it names" can be judged per row per cell, and how 4.1.3 and 3.3.1 are judged for these rows.
6. **Sizing.** The item is sized at about 45k of work. What should a row that needs new fault code do: be built now, or stay outstanding as a wish line naming why? Name the risks either way.
7. **Anything else** the design must settle before walking, including timing-dependent scenarios and load.

End with a one-line verdict: "design sound", "design sound with changes: …", or "design unsound: …".

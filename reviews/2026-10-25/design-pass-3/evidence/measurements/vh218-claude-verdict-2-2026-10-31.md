<!-- markdownlint-disable -->

# VH-218 #2 — Claude's reading of the repair and the new table, saved before Codex's re-check

**Repair (ruling 1).** Two rules in the existing 19.99rem query; no new query, element or string; strings proof same; tests 1,655 pass, 1 skipped. PASS on the evidence: label words broken 2,028 → 0 in 432 S-82 cells a side, 3,024 readings; no word wider than its column; 0 page overflow, 0 past the row; the default font at 320 px is not reached by the query. The fallback stays. At 32 px on a phone the mark is above its label, in DOM order. No visual look at a true 32 px page: the page shot does not show it (the walker's capture effect), so that layout rests on the probe's boxes (mark top 42 px above the label top, left aligned to the row). A small residual, named.

**S-103 warned (ruling 2).** Walked both sides, 108 a side, F17 and S-103's own setup, reached 216 of 216 with the aac row warned. Row identical 108 of 108. Export: `git archive`, linked deps, own Vite, proof 12 of 12 whole-probe identical to `before-s103`. One thing I would have Codex test: the panel is closed in those cells, so the labels there read 0 lines; S-103's row is what the ruling asked. Pending and failed cannot coexist: read from the code, cited. PASS. A small imprecision in the page: "with its top lower by the warning above it" holds for most cells, not all (top moved 0 in some). No reading rests on it.

**One diff (ruling 3).** All six `after2-*` groups share diff hash 42524f71231cf37f and src diff aafc920774356ab5. PASS. Set-aside groups named.

**Mark's assignment (ruling 4).** VH-230 carries it, next free by `git grep` (VH-228 has a prior use in reviews, so skipped). Not yet written: a close step. Repair moves part of it: at 32 px on a phone the mark no longer breaks; the rest stands, and at 32 px on 1280 "Tidak" breaks in 48 px. The mark's list in the page's generated lines is by language and condition, not width, so "after" still lists font32 from 1280.

**Load and power.** after2-s103 8 of 18 samples at 8+, peak 40.41; layout not timing; row identical. I would not re-run; the orchestrator's ruling if asked. Battery after, AC first five befores, all mode 2; no crossing.

**Verdict: PASS on rulings 1 to 3,** the close still to come.

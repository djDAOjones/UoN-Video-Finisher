<!-- markdownlint-disable -->

# VH-223 — Codex astra's blind verdict brief (the Mac Pro's walk)

You are Codex astra. You are giving a blind verdict, read-only, for item VH-223 of the UoN Video Finisher. You work from the worktree at the current directory, `/Users/uazjob/UoN-Video-Helper-side/vh223`, on branch `side/vh223`.

**The candidate** is the working tree's uncommitted change against HEAD `95d18eed5db1ae56d1fe6512053bad714357d899`. Run `git diff` to see it: one file, `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/matrix.mjs`. Its diff hash is `1c683ffb940e364a`, by `git diff --binary | shasum -a 1 | cut -c1-16`. The walker revision is `9c52269607bccc4c` before and `e377132ba6f70227` after. HEAD differs from `ca093da0c8c5` (VH-225 commit 2) only in `tools/`, `verbs/`, `AGENTS.md` and `project/`. This is a check item: there is no product diff, and the only change is the walker's exact key list that the item's criteria name.

**The item:** `project/items/VH-223.md`; every criterion in it must hold. **The keys:** `reviews/2026-10-25/design-pass-3/evidence/measurements/unrun-2026-10-27.json`, `stillUnrun`.

**The owner's words,** in `/Users/uazjob/UoN-Video-Helper-side/plan8-owner-words.md`, read by `sed -n`:
- `:275`: "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" (group B covers this item).
- `:366`: "Yes, leave them" (the walker rows pinning the old page order stay failing until VH-203).
- `:185`: "Gateless covers the rest of Phase 8".
- `:395`: "gateless run where possible".
- The last entry, 2026-11-05: every cell is walked again on the Mac Pro, so each table rests on one machine. The MacBook Pro's records are support only, never mixed in. A defect becomes a fix item planned by the orchestrator.

**The machine:** the owner's Mac Pro 2019 (Xeon W-3223, 8 cores, x86_64, macOS 26.5.1), Chrome 157.0.8103.39, on AC Power. `pmset` here prints no powermode line, and the launchers accept "AC Power" with no powermode line, by Orchestrator #39's ruling. This Mac's ffmpeg build changes 33 of 36 fixtures' sha1s: `vh223-walk/fix-compare.txt` and `fix-mac-pro.sha1.txt`.

**The evidence** is all in `/Users/uazjob/UoN-Video-Helper-side/vh223-walk/`:
- **The key proof:** `keys-a.mjs` and `keys-a.txt`; each group's list `keys-a-<group>.txt`; the walker change's proof, `proof-keys.zsh` → `proof-keys.out.txt`.
- **The launchers and driver:** `seq.zsh`, `go.sh`, `walk.sh`, `wait-seq.zsh`, `pilot-wait.zsh` and `vh223-driver.mjs`.
- **This Mac's groups:**
  - Each group has `<group>/conditions.txt`; `<group>/runs/<run>/S-*.json` (one record per key, with `manifest.json`); `<group>.load.log` (samples every 30 s: time, 1-minute load, source); and `<group>.launcher.log` (its GO line).
  - `after-pilot` (`keys-a-pilot3.txt`, 23 keys) is the fixture proof, outside the 108. Orchestrator #39's word: each ID is proved on its new fixture when its pilot record is ok, reached and its asserts pass.
  - `after-a1` to `after-a7` hold 15, 27, 15, 15, 15, 15 and 6 keys, which is 108.
- **Neutral summaries:**
  - `sum-a.mjs` → `sum-pilot.txt` and `sum-a1.txt` to `sum-a7.txt`.
  - `cd-a.mjs` → `cd-all.txt`, every non-passing row by instrument. You can run it yourself: `node cd-a.mjs . keys-a.txt after-a1,after-a2,after-a3,after-a4,after-a5,after-a6,after-a7`.
- **Earlier readings of the same rows:** `reviews/2026-10-25/design-pass-3/evidence/measurements/digest-*-2026-10-27.md` and `matrix-2026-10-27.md`; `reviews/2026-10-25/design-pass-3/judged-2026-10-27.md`; and the wish list, `project/wish-list.md`.

**The orchestrators' rulings:**
- **S-24 (#40, carried from #39):** "S-24 on still-10800s.mp4 reads veryLongJob here, recorded as not reached by speed, nothing changed." S-169 is VH-222's item.
- **Load (#39, #38):** a group starts with the 1- and 5-minute loads below 8. A group with samples at 8 or above re-walks its timing-dependent keys at low load. A re-walk identical to its first walk is cited, and the first walk stands. A re-walk that differs stands itself, and the difference is reported.
- **This walk's load samples at 8 or above:**
  - a5: 8 of 120 samples, 04:38:59–04:42:30Z, peak 11.41.
  - a6: 2 of 51 samples, 05:44:09 and 05:44:39Z, peak 12.34.
  - Every other group had none.
  - The re-walks have not run yet: they wait their turn for the lock behind three sibling walks. Judge which keys should be re-walked, and why.

**What you may read:** whatever you need of the above; `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/` read-only (`matrix.mjs`, `scenarios.mjs`, `runner.mjs`, `qualify.mjs`, `faults.mjs`); `UI-STANDARDS.md`; `project/digests/wcag-2.2-aaa.md`; and `src/` and `index.html` read-only.

**What you must never read:**
- any folder under `side-session-notes/`;
- in `/Users/uazjob/UoN-Video-Helper-side/`: anything whose name starts `vh223-claude`, anything matching `vh223-*compare*`, `vh223-progress.md`, `vh223-handover-*`, or any `vh223-*brief*` except this one;
- in the walk folder: `judge-a.mjs`, `judge-index.txt`, any `*.jsonl` index, or `macbook-pro/` (the other machine's records, support only).

Change nothing.

**Answer each point, citing file and line or record:**

1. **The walker change:** does `matrix.mjs`'s diff add only the exact key list the criteria name? Does it refuse what it should, and change no other caller's behaviour? Does `proof-keys.out.txt` qualify it: the 108, the 106 complement, the byte-equal declarations and the unchanged runs? Can VH-224 pass its own 106 keys the same way, with no second filter?
2. **The keys:** are they exactly the item's 108 (42 + 24 + 24 + 6 + 6 + 6)? Was each walked once in the counted groups, in its own language, view and mode, with its scenario's assertions and every declared instrument?
3. **The fixture proof:** which IDs does the pilot prove on this Mac's fixtures, and which does it not, and why?
4. **Each acceptance criterion:** met, not met, or not yet (a task for the close), with the evidence.
5. **Every key's judgement:** OK, NOT-OK, not reached or unresolved. List each key that is not OK yourself, from the records.
6. **Attribute every key that is not OK,** by row, allowing more than one cause. Use one of these causes:
   - a known product issue (linked);
   - the old-order rows (wish VH-216.1);
   - a known instrument or scenario reading (linked);
   - a new product defect (it would need its own fix item before VH-203);
   - a new instrument, fixture or selection failure;
   - environment, speed or timing;
   - unresolved interpretation.

   Name the record, the row and the evidence for each.
7. **The cannot-determine rows:** for each class, is it settled by a documented reading (and which), or is it unresolved?
8. **The conditions and the re-walks:** each group's power and its loads at start; its samples at 8 or above; any voids. Which keys must be re-walked, by the rule above, and why could each depend on timing? Does any reading rest on timing it cannot carry?
9. **WCAG:** for 1.4.3, 1.4.4, 1.4.6, 1.4.10, 1.4.11, 1.4.12, 2.3.3, 2.4.7, 2.4.13 and 2.5.5, which instruments exercise each in batch A, and which does batch A not reach?
10. **Anything the close must carry:** wish lines (each checked absent first), a fix item, the report's Disposition row, VH-172.1's line (narrowed by VH-224, not here), the decision, and what the measurement table must say.

End with a verdict: pass, pass with conditions, or fail, and a short list of what must hold. Be concrete and brief.

<!-- markdownlint-disable -->

# VH-224 — Codex astra's blind verdict brief (the Mac Pro's walk)

You are Codex astra. You are giving a blind verdict, read-only, for item VH-224 of the UoN Video Finisher. You work from the worktree at the current directory, `/Users/uazjob/UoN-Video-Helper-side/vh224`, on branch `side/vh224`.

**The candidate:** HEAD is `57a55ddcbf9ec56adcff0626155e903c087de0d5`, VH-223's landing. There is no tracked change: `git diff` is empty, with diff hash `da39a3ee5e6b4b0d` by `git diff --binary | shasum -a 1 | cut -c1-16`. The untracked evidence is the measurement table `reviews/2026-10-25/design-pass-3/evidence/measurements/vh224-matrix-b-2026-11-05.md` and its records folder `vh224-records-2026-11-05/` beside it. This is a check item: there is no product diff unless it finds a defect, and no walker change. The walker is `reviews/2026-10-25/design-pass-3/evidence/measurements/walker/`, revision `e377132ba6f70227`, unchanged. Its `matrix.mjs matrix --keys <file>` is VH-223's interface.

**The item:** `project/items/VH-224.md`; every criterion in it must hold. **The keys:** `reviews/2026-10-25/design-pass-3/evidence/measurements/unrun-2026-10-27.json`, `stillUnrun`, less batch A (VH-223's `vh223-records-2026-11-05/keys-a.txt` and `vh223-accepted-a.jsonl`, on main).

**The owner's words,** in `/Users/uazjob/UoN-Video-Helper-side/plan8-owner-words.md`, read by `sed -n`:
- `:275`: "yes to the question mark, and A and B. ensure everything passes UX / design / Accessibility" (group B covers this item).
- `:366`: "Yes, leave them" (the walker rows pinning the old page order stay failing until VH-203).
- `:185` and `:395`: gateless.
- `:437`–`:438`: fix items are built on the Mac Pro, and walks are walked again there so each table rests on one machine. A defect becomes a fix item planned by the orchestrator.

**The machine:** the owner's Mac Pro 2019 (Xeon W-3223, 8 cores, x86_64, macOS 26.5.1), Chrome 157.0.8103.39, on AC Power. `pmset` here prints no powermode line, and the launchers accept "AC Power" with no powermode line (Orchestrator #39's ruling).

**The evidence** is in `/Users/uazjob/UoN-Video-Helper-side/vh224-walk/` (the walk folder) and in the records folder:
- **The key proof:** `keys-b.mjs` → `keys-b.txt`; each group's list `keys-b-<group>.txt`.
- **The launchers and driver:** `group.zsh`, `go.sh`, `walk.sh`, `void.zsh`, `vh224-driver.mjs`, and the queue script `/Users/uazjob/UoN-Video-Helper-side/walk-queue-wait-seq.zsh`.
- **The groups:**
  - Each group has `<group>/conditions.txt`; `<group>/runs/<run>/S-*.json` (one record per key, with `manifest.json`); `<group>.load.log` (samples every 30 s: time, 1-minute load, source); and `<group>.launcher.log`.
  - The counted groups are `after-b1` (28), `after-b2` (52), `after-b3` (13) and `after-b4` (13).
  - The re-walks are `after-b2t` (1), `after-b3t` (1) and `after-b4t` (4).
- **Fixtures:** `fix/`, with `fix-compare.txt` against VH-223's `fix-vh223-mac-pro.sha1.txt`. VH-223's `after-pilot` (in `vh223-records-2026-11-05/`) is the fixture proof of record (Orchestrator #40).
- **Neutral tools you may run:**
  - `node check-group.mjs <group> <keys file>`, a group's structural check.
  - `node sum-b.mjs . keys-b.txt <groups>`, totals and each key's failing rows.
  - `node cd-b.mjs . keys-b.txt <groups>`, every non-passing row by instrument.
  - `node reconcile-214.mjs …` (usage in its header). Its output for this walk is `reconcile-214.out.txt`: see point 9 for when to read it.
- **Earlier readings of the same rows:** `reviews/2026-10-25/design-pass-3/evidence/measurements/digest-*-2026-10-27.md`, `matrix-2026-10-27.md` and `vh223-matrix-a-2026-11-05.md`; and the wish list, `project/wish-list.md`.

**The orchestrators' rulings:**
- **S-24 (#40):** "S-24 on still-10800s.mp4 reads veryLongJob here, recorded as not reached by speed, nothing changed." S-169 is VH-222's item.
- **Load (#39, #40, #41):** a group starts with the 1- and 5-minute loads below 8. Samples at 8 or above are recorded. A pass that rests on no timing measure stands. A timing reading taken under such a sample is re-walked by its own group. The re-walk's record is the record of record, and the first walk's stays in the folder, set aside under load.
- **This walk's samples at 8 or above:**
  - b2: 15:03:48 8.95 and 15:04:18 9.37.
  - b3: 17:14:34 8.51.
  - b4: 18:40:12 8.85 and 18:40:42 9.67.
  - No other group had any.
  - The re-walks were b2t (S-41 zh-Hans reduced-motion), b3t (S-24 zh-Hans zoom400proxy) and b4t (S-48 ms-MY fallback, font32, reduced-motion and spacing). Judge whether these are the right keys and whether any reading still rests on timing it cannot carry.

**What you may read:** whatever you need of the above; the walker read-only (`matrix.mjs`, `scenarios.mjs`, `runner.mjs` and the rest); `UI-STANDARDS.md`; `project/digests/wcag-2.2-aaa.md`; and `src/` and `index.html` read-only.

**What you must never read:**
- any folder under `side-session-notes/`;
- in `/Users/uazjob/UoN-Video-Helper-side/`: anything whose name starts `vh224-claude`, anything matching `vh224-*compare*`, `vh224-progress.md`, `vh224-handover-*`, or any `vh224-*brief*` except this one;
- in the walk folder: `judge-b.mjs`, `judge-index.txt`, `judged-*.jsonl`, `vh224-accepted-b.jsonl`, `vh224-table-notes.md.txt`, `stage/`, and `cmp-*.txt`;
- in the records folder: `judge-b.mjs.txt`, `judge-index.txt`, `judged-*.jsonl`, `vh224-accepted-b.jsonl` and `cmp-*.txt`, and the table's "Notes" section. Read the table's Provenance, Runs and Before → after sections only.

Change nothing.

**Answer each point, citing file and line or record:**

1. **The keys:** are they exactly the item's 106 (22 + 20 + 22 + 22 + 10 + 10), disjoint from batch A, with union `stillUnrun`? Was each walked once in the counted groups, in its own language, view and mode, with its scenario's assertions and every declared instrument? Is the walker unchanged?
2. **The fixtures:** does every fixture-reading ID in batch B stand on a proved fixture, and how do you know?
3. **Each acceptance criterion:** met, not met, or not yet (a task for the close), with the evidence.
4. **Every key's judgement:** OK, NOT-OK, not reached or unresolved, from the latest record of record per key. List each key that is not OK yourself, from the records.
5. **Attribute every key that is not OK,** by row, allowing more than one cause. Use one of these causes:
   - a known product issue (linked);
   - the old-order rows (wish VH-216.1);
   - a known instrument or scenario reading (linked);
   - a new product defect (it would need its own fix item before VH-203);
   - a new instrument, fixture or selection failure;
   - environment, speed or timing;
   - unresolved interpretation.

   Name the record, the row and the evidence for each.
6. **The cannot-determine rows:** for each class, is it settled by a documented reading (and which), or is it unresolved?
7. **The conditions and the re-walks:** each group's power and its loads at start; its samples at 8 or above; any voids. Were the right keys re-walked? Do the re-walks match their first walks?
8. **WCAG:** for 1.4.3, 1.4.4, 1.4.6, 1.4.10, 1.4.11, 1.4.12, 2.3.3, 2.4.7, 2.4.13 and 2.5.5, which instruments or modes exercise each in batch B, what each reads over the reached keys, and what batch B does not reach?
9. **The 214 reconciled** (answer points 4 to 6 first: the output prints batch B's judgement counts): does `reconcile-214.out.txt`, and the script behind it (which reads the accepted files; you may run it, but do not read their judgement or cause fields), prove the criterion: pairwise disjoint, union `stillUnrun`, none extra or missing, one accepted record per key, and retries traceable?
10. **Anything the close must carry:** wish lines (each checked absent first), a fix item, the report's Disposition row, VH-172.1 narrowed to the four unresolved at device scale 3, the decision, and what the table must say.

End with a verdict: pass, pass with conditions, or fail, and a short list of what must hold. Be concrete and brief.

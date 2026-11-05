<!-- markdownlint-disable -->

# VH-224 — Claude's verdict (VH-224 #2, the Mac Pro's walk)

Written by VH-224 #2 before Codex astra's blind answer (`vh224-codex-blind.md`) was opened. It is the answer to the same ten points as `vh224-codex-blind-brief.md`.

**Candidate:** HEAD `57a55ddcbf9e`, VH-223's landing. There is no tracked diff (`da39a3ee5e6b4b0d`). The evidence is untracked: `$M/vh224-matrix-b-2026-11-05.md` (f1ee477f) and `vh224-records-2026-11-05/` (109 files). The walker `e377132ba6f70227` is unchanged before and after, and every group's `conditions.txt` reads it.

1. **The keys.** `keys-b.mjs` takes `stillUnrun` (214, sha1 075127e0) less VH-223's `keys-a.txt` (108). That gives 106: zoom200proxy 22, zoom400proxy 20, reduced-motion 22, spacing 22, fallback 10, font32 10, all mode keys at w1280, no key in two classes. The counted groups b1 28, b2 52, b3 13 and b4 13 make 106, none twice; their union is `keys-b.txt`. Each record names its language, view and mode. `check-group.mjs` finds every declared instrument present in all 93 reached, and each mode or view seen: fonts withheld, reduced motion and its motion watch, spacing, the 32 px root, and the 640 and 320 px proxies. The walker is unchanged: `--keys <file>` was passed through the driver with no second filter. **Met.**
2. **Fixtures.** `fix/` is VH-223's, 36 of 36 by sha1 (`fix-compare.txt`). Every manifest's fixture sha256 (captioned-12s, lecture-30s, lecture-60s, still-3600s, still-10800s) equals VH-223's. VH-223's after-pilot proved every fixture-reading ID on these bytes except S-24, which is not reached here either. **Met.**
3. **Criteria.**
   - Keys: met.
   - Each key walked: met.
   - Judged: met, with no NOT-OK needing a new attribution.
   - The 214 reconciled: met.
   - Stage rule: the before linked (all 106 in `unrunAfter`, `after-manifest-2026-10-24.json`), the table placed, WCAG re-checked; tokens and documents untouched (no diff).
   - Not yet, for the close: the gate and checker, Codex's close check, the Disposition row, VH-172.1 narrowed, the digest rules named.
   - Sizing: past one worker, handed back under the ID, as allowed.
4. **Judgements** (the record of record per key: b2t, b3t and b4t replace their six): 81 OK, 12 NOT-OK, 13 not reached, 0 unresolved.
   - NOT-OK: S-03 ms-MY and zh-Hans × reduced-motion, spacing, zoom200proxy, zoom400proxy (8); S-81 ms-MY × fallback, font32, reduced-motion, zoom200proxy (4).
   - Not reached: S-24 × 13 (en-GB zoom200proxy; ms-MY and zh-Hans × fallback, font32, reduced-motion, spacing, zoom200proxy, zoom400proxy).
5. **Attribution.**
   - **S-03 ×8:** the two assert rows "About the video format" and "Tab from the top" fail, everything else passes. These are the old-order rows (wish VH-216.1, "Yes, leave them").
   - **S-81 ms-MY ×4:** focus on `#accessibility-statement a`. The link wraps, and its indicator reads 1,361 px² at 3:1 against the box's 1,571 (font32 2,644 of 3,166), best ratio 13.34. This is a known instrument reading of the wrapped link, VH-199's ×11 (wish VH-200.1). At spacing and zoom400proxy the link passes (1,637 ≥ 1,634; 986 ≥ 925).
   - **S-24 ×13:** environment, speed. The one problem is the state predicate on `preflight.reasons.longJob`, while the page reads veryLongJob's hours ("about 1 hour 5 minutes", "kira-kira 1 jam", "大约需要1小时"). Recorded as not reached by speed (Orchestrator #40; wish VH-224.1).
   - No new product defect; no new instrument, fixture or selection failure.
6. **Cannot determine,** each settled by a documented reading:
   - the trim thumbs' and track's non-text contrast, a declared person check (65 keys; VH-223.2);
   - the thumbs' disc as a target, VH-173's (52);
   - mixed-script lines, VH-173's (28, zh-Hans);
   - S-76's feedback textarea at the 400 % proxy, larger than the viewport, VH-199's en-GB reading (2; `digest-targets-2026-10-27.md:42`).
7. **Conditions.**
   - Every group ran on AC Power and started with both loads below 8 (b1 3.87, b2 3.89, b2t 4.15, b3 5.70, b3t 3.93, b4 5.34, b4t 2.96). The void checks stand: no gap, no power change.
   - Samples at 8 or above fell in b2 (2), b3 (1) and b4 (2).
   - The re-walked keys are the ones whose reading rests on timing in each window. b2t: S-41 zh-Hans reduced-motion's motion watch. b3t: S-24 zh-Hans zoom400proxy's device-check estimate. b4t: four S-48 ms-MY records walking in a running state.
   - The other records in b2's window rest on no timing measure (#40's ruling).
   - All three re-walks are identical to their first walks by signature (`cmp-b2t/b3t/b4t.txt`), and none had a sample at 8 or above. So no reading rests on timing it cannot carry.
   - S-48 en-GB zoom200proxy and the zh-Hans S-48 keys ran below 8.
8. **WCAG over the 93 reached:**
   - 1.4.3 and 1.4.6 (contrastText): pass in 93.
   - 1.4.10 (overflow): passes in 93, including the 320 px proxy.
   - 1.4.4: the 32 px root (font32) and the 200 % and 400 % proxies, with overflow and type passing in every key reached.
   - 1.4.12 (spacing): overflow and type pass.
   - 2.3.3 (motion under reduced motion): passes in 20 of 20.
   - 1.4.11: passes but the thumbs' person reading.
   - 2.4.7 and 2.4.13 (focus): 89 pass, 4 fail (S-81 ms-MY).
   - 2.5.5 (targets): passes but the disc and the textarea.
   - Not reached: S-24's 13 keys, so none of S-24's view is read here.
9. **The 214.** `reconcile-214.out.txt` reports stillUnrun 214, A 108, B 106, inBoth 0, union 214, errors []. The script checks each accepted record's run against its group's outcomes file in the records folder and fails on any missing or extra key. Retries are traceable: b2's, b3's and b4's set-aside records keep their outcome lines in the same folder. **Met.**
10. **For the close:**
    - Wish VH-224.1 (S-24 at this Mac's speed, beside VH-223.1 and VH-222's S-169), checked absent first.
    - VH-172.1 narrowed to the four at device scale 3.
    - No fix item.
    - The Disposition row merged with VH-223's and VH-221's.
    - The decision quoting the owner's words.
    - The table's notes: the six set aside, judge-b's widened rule, the walker kept at `e377132ba6f70227` while origin/main is at `14479eb`.
    - The NOT-OK records copied whole.

**Verdict: pass with conditions.**
- The gate green and `node tools/check.mjs` clean at the close.
- Codex's close check.
- The ledger and wish lines as in point 10.
- Digest rules named: wcag-2.2-aaa (1.4.3, 1.4.4, 1.4.6, 1.4.10, 1.4.11, 1.4.12, 2.3.3, 2.4.7, 2.4.13, 2.5.5); no judgement cites carbon or nielsen.

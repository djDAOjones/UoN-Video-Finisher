<!-- markdownlint-disable -->

# VH-223 #4 — Claude's verdict, the Mac Pro's walk (saved before Codex's blind answer is opened)

Base `95d18eed5db1` (PLAN-8; equal to `ca093da0` in src, test, reviews, scripts, public, index.html, vite.config.ts and the package files); candidate: the walker change alone, `matrix.mjs`'s `--keys`, revision `9c52269607bccc4c` → `e377132ba6f70227`, diff hash `1c683ffb940e364a`; the app is the base's. Every record here is the Mac Pro's (Xeon W-3223, macOS 26.5.1, Chrome 157.0.8103.39), in `vh223-walk/`: `after-a1` to `after-a7` (15 + 27 + 15 + 15 + 15 + 15 + 6 = 108), all on AC Power (this Mac prints no powermode line). The MacBook Pro's records, in `vh223-walk/macbook-pro/`, are support only and are not used for any judgement here. The pilot `after-pilot` (23 keys) is the fixture proof, outside the 108. Judged by `judge-a.mjs` (`0b5d5b8a`), read-only, into `vh223-accepted-a.jsonl` (`53a60d3c`), with `cd-a.mjs` (`1ddd1a87`) → `cd-all.txt`.

## 1. Every key judged
108 of 108 keys have a record from this Mac, each in its own language, view and mode, with its scenario's asserts and every declared instrument: **84 OK, 9 NOT-OK (attributed, section 2), 15 not reached because of this Mac's speed (section 3), 0 unresolved.** A key is OK when it is `ok`, reached `pass`, no instrument or row fails, and every cannot-determine row is a documented reading (section 4). `judge-a.mjs` counts the 15 unreached keys as NOT-OK with no row cause, because its rule marks any record that is not ok or not reached as NOT-OK. Section 3 attributes them.

## 2. The NOT-OKs, attributed by row
- **S-03 ×4** (ms-MY and zh-Hans, each at landscape and short; `after-a1`). Two rows fail. `"About the video format" 44 x 44, collapsed, controlling #format-help`: since VH-229, the format "?" sits in the title's panel, closed at load, so the row's subject is hidden, and `formatTip` reads not-applicable for the same reason. `Tab from the top: …`: the Tab stops follow the new order. **These are the old-order rows, expected on both sides: wish VH-216.1, "Yes, leave them" (`plan8-owner-words.md:366`).** Not a product defect.
- **S-81 ms-MY ×5** (landscape, short, and w1280 in dark, forced-dark and forced-light). `focus` fails on `#accessibility-statement a`. Its enclosing box is 356 × 41, because the link wraps onto two lines. The area at 3:1 is 1,361, 1,361, 1,361, 1,360 and 1,362 px², against a 2 px perimeter of 1,571. The best ratio is 13.34, 13.34, 13.34, 9.1 and 11.31:1, so every changed pixel is at 3:1 or better. The instrument reads the enclosing box's perimeter, but 2.4.13's perimeter follows the fragments, which the instrument does not read. **A known instrument reading: wish VH-200.1, with the forced cells also under wish VH-210.2.** This is the same reading as VH-199's ×11 and as this item's MacBook Pro walk. No new defect, so no fix item.

## 3. Not reached because of this Mac's speed: S-24 ×15 (`after-a3`)
In each of the 15 records, the status is failed and reached is fail, with one problem only: the state predicate is false. S-24 needs `preflight.reasons.longJob` without `veryLongJob` (20–60 minutes). On this Mac, still-10800s.mp4 reads "about 1 hour 5 minutes" in each language ("kira-kira 1 jam …", "大约需要1小时5分钟"), which is veryLongJob. This is Orchestrator #40's carried ruling: "recorded as not reached by speed, nothing changed". The cause is the environment, meaning this device's speed. It is not a product defect, a fixture fault (the fixture's shape is ffprobe's 10,800 s) or a walker fault. Nothing was dropped and nothing was changed. **No later item is claimed to reach these 15 keys:** `git grep S-169 origin/main` finds nothing at 95d18ee, and S-169 is VH-222's. The close carries one wish line naming the 15 keys and why they were not reached.

## 4. The cannot-determine rows, each a documented reading
- contrastExtra, the trim thumbs and track, 78 keys (156 rows): "painted pseudo-elements … (person check)", the declared person check.
- targets, the trim thumbs' disc, 36 keys: "a disc: its hit box is 44 x 44 … the reading is VH-173's".
- measure, a mixed-script line in zh-Hans, 23 keys: "the reading is VH-173's".
None is unresolved. These are the same classes as VH-199's digests of 2026-10-27. The counts are lower than the MacBook Pro's (93, 51) only because S-24's 15 were not reached.

## 5. Load, power and the re-walks
Every group started on AC Power with both loads below 8. Peaks and samples at 8 or above:
- a1: 5.71, 0 of 4
- a2: 6.51, 0 of 16
- a3: 5.70, 0 of 44
- a4: 5.99, 0 of 77
- **a5: 11.41, 8 of 120** (04:38:59–04:42:30Z, during S-43 ms-MY and S-49 en-GB)
- **a6: 12.34, 2 of 51** (05:44:09 and 05:44:39Z, during S-65 ms-MY)
- a7: 6.59, 0 of 28

No group crossed a sleep or a change of power. By hand-over step 3 (#38's rule), a group with samples at 8 or above re-walks its timing-dependent keys at low load:
- **rewalk-a5, whole (15):** every a5 key is a running state (`M.running()`: S-43, S-49, S-50, S-57, S-85), timed by the job's clock like S-48.
- **rewalk-a6t (12):** S-60, S-61, S-65 and S-72a (`keys-a-a6t.txt`), a transition or timed state. S-66 stands: a settled state, read as text and geometry.

Both re-walks are pending under #40's lock order. Until they end, a5's and a6's readings stand with the caution "read against the load logs, no timing claim rests on them". A re-walk identical to its first walk is cited, and the first walk stands. A re-walk that differs stands itself, and the difference is reported.

## 6. WCAG, by instrument, over the 93 reached keys
- 1.4.3 and 1.4.6 (contrastText): pass in all 93.
- 1.4.10 (overflow): passes in all 93.
- 1.4.11 (contrastExtra): passes, except the thumbs' person check.
- 2.4.7 and 2.4.13 (focus): pass, except S-81 ms-MY ×5 above.
- 2.5.5 (targets): passes, except the thumbs' disc.

Batch A's classes (w375, landscape, short, dark, forced-dark, forced-light) reach no 32 px font, zoom, spacing or reduced-motion key. So 1.4.4, 1.4.12 and 2.3.3 are not exercised here; they are batch B's (VH-224). The 15 S-24 keys exercise none of these on this Mac.

## 7. Defects and the close
No new product defect, so no fix item before VH-203. The 9 NOT-OKs are held by VH-216.1, VH-200.1 and VH-210.2, each found by `grep` in `project/wish-list.md`. One new wish line is needed: S-24's 15 keys, not reached because of this Mac's speed. VH-172.1's line stays as written, for VH-224 to narrow. Batch A has no 32 px page shots. The table must name each key's accepted record and why S-24's 15 were not reached, and say that the pilot is proof, outside the 108, with this Mac's 33 changed fixture sha1s.

**Verdict: pass with conditions.** The conditions are: the two re-walks end and match their first walks, or their differences are reported; the wish line for S-24 is written; and the table says what section 7 lists.

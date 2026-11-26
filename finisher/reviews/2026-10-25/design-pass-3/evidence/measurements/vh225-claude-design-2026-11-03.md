<!-- markdownlint-disable -->

# VH-225 #1 — Claude's design (saved before Codex's answer is opened)

Base `a5475cda0ca2` (VH-210). Walker `fe44891d3c53f716`. Written 2026-11-03 ~04:40Z.

## 1. The surfaces, and what changes
**Changes to "UoN Video Finisher" (commit 1):**
- `index.html:6` title, `:39` h1, `:733` covers line (the static fallback the i18n tables overwrite).
- `src/i18n/en-GB.ts:55` `app.title`, `:901` `statement.covers`; `zh-Hans.ts:25`, `:769`; `ms-MY.ts:25`, `:820` (section 3).
- `src/config/feedback.ts:35` `FEEDBACK_SUBJECT` → "UoN Video Finisher problem report"; `:49` `TRANSLATION_FEEDBACK_SUBJECT` → "UoN Video Finisher translation" (used at `main.ts:3676`, `language-switcher.ts:55`).
- `src/i18n/sheet.ts:484` the translator note; `src/main.ts:223` the boot log; `scripts/strings-sheet.mjs:34` the sheet's instructions line (the translators' copy of the name).
- `scripts/package-xerte.mjs:81` README text and `:5`, `:168` the zip name → `uon-video-finisher-<build id>-site.zip` (the owner handles the file; it is not stored state). The staging temp prefix `:161` and `check-build.mjs:28` stay (internal, never seen).
- `README.md:1`, `project/profile.md:1` (the heading), `acceptance.html:6`, `DEV-INFRASTRUCTURE.md:507–508` (the zip name).
- `docs/01-specification.md:1`, `docs/04-init-prompt.md:21` — the name swap only.
- The 13 `spike-*.html` `<title>`s: the item names `acceptance.html`, a maintainer page of the same kind; I include them as the same one-word swap and put it to Codex (minimal-change says leave; consistency says swap; no test reads them — check by grep at build).
- Tests updated to the new strings, none deleted or skipped: `tables.test.ts:215,:275,:278`, `progress.test.ts:66,71,73,74,216`, `package-xerte.test.ts:52`, `screen-text.test.ts:62,576,973`.
- Tab titles follow `app.title` by composition (`progress.ts:160`, `:167`): no code change, the tests above pin them.

**Stays:** the ledger's other headings (`project/brief.md`, `architecture.md`, `structure.md` generated, the digests' text, and `project/rules.md`, protected): the record's file titles, not the app; one wish line offers them to the owner. Dated records under `reviews/` (audits, checklists, evidence) are history and stay, except as section 2 says for the live person checklist. `.claude/launch.json`'s server name stays (harness config, and a session's launch name).

## 2. The repository and Pages: the order
**Finding:** nothing hard-codes the Pages path. `deploy-pages.yml:59,:65` sets `BASE_PATH: /${{ github.event.repository.name }}/` ("so a fork or a rename does not silently produce a site whose asset URLs all 404"), `vite.config.ts:107` reads it, and the branding path derives from `import.meta.env.BASE_URL` (`branding.ts:336`). So "vite's base" and "the branding path" follow the repository's name on the next deploy by themselves; only comments, a test's example address, `profile.md:12` and `docs/04-init-prompt.md:27` name the old address.

**The order:**
1. **Commit 1, `VH-225: …` — the visible name, everything in section 1, the kept-identifier test, the walker's asserts, the ledger with the item left open on the rename.** No address changes. Gated, Codex close check, pushed; Pages green for that SHA at the old address, which then shows the renamed page.
2. **The rename — the owner's.** One line to the orchestrator: commit 1 is live; please ask the owner to rename the repository to `UoN-Video-Finisher` (Settings → General → Repository name), or give a session his go-ahead for that step. I wait.
   - At his click, GitHub redirects the repository page and the git remote, but the Pages site moves to `djdaojones.github.io/UoN-Video-Finisher/` still serving commit 1's build, whose asset URLs start `/UoN-Video-Helper/`: **the preview is broken at both addresses from the rename until the next deploy**, not by any push. Commit 2 is therefore gated and ready before the ask, so the gap is the push and one deploy run (~5 min).
3. **Commit 2, `VH-225: …` — pushed only after his confirmation that the rename is done** (checked by `git ls-remote https://github.com/djDAOjones/UoN-Video-Finisher.git`): `project/profile.md:12` → the new repository URL; `docs/04-init-prompt.md:27` (the name inside the address, the docs swap the brief allows); the comments `vite.config.ts:131`, `branding.ts:336`; `branding.test.ts:124–127`'s example address; the ledger's close (backlog struck, trajectory, decision). Its push deploys with `BASE_PATH=/UoN-Video-Finisher/`; Pages green for that exact SHA, and `curl` of the new address and one hashed asset return 200.
   - **The local remote:** GitHub's redirect keeps `origin` working; changing `$R/.git/config` (`git remote set-url`) is asked in the same one line, not done unasked.
4. **What the old address shows afterwards:** GitHub's Pages 404 ("There isn't a GitHub Pages site here"), for good: project sites are not redirected, and the name stays free for a new repository. The 27 October person checklist sent to DSS colleagues (`reviews/2026-10-25/design-pass-3/person-checklist-2026-10-27.md:12`) points there. Two wish lines: a redirect stub (a repository of the old name whose Pages page links on) is the owner's choice; the checklist handed at VH-195 must name the new address (VH-195's own criterion "the person checklist handed to the owner", checked by grep at close).
- **Question for the orchestrator:** VH-220 to VH-224 start "after VH-225 lands". Commit 1 lands the renamed page; commit 2 waits on the owner. I propose VH-220 starts after commit 1, and commit 2 lands between the side items like a one-line ledger fix. The orchestrator's ruling.

## 3. The new names
- **zh-Hans: "UoN 视频成片工具"** ("UoN video finishing tool"). 成片 is the finished cut, the word Chinese video apps use for turning footage into a finished video (剪映's 一键成片); 工具 "tool" replaces 助手 "assistant/helper". Alternative: "UoN 视频收尾工具" (收尾 "finishing off"), closer to the act than the result but rarer in video software. Covers: "本声明适用于 UoN 视频成片工具，即您当前所在的页面。"
- **ms-MY: "Penyiap Video UoN"** — pe- + siap ("finished, ready"; menyiapkan "to complete"), the agent noun "one that finishes", in the word order of "Pembantu Video UoN". Alternative: "Penyempurna Video UoN" (sempurna "complete, perfect": "one that completes/perfects"), more common as a word but leaning to "perfecter". Covers: "Kenyataan ini meliputi Penyiap Video UoN, iaitu halaman yang sedang anda gunakan."
- Keeping "UoN Video Finisher" untranslated was weighed: the earlier choice translated the name in both tables, and the translator note (`sheet.ts:343`) treats `app.title` as translatable; switching policy is a bigger change than the rename asks.
- **The native check:** no line holds a check "before the release" (`grep -n -i native` in the backlog, the wish list, `VH-204.md`: native-reader lines VH-175.4, VH-181.1, VH-193.1, none naming the release). A new wish line, VH-225.1: a native Chinese and a native Malay reader check the two names and their covers sentences with VH-193.1's drafts, before VH-204's cut.

## 4. The kept identifiers
New `test/kept-identifiers.test.ts`, citing house-conventions' "Fail loudly on data loss": imports and pins `LANGUAGE_PREFERENCE_KEY`, `VIDEO_LANGUAGE_PREFERENCE_KEY` (`languages.ts:47,:53`), `VIDEO_KIND_PREFERENCE_KEY` (`video-kind.ts:24`), `ANNOUNCE_PROGRESS_KEY` (`progress.ts:182`), `ROOT_DIRECTORY` (`opfs.ts:27`); reads `src/main.ts` for `name: 'uon-video-helper-job'` and `package.json`'s `name`; and asserts no `uon-video-finisher` identifier in `src/` (a renamed key would orphan saved choices). No migration.

## 5. The walker
- Changes: `scenarios.mjs:2799` (S-146) and `:3005` (S-78), the label and regex `UoN Video Helper problem report` → `UoN Video Finisher problem report`; `footer-182.mjs:169` the `startsWith` string. Nothing else (re-grep at the edit; `lang-191.mjs:120` uses a kept key: no change).
- **The order keeps one revision per comparison:** (1) the before at `fe44891d3c53f716` on clean `$BASE`; (2) the build; (3) the after at `fe44891d3c53f716` — S-78's and S-146's subject rows and footer-182's flows then fail, as the criteria name, reported; (4) the walker change → the new revision; (5) its proof "on both layouts", meaning both builds: the new revision walked on the after (the three asserts pass) and on a `git archive` export of `$BASE` with `export-proof.mjs`'s 84-cell proof (they fail), at w1280 and w320, three languages. Both revisions recorded.

## 6. The cells (light, dark, forced light, forced dark; three languages)
Per view: 8 colour × font cells (four modes at 16 px and at 32 px, the walker's `-font32` modes), 4 spacing cells (the driver's in-memory `-spacing` modes, plain `spacing` its own group after VH-210's stale-palette find), 1 `fallback` (withheld faces, light: `matrix.mjs:206` groups only `mode === 'fallback'`, so the walker cannot withhold fonts under a colour mode; colours don't change metrics), = 13; plus `reduced-motion` at w1280 as `PLANS` gives it.
- **S-03** (tab title idle, h1): 7 views (w1280, w375, w320, landscape, short, zoom200proxy, zoom400proxy) → 3 × 7 × 13 + 3 = **276**.
- **S-81** (statement open: covers line, h1): the same **276**.
- **S-06b** (the statement by its address): 3 views → **120**. **S-78**, **S-146** (the problem email): **120** each. **S-05** (the translation link, zh-Hans and ms-MY only): **80**.
- **footer-182 `--only flows`** (its own script, w1280, three languages): **3**.
- **The job titles** (Encoding/Finishing …, Ready, Not made, Cancelled — from `window.__audit.titles`): S-48, S-53, S-56, S-52, each in three languages at w1280 light: **12**. The tab title is not drawn by the page, so no view, colour mode or font can change it; the full cross would be about 1,100 two-minute encodes reading identical strings. Put to Codex as the one reduced set, with this reason.
- **Total ≈ 1,007 cells a side**, ~2.5 h a side at VH-210's ~7.5 s a cell. The probe reads, per cell: `document.title`, the title history, the h1's text, lines and box and whether a word breaks inside (as VH-218's probe), the "?"'s box beside it, the covers line's text and lines, the mailto subjects, the translation link's subject, page sideways scroll. 32 px page shots show the default size (VH-217.5): no visual claim rests on one.

## 7. The criteria, refined
1. The visible name is "UoN Video Finisher" in every surface of section 1 (the tab title in every job state by composition), its translations "UoN 视频成片工具" and "Penyiap Video UoN" pending the native check (wish VH-225.1); the tests that assert them updated, none deleted or skipped.
2. `docs/`: `01-specification.md:1` and `04-init-prompt.md` (`:21`, and `:27` in commit 2), the name only.
3. The kept identifiers pinned by `test/kept-identifiers.test.ts`; no migration.
4. The repository and Pages: commit 1 changes no address; the rename is the owner's; commit 2, pushed only after his confirmation, moves the profile's URL, `docs/04:27`, the comments and the test's example; Pages green for its SHA at the new address; the old address's 404 and the person checklist recorded as wishes.
5. The walker: the three subject asserts only, proved on both builds; both revisions recorded.
6. The stage rule: section 6's cells, before and after, and the new names' layout read in zh-Hans and ms-MY at 320 px and 32 px (Malay's title broke mid-word at VH-229; "Penyiap" is shorter than "Pembantu").

## 8. Risks
- Data loss only by renaming a hidden key: the test fails loudly on that.
- The preview's gap between the rename and commit 2's deploy: minutes, owner-timed, stated in the ask.
- The problem-report subject changes: any mail rule of the owner's keyed on "UoN Video Helper problem report" would miss reports. A line in the ask/hand-over for him.
- `package-lock.json`'s name stays with `package.json` (generated, protected): no `npm install`.

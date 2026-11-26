# UoN Video Tools: the restructure log

The running record of the restructure described in
`../2026-08-24 UoN Video Helper/UoN-Video-Tools-restructure-prompt.md`.
A fresh chat opened on this folder resumes from this log and that prompt.

This folder has no contract, no ledger and no hooks until stage 6 founds
the parent's ledger.

## Where it stands

- **Stage reached:** stage 6 closed, 2026-11-26: step 0 (both tools
  to pm-skills 5.0.3), step 1 (the parent's ledger, `UVT-n`), step 2
  (UVT-1), steps 3 and 5 (UVT-2, the shared set), step 4 (UVT-3, the
  shared tool configs) and D9 signed in both tools' rules files: "Stage 6
  closed" below. Stage 5 done: one folder, one repository
  (`djDAOjones/UoN-Video-Tools`), `finisher/` and `name-graphics/` on
  one install at the root, the preview and the Xerte
  package checked, the old Name Graphics repository archived.
- **Next:** stage 7 (UVT-6, the parent's half, and each tool's closing
  record), run by the orchestrator chat on the root. Not started.
- **Then, fairly soon (the owner's word of 2026-11-26), after pm-skills
  5.0.3:** the Finisher's student edition (VH-129) and the translation
  register every tool shares: the parent's two items written under
  "Stage 6" below, opened as UVT-4 and UVT-5, and each tool's half
  (VH-247, VNG-12). The decisions are PLAN-10 in the Finisher and PLAN-2
  in Name Graphics.
- **Waiting on the owner:** the two Chrome tabs left open on the
  Finisher (each holds an unsaved test video; close each and choose
  "Leave"); the word for stage 7.
- **The restructure prompt** is
  `finisher/reviews/2026-11-25/UoN-Video-Tools-restructure-prompt.md`
  (committed by VH-226 in `1a9927ca`, before the move).

## The backup folder

`/Users/joe/UoN-Video-Tools-restructure-backup/`, outside OneDrive and
outside both repositories. It holds:

- `samples-list-stage1.tsv`: every file under the Finisher's `samples/`,
  its size in bytes and its path. sha256
  `4bb36c2a264d9979036e05a47023be5b99a230a7b2d0c2d289a8e1a8f45c7d9f`.
- `baseline-gate-finisher.log` and `baseline-gate-name-graphics.log`: the
  two baseline gate runs.

## Stage 1: read and check, changing nothing (2026-11-26)

The session started on the owner's word in this chat, 2026-11-26:
"fable is here, please execute".

### Read

- Both tools' rule-1 sets, by `node tools/read.mjs` in each folder.
- The Finisher's `AGENTS.md` (byte-identical to Name Graphics') and
  `DEV-INFRASTRUCTURE.md`.
- The items VH-226, VH-129, VH-14 and VH-161.

### Measured

| Check | Video Finisher | Video Name Graphics |
| --- | --- | --- |
| HEAD | `b136d2cf` | `22d86e1` |
| `main` against `origin/main` after `git fetch` | level | level |
| Tree | clean but for the prompt file, untracked | clean |
| Stash | none | none |
| Worktrees | the main one only | the main one only |
| `.git/hooks` | the samples only | the samples only |
| `core.hooksPath` | unset | unset |
| `core.fileMode` | false | false |
| Cloud-only files outside `node_modules` | 0 | 0 |
| Tracked files | 15,180 (14,614 under `reviews/`) | 77 |
| Baseline `npm run check` | green, exit 0: 98 test files, 2,001 passed, 1 skipped; 40 s | green, exit 0: 5 test files, 126 passed; 5 s |
| GitHub Pages | on, `djdaojones.github.io/UoN-Video-Finisher/` | on, `djdaojones.github.io/Video-Name-Graphics/` |
| Tags on GitHub | `v0.2.0`, `v0.3.0`, `v0.3.1` and two `archive/` tags | none |

- **The Finisher's HEAD has moved since the prompt was written**, from
  `be80c4fa` to `b136d2cf`: one commit, PLAN-9, the owner's answer to the
  sheet. It changes four record files and no code, so the prompt's
  measurements of the code stand.
- **The one skipped test is in the baseline.** It was skipped before this
  work began; the restructure must not add a second.
- **Samples:** 34 files in 4 folders, 17,341,222,454 bytes (17.34 GB, which
  is the prompt's "16 GB" counted in GiB). No symlinks.
- **Untracked and riding along with the Finisher:** `samples/`;
  `release/` with three zips (0.2.0, 0.3.0 and
  `uon-video-finisher-v0.3.1+20261125.d5db255a-site.zip`, 3,928,814
  bytes); `_archive/` (4 files); `.claude/settings.local.json`;
  `dist/`, `node_modules/` and the ledger's `view.html` (all generated).
  `public/spike/` and `CLAUDE.local.md` do not exist in either project.
- **The three local-only branches** (`claude/vh-140-wip`,
  `wip/2026-11-12-vh221`, `wip/2026-11-12-vh223`) are confirmed absent
  from origin. D13 pushes them in stage 4.
- **No conflict copy** was found in either folder. No dev server is
  listening on 5173 or 4173. The Codex desktop app is open on this Mac;
  no Codex or Claude session was seen working in either project folder.
- **`djDAOjones/UoN-Video-Tools` does not exist yet** on GitHub, so the
  rename of D4 is free.
- **Outside the repositories:** `~/.codex/config.toml` trusts the
  Finisher's present path only (line 102). `~/.claude.json` names the
  Finisher's folder and five old worktree paths under it. One scheduled
  task, `~/.claude/scheduled-tasks/v3-trial-session-log-archive`, names
  "UoN Video Helper"; its description says it ran "Mondays to
  2026-11-02". Both side folders exist and stay where they are (D11).

### Found, and not in the prompt

**The two lockfiles do not agree.** The prompt measured the nine dev
dependencies as "same packages, same version ranges", which is true of
`package.json`. The lockfiles resolved those ranges on different days:
73 packages are at different versions, and Name Graphics' are the newer
(for example eslint 10.9.1 against 10.14.0, vite 8.2.2 against 8.3.6,
typescript-eslint 8.68.0 against 8.72.1, vitest 4.1.11 against 4.1.12).
Four packages are the Finisher's only (`mediabunny` and three it brings);
ten are Name Graphics' only.

One lockfile at the root therefore changes one tool's dev tools whichever
is kept. The prompt says the Finisher's lockfile moves to the root and
"the lockfile's diff must show no version change". That holds for the
Finisher. For Name Graphics it means its dev tools step back to the
Finisher's versions. No runtime dependency is touched either way: Name
Graphics has none.

Raised with the owner on 2026-11-26. Recommended: the Finisher's lockfile
becomes the root's, byte for byte, because 0.3.1 was released on those
versions; Name Graphics takes them; the spike proves its gate green on
them; the Name Graphics item records it.

## Stage 2: the owner's decisions

Every row D1 to D15 is settled as the prompt's table recommends. None was
asked again. The owner's words, verbatim, from the prompt:

- On the task, 2026-11-25: "the parent project should be UoN Video Tools,
  and there are standalone tools within that which share a lot of base
  code, the tools include the Video Name Graphics Generator and the Video
  Finisher (which soon must be split into staff and student versions). We
  need to figure out how to maintain a shared code base and differences."
- On the decisions, 2026-11-25: "approves everything"
- On D15, 2026-11-25: "macpro current not working on this but will in
  future. can address at the time."
- On the rewritten rows D7, D9 and D14, 2026-11-25: "accept all, proceed"
- On the lobbies, 2026-11-25: "We have a staff lobby and a student lobby
  in Xerte, but just the staff lobby on pages. the student lobby is an
  option in the staff lobby (staff get everything, including student
  versions so they can use and easily share), its just the students that
  dont get everything"

| | Answer |
| --- | --- |
| D1 | `2_Projects/2026-08-24 UoN Video Tools`; inside it `finisher/`, `name-graphics/`, `shared/` |
| D2 | The checkout stays on OneDrive, pinned |
| D3 | One repository, tools as folders, `shared/` by path, editions inside each tool |
| D4 | Rename `UoN-Video-Finisher` to `UoN-Video-Tools`; archive `Video-Name-Graphics` once merged; its Pages site off |
| D5 | Renaming the folders above `samples/` is not a move of `samples/`; the list is compared before and after |
| D6 | VH-226 widened; a new Name Graphics item (VNG-11 or the next free ID) supersedes INTAKE's "copied and owned, not shared" |
| D7 | A parent ledger at the root, IDs `UVT-n`, founded in stage 6 |
| D8 | Name Graphics to pm-skills 5.0.1 before the merge; the owner says where the release is |
| D9 | The ownership and shared-code rule, signed in all three rules files |
| D10 | The identical set moves to `shared/` once the structure is green |
| D11 | Both side folders stay, unrenamed |
| D12 | Browser-side identifiers never change; `package.json`'s name becomes `uon-video-finisher` |
| D13 | The three local-only branches are pushed as they are |
| D14 | The top address shows the staff lobby: a placeholder now, the real lobbies later |
| D15 | The Mac Pro waits until it next takes work |

### Open with the owner

- **The lockfile** (above): asked 2026-11-26, not yet answered.
- **D8, where the pm-skills 5.0.1 release is:** asked 2026-11-26, not yet
  answered. The Finisher's REFRESH-501 decision names it "build fd5fb94
  (the tag v5.0.1 of canon)"; the session has not looked for it (rule 2).

## Stage 3: the spike, off OneDrive (2026-11-26)

The owner's word, 2026-11-26, after the model was changed to Opus: "use
a new orchestrator chat and/or subchats if that will be best, but
proceed". The lockfile question was not answered; the spike used the
recommendation, which is also the prompt's plan.

The spike is `/Users/joe/UoN-Video-Tools-spike/` (1.2 GB): `repo/` is the
merged repository made from `--no-hardlinks` clones of both local
checkouts, `site/` the gathered Pages site, and the gate logs beside them.
Nothing in it is kept; it can be deleted on the owner's word.

### What held

| Step | Result |
| --- | --- |
| 1. The lift | 15,180 pure renames (R100), none other; `git write-tree --prefix=finisher/` equals the old `HEAD^{tree}`, `464c53b4`, once the two steps below are done |
| 2. The merge | `-s ours --allow-unrelated-histories`, Name Graphics' files added under `name-graphics/`; its tree equals the old one, `079045ed`; `319f867`, `22d86e1`, `27f51dd`, `be80c4fa`, `v0.2.0`, `v0.3.0` and `v0.3.1` all resolve |
| 3. The install | the Finisher's lockfile moved to the root: `npm ci` clean; after a re-lock no package's version or integrity changed, only the root entry's name, version and licence lines |
| 3. The gates | green from `finisher/` (98 files, 2,001 passed, 1 skipped, as the baseline), from `name-graphics/` (126 passed, on the Finisher's older dev tools) and from the root (both in turn) |
| 4. Three ledgers | `tools/check.mjs` and `tools/read.mjs` from the root, `finisher/` and `name-graphics/` each read their own ledger |
| 4. Test chats | three read-only chats, on the root, `finisher/` and `name-graphics/`: each got the start notice once and one copy of the twelve-rule contract, its own folder's |
| 5. The builds | `BASE_PATH=/UoN-Video-Tools/finisher/` and `/UoN-Video-Tools/name-graphics/`: every asset, the job worker, the branding base and `sw.js` name their own folder |
| 5. Scopes | served from a nested path and read in Chrome: the Finisher's worker registers at `/UoN-Video-Tools/finisher/`, controls it after a reload, and keeps exactly the 30 files `offline-files.json` lists; the lobby and Name Graphics have no registration and no controller; the cache name carries the scope |
| 5. Xerte | `npm run package:xerte` from `finisher/` on a clean tree: 36 files, none in a folder; the 0.3.1 zip's kinds plus `sw.js`, its map and `offline-files.json` |
| Dev server | `vite` from `finisher/` serves the page and pre-bundles `mediabunny` from the root install into `finisher/node_modules/.vite`, already ignored |

### What the move must do that the prompt did not say

1. **Two tracked files are ignored by `*.log`** and drop out of
   `git add -A` at their new path: `reviews/2026-10-25/design-pass-3/evidence/measurements/vh218-records-r2-2026-10-31/before-words.load.log`
   and its `r3` twin. Find them with `git ls-files -ci --exclude-standard`
   before the move and `git add -f` them after.
2. **The executable bit is lost on 109 files.** With `core.fileMode`
   false, as the OneDrive checkout must have, git records every moved file
   as 100644. Put 100755 back on exactly the paths that had it in the old
   tree (`git update-index --chmod=+x`, from `git ls-tree -r -z HEAD`).
3. **`scripts/check-build.mjs` looks for Vite in the tool's own
   `node_modules`.** It must resolve it as Node does, walking up. A VH-226
   fix.
4. **`test/kept-identifiers.test.ts` pins the package name**
   `uon-video-helper` in `package.json` and both lockfile fields. VH-225
   listed it among the hidden identifiers kept. No code reads the package
   name (only `pkg.version`), and the browser-side keys are separate
   literals the same test still pins. D12 renames the package, and the
   Finisher no longer has a lockfile, so VH-226 supersedes VH-225's
   decision on that one point and rewrites that one test: the package is
   `uon-video-finisher` with no dependencies of its own. The other four
   pins stand (VH-225 stands for browser-side identifiers, as D12 says).
5. **Do not regenerate the hooks with `tools/harness.mjs`.** For an
   installation below the root it writes
   `${CLAUDE_PROJECT_DIR}/finisher/tools/…`, which assumes chats open on
   the repository root. The present hand-kept `${CLAUDE_PROJECT_DIR}/tools/…`
   is right for a chat on the tool's folder, and the test chats proved it.
6. **The built-in browser pane refuses service workers** before fetching
   `sw.js`. Stage 5's checks of a worker are read in Chrome.

### What pm-skills does with three ledgers in one repository

- **One handover per checkout.** `tools/handover.mjs` reads the last
  Session-end line in the whole history, and keeps its claim under
  `.git/pm-next/handover/`. A test session end committed as `VNG-11` was
  shown to chats on all three folders; the first chat claimed it and the
  other two were told it was held and to ask the owner. Since rule 3
  already allows one writer per checkout across all three ledgers, this
  fails safe: it names another ledger's next item, never starts work.
  Not real harm, so no fallback. A wish for pm-skills: scope the
  handover by the installation's prefix (`git log -- <prefix>`).
- **A chat on a tool's folder also loads the root's `CLAUDE.md`**, but not
  a second copy of the contract: one copy, its own folder's. Hooks fired
  once in each chat.
- **Name Graphics' ledger passes the 5.0.1 checker unchanged**, before any
  refresh. With the Finisher's 5.0.1 tools and verbs copied in (a stand-in
  for D8's refresh, which REFRESH-501 says are v5.0.1's bytes), its gate is
  green.

These go to the pm-skills project as wishes, with this evidence, in
stage 7.

## Stage 4: the plan in both ledgers (2026-11-26)

### The owner's answers

- D8, where the release is, 2026-11-26, verbatim:
  "https://github.com/djDAOjones/PM-Skills"
- The lockfile, 2026-11-26, verbatim: "do as you reccomend re the
  lockfile, let me know if you need me to do it, but I prefer you do it".
  So in stage 5 the Finisher's lockfile becomes the root's, byte for byte
  but for its root name, version and licence lines, and Name Graphics
  takes its dev tools' versions. The session does it.

### Step 1: Name Graphics to pm-skills 5.0.1 (D8): done

- pm-skills cloned to `/Users/joe/UoN-Video-Tools-spike/pm-skills`. The
  release is the folder `pm_skills/` (the root `tools/` is pm-skills' own
  installation). Tag `v5.0.1` is `fd5fb94`; all 26 of the Finisher's
  installed contract, tool and verb files equal `pm_skills/` there.
- A `v5.0.2` exists. The repository stays on 5.0.1, one version for every
  ledger (D8); a later refresh takes all three together.
- The lab build 4ab66b5 is in no history of canon, so the refresh route
  refused (19 reasons, "or restore the pm-skills copy"). Tried first on a
  throwaway clone, then done for real in four commits, every one with
  `node tools/check.mjs` at 0 failures, 0 warnings and `npm run check`
  green (126 tests):
  - `7b68321` REFRESH-501: open the item
  - `9b81e5d` REFRESH-501: restore pm-skills 5.0.0's own copies (a2a4b37)
    over the lab build
  - `74b5d07` REFRESH-501: refresh to build fd5fb94 (seven files, the
    same seven as the Finisher's refresh)
  - `9a9a414` REFRESH-501: the record (decision superseding INTAKE's lab
    build only, trajectory line, item closed, wish REFRESH-501.2)
- The record commit was first made with a markdown lint failure (a bare
  URL); it was fixed and the unpushed commit amended before anything
  else, so no commit is red.

### Step 2: the opening decisions: done

- Finisher, `1a9927ca` VH-226: widened to the UoN Video Tools restructure.
  The item file rewritten, the backlog line `[~]` and unblocked, two
  entries: "Widened to the UoN Video Tools restructure" (Supersedes the
  2026-10-28 PLAN-8 entry "VH-225 raised …", Deferred VH-129) and "The
  working copy becomes `finisher/` …" (Supersedes the 2026-10-05
  V3-CONFIRM "The OneDrive working copy, corrected after Codex's check").
  Supersedes takes one exact heading, hence two entries. The checker then
  asked for an archive (47 live of 45): `tools/archive.mjs` moved two
  entries. Gate green (2,001 passed, 1 skipped), checker 0 and 0.
- Name Graphics, `7be785f` VNG-11: opened, with an item file, a backlog
  line and an entry "Shared, not copied" superseding INTAKE. Gate green
  (126), checker 0 and 0.
- Still to supersede, in stage 5 when the test changes: VH-225's pin of
  the package name (see stage 3, point 4).

### Step 3: the prompt committed: done

Moved from the Finisher's root to `reviews/2026-11-25/` beside the owner's
sheet, in VH-226's commit `1a9927ca`. The Finisher's tree is clean.

### Step 4: pushed: done

- Finisher: `main` `b136d2cf..1a9927ca`, and `claude/vh-140-wip`
  (`49020a24`), `wip/2026-11-12-vh221` (`ea157f82`),
  `wip/2026-11-12-vh223` (`2d68850c`) as new branches (D13). On GitHub:
  those four branches and all five tags.
- Name Graphics: `main` `22d86e1..7be785f`. On GitHub: `main`, no tags.
- Each push to `main` rebuilds that repository's preview; only record
  files changed.

### Step 5: bundles: done

In the backup folder, each verified with `git bundle verify`:
`uon-video-finisher-all-refs.bundle` (144 MB, 23 refs),
`video-name-graphics-all-refs.bundle` (280 KB, 4 refs), and each
repository's `.git/config` copied beside them.

## Stage 5: the move (2026-11-26)

A fresh chat on this folder, started by the stage 1 to 4 chat on the
owner's word: "yes, start stage 5 in a fresh chat".

### Before step 1

- **The quiet point.** Asked in one question. The owner's answer,
  verbatim: "it's not quiet but we need to go". So the move went ahead
  on their word. Checked first: no process had a file open in either
  folder (`lsof +D`), no Claude Code or Codex process had either folder
  as its working folder, nothing listened on 5173 or 4173.
- Both repositories clean and level with `origin/main` after `git fetch`:
  Finisher `1a9927ca` (tree `ec7de538`), Name Graphics `7be785f` (tree
  `02249622`); no stash, the main worktree only.
- **Cloud-only check**, from each root: 0 and 0.
- Saved to the backup folder: `finisher-head-stage5.txt`,
  `ng-head-stage5.txt` and `finisher-ls-tree-stage5.z` (the old tree,
  NUL-separated, for the executable bits). 15,181 tracked files in the
  Finisher (stage 1's 15,180 plus the prompt); 109 are 100755; Name
  Graphics has none. Two tracked files are ignored by `*.log`, as the
  spike found.

### Step 1: the move: done

One `mv` of `2026-08-24 UoN Video Helper` into this folder as
`finisher/`. The old folder no longer exists.

### Step 2: settled, checked, pinned: done

- Cloud-only check from `finisher/`: 0.
- `samples/` compared with `samples-list-stage1.tsv`: identical, 34
  files, 17,341,222,454 bytes, no symlinks.
- The owner set "Always Keep on This Device" on this folder: "Done,
  pinned".

### Step 3: the lift: done, `5b58ac1b`

- `finisher/.git` moved up to the root. Staged with
  `git add -A -- . ':(exclude)RESTRUCTURE-LOG.md'`, the two ignored logs
  with `git add -f`, and 100755 put back on the 109 paths from the saved
  old tree (`python3 -I` into `git update-index --chmod=+x -z --stdin`).
- **Proof:** `git write-tree --prefix=finisher/` = `ec7de538`, the old
  `HEAD^{tree}`; 15,181 staged changes, every one R100; the root tree
  holds `finisher` only.
- Gate from `finisher/`, chained before the commit: green, 98 files,
  2,001 passed, 1 skipped (the baseline's). Log:
  `gate-stage5-lift.log` in the backup folder. A first run was stopped
  part-way by the owner's interrupt; nothing was committed then.
- **The gate's checker showed 78 warnings** during that run, against 0
  before. They were an artifact of the lift itself: `tools/check.mjs`
  compared the pre-lift HEAD, whose files had no `finisher/` prefix,
  with the moved working tree, so every wish looked new. Once the lift
  was committed, `node tools/check.mjs` from `finisher/` gave 0 and 0.
  `--commit` on the lift commit shows the same artifact. A wish for
  pm-skills (stage 7): the checker could follow a prefix rename.

### Steps 3 and 4: `.github/`, the root files and the install

- `finisher/.github/` and `finisher/package-lock.json` moved up by
  `git mv`.
- **The lockfile:** only the root's name and version changed
  (`uon-video-tools`, `0.0.0`; `"license": "MIT"` kept, so not that).
  Compared entry by entry with the Finisher's lockfile, saved first as
  `finisher-package-lock-stage5.json` in the backup folder: 244 entries
  each side, the same keys, 0 non-root entries changed. `npm ci` at the
  root left it as it was.
- `finisher/node_modules` removed (generated); `npm ci` at the root.
- Root files: `package.json` (the Finisher's dependencies, its engines,
  `check` running each tool's gate), `.gitignore`, `README.md` (what
  each folder is, chats open on a tool's folder, one install, one writer
  per checkout), `lobby/index.html` (the placeholder staff lobby: names
  and links, no branding, `noindex`, no script).
- The deploy workflow: one `npm ci`, each tool's gate from its own
  folder, each tool built with `BASE_PATH=/<repository>/<tool>/` and
  gathered into `_site/` beside the lobby. Same pinned SHAs, same
  least-privilege split.
- The Finisher's fixes (VH-226): `package.json` named
  `uon-video-finisher` with no dependencies (D12); `check-build.mjs`
  finds Vite by walking up; `kept-identifiers.test.ts`'s package test
  rewritten; a decision superseding "2026-11-04 — VH-225 — Commit 1: the
  visible name UoN Video Finisher in three languages, no address
  changed, the item open" on that one point; `tools/archive.mjs` moved
  one entry (46 live of 45).
- **Found by the gate, not by the spike** (the spike left `.github/` in
  the tool): the link check failed on four links in two reviews of
  2026-08-26 to `../../.github/workflows/deploy-pages.yml`. Nothing was
  committed. `check-links.mjs` is byte-identical in both tools and in
  D10's shared set, so it was not forked; the four links now name
  `../../../.github/…`, where the workflow lives, the reviews' text
  otherwise as written. Link check: 0 broken.

### Step 5: committed: done, `eaaf1c92`

VH-226, the gate from the root (the Finisher's from `finisher/`) chained
before it: green, 98 files, 2,001 passed, 1 skipped; checker 0 and 0.

### Step 6: Name Graphics merged: done, `0e19b21a` and `d68b6cbf`

- Its tree clean (0 lines of `git status --porcelain`), then one `mv` of
  `2026-11-05 Video Name Graphics` into this folder as `name-graphics/`.
  The old folder no longer exists.
- **Its `.git` is in the backup folder**, never deleted:
  `/Users/joe/UoN-Video-Tools-restructure-backup/video-name-graphics-dot-git`.
- `git fetch` of its `main` (`7be785f`) from there, `git merge -s ours
  --allow-unrelated-histories --no-commit`, `git add -A name-graphics`.
- **Proof:** `git write-tree --prefix=name-graphics/` = `02249622`, the
  old tree; 79 additions, nothing outside `name-graphics/`; the
  Finisher's tree unchanged; `319f867`, `22d86e1`, `7be785f`, `27f51dd`,
  `be80c4fa`, `v0.2.0`, `v0.3.0` and `v0.3.1` all resolve. No tracked
  file of Name Graphics' is ignored and none is 100755.
- `0e19b21a` VNG-11, the merge (parents `eaaf1c92` and `7be785f5`): its
  gate from `name-graphics/` on its own install, green, 5 files, 126
  passed; checker 0 and 0. Made as `8efed19d` with "its two commits" in
  the subject; Name Graphics has seven since its refresh, so the unpushed
  message was amended, the tree and parents unchanged.
- `d68b6cbf` VNG-11: its lockfile, dev dependencies, `node_modules` and
  its own deploy workflow removed; a decision records that its dev tools
  now run at the root lockfile's versions (73 differ, eslint 10.14.0 to
  10.9.1, vite 8.3.6 to 8.2.2, vitest 4.1.12 to 4.1.11, typescript-eslint
  8.72.1 to 8.68.0). Gate from `name-graphics/` on the root install:
  green, 126 passed; checker 0 and 0.

### Step 8: the deploy workflow takes in Name Graphics

The root `check` runs both tools' gates; the workflow runs each tool's
gate from its folder, builds each with its own `BASE_PATH` and gathers
both beside the lobby, which now links to both. Committed as
`71700ba1` VH-226, the root gate chained before it: green, the Finisher
98 files, 2,001 passed, 1 skipped, then Name Graphics 5 files, 126
passed; both checkers 0 and 0.

A dry run of the workflow's build and gather, off OneDrive
(`/Users/joe/UoN-Video-Tools-spike/stage5-site/`): both builds made with
`BASE_PATH=/UoN-Video-Tools/<tool>/`, each page's script and stylesheet
under its own folder, the Finisher's `sw.js` and `offline-files.json`
beside its page.

### Step 10: hooks: checked, not regenerated

Both tools' `.claude/settings.json` are byte-identical and unchanged:
`node "${CLAUDE_PROJECT_DIR}/tools/session.mjs"` and `tools/handover.mjs`,
both present in each tool. Run by hand from each tool's folder with
`CLAUDE_PROJECT_DIR` set to it and a startup event on stdin: both exit 0,
silent, and no new handover claim was made (no current session end).
`tools/harness.mjs` was not run. That a hook fires exactly once in a
real chat opened on each tool's folder was proved by the spike's three
test chats on these same files; it was not re-proved in a live chat in
stage 5, so it is the owner's to see in the next chat on each folder.

### Step 11: the rename: done

The owner, asked, chose "Yes, you rename it". `gh repo rename
UoN-Video-Tools` on `djDAOjones/UoN-Video-Finisher`, then `origin` set
to `https://github.com/djDAOjones/UoN-Video-Tools.git`. The old preview
address stopped working from that moment.

### Found at the rename: both repositories had moved on GitHub

`git fetch` after the rename showed `origin/main` at `c63935e0`, not
`1a9927ca`. The owner had merged a REFRESH-502 pull request in each
repository during the move (UoN-Video-Tools #8 at 11:50:59Z,
Video-Name-Graphics #1 at 11:51:03Z): pm-skills 5.0.2 (build `b6a6707`)
"on the owner's word of 2026-11-26 that the installations on 5.0.1 take
5.0.2". Each brings five tool and verb files and its record.

- Plain `git merge origin/main` sent the five tool files to
  `name-graphics/` (rename detection, the two tools' pm-skills files
  being byte-identical). Aborted; the first abort was refused once
  ("not uptodate", a timestamp touch, likely OneDrive; nothing differed)
  and went through on the second try.
- `7fe0f897` VH-226: `origin/main` merged with `-Xsubtree=finisher`.
  One conflict in `finisher/project/decisions.md`, both 2026-11-26
  entries kept, newest first. `finisher/tools/` and `verbs/` equal
  `c63935e0`'s. Gate from `finisher/` green (2,001 passed, 1 skipped).
- `38145944` VNG-11: Video-Name-Graphics' `main` (`6c9ecf49`) fetched
  from GitHub and merged with `-Xsubtree=name-graphics`. One conflict in
  its decisions, resolved the same way. Its `tools/` and `verbs/` equal
  `6c9ecf49`'s and the Finisher's: **both tools are on pm-skills 5.0.2**,
  one version (D8). Gate from `name-graphics/` green (126).
- Then VH-226: `tools/archive.mjs` in the Finisher (46 live of 45),
  which pays and retires wish REFRESH-502.1. Committed as `c92510e6`,
  the root gate chained before it: green, the Finisher 2,001 passed, 1
  skipped, Name Graphics 126 passed; `node tools/check.mjs --commit
  HEAD` 0 and 0.

### Step 9: the gates: done

Green from `finisher/`, from `name-graphics/` and from the root at each
commit, chained before it, none deleted or skipped (the one skip is the
baseline's). Logs: `gate-stage5-*.log` in the backup folder.

### Step 12: pushed and read in Chrome: done

- `git push origin main`: `c63935e0..c92510e6`, a fast-forward, 19
  commits. Pages run 45817450087: build and deploy green (log
  `pages-run-45817450087.log` in the backup folder).
- `curl`: `/UoN-Video-Tools/`, `/finisher/`, `/name-graphics/` and
  `/finisher/sw.js` 200; the old `/UoN-Video-Finisher/` 404, as D4 said.
- Read in Claude in Chrome, the owner's profile:
  - **The lobby:** "UoN Video Tools", `noindex, nofollow`, no script, two
    links (`finisher/`, `name-graphics/`), no registration, no
    controller.
  - **The Finisher:** version line `v0.3.1+20261126.c92510e`. All 30
    files `offline-files.json` lists answer 200 (3.96 MB, every closing
    master among them, no 404). `sw.js` at the scope
    `/UoN-Video-Tools/finisher/`; after a reload it controls the page,
    and its one cache, named for that scope and build, holds exactly the
    30 listed files, none missing, none extra. A job on the synthetic 6 s
    source with the defaults: "Your video is ready", 5.2 MB, "a cut to
    the blue closing card".
  - **Name Graphics:** the shell page, "Video Name Graphics", its script
    and stylesheet 200 under `/UoN-Video-Tools/name-graphics/`; not
    controlled, while the Finisher's worker was registered on the same
    origin. The lobby, read again then, not controlled either.
- **Found, not resolved: the page's own registration failed twice in
  this profile.** On the first two loads the worker was registered by
  the page, sat "installing" (the first time over two minutes, while a
  long script of mine held the tab and froze its renderer once), then
  the registration was dropped with nothing kept. The same `addAll` run
  from the page into a throwaway cache took 2 s with no error;
  registering `sw.js` by hand installed and activated it in 1.4 s, and
  from then on it behaved as above. `register.ts` is a plain
  `register(scriptUrl)`, so the code drops nothing itself. Not seen
  locally (the nested Xerte run registered at once), nor in VH-161's
  fresh-profile reading on Pages. This origin, `djdaojones.github.io`,
  holds 4.2 GB of "fileSystem" data in this profile from earlier use of
  the old preview, outside the stored-jobs folder (which was empty);
  it was left alone. For VH-161 and the owner: whether a worker on
  Pages installs on a first visit in the owner's own Chrome.
- **Not done, a person's:** Save (it downloads a file), and the output
  read frame by frame. Afterwards, on this origin: my job's folder
  removed, the worker at `/UoN-Video-Tools/finisher/` unregistered, its
  cache deleted; nothing else touched. The tab of each run is left open
  because the page asks before leaving an unsaved video; the owner
  closes it.

### Step 13: the Xerte package: done

- From `finisher/` on a clean tree, `npm run package:xerte`: exit 0,
  `uon-video-finisher-v0.3.1+20261126.c92510e6-site.zip`, 36 files,
  3,937,089 bytes. **Flat:** no entry has a folder. Its kinds are the
  0.3.1 zip's plus one `.js` and one `.map` (`sw.js` and its map) and
  one `.json` (`offline-files.json`).
- That zip was moved to the backup folder, so `release/` holds only its
  three zips as before. **The 0.3.1 zip is unchanged:** sha256
  `b0e43222…dd458d` before and after (`release-0.3.1-sha-stage5.txt`).
- **Run from a nested path:** unzipped under
  `/Users/joe/UoN-Video-Tools-spike/xerte-check/site/deep/nested/finisher/`,
  served by `python3 -m http.server` on 127.0.0.1:8781, read in Claude
  in Chrome. The page's script and stylesheet are `./`-relative; version
  line `v0.3.1+20261126.c92510e6`; `sw.js` active at the scope
  `/deep/nested/finisher/`, one cache named for that scope and build. A
  job on a synthetic 6 s source (made with ffmpeg, nothing from
  `samples/`), the defaults, Cut to the blue closing card: "Your video is
  ready", 5.2 MB, "a cut to the blue closing card". Every file of the
  package answered 200 or 304 (the blue 1080p tail among them); the one
  404 was `/favicon.ico` at the server's root, outside the package.
- **Not done:** Save, which downloads a file; the output was not read
  frame by frame. Afterwards in that Chrome profile, for
  `127.0.0.1:8781`: the worker unregistered, its cache deleted, the
  stored-jobs folder removed; the server stopped. Nothing uploaded.

### Step 14: the old Name Graphics repository: done

The owner, asked, chose "Yes, do both". First checked: both refs of
`djDAOjones/Video-Name-Graphics` (`main` `6c9ecf49` and `pm/5.0.2`
`d0fe8cc8`) are ancestors of UoN-Video-Tools' `main`. Then its Pages site
deleted (`gh api -X DELETE …/pages`; the old address 404) and the
repository archived (`gh repo archive`; `isArchived` true). Its `.git`
stays in the backup folder.

### After the move

- `samples/` compared again with the stage-1 list: identical, 34 files.
- Cloud-only from the root (outside `node_modules`): 0. No conflict
  copy. `finisher/pm_skills/` equals `1a9927ca`'s `pm_skills/`.
- `finisher/release/` holds its three zips as before, the 0.3.1 zip's
  sha256 unchanged; `finisher/_archive/` and
  `finisher/.claude/settings.local.json` in place, untouched.
- No `.claude/launch.json` was added at the root. The two old project
  folders no longer exist beside this one.

### What only a person verified, or has yet to

- That each tool's hooks fire once in a live chat opened on its folder
  (the spike's test chats proved it on the same files; not re-run).
- Save of a finished video, on Pages and from the Xerte package, and the
  outputs read frame by frame.
- The service worker's first-visit install on Pages in the owner's own
  Chrome (above).
- The Xerte upload itself (VH-14; nothing was uploaded).

## Stage 6: the parent ledger and the shared set (2026-11-26)

A chat on this folder, started by the owner's chat after stage 5. The
owner's words, 2026-11-26, verbatim: "start stage 6, and insert upgrade
to pm-skills 5.0.3 at the earliest advisable opportunity". The earliest
advisable point is before step 1, so the parent ledger is founded on the
same version the tools run (D8).

### Step 0, inserted: both tools to pm-skills 5.0.3: done

- The release: canon (`https://github.com/djDAOjones/PM-Skills`) fetched
  in the clone at `/Users/joe/UoN-Video-Tools-spike/pm-skills`. **No
  `v5.0.3` tag exists**; `main` is `d599678` ("REL-503: pm-skills 5.0.3,
  the night's work released; number set (#12)"), `pm_skills/VERSION`
  5.0.3. So the build is named by commit, and both records say so. It is
  checked out as a detached worktree beside the clone,
  `/Users/joe/UoN-Video-Tools-spike/pm-skills-503`.
- 5.0.3's Upgrade action 1 asks a project on 5.0.2 for the refresh and
  nothing more: no signed file, setting or hook. So no question for the
  owner.
- Tried first on a throwaway clone of `cba68d2f`,
  `/Users/joe/UoN-Video-Tools-spike/trial-503/`: in each tool the route
  replaced the same five files (`tools/VERSION`, `tools/migrate.mjs`,
  `tools/view.mjs`, `verbs/control.md`, `verbs/intake.md`) and wrote
  nothing under `project/`.
- Then here, per tool, the pattern REFRESH-501 and REFRESH-502 used: open
  the item, the refresh alone, the record. Every commit touches only its
  tool's folder; each gate chained before its commit.

- `7a1426cc` Finisher: REFRESH-503 opened. Checker 0 and 0.
- `b7390269` Finisher: refresh to build d599678. The 26 installed files
  equal d599678's `pm_skills/`; 167 ledger files byte-equal; checker 0
  and 0; gate green, 98 files, 2,001 passed, 1 skipped.
- `e34c47f5` Finisher: the record, with `tools/archive.mjs` (46 live of
  45, the close verb's Archive step). The first draft's Decision line
  put the ten-entry slice over its 1,000 words; it was shortened before
  the commit. Checker 0 and 0, `--commit HEAD` 0.
- `d5151a5c` Name Graphics: REFRESH-503 opened. Checker 0 and 0.
- `b3d6eb04` Name Graphics: refresh to build d599678. The 26 files equal
  d599678's and the Finisher's; 19 ledger files byte-equal; checker 0
  and 0; gate green, 126 passed.
- `04d9b907` Name Graphics: the record. Checker 0 and 0, `--commit HEAD`
  0.
- Root gate after: green, the Finisher 2,001 passed and 1 skipped, Name
  Graphics 126 passed, both checkers 0 and 0
  (`gate-stage6-step0-root.log` in the backup folder).

### Step 1: the parent's ledger founded: done

- `node <clone>/pm_skills/install.mjs --to .` at d599678: 41 files
  (`AGENTS.md`, `CLAUDE.md`, `project/`, `tools/`, `verbs/`), no
  conflict. The three contracts are byte-identical.
- Hazard check (intake step 1): one worktree, no stash, no open pull
  request; of the two scheduled tasks, neither names this project.
- **Harness:** `tools/harness.mjs --print` at the root names
  `${CLAUDE_PROJECT_DIR}/tools/…`, right for a chat on the root, but
  also writes a sandbox, a strict network allowlist and a deny list
  (SendMessage, Workflow, WebFetch among them) that neither tool has.
  Not written. `.claude/settings.json` is the tools' hand-kept file,
  byte for byte (hooks only). The session and handover hooks, run by
  hand with `CLAUDE_PROJECT_DIR` the root, exit 0. That they fire once
  in a live chat on the root is the owner's to see.
- **`tools/structure.mjs` stops on this repository** (`spawnSync git
  ENOBUFS`, the Finisher's 15,180 files); `project/structure.md` was
  written by hand. A wish for pm-skills, stage 7.
- The gate: the root `npm run check` now ends with `node
  tools/check.mjs`, the parent's checker.
- Standards: WCAG 2.2 AAA, Carbon and Nielsen with pm-skills 5.0.3's
  digests; house conventions as a short digest pointing at the
  Finisher's, not a third copy.
- Backlog: UVT-1 to UVT-3 (stage 6, steps 2 to 5; PLAN-1), UVT-4 and
  UVT-5 (the two items below, each with an item file), UVT-6 (stage 7's
  parent half).
- **The owner's answers, 2026-11-26, verbatim choices:** the profile,
  rules and brief: "Sign all three (Recommended)"; Handoff and Network:
  "Confirm both (Recommended)"; D9 in both tools' rules files, Name
  Graphics' stale sibling line replaced and the Finisher's line "Local
  `main` is stale by design; what is published is `origin/main`."
  dropped to stay within 600 words: "Yes, sign both (Recommended)".

### Step 2: the ID-folder check and the boundary rule (UVT-1): done

- `884acca9` UVT-1: `scripts/check-commit-ids.mjs` (every commit after
  INTAKE `11af3017`, merges left out; in CI's shallow checkout the
  newest only), `eslint.boundaries.js` (`uvt/boundaries`, resolving each
  import), the root's `eslint.config.js`, 9 node:test tests, the root
  gate's `check:root`, and the deploy workflow running it after the
  tools' gates.
- `977d39c2` VH-226 and `89c158ff` VNG-11: each tool's ESLint config
  includes the rule; a probe import of the other tool was reported in
  each and deleted.
- Over `c119477b..HEAD` the check flags exactly the two founding-era
  commits that wrote two ledgers' folders (`ae427d96` PLAN-10,
  `bdcd3790` VH-226's log), as the rules' exception allows; from the
  founding on, 0 failures.
- Gates: the root gate green before `884acca9`; each tool's green
  before its commit (logs `gate-stage6-*.log` in the backup folder).

### Steps 3 and 5: the identical set in `shared/` (UVT-2): done

D10's three green steps, each with its gate chained before the commit:

- `e4710c79` UVT-2: `shared/core/` (nine files) and
  `shared/styles/tokens.carbon.css`, byte-identical to the Finisher's at
  `349b3ae4`; `shared/`'s own `tsconfig.json`, `env.d.ts`,
  `vitest.config.ts` and README; the root's ESLint config lints
  `shared/` type-checked; `check:root` runs that lint, `tsc -p shared`
  and the shared tests (4 files, 25 passed). Root gate green.
- `9ad7635d` VH-226: 35 import lines in 26 files and `app.css` switched,
  the copies deleted (`keep-awake`, `watchdog` stay); the shared tests
  in its vitest include; `server.fs.allow` for `../shared/`; the two
  tests that read the tokens by path; 4 links and 17 backticked paths in
  old records (the checker refuses a path outside the tool's folder);
  three live docs. Gate green, 98 files, 2,001 passed, 1 skipped, the
  same counts. Dev server: shared logger 200, `name-graphics/` 403.
  `vite build --mode xerte`: flat, 35 files.
- `730e4b44` VNG-11: 3 import lines and `app.css` switched, its copies
  deleted (`src/core/` gone), the same config changes. Gate green, 5
  files, 126 passed, the same counts. Dev server: shared logger 200.
- **Step 5:** each tool's gate runs the four shared test files under its
  own build-time values; the root gate runs every tool's gate and
  `shared/`'s own lint, type check and tests.
- No second copy: neither tool holds any of the ten files.
- For pm-skills (stage 7): the item-file path check refuses a path
  outside the installation, so a ledger below the root cannot name
  `../shared/…`.

### Found after the push: the deploy run failed on the commit-ID check

- Pages run 45833013588 (`349b3ae4`) failed at `check:root`: the
  workflow's checkout is one commit deep, so git showed that commit
  without a parent, every file in the repository as added, and the check
  judged UVT-1 to have written `finisher/`. The preview was not deployed
  from `349b3ae4`; run 45834443117 (`15d8ff85`) would fail the same way.
- Fixed under UVT-1: the checkout fetches two commits deep, and the
  script judges no commit whose parent it cannot see. Proved on local
  shallow clones: depth 1, 0 checked; depth 2, the newest checked, 0
  failures; the full history, 11 checked, 0 failures.
- `15d8ff85`'s Verify line says 11 commits; the check counted 10.

### Where stage 6 stopped (context over the session's 350k budget)

Done: step 0, step 1, step 2 (UVT-1), steps 3 and 5 (UVT-2). Left:

1. **Step 4, UVT-3:** a base ESLint and TypeScript config at the root,
   each tool extending it, and one `.editorconfig`, Prettier and
   markdownlint config; in three green steps like UVT-2 (a UVT commit
   adds the base, then a VH-226 and a VNG-11 commit switch each tool).
   The root's `eslint.config.js` and `shared/tsconfig.json` already hold
   the Finisher's settings, so the base can be factored from them.
2. **D9 in both tools' rules files**, signed by the owner on 2026-11-26
   ("Yes, sign both (Recommended)"): Name Graphics' sibling line
   replaced by D9's rule; the Finisher's line "Local `main` is stale by
   design; what is published is `origin/main`." dropped and D9's rule
   added, under 600 words. Each in its own commit with a decision
   superseding nothing, the signature line naming the date.
3. Then the stage's close in the log, and a fresh read of the Pages run.

### Orchestration handed over (2026-11-26)

The orchestrator chat's context grew long, and the owner asked for the
orchestration to move to a fresh chat. A new chat on the root now runs
the rest: stage 6's step 4 (UVT-3), D9 in both tools' rules files and
the stage's close; then stage 7 (UVT-6 the parent's half); then VH-129,
UVT-4 (with VH-247 and VNG-12), UVT-5 and the owner's 26 accepted
points (PLAN-9), each with the owner's go-ahead. It picked up at
`054f770c`, equal to `origin/main`, the tree clean. The stage 5 and
stage 6 chats are idle and stay so unless the owner says otherwise.

### Stage 6 closed (2026-11-26)

A chat on the root, started by the orchestrator at `b58a9353`, equal to
`origin/main`, the tree clean. Every commit had the root gate chained
before it with `&&` and the commit-ID check after it; logs
`gate1.log` to `gate6.log` were kept in that chat's scratchpad only.

**Step 4, UVT-3, the shared tool configs, in three green steps:**

- `c6d3de67` UVT-3: `tsconfig.base.json` (the compilerOptions every
  folder carried) and `eslint.base.js` (the type-checked rules, Node's
  globals for scripts, and `toolConfig()`, a tool's whole config but
  its ignores) at the root; `.editorconfig`, `.prettierrc.json` and
  `.markdownlint.json` in the tools' bytes; `shared/tsconfig.json`
  extends the base, the root's ESLint config applies `typeChecked()` to
  `shared/`, and `check:root` lints `eslint.base.js`.
- `5fceceb4` VH-226 and `82ab57b4` VNG-11: each tool's
  `eslint.config.js` is `toolConfig()` with its own ignores, its
  `tsconfig.json` extends the base with its own `include`, its
  `.markdownlint-cli2.jsonc` extends `../.markdownlint.json`, and its
  three plain copies are deleted. `.prettierignore` and
  `.markdownlint-cli2.jsonc` stay per tool: their ignores differ. The
  Finisher's `DEV-INFRASTRUCTURE.md`, "Editor config", says where each
  lives.
- Resolution: Prettier and EditorConfig search upward, and the root's
  `.editorconfig` says `root = true`; markdownlint-cli2 does not look
  above its folder, hence the explicit `extends`.
- Proofs at each step, against captures taken before any change:
  `tsc --showConfig` identical in `shared/` and both tools; `eslint
  --print-config` identical for a TypeScript source, a script and the
  config itself in each folder; Prettier's output on two files per tool
  identical to the old layout's (`src/main.ts` and `vite.config.ts`
  were unformatted before too; Prettier is not in the gate). Probes,
  written and deleted at each step: a type error (TS2322) and an
  explicit `any` still failed in `shared/` and both tools, a skipped
  heading level (MD001) in both tools, and a long line passed (MD013
  off, so the root's markdownlint config is read).
- `5e517d21` UVT-3: the record: the decision entry (digest rule
  applied: house conventions, tool configs at the root, each tool
  extending them and adding only what it alone needs), the trajectory
  line, the item struck, the phase "Phase 1 — Stage 6, … — CLOSED
  2026-11-26" reconciled against PLAN-1, UVT-6's blocker dropped, and a
  local recall, 8/8. Pushed `b58a9353..5e517d21`; Pages run
  45837601424 green.

**D9 in both tools' rules files, on the owner's word of 2026-11-26,
"Yes, sign both (Recommended)":**

- `224d8be5` VH-226: D9's rule, word for word, in the Finisher's
  Environment where "Local `main` is stale by design; what is published
  is `origin/main`." was; Signed 2026-11-26; a decision entry, Supersedes
  none. `tools/archive.mjs` moved the oldest live entry (VH-223,
  2026-11-05) verbatim, 45 live. The file is 598 words of 600.
- `4b28dd8c` VNG-11: D9's rule in place of the sibling line; Signed
  "Owner: Joe, 2026-11-26." in place of the INTAKE's delegated signature;
  a decision entry, Supersedes none (the copied-code decision was
  already superseded by "2026-11-26 — VNG-11 — Shared, not copied").
  The file is 546 words of 600. Pushed `5e517d21..4b28dd8c`; Pages run
  45838103873 green.
- **One warning in each tool's checker, left standing:** Always, with
  its Environment, is over its 400-word guideline (the Finisher 451,
  Name Graphics 425), inside the 600-word hard budget. Each decision
  defers it to stage 7, which reviews these Environment lines (the
  prompt's stage 7, step 2).

**Gates:** the root gate green before every commit, the same counts
throughout: the Finisher 2,001 passed and 1 skipped, Name Graphics 126,
`shared/` 25, node --test 9, the commit-ID check 0 failures (19 checked
at `4b28dd8c`), the parent's checker 0 and 0, each tool's 0 and 0 until
its D9 commit, then 0 and 1. No dependency changed.

**What only a person verified, or has yet to:** nothing in this stage
needed a person. That an editor applies the root's `.editorconfig` to a
tool's file is by EditorConfig's upward search, not seen in an editor.
The owner's signatures are their chat answer of 2026-11-26, quoted
above. The deploy run for this log's own commit is read after its push
and reported to the orchestrator.

**Found, not changed:** two `.load.log` files under
`finisher/reviews/2026-10-25/` are tracked though ignored, since the
move (`5b58ac1b`); they are the Finisher's, for stage 7 to weigh.

### Written for stage 6, now UVT-4 and UVT-5: the parent's first items (the owner's word of 2026-11-26)

Stage 6 opens these two as the parent's first `UVT-n` items, with an item
file each, after pm-skills 5.0.3. The owner's words in chat, 2026-11-26:
"I have collegues willing to help with translation - how should that be
managed accross apps? a single excel for all the apps with a field for
which app(s)? it would be good to date translation so updated
translation requests are only requested on parts needed". They chose
"Stage 6 first (Recommended)" for where the shared work lives and
"Requests of changes only (Recommended)" for how colleagues receive it.

**1. The translation register: one record of every tool's words, and
change-only requests.** Owned by the parent, in `shared/`.

- One register in the repository, one row per message, built from each
  tool's English table by a script, never kept by hand. Each row: the
  key; which tools use it (the Finisher, its student edition, Name
  Graphics; a message two tools share is one row); the English; where it
  shows; the translator's note; whether it is drawn into a video or
  graphic; when the English last changed and a fingerprint of it. For
  each language: the translation, its status (machine draft, reviewed,
  out of date), when it was reviewed, and the fingerprint of the English
  it was made from.
- When a tool's English changes, the script gives the row a new
  fingerprint and date and marks every language's translation out of
  date, keeping the old one as a starting point. A date alone cannot
  tell an edited string from an unchanged one; the fingerprint can.
- A request is one Excel workbook per language, holding only that
  language's new, out-of-date and unreviewed rows: which tools, where it
  shows, the note, the English now, the English before (for a changed
  row), the current translation to correct, a column for the answer and
  one for comments. The key and fingerprint ride in locked columns.
- A returned workbook is merged by a script: a row is taken only if its
  fingerprint still matches (otherwise it is reported as changed while
  out for translation), its placeholders are checked, and it is marked
  reviewed with the date. The tools' zh-Hans and ms-MY tables are then
  written from the register; the gate fails if a table and the register
  disagree.
- The repository is public: the register records that a row was
  reviewed and when, not the colleague's name, unless the owner says
  otherwise.
- The Finisher's sheet and scripts (`finisher/src/i18n/sheet.ts`,
  `scripts/strings-sheet.mjs`, `scripts/strings-table.mjs`) are the
  starting point, moved to `shared/`, not rewritten.

**2. The colleagues' first round (the owner's).** Who checks zh-Hans and
who ms-MY; the first request sent once VH-129's words are in, so the
student edition's words go with the rest; the returned workbooks merged;
each language's "machine translated" note lifted once all its rows are
reviewed (the Finisher's wish VH-105.2). Name Graphics' words join a
later round as its page settles; only what changed is asked for.

## Stage 7

Not started.

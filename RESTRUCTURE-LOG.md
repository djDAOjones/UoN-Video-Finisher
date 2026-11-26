# UoN Video Tools: the restructure log

The running record of the restructure described in
`../2026-08-24 UoN Video Helper/UoN-Video-Tools-restructure-prompt.md`.
A fresh chat opened on this folder resumes from this log and that prompt.

This folder has no contract, no ledger and no hooks until stage 6 founds
the parent's ledger.

## Where it stands

- **Stage reached:** stage 4 done: the plan is in both ledgers, both
  repositories and the three local-only branches are pushed, and bundles
  are in the backup folder. Nothing has moved.
- **Next:** stage 5, the move, in one sitting, best in a fresh chat on
  this folder.
- **Waiting on the owner:** the word to start stage 5 at a quiet point
  (both project folders closed in every other app and chat, OneDrive "Up
  to date"); during it, "Always keep on this device" on this folder
  (step 2), and the rename of the GitHub repository or the word for
  `gh repo rename` (step 11).
- **The restructure prompt** now lives at
  `../2026-08-24 UoN Video Helper/reviews/2026-11-25/UoN-Video-Tools-restructure-prompt.md`
  (committed by VH-226 in `1a9927ca`); after stage 5 it is
  `finisher/reviews/2026-11-25/UoN-Video-Tools-restructure-prompt.md`.

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

## Stages 6 and 7

Not started.

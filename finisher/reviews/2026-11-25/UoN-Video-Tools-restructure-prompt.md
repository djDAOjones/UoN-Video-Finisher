# UoN Video Tools: the restructure prompt

Written 2026-11-25 by a read-only chat in the Video Finisher's checkout. Nothing in it has been carried out. It is a brief for one later Claude Code session, which makes the owner's two video projects into one parent, UoN Video Tools, with shared base code.

## How to start

For the owner, Joe:

1. Wait for a quiet point: no chat, walk or dev server running in either project folder, on either Mac, and OneDrive showing "Up to date".
2. In Finder, make an empty folder beside the two project folders, named `2026-08-24 UoN Video Tools` (decision D1 below, which you approved).
3. Open a new Claude Code chat on that empty folder and send: "Read and carry out the restructure prompt at `../2026-08-24 UoN Video Helper/UoN-Video-Tools-restructure-prompt.md`."

The chat is opened on the new parent folder because the two project folders move during the work, and a chat cannot keep working from inside a folder that moves.

## Your task

You are the session that carries out the restructure. The owner said, on 2026-11-25:

> the parent project should be UoN Video Tools, and there are standalone tools within that which share a lot of base code, the tools include the Video Name Graphics Generator and the Video Finisher (which soon must be split into staff and student versions). We need to figure out how to maintain a shared code base and differences.

The end state: one folder and one GitHub repository, UoN Video Tools, holding each tool as a folder with its own pm-skills ledger, a parent ledger and one place for shared code, a lobby page at the top of the preview, every gate green, the preview and the Xerte package checked, and the record written in all three ledgers. Development then restarts with the Finisher's staff and student editions and the 26 accepted points of the owner's sheet, each checked by Codex.

How to work:

- The owner is a solo "vibe coder" who works through AI sessions. Do the work, ask only what is theirs to decide, and explain in plain words when asked. Use they/them for the owner.
- Each tool has an `AGENTS.md` contract of twelve rules. Follow it whenever you write in that tool's files: read its rule-1 set before your first change there, one item and one ID per commit, a `Verify:` line, the gate green before a close, `node tools/check.mjs` before closing.
- Your own folder, the parent, has no contract and no hooks until stage 6 founds its ledger. Say so in the decision entries.
- The owner answered the decisions on 2026-11-25; "Owner decisions" says which are settled. Every one is settled, so before anything moves ask only about what stage 1 shows is no longer true. Record the owner's words verbatim.
- Stop at the end of each stage and say what is true. Keep a log, `RESTRUCTURE-LOG.md`, in the parent folder: the stage reached, each decision's answer, each check's result. The Finisher's profile sets a session at 200k tokens of context, so end the chat at a stage boundary when context runs high; a fresh chat opened on the parent folder resumes from the log and this prompt.
- When the owner has to edit a file by hand, follow their standing instruction: a clickable link to the file, numbered steps, exact find and replace blocks with no gaps, one edit per step, save with Cmd+S, then you check the file and confirm.
- Never write to, move or delete anything inside `samples/`. Never edit an old decision entry; supersede it. A change no session made (a revert, a OneDrive conflict copy) is reported to the owner, never committed.

## What was measured on 2026-11-25

Measured at the Finisher's `be80c4fa` and Name Graphics' `22d86e1`. If either HEAD has moved, measure again before relying on a number.

### The two projects

| | Video Finisher | Video Name Graphics |
| --- | --- | --- |
| Folder | `2_Projects/2026-08-24 UoN Video Helper` | `2_Projects/2026-11-05 Video Name Graphics` |
| Repository | `djDAOjones/UoN-Video-Finisher` | `djDAOjones/Video-Name-Graphics` |
| State | release 0.3.1, development paused, 50 commits since `27f51dd` | the seed only: two commits, `319f867` and `22d86e1` |
| Ledger | pm-skills 5.0.1, IDs `VH-n` | pm-next v3.1 at lab `4ab66b5`, IDs `VNG-n`, no `tools/VERSION` |
| Runtime dependencies | one, `mediabunny` | none |
| Size | 15,180 tracked files, 868 MB; `.git` pack 168 MB | 9 core files, a 193-line stylesheet, a page shell |

Both paths sit under `/Users/joe/Library/CloudStorage/OneDrive-TheUniversityofNottingham/_Joe Bell UoN Files/`.

A correction to what you may be told: Name Graphics does not run pm-skills 5.0.1. Twelve of its thirteen tool files differ from the Finisher's. Its `AGENTS.md` is byte-identical to the Finisher's.

### What is shared today

Name Graphics was seeded by `22d86e1` (VNG-1), which copied from the Finisher at `27f51dd`. Drift since that copy:

| Files | Name Graphics against the copy | Finisher since the copy |
| --- | --- | --- |
| `src/core/`: `diagnostics`, `egress`, `logger`, `redact` with their tests, and `version` (9 files) | identical but for a two-line header, "Copied from the UoN Video Finisher at 27f51dd (VNG-1); owned here, never shared." | unchanged |
| `src/styles/tokens.carbon.css` | identical | unchanged |
| `.editorconfig`, `.prettierrc.json`, `.markdownlint.json`, `check-links.mjs` | identical | unchanged |
| `eslint.config.js`, `tsconfig.json`, `.prettierignore`, `.markdownlint-cli2.jsonc` | 2 to 15 lines, all about `pm_skills/` and `scripts/` | unchanged |
| The nine dev dependencies | same packages, same version ranges | unchanged |
| `.github/workflows/deploy-pages.yml` | same steps and action SHAs; comments differ | unchanged |
| `vite.config.ts` | the build id, `BASE_PATH`, port and source map parts only | +68 lines, the offline service worker (VH-161) |
| `src/styles/app.css` | cut to 193 lines | +119 −20, now 2,230 lines |
| `UI-STANDARDS.md` | an adapted copy, 109 lines apart | unchanged |

So nothing shared has drifted yet. The cost of copying is still ahead: Name Graphics' open backlog names Finisher code five more times. VNG-2 needs the UoN palette, logo and Lora; VNG-4 the language machinery and switcher (`src/i18n/`, 4,800 lines); VNG-5 the step pattern; VNG-8 help, feedback, the problem report and the accessibility statement; VNG-9 the Xerte package.

### What differs

- Finisher only: `src/audio/` (4,600 lines), `src/media/` (12,000), `src/workers/`, `src/offline/`, `src/ui/` (10,300), `src/config/`, a 4,280-line `src/main.ts`, a 930-line `index.html`, the 24 closing masters in `public/branding/`, `scripts/`, the spike pages, `docs/`, `pm_skills/` (frozen), `reviews/` (14,614 tracked files, 859 MB) and `samples/` (16 GB, untracked, ignored).
- Brand: the Finisher has the UoN brand wired in (`src/styles/tokens.brand.css`, the logo, Lora). Name Graphics has brand packs chosen at build time, `brands/neutral` now and `brands/uon` to come, and a rule that the neutral build carries nothing of the University.
- The Finisher has a Xerte build (`vite build --mode xerte`, `scripts/package-xerte.mjs`); Name Graphics does not yet.

### Staff and student in the Finisher today

One build, with a run-time switch. A student edition is VH-129, in the Icebox.

- `src/config/video-kind.ts`: `VideoKind` is `'staff'` or `'submission'`, the page opens on staff, and the choice is remembered in the browser.
- Closings: a staff video chooses an official closing (type, onset, colour) and may tick Internal use only. A submission may have no closing; when it has one it is always Internal use only, ticked and locked (`closingControlsFor`, `src/ui/closing-choice.ts`).
- Title card: optional for staff, with the General layout. Locked on for a submission, with four required fields (assignment, module, convenor or tutor, one to eight student IDs), the running time and the date (`src/config/cards.ts`, `src/ui/title-card-step.ts`, `src/media/title-card.ts`).
- The words for both sides in three languages (`src/i18n/`), the result summary, and `videoKind` in the worker protocol.
- The wiring: about twenty calls of `chosenVideoKind()` in `src/main.ts`, and the switch's markup in `index.html`.
- VH-129 already asks for a build-time edition beside the Xerte mode: official closing code left out of the student bundle, no official master in its package, the pipeline refusing an official closing, and a test that proves it.

### Paths, hooks and trust

- Both `.claude/settings.json` files call `node "${CLAUDE_PROJECT_DIR}/tools/session.mjs"` and `tools/handover.mjs`. No absolute path, so they survive a move if a chat is opened on the tool's own folder.
- The pm-skills tools find their project from their own location, and `check.mjs`, `harness.mjs`, `lanes.mjs` and `migrate.mjs` read `git rev-parse --show-prefix`: "the installation may sit below the repository root". Two installations in one repository is untested. `handover.mjs` has no prefix handling and reads "the last session end in this checkout's history", so one tool's start notice may show the other tool's session end.
- `~/.codex/config.toml` has one trust entry, for the Finisher's present path (line 102). Name Graphics has none.
- `~/.claude.json` names the Finisher's path six times. Chat transcripts are filed under the old folder paths, so old chats cannot be resumed after the move.
- `.claude/settings.local.json` in the Finisher (ignored) holds one permission with the old absolute path.
- Old absolute paths appear in decisions and in `reviews/`. They are history and stay as written.
- The Finisher has three local-only branches: `claude/vh-140-wip`, `wip/2026-11-12-vh221`, `wip/2026-11-12-vh223`.
- Two side folders exist: `/Users/joe/UoN-Video-Helper-side` (36 GB, outside OneDrive, walk and side-session material) and `2_Projects/2026-08-24 UoN Video Helper - new Mac handover` (482 MB, a transfer bundle of 2026-11-04). VH-226 left the first as an open question.
- Browser-side identifiers still say "helper" on purpose (VH-225): the storage keys `uon-video-helper:*`, the OPFS root `uon-video-helper-jobs`, the cache prefix and the lock name. Cache names carry the service worker's scope, so two tools or two editions on one origin do not delete each other's caches.
- The deploy workflow derives `BASE_PATH` from the repository's name. GitHub redirects a renamed repository and its git remote, not its Pages site: after the last rename the old preview address returned 404 (wish VH-225.3).
- `scripts/package-xerte.mjs` refuses a dirty tree and names the zip `release/uon-video-finisher-<build id>-site.zip`. The 0.3.1 zip in `release/` is untracked and not yet uploaded (VH-14): it must survive the move, and nothing may overwrite it.
- The chat that wrote this prompt was handed the claim on `be80c4f`'s session end by the start hook and did nothing with it. If a start notice says the handover is held, ask the owner; their word is the recovery.

## The options for sharing code

| Option | What it is | For this owner | Against |
| --- | --- | --- | --- |
| 1. One repository, tools as folders, a shared core | Both tools and the shared code in one repository. The standard form is npm workspaces with a core package. | One change to shared code and both tools in one commit. A session sees all the code in one tree, so rule 2 is never strained. One install, one lockfile, one set of tool configs. | One checkout, so two chats on two tools need a second clone or worktree (rule 3). One Pages site with a path per tool, so the preview address changes. Two pm-skills installations in one repository is untested. Every clone carries the Finisher's 859 MB of evidence. |
| 2. A shared package, separate repositories | A third repository for the core; each tool depends on a tagged version. | Nothing moves. Addresses, ledgers and hooks stay as they are. | Every shared change is three steps in three repositories with three records, for ever. A bump is a dependency change, so a decision each time. The core is a second runtime dependency for the Finisher. Sessions read the core from `node_modules`, not as source. The tools can pin different versions and drift anyway. |
| 3. One codebase with build-time editions | One app, one ledger; each tool and variant is a build mode. | The simplest build. A good fit for variants of the same tool. | A poor fit for different tools: one ledger and one ID prefix for two products, the Finisher's "nothing else" brief blurred, and "the neutral build carries no UoN" harder to prove with everything in one import graph. |
| 4. Keep copying, add a drift check | Today's arrangement plus a check that reports when copies differ. | No risk now. | Every shared fix is made twice. It does not give the owner what they asked for. |

### Recommendation

Take option 1 for the tools and option 3 inside each tool:

- **One repository, `UoN-Video-Tools`, made from the Finisher's repository in place.** No history is rewritten, so every commit SHA and tag the ledgers cite still resolves. Name Graphics' two commits are merged in with their own SHAs.
- **Each tool is one folder, moved as a block**: `finisher/` and `name-graphics/`, each with its own `AGENTS.md`, `project/`, `tools/`, `verbs/` and `.claude/`. Because the whole tree moves together, every relative link in the record, every path a rule names and `samples/` inside the Finisher stay true. Chats open on a tool's folder.
- **Shared code lives in `shared/`, imported by path, under one install at the root.** One `package.json` and lockfile at the root hold the dev dependencies and `mediabunny`; each tool keeps a small `package.json` for its name, version and scripts. Node finds the root `node_modules` by walking up. This is option 1 without workspace links, for two reasons. npm workspaces put a directory symlink to each tool in `node_modules`, and here that would point at a folder holding 16 GB of samples on OneDrive. And shared source imported by path is not a dependency, so the rule of one runtime dependency is untouched.
- **The rule of two.** Code moves into `shared/` when a second tool needs it, and not before. `shared/` never imports from a tool, and a tool never imports from another tool.
- **Variants of one tool are build-time editions inside that tool**: the Finisher's staff and student editions, Name Graphics' neutral and UoN packs. An edition is a separate axis from the hosting mode (the site build or the flat Xerte build). VH-129 builds the Finisher's editions; this restructure only records the convention.
- **Three ledgers: one for the parent, one for each tool.** The parent's ledger owns what is shared; each tool's ledger owns its own folder. The next section says who owns what.
- **A lobby at the top address**: a small page of the parent's that names the tools and links to each. There is a staff lobby, on the preview and on Xerte, and a student lobby, on Xerte only. The section after next says how.

If the spike in stage 3 shows that pm-skills cannot run several installations in one repository without real harm, stop and tell the owner. The fallback is two repositories inside one parent folder with option 4's drift check, until pm-skills can.

### Three ledgers and who owns what

The owner asked, on 2026-11-25, how a shared backlog and ledger sit beside the individual ones. The answer is one rule: every file belongs to exactly one ledger, by its folder, and an item changes only what its ledger owns.

| Ledger | IDs | Where it sits | What it owns |
| --- | --- | --- | --- |
| Parent, UoN Video Tools | `UVT-n` | the repository's root | the root files (`package.json`, the lockfile, `.github/`, the shared tool configs), `shared/`, `lobby/`, the order of work across the tools, and the decisions that bind every tool: structure, dependencies, hosting, brand, standards |
| Video Finisher | `VH-n` | `finisher/` | everything under `finisher/` |
| Video Name Graphics | `VNG-n` | `name-graphics/` | everything under `name-graphics/` |

How the three work together:

- **The ID says where a commit may write.** A `VH-n` commit touches only `finisher/`, a `VNG-n` commit only `name-graphics/`, a `UVT-n` commit only the rest. A small root check proves it. The exception is this restructure's own founding commits, made before the parent's ledger exists.
- **A tool item that needs a shared change raises a parent item.** The parent item ships first, in its own commit, with every tool's gate green; meanwhile the tool's backlog line reads "blocked: UVT-n". One session may do both in one sitting, reading each ledger's rule-1 set before its first change there.
- **Code moves into `shared/` in three green steps**: a parent commit adds it to `shared/`; a commit in the tool that had it switches its imports and deletes its copy; a commit in the other tool starts importing it. No commit leaves a gate red.
- **A decision is written once**, in the ledger that owns the thing decided. Another ledger cites it by date and ID and does not copy it. A dependency change is always the parent's, because there is one lockfile.
- **Deferred work that crosses ledgers** is a line in the other ledger's wish list, with where it came from (rule 5).
- **What is next overall**: the parent's backlog holds only the parent's items, never copies of a tool's. A `NEXT_STEPS.md` at the root names each ledger's next item and is brought up to date at each parent close.
- **One pm-skills version in the repository.** The three contracts are the same file; a chat on a tool's folder may be shown the root's copy as well, which is harmless only while they are byte-identical. Refresh all three together.
- **One writer per checkout** still holds across all three ledgers (rule 3).

The ledger's ID grammar already accepts any prefix (`tools/ledger.mjs`), so one ledger for everything was possible. It is not recommended: it would mean rewriting three signed files for two products inside one 600-word rules budget, and folding Name Graphics' record into the Finisher's.

### The lobby and the previews

The owner asked, on 2026-11-25, how each tool gets a working preview on GitHub Pages, and suggested a lobby page that Xerte could have too, so that people know the tools exist and can move between them.

The owner then settled who sees what, the same day:

> We have a staff lobby and a student lobby in Xerte, but just the staff lobby on pages. the student lobby is an option in the staff lobby (staff get everything, including student versions so they can use and easily share), its just the students that dont get everything

- **Two lobbies, one small app.** `lobby/` builds two editions, as a tool does. The staff lobby lists everything: every tool, every student edition, and the student lobby itself as an entry, so staff can use the student versions and pass the student lobby's address on. The student lobby lists only what is for students.
- **Where each one is.** On Xerte both exist, each its own upload. On Pages only the staff lobby exists, at the top address; the student editions still have preview folders there, reached from the staff lobby.
- **Each entry says who it is for.** One list in the lobby's config names every tool and edition and marks it for staff only or for everyone. The staff lobby shows the whole list; the student lobby shows only the entries for everyone. Which tools students get is the owner's, entry by entry.
- **The student side never points at the staff side.** The student lobby and the student editions carry no link or address of the staff lobby or a staff edition, and a test proves it of their packages. A student edition's link back goes to the student lobby; on Pages, where there is none, a student edition has no link back.
- **One Pages site for the repository.** The top address is the staff lobby. Each tool or edition is a folder beside the others: `/finisher/`, `/name-graphics/`, and later `/finisher-student/`.
- **Never one tool's folder inside another's, and no service worker for the lobby on Pages.** A service worker controls its own folder and everything below it (`src/offline/register.ts` registers with the default scope). A student edition at `/finisher/student/` would be run by the staff edition's worker, and a worker at the top address would take over every tool.
- **Every push to `main` rebuilds the whole site from that one commit**, after the root gate. Each tool's version line says what is live. One tool's failing gate holds back every preview; that is intended. Pages has no preview per branch, so work in progress is read on the local dev server, as now.
- **The lobby is a product of the parent's**, in `lobby/`. It arrives in two steps. This restructure ships a placeholder staff lobby on the preview only: the tools' names and a link to each, no branding, marked not to be indexed. A parent item then builds the real ones: the UoN look from the shared brand, three languages with the shared switcher, a line on what each tool is for, WCAG 2.2 AAA, and a flat Xerte package for each lobby.
- **On Xerte each upload has its own address, known only once it exists.** So the lobby reads the tools' addresses from config, one set per home: relative links on Pages, and on Xerte the addresses the owner records after each tool's first upload. A link back from each tool to the lobby works the same way; it is a new control with new words, so it is an item in each tool that the owner approves.
- **One language choice for all.** Both homes serve every tool from one origin, so a language-preference key held in `shared/` lets a choice made in the lobby carry into each tool.
- **What this settles for VH-129, and what it leaves.** "Hosted apart" now means the student edition's own Xerte upload, reached from the student lobby. VH-129's other point stands and is the owner's: while the staff lobby and the staff edition are public, the student lobby is a nudge, not a control.

## Owner decisions

The owner answered on 2026-11-25, in the chat that wrote this prompt: "approves everything". That settles every row as recommended. On D15 they said: "macpro current not working on this but will in future. can address at the time."

Three rows were then rewritten to answer two questions the owner asked in the same message, about previews and about shared and individual ledgers: D7, D9 and D14. The owner accepted the rewritten rows the same day: "accept all, proceed". Every row is settled; ask none of them again.

| | Decision | Recommended answer |
| --- | --- | --- |
| D1 | The parent folder's name and place, and the tool folders' names | `2_Projects/2026-08-24 UoN Video Tools`, keeping the project's start date; inside it `finisher/`, `name-graphics/` and `shared/` |
| D2 | Does the checkout stay on OneDrive? | Yes, pinned with "Always keep on this device" as the decision of 2026-10-05 says. Moving off OneDrive is a separate question, not mixed into this. |
| D3 | The structure | The recommendation above |
| D4 | Rename `djDAOjones/UoN-Video-Finisher` to `UoN-Video-Tools`, and archive `djDAOjones/Video-Name-Graphics` once its history is merged | Yes to both. The Finisher's preview moves to `https://djdaojones.github.io/UoN-Video-Tools/finisher/`; the old address returns 404 and nothing redirects. Name Graphics' own Pages site, if it is on, is turned off. |
| D5 | Is renaming the folders above `samples/` a move of `samples/`? | No. The rule protects the recordings; they stay inside the Finisher's folder, untouched, and a list of every file's name and size is compared before and after. |
| D6 | The items that carry the work | VH-226 is widened on the owner's word from "the folder renamed" to the whole restructure; a new Name Graphics item (VNG-11, or the next free ID) is its counterpart and supersedes the INTAKE decision's "copied and owned, not shared" |
| D7 | Does the parent get a ledger of its own? (rewritten, then accepted) | Yes: a parent ledger at the root, IDs `UVT-n`, founded by the intake verb once the move is green, with the ownership rule of "Three ledgers and who owns what" |
| D8 | Bring Name Graphics to pm-skills 5.0.1 before the merge | Yes, by the release's refresh route, as REFRESH-501 did for the Finisher. The owner says where the release is; do not fetch it unasked (rule 2). |
| D9 | The words of the shared-code rule, for all three rules files (rewritten, then accepted) | "Every file belongs to one ledger, by its folder: `finisher/` to VH, `name-graphics/` to VNG, the rest to UVT. An item changes only what its ledger owns. `shared/` is common to every tool: code moves there when a second tool needs it, a change there is a parent item, and it closes only with every tool's gate green. Shared source is not a dependency." The owner signs all three files. |
| D10 | Move the identical set into `shared/` now | Yes, once the structure is green: the nine core files, `tokens.carbon.css` and the identical tool configs. It proves the mechanism on code that has not drifted. |
| D11 | The two side folders | Both stay where they are, unrenamed. Record in VH-226 that they do not follow. |
| D12 | The names that still say "helper" | Browser-side identifiers never change (VH-225 stands). `package.json`'s name becomes `uon-video-finisher`, as `NEXT_STEPS.md` plans. |
| D13 | The three local-only branches | Push them to origin as they are, so nothing lives only on this Mac |
| D14 | What the preview's top address shows (rewritten, then accepted) | The staff lobby, in two steps: a plain placeholder now, on the preview only; the real lobbies as a parent item after the restructure, a staff lobby for the preview and for Xerte and a student lobby for Xerte only. See "The lobby and the previews". |
| D15 | The Mac Pro | Answered: nothing there is working on this now. It is set up when it next takes work: a later line, below. |

## The sequence

Each stage ends with a stop. Stages 1 to 4 change nothing that cannot be put back.

### Stage 1: read and check, changing nothing

1. Ask for access to both project folders. Read each tool's rule-1 set, the Finisher's `DEV-INFRASTRUCTURE.md` and the items VH-226, VH-129, VH-14 and VH-161.
2. In each repository: `git fetch`, a clean tree (this prompt file is the one untracked file in the Finisher), `main` level with `origin/main`, no stash, no worktree but the main one, no hook in `.git/hooks` beyond the samples, and `core.hooksPath` unset.
3. Check that nothing is cloud-only, from each root, with empty output expected:

   ```bash
   find . -path ./node_modules -prune -o -flags +dataless -print
   ```

4. Write the samples list (every file's path and size, the count and the total) to a backup folder outside OneDrive and outside both repositories.
5. Run `npm run check` in each tool on a settled machine and record the result. This is the baseline: a failure here is not the restructure's.
6. Note what is untracked and must ride along: `samples/`, `release/` with the 0.3.1 zip, `_archive/`, `public/spike/`, and any `CLAUDE.local.md`.
7. Check on GitHub whether Name Graphics' Pages site is on.

### Stage 2: the owner's decisions

Every decision is settled, so there is nothing to ask unless stage 1 found something that makes an answer untrue. If it did, raise it and wait. Copy the owner's words from "Owner decisions" and "The lobby and the previews" into the log, verbatim.

### Stage 3: a spike in a throwaway copy, off OneDrive

Prove the mechanics on fresh clones in a temporary folder outside OneDrive. Nothing here is kept.

1. The lift: clone the Finisher into `spike/finisher`, move `spike/finisher/.git` up to `spike/.git`, and stage. Every change must be a pure rename, and `git write-tree --prefix=finisher/` must equal the old `HEAD^{tree}`.
2. The merge: fetch Name Graphics' `main`, merge it with unrelated histories and the `ours` strategy without committing, add its files under `name-graphics/`, and commit. Check that `git write-tree --prefix=name-graphics/` matched its old tree, and that `319f867`, `22d86e1`, `27f51dd`, `be80c4fa` and the tags `v0.2.0` to `v0.3.1` all resolve.
3. The install: a root `package.json` and the Finisher's lockfile moved to the root. `npm ci` at the root, then `npm run check` from each tool's folder and from the root. The lockfile's diff must show no version change; a version change is a dependency change and needs a decision.
4. pm-skills, with three installations: give the spike's root a stand-in ledger (the Finisher's contract, tools and verbs, and a minimal `project/`). Run `node tools/check.mjs` and `node tools/read.mjs` from the root and from each tool's folder, and `node tools/harness.mjs --print` to see what it would write for an installation below the root. Then ask the owner to open a test chat on the spike's root, on `spike/finisher` and on `spike/name-graphics`. Each start notice should appear once and name its own ledger's items; note whether a chat on a tool's folder is also shown the root's contract or runs the root's hooks. Commit a test session end for one ledger and see what the others' notices say.
5. The builds: `BASE_PATH=/UoN-Video-Tools/finisher/ npm run build` and read the output: the page's script and stylesheet, the branding base, the job worker, `sw.js` and its scope, `offline-files.json`. Serve the gathered site from a nested path and check that the Finisher's service worker controls `/finisher/` only, not the top page or `/name-graphics/`. Run `npm run package:xerte` and check the zip is flat, with no folder.
6. Report to the owner what held and what did not. Go on only on their word.

### Stage 4: the plan in both ledgers, before anything moves

1. If D8 is yes, refresh Name Graphics to pm-skills 5.0.1 by the release's route, in its own commit, gate green.
2. Write the opening decisions in the present layout. In the Finisher: VH-226 widened, with the owner's words, the chosen structure, and Supersedes naming the PLAN-8 entry that raised it and the 2026-10-05 working-copy entry where the folder changes. In Name Graphics: the new item opened, superseding the INTAKE decision of 2026-11-05.
3. Commit this prompt under VH-226 as the plan's evidence, beside the owner's sheet in `reviews/2026-11-25/`, so the tree is clean.
4. Push the branches of D13. Push both repositories. Confirm on GitHub that both `main` branches and every tag are there.
5. Make a bundle of each repository with every ref, and a copy of each `.git/config`, in the backup folder.

### Stage 5: the move

One sitting, OneDrive running, nothing else running. Before the push, everything can be undone by moving the folders and `.git` back.

1. Move the Finisher's folder into the parent as `finisher/` with one `mv`. On the same drive this is a rename; OneDrive sees a move, not 15,000 new files. Do not use `git mv` for the tree: it would make OneDrive move every file one by one.
2. Wait for OneDrive to settle. Run the cloud-only check again. Compare the samples list with stage 1's. Ask the owner to set "Always keep on this device" on the parent folder.
3. Move `finisher/.git` up to the parent. Move `finisher/.github/` up to the root. Stage, and prove it as in the spike: pure renames, and the tree under `finisher/` equal to the old tree. Do this before Name Graphics arrives, or git will take its folder for a nested repository.
4. Add the root files: `package.json`, the lockfile, a `.gitignore`, a `README.md` that says what each folder is and that chats open on a tool's folder, and the one deploy workflow. Remove each tool's own lockfile and `node_modules` (generated). Run `npm ci` at the root.
5. Commit as VH-226, with a `Verify:` line.
6. Move Name Graphics' folder in as `name-graphics/`. Merge its history as in the spike, moving its `.git` to the backup folder, never deleting it. Commit under the Name Graphics item.
7. Fix what the move broke, each fix in the tool it belongs to: the gate scripts' paths, `check:placeholders`' skip list, `check:memory`, the link check, the package script's clean-tree test, the docs. Rename `package.json`'s name if D12 says so.
8. The deploy workflow: one `npm ci`, the root gate, then each tool built with `BASE_PATH` of `/<repository>/<tool>/` and gathered into one site, each tool in a folder beside the others, with the placeholder lobby from `lobby/` at the top (D14). The lobby registers no service worker. Keep the least-privilege split and the pinned action SHAs.
9. Run each tool's gate from its folder and the root gate, on a settled machine. All green, no test deleted or skipped.
10. Hooks: check each tool's `.claude/settings.json` still fires once in a chat opened on that tool's folder. Regenerate with `tools/harness.mjs` only if something is wrong, and have the owner review what it writes.
11. The owner renames the repository on GitHub, or gives the word for `gh repo rename`. Then point `origin` at the new address. Rename before the first push, so the first deploy is built for the right path (VH-225's lesson).
12. Push `main`. Watch the Pages run. In Chrome, at each tool's new address: the Finisher's version line, a closing loading with no 404, `sw.js` registered at its own scope, one job to Save; the Name Graphics shell page. Name what only a person verified.
13. The Xerte package: from `finisher/`, on a clean tree, `npm run package:xerte`. The zip is flat, holds the same kinds of file as the 0.3.1 zip plus the service worker's two, and works from a nested path with a relative base, a job with a closing included. Upload nothing. The 0.3.1 zip stays as it is.
14. On the owner's word, archive `djDAOjones/Video-Name-Graphics` and turn its Pages site off.

### Stage 6: the parent ledger and the shared set

Only after stage 5 is green and pushed.

1. Found the parent's ledger at the root by the intake verb (`verbs/intake.md`), at the same pm-skills version as the tools: IDs `UVT-n`, its Gate the root check, its profile holding the one dependency list and the two homes. Its rules carry the ownership table and D9's rule. The owner signs its profile, rules and brief. Its first decision records the structure and cites VH-226 and the Name Graphics item. From here on the root files, `shared/` and `lobby/` are the parent's.
2. Under a parent item: the root check that a commit's ID matches the folders it touches, and the lint rule for the boundaries: `shared/` imports from no tool; no tool imports from another.
3. If D10 is yes, move the identical set in three green steps. Under a parent item, add the nine core files with their tests and `tokens.carbon.css` to `shared/`, in the Finisher's bytes. Under VH-226, point the Finisher's imports at them (32 import lines) and delete its copies; `keep-awake` and `watchdog` stay in the tool. Under the Name Graphics item, delete its copies and import from `shared/`.
4. Under a parent item: share the tool configs that are identical, as a base ESLint and TypeScript config at the root that each tool extends, and one `.editorconfig`, Prettier and markdownlint config.
5. Each tool's gate runs the shared tests it depends on; the root gate runs everything. Then the owner signs D9's rule in the two tools' rules files.

### Stage 7: the record and the paths

1. In each ledger: the closing decision (what moved, the proofs, what only a person verified, the digest rule applied), the trajectory line, the backlog line struck, and a line for every leftover in the wish list or backlog. Nothing is dropped silently.
2. The signed files change only by decision and the owner's signature: each profile's Repository line, the Finisher's Environment and Name Graphics' sibling lines in the rules files, and D9's rule.
3. Bring up to date: `DEV-INFRASTRUCTURE.md` (the install at the root, the deploy, the recovery steps, the paths), each tool's `NEXT_STEPS.md` and `README.md`, a `NEXT_STEPS.md` at the root naming each ledger's next item, and each `project/structure.md` by its tool.
4. `node tools/check.mjs` in each of the three ledgers, then close by `verbs/close.md`, and push.
5. Outside the repository, with the owner: the Codex trust entry for the new path and the old one removed (their hand, guided step by step); the stale line in `.claude/settings.local.json`; any scheduled task that names an old folder. The Mac Pro waits until it next takes work (D15). The sidebar is the parent chat's.
6. After OneDrive has settled, check once more: a clean tree, no conflict copy, nothing cloud-only.

## What done looks like

- One folder, the parent, holds `finisher/`, `name-graphics/`, `shared/`, `lobby/`, the parent's ledger and the root files. The two old project folders no longer exist beside it.
- One repository, `djDAOjones/UoN-Video-Tools`. `git log` reaches the Finisher's whole history and Name Graphics' two commits with their original SHAs; every tag is present. The old Name Graphics repository is archived.
- `samples/` matches its list from stage 1, file for file. `pm_skills/` is unchanged. The 0.3.1 zip is where it was, inside `finisher/release/`.
- `npm ci` at the root, then `npm run check` in each tool and at the root: green, with no test deleted or skipped, and the lockfile showing no version change.
- A chat opened on `finisher/` gets the Finisher's contract and start notice once; the same for `name-graphics/` and for the root.
- The preview serves the placeholder lobby at the top and both tools in folders beside each other, read in Chrome; each tool's service worker controls its own folder only. The Xerte package is flat and runs a job from a nested path. Nothing was uploaded.
- Three ledgers carry the record: the parent's founded and signed, VH-226 closed, its Name Graphics counterpart closed, the INTAKE decision superseded, the ownership and shared-code rule signed in all three, and the root check proving that a commit's ID matches its folders.
- The shared set is in `shared/` with no second copy, or the owner chose to defer it and a backlog line says so.
- The owner has been told, in plain words: where each tool now lives, the new preview addresses, that old chats cannot be resumed, and that two chats on two tools at once need a second clone.

## Leave for later, as backlog or wish lines

Write each as one line in the right ledger. Do not build any of them in this work.

- **VH-129, the staff and student editions**: the first item when development restarts, promoted from the Icebox on the owner's word. Its plan asks the owner: does the student edition keep Internal use only, whose tails are UoN masters; does each edition lose the other side's switch; what is each called. Where each is hosted is answered by the two lobbies.
- **The real lobbies**, a parent item: a staff edition and a student edition of `lobby/`, the UoN look, three languages, a line for each tool, a flat Xerte package for each, the list of entries marked for staff only or for everyone, the tools' addresses per home in config, and the test that the student lobby's package names nothing of the staff side. With it, in each tool, a link back to its lobby, and the one language-preference key in `shared/`.
- **The standards the tools share**, a parent item: the four digests and `UI-STANDARDS.md` are copies today; they move to the parent when a change to one would otherwise be made twice.
- **The Mac Pro**, when it next takes work: a fresh clone or its OneDrive copy checked, `npm ci` at the root, and its Codex and Claude Code trust for the new path (D15).
- **Codex checking each item**: a `project/model-policy.md` in each ledger and the Codex hooks by `tools/harness.mjs`, before the 26 accepted points of `reviews/2026-11-25/owner-sheet-2026-11-25.md` are built.
- **What moves to `shared/` next**, each when Name Graphics' item needs it: the language machinery and switcher (VNG-4), the step pattern (VNG-5), help, feedback and the statement (VNG-8), the Xerte package and the offline service worker (VNG-9), and the UoN brand as a pack both tools use (VNG-2).
- **Release tags per tool** before the next cut: for example `finisher-v0.3.2` and `name-graphics-v0.1.0`. The old `v` tags stay.
- **The 859 MB of evidence in `reviews/`**: whether it stays in the repository, and a sparse checkout for second clones that do not need it.
- **pm-skills and three ledgers in one repository**: whatever the spike found about the start notice, the doubled contract and the one-writer rule goes to the pm-skills project as a wish, with the evidence. So does a view of all three backlogs on one page.
- **Whether the checkout leaves OneDrive** (D2), and npm workspaces if it does.
- **The old preview address** returns 404, as VH-225.3 already records for the address before it.
- **The open items untouched by this work**: VH-14 (the owner's Xerte upload of 0.3.1), VH-137, VH-161's check on Xerte, VH-246's four points.
- **Smaller**: no `LICENSE` file; the `npm audit` findings in the dev tools; `redact()`'s keys per tool (wish VNG-1.1).

<!-- markdownlint-disable -->

# VH-225 — Codex astra's close check brief (commit 2)

You are Codex astra, checking, read-only, from the repository at the current directory, the close of commit 2 of item VH-225, the rename to UoN Video Finisher, before its commit. Commit 1 is HEAD and origin/main, `72b103e81e1d8de9a86875ef25c0f246e10ce92d`: the visible name, no address changed, the item kept open; your close check and re-check of it passed (`reviews/2026-10-25/design-pass-3/evidence/measurements/vh225-codex-close-2026-11-03.md.txt` and `vh225-codex-recheck-2026-11-03.md.txt`), and Pages run 41749929086 deployed it. The candidate is the working tree against that HEAD: `git diff` (11 files, nothing untracked). The freeze is `/Users/joe/UoN-Video-Helper-side/vh225-frozen-c2/` (`tracked.patch`, diff hash `f5a97eb390931575`; `status.txt`, 11 lines; no untracked file): the tree must match it.

**The owner's words:** at 2026-11-04 about 07:31Z, in Orchestrator #37's chat, their own turn, to the rename ask, verbatim: "Renamed it"; and on 2026-10-28, to "Should the GitHub repository and preview web address change to the new name too?", verbatim: "Rename those too". The orchestrator verified at 07:32Z that `djDAOjones/UoN-Video-Finisher` resolves with main at `72b103e8`, the new Pages address returns 200 and the old 404. The owner's pronouns are unrecorded: the record says "the owner" and "they".

**Commit 2, by the item's criterion 4 (`project/items/VH-225.md`):** the branding path, `project/profile.md`'s remote URL, `docs/04-init-prompt.md`'s address and every link to the old address move; vite's base follows the repository's name through the deploy workflow (`.github/workflows/deploy-pages.yml`); the local `origin` URL changes only on the owner's word (it is unchanged; GitHub redirects it, and `.git/config` is not touched). Commit 2 also carries the close: the backlog line struck, one trajectory line, the closing decision, the item's Now and Notes, `tools/archive.mjs`'s move. Before the ask, a local build with `BASE_PATH=/UoN-Video-Finisher/` put the page's script and stylesheet, the branding base and the job worker under `/UoN-Video-Finisher/`.

**The gate:** `npm run check`, its log `/Users/joe/UoN-Video-Helper-side/vh225-gate-4.log` with `.load.log` and `.power.txt` beside it; then `node tools/check.mjs`. Commit 1's gate had 84 test files, 1,663 tests and the 1 existing EBU skip.

Read what you need of the repository, `git show 72b103e`, the freeze and the gate files. Never read any folder under `side-session-notes/`; in `/Users/joe/UoN-Video-Helper-side/` read nothing else.

Answer each, citing file and line:

1. Does the tree match the freeze, and does it hold only VH-225's commit 2?
2. Does every remaining "UoN-Video-Helper" or "uon-video-helper" outside the records (`git grep -i`, excluding `reviews/`, `pm_skills/`, `project/migration/` and the dated ledger history) rightly stay: an identifier commit 1 pinned, a temporary folder prefix, a configuration name, a record's file name or link, a wish line naming the old address? Is any address or link to the old address missed?
3. Is criterion 4 met, so far as a commit before its push can meet it, and is anything in the order unsafe for Pages?
4. The ledger, by each file's grammar comment and the contract (`AGENTS.md`, rules 4 to 6 and 8): the closing decision (newest first, its fields, the owner's words with sources, what is inferred said so, the digest rules), the struck backlog line, the trajectory line, the item's Now and Notes, any open line the work paid off retired, every deferral a line.
5. Is the gate green with no test deleted or skipped, and did it start below load 8 on the 1- and 5-minute loads? Is `node tools/check.mjs` at 0 failures and 0 warnings?

End with a verdict: pass, pass with conditions, or fail, and what must change before commit 2. Be concrete and brief.

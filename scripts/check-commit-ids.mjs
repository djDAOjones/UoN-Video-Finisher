#!/usr/bin/env node
/**
 * The root check that a commit's ID matches the folders it touches (UVT-1).
 *
 * The parent's rules: every file belongs to one ledger, by its folder —
 * `finisher/` to VH, `name-graphics/` to VNG, the rest to UVT — and the ID
 * says where a commit may write. So a `VH-…` commit touches only
 * `finisher/`, a `VNG-…` commit only `name-graphics/`, a `UVT-…` commit only
 * the rest. A ledger's other IDs (INTAKE, PLAN-n, REFRESH-n, …) touch one
 * ledger's folders, and that ledger's record must name the ID.
 *
 * Checked: every commit after the parent's founding (INTAKE, `BASE`), merges
 * left out (their own commits are checked). The restructure's founding
 * commits, before it, are the rules' one exception. In a shallow clone that
 * lacks `BASE` (the deploy workflow's checkout), only HEAD is checked, and
 * the output says so. A commit that broke the rule and stays in history is
 * listed in `EXCEPTIONS` with the decision that keeps it.
 *
 * Usage: node scripts/check-commit-ids.mjs [--range A..B]
 * Exit 0 every commit matches; 1 one or more do not; 2 a usage or git error.
 */
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
/** The parent ledger's founding commit, "INTAKE: the parent's ledger founded …". */
export const BASE = '11af3017d961643d23ea33295430fb7e25275e75'
/** Commits kept although they break the rule: full SHA → the decision that keeps it. */
export const EXCEPTIONS = new Map()

/** Each ledger: its folder prefix, its ID prefix, its record. */
export const LEDGERS = [
  { name: 'finisher', prefix: 'finisher/', id: 'VH-', record: 'finisher/project/' },
  { name: 'name-graphics', prefix: 'name-graphics/', id: 'VNG-', record: 'name-graphics/project/' },
  { name: 'root', prefix: '', id: 'UVT-', record: 'project/' },
]

/** The ledger a repository path belongs to, by its folder. */
export function ledgerOf(path) {
  return LEDGERS.find((l) => l.prefix && path.startsWith(l.prefix)) ?? LEDGERS[2]
}

/** The ID a commit subject names (`ID: summary`), or null. */
export function idOf(subject) {
  const m = /^([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*): \S/.exec(subject)
  return m ? m[1] : null
}

/**
 * Why a commit breaks the rule, or null when it keeps it.
 * `named(ledger, id)` says whether that ledger's record names the ID.
 */
export function judge(subject, files, named) {
  const id = idOf(subject)
  if (!id) return 'its subject names no ID as `ID: summary`'
  if (files.length === 0) return null
  const touched = [...new Set(files.map((f) => ledgerOf(f).name))]
  const owner = LEDGERS.find((l) => id.startsWith(l.id))
  if (owner) {
    const outside = files.filter((f) => ledgerOf(f) !== owner)
    if (outside.length === 0) return null
    return `${id} may write only ${owner.prefix || 'outside finisher/ and name-graphics/'}, but it touches ${outside.slice(0, 3).join(', ')}${outside.length > 3 ? ` and ${outside.length - 3} more` : ''}`
  }
  if (touched.length > 1)
    return `${id} touches ${touched.length} ledgers' folders (${touched.join(', ')}); one commit writes one ledger`
  const ledger = LEDGERS.find((l) => l.name === touched[0])
  if (!named(ledger, id))
    return `${id} is not named in ${ledger.record}, the record of the folder it touches`
  return null
}

const git = (...args) =>
  execFileSync('git', args, {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 1 << 28,
    stdio: ['ignore', 'pipe', 'pipe'],
  })
const has = (rev) => {
  try {
    git('cat-file', '-e', `${rev}^{commit}`)
    return true
  } catch {
    return false
  }
}

/** The commits to check, oldest first: [{ sha, subject, files }]. */
function commits(...revs) {
  const out = git(
    'log',
    '--reverse',
    '--no-merges',
    '--no-renames',
    '--format=%x00%H%x01%s',
    '--name-only',
    ...revs,
  )
  return out
    .split('\0')
    .filter(Boolean)
    .map((chunk) => {
      const [head, ...rest] = chunk.split('\n')
      const [sha, subject] = head.split('\x01')
      return { sha, subject, files: rest.filter(Boolean) }
    })
}

function named(ledger, id) {
  try {
    git('grep', '-q', '-w', '-F', '-e', id, 'HEAD', '--', ledger.record)
    return true
  } catch {
    return false
  }
}

function main(argv) {
  let range
  const i = argv.indexOf('--range')
  if (i >= 0) {
    range = argv[i + 1]
    if (!range) {
      console.error('usage: --range A..B')
      return 2
    }
  }
  let note = ''
  if (!range) {
    if (has(BASE)) range = `${BASE}..HEAD`
    else note = ' (a shallow clone without the founding commit: the newest only)'
  }
  const list = range ? commits(range) : commits('-1', 'HEAD')
  const failures = []
  for (const c of list) {
    if (EXCEPTIONS.has(c.sha)) continue
    const why = judge(c.subject, c.files, named)
    if (why) failures.push(`${c.sha.slice(0, 8)} ${c.subject.slice(0, 72)}\n  ${why}`)
  }
  for (const f of failures) console.error(`FAIL  ${f}`)
  console.log(
    `check-commit-ids: ${list.length} commit(s) checked${note}, ${failures.length} failure(s)`,
  )
  return failures.length ? 1 : 0
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    process.exitCode = main(process.argv.slice(2))
  } catch (e) {
    console.error(`check-commit-ids: ${e.message}`)
    process.exitCode = 2
  }
}

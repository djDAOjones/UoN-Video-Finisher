#!/usr/bin/env node
// The TypeScript projects' check (UVT-7), offered for each folder's gate when it takes up the stack's projects
// (the Finisher's VH-250, Name Graphics' VNG-14). Run from the folder, naming each project its `npm run typecheck`
// runs and its React entry:
//
//   node ../scripts/check-projects.mjs --project tsconfig.core.json --project tsconfig.app.json … --entry src/app-root.tsx
//
// Both flags are required: a tool's gate names its projects and its React entry.
// It proves what the item's criterion asks, and reports every problem it finds:
//   1. none left out: every TypeScript file in the folder, declarations included (Git's tracked and untracked files,
//      its ignores kept), is read by one of the projects named; a project with `noCheck` reads nothing here, and a
//      project or a folder that yields no file at all is itself a problem, so the check cannot pass on nothing;
//   2. each entry is a TypeScript file in the folder, not a declaration (as TypeScript classes it), read by one of the
//      projects named: membership is TypeScript's own program for each project, never a parse of the compiler's output;
//   3. each entry has a basename of its own, case ignored: TypeScript reading a folder keeps `main.ts` and silently
//      drops a `main.tsx` beside it (`Main.ts` too, on a disk that ignores case), even when both are named in
//      `include`, so a broken `.tsx` passes the compiler unseen;
//   4. ESLint lints each entry with the folder's own config through the TypeScript project service, and a probe rule
//      run in that lint confirms the parser's program holds the entry with the file's own full text; no confirmation,
//      no pass. Each failure is reported, each entry probed, whatever the compiler said of it.
// It does not grade a project's strictness: the base defines it once and each root layer extends it (UVT-7).
// Paths are compared as the disk compares them, case ignored where the disk ignores it; an entry keeps its own
// (logical) path, a link resolved only to prove it stays in the folder. The compiler and ESLint are the root's.

import { execFileSync } from 'node:child_process'
import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync, statSync } from 'node:fs'
import { createRequire } from 'node:module'
import {
  basename,
  dirname,
  extname,
  isAbsolute,
  join,
  parse,
  relative,
  resolve,
  sep,
} from 'node:path'
import { fileURLToPath } from 'node:url'

export const TS_EXTENSIONS = ['.ts', '.tsx', '.mts', '.cts']
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ts = createRequire(join(ROOT, 'package.json'))('typescript')
/** Git's repository-local variables (its own list), any of which would point it away from the folder's repository. */
export function gitLocalVariables() {
  return execFileSync('git', ['rev-parse', '--local-env-vars'], { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean)
}

const isTs = (name) => TS_EXTENSIONS.includes(extname(name))
const isDeclaration = (name) => ts.isDeclarationFileName(name)
const unBom = (text) => text.replace(/^\uFEFF/, '')
const stem = (name) => basename(name, extname(name)).toLowerCase()
const stat = (path) => statSync(path, { throwIfNoEntry: false })
const isFile = (path) => stat(path)?.isFile() ?? false

/** Whether the disk holding `dir` ignores case: the same entry under another case is the same file. */
export function caseless(dir) {
  const flipped = dir.replace(/[a-z]/gi, (c) =>
    c === c.toLowerCase() ? c.toUpperCase() : c.toLowerCase(),
  )
  if (flipped === dir) return false
  const [a, b] = [stat(dir), stat(flipped)]
  return Boolean(a && b && a.ino === b.ino && a.dev === b.dev)
}

/** Files beside `file` that share its basename under a TypeScript extension, case ignored, declarations aside. */
export function sameBasename(file) {
  if (!isTs(file) || isDeclaration(file)) return []
  return readdirSync(dirname(file))
    .filter(
      (name) =>
        name !== basename(file) && isTs(name) && !isDeclaration(name) && stem(name) === stem(file),
    )
    .map((name) => join(dirname(file), name))
    .filter(isFile)
}

/** The environment for each Git call, read afresh: the C locale, and nothing pointing Git elsewhere. */
function gitEnv() {
  const env = { ...process.env, LC_ALL: 'C', LANGUAGE: 'C' }
  for (const name of gitLocalVariables()) delete env[name]
  return env
}

/** Whether `cwd` is inside a Git work tree; outside one is false, any other Git failure is thrown. */
function inGit(cwd) {
  try {
    const out = execFileSync('git', ['rev-parse', '--is-inside-work-tree'], {
      cwd,
      env: gitEnv(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    return out.trim() === 'true'
  } catch (e) {
    // Only Git's "no repository here or above"; a broken checkout ("not a git repository: <path>") is thrown.
    if (
      /not a git repository \(or any (of the parent directories|parent up to mount point)/i.test(
        String(e.stderr),
      )
    )
      return false
    throw e
  }
}

/** The folder's TypeScript files as absolute paths under `cwd`: Git's view in a work tree, else a walk. */
export function folderFiles(cwd) {
  if (inGit(cwd)) {
    const out = execFileSync('git', ['ls-files', '-co', '--exclude-standard', '-z', '--', '.'], {
      cwd,
      env: gitEnv(),
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    })
    // A listed file that is gone is skipped; one that cannot be looked up is thrown, never dropped.
    return out
      .split('\0')
      .filter((f) => f && isTs(f) && lstatSync(join(cwd, f), { throwIfNoEntry: false }))
      .map((f) => join(cwd, f))
  }
  const found = []
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue
      const path = join(dir, entry.name)
      if (entry.isDirectory()) walk(path)
      else if (isTs(entry.name)) found.push(path)
    }
  }
  walk(cwd)
  return found
}

/** The config file a `--project` names: a folder means its tsconfig.json, as `tsc -p` takes it. */
export function configPath(project, cwd) {
  // As `tsc -p` takes it: TypeScript's own normalisation, then a folder's tsconfig.json or the file itself.
  const path = ts.combinePaths(cwd, ts.normalizePath(project)) // a trailing slash kept, as tsc keeps it
  if (ts.sys.directoryExists(path)) {
    const config = `${path}/tsconfig.json`
    if (!ts.sys.fileExists(config))
      throw new Error(
        `TS5057: cannot find a tsconfig.json file at the specified directory: '${project}'`,
      )
    return config
  }
  if (!ts.sys.fileExists(path))
    throw new Error(`TS5058: the specified path does not exist: '${project}'`)
  return path
}

/**
 * The project as the root's TypeScript reads it: its config's errors, whether it skips checking (`noCheck`), and the
 * files its program holds (TypeScript's own program, so neither a diagnostic nor extended output hides a file).
 */
export function projectFiles(project, cwd) {
  const path = configPath(project, cwd)
  const errors = []
  const parsed = ts.getParsedCommandLineOfConfigFile(path, undefined, {
    ...ts.sys,
    onUnRecoverableConfigFileDiagnostic: (d) => errors.push(d),
  })
  if (!parsed) return { errors: errors.map(diagnostic), noCheck: false, files: [] }
  const program = ts.createProgram({
    rootNames: parsed.fileNames,
    options: parsed.options,
    projectReferences: parsed.projectReferences,
  })
  const found = [
    ...parsed.errors,
    ...program.getOptionsDiagnostics(),
    ...program.getSyntacticDiagnostics(),
  ].filter((d) => d.category === ts.DiagnosticCategory.Error)
  return {
    errors: [...new Set(found.map(diagnostic))],
    noCheck: Boolean(parsed.options.noCheck),
    files: program.getSourceFiles().map((f) => resolve(f.fileName)),
  }
}

/** A compiler diagnostic as one line: its code, its place when it has one, its message. */
function diagnostic(d) {
  const text = ts.flattenDiagnosticMessageText(d.messageText, '\n').split('\n')[0]
  if (!d.file || d.start === undefined) return `TS${d.code}: ${text}`
  const { line, character } = d.file.getLineAndCharacterOfPosition(d.start)
  return `TS${d.code} ${d.file.fileName}:${line + 1}:${character + 1}: ${text}`
}

/**
 * The entry as named, walked component by component from the folder (each `..` only out of a folder that exists),
 * each name in the disk's own case, links kept: null when it is not a file in `here` (its link target included) or a
 * component matches more than one name.
 */
export function entryPath(here, entry, key) {
  let path = isAbsolute(entry) ? parse(resolve(entry)).root : here
  for (const part of entry.split(process.platform === 'win32' ? /[\\/]/ : '/')) {
    if (!stat(path)?.isDirectory()) return null
    if (part === '' || part === '.') continue
    if (part === '..') {
      path = dirname(realpathSync.native(path)) // as the system takes it: out of a link's target
      continue
    }
    const names = readdirSync(path)
    const hits = names.includes(part) ? [part] : names.filter((n) => key(n) === key(part))
    if (hits.length !== 1) return null
    path = join(path, hits[0])
  }
  const within = (p) => key(p).startsWith(key(here) + sep)
  // The path as written, given to the system unnormalised, must open the same file.
  const asWritten = stat(isAbsolute(entry) ? entry : `${here}${sep}${entry}`)
  const found = stat(path)
  if (!asWritten || !found || asWritten.ino !== found.ino || asWritten.dev !== found.dev)
    return null
  return within(path) && found.isFile() && within(realpathSync.native(path)) ? path : null
}

/** ESLint's verdict on each entry, linted from `cwd` with its own config: project service on, program confirmed. */
export async function serviceMisses(files, cwd, key) {
  if (!files.length) return []
  const problems = []
  const confirmed = new Set()
  const probe = {
    meta: { type: 'problem', schema: [] },
    create(context) {
      // The program's source file for the very code ESLint lints, which must be the entry with its full text.
      const services = context.sourceCode.parserServices
      const linted = services?.esTreeNodeToTSNodeMap?.get(context.sourceCode.ast)
      const file = resolve(context.physicalFilename)
      if (
        linted &&
        services.program?.getSourceFile(linted.fileName) === linted &&
        key(resolve(linted.fileName)) === key(file) &&
        unBom(linted.text) === unBom(readFileSync(file, 'utf8'))
      )
        confirmed.add(key(file))
      return {}
    },
  }
  let eslint
  try {
    const { ESLint } = await import('eslint')
    eslint = new ESLint({
      cwd,
      cache: false,
      overrideConfig: {
        plugins: { 'uvt-check': { rules: { program: probe } } },
        rules: { 'uvt-check/program': 'error' },
      },
    })
  } catch (e) {
    return [`ESLint could not start in ${cwd}: ${firstLine(e)}`]
  }
  for (const file of files) {
    const at = relative(cwd, file)
    try {
      const config = await eslint.calculateConfigForFile(file)
      const service = !config || config.languageOptions?.parserOptions?.projectService
      if (!service)
        problems.push(`${at}: ESLint does not lint it through the TypeScript project service`)
      const said = []
      for (const result of await eslint.lintFiles([file]))
        for (const m of result.messages)
          if (m.fatal || /^File ignored/.test(m.message)) said.push(m.message)
      for (const message of new Set(said))
        problems.push(`${at}: ESLint did not lint it in a TypeScript program: ${message}`)
      if (service && !said.length && !confirmed.has(key(file)))
        problems.push(
          `${at}: ESLint did not lint it in a TypeScript program (no program held its full text)`,
        )
    } catch (e) {
      problems.push(`${at}: ESLint could not lint it: ${firstLine(e)}`)
    }
  }
  return problems
}

/** A failure's first line: a command's own error output when it has one, else the error's message. */
const firstLine = (e) =>
  String(e?.stderr ?? '').trim()
    ? String(e.stderr).trim().split('\n')[0]
    : e instanceof Error
      ? e.message.split('\n')[0]
      : String(e)

/** Every problem found, as readable lines; an empty list is a pass. */
export async function checkProjects({ projects, entries = [], cwd = process.cwd() }) {
  const here = realpathSync.native(cwd)
  const ignoreCase = caseless(here)
  const key = (path) => (ignoreCase ? path.toLowerCase() : path)
  const problems = []
  let own = []
  try {
    own = folderFiles(here)
    if (!own.length) problems.push(`${here}: no TypeScript file found in the folder`)
  } catch (e) {
    problems.push(`${here}: Git could not list the folder's files: ${firstLine(e)}`)
  }
  const owned = new Set(own.map(key))
  const read = new Set()
  for (const p of projects) {
    let project
    try {
      project = projectFiles(p, here)
    } catch (e) {
      problems.push(`${p}: the compiler could not read it: ${firstLine(e)}`)
      continue
    }
    for (const error of project.errors) problems.push(`${p}: ${error}`)
    if (project.noCheck) {
      problems.push(`${p}: skips checking (noCheck), so it is given no file here`)
      continue
    }
    const files = project.files.filter((f) => key(f).startsWith(key(here) + sep))
    // Credit only for the folder's own TypeScript files (Git's view), never a dependency's declarations.
    if (!files.some((f) => owned.has(key(f))))
      problems.push(`${p}: reads no TypeScript file of the folder's own`)
    for (const f of files) read.add(key(f))
  }
  for (const f of own)
    if (!read.has(key(f)))
      problems.push(`${relative(here, f)}: read by none of ${projects.join(', ')}`)
  const valid = []
  for (const entry of entries) {
    try {
      const f = entryPath(here, entry, key)
      if (!f || !isTs(f) || isDeclaration(f)) {
        problems.push(`${entry}: an entry is a TypeScript file in this folder, not a declaration`)
        continue
      }
      const at = relative(here, f)
      valid.push(f)
      if (!read.has(key(f))) problems.push(`${at}: an entry no project reads`)
      try {
        for (const twin of sameBasename(f))
          problems.push(
            `${at}: ${basename(twin)} beside it shares its basename, case ignored; an entry takes a basename of its own (TypeScript keeps main.ts and drops a main.tsx beside it)`,
          )
      } catch (e) {
        problems.push(`${at}: its siblings could not be listed: ${firstLine(e)}`)
      }
    } catch (e) {
      problems.push(`${entry}: the entry could not be looked up: ${firstLine(e)}`)
    }
  }
  problems.push(...(await serviceMisses(valid, here, key)))
  return [...new Set(problems)]
}

/** `--project a --project b --entry e` into lists; anything else is a usage error. */
export function parseArgs(argv) {
  const projects = []
  const entries = []
  for (let i = 0; i < argv.length; i += 2) {
    const [flag, value] = [argv[i], argv[i + 1]]
    if (!value || value.startsWith('--')) return null
    if (flag === '--project') projects.push(value)
    else if (flag === '--entry') entries.push(value)
    else return null
  }
  return projects.length && entries.length ? { projects, entries } : null
}

const invoked =
  process.argv[1] &&
  existsSync(process.argv[1]) &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
if (invoked) {
  const args = parseArgs(process.argv.slice(2))
  if (!args) {
    console.error(
      'usage: node <root>/scripts/check-projects.mjs --project <tsconfig> [--project …] --entry <file> [--entry …]',
    )
    process.exit(2)
  }
  const problems = await checkProjects(args)
  for (const p of problems) console.error(`check-projects: ${p}`)
  if (problems.length) process.exit(1)
  console.log(
    `check-projects: every TypeScript file read by one of ${args.projects.length} project(s); ${args.entries.length} entr${args.entries.length === 1 ? 'y' : 'ies'} with a basename of its own, read by the compiler and in a TypeScript program ESLint's project service built`,
  )
}

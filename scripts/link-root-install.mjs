#!/usr/bin/env node
// The pack tools' reach to the one install (UVT-7). The accessibility pack's runner, sampler, doctor and extended
// command look for Playwright, axe and ESLint at `<folder>/node_modules/<package>`, as though the folder owned its
// install; this repository has one install, at the root. So a tool declares in its own package.json the packages it
// uses (those its copied pack tools read among them), each with the root's own specifier, and this script links each
// from the tool's `node_modules/` to the root's copy (`finisher/node_modules/eslint -> ../../node_modules/eslint`,
// relative, so it holds in any clone). Nothing is installed twice: Node, Playwright and the pack's real-path readers all
// reach the root's files.
//
// No install hook runs it (the root's npm runs no install script, UVT-7): each tool's `a11y*` scripts run it first,
// written in the tool's own item (VH-249, VNG-14). It writes only symbolic links inside a tool's `node_modules/`,
// which Git ignores; it removes only a link into the root's `node_modules/` for a package the tool no longer
// declares; it never touches a real folder there, and, before making any link, refuses a declared package whose
// specifier differs from the root package.json's, or which the root's install does not hold at the version its
// lockfile names (after a checkout switch, run npm ci at the root first).
//
// usage: node <root>/scripts/link-root-install.mjs [--check] [<tool folder> …]   (default: every tool)
//   --check  writes nothing; exit 1 when a link is missing, stale or wrong

import {
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  readlinkSync,
  realpathSync,
  rmSync,
  symlinkSync,
} from 'node:fs'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
export const TOOLS = ['finisher', 'name-graphics']

const EXACT = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/
const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'))
const lstat = (path) => {
  try {
    return lstatSync(path)
  } catch {
    return null
  }
}
const isLink = (path) => lstat(path)?.isSymbolicLink() ?? false

/** The packages a tool declares, dependencies and devDependencies, name to version. */
export function declared(toolDir) {
  const pkg = readJson(join(toolDir, 'package.json'))
  return { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) }
}

/** The links under `modules`, scoped ones as `@scope/name`, each with its target as written. */
function links(modules) {
  const found = []
  if (!existsSync(modules)) return found
  for (const entry of readdirSync(modules)) {
    const path = join(modules, entry)
    if (isLink(path)) found.push({ name: entry, path })
    else if (entry.startsWith('@') && lstat(path)?.isDirectory())
      for (const sub of readdirSync(path))
        if (isLink(join(path, sub))) found.push({ name: `${entry}/${sub}`, path: join(path, sub) })
  }
  return found
}

/** One tool's plan: the links to make, the stale links to remove, and the problems that stop it. */
export function plan(root, toolDir) {
  const tool = relative(root, toolDir) || '.'
  const modules = join(toolDir, 'node_modules')
  const rootModules = join(root, 'node_modules')
  const make = []
  const remove = []
  const problems = []
  if (tool === '.' || tool.startsWith('..') || tool.includes(sep))
    return { tool, make, remove, problems: [`${tool}: not a tool folder directly under the root`] }
  if (!existsSync(join(toolDir, 'package.json'))) return { tool, make, remove, problems: [`${tool}: no package.json; not a tool folder`] }
  const want = declared(toolDir)
  const pins = declared(root)
  const lockPath = join(root, 'package-lock.json')
  const locked = existsSync(lockPath) ? (readJson(lockPath).packages ?? {}) : {}
  const lockedRoot = { ...(locked['']?.dependencies ?? {}), ...(locked['']?.devDependencies ?? {}) }
  for (const [name, version] of Object.entries(want)) {
    const target = join(rootModules, name)
    const link = join(modules, name)
    if (!(name in pins)) {
      problems.push(`${tool}: declares ${name} ${version}, which the root's package.json does not declare; add it there first`)
      continue
    }
    if (pins[name] !== version) {
      problems.push(`${tool}: declares ${name} ${version}, the root's package.json has ${pins[name]}; a tool declares the root's own specifier`)
      continue
    }
    if (!existsSync(join(target, 'package.json'))) {
      problems.push(`${tool}: the root's install does not hold ${name}; run npm ci at the root`)
      continue
    }
    if (lockedRoot[name] !== pins[name]) {
      problems.push(`${tool}: the root's package.json has ${name} ${pins[name]}, its lockfile ${lockedRoot[name] ?? 'nothing'}; fix them at the root first`)
      continue
    }
    const lock = locked[`node_modules/${name}`]?.version
    if (!lock) {
      problems.push(`${tool}: the root's package-lock.json names no version of ${name}, so it and the root's package.json disagree; fix them at the root first`)
      continue
    }
    if (EXACT.test(pins[name]) && lock !== pins[name]) {
      problems.push(`${tool}: the root's lockfile resolves ${name} to ${lock}, its package.json pins ${pins[name]}; fix them at the root first`)
      continue
    }
    const held = readJson(join(target, 'package.json')).version
    if (held !== lock) {
      problems.push(`${tool}: the root's node_modules holds ${name} ${held}, its lockfile ${lock}; run npm ci at the root`)
      continue
    }
    if (lstat(link) && !isLink(link)) {
      problems.push(`${tool}: node_modules/${name} is a real folder, a second install; remove it, and run npm only at the root`)
      continue
    }
    const rel = relative(dirname(link), target)
    if (!isLink(link) || readlinkSync(link) !== rel) make.push({ name, link, rel })
  }
  for (const { name, path } of links(modules)) {
    if (name in want) continue
    const into = resolve(dirname(path), readlinkSync(path))
    if (into === join(rootModules, name)) remove.push({ name, link: path })
  }
  return { tool, make, remove, problems }
}

/** Makes and removes what `plan` found; call it only on a plan with no problems. */
export function apply({ make, remove }) {
  for (const { link } of remove) rmSync(link)
  for (const { link, rel } of make) {
    mkdirSync(dirname(link), { recursive: true })
    if (isLink(link)) rmSync(link)
    symlinkSync(rel, link)
  }
}

/** Runs over `folders` (paths from `cwd`); returns the exit code and the lines to print. */
export function run({ root = ROOT, folders = [], check = false, cwd = process.cwd() } = {}) {
  const lines = []
  let failed = false
  // Each path by its true spelling (realpath(3) gives a case-insensitive disk's own case), so a folder named twice,
  // in any case or form, is planned once.
  const canonical = (p) => (existsSync(p) ? realpathSync.native(p) : p)
  const top = canonical(root)
  const dirs = folders.length ? folders.map((f) => resolve(cwd, f)) : TOOLS.map((t) => join(top, t))
  const plans = [...new Set(dirs.map(canonical))].map((d) => plan(top, d))
  for (const p of plans) for (const m of p.problems) (lines.push(`link-root-install: ${m}`), (failed = true))
  if (failed) return { code: 1, lines }
  for (const p of plans) {
    if (check) {
      for (const { name } of p.make)
        (lines.push(`link-root-install: ${p.tool}: node_modules/${name} is not linked to the root's copy`), (failed = true))
      for (const { name } of p.remove)
        (lines.push(`link-root-install: ${p.tool}: node_modules/${name} is linked but no longer declared`), (failed = true))
      continue
    }
    apply(p)
    if (p.make.length || p.remove.length)
      lines.push(`link-root-install: ${p.tool}: ${p.make.length} link(s) made, ${p.remove.length} stale link(s) removed`)
  }
  if (!failed) lines.push(`link-root-install: ${plans.map((p) => p.tool).join(', ')}: every declared package reaches the root's install`)
  return { code: failed ? 1 : 0, lines }
}

if (process.argv[1] && existsSync(process.argv[1]) && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const argv = process.argv.slice(2)
  const { code, lines } = run({ check: argv.includes('--check'), folders: argv.filter((a) => a !== '--check') })
  for (const l of lines) (code ? console.error : console.log)(l)
  process.exitCode = code
}

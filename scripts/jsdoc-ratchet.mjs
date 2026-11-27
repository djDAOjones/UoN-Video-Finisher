#!/usr/bin/env node
// The JSDoc ratchet from a tool's folder, with the root's compiler (UVT-7). The JSDoc pack's ratchet
// (`tools/jsdoc-ratchet.mjs`, copied into a folder and never edited) runs only a TypeScript declared in the folder's
// own package.json and installed under its own `node_modules/`, by real path, and refuses a link to another copy; this
// repository has one install, at the root, so in a tool's folder the pack's ratchet cannot measure (exit 2). This
// runner keeps the pack's measurement and baseline whole and changes one thing, whose compiler: it imports the
// folder's copied ratchet for its configuration, flags, parser and baseline reader, refuses a copy whose constants
// differ from those it was written against, and runs the root's TypeScript (declared in the root's package.json,
// installed under the root's `node_modules/`, its real path inside the repository) over the folder's own
// tsconfig.jsdoc.json, against the folder's own project/jsdoc-baseline.json, in the pack's format, with the pack's
// modes and exit codes: 0 at or below the baseline, 1 above it, 2 cannot measure.
//
// usage, from a tool's folder: node ../scripts/jsdoc-ratchet.mjs [--init | --lower [--accept-environment-change]]

import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { closeSync, existsSync, openSync, readFileSync, realpathSync, renameSync, rmSync, writeFileSync, writeSync } from 'node:fs'
import { dirname, join, resolve, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
/** The pack's constants as of its v5.0.3 copy; a copy that differs is refused, so a refresh is read before it runs. */
export const PACK = {
  CONFIG: 'tsconfig.jsdoc.json',
  BASELINE: 'project/jsdoc-baseline.json',
  FLAGS: ['-p', 'tsconfig.jsdoc.json', '--noEmit', '--allowJs', '--checkJs', '--noCheck', 'false', '--incremental', 'false', '--composite', 'false', '--pretty', 'false'],
  MINIMUM: [5, 6],
  TIMEOUT_MS: 120_000,
  MAX_OUTPUT: 32 * 1024 * 1024,
}
const USAGE = 'usage: node ../scripts/jsdoc-ratchet.mjs [--init | --lower [--accept-environment-change]]'

/** Node's own warnings on standard error, the pack's pattern: a warning line, or its exact hint line. */
const NODE_WARNING = /^\(node:\d+\) \w*Warning: |^\(Use `node --trace-\S+ \.\.\.` to show where the warning was created\)$/

class Unmeasurable extends Error {}

/** The folder's copied ratchet, its exports checked against `PACK`. */
export async function pack(folder) {
  const path = join(folder, 'tools', 'jsdoc-ratchet.mjs')
  if (!existsSync(path)) throw new Unmeasurable(`no tools/jsdoc-ratchet.mjs in ${folder}; the folder copies the JSDoc pack first`)
  const m = await import(pathToFileURL(realpathSync(path)).href)
  for (const key of Object.keys(PACK))
    if (JSON.stringify(m[key]) !== JSON.stringify(PACK[key]))
      throw new Unmeasurable(`the copied ratchet's ${key} differs from the one this runner was written against; read the pack's change before running it`)
  for (const fn of ['parse', 'readBaseline'])
    if (typeof m[fn] !== 'function') throw new Unmeasurable(`the copied ratchet exports no ${fn}`)
  return m
}

/** The root's compiler: declared in the root's package.json, installed under its node_modules, inside the repository. */
export function compiler(root = ROOT) {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
  const pin = pkg.devDependencies?.typescript ?? pkg.dependencies?.typescript
  if (!pin) throw new Unmeasurable("the root's package.json does not declare typescript")
  const dir = join(root, 'node_modules', 'typescript')
  const bin = join(dir, 'bin', 'tsc')
  if (!existsSync(bin)) throw new Unmeasurable("typescript is not installed in the root's node_modules; run npm ci at the root")
  const rootReal = realpathSync(root)
  for (const p of [dir, bin])
    if (!realpathSync(p).startsWith(rootReal + sep))
      throw new Unmeasurable(`the root's node_modules/typescript resolves outside the repository, to ${realpathSync(p)}`)
  const { version } = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'))
  if (typeof version !== 'string' || version === '') throw new Unmeasurable("the root's node_modules/typescript/package.json names no version")
  if (version !== pin)
    throw new Unmeasurable(`the root's node_modules holds TypeScript ${version}, its package.json pins ${pin}; run npm ci at the root`)
  const [major, minor] = String(version).split('.').map(Number)
  if (!(major > PACK.MINIMUM[0] || (major === PACK.MINIMUM[0] && minor >= PACK.MINIMUM[1])))
    throw new Unmeasurable(`TypeScript ${version} is older than ${PACK.MINIMUM.join('.')}`)
  return { bin, version }
}

/** One run of the root's compiler over the folder's configuration, read as the pack reads it. */
export function measure(folder, m, { root = ROOT, timeoutMs = PACK.TIMEOUT_MS, maxOutput = PACK.MAX_OUTPUT } = {}) {
  const { bin, version } = compiler(root)
  const configPath = join(folder, PACK.CONFIG)
  if (!existsSync(configPath)) throw new Unmeasurable(`${PACK.CONFIG} is missing`)
  const configHash = createHash('sha256').update(readFileSync(configPath)).digest('hex')
  const started = process.hrtime.bigint()
  const r = spawnSync(process.execPath, [bin, ...PACK.FLAGS], {
    cwd: folder,
    encoding: 'utf8',
    timeout: timeoutMs,
    killSignal: 'SIGKILL',
    maxBuffer: maxOutput,
  })
  const seconds = Number(process.hrtime.bigint() - started) / 1e9
  if (r.error?.code === 'ETIMEDOUT') throw new Unmeasurable(`the compiler ran past ${timeoutMs / 1000} s and was killed`)
  if (r.error?.code === 'ENOBUFS') throw new Unmeasurable(`the compiler's output passed ${maxOutput} bytes`)
  if (r.error) throw new Unmeasurable(`the compiler could not run: ${r.error.message}`)
  if (r.signal) throw new Unmeasurable(`the compiler stopped on ${r.signal}`)
  const stderr = (r.stderr ?? '').split(/\r?\n/).filter((l) => l.trim() && !NODE_WARNING.test(l))
  if (stderr.length) throw new Unmeasurable(`the compiler wrote to standard error: ${stderr[0]}`)
  const { errors, files, unlocated } = m.parse(r.stdout ?? '')
  if (unlocated.length) throw new Unmeasurable(`the compiler reported an error with no location: ${unlocated[0]}`)
  // A diagnostic located in the configuration itself is a configuration in error, never source debt (the pack's header).
  const inConfig = Object.keys(files).find((f) => resolve(folder, f) === resolve(configPath))
  if (inConfig) {
    const line = (r.stdout ?? '').split(/\r?\n/).find((l) => l.startsWith(`${inConfig}(`))
    throw new Unmeasurable(`${PACK.CONFIG} is in error, so the count measures nothing: ${line}`)
  }
  if (r.status === 0 && errors > 0) throw new Unmeasurable(`the compiler exited 0 yet printed ${errors} error line(s)`)
  if (r.status !== 0 && ![1, 2].includes(r.status)) throw new Unmeasurable(`the compiler exited ${r.status}`)
  if (r.status !== 0 && errors === 0) throw new Unmeasurable(`the compiler exited ${r.status} with no diagnostic line`)
  return { errors, files, compilerVersion: version, configHash, seconds }
}

/** The pack's baseline body, byte for byte: schema 1, its keys in its order, files sorted, two-space JSON. */
export function baselineBody(m) {
  const files = Object.fromEntries(Object.keys(m.files).sort().map((f) => [f, m.files[f]]))
  return `${JSON.stringify({ schema: 1, errors: m.errors, compilerVersion: m.compilerVersion, configHash: m.configHash, files }, null, 2)}\n`
}

function write(folder, m, expected) {
  const path = join(folder, PACK.BASELINE)
  if (expected === null) {
    try {
      writeFileSync(path, baselineBody(m), { flag: 'wx' })
    } catch (e) {
      if (e.code === 'EEXIST') throw new Unmeasurable(`${PACK.BASELINE} appeared during the run; nothing written`)
      rmSync(path, { force: true })
      throw new Unmeasurable(`the baseline could not be written: ${e.message}`)
    }
    return
  }
  if ((existsSync(path) ? readFileSync(path, 'utf8') : null) !== expected)
    throw new Unmeasurable(`${PACK.BASELINE} changed during the run; nothing written, run it again`)
  const tmp = `${path}.${process.pid}.tmp`
  let fd = null
  let created = false
  try {
    fd = openSync(tmp, 'wx') // owned from here: created exclusively by this run
    created = true
    writeSync(fd, baselineBody(m))
    closeSync(fd)
    fd = null
    renameSync(tmp, path)
    created = false
  } catch (e) {
    throw new Unmeasurable(`the baseline could not be written: ${e.message}`)
  } finally {
    if (fd !== null)
      try {
        closeSync(fd)
      } catch {
        // already failing
      }
    if (created) rmSync(tmp, { force: true }) // only a temporary file this run made
  }
}

const rises = (base, m) =>
  Object.keys(m.files)
    .sort()
    .filter((f) => m.files[f] > (base.files[f] ?? 0))
    .map((f) => `${f}: ${base.files[f] ?? 0} → ${m.files[f]}`)

/** The ratchet's modes over `folder` with the root's compiler; returns the exit code and the lines it prints. */
export async function ratchet(args, folder = process.cwd(), opts = {}) {
  const lines = []
  const init = args.includes('--init')
  const lower = args.includes('--lower')
  const accept = args.includes('--accept-environment-change')
  const known = new Set(['--init', '--lower', '--accept-environment-change'])
  if (args.some((a) => !known.has(a)) || new Set(args).size !== args.length || (init && (lower || accept)) || (accept && !lower))
    return { code: 2, lines: [USAGE] }
  try {
    const m = await pack(folder)
    const base = m.readBaseline(folder)
    if (init) {
      if (base) throw new Unmeasurable(`${PACK.BASELINE} exists; --init writes only the first baseline`)
      const now = measure(folder, m, opts)
      write(folder, now, null)
      lines.push(`jsdoc-ratchet: recorded ${now.errors} error(s) with the root's TypeScript ${now.compilerVersion}; name the count in a decision`)
      return { code: 0, lines }
    }
    if (!base) throw new Unmeasurable(`no ${PACK.BASELINE}; run --init once, then name the count in a decision`)
    const now = measure(folder, m, opts)
    const changed = []
    if (now.compilerVersion !== base.compilerVersion)
      changed.push(`the compiler is TypeScript ${now.compilerVersion}, the baseline's ${base.compilerVersion}`)
    if (now.configHash !== base.configHash) changed.push(`${PACK.CONFIG} differs from the one the baseline measured`)
    const head = `jsdoc-ratchet: ${now.errors} error(s), baseline ${base.errors}, the root's TypeScript ${now.compilerVersion}`
    if (changed.length && !(lower && accept))
      throw new Unmeasurable(`${changed.join('; ')}: review the change, then --lower --accept-environment-change records it while the count is at or below ${base.errors}`)
    if (now.errors > base.errors) {
      lines.push(`${head} — the count rose by ${now.errors - base.errors} and may not rise${lower ? '; nothing written' : ''}`)
      for (const r of rises(base, now)) lines.push(`  ${r}`)
      return { code: 1, lines }
    }
    lines.push(head)
    for (const r of rises(base, now)) lines.push(`INFO  a file's count rose while the total did not: ${r}`)
    if (lower && (now.errors < base.errors || changed.length)) {
      write(folder, now, base.raw)
      lines.push(`jsdoc-ratchet: baseline now ${now.errors}`)
    } else if (now.errors < base.errors) lines.push(`jsdoc-ratchet: the count fell by ${base.errors - now.errors}; --lower records it`)
    else if (lower) lines.push('jsdoc-ratchet: the count equals the baseline; nothing to record')
    return { code: 0, lines }
  } catch (e) {
    return { code: 2, lines: [...lines, `jsdoc-ratchet: cannot measure — ${e instanceof Error ? e.message : String(e)}`] }
  }
}

if (process.argv[1] && existsSync(process.argv[1]) && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { code, lines } = await ratchet(process.argv.slice(2))
  for (const l of lines) (code ? console.error : console.log)(l)
  process.exitCode = code
}

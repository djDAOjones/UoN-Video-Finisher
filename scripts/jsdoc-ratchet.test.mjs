// Tests for the JSDoc ratchet run from a tool's folder with the root's compiler (UVT-7), run by `node --test` in the
// root gate. Each fixture is a pretend tool folder in the system's temporary directory with a stand-in for the pack's
// copied ratchet (its constants, parser and baseline reader in the pack's shapes); the root's TypeScript does the
// measuring. Nothing is written in the repository. The proof against the pack's real copy is in the decision UVT-7.
import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PACK, compiler, ratchet } from './jsdoc-ratchet.mjs'

const made = []
/** The JSDoc pack's exported constants at v5.0.3 (d599678), written out here, not taken from the runner. */
const V503 = {
  CONFIG: 'tsconfig.jsdoc.json',
  BASELINE: 'project/jsdoc-baseline.json',
  FLAGS: ['-p', 'tsconfig.jsdoc.json', '--noEmit', '--allowJs', '--checkJs', '--noCheck', 'false', '--incremental', 'false', '--composite', 'false', '--pretty', 'false'],
  MINIMUM: [5, 6],
  TIMEOUT_MS: 120000,
  MAX_OUTPUT: 33554432,
}
after(() => made.forEach((d) => rmSync(d, { recursive: true, force: true })))

const STAND_IN = (constants) => `
export const CONFIG = ${JSON.stringify(constants.CONFIG)}
export const BASELINE = ${JSON.stringify(constants.BASELINE)}
export const FLAGS = ${JSON.stringify(constants.FLAGS)}
export const MINIMUM = ${JSON.stringify(constants.MINIMUM)}
export const TIMEOUT_MS = ${JSON.stringify(constants.TIMEOUT_MS)}
export const MAX_OUTPUT = ${JSON.stringify(constants.MAX_OUTPUT)}
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
export function parse(output) {
  const files = {}, unlocated = []; let errors = 0
  for (const line of output.split(/\\r?\\n/)) {
    const m = /^(.+?)\\((\\d+),(\\d+)\\): error (TS\\d+): /.exec(line)
    if (m) { errors++; files[m[1]] = (files[m[1]] ?? 0) + 1 } else if (/^error (TS\\d+): /.test(line)) unlocated.push(line)
  }
  return { errors, files, unlocated }
}
export function readBaseline(root) {
  const path = join(root, BASELINE)
  if (!existsSync(path)) return null
  const raw = readFileSync(path, 'utf8')
  return { ...JSON.parse(raw), raw }
}
`

/** A tool folder with JavaScript `files`, the pack's configuration and a stand-in copy of its ratchet. */
function folder(files, constants = V503) {
  const dir = mkdtempSync(join(tmpdir(), 'uvt7-jsdoc-'))
  made.push(dir)
  const put = (rel, body) => {
    mkdirSync(dirname(join(dir, rel)), { recursive: true })
    writeFileSync(join(dir, rel), body)
  }
  put('tools/jsdoc-ratchet.mjs', STAND_IN(constants))
  put('tsconfig.jsdoc.json', JSON.stringify({ compilerOptions: { allowJs: true, checkJs: true, noEmit: true, target: 'es2022', module: 'esnext', moduleResolution: 'bundler', lib: ['es2022'], types: [], skipLibCheck: true, strict: false }, include: ['src/**/*.js'] }))
  put('project/.keep', '')
  for (const [rel, body] of Object.entries(files)) put(rel, body)
  return dir
}
const ROOT_TS = join(dirname(fileURLToPath(import.meta.url)), '..', 'node_modules', 'typescript')
const GOOD = '/** @param {number} n */\nexport const twice = (n) => n * 2\n'
const BAD = '/** @param {number} n */\nexport const half = (n) => n / 2\nhalf("x")\n'

test("the root's compiler is the one install's TypeScript, 5.6 or later", () => {
  const { version } = compiler()
  const [major, minor] = version.split('.').map(Number)
  assert.ok(major > 5 || (major === 5 && minor >= 6))
})

test('--init records the count in the pack\'s format; a check at the baseline passes', async () => {
  const dir = folder({ 'src/a.js': GOOD, 'src/z.js': BAD, 'src/b.js': BAD })
  const init = await ratchet(['--init'], dir)
  assert.equal(init.code, 0, init.lines.join('\n'))
  const raw = readFileSync(join(dir, V503.BASELINE), 'utf8')
  const version = JSON.parse(readFileSync(join(ROOT_TS, 'package.json'), 'utf8')).version
  const hash = createHash('sha256').update(readFileSync(join(dir, V503.CONFIG))).digest('hex')
  // The pack's schema 1, byte for byte: its keys in its order, two-space indent, files sorted, a final newline.
  const expected = [
    '{',
    '  "schema": 1,',
    '  "errors": 2,',
    `  "compilerVersion": "${version}",`,
    `  "configHash": "${hash}",`,
    '  "files": {',
    '    "src/b.js": 1,',
    '    "src/z.js": 1',
    '  }',
    '}',
    '',
  ].join('\n')
  assert.equal(raw, expected)
  assert.equal((await ratchet([], dir)).code, 0)
  assert.equal((await ratchet(['--init'], dir)).code, 2)
})

test('a rise fails with the file named; a fall passes and --lower records it', async () => {
  const dir = folder({ 'src/a.js': GOOD, 'src/b.js': BAD })
  await ratchet(['--init'], dir)
  writeFileSync(join(dir, 'src/c.js'), BAD)
  const risen = await ratchet([], dir)
  assert.equal(risen.code, 1)
  assert.ok(risen.lines.some((l) => l.includes('src/c.js: 0 → 1')))
  rmSync(join(dir, 'src/c.js'))
  writeFileSync(join(dir, 'src/b.js'), GOOD)
  const fallen = await ratchet([], dir)
  assert.equal(fallen.code, 0)
  assert.match(fallen.lines.at(-1), /fell by 1; --lower records it/)
  assert.equal((await ratchet(['--lower'], dir)).code, 0)
  assert.equal(JSON.parse(readFileSync(join(dir, V503.BASELINE), 'utf8')).errors, 0)
})

test('a changed configuration cannot measure until it is accepted', async () => {
  const dir = folder({ 'src/a.js': GOOD })
  await ratchet(['--init'], dir)
  writeFileSync(join(dir, 'tsconfig.jsdoc.json'), readFileSync(join(dir, 'tsconfig.jsdoc.json'), 'utf8') + '\n')
  assert.equal((await ratchet([], dir)).code, 2)
  assert.equal((await ratchet(['--lower', '--accept-environment-change'], dir)).code, 0)
  assert.equal((await ratchet([], dir)).code, 0)
})

test('no copied ratchet, or a copy whose constants differ, cannot measure', async () => {
  const dir = folder({ 'src/a.js': GOOD })
  rmSync(join(dir, 'tools/jsdoc-ratchet.mjs'))
  assert.match((await ratchet(['--init'], dir)).lines[0], /no tools\/jsdoc-ratchet\.mjs/)
  const other = folder({ 'src/a.js': GOOD }, { ...V503, FLAGS: [...V503.FLAGS, '--strict'] })
  const r = await ratchet(['--init'], other)
  assert.equal(r.code, 2)
  assert.match(r.lines[0], /FLAGS differs/)
})

test("the pack's usage: --init alone, or --lower with or without --accept-environment-change", async () => {
  const dir = folder({ 'src/a.js': GOOD })
  for (const args of [['--init', '--lower'], ['--accept-environment-change'], ['--other'], ['--lower', '--lower']])
    assert.equal((await ratchet(args, dir)).code, 2, args.join(' '))
})

test('a compiler past the time limit cannot measure, and nothing is written', async () => {
  const dir = folder({ 'src/a.js': GOOD })
  const r = await ratchet(['--init'], dir, { timeoutMs: 1 })
  assert.equal(r.code, 2)
  assert.match(r.lines[0], /ran past 0\.001 s and was killed/)
  assert.throws(() => readFileSync(join(dir, V503.BASELINE)))
})

test('--lower at an equal count writes nothing and says so', async () => {
  const dir = folder({ 'src/a.js': GOOD, 'src/b.js': BAD })
  await ratchet(['--init'], dir)
  const before = readFileSync(join(dir, V503.BASELINE), 'utf8')
  const r = await ratchet(['--lower'], dir)
  assert.equal(r.code, 0)
  assert.match(r.lines.at(-1), /equals the baseline; nothing to record/)
  assert.equal(readFileSync(join(dir, V503.BASELINE), 'utf8'), before)
})

test("the runner's constants are the pack's v5.0.3 ones", () => {
  assert.deepEqual(PACK, V503)
})

test("a root install whose TypeScript differs from the root's pin cannot measure: run npm ci at the root", async () => {
  const root = realpathSync(mkdtempSync(join(tmpdir(), 'uvt7-jsdoc-root-')))
  made.push(root)
  const put = (rel, body) => {
    mkdirSync(dirname(join(root, rel)), { recursive: true })
    writeFileSync(join(root, rel), body)
  }
  put('package.json', JSON.stringify({ devDependencies: { typescript: '9.9.9' } }))
  put('node_modules/typescript/package.json', JSON.stringify({ version: '6.0.3' }))
  put('node_modules/typescript/bin/tsc', '')
  assert.throws(() => compiler(root), /holds TypeScript 6\.0\.3, its package\.json pins 9\.9\.9; run npm ci at the root/)
  const dir = folder({ 'src/a.js': GOOD })
  const r = await ratchet(['--init'], dir, { root })
  assert.equal(r.code, 2)
  assert.match(r.lines[0], /pins 9\.9\.9/)
  assert.throws(() => readFileSync(join(dir, V503.BASELINE)))
})

test('a diagnostic in the configuration itself cannot measure, and nothing is written', async () => {
  const dir = folder({ 'src/a.js': GOOD })
  const config = JSON.parse(readFileSync(join(dir, V503.CONFIG), 'utf8'))
  config.compilerOptions.lib = ['es2022', 'dom.iterablez']
  writeFileSync(join(dir, V503.CONFIG), JSON.stringify(config, null, 2))
  const r = await ratchet(['--init'], dir)
  assert.equal(r.code, 2, r.lines.join('\n'))
  assert.match(r.lines[0], /tsconfig\.jsdoc\.json is in error, so the count measures nothing: tsconfig\.jsdoc\.json\(\d+,\d+\): error TS6046/)
  assert.throws(() => readFileSync(join(dir, V503.BASELINE)))
})

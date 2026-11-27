// The JSDoc ratchet's guard (UVT-8): it fails on each diagnostic that stops tsc reporting the rest, or that the
// ratchet would count as source debt, and passes semantic errors and a malformed JSDoc type to the ratchet.
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { after, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { blockingDiagnostics } from './jsdoc-guard.mjs'

const GUARD = fileURLToPath(new URL('./jsdoc-guard.mjs', import.meta.url))
const ROOT_CONFIG = fileURLToPath(new URL('../tsconfig.jsdoc.json', import.meta.url))
/** @type {string[]} */
const made = []
after(() => made.forEach((d) => rmSync(d, { recursive: true, force: true })))

/** A semantic error the ratchet counts: a string passed where a number is documented. */
const SEMANTIC = '/** @param {number} n */\nexport const twice = (n) => n * 2\ntwice("x")\n'

/**
 * A fixture folder: `files` written beside a tsconfig.json whose compiler options `options` overrides.
 *
 * @param {Record<string, string>} files each file's name and text
 * @param {Record<string, unknown>} [options] compiler options over the fixture's own
 * @param {string[]} [include] the tsconfig's include
 * @returns {string} the fixture's tsconfig.json
 */
function fixture(files, options = {}, include = ['*.mjs']) {
  const dir = realpathSync(mkdtempSync(join(tmpdir(), 'uvt8-jsdoc-guard-')))
  made.push(dir)
  for (const [name, text] of Object.entries(files)) writeFileSync(join(dir, name), text)
  const compilerOptions = { allowJs: true, checkJs: true, noEmit: true, target: 'es2022', module: 'esnext', moduleResolution: 'bundler', lib: ['es2022'], types: [], strict: false, ...options }
  writeFileSync(join(dir, 'tsconfig.json'), JSON.stringify({ compilerOptions, include }))
  return join(dir, 'tsconfig.json')
}

test('semantic errors and a malformed JSDoc type pass to the ratchet, which counts them', () => {
  assert.deepEqual(blockingDiagnostics(fixture({ 'a.mjs': SEMANTIC, 'b.mjs': '/** @type {Map<string} */\nexport const m = new Map()\n' })), [])
})

test('a malformed reference directive, which hides every semantic error from tsc, fails the guard', () => {
  const lines = blockingDiagnostics(fixture({ 'a.mjs': SEMANTIC, 'b.mjs': '/// <reference type="node" />\nexport const x = 1\n' }))
  assert.equal(lines.length, 1)
  assert.match(lines[0], /b\.mjs.*TS1084/)
})

test('a misspelt lib, a configuration error the ratchet would count as debt, fails the guard', () => {
  const lines = blockingDiagnostics(fixture({ 'a.mjs': SEMANTIC }, { lib: ['es2022', 'dom.iterabel'] }))
  assert.ok(lines.some((l) => /TS6046/.test(l)), lines.join('\n'))
})

test('a tsconfig with a syntax error, which tsc prints beside the semantic errors, fails the guard', () => {
  const config = fixture({ 'a.mjs': SEMANTIC })
  writeFileSync(config, readFileSync(config, 'utf8').replace('"allowJs":true,', '"allowJs":true'))
  const lines = blockingDiagnostics(config)
  assert.ok(lines.some((l) => /tsconfig\.json.*TS1005/.test(l)), lines.join('\n'))
})

test('a configuration that selects no file fails the guard', () => {
  const lines = blockingDiagnostics(fixture({ 'a.mjs': SEMANTIC }, {}, ['src/**/*.js']))
  assert.ok(lines.some((l) => /TS18003/.test(l)), lines.join('\n'))
})

test("the root's own JSDoc project has none: the ratchet counts it in full", () => {
  assert.deepEqual(blockingDiagnostics(ROOT_CONFIG), [])
})

test('the command exits 0 on none, 1 on some (a missing project among them), 2 on a bad argument', () => {
  const run = (/** @type {string[]} */ ...args) => spawnSync(process.execPath, [GUARD, ...args], { encoding: 'utf8' }).status
  assert.equal(run('--project', fixture({ 'a.mjs': SEMANTIC })), 0)
  assert.equal(run('--project', fixture({ 'b.mjs': '/// <reference type="node" />\n' })), 1)
  assert.equal(run('--project'), 2)
  assert.equal(run('--project', join(tmpdir(), 'uvt8-no-such-folder', 'tsconfig.json')), 1)
})

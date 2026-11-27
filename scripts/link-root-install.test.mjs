// Tests for the pack tools' reach to the one install (UVT-7), run by `node --test` in the root gate. Each fixture is
// a pretend repository in the system's temporary directory; nothing is written in this one.
import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, lstatSync, mkdirSync, mkdtempSync, readlinkSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { plan, run } from './link-root-install.mjs'

const made = []
after(() => made.forEach((d) => rmSync(d, { recursive: true, force: true })))

/**
 * A pretend root whose package.json declares `pins` ({ name: specifier }), whose lockfile records `lockSpecs` as the
 * root's own declarations and resolves `locked`, and whose node_modules holds `held` ({ name: version }), with tools
 * (`{ folder: declares }`) each declaring their packages.
 */
function repo({ pins, lockSpecs = pins, locked = pins, held = locked, tools }) {
  const root = realpathSync(mkdtempSync(join(tmpdir(), 'uvt7-link-')))
  made.push(root)
  const put = (rel, body) => {
    mkdirSync(dirname(join(root, rel)), { recursive: true })
    writeFileSync(join(root, rel), JSON.stringify(body))
  }
  put('package.json', { name: 'root', devDependencies: pins })
  put('package-lock.json', {
    lockfileVersion: 3,
    packages: { '': { name: 'root', devDependencies: lockSpecs }, ...Object.fromEntries(Object.entries(locked).map(([n, version]) => [`node_modules/${n}`, { version }])) },
  })
  for (const [name, version] of Object.entries(held)) put(`node_modules/${name}/package.json`, { name, version })
  for (const [tool, declares] of Object.entries(tools)) put(`${tool}/package.json`, { name: tool, devDependencies: declares })
  return root
}
const isLink = (p) => lstatSync(p).isSymbolicLink()
const absent = (p) => assert.throws(() => lstatSync(p), { code: 'ENOENT' }, `${p} should not exist`)

test('each declared package is linked, relative, to the root copy, scoped ones too', () => {
  const pins = { eslint: '9.39.5', '@playwright/test': '1.56.1' }
  const root = repo({ pins, tools: { finisher: pins } })
  const { code, lines } = run({ root, folders: ['finisher'], cwd: root })
  assert.equal(code, 0, lines.join('\n'))
  assert.equal(readlinkSync(join(root, 'finisher/node_modules/eslint')), '../../node_modules/eslint')
  assert.equal(readlinkSync(join(root, 'finisher/node_modules/@playwright/test')), '../../../node_modules/@playwright/test')
  assert.equal(run({ root, folders: ['finisher'], cwd: root, check: true }).code, 0)
})

test('--check writes nothing and fails a missing link', () => {
  const root = repo({ pins: { eslint: '9.39.5' }, tools: { finisher: { eslint: '9.39.5' } } })
  const { code, lines } = run({ root, folders: ['finisher'], cwd: root, check: true })
  assert.equal(code, 1)
  assert.match(lines[0], /node_modules\/eslint is not linked/)
  absent(join(root, 'finisher/node_modules'))
})

test('--check fails a wrong link and a stale link, and changes neither', () => {
  const root = repo({ pins: { eslint: '9.39.5', 'axe-core': '4.13.0' }, tools: { finisher: { eslint: '9.39.5' } } })
  const modules = join(root, 'finisher/node_modules')
  mkdirSync(modules, { recursive: true })
  symlinkSync('../elsewhere/eslint', join(modules, 'eslint'))
  symlinkSync('../../node_modules/axe-core', join(modules, 'axe-core'))
  const { code, lines } = run({ root, folders: ['finisher'], cwd: root, check: true })
  assert.equal(code, 1)
  assert.ok(lines.some((l) => /node_modules\/eslint is not linked to the root's copy/.test(l)), lines.join('\n'))
  assert.ok(lines.some((l) => /node_modules\/axe-core is linked but no longer declared/.test(l)), lines.join('\n'))
  assert.equal(readlinkSync(join(modules, 'eslint')), '../elsewhere/eslint')
  assert.equal(readlinkSync(join(modules, 'axe-core')), '../../node_modules/axe-core')
})

test("a refusal in any tool stops every link, a valid one in another tool included", () => {
  const root = repo({
    pins: { eslint: '9.39.5', 'axe-core': '4.13.0' },
    tools: { finisher: { eslint: '9.39.5' }, 'name-graphics': { 'axe-core': '4.13.0', eslint: '9.0.0', 'left-pad': '1.3.0' } },
  })
  const { code, lines } = run({ root, folders: ['finisher', 'name-graphics'], cwd: root })
  assert.equal(code, 1)
  assert.ok(lines.some((l) => /name-graphics: declares eslint 9\.0\.0, the root's package\.json has 9\.39\.5/.test(l)), lines.join('\n'))
  assert.ok(lines.some((l) => /name-graphics: declares left-pad 1\.3\.0, which the root's package\.json does not declare/.test(l)), lines.join('\n'))
  absent(join(root, 'finisher/node_modules'))
  absent(join(root, 'name-graphics/node_modules'))
})

test('a root install that differs from its lockfile is refused: run npm ci at the root', () => {
  // After a checkout switch without npm ci: the root declares and locks 9.39.5 but still holds 9.0.0, and a tool still declares the old one.
  const stale = repo({ pins: { eslint: '9.39.5' }, held: { eslint: '9.0.0' }, tools: { finisher: { eslint: '9.0.0' } } })
  const old = run({ root: stale, folders: ['finisher'], cwd: stale })
  assert.equal(old.code, 1)
  assert.match(old.lines[0], /declares eslint 9\.0\.0, the root's package\.json has 9\.39\.5/)
  absent(join(stale, 'finisher/node_modules'))
  // The tool declares the new pin, the root's install is still the old one, or lacks it.
  const behind = repo({ pins: { eslint: '9.39.5', 'axe-core': '4.13.0' }, held: { eslint: '9.0.0' }, tools: { finisher: { eslint: '9.39.5', 'axe-core': '4.13.0' } } })
  const r = run({ root: behind, folders: ['finisher'], cwd: behind })
  assert.equal(r.code, 1)
  assert.ok(r.lines.some((l) => /holds eslint 9\.0\.0, its lockfile 9\.39\.5; run npm ci at the root/.test(l)), r.lines.join('\n'))
  assert.ok(r.lines.some((l) => /the root's install does not hold axe-core; run npm ci at the root/.test(l)), r.lines.join('\n'))
  absent(join(behind, 'finisher/node_modules'))
})

test('a real folder in the tool is a second install, refused and never touched', () => {
  const root = repo({ pins: { eslint: '9.39.5' }, tools: { finisher: { eslint: '9.39.5' } } })
  mkdirSync(join(root, 'finisher/node_modules/eslint'), { recursive: true })
  const { code, lines } = run({ root, folders: ['finisher'], cwd: root })
  assert.equal(code, 1)
  assert.match(lines[0], /a real folder, a second install/)
  assert.ok(lstatSync(join(root, 'finisher/node_modules/eslint')).isDirectory())
})

test('a link for a package no longer declared is removed; other links and folders stay', () => {
  const root = repo({ pins: { eslint: '9.39.5', 'axe-core': '4.13.0' }, tools: { finisher: { eslint: '9.39.5' } } })
  const modules = join(root, 'finisher/node_modules')
  mkdirSync(join(modules, '.vite'), { recursive: true })
  symlinkSync('../../node_modules/axe-core', join(modules, 'axe-core'))
  symlinkSync('/somewhere/else', join(modules, 'other'))
  assert.equal(run({ root, folders: ['finisher'], cwd: root }).code, 0)
  absent(join(modules, 'axe-core'))
  assert.ok(isLink(join(modules, 'other')))
  assert.ok(lstatSync(join(modules, '.vite')).isDirectory())
  assert.ok(isLink(join(modules, 'eslint')))
})

test('a folder named twice is planned once: a stale link is removed without failing', () => {
  const root = repo({ pins: { eslint: '9.39.5', 'axe-core': '4.13.0' }, tools: { finisher: { eslint: '9.39.5' } } })
  const modules = join(root, 'finisher/node_modules')
  mkdirSync(modules, { recursive: true })
  symlinkSync('../../node_modules/axe-core', join(modules, 'axe-core'))
  const { code, lines } = run({ root, folders: ['finisher', './finisher', join(root, 'finisher')], cwd: root })
  assert.equal(code, 0, lines.join('\n'))
  assert.equal(lines.filter((l) => /link\(s\) made/.test(l)).length, 1, lines.join('\n'))
  absent(join(modules, 'axe-core'))
  assert.ok(isLink(join(modules, 'eslint')))
})

test('a wrong link is replaced; a tool declaring nothing gets nothing', () => {
  const root = repo({ pins: { eslint: '9.39.5' }, tools: { finisher: { eslint: '9.39.5' } } })
  mkdirSync(join(root, 'finisher/node_modules'), { recursive: true })
  symlinkSync('../elsewhere/eslint', join(root, 'finisher/node_modules/eslint'))
  assert.equal(plan(root, join(root, 'finisher')).make.length, 1)
  assert.equal(run({ root, folders: ['finisher'], cwd: root }).code, 0)
  assert.equal(readlinkSync(join(root, 'finisher/node_modules/eslint')), '../../node_modules/eslint')
  const bare = repo({ pins: {}, tools: { 'name-graphics': {} } })
  assert.equal(run({ root: bare, folders: ['name-graphics'], cwd: bare }).code, 0)
  absent(join(bare, 'name-graphics/node_modules'))
})

test('run from a tool folder, `.` is that tool; the root itself or a nested folder is refused', () => {
  const root = repo({ pins: { eslint: '9.39.5' }, tools: { finisher: { eslint: '9.39.5' } } })
  assert.equal(run({ root, folders: ['.'], cwd: join(root, 'finisher') }).code, 0)
  assert.ok(isLink(join(root, 'finisher/node_modules/eslint')))
  assert.match(run({ root, folders: ['.'], cwd: root }).lines[0], /not a tool folder directly under the root/)
  mkdirSync(join(root, 'finisher/sub'))
  writeFileSync(join(root, 'finisher/sub/package.json'), '{}')
  assert.match(run({ root, folders: ['sub'], cwd: join(root, 'finisher') }).lines[0], /not a tool folder/)
})

test("a range the root declares is declared as written and linked to the version its lockfile names", () => {
  const root = repo({
    pins: { mediabunny: '^1.55.2', eslint: '9.39.5' },
    locked: { mediabunny: '1.55.3', eslint: '9.39.5' },
    tools: { finisher: { mediabunny: '^1.55.2' }, 'name-graphics': {} },
  })
  const ok = run({ root, folders: ['finisher'], cwd: root })
  assert.equal(ok.code, 0, ok.lines.join('\n'))
  assert.equal(readlinkSync(join(root, 'finisher/node_modules/mediabunny')), '../../node_modules/mediabunny')
  // The locked version written as an exact specifier is not the root's own specifier.
  writeFileSync(join(root, 'name-graphics/package.json'), JSON.stringify({ devDependencies: { mediabunny: '1.55.3' } }))
  const exact = run({ root, folders: ['name-graphics'], cwd: root })
  assert.equal(exact.code, 1)
  assert.match(exact.lines[0], /declares mediabunny 1\.55\.3, the root's package\.json has \^1\.55\.2/)
  absent(join(root, 'name-graphics/node_modules'))
})

test('a package the root declares but its lockfile does not name is refused', () => {
  const root = repo({ pins: { eslint: '9.39.5', 'axe-core': '4.13.0' }, locked: { eslint: '9.39.5' }, held: { eslint: '9.39.5', 'axe-core': '4.13.0' }, tools: { finisher: { eslint: '9.39.5', 'axe-core': '4.13.0' } } })
  const r = run({ root, folders: ['finisher'], cwd: root })
  assert.equal(r.code, 1)
  assert.match(r.lines[0], /package-lock\.json names no version of axe-core/)
  absent(join(root, 'finisher/node_modules'))
})

test("a lockfile out of step with the root's package.json is refused, though the install matches the lockfile", () => {
  // Both manifests ask for 9.39.4; the lockfile was not regenerated and still declares and resolves 9.39.5.
  const behind = repo({ pins: { eslint: '9.39.4' }, lockSpecs: { eslint: '9.39.5' }, locked: { eslint: '9.39.5' }, tools: { finisher: { eslint: '9.39.4' } } })
  for (const check of [false, true]) {
    const r = run({ root: behind, folders: ['finisher'], cwd: behind, check })
    assert.equal(r.code, 1)
    assert.match(r.lines[0], /package\.json has eslint 9\.39\.4, its lockfile 9\.39\.5; fix them at the root first/)
  }
  absent(join(behind, 'finisher/node_modules'))
  // The lockfile's own declaration agrees, yet it resolves another version than the exact pin.
  const off = repo({ pins: { eslint: '9.39.4' }, locked: { eslint: '9.39.5' }, tools: { finisher: { eslint: '9.39.4' } } })
  const r = run({ root: off, folders: ['finisher'], cwd: off })
  assert.equal(r.code, 1)
  assert.match(r.lines[0], /lockfile resolves eslint to 9\.39\.5, its package\.json pins 9\.39\.4/)
  absent(join(off, 'finisher/node_modules'))
})

test("a folder named in two cases is one folder on a case-insensitive disk, and a missing one on a case-sensitive disk", () => {
  const root = repo({ pins: { eslint: '9.39.5', 'axe-core': '4.13.0' }, tools: { finisher: { eslint: '9.39.5' } } })
  const modules = join(root, 'finisher/node_modules')
  mkdirSync(modules, { recursive: true })
  symlinkSync('../../node_modules/axe-core', join(modules, 'axe-core'))
  const r = run({ root, folders: ['finisher', 'Finisher'], cwd: root })
  if (existsSync(join(root, 'FINISHER'))) {
    // macOS's default disk: realpath(3) gives both spellings as `finisher`, planned once.
    assert.equal(r.code, 0, r.lines.join('\n'))
    assert.equal(r.lines.filter((l) => /link\(s\) made/.test(l)).length, 1, r.lines.join('\n'))
    absent(join(modules, 'axe-core'))
    assert.ok(isLink(join(modules, 'eslint')))
  } else {
    // CI's Ubuntu: `Finisher` is no folder, refused before anything is written.
    assert.equal(r.code, 1)
    assert.ok(r.lines.some((l) => /Finisher: no package\.json; not a tool folder/.test(l)), r.lines.join('\n'))
    assert.ok(isLink(join(modules, 'axe-core')))
    absent(join(modules, 'eslint'))
  }
})

test('a folder with no package.json is refused, not a crash', () => {
  const root = repo({ pins: {}, tools: {} })
  mkdirSync(join(root, 'lobby'))
  const r = run({ root, folders: ['lobby'], cwd: root })
  assert.equal(r.code, 1)
  assert.match(r.lines[0], /lobby: no package\.json; not a tool folder/)
})

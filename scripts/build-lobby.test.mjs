// The lobby's page is the render of its TSX source and nothing else (UVT-8):
// the page the deploy workflow's command builds equals a literal doctype and
// React's static render of lobby/Lobby.tsx, compiled here by the test's own
// loader, so a builder that dropped the doctype, read another source or
// compiled it differently fails; the repository tracks no page of its own; and
// the deploy workflow gathers the built page.
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ts from 'typescript'
import { renderLobby } from './build-lobby.mjs'

const ROOT = new URL('..', import.meta.url)
/** The source, named here, not taken from the builder. */
const SOURCE = fileURLToPath(new URL('../lobby/Lobby.tsx', import.meta.url))
const BUILDER = fileURLToPath(new URL('./build-lobby.mjs', import.meta.url))

const temp = (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'uvt-lobby-test-'))
  t.after(() => rmSync(dir, { recursive: true, force: true }))
  return dir
}

/** The test's own loader: the TSX compiled for React's automatic runtime and run as CommonJS. */
const expected = () => {
  const { outputText } = ts.transpileModule(readFileSync(SOURCE, 'utf8'), {
    fileName: SOURCE,
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  })
  const module = { exports: {} }
  new Function('require', 'module', 'exports', outputText)(createRequire(SOURCE), module, module.exports)
  return `<!doctype html>\n${renderToStaticMarkup(createElement(module.exports.Lobby))}\n`
}

test('the page the deploy command builds is a doctype and the static render of lobby/Lobby.tsx', (t) => {
  const site = join(temp(t), '_site')
  execFileSync(process.execPath, [BUILDER, site], { encoding: 'utf8' })
  const page = readFileSync(join(site, 'index.html'), 'utf8')
  assert.equal(page, expected())
  assert.ok(page.startsWith('<!doctype html>\n<html lang="en-GB"><head>'))
  assert.match(page, /<title>UoN Video Tools<\/title>/)
  assert.match(page, /<a href="finisher\/">UoN Video Finisher<\/a>/)
  assert.match(page, /<a href="name-graphics\/">Video Name Graphics<\/a>/)
})

test('the build command takes one folder, and refuses no folder or two', () => {
  for (const args of [[], ['a', 'b']]) {
    assert.throws(() => execFileSync(process.execPath, [BUILDER, ...args], { stdio: 'pipe' }), (e) => /** @type {{ status?: number }} */ (e).status === 2)
  }
})

test("the page's targets use the AAA floor as a token, valued as shared/'s --target-min", () => {
  const token = (css) => css.match(/--target-min:\s*([^;]+);/)?.[1]?.trim()
  const shared = token(readFileSync(new URL('../shared/styles/tokens.carbon.css', import.meta.url), 'utf8'))
  const page = renderLobby()
  assert.ok(shared, 'shared/styles/tokens.carbon.css names --target-min')
  assert.equal(token(page), shared)
  assert.match(page, /min-block-size:\s*var\(--target-min\);/)
  assert.match(page, /min-inline-size:\s*var\(--target-min\);/)
})

test('the page ships no script and so registers no service worker', () => {
  const page = renderLobby()
  assert.doesNotMatch(page, /<script\b/i)
  assert.doesNotMatch(page, /\son[a-z]+=/i)
  assert.doesNotMatch(page, /serviceWorker|javascript:/i)
})

test('the render follows the source: an edit to the component changes the page', (t) => {
  const copy = join(temp(t), 'Lobby.tsx')
  const source = readFileSync(SOURCE, 'utf8')
  assert.ok(source.includes('<h1>UoN Video Tools</h1>'))
  writeFileSync(copy, source.replace('<h1>UoN Video Tools</h1>', '<h1>Edited</h1>'))
  // the copy, outside the checkout, resolves react as the source does
  const page = renderLobby(copy, SOURCE)
  assert.match(page, /<h1>Edited<\/h1>/)
  assert.doesNotMatch(page, /<h1>UoN Video Tools<\/h1>/)
})

test('a source that is not valid TSX, or exports no Lobby, is refused', (t) => {
  const dir = temp(t)
  const broken = join(dir, 'Broken.tsx')
  writeFileSync(broken, 'export function Lobby() { return <main> }\n')
  assert.throws(() => renderLobby(broken, SOURCE), /Broken\.tsx: /)
  const empty = join(dir, 'Empty.tsx')
  writeFileSync(empty, 'export const lobby = 1\n')
  assert.throws(() => renderLobby(empty, SOURCE), /exports no Lobby component/)
})

/** Git with its repository-local variables cleared, so a hook's GIT_DIR cannot point it elsewhere. */
const git = (...args) => {
  const env = { ...process.env }
  for (const name of execFileSync('git', ['rev-parse', '--local-env-vars'], { encoding: 'utf8' }).split('\n')) {
    if (name) delete env[name]
  }
  return execFileSync('git', args, { cwd: ROOT, env, encoding: 'utf8' })
}

test('the repository tracks no page in lobby/: the page comes only from the build', () => {
  const tracked = git('ls-files', '--', 'lobby').split('\n').filter(Boolean)
  assert.ok(tracked.includes('lobby/Lobby.tsx'))
  assert.deepEqual(tracked.filter((f) => /\.html?$/i.test(f)), [])
})

test('the deploy workflow gathers the built page, not a copy', () => {
  const workflow = readFileSync(new URL('.github/workflows/deploy-pages.yml', ROOT), 'utf8')
  assert.match(workflow, /^\s+node scripts\/build-lobby\.mjs _site$/m)
  assert.doesNotMatch(workflow, /cp lobby\//)
})

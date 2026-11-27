// The lobby's page, rendered at build time (UVT-8). lobby/Lobby.tsx is the
// markup's one source: TypeScript compiles its JSX for React's automatic
// runtime, in memory, and react-dom/server renders the component to static
// HTML, so the page ships no script. Nothing is written in the checkout: the
// deploy workflow gathers the page with `node scripts/build-lobby.mjs _site`,
// and the accessibility gate serves a fresh build from the system's temporary
// folder (scripts/serve-lobby.mjs). The type check is tsc's, in check:root.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ts from 'typescript'

/** The lobby's one source. */
export const LOBBY_SOURCE = fileURLToPath(new URL('../lobby/Lobby.tsx', import.meta.url))

/** What the page starts with: React renders from `<html>` down. */
export const DOCTYPE = '<!doctype html>\n'

/**
 * A TSX module's exports: TypeScript compiles it to CommonJS in memory (types
 * stripped, JSX for the `react-jsx` runtime, as the root's app layer sets it),
 * its imports resolved from `resolveFrom`, its own path unless a test's copy
 * lies outside the checkout. A syntax error is refused.
 *
 * @param {string} file the TSX module
 * @param {string} [resolveFrom] the path its imports resolve from
 * @returns {Record<string, unknown>} its exports
 */
export function loadTsx(file, resolveFrom = file) {
  const { outputText, diagnostics = [] } = ts.transpileModule(readFileSync(file, 'utf8'), {
    fileName: file,
    reportDiagnostics: true,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
    },
  })
  if (diagnostics.length) {
    const text = diagnostics.map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'))
    throw new Error(`${file}: ${text.join('; ')}`)
  }
  /** @type {{ exports: Record<string, unknown> }} */
  const module = { exports: {} }
  const body = vm.compileFunction(outputText, ['require', 'module', 'exports'], { filename: file })
  body(createRequire(resolveFrom), module, module.exports)
  return module.exports
}

/** The lobby's page: the doctype and the static render of the source's `Lobby` component. */
export function renderLobby(file = LOBBY_SOURCE, resolveFrom = file) {
  const { Lobby } = loadTsx(file, resolveFrom)
  if (typeof Lobby !== 'function') throw new Error(`${file} exports no Lobby component`)
  const component = /** @type {import('react').FunctionComponent<Record<string, never>>} */ (Lobby)
  return `${DOCTYPE}${renderToStaticMarkup(createElement(component))}\n`
}

/**
 * Writes the page to `<outDir>/index.html`, making the folder; returns the file's path.
 *
 * @param {string} outDir the folder to write into
 * @param {string} [file] the TSX source
 * @returns {string} the page's path
 */
export function buildLobby(outDir, file = LOBBY_SOURCE) {
  const page = renderLobby(file)
  mkdirSync(outDir, { recursive: true })
  const out = join(outDir, 'index.html')
  writeFileSync(out, page)
  return out
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [outDir, ...extra] = process.argv.slice(2)
  if (!outDir || extra.length) {
    console.error('usage: node scripts/build-lobby.mjs <out-dir>')
    process.exit(2)
  }
  console.log(`build-lobby: wrote ${buildLobby(resolve(outDir))}`)
}

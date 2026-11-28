#!/usr/bin/env node
/**
 * The gate's build check (VNG-15): the page built as the deploy workflow
 * builds it, at the Pages base path, into a new folder under the system's
 * temporary folder — never `dist/`, which the gate must not write (the
 * deploy workflow checks it is absent after the gate) — then checked and
 * removed. After the Finisher's `scripts/check-build.mjs` (VH-76): the folder
 * goes on every exit path, a signal included.
 *
 * What it proves of the build: `index.html`, its comments aside, has the
 * React entry's empty `#root`, loads a module script and a stylesheet, and
 * every script, stylesheet, module preload and preload it loads, resolved
 * as the browser resolves it, lies under the base path and is a file in the
 * build; it names no unbuilt source; and, the brand pack owning the typeface
 * (the rules' Always), no font file is bundled and no page, stylesheet or
 * script in the build declares a font face or names IBM Plex, the face
 * Carbon's Sass would otherwise bring. Vite loads
 * its configuration natively, so nothing is written under `node_modules/`,
 * and the temporary folder is refused inside the repository.
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, statSync } from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

/** The preview's base path on Pages, as the deploy workflow derives it from the repository's name. */
export const DEFAULT_BASE = '/UoN-Video-Tools/name-graphics/'

/** This folder, where Vite finds `vite.config.ts` and `index.html`. */
const FOLDER = resolve(dirname(fileURLToPath(import.meta.url)), '..')

/**
 * A new, empty folder under the system's temporary folder, refused when that
 * lies inside the repository (TMPDIR can point anywhere), so a build or a
 * served copy never lands in the checkout.
 *
 * @param {string} prefix the folder name's start
 * @returns {string} the folder's path
 */
export function temporaryFolder(prefix) {
  const parent = realpathSync(tmpdir())
  const inside = relative(realpathSync(resolve(FOLDER, '..')), parent)
  if (inside === '' || !(inside === '..' || inside.startsWith(`..${sep}`) || isAbsolute(inside))) {
    throw new Error(`the temporary folder ${parent} is inside the repository: set TMPDIR outside it`)
  }
  return mkdtempSync(join(parent, prefix))
}

/**
 * Builds the page into `directory` with Vite, found as Node finds it from the
 * root's one install, at the base path `base` (the config reads BASE_PATH).
 * Throws if the build fails.
 *
 * @param {string} directory an empty folder outside the checkout
 * @param {string} base the base path, starting and ending with "/"
 */
export function buildInto(directory, base) {
  const vite = join(dirname(createRequire(import.meta.url).resolve('vite/package.json')), 'bin', 'vite.js')
  // The folder is outside the project's root, so Vite asks before emptying
  // it: it is ours and was made empty a moment ago. The native loader imports
  // the config as Node does, where the default bundles it into node_modules/.
  const args = ['build', '--configLoader', 'native', '--outDir', directory, '--emptyOutDir', '--logLevel', 'warn']
  execFileSync(process.execPath, [vite, ...args], {
    cwd: FOLDER,
    env: { ...process.env, BASE_PATH: base },
    stdio: 'inherit',
  })
}

/**
 * What is wrong with the build in `directory` for the base path `base`, one
 * line each; empty when nothing is.
 *
 * @param {string} directory the build's folder
 * @param {string} base the base path it was built for
 * @returns {string[]} the problems found
 */
export function problems(directory, base) {
  /** @type {string[]} */
  const found = []
  const indexPath = join(directory, 'index.html')
  if (!existsSync(indexPath)) return ['no index.html']
  // What the browser reads: a commented-out element is no element.
  const html = readFileSync(indexPath, 'utf8').replace(/<!--[\s\S]*?-->/g, '')
  // An attribute's value as HTML writes it: double-quoted, single-quoted or bare.
  /** @param {string} attrs @param {string} name @returns {string | undefined} */
  const attribute = (attrs, name) => {
    const m = new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>\`]+))`, 'i').exec(attrs)
    return m ? (m[1] ?? m[2] ?? m[3]) : undefined
  }
  const mounts = [...html.matchAll(/<div\b([^>]*)>\s*<\/div>/gi)].filter(([, attrs = '']) => attribute(attrs, 'id') === 'root')
  if (mounts.length === 0) found.push('index.html has no empty #root for the React entry')
  if (/\/src\//.test(html)) found.push('index.html names an unbuilt source under /src/')
  // Addresses resolve from the page, or from its <base href> where it has one, as the browser resolves them.
  const origin = 'http://pages.invalid'
  const baseHref = attribute(/<base\b([^>]*)>/i.exec(html)?.[1] ?? '', 'href')
  const page = new URL(baseHref ?? '', new URL(base, origin))
  let modules = 0
  let sheets = 0
  for (const [, tag = '', attrs = ''] of html.matchAll(/<(script|link)\b([^>]*)>/gi)) {
    /** @type {string | undefined} */
    let url
    if (tag.toLowerCase() === 'script') {
      url = attribute(attrs, 'src')
      if (url === undefined) continue
      if (attribute(attrs, 'type') === 'module') modules++
    } else {
      // rel is a list of tokens, in any case: an alternate stylesheet is checked, but is not the page's own.
      const rels = (attribute(attrs, 'rel') ?? '').toLowerCase().split(/\s+/)
      if (!['stylesheet', 'modulepreload', 'preload'].some((r) => rels.includes(r))) continue
      url = attribute(attrs, 'href')
      if (rels.includes('stylesheet') && !rels.includes('alternate')) sheets++
    }
    // The address as the browser resolves it: its path, a query or fragment aside, must lie under the base on the
    // page's own origin and name a file the build holds.
    const resolved = url === undefined ? undefined : new URL(url, page)
    if (resolved === undefined || resolved.origin !== origin || !resolved.pathname.startsWith(base)) {
      found.push(`index.html loads ${url ?? `a ${tag} with no address`}, outside ${base}`)
    } else {
      const file = join(directory, ...decodeURIComponent(resolved.pathname.slice(base.length)).split('/'))
      if (!statSync(file, { throwIfNoEntry: false })?.isFile()) found.push(`index.html loads ${url}, not in the build`)
    }
  }
  if (modules === 0) found.push('index.html loads no module script')
  if (sheets === 0) found.push('index.html loads no stylesheet')
  for (const name of readdirSync(directory, { recursive: true, encoding: 'utf8' })) {
    if (/\.(woff2?|ttf|otf|eot)$/i.test(name)) found.push(`a font file is bundled: ${name}`)
    // A face embedded as a data: URL leaves no font file behind, only its @font-face, in a stylesheet, a page's
    // <style> or a script's injected CSS.
    if (!/\.(css|html|m?js)$/i.test(name)) continue
    const text = readFileSync(join(directory, name), 'utf8')
    if (/@font-face/i.test(text)) found.push(`${name} declares a font face`)
    if (/IBM Plex/i.test(text)) found.push(`${name} names IBM Plex`)
  }
  return found
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const base = process.env['BASE_PATH'] || DEFAULT_BASE
  const directory = temporaryFolder('vng-check-build-')
  const clean = () => rmSync(directory, { recursive: true, force: true })
  // Signals first, so an interrupt during the build cannot leave the folder
  // behind; `process.exit` in the handler, or Node would carry on.
  for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
    process.once(signal, () => {
      clean()
      process.exit(1)
    })
  }
  try {
    buildInto(directory, base)
    const found = problems(directory, base)
    for (const problem of found) console.error(`check:build: ${problem}`)
    console.log(found.length === 0 ? `check:build: the page builds at ${base}, checked in a temporary folder` : `check:build: ${found.length} problem(s)`)
    if (found.length > 0) process.exitCode = 1
  } finally {
    clean()
  }
}

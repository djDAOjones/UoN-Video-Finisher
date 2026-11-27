// Serves a fresh build of the lobby as GitHub Pages serves the preview (UVT-8),
// for the accessibility gate (tests/a11y/project.mjs): the page that
// scripts/build-lobby.mjs builds into a new folder under the system's
// temporary folder, never the checkout, served at the Pages base path —
// BASE_PATH, else /UoN-Video-Tools/, the repository's name as the deploy
// workflow derives it — on 127.0.0.1. As Pages does, a folder serves its
// index.html and a folder named without its slash redirects to it. The
// server's root, where Pages serves another site, redirects to the base path:
// the accessibility pack takes the server's URL as the origin its tools start
// from (tests/a11y/project.mjs). Anything else outside the build is a 404. It serves the lobby's page alone: the links lead
// to the tools' folders, each tool's own page, built and tested in its own
// ledger (VH-249, VNG-15), so a journey here checks that a link opens its
// target, not the tool there. The folder is removed when the server stops.
import { mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import { extname, isAbsolute, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildLobby } from './build-lobby.mjs'

/** The preview's base path on Pages: `/<repository>/`. */
export const DEFAULT_BASE = '/UoN-Video-Tools/'

/** The port the accessibility gate's server listens on (the tools' previews use 4173). */
export const DEFAULT_PORT = 4180

/** @type {Record<string, string>} */
const TYPES = { '.html': 'text/html; charset=utf-8' }

/** @param {string} p */
const isFile = (p) => statSync(p, { throwIfNoEntry: false })?.isFile() === true
/** @param {string} p */
const isDir = (p) => statSync(p, { throwIfNoEntry: false })?.isDirectory() === true

/**
 * What a request path gets from the build in `dir` served at `base`:
 * `{ file }`, `{ redirect }` (keeping the query, as Pages does) or null for a
 * 404. The server's root redirects to the base path. The URL parser has already resolved dot segments, encoded ones
 * included; a decoded segment that is a dot segment or holds a separator or
 * NUL is refused, the file must lie inside the folder, and a file asked for
 * as a folder, with a trailing slash, is a 404.
 *
 * @param {string} dir the build's folder
 * @param {string} base the base path, starting and ending with "/"
 * @param {string} pathname the request's path, as the URL parser left it
 * @param {string} [search] the request's query, kept on a redirect
 * @returns {{ file?: string, redirect?: string } | null} the file to serve, the address to redirect to, or null for a 404
 */
export function locate(dir, base, pathname, search = '') {
  if (`${pathname}/` === base || (pathname === '/' && base !== '/')) return { redirect: `${base}${search}` }
  if (!pathname.startsWith(base)) return null
  /** @type {string[]} */
  let segments
  try {
    segments = pathname.slice(base.length).split('/').map(decodeURIComponent)
  } catch {
    return null
  }
  if (segments.some((s) => s === '.' || s === '..' || /[/\\\0]/.test(s))) return null
  const target = join(dir, ...segments)
  const rel = relative(dir, target)
  if (rel.startsWith('..') || isAbsolute(rel)) return null
  if (isDir(target)) {
    if (!pathname.endsWith('/')) return { redirect: `${pathname}/${search}` }
    const index = join(target, 'index.html')
    return isFile(index) ? { file: index } : null
  }
  return isFile(target) && !pathname.endsWith('/') ? { file: target } : null
}

/**
 * Builds the lobby into a fresh temporary folder and serves it; resolves to
 * the page's URL, the folder and `close()`, which stops the server and
 * removes the folder.
 *
 * @param {{ base?: string, port?: number, host?: string }} [options] the base path, the port (0 for any free one) and the host
 * @returns {Promise<{ url: string, dir: string, close: () => Promise<void> }>}
 */
export async function serveLobby({ base = DEFAULT_BASE, port = DEFAULT_PORT, host = '127.0.0.1' } = {}) {
  if (!/^\/(?:[^/]+\/)*$/.test(base)) throw new Error(`the base path must start and end with "/": ${base}`)
  const dir = mkdtempSync(join(tmpdir(), 'uvt-lobby-'))
  const server = createServer((req, res) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { allow: 'GET, HEAD' }).end()
      return
    }
    const url = new URL(req.url ?? '/', 'http://localhost')
    const found = locate(dir, base, url.pathname, url.search)
    if (found?.redirect) {
      res.writeHead(301, { location: found.redirect }).end()
    } else if (found?.file) {
      const body = readFileSync(found.file)
      const type = TYPES[extname(found.file)] ?? 'application/octet-stream'
      res.writeHead(200, { 'content-type': type, 'content-length': body.length })
      res.end(req.method === 'HEAD' ? undefined : body)
    } else {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Not found\n')
    }
  })
  /** @returns {Promise<void>} */
  const close = () =>
    new Promise((done) => {
      server.close(() => done())
      rmSync(dir, { recursive: true, force: true })
    })
  try {
    buildLobby(dir)
    await /** @type {Promise<void>} */ (
      new Promise((listening, failed) => {
        server.once('error', failed)
        server.listen(port, host, () => listening(undefined))
      })
    )
  } catch (/** @type {unknown} */ error) {
    rmSync(dir, { recursive: true, force: true })
    throw error
  }
  const address = /** @type {import('node:net').AddressInfo} */ (server.address())
  return { url: `http://${host}:${address.port}${base}`, dir, close }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2)
  const port = args[0] === '--port' && args.length === 2 ? Number(args[1]) : args.length ? NaN : DEFAULT_PORT
  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    console.error('usage: node scripts/serve-lobby.mjs [--port <n>]  (BASE_PATH sets the base path)')
    process.exit(2)
  }
  const served = await serveLobby({ base: process.env.BASE_PATH || DEFAULT_BASE, port })
  console.log(`serve-lobby: ${served.url} (the build in ${served.dir})`)
  /** @returns {void} */
  const stop = () => void served.close().then(() => process.exit(0))
  process.once('SIGINT', stop)
  process.once('SIGTERM', stop)
}

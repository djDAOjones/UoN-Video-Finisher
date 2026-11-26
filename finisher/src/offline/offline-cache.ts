/**
 * Offline after first load (spec §11, VH-161): what the service worker keeps,
 * under what name, and which requests it answers.
 *
 * Pure, and imported by exactly two places: `vite.config.ts`, which writes the
 * list at build time, and `service-worker.ts`, which reads it in the browser.
 * The page imports none of it — a module the page and the service worker both
 * imported would become a shared chunk, and the service worker would need it
 * by a hashed name (see `emitOfflineCache` in `vite.config.ts`). The page is
 * told the worker's file name through `__OFFLINE_WORKER_FILE__` instead.
 *
 * The cache holds the app's own built files and the branding masters, and
 * nothing else (rules, "No media egress"): the list is fixed at build time,
 * nothing is added at run time, and no entry is keyed on a user's file.
 */

/** The service worker's script, beside `index.html` in both builds. */
export const OFFLINE_WORKER_FILE = 'sw.js'

/** The build's list of files to keep, beside `index.html` in both builds. */
export const OFFLINE_FILES_FILE = 'offline-files.json'

/** The page a navigation falls back to when the network is gone. */
export const OFFLINE_PAGE_FILE = 'index.html'

/**
 * Every cache this app owns starts with this, then the registration's scope.
 *
 * Cache Storage is per origin, not per scope, and both homes share an origin
 * with other people's pages: GitHub Pages with the owner's other projects,
 * Xerte with every other upload — possibly an older copy of this app in
 * another folder. The scope in the name is what keeps one copy's clean-up
 * from deleting another's cache. The old name, as every identifier a browser
 * files things under keeps it (VH-225).
 */
const CACHE_PREFIX = 'uon-video-helper'
const CACHE_SEPARATOR = '|'

/** What `offline-files.json` holds. */
export interface OfflineManifest {
  /** The build identity, as `__BUILD_ID__`; a mismatch means a half-made upload. */
  readonly buildId: string
  /** Paths relative to the scope, sorted, `index.html` among them. */
  readonly files: readonly string[]
}

/**
 * The files a build keeps for offline use.
 *
 * Every file the bundle emitted, less its source maps (a stack trace offline
 * is not worth their weight) and the two offline files themselves (the
 * service worker is fetched by the browser, never from its own cache), plus
 * the branding masters, which the site build copies from `public/` outside
 * the bundle and the Xerte build emits into it.
 *
 * @param bundleFileNames - The bundle's output names, relative to the build's root.
 * @param brandingFileNames - The masters' names, as in `public/branding/`.
 * @param brandingDirectory - `branding/`, or empty in the flat Xerte package.
 * @returns Sorted, without duplicates.
 */
export function offlineFiles(
  bundleFileNames: readonly string[],
  brandingFileNames: readonly string[],
  brandingDirectory: string,
): string[] {
  const kept = new Set<string>()
  for (const name of bundleFileNames) {
    if (name.endsWith('.map')) continue
    if (name === OFFLINE_WORKER_FILE || name === OFFLINE_FILES_FILE) continue
    kept.add(name)
  }
  for (const name of brandingFileNames) {
    if (isBrandingMaster(name)) kept.add(`${brandingDirectory}${name}`)
  }
  return [...kept].sort()
}

/** The masters are the `.mp4` and `.webm` files; the notes beside them never ship. */
export function isBrandingMaster(name: string): boolean {
  return name.endsWith('.mp4') || name.endsWith('.webm')
}

/**
 * Reads `offline-files.json`, refusing anything that is not this build's list.
 *
 * The build id must be the service worker's own. On Xerte the owner uploads
 * the new files over the old, so for a while a browser can fetch a new
 * `sw.js` beside an old list, or the reverse; installing from a list that
 * names another build's chunks would keep the wrong files. Refused, the
 * install fails and the browser tries again at the next visit.
 *
 * @throws When the list is malformed, is another build's, or names a path
 *   outside the scope.
 */
export function parseOfflineManifest(raw: unknown, expectedBuildId: string): OfflineManifest {
  if (typeof raw !== 'object' || raw === null) throw new Error('offline files: not an object')
  const { buildId, files } = raw as { buildId?: unknown; files?: unknown }
  if (buildId !== expectedBuildId) {
    throw new Error(`offline files: build ${String(buildId)}, expected ${expectedBuildId}`)
  }
  if (!Array.isArray(files) || !files.every((file): file is string => typeof file === 'string')) {
    throw new Error('offline files: no list of names')
  }
  for (const file of files) {
    if (!isInsideScope(file)) throw new Error(`offline files: ${file} is outside the scope`)
  }
  if (!files.includes(OFFLINE_PAGE_FILE)) throw new Error(`offline files: no ${OFFLINE_PAGE_FILE}`)
  return { buildId, files }
}

/** A relative path that stays under the scope: no scheme, no root, no `..`. */
function isInsideScope(file: string): boolean {
  if (file === '' || file.startsWith('/') || file.includes(':') || file.includes('\\')) return false
  return !file.split('/').some((part) => part === '..' || part === '.' || part === '')
}

/** This build's cache under this scope. */
export function cacheNameFor(scope: string, buildId: string): string {
  return [CACHE_PREFIX, scope, buildId].join(CACHE_SEPARATOR)
}

/**
 * Whether a cache is this app's, under this scope, and not the one to keep.
 *
 * Only this scope's: another folder's copy of the app, or another project on
 * the same origin, is never touched.
 */
export function isStaleCache(name: string, scope: string, keep: string): boolean {
  return (
    name !== keep && name.startsWith(`${CACHE_PREFIX}${CACHE_SEPARATOR}${scope}${CACHE_SEPARATOR}`)
  )
}

/** The fields of a request that decide its route; a `Request` has them all. */
export interface RouteRequest {
  readonly url: string
  readonly method: string
  readonly mode: string
}

/**
 * How the service worker answers a request.
 *
 * - `page` — a navigation to the app's page: the network first, so a new
 *   upload is seen as soon as it is there, and the kept page only when the
 *   network is gone.
 * - `kept` — any other GET under the scope: the kept copy if this build has
 *   one, else the network. Nothing fetched this way is stored.
 * - `pass` — not answered at all: other methods, other origins and paths, and
 *   navigations to anything but the page.
 */
export type OfflineRoute = 'page' | 'kept' | 'pass'

export function routeFor(request: RouteRequest, scope: string): OfflineRoute {
  if (request.method !== 'GET') return 'pass'
  if (!request.url.startsWith(scope)) return 'pass'
  if (request.mode !== 'navigate') return 'kept'
  const path = request.url.split(/[?#]/, 1)[0]!
  return path === scope || path === `${scope}${OFFLINE_PAGE_FILE}` ? 'page' : 'pass'
}

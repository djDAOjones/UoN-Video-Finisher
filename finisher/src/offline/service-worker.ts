/**
 * The service worker: the app works after first load with no network (spec
 * §11, VH-161).
 *
 * Built as its own chunk, `sw.js`, beside `index.html` in both builds (see
 * `emitOfflineCache` in `vite.config.ts`), so its default scope is the app's
 * folder and it needs no `Service-Worker-Allowed` header: nothing beyond the
 * HTTPS and JavaScript type both homes already send (spec §11, deployment).
 * A classic script with no imports — the plugin refuses a build where it has
 * one — so it never names a hashed chunk.
 *
 * Its life, and why each step is as it is:
 *
 * - **Install** keeps this build's files, as `offline-files.json` lists them,
 *   in a cache named for the scope and the build. Each is fetched past the
 *   HTTP cache: Xerte sends no `Cache-Control`, and a heuristically fresh old
 *   copy of a branding master would otherwise be kept under the new build.
 * - **No `skipWaiting`, no `clients.claim`.** A new build's worker waits until
 *   every page of the old one has closed. A page already open — a job running
 *   in it — keeps the worker and the cache that hold the chunks it names,
 *   offline too.
 * - **Activate** deletes this scope's other builds' caches. By then no page of
 *   theirs is open, and nobody is held on a stale version.
 * - **Fetch**: the page from the network first, so a new upload is seen as
 *   soon as it is there; the kept page only when the network is gone. Every
 *   other file under the scope from the kept copy if there is one. Nothing is
 *   ever stored at run time, so the cache holds nothing a user chose.
 */

import {
  cacheNameFor,
  isStaleCache,
  OFFLINE_FILES_FILE,
  OFFLINE_PAGE_FILE,
  parseOfflineManifest,
  routeFor,
} from './offline-cache'

const worker = self as unknown as ServiceWorkerGlobalScope

/** The registration's scope: the folder `sw.js` and `index.html` sit in. */
function scope(): string {
  return worker.registration.scope
}

function ownCacheName(): string {
  return cacheNameFor(scope(), __BUILD_ID__)
}

async function keepThisBuild(): Promise<void> {
  const listed = await fetch(new URL(OFFLINE_FILES_FILE, scope()).href, { cache: 'no-store' })
  if (!listed.ok) throw new Error(`offline files: ${listed.status}`)
  const manifest = parseOfflineManifest(await listed.json(), __BUILD_ID__)
  const cache = await caches.open(ownCacheName())
  // All or nothing: one file that fails leaves this build uninstalled, and the
  // browser tries again at the next visit.
  await cache.addAll(
    manifest.files.map((file) => new Request(new URL(file, scope()).href, { cache: 'reload' })),
  )
}

async function removeOtherBuilds(): Promise<void> {
  const keep = ownCacheName()
  const names = await caches.keys()
  await Promise.all(
    names.filter((name) => isStaleCache(name, scope(), keep)).map((name) => caches.delete(name)),
  )
}

async function answerPage(request: Request): Promise<Response> {
  try {
    return await fetch(request)
  } catch (offline) {
    const cache = await caches.open(ownCacheName())
    const kept = await cache.match(new URL(OFFLINE_PAGE_FILE, scope()).href)
    if (kept) return kept
    throw offline
  }
}

async function answerKept(request: Request): Promise<Response> {
  const cache = await caches.open(ownCacheName())
  return (await cache.match(request.url)) ?? fetch(request)
}

worker.addEventListener('install', (event) => {
  event.waitUntil(keepThisBuild())
})

worker.addEventListener('activate', (event) => {
  event.waitUntil(removeOtherBuilds())
})

worker.addEventListener('fetch', (event) => {
  const route = routeFor(event.request, scope())
  if (route === 'page') event.respondWith(answerPage(event.request))
  else if (route === 'kept') event.respondWith(answerKept(event.request))
})

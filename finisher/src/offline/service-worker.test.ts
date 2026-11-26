/**
 * VH-161: the service worker's install, activate and fetch, through its own
 * module.
 *
 * Importing the module runs it: it adds its three listeners to `self`. So each
 * test stands in the worker's global scope — `self` with a registration,
 * `caches` as an in-memory Cache Storage, `fetch` as a stand-in network — and
 * imports the module afresh. The listeners, the routes, the list's checks and
 * the cache names are the real ones; what a browser does between them (when
 * it installs, activates, or sends a fetch) is driven by hand.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { cacheNameFor, OFFLINE_FILES_FILE } from './offline-cache'

const SCOPE = 'https://example.ac.uk/play/upload-1/'
const OWN = cacheNameFor(SCOPE, __BUILD_ID__)
const FILES = ['index.html', 'app-abc.js', 'job.worker-def.js', 'closing-tail-blue-1080p.mp4']

type Listener = (event: unknown) => void

/** An in-memory Cache Storage, keyed by URL, with the all-or-nothing `addAll`. */
function memoryCaches(network: typeof fetch) {
  const stores = new Map<string, Map<string, Response>>()
  const open = (name: string) => {
    let store = stores.get(name)
    if (!store) stores.set(name, (store = new Map<string, Response>()))
    const kept = store
    return {
      async addAll(requests: readonly Request[]) {
        const fetched: [string, Response][] = []
        for (const request of requests) {
          const response = await network(request)
          if (!response.ok) throw new TypeError(`addAll: ${response.status}`)
          fetched.push([request.url, response])
        }
        for (const [url, response] of fetched) kept.set(url, response)
      },
      match: (url: string) => Promise.resolve(kept.get(url)?.clone()),
    }
  }
  return {
    stores,
    storage: {
      open: (name: string) => Promise.resolve(open(name)),
      keys: () => Promise.resolve([...stores.keys()]),
      delete: (name: string) => Promise.resolve(stores.delete(name)),
    },
  }
}

let listeners: Map<string, Listener>
let network: ReturnType<typeof vi.fn<typeof fetch>>
let memory: ReturnType<typeof memoryCaches>
let online: boolean
let served: Map<string, string>

/** What the host serves: this build's list and files, unless a test says otherwise. */
function host(): Map<string, string> {
  const files = new Map(FILES.map((file) => [`${SCOPE}${file}`, `body of ${file}`]))
  files.set(
    `${SCOPE}${OFFLINE_FILES_FILE}`,
    JSON.stringify({ buildId: __BUILD_ID__, files: FILES }),
  )
  return files
}

beforeEach(async () => {
  listeners = new Map()
  online = true
  served = host()
  network = vi.fn<typeof fetch>((input) => {
    if (!online) return Promise.reject(new TypeError('Failed to fetch'))
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
    const body = served.get(url)
    return Promise.resolve(
      body === undefined ? new Response('', { status: 404 }) : new Response(body),
    )
  })
  memory = memoryCaches(network)
  vi.stubGlobal('self', {
    registration: { scope: SCOPE },
    addEventListener: (type: string, listener: Listener) => listeners.set(type, listener),
  })
  vi.stubGlobal('caches', memory.storage)
  vi.stubGlobal('fetch', network)
  vi.resetModules()
  await import('./service-worker')
})

afterEach(() => {
  vi.unstubAllGlobals()
})

/** Sends an install or activate event; resolves or rejects as its `waitUntil` does. */
async function lifecycle(type: 'install' | 'activate'): Promise<void> {
  let work: Promise<unknown> = Promise.resolve()
  listeners.get(type)!({ waitUntil: (promise: Promise<unknown>) => (work = promise) })
  await work
}

/** Sends a fetch event; `undefined` when the worker leaves it to the browser. */
function request(url: string, mode = 'cors', method = 'GET'): Promise<Response> | undefined {
  let answer: Promise<Response> | undefined
  listeners.get('fetch')!({
    request: { url, mode, method },
    respondWith: (response: Promise<Response>) => (answer = response),
  })
  return answer
}

function kept(): string[] {
  return [...(memory.stores.get(OWN)?.keys() ?? [])].sort()
}

describe('install', () => {
  it('keeps exactly the listed files, past the HTTP cache, under this scope and build', async () => {
    await lifecycle('install')
    expect(kept()).toEqual(FILES.map((file) => `${SCOPE}${file}`).sort())
    const list = network.mock.calls.find(([input]) => input === `${SCOPE}${OFFLINE_FILES_FILE}`)
    expect(list?.[1]).toEqual({ cache: 'no-store' })
    const fileRequests = network.mock.calls
      .map(([input]) => input)
      .filter((input) => input instanceof Request)
    expect(fileRequests).toHaveLength(FILES.length)
    expect(fileRequests.every((input) => input.cache === 'reload')).toBe(true)
  })

  it('installs nothing from another build’s list, as a half-made upload would serve', async () => {
    served.set(
      `${SCOPE}${OFFLINE_FILES_FILE}`,
      JSON.stringify({ buildId: 'v0.0.0+19700101.0', files: FILES }),
    )
    await expect(lifecycle('install')).rejects.toThrow(/expected/)
    expect(kept()).toEqual([])
  })

  it('installs nothing when one listed file is missing', async () => {
    served.delete(`${SCOPE}closing-tail-blue-1080p.mp4`)
    await expect(lifecycle('install')).rejects.toThrow()
    expect(kept()).toEqual([])
  })

  it('installs nothing without a list', async () => {
    served.delete(`${SCOPE}${OFFLINE_FILES_FILE}`)
    await expect(lifecycle('install')).rejects.toThrow(/404/)
    expect(kept()).toEqual([])
  })
})

describe('activate', () => {
  it('deletes this scope’s other builds, and nothing of another folder or app', async () => {
    const older = cacheNameFor(SCOPE, 'v0.3.0+20261124.aaaaaaa')
    const otherFolder = cacheNameFor(
      'https://example.ac.uk/play/upload-2/',
      'v0.3.0+20261124.aaaaaaa',
    )
    for (const name of [older, otherFolder, 'route-plotter-v3']) await memory.storage.open(name)
    await lifecycle('install')
    await lifecycle('activate')
    expect([...memory.stores.keys()].sort()).toEqual([OWN, otherFolder, 'route-plotter-v3'].sort())
  })
})

describe('fetch', () => {
  beforeEach(async () => {
    await lifecycle('install')
    await lifecycle('activate')
    network.mockClear()
  })

  it('takes the page from the network while there is one, so a new upload is seen', async () => {
    served.set(`${SCOPE}index.html`, 'the new page')
    const page = await request(`${SCOPE}index.html`, 'navigate')
    expect(await page?.text()).toBe('the new page')
  })

  it('answers the page from what is kept when the network is gone, by either address', async () => {
    online = false
    expect(await (await request(SCOPE, 'navigate'))?.text()).toBe('body of index.html')
    expect(await (await request(`${SCOPE}index.html?x=1`, 'navigate'))?.text()).toBe(
      'body of index.html',
    )
  })

  it('answers the app’s files and the branding from what is kept, with no network', async () => {
    online = false
    expect(await (await request(`${SCOPE}job.worker-def.js`))?.text()).toBe(
      'body of job.worker-def.js',
    )
    expect(
      await (await request(`${SCOPE}closing-tail-blue-1080p.mp4`, 'same-origin'))?.text(),
    ).toBe('body of closing-tail-blue-1080p.mp4')
    expect(network).not.toHaveBeenCalled()
  })

  it('fetches what is not kept and stores none of it', async () => {
    served.set(`${SCOPE}other.txt`, 'not listed')
    expect(await (await request(`${SCOPE}other.txt`))?.text()).toBe('not listed')
    expect(kept()).not.toContain(`${SCOPE}other.txt`)
    expect(kept()).toHaveLength(FILES.length)
  })

  it('leaves to the browser what is not the app’s: other methods, origins and pages', () => {
    expect(request(`${SCOPE}app-abc.js`, 'cors', 'POST')).toBeUndefined()
    expect(request('https://elsewhere.example/app-abc.js')).toBeUndefined()
    expect(request(`${SCOPE}README-HOSTING.txt`, 'navigate')).toBeUndefined()
  })

  it('fails a page it never kept, offline, as the browser would', async () => {
    memory.stores.clear()
    online = false
    await expect(request(SCOPE, 'navigate')).rejects.toThrow(/Failed to fetch/)
  })
})

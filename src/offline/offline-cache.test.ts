/**
 * VH-161: what the service worker keeps, under what name, and which requests
 * it answers. The list is the cache's whole content, so these are the rules
 * that keep media and anything a user chose out of it.
 */

import { describe, expect, it } from 'vitest'

import {
  cacheNameFor,
  isStaleCache,
  OFFLINE_FILES_FILE,
  OFFLINE_WORKER_FILE,
  offlineFiles,
  parseOfflineManifest,
  routeFor,
} from './offline-cache'

const SCOPE = 'https://example.ac.uk/play/upload-1/'
const BUILD = 'v0.3.1+20261125.d5db255'

describe('offlineFiles', () => {
  const bundle = [
    'index.html',
    'assets/app-abc.js',
    'assets/app-abc.js.map',
    'assets/job.worker-def.js',
    'assets/app-ghi.css',
    OFFLINE_WORKER_FILE,
    `${OFFLINE_WORKER_FILE}.map`,
    OFFLINE_FILES_FILE,
  ]

  it('keeps the built files and every branding master, under its folder', () => {
    expect(
      offlineFiles(
        bundle,
        ['closing-tail-blue-1080p.mp4', 'closing-onset-fade-blue-1080p.webm'],
        'branding/',
      ),
    ).toEqual([
      'assets/app-abc.js',
      'assets/app-ghi.css',
      'assets/job.worker-def.js',
      'branding/closing-onset-fade-blue-1080p.webm',
      'branding/closing-tail-blue-1080p.mp4',
      'index.html',
    ])
  })

  it('keeps no source map, and not the worker or the list themselves', () => {
    const files = offlineFiles(bundle, [], 'branding/')
    expect(files.some((file) => file.endsWith('.map'))).toBe(false)
    expect(files).not.toContain(OFFLINE_WORKER_FILE)
    expect(files).not.toContain(OFFLINE_FILES_FILE)
  })

  it('keeps only the masters from the branding folder, never its notes', () => {
    expect(
      offlineFiles([], ['README.md', 'closing-internal-words.json', 'a.mp4'], 'branding/'),
    ).toEqual(['branding/a.mp4'])
  })

  it('names a master once in the flat package, where the bundle already holds it', () => {
    expect(offlineFiles(['index.html', 'a.mp4'], ['a.mp4'], '')).toEqual(['a.mp4', 'index.html'])
  })

  it('is empty for an empty build', () => {
    expect(offlineFiles([], [], '')).toEqual([])
  })
})

describe('parseOfflineManifest', () => {
  const good = { buildId: BUILD, files: ['index.html', 'app-abc.js', 'branding/a.mp4'] }

  it('reads this build’s list', () => {
    expect(parseOfflineManifest(good, BUILD)).toEqual(good)
  })

  it('refuses another build’s list: a half-made upload installs nothing', () => {
    expect(() => parseOfflineManifest(good, 'v0.3.2+20261126.0000000')).toThrow(/expected/)
  })

  it('refuses a list without the page', () => {
    expect(() => parseOfflineManifest({ buildId: BUILD, files: ['app-abc.js'] }, BUILD)).toThrow(
      /no index\.html/,
    )
  })

  it('refuses what is not a list of names', () => {
    expect(() => parseOfflineManifest(null, BUILD)).toThrow()
    expect(() => parseOfflineManifest('x', BUILD)).toThrow()
    expect(() => parseOfflineManifest({ buildId: BUILD }, BUILD)).toThrow(/no list/)
    expect(() => parseOfflineManifest({ buildId: BUILD, files: [1] }, BUILD)).toThrow(/no list/)
  })

  it.each([
    '/index.html',
    '../other/app.js',
    'assets/../../x.js',
    'https://elsewhere.example/x.js',
    '//elsewhere.example/x.js',
    '',
    './index.html',
  ])('refuses a name outside the scope: %j', (file) => {
    expect(() =>
      parseOfflineManifest({ buildId: BUILD, files: ['index.html', file] }, BUILD),
    ).toThrow(/outside the scope/)
  })
})

describe('cache names', () => {
  const keep = cacheNameFor(SCOPE, BUILD)

  it('names the scope and the build', () => {
    expect(keep).toContain(SCOPE)
    expect(keep).toContain(BUILD)
    expect(cacheNameFor(SCOPE, 'other')).not.toBe(keep)
  })

  it('finds this scope’s other builds stale, and never the one kept', () => {
    expect(isStaleCache(cacheNameFor(SCOPE, 'v0.3.0+20261124.aaaaaaa'), SCOPE, keep)).toBe(true)
    expect(isStaleCache(keep, SCOPE, keep)).toBe(false)
  })

  it('leaves another folder’s copy of the app, and other apps on the origin, alone', () => {
    const otherFolder = 'https://example.ac.uk/play/upload-2/'
    expect(isStaleCache(cacheNameFor(otherFolder, 'old'), SCOPE, keep)).toBe(false)
    // A folder whose path starts with this one's is still another folder.
    expect(isStaleCache(cacheNameFor(`${SCOPE}nested/`, 'old'), SCOPE, keep)).toBe(false)
    expect(isStaleCache('route-plotter-v3', SCOPE, keep)).toBe(false)
  })
})

describe('routeFor', () => {
  const get = (url: string, mode = 'cors') => ({ url, method: 'GET', mode })

  it('answers a navigation to the page, by the folder or by index.html', () => {
    expect(routeFor(get(SCOPE, 'navigate'), SCOPE)).toBe('page')
    expect(routeFor(get(`${SCOPE}index.html`, 'navigate'), SCOPE)).toBe('page')
    expect(routeFor(get(`${SCOPE}index.html?x=1#top`, 'navigate'), SCOPE)).toBe('page')
  })

  it('passes a navigation to anything else under the scope', () => {
    expect(routeFor(get(`${SCOPE}README-HOSTING.txt`, 'navigate'), SCOPE)).toBe('pass')
  })

  it('answers a file under the scope from what is kept', () => {
    expect(routeFor(get(`${SCOPE}app-abc.js`), SCOPE)).toBe('kept')
    expect(routeFor(get(`${SCOPE}closing-tail-blue-1080p.mp4`, 'same-origin'), SCOPE)).toBe('kept')
  })

  it('passes every other method, origin and path', () => {
    expect(routeFor({ url: `${SCOPE}app-abc.js`, method: 'POST', mode: 'cors' }, SCOPE)).toBe(
      'pass',
    )
    expect(routeFor({ url: SCOPE, method: 'HEAD', mode: 'navigate' }, SCOPE)).toBe('pass')
    expect(routeFor(get('https://elsewhere.example/x.js'), SCOPE)).toBe('pass')
    expect(routeFor(get('https://example.ac.uk/play/upload-2/app.js'), SCOPE)).toBe('pass')
    expect(routeFor(get('https://example.ac.uk/play/upload-1'), SCOPE)).toBe('pass')
  })
})

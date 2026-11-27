// The accessibility gate's server (UVT-8): a fresh build, outside the
// checkout, served at the Pages base path as Pages serves it, and gone when
// the server stops.
import assert from 'node:assert/strict'
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { request } from 'node:http'
import { tmpdir } from 'node:os'
import { basename, dirname, join, relative } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { renderLobby } from './build-lobby.mjs'
import { DEFAULT_BASE, locate, serveLobby } from './serve-lobby.mjs'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

/** A raw request, so the path reaches the server as written. */
const get = (url, path, method = 'GET') =>
  new Promise((done, failed) => {
    const { hostname, port } = new URL(url)
    const req = request({ hostname, port, path, method }, (res) => {
      let body = ''
      res.setEncoding('utf8')
      res.on('data', (chunk) => (body += chunk))
      res.on('end', () => done({ status: res.statusCode, headers: res.headers, body }))
    })
    req.on('error', failed)
    req.end()
  })

test('the page at the Pages base path is the lobby render, from a fresh build outside the checkout', async (t) => {
  const served = await serveLobby({ port: 0 })
  t.after(() => served.close())
  assert.equal(DEFAULT_BASE, '/UoN-Video-Tools/')
  assert.match(served.url, /^http:\/\/127\.0\.0\.1:\d+\/UoN-Video-Tools\/$/)
  assert.ok(relative(ROOT, served.dir).startsWith('..'), 'the build lies outside the checkout')
  const page = await get(served.url, '/UoN-Video-Tools/')
  assert.equal(page.status, 200)
  assert.equal(page.headers['content-type'], 'text/html; charset=utf-8')
  assert.equal(page.body, renderLobby())
  assert.equal((await get(served.url, '/UoN-Video-Tools/index.html')).body, renderLobby())
  const head = await get(served.url, '/UoN-Video-Tools/', 'HEAD')
  assert.equal(head.status, 200)
  assert.equal(head.body, '')
})

test('as Pages does: the base without its slash redirects, and the rest is a 404', async (t) => {
  const served = await serveLobby({ port: 0 })
  t.after(() => served.close())
  const bare = await get(served.url, '/UoN-Video-Tools')
  assert.equal(bare.status, 301)
  assert.equal(bare.headers.location, '/UoN-Video-Tools/')
  const query = await get(served.url, '/UoN-Video-Tools?from=x')
  assert.equal(query.status, 301)
  assert.equal(query.headers.location, '/UoN-Video-Tools/?from=x')
  for (const path of ['/', '/index.html', '/UoN-Video-Tools/missing.html', '/UoN-Video-Tools/index.html/']) {
    assert.equal((await get(served.url, path)).status, 404, path)
  }
  assert.equal((await get(served.url, '/UoN-Video-Tools/', 'POST')).status, 405)
})

test('no path leaves the build: a file beside it cannot be read, by dot segments encoded or not, or encoded separators', async (t) => {
  const served = await serveLobby({ port: 0 })
  t.after(() => served.close())
  // A known file beside the build, in the same temporary folder: what an escape would reach.
  const name = `${basename(served.dir)}-beside.txt`
  const beside = join(dirname(served.dir), name)
  writeFileSync(beside, 'SECRET-BESIDE-THE-BUILD')
  t.after(() => rmSync(beside, { force: true }))
  assert.ok(existsSync(beside))
  for (const path of [
    `/UoN-Video-Tools/../${name}`,
    `/UoN-Video-Tools/%2e%2e/${name}`,
    `/UoN-Video-Tools/..%2f${name}`,
    `/UoN-Video-Tools/..%5c${name}`,
    `/UoN-Video-Tools/%2e%2e%2f${name}`,
    '/UoN-Video-Tools/%00',
    '/UoN-Video-Tools/%E0%A4%A',
  ]) {
    const res = await get(served.url, path)
    assert.equal(res.status, 404, path)
    assert.doesNotMatch(res.body, /SECRET-BESIDE-THE-BUILD/, path)
  }
})

test('locate refuses what lies beside the folder it serves', (t) => {
  const parent = mkdtempSync(join(tmpdir(), 'uvt-lobby-parent-'))
  t.after(() => rmSync(parent, { recursive: true, force: true }))
  const dir = join(parent, 'build')
  mkdirSync(dir)
  writeFileSync(join(dir, 'index.html'), 'page')
  writeFileSync(join(parent, 'beside.txt'), 'beside')
  assert.ok(existsSync(join(parent, 'beside.txt')))
  for (const pathname of ['/b/..%2fbeside.txt', '/b/..%5cbeside.txt', '/b/%2e%2e%2fbeside.txt', '/b/..', '/b/.']) {
    assert.equal(locate(dir, '/b/', pathname), null, pathname)
  }
  assert.deepEqual(locate(dir, '/b/', '/b/index.html'), { file: join(dir, 'index.html') })
})

test('locate: a folder serves its index.html, and redirects to its slash', (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'uvt-lobby-locate-'))
  t.after(() => rmSync(dir, { recursive: true, force: true }))
  mkdirSync(join(dir, 'sub'))
  writeFileSync(join(dir, 'index.html'), 'top')
  writeFileSync(join(dir, 'sub', 'index.html'), 'sub')
  assert.deepEqual(locate(dir, '/b/', '/b/'), { file: join(dir, 'index.html') })
  assert.deepEqual(locate(dir, '/b/', '/b/sub'), { redirect: '/b/sub/' })
  assert.deepEqual(locate(dir, '/b/', '/b/sub/'), { file: join(dir, 'sub', 'index.html') })
  assert.deepEqual(locate(dir, '/b/', '/b'), { redirect: '/b/' })
  assert.deepEqual(locate(dir, '/b/', '/b', '?q=1'), { redirect: '/b/?q=1' })
  assert.deepEqual(locate(dir, '/b/', '/b/sub', '?q=1'), { redirect: '/b/sub/?q=1' })
  assert.equal(locate(dir, '/b/', '/b/index.html/'), null)
  assert.equal(locate(dir, '/b/', '/other/'), null)
  assert.equal(locate(dir, '/b/', '/b/nothing/'), null)
})

test('another base path is served there, and a malformed one is refused', async (t) => {
  const served = await serveLobby({ base: '/fork/', port: 0 })
  t.after(() => served.close())
  assert.equal((await get(served.url, '/fork/')).body, renderLobby())
  assert.equal((await get(served.url, '/UoN-Video-Tools/')).status, 404)
  for (const base of ['UoN-Video-Tools/', '/UoN-Video-Tools', '//', '/a//b/']) {
    await assert.rejects(serveLobby({ base, port: 0 }), /must start and end with/, base)
  }
})

test('stopping the server removes its build', async () => {
  const served = await serveLobby({ port: 0 })
  assert.ok(existsSync(join(served.dir, 'index.html')))
  await served.close()
  assert.equal(existsSync(served.dir), false)
})

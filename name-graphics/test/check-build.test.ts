/**
 * The gate's build check (VNG-15, `scripts/check-build.mjs`): what it finds
 * in a build's folder, on hand-made builds. The invariant: a build that would
 * load nothing, load a file it lacks, reach outside the base path, name an
 * unbuilt source or carry a face other than the pack's is never passed. The
 * real build is checked by `npm run check:build` in the gate.
 */

import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { afterEach, describe, expect, it } from 'vitest'

import { problems, temporaryFolder } from '../scripts/check-build.mjs'

const base = '/UoN-Video-Tools/name-graphics/'
const made: string[] = []
afterEach(() => {
  for (const folder of made.splice(0)) rmSync(folder, { recursive: true, force: true })
})

/** A build's folder: `index.html` with `head` in its head and `body` in its body, and the files named. */
function build(head: string, files: Record<string, string> = {}, body = '<div id="root"></div>'): string {
  // The script's own guard: never a folder inside the repository, whatever TMPDIR says.
  const folder = temporaryFolder('vng-check-build-test-')
  made.push(folder)
  mkdirSync(join(folder, 'assets'))
  writeFileSync(join(folder, 'index.html'), `<!doctype html><html><head>${head}</head><body>${body}</body></html>`)
  for (const [name, text] of Object.entries(files)) writeFileSync(join(folder, name), text)
  return folder
}

const entry = `<script type="module" crossorigin src="${base}assets/app.js"></script>`
const sheet = `<link rel="stylesheet" crossorigin href="${base}assets/app.css">`
const good = { 'assets/app.js': '', 'assets/app.css': 'body{font-family:var(--font-body)}' }

describe('the build check', () => {
  it('passes a build whose entry and stylesheet lie under the base and are in it', () => {
    expect(problems(build(entry + sheet, good), base)).toEqual([])
  })

  it('finds no index.html', () => {
    const folder = build('')
    rmSync(join(folder, 'index.html'))
    expect(problems(folder, base)).toEqual(['no index.html'])
  })

  it('finds a missing entry beside a second module that is there (a regression: Codex, step 2)', () => {
    const second = `<script type="module" src="${base}assets/other.js"></script>`
    const found = problems(build(entry + second + sheet, { 'assets/app.css': good['assets/app.css'], 'assets/other.js': '' }), base)
    expect(found).toContain(`index.html loads ${base}assets/app.js, not in the build`)
  })

  it('finds a script, stylesheet or preload outside the base path', () => {
    const outside = '<script type="module" src="https://example.com/app.js"></script><link rel="modulepreload" href="/assets/x.js">'
    const found = problems(build(entry + sheet + outside, good), base)
    expect(found).toContain(`index.html loads https://example.com/app.js, outside ${base}`)
    expect(found).toContain(`index.html loads /assets/x.js, outside ${base}`)
  })

  it('reads every way HTML quotes an attribute (a regression: Codex, step 2)', () => {
    const quoted = `<script defer src='${base}assets/legacy.js'></script><script src=${base}assets/bare.js></script>`
    const found = problems(build(entry + sheet + quoted, good), base)
    expect(found).toContain(`index.html loads ${base}assets/legacy.js, not in the build`)
    expect(found).toContain(`index.html loads ${base}assets/bare.js, not in the build`)
  })

  it('resolves an address as the browser does: a query is the same file, a folder is not one', () => {
    const query = `<script type="module" src="${base}assets/app.js?v=2"></script>`
    expect(problems(build(query + sheet, good), base)).toEqual([])
    const folder = `<script type="module" src="${base}assets"></script>`
    expect(problems(build(folder + sheet, good), base)).toContain(`index.html loads ${base}assets, not in the build`)
  })

  it('finds no mount when it is commented out, and reads its id in any quoting (a regression: Codex, step 2)', () => {
    const missing = problems(build(entry + sheet, good, '<!-- <div id="root"></div> -->'), base)
    expect(missing).toContain('index.html has no empty #root for the React entry')
    expect(problems(build(entry + sheet, good, "<div id='root'></div>"), base)).toEqual([])
  })

  it('resolves from the page’s <base href> where it has one (a regression: Codex, step 2)', () => {
    const relative = '<base href="/"><script defer src="support.js"></script>'
    expect(problems(build(entry + sheet + relative, { ...good, 'support.js': '' }), base)).toContain(`index.html loads support.js, outside ${base}`)
  })

  it('reads rel as a list of tokens in any case: alternate stylesheets and preloads are checked (a regression: Codex, step 2)', () => {
    const links = '<link rel="alternate stylesheet" href="https://example.com/x.css"><link rel="preload" as="script" href="/x.js">'
    const found = problems(build(entry + sheet + links, good), base)
    expect(found).toContain(`index.html loads https://example.com/x.css, outside ${base}`)
    expect(found).toContain(`index.html loads /x.js, outside ${base}`)
    const upper = `<link rel="Stylesheet" href="${base}assets/app.css">`
    expect(problems(build(entry + upper, good), base)).toEqual([])
    const alternate = `<link rel="alternate stylesheet" href="${base}assets/app.css">`
    expect(problems(build(entry + alternate, good), base)).toContain('index.html loads no stylesheet')
  })

  it('finds a build that loads no module script or no stylesheet', () => {
    expect(problems(build(sheet, good), base)).toContain('index.html loads no module script')
    expect(problems(build(entry, good), base)).toContain('index.html loads no stylesheet')
  })

  it('finds an unbuilt source named', () => {
    expect(problems(build(entry + sheet + '<script type="module" src="/src/root.tsx"></script>', good), base)).toContain(
      'index.html names an unbuilt source under /src/',
    )
  })

  it('finds a bundled font file and a stylesheet naming IBM Plex', () => {
    const found = problems(build(entry + sheet, { ...good, 'assets/app.css': "body{font-family:'IBM Plex Sans'}", 'assets/face.woff2': '' }), base)
    expect(found).toContain('a font file is bundled: assets/face.woff2')
    expect(found).toContain('assets/app.css names IBM Plex')
  })

  it('finds a face embedded in a stylesheet, which leaves no font file (a regression: Codex, step 2)', () => {
    const embedded = '@font-face{font-family:x;src:url(data:font/woff2;base64,AAAA)}'
    expect(problems(build(entry + sheet, { ...good, 'assets/app.css': embedded }), base)).toContain('assets/app.css declares a font face')
  })

  it('finds a face in the page’s own <style> or in a script (a regression: Codex, step 2)', () => {
    const inline = '<style>@font-face{font-family:x;src:url(data:font/woff2;base64,AAAA)}</style>'
    const found = problems(build(entry + sheet + inline, { ...good, 'assets/app.js': "s.textContent='IBM Plex Sans'" }), base)
    expect(found).toContain('index.html declares a font face')
    expect(found).toContain('assets/app.js names IBM Plex')
  })

  it('refuses a temporary folder inside the repository', () => {
    const before = process.env['TMPDIR']
    process.env['TMPDIR'] = join(import.meta.dirname, '..')
    try {
      expect(() => temporaryFolder('vng-check-build-test-')).toThrow(/inside the repository/)
    } finally {
      if (before === undefined) delete process.env['TMPDIR']
      else process.env['TMPDIR'] = before
    }
  })
})

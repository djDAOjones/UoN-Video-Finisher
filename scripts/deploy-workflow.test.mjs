// CI runs every check the gate runs (UVT-8). The root's `npm run check` is a
// chain of commands, and the deploy workflow calls them apart — each tool's
// check from its own folder, then check:root — so a command added to the chain
// alone would never run on CI. Each command of the chain must be a step of the
// build job, run from the folder the chain runs it in, before the first build;
// the accessibility gate's browser is installed first, into the cache the gate
// reads; and the checkout is checked clean after the gate, before any build.
// Each gate step runs unconditionally and fails the job when it fails; CI runs
// this file on its own before the gates, so removing a gate step cannot also
// remove the test that misses it.
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))
const WORKFLOW = readFileSync(new URL('../.github/workflows/deploy-pages.yml', import.meta.url), 'utf8')

/** Git and bash for a fixture: the caller's environment without its Git variables, so Git sees the fixture alone. */
const ENV = Object.fromEntries(Object.entries(process.env).filter(([name]) => !name.startsWith('GIT_')))

/** The build job's text, from its header to the next job's key (a comment between them stays the build job's). */
function buildJob(text) {
  const job = text.split(/^ {2}build:\n/m)[1]?.split(/^ {2}[A-Za-z0-9_-]+:/m)[0]
  if (!job) throw new Error('the workflow has no build job')
  return job
}

/**
 * The build job's steps, each `{ name, run, dir, guards }`, read from the
 * workflow by its indentation (this file's own layout, no YAML dependency): a
 * step starts `      - `, its keys sit at eight spaces, a block `run: |`
 * holds the lines indented below it. `guards` lists the keys that could let
 * the step be skipped or fail quietly: `if`, `continue-on-error`, `shell`.
 */
function buildSteps(text) {
  const steps = []
  for (const block of buildJob(text).split(/^ {6}- /m).slice(1)) {
    const lines = `        ${block}`.split('\n')
    const step = { name: '', run: '', dir: '.', guards: [] }
    for (let i = 0; i < lines.length; i += 1) {
      const m = lines[i].match(/^ {8}([a-z-]+):\s*(.*)$/)
      if (!m) continue
      const [, key, value] = m
      if (key === 'name') step.name = value
      if (key === 'working-directory') step.dir = value
      if (['if', 'continue-on-error', 'shell'].includes(key)) step.guards.push(`${key}: ${value}`)
      if (key === 'run') {
        if (value === '|') {
          const body = []
          while (i + 1 < lines.length && (/^ {10}/.test(lines[i + 1]) || lines[i + 1] === '')) body.push(lines[(i += 1)].slice(10))
          step.run = body.join('\n').trim()
        } else step.run = value
      }
    }
    steps.push(step)
  }
  return steps
}

/** The root `check` chain's commands, each with the folder it runs in. */
function gateCommands(script) {
  return script.split('&&').map((part) => {
    const words = part.trim().split(/\s+/)
    const at = words.indexOf('--prefix')
    if (at === -1) return { run: words.join(' '), dir: '.' }
    const dir = words[at + 1]
    words.splice(at, 2)
    return { run: words.join(' '), dir }
  })
}

const steps = buildSteps(WORKFLOW)
const firstBuild = steps.findIndex((s) => /\bnpm run build\b|build-lobby\.mjs/.test(s.run))
const stepOf = (c) => steps.findIndex((s) => s.run === c.run && s.dir === c.dir)
const clean = steps.findIndex((s) => /git status --porcelain --untracked-files=all/.test(s.run) && /test ! -e finisher\/dist/.test(s.run))

test('the build job is read: its steps, a build among them', () => {
  assert.ok(steps.length >= 8, `${steps.length} steps`)
  assert.ok(firstBuild > 0)
})

test('each command of the root gate is a step of CI, from its own folder, before the first build', () => {
  const commands = gateCommands(pkg.scripts.check)
  assert.ok(commands.length >= 3)
  for (const c of commands) {
    const at = stepOf(c)
    assert.ok(at !== -1, `CI never runs "${c.run}" in ${c.dir}`)
    assert.ok(at < firstBuild, `CI runs "${c.run}" in ${c.dir} after a build`)
    assert.deepEqual(steps[at].guards, [], `CI's step "${c.run}" in ${c.dir} can be skipped or fail quietly`)
  }
})

/** The build job's own keys, at four spaces, wherever they sit around its steps. */
const jobKeys = (text) => [...buildJob(text).matchAll(/^ {4}([a-z-]+):/gm)].map((m) => m[1])

test('the build job itself runs unconditionally and fails on a failed step, every step from the root by default', () => {
  const keys = jobKeys(WORKFLOW)
  assert.ok(keys.includes('steps') && keys.includes('runs-on'), `the job's keys are read: ${keys}`)
  assert.deepEqual(keys.filter((k) => ['if', 'continue-on-error', 'defaults'].includes(k)), [])
  // No workflow default either: a step with no working-directory runs at the root of the checkout.
  assert.doesNotMatch(WORKFLOW, /^defaults:/m)
})

test("the job's keys are read wherever they sit: after the step list, before a comment and the next job", () => {
  const fixture = ['jobs:', '  build:', '    runs-on: ubuntu-latest', '    steps:', '      - run: npm ci', '    continue-on-error: true', '  # the next job', '  deploy:', '    if: false', ''].join('\n')
  assert.deepEqual(jobKeys(fixture), ['runs-on', 'steps', 'continue-on-error'])
})

test('CI runs this file on its own, unconditionally, before every gate command', () => {
  const parity = stepOf({ run: 'node --test scripts/deploy-workflow.test.mjs', dir: '.' })
  assert.ok(parity !== -1, 'CI never runs scripts/deploy-workflow.test.mjs on its own')
  assert.deepEqual(steps[parity].guards, [])
  for (const c of gateCommands(pkg.scripts.check)) assert.ok(parity < stepOf(c), `the parity check runs after "${c.run}"`)
})

test('a command added to the chain alone is caught', () => {
  const extra = gateCommands(`${pkg.scripts.check} && npm run lint:extra`).at(-1)
  assert.equal(steps.findIndex((s) => s.run === extra.run && s.dir === extra.dir), -1)
})

test('check:root runs the accessibility gate, and CI installs its browser first, into the cache the gate reads', () => {
  assert.match(pkg.scripts['check:root'], /&& npm run a11y &&/)
  const install = steps.findIndex((s) => /playwright install\b.*--only-shell chromium/.test(s.run))
  const root = steps.findIndex((s) => s.run === 'npm run check:root')
  assert.ok(install !== -1 && install < root, 'the browser is installed before check:root')
  assert.match(steps[install].run, /PLAYWRIGHT_BROWSERS_PATH=\$RUNNER_TEMP\/ms-playwright" >> "\$GITHUB_ENV"/)
  assert.match(steps[install].run, /PLAYWRIGHT_BROWSERS_PATH="\$RUNNER_TEMP\/ms-playwright" npm exec --no -- playwright install/)
})

test('the checkout is checked clean after the gate, before the first build', () => {
  const lastGate = Math.max(...gateCommands(pkg.scripts.check).map(stepOf))
  assert.ok(clean > lastGate && clean < firstBuild, `the clean check sits at ${clean}, the gate ends at ${lastGate}, the first build at ${firstBuild}`)
  assert.deepEqual(steps[clean].guards, [])
  assert.equal(steps[clean].dir, '.', 'the clean check runs at the root of the checkout, as its fixture below does')
})

test('the clean check, run as CI runs it (bash -e), fails on either dist/ alone and on an untracked file', () => {
  const cases = [
    ['a clean checkout', () => {}, 0],
    ['finisher/dist alone', (d) => mkdirSync(join(d, 'finisher', 'dist'), { recursive: true }), 1],
    ['name-graphics/dist alone', (d) => mkdirSync(join(d, 'name-graphics', 'dist'), { recursive: true }), 1],
    ['an untracked file', (d) => writeFileSync(join(d, 'stray.txt'), ''), 1],
  ]
  for (const [what, make, want] of cases) {
    const dir = mkdtempSync(join(tmpdir(), 'uvt8-clean-'))
    try {
      assert.equal(spawnSync('git', ['init', '-q'], { cwd: dir, env: ENV }).status, 0)
      make(dir)
      const r = spawnSync('bash', ['-e', '-c', steps[clean].run], { cwd: dir, env: ENV, encoding: 'utf8' })
      assert.equal(r.status === 0 ? 0 : 1, want, `${what}: the clean check exited ${r.status}`)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  }
})

test("each of the lobby's links leads to a tool built and gathered into the site, its page checked there", () => {
  const lobby = readFileSync(new URL('../lobby/Lobby.tsx', import.meta.url), 'utf8')
  const targets = [...lobby.matchAll(/href="([^"]*)"/g)].map((m) => m[1]).filter((h) => !/^([a-z]+:|\/\/|#)/.test(h))
  assert.ok(targets.length >= 2, `${targets.length} link(s) within the site`)
  const gather = steps.findIndex((s) => /^mkdir _site$/m.test(s.run))
  assert.ok(gather !== -1, 'no step gathers the site')
  for (const t of targets) {
    const dir = t.match(/^([a-z-]+)\/$/)?.[1]
    assert.ok(dir, `the link "${t}" is not a tool's folder`)
    assert.match(steps[gather].run, new RegExp(`^cp -R ${dir}/dist _site/${dir}$`, 'm'), `the site never gathers ${dir}/`)
    assert.match(steps[gather].run, new RegExp(`^test -s _site/${dir}/index\\.html$`, 'm'), `the site's ${dir}/index.html is never checked`)
    const build = stepOf({ run: 'npm run build', dir })
    assert.ok(build !== -1 && build < gather, `${dir} is not built before the site is gathered`)
  }
})

#!/usr/bin/env node
/**
 * Verifies the production bundle without writing the repository's `dist/`.
 *
 * `npm run build` deliberately produces the deployable artifact in `dist/`.
 * The quality gate has a different contract — `AGENTS.md` → "One-command
 * quality gate": it reports, it never writes. Running `build` inside `check`
 * broke that on every run, and it is not a theoretical breach: a gate that
 * rewrites `dist/` cannot honestly certify a change to what `dist/` contains,
 * because it has already replaced the evidence (VH-76).
 *
 * So the gate's bundle check goes to an isolated temporary directory, which is
 * removed on every exit path INCLUDING a signal — `finally` alone does not run
 * on SIGINT, and a gate interrupted with Ctrl-C is an ordinary event rather
 * than an exceptional one.
 *
 * Two bundles ship, so both are built: the site (`npm run build`) and the
 * Xerte package (`npm run build:xerte`). The package's one structural promise
 * is checked too — no folders — because the maintainer uploads it to Xerte as
 * a single flat folder, where a subdirectory is a broken upload (2026-09-21).
 *
 * Both bundles must also carry the offline pair beside `index.html` (VH-161):
 * the service worker, and a list of files to keep in which every name is a
 * file the bundle holds and none is a source map. A list naming a file that
 * is not there would fail every visitor's install, silently.
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const outputDirectory = mkdtempSync(join(tmpdir(), 'uon-video-helper-check-build-'))

const clean = () => {
  rmSync(outputDirectory, { recursive: true, force: true })
}

// Signals first, so an interrupt during the build cannot leave the directory
// behind. `process.exit` in the handler is deliberate: without it Node would
// carry on and the default handler would never run.
for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.once(signal, () => {
    clean()
    process.exit(1)
  })
}

/** Builds one bundle into its own subdirectory of the temporary directory. */
function build(name, modeArguments) {
  const directory = join(outputDirectory, name)
  execFileSync(
    process.execPath,
    [
      join(process.cwd(), 'node_modules', 'vite', 'bin', 'vite.js'),
      'build',
      ...modeArguments,
      '--outDir',
      directory,
      // The directory is outside the project root, so Vite asks before
      // emptying it. It is ours and was made empty a moment ago.
      '--emptyOutDir',
    ],
    { stdio: 'inherit' },
  )
  return directory
}

/** The offline pair's promise, for one bundle: `sw.js`, and a list that is true. */
function checkOfflineFiles(name, directory) {
  const problems = []
  if (!existsSync(join(directory, 'sw.js'))) problems.push('no sw.js beside index.html')
  const listPath = join(directory, 'offline-files.json')
  if (!existsSync(listPath)) {
    problems.push('no offline-files.json beside index.html')
  } else {
    const { files } = JSON.parse(readFileSync(listPath, 'utf8'))
    if (!files.includes('index.html')) problems.push('offline-files.json does not list index.html')
    for (const file of files) {
      if (file.endsWith('.map')) problems.push(`offline-files.json lists a source map, ${file}`)
      if (!existsSync(join(directory, file)))
        problems.push(`offline-files.json lists ${file}, not in the build`)
    }
  }
  for (const problem of problems) console.error(`check:build: ${name}: ${problem}`)
  if (problems.length > 0) process.exitCode = 1
}

try {
  checkOfflineFiles('site', build('site', []))
  const xerte = build('xerte', ['--mode', 'xerte'])
  checkOfflineFiles('xerte', xerte)
  const folders = readdirSync(xerte, { withFileTypes: true }).filter((entry) => entry.isDirectory())
  if (folders.length > 0) {
    console.error(
      `check:build: the Xerte package must be flat, but contains ${folders.map((entry) => `${entry.name}/`).join(', ')}`,
    )
    process.exitCode = 1
  }
} finally {
  clean()
}

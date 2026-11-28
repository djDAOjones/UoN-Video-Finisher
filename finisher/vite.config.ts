// The Finisher's Vite and Vitest config. The app pack's forms kind merged in
// (VH-250), its vite.config.mjs and vitest.config.mjs not kept beside this
// file, which Vite and Vitest would read first: its IBM Plex alias, pointed at
// the root's one install (UVT-7). Its Vitest include is not taken, since the
// Finisher's gate runs test/, the EBU harness, every source test and the
// shared tests; the Finisher's base path, port, builds and test settings stay,
// so the page and the Xerte package build as before. No React plugin, as the
// pack has none: Vite reads the tsconfig's JSX.

import { execSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { extname, resolve } from 'node:path'
import { searchForWorkspaceRoot } from 'vite'
import { defineConfig, type Plugin } from 'vitest/config'

import pkg from './package.json' with { type: 'json' }
import {
  isBrandingMaster,
  OFFLINE_FILES_FILE,
  OFFLINE_WORKER_FILE,
  offlineFiles,
} from './src/offline/offline-cache'

/**
 * Build identity, per DEV-INFRASTRUCTURE.md -> "Version management".
 * Product version answers "what release is this?"; build id answers
 * "exactly what code is live?". Both are non-secret and safe to copy.
 */
function buildId(): string {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  let sha = 'nogit'
  try {
    sha = execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim()
  } catch {
    // Not a git checkout (e.g. an extracted tarball). A build without a
    // commit trace is worth shipping; a build that fails to exist is not.
  }
  return `v${pkg.version}+${stamp}.${sha}`
}

/**
 * Keeps maintainer-only files out of the published build.
 *
 * Vite copies `public/` wholesale, which is exactly right for the branding
 * assets and exactly wrong for the notes sitting beside them: ticket IDs, build
 * instructions and an alpha-decode measurement table are for whoever maintains
 * the assets, not for the site's visitors. Confirmed shipping — the deployed
 * site returned 200 for `/branding/README.md` on 2026-08-25 (VH-40).
 *
 * Deleting after the copy rather than filtering before it, because Vite offers
 * no per-file exclusion for `publicDir` and moving the notes away from the
 * assets they describe would cost more than it saves.
 */
function excludeFromBuild(relativePaths: readonly string[]): Plugin {
  let outDir = 'dist'
  return {
    name: 'uon-exclude-from-build',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      for (const relativePath of relativePaths) {
        const full = resolve(outDir, relativePath)
        if (!existsSync(full)) continue
        rmSync(full, { force: true })
        this.info(`excluded ${relativePath} from the build`)
      }
    },
  }
}

/**
 * Emits the branding masters beside `index.html`, for the flat Xerte package.
 *
 * The Xerte build turns `publicDir` off and emits the masters itself rather
 * than moving Vite's copy afterwards: `closeBundle` hooks run in parallel, so
 * ordering a move against {@link excludeFromBuild} would be luck. It also means
 * nothing else under `public/` can reach the package by accident — only the
 * `.mp4` and `.webm` masters, under their own stable names.
 */
function emitBrandingFlat(): Plugin {
  let root = process.cwd()
  return {
    name: 'uon-emit-branding-flat',
    apply: 'build',
    configResolved(config) {
      root = config.root
    },
    generateBundle() {
      const directory = resolve(root, 'public/branding')
      for (const name of readdirSync(directory)) {
        if (extname(name) !== '.mp4' && extname(name) !== '.webm') continue
        this.emitFile({
          type: 'asset',
          fileName: name,
          source: readFileSync(resolve(directory, name)),
        })
      }
    },
  }
}

/**
 * Emits the service worker and its list of files, beside `index.html` in both
 * builds (spec §11, offline after first load; VH-161).
 *
 * The worker is its own chunk with a fixed name, `sw.js`: its default scope is
 * then the app's folder, with no header to ask the host for. The list,
 * `offline-files.json`, is written once every other file has its final name,
 * and carries the build id the worker was built with, so a worker never
 * installs another build's list.
 *
 * A worker that imported a chunk would have to be a module worker and would
 * name a hashed file; the build is refused instead, so a shared import cannot
 * creep in unseen.
 */
function emitOfflineCache(buildIdentity: string, brandingDirectory: string): Plugin {
  let root = process.cwd()
  return {
    name: 'uon-emit-offline-cache',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      root = config.root
    },
    buildStart() {
      this.emitFile({
        type: 'chunk',
        id: resolve(root, 'src/offline/service-worker.ts'),
        fileName: OFFLINE_WORKER_FILE,
      })
    },
    generateBundle(_options, bundle) {
      const worker = bundle[OFFLINE_WORKER_FILE]
      if (worker?.type !== 'chunk') return this.error(`no ${OFFLINE_WORKER_FILE} in the build`)
      if (worker.imports.length > 0 || worker.dynamicImports.length > 0) {
        return this.error(
          `${OFFLINE_WORKER_FILE} imports ${[...worker.imports, ...worker.dynamicImports].join(', ')}: ` +
            'it must stand alone, so nothing the page imports may be imported by it',
        )
      }
      if (!('index.html' in bundle)) return this.error('no index.html in the build to keep')
      const files = offlineFiles(
        Object.keys(bundle),
        readdirSync(resolve(root, 'public/branding')).filter(isBrandingMaster),
        brandingDirectory,
      )
      this.emitFile({
        type: 'asset',
        fileName: OFFLINE_FILES_FILE,
        source: `${JSON.stringify({ buildId: buildIdentity, files }, null, 2)}\n`,
      })
    },
  }
}

// IBM Plex's font files for Carbon's Sass (`src/ui/theme.scss`), bundled from
// the root's install, none fetched (the app-opinion digest).
const plex = resolve(import.meta.dirname, '../node_modules/@ibm/plex')

export default defineConfig(({ mode }) => {
  // The Xerte package, `vite build --mode xerte` (DEV-INFRASTRUCTURE.md ->
  // "Xerte package"). Relocatable, because Xerte serves it from a folder whose
  // path is unknown until the upload exists; and flat — every file beside
  // `index.html`, no folders — because that is how the maintainer uploads it
  // (2026-09-21).
  const xerte = mode === 'xerte'
  const buildIdentity = buildId()
  const brandingDirectory = xerte ? '' : 'branding/'
  return {
    plugins: [
      // The README, and the record of the words drawn into the internal tails (VH-126).
      excludeFromBuild(['branding/README.md', 'branding/closing-internal-words.json']),
      ...(xerte ? [emitBrandingFlat()] : []),
      emitOfflineCache(buildIdentity, brandingDirectory),
    ],
    // A GitHub Pages project site serves from `/<repo>/`, not the root. The
    // deploy workflow sets BASE_PATH; local dev and the acceptance run leave it
    // unset and stay at `/`. Runtime asset URLs read `import.meta.env.BASE_URL`
    // so they follow this automatically.
    base: xerte ? './' : (process.env['BASE_PATH'] ?? '/'),
    // Off for Xerte, where `emitBrandingFlat` ships the masters instead.
    publicDir: xerte ? false : 'public',
    resolve: { alias: { '~@ibm/plex': plex } },
    server: {
      // Honour PORT when something upstream assigns one (preview tooling, a
      // container, a shared machine). Falls back to Vite's default otherwise,
      // and `strictPort` stays off so a neighbour holding 5173 moves us rather
      // than stopping us. See DEV-INFRASTRUCTURE.md -> "Dev server".
      port: Number(process.env['PORT']) || 5173,
      // The shared code sits beside this folder, at the repository's root
      // (`../shared/`, the parent's, UVT-2), and so do Plex's fonts: the dev
      // server may read both as well as this folder. A build reads them from
      // disk and needs no leave.
      fs: {
        allow: [
          searchForWorkspaceRoot(import.meta.dirname),
          resolve(import.meta.dirname, '../shared'),
          plex,
        ],
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(`v${pkg.version}`),
      __BUILD_ID__: JSON.stringify(buildIdentity),
      // Where the branding masters sit under `base`: their own folder, except
      // in the flat Xerte package. Read by `src/config/branding.ts`.
      __BRANDING_DIR__: JSON.stringify(brandingDirectory),
      // The service worker's name, for the page to register it by (VH-161).
      // Defined rather than imported: see `src/offline/offline-cache.ts`.
      __OFFLINE_WORKER_FILE__: JSON.stringify(OFFLINE_WORKER_FILE),
    },
    build: {
      target: 'esnext',
      // Flat for Xerte: chunks beside `index.html` rather than in `assets/`.
      assetsDir: xerte ? '' : 'assets',
      // Kept, deliberately, and re-decided on 2026-08-26 rather than assumed.
      // Shipping sourcemaps normally exposes source — but this repository is
      // PUBLIC, so every line they reveal is already at
      // github.com/djDAOjones/UoN-Video-Finisher, and they are what make a
      // diagnostics bundle from a lecturer's machine name real functions instead
      // of minified identifiers. Revisit if the repository ever goes private:
      // that, not the deploy, is the condition this rests on (VH-40).
      sourcemap: true,
      rollupOptions: {
        // Only the app ships. `acceptance.html` is a maintainer tool served in
        // development; building it would put a test harness in production for
        // no one's benefit.
        input: { app: 'index.html' },
      },
    },
    test: {
      environment: 'node',
      // The shared core's tests run here too, under this tool's build-time
      // values: the Finisher depends on them (UVT-2).
      include: ['test/**/*.test.ts', 'src/**/*.test.ts', '../shared/core/**/*.test.ts'],
      // The audio chain tests push 90-120 seconds of synthesised speech through
      // the full DSP chain, which legitimately takes seconds rather than
      // milliseconds. Locally the slowest sits at ~3.9 s, comfortably under
      // vitest's 5 s default — but a shared CI runner is around 1.5x slower and
      // three of them timed out on the first deploy that ran the gate in CI.
      //
      // Raised rather than shortened, because the signal lengths are what make
      // the gating and anti-pumping assertions meaningful. This only changes how
      // long a HUNG test takes to fail; it weakens no assertion.
      testTimeout: 30_000,
      // A focused case (`it.only`) fails the run rather than silently skipping
      // its siblings: the app pack's guard, taken from its Vitest config (VH-250).
      allowOnly: false,
    },
  }
})

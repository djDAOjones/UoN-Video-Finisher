// Copied from the UoN Video Finisher at 27f51dd (VNG-1): its build id,
// BASE_PATH, port and sourcemap handling, without its branding-asset plugins,
// its Xerte mode (VNG-9's) or its audio tests' timeout. The app pack's forms
// kind merged in (VNG-14), its vite.config.mjs and vitest.config.mjs not kept
// beside this file, which Vite and Vitest would read first: its IBM Plex alias,
// pointed at the root's one install (UVT-7), and its test runner's settings.
// The seed's base path, port and build target stay, so the preview builds as
// before; no React plugin, as the pack has none: Vite reads the tsconfig's JSX.

import { execSync } from 'node:child_process'
import { resolve } from 'node:path'
import { searchForWorkspaceRoot } from 'vite'
import { defineConfig } from 'vitest/config'

import pkg from './package.json' with { type: 'json' }

/**
 * Build identity, the rules file's two-part version identity. Product version
 * answers "what release is this?"; build id answers "exactly what code is
 * live?". Both are non-secret and safe to copy.
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

// IBM Plex's font files for Carbon's Sass (`src/ui/theme.scss`), bundled from
// the root's install, none fetched (the app-opinion digest).
const plex = resolve(import.meta.dirname, '../node_modules/@ibm/plex')

/**
 * Vite's and Vitest's one configuration for Name Graphics: the seed's build
 * (base path, port, build identity, sourcemaps, `index.html` the input) with
 * the forms kind's Plex alias and test-runner settings merged in.
 */
export default defineConfig({
  // A GitHub Pages project site serves from `/<repo>/`, not the root. The
  // deploy workflow sets BASE_PATH; local dev leaves it unset and stays at
  // `/`. Runtime asset URLs read `import.meta.env.BASE_URL` so they follow
  // this automatically.
  base: process.env['BASE_PATH'] ?? '/',
  resolve: { alias: { '~@ibm/plex': plex } },
  server: {
    // Honour PORT when something upstream assigns one (preview tooling, a
    // container, a shared machine). Falls back to Vite's default otherwise,
    // and `strictPort` stays off so a neighbour holding 5173 moves us rather
    // than stopping us.
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
    __BUILD_ID__: JSON.stringify(buildId()),
  },
  build: {
    target: 'esnext',
    // Kept, as the Finisher re-decided on 2026-08-26 rather than assumed.
    // Shipping sourcemaps normally exposes source — but this repository is
    // PUBLIC, so every line they reveal is already at
    // github.com/djDAOjones/Video-Name-Graphics, and they are what make a
    // diagnostics bundle name real functions instead of minified identifiers.
    // Revisit if the repository ever goes private: that, not the deploy, is
    // the condition this rests on.
    sourcemap: true,
    rollupOptions: {
      input: { app: 'index.html' },
    },
  },
  test: {
    // The app pack's runner settings: no jsdom (the interface is tested in a
    // real browser by the accessibility pack), forked workers capped at three,
    // a stray `only` or a run that finds no test failing it.
    environment: 'node',
    pool: 'forks',
    maxWorkers: 3,
    allowOnly: false,
    passWithNoTests: false,
    // The shared core's tests run here too, under this tool's build-time
    // values: Name Graphics depends on them (UVT-2).
    // A core test may be `.test.tsx` too (tsconfig.core.json leaves both to
    // the tests project); the interface's own are the browser's, not here.
    include: ['test/**/*.test.ts', 'src/**/*.test.ts', 'src/core/**/*.test.tsx', '../shared/core/**/*.test.ts'],
  },
})

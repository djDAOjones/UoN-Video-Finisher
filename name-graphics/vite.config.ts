// Copied from the UoN Video Finisher at 27f51dd (VNG-1): its build id,
// BASE_PATH, port and sourcemap handling, without its branding-asset plugins,
// its Xerte mode (VNG-9's) or its audio tests' timeout.

import { execSync } from 'node:child_process'
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

export default defineConfig({
  // A GitHub Pages project site serves from `/<repo>/`, not the root. The
  // deploy workflow sets BASE_PATH; local dev leaves it unset and stays at
  // `/`. Runtime asset URLs read `import.meta.env.BASE_URL` so they follow
  // this automatically.
  base: process.env['BASE_PATH'] ?? '/',
  server: {
    // Honour PORT when something upstream assigns one (preview tooling, a
    // container, a shared machine). Falls back to Vite's default otherwise,
    // and `strictPort` stays off so a neighbour holding 5173 moves us rather
    // than stopping us.
    port: Number(process.env['PORT']) || 5173,
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
    environment: 'node',
    include: ['test/**/*.test.ts', 'src/**/*.test.ts'],
  },
})

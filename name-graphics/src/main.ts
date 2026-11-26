/**
 * App entry point (VNG-1).
 *
 * After the UoN Video Finisher's `main.ts` at 27f51dd, cut to the shell:
 * installs diagnostics before anything else can throw, and writes the
 * version line. Later items mount the form here.
 */

import './styles/app.css'

import { installGlobalErrorCapture } from './core/diagnostics'
import { log, setMinimumLogLevel } from './core/logger'
import { APP_VERSION, BUILD_ID } from './core/version'

const isDev = import.meta.env.DEV

if (!isDev) setMinimumLogLevel('info')
installGlobalErrorCapture('main')

log.info('boot', 'Video Name Graphics starting', { appVersion: APP_VERSION, buildId: BUILD_ID })

const versionLine = document.querySelector<HTMLParagraphElement>('#version-line')
if (!versionLine) throw new Error('Missing required element: #version-line')

// Both, in production too, as the Finisher's VH-66: the rules file's version
// identity wants "what release is this?" AND "exactly what code is live?"
// answerable from a running app, and the diagnostics bundle is dev-only.
// Non-secret: this repository is public and the commit is in the sourcemaps.
versionLine.textContent = isDev ? `${APP_VERSION} · ${BUILD_ID} · development` : BUILD_ID

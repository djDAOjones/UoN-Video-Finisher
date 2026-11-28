/**
 * The React entry, the live one since VNG-15: the forms starter's
 * `src/main.tsx` from canon v5.0.3's app pack, under a basename of its own
 * (VNG-14), with the seed's start-up from `src/main.ts` folded in — VNG-1's,
 * after the Finisher's `main.ts` (`finisher/` at 27f51dd). Diagnostics are
 * installed before anything else can throw; then the page is rendered once,
 * its one dynamic value, the version line, worked out by the core.
 */

import './ui/theme.scss'
import './styles/app.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { installGlobalErrorCapture } from '../../shared/core/diagnostics'
import { log, setMinimumLogLevel } from '../../shared/core/logger'
import { APP_VERSION, BUILD_ID } from '../../shared/core/version'
import { versionLine } from './core/version-line'
import { App } from './ui/App'

const development = import.meta.env.DEV

if (!development) setMinimumLogLevel('info')
installGlobalErrorCapture('main')

log.info('boot', 'Video Name Graphics starting', { appVersion: APP_VERSION, buildId: BUILD_ID })

const root = document.getElementById('root')
if (root === null) throw new Error('index.html has no #root')
createRoot(root).render(
  <StrictMode>
    <App version={versionLine({ appVersion: APP_VERSION, buildId: BUILD_ID, development })} />
  </StrictMode>,
)

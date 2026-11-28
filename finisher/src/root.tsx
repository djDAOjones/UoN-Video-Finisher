/**
 * The React entry (VH-250): the forms starter's `src/main.tsx` from canon
 * v5.0.3's app pack, under a basename of its own. TypeScript reading a folder
 * keeps `src/main.ts`, today's page, and silently drops a `main.tsx` beside
 * it; `npm run typecheck`'s entry check proves the compiler and ESLint's
 * project service read this file. `index.html` still loads `src/main.ts`:
 * the page moves here in VH-251.
 */

import './ui/theme.scss'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './ui/App'

const root = document.getElementById('root')
if (root === null) throw new Error('index.html has no #root')
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

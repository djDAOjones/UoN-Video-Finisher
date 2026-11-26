/**
 * The release guard's logged length (VH-203.4, the owner's "Yes, all six",
 * 2026-11-08, answer 5): its rounding scale lives here, and the worker's
 * warn line rounds by it, both places, with no bare `1000` left there.
 */

import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { MADE_LENGTH_LOG_ROUNDING_SCALE } from './thresholds'

const worker = readFileSync(new URL('../workers/job.worker.ts', import.meta.url), 'utf8')

describe('MADE_LENGTH_LOG_ROUNDING_SCALE', () => {
  it('keeps the made length logged to the millisecond', () => {
    expect(MADE_LENGTH_LOG_ROUNDING_SCALE).toBe(1000)
    expect(Math.round(7.0404 * MADE_LENGTH_LOG_ROUNDING_SCALE) / MADE_LENGTH_LOG_ROUNDING_SCALE).toBe(7.04)
  })

  it('is what the worker imports from config and rounds the release guard’s made length by, both places', () => {
    expect(worker).toMatch(/import \{[^}]*\bMADE_LENGTH_LOG_ROUNDING_SCALE\b[^}]*\} from '\.\.\/config\/thresholds'/)
    const guard = worker.slice(worker.indexOf("'the card would misstate the length made'"))
    const madeSeconds = guard.slice(0, guard.indexOf('throw new JobFailureError'))
    expect(madeSeconds).toContain(
      'Math.round(result.madeSeconds * MADE_LENGTH_LOG_ROUNDING_SCALE) / MADE_LENGTH_LOG_ROUNDING_SCALE',
    )
    expect(madeSeconds).not.toMatch(/\b1000\b/)
  })
})

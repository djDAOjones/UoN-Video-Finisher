/**
 * VH-244, wish line VH-193.2: the solver's stop on a limited pass that
 * measures no level. The rest of the solver's rules are proved beside the
 * chain they are solved against (`chain.test.ts`); this one needs no chain,
 * because no real signal measures a level unlimited and none limited.
 */

import { describe, expect, it } from 'vitest'

import { TARGET_INTEGRATED_LUFS } from '../config/audio'
import { solveChainGainDb } from './gain-solve'

describe('a limited pass that measures no level (VH-193.2)', () => {
  const UNLIMITED_LUFS = -30

  it.each([
    ['silence', Number.NEGATIVE_INFINITY],
    ['not a number', Number.NaN],
  ])('stops at the first estimate, with nothing measured: %s', async (_name, limitedLufs) => {
    const asked: Array<number | null> = []
    const solution = await solveChainGainDb((gainDb) => {
      asked.push(gainDb)
      return Promise.resolve(gainDb === null ? UNLIMITED_LUFS : limitedLufs)
    })
    // One limited pass and no more: a step sized from no level would be the
    // largest step six times over, or no number at all.
    const firstEstimateDb = TARGET_INTEGRATED_LUFS - UNLIMITED_LUFS
    expect(asked).toEqual([null, firstEstimateDb])
    expect(solution).toEqual({
      gainDb: firstEstimateDb,
      unlimitedLufs: UNLIMITED_LUFS,
      measuredLufs: null,
      refinementPasses: 1,
      converged: false,
    })
  })
})

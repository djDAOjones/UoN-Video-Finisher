/**
 * VH-243, E-02: how far the page is scrolled so a job's bar and stage line
 * are in the window when they arrive.
 *
 * Boxes in the window's coordinates, as Chrome gives them straight after
 * the first report is painted; the numbers are analyst E's, read at
 * 375 × 812 in Bahasa Malaysia, and this item's at 1280 × 900. The scroll
 * itself, and that it is made once and at once, are read in Chrome.
 */

import { describe, expect, it } from 'vitest'

import { progressRevealScroll } from './progress-reveal'

/** The bar and its line `top` px down the window, 37 px tall, with Cancel 318 px below the bar's top. */
function arrived(top: number) {
  return {
    progress: { top, bottom: top + 37 },
    cancel: { top: top + 318, bottom: top + 362 },
  }
}

describe('progressRevealScroll', () => {
  it.each([-70, -210, -51, -135, -310])(
    'brings a bar that arrived %s px above a phone’s window down to the inset, Cancel still in view',
    (top) => {
      const { progress, cancel } = arrived(top)
      const by = progressRevealScroll(progress, cancel, 812, 8)
      expect(by).toBe(top - 8)
      expect(progress.top - by).toBe(8)
      expect(cancel.bottom - by).toBeLessThanOrEqual(812 - 8)
    },
  )

  it.each([0, 8, 132, 456, 775])(
    'moves nothing where the bar and its line are in the window, at %s px',
    (top) => {
      const { progress, cancel } = arrived(top)
      expect(progressRevealScroll(progress, cancel, 812, 8)).toBe(0)
    },
  )

  it('moves nothing for a bar in the window whose Cancel is not: the browser has seen to focus', () => {
    expect(
      progressRevealScroll({ top: 700, bottom: 737 }, { top: 1018, bottom: 1062 }, 812, 8),
    ).toBe(0)
  })

  it('brings a bar cut off by the top edge wholly in, by the least that does it', () => {
    const { progress, cancel } = arrived(-1)
    expect(progressRevealScroll(progress, cancel, 812, 8)).toBe(-9)
  })

  it('brings a bar below the window up until Cancel under it is in view too', () => {
    const { progress, cancel } = arrived(800)
    const by = progressRevealScroll(progress, cancel, 812, 8)
    expect(by).toBe(cancel.bottom - (812 - 8))
    expect(progress.top - by).toBeGreaterThanOrEqual(8)
  })

  it('shows the bar and its line alone where the window cannot hold Cancel as well', () => {
    const { progress, cancel } = arrived(-70)
    // 362 px from the bar's top to Cancel's foot, and 16 px of inset: 375 px of window is 3 px short.
    expect(progressRevealScroll(progress, cancel, 375, 8)).toBe(-78)
    const below = arrived(400)
    expect(progressRevealScroll(below.progress, below.cancel, 375, 8)).toBe(
      below.progress.bottom - (375 - 8),
    )
  })

  it('holds both in a window just tall enough for them', () => {
    const { progress, cancel } = arrived(-70)
    expect(progressRevealScroll(progress, cancel, 378, 8)).toBe(-78)
    expect(cancel.bottom + 78).toBe(378 - 8)
  })

  it('reads the bar alone with no Cancel on the page', () => {
    expect(progressRevealScroll({ top: -70, bottom: -33 }, null, 812, 8)).toBe(-78)
    expect(progressRevealScroll({ top: 800, bottom: 837 }, null, 812, 8)).toBe(33)
  })

  it('keeps no room at the edge where the root’s inset does not parse', () => {
    expect(progressRevealScroll({ top: -70, bottom: -33 }, null, 812, Number.NaN)).toBe(-70)
    expect(progressRevealScroll({ top: -70, bottom: -33 }, null, 812, -4)).toBe(-70)
  })

  it('puts the start of a box taller than the window at its top', () => {
    expect(progressRevealScroll({ top: 100, bottom: 1000 }, null, 375, 8)).toBe(92)
  })
})

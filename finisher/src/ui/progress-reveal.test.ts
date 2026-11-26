/**
 * VH-243, E-02: how far the page is scrolled so a job's bar and stage line
 * are in the window when they arrive.
 *
 * Boxes in the window's coordinates, as Chrome gives them straight after
 * the first report is painted; the numbers are analyst E's, read at
 * 375 × 812 in Bahasa Malaysia, and this item's at 1280 × 900; analyst
 * F's, for a Cancel pushed below the window by a bar that is in it (F-01).
 * The scroll itself, and that it is made once and at once, are read in
 * Chrome.
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

  it.each([0, 8, 132, 442])(
    'moves nothing where the bar, its line and Cancel are in the window, the bar at %s px',
    (top) => {
      const { progress, cancel } = arrived(top)
      expect(progressRevealScroll(progress, cancel, 812, 8)).toBe(0)
    },
  )

  // Analyst F's F-01: the progress arrives above a Cancel that stood near
  // the window's foot, and pushes it, focus and all, below the bottom edge.
  it.each([
    // 375 × 812 in Bahasa Malaysia, a retry after Cancel: Create's top at 480 and at 505.
    [{ top: 487.8, bottom: 524.8 }, { top: 805.8, bottom: 849.8 }, 812, 45.8],
    [{ top: 494.8, bottom: 531.8 }, { top: 812.8, bottom: 856.8 }, 812, 52.8],
    // 1280 × 900, a first job on a video with no sound note: Create's top at 720 and at 770.
    [{ top: 612.9, bottom: 649.9 }, { top: 867.9, bottom: 911.9 }, 900, 19.9],
    [{ top: 666.9, bottom: 703.9 }, { top: 921.9, bottom: 965.9 }, 900, 73.9],
    // 1280 × 900, a retry after Cancel: Create's top at 600.
    [{ top: 665.9, bottom: 702.9 }, { top: 920.9, bottom: 964.9 }, 900, 72.9],
  ])(
    'brings a Cancel pushed past the window’s foot back in by the least that does it, the bar still in view (F-01, case %#)',
    (progress, cancel, windowHeight, expected) => {
      const by = progressRevealScroll(progress, cancel, windowHeight, 8)
      expect(by).toBeCloseTo(expected, 9)
      // Cancel's foot on the inset, where its focus ring has room; no further.
      expect(cancel.bottom - by).toBeCloseTo(windowHeight - 8, 9)
      expect(progress.top - by).toBeGreaterThanOrEqual(8)
    },
  )

  it.each([443, 456, 700, 775])(
    'brings Cancel in for a bar in the window at %s px whose Cancel is cut by the foot or below it',
    (top) => {
      const { progress, cancel } = arrived(top)
      const by = progressRevealScroll(progress, cancel, 812, 8)
      expect(by).toBe(cancel.bottom - (812 - 8))
      expect(by).toBeGreaterThan(0)
      expect(progress.top - by).toBeGreaterThanOrEqual(8)
    },
  )

  it('counts Cancel as cut while its focus ring’s room is: a foot inside the inset moves it', () => {
    // 1280 × 900, Create's top at 640 and a retry at 500: Cancel's foot at
    // 831.9 and 827.9, clear of the inset, and nothing moves.
    expect(progressRevealScroll({ top: 532.9, bottom: 569.9 }, { top: 787.9, bottom: 831.9 }, 900, 8)).toBe(0)
    expect(progressRevealScroll({ top: 528.9, bottom: 565.9 }, { top: 783.9, bottom: 827.9 }, 900, 8)).toBe(0)
    expect(progressRevealScroll({ top: 500, bottom: 537 }, { top: 848, bottom: 892 }, 900, 8)).toBe(0)
    expect(progressRevealScroll({ top: 500, bottom: 537 }, { top: 850, bottom: 894 }, 900, 8)).toBe(2)
  })

  it('never scrolls back for a Cancel below the foot, nor takes the bar above the inset', () => {
    // A bar inside the top inset with everything else in view stays put.
    expect(progressRevealScroll({ top: 3, bottom: 40 }, { top: 321, bottom: 365 }, 812, 8)).toBe(0)
    // Cancel far below a bar near the top, in a window that holds both: the
    // bar's start stops at the inset whatever Cancel's box says.
    for (const top of [8, 60, 300, 700]) {
      const by = progressRevealScroll({ top, bottom: top + 37 }, { top: top + 700, bottom: top + 744 }, 812, 8)
      expect(by).toBeGreaterThanOrEqual(0)
      expect(top - by).toBeGreaterThanOrEqual(8)
    }
  })

  it('moves nothing for a bar in a window too short to hold Cancel as well: the bar is what says the job has started', () => {
    // 362 px from the bar's top to Cancel's foot, and 16 px of inset: 375 px of window is 3 px short.
    const { progress, cancel } = arrived(100)
    expect(cancel.bottom).toBeGreaterThan(375)
    expect(progressRevealScroll(progress, cancel, 375, 8)).toBe(0)
    expect(progressRevealScroll(progress, cancel, 378, 8)).toBe(cancel.bottom - (378 - 8))
  })

  it('moves nothing for a bar in the window with no Cancel on the page', () => {
    expect(progressRevealScroll({ top: 700, bottom: 737 }, null, 812, 8)).toBe(0)
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

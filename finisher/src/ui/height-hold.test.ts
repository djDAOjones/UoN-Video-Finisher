/**
 * VH-240: step 6 keeps its height while the device check runs again, and
 * gives it up when what the check found is painted.
 *
 * A stand-in for the step: a border box as tall as its content or its
 * `min-height`, whichever is more, as Chrome lays out a `border-box` block.
 * The heights on the page, the scroll and what is shown meanwhile are read
 * in Chrome (VH-240's evidence).
 *
 * VH-243, D-02: a card standing under the verdict keeps its place while the
 * verdict is withdrawn above it. A stand-in for step 6 above the card: the
 * verdict's box, then the status line and its stop, then the card, with the
 * margins either side of the verdict's box meeting through it while it is
 * empty and has no height, as Chrome lays out adjoining margins.
 */

import { describe, expect, it } from 'vitest'

import { createHeightHold, createPlaceHold } from './height-hold'

/** A step whose content is `contentHeight` tall; `measured` counts the layouts the hold asked for. */
function step(contentHeight: number) {
  const element = {
    contentHeight,
    measured: 0,
    style: { minHeight: '' },
    getBoundingClientRect() {
      element.measured += 1
      return { height: Math.max(element.contentHeight, Number.parseFloat(element.style.minHeight) || 0) }
    },
  }
  return element
}

/** The step's height as laid out, without counting as a measurement of the hold's. */
const heightOf = (element: ReturnType<typeof step>): number =>
  Math.max(element.contentHeight, Number.parseFloat(element.style.minHeight) || 0)

describe('createHeightHold', () => {
  it('keeps the step as tall as it stood when its content is withdrawn', () => {
    const element = step(605)
    const hold = createHeightHold(element)
    hold.hold()
    element.contentHeight = 183
    expect(element.style.minHeight).toBe('605px')
    expect(heightOf(element)).toBe(605)
  })

  it('holds a measured height to the fraction of a pixel, in px', () => {
    const element = step(604.796875)
    createHeightHold(element).hold()
    expect(element.style.minHeight).toBe('604.796875px')
  })

  it('writes no style until a hold is taken, so a first check holds nothing', () => {
    const element = step(183)
    createHeightHold(element)
    expect(element.style.minHeight).toBe('')
    expect(element.measured).toBe(0)
  })

  it('shrinks once, at the release, when the new content is shorter', () => {
    const element = step(605)
    const hold = createHeightHold(element)
    hold.hold()
    element.contentHeight = 183
    element.contentHeight = 469
    expect(heightOf(element)).toBe(605)
    hold.release()
    expect(element.style.minHeight).toBe('')
    expect(heightOf(element)).toBe(469)
  })

  it('lets taller new content through while held, and after', () => {
    const element = step(469)
    const hold = createHeightHold(element)
    hold.hold()
    element.contentHeight = 605
    expect(heightOf(element)).toBe(605)
    hold.release()
    expect(heightOf(element)).toBe(605)
  })

  it('keeps the original height when a second change arrives mid-check', () => {
    const element = step(605)
    const hold = createHeightHold(element)
    hold.hold()
    element.contentHeight = 183
    hold.hold()
    hold.hold()
    expect(element.style.minHeight).toBe('605px')
    // Not measured again: a held step measured mid-check gives the hold back.
    expect(element.measured).toBe(1)
  })

  it('does not ratchet: a hold taken again after a release measures what is shown then', () => {
    const element = step(605)
    const hold = createHeightHold(element)
    hold.hold()
    element.contentHeight = 183
    hold.release()
    hold.hold()
    expect(element.style.minHeight).toBe('183px')
    element.contentHeight = 605
    hold.release()
    hold.hold()
    expect(element.style.minHeight).toBe('605px')
  })

  it('releases with nothing held, and twice, leaving no style behind', () => {
    const element = step(605)
    const hold = createHeightHold(element)
    hold.release()
    expect(element.style.minHeight).toBe('')
    hold.hold()
    hold.release()
    hold.release()
    expect(element.style.minHeight).toBe('')
    expect(heightOf(element)).toBe(605)
  })

  it('holds nothing of a step that is off the page', () => {
    const element = step(0)
    const hold = createHeightHold(element)
    hold.hold()
    element.contentHeight = 183
    expect(heightOf(element)).toBe(183)
    hold.release()
    expect(element.style.minHeight).toBe('')
  })
})

/**
 * Step 6 from the verdict's box down to a card: the box (the spacer),
 * `line` px of status and stop, then the card, `margins` px either side of
 * the box. `place` is the card's top from the box's top margin edge, or
 * `null` with no card.
 */
function above({
  verdict,
  line,
  margins = [0, 0],
  card = true,
}: {
  verdict: number
  line: number
  margins?: readonly [number, number]
  card?: boolean
}) {
  const scene = {
    spacer: step(verdict),
    line,
    card,
    place: (): number | null => {
      if (!scene.card) return null
      const box = heightOf(scene.spacer)
      const [before, after] = margins
      // Margins meet through an empty box of no height, and add either side of one with height.
      return (box > 0 ? before + box + after : Math.max(before, after)) + scene.line
    },
  }
  return scene
}

describe('createPlaceHold (VH-243, D-02)', () => {
  it('keeps the card where it stood when the verdict goes and the line and its stop arrive', () => {
    const scene = above({ verdict: 336, line: 21 })
    const hold = createPlaceHold(scene.spacer, scene.place)
    const stood = scene.place()
    hold.hold()
    scene.spacer.contentHeight = 0
    scene.line = 89
    // Unsettled, the card has risen by what left less what arrived: D's 304 px.
    expect(scene.place()).toBe(89)
    hold.settle()
    expect(scene.spacer.style.minHeight).toBe('268px')
    expect(scene.place()).toBe(stood)
  })

  it('pays for the margins that no longer meet through a spacer given height', () => {
    const scene = above({ verdict: 336, line: 21, margins: [16, 12] })
    const hold = createPlaceHold(scene.spacer, scene.place)
    const stood = scene.place()
    hold.hold()
    scene.spacer.contentHeight = 0
    scene.line = 89
    hold.settle()
    expect(scene.place()).toBe(stood)
    expect(scene.spacer.style.minHeight).toBe('268px')
  })

  it('writes no style and measures nothing until a hold is taken', () => {
    const scene = above({ verdict: 336, line: 21 })
    const hold = createPlaceHold(scene.spacer, scene.place)
    scene.spacer.contentHeight = 0
    hold.settle()
    expect(scene.spacer.style.minHeight).toBe('')
    expect(scene.spacer.measured).toBe(0)
  })

  it('holds nothing where no card stands: the step’s own hold is all there is, as before', () => {
    const scene = above({ verdict: 336, line: 21, card: false })
    const hold = createPlaceHold(scene.spacer, scene.place)
    hold.hold()
    scene.spacer.contentHeight = 0
    scene.line = 89
    hold.settle()
    expect(scene.spacer.style.minHeight).toBe('')
    expect(scene.spacer.measured).toBe(0)
  })

  it('opens no room where more arrived than left: a finished video with no verdict above it', () => {
    const scene = above({ verdict: 0, line: 21 })
    const hold = createPlaceHold(scene.spacer, scene.place)
    hold.hold()
    scene.line = 89
    hold.settle()
    expect(scene.spacer.style.minHeight).toBe('')
    expect(scene.place()).toBe(89)
  })

  it('opens no room where nothing moved', () => {
    const scene = above({ verdict: 336, line: 21 })
    const hold = createPlaceHold(scene.spacer, scene.place)
    hold.hold()
    hold.settle()
    expect(scene.spacer.style.minHeight).toBe('')
  })

  it('keeps the place it first noted when a second change arrives mid-check', () => {
    const scene = above({ verdict: 336, line: 21 })
    const hold = createPlaceHold(scene.spacer, scene.place)
    const stood = scene.place()
    hold.hold()
    scene.spacer.contentHeight = 0
    scene.line = 89
    // A second key of a handle, before the first has settled: the card has
    // risen, and that is not the place to keep.
    hold.hold()
    hold.settle()
    hold.hold()
    hold.settle()
    expect(scene.place()).toBe(stood)
  })

  it('settles again from what is shown when the line is painted again while held', () => {
    const scene = above({ verdict: 336, line: 21 })
    const hold = createPlaceHold(scene.spacer, scene.place)
    const stood = scene.place()
    hold.hold()
    scene.spacer.contentHeight = 0
    scene.line = 89
    hold.settle()
    // The line wraps onto a second row.
    scene.line = 110
    hold.settle()
    expect(scene.spacer.style.minHeight).toBe('247px')
    expect(scene.place()).toBe(stood)
  })

  it('adds to what the spacer still shows, where only part of it was withdrawn', () => {
    const scene = above({ verdict: 336, line: 21 })
    const hold = createPlaceHold(scene.spacer, scene.place)
    const stood = scene.place()
    hold.hold()
    scene.spacer.contentHeight = 124
    hold.settle()
    expect(scene.spacer.style.minHeight).toBe('336px')
    expect(scene.place()).toBe(stood)
  })

  it('lets the card go to its new place at the release, and takes a new place at the next hold', () => {
    const scene = above({ verdict: 336, line: 21 })
    const hold = createPlaceHold(scene.spacer, scene.place)
    hold.hold()
    scene.spacer.contentHeight = 0
    scene.line = 89
    hold.settle()
    // The check's verdict is painted, shorter than the last, and the stop goes.
    scene.spacer.contentHeight = 124
    scene.line = 21
    hold.release()
    expect(scene.spacer.style.minHeight).toBe('')
    expect(scene.place()).toBe(145)
    hold.hold()
    scene.spacer.contentHeight = 0
    scene.line = 89
    hold.settle()
    expect(scene.place()).toBe(145)
  })

  it('releases with nothing held, and twice, leaving no style behind', () => {
    const scene = above({ verdict: 336, line: 21 })
    const hold = createPlaceHold(scene.spacer, scene.place)
    hold.release()
    hold.hold()
    scene.spacer.contentHeight = 0
    hold.settle()
    hold.release()
    hold.release()
    expect(scene.spacer.style.minHeight).toBe('')
  })

  it('owes nothing once the card has gone while held', () => {
    const scene = above({ verdict: 336, line: 21 })
    const hold = createPlaceHold(scene.spacer, scene.place)
    hold.hold()
    scene.spacer.contentHeight = 0
    hold.settle()
    scene.card = false
    hold.settle()
    expect(scene.spacer.style.minHeight).toBe('')
  })
})

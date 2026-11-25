/**
 * VH-240: step 6 keeps its height while the device check runs again, and
 * gives it up when what the check found is painted.
 *
 * A stand-in for the step: a border box as tall as its content or its
 * `min-height`, whichever is more, as Chrome lays out a `border-box` block.
 * The heights on the page, the scroll and what is shown meanwhile are read
 * in Chrome (VH-240's evidence).
 */

import { describe, expect, it } from 'vitest'

import { createHeightHold } from './height-hold'

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

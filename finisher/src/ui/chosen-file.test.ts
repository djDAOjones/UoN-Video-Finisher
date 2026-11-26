/**
 * VH-238: the same file picked again is read again, and a chooser closed with
 * nothing picked changes nothing.
 */

import { describe, expect, it } from 'vitest'

import { pickedAgain } from './chosen-file'

/** A new object each time, as Chrome's list holds after every pick. */
const talk = (): File => new File(['the same bytes'], 'talk-30s.mp4', { type: 'video/mp4' })

describe('pickedAgain', () => {
  it('is a pick when the list holds a new object for the same file (regression: C-01, C-02)', () => {
    expect(pickedAgain(talk(), talk(), false)).toBe(true)
  })

  it('is no pick when the list still holds the file the page took up', () => {
    const held = talk()
    expect(pickedAgain(held, held, false)).toBe(false)
  })

  it('is no pick when the list is empty, whatever the page holds', () => {
    expect(pickedAgain(undefined, talk(), false)).toBe(false)
    expect(pickedAgain(undefined, null, false)).toBe(false)
  })

  it('is a pick when the page holds nothing yet and the list has a file', () => {
    expect(pickedAgain(talk(), null, false)).toBe(true)
  })

  it('takes up nothing while the picker is shut for a job, a save or start-up', () => {
    const held = talk()
    expect(pickedAgain(talk(), held, true)).toBe(false)
    expect(pickedAgain(held, held, true)).toBe(false)
    expect(pickedAgain(undefined, held, true)).toBe(false)
  })
})

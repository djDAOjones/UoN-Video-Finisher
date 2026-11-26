/**
 * The status reveal (VH-232): the feedback dialogue's status, when set,
 * brought whole into view by the least scroll of the dialogue alone.
 *
 * Stand-ins for the elements: the dialogue's box is fixed in the window,
 * its content scrolls under it, and the status's box follows its
 * `scrollTop`, as in Chrome. Anything else the reveal might touch (focus,
 * `scrollIntoView`, the page, a horizontal scroll, the text) is a spy that
 * must stay still. The scroll, the keys and the announcement are walked in
 * Chrome (VH-232's table).
 */

import { describe, expect, it } from 'vitest'

import { focusInside, outlineReach, revealStatus } from './reveal-status'

/**
 * A dialogue at `top` in the window, `clientHeight` tall inside a 1 px
 * border, holding `scrollHeight` of content; the status at `at` to `end`
 * of that content (its offsets from the content's top).
 */
function scene({
  clientHeight = 534,
  scrollHeight = 700,
  at = 480,
  end = 670,
  scrollTop = 0,
  text = 'Your email app should have opened.',
  open = true,
  rounds = false,
}: Partial<{
  clientHeight: number
  scrollHeight: number
  at: number
  end: number
  scrollTop: number
  text: string
  open: boolean
  rounds: boolean
}> = {}) {
  const top = 16
  const border = 1
  const calls: string[] = []
  const page = { scrollX: 0, scrollY: 40 }
  const dialog = {
    open,
    isConnected: true,
    clientTop: border,
    clientHeight,
    scrollHeight,
    scrollLeft: 0,
    _scrollTop: scrollTop,
    get scrollTop() {
      return this._scrollTop
    },
    set scrollTop(value: number) {
      calls.push(`scrollTop=${value}`)
      // The browser clamps to the scroll range, as here, and may round.
      const clamped = Math.min(Math.max(0, value), this.scrollHeight - this.clientHeight)
      this._scrollTop = rounds ? Math.round(clamped) : clamped
    },
    getBoundingClientRect: () => ({ top, bottom: top + border + clientHeight + border }),
    focus: () => calls.push('dialog.focus'),
    scrollIntoView: () => calls.push('dialog.scrollIntoView'),
    /** The controls placed inside it, for `focusInside`. */
    holds: new Set<unknown>(),
    contains(other: unknown) {
      return this.holds.has(other)
    },
  }
  const status = {
    isConnected: true,
    textContent: text as string | null,
    at,
    end,
    getBoundingClientRect: () => ({
      top: top + border + status.at - dialog.scrollTop,
      bottom: top + border + status.end - dialog.scrollTop,
    }),
    focus: () => calls.push('status.focus'),
    scrollIntoView: () => calls.push('status.scrollIntoView'),
  }
  /** The status's box against the client area: whole in view, and the room left below it. */
  const seen = () => {
    const box = status.getBoundingClientRect()
    const clientTop = top + border
    const clientBottom = clientTop + clientHeight
    return {
      whole: box.top >= clientTop && box.bottom <= clientBottom,
      startAtTop: box.top === clientTop,
      below: clientBottom - box.bottom,
    }
  }
  return { dialog, status, page, calls, seen }
}

const ROOM = 32

/** A control at `at` to `end` of the dialogue's content, following its scroll as the status does. */
function control(dialog: { scrollTop: number; holds?: Set<unknown> }, at: number, end: number) {
  const clientTop = 17
  const placed = {
    getBoundingClientRect: () => ({
      top: clientTop + at - dialog.scrollTop,
      bottom: clientTop + end - dialog.scrollTop,
    }),
  }
  dialog.holds?.add(placed)
  return placed
}

/** The ring's reach as `outlineReach` reads `:focus-visible`'s 2 px outline at a 2 px offset. */
const ringOf = () => outlineReach({ outlineWidth: '2px', outlineOffset: '2px' })

describe('revealStatus', () => {
  it('moves nothing where the status is already wholly in view', () => {
    const { dialog, status, calls, seen } = scene({
      scrollHeight: 520,
      clientHeight: 534,
      at: 300,
      end: 360,
    })
    expect(revealStatus(status, dialog, ROOM)).toBe(0)
    expect(calls).toEqual([])
    expect(seen().whole).toBe(true)
  })

  it('moves nothing where it is wholly in view but inside the end padding', () => {
    // In view by the client area; the room is kept only when a scroll is needed.
    const { dialog, status, calls } = scene({ scrollHeight: 700, at: 400, end: 530 })
    expect(revealStatus(status, dialog, ROOM)).toBe(0)
    expect(calls).toEqual([])
  })

  it('scrolls the dialogue down by the least distance when the status is clipped below, keeping the end padding', () => {
    const { dialog, status, seen } = scene({ scrollHeight: 702, at: 480, end: 670 })
    // 670 - (534 - 32) = 168: the status's end at the room's edge, which is also the end of the range.
    expect(revealStatus(status, dialog, ROOM)).toBe(168)
    expect(dialog.scrollTop).toBe(168)
    expect(seen()).toEqual({ whole: true, startAtTop: false, below: ROOM })
  })

  it('scrolls the dialogue up by the least distance when the status is clipped above', () => {
    const { dialog, status, seen } = scene({ scrollHeight: 900, at: 100, end: 200, scrollTop: 150 })
    expect(revealStatus(status, dialog, ROOM)).toBe(-50)
    expect(dialog.scrollTop).toBe(100)
    expect(seen().startAtTop).toBe(true)
  })

  it('moves nothing on an exact fit, the status filling the client area', () => {
    const { dialog, status, calls, seen } = scene({
      scrollHeight: 900,
      at: 200,
      end: 734,
      scrollTop: 200,
    })
    expect(revealStatus(status, dialog, ROOM)).toBe(0)
    expect(calls).toEqual([])
    expect(seen().whole).toBe(true)
  })

  it('takes fractional geometry as it is', () => {
    const { dialog, status, seen } = scene({
      clientHeight: 533.5,
      scrollHeight: 720.25,
      at: 480.4,
      end: 670.6,
    })
    const moved = revealStatus(status, dialog, ROOM)
    expect(moved).toBeCloseTo(670.6 - (533.5 - ROOM), 6)
    expect(seen().whole).toBe(true)
    expect(seen().below).toBeCloseTo(ROOM, 6)
    expect(revealStatus(status, dialog, ROOM)).toBe(0)
  })

  it('settles within half a pixel where the browser rounds scrollTop, and does not swing', () => {
    // An exact-height status wanting 200.4 lands at 200: 0.4 px outside, inside the walk's 0.5 px.
    const { dialog, status } = scene({ scrollHeight: 900, at: 200.4, end: 734.4, rounds: true })
    expect(revealStatus(status, dialog, ROOM)).toBe(200)
    const box = status.getBoundingClientRect()
    expect(box.top - 17).toBeCloseTo(0.4, 6)
    expect(box.bottom - (17 + 534)).toBeLessThanOrEqual(0.5)
    for (let i = 0; i < 3; i++) expect(revealStatus(status, dialog, ROOM)).toBe(0)
    expect(dialog.scrollTop).toBe(200)
  })

  it('clamps to the scroll range: the room below is never bought past the end', () => {
    const { dialog, status, seen } = scene({ scrollHeight: 680, at: 480, end: 670 })
    // Wanted 168; the range is 680 - 534 = 146.
    expect(revealStatus(status, dialog, ROOM)).toBe(146)
    expect(dialog.scrollTop).toBe(146)
    expect(seen().whole).toBe(true)
  })

  it('clamps at the top of the range', () => {
    const { dialog, status } = scene({ scrollHeight: 900, at: 0, end: 60, scrollTop: 10 })
    expect(revealStatus(status, dialog, ROOM)).toBe(-10)
    expect(dialog.scrollTop).toBe(0)
  })

  it('aligns a status taller than the visible area by its start, and repeated calls do not swing', () => {
    const { dialog, status, seen } = scene({ scrollHeight: 1400, at: 480, end: 1200 })
    expect(revealStatus(status, dialog, ROOM)).toBe(480)
    expect(seen()).toMatchObject({ whole: false, startAtTop: true })
    for (let i = 0; i < 3; i++) expect(revealStatus(status, dialog, ROOM)).toBe(0)
    expect(dialog.scrollTop).toBe(480)
  })

  it('brings a taller status back to its start when it is set again further down', () => {
    const { dialog, status, seen } = scene({
      scrollHeight: 1400,
      at: 480,
      end: 1200,
      scrollTop: 600,
    })
    expect(revealStatus(status, dialog, ROOM)).toBe(-120)
    expect(seen().startAtTop).toBe(true)
  })

  it('does nothing for an emptied status, a closed dialogue or a node off the page', () => {
    for (const make of [
      () => scene({ text: '' }),
      () => scene({ open: false }),
      () => {
        const s = scene()
        s.status.isConnected = false
        return s
      },
      () => {
        const s = scene()
        s.dialog.isConnected = false
        return s
      },
      () => {
        const s = scene()
        s.status.textContent = null
        return s
      },
    ]) {
      const { dialog, status, calls } = make()
      expect(revealStatus(status, dialog, ROOM)).toBe(0)
      expect(calls).toEqual([])
      expect(dialog.scrollTop).toBe(0)
    }
  })

  it('takes no focus, scrolls nothing but the dialogue vertically, and leaves the text alone', () => {
    const { dialog, status, page, calls } = scene()
    const text = status.textContent
    revealStatus(status, dialog, ROOM)
    expect(calls.every((call) => call.startsWith('scrollTop='))).toBe(true)
    expect(calls).toHaveLength(1)
    expect(dialog.scrollLeft).toBe(0)
    expect(page).toEqual({ scrollX: 0, scrollY: 40 })
    expect(status.textContent).toBe(text)
  })

  it('treats an unreadable end padding as none', () => {
    const { dialog, status, seen } = scene({ scrollHeight: 900, at: 480, end: 670 })
    expect(revealStatus(status, dialog, Number.NaN)).toBe(136)
    expect(seen().below).toBe(0)
  })

  it('measures a replaced, translated text afresh', () => {
    const { dialog, status, seen } = scene({ scrollHeight: 900, at: 480, end: 600 })
    expect(revealStatus(status, dialog, ROOM)).toBe(98)
    // The language repainted: a longer sentence in the same place.
    status.textContent = '您的电子邮件应用应已打开。'
    status.end = 700
    expect(revealStatus(status, dialog, ROOM)).toBe(100)
    expect(seen()).toMatchObject({ whole: true, below: ROOM })
  })

  // Copy's result is written when the clipboard answers, which may be after
  // the dialogue has changed. VH-232 recorded each outcome here (VH-232.2).
  // Since VH-235, main.ts writes a result only into the opening that pressed
  // Copy (`feedback-opening.ts`, tested there), so after Close, Escape or a
  // reopen no late text reaches the reveal: the titles below are VH-232's
  // record, and each case is the reveal given such a text, as VH-232 left it.
  describe("Copy's delayed result", () => {
    it('after Close: written to a closed dialogue, nothing scrolls', () => {
      const { dialog, status, calls } = scene()
      dialog.open = false
      expect(revealStatus(status, dialog, ROOM)).toBe(0)
      expect(calls).toEqual([])
    })

    it('after Escape: the same, the dialogue closed by the browser', () => {
      const { dialog, status, calls } = scene()
      dialog.open = false
      status.textContent = 'Could not copy.'
      expect(revealStatus(status, dialog, ROOM)).toBe(0)
      expect(calls).toEqual([])
    })

    it('after a close and reopen: the late text lands in the new opening and is revealed there, as focus allows', () => {
      // Recorded outcome (VH-232): the opening empties the status (nothing
      // moves; the browser keeps the dialogue's scroll), and a result that
      // answered later was written into the new opening and revealed there by
      // the call main.ts made, focus on the message field the opening gave it.
      // Since VH-235 main.ts drops that result: this is the reveal given a text
      // in a reopened dialogue.
      const { dialog, status, seen } = scene({ scrollHeight: 702, at: 480, end: 600 })
      const message = control(dialog, 120, 220)
      dialog.open = false
      status.textContent = ''
      dialog.open = true
      expect(revealStatus(status, dialog, ROOM, focusInside(dialog, message, ringOf))).toBe(0)
      status.textContent = 'Copied.'
      expect(revealStatus(status, dialog, ROOM, focusInside(dialog, message, ringOf))).toBe(98)
      expect(seen().whole).toBe(true)
    })

    it('after a close and reopen in a small window: focus on the message field is kept, the late status partial', () => {
      const { dialog, status, seen } = scene({
        clientHeight: 191,
        scrollHeight: 849,
        at: 472,
        end: 598,
      })
      const message = control(dialog, 100, 160)
      status.textContent = 'Copied.'
      // The field's ring keeps its top at the client area's top: scrollTop 100 - 4.
      expect(revealStatus(status, dialog, ROOM, focusInside(dialog, message, ringOf))).toBe(96)
      expect(message.getBoundingClientRect().top - ringOf()).toBe(17)
      expect(seen().whole).toBe(false)
    })

    it('with focus moved by the user: focus stays where they put it, and the scroll keeps it in view', () => {
      const { dialog, status, calls, seen } = scene({ scrollHeight: 702 })
      // The user went back to the message field, a tall one, before Copy answered.
      const message = control(dialog, 120, 300)
      const page = { activeElement: message as unknown }
      const kept = focusInside(dialog, message, ringOf)
      expect(kept).not.toBeNull()
      // Without focus 168; the field's ring keeps it at 116, the status partial.
      expect(revealStatus(status, dialog, ROOM, kept)).toBe(116)
      expect(page.activeElement).toBe(message)
      expect(calls).toEqual(['scrollTop=116'])
      expect(seen().whole).toBe(false)
    })

    it('with focus moved out of the dialogue, or on nothing: revealed as without focus', () => {
      for (const active of [{ getBoundingClientRect: () => ({ top: 0, bottom: 20 }) }, null]) {
        const { dialog, status } = scene({ scrollHeight: 702 })
        expect(revealStatus(status, dialog, ROOM, focusInside(dialog, active, ringOf))).toBe(168)
      }
    })
  })
})

// Focus wins (VH-232, the orchestrator's ruling on the 400% zoom proxy):
// the scroll never takes the focused control or its ring out of view.
describe('revealStatus with a control holding focus', () => {
  const RING = 4
  /** Whether a control's box and ring lie wholly in the client area. */
  const ringIn = (c: ReturnType<typeof control>, clientHeight: number) => {
    const box = c.getBoundingClientRect()
    return box.top - RING >= 17 && box.bottom + RING <= 17 + clientHeight
  }
  const kept = (c: ReturnType<typeof control>) => ({ box: c.getBoundingClientRect(), ring: RING })

  it('scrolls as before where the status and the focused control both fit', () => {
    const { dialog, status, seen } = scene({ scrollHeight: 702 })
    const button = control(dialog, 420, 464)
    expect(revealStatus(status, dialog, ROOM, kept(button))).toBe(168)
    expect(seen()).toEqual({ whole: true, startAtTop: false, below: ROOM })
    expect(ringIn(button, 534)).toBe(true)
  })

  it('keeps the focused control and its ring in view where both cannot fit, the status partial', () => {
    // As at the 400% zoom proxy: a 191 px client area, the actions stacked
    // between the button pressed and the status (298 px from one to the other).
    const { dialog, status, seen } = scene({
      clientHeight: 191,
      scrollHeight: 849,
      at: 472,
      end: 598,
    })
    const button = control(dialog, 300, 344)
    // Without focus the status would come whole at 439; focus stops it at 296.
    expect(revealStatus(status, dialog, ROOM, kept(button))).toBe(296)
    expect(ringIn(button, 191)).toBe(true)
    expect(button.getBoundingClientRect().top - RING).toBe(17)
    expect(seen().whole).toBe(false)
    // Repeated calls settle where they are.
    for (let i = 0; i < 3; i++) expect(revealStatus(status, dialog, ROOM, kept(button))).toBe(0)
    expect(dialog.scrollTop).toBe(296)
  })

  it('keeps a focused control below in view when the status is clipped above', () => {
    const { dialog, status } = scene({ scrollHeight: 900, at: 100, end: 200, scrollTop: 150 })
    const button = control(dialog, 600, 644)
    // The status's start at the top would be 100; the button's ring keeps it at 114.
    expect(revealStatus(status, dialog, ROOM, kept(button))).toBe(-36)
    expect(dialog.scrollTop).toBe(114)
    expect(ringIn(button, 534)).toBe(true)
  })

  it('leaves the reveal as it is where the focused control is taller than the client area', () => {
    const { dialog, status, seen } = scene({ scrollHeight: 1400, at: 900, end: 960 })
    const field = control(dialog, 100, 700)
    expect(revealStatus(status, dialog, ROOM, kept(field))).toBe(458)
    expect(seen()).toMatchObject({ whole: true, below: ROOM })
  })

  it('takes no focus and scrolls only the dialogue when it keeps focus', () => {
    const { dialog, status, page, calls } = scene({
      clientHeight: 191,
      scrollHeight: 849,
      at: 472,
      end: 598,
    })
    revealStatus(status, dialog, ROOM, kept(control(dialog, 300, 344)))
    expect(calls).toEqual(['scrollTop=296'])
    expect(dialog.scrollLeft).toBe(0)
    expect(page).toEqual({ scrollX: 0, scrollY: 40 })
  })
})

describe('focusInside', () => {
  const button = { getBoundingClientRect: () => ({ top: 400, bottom: 444 }) }
  const outside = { getBoundingClientRect: () => ({ top: 0, bottom: 20 }) }
  const body = { getBoundingClientRect: () => ({ top: 0, bottom: 900 }) }
  const dialog = {
    getBoundingClientRect: () => ({ top: 16, bottom: 552 }),
    contains: (other: unknown) => other === button || other === dialog,
  }
  const ring = () => 4

  it('gives the focused control inside the dialogue, with its ring', () => {
    expect(focusInside(dialog, button, ring)).toEqual({ box: { top: 400, bottom: 444 }, ring: 4 })
  })

  it('gives nothing where focus is outside the dialogue, on the page body, on the dialogue itself or on nothing', () => {
    expect(focusInside(dialog, outside, ring)).toBeNull()
    expect(focusInside(dialog, body, ring)).toBeNull()
    expect(focusInside(dialog, dialog, ring)).toBeNull()
    expect(focusInside(dialog, null, ring)).toBeNull()
  })

  it('so the reveal behaves as it did without focus there', () => {
    const { dialog: d, status } = scene({ scrollHeight: 702 })
    expect(revealStatus(status, d, ROOM, focusInside(dialog, outside, ring))).toBe(168)
  })
})

describe('outlineReach', () => {
  it("adds the outline's width and offset", () => {
    expect(outlineReach({ outlineWidth: '2px', outlineOffset: '2px' })).toBe(4)
  })

  it('reads no ring, a ring drawn inside the box, or one that does not parse as 0', () => {
    expect(outlineReach({ outlineWidth: '0px', outlineOffset: '0px' })).toBe(0)
    expect(outlineReach({ outlineWidth: '2px', outlineOffset: '-4px' })).toBe(0)
    expect(outlineReach({ outlineWidth: '', outlineOffset: '' })).toBe(0)
  })
})

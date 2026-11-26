/**
 * Copy's result only in the opening that started it (VH-235). Stand-ins: a
 * dialogue that is only `open`, a clipboard promise held until the test
 * settles it, and spies for the status writes and the log. The dialogue,
 * the keys and the live region are walked in Chrome (VH-235's table).
 */

import { describe, expect, it } from 'vitest'

import { createFeedbackOpening, settleCopy } from './feedback-opening'

/** A clipboard answer held until the test settles it. */
function held() {
  let settle: (ok: boolean) => void = () => undefined
  const promise = new Promise<void>((resolve, reject) => {
    settle = (ok) => (ok ? resolve() : reject(new Error('Write permission denied.')))
  })
  return { promise, settle }
}

/** The dialogue as `openFeedback` and Close leave it, with Copy pressed in an opening. */
function scene() {
  const dialog = { open: false }
  const opening = createFeedbackOpening(dialog)
  const written: string[] = []
  const warned: unknown[] = []
  const on = {
    copied: () => written.push('copied'),
    couldNotCopy: () => written.push('couldNotCopy'),
    warn: (cause: unknown) => warned.push(cause),
  }
  const open = () => {
    dialog.open = true
    opening.begin()
  }
  const close = () => {
    dialog.open = false
  }
  /** Copy pressed now: its answer held, its settle captured in this opening. */
  const press = () => {
    const answer = held()
    const done = settleCopy(() => answer.promise, opening.capture(), on)
    return { settle: async (ok: boolean) => { answer.settle(ok); await done } }
  }
  return { dialog, opening, written, warned, open, close, press }
}

const OUTCOMES = [
  { ok: true, written: 'copied', warns: 0 },
  { ok: false, written: 'couldNotCopy', warns: 1 },
] as const

describe('Copy in the same opening', () => {
  for (const o of OUTCOMES) {
    it(`writes ${o.written} when it settles in the opening that pressed it`, async () => {
      const s = scene()
      s.open()
      await s.press().settle(o.ok)
      expect(s.written).toEqual([o.written])
      expect(s.warned).toHaveLength(o.warns)
    })
  }

  it('writes each of two Copies in one opening, in the order they settle', async () => {
    const s = scene()
    s.open()
    const first = s.press()
    const second = s.press()
    await second.settle(false)
    await first.settle(true)
    expect(s.written).toEqual(['couldNotCopy', 'copied'])
  })

  it('writes a result that settles before Close', async () => {
    const s = scene()
    s.open()
    const copy = s.press()
    await copy.settle(true)
    s.close()
    expect(s.written).toEqual(['copied'])
  })
})

describe('Copy settling late writes nothing; a failure is still logged', () => {
  for (const o of OUTCOMES) {
    it(`after Close: nothing written, ${o.ok ? 'settled' : 'failed'}`, async () => {
      const s = scene()
      s.open()
      const copy = s.press()
      s.close() // Close's handler: dialog.close(); the close event comes later
      await copy.settle(o.ok)
      expect(s.written).toEqual([])
      expect(s.warned).toHaveLength(o.warns)
    })

    it(`after Escape: nothing written, ${o.ok ? 'settled' : 'failed'}`, async () => {
      // The browser closes a modal dialogue on Escape; the app is not called, only `open` changes.
      const s = scene()
      s.open()
      const copy = s.press()
      s.dialog.open = false
      await copy.settle(o.ok)
      expect(s.written).toEqual([])
      expect(s.warned).toHaveLength(o.warns)
    })

    it(`after a close and reopen: nothing written into the new opening, ${o.ok ? 'settled' : 'failed'}`, async () => {
      const s = scene()
      s.open()
      const copy = s.press()
      s.close()
      s.open()
      await copy.settle(o.ok)
      expect(s.written).toEqual([])
      expect(s.warned).toHaveLength(o.warns)
    })
  }

  it('after a reopen, the late Copy is dropped while one pressed in the new opening is written', async () => {
    const s = scene()
    s.open()
    const late = s.press()
    s.close()
    s.open()
    const fresh = s.press()
    await late.settle(true)
    await fresh.settle(true)
    expect(s.written).toEqual(['copied'])
  })

  it('a capture before any opening never writes', async () => {
    const s = scene()
    s.dialog.open = true
    await s.press().settle(true)
    expect(s.written).toEqual([])
  })
})

describe('settleCopy keeps the handler’s shape', () => {
  it('a throw from the success write falls to the failure, logged and written', async () => {
    const written: string[] = []
    const warned: unknown[] = []
    const boom = new Error('paint failed')
    await settleCopy(() => Promise.resolve(), () => true, {
      copied: () => {
        throw boom
      },
      couldNotCopy: () => written.push('couldNotCopy'),
      warn: (cause) => warned.push(cause),
    })
    expect(warned).toEqual([boom])
    expect(written).toEqual(['couldNotCopy'])
  })

  it('a clipboard that throws at the call fails as before, logged and written', async () => {
    const written: string[] = []
    const warned: unknown[] = []
    const missing = new TypeError('navigator.clipboard is undefined')
    await settleCopy(
      () => {
        throw missing
      },
      () => true,
      { copied: () => written.push('copied'), couldNotCopy: () => written.push('couldNotCopy'), warn: (cause) => warned.push(cause) },
    )
    expect(warned).toEqual([missing])
    expect(written).toEqual(['couldNotCopy'])
  })

  it('asks whether the opening is still here only when the answer comes', async () => {
    const answer = held()
    let asked = 0
    const here = () => {
      asked += 1
      return true
    }
    const done = settleCopy(() => answer.promise, here, {
      copied: () => undefined,
      couldNotCopy: () => undefined,
      warn: () => undefined,
    })
    expect(asked).toBe(0)
    answer.settle(true)
    await done
    expect(asked).toBe(1)
  })

  it('on a late failure, logs the failure before asking whether the opening is still here', async () => {
    const answer = held()
    const order: string[] = []
    const here = () => {
      order.push('here')
      return false
    }
    const done = settleCopy(() => answer.promise, here, {
      copied: () => order.push('copied'),
      couldNotCopy: () => order.push('couldNotCopy'),
      warn: () => order.push('warn'),
    })
    answer.settle(false)
    await done
    expect(order).toEqual(['warn', 'here'])
  })
})

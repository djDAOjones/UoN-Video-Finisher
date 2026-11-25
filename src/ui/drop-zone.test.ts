/**
 * Dropping a video on the Choose step (VH-101): which drops are taken, what a
 * refused one is told, and that the picker stays the route a drop feeds.
 *
 * The DOM half — the drag-over state, the hand-off to the input, a drop
 * outside the zone — needs a real browser and was verified in Chrome. What is
 * pinned here is every decision it makes, and, with stand-ins for the zone's
 * elements, when a refusal it has said is taken away again (VH-239).
 */

import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  acceptsFile,
  dropProblem,
  installDropZone,
  refusalEnded,
  type DropBusy,
  type DroppedFile,
} from './drop-zone'

const html = readFileSync(new URL('../../index.html', import.meta.url), 'utf8')
const markup = html.replace(/<!--[\s\S]*?-->/g, '')
/** The picker's own list, so these tests describe the file the page offers. */
const accept = /id="file-input"[\s\S]*?accept="([^"]*)"/.exec(markup)?.[1] ?? ''

const mp4 = { name: 'lecture.mp4', type: 'video/mp4' }

describe('acceptsFile', () => {
  it("reads the picker's list from the page", () => {
    expect(accept).toContain('video/*')
  })

  it('takes a video by its type, as the picker does', () => {
    expect(acceptsFile(accept, mp4)).toBe(true)
    expect(acceptsFile(accept, { name: 'clip', type: 'video/quicktime' })).toBe(true)
  })

  it('takes a video by its extension when the browser gives no type', () => {
    // Some browsers report an MKV with an empty type; the list names it.
    expect(acceptsFile(accept, { name: 'Seminar.MKV', type: '' })).toBe(true)
  })

  it('refuses what is not a video', () => {
    expect(acceptsFile(accept, { name: 'slides.pdf', type: 'application/pdf' })).toBe(false)
    expect(acceptsFile(accept, { name: 'poster.png', type: 'image/png' })).toBe(false)
    // A dropped folder arrives with no type and no extension.
    expect(acceptsFile(accept, { name: 'Lectures', type: '' })).toBe(false)
    // An extension is matched at the end, not anywhere in the name.
    expect(acceptsFile(accept, { name: 'notes.mp4.txt', type: 'text/plain' })).toBe(false)
  })

  it('takes anything when the list is empty, as an input without one does', () => {
    expect(acceptsFile('', { name: 'anything', type: '' })).toBe(true)
  })
})

describe('dropProblem', () => {
  it('takes one video', () => {
    expect(dropProblem([mp4], accept, null)).toBeNull()
  })

  it('refuses several files, and says how many and what to do', () => {
    expect(dropProblem([mp4, mp4, mp4], accept, null)).toBe(
      'That was 3 files. Drop one video at a time.',
    )
  })

  it('refuses a file that is not a video, and names what is wanted', () => {
    const problem = dropProblem([{ name: 'slides.pdf', type: 'application/pdf' }], accept, null)
    expect(problem).toMatch(/^That is not a video file\./)
    expect(problem).toContain('.mp4')
  })

  it('refuses a drop that carried no file', () => {
    expect(dropProblem([], accept, null)).toMatch(/Drop a video file\.$/)
  })

  it('refuses any drop while a video is being made, and says how to go on', () => {
    // Checked first: one video or three, the answer is to wait or cancel.
    for (const files of [[mp4], [mp4, mp4]]) {
      const problem = dropProblem(files, accept, 'making')
      expect(problem).toContain('being made')
      expect(problem).toContain('Cancel')
    }
  })

  it('refuses any drop while a video is being saved, and names the stop the save has', () => {
    const problem = dropProblem([mp4], accept, 'saving')
    expect(problem).toContain('being saved')
    expect(problem).not.toContain('Cancel')
    expect(problem).toContain('Stop the save')
  })

  it('refuses a drop before the start-up check has settled (VH-110)', () => {
    expect(dropProblem([mp4], accept, 'starting')).toContain('getting ready')
  })

  it('refuses any drop in a browser the start-up check blocked (VH-110)', () => {
    const problem = dropProblem([mp4], accept, 'unavailable')
    expect(problem).toContain('cannot run the tool')
    // The start-up message sits under the drop zone, not above it (VH-124).
    expect(problem).toContain('below')
  })
})

describe('refusalEnded (VH-239)', () => {
  const causes = ['making', 'saving', 'starting', 'unavailable'] as const

  it('holds while the page is still busy with what the drop was refused for', () => {
    for (const cause of causes) expect(refusalEnded(cause, cause)).toBe(false)
  })

  it('ends when the page is no longer busy with it', () => {
    for (const cause of causes) expect(refusalEnded(cause, null)).toBe(true)
    // The job finished and its save began; the start-up check settled into a block.
    expect(refusalEnded('making', 'saving')).toBe(true)
    expect(refusalEnded('starting', 'unavailable')).toBe(true)
  })

  it('never ends a refusal for the drop itself, whatever the page goes on to do', () => {
    for (const now of [null, ...causes]) expect(refusalEnded(null, now)).toBe(false)
  })
})

describe('a refusal said, and taken away when its cause ends (VH-239)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  /** A stand-in element: the listeners the zone adds to it, and nothing else. */
  function standIn() {
    const listeners = new Map<string, (event: unknown) => void>()
    return {
      listeners,
      accept,
      files: null,
      textContent: '',
      classList: { toggle: () => false },
      contains: () => true,
      addEventListener(type: string, listener: (event: unknown) => void): void {
        listeners.set(type, listener)
      },
    }
  }

  /** The zone installed on stand-ins, every write to its message logged, and the page's state to move. */
  function zoneFor(busy: DropBusy) {
    vi.stubGlobal('window', standIn())
    const zone = standIn()
    const writes: string[] = []
    const message = {
      said: '',
      get textContent(): string {
        return this.said
      },
      set textContent(text: string) {
        this.said = text
        writes.push(text)
      },
    }
    const state = { busy }
    const refusal = installDropZone({
      zone: zone as unknown as HTMLElement,
      input: standIn() as unknown as HTMLInputElement,
      hint: standIn() as unknown as HTMLElement,
      message: message as unknown as HTMLElement,
      busy: () => state.busy,
    })
    return {
      state,
      refusal,
      message,
      writes,
      drop(files: readonly DroppedFile[]): void {
        zone.listeners.get('drop')?.({
          dataTransfer: { types: ['Files'], files },
          preventDefault: () => {},
        })
      },
    }
  }

  const pdf = { name: 'slides.pdf', type: 'application/pdf' }

  it.each([
    ['making', 'being made'],
    ['saving', 'being saved'],
    ['starting', 'getting ready'],
  ] as const)('a drop refused while %s stays while that holds, and goes when it ends', (cause, words) => {
    const page = zoneFor(cause)
    page.drop([mp4])
    expect(page.message.textContent).toContain(words)

    // The lock is applied for other reasons while the cause holds: Cancel
    // pressed, a change of language. Nothing is written, so the alert is not
    // said a second time.
    page.refusal.settle()
    expect(page.writes).toHaveLength(1)

    page.state.busy = null
    page.refusal.settle()
    expect(page.message.textContent).toBe('')
    // Forgotten, not only emptied: a change of language does not bring it back.
    page.refusal.repaint()
    expect(page.message.textContent).toBe('')
  })

  it('goes when the job finishes into its save, and when start-up settles into a block', () => {
    const made = zoneFor('making')
    made.drop([mp4])
    made.state.busy = 'saving'
    made.refusal.settle()
    expect(made.message.textContent).toBe('')

    const starting = zoneFor('starting')
    starting.drop([mp4])
    starting.state.busy = 'unavailable'
    starting.refusal.settle()
    expect(starting.message.textContent).toBe('')
  })

  it('stays in a browser the start-up check blocked: that cause does not end', () => {
    const page = zoneFor('unavailable')
    page.drop([mp4])
    page.refusal.settle()
    expect(page.message.textContent).toContain('cannot run the tool')
    expect(page.writes).toHaveLength(1)
  })

  it('leaves a refusal for the drop itself through a later job and its end', () => {
    for (const [files, words] of [
      [[mp4, mp4], 'That was 2 files. Drop one video at a time.'],
      [[pdf], dropProblem([pdf], accept, null)],
    ] as const) {
      const page = zoneFor(null)
      page.drop(files)
      expect(page.message.textContent).toBe(words)
      page.refusal.settle()
      page.state.busy = 'making'
      page.refusal.settle()
      page.state.busy = 'saving'
      page.refusal.settle()
      page.state.busy = null
      page.refusal.settle()
      expect(page.message.textContent).toBe(words)
      expect(page.writes).toHaveLength(1)
    }
  })

  it('writes nothing when no refusal is showing', () => {
    const page = zoneFor('making')
    page.state.busy = null
    page.refusal.settle()
    expect(page.writes).toEqual([])
  })
})

describe('the drop zone on the page', () => {
  const zone =
    /<div class="field drop-zone" id="drop-zone">([\s\S]*?)<\/div>/.exec(markup)?.[1] ?? ''

  it('holds the picker, which stays the primary route', () => {
    expect(zone).toContain('type="file"')
    expect(zone).toContain('id="file-input"')
    expect(zone.indexOf('id="file-input"')).toBeLessThan(zone.indexOf('id="drop-hint"'))
  })

  it('says a refusal where it is announced and tied to the picker', () => {
    expect(zone).toMatch(/<p class="field-error drop-error" id="drop-error" role="alert"><\/p>/)
    expect(zone).toContain('aria-describedby="drop-error"')
  })

  it('invites the drop in words', () => {
    expect(zone).toContain('Or drop it here.')
  })
})

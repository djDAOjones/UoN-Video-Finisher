/**
 * A refused preview, said true to the steps on the page (VH-236).
 *
 * Stand-ins for the page: an announcer whose children are stand-in text
 * nodes, each write and in-place deletion logged with the text it leaves,
 * and step 1's line beside it, which the refusal must leave alone. Each
 * order step 1's block and the preview's `error` can come in is forced and
 * its sequence of the announcer's text asserted, in all three languages.
 * The text in Chrome is walked (VH-236's table).
 */

import { describe, expect, it } from 'vitest'

import { enGB } from '../i18n/en-GB'
import { msMY } from '../i18n/ms-MY'
import { zhHans } from '../i18n/zh-Hans'
import { createPreviewRefusal, firstSentence, type SaidNode } from './preview-refusal'

/** Each table's message, the first sentence kept byte for byte, and the sentence removed with the gap before it. */
const tables = [
  {
    table: enGB,
    first: 'A preview is not available for this file.',
    removed: ' You can still set the times.',
  },
  { table: zhHans, first: '此文件没有预览功能。', removed: '您仍然可以设置时间。' },
  {
    table: msMY,
    first: 'Pratonton tidak tersedia untuk fail ini.',
    removed: ' Anda masih boleh menetapkan masa.',
  },
] as const

class StandInText implements SaidNode {
  constructor(
    public data: string,
    private readonly log: string[],
    private readonly region: StandInAnnouncer,
  ) {}
  deleteData(offset: number, count: number): void {
    this.data = this.data.slice(0, offset) + this.data.slice(offset + count)
    this.log.push(`delete ${offset}+${count}`)
    this.region.sequence.push(this.region.text())
  }
}

class StandInAnnouncer {
  childNodes: StandInText[] = []
  readonly sequence: string[] = ['']
  readonly log: string[] = []
  text(): string {
    return this.childNodes.map((node) => node.data).join('')
  }
  replaceChildren(...nodes: StandInText[]): void {
    this.childNodes = nodes
    this.log.push(nodes.length === 0 ? 'empty' : `write ${nodes.map((node) => node.data).join('')}`)
    this.sequence.push(this.text())
  }
  /** Another sentence said through `announce`: a fresh node of its own. */
  announce(text: string): void {
    this.replaceChildren(new StandInText(text, this.log, this))
  }
}

/** A page at a file's read, the trim offered and the preview not yet refused. */
function pageFor(words: string, locale: string) {
  const announcer = new StandInAnnouncer()
  const state = { trimOffered: true, refused: false, words, sourceStatus: 'Video read. No sound.' }
  const refusal = createPreviewRefusal({
    announcer,
    textNode: (text) => new StandInText(text, announcer.log, announcer),
    trimOffered: () => state.trimOffered,
    refused: () => state.refused,
    words: () => state.words,
    locale: () => locale,
  })
  return {
    announcer,
    state,
    refusal,
    /** The preview's `error`, as the handler meets it: the note shown, then the refusal said. */
    previewError(): void {
      state.refused = true
      refusal.said()
    },
    /** Step 1's block: the setup steps withdrawn unless it is one they resolve, its line set, then the check. */
    block(recoverable: boolean): void {
      state.trimOffered = recoverable
      state.sourceStatus = ''
      refusal.trimWithdrawn()
    },
  }
}

describe.each(tables)('a refused preview in $table.meta.locale (VH-236)', ({ table, first, removed }) => {
  const full = table.trim.noPreview
  const locale = table.meta.locale

  it('keeps the first sentence byte for byte and removes only the second', () => {
    expect(full).toBe(first + removed)
    expect(firstSentence(full, locale)).toBe(first)
    expect([...new Intl.Segmenter(locale, { granularity: 'sentence' }).segment(full)]).toHaveLength(2)
  })

  it('error, then a block that withdraws the trim: both sentences, then the first, in the same node', () => {
    const page = pageFor(full, locale)
    page.previewError()
    const node = page.announcer.childNodes[0]
    page.block(false)
    expect(page.announcer.sequence).toEqual(['', full, first])
    expect(page.announcer.log).toEqual([`write ${full}`, `delete ${first.length}+${removed.length}`])
    expect(page.announcer.childNodes).toEqual([node])
    expect(page.state.sourceStatus).toBe('')
  })

  it('a block that withdraws the trim, then the error: the first sentence alone', () => {
    const page = pageFor(full, locale)
    page.block(false)
    page.previewError()
    expect(page.announcer.sequence).toEqual(['', first])
    expect(page.announcer.log).toEqual([`write ${first}`])
  })

  it('a block the setup steps resolve keeps both sentences, in either order', () => {
    const before = pageFor(full, locale)
    before.previewError()
    before.block(true)
    expect(before.announcer.sequence).toEqual(['', full])
    expect(before.announcer.log).toEqual([`write ${full}`])

    const after = pageFor(full, locale)
    after.block(true)
    after.previewError()
    expect(after.announcer.sequence).toEqual(['', full])
    expect(after.announcer.log).toEqual([`write ${full}`])
  })

  it('offered, with no block: both sentences, and step 1\'s line untouched', () => {
    const page = pageFor(full, locale)
    page.previewError()
    expect(page.announcer.sequence).toEqual(['', full])
    expect(page.state.sourceStatus).toBe('Video read. No sound.')
  })

  it('a refusal, then an unreadable file: the first sentence stands, nothing said at the read failure', () => {
    const page = pageFor(full, locale)
    page.previewError()
    page.block(false)
    // The next file: clearTrim('reading') hides the note, then
    // clearTrim('unreadable') withdraws the steps; it writes step 1's line only.
    page.state.refused = false
    page.state.trimOffered = false
    page.state.sourceStatus = 'We could not read this video.'
    page.refusal.trimWithdrawn()
    expect(page.announcer.sequence).toEqual(['', full, first])
    expect(page.announcer.text()).toBe(first)
  })

  it('shortens once: a second block changes nothing', () => {
    const page = pageFor(full, locale)
    page.previewError()
    page.block(false)
    page.block(false)
    expect(page.announcer.log).toEqual([`write ${full}`, `delete ${first.length}+${removed.length}`])
  })

  it('leaves an emptied announcer empty: a change of language between the error and the block', () => {
    const page = pageFor(full, locale)
    page.previewError()
    page.announcer.replaceChildren()
    page.block(false)
    expect(page.announcer.sequence).toEqual(['', full, ''])
  })

  it('leaves another sentence said since alone', () => {
    const page = pageFor(full, locale)
    page.previewError()
    page.announcer.announce('Errors captured.')
    page.block(false)
    expect(page.announcer.sequence).toEqual(['', full, 'Errors captured.'])
  })

  it("does not take an earlier file's words as this file's", () => {
    const page = pageFor(full, locale)
    page.previewError()
    // A new file, whose own preview plays: its note stays hidden.
    page.state.refused = false
    page.block(false)
    expect(page.announcer.sequence).toEqual(['', full])
  })

  it('says nothing at a block when no preview was refused', () => {
    const page = pageFor(full, locale)
    page.state.refused = true
    page.block(false)
    expect(page.announcer.sequence).toEqual([''])
  })
})

describe('the first sentence (VH-236)', () => {
  it('is the whole text where there is one sentence, and trims the space after it', () => {
    expect(firstSentence('One sentence.', 'en-GB')).toBe('One sentence.')
    expect(firstSentence('One. Two.', 'en-GB')).toBe('One.')
  })
})

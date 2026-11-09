/**
 * A refused preview, said true to the steps on the page (VH-236; Nielsen,
 * "status visible and announced" and "errors say what next").
 *
 * The browser's player and WebCodecs do not accept the same files, so a file
 * can be read and checked without a preview, and the page says so: "A
 * preview is not available for this file. You can still set the times." The
 * second sentence is true while the trim step is on the page. Where step 1
 * refuses the file and withdraws the setup steps, the trim goes with them,
 * and the sentence is false (VH-214.2; the owner's "Yes, all six", point 6:
 * drop that sentence when step 1 refuses, removing words only).
 *
 * So the refusal is said in two moments, chosen from the steps' state:
 * - on the preview's `error`, a fresh text node in the page's announcer, as
 *   `announce` writes one: both sentences while the trim is offered, the
 *   first alone once it has been withdrawn;
 * - after step 1's block, if the trim is withdrawn, this file's preview was
 *   refused and the node said then is still the announcer's only child with
 *   both sentences in it, the second sentence and the gap before it are
 *   deleted from that node in place. No fresh node is written: the change
 *   is to the text of the node already there. What a screen reader says of
 *   it is not shown here; a speech reading is a person's to make.
 *
 * Nothing is written where the trim stays (a block the setup steps resolve,
 * or no block), and nothing over another sentence said since, an emptied
 * region (a change of language) or an earlier file's words. The first
 * sentence is the first sentence segment of the message in its own
 * language, trailing space trimmed: no word is added anywhere. Pure but for
 * the objects it is given, so the rule is tested in Node with stand-ins; the
 * announcer's text is walked in Chrome.
 */

/** A text node the refusal wrote, as it shortens it in place. */
export interface SaidNode {
  readonly data: string
  deleteData(offset: number, count: number): void
}

/** The page's announcer, as the refusal writes a fresh node into it and reads its children back. */
export interface RefusalAnnouncer<N extends SaidNode> {
  readonly childNodes: ArrayLike<unknown>
  replaceChildren(node: N): void
}

/** What the refusal reads from the page and writes to it. */
export interface PreviewRefusalPage<N extends SaidNode> {
  readonly announcer: RefusalAnnouncer<N>
  /** A fresh text node holding `text`. */
  textNode(text: string): N
  /** Whether the trim step is on the page. */
  trimOffered(): boolean
  /** Whether this file's preview has been refused: its note is shown, and every new file hides it. */
  refused(): boolean
  /** The refusal's message in the current language, both sentences. */
  words(): string
  /** The current language's `Intl` locale. */
  locale(): string
}

/** The two moments the refusal is said in. */
export interface PreviewRefusal {
  /** On the preview's `error`: both sentences while the trim is offered, the first alone once withdrawn. */
  said(): void
  /** After step 1's block: the second sentence taken from the words said, if the trim has gone. */
  trimWithdrawn(): void
}

/** `text`'s first sentence in `locale`, trailing white space trimmed. */
export function firstSentence(text: string, locale: string): string {
  const first = new Intl.Segmenter(locale, { granularity: 'sentence' }).segment(text)[Symbol.iterator]().next()
  return first.done === true ? text : first.value.segment.trimEnd()
}

export function createPreviewRefusal<N extends SaidNode>(page: PreviewRefusalPage<N>): PreviewRefusal {
  /** The node the last refusal wrote, and the words it held. */
  let said: { readonly node: N; readonly full: string; readonly first: string } | null = null
  return {
    said() {
      const full = page.words()
      const first = firstSentence(full, page.locale())
      const node = page.textNode(page.trimOffered() ? full : first)
      page.announcer.replaceChildren(node)
      said = { node, full, first }
    },
    trimWithdrawn() {
      if (said === null || page.trimOffered() || !page.refused()) return
      const { node, full, first } = said
      const children = page.announcer.childNodes
      if (children.length !== 1 || children[0] !== node) return
      if (node.data !== full || first.length >= full.length) return
      node.deleteData(first.length, full.length - first.length)
    },
  }
}

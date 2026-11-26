/**
 * A status line brought whole into view inside its own scrolling dialogue
 * when it is set (VH-232; Nielsen, "status visible and announced").
 *
 * The feedback dialogue's status is the form's last child, after the
 * actions, and the dialogue scrolls (`overflow: auto`, at most the window
 * less its margins). Where the content is taller than that, a new status
 * lands below the visible area, and the part that says what to do next is
 * never seen. This moves the dialogue's own `scrollTop` by the least
 * vertical distance that brings the status's whole box into its client
 * area, keeping the dialogue's end padding below it: nothing else scrolls,
 * focus is not touched, and the text, role and live region stay as they
 * are, so it is announced as before. Where the status is already wholly in
 * view, nothing moves. A status taller than the visible area has its start
 * aligned with the top, the rest reached by scrolling, as any long content.
 * Focus wins: where a control inside the dialogue holds focus, the scroll
 * stops where that control and its ring would leave the client area, so a
 * window too small for both (the actions stacked at a 400% zoom) keeps the
 * control just pressed in view and shows as much of the status as fits.
 * Pure but for the elements it is given, so the rule is tested in Node with
 * stand-ins; the scroll, the keys and the announcement are walked in Chrome.
 */

/** A box in the window's coordinates, as `getBoundingClientRect()` gives it. */
export interface Box {
  readonly top: number
  readonly bottom: number
}

/** The status line, as the reveal reads it. */
export interface RevealedStatus {
  readonly isConnected: boolean
  readonly textContent: string | null
  getBoundingClientRect(): Box
}

/** The scrolling dialogue, as the reveal reads and moves it. */
export interface ScrollingDialog {
  readonly open: boolean
  readonly isConnected: boolean
  /** The top border's width: the client area starts below it. */
  readonly clientTop: number
  readonly clientHeight: number
  readonly scrollHeight: number
  scrollTop: number
  getBoundingClientRect(): Box
}

/** A control holding focus, as the reveal keeps it in view. */
export interface FocusedControl {
  getBoundingClientRect(): Box
}

/** The focused control's box and how far its ring reaches outside it. */
export interface KeptFocus {
  readonly box: Box
  readonly ring: number
}

/** A computed style's outline, as `getComputedStyle()` gives it. */
export interface Outline {
  readonly outlineWidth: string
  readonly outlineOffset: string
}

/**
 * How far a focus ring reaches outside its control's box: the outline's
 * width and offset, 0 where they do not parse or the ring sits inside.
 */
export function outlineReach(style: Outline): number {
  const reach = parseFloat(style.outlineWidth) + parseFloat(style.outlineOffset)
  return Number.isFinite(reach) ? Math.max(0, reach) : 0
}

/**
 * The control holding focus inside `dialog`, with its ring's reach, or
 * null where focus is outside it, on the dialogue itself or on nothing.
 * Reading where focus is moves nothing.
 */
export function focusInside<T extends FocusedControl>(
  dialog: { contains(other: NoInfer<T>): boolean },
  active: T | null,
  ringOf: (control: T) => number,
): KeptFocus | null {
  if (active === null || (active as unknown) === dialog || !dialog.contains(active)) return null
  return { box: active.getBoundingClientRect(), ring: ringOf(active) }
}

/**
 * Brings `status` whole into `dialog`'s client area by the least vertical
 * scroll of `dialog` alone, if the dialogue is open and the status says
 * something.
 *
 * @param status - The status line, already holding its new text.
 * @param dialog - Its nearest scrolling ancestor, the dialogue.
 * @param endRoom - The room kept below a revealed status: the dialogue's
 *   own end padding, read from its computed style by the caller.
 * @param focus - The control holding focus inside the dialogue, from
 *   `focusInside`, or null: the scroll never takes it or its ring out of
 *   the client area, where it fits there.
 * @returns The distance scrolled, 0 where nothing moved.
 */
export function revealStatus(
  status: RevealedStatus,
  dialog: ScrollingDialog,
  endRoom: number,
  focus: KeptFocus | null = null,
): number {
  if (
    !dialog.open ||
    !dialog.isConnected ||
    !status.isConnected ||
    (status.textContent ?? '') === ''
  )
    return 0
  const top = dialog.getBoundingClientRect().top + dialog.clientTop
  const bottom = top + dialog.clientHeight
  const box = status.getBoundingClientRect()
  if (box.top >= top && box.bottom <= bottom) return 0
  // Clipped above, or taller than the visible area: its start at the top.
  // Clipped below: its end above the room kept, but never its start above
  // the top, so a repeated call settles and never swings back.
  const room = Number.isFinite(endRoom) ? Math.max(0, endRoom) : 0
  const wanted =
    box.top < top ? box.top - top : Math.min(box.bottom - (bottom - room), box.top - top)
  const range = Math.max(0, dialog.scrollHeight - dialog.clientHeight)
  const before = dialog.scrollTop
  let target = before + wanted
  if (focus !== null) {
    // The scrollTops that keep the focused control and its ring wholly in
    // the client area; the nearest to the status's reveal is taken. A
    // control too tall for the client area leaves the reveal as it is.
    const ring = Number.isFinite(focus.ring) ? Math.max(0, focus.ring) : 0
    const lowest = before + (focus.box.bottom + ring - bottom)
    const highest = before + (focus.box.top - ring - top)
    if (lowest <= highest) target = Math.min(highest, Math.max(lowest, target))
  }
  const after = Math.min(range, Math.max(0, target))
  if (after === before) return 0
  dialog.scrollTop = after
  return dialog.scrollTop - before
}

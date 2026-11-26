/**
 * Copy's result written only into the dialogue's opening that started it
 * (VH-235; the owner's "Yes, all six", 2026-11-08, point 4; Nielsen,
 * "status visible and announced").
 *
 * Copy message and details writes its result when the clipboard answers,
 * which may be after the dialogue has changed: after Close, after Escape
 * (the browser's own close), or after a close and reopen. A result from an
 * opening that has gone belongs to no one on screen: written into the closed
 * dialogue it is emptied, unread, by the next opening; written into the next
 * opening it says "Copied" where nothing was copied. So a result is written
 * only while the dialogue is open AND its opening is the one captured when
 * Copy was pressed. Each half is needed: the opening alone would still write
 * into a closed dialogue (the `close` event comes later, in a task of its
 * own), and `open` alone into a reopened one. An opening is a fresh symbol,
 * so nothing is counted and nothing can wrap. A failed copy is still logged
 * whichever opening is on screen, since closing the dialogue does not undo
 * it. Pure but for what it is given, so it is tested in Node with stand-ins;
 * the dialogue, the keys and the live region are walked in Chrome.
 */

/** The dialogue, as the guard reads it: only whether it is open now. */
export interface OpenDialog {
  readonly open: boolean
}

/** One dialogue's openings, so a late result can tell whether its own is still on screen. */
export interface FeedbackOpening {
  /** A new opening has begun: called once the dialogue has opened. Anything begun earlier is now late. */
  begin(): void
  /** The opening on screen now, as a check that answers later whether it still is, and still open. */
  capture(): () => boolean
}

/** The openings of `dialog`, none yet: a capture before the first opening never writes. */
export function createFeedbackOpening(dialog: OpenDialog): FeedbackOpening {
  let current: symbol | null = null
  return {
    begin() {
      current = Symbol('feedback opening')
    },
    capture() {
      const mine = current
      return () => dialog.open && mine !== null && mine === current
    },
  }
}

/** What a settled Copy may do: write its result, or report a failure. */
export interface CopyOutcome {
  /** Writes "Copied" into the status. */
  copied(): void
  /** Writes "Could not copy" into the status. */
  couldNotCopy(): void
  /** Logs a failure; called whichever opening is on screen. */
  warn(cause: unknown): void
}

/**
 * Settles one Copy into the opening that started it. The shape is the
 * handler's own: `copy` is called at once, inside the guard, so a clipboard
 * that throws at the call fails as before, and a throw from the success write
 * falls to the failure, as before; the failure is logged first, then written
 * only if `here()` still holds.
 */
export async function settleCopy(copy: () => Promise<void>, here: () => boolean, on: CopyOutcome): Promise<void> {
  try {
    await copy()
    if (here()) on.copied()
  } catch (cause) {
    on.warn(cause)
    if (here()) on.couldNotCopy()
  }
}

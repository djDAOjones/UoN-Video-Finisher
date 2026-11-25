/**
 * An element kept no shorter than it stands, while what it shows is
 * withdrawn to be drawn again (VH-240, analyst A's A-01; UI-STANDARDS,
 * "Loading states must preserve layout stability").
 *
 * A change to the trim or the output withdraws step 6's verdict, estimate,
 * sound notes and Create for the device check that follows, and VH-124's
 * rule is that none of them stands above "Checking…". Withdrawn, they took
 * their height with them: the step shrank to its status line and grew back
 * inside a second, the footer rose and fell under the control just used,
 * and a page scrolled to its foot bounced. This holds the SPACE only: the
 * element's own rendered height, measured as the hold is taken, becomes its
 * inline `min-height`, and is taken off again when what the check found has
 * been painted. Nothing withdrawn is kept, shown or exposed.
 *
 * The hold is the inline style and nothing else, so there is no second
 * record of it to fall out of step: a hold already standing keeps its
 * height, because the element measured again would give the held height,
 * not what it showed, and a change arriving mid-check must neither grow the
 * hold nor lose it. Pure but for the element it is given, so the rule is
 * tested in Node with a stand-in; the heights are read in Chrome.
 *
 * VH-243 adds a hold on a PLACE beside it, for what stands below the
 * withdrawn content inside the element held: see `createPlaceHold`.
 */

/** The element held, as the hold reads and writes it. */
export interface HeldElement {
  /** Its border box: with `box-sizing: border-box`, the height `min-height` sets. */
  getBoundingClientRect(): { readonly height: number }
  readonly style: { minHeight: string }
}

/** A hold on one element's height. */
export interface HeightHold {
  /**
   * Keeps the element at least as tall as it is now, until `release`. Taken
   * BEFORE its content is withdrawn. A hold already standing is left as it
   * is.
   */
  hold(): void
  /** Lets the element be as tall as what it now shows. Nothing to undo where no hold stands. */
  release(): void
}

/**
 * A hold for `element`'s height.
 *
 * @param element - The smallest element whose height keeps the layout
 *   around it still. Its `min-height` must be no one else's: the release
 *   takes the inline value off whole.
 */
export function createHeightHold(element: HeldElement): HeightHold {
  return {
    hold(): void {
      if (element.style.minHeight !== '') return
      element.style.minHeight = `${element.getBoundingClientRect().height}px`
    },
    release(): void {
      element.style.minHeight = ''
    },
  }
}

/** A hold on where an element stands, while what is above it is withdrawn. */
export interface PlaceHold {
  /**
   * Notes where the element stands now. Taken BEFORE anything above it is
   * withdrawn. A hold already standing keeps the place it noted; with
   * nothing to keep still, it notes nothing and the rest does nothing.
   */
  hold(): void
  /**
   * Opens in the spacer the room the withdrawal left short, so the element
   * stands where it stood. Called once what takes the withdrawn content's
   * place has been painted, and again whenever that is painted again.
   */
  settle(): void
  /** Lets the element stand where what is above it now puts it. */
  release(): void
}

/**
 * A hold on an element's place below `spacer` (VH-243, analyst D's D-02).
 *
 * With a finished video's card standing in step 6 under the verdict, the
 * step's own hold keeps the step's height and no more: the verdict leaves
 * from above the card, so the card, its player and "Save the video" rose by
 * the verdict's height and fell back at each check, and the room opened at
 * the step's foot. This keeps the room where it was taken from. What a check
 * puts in the verdict's place, its line and its stop, is not known until it
 * is painted, so the hold is in two parts: the place is noted before the
 * withdrawal, and the spacer is then made as tall as puts the element back.
 * As the height's hold, it keeps SPACE only.
 *
 * @param spacer - An element above the kept one that the withdrawal leaves
 *   short or empty. Its `min-height` must be no one else's.
 * @param place - Where the kept element stands, measured from a point the
 *   withdrawal does not move, in px; `null` when there is nothing to keep
 *   still.
 */
export function createPlaceHold(spacer: HeldElement, place: () => number | null): PlaceHold {
  let noted: number | null = null
  /** How far above its noted place the element stands, or `null` with nothing to keep. */
  const short = (): number | null => {
    const now = place()
    return noted === null || now === null ? null : noted - now
  }
  return {
    hold(): void {
      if (noted === null) noted = place()
    },
    settle(): void {
      if (noted === null) return
      // From what the spacer shows, not from an earlier settling: the line
      // beside it may have been painted again since.
      spacer.style.minHeight = ''
      const first = short()
      // Where it stood or lower: more arrived than left, and no room is owed.
      if (first === null || first <= 0) return
      const shown = spacer.getBoundingClientRect().height
      spacer.style.minHeight = `${shown + first}px`
      // Measured again: an empty spacer lets its neighbours' margins meet
      // through it, and one given height parts them.
      const second = short()
      if (second !== null && second !== 0) spacer.style.minHeight = `${shown + first + second}px`
    },
    release(): void {
      noted = null
      spacer.style.minHeight = ''
    },
  }
}

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

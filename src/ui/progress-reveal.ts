/**
 * A job's progress brought into the window as it arrives (VH-243, analyst
 * E's E-02; UI-STANDARDS, "Every async action must show status").
 *
 * Pressing Create takes the verdict off the page, hands focus to Cancel,
 * and a moment later the first report puts the bar and its stage line on
 * the page ABOVE Cancel. On a phone the browser keeps what was in the
 * window where it was, so the bar arrived above the window's top edge: the
 * student was left looking at Cancel and the footer, with no sign that
 * anything had started. This says how far to scroll, once and at once, so
 * the bar and its line are wholly in the window: the least distance that
 * does it, Cancel and its focus ring kept in the window too where the window
 * can hold both. Where the bar and its line are already in the window,
 * nothing moves. Pure, so the rule is tested in Node; the scroll itself is
 * read in Chrome.
 */

import type { Box } from './reveal-status'

/**
 * How far to scroll the page, in px, positive downwards, so `progress` is
 * wholly in the window; 0 where it already is.
 *
 * @param progress - The bar and its stage line as one box, in the window's
 *   coordinates.
 * @param cancel - Cancel's box, or `null` when it is not on the page.
 * @param windowHeight - The window's height in px.
 * @param inset - The room kept between a revealed box and the window's
 *   edge: the root's `scroll-padding-block`, which holds a focus ring.
 */
export function progressRevealScroll(
  progress: Box,
  cancel: Box | null,
  windowHeight: number,
  inset: number,
): number {
  if (progress.top >= 0 && progress.bottom <= windowHeight) return 0
  const room = Number.isFinite(inset) ? Math.max(0, inset) : 0
  const top = room
  const bottom = windowHeight - room
  const both: Box =
    cancel === null
      ? progress
      : {
          top: Math.min(progress.top, cancel.top),
          bottom: Math.max(progress.bottom, cancel.bottom),
        }
  // The progress alone where the window cannot hold both: it is what says
  // the job has started.
  const shown = both.bottom - both.top <= bottom - top ? both : progress
  // Its start at the top where it is cut off above, or is taller than the
  // window; otherwise its end at the bottom.
  if (shown.top < top || shown.bottom - shown.top > bottom - top) return shown.top - top
  return Math.max(0, shown.bottom - bottom)
}

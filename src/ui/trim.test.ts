/**
 * The trim step's words and numbers (VH-96).
 *
 * The invariants: a typed time is read exactly or refused, never guessed; the
 * page accepts precisely the ranges the worker does; and the handles move by
 * a known step and never past the other handle's limit.
 */

import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { KEPT_MIN_SECONDS } from '../config/trim'
import { setLanguage } from '../i18n'
import {
  formatTrimTime,
  parseTrimTime,
  trimHandleText,
  trimKeyTarget,
  trimProblemText,
  trimRangeFor,
  trimFieldTextOnLeave,
  trimFieldValue,
  trimStatusOwed,
  trimSummary,
  type TrimProblem,
} from './trim'

/** A result with its problem in words, as the page shows it beside the field. */
function said(result: object): object {
  return 'problem' in result ? { problem: trimProblemText(result.problem as TrimProblem) } : result
}

describe('times in the fields', () => {
  it.each([
    [0, '0:00.0'],
    [5.04, '0:05.0'],
    [75.46, '1:15.5'],
    [599.96, '10:00.0'],
    [3723.4, '1:02:03.4'],
  ])('shows %s s as %s', (seconds, text) => {
    expect(formatTrimTime(seconds)).toBe(text)
  })

  it.each([
    ['75', 75],
    [' 75.5 ', 75.5],
    ['1:15', 75],
    ['1:15.5', 75.5],
    ['1:02:03.4', 3723.4],
    ['0:00', 0],
  ])('reads %j as %s s', (text, seconds) => {
    expect(parseTrimTime(text)).toBeCloseTo(seconds, 9)
  })

  it.each(['', 'abc', '1:75', '-5', '1.5:00', '1:2:3:4', '1:', ':30', '1,5'])(
    'refuses %j rather than guessing',
    (text) => {
      expect(parseTrimTime(text)).toBeNull()
    },
  )

  it.each([
    ['３', 3],
    ['０：０５', 5],
    ['0：25', 25],
    ['1：05．5', 65.5],
    ['１：０２：０３．４', 3723.4],
    ['　７５　', 75],
  ])('reads %j, as a Chinese keyboard types it, as %s s (VH-243, E-03)', (text, seconds) => {
    // Full-width digits, colon and full stop read on screen as the form the
    // helper asks for; the student ID numbers' box already folds them.
    expect(parseTrimTime(text)).toBeCloseTo(seconds, 9)
  })

  it.each([
    ['1：05。5', 65.5],
    ['１：０５。５', 65.5],
    ['５。５', 5.5],
    ['65。5', 65.5],
    ['1:05｡5', 65.5],
    ['１：０２：０３。４', 3723.4],
  ])('reads %j, its decimal point typed in Chinese punctuation, as %s s (VH-243)', (text, seconds) => {
    // The ideographic full stop is the key the full-width `．` is on, in the
    // keyboard's other punctuation mode, and NFKC folds only the latter:
    // `1：05．5` was read and `1：05。5` refused. Its half-width form too.
    expect(parseTrimTime(text)).toBeCloseTo(seconds, 9)
  })

  it.each(['。', '｡', '1。2。3', '1。', '。5', '1。5：00', '1：05。', '1。.5', '1、5', '1·5'])(
    'still refuses %j: an ideographic full stop is a decimal point and nothing more (VH-243)',
    (text) => {
      // Read as `.`, so refused exactly where the Latin form is: `.`,
      // `1.2.3`, `1.`, `.5`, `1.5:00`. No other mark is taken for a point.
      expect(parseTrimTime(text)).toBeNull()
      const latin = text.replaceAll('。', '.').replaceAll('｡', '.').replaceAll('：', ':')
      expect(parseTrimTime(latin)).toBeNull()
    },
  )

  it.each([
    'ａｂｃ',
    '１：７５',
    '－５',
    '-５',
    '１．５：００',
    '１：２：３：４',
    '0：0：0：5',
    '１：',
    '：３０',
    '１，５',
    '1、5',
    '1。2。3',
    '٣',
    '三',
  ])('still refuses %j once folded (VH-243, E-03)', (text) => {
    // The fold changes the width of what was typed, never what counts as a
    // time: letters, a third colon, a minus, a comma, a second decimal point
    // and digits of another script are refused as their Latin forms are.
    // (`1：05。5` stood here, refused, with the same reasoning; its Latin
    // form `1:05.5` is the helper's own example, and it is now read.)
    expect(parseTrimTime(text)).toBeNull()
  })

  it('accepts both examples the helper gives, as typed (VH-113)', () => {
    // The helper's examples are the parser's contract: a phone's decimal
    // keyboard can type the second, not the first.
    expect(parseTrimTime('1:05.5')).toBeCloseTo(65.5, 9)
    expect(parseTrimTime('65.5')).toBeCloseTo(65.5, 9)
  })

  it('reads back what it shows', () => {
    for (const seconds of [0, 12.3, 59.9, 61, 3599.9, 3600]) {
      expect(parseTrimTime(formatTrimTime(seconds))).toBeCloseTo(seconds, 6)
    }
  })
})

describe('a typed time for one end', () => {
  it('is the time when it is one, inside the video', () => {
    expect(said(trimFieldValue('1:40', 'end', 130))).toEqual({ seconds: 100 })
  })

  it('refuses what is not a time', () => {
    expect(said(trimFieldValue('abc', 'start', 130))).toEqual({
      problem: 'Write the start time as minutes and seconds, like 1:05.5, or as seconds, like 65.5.',
    })
  })

  it('takes back the end exactly as the field showed it', () => {
    // Codex review: a 130.46 s video's end reads "2:10.5", and typing that
    // back was refused as past the end.
    expect(formatTrimTime(130.46)).toBe('2:10.5')
    expect(said(trimFieldValue('2:10.5', 'end', 130.46))).toEqual({ seconds: 130.46 })
  })

  it('refuses a time past the end that is not the end as shown', () => {
    // Codex review: a rounding allowance let "2:10.44" through on a 130.4 s
    // video, and moved it to the end.
    expect(said(trimFieldValue('2:10.44', 'end', 130.4))).toEqual({
      problem: 'The end time is after the end of the video, which is 2:10.4 long.',
    })
  })

  it('refuses a time past the end of the video rather than quietly moving it', () => {
    // Codex review of VH-96: "3:00" on a 2:10 video became the file's end,
    // and the page said the whole video was kept beside a field saying 3:00.
    expect(said(trimFieldValue('3:00', 'end', 130.4))).toEqual({
      problem: 'The end time is after the end of the video, which is 2:10.4 long.',
    })
  })
})

describe('whether a range can be used', () => {
  it('is the whole video when nothing is cut, so no range is sent', () => {
    expect(said(trimRangeFor(0, 130, 130))).toEqual({ range: null })
  })

  it('is a range when an end is cut', () => {
    expect(said(trimRangeFor(12.3, 130, 130))).toEqual({ range: { startSeconds: 12.3, endSeconds: 130 } })
  })

  it('says why, in the worker’s own words, when it cannot be used', () => {
    expect(said(trimRangeFor(50, 40, 130))).toEqual({ problem: 'The end must come after the start.' })
    expect(said(trimRangeFor(50, 50 + KEPT_MIN_SECONDS - 1, 130))).toEqual({
      problem: `Keep at least ${KEPT_MIN_SECONDS} seconds of the video.`,
    })
  })
})

describe('what the step says', () => {
  it('says the whole video is kept when it is', () => {
    expect(trimSummary(null, 130)).toBe('Keeping the whole video, 2 minutes 10 seconds.')
  })

  it('says how much of how much is kept', () => {
    expect(trimSummary({ startSeconds: 12, endSeconds: 124 }, 130)).toBe(
      'Keeping 1 minute 52 seconds of 2 minutes 10 seconds.',
    )
  })

  // VH-231: a cut file's read length is not its whole, so it is never the
  // whole video, nor what the part kept is out of; only the length kept.
  it('says only the length kept for a file said cut short, trimmed or not', () => {
    expect(trimSummary(null, 20, true)).toBe('Keeping 20 seconds.')
    expect(trimSummary({ startSeconds: 5, endSeconds: 20 }, 20, true)).toBe('Keeping 15 seconds.')
    expect(trimSummary({ startSeconds: 0, endSeconds: 4 }, 5, true)).toBe('Keeping 4 seconds.')
  })

  it('keeps both lines for a whole file, trimmed or not', () => {
    expect(trimSummary(null, 20, false)).toBe('Keeping the whole video, 20 seconds.')
    expect(trimSummary({ startSeconds: 5, endSeconds: 20 }, 20, false)).toBe(
      'Keeping 15 seconds of 20 seconds.',
    )
  })

  it.each([
    ['zh-Hans', '保留 15秒钟。'],
    ['ms-MY', 'Menyimpan 15 saat.'],
  ] as const)('says it in %s in the owner’s approved words', (tag, line) => {
    setLanguage(tag)
    try {
      expect(trimSummary({ startSeconds: 5, endSeconds: 20 }, 20, true)).toBe(line)
    } finally {
      setLanguage('en-GB')
    }
  })

  it('gives each handle a place in words', () => {
    expect(trimHandleText(0, 130)).toBe('the beginning')
    expect(trimHandleText(130, 130)).toBe('the end')
    expect(trimHandleText(65, 130)).toBe('1 minute 5 seconds')
  })
})

describe('the handles on the keyboard', () => {
  const bounds = { min: 0, max: 127 }
  const duration = 130

  it('moves one second per arrow and ten per page on a short video', () => {
    expect(trimKeyTarget('ArrowRight', 10, bounds, duration)).toBe(11)
    expect(trimKeyTarget('ArrowUp', 10, bounds, duration)).toBe(11)
    expect(trimKeyTarget('ArrowLeft', 10, bounds, duration)).toBe(9)
    expect(trimKeyTarget('ArrowDown', 10, bounds, duration)).toBe(9)
    expect(trimKeyTarget('PageUp', 10, bounds, duration)).toBe(20)
    expect(trimKeyTarget('PageDown', 10, bounds, duration)).toBe(0)
  })

  it('pages by 1% of a long video, and still one second per arrow', () => {
    const hour = { min: 0, max: 3597 }
    expect(trimKeyTarget('PageUp', 1800, hour, 3600)).toBe(1836)
    expect(trimKeyTarget('PageDown', 1800, hour, 3600)).toBe(1764)
    expect(trimKeyTarget('ArrowRight', 1800, hour, 3600)).toBe(1801)
    expect(trimKeyTarget('ArrowLeft', 1800, hour, 3600)).toBe(1799)
  })

  it('pages by ten seconds up to a video of a thousand, then by 1%', () => {
    const wide = { min: 0, max: 5000 }
    expect(trimKeyTarget('PageUp', 100, wide, 999)).toBe(110)
    expect(trimKeyTarget('PageUp', 100, wide, 1000)).toBe(110)
    expect(trimKeyTarget('PageUp', 100, wide, 2000)).toBe(120)
  })

  it('goes to either limit on Home and End, and never past one', () => {
    expect(trimKeyTarget('Home', 50, bounds, duration)).toBe(0)
    expect(trimKeyTarget('End', 50, bounds, duration)).toBe(127)
    expect(trimKeyTarget('ArrowRight', 126.5, bounds, duration)).toBe(127)
    expect(trimKeyTarget('PageDown', 3, bounds, duration)).toBe(0)
  })

  it("stops a long video's page at either limit", () => {
    const end = { min: 3, max: 3600 }
    expect(trimKeyTarget('PageUp', 3580, end, 3600)).toBe(3600)
    expect(trimKeyTarget('PageDown', 20, end, 3600)).toBe(3)
    expect(trimKeyTarget('Home', 1800, end, 3600)).toBe(3)
    expect(trimKeyTarget('End', 1800, end, 3600)).toBe(3600)
  })

  it('leaves every other key to the browser', () => {
    expect(trimKeyTarget('Tab', 10, bounds, duration)).toBeNull()
    expect(trimKeyTarget('a', 10, bounds, duration)).toBeNull()
  })
})

describe('whether a commit says its status sentence (VH-243)', () => {
  const correct = 'Correct the start and end times in step 2 to continue.'
  const checking = 'Checking this video against your device…'

  it('says a new sentence, whatever committed the change', () => {
    expect(trimStatusOwed('handle', '', correct)).toBe(true)
    expect(trimStatusOwed('handle', checking, correct)).toBe(true)
    expect(trimStatusOwed('given', '', correct)).toBe(true)
    expect(trimStatusOwed('given', checking, correct)).toBe(true)
  })

  it('does not say again, for a handle’s key or drag, the sentence the line holds (regression: C-06)', () => {
    expect(trimStatusOwed('handle', correct, correct)).toBe(false)
    expect(trimStatusOwed('handle', checking, checking)).toBe(false)
  })

  it('says again, for a time given outright, the sentence the line holds (regression: the review of VH-239)', () => {
    // Start and End both refused, End put right: the sentence is unchanged,
    // and Create is still withheld.
    expect(trimStatusOwed('given', correct, correct)).toBe(true)
    expect(trimStatusOwed('given', checking, checking)).toBe(true)
  })

  it('says a sentence into a line that holds no text at all', () => {
    expect(trimStatusOwed('handle', null, correct)).toBe(true)
    expect(trimStatusOwed('given', null, correct)).toBe(true)
  })
})

describe('trimFieldTextOnLeave (VH-246, F-04)', () => {
  it.each([
    ['０：２０', 'end', 20, '0:20.0'],
    ['３', 'start', 3, '0:03.0'],
    ['2', 'start', 2, '0:02.0'],
    ['1:05.5', 'end', 65.5, '1:05.5'],
  ] as const)('rewrites %j, taken as %s %s s, as %j', (text, which, taken, shown) => {
    const expected = shown === text ? null : shown
    expect(trimFieldTextOnLeave(text, which, 90, taken)).toBe(expected)
  })

  it('leaves a refused time for the person to correct', () => {
    expect(trimFieldTextOnLeave('abc', 'start', 30, 0)).toBeNull()
    expect(trimFieldTextOnLeave('0:45', 'end', 30, 30)).toBeNull()
  })

  it('never replaces a draft that is not the time taken', () => {
    expect(trimFieldTextOnLeave('0:07', 'start', 30, 3)).toBeNull()
  })

  it('is wired to each field leaving focus, after the field is taken', () => {
    const main = readFileSync(new URL('../main.ts', import.meta.url), 'utf8')
    expect(main).toMatch(/field\.addEventListener\('focusout', \(\) => \{\n\s+if \(trimNotice !== null\) return\n\s+const text = trimFieldTextOnLeave\(/)
  })
})


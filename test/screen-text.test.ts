/**
 * What the static page says, held to the things it must agree with.
 *
 * `index.html` is markup, not a module, so nothing type-checks its words
 * against the config that names the same things. The suite runs in Node with
 * no DOM; the page is read as text, with comments, scripts and tags removed so
 * only what a person would read is left.
 */

import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import {
  CLOSING_COLOURS,
  CLOSING_CONTROL_DEFAULTS,
  CLOSING_ONSETS,
  CLOSING_TYPES,
} from '../src/config/branding'
import {
  CREATORS_TEAM_URL,
  FEEDBACK_ADDRESS,
  FEEDBACK_FORM_URL,
  FEEDBACK_SUBJECT,
  SELF_SERVICE_URL,
} from '../src/config/feedback'
import { PRESETS, type PresetId } from '../src/config/presets'
import { DEFAULT_VIDEO_KIND, VIDEO_KINDS } from '../src/config/video-kind'
import { enGB } from '../src/i18n/en-GB'
import { closingTypeLabel, onsetDisabledReason } from '../src/ui/closing-choice'

/**
 * The page's English, with the table bindings (VH-105) taken out: a
 * `data-i18n` attribute names where a string comes from, not what it says,
 * and the words between the tags are still the no-script English.
 */
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8').replace(
  /\s+data-i18n(?:-attr)?="[^"]*"/g,
  '',
)

/** The markup with comments gone, so prose about a rule cannot satisfy a test for it. */
const markup = html.replace(/<!--[\s\S]*?-->/g, '')

/** What is read on screen: no head, no scripts, no tags, whitespace collapsed. */
const visibleText = markup
  .replace(/<head>[\s\S]*?<\/head>/, '')
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')

describe('the promises and the privacy line behind a "?" beside the title (VH-229)', () => {
  const page = markup.replace(/<!--[\s\S]*?-->/g, '')
  const row = /<div class="page-title-row">([\s\S]*?)<\/div>/.exec(page)?.[1] ?? ''
  const button = /<button[^>]*id="about-help-button"[^>]*>/.exec(row)?.[0] ?? ''
  const panelStart = page.indexOf('<div class="lede" id="about-help" hidden>')
  const panel = page.slice(panelStart, page.indexOf('id="browser-note"'))
  const source = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
  const wiring = /function wireAboutHelp\([\s\S]*?\n\}\n/.exec(source)?.[0] ?? ''

  it('puts one named "?" beside the title and outside its heading', () => {
    expect(row).toMatch(/<\/h1>\s*<button/)
    expect(/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(row)?.[1]).toBe('UoN Video Finisher')
    expect(button).toContain('type="button"')
    expect(button).toContain('aria-label="About this tool"')
    expect(button).toContain('aria-expanded="false"')
    expect(button).toContain('aria-controls="about-help"')
    expect(page.indexOf('id="about-help-button"')).toBeLessThan(page.indexOf('id="file-input"'))
  })

  it('holds the five promises then the privacy line in one panel, closed in the markup', () => {
    expect(panelStart).toBeGreaterThan(-1)
    expect(panel.indexOf('class="promises"')).toBeGreaterThan(-1)
    expect(panel.indexOf('class="promises"')).toBeLessThan(panel.indexOf('never uploaded'))
    expect(panel).toContain('id="format-help-button"')
  })

  it('keeps the browser note outside the panel, before step 1', () => {
    expect(panel).not.toContain('id="browser-note"')
    expect(page.indexOf('id="about-help"')).toBeLessThan(page.indexOf('id="browser-note"'))
    expect(page.indexOf('id="browser-note"')).toBeLessThan(page.indexOf('id="step-choose"'))
  })

  it('closes only by a press or Escape: no focus or click listener, nothing remembered', () => {
    expect(wiring).not.toBe('')
    expect(wiring).not.toContain('focusin')
    expect(wiring).not.toMatch(/addEventListener\('click', \(event\)/)
    expect(wiring).not.toContain('Storage')
    expect(wiring).toContain('event.repeat')
    expect(wiring).toContain('tips.some((tip) => !tip.hidden)')
    expect(wiring).toContain('escapeFocusesButton(document.activeElement, document.body, button, panel)')
  })

  it('hears Escape before the tips do, so an open tip takes it first', () => {
    const about = source.indexOf('wireAboutHelp(aboutHelpButton, aboutHelp, [onsetHelp, formatHelp])')
    expect(about).toBeGreaterThan(-1)
    expect(about).toBeLessThan(source.indexOf('wireToggletip(onsetHelpButton, onsetHelp)'))
    expect(about).toBeLessThan(source.indexOf('wireToggletip(formatHelpButton, formatHelp)'))
  })
})

describe('the privacy promise (VH-85)', () => {
  it('is on the page, in the words the maintainer asked for', () => {
    expect(visibleText).toContain(
      'Your video is processed on your device, it is never uploaded, and the original file does not change.',
    )
  })

  it('is said once', () => {
    // One press away (spec 9.2, VH-229); saying it twice was a second sentence
    // to skim, not a second reassurance.
    expect(visibleText.match(/never uploaded/g)).toHaveLength(1)
  })

  it('comes before the file input it is about', () => {
    expect(markup.indexOf('never uploaded')).toBeLessThan(markup.indexOf('id="file-input"'))
  })
})

describe('what the tool does, and where it works (2026-09-30)', () => {
  // Up to the list's end: the fourth promise holds a toggletip's own divs (VH-196).
  const promises = /<ul class="promises">([\s\S]*?<\/ul>)/.exec(markup)?.[1] ?? ''

  it('lists the five things it does, in the maintainer\'s words', () => {
    // A promise's own words are the item's first text: the fourth's sit in a
    // span before its "?" (VH-196).
    const items = [...promises.matchAll(/<li\b[^>]*>\s*(?:<span[^>]*>)?([^<]+)</g)].map((match) =>
      match[1]!.trim(),
    )
    // Each a line a person reads as a line: a capital and a full stop
    // (VH-124); the words are the maintainer's (VH-85, VH-187, VH-196), with
    // no lead-in sentence above them.
    expect(items).toEqual([
      'Lets you trim unwanted footage from the start and end.',
      'Adds opening and closing graphics.',
      'Evens out the audio level for better audience experience.',
      'Saves in a reliable format.',
      'Makes the file the right size for your purpose.',
    ])
    const before = markup.slice(0, markup.indexOf('<ul class="promises">'))
    expect(before).not.toMatch(/<p[^>]*>[^<]*:\s*<\/p>\s*(?:<!--[\s\S]*?-->\s*)*$/)
  })

  it('explains the format behind a "?" beside the fourth promise, disclosed only when asked', () => {
    // The owner's own request (VH-196): a toggletip as the onset one is, a
    // button that says what it is about and which text it opens, the text
    // hidden until it is pressed, in a polite live region.
    const fourth = /<li class="promise-with-help">([\s\S]*?)<\/li>/.exec(promises)?.[1] ?? ''
    const button = /<button([^>]*)>/.exec(fourth)?.[1] ?? ''
    expect(button).toMatch(/type="button"/)
    expect(button).toMatch(/aria-label="About the video format"/)
    expect(button).toMatch(/aria-expanded="false"/)
    expect(button).toMatch(/aria-controls="format-help"/)
    expect(fourth).toMatch(/aria-live="polite">\s*<div class="toggletip" id="format-help" hidden>/)
    expect(fourth.replace(/\s+/g, ' ')).toContain(
      'Videos come in many formats. Some play on one device but not another, or do not work with some apps. This tool saves your video as an MP4, the most interoperable video format. That means it plays on almost any phone, computer or website.',
    )
  })

  it('has a place to say which browser it is built for, shown only when a check has not passed', () => {
    // The answer to "does it work in Edge, Firefox and Safari": it is built
    // and tested for Chrome, and says so, rather than let another browser
    // fail part-way through a job. Since VH-187 the sentence is written only
    // when a load-time check fails or warns (`browserNote`): while they run,
    // step 1 says so, and a pass is the System check's to say. So the page
    // starts with the place empty and hidden, above the file input.
    expect(markup).toMatch(/<p id="browser-note" hidden><\/p>/)
    expect(markup.indexOf('id="browser-note"')).toBeLessThan(markup.indexOf('id="file-input"'))
    expect(visibleText).not.toContain('designed and built for Chrome')
  })
})

describe('the output choice (VH-85)', () => {
  /** The name shown beside one preset's radio. */
  function shownName(id: PresetId): string | undefined {
    const pattern = new RegExp(
      `name="preset"\\s+value="${id}"[^>]*>\\s*<span class="radio-label">\\s*<span>([^<]+)</span>`,
    )
    return pattern.exec(markup)?.[1]?.trim()
  }

  it.each(Object.keys(PRESETS) as PresetId[])('names "%s" as the config does', (id) => {
    // The label is duplicated by necessity — the page is static — and a
    // diagnostics line that names a setting the screen never offered is how a
    // support conversation goes wrong.
    expect(shownName(id)).toBe(PRESETS[id].label)
  })

  it('asks the question in the agreed words', () => {
    // Seen as the step's heading; named again, for assistive technology only,
    // as the legend of the radio group it heads (VH-91).
    expect(visibleText).toContain('File size / quality')
    expect(markup).toMatch(/<legend class="visually-hidden">File size \/ quality<\/legend>/)
  })
})

describe('captions, not subtitles (VH-86)', () => {
  it('never says "subtitle" on the static page', () => {
    expect(visibleText).not.toMatch(/subtitle/i)
  })

  it('offers no caption file field', () => {
    // Withdrawn with spec 8.3 step 2. One file input: the video.
    expect(markup.match(/type="file"/g)).toHaveLength(1)
  })
})

describe('the status line (VH-88)', () => {
  const systemCheck = /<details[^>]*id="system-check"[\s\S]*?<\/details>/.exec(markup)?.[0] ?? ''

  it('is a live region', () => {
    expect(markup).toMatch(/<p class="status" id="status" role="status" aria-live="polite">/)
  })

  it('is not inside the System check disclosure', () => {
    // That panel starts closed, and a live region inside a closed <details> is
    // neither seen nor announced — which would silence "Reading the video…",
    // every stage, and "Your video is ready."
    expect(systemCheck).not.toBe('')
    expect(systemCheck).not.toContain('id="status"')
  })

  it('sits with the controls it reports on, above the System check', () => {
    // Under the verdict and above what it reports on — the bar, the outcome,
    // Create (VH-124) — and never down in the footer.
    const status = markup.indexOf('id="status"')
    expect(status).toBeGreaterThan(markup.indexOf('id="preflight-report"'))
    expect(status).toBeLessThan(markup.indexOf('id="process-progress"'))
    expect(status).toBeLessThan(markup.indexOf('id="process-result"'))
    expect(status).toBeLessThan(markup.indexOf('id="system-check"'))
  })

  it('is never hidden in the markup', () => {
    expect(markup).not.toMatch(/id="status"[^>]*\shidden/)
  })
})

describe('a sentence for a screen reader alone (VH-149)', () => {
  const mainSource = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
  const showError = /function showError\([^)]*\): void \{([\s\S]*?)\n\}/.exec(mainSource)?.[1] ?? ''
  const previewError = /trimPreview\.addEventListener\('error', \(\) => \{([\s\S]*?)\n\}\)/.exec(mainSource)?.[1] ?? ''

  it('is a polite live region on the page in every state, outside every step and the errors panel', () => {
    expect(markup).toContain('<p class="visually-hidden" id="page-announcer" role="status" aria-live="polite"></p>')
    const announcer = markup.indexOf('id="page-announcer"')
    expect(announcer).toBeGreaterThan(markup.lastIndexOf('</section>', markup.indexOf('id="errors-panel"')))
    expect(announcer).toBeLessThan(markup.indexOf('id="errors-panel"'))
  })

  it("says Errors captured once, as it appears, and leaves step 1's line its words", () => {
    // The worker that never answers: settleStartup writes the block's reason
    // to step 1's line, then its error reaches showError, which emptied it.
    expect(showError).toContain('if (errorsPanel.hidden) announce(() => t().errors.revealed)')
    expect(showError).not.toMatch(/setSourceStatus|setSourceReadStatus|sourceStatusLine/)
  })

  it('says a refused preview without emptying "Video read." and its "No sound."', () => {
    // VH-236: through the refusal's own helper, into the page's announcer,
    // with the refusal's words and the steps' state, its note shown first.
    expect(previewError).toContain('if (!previewUrl) return')
    expect(previewError).toMatch(/trimPreviewNote\.hidden = false\n(?:\s*\/\/[^\n]*\n)*\s*previewRefusal\.said\(\)\n/)
    expect(previewError.match(/previewRefusal\.said\(\)/g)).toHaveLength(1)
    expect(previewError).not.toMatch(/announce\(|pageAnnouncer/)
    expect(previewError).not.toMatch(/setSourceStatus|setSourceReadStatus|sourceStatusLine/)
    const page = /const previewRefusal = createPreviewRefusal<CharacterData>\(\{([\s\S]*?)\n\}\)/.exec(mainSource)?.[1] ?? ''
    expect(page).toContain('announcer: pageAnnouncer,')
    expect(page).toContain('textNode: (text) => document.createTextNode(text),')
    expect(page).toContain('trimOffered: () => !laterSteps[0]!.hidden,')
    expect(page).toContain('refused: () => !trimPreviewNote.hidden,')
    expect(page).toContain('words: () => t().trim.noPreview,')
    expect(page).toContain('locale,')
    expect(mainSource).toContain("const laterSteps = ['#step-trim',")
  })

  it("takes the refused preview's second sentence back where step 1's block withdraws the trim (VH-236)", () => {
    // After the steps are withdrawn and the block's line set, before either
    // exception's way out; only here, nowhere else in the page.
    expect(mainSource).toMatch(
      /revealLaterSteps\(shown\)\n(?:\s*\/\/[^\n]*\n)*\s*setSourceStatus\('', \(\) => preflightAnnouncement\(summary, context\)\.spokenOnly\)\n(?:\s*\/\/[^\n]*\n)*\s*previewRefusal\.trimWithdrawn\(\)\n\s*if \(recoverable\) \{/,
    )
    expect(mainSource.match(/previewRefusal\.trimWithdrawn\(\)/g)).toHaveLength(1)
    expect(mainSource.match(/previewRefusal\.said\(\)/g)).toHaveLength(1)
  })
})

describe('the save\'s own line (VH-135)', () => {
  const mainSource = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
  /** Every message a save writes, as the script names it. */
  const saveMessages = [
    'saving',
    'stoppingSave',
    'saveStopped',
    'notSaved',
    'refusedSource',
    'saved',
  ]

  it('is a live region of its own, never hidden in the markup', () => {
    expect(markup).toMatch(/<p class="status status--save" id="save-status" role="status" aria-live="polite">/)
    expect(markup).not.toMatch(/id="save-status"[^>]*\shidden/)
  })

  it('writes every save message there, and none on the job\'s line', () => {
    // A previous video can be saving while the next file is checked: on one
    // line, the verdict replaced "Saving…" and "Saved." replaced the verdict.
    for (const message of saveMessages) {
      expect(mainSource).toMatch(new RegExp(`setSaveStatus\\(\\(\\) =>[^;]*t\\(\\)\\.status\\.${message}\\b`))
      expect(mainSource).not.toMatch(new RegExp(`\\bsetStatus\\([^;]*t\\(\\)\\.status\\.${message}\\b`))
    }
    // VH-153: a failed save is said from its own two rows, one per sentence.
    expect(mainSource).toContain(
      "setSaveStatus('', () => `${t().status.saveFailedWhat}${sentenceGap()}${t().status.saveFailedNext}`)",
    )
    // VH-141 took saveFailed out of the list above and with it this half
    // (VH-149): spoken on the save's line, never on the job's.
    expect(mainSource).not.toMatch(/\bsetStatus\([^;]*t\(\)\.status\.saveFailed/)
    expect(mainSource).toMatch(/setSaveStatus\(\(\) =>\s*downloadStatusText\(/)
    expect(mainSource).not.toMatch(/\bsetStatus\([^;]*downloadStatusText\(/)
  })

  it('keeps Stop saving under the save\'s line, not in the check\'s row', () => {
    expect(mainSource).toContain('saveActions.append(stopSaveButton)')
    expect(mainSource).toContain('stopActions.append(stopCheckButton, checkAgainButton)\n')
  })

  it('goes with the result it describes', () => {
    // Its words are about one video; a new job or a new file clearing the
    // result takes them too, and nothing else empties the result.
    expect(mainSource).not.toMatch(/\bclear\(processResult\)(?![\s\S]{0,40}clear\(saveStatusLine\))/)
    expect(/function clearResult\(\): void \{\s*clear\(processResult\)\s*clear\(saveStatusLine\)/.test(mainSource)).toBe(true)
  })
})

describe('the job\'s state (VH-150)', () => {
  const mainSource = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
  /** The body of one top-level function in the script, whatever it returns. */
  const body = (name: string): string =>
    new RegExp(`function ${name}\\([^)]*\\): [^{]+\\{([\\s\\S]*?)\\n\\}`).exec(mainSource)?.[1] ?? ''

  it('offers no Show progress control: the owner withdrew it, and Announce progress stays, remembered', () => {
    expect(markup).not.toMatch(/show-progress|Show progress/)
    expect(mainSource).not.toMatch(/showProgress|show-progress|syncProgressVisibility/)
    expect(Object.keys(enGB.create)).not.toContain('showProgress')
    expect(Object.keys(enGB.create)).not.toContain('showProgressHelp')
    expect(markup).toMatch(/<input type="checkbox" id="announce-progress" checked/)
    expect(mainSource).toContain('announceProgressBox.checked = readAnnounceProgress(localStore)')
    expect(mainSource).toContain('writeAnnounceProgress(localStore, announceProgressBox.checked)')
  })

  it('moves nothing once Cancel is pressed or a failure shows: the report is dropped first', () => {
    // VH-141's V-14, WCAG 2.2.2: a report in flight must not restart the bar.
    expect(body('onStage')).toMatch(/^(\s*\/\/[^\n]*)*\s*if \(cancelRequested \|\| jobEnding\) return\n/)
    expect(body('onStage')).not.toContain('!cancelRequested')
    expect(body('onStage')).toContain("setTitle('stage')")
  })

  it('starts every job on an empty bar, never the last job\'s figure', () => {
    expect(body('beginJob')).toMatch(/progressMemo = NO_PROGRESS\s*resetProgress\(\)/)
    const reset = body('resetProgress')
    expect(reset).toContain('processProgress.value = 0')
    expect(reset).toContain("processProgressText.textContent = ''")
    expect(reset).toContain("processTimeLeft.textContent = ''")
    expect(reset).toContain('lastProgress = null')
  })

  it('regression: withdraws "The job is stopping" once the worker has settled', () => {
    const settledThen = /await settled\(id\)([\s\S]*?)\n {4}\}\)/.exec(mainSource)?.[1] ?? ''
    expect(settledThen).toMatch(/setStatus\('', \(\) => t\(\)\.status\.couldNotCreate\(/)
    expect(settledThen).not.toContain('stoppingAfterFailure')
  })

  it('keeps Save the one primary button when an unreadable file is chosen beside a result', () => {
    expect(body('clearTrim')).toContain("if (!resultStanding) fileInput.classList.remove('file-input--chosen')")
    expect(mainSource.match(/classList\.remove\('file-input--chosen'\)/g)).toHaveLength(1)
  })

  it('keeps a result\'s lifetime and warnings across a redraw', () => {
    const result = body('renderResult')
    // A downloaded result put back says "until the next video", not "until you save it".
    expect(result).toContain("let lifetimeOf: 'unsaved' | 'delivered' = kept.delivered ? 'delivered' : 'unsaved'")
    // Painted from the retained result, so "Keep it" and a language change keep them.
    expect(result).toMatch(/const paint = \(\): void => \{[\s\S]*renderWarnings\(resultWarnings, kept\.warnings,/)
  })

  it('regression: puts a result\'s warnings in its notification as content, before the player and Save, never a notification nested in it, and without "None of these stop you continuing"', () => {
    const result = body('renderResult')
    // After the card's lines, before the player, the lifetime line and Save (V-52, VH-208).
    const warningsAt = result.indexOf('heading.append(resultWarnings)')
    expect(warningsAt).toBeGreaterThan(result.indexOf("const heading = notification({ kind: 'success'"))
    expect(warningsAt).toBeLessThan(result.indexOf('heading.append(resultPlayerFor('))
    expect(warningsAt).toBeLessThan(result.indexOf('actions.append(save)'))
    expect(result).toContain('processResult.replaceChildren(heading)')
    expect(result).not.toContain('processResult.replaceChildren(heading, resultWarnings)')
    // One rail (VH-150): drawn content-only, never a notification of their own inside the card.
    expect(result).toMatch(/heading: t\(\)\.warnings\.finishedHeading,\s*reassure: false,\s*contentOnly: true,/)
    const warningSource = readFileSync(new URL('../src/ui/warning-text.ts', import.meta.url), 'utf8')
    const draw = /export function renderWarnings\([\s\S]*?\n\}/.exec(warningSource)?.[0] ?? ''
    expect(draw).toMatch(/if \(options\.contentOnly === true\) \{\s*box\.className = 'result-warnings'\s*delete box\.dataset\['kind'\]\s*\}/)
    expect(draw).not.toMatch(/result-warnings[^']*notification|notification[^']*result-warnings/)
  })

  it('clears a failed save\'s notification with any later save message', () => {
    expect(body('setSaveStatus')).toMatch(/^\s*clear\(saveError\)/)
  })

  it('regression: says a block that holds after a re-check without "Video read." first', () => {
    // Its parameter list holds a `() => boolean`, which `body` cannot step over.
    const preflight = /async function runPreflight\([\s\S]*?\n\}\n/.exec(mainSource)?.[0] ?? ''
    expect(body('withdrawVerdict')).not.toContain('setSourceReadStatus')
    expect(body('withdrawVerdict')).toContain('readLineOwed = true')
    expect(preflight).not.toContain('sourceBlock.childElementCount')
    // The block takes step 1's line, and the debt with it.
    expect(preflight).toMatch(/withdrawVerdict\(\)\s*readLineOwed = false\s*show\(sourceBlock/)
    // Anything else that settles the check pays it back, once.
    expect(body('payReadLine')).toMatch(/if \(readLineOwed && inspectedReport\) setSourceReadStatus\(inspectedReport\)\s*readLineOwed = false/)
    expect(preflight.match(/payReadLine\(\)/g)).toHaveLength(4)
  })

  it('regression: hands focus from each Set button to its own time field', () => {
    const previewError = /trimPreview\.addEventListener\('error', \(\) => \{([\s\S]*?)\n\}\)/.exec(mainSource)?.[1] ?? ''
    expect(previewError).toContain('document.activeElement === trimSetEnd ? trimEndField : trimStartField')
    expect(previewError).toContain('fromPreview(field)')
  })
})

describe('the discard question\'s spoken words (VH-135)', () => {
  const mainSource = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
  /** The body of one top-level function in the script. */
  const body = (name: string): string => new RegExp(`function ${name}\\([^)]*\\): void \\{([\\s\\S]*?)\\n\\}`).exec(mainSource)?.[1] ?? ''

  it('are marked as the status line\'s when the question is asked', () => {
    expect(mainSource).toMatch(/setStatus\('', \(\) => t\(\)\.discard\.spoken\([^\n]*\n\s*statusAsksDiscard = true/)
  })

  it('are forgotten by anything else the line says', () => {
    expect(body('setStatus')).toMatch(/^\s*statusAsksDiscard = false/)
  })

  it('go when the question does: withdrawn by a change, or answered Keep it', () => {
    // Spoken-only words linger unseen: a screen-reader user browsing the page
    // could still find "Starting again will discard it." after it had gone.
    expect(body('unsayDiscardQuestion')).toMatch(/if \(statusAsksDiscard\) setStatus\(''\)/)
    expect(body('withdrawDiscardQuestion')).toContain('unsayDiscardQuestion()')
    expect(mainSource).toMatch(/const fromKeep = focusHeldBy\(\[keep\]\)\s*unsayDiscardQuestion\(\)/)
  })
})

describe('the System check panel (VH-88)', () => {
  it('keeps a level-two heading, inside its summary', () => {
    // A <details> has no heading of its own. Without one the panel drops out
    // of the list a screen-reader user navigates by — even when a failure has
    // opened it.
    expect(markup).toMatch(
      /<details[^>]*id="system-check"[^>]*>\s*<summary[^>]*>\s*<h2 id="system-check-summary">System check/,
    )
  })

  it('starts closed', () => {
    expect(markup).not.toMatch(/<details[^>]*id="system-check"[^>]*\sopen/)
  })
})

describe('the accessibility statement (VH-130)', () => {
  const statement =
    /<details[^>]*id="accessibility-statement"[\s\S]*?<\/details>/.exec(markup)?.[0] ?? ''
  const footer = /<footer[\s\S]*?<\/footer>/.exec(markup)?.[0] ?? ''

  it('keeps a level-two heading inside its summary, as the System check does', () => {
    expect(statement).toMatch(
      /^<details[^>]*>\s*<summary class="disclosure-summary">\s*<h2[^>]*>Accessibility statement<\/h2>/,
    )
  })

  it('starts closed', () => {
    expect(markup).not.toMatch(/<details[^>]*id="accessibility-statement"[^>]*\sopen/)
  })

  it('sits in the footer, beside the System check and above the feedback button', () => {
    expect(footer).toContain(statement)
    expect(footer.indexOf('id="accessibility-statement"')).toBeGreaterThan(
      footer.indexOf('id="system-check"'),
    )
    expect(footer.indexOf('id="accessibility-statement"')).toBeLessThan(
      footer.indexOf('id="feedback-open"'),
    )
  })

  it('follows the model statement’s sections, each under a level-three heading', () => {
    const subheadings = [...statement.matchAll(/<h3>([^<]+)<\/h3>/g)].map((match) => match[1])
    expect(subheadings).toEqual([
      'How accessible this tool is',
      'Feedback and contact',
      'Enforcement procedure',
      'Compliance status',
      'How we tested this tool',
      'What we plan to test next',
      'About this statement',
    ])
  })

  it('writes its lists as lists, one item per line of the table', () => {
    const lists = [...statement.matchAll(/<ul>([\s\S]*?)<\/ul>/g)].map(
      (match) => match[1]!.match(/<li>/g)?.length ?? 0,
    )
    expect(lists).toEqual([
      enGB.statement.abilities.length,
      enGB.statement.limits.items.length,
      enGB.statement.plans.items.length,
      enGB.statement.plans.optionalItems.length,
    ])
  })

  it('leaves a place for each sentence the script paints with a link or a date', () => {
    for (const id of ['statement-contact', 'statement-enforcement', 'statement-wave', 'statement-about']) {
      expect(statement).toContain(`<p id="${id}"></p>`)
    }
  })
})

describe('the footer\'s routes, grouped by need (VH-130, VH-182)', () => {
  const footer = /<footer[\s\S]*?<\/footer>/.exec(markup)?.[0] ?? ''
  const mainSource = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
  /** Any email address written out, as a literal would be. */
  const anAddress = /[\w.%+-]+@[\w-]+(?:\.[\w-]+)+/
  const escape = (text: string): string => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const link = (id: string, words: string): string =>
    `<a class="footer-contact-link" id="${id}">${escape(words)}</a>`

  it('reads as one heading, then three questions, each over its own routes, above the version', () => {
    // The sheet's VH-182 rows, in order: help (staff first), a problem, an opinion.
    const { heading, groups, contact, feedbackForm } = enGB.footer
    expect(footer).toMatch(
      new RegExp(
        [
          '<div class="footer-help">',
          `<h2>${escape(heading)}</h2>`,
          `<h3>${escape(groups.help)}</h3>`,
          '<ul class="footer-help-list">',
          '<li>',
          link('contact-creators', contact.creators),
          '</li>',
          '<li>',
          link('contact-self-service', contact.selfService),
          '</li>',
          '</ul>',
          `<h3>${escape(groups.problem)}</h3>`,
          '<p class="feedback-entry">',
          '<button type="button" class="button button--secondary" id="feedback-open">',
          escape(enGB.feedback.open),
          '</button>',
          '</p>',
          `<h3>${escape(groups.opinion)}</h3>`,
          '<p class="feedback-form-entry">',
          link('feedback-form-link', feedbackForm),
          '</p>',
          '</div>',
          '<p class="version" id="version-line">',
        ].join('\\s*'),
      ),
    )
    expect(heading).toBe('Help and feedback')
    expect(groups).toEqual({
      help: 'Need help using the tool?',
      problem: 'Something not working?',
      opinion: 'What do you think of the tool?',
    })
    expect(contact).toEqual({
      creators: 'Staff: ask in the Creators team on Teams (new tab)',
      selfService: 'Students: get help through Self Service (new tab)',
    })
    expect(enGB.feedback.open).toBe('Report a problem')
    expect(enGB.feedback.heading).toBe('Report a problem')
  })

  it('adds no landmark and no email link: the learning content team is reached by Report a problem', () => {
    expect(footer).not.toMatch(/<section|<nav|<aside|\srole=|aria-label/)
    expect(footer).not.toContain('mailto:')
    expect(footer).not.toContain('contact-learning-content')
    expect(mainSource).not.toContain('learningContentLink')
  })

  it('takes each address from config, never from the page or the script', () => {
    // The script sets each `href` from config/feedback.ts; a literal address
    // in either file would be a second copy to forget when a team's arrives.
    expect(html).not.toMatch(anAddress)
    expect(mainSource).not.toMatch(anAddress)
    expect(html).not.toContain('selfservice.nottingham.ac.uk')
    expect(mainSource).not.toContain('selfservice.nottingham.ac.uk')
    expect(mainSource).toContain('creatorsLink.href = CREATORS_TEAM_URL\n')
    expect(mainSource).toContain('selfServiceLink.href = SELF_SERVICE_URL\n')
  })

  it('uses the owner’s destinations: problem reports to the learning content team (VH-148, VH-182)', () => {
    // The whole address the hand-off gave, not only its host (VH-153).
    expect(CREATORS_TEAM_URL).toBe(
      'https://teams.microsoft.com/l/team/19%3A14c7a4d2bf43456fa0c3c52c851fb097%40thread.tacv2/conversations?groupId=bd942b5f-5389-410c-abf2-9ba087360738&tenantId=67bda7ee-fd80-41ef-ac91-358418290a1e',
    )
    expect(SELF_SERVICE_URL).toBe('https://selfservice.nottingham.ac.uk')
    expect(FEEDBACK_ADDRESS).toBe('UI-Learning-Content@nottingham.ac.uk')
    expect(FEEDBACK_SUBJECT).toBe('UoN Video Finisher problem report')
    for (const name of ['creatorsLink', 'selfServiceLink']) {
      expect(mainSource).toContain(`${name}.target = '_blank'`)
      expect(mainSource).toContain(`${name}.rel = 'noopener noreferrer'`)
    }
    // VH-124’s full-stop rule excludes these links: a link is a label like a button.
    expect(enGB.footer.contact.creators).not.toMatch(/\.$/)
    expect(enGB.footer.contact.selfService).not.toMatch(/\.$/)
  })

  it('names the button by its new name wherever a message points to it', () => {
    const sources = ['../index.html', '../src/i18n/en-GB.ts', '../README.md'].map((path) =>
      readFileSync(new URL(path, import.meta.url), 'utf8'),
    )
    for (const source of sources) expect(source).not.toContain('Send feedback')
    for (const next of [
      enGB.failure.unlevellable.next,
      enGB.failure.encoderRefused.next,
      enGB.failure.checkFailed.next,
      enGB.failure.tryAgain,
      enGB.failure.startup.workerNotStarted,
    ]) {
      expect(next).toContain('the Report a problem button')
    }
  })
})

describe('the closing controls (VH-90)', () => {
  /** One `<select>`'s options, as `[value, text, selected]`. */
  function options(id: string): Array<readonly [string, string, boolean]> {
    const select = new RegExp(`<select[^>]*id="${id}"[^>]*>([\\s\\S]*?)</select>`).exec(markup)?.[1] ?? ''
    return [...select.matchAll(/<option value="([^"]+)"(\s+selected)?>([^<]+)<\/option>/g)].map(
      (match) => [match[1]!, match[3]!.trim(), match[2] !== undefined] as const,
    )
  }

  it('offers every animation type the config knows, under the name the reasons quote', () => {
    const shown = options('closing-type')
    expect(shown.map(([value]) => value)).toEqual([...CLOSING_TYPES])
    for (const [value, text] of shown) {
      expect(text).toBe(closingTypeLabel(value as (typeof CLOSING_TYPES)[number]))
    }
  })

  it('offers every onset the config knows, in the order asked for', () => {
    expect(options('closing-onset').map(([value, text]) => [value, text])).toEqual([
      ['existing', 'The last second of video'],
      ['freeze', 'A held last frame'],
    ])
    expect(options('closing-onset').map(([value]) => value)).toEqual([...CLOSING_ONSETS])
  })

  it('offers both colours as native radios', () => {
    const values = [...markup.matchAll(/type="radio" name="closing-colour" value="([^"]+)"/g)].map(
      (match) => match[1],
    )
    expect(values).toEqual([...CLOSING_COLOURS])
  })

  it('starts on the defaults: Cut, blue', () => {
    // The page is static, so its resting state is a second copy of the
    // default. If they drift, the first job is not the one the screen shows.
    const selected = (id: string) => options(id).find(([, , isSelected]) => isSelected)?.[0]
    expect(selected('closing-type')).toBe(CLOSING_CONTROL_DEFAULTS.type)
    expect(selected('closing-onset')).toBe(CLOSING_CONTROL_DEFAULTS.onset)
    expect(markup).toMatch(
      new RegExp(`name="closing-colour" value="${CLOSING_CONTROL_DEFAULTS.colour}" checked`),
    )
  })

  it('starts with onset disabled and saying why, before any script runs', () => {
    expect(markup).toMatch(/<select[^>]*id="closing-onset"[^>]*\sdisabled/)
    expect(visibleText).toContain(onsetDisabledReason(CLOSING_CONTROL_DEFAULTS.type))
  })

  it('names the "?" and ties it to the text it discloses', () => {
    // A toggletip: a button that discloses, never hover alone. The name says
    // what it is about, because "?" says nothing to a screen reader.
    const button = /<button[^>]*id="onset-help-button"[^>]*>/.exec(markup)?.[0] ?? ''
    expect(button).toContain('type="button"')
    expect(button).toContain('aria-label="About what the graphics play over"')
    expect(button).toContain('aria-expanded="false"')
    expect(button).toContain('aria-controls="onset-help"')
    expect(markup).toMatch(/id="onset-help"[^>]*\shidden/)
  })

  it('keeps all three inside the one fieldset the job lock disables', () => {
    const fieldset =
      /<fieldset[^>]*id="branding-choice"[\s\S]*?<\/fieldset>\s*<\/section>/.exec(markup)?.[0] ?? ''
    for (const id of ['closing-type', 'closing-onset', 'closing-colour', 'onset-help-button']) {
      expect(fieldset).toContain(`id="${id}"`)
    }
  })
})

describe('Staff video or Student submission (VH-131)', () => {
  const fieldset = /<fieldset[^>]*id="video-kind"[\s\S]*?<\/fieldset>/.exec(markup)?.[0] ?? ''

  it('offers both sides as native radios, in the config’s order and words', () => {
    const values = [...fieldset.matchAll(/type="radio" name="video-kind" value="([^"]+)"/g)].map(
      (match) => match[1],
    )
    expect(values).toEqual([...VIDEO_KINDS])
    expect(fieldset).toContain(enGB.videoKind.options.staff)
    expect(fieldset).toContain(enGB.videoKind.options.submission)
  })

  it('gives each face its own words to reserve its bold width from, in every language (VH-135)', () => {
    // The stylesheet reserves the chosen weight from `data-text`; bound to the
    // same message as the face, it follows a change of language.
    const raw = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
    const faces = [...raw.matchAll(/<span class="segment-face" data-i18n="(videoKind\.options\.\w+)"([^>]*)>([^<]+)<\/span>/g)]
    expect(faces).toHaveLength(VIDEO_KINDS.length)
    for (const [, key, attributes, words] of faces) {
      expect(attributes).toContain(`data-text="${words}"`)
      expect(attributes).toContain(`data-i18n-attr="data-text:${key}"`)
    }
  })

  it('starts on the default side, before any script runs', () => {
    expect(fieldset).toMatch(new RegExp(`name="video-kind" value="${DEFAULT_VIDEO_KIND}" checked`))
    expect(fieldset.match(/\schecked/g)).toHaveLength(1)
  })

  it('has a visible label, and ties the line beneath to the group', () => {
    expect(fieldset).toMatch(/<legend class="label">Video type<\/legend>/)
    // The next-video line is the group's too (VH-140), after its own.
    expect(fieldset).toContain('aria-describedby="video-kind-result video-next"')
    expect(fieldset).toContain('id="video-kind-result"')
  })

  it('sits below Step 1, in the owner\'s whole order, one order at every width (VH-216)', () => {
    const order = [
      'class="page-title-row"',
      'class="page-title"',
      'id="about-help-button"',
      'class="lede"',
      'class="promises"',
      'Your video is processed on your device',
      'id="browser-note"',
      'id="step-choose"',
      'id="video-kind"',
      'id="step-trim"',
      'id="step-title"',
      'id="step-closing"',
      'id="step-preset"',
      'id="step-create"',
      'id="page-announcer"',
      'id="errors-panel"',
      'id="dev-actions"',
    ]
    const page = markup.replace(/<!--[\s\S]*?-->/g, '')
    for (const mark of order) expect(page.split(mark).length - 1, mark).toBe(1)
    const places = order.map((mark) => page.indexOf(mark))
    expect(places).toEqual([...places].sort((a, b) => a - b))
    // In `main`, and in no step or fieldset: what a job locks or a file
    // withdraws never takes the promises with it.
    const list = page.indexOf('class="promises"')
    const before = page.slice(0, list)
    expect(list).toBeGreaterThan(page.indexOf('<main'))
    expect(list).toBeLessThan(page.indexOf('</main>'))
    for (const tag of ['section', 'fieldset'])
      expect(before.split(`<${tag}`).length, tag).toBe(before.split(`</${tag}>`).length)
  })

  it('sits outside every fieldset the job lock disables', () => {
    for (const id of ['branding-choice', 'preset-choice']) {
      const locked = new RegExp(`<fieldset[^>]*id="${id}"[\\s\\S]*?<\\/fieldset>`).exec(markup)?.[0] ?? ''
      expect(locked).not.toContain('name="video-kind"')
    }
  })
})

describe('the video’s language (VH-132, VH-191)', () => {
  const fieldset = /<fieldset[^>]*id="video-language"[\s\S]*?<\/fieldset>/.exec(markup)?.[0] ?? ''
  const step = /<section[^>]*id="step-title"[\s\S]*?<\/section>/.exec(markup)?.[0] ?? ''
  const applyLock = /function applyControlLock\(\): void \{([\s\S]*?)\n\}/.exec(
    readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8'),
  )?.[1] ?? ''

  it('has a visible label, and ties its own line beneath to the group', () => {
    expect(fieldset).toMatch(/<legend class="label">Video language<\/legend>/)
    // The next-video line is Video type's alone now (VH-191).
    expect(fieldset).toContain('aria-describedby="video-language-helper"')
    expect(fieldset).not.toContain('video-next')
    expect(fieldset).toContain('id="video-language-helper"')
    expect(fieldset).toContain(enGB.videoLanguage.helper)
  })

  it('sits at the top of step 3, under its heading and before the title card choice', () => {
    expect(step).toContain('id="video-language"')
    expect(markup.indexOf('id="video-language"')).toBeGreaterThan(markup.indexOf('id="title-heading"'))
    expect(markup.indexOf('id="video-language"')).toBeLessThan(markup.indexOf('id="title-card-choice"'))
    // Outside the title card's own group, so it stays in view with the card off.
    const card = /<fieldset[^>]*id="title-card-choice"[\s\S]*?<\/fieldset>/.exec(markup)?.[0] ?? ''
    expect(card).not.toContain('id="video-language"')
  })

  it('locks with step 3 while a video is made or saved', () => {
    expect(applyLock).toContain('titleCardChoice.disabled = locked')
    expect(applyLock).toContain('videoLanguageChoice.disabled = locked')
  })
})

describe('which video a change is for (VH-140, VH-191)', () => {
  const kind = /<fieldset[^>]*id="video-kind"[\s\S]*?<\/fieldset>/.exec(markup)?.[0] ?? ''

  it('has one line under the switch, hidden and empty until a job runs or a result stands', () => {
    expect(kind).toMatch(/<p class="helper" id="video-next" hidden><\/p>/)
    expect(markup.match(/id="video-next"/g)).toHaveLength(1)
    expect(enGB.videoKind.nextVideo).toBe('Changes to the video type apply to the next video you make.')
  })

  it('names the running job beside its progress, not in a live region', () => {
    const line = /<p[^>]*id="process-job"[^>]*>/.exec(markup)?.[0] ?? ''
    expect(line).toContain('hidden')
    expect(line).not.toContain('aria-live')
    expect(markup.indexOf('id="process-job"')).toBeGreaterThan(markup.indexOf('id="process-progress"'))
    expect(markup.indexOf('id="process-job"')).toBeLessThan(markup.indexOf('id="process-result"'))
  })
})

describe('the finished video plays in its card (VH-192)', () => {
  const mainSource = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
  const css = readFileSync(new URL('../src/styles/app.css', import.meta.url), 'utf8')
  const bodyOf = (name: string): string =>
    new RegExp(`function ${name}\\([^)]*\\)(?:: [^{]+)? \\{([\\s\\S]*?)\\n\\}`).exec(mainSource)?.[1] ?? ''
  const player = bodyOf('resultPlayerFor')
  const release = bodyOf('releaseResultPlayer')
  const render = bodyOf('renderResult')

  it('is the browser’s own player, named by the card’s title, loading only its metadata, never autoplaying', () => {
    expect(player).toContain("document.createElement('video')")
    expect(player).toContain('video.controls = true')
    expect(player).toContain("video.preload = 'metadata'")
    expect(player).toContain("setAttribute('aria-labelledby', labelledBy)")
    expect(player).not.toMatch(/autoplay|\.play\(/i)
    expect(render).toContain("resultPlayerFor(kept, title?.id ?? '')")
  })

  it('sits after the card’s lines, before the lifetime line and Save (the owner’s 2A)', () => {
    expect(render).toMatch(/heading\.append\(resultPlayerFor\([^)]*\), lifetime\)/)
    expect(render.indexOf('resultPlayerFor(')).toBeLessThan(render.indexOf('actions.append(save)'))
  })

  it('makes one object URL per job, reused on a re-render, and stops and revokes it on release', () => {
    expect(player).toContain('resultPlayer?.jobId !== kept.jobId')
    // The finished file, never the original it was made from.
    expect(player.match(/URL\.createObjectURL/g)).toHaveLength(1)
    expect(player).toContain('URL.createObjectURL(kept.file)')
    expect(release).toContain('video.pause()')
    expect(release).toContain("video.removeAttribute('src')")
    expect(release).toContain('URL.revokeObjectURL(url)')
  })

  it('leaves with a discarded result, and before a completed save’s clean-up (the owner’s 1A)', () => {
    expect(bodyOf('releaseUnsavedResult')).toMatch(/^\s*releaseResultPlayer\(\)/)
    const completed = render.slice(render.indexOf('saved = true'), render.indexOf("request({ kind: 'discard', jobId }"))
    expect(completed).toContain('releaseResultPlayer()')
    expect(completed).toContain('fromPlayer(heading)')
  })

  it('is drawn as step 2’s player is', () => {
    expect(css).toMatch(/\.trim-preview,\s*\.result-player \{/)
  })
})

describe('Step 3 says its rules before Create (VH-140)', () => {
  const step = /<section[^>]*id="step-title"[\s\S]*?<\/section>/.exec(markup)?.[0] ?? ''
  const submission = /<div id="submission-card-fields"[\s\S]*?<p class="helper" id="submission-card-filled">/.exec(step)?.[0] ?? ''
  const staff = /<div id="title-card-fields"[\s\S]*?<div id="submission-card-fields"/.exec(step)?.[0] ?? ''

  it('has a line under the box for the side’s rule, tied to the box, empty until painted', () => {
    expect(step).toMatch(/<p class="helper" id="title-card-rule" hidden><\/p>/)
    expect(step).toContain('aria-describedby="title-card-reason title-card-rule title-card-empty-error"')
    expect(step.indexOf('id="title-card-rule"')).toBeLessThan(step.indexOf('id="title-card-fields"'))
  })

  it('marks every one of Submission’s four fields required, and none of the staff card’s', () => {
    for (const field of ['assignment', 'module', 'convenor', 'ids']) {
      const control = new RegExp(`<(?:input|textarea)[^>]*id="submission-card-${field}"[^>]*>`).exec(submission)?.[0] ?? ''
      expect(control, field).toContain('aria-required="true"')
    }
    expect(submission.match(/aria-required="true"/g)).toHaveLength(4)
    expect(staff).not.toBe('')
    expect(staff).not.toContain('aria-required')
  })

  it('keeps every per-field error line as it was, beside its field', () => {
    for (const id of ['title', 'department', 'authors', 'date']) expect(step).toContain(`id="title-card-${id}-error"`)
    for (const id of ['assignment', 'module', 'convenor', 'ids']) expect(step).toContain(`id="submission-card-${id}-error"`)
  })
})

describe('steps that read as steps (VH-91)', () => {
  /** Each step panel, in document order: its id, its number, its heading text, whether it starts hidden. */
  const steps = [
    ...markup.matchAll(
      /<section class="panel step" id="([^"]+)" aria-labelledby="([^"]+)"(\s+hidden)?>\s*<h2 id="([^"]+)"><span class="step-number">(\d+)\.<\/span>\s*(?:<span>)?([^<]+)(?:<\/span>)?<\/h2>/g,
    ),
  ].map((match) => ({
    id: match[1]!,
    labelledBy: match[2]!,
    hidden: match[3] !== undefined,
    headingId: match[4]!,
    number: Number(match[5]),
    title: match[6]!.trim(),
  }))

  it('has the six steps, in order', () => {
    // Trim second (VH-96): see the video and choose its ends before deciding
    // how it closes and how big it is. The title card third, in the video's
    // own order (VH-127): it plays before the video, the closing after.
    expect(steps.map((step) => step.title)).toEqual([
      'Choose a video',
      'Trim',
      'Title card',
      'Closing graphics',
      'File size / quality',
      'Create',
    ])
  })

  it('numbers them consecutively from 1, with no gap', () => {
    // A missing "2" reads as a fault. Trim moved every number after it
    // (VH-96); this is what makes sure they all moved.
    expect(steps.map((step) => step.number)).toEqual(steps.map((_, index) => index + 1))
  })

  it('labels each region by its own numbered heading', () => {
    for (const step of steps) expect(step.labelledBy).toBe(step.headingId)
    expect(new Set(steps.map((step) => step.headingId)).size).toBe(steps.length)
  })

  it('shows only the first step until a video has been read', () => {
    expect(steps.map((step) => step.hidden)).toEqual([false, true, true, true, true, true])
  })

  it('never reorders focus away from the visual order', () => {
    // Focus order is document order unless something overrides it, and
    // nothing may.
    expect(markup).not.toMatch(/tabindex="[1-9]/)
  })

  it('keeps everything about the job together in Create, in reading order', () => {
    const create = /<section class="panel step" id="step-create"[\s\S]*?<\/section>/.exec(markup)?.[0] ?? ''
    // The verdict and notes; what is happening now, with its stop and bar;
    // the outcome; then the action that follows it (VH-124).
    const order = [
      'preflight-report',
      'audio-warnings',
      'status',
      'stop-actions',
      'process-progress',
      'process-result',
      'save-status',
      'save-actions',
      'process-actions',
    ]
    const positions = order.map((id) => create.indexOf(`id="${id}"`))
    expect(positions.every((position) => position >= 0)).toBe(true)
    expect(positions).toEqual([...positions].sort((a, b) => a - b))
  })

  it('gives the file its own status line, in the step that is always on the page', () => {
    // Step 4's status line is inside a section that starts hidden, where a
    // live region says nothing. "Reading the video…" and "That file could not
    // be read." happen before that section exists.
    const choose = /<section class="panel step" id="step-choose"[\s\S]*?<\/section>/.exec(markup)?.[0] ?? ''
    expect(choose).toMatch(/<p class="status" id="source-status" role="status" aria-live="polite">/)
    // The heading is the input's one visible label (VH-124): no second
    // "Video file" label, and the accessible name is the heading's words.
    expect(choose).toMatch(/<input[^>]*id="file-input"[^>]*aria-labelledby="choose-heading"/)
    expect(choose).not.toMatch(/<label[^>]*for="file-input"/)
    expect(choose).not.toMatch(/id="source-status"[^>]*\shidden/)
    expect(choose).not.toContain('<details')
    expect(choose.indexOf('id="source-status"')).toBeGreaterThan(choose.indexOf('id="file-input"'))
  })
})

describe('the page frame (VH-92)', () => {
  const header = /<header[\s\S]*?<\/header>/.exec(markup)?.[0] ?? ''
  const footer = /<footer[\s\S]*?<\/footer>/.exec(markup)?.[0] ?? ''

  it('draws both bands as light on Nottingham Blue', () => {
    // `on-brand-blue` is what re-assigns the colour roles. Without it a band
    // would be blue with Nottingham Blue text on it.
    expect(header).toMatch(/class="band band--header on-brand-blue"/)
    expect(footer).toMatch(/class="band band--footer on-brand-blue"/)
  })

  it('heads the page with its name, once, in the content rather than the band', () => {
    // The band holds the logo and the page language; the title lines up with
    // the text beneath it (maintainer, 2026-09-30).
    expect(markup.match(/<h1[\s>]/g)).toHaveLength(1)
    expect(header).not.toContain('<h1')
    expect(markup).toMatch(
      /<main[^>]*>\s*<div class="page-title-row">\s*<h1 class="page-title">UoN Video Finisher<\/h1>/,
    )
  })

  it('puts the page language in the header band and its note above the heading (VH-154)', () => {
    const mainSource = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
    expect(mainSource).toContain("required<HTMLElement>('#brand-header').append(languageSwitcher.fieldset)")
    expect(mainSource).toContain("required<HTMLDivElement>('.page-title-row').before(languageSwitcher.notice)")
    // The skip link still comes before the band, so it passes over the switcher.
    expect(markup.indexOf('class="skip-link on-brand-blue"')).toBeLessThan(markup.indexOf('<header'))
  })

  it('puts System check and the version in the footer', () => {
    expect(footer).toContain('id="system-check"')
    expect(footer).toContain('id="version-line"')
  })

  it('ships no logo file reference in the markup', () => {
    // The logo is inserted by `brand-assets.ts` only when its file exists. A
    // hard-coded <img> would be a broken image until the maintainer adds it.
    expect(markup).not.toMatch(/<img\b/)
  })
})

describe('the trim step (VH-96)', () => {
  const trim = /<section class="panel step" id="step-trim"[\s\S]*?<\/section>/.exec(markup)?.[0] ?? ''

  it('says it is optional and that leaving it keeps the whole video', () => {
    expect(trim).toMatch(/Optional\. Cut unwanted material from the start or the end\. Left alone, the whole video\s+is kept\./)
  })

  it('never makes a handle drag-only: each end has a range input, a time field and a button', () => {
    // WCAG 2.5.7. The range inputs take the arrow keys; the field takes a
    // typed time; the button takes the preview's position.
    for (const id of ['trim-start-range', 'trim-end-range']) {
      expect(trim).toMatch(new RegExp(`<input class="range-input" type="range" id="${id}"`))
    }
    expect(trim).toMatch(/<label class="label" for="trim-start-range">Start<\/label>/)
    expect(trim).toMatch(/<label class="label" for="trim-end-range">End<\/label>/)
    expect(trim).toMatch(/<label class="label" for="trim-start">Start time<\/label>/)
    expect(trim).toMatch(/<label class="label" for="trim-end">End time<\/label>/)
    expect(trim).toMatch(/>\s*Set start here\s*</)
    expect(trim).toMatch(/>\s*Set end here\s*</)
  })

  it('ties the format, its own error and the result to each time field', () => {
    // An error beside the field it concerns (VH-124), not one shared line.
    expect(trim).toContain('aria-describedby="trim-format trim-start-error trim-result"')
    expect(trim).toContain('aria-describedby="trim-format trim-end-error trim-result"')
    expect(trim.indexOf('id="trim-start-error"')).toBeLessThan(trim.indexOf('id="trim-end"'))
  })

  it('ends on its result line, after the reset action', () => {
    expect(trim.indexOf('id="trim-clear"')).toBeLessThan(trim.indexOf('id="trim-result"'))
  })

  it('plays nothing by itself', () => {
    expect(trim).toMatch(/<video[^>]*id="trim-preview"[^>]*controls/)
    expect(trim).not.toMatch(/autoplay/)
  })
})


describe('None’s shared reason (VH-144, pinned by VH-152)', () => {
  it('describes each of the three controls None locks', () => {
    // A control that loses the id loses the reason a screen reader hears.
    for (const id of ['closing-onset', 'closing-colour', 'closing-internal']) {
      const tag = new RegExp(`<[a-z]+\\b[^>]*\\bid="${id}"[^>]*>`).exec(markup)?.[0] ?? ''
      expect(tag, id).toMatch(/aria-describedby="[^"]*\bclosing-none-reason\b/)
    }
    expect(markup).toMatch(/<p class="helper" id="closing-none-reason" hidden><\/p>/)
  })
})

describe('the footer\'s feedback form (VH-160)', () => {
  const footer = /<footer[\s\S]*?<\/footer>/.exec(markup)?.[0] ?? ''
  const mainSource = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')

  it('is one link on its own line, under the opinion question, the footer’s last route', () => {
    expect(footer).toMatch(
      /<h3>What do you think of the tool\?<\/h3>\s*<p class="feedback-form-entry">\s*<a class="footer-contact-link" id="feedback-form-link">Please tell us what you think in the feedback form \(new tab\)<\/a>\s*<\/p>\s*<\/div>/,
    )
    expect(enGB.footer.feedbackForm).toBe('Please tell us what you think in the feedback form (new tab)')
    expect(enGB.footer.feedbackForm).not.toMatch(/\.$/)
  })

  it('goes to the owner’s form, plain: no query, no fragment, nothing from the page', () => {
    // The rules' no-egress line: the address alone, never a filename, a
    // media characteristic or the build ID added to it.
    expect(FEEDBACK_FORM_URL).toBe('https://forms.cloud.microsoft/e/Meg347QQvs')
    expect(new URL(FEEDBACK_FORM_URL).search).toBe('')
    expect(new URL(FEEDBACK_FORM_URL).hash).toBe('')
    expect(html).not.toContain('forms.cloud.microsoft')
    expect(mainSource).not.toContain('forms.cloud.microsoft')
    expect(mainSource).toContain('feedbackFormLink.href = FEEDBACK_FORM_URL\n')
    expect(mainSource.match(/feedbackFormLink\.href/g)).toHaveLength(1)
  })

  it('opens in a new tab, sending no referrer, so a running job raises no "Leave site?"', () => {
    expect(mainSource).toContain("feedbackFormLink.target = '_blank'")
    expect(mainSource).toContain("feedbackFormLink.rel = 'noopener noreferrer'")
  })

  // VH-164. The link once took the dialog form's ID, so `#feedback-form`
  // found the link, Open email app submitted the form natively, and the page
  // reloaded with the draft, the video and every choice gone.
  it('leaves #feedback-form to the dialog\'s form: every ID in the page is used once', () => {
    const ids = [...markup.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([])
    expect(markup).toMatch(/<form id="feedback-form" novalidate>/)
    expect(mainSource).toContain("required<HTMLFormElement>('#feedback-form')")
    expect(mainSource).toContain("required<HTMLAnchorElement>('#feedback-form-link')")
  })
})

/**
 * The overnight run's first fixes, pinned where they are wired (VH-243). Each
 * rule is a pure function with a test beside it, and an independent review
 * found that taking its call out of `main.ts` failed none of them. These read
 * the source's text, as the blocks above do; what the calls do on the page is
 * Chrome's to show.
 */
const wiring = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
/** A function's body at the margin of `main.ts`, its closing brace left off. */
const functionBody = (name: string): string =>
  new RegExp(`\\nfunction ${name}\\([^)]*\\): void \\{\\n([\\s\\S]*?)\\n\\}\\n`).exec(wiring)?.[1] ?? ''
/** The body of the first listener `main.ts` gives a control for an event. */
const listenerBody = (control: string, event: string): string =>
  new RegExp(`\\n${control}\\.addEventListener\\('${event}', \\(\\) => \\{\\n([\\s\\S]*?)\\n\\}\\)\\n`).exec(wiring)?.[1] ?? ''
// Its parameter list holds a `() => boolean`, which `functionBody` cannot step over.
const preflightBody = /\nasync function runPreflight\([\s\S]*?\n\}\n/.exec(wiring)?.[0] ?? ''

describe('the chosen file, held in one variable (VH-238, pinned by VH-243)', () => {
  const choosing = listenerBody('fileInput', 'change')
  const cancelled = listenerBody('fileInput', 'cancel')

  it('takes the file up at the choosing, the one place the variable is set', () => {
    expect(choosing).toMatch(/^ {2}const file = fileInput\.files\?\.\[0\]\n {2}if \(!file\) return\n {2}chosenFile = file\n/)
    expect(wiring).toContain('\nlet chosenFile: File | null = null\n')
    expect(wiring.match(/\bchosenFile = /g)).toHaveLength(1)
  })

  it('reads the picker’s own list in three places and no more: the take-up, the cancel rule, the redaction set', () => {
    // Chrome gives the list new objects when the same file is picked again,
    // so a handler that compared with it stopped re-checking (C-01).
    expect(wiring.match(/fileInput\.files/g)).toHaveLength(3)
    expect(choosing.match(/fileInput\.files/g)).toHaveLength(1)
    expect(cancelled.match(/fileInput\.files/g)).toHaveLength(1)
    expect(wiring).toContain('for (const chosen of fileInput.files ?? []) chosenFileNames.add(chosen.name)')
  })

  it('has the six later readers ask the variable', () => {
    // The output choice, a trim commit and Check again; then the result's
    // two questions and its "Previous video".
    expect(listenerBody('presetChoice', 'change')).toContain('const file = chosenFile\n')
    expect(functionBody('commitTrim')).toContain('const file = chosenFile\n')
    expect(listenerBody('checkAgainButton', 'click')).toContain('const file = chosenFile\n')
    expect(wiring).toContain('(savedResultFor !== null && savedResultFor === chosenFile)')
    expect(wiring).toContain('const chosen = chosenFile\n  return chosen !== null &&')
    expect(wiring).toContain('const previous = chosenFile !== source\n')
  })

  it('reads the same file picked again as the `change` it is, by the rule and nothing else', () => {
    expect(cancelled).toBe(
      "  if (!pickedAgain(fileInput.files?.[0], chosenFile, fileInput.disabled)) return\n  fileInput.dispatchEvent(new Event('change', { bubbles: true }))",
    )
    expect(wiring.match(/\bpickedAgain\(/g)).toHaveLength(1)
  })
})

describe('a status that has stopped being true is taken away (VH-239, pinned by VH-243)', () => {
  const choosing = listenerBody('fileInput', 'change')
  const lock = functionBody('applyControlLock')
  const commit = functionBody('commitTrim')
  const preset = listenerBody('presetChoice', 'change')
  const trim = functionBody('renderTrim')

  it('settles a refused drop wherever a job, a save or the start-up check ends', () => {
    // Every such end comes through the lock's one applier.
    expect(lock).toContain('\n  dropRefusal.settle()\n')
    expect(wiring.match(/dropRefusal\.settle\(\)/g)).toHaveLength(1)
  })

  it('takes a refused preview’s words away at the next file’s choosing, after the trim is cleared', () => {
    expect(choosing).toMatch(/\n {2}clearTrim\('reading'\)\n(?:\s*\/\/[^\n]*\n)*\s*previewRefusal\.fileChanged\(\)\n/)
    expect(wiring.match(/previewRefusal\.fileChanged\(\)/g)).toHaveLength(1)
  })

  it('moves the tab’s title on wherever the status line is written, and nowhere else (VH-243, F-05)', () => {
    // The title followed the line only at a trim commit and an output
    // change, so a refused Create, and the card put right after it, left
    // "Cancelled" in the tab over a line that no longer said it. The line's
    // one writer now moves the title on before it writes.
    expect(functionBody('setStatus')).toBe(
      '  statusAsksDiscard = false\n  titleMovesOn()\n  show(statusLine, () => paintStatus(statusLine, message, spokenOnly))',
    )
    // The call and the definition.
    expect(wiring.match(/\btitleMovesOn\(\)/g)).toHaveLength(2)
    expect(functionBody('titleMovesOn')).toBe("  if (outcomeEndsAtNewCheck(titleOf)) setTitle('none')")
    // No other way to the line's words: one painter, and no direct write.
    expect(wiring.match(/\(statusLine, /g)).toHaveLength(2)
    expect(wiring).not.toMatch(/statusLine\.(?:textContent|innerHTML|innerText) = |statusLine\.(?:replaceChildren|append|prepend)\(|clear\(statusLine\)/)
  })

  it('still moves it on at a trim commit and at an output change, by their status, once the choice is known to count', () => {
    // After the guard that the file has been read, so a choice that starts
    // no check leaves "Cancelled" in the tab, as it leaves it on the line.
    const guard = '\n  if (!file || file !== inspectedFile) return\n'
    for (const body of [commit, preset]) {
      expect(body).toContain(guard)
      expect(body).not.toContain('titleMovesOn()')
    }
    // A trim's commit says one of its two sentences below the guard; a
    // handle's repeat of a sentence the line holds is not written, and by
    // then the title has gone with the line's earlier words.
    expect(commit.indexOf(guard)).toBeLessThan(commit.indexOf('setStatus('))
    expect(commit).toMatch(/\n {2}say\(\(\) => t\(\)\.status\.checking\)\n/)
    expect(commit).toMatch(/\n {4}say\(\(\) => t\(\)\.trim\.correctToContinue\)\n/)
    // An output change says nothing itself: its check does, in every branch
    // and before its first wait.
    expect(preset).not.toContain('setStatus(')
    expect(preset.indexOf(guard)).toBeLessThan(preset.indexOf('void runPreflight(file, current)'))
    expect(preflightBody).toMatch(/if \('problem' in trim\) \{\n[\s\S]*?\n {4}setStatus\(\(\) => t\(\)\.trim\.correctToContinue\)\n[\s\S]*?\n {4}return\n {2}\}/)
    expect(preflightBody.indexOf('setStatus(() => t().status.checking)')).toBeLessThan(preflightBody.indexOf('await '))
  })

  it('writes a job’s outcome on the line first and in the title after, each time (VH-243, F-05)', () => {
    // The other order would have the line's writer take away the title just
    // set. Every "Cancelled" or "Not made" title follows a status write with
    // no other title between them.
    const outcomes = wiring.match(/setTitle\('(?:cancelled|failed)'\)/g) ?? []
    expect(outcomes).toHaveLength(4)
    expect(
      wiring.match(/setStatus\((?:(?!setStatus\(|setTitle\()[\s\S])*setTitle\('(?:cancelled|failed)'\)/g),
    ).toHaveLength(outcomes.length)
    expect(wiring).toMatch(/\n {8}setStatus\(\(\) => t\(\)\.status\.cancelled\)\n {8}handTo = startButton\n {8}setTitle\('cancelled'\)\n/)
    // A failure whose stop has ended writes its sentence again without "The
    // job is stopping", and its title again after it.
    expect(wiring).toMatch(
      /\n {6}await settled\(id\)\n(?:\s*\/\/[^\n]*\n)*\s*setStatus\('', \(\) => t\(\)\.status\.couldNotCreate\(\{ sentence: failureSentence\(failureWords\(failure\)\) \}\)\)\n(?:\s*\/\/[^\n]*\n)*\s*setTitle\('failed'\)\n {4}\}\)\n/,
    )
    // "Ready" is not an outcome the line's writer ends.
    expect(wiring.match(/setTitle\('ready'\)/g)).toHaveLength(1)
  })

  it('writes the trim’s two error lines only when their words change', () => {
    // The lines are in a live region, and this runs on every key of a handle.
    expect(trim).toContain('\n    paintLine(line, own)\n')
    expect(trim).not.toMatch(/\.textContent = own|line\.textContent/)
    // The one direct write is the notice's, which hides both lines.
    expect(trim.match(/line\.hidden = /g)).toHaveLength(1)
    expect(trim).toContain('for (const line of [trimStartError, trimEndError]) line.hidden = true')
    expect(functionBody('paintLine')).toMatch(/^ {2}if \(line\.textContent !== \(text \?\? ''\)\) line\.textContent = text \?\? ''\n/)
  })
})

describe('the Create step keeps its height through a check (VH-240, pinned by VH-243)', () => {
  const commit = functionBody('commitTrim')
  const preset = listenerBody('presetChoice', 'change')
  const again = listenerBody('checkAgainButton', 'click')

  // VH-243 (D-01, D-02) gave the check two more holds, so the step's is
  // taken and given up through one function each, at the places it was.
  it('takes the step’s hold, and the place of a card under the verdict, through one function', () => {
    expect(functionBody('holdCheckRoom')).toBe('  createStepHold.hold()\n  resultPlaceHold.hold()')
    expect(wiring.match(/createStepHold\.hold\(\)/g)).toHaveLength(1)
    expect(wiring.match(/resultPlaceHold\.hold\(\)/g)).toHaveLength(1)
  })

  it('takes the hold in three places, each before anything of the step is withdrawn', () => {
    expect(wiring.match(/\n\s+holdCheckRoom\(\)\n/g)).toHaveLength(3)
    for (const body of [commit, preset]) {
      expect(body).toContain('\n  holdCheckRoom()\n')
      expect(body.indexOf('holdCheckRoom()')).toBeLessThan(body.indexOf('processActions.hidden = true'))
      expect(body.indexOf('holdCheckRoom()')).toBeLessThan(body.indexOf('withdrawVerdict()'))
    }
    expect(again).toContain('\n  holdCheckRoom()\n  void runPreflight(file, beginSelection())\n')
  })

  it('gives up all three holds together, the step’s among them', () => {
    expect(functionBody('releaseCheckRoom')).toBe(
      '  createStepHold.release()\n  resultPlaceHold.release()\n  submissionLineHold.release()',
    )
    expect(wiring.match(/createStepHold\.release\(\)/g)).toHaveLength(1)
    expect(wiring.match(/resultPlaceHold\.release\(\)/g)).toHaveLength(1)
    // A new file, a trim that cannot be used (twice), a check's end, Stop
    // the check, and a job's start.
    expect(wiring.match(/\n\s+(?:if \(current\(\)\) )?releaseCheckRoom\(\)\n/g)).toHaveLength(6)
    expect(listenerBody('stopCheckButton', 'click')).toContain('\n  releaseCheckRoom()\n')
    expect(functionBody('beginJob')).toMatch(/^[\s\S]*?\n {2}releaseCheckRoom\(\)\n {2}clearResult\(\)\n/)
  })

  it('gives the hold up when its check ends, however it ends, unless a newer one has replaced it', () => {
    expect(preflightBody).toMatch(
      /\n {2}\} finally \{\n(?:\s*\/\/[^\n]*\n)*\s*if \(current\(\)\) releaseCheckRoom\(\)\n {2}\}\n\}\n$/,
    )
    // In the `finally` the release is never unconditional: a replaced check
    // leaves the hold to whatever replaced it.
    expect(preflightBody.match(/if \(current\(\)\) releaseCheckRoom\(\)/g)).toHaveLength(1)
  })

  it('keeps no room where no check follows: a trim that cannot be used', () => {
    // Both ways into it: the commit that finds the problem, and a check
    // asked for while it stands.
    expect(commit).toMatch(/if \('problem' in currentTrim\(\)\) \{\n[\s\S]*?\n {4}releaseCheckRoom\(\)\n {4}return\n {2}\}/)
    expect(preflightBody).toMatch(/if \('problem' in trim\) \{\n[\s\S]*?\n {4}releaseCheckRoom\(\)\n {4}return\n {2}\}/)
  })
})

describe('a card under the verdict keeps its place through a check (VH-243, D-02)', () => {
  const commit = functionBody('commitTrim')

  it('opens the room in the verdict’s own box, and only while something stands in the result', () => {
    expect(wiring).toMatch(
      /const resultPlaceHold = createPlaceHold\(required<HTMLElement>\('#preflight-report'\), \(\) =>\n {2}processResult\.childElementCount > 0\n {4}\? processResult\.getBoundingClientRect\(\)\.top - preflightReport\.getBoundingClientRect\(\)\.top\n {4}: null,\n\)\n/,
    )
  })

  it('puts the card back once “Checking…” and its stop are painted, at the commit and at the check', () => {
    expect(wiring.match(/resultPlaceHold\.settle\(\)/g)).toHaveLength(2)
    // A trim's commit: its check waits out the pause, and the line and the
    // stop are on the page from now.
    expect(commit).toMatch(
      /\n {2}say\(\(\) => t\(\)\.status\.checking\)\n(?:\s*\/\/[^\n]*\n)*\s*offerStop\('check'\)\n(?:\s*\/\/[^\n]*\n)*\s*resultPlaceHold\.settle\(\)\n/,
    )
    expect(commit.indexOf('resultPlaceHold.settle()')).toBeGreaterThan(commit.indexOf('withdrawVerdict()'))
    // Every check, before its first wait: an output change and Check again
    // reach the line and the stop only here.
    expect(preflightBody).toMatch(
      /\n {2}withdrawVerdict\(\)\n {2}setStatus\(\(\) => t\(\)\.status\.checking\)\n {2}offerStop\('check'\)\n(?:\s*\/\/[^\n]*\n)*\s*resultPlaceHold\.settle\(\)\n/,
    )
    expect(preflightBody.indexOf('resultPlaceHold.settle()')).toBeLessThan(preflightBody.indexOf('await '))
  })
})

describe('step 3’s line under Submission keeps its room while it is withdrawn (VH-243, D-01)', () => {
  const paint = functionBody('paintSubmissionFilled')

  it('holds the fields’ box, the smallest element round a line that is off the page without words', () => {
    expect(wiring).toContain(
      "const submissionLineHold = createHeightHold(required<HTMLElement>('#submission-card-fields'))\n",
    )
    const fields = markup.slice(markup.indexOf('<div id="submission-card-fields"'))
    expect(fields.slice(0, fields.indexOf('</fieldset>'))).toContain('<p class="helper" id="submission-card-filled"></p>')
  })

  it('takes the hold as the line is withdrawn, before it goes, and nowhere else', () => {
    expect(wiring.match(/submissionLineHold\.hold\(\)/g)).toHaveLength(1)
    expect(paint).toContain('\n  if (running === null && paintedRunningTime !== null) submissionLineHold.hold()\n')
    expect(paint.indexOf('submissionLineHold.hold()')).toBeLessThan(paint.indexOf('paintedRunningTime = running'))
    expect(paint.indexOf('submissionLineHold.hold()')).toBeLessThan(paint.indexOf('paintLine('))
  })

  it('gives it up when the line is painted again, with the check’s other room, and at a new file', () => {
    expect(paint).toContain('\n  if (running !== null) submissionLineHold.release()\n')
    expect(paint.indexOf('submissionLineHold.release()')).toBeGreaterThan(paint.indexOf('paintLine('))
    expect(functionBody('releaseCheckRoom')).toContain('submissionLineHold.release()')
    // A new file withdraws the line after the check's room has been given
    // up, and its first check holds nothing.
    expect(wiring).toMatch(
      /\n {2}forgetMadeSeconds\(\)\n(?:\s*\/\/[^\n]*\n)*\s*submissionLineHold\.release\(\)\n {2}inspectedFile = null\n/,
    )
    expect(wiring.match(/submissionLineHold\.release\(\)/g)).toHaveLength(3)
  })
})

describe('a job’s progress is brought into the window as it arrives (VH-243, E-02)', () => {
  const stage = functionBody('onStage')
  const reveal = functionBody('revealProgress')

  it('reveals at a job’s first report, once the bar is on the page, and at no other', () => {
    expect(stage).toContain('\n  const arriving = processProgress.hidden\n')
    expect(stage).toContain('\n  processProgress.hidden = false\n  if (arriving) revealProgress()\n')
    expect(stage.indexOf('const arriving = ')).toBeLessThan(stage.indexOf('processProgressText.hidden = false'))
    expect(wiring.match(/\brevealProgress\(\)/g)).toHaveLength(2)
  })

  it('reads the bar with its stage line, Cancel, the window and the root’s own inset', () => {
    expect(reveal).toContain('top: processProgress.getBoundingClientRect().top,')
    expect(reveal).toContain('bottom: processProgressText.getBoundingClientRect().bottom,')
    expect(reveal).toContain('cancelButton.hidden ? null : cancelButton.getBoundingClientRect(),')
    expect(reveal).toContain('window.innerHeight,')
    expect(reveal).toContain('parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop),')
  })

  it('scrolls once, at once, only where the rule says to, and never behind the dialogue', () => {
    expect(reveal).toMatch(/^ {2}if \(feedbackDialog\.open\) return\n/)
    expect(reveal).toMatch(/\n {2}if \(by !== 0\) window\.scrollBy\(\{ top: by, behavior: 'instant' \}\)$/)
    // The page's one scroll of its own: nothing smooth, and no second way in.
    expect(wiring.match(/scrollBy\(/g)).toHaveLength(1)
    expect(wiring).not.toMatch(/scrollIntoView|scrollTo\(|behavior: 'smooth'/)
  })
})

describe('no choice is put back by the browser after Back or Forward (VH-243, E-01)', () => {
  // Chrome restores every radio, checkbox and select to what a history entry
  // held, after the page has painted itself from what it remembers, and the
  // page does not look again: a card was made in 中文 while "English" showed
  // chosen. `autocomplete="off"` stops the restore, as on the card's fields.
  const controls = [...markup.matchAll(/<(?:input|select)\b[^>]*>/g)].map(([tag]) => tag)
  const choices = controls.filter(
    (tag) => tag.startsWith('<select') || /\stype="(?:radio|checkbox)"/.test(tag),
  )
  const nameOf = (tag: string): string => /\s(?:id|name)="([^"]+)"/.exec(tag)?.[1] ?? ''

  it('reads every radio, checkbox and select the page has', () => {
    expect(new Set(choices.map(nameOf))).toEqual(
      new Set([
        'video-kind',
        'title-card-on',
        'closing-type',
        'closing-onset',
        'closing-colour',
        'closing-internal',
        'preset',
        'announce-progress',
      ]),
    )
    expect(choices.filter((tag) => /\stype="radio"/.test(tag))).toHaveLength(6)
    expect(choices.filter((tag) => /\stype="checkbox"/.test(tag))).toHaveLength(3)
    expect(choices.filter((tag) => tag.startsWith('<select'))).toHaveLength(2)
  })

  it('gives each one autocomplete off', () => {
    for (const tag of choices) expect(tag, nameOf(tag)).toMatch(/\sautocomplete="off"(?=[\s/>])/)
  })

  it('leaves no typed card field without it either', () => {
    const typed = [...markup.matchAll(/<(?:input|textarea)\b[^>]*\sid="(?:title|submission)-card-[^"]+"[^>]*>/g)]
      .map(([tag]) => tag)
      .filter((tag) => !/\stype="checkbox"/.test(tag))
    expect(typed).toHaveLength(8)
    for (const tag of typed) expect(tag, nameOf(tag)).toMatch(/\sautocomplete="off"(?=[\s/>])/)
  })

  it('nor the file chooser, which would name a file the page has not read', () => {
    // Chrome can put a file input's selection back after Back or Forward
    // with no `change`, and the page takes a file up only at one.
    const files = controls.filter((tag) => /\stype="file"/.test(tag))
    expect(files.map(nameOf)).toEqual(['file-input'])
    for (const tag of files) expect(tag, nameOf(tag)).toMatch(/\sautocomplete="off"(?=[\s/>])/)
  })
})

describe('each Submission field’s error is straight under its field (VH-243, E-06)', () => {
  const fields = ['assignment', 'module', 'convenor', 'ids']

  it('puts the error’s live box next after the field, the IDs’ helper after that', () => {
    for (const field of fields) {
      const close = field === 'ids' ? '></textarea>' : '/>'
      expect(markup, field).toMatch(
        new RegExp(
          `id="submission-card-${field}"[^>]*${close}\\s*<div aria-live="polite">\\s*<p class="field-error" id="submission-card-${field}-error" hidden></p>\\s*</div>`,
        ),
      )
    }
    expect(markup).toMatch(
      /id="submission-card-ids-error" hidden><\/p>\s*<\/div>\s*<p class="helper" id="submission-card-ids-helper">/,
    )
  })

  it('keeps what the box of IDs is described by, in the order it had', () => {
    expect(markup).toContain('aria-describedby="submission-card-ids-helper submission-card-ids-error"')
  })

  it('puts the staff card’s errors there too, Date’s before its helper as the IDs’ is', () => {
    for (const field of ['title', 'department', 'authors', 'date']) {
      expect(markup, field).toMatch(
        new RegExp(
          `id="title-card-${field}"[^>]*/>\\s*<div aria-live="polite">\\s*<p class="field-error" id="title-card-${field}-error" hidden></p>\\s*</div>`,
        ),
      )
    }
    expect(markup).toMatch(
      /id="title-card-date-error" hidden><\/p>\s*<\/div>\s*<p class="helper" id="title-card-date-helper">/,
    )
    // The one helper under Date, described by it in the order it had.
    expect(markup.match(/id="title-card-date-helper"/g)).toHaveLength(1)
    expect(markup).toContain('aria-describedby="title-card-date-helper title-card-date-error"')
  })
})

describe('a handle’s key says its sentence once, a time given outright every time (VH-243)', () => {
  const commit = functionBody('commitTrim')

  it('asks the rule before each of the commit’s two sentences, and says neither any other way', () => {
    expect(commit).toContain('if (trimStatusOwed(by, statusLine.textContent, sentence())) setStatus(sentence)')
    expect(commit).toContain('say(() => t().trim.correctToContinue)')
    expect(commit).toContain('say(() => t().status.checking)')
    expect(commit.match(/\bsetStatus\(/g)).toHaveLength(1)
  })

  it('names what committed: the handles by key or drag, the fields and the three buttons outright', () => {
    for (const range of ['trimStartRange', 'trimEndRange']) {
      expect(wiring).toContain(`${range}.addEventListener('change', () => commitTrim('handle'))\n`)
    }
    expect(wiring).toContain("    onRangeInput(which, target)\n    commitTrim('handle')\n")
    expect(wiring.match(/commitTrim\('handle'\)/g)).toHaveLength(3)
    // A typed field's `change`, written once for the two fields.
    expect(wiring).toMatch(/field\.addEventListener\('change', \(\) => \{\n[\s\S]*?\n {4}commitTrim\('given'\)\n {2}\}\)/)
    for (const button of ['trimSetStart', 'trimSetEnd', 'trimClear']) {
      expect(listenerBody(button, 'click'), button).toContain("\n  commitTrim('given')")
    }
    expect(wiring.match(/commitTrim\('given'\)/g)).toHaveLength(4)
    // No commit without its source.
    expect(wiring).not.toMatch(/commitTrim\(\)|, commitTrim\)/)
  })
})

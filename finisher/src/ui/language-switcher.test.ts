/**
 * The language switcher's options and the translation note's email link
 * (VH-105). The DOM — the segments, focus kept on a switch, the note shown
 * only on a translated page — needs a real browser and was checked in
 * Chrome; what is pinned here is every decision it is built from.
 */

import { readdirSync, readFileSync } from 'node:fs'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { TRANSLATION_FEEDBACK_ADDRESS, TRANSLATION_FEEDBACK_SUBJECT } from '../config/feedback'
import {
  LANGUAGE_NAMES,
  LANGUAGES_OFFERED,
  MACHINE_TRANSLATED,
  type LanguageTag,
} from '../config/languages'
import { languageOptions, languageSegments, translationFeedbackMailto } from './language-switcher'

describe('languageOptions', () => {
  it('offers one segment per language, in the order offered, each named in its own language', () => {
    const options = languageOptions(LANGUAGES_OFFERED, 'en-GB')
    expect(options.map(({ tag }) => tag)).toEqual([...LANGUAGES_OFFERED])
    expect(options.map(({ name }) => name)).toEqual(['English', '中文', 'Bahasa Malaysia'])
    for (const { tag, name } of options) expect(name, tag).toBe(LANGUAGE_NAMES[tag])
  })

  it('checks the language shown, and only that one', () => {
    for (const shown of LANGUAGES_OFFERED) {
      const checked = languageOptions(LANGUAGES_OFFERED, shown).filter((option) => option.checked)
      expect(
        checked.map(({ tag }) => tag),
        shown,
      ).toEqual([shown])
    }
  })

  it('offers no switcher when only one language is offered, or none', () => {
    expect(languageOptions(['en-GB'], 'en-GB')).toEqual([])
    expect(languageOptions([], 'en-GB')).toEqual([])
  })
})

describe('translationFeedbackMailto', () => {
  /** The link taken apart: who it goes to, and every field it fills. */
  function parts(url: string): { readonly to: string; readonly fields: Map<string, string> } {
    const [scheme, rest = ''] = url.split(/:(.*)/s)
    expect(scheme).toBe('mailto')
    const [to = '', query = ''] = rest.split('?')
    return { to, fields: new Map(new URLSearchParams(query)) }
  }

  it('goes to the address in the config, for every machine-translated language', () => {
    expect(MACHINE_TRANSLATED.length).toBeGreaterThan(0)
    for (const tag of MACHINE_TRANSLATED) {
      expect(parts(translationFeedbackMailto(tag)).to, tag).toBe(TRANSLATION_FEEDBACK_ADDRESS)
    }
  })

  it('names the product and the language in the subject, and fills nothing else', () => {
    for (const tag of ['zh-Hans', 'ms-MY'] as const satisfies readonly LanguageTag[]) {
      const { fields } = parts(translationFeedbackMailto(tag))
      // No body, no copy line: nothing about the video, the file or the
      // device goes in the link (the rules' no-egress line).
      expect([...fields.keys()], tag).toEqual(['subject'])
      expect(fields.get('subject'), tag).toBe(
        `${TRANSLATION_FEEDBACK_SUBJECT}: ${LANGUAGE_NAMES[tag]}`,
      )
    }
  })

  it('percent-encodes the subject, so the Chinese name and the spaces survive any mail app', () => {
    const url = translationFeedbackMailto('zh-Hans')
    // 中文 as UTF-8, percent-encoded; a space as %20, never a raw one or
    // a "+", which some mail apps leave in the subject.
    expect(url).toContain('%E4%B8%AD%E6%96%87')
    expect(url).toContain('%20')
    expect(url).toMatch(/^[\x21-\x2a\x2c-\x7e]+$/)
  })
})

describe('languageSegments (VH-135)', () => {
  it('gives each face its own name to reserve its bold width from', () => {
    // Built in the DOM, which Node has not got; the stylesheet's reserve reads
    // `data-text`, so the face must carry the words it shows.
    const source = readFileSync(new URL('./language-switcher.ts', import.meta.url), 'utf8')
    expect(source).toMatch(
      /face\.textContent = option\.name\s*\n(?:\s*\/\/[^\n]*\n)*\s*face\.dataset\['text'\] = option\.name/,
    )
  })
})

describe('languageSegments’ radios are not put back by the browser (VH-243, E-01)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  /** A document that makes plain objects, enough for the segments to be built and read back. */
  function standIn() {
    const made: { tag: string; [key: string]: unknown }[] = []
    vi.stubGlobal('document', {
      createElement(tag: string) {
        const element = { tag, dataset: {}, append() {} }
        made.push(element)
        return element
      },
    })
    return made
  }

  it('builds every radio with autocomplete off, for the page’s language and the video’s', () => {
    // After Back or Forward Chrome puts a radio back as that history entry
    // left it, over a page painted from what is remembered now: the switcher
    // showed 中文 on a page in Bahasa Malaysia, and a card was made in 中文
    // while "English" showed chosen.
    for (const name of ['language', 'video-language']) {
      const made = standIn()
      languageSegments(name, languageOptions(LANGUAGES_OFFERED, 'en-GB'))
      const inputs = made.filter(({ tag }) => tag === 'input')
      expect(inputs).toHaveLength(LANGUAGES_OFFERED.length)
      for (const input of inputs) {
        expect(input['type'], name).toBe('radio')
        expect(input['name']).toBe(name)
        expect(input['autocomplete'], `${name} ${String(input['value'])}`).toBe('off')
      }
      expect(inputs.filter((input) => input['checked'] === true).map((input) => input['value'])).toEqual(['en-GB'])
    }
  })

  it('is the only place the page’s script builds a form control', () => {
    // The markup's own are held to the same rule by `test/screen-text.test.ts`.
    const source = new URL('../', import.meta.url)
    const builders = readdirSync(source, { recursive: true, encoding: 'utf8' })
      .filter((file) => file.endsWith('.ts') && !file.endsWith('.test.ts'))
      .filter((file) =>
        /createElement\(\s*['"](?:input|select|textarea)['"]/.test(readFileSync(new URL(file, source), 'utf8')),
      )
    expect(builders.map((file) => file.replaceAll('\\', '/'))).toEqual(['ui/language-switcher.ts'])
  })
})

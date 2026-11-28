/**
 * The Carbon theme on the neutral pack's tokens (VNG-15). The brand pack owns
 * colour and typeface (the rules' Always): Carbon takes them from the pack,
 * never the reverse. The invariant, read from `src/ui/theme.scss` compiled by
 * the Sass the build uses: the tokens the page's components draw with are
 * emitted as the pack's roles this file pins, independently of the theme; each
 * other token the theme's map gives, as Sass evaluates the map, is emitted as
 * one of the pack's colour roles (a colour token the pack assigns again for
 * the dark scheme); each in every rule and context but an at-rule that applies
 * only with forced colours active, and declared on `:root` and on the header
 * band outside any query, so in both schemes; the page's own stylesheets hold
 * no colour of their own, named colours included, and set no token the pack
 * owns (its faces among them); the pack's tokens name no Carbon token; every
 * face Carbon sets is the pack's, and no IBM Plex face is declared or named.
 * The pack's pairs are measured by `test/contrast.test.ts`; the rendered page
 * in light and dark is to be measured by `npm run a11y`, VNG-15's next step.
 */

import { readdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { compile, compileString } from 'sass'
import { describe, expect, it } from 'vitest'

const folder = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (path: string) => readFileSync(join(folder, path), 'utf8')
const uncommented = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')

// Carbon's Sass, found as Vite finds it, from the root's one install.
const modules = join(dirname(createRequire(import.meta.url).resolve('@carbon/react/package.json')), '..', '..')
const sassOptions = { loadPaths: [modules], quietDeps: true }
const themeSource = read('src/ui/theme.scss')
const compiled = compile(join(folder, 'src/ui/theme.scss'), sassOptions).css

/** A colour written as a literal: a hex colour or a colour function. */
const COLOUR = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color|color-mix|light-dark)\(/i

/** One value given to a custom property: the rule's selectors and the at-rules around it. */
interface Declaration {
  token: string
  value: string
  selectors: string[]
  context: string[]
}

/**
 * The media queries known to apply only when forced colours are active: the
 * one Carbon emits (its legacy `-ms-high-contrast` branch is the same mode in
 * the browser that knew it) and the plain one. Any other form is not exempt.
 */
const FORCED_ONLY = new Set(['@media screen and (-ms-high-contrast: active), (forced-colors: active)', '@media (forced-colors: active)'])
const forcedOnly = (prelude: string) => FORCED_ONLY.has(prelude.replace(/\s+/g, ' ').trim())

/** One style rule of compiled CSS, in source order: its selectors, the at-rules around it, and its declarations' text. */
interface Rule {
  selectors: string[]
  context: string[]
  body: string
}

/**
 * Every style rule in `css`, in source order, at the top level or inside any
 * at-rule (a `prefers-color-scheme` block included). The one context left out
 * is an at-rule that applies only with forced colours active: it assigns
 * system colours, as it should, and is not the theme.
 */
function rules(css: string): Rule[] {
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const found: Rule[] = []
  const preludes: string[] = []
  let start = 0
  for (let index = 0; index < text.length; index++) {
    const char = text[index]
    if (char === '{') {
      const before = text.slice(start, index)
      preludes.push(before.slice(before.lastIndexOf(';') + 1).trim())
      start = index + 1
    } else if (char === '}') {
      const prelude = preludes.pop()
      if (prelude === undefined) throw new Error(`unbalanced CSS at ${index}`)
      const context = [...preludes]
      if (![...context, prelude].some(forcedOnly) && !prelude.startsWith('@')) {
        found.push({ selectors: prelude.split(',').map((s) => s.trim()), context, body: text.slice(start, index) })
      }
      start = index + 1
    }
  }
  if (preludes.length > 0) throw new Error('unbalanced CSS at the end')
  return found
}

/** Every value given to each custom property in `css`, as `rules` reads it, by name without its leading `--`. */
function customProperties(css: string): Declaration[] {
  return rules(css).flatMap(({ selectors, context, body }) =>
    [...body.matchAll(/--([a-z0-9-]+)\s*:\s*([^;]+)(?:;|$)/g)].map(([, token = '', value = '']) => ({ token, value: value.trim(), selectors, context })),
  )
}

/** The `color-scheme` the root ends with: the last one given by a rule whose selectors hold `:root`, outside any at-rule. */
function rootScheme(css: string): string | undefined {
  const given = rules(css)
    .filter((r) => r.selectors.includes(':root') && r.context.length === 0)
    .flatMap((r) => [...r.body.matchAll(/(?:^|[;\s])color-scheme\s*:\s*([^;]+)/g)].map(([, scheme = '']) => scheme.trim()))
  return given.at(-1)
}

/** Every value given to each `--cds-*` token, as `customProperties`, by Carbon's token name. */
function declarations(css: string): Declaration[] {
  return customProperties(css)
    .filter((d) => d.token.startsWith('cds-'))
    .map((d) => ({ ...d, token: d.token.slice('cds-'.length) }))
}

/**
 * The Carbon tokens the page's components draw with, and the pack's role each
 * must be, pinned here apart from the theme: the page's ground and text
 * (Carbon's reset on body), and the skip link focused — its ground, its text
 * and its border (Carbon's UI shell header module).
 */
const DRAWN: Record<string, string> = {
  background: '--layer-00',
  'text-primary': '--text-primary',
  'text-secondary': '--text-secondary',
  focus: '--focus',
}

/** The entries of a Sass map's body, split at its own commas, never at one inside a value's brackets. */
function entries(body: string): Array<{ token: string; value: string }> {
  const parts: string[] = []
  let depth = 0
  let start = 0
  for (let index = 0; index < body.length; index++) {
    const char = body[index]
    if (char === '(') depth++
    else if (char === ')') depth--
    else if (char === ',' && depth === 0) {
      parts.push(body.slice(start, index))
      start = index + 1
    }
  }
  parts.push(body.slice(start))
  return parts
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => ({ token: part.slice(0, part.indexOf(':')).trim(), value: part.slice(part.indexOf(':') + 1).trim() }))
}

/**
 * The theme's map, `$pack-roles`, as Sass evaluates it, comments and all: each
 * Carbon token and its value, with the one custom property the value names
 * when it is exactly `var(--role)`, else ''.
 */
function packRoles(scss: string): Array<{ token: string; value: string; role: string }> {
  let inspected = ''
  compileString(`${scss}\n@debug $pack-roles;`, { ...sassOptions, logger: { debug: (message: string) => (inspected = message) } })
  const body = inspected.trim().replace(/^\(/, '').replace(/\)$/, '')
  return entries(body).map(({ token, value }) => ({
    token: token.replace(/^(['"])(.*)\1$/, '$2'),
    value,
    role: /^var\((--[a-z0-9-]+)\)$/.exec(value)?.[1] ?? '',
  }))
}

const mapped = packRoles(themeSource)

/** The pack's tokens and the shared ones (the Carbon tokens' status colours among them), every value of each. */
const packCss = read('brands/neutral/tokens.css')
const sharedCss = read('../shared/styles/tokens.carbon.css')
const packDeclarations = customProperties(packCss)
const tokenDeclarations = [...customProperties(sharedCss), ...packDeclarations]

/** The tokens every one of whose values is a colour: a colour literal, or exactly var() of another such token. */
function colourTokensIn(declared: Declaration[]): Set<string> {
  const colours = new Set<string>()
  for (let grew = true; grew; ) {
    grew = false
    for (const token of new Set(declared.map((d) => d.token))) {
      if (colours.has(token)) continue
      const values = declared.filter((d) => d.token === token).map((d) => d.value)
      const colour = (value: string) => COLOUR.test(value) || colours.has(/^var\(--([a-z0-9-]+)\)$/.exec(value)?.[1] ?? '')
      if (values.every(colour)) {
        colours.add(token)
        grew = true
      }
    }
  }
  return colours
}

/**
 * A pack's colour roles: the colour tokens declared on the unconditional
 * `:root` (by the pack or the shared tokens), so defined in the light scheme,
 * and assigned again by the pack for the dark scheme, so each follows it. A
 * palette grey, the same in both, a length, and a role defined in one scheme
 * alone are not.
 */
function colourRolesIn(shared: Declaration[], pack: Declaration[]): Set<string> {
  const declared = [...shared, ...pack]
  const colours = colourTokensIn(declared)
  const onRoot = new Set(declared.filter((d) => d.selectors.includes(':root') && d.context.length === 0).map((d) => d.token))
  const dark = pack.filter((d) => d.context.some((c) => /prefers-color-scheme:\s*dark/.test(c)))
  return new Set(dark.filter((d) => colours.has(d.token) && onRoot.has(d.token)).map((d) => `--${d.token}`))
}

const colourTokens = colourTokensIn(tokenDeclarations)
const colourRoles = colourRolesIn(customProperties(sharedCss), packDeclarations)

/** The tokens the pack owns, its faces among them, and the shared colour tokens: the page's own styles set none of them. */
const packOwned = new Set([...packDeclarations.map((d) => d.token), ...[...colourTokens].filter((t) => sharedCss.includes(`--${t}:`))])

/**
 * How the declarations depart from giving `--cds-<token>` the pack role
 * `role`: the token not declared on `:root` or on the header band
 * (`.on-brand`) outside every at-rule, so in both colour schemes, or given
 * any other value in any rule or context.
 */
function departures(found: Declaration[], token: string, role: string): string[] {
  const own = found.filter((d) => d.token === token)
  const problems = [':root', '.on-brand']
    .filter((where) => !own.some((d) => d.selectors.includes(where) && d.context.length === 0))
    .map((where) => `missing on ${where}`)
  for (const d of own) {
    if (d.value === `var(${role})`) continue
    problems.push(`${d.value} on ${d.selectors.join(', ')}${d.context.length > 0 ? ` in ${d.context.join(' ')}` : ''}`)
  }
  return problems
}

/** CSS's named colours (CSS Color 4), the words that are a colour of their own. */
const NAMED_COLOURS = new Set(
  (
    'aliceblue antiquewhite aqua aquamarine azure beige bisque black blanchedalmond blue blueviolet brown burlywood ' +
    'cadetblue chartreuse chocolate coral cornflowerblue cornsilk crimson cyan darkblue darkcyan darkgoldenrod darkgray ' +
    'darkgreen darkgrey darkkhaki darkmagenta darkolivegreen darkorange darkorchid darkred darksalmon darkseagreen ' +
    'darkslateblue darkslategray darkslategrey darkturquoise darkviolet deeppink deepskyblue dimgray dimgrey dodgerblue ' +
    'firebrick floralwhite forestgreen fuchsia gainsboro ghostwhite gold goldenrod gray green greenyellow grey honeydew ' +
    'hotpink indianred indigo ivory khaki lavender lavenderblush lawngreen lemonchiffon lightblue lightcoral lightcyan ' +
    'lightgoldenrodyellow lightgray lightgreen lightgrey lightpink lightsalmon lightseagreen lightskyblue lightslategray ' +
    'lightslategrey lightsteelblue lightyellow lime limegreen linen magenta maroon mediumaquamarine mediumblue ' +
    'mediumorchid mediumpurple mediumseagreen mediumslateblue mediumspringgreen mediumturquoise mediumvioletred ' +
    'midnightblue mintcream mistyrose moccasin navajowhite navy oldlace olive olivedrab orange orangered orchid ' +
    'palegoldenrod palegreen paleturquoise palevioletred papayawhip peachpuff peru pink plum powderblue purple ' +
    'rebeccapurple red rosybrown royalblue saddlebrown salmon sandybrown seagreen seashell sienna silver skyblue ' +
    'slateblue slategray slategrey snow springgreen steelblue tan teal thistle tomato turquoise violet wheat white ' +
    'whitesmoke yellow yellowgreen'
  ).split(' '),
)

/** CSS's keywords every property takes. */
const WIDE = ['inherit', 'initial', 'unset', 'revert', 'revert-layer']

/** The pack's faces: its `--font-*` tokens. */
const packFaces = new Set([...packOwned].filter((token) => token.startsWith('font-')))

/**
 * What a stylesheet of the page's own holds that is the pack's to decide: a
 * colour literal; a named colour in any value, a var()'s fallback included; a
 * face other than one of the pack's `--font-*` tokens; a token the pack owns
 * set again. The theme's map is read by `packRoles`, and Carbon's
 * configuration by its own tests.
 */
function ownStyleProblems(name: string, text: string): string[] {
  const body = uncommented(text)
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1')
    .replace(/@(?:use|import|forward)\b[^;]*;/g, '')
    .replace(/\$pack-roles:\s*\([\s\S]*?\);/, '')
  const problems: string[] = []
  if (COLOUR.test(body)) problems.push(`${name} writes a colour: ${COLOUR.exec(body)?.[0] ?? ''}`)
  for (const [, property = '', value = ''] of body.matchAll(/(?:^|[;{\s])(-{0,2}[a-z][a-z0-9-]*)\s*:\s*([^;{}]+)(?=[;}])/g)) {
    if (property.startsWith('--') && packOwned.has(property.slice(2))) problems.push(`${name} sets ${property}, the pack's`)
    // A var()'s own name is a reference; its fallback is what the stylesheet writes, so it is read like the rest.
    const written = value.replace(/var\(\s*--[a-z0-9-]+/gi, ' ')
    for (const [word = ''] of written.matchAll(/(?<![\w-])[a-z][a-z-]*(?![\w(-])/gi)) {
      if (NAMED_COLOURS.has(word.toLowerCase())) problems.push(`${name}: ${property} holds ${word}`)
    }
    if (property === 'font-family' || property === 'font') {
      const faces = [...value.matchAll(/var\(\s*--([a-z0-9-]+)/gi)].map(([, token]) => token ?? '')
      const words = [...written.matchAll(/(?<![\w-])[a-z][a-z-]*(?![\w(-])/gi)].map(([word]) => word.toLowerCase())
      const kept = faces.length > 0 && faces.every((face) => packFaces.has(face)) && words.every((word) => WIDE.includes(word))
      if (!kept && !(faces.length === 0 && words.length === 1 && WIDE.includes(words[0] ?? ''))) {
        problems.push(`${name}: ${property} is not one of the pack's faces: ${value.trim()}`)
      }
    }
  }
  return problems
}

/** The page's own stylesheets: every CSS and Sass file under `src/`. */
const ownSheets = readdirSync(join(folder, 'src'), { recursive: true, encoding: 'utf8' })
  .filter((name) => /\.s?css$/.test(name))
  .sort()
  .map((name) => ({ name: `src/${name}`, text: read(`src/${name}`) }))

/** Every `--cds-*` value the page's styles give: the compiled theme's and the plain stylesheets' alike. */
const found = [...declarations(compiled), ...ownSheets.filter((s) => s.name.endsWith('.css')).flatMap((s) => declarations(s.text))]

describe('the Carbon theme on the neutral pack', () => {
  it('maps the tokens the page draws with, and finds the pack’s colour roles', () => {
    // Guards against a reading that finds nothing and passes on nothing.
    expect(mapped.length).toBeGreaterThanOrEqual(10)
    for (const token of ['background', 'text-primary', 'text-secondary', 'focus', 'link-primary']) {
      expect(mapped.map((m) => m.token), token).toContain(token)
    }
    for (const role of [...Object.values(DRAWN), '--support-error']) expect(colourRoles, role).toContain(role)
    expect(ownSheets.map((s) => s.name)).toEqual(['src/styles/app.css', 'src/ui/theme.scss'])
    expect(NAMED_COLOURS.size, 'CSS Color 4 names 148 colours').toBe(148)
    expect([...packFaces].sort()).toEqual(['font-body', 'font-cjk', 'font-heading', 'font-mono'])
  })

  it('follows the reader’s colour scheme on the root, over Carbon’s light-only rule (Codex, step 2)', () => {
    expect(rootScheme(compiled)).toBe('light dark')
    // Carbon's rule after the page's, grouped with the band as its theme block is: the root would be light alone.
    expect(rootScheme(`${compiled}\n:root, .on-brand { color-scheme: var(--cds-color-scheme, light); }`)).toBe('var(--cds-color-scheme, light)')
  })

  it.each(Object.entries(DRAWN))('emits --cds-%s, which the page draws with, as the pack role %s, in every rule and context', (token, role) => {
    expect(departures(found, token, role)).toEqual([])
  })

  it.each(mapped)('emits --cds-$token as $value, one of the pack’s colour roles, in every rule and context', ({ token, value, role }) => {
    expect(role, `${token}: ${value} is not exactly one var(--role)`).not.toBe('')
    expect(colourRoles.has(role), `${role} is not a colour role the pack assigns in both schemes`).toBe(true)
    expect(departures(found, token, role)).toEqual([])
  })

  it('declares the tokens again where the pack re-assigns its roles: the header band, in both schemes', () => {
    // Without this, a var() resolved at :root would keep the page's colours on the band.
    for (const { token } of mapped) {
      expect(found.some((d) => d.token === token && d.selectors.includes('.on-brand') && d.context.length === 0), token).toBe(true)
    }
  })

  it('finds a token given another value in a colour-scheme query or another rule', () => {
    // The dark-mode override Codex's review compiled (codex-2b.md, finding 4): the focused skip link's text at 1:1.
    const extra = '@media (prefers-color-scheme: dark) { .on-brand { --cds-text-secondary: var(--layer-00); } }\nbody { --cds-background: var(--layer-02); }'
    const altered = declarations(compileString(`${themeSource}\n${extra}`, sassOptions).css)
    expect(departures(altered, 'text-secondary', '--text-secondary')).toEqual(['var(--layer-00) on .on-brand in @media (prefers-color-scheme: dark)'])
    expect(departures(altered, 'background', '--layer-00')).toEqual(['var(--layer-02) on body'])
  })

  it('exempts only a query that needs forced colours active in every branch, and needs each binding outside any query (a regression: Codex, step 2)', () => {
    expect(forcedOnly('@media screen and (-ms-high-contrast: active), (forced-colors: active)'), 'Carbon’s').toBe(true)
    expect(forcedOnly('@media (forced-colors: none)')).toBe(false)
    expect(forcedOnly('@media (prefers-contrast: more), (forced-colors: active)')).toBe(false)
    expect(forcedOnly('@media (prefers-contrast: more) or (forced-colors: active)')).toBe(false)
    const either = '@media (prefers-contrast: more), (forced-colors: active) { .on-brand { --cds-text-secondary: var(--layer-00); } }'
    const altered = declarations(compileString(`${themeSource}\n${either}`, sassOptions).css)
    expect(departures(altered, 'text-secondary', '--text-secondary')).toEqual([
      'var(--layer-00) on .on-brand in @media (prefers-contrast: more), (forced-colors: active)',
    ])
    // The band bound only in the dark scheme: in the light one it would keep the page's colours.
    const darkOnly = [{ token: 'focus', value: 'var(--focus)', selectors: ['.on-brand'], context: ['@media (prefers-color-scheme: dark)'] }]
    expect(departures(darkOnly, 'focus', '--focus')).toEqual(['missing on :root', 'missing on .on-brand'])
  })

  it('reads the map as Sass does: comments and quoted keys change nothing, and a value that is not one colour role fails (a regression: Codex, step 2)', () => {
    const plain = packRoles('$pack-roles: (focus-inset: var(--layer-01), support-error: var(--support-error));')
    const written = "$pack-roles: (\n  'focus-inset': var(--layer-01), // a comment\n  support-error: // a comment\n    /* another */ var(--support-error),\n);"
    expect(packRoles(written)).toEqual(plain)
    expect(packRoles('$pack-roles: (support-error: var(--support-eror, currentColor));')[0]?.role).toBe('')
    // A length and a palette grey are custom properties the pack declares, but no colour role.
    expect(colourRoles.has('--focus-offset')).toBe(false)
    expect(colourRoles.has('--neutral-grey-10')).toBe(false)
    // A role the pack defines for the dark scheme and the band alone, so undefined on the light root, is none.
    const darkOnly = `${packCss}\n@media (prefers-color-scheme: dark) { :root { --field-surface: var(--neutral-grey-90); } }\n.on-brand { --field-surface: var(--neutral-grey-90); }`
    const roles = colourRolesIn(customProperties(sharedCss), customProperties(darkOnly))
    expect(roles.has('--layer-01')).toBe(true)
    expect(roles.has('--field-surface')).toBe(false)
  })

  it.each(ownSheets)('holds no colour or token of the pack’s in $name, the page’s own', ({ name, text }) => {
    expect(ownStyleProblems(name, text)).toEqual([])
  })

  it('finds a colour or face of its own in the page’s styles, and passes plain keywords (a regression: Codex, step 2)', () => {
    const own = [
      '.a { --font-heading: Lora, Georgia, serif; }',
      '.b { color: whitesmoke; border: 1px solid var(--focus); }',
      '.c { font-family: Lora, Georgia, serif; }',
      '.d { color: var(--title-ink, whitesmoke); }',
      '.e { text-decoration: underline; font-family: var(--font-heading); }',
      '.f { font-family: revert-layer; }',
    ].join('\n')
    expect(ownStyleProblems('a.css', own)).toEqual([
      'a.css sets --font-heading, the pack\'s',
      'a.css: color holds whitesmoke',
      "a.css: font-family is not one of the pack's faces: Lora, Georgia, serif",
      'a.css: color holds whitesmoke',
    ])
    // A Carbon token given another value in the page's own CSS is found like one in the theme.
    const override = declarations('.cds--skip-to-content.on-brand { --cds-text-secondary: var(--layer-00); }')
    expect(departures([...found, ...override], 'text-secondary', '--text-secondary')).toEqual(['var(--layer-00) on .cds--skip-to-content.on-brand'])
  })

  it('sets no token the pack owns in the compiled theme', () => {
    expect(customProperties(compiled).filter((d) => packOwned.has(d.token)).map((d) => d.token)).toEqual([])
  })

  it('leaves the pack free of Carbon: the pack names no Carbon token', () => {
    expect(packCss).not.toMatch(/--cds-/)
  })

  it('sets only the pack’s faces, and declares and names no IBM Plex face: the typeface is the pack’s', () => {
    const faces = new Set([...compiled.matchAll(/font-family:\s*([^;]+);/g)].map(([, face]) => face?.trim()))
    expect(faces.has('var(--font-body)'), 'the body face').toBe(true)
    const allowed = [...[...packFaces].map((face) => `var(--${face})`), ...WIDE]
    for (const face of faces) expect(allowed, String(face)).toContain(face)
    expect(compiled).not.toMatch(/@font-face/)
    expect(compiled).not.toMatch(/IBM Plex/i)
  })
})

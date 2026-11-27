// Tests for the ESLint layers the base offers (UVT-7), run by `node --test` in the root gate: each layer fires on a
// seeded fixture only when a folder takes it up, and the base without layers stays as today's. Each fixture is a
// folder in the system's temporary directory, its node_modules a link to the root's; nothing is written in the
// repository.
import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ESLint } from 'eslint'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import {
  A11Y_HARNESS_FILES,
  JSX_REFUSED,
  a11yHarnessRules,
  escapeRules,
  layers,
  toolConfig,
} from '../eslint.base.js'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const made = []
after(() => made.forEach((d) => rmSync(d, { recursive: true, force: true })))

/** What the base's type-checked set already finds in `loose`, layers or none. */
const LOOSE = ['@typescript-eslint/no-explicit-any', '@typescript-eslint/no-unsafe-return']

const FILES = {
  'tsconfig.json': JSON.stringify({
    extends: join(ROOT, 'tsconfig.app.json'),
    include: ['src/**/*.ts', 'src/**/*.tsx', 'tests'],
  }),
  'src/escape.ts':
    'export function first(list: string[]): string {\n  return list[0]!\n}\nexport const n = JSON.parse("1") as number\n',
  'tests/escape.ts':
    'export function first(list: string[]): string {\n  return list[0]!\n}\nexport const n = JSON.parse("1") as number\n',
  'src/picture.tsx': 'export const Picture = () => <img src="a.png" />\n',
  'src/plain.jsx': 'export const Plain = () => <img src="a.png" />\n',
  'tests/plain.jsx': 'export const Plain = () => <img src="a.png" />\n',
  'src/run.ts': 'export type Run = (value: string) => void\n',
  'src/float.ts': 'async function go(): Promise<void> {}\ngo()\nexport {}\n',
  'scripts/tool.mjs': 'export const tool = 1\n',
  'tests/component.tsx':
    'export const Figure = ({ src }: { src: string; onPick?: (target: HTMLElement) => void }) => <img src={src} />\n',
  'src/typed.jsx':
    "import React from 'react'\nexport const H = (text: string) => <h1>{text}{document.title}</h1>\n",
  'src/unused-react.tsx': "import React from 'react'\nexport const P = () => <p>Hi</p>\n",
  'src/type-only.tsx':
    "import React from 'react'\nexport const P = (): React.ReactNode => <p>Hi</p>\n",
  'src/uses.jsx':
    "import { Picture } from './picture.tsx'\nexport const Uses = () => <Picture />\n",
  'tests/a11y/contrast.mjs': 'undefinedCall()\n',
  'src/app.css': 'main { color: black; }\n',
  'tests/a11y/project.mjs': 'const unused = 1\nexport default function journey({}) {}\n',
  'tests/a11y/department-journey.mjs': 'const unused = 1\nexport default function journey({}) {}\n',
  'src/counter.tsx':
    "import { useState } from 'react'\nexport function Counter({ on }: { on: boolean }) {\n  if (on) {\n    const [n] = useState(0)\n    return <p>{n}</p>\n  }\n  return null\n}\n",
  'tests/a11y/helpers.ts': 'export function loose(x: any) {\n  return x\n}\n',
  'tests/own.ts': 'export function loose(x: any) {\n  return x\n}\n',
}

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'uvt7-layers-'))
  made.push(dir)
  symlinkSync(join(ROOT, 'node_modules'), join(dir, 'node_modules'))
  for (const [rel, body] of Object.entries(FILES)) {
    mkdirSync(dirname(join(dir, rel)), { recursive: true })
    writeFileSync(join(dir, rel), body)
  }
  return dir
}

/**
 * `{ file: [ruleId, …] }` for every file of the fixture, linted with the base and the layers taken, or with the
 * config `build` makes for the fixture's folder instead.
 */
async function lint(taken, build) {
  const dir = fixture()
  const eslint = new ESLint({
    cwd: dir,
    overrideConfigFile: true,
    errorOnUnmatchedPattern: false, // a config that matches no file under a folder named (the root's has no src/)
    overrideConfig: build
      ? build(dir)
      : toolConfig({ tsconfigRootDir: dir, ignores: ['node_modules/**'], layers: taken }),
  })
  const results = await eslint.lintFiles([
    'src',
    'tests',
    'src/plain.jsx',
    'tests/plain.jsx',
    'src/app.css',
    'scripts/tool.mjs',
  ])
  return Object.fromEntries(
    results.map((r) => [
      r.filePath.slice(dir.length + 1),
      [
        ...new Set(
          r.messages.map((m) => m.ruleId ?? `${m.fatal ? 'fatal' : 'note'}: ${m.message}`),
        ),
      ].sort(),
    ]),
  )
}

test('the base lints no .jsx; the jsxA11y layer lints one within the files it is given, and no other', async () => {
  const base = await lint([])
  assert.equal(base['src/plain.jsx'].length, 1)
  assert.match(base['src/plain.jsx'][0], /^note: File ignored/)
  const narrow = await lint([layers.jsxA11y(['src/widgets/**/*.{jsx,tsx}'])])
  assert.deepEqual(narrow['src/plain.jsx'], base['src/plain.jsx'])
  assert.deepEqual(narrow['src/picture.tsx'], [])
  const broad = await lint([layers.jsxA11y(['src/**/*.*'])])
  assert.deepEqual(broad['src/plain.jsx'], ['jsx-a11y/alt-text', 'no-restricted-syntax'])
  assert.match(broad['src/app.css'][0], /^note: File ignored/, 'a broad scope lints no stylesheet')
  assert.match(broad['tests/plain.jsx'][0], /^note: File ignored/, 'outside the files given')
  const group = await lint([layers.jsxA11y([['src/**', '**/plain.*']])])
  assert.deepEqual(
    group['src/plain.jsx'],
    ['jsx-a11y/alt-text', 'no-restricted-syntax'],
    'a pattern group keeps its intersection',
  )
  assert.match(group['tests/plain.jsx'][0], /^note: File ignored/, "the group's src/** still holds")
  assert.deepEqual(group['src/picture.tsx'], [])
})

test('the recommended and type-checked layers, taken in toolConfig, change nothing: it applies them already', async () => {
  const base = await lint([])
  const dir = fixture()
  assert.deepEqual(await lint([layers.recommended(), layers.typeChecked(dir)]), base)
  assert.deepEqual(await lint(layers.recommended()), base, 'taken directly, not in a list')
  assert.deepEqual(await lint(layers.typeChecked(dir)), base, 'taken directly, not in a list')
  assert.deepEqual(
    base['src/run.ts'],
    [],
    'a parameter name in a function type is no unused variable',
  )
  assert.deepEqual(base['src/float.ts'], ['@typescript-eslint/no-floating-promises'])
  assert.deepEqual(base['scripts/tool.mjs'], [])
})

test('composed on their own, the recommended and type-checked layers type src/ and leave a tooling .mjs untyped', async () => {
  const found = await lint([], (dir) =>
    tseslint.config(
      { ignores: ['node_modules/**'] },
      ...layers.recommended(),
      ...layers.typeChecked(dir),
    ),
  )
  assert.deepEqual(found['src/float.ts'], ['@typescript-eslint/no-floating-promises'])
  assert.deepEqual(found['src/run.ts'], [])
  assert.deepEqual(found['scripts/tool.mjs'], [], 'parsed, and not by the project service')
  assert.equal(js.configs.recommended, layers.recommended()[0])
})

test('all six layers composed on their own: a TSX outside src/ is parsed and judged for accessibility', async () => {
  const found = await lint([], (dir) =>
    tseslint.config(
      { ignores: ['node_modules/**'] },
      ...layers.recommended(),
      ...layers.typeChecked(dir),
      layers.escapes(),
      ...layers.jsxA11y(),
      layers.reactHooks(),
      ...layers.a11yHarness(),
    ),
  )
  assert.deepEqual(found['tests/component.tsx'], ['jsx-a11y/alt-text'])
  assert.deepEqual(
    found['src/uses.jsx'],
    ['no-restricted-syntax'],
    'refused whole, nothing else said',
  )
  assert.deepEqual(found['src/picture.tsx'], ['jsx-a11y/alt-text'])
  assert.deepEqual(found['tests/a11y/helpers.ts'], [])
})

test('the base without layers is as today: no escape, accessibility or hook rule fires', async () => {
  const found = await lint([])
  assert.deepEqual(found['src/escape.ts'], [])
  assert.deepEqual(found['src/picture.tsx'], [])
  assert.deepEqual(found['src/counter.tsx'], [])
  assert.deepEqual(found['tests/own.ts'], LOOSE)
  assert.deepEqual(found['tests/a11y/helpers.ts'], LOOSE)
})

test('the escapes layer closes the non-null assertion and the unchecked cast in src/ only', async () => {
  const found = await lint([layers.escapes()])
  assert.deepEqual(found['src/escape.ts'], [
    '@typescript-eslint/no-non-null-assertion',
    '@typescript-eslint/no-unsafe-type-assertion',
  ])
  assert.deepEqual(found['tests/own.ts'], LOOSE)
  assert.deepEqual(found['tests/escape.ts'], [])
  assert.equal(Object.keys(escapeRules).length, 9)
})

test("the jsxA11y layer is eslint-plugin-jsx-a11y's strict set over JSX and TSX", async () => {
  const found = await lint([layers.jsxA11y()])
  assert.deepEqual(
    found['src/typed.jsx'],
    ['no-restricted-syntax'],
    'a .jsx is refused whole, whatever it holds',
  )
  assert.match(JSX_REFUSED, /write it as \.tsx/)
  assert.deepEqual(
    found['src/unused-react.tsx'],
    ['@typescript-eslint/no-unused-vars'],
    'no JSX pragma',
  )
  assert.deepEqual(found['src/type-only.tsx'], ['@typescript-eslint/consistent-type-imports'])
  assert.deepEqual(found['src/picture.tsx'], ['jsx-a11y/alt-text'])
  assert.deepEqual(found['src/plain.jsx'], ['jsx-a11y/alt-text', 'no-restricted-syntax'])
  assert.deepEqual(found['src/escape.ts'], [])
})

test("the reactHooks layer is React's hook rules over TSX", async () => {
  const found = await lint([layers.reactHooks()])
  assert.deepEqual(found['src/counter.tsx'], ['react-hooks/rules-of-hooks'])
})

test("the a11yHarness layer leaves the pack's copied folder to the pack; the folder's own tests keep every rule", async () => {
  const found = await lint([layers.a11yHarness()])
  assert.deepEqual(found['tests/a11y/helpers.ts'], [])
  assert.deepEqual(found['tests/own.ts'], LOOSE)
  for (const authored of ['tests/a11y/project.mjs', 'tests/a11y/department-journey.mjs'])
    assert.deepEqual(
      found[authored],
      ['@typescript-eslint/no-unused-vars', 'no-empty-pattern'],
      authored,
    )
  const root = await lint([], () =>
    tseslint.config({ ignores: ['node_modules/**'] }, js.configs.recommended, layers.a11yHarness()),
  )
  assert.deepEqual(
    root['tests/a11y/helpers.ts'],
    [],
    'a config with no TypeScript parser still reads the copy',
  )
  assert.deepEqual(root['tests/a11y/contrast.mjs'], ['no-undef'], 'a copied .mjs keeps no-undef')
  assert.deepEqual(found['tests/a11y/contrast.mjs'], ['no-undef'], 'a copied .mjs keeps no-undef')
  assert.deepEqual(Object.keys(a11yHarnessRules).length, 5)
  assert.equal(A11Y_HARNESS_FILES.length, 11)
  assert.ok(!A11Y_HARNESS_FILES.includes('project.mjs'))
})

test('all four layers together, in a folder that takes the stack', async () => {
  const found = await lint([
    layers.escapes(),
    layers.jsxA11y(),
    layers.reactHooks(),
    layers.a11yHarness(),
  ])
  assert.deepEqual(found['src/escape.ts'], [
    '@typescript-eslint/no-non-null-assertion',
    '@typescript-eslint/no-unsafe-type-assertion',
  ])
  assert.deepEqual(found['src/picture.tsx'], ['jsx-a11y/alt-text'])
  assert.deepEqual(found['src/counter.tsx'], ['react-hooks/rules-of-hooks'])
  assert.deepEqual(found['tests/a11y/helpers.ts'], [])
})

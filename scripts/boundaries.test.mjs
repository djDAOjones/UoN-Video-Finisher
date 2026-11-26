// Tests for the import-boundary rule (UVT-1, D9), run by `node --test` in the root gate.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { join } from 'node:path'
import { ESLint } from 'eslint'
import tseslint from 'typescript-eslint'
import { ROOT, boundaries, crossing } from '../eslint.boundaries.js'

const at = (rel) => join(ROOT, rel)

test('shared/ imports from no tool', () => {
  assert.deepEqual(crossing(at('shared/core/a.ts'), '../../finisher/src/core/logger'), {
    from: 'shared',
    to: 'finisher',
  })
  assert.deepEqual(crossing(at('shared/a.ts'), '../name-graphics/src/x'), {
    from: 'shared',
    to: 'name-graphics',
  })
  assert.equal(crossing(at('shared/core/a.ts'), './logger'), null)
})

test('no tool imports from another', () => {
  assert.deepEqual(crossing(at('finisher/src/a.ts'), '../../name-graphics/src/b'), {
    from: 'finisher',
    to: 'name-graphics',
  })
  assert.deepEqual(
    crossing(at('name-graphics/src/a.ts'), '../../finisher/src/core/logger.ts?raw'),
    { from: 'name-graphics', to: 'finisher' },
  )
})

test('a tool may import its own files, shared/, the root and packages', () => {
  assert.equal(crossing(at('finisher/src/a.ts'), './b'), null)
  assert.equal(crossing(at('finisher/src/a.ts'), '../../shared/core/logger'), null)
  assert.equal(crossing(at('name-graphics/eslint.config.js'), '../eslint.boundaries.js'), null)
  assert.equal(crossing(at('finisher/src/a.ts'), 'mediabunny'), null)
})

test('ESLint reports a crossing in JavaScript and TypeScript, import type included', async () => {
  const eslint = new ESLint({
    cwd: ROOT,
    overrideConfigFile: true,
    overrideConfig: [
      { files: ['**/*.ts'], languageOptions: { parser: tseslint.parser } },
      boundaries,
    ],
  })
  const lint = async (code, rel) =>
    (await eslint.lintText(code, { filePath: at(rel) }))[0].messages.map((m) => m.ruleId)
  assert.deepEqual(
    await lint("import { a } from '../../name-graphics/src/a.js'\n", 'finisher/src/x.js'),
    ['uvt/boundaries'],
  )
  assert.deepEqual(await lint("export * from '../finisher/src/a'\n", 'shared/x.js'), [
    'uvt/boundaries',
  ])
  assert.deepEqual(
    await lint("const m = import('../../finisher/src/a.js')\n", 'shared/core/x.js'),
    ['uvt/boundaries'],
  )
  assert.deepEqual(
    await lint(
      "import type { A } from '../../finisher/src/a'\nexport type B = A\n",
      'name-graphics/src/x.ts',
    ),
    ['uvt/boundaries'],
  )
  assert.deepEqual(
    await lint("import { a } from '../../shared/core/a.js'\nexport { a }\n", 'finisher/src/x.js'),
    [],
  )
})

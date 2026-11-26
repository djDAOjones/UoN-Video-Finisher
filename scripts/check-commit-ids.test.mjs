// Tests for the root's commit-ID check (UVT-1), run by `node --test` in the root gate.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { idOf, judge, ledgerOf } from './check-commit-ids.mjs'

const none = () => false
const all = () => true

test('a path belongs to the ledger of its folder', () => {
  assert.equal(ledgerOf('finisher/src/main.ts').name, 'finisher')
  assert.equal(ledgerOf('name-graphics/project/backlog.md').name, 'name-graphics')
  assert.equal(ledgerOf('shared/core/logger.ts').name, 'root')
  assert.equal(ledgerOf('lobby/index.html').name, 'root')
  assert.equal(ledgerOf('package.json').name, 'root')
  assert.equal(ledgerOf('finisher-student/index.html').name, 'root')
})

test('the ID is read from `ID: summary`', () => {
  assert.equal(idOf('VH-226: the move'), 'VH-226')
  assert.equal(idOf('REFRESH-503: refresh to build d599678'), 'REFRESH-503')
  assert.equal(idOf('INTAKE: the parent founded'), 'INTAKE')
  assert.equal(idOf('Merge pull request #8'), null)
  assert.equal(idOf('vh-1: lower case'), null)
})

test('VH, VNG and UVT commits write only their own folders', () => {
  assert.equal(judge('VH-1: x', ['finisher/a.ts', 'finisher/project/backlog.md'], none), null)
  assert.match(
    judge('VH-1: x', ['finisher/a.ts', 'RESTRUCTURE-LOG.md'], all),
    /may write only finisher\//,
  )
  assert.equal(judge('VNG-2: x', ['name-graphics/src/a.ts'], none), null)
  assert.match(judge('VNG-2: x', ['finisher/src/a.ts'], all), /may write only name-graphics\//)
  assert.equal(judge('UVT-3: x', ['shared/a.ts', 'package.json', 'lobby/index.html'], none), null)
  assert.match(
    judge('UVT-3: x', ['shared/a.ts', 'finisher/eslint.config.js'], all),
    /outside finisher\/ and name-graphics\//,
  )
})

test("a ledger's other IDs write one ledger, which names them", () => {
  const finisherOnly = (ledger) => ledger.name === 'finisher'
  assert.equal(judge('REFRESH-503: x', ['finisher/tools/VERSION'], finisherOnly), null)
  assert.match(
    judge('REFRESH-503: x', ['name-graphics/tools/VERSION'], finisherOnly),
    /not named in name-graphics\/project\//,
  )
  assert.match(
    judge('PLAN-10: x', ['finisher/project/backlog.md', 'RESTRUCTURE-LOG.md'], all),
    /2 ledgers/,
  )
})

test('a subject with no ID fails; an empty commit passes', () => {
  assert.match(judge('fix things', ['package.json'], all), /names no ID/)
  assert.equal(judge('UVT-1: empty', [], none), null)
})

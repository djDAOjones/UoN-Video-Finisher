/**
 * The names a person's saved choices and stored jobs are filed under, held
 * as they are.
 *
 * VH-225 renamed the page "UoN Video Finisher". These identifiers keep
 * `uon-video-helper`: a browser files each saved choice and each stored job
 * under the exact name it was written with, so renaming one would orphan what
 * a person already saved, and nothing would say so. House conventions, "Fail
 * loudly on data loss": silent loss is the worst outcome available to this
 * app. Moving any of them is a migration, a design of its own, never part of
 * a name change; this suite fails so that one cannot slip in with one.
 */

import { readdirSync, readFileSync } from 'node:fs'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'

import { LANGUAGE_PREFERENCE_KEY, VIDEO_LANGUAGE_PREFERENCE_KEY } from '../src/config/languages'
import { VIDEO_KIND_PREFERENCE_KEY } from '../src/config/video-kind'
import { ROOT_DIRECTORY } from '../src/media/opfs'
import { ANNOUNCE_PROGRESS_KEY } from '../src/ui/progress'

const read = (path: string): string => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

/** Every `name` a `new Worker(…, { name })` call in the file passes, read from its syntax tree. */
function workerNames(path: string): string[] {
  const source = ts.createSourceFile(path, read(path), ts.ScriptTarget.Latest, true)
  const names: string[] = []
  const visit = (node: ts.Node): void => {
    if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'Worker') {
      const options = node.arguments?.[1]
      if (options !== undefined && ts.isObjectLiteralExpression(options)) {
        for (const property of options.properties) {
          if (
            ts.isPropertyAssignment(property) &&
            ts.isIdentifier(property.name) &&
            property.name.text === 'name' &&
            ts.isStringLiteralLike(property.initializer)
          ) {
            names.push(property.initializer.text)
          }
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return names
}

describe('the identifiers the rename keeps (VH-225)', () => {
  it('keeps the four saved-choice keys in localStorage', () => {
    expect([
      LANGUAGE_PREFERENCE_KEY,
      VIDEO_LANGUAGE_PREFERENCE_KEY,
      VIDEO_KIND_PREFERENCE_KEY,
      ANNOUNCE_PROGRESS_KEY,
    ]).toEqual([
      'uon-video-helper:language',
      'uon-video-helper:video-language',
      'uon-video-helper:video-kind',
      'uon-video-helper:announce-progress',
    ])
  })

  it('keeps the folder stored jobs live in', () => {
    expect(ROOT_DIRECTORY).toBe('uon-video-helper-jobs')
  })

  it('keeps the job worker’s name', () => {
    expect(workerNames('src/main.ts')).toEqual(['uon-video-helper-job'])
  })

  it('keeps the package name, in the package and both lockfile entries', () => {
    const pkg = JSON.parse(read('package.json')) as { name: string }
    const lock = JSON.parse(read('package-lock.json')) as {
      name: string
      packages: Record<string, { name?: string }>
    }
    expect([pkg.name, lock.name, lock.packages['']?.name]).toEqual([
      'uon-video-helper',
      'uon-video-helper',
      'uon-video-helper',
    ])
  })

  it('files nothing in src/ under the new name', () => {
    const files = readdirSync(new URL('../src/', import.meta.url), { recursive: true, encoding: 'utf8' })
    const named = files.filter((file) => /\.(ts|css)$/.test(file) && read(`src/${file}`).includes('uon-video-finisher'))
    expect(named).toEqual([])
  })
})

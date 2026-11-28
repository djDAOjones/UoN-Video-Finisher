/**
 * The version line's words (VNG-15): the rules file's two-part version
 * identity, as the page's footer says it. The invariant: production names the
 * exact build and nothing else, development says it is development, so a
 * screenshot of a running page always says which code it shows.
 */

import { describe, expect, it } from 'vitest'

import { versionLine } from './version-line'

describe('versionLine', () => {
  it('names only the build in production', () => {
    expect(versionLine({ appVersion: 'v0.1.0', buildId: 'v0.1.0+20261128.abc1234', development: false })).toBe(
      'v0.1.0+20261128.abc1234',
    )
  })

  it('names the version, the build and the mode in development', () => {
    expect(versionLine({ appVersion: 'v0.1.0', buildId: 'v0.1.0+20261128.abc1234', development: true })).toBe(
      'v0.1.0 · v0.1.0+20261128.abc1234 · development',
    )
  })
})

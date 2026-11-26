/**
 * VH-161: the page registers the service worker in a built page only, and a
 * refusal is logged, never thrown into the page.
 */

import { describe, expect, it, vi } from 'vitest'

import { registerOfflineCache } from './register'

describe('registerOfflineCache', () => {
  it('registers the worker by the URL it is given', () => {
    const register = vi.fn(() => Promise.resolve({}))
    const onError = vi.fn()
    expect(
      registerOfflineCache({ dev: false, container: { register }, scriptUrl: './sw.js', onError }),
    ).toBe(true)
    expect(register).toHaveBeenCalledExactlyOnceWith('./sw.js')
  })

  it('never registers under the dev server', () => {
    const register = vi.fn(() => Promise.resolve({}))
    expect(
      registerOfflineCache({
        dev: true,
        container: { register },
        scriptUrl: '/sw.js',
        onError: vi.fn(),
      }),
    ).toBe(false)
    expect(register).not.toHaveBeenCalled()
  })

  it('does nothing where the browser has no service workers', () => {
    expect(
      registerOfflineCache({
        dev: false,
        container: undefined,
        scriptUrl: '/sw.js',
        onError: vi.fn(),
      }),
    ).toBe(false)
  })

  it('hands a refusal to the logger rather than the page', async () => {
    const refusal = new Error('SecurityError')
    const onError = vi.fn()
    registerOfflineCache({
      dev: false,
      container: { register: () => Promise.reject(refusal) },
      scriptUrl: '/sw.js',
      onError,
    })
    await vi.waitFor(() => expect(onError).toHaveBeenCalledExactlyOnceWith(refusal))
  })
})

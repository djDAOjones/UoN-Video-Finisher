/**
 * The bounded cut-short read inside the inspection (VH-231): it is made once
 * per inspection, its answer is the report's, and a failed or cancelled read
 * stops the inspection by its existing paths rather than passing a guess on.
 *
 * The read itself is `matroska-cut.test.ts`'s; here it is replaced only to
 * make it fail or to cancel during it. The file is a picture and sound MP4
 * built in memory (VH-215's helper), since Node has no WebCodecs and the
 * inspection needs a picture track.
 */

import { afterEach, describe, expect, it, vi } from 'vitest'

import { picturePcmMp4 } from '../../test/helpers/picture-pcm-mp4'
import { inspectFile } from './inspect'
import { matroskaCutShort } from './matroska-cut'
import type * as MatroskaCut from './matroska-cut'
import { CancelledError } from './pipeline'

vi.mock('./matroska-cut', async (importOriginal) => {
  const actual = await importOriginal<typeof MatroskaCut>()
  return { ...actual, matroskaCutShort: vi.fn(actual.matroskaCutShort) }
})

const read = vi.mocked(matroskaCutShort)
const twoSeconds = async (): Promise<Blob> =>
  new Blob([(await picturePcmMp4({ picture: [[0, 2]], sound: [[0, 2]] })).slice()])

describe('the cut-short read in the inspection (VH-231)', () => {
  afterEach(() => read.mockClear())

  it('happy path: an MP4 is read once and never said cut short', async () => {
    const report = await inspectFile(await twoSeconds())
    expect(report.cutShort).toBe(false)
    expect(read).toHaveBeenCalledTimes(1)
    expect(read.mock.calls[0]?.[1]).toBe('MP4')
  })

  it('error: a failed read fails the inspection, never reported as a whole file', async () => {
    read.mockRejectedValueOnce(new Error('the read failed'))
    await expect(inspectFile(await twoSeconds())).rejects.toThrow('the read failed')
  })

  it('error: a cancel during the read stops the inspection', async () => {
    const controller = new AbortController()
    read.mockImplementationOnce(() => {
      controller.abort()
      return Promise.resolve(false)
    })
    await expect(
      inspectFile(await twoSeconds(), { signal: controller.signal }),
    ).rejects.toBeInstanceOf(CancelledError)
  })
})

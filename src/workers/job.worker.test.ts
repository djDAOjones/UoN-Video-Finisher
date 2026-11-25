/**
 * VH-244, wish line VH-215.3: the release guard through the worker's own
 * path, not by its predicate alone (`cardTellsMade`, proved in
 * `media/ends-early.test.ts`). A Student submission job whose encode made a
 * length that prints other than its card says is refused: one `failed` reply,
 * the working output disposed of, nothing kept for a later request to find.
 *
 * The first test to boot the worker module. Importing it runs its boot (a
 * message listener, the global error hooks, the OPFS sweep), so each test
 * stands in the worker's global scope, imports the module afresh and puts
 * every global back. What the job leans on that Node cannot run is stood in:
 * the inspection, the encode, the working store, the card's drawing and the
 * finished file's read-back. The guard itself, the failure's name and the
 * rules of what is kept (`retained.ts`) are the real ones.
 */

import { afterEach, describe, expect, it, vi } from 'vitest'

import type { LogRecord } from '../core/logger'
import type { TitleCardRequest, WorkerOutbound, WorkerRequest, WorkerResponse } from './protocol'

const heavy = vi.hoisted(() => ({
  /** Stand-ins for the two errors the worker tells apart by class. */
  CancelledError: class CancelledError extends Error {},
  UnreadableFileError: class UnreadableFileError extends Error {},
  inspectFile: vi.fn(),
  openInput: vi.fn(),
  runPipeline: vi.fn(),
  openWorkspace: vi.fn(),
  dispose: vi.fn(),
  sweepOrphanedJobs: vi.fn(),
  drawTitleCardFrame: vi.fn(),
  requireReadableOutputVideo: vi.fn(),
}))

vi.mock('../media/inspect', () => ({
  inspectFile: heavy.inspectFile,
  openInput: heavy.openInput,
  UnreadableFileError: heavy.UnreadableFileError,
}))
vi.mock('../media/pipeline', () => ({
  runPipeline: heavy.runPipeline,
  CancelledError: heavy.CancelledError,
  throwIfAborted: (signal: AbortSignal | undefined): void => {
    if (signal?.aborted) throw new heavy.CancelledError()
  },
  keptRangeOnFrames: vi.fn(),
}))
vi.mock('../media/opfs', () => ({
  OpfsWorkspace: { open: heavy.openWorkspace },
  sweepOrphanedJobs: heavy.sweepOrphanedJobs,
}))
vi.mock('../media/title-card-frame', () => ({
  drawTitleCardFrame: heavy.drawTitleCardFrame,
  brandingAllowanceSeconds: vi.fn(),
}))
vi.mock('../media/output-integrity', () => ({
  requireReadableOutputVideo: heavy.requireReadableOutputVideo,
}))

/** The guard's own warn line, which no other refusal writes (`job.worker.ts`). */
const GUARD_LINE = 'the card would misstate the length made'

/** A reply, as against the progress and uncaught events the worker also posts. */
const isReplyTo =
  (id: number) =>
  (message: WorkerOutbound): message is WorkerResponse =>
    message.kind !== 'uncaught' && message.kind !== 'stage' && message.id === id

/**
 * Boots the worker in a stood-in global scope, with a ten-second 720p source
 * and a pipeline that makes `madeSeconds` of silent video.
 */
async function bootWorker(madeSeconds: number | null) {
  vi.resetModules()
  vi.resetAllMocks()
  // Only what the job reads of a `SourceReport` and a `PipelineResult`.
  heavy.inspectFile.mockResolvedValue({
    durationSeconds: 10,
    cutShort: false,
    audio: null,
    video: {
      displayWidth: 1280,
      displayHeight: 720,
      durationSeconds: 10,
      averageBitrateBps: null,
      conform: { frameRate: 25, sourceFrameRate: 25, frameDeltaRatio: 0 },
    },
  })
  heavy.openInput.mockReturnValue({ getPrimaryAudioTrack: () => Promise.resolve(null) })
  heavy.openWorkspace.mockResolvedValue({ dispose: heavy.dispose })
  heavy.dispose.mockResolvedValue(undefined)
  heavy.sweepOrphanedJobs.mockResolvedValue(0)
  heavy.drawTitleCardFrame.mockResolvedValue({})
  heavy.requireReadableOutputVideo.mockResolvedValue(undefined)
  heavy.runPipeline.mockResolvedValue({
    file: new File([], 'made.mp4'),
    brandingApplied: { opening: false, closing: false },
    closingMode: null,
    outputWarnings: [],
    contentOffsetSeconds: 0,
    audioIncluded: false,
    endedEarly: null,
    madeSeconds,
  })

  const posted: WorkerOutbound[] = []
  const waiting: Array<() => void> = []
  const postMessage = vi.fn((message: WorkerOutbound) => {
    posted.push(message)
    for (const check of waiting.splice(0)) check()
  })
  const listeners = new Map<string, (event: { readonly data: WorkerRequest }) => void>()
  // The worker's scope and the global object are one in a worker: the module
  // listens on `self`, the error capture on `globalThis`.
  const addEventListener = (
    type: string,
    listener: (event: { readonly data: WorkerRequest }) => void,
  ): void => {
    listeners.set(type, listener)
  }
  vi.stubGlobal('self', { postMessage, addEventListener })
  vi.stubGlobal('addEventListener', addEventListener)

  await import('./job.worker')
  const deliver = listeners.get('message')
  if (!deliver) throw new Error('the worker registered no message listener')

  return {
    posted,
    postMessage,
    send: (request: WorkerRequest): void => deliver({ data: request }),
    /** The first reply to `id`, whenever it is posted. */
    replyTo: (id: number): Promise<WorkerResponse> =>
      new Promise((resolve) => {
        const check = (): void => {
          const reply = posted.find(isReplyTo(id))
          if (reply) resolve(reply)
          else waiting.push(check)
        }
        check()
      }),
  }
}

type Worker = Awaited<ReturnType<typeof bootWorker>>

/** A Submission card saying the video runs for `runningTime`. */
const submissionCard = (runningTime: string): TitleCardRequest => ({
  layout: 'submission',
  text: {
    assignment: 'An assignment',
    module: 'A module',
    convenor: 'A convenor',
    ids: ['20123456'],
    runningTime,
    made: '25 November 2026',
    labels: {
      module: 'Module',
      convenor: 'Convenor',
      ids: 'Student ID number',
      running: 'Running time',
      made: 'Made',
    },
  },
  headingFontUrl: null,
  cjkFontStack: 'sans-serif',
  colours: { ground: '#10263b', ink: '#ffffff' },
})

/** A job for the whole file, with the card given or none. */
const job = (id: number, titleCard?: TitleCardRequest): WorkerRequest => ({
  kind: 'process',
  id,
  file: new Blob([]),
  presetId: 'best',
  branding: { opening: false, closing: false },
  backgroundColour: '#10263b',
  brandingBaseUrl: 'http://localhost/branding',
  contentClass: 'unknown',
  ...(titleCard ? { titleCard } : {}),
})

/** The id the worker opened the job's working store under: the one a `discard` names. */
const jobIdOpened = (): string => {
  const opened: unknown = heavy.openWorkspace.mock.calls[0]?.[0]
  if (typeof opened !== 'string') throw new Error('no working store was opened')
  return opened
}

/** Asks for the job's kept result to be released, and waits for the worker to say it has. */
async function discard(worker: Worker, id: number, jobId: string): Promise<void> {
  worker.send({ kind: 'discard', id, jobId })
  expect(await worker.replyTo(id)).toEqual({ kind: 'discarded', id })
}

/** The worker's own log, drained as the diagnostics bundle drains it. */
async function logsOf(worker: Worker, id: number): Promise<readonly LogRecord[]> {
  worker.send({ kind: 'drainLogs', id })
  const reply = await worker.replyTo(id)
  if (reply.kind !== 'logs') throw new Error('no logs')
  return reply.records
}

describe('the release guard, through the worker (VH-215.3)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.resetModules()
  })

  it.each([
    ['a length that prints shorter than the card', 7.04],
    ['no length at all', null],
  ])(
    'refuses a submission whose encode made %s: one failure, nothing kept',
    async (_name, madeSeconds) => {
      const worker = await bootWorker(madeSeconds)
      worker.send(job(1, submissionCard('0:10')))
      const reply = await worker.replyTo(1)

      // Refused after the encode, which alone knows the length made, and
      // before the finished file is checked or offered.
      expect(reply).toMatchObject({ kind: 'failed', id: 1, code: 'unknown' })
      expect(heavy.runPipeline).toHaveBeenCalledTimes(1)
      expect(heavy.requireReadableOutputVideo).not.toHaveBeenCalled()
      // By the guard, not by anything else that fails a job without a name.
      expect(await logsOf(worker, 2)).toContainEqual(
        expect.objectContaining({ level: 'warn', message: GUARD_LINE, data: { madeSeconds } }),
      )

      // The working output is gone before the page hears of the failure.
      expect(heavy.dispose).toHaveBeenCalledTimes(1)
      const saidAt = worker.postMessage.mock.invocationCallOrder[worker.posted.indexOf(reply)]
      expect(heavy.dispose.mock.invocationCallOrder[0]).toBeLessThan(saidAt!)

      // Nothing was kept: releasing the job finds no working store to dispose of.
      await discard(worker, 3, jobIdOpened())
      expect(heavy.dispose).toHaveBeenCalledTimes(1)
      // And one reply was all the job ever got: no `processed` beside it.
      expect(worker.posted.filter(isReplyTo(1))).toEqual([reply])
    },
  )

  it('lets a submission go whose encode made the length its card says, and keeps it', async () => {
    // 10.4 s prints `0:10`, as the card does.
    const worker = await bootWorker(10.4)
    worker.send(job(1, submissionCard('0:10')))
    const reply = await worker.replyTo(1)

    expect(reply).toMatchObject({ kind: 'processed', id: 1, jobId: jobIdOpened() })
    expect(heavy.requireReadableOutputVideo).toHaveBeenCalledTimes(1)
    expect((await logsOf(worker, 2)).map((entry) => entry.message)).not.toContain(GUARD_LINE)
    // Kept, not disposed of, until the page lets go of it.
    expect(heavy.dispose).not.toHaveBeenCalled()
    await discard(worker, 3, jobIdOpened())
    expect(heavy.dispose).toHaveBeenCalledTimes(1)
    expect(worker.posted.filter(isReplyTo(1))).toEqual([reply])
  })

  it('holds no other job to it: without a Submission card, any length made is let go', async () => {
    const worker = await bootWorker(null)
    worker.send(job(1))
    expect(await worker.replyTo(1)).toMatchObject({ kind: 'processed', id: 1 })
    worker.send(
      job(2, {
        ...submissionCard('0:10'),
        layout: 'staff',
        text: { title: 'A title', department: '', authors: '', date: '' },
      }),
    )
    expect(await worker.replyTo(2)).toMatchObject({ kind: 'processed', id: 2 })
  })
})

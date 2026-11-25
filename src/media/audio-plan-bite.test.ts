/**
 * VH-244, wish line VH-193.2: the limiter's bite where it is not the plain
 * figure `sub-block-sound.test.ts` pins. Three paths of the real `planAudio`,
 * read from the plan it returns: no figure for digital silence, no figure
 * when a limited pass measures no level, and the figure of the chain that
 * will run when the encode's overshoot lowers the ceiling (VH-83). Made from
 * the probe VH-198 kept
 * (`reviews/2026-10-25/design-pass-3/evidence/measurements/vh193-2-paths-2026-10-25.md`).
 *
 * Two modules are wrapped, never replaced. The real `AudioChain` is
 * subclassed to note each pass's gain and ceiling and what it was given, and,
 * for one case, to blank what a limited pass gives back: no real signal
 * measures a level unlimited and none limited. The real `limiterCeilingFor`
 * stands; only `CodecProbe` is stood in, since Node has no WebCodecs encoder,
 * and answers a chosen cost.
 */

import { afterEach, describe, expect, it, vi } from 'vitest'

import { pcmMp4, soundTrackOf } from '../../test/helpers/pcm-mp4'
import { AudioAnalyser } from '../audio/analyse'
import type * as Chain from '../audio/chain'
import { detectProductionWarnings } from '../audio/warnings'
import { LIMITER } from '../config/audio'
import { PRESETS } from '../config/presets'
import { clearLogRecords, getLogRecords } from '../core/logger'
import { planAudio } from './audio-plan'
import { limiterCeilingFor, type CodecCost } from './codec-probe'
import type * as CodecProbeModule from './codec-probe'
import { audioEncodingConfigFor } from './encoding'

/** One pass through the chain, as `planAudio` made it. */
interface Pass {
  readonly gainDb: number | null
  readonly ceilingDbtp: number | undefined
  /** Every block the chain was given, copied before the chain changed it. */
  readonly given: Float32Array[][]
}

/** What the wrapped modules note, and are told to do, for the case in hand. */
interface Wrapped {
  passes: Pass[]
  /** What a limited pass gives back: its own output, digital silence, or no numbers. */
  limitedOutput: 'real' | 'silence' | 'not-a-number'
  /** What the stood-in codec probe measured, or `null` for no figure. */
  codec: CodecCost | null
}

const wrapped = vi.hoisted<Wrapped>(() => ({ passes: [], limitedOutput: 'real', codec: null }))

vi.mock('../audio/chain', async (importOriginal) => {
  const actual = await importOriginal<typeof Chain>()
  class NotingChain extends actual.AudioChain {
    private readonly pass: Pass
    constructor(options: Chain.AudioChainOptions) {
      super(options)
      this.pass = { gainDb: options.gainDb, ceilingDbtp: options.limiterCeilingDbtp, given: [] }
      wrapped.passes.push(this.pass)
    }
    override process(channels: readonly Float32Array[]): Float32Array[] {
      this.pass.given.push(channels.map((channel) => channel.slice()))
      return this.shaped(super.process(channels))
    }
    override flush(): Float32Array[] {
      return this.shaped(super.flush())
    }
    /** The measuring pass is always its own; a limited one is blanked when the case asks. */
    private shaped(processed: Float32Array[]): Float32Array[] {
      if (this.pass.gainDb === null || wrapped.limitedOutput === 'real') return processed
      const value = wrapped.limitedOutput === 'silence' ? 0 : Number.NaN
      return processed.map((channel) => new Float32Array(channel.length).fill(value))
    }
  }
  return { ...actual, AudioChain: NotingChain }
})

vi.mock('./codec-probe', async (importOriginal) => {
  const actual = await importOriginal<typeof CodecProbeModule>()
  return {
    ...actual,
    CodecProbe: {
      open: () =>
        Promise.resolve({
          add: () => Promise.resolve(),
          cancel: () => Promise.resolve(),
          finish: () => Promise.resolve(wrapped.codec),
        }),
    },
  }
})

const { AudioChain: RealAudioChain } = await vi.importActual<typeof Chain>('../audio/chain')

/**
 * Speech-like and short: a 220 Hz tone under a 4 Hz syllable envelope, with a
 * 2 ms peak every half second for the limiter to hold.
 */
const speechLike = (seconds: number): number =>
  0.05 * (0.6 + 0.4 * Math.sin(2 * Math.PI * 4 * seconds)) * Math.sin(2 * Math.PI * 220 * seconds) +
  (seconds % 0.5 < 0.002 ? 0.12 : 0)

/** The whole file's plan, with the passes it ran noted afresh. */
async function planOf(
  bytes: Uint8Array,
  options: { readonly encoded?: boolean; readonly limitedOutput?: Wrapped['limitedOutput'] } = {},
) {
  wrapped.passes = []
  wrapped.limitedOutput = options.limitedOutput ?? 'real'
  clearLogRecords()
  const plan = await planAudio(
    await soundTrackOf(bytes),
    undefined,
    undefined,
    options.encoded
      ? (channelCount) => audioEncodingConfigFor(PRESETS.best, channelCount)
      : undefined,
  )
  if ('silent' in plan) throw new Error('a plan, not a silent keep')
  return plan
}

/** The bite the plan logged, rounded; `undefined` if it logged no plan. */
const loggedBite = (): unknown =>
  getLogRecords().find((entry) => entry.message === 'chain planned')?.data?.['limiterBiteLu']

/** What the page would be told of the limiting, as the pipeline asks (`pipeline.ts`). */
const limitingWarnings = (limiterBiteLu: number | null) =>
  detectProductionWarnings({ limiterBiteLu, metadataCarried: true })

describe('the limiter’s bite with no level to measure (VH-193.2)', () => {
  afterEach(() => {
    wrapped.limitedOutput = 'real'
  })

  it('is no figure for digital silence, which no limited pass ever hears', async () => {
    // A second of zeros: enough decoded sound to be planned, not a silent keep.
    const plan = await planOf(await pcmMp4({ spans: [[0, 1]], level: () => 0 }))
    expect(Number.isFinite(plan.analysis.integratedLufs)).toBe(false)
    expect(plan.gainDb).toBe(0)
    expect(wrapped.passes.map((pass) => pass.gainDb)).toEqual([null])
    expect(plan.limiterBiteLu).toBeNull()
    expect(loggedBite()).toBeNull()
    expect(limitingWarnings(plan.limiterBiteLu)).toEqual([])
  })

  it.each(['silence', 'not-a-number'] as const)(
    'is no figure when the limited pass measures no level, and the solver stops there: %s',
    async (limitedOutput) => {
      const plan = await planOf(await pcmMp4({ spans: [[0, 1]], level: speechLike }), {
        limitedOutput,
      })
      // The unlimited pass measured a level, so a gain was estimated and one
      // limited pass ran at it; the solver took no step from a level that is
      // not one (`gain-solve.ts`), and kept the estimate.
      expect(Number.isFinite(plan.analysis.integratedLufs)).toBe(true)
      const limited = wrapped.passes.filter((pass) => pass.gainDb !== null)
      expect(limited.map((pass) => pass.gainDb)).toEqual([plan.gainDb])
      expect(Number.isFinite(plan.gainDb)).toBe(true)
      expect(plan.predictedOutputLufs).toBeNull()
      // Unguarded, the estimate less no level is an endless bite, and the
      // page would say the sound was heavily limited.
      expect(plan.limiterBiteLu).toBeNull()
      expect(loggedBite()).toBeNull()
      expect(limitingWarnings(plan.limiterBiteLu)).toEqual([])
    },
  )
})

describe('the limiter’s bite under a ceiling the encode lowered (VH-193.2)', () => {
  /** Over the standing allowance, so the ceiling moves (`limiterCeilingFor`). */
  const OVERSHOOT_DB = 2.5
  const twoSeconds = () => pcmMp4({ spans: [[0, 2]], level: speechLike })

  afterEach(() => {
    wrapped.codec = null
  })

  /** The plan of a job whose encode was measured to overshoot, at a chosen cost. */
  const planEncodedAt = async (costLu: number) => {
    wrapped.codec = { costLu, overshootDb: OVERSHOOT_DB, probedSeconds: 2 }
    return planOf(await twoSeconds(), { encoded: true })
  }

  type Plan = Awaited<ReturnType<typeof planOf>>

  /** What a fresh, real chain leaves of the measuring pass's own input, in LUFS. */
  const throughFreshChain = (plan: Plan, gainDb: number | null, ceilingDbtp?: number): number => {
    const { sampleRate, channelCount, envelope } = plan
    const chain = new RealAudioChain({
      sampleRate,
      channelCount,
      envelope,
      gainDb,
      ...(ceilingDbtp === undefined ? {} : { limiterCeilingDbtp: ceilingDbtp }),
    })
    const analyser = new AudioAnalyser({ sampleRate, channelCount })
    for (const block of wrapped.passes[0]!.given) {
      analyser.addFrames(chain.process(block.map((channel) => channel.slice())))
    }
    analyser.addFrames(chain.flush())
    return analyser.finish().integratedLufs
  }

  /** The bite a chain of the plan's own gain takes under a ceiling, measured apart from the plan. */
  const biteUnder = (plan: Plan, ceilingDbtp: number): number =>
    throughFreshChain(plan, null) + plan.gainDb - throughFreshChain(plan, plan.gainDb, ceilingDbtp)

  it('measures the probed gain again under the lowered ceiling, and takes the bite there', async () => {
    // With no encoder to ask, the solver is inside tolerance on its first
    // limited pass. So were the probed pass not measured again, a job whose
    // codec costs nothing would keep that gain and the standing ceiling's
    // bite, and pass C would run another chain.
    const standing = await planOf(await twoSeconds())
    expect(standing.limiterCeilingDbtp).toBe(LIMITER.ceilingDbtp)
    expect(wrapped.passes).toHaveLength(2)

    const plan = await planEncodedAt(0)
    const loweredDbtp = limiterCeilingFor(OVERSHOOT_DB)
    expect(loweredDbtp).toBeLessThan(LIMITER.ceilingDbtp)
    expect(plan.limiterCeilingDbtp).toBe(loweredDbtp)

    // The measuring pass; the probed pass under the standing ceiling; the
    // same gain again under the lowered one; and every pass after it there.
    const [measuring, probed, again, ...later] = wrapped.passes
    expect(measuring!.gainDb).toBeNull()
    expect(probed).toMatchObject({ gainDb: standing.gainDb, ceilingDbtp: LIMITER.ceilingDbtp })
    expect(again).toMatchObject({ gainDb: standing.gainDb, ceilingDbtp: loweredDbtp })
    expect(later.every((pass) => pass.ceilingDbtp === loweredDbtp)).toBe(true)
    expect(wrapped.passes.at(-1)!.gainDb).toBe(plan.gainDb)

    // The plan's bite is what a chain of its own gain and ceiling takes, and
    // not what the standing ceiling would take at that gain.
    expect(plan.limiterBiteLu).toBeCloseTo(biteUnder(plan, loweredDbtp), 6)
    expect(biteUnder(plan, loweredDbtp) - biteUnder(plan, LIMITER.ceilingDbtp)).toBeGreaterThan(
      0.05,
    )
    expect(loggedBite()).toBeCloseTo(biteUnder(plan, loweredDbtp), 2)
  })

  it('takes the bite from the chain’s own loudness, never the loudness after the codec', async () => {
    const COST_LU = 0.2
    const plan = await planEncodedAt(COST_LU)
    const chainLufs = throughFreshChain(plan, plan.gainDb, plan.limiterCeilingDbtp)
    // The solver's figure has the cost in it; the bite does not.
    expect(plan.predictedOutputLufs).toBeCloseTo(chainLufs - COST_LU, 6)
    expect(plan.limiterBiteLu).toBeCloseTo(biteUnder(plan, plan.limiterCeilingDbtp), 6)
  })
})

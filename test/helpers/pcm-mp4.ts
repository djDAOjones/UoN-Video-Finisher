/**
 * A sound-only MP4 built in memory, for the tests that need a real container
 * read by Mediabunny in Node (VH-139).
 *
 * PCM, because Mediabunny decodes it in JavaScript: the sinks, the index and
 * the analysis pass all run without WebCodecs, so a file cut short can be
 * proved end to end with no fixture on disk. Each block carries a constant
 * level, so a test can tell which blocks a pass decoded.
 */

import {
  ALL_FORMATS,
  BufferSource,
  BufferTarget,
  EncodedAudioPacketSource,
  EncodedPacket,
  Input,
  Mp4OutputFormat,
  Output,
  type InputAudioTrack,
} from 'mediabunny'

export const PCM_SAMPLE_RATE = 48_000
export const PCM_CHANNELS = 2
/** 100 ms blocks: small enough that a cut lands mid-file, large enough to be quick. */
export const PCM_BLOCK_SECONDS = 0.1

export interface PcmMp4Options {
  /** Where the sound starts and stops, in seconds; a gap between two spans is a hole. */
  readonly spans: ReadonlyArray<readonly [number, number]>
  /** Each block's length, {@link PCM_BLOCK_SECONDS} unless a test needs finer steps (VH-213). */
  readonly blockSeconds?: number
  /**
   * Each frame's level on both channels, as a fraction of full scale, from
   * its time in seconds: a tone, or digital silence, for a test of the plan's
   * figures (VH-244). The quiet, steady level when absent.
   */
  readonly level?: (seconds: number) => number
}

/** A 16-bit sample's full scale. */
const PCM_FULL_SCALE = 32_767

/** One block of a chosen level, both channels alike, clipped to 16 bits. */
function levelledBlock(
  level: (seconds: number) => number,
  fromSeconds: number,
  blockFrames: number,
): Int16Array {
  const samples = new Int16Array(blockFrames * PCM_CHANNELS)
  for (let frame = 0; frame < blockFrames; frame++) {
    const value = Math.round(level(fromSeconds + frame / PCM_SAMPLE_RATE) * PCM_FULL_SCALE)
    const clipped = Math.max(-PCM_FULL_SCALE, Math.min(PCM_FULL_SCALE, value))
    for (let channel = 0; channel < PCM_CHANNELS; channel++) {
      samples[frame * PCM_CHANNELS + channel] = clipped
    }
  }
  return samples
}

/** Muxes the spans' blocks as 16-bit PCM, at a quiet, steady level unless one is given. */
export async function pcmMp4(options: PcmMp4Options): Promise<Uint8Array> {
  const output = new Output({
    // In memory, for a test: the file is a few hundred kilobytes.
    format: new Mp4OutputFormat({ fastStart: 'in-memory' }),
    target: new BufferTarget(),
  })
  const source = new EncodedAudioPacketSource('pcm-s16')
  output.addAudioTrack(source)
  await output.start()
  const blockSeconds = options.blockSeconds ?? PCM_BLOCK_SECONDS
  const blockFrames = Math.round(blockSeconds * PCM_SAMPLE_RATE)
  let first = true
  for (const [from, to] of options.spans) {
    for (let index = 0; from + index * blockSeconds < to - 1e-9; index++) {
      const samples = options.level
        ? levelledBlock(options.level, from + index * blockSeconds, blockFrames)
        : new Int16Array(blockFrames * PCM_CHANNELS).fill(1000)
      const packet = new EncodedPacket(
        new Uint8Array(samples.buffer),
        'key',
        from + index * blockSeconds,
        blockSeconds,
      )
      await source.add(
        packet,
        first
          ? {
              decoderConfig: {
                codec: 'pcm-s16',
                sampleRate: PCM_SAMPLE_RATE,
                numberOfChannels: PCM_CHANNELS,
              },
            }
          : undefined,
      )
      first = false
    }
  }
  await output.finalize()
  return new Uint8Array(output.target.buffer!)
}

/** The bytes up to `fraction` of the file: an interrupted copy, its index whole. */
export function cutShort(bytes: Uint8Array, fraction: number): Uint8Array {
  return bytes.subarray(0, Math.floor(bytes.length * fraction))
}

/** The file's sound track, read as the app reads one. */
export async function soundTrackOf(bytes: Uint8Array): Promise<InputAudioTrack> {
  const input = new Input({ formats: ALL_FORMATS, source: new BufferSource(bytes) })
  const track = await input.getPrimaryAudioTrack()
  if (!track) throw new Error('no sound track')
  return track
}

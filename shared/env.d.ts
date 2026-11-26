/**
 * The build-time values shared code reads, for `shared/`'s own type check
 * and tests (UVT-2). In a tool, its own `src/vite-env.d.ts` declares them and
 * its `vite.config.ts` injects them; this file is never in a tool's program.
 */

/** The release name, e.g. `v0.1.0`. See `core/version.ts`. */
declare const __APP_VERSION__: string
/** The commit-pinned build id. See `core/version.ts`. */
declare const __BUILD_ID__: string

/**
 * File System Access API, feature-detected by `core/diagnostics.ts`; not in
 * TypeScript's DOM lib at the pinned version. Each tool declares it the same
 * way in its own `src/vite-env.d.ts`.
 */
declare function showSaveFilePicker(options?: {
  suggestedName?: string
  types?: { description?: string; accept: Record<string, string[]> }[]
}): Promise<FileSystemFileHandle>

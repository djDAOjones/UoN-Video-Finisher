/// <reference types="vite/client" />

// Copied from the UoN Video Finisher at 27f51dd (VNG-1), its branding directory dropped.

/** Injected by `define` in `vite.config.ts`. See `src/core/version.ts`. */
declare const __APP_VERSION__: string
/** Injected by `define` in `vite.config.ts`. See `src/core/version.ts`. */
declare const __BUILD_ID__: string

/**
 * File System Access API. Not in TypeScript's DOM lib at the version this
 * project pins, and only `core/diagnostics.ts` feature-detects it today; the
 * save step will use it properly. Declared narrowly rather than reaching for
 * `any`.
 */
declare function showSaveFilePicker(options?: {
  suggestedName?: string
  types?: { description?: string; accept: Record<string, string[]> }[]
}): Promise<FileSystemFileHandle>

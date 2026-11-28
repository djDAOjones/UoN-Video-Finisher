// Types for scripts/check-build.mjs (VNG-15), for the tests project, which imports it to test what the build check
// finds; after the Finisher's scripts/package-xerte.d.mts. The JSDoc in the script is the source; keep the two equal.

/** The preview's base path on Pages, as the deploy workflow derives it from the repository's name. */
export declare const DEFAULT_BASE: string
/** A new, empty folder under the system's temporary folder, refused inside the repository. */
export declare function temporaryFolder(prefix: string): string
/** Builds the page into `directory` at the base path `base`; throws if the build fails. */
export declare function buildInto(directory: string, base: string): void
/** What is wrong with the build in `directory` for the base path `base`, one line each. */
export declare function problems(directory: string, base: string): string[]

/**
 * The seed's logic, in the core (VNG-15): the words of the page's version
 * line, moved out of `src/main.ts` (VNG-1, after the Finisher's VH-66,
 * `finisher/` at 27f51dd). Pure, and on the core layer: no DOM, no clock, no
 * build values read here; the entry passes them in.
 */

/** The rules file's two-part version identity, and whether this is a development build. */
export interface VersionIdentity {
  /** "What release is this?": `v` and package.json's version. */
  appVersion: string
  /** "Exactly what code is live?": the version, the build date and the commit. */
  buildId: string
  /** True on Vite's development server, false in a build. */
  development: boolean
}

/**
 * The version line's text. Production names the build alone, which already
 * carries the version; development names both and says it is development,
 * so a screenshot never passes a development page off as a release. Both are
 * non-secret: the repository is public, and the published build id names the
 * commit.
 */
export function versionLine({ appVersion, buildId, development }: VersionIdentity): string {
  return development ? `${appVersion} · ${buildId} · development` : buildId
}

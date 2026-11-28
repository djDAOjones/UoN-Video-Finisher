/**
 * The seed's page in Carbon React (VNG-15), the page shell VNG-1 wrote in
 * `index.html`, after the Finisher's (`finisher/` at 27f51dd): the skip link,
 * the header band, the title, the promise and the empty state, and the
 * footer band's version line. The starter's sample form, its model,
 * validation and local-storage adapter are not carried (VNG-14): nothing
 * typed is stored (the rules' Always). English only; VNG-4 adds zh-Hans and
 * ms-MY, VNG-5 the form.
 */

import { Heading, SkipToContent, Stack } from '@carbon/react'

/** What the page shows that is worked out at start-up. */
export interface AppProps {
  /** The version line's words, from the core's `versionLine`. */
  version: string
}

/**
 * The page, mounted once by `src/root.tsx`. Pure: no state, nothing read or
 * written outside the render.
 *
 * The header band is deliberately not sticky: a band that follows the scroll
 * can sit on top of the focused control (WCAG 2.4.11), so Carbon's UI shell
 * header, which is fixed, is not used. `on-brand` re-assigns the colour
 * roles, so everything inside a band is drawn, and contrast-tested, as light
 * on the band's ground. A pack's logo arrives in `#brand-header` with VNG-2;
 * the neutral pack has none.
 */
export function App({ version }: AppProps) {
  return (
    <>
      {/* Drawn over the header band when focused, so in the band's roles. */}
      <SkipToContent className="on-brand" href="#main">
        Skip to main content
      </SkipToContent>
      <header className="band band--header on-brand">
        <div className="band-inner" id="brand-header" />
      </header>
      <main className="main" id="main">
        {/* The title belongs to the content, not the band, as in the Finisher.
            Outside any Carbon `Section`, so `Heading` is the page's h1; a
            later item's panel in a `Section` gets an h2 by itself. */}
        <Heading className="page-title">Video Name Graphics</Heading>
        {/* The promise, then the empty state said rather than left blank
            (UI-STANDARDS.md -> Empty and no-data states). */}
        <Stack className="lede" gap="var(--paragraph-gap)">
          <p>
            Make a name graphic for your video: your name, and a second line if you want one, such as your role. Save
            it as a transparent video to lay over your footage in Clipchamp, or as a still picture.
          </p>
          <p>The graphic is made on your device, and nothing you type is uploaded.</p>
          <p>This preview cannot make a graphic yet.</p>
        </Stack>
      </main>
      <footer className="band band--footer on-brand">
        <div className="band-inner">
          <p className="version">{version}</p>
        </div>
      </footer>
    </>
  )
}

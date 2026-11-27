// The placeholder staff lobby (D14), the markup's one source (UVT-8): the
// tools' names and a link to each, no branding, not to be indexed. It is
// rendered to static HTML at build time by scripts/build-lobby.mjs, so the
// page ships no script and so registers no service worker: a worker at the top
// address would take over every tool below it. The real staff and student
// lobbies are a parent item (UVT-6.10).

/**
 * The page's own styles, inline: the lobby is one file. Its one number of
 * its own, the AAA pointer-target floor, is a CSS token named and valued as
 * shared/styles/tokens.carbon.css names it (a test holds the two equal).
 */
const styles = `
:root {
  --target-min: 44px;
}
body {
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  max-width: 40rem;
  margin: 2rem auto;
  padding: 0 1rem;
  color: #000;
  background: #fff;
}
a {
  color: #00e;
  display: inline-flex;
  align-items: center;
  min-block-size: var(--target-min);
  min-inline-size: var(--target-min);
}
li {
  margin-block: 0.75rem;
}
`

/** The whole page, from `<html>` down; the build adds the doctype. */
export function Lobby() {
  return (
    <html lang="en-GB">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, nofollow" />
        <title>UoN Video Tools</title>
        <style>{styles}</style>
      </head>
      <body>
        <main>
          <h1>UoN Video Tools</h1>
          <p>A preview of the tools. Each one runs in your browser.</p>
          <ul>
            <li>
              <a href="finisher/">UoN Video Finisher</a>
            </li>
            <li>
              <a href="name-graphics/">Video Name Graphics</a>
            </li>
          </ul>
        </main>
      </body>
    </html>
  )
}

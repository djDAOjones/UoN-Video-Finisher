/**
 * The interface's shell (VNG-14): the forms starter's `App.tsx` cut to a
 * stateless Carbon React page. The starter's sample form, its model,
 * validation and local-storage adapter are not carried: nothing typed is
 * stored (the rules' Always). VNG-15 rebuilds the seed's page here.
 */

import { Heading, Section } from '@carbon/react'

/**
 * The page's content, mounted by `src/root.tsx`: the title and the seed's
 * empty-state line, said rather than left blank. Pure: no props, no state,
 * nothing read or written outside the render.
 */
export function App() {
  return (
    <main>
      <Section>
        <Heading>Video Name Graphics</Heading>
        <p>This preview cannot make a graphic yet.</p>
      </Section>
    </main>
  )
}

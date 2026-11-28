/**
 * The interface's shell (VH-250): the forms starter's `App.tsx` cut to a
 * stateless Carbon React page. The starter's sample form, its model,
 * validation and local-storage adapter are not carried: nothing typed is
 * stored (the rules' Always). VH-251 rebuilds today's page here.
 */

import { Heading, Section } from '@carbon/react'

/**
 * The page's content, mounted by `src/root.tsx`: the title and an empty-state
 * line, said rather than left blank. Pure: no props, no state, nothing read
 * or written outside the render.
 */
export function App() {
  return (
    <main>
      <Section>
        <Heading>UoN Video Finisher</Heading>
        <p>This preview cannot finish a video yet.</p>
      </Section>
    </main>
  )
}

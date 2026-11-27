// The project's own declarations for the accessibility gate (V31-A11Y): its UI states, dialogs, keyboard functions
// and authored journeys, its server and the source the lint step reads. The pack writes this starter once and never
// overwrites it. Features live in project/a11y/coverage.json, not here. A state with no reviewed ARIA snapshot fails
// its snapshot test; an applicable row no journey claims fails its "not written" test.
export default {
  // How the gate reaches the app: a base URL, and the command that serves it on that URL (or null if already served).
  baseURL: 'http://127.0.0.1:4173',
  server: { command: 'npm run preview -- --port 4173 --strictPort', url: 'http://127.0.0.1:4173' },
  // Source the lint step reads with the project's ESLint configuration, which imports eslint.a11y.mjs.
  lint: ['src'],
  // The house target size for SUP03, in CSS px.
  houseTarget: 44,
  // Each UI state: a name, a path, optional setup with real input, a reviewed ARIA snapshot (a row is credited only
  // when the snapshot lists, with names and states, every node of the roles it speaks to), dialogs, the interactions
  // whose motion the reduced-motion check samples (an empty list declares that none triggers motion), each with the
  // reviewed snapshot taken after it where a control's state changes (4.1.2), and what reflow, text spacing, forced colours and both orientations must keep:
  // content and cue selectors, and functions that return true when they still work.
  states: [
    // { name: 'home', path: '/', snapshot: '- main:\n  - heading "Home" [level=1]', dialogs: [{ name: 'help', opener: '#help' }],
    //   interactions: [{ name: 'open menu', run: async ({ page }) => page.getByRole('button', { name: 'Menu' }).click(), snapshot: '- button "Menu" [expanded]' }],
    //   keeps: { content: ['h1', '#total'], cues: ['#saved-icon'], functions: [{ name: 'save', run: async ({ page }) => { await page.getByRole('button', { name: 'Save' }).click(); return page.getByRole('status').isVisible(); } }] } },
  ],
  // Keyboard functions run at no delay and with long gaps between keys: steps of { focus }, { press } or { type }.
  keyboardFunctions: [
    // { name: 'set-hold', state: 'home', steps: [{ focus: '#hold' }, { press: 'Meta+A' }, { type: '11' }, { press: 'Enter' }], check: async ({ page }) => (await page.locator('#hold').inputValue()) === '11' },
  ],
  // Authored journeys: a name, a catalogue method (j-* or keyboard), the rows it claims, and run({ page, expect, open, record }).
  journeys: [],
  // Extended depth (stage 4), read by `npm run a11y:extended`: VoiceOver journeys through Guidepup (each a state, the rows
  // it claims among those listing vo, steps of { next }, { previous }, { act }, { interact }, { stopInteracting },
  // { press: key }, { type: text }, { perform: command }, { wait: ms }, and the phrases expected in order); media items
  // (a file for ffprobe, caption files with their language, description files, a transcript route, the state and the
  // player's selector); flashing items (a state, a selector, a start control, seconds and fps) with the design constraint.
  // extended: {
  //   voJourneys: [{ name: 'settings-vo', state: 'home', engines: ['webkit', 'chromium'], rows: ['1.3.1', '2.4.1', '4.1.2'], steps: [{ next }, { next }], expected: ['Home, heading level 1', 'Menu, button'] }],
  //   media: [{ name: 'intro', file: 'public/intro.mp4', captions: [{ file: 'public/intro.en.vtt', lang: 'en' }], descriptions: [{ file: 'public/intro-ad.mp4' }], transcript: '/intro-transcript', state: 'home', player: '#intro' }],
  //   flashing: [{ name: 'alert', state: 'home', selector: '#alert', start: '#trigger', seconds: 3, fps: 20 }], flashingConstraint: 'no content flashes more than three times a second by design; alerts fade once',
  // },
  // The sampling, run by hand through `npm run a11y:sample` (the README's "Sampling the states"): the app's own route
  // list where it keeps one, else a walk from the entry points; never against live data. The cap bounds the renders,
  // states × 7 × engines; a sample over it is refused. Defaults apply when this is absent.
  // sample: { entries: ['/'], depth: 2, maxStates: 40, maxActions: 25, topUp: 0.1, cap: 150, engines: ['chromium'], skip: 'delete|remove|sign out|log out|pay|buy|send|submit|purchase|cancel subscription' },
  // The records the session keeps current, each with the note that grounds it; the report computes the rest.
  // records: { rows: { P09: { state: 'pass', note: 'no shared component or environment changed since the baseline' }, P10: { state: 'pass', note: 'no open finding' } } },
};

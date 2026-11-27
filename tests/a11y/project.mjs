// The lobby's declarations for the accessibility gate (UVT-8), the root's own file since the pack wrote its starter:
// the lobby's one state, served as GitHub Pages serves it — a fresh build of lobby/Lobby.tsx under the system's
// temporary folder, at the Pages base path (scripts/serve-lobby.mjs) — the TSX source its lint step reads, the
// reviewed ARIA snapshot, what the adaptations must keep, and a journey for each applicable row a journey method
// checks. Features live in project/a11y/coverage.json, every one absent for this page, with its evidence.
/* global document, window, MutationObserver -- in the callbacks page.evaluate runs in the browser */
const PORT = 4180;
// The Pages base path, as the deploy workflow derives it from the repository's name; serve-lobby.mjs reads the same.
const base = process.env.BASE_PATH || '/UoN-Video-Tools/';

// The page's text in reading order, reviewed against lobby/Lobby.tsx: what 1.3.2's journey compares.
const READING = ['UoN Video Tools', 'A preview of the tools. Each one runs in your browser.', 'UoN Video Finisher', 'Video Name Graphics'];
// The two links, in the order Tab must reach them (2.4.3), each with the folder it hands off to.
const LINKS = ['UoN Video Finisher', 'Video Name Graphics'];
const TARGETS = ['finisher/', 'name-graphics/'];
// Anything that takes input, or speaks as a status: none on this page (3.3.5, 4.1.3, SUP05).
const INPUTS = 'input, select, textarea, button, form, [contenteditable]:not([contenteditable="false"]), [role~="textbox"], [role~="searchbox"], [role~="combobox"], [role~="spinbutton"], [role~="slider"], [role~="switch"], [role~="checkbox"], [role~="radio"], [role~="listbox"], [role~="menu"], [role~="tablist"]';
const LIVE = '[role~="status"], [role~="alert"], [role~="log"], [role~="progressbar"], [role~="marquee"], [role~="timer"], [aria-live], output';

// The name of the focused element, or null when focus is on the page itself.
const focused = (page) => page.evaluate(() => (document.activeElement && document.activeElement !== document.body ? document.activeElement.textContent.trim() : null));
// The lobby's address, a tool's whole address resolved from it (origin, path, no query or fragment), and whether the
// page is now there.
const HOME = `http://127.0.0.1:${PORT}${base}`;
const address = (target) => new URL(target, HOME).href;
const at = (page, target) => page.url() === address(target);
const reach = (page, target) => page.waitForURL((u) => u.href === address(target), { timeout: 5_000 }).catch(() => undefined);
// What the adaptations must keep working: each link, clicked where it now lies, hands off to its tool's address, and
// Back returns to the lobby with both links, so the next check starts from the lobby.
const handoff = (i) => ({
  name: `open ${LINKS[i]}`,
  run: async ({ page }) => {
    const lobby = page.url();
    await Promise.all([reach(page, TARGETS[i]), page.locator(`main a[href="${TARGETS[i]}"]`).click()]);
    const handed = at(page, TARGETS[i]);
    await page.goBack();
    return handed && page.url() === lobby && (await page.locator('main li a').count()) === LINKS.length;
  },
});

export default {
  baseURL: `http://127.0.0.1:${PORT}`,
  server: { command: `node scripts/serve-lobby.mjs --port ${PORT}`, url: HOME },
  // The page's one source: the credited jsx-a11y rules judge the markup the page is rendered from.
  lint: ['lobby'],
  houseTarget: 44,
  states: [
    {
      name: 'home',
      path: base,
      // Reviewed against lobby/Lobby.tsx, captured by `npm run a11y:sample` (discovered.json), 2026-11-27.
      snapshot: [
        '- main:',
        '  - heading "UoN Video Tools" [level=1]',
        '  - paragraph: A preview of the tools. Each one runs in your browser.',
        '  - list:',
        '    - listitem:',
        '      - link "UoN Video Finisher":',
        '        - /url: finisher/',
        '    - listitem:',
        '      - link "Video Name Graphics":',
        '        - /url: name-graphics/',
      ].join('\n'),
      // No interaction: nothing on the page moves or changes state (the coverage file's moving-content, absent).
      interactions: [],
      keeps: { content: ['h1', 'main p', ...TARGETS.map((t) => `main a[href="${t}"]`)], cues: [], functions: LINKS.map((_, i) => handoff(i)) },
    },
  ],
  // The page's function, opening a tool, for each link by real keys from the top of the page — Tab to the link, then
  // Enter — at no delay and with the runner's long gap after every key (2.1.1, 2.1.3). The check waits for the handoff
  // to the tool's address, so the next run starts from a settled page.
  keyboardFunctions: LINKS.map((name, i) => ({
    name: `open-${TARGETS[i].replace('/', '')}`,
    state: 'home',
    steps: [...Array.from({ length: i + 1 }, () => ({ press: 'Tab' })), { press: 'Enter' }],
    check: async ({ page }) => {
      await reach(page, TARGETS[i]);
      return at(page, TARGETS[i]);
    },
  })),
  journeys: [
    {
      name: 'reading-and-focus-order',
      method: 'j-order',
      rows: ['1.3.2', '2.4.3'],
      run: async ({ page, open, record, tab }) => {
        await open('home');
        const blocks = await page.locator('main h1, main p, main li a').evaluateAll((els) => els.map((e) => ({ text: e.textContent.trim(), top: e.getBoundingClientRect().top })));
        const texts = blocks.map((b) => b.text);
        const descending = blocks.every((b, i) => i === 0 || b.top > blocks[i - 1].top);
        record('1.3.2', JSON.stringify(texts) === JSON.stringify(READING) && descending, `reading order ${JSON.stringify(texts)}, each block below the one before: ${descending}`);
        const reached = [];
        for (let i = 0; i < LINKS.length; i += 1) {
          await tab();
          reached.push(await focused(page));
        }
        record('2.4.3', JSON.stringify(reached) === JSON.stringify(LINKS), `Tab from the top reached ${JSON.stringify(reached)}; the page opens and closes no content`);
      },
    },
    {
      // The lobby's one task, choosing a tool, by keyboard alone, end to end and back (P06, CONF03): focus walks the
      // links in the reviewed order (2.4.3) and changes nothing on its own (3.2.5); only Enter hands off to a tool's
      // address under the base path; Back returns to the lobby whole, checked after each link. There is no setting to
      // change (3.2.2). The lobby's task ends at the handoff: the gate's server serves the lobby alone, the tools'
      // pages are their own ledgers' gates, and scripts/deploy-workflow.test.mjs proves CI builds and gathers each
      // link's tool into the site.
      name: 'choose-a-tool-by-keyboard',
      method: 'keyboard',
      rows: ['2.4.3', '3.2.2', '3.2.5', 'P06', 'CONF03'],
      run: async ({ page, open, record, tab }) => {
        await open('home');
        const start = page.url();
        const pages = page.context().pages().length;
        const reached = [];
        for (let i = 0; i < LINKS.length; i += 1) {
          await tab();
          reached.push(await focused(page));
        }
        await page.waitForTimeout(1_000);
        const unchanged = page.url() === start && page.context().pages().length === pages;
        record('2.4.3', JSON.stringify(reached) === JSON.stringify(LINKS), `Tab reached ${JSON.stringify(reached)}, the reviewed order`);
        record('3.2.2', (await page.locator(INPUTS).count()) === 0, 'the page has no setting or input to change');
        const handed = [];
        for (const i of LINKS.keys()) {
          await open('home');
          for (let k = 0; k <= i; k += 1) await tab();
          const on = await focused(page);
          await Promise.all([reach(page, TARGETS[i]), page.keyboard.press('Enter')]);
          const to = page.url();
          await page.goBack();
          const back = page.url() === start && (await page.locator('main li a').count()) === LINKS.length;
          handed.push({ on, to, back });
        }
        const targets = handed.every((h, i) => h.on === LINKS[i] && h.to === address(TARGETS[i]));
        const back = handed.every((h) => h.back);
        record('3.2.5', unchanged && targets, `focus alone changed nothing (${unchanged}); each link handed off to its tool's address only on Enter: ${JSON.stringify(handed)}`);
        record('P06', targets && back, `each link handed off by keyboard to its tool's address under the base path, and Back returned to the lobby whole after each: ${JSON.stringify(handed)}; the tools' pages are their own gates`);
        record('CONF03', targets && back, 'the one process, choosing a tool, ran every step by keyboard to its handoff: no third-party step');
      },
    },
    {
      name: 'page-title',
      method: 'j-routes',
      rows: ['2.4.2'],
      run: async ({ page, open, record }) => {
        await open('home');
        const title = await page.title();
        const heading = (await page.locator('h1').textContent())?.trim();
        record('2.4.2', title === 'UoN Video Tools' && title === heading, `the one route's title is "${title}", its heading "${heading}"`);
      },
    },
    {
      name: 'pointer-cancellation',
      method: 'j-pointer',
      rows: ['2.5.2'],
      run: async ({ page, open, record, pointer }) => {
        await open('home');
        const start = page.url();
        const link = page.getByRole('link', { name: LINKS[0] });
        const box = await link.boundingBox();
        if (!box) {
          record('2.5.2', false, 'the first link has no box to press');
          return;
        }
        const [x, y] = [box.x + box.width / 2, box.y + box.height / 2];
        // Pressed, then moved off before release: abandoned, so nothing happens.
        await pointer.down(x, y);
        await pointer.move(x, box.y + box.height + 200);
        await pointer.up();
        await page.waitForTimeout(500);
        const abandoned = page.url() === start;
        // Pressed and released on the link: it completes on the up-event.
        await pointer.down(x, y);
        await page.waitForTimeout(300);
        const onDown = page.url() === start;
        await Promise.all([page.waitForURL((u) => u.href !== start, { timeout: 5_000 }).catch(() => undefined), pointer.up()]);
        const completed = page.url() !== start && new URL(page.url()).pathname.endsWith('/finisher/');
        record('2.5.2', abandoned && onDown && completed, `moved off before release: stayed (${abandoned}); pressed: stayed until release (${onDown}); released on the link: opened ${page.url()} (${completed})`);
      },
    },
    {
      name: 'no-input-or-status',
      method: 'j-forms',
      rows: ['3.3.5', '4.1.3', 'SUP05'],
      run: async ({ page, open, record, tab }) => {
        await open('home');
        const inputs = await page.locator(INPUTS).count();
        const live = await page.locator(LIVE).count();
        // Watch the page while focus walks it: a status message would change the DOM after load.
        await page.evaluate(() => {
          window.__lobbyChanges = 0;
          new MutationObserver((m) => { window.__lobbyChanges += m.length; }).observe(document, { subtree: true, childList: true, characterData: true, attributes: true });
        });
        for (let i = 0; i < LINKS.length + 1; i += 1) await tab();
        await page.waitForTimeout(1_000);
        const changes = await page.evaluate(() => window.__lobbyChanges);
        record('3.3.5', inputs === 0, `${inputs} input(s) or control(s) that take input, so no help is due`);
        record('4.1.3', live === 0 && changes === 0, `${live} live region(s), and ${changes} change(s) to the page after load while focus walked it: no status message`);
        record('SUP05', inputs === 0 && changes === 0, `no input to keep and no task to report: ${inputs} input(s), ${changes} change(s) after load`);
      },
    },
  ],
  // The records the report cannot compute; each grounded in a note.
  records: {
    date: '2026-11-27',
    rows: {
      P09: { state: 'pass', note: 'the lobby shares no component with the tools and this was its first run, so every state and journey ran' },
      P10: { state: 'pass', note: 'no open finding: the first run failed 2.5.5 and SUP03, the links 18 px high, fixed in lobby/Lobby.tsx as 44 px targets; it left the keyboard rows only a journey checks not run, and the journeys here were written; all retested and passing (UVT-8)' },
    },
  },
  // The sampling, by hand through `npm run a11y:sample`: the one route, listed, so nothing is walked; the links lead
  // out of the lobby to the tools' pages, which the lobby's server does not serve.
  sample: { routes: [base], maxStates: 5, engines: ['chromium'] },
};

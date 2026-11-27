#!/usr/bin/env node
// V31-A11Y stage 4: 2.5.6, concurrent input mechanisms, whose only method is touch — a mixed-input journey per declared
// state under Playwright's Pixel 7 descriptor in the headless shell: a touch tap on the first control is received as a
// touch pointer, Tab then moves the keyboard focus, and a pointer click on a control is still received as a click, all
// in one page without a navigation (under mobile emulation Chromium reports a mouse click as a touch pointer, so the
// click event, not its pointer type, is what the third step reads). It establishes that each input still reaches the
// page and the keyboard still moves after a touch, not the app's outcomes, which the authored journeys hold; a state
// with no control or no box leaves the row not run, never passed on the other states. The other touch rows come from the touch Playwright project re-running the
// standard specs. Writes methods/touch.json; run by a11y-extended.mjs when the doctor reads touch ready.
import { applicable, baseURL, loadProject, playwrightLib, readJSON, toolMain, writeJSON } from './a11y-extended.mjs';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([type=hidden]):not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';
export async function touchJourney({ root, run, date }) {
  const project = await loadProject(root), cov = readJSON(root, 'project/a11y/coverage.json');
  const pw = await playwrightLib(root), base = baseURL(project);
  const device = pw.devices['Pixel 7'];
  const problems = [], notes = [];
  const browser = await pw.chromium.launch();
  try {
    const context = await browser.newContext({ ...device });
    for (const st of project.states) {
      const page = await context.newPage();
      try {
        await page.goto(base + st.path);
        if (st.setup) await st.setup({ page });
        const url = page.url();
        const controls = page.locator(FOCUSABLE).locator('visible=true'); // the visible controls: a hidden dialog's button is focusable but not on the page
        const count = await controls.count();
        if (!count) { notes.push(`${st.name}: no focusable control`); continue; }
        await page.evaluate(() => { const w = window; w.__a11yInputs = { touch: 0, clicks: 0 }; addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch') w.__a11yInputs.touch++; }, true); addEventListener('click', () => { w.__a11yInputs.clicks++; }, true); });
        const first = controls.first(), b = await first.boundingBox();
        if (!b) { notes.push(`${st.name}: the first control has no box`); continue; }
        await page.touchscreen.tap(b.x + b.width / 2, b.y + b.height / 2);
        const before = await page.evaluate(() => document.activeElement?.id || document.activeElement?.tagName || '');
        await page.keyboard.press('Tab');
        const after = await page.evaluate(() => document.activeElement?.id || document.activeElement?.tagName || '');
        const last = controls.nth(count - 1); await last.scrollIntoViewIfNeeded(); const lb = await last.boundingBox();
        const before2 = await page.evaluate(() => window.__a11yInputs.clicks);
        if (lb) await page.mouse.click(lb.x + lb.width / 2, lb.y + lb.height / 2);
        const seen = await page.evaluate(() => window.__a11yInputs); seen.clicked = seen.clicks > before2;
        const moved = after && after !== 'BODY' && (after !== before || count === 1);
        const lost = [...(seen.touch ? [] : ['the touch tap was not received as a touch pointer']), ...(moved ? [] : ['Tab did not move the keyboard focus after the tap']), ...(seen.clicked ? [] : ['the pointer click after touch and keyboard was not received as a click']), ...(page.url() === url ? [] : ['the page navigated during the journey'])];
        if (lost.length) problems.push(`${st.name}: ${lost.join('; ')}`); else notes.push(`${st.name}: a touch tap, Tab and a pointer click received in one page`);
      } catch (e) { problems.push(`${st.name}: ${String(e.message).split('\n')[0].slice(0, 160)}`); }
      finally { await page.close().catch(() => {}); }
    }
  } finally { await browser.close().catch(() => {}); }
  const rows = {};
  const answered = notes.filter((n) => /received/.test(n)).length;
  if (applicable(cov, '2.5.6')) rows['2.5.6'] = problems.length ? { state: 'fail', note: problems.slice(0, 5).join(' | ') } : answered && answered === project.states.length ? { state: 'pass', note: `${device.viewport.width}x${device.viewport.height} Pixel 7 emulation: ${notes.join(' | ')}` } : { state: 'not_run', note: notes.join(' | ') || 'no state declared' };
  writeJSON(run, 'methods/touch.json', { method: 'touch', date, rows, note: 'the mixed-input journey per state under touch emulation; the other touch rows come from the touch Playwright project' });
  console.log(`a11y-touch: ${Object.keys(rows).length} row(s) written`);
  return 0;
}
toolMain('a11y-touch', touchJourney);

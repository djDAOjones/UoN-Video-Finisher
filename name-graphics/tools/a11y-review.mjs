#!/usr/bin/env node
// V31-A11Y stage 4: the material for the AI review step, a session step over screenshots, the DOM and the speech
// logs that writes a candidates file labelled heuristic, never a pass (ruling 12); a row it reviewed and flagged nothing reads reviewed, distinct from not run (V31-A11Y-POLISH). This tool writes ai-review/ in the
// run: a full-page screenshot, the ARIA snapshot and the HTML of each declared state in the headless shell, and
// candidates.template.json — the rows that list ai-review for this project, each with what the catalogue asks it to
// look for, every state not_run. The session reads the material (and speech/ when there are logs), fills the rows it
// has something to say about with candidate and a note, saves the file as ai-review.json in its results folder and
// runs the command again with --results. Run by a11y-extended.mjs when the doctor reads ai-review ready.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { applicable, baseURL, loadProject, methodRows, playwrightLib, readJSON, toolMain, writeJSON } from './a11y-extended.mjs';

export async function reviewMaterial({ root, run, date }) {
  const project = await loadProject(root), cat = readJSON(root, 'project/a11y/catalogue.json'), cov = readJSON(root, 'project/a11y/coverage.json');
  const pw = await playwrightLib(root), base = baseURL(project);
  const dir = join(run, 'ai-review'); mkdirSync(dir, { recursive: true });
  const browser = await pw.chromium.launch();
  const captured = [];
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    for (const st of project.states) {
      try {
        await page.goto(base + st.path);
        if (st.setup) await st.setup({ page });
        await page.screenshot({ path: join(dir, `${st.name}.png`), fullPage: true, animations: 'disabled' });
        writeFileSync(join(dir, `${st.name}.aria.txt`), `${await page.locator('body').ariaSnapshot()}\n`);
        writeFileSync(join(dir, `${st.name}.html`), await page.content());
        captured.push(st.name);
      } catch (e) { writeFileSync(join(dir, `${st.name}.error.txt`), `${String(e.message).split('\n')[0]}\n`); }
    }
  } finally { await browser.close().catch(() => {}); }
  const rows = {};
  for (const id of methodRows(cat, 'ai-review')) if (applicable(cov, id)) rows[id] = { state: 'not_run', note: `look for: ${cat.rows.find((r) => r.id === id).methods.extended.find((m) => m.method === 'ai-review').checks}` };
  writeJSON(run, 'ai-review/candidates.template.json', { method: 'ai-review', date, note: 'HEURISTIC: candidates for review, never a pass. Fill a row with state candidate and a note naming what and where, or reviewed with a note of what was looked at when it flagged nothing, leave the rows you did not look at not_run, save as ai-review.json in the results folder and run the command again with --results.', material: captured.flatMap((s) => [`ai-review/${s}.png`, `ai-review/${s}.aria.txt`, `ai-review/${s}.html`]), rows });
  console.log(`a11y-review: material for ${captured.length} of ${project.states.length} state(s) and a template of ${Object.keys(rows).length} row(s)`);
  return captured.length === project.states.length ? 0 : 1; // a state that could not be captured is an error of the run
}
toolMain('a11y-review', reviewMaterial);

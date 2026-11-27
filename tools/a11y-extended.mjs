#!/usr/bin/env node
// V31-A11Y stage 4: the extended command behind `npm run a11y:extended`, run at a phase close and before the keep
// decision, never in a gate. In order: the doctor, then each ready method for the declared features, then the report
// tool. It makes its run folder outside the checkout, writes run.json with depth extended, the Playwright projects it
// ran (chromium standard; firefox and webkit for engines; touch) and the bundle path the phase-close session will keep
// the run at, writes doctor.json, the lint and records files as the standard command does, runs the standard specs
// across the ready projects, then the method tools as children — a11y-vo.mjs (speech logs), a11y-touch.mjs (2.5.6),
// a11y-media.mjs, a11y-flash.mjs and a11y-review.mjs (the material for the AI review step) — copies hand-made results
// for the recipe, human and record methods from --results, and runs the report tool without --gate, which publishes
// project/a11y/summary.json (the one file written in the checkout) and proposes coverage-next.json beside the run;
// nothing is applied. bundle.json is written last: tool, browser, OS and VoiceOver versions, the tree and every
// artefact's digest. The VoiceOver journeys need the owner's attended session: headed, serial, nothing else running.
// Usage: node tools/a11y-extended.mjs [--root <dir>] [--date YYYY-MM-DD] [--results <dir>] [--only <method,...>]
//   [--bundle <path relative to the checkout>] [--no-canary]
//   --only narrows the run to the named methods for diagnosis and drops the bundle, so no coverage-next.json is proposed.
//   --results is read and checked before the run folder is made, so a refused file leaves no folder behind; a refusal
//   after the folder exists names it (V31-A11Y-POLISH).
// Exit: 0 the suite passed; 1 it failed, was empty or blocked — a blocked method never passes; 2 invalid declarations
//   or input, a tool or Playwright that crashed, or a crash here.
import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { childEnv, declarations, InputError, lintMethod, testedTree, versions, browserMissing } from './a11y-run.mjs';
import { doctor, pkgInfo } from './a11y-doctor.mjs';

export { InputError };
const HERE = dirname(fileURLToPath(import.meta.url));
export const NAME = /^[a-z0-9][a-z0-9-]*$/;
export const SPECS = 'tests/a11y';
// Results a session makes by hand — the recipes' outputs, the sheet, the participation record and the AI review's
// candidates file — enter a run from --results; everything else the pack writes itself.
export const HAND_MADE = ['pdf', 'ios-audit', 'android-checks', 'native-journey', 'sheet', 'participation', 'ai-review'];
export const VO_STEPS = ['next', 'previous', 'act', 'interact', 'stopInteracting', 'press', 'type', 'perform', 'wait'];
export const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
export const text = (v) => typeof v === 'string' && v.trim().length > 0;
// An expected phrase is text, heard anywhere in order, or { phrase, step }, heard in what that step made VoiceOver say.
export const expectedEntry = (e) => text(e) || (isObj(e) && Object.keys(e).length === 2 && text(e.phrase) && 'step' in e);
export const rowsOf = (r) => (r === '*' ? '*' : [r].flat().join(' ').split(/\s+/).filter(Boolean));
const rel = (s) => text(s) && !isAbsolute(s) && !/^[a-z][a-z0-9+.-]*:/i.test(s) && !s.split(/[\\/]/).includes('..');
const firstLine = (s) => String(s ?? '').replace(/\x1b\[[0-9;]*m/g, '').split('\n').map((l) => l.trim()).find(Boolean) || '';
const inside = (child, parent) => { const r = relative(parent, child); return r === '' || (!r.startsWith('..') && !isAbsolute(r)); };
const real = (p) => { try { return realpathSync(p); } catch { return resolve(p); } };
const validDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && new Date(s).toISOString().slice(0, 10) === s;

// ---- shared by the method tools, which land beside this file in a project's tools/ folder
export const readJSON = (root, p) => { try { return JSON.parse(readFileSync(join(root, p), 'utf8')); } catch (e) { throw new InputError(`${p}: ${e.code === 'ENOENT' ? 'missing' : firstLine(e.message)}`); } };
export const writeJSON = (dir, p, data) => { mkdirSync(dirname(join(dir, p)), { recursive: true }); writeFileSync(join(dir, p), `${JSON.stringify(data, null, 2)}\n`); };
export async function loadProject(root) {
  try { return (await import(pathToFileURL(join(root, SPECS, 'project.mjs')).href)).default; } catch (e) { throw new InputError(`${SPECS}/project.mjs cannot be loaded: ${firstLine(e.message)}`); }
}
// Playwright's library API, resolved from the project as Node would, never from the pack.
export async function playwrightLib(root) {
  let p;
  try { p = createRequire(join(root, 'package.json')).resolve('playwright'); } catch { throw new InputError('playwright (the library @playwright/test depends on) is not installed in the project'); }
  const m = await import(pathToFileURL(p).href);
  return m.chromium ? m : m.default;
}
// Where the app is served: the command's server, else the project's base URL; a tool never starts a server itself.
export const baseURL = (project, env = process.env) => { const u = env.A11Y_BASE_URL || project.baseURL; if (!u) throw new InputError('no base URL: declare baseURL in tests/a11y/project.mjs or run through a11y-extended.mjs'); return u.replace(/\/$/, ''); };
export const applicable = (cov, id) => cov.rows[id]?.applicability?.state === 'applicable';
export const methodRows = (cat, method) => cat.rows.filter((r) => r.methods.extended.some((m) => m.method === method)).map((r) => r.id);
export function toolArgs(argv, name) {
  const o = { root: process.cwd(), run: null, date: null };
  for (let i = 0; i < argv.length; i++) { const a = argv[i], v = argv[i + 1]; if (a === '--root' && v) { o.root = resolve(v); i++; } else if (a === '--run' && v) { o.run = resolve(v); i++; } else if (a === '--date' && v) { o.date = v; i++; } else throw new InputError(`${name}: unknown or incomplete option ${a}`); }
  if (!o.run || !existsSync(o.run)) throw new InputError(`${name}: --run <existing run folder> is required`);
  if (!o.date || !validDate(o.date)) throw new InputError(`${name}: --date YYYY-MM-DD is required`);
  return o;
}
export const toolMain = (name, fn) => {
  if (!(process.argv[1] && real(process.argv[1]) === real(fileURLToPath(new URL(`./${name}.mjs`, import.meta.url))))) return;
  fn(toolArgs(process.argv.slice(2), name)).then((code) => { process.exitCode = code ?? 0; }, (e) => { console.error(`${name}: ${e instanceof InputError ? e.message : `crash: ${e.stack || e.message}`}`); process.exitCode = 2; });
};

// The extended declarations in tests/a11y/project.mjs, under `extended`: VoiceOver journeys, media items and flashing
// items, each bound to a declared state. Checked before anything runs, as the standard declarations are.
export function extendedDeclarations(project, cat, declared) {
  const ext = project.extended ?? {};
  if (!isObj(ext)) throw new InputError('project.mjs: extended must be an object');
  const names = new Set([...declared.states, ...declared.journeys]);
  const seen = (n, what) => { if (typeof n !== 'string' || !NAME.test(n)) throw new InputError(`${what}: name ${JSON.stringify(n)} must be lower-case letters, digits and hyphens`); if (names.has(n)) throw new InputError(`${what}: the name ${n} is declared twice`); names.add(n); };
  const inState = (s, what) => { if (!declared.states.includes(s)) throw new InputError(`${what}: state ${s} is not declared`); };
  const lists = (id, m) => cat.rows.some((r) => r.id === id && r.methods.extended.some((x) => x.method === m));
  const out = { voJourneys: [], media: [], flashing: [] };
  for (const j of ext.voJourneys ?? []) {
    if (!isObj(j)) throw new InputError('extended.voJourneys: each journey must be an object');
    seen(j.name, 'VoiceOver journey'); inState(j.state, `VoiceOver journey ${j.name}`);
    const engines = j.engines ?? ['webkit', 'chromium'];
    if (!Array.isArray(engines) || !engines.length || !engines.every((e) => ['webkit', 'chromium'].includes(e))) throw new InputError(`VoiceOver journey ${j.name}: engines must list webkit, chromium or both`);
    const ids = rowsOf(j.rows);
    if (ids === '*' || !ids.length) throw new InputError(`VoiceOver journey ${j.name}: name the rows it claims`);
    for (const id of ids) if (!lists(id, 'vo')) throw new InputError(`VoiceOver journey ${j.name}: row ${id} does not list vo`);
    if (!Array.isArray(j.steps) || !j.steps.length || !j.steps.every((s) => isObj(s) && Object.keys(s).length === 1 && VO_STEPS.includes(Object.keys(s)[0]))) throw new InputError(`VoiceOver journey ${j.name}: steps must each be one of ${VO_STEPS.map((s) => `{ ${s} }`).join(', ')}`);
    if (!Array.isArray(j.expected) || !j.expected.length || !j.expected.every(expectedEntry)) throw new InputError(`VoiceOver journey ${j.name}: expected must list the phrases to hear, in order, each text or { phrase, step }`);
    // A phrase bound to a step must be heard in what that step made VoiceOver say; step 0 is the entry into the page,
    // step n the nth of the journey's steps, and a wait captures nothing. Bound steps never run backwards.
    let at = 0;
    for (const e of j.expected) {
      if (text(e)) continue;
      if (!Number.isInteger(e.step) || e.step < 0 || e.step > j.steps.length) throw new InputError(`VoiceOver journey ${j.name}: "${e.phrase}" is bound to step ${e.step}, but the journey has the entry (0) and steps 1 to ${j.steps.length}`);
      if (e.step > 0 && Object.keys(j.steps[e.step - 1])[0] === 'wait') throw new InputError(`VoiceOver journey ${j.name}: "${e.phrase}" is bound to step ${e.step}, a wait, which captures nothing`);
      if (e.step < at) throw new InputError(`VoiceOver journey ${j.name}: "${e.phrase}" is bound to step ${e.step}, before the step ${at} of the phrase listed above it`);
      at = e.step;
    }
    out.voJourneys.push(j.name);
  }
  for (const m of ext.media ?? []) {
    if (!isObj(m)) throw new InputError('extended.media: each item must be an object');
    seen(m.name, 'media item'); inState(m.state, `media item ${m.name}`);
    if (!rel(m.file)) throw new InputError(`media item ${m.name}: file must be a path inside the project`);
    for (const c of m.captions ?? []) if (!isObj(c) || !rel(c.file) || (c.lang !== undefined && !text(c.lang))) throw new InputError(`media item ${m.name}: captions list { file, lang? }`);
    for (const d of m.descriptions ?? []) if (!isObj(d) || !rel(d.file)) throw new InputError(`media item ${m.name}: descriptions list { file }`);
    for (const k of ['transcript', 'player', 'captionsControl', 'describedControl', 'audioControl']) if (m[k] !== undefined && !text(m[k])) throw new InputError(`media item ${m.name}: ${k} must be text`);
    out.media.push(m.name);
  }
  for (const f of ext.flashing ?? []) {
    if (!isObj(f)) throw new InputError('extended.flashing: each item must be an object');
    seen(f.name, 'flashing item'); inState(f.state, `flashing item ${f.name}`);
    for (const k of ['selector', 'start']) if (f[k] !== undefined && !text(f[k])) throw new InputError(`flashing item ${f.name}: ${k} must be a selector`);
    if (f.seconds !== undefined && !(Number.isFinite(f.seconds) && f.seconds > 0 && f.seconds <= 5)) throw new InputError(`flashing item ${f.name}: seconds must be 0 to 5`);
    if (f.fps !== undefined && !(Number.isInteger(f.fps) && f.fps >= 1 && f.fps <= 30)) throw new InputError(`flashing item ${f.name}: fps must be 1 to 30`);
    out.flashing.push(f.name);
  }
  if (ext.flashingConstraint !== undefined && !text(ext.flashingConstraint)) throw new InputError('extended.flashingConstraint must be text');
  return out;
}

// The hand-made results in --results, read and checked for what the files alone settle: each one JSON, a method a session
// makes by hand, one file per method. The doctor's blocked methods are checked once it has run (contradictions).
export function readResults(dir) {
  if (!existsSync(dir)) throw new InputError(`--results: ${dir} does not exist`);
  const out = [], seen = new Map();
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
    let data;
    try { data = JSON.parse(readFileSync(join(dir, f), 'utf8')); } catch (e) { throw new InputError(`--results ${f}: ${firstLine(e.message)}`); }
    const m = data?.method;
    if (!HAND_MADE.includes(m)) throw new InputError(`--results ${f}: method ${JSON.stringify(m)} is not one a session makes by hand (${HAND_MADE.join(', ')}); the pack writes the rest itself`);
    if (seen.has(m)) throw new InputError(`--results ${f}: a second file for ${m} (${seen.get(m)} is the first)`);
    seen.set(m, f);
    out.push({ file: f, method: m, data });
  }
  return out;
}

export function parseArgs(argv) {
  const o = { root: process.cwd(), date: null, results: null, only: null, bundle: null, canary: true };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i], v = argv[i + 1];
    if (a === '--root' && v) { o.root = resolve(v); i++; } else if (a === '--date' && v) { o.date = v; i++; } else if (a === '--results' && v) { o.results = resolve(v); i++; } else if (a === '--only' && v) { o.only = v.split(',').map((s) => s.trim()).filter(Boolean); i++; } else if (a === '--bundle' && v) { o.bundle = v; i++; } else if (a === '--no-canary') o.canary = false; else throw new InputError(`unknown or incomplete option ${a}`);
  }
  if (o.date !== null && !validDate(o.date)) throw new InputError(`--date takes a real YYYY-MM-DD date, not ${o.date}`);
  if (o.bundle !== null && !rel(o.bundle)) throw new InputError('--bundle takes a path relative to the checkout');
  if (o.only && !o.only.length) throw new InputError('--only names at least one method');
  return o;
}

// The project's server, started once for the method tools and stopped after them; Playwright manages its own.
export async function startServer(project, root, env) {
  const s = project.server;
  if (!s) return { stop() {} };
  const child = spawn(s.command, { cwd: root, env, shell: true, stdio: 'ignore', detached: true });
  const stop = () => { try { process.kill(-child.pid, 'SIGTERM'); } catch { /* gone */ } };
  const deadline = Date.now() + (s.timeout ?? 60_000);
  while (Date.now() < deadline) {
    try { const r = await fetch(s.url, { signal: AbortSignal.timeout(2000) }); if (r.status < 500) return { stop }; } catch { /* not yet */ }
    if (child.exitCode !== null) break;
    await new Promise((r) => setTimeout(r, 300));
  }
  stop();
  throw new InputError(`the project's server did not answer at ${s.url} within ${(s.timeout ?? 60_000) / 1000} s: ${s.command}`);
}

// Whether a feature-bound method is on for this project: every (all) or any of its features present.
export function featureOn(cat, cov, method) {
  const when = cat.methods[method]?.when;
  if (!when) return true;
  const fs = when.all || when.any, st = fs.map((f) => cov.features[f]?.state);
  return when.all ? st.every((s) => s === 'present') : st.includes('present');
}

export async function bundle(run, meta, doc) {
  const { createHash } = await import('node:crypto');
  const files = [];
  const walk = (d, r = '') => { for (const n of readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) { const p = join(d, n.name), q = r ? `${r}/${n.name}` : n.name; if (n.isDirectory()) walk(p, q); else if (q !== 'bundle.json') files.push({ path: q, bytes: readFileSync(p).length, sha256: createHash('sha256').update(readFileSync(p)).digest('hex') }); } };
  walk(run);
  return { schema: 1, date: meta.date, depth: meta.depth, level: meta.level, tree: meta.tree, bundle: meta.bundle ?? null, tools: meta.tools, machine: doc.machine, doctor: Object.fromEntries(Object.entries(doc.methods).map(([m, r]) => [m, r.state])), artefacts: files };
}

export async function main(argv, env = process.env) {
  const o = parseArgs(argv);
  const root = real(o.root);
  const cat = readJSON(root, 'project/a11y/catalogue.json'), cov = readJSON(root, 'project/a11y/coverage.json');
  if (!['AA', 'AAA'].includes(cov.level)) throw new InputError('project/a11y/coverage.json: level must be AA or AAA');
  const project = await loadProject(root);
  const declared = declarations(project, cat), ext = extendedDeclarations(project, cat, declared);
  if (o.only) for (const m of o.only) if (!cat.methods[m] || cat.methods[m].depth !== 'extended') throw new InputError(`--only: ${m} is not an extended method`);
  if (inside(real(tmpdir()), root)) throw new InputError(`the temporary folder ${real(tmpdir())} lies inside the checkout; set TMPDIR outside it`);
  const date = o.date || new Date().toISOString().slice(0, 10);
  const bundlePath = o.only ? undefined : (o.bundle ?? `a11y-evidence/${date}`);
  const base = childEnv(env);
  // The hand-made results are read before anything is made: a refused file leaves no run folder behind.
  const handMade = o.results ? readResults(o.results) : [];
  // The tested tree next, as before the doctor could start VoiceOver: a tree Git cannot hash refuses the run before that.
  const scratch = mkdtempSync(join(real(tmpdir()), 'a11y-tree-'));
  let tree;
  try { tree = testedTree(root, scratch, base); } finally { rmSync(scratch, { recursive: true, force: true }); }
  // 1. The doctor, before the run folder too, so a result for a method it reports blocked is refused with nothing made.
  const doc = doctor({ root, env: base, date, canary: o.canary });
  for (const { file, method: m } of handMade) if (doc.methods[m]?.state === 'blocked') throw new InputError(`--results ${file}: the doctor reports ${m} blocked (${doc.methods[m].reason}); a result for a blocked method is a contradiction`);
  const run = mkdtempSync(join(real(tmpdir()), 'a11y-extended-'));
  try { return await extended({ env, o, root, cat, cov, project, declared, ext, date, bundlePath, base, handMade, doc, tree, run }); } catch (e) {
    // From here the run folder exists: a refusal names it rather than leaving it unnamed.
    if (e instanceof InputError) throw new InputError(`${e.message} (the run folder ${run} was left behind)`);
    throw e;
  }
}

async function extended({ env, o, root, cat, cov, project, declared, ext, date, bundlePath, base, handMade, doc, tree, run }) {
  writeJSON(run, 'doctor.json', doc);
  const on = (m) => !o.only || o.only.includes(m);
  const ready = (m) => doc.methods[m]?.state === 'ready' && on(m);
  const say = (s) => console.log(`a11y-extended: ${s}`);
  for (const [m, r] of Object.entries(doc.methods)) say(`${m} ${r.state}: ${r.reason}`);
  // 2. run.json: the projects this run drives, mapped to the methods they stand for.
  const projects = [{ name: 'chromium', stands: 'standard' }];
  if (ready('engines')) projects.push({ name: 'firefox', stands: 'engines' }, { name: 'webkit', stands: 'engines' });
  if (ready('touch')) projects.push({ name: 'touch', stands: 'touch' });
  const tools = { ...versions(root), ...Object.fromEntries(Object.entries(doc.tools).filter(([k]) => !['node', 'playwright', 'chromium'].includes(k))) };
  const meta = { schema: 1, depth: 'extended', date, tree, level: cov.level, tools, baseline: cov.runs?.extended?.date ?? null, projects: Object.fromEntries(projects.map((p) => [p.name, p.stands])), declared: { states: declared.states, journeys: [...declared.journeys, ...ext.voJourneys] }, ...(bundlePath ? { bundle: bundlePath } : {}) };
  writeJSON(run, 'run.json', meta);
  // 3. The lint and records files, as the standard command writes them.
  mkdirSync(join(run, 'methods'), { recursive: true });
  const { uncredited = 0, ...lint } = await lintMethod(root, project, date, base);
  writeJSON(run, 'methods/lint.json', lint);
  if (project.records) writeJSON(run, 'methods/records.json', { method: 'records', date: project.records.date || date, rows: project.records.rows });
  // 4. Playwright across the ready projects; a missing Chromium reaches every test as blocked, nothing is downloaded.
  const cli = join(root, 'node_modules/@playwright/test/cli.js');
  let pw = 0;
  if (!o.only || o.only.some((m) => ['engines', 'touch'].includes(m))) {
    if (!existsSync(cli)) { say('@playwright/test is not installed; no spec ran'); pw = 2; }
    else {
      const r = spawnSync(process.execPath, [cli, 'test', '--config', `${SPECS}/playwright.config.ts`, '--pass-with-no-tests'], { cwd: root, stdio: 'inherit', env: { ...base, A11Y_RUN_DIR: run, A11Y_ROOT: root, A11Y_KNOWN_BAD: '', A11Y_BASE_URL: project.baseURL || '', A11Y_SERVER: project.server ? JSON.stringify(project.server) : '', A11Y_BROWSER_MISSING: browserMissing(root, env), A11Y_PROJECTS: JSON.stringify(projects) } });
      pw = r.status === null ? 2 : r.status;
    }
  } else writeJSON(run, 'playwright.json', { config: { projects: [] }, suites: [], errors: [] });
  if (!existsSync(join(run, 'playwright.json'))) writeJSON(run, 'playwright.json', { config: { projects: [] }, suites: [], errors: [] });
  // 5. The method tools, each a child, the server started once for them.
  const steps = [];
  if (ready('vo')) { if (ext.voJourneys.length) steps.push('a11y-vo'); else say('vo ready, but tests/a11y/project.mjs declares no VoiceOver journey: its rows will read not run'); }
  if (ready('touch')) steps.push('a11y-touch');
  if (ready('media') && featureOn(cat, cov, 'media')) steps.push('a11y-media');
  if (ready('flash-capture') && featureOn(cat, cov, 'flash-capture')) steps.push('a11y-flash');
  if (ready('ai-review')) steps.push('a11y-review');
  let crashed = [];
  if (steps.length && declared.states.length) {
    const server = await startServer(project, root, base);
    try {
      for (const tool of steps) {
        say(`running ${tool}`);
        const r = spawnSync(process.execPath, [join(HERE, `${tool}.mjs`), '--root', root, '--run', run, '--date', date], { cwd: root, stdio: 'inherit', env: { ...base, A11Y_BASE_URL: project.server ? project.server.url : project.baseURL || '' } });
        if (r.status !== 0) crashed.push(`${tool} exited ${r.status ?? 'by signal'}`);
      }
    } finally { server.stop(); }
  }
  // 6. Hand-made results: the recipes' outputs, the sheet, the participation record and the AI review's candidates.
  for (const { method: m, data } of handMade) writeJSON(run, `methods/${m}.json`, data);

  // 7. The report, not in gate mode: the summary is published for the view and coverage-next.json proposed, nothing applied.
  const rep = spawnSync(process.execPath, [join(HERE, 'a11y-report.mjs'), '--root', root, '--run', run], { cwd: root, stdio: 'inherit', env: base });
  let code = rep.status === null ? 2 : rep.status;
  let suite = null;
  try { suite = JSON.parse(readFileSync(join(run, 'a11y-report.json'), 'utf8')).suite; } catch { /* the report said why */ }
  // 8. The bundle, last, so it lists the report too.
  writeJSON(run, 'bundle.json', await bundle(run, meta, doc));
  if (pw >= 2) { say(`Playwright exited ${pw}: the run crashed`); code = 2; }
  if (crashed.length) { say(crashed.join('; ')); code = 2; }
  if (pw === 1 && code === 0) { say('Playwright reported a failure the report did not record'); code = 1; }
  if (code === 0 && uncredited) { say(`${uncredited} jsx-a11y finding(s) from rules no row credits`); code = 1; }
  if (code === 0 && suite !== 'passed') { say(`suite ${suite}: a blocked method never passes; set it up on the owner's word or declare its feature absent`); code = 1; }
  if (o.only) { say('narrowed by --only: no bundle path, so no coverage-next.json is proposed, and a narrowed run never passes'); if (code === 0) code = 1; }
  say(`run folder ${run}${bundlePath ? `; keep it at ${bundlePath} when coverage-next.json is applied` : ''}`);
  return code;
}

if (process.argv[1] && real(process.argv[1]) === real(fileURLToPath(import.meta.url))) {
  main(process.argv.slice(2)).then((code) => { process.exitCode = code; }, (e) => {
    console.error(`a11y-extended: ${e instanceof InputError ? e.message : `crash: ${e.stack || e.message}`}`);
    process.exitCode = 2;
  });
}

#!/usr/bin/env node
// The accessibility pack's ledger module (V31-A11Y stage 2): the checker's checks and the view's section for a project
// whose profile carries an Accessibility testing line. Built as a pack module on the owner's ruling of 2026-10-20;
// since stage 5 tools/ledger.mjs's inspect loads it from the installation's tools/ only with the line, and the CLI also
// runs it by hand. Zero dependencies; reads, never writes; no clock — every date it compares is one the ledger or the
// pack recorded — no subprocess, no model, no network. Every pack file it reads goes through the caller's take(), so
// the view's fingerprint covers it. The README's "The ledger module" section is the contract this file implements.
// Usage: node tools/a11y-ledger.mjs [--root <dir>] [--section]
//   Prints INFO, WARN and FAIL lines as check.mjs prints them, then a count; exit 1 on a FAIL, 2 when the ledger's
//   three files cannot be read or an option is unknown. --section prints the view's Accessibility section instead.
import { readFileSync, realpathSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateCatalogue, validateCoverage, SUITE_RESULTS } from './a11y-coverage.mjs';

export const FIELD = 'Accessibility testing';
export const DEPTHS = ['standard', 'extended'];
export const STACK = 'Stack and infrastructure'; // the profile section the line lives in; the Carbon digest's own "- Accessibility:" rule is another field
export const ROUTED = 'docs/accessibility.md';
export const PACK = ['project/a11y/catalogue.json', 'project/a11y/coverage.json'];
export const SUMMARY = 'project/a11y/summary.json';
export const SECTION = { id: 'accessibility', name: 'Accessibility' }; // the view's section id and navigation name (stage 5)
export const RELEASE = 'the owner\'s, in the project\'s decisions'; // outcome 4, a fixed string the page never reads from a file
export const RENDERER = 'pm-skills 5 a11y section 1';

// The ledger's stripping and counting rules, as tools/ledger.mjs states them (specification 3.4): HTML comments and
// fenced blocks blanked with their newlines kept, so a line inside either is not a line; a section runs from its
// `## ` heading to the next. The pack imports nothing from the installed tools, so the rules are restated here and
// the suite holds the two copies to the same answers.
const blank = (m) => m.replace(/[^\n]/g, '');
export const active = (s) => String(s ?? '').replace(/\r\n/g, '\n').replace(/<!--[\s\S]*?-->/g, blank)
  .replace(/^([ \t]*)(`{3,})[^\n]*\n[\s\S]*?^\1\2`*[ \t]*$/gm, blank).replace(/^([ \t]*)(~{3,})[^\n]*\n[\s\S]*?^\1\2~*[ \t]*$/gm, blank);
export const sections = (s) => new Map([...active(s).matchAll(/^## ([^\n]+)\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)].map((m) => [m[1], m[2].trim()]));
export const words = (s) => active(s).split(/\s+/).filter(Boolean).length;
const validDate = (s) => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && Number.isFinite(Date.parse(s)) && new Date(s).toISOString().slice(0, 10) === s;
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const isStr = (v) => typeof v === 'string';
const isTree = (s) => isStr(s) && /^[0-9a-f]{40}$/.test(s);
const depthLines = (text) => [...active(text).matchAll(new RegExp(`^- ${FIELD}:(.*)$`, 'gm'))].map((m) => m[1].trim());
const runOk = (r) => isObj(r) && validDate(r.date) && isTree(r.tree) && SUITE_RESULTS.includes(r.suite);
const strings = (list) => Array.isArray(list) && list.every(isStr);
const entries = (list, keys) => Array.isArray(list) && list.every((x) => isStr(x) || (isObj(x) && keys.every((k) => isStr(x[k])))); // a cut list ends in "and N more"

// What makes a parsed file the report tool's summary: the fields the section shows, each in its vocabulary and of
// its type, so that nothing the section renders can throw; anything else reads unavailable.
function summaryDefect(s) {
  try {
    if (!isObj(s)) return 'not a JSON object';
    if (!DEPTHS.includes(s.depth)) return 'depth must be standard or extended';
    if (!validDate(s.date)) return 'date must be YYYY-MM-DD';
    if (!isTree(s.tree)) return 'tree must be the tested tree\'s 40-character hash';
    if (!['AA', 'AAA'].includes(s.level)) return 'level must be AA or AAA';
    if (!SUITE_RESULTS.includes(s.suite)) return `suite must be one of ${SUITE_RESULTS.join(', ')}`;
    if (!Number.isInteger(s.catalogue) || !Number.isInteger(s.exit) || !isStr(s.renderer)) return 'catalogue and exit must be whole numbers and renderer a string';
    if (!isObj(s.completeness) || !Object.values(s.completeness).every(Number.isInteger)) return 'completeness must be the object of whole-number counts';
    if (!entries(s.failures, ['id', 'reason'])) return 'failures must list {id, reason} entries';
    if (!entries(s.candidates, ['id', 'method'])) return 'candidates must list {id, method} entries';
    for (const k of ['blocked', 'unverified', 'footer']) if (!strings(s[k])) return `${k} must be a list of strings`;
    for (const k of ['review', 'harness', 'unresolved']) if (s[k] !== undefined && !strings(s[k])) return `${k} must be a list of strings`;
    if (s.recorded !== undefined && !(isObj(s.recorded) && strings(s.recorded.failures))) return 'recorded must carry the failures it saw as a list of strings';
    for (const k of DEPTHS) if (!(s[k] === null || runOk(s[k]))) return `${k} must be null or the last ${k} run's date, tree and suite`;
    return '';
  } catch (e) { return `cannot be read as a summary (${e.message})`; }
}

// The checks. `profile`, `rules` and `backlog` are the ledger files' texts, raw or active; `take(path)` is the
// caller's reader, required: it records what it read (inspect's own, so the view's fingerprint covers the pack's
// files) and throws on a file it cannot read; the module reads through nothing else. Returns FAIL, WARN and INFO
// messages and the state the section renders from: null, with no message and no read, when the profile has no line.
export function inspectA11y({ root = '.', profile = '', rules = '', backlog = '', take } = {}) {
  if (typeof take !== 'function') throw new TypeError('inspectA11y needs the caller\'s take(path), so every file it reads joins the view\'s fingerprint');
  const fails = [], warns = [], info = [];
  const fail = (m) => fails.push(m), warn = (m) => warns.push(m), note = (m) => info.push(m);
  const base = resolve(root);
  const read = take;
  // 1. The line: in the Stack section only, once, standard or extended; none means no pack and no check (A).
  const inStack = depthLines(sections(profile).get(STACK) || ''), everywhere = depthLines(profile);
  if (!everywhere.length) return { fails, warns, info, a11y: null };
  if (everywhere.length > inStack.length) fail(`project/profile.md: the ${FIELD} line belongs in ## ${STACK} and nowhere else; found ${everywhere.length - inStack.length} elsewhere (V31-A11Y)`);
  if (inStack.length > 1) fail(`project/profile.md: one ${FIELD} line, not ${inStack.length} (V31-A11Y)`);
  const depth = inStack[0] ?? everywhere[0];
  if (!DEPTHS.includes(depth)) fail(`project/profile.md: ${FIELD} must be standard or extended, not "${depth}"; no line means no pack (V31-A11Y)`);
  // 2. The pack files, present and valid through take(); the coverage file is validated against a valid catalogue.
  const json = (rel) => {
    let text; try { text = read(join(base, rel)); } catch (e) { fail(`${rel}: ${e.code || 'cannot be read'}; a project with an ${FIELD} line carries it`); return undefined; }
    try { return JSON.parse(text); } catch (e) { fail(`${rel}: not valid JSON: ${e.message}`); return undefined; }
  };
  const cat = json(PACK[0]), cov = json(PACK[1]);
  const validate = (rel, run) => { // the validator's own messages, one FAIL each; a validator that throws on strange input is a FAIL too, never a crash
    let f; try { f = run(); } catch (e) { f = [`validation could not complete: ${e.message}`]; }
    for (const m of f) fail(`${rel}: ${m}`);
    return !f.length;
  };
  const catOk = cat !== undefined && validate(PACK[0], () => validateCatalogue(cat));
  const covOk = cov !== undefined && catOk && validate(PACK[1], () => validateCoverage(cov, cat));
  // 3. The routed document: a By-task row routes it; the file is present and non-empty; its budget holds.
  const rows = (sections(rules).get('By task') || '').split('\n').filter((l) => /^\|/.test(l)).slice(2).map((row) => row.split('|').slice(1, -1).map((c) => c.trim()));
  const row = rows.find((cells) => (cells[1] || '').replace(/^`|`$/g, '') === ROUTED);
  let routed = null;
  if (!row) fail(`project/rules.md: with an ${FIELD} line the By-task table needs a row routing ${ROUTED} (V31-A11Y)`);
  else {
    const task = row[0] || '', budget = Number(String(row[2] ?? '').replace(/,/g, '')), budgetN = Number.isInteger(budget) && budget > 0 ? budget : 0;
    let text = null; try { text = read(join(base, ROUTED)); } catch (e) { fail(`${ROUTED}: ${e.code || 'cannot be read'}; project/rules.md routes it (${task})`); }
    if (text !== null) {
      const count = words(text);
      if (!count) fail(`${ROUTED}: empty; the routed document carries the method, the claim and the reading rules (${task})`);
      else if (budgetN && count > budgetN) warn(`project/rules.md: routed ${ROUTED} is ${count} words, stated budget ${budgetN} (${task})`); // the installed checker's wording, so inspect drops the duplicate by string
      routed = { task, path: ROUTED, words: count, budget: budgetN };
    }
  }
  // 4. The summary, the report tool's derived output: absent is INFO, unreadable or malformed is WARN, never FAIL,
  // because a FAIL stops read, the view and the runner; it must agree with the coverage file's recorded run.
  let summary = null, summaryNote = '', text = null;
  try { text = read(join(base, SUMMARY)); }
  catch (e) { if (e.code === 'ENOENT') note(`accessibility: no report summary yet; the report tool publishes ${SUMMARY} outside gate mode`); else summaryNote = `${SUMMARY} cannot be read (${e.code || e.message})`; }
  if (text !== null) {
    let parsed; try { parsed = JSON.parse(text); } catch (e) { summaryNote = `${SUMMARY} is not valid JSON (${e.message})`; }
    if (parsed !== undefined) { const why = summaryDefect(parsed); if (why) summaryNote = `${SUMMARY} is not a report summary: ${why}`; else summary = parsed; }
  }
  if (summaryNote) warn(`accessibility: ${summaryNote}; the view shows no report until the report tool regenerates it`);
  const recorded = covOk ? (cov.runs.extended ?? null) : undefined; // the coverage file's recorded extended run; undefined while the file is invalid
  const recordedFailures = covOk ? Object.entries(cov.rows).filter(([, r]) => (r.results || []).some((x) => x.state === 'fail')).map(([id]) => id) : [];
  const describe = (r) => (r ? `${r.date}, ${r.suite}, tree ${String(r.tree).slice(0, 12)}` : 'none');
  let disagree = '';
  if (summary && covOk) {
    const differs = [];
    const a = summary.extended, b = recorded;
    // A null block means no extended report is retained, which denies no recorded run; a retained one must match the run.
    if (a && !(b && a.date === b.date && a.tree === b.tree && a.suite === b.suite)) differs.push(`its extended block (${describe(a)}) against the recorded extended run (${describe(b)})`);
    if (summary.level !== cov.level) differs.push(`its level ${summary.level} against ${cov.level}`);
    if (summary.catalogue !== cov.catalogue) differs.push(`its catalogue ${summary.catalogue} against ${cov.catalogue}`);
    if (differs.length) { disagree = differs.join('; '); warn(`accessibility: ${SUMMARY} disagrees with the coverage file — ${disagree}; apply the run's coverage-next.json or regenerate the report`); }
  }
  // 5. The extended run's age, under extended only: older than the latest closed phase, or none while a phase has
  // closed, is a WARN, never a FAIL (A, amendment 5); recorded dates only.
  const latestClose = [...active(backlog).matchAll(/^### Phase \d+ — .+ — CLOSED (\d{4}-\d{2}-\d{2})$/gm)].map((m) => m[1]).filter(validDate).sort().at(-1) || '';
  let stale = '';
  if (depth === 'extended' && recorded !== undefined && latestClose) {
    if (!recorded) stale = `no extended run is recorded, and a phase closed on ${latestClose}`;
    else if (recorded.date < latestClose) stale = `the last extended run, ${recorded.date}, predates the phase close of ${latestClose}`;
    if (stale) warn(`accessibility: ${stale}; run the extended command at phase close and before the keep decision (V31-A11Y)`);
  }
  // 6. One INFO line: the depth, the last standard report and the last extended run.
  const short = (t) => String(t).slice(0, 12);
  const std = summary?.standard ?? null;
  note(`accessibility: ${depth}; last standard report ${std ? `${std.date} (${std.suite}, tree ${short(std.tree)})` : 'none'}; last extended run ${recorded === undefined ? 'unknown while the coverage file is invalid' : recorded ? `${recorded.date} (${recorded.suite}, tree ${short(recorded.tree)})` : 'none'}`);
  const features = covOk ? Object.values(cov.features).reduce((n, f) => ({ ...n, [f.state]: (n[f.state] || 0) + 1 }), { present: 0, absent: 0, unknown: 0 }) : null;
  const a11y = { depth, level: covOk ? cov.level : null, catalogue: catOk ? cat.version : null, features, extended: recorded ?? null, recordedFailures, summary, summaryNote, disagree, routed, latestClose, stale };
  return { fails, warns, info, a11y };
}

// The view's section: static HTML from the state alone, every value escaped, no script and nothing read or run. The
// caller passes its own escaper; the default is the one the status page uses. Empty with no line.
export const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export function sectionA11y(a11y, esc = escape) {
  if (!a11y) return '';
  const e = (v) => esc(String(v ?? ''));
  const n = (v) => e(Number.isFinite(v) ? v : '?');
  const li = (items, render) => (Array.isArray(items) && items.length ? `<ul>${items.map((x) => `<li>${render(x)}</li>`).join('')}</ul>` : '<p class="meta">none</p>');
  const entry = (x, render) => (isObj(x) ? render(x) : e(x)); // a list the report cut ends in a plain "and N more"
  const runLine = (r) => (r ? `${e(r.date)}, ${e(r.suite)}, tree <span class="stamp">${e(r.tree)}</span>` : 'none');
  const f = a11y.features;
  const head = `<h2 id="${SECTION.id}">${SECTION.name}</h2>
<p class="meta">${e(FIELD)}: <strong>${e(a11y.depth)}</strong>; level ${e(a11y.level ?? 'unknown')}; catalogue ${e(a11y.catalogue ?? 'unknown')}${f ? `; features ${n(f.present)} present, ${n(f.absent)} absent, ${n(f.unknown)} unknown` : ''}. Read from the report tool's summary: the page runs no tool and calls no model.</p>`;
  const s = a11y.summary;
  const seen = s?.recorded?.failures;
  const sameFailures = Array.isArray(seen) && seen.length === a11y.recordedFailures.length && seen.every((id, i) => id === a11y.recordedFailures[i]);
  const extended = `<h3>Extended run</h3><p>Recorded in the coverage file: ${runLine(a11y.extended)}${a11y.extended?.bundle ? `; bundle <code>${e(a11y.extended.bundle)}</code>` : ''}.${a11y.stale ? ` <strong>${e(a11y.stale)}; run the extended command at phase close.</strong>` : ''}${a11y.disagree ? ` <strong>The summary disagrees with the coverage file:</strong> ${e(a11y.disagree)}.` : ''}</p>
<p>Recorded extended failures still in the coverage file: ${a11y.recordedFailures.map((id) => `<span class="id">${e(id)}</span>`).join(', ') || 'none'}${s && !sameFailures ? ` (the last report saw: ${Array.isArray(seen) ? seen.map(e).join(', ') || 'none' : 'unknown'})` : ''}.</p>`;
  if (!s) return `${head}
<div class="card"><p>${a11y.summaryNote ? `<strong>Report summary unavailable.</strong> ${e(a11y.summaryNote)}; regenerate it with the report tool.` : `<strong>No report yet.</strong> The report tool publishes ${e(SUMMARY)} outside gate mode.`}</p>${extended}</div>
`;
  const c = s.completeness;
  return `${head}
<div class="card"><p><strong>Last report:</strong> ${e(s.depth)} depth on ${e(s.date)}, level ${e(s.level)}, catalogue ${e(s.catalogue)}, tree <span class="stamp">${e(s.tree)}</span>.</p>
<h3>The four outcomes, kept apart</h3>
<ol><li><strong>Suite result:</strong> ${e(s.suite)}, exit ${e(s.exit)}. Last standard run: ${runLine(s.standard)}. Last extended run: ${runLine(s.extended)}.</li>
<li><strong>Criterion status:</strong> ${n(c.checked)} checked, ${n(c.failed)} failed, ${n(c.unverified)} unverified, ${n(c.blocked)} blocked; never "conforms".</li>
<li><strong>Completeness:</strong> over ${n(c.applicable)} adopted row(s), applicable or unresolved (${n(c.unresolved)} unresolved, read unverified); apart: ${n(c.not_applicable)} not applicable, ${n(c.not_adopted)} not adopted${c.failed_outside ? `, ${n(c.failed_outside)} failed among them` : ''}.</li>
<li><strong>Release decision:</strong> ${e(RELEASE)}; this page makes none.</li></ol>
<h3>Failures</h3>${li(s.failures, (x) => entry(x, (y) => `<span class="id">${e(y.id)}</span> — ${e(y.reason)}`))}
<h3>Blocked</h3>${li(s.blocked, e)}
<h3>Unverified</h3>${li(s.unverified, e)}
<h3>Candidates, never a pass</h3>${li(s.candidates, (x) => entry(x, (y) => `<span class="id">${e(y.id)}</span> by ${e(y.method)}`))}
${Array.isArray(s.review) && s.review.length ? `<h3>axe could not decide, for review</h3>${li(s.review, e)}\n` : ''}${Array.isArray(s.harness) && s.harness.length ? `<h3>Harness</h3>${li(s.harness, e)}\n` : ''}${extended}
<h3>Footer</h3>${li(s.footer, e)}
<p class="meta">${e(s.renderer)}; ${e(RENDERER)}.</p></div>
`;
}

// Run as a script: by real paths, so a symlinked folder, as /tmp and /var are on macOS, still runs it (as suite-once.mjs does).
if (process.argv[1] && (() => { try { return realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url)); } catch { return false; } })()) {
  const args = process.argv.slice(2);
  let root = '.', section = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--root' && args[i + 1] && !args[i + 1].startsWith('--')) root = args[++i];
    else if (args[i] === '--section') section = true;
    else { console.error(`a11y-ledger: unknown option ${args[i]}; usage: node tools/a11y-ledger.mjs [--root <dir>] [--section]`); process.exit(2); }
  }
  root = resolve(root);
  const files = {};
  for (const n of ['profile', 'rules', 'backlog']) {
    try { files[n] = readFileSync(join(root, 'project', `${n}.md`), 'utf8'); }
    catch (e) { console.error(`a11y-ledger: cannot read project/${n}.md: ${e.code || e.message}`); process.exit(2); }
  }
  const result = inspectA11y({ root, ...files, take: (p) => readFileSync(p, 'utf8') });
  const say = section ? console.error : console.log; // under --section the messages go to stderr and only the HTML to stdout
  for (const [key, prefix] of [['info', 'INFO'], ['warns', 'WARN'], ['fails', 'FAIL']]) for (const m of result[key]) say(`${prefix}  ${m}`);
  say(result.a11y ? `a11y-ledger: ${result.fails.length} failure(s), ${result.warns.length} warning(s)` : `a11y-ledger: no ${FIELD} line in project/profile.md; no pack, no check`);
  if (section && !result.fails.length) process.stdout.write(sectionA11y(result.a11y)); // as the view, which refuses an invalid source
  process.exitCode = result.fails.length ? 1 : 0;
}

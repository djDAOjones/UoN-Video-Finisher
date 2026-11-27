#!/usr/bin/env node
// V31-A11Y-SAMPLE: the pack's states chosen by a written rule with a random top-up, and each sampled state checked
// against its own default render under the adaptations the pack already runs. Zero dependencies. This file holds the
// pure parts — the tree digest and state key, the kinds, the structured sample, the seeded draw, the budget and the
// relations judged from captured renders — and the command, `npm run a11y:sample`, which runs tests/a11y/sample.spec.ts
// twice through the project's Playwright, once to discover and once to render, never in `npm run a11y` or a gate. The
// README's "Sampling the states" section is the contract this file implements.
// Usage: node tools/a11y-sample.mjs [--root <project>] [--seed <hex>] [--date YYYY-MM-DD]
import { createHash, randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative, resolve, sep, isAbsolute } from 'node:path';
import { pathToFileURL } from 'node:url';

export const SPECS = 'tests/a11y';
// The adaptations the pack's adaptation spec already runs, each with the row it speaks to there. Relations credit no
// row: the row is named so a person reading a failure knows where it belongs.
export const ADAPTATIONS = [
  { id: 'reflow', row: '1.4.10', narrow: true, what: 'reflow at 320 CSS px wide (256 px high for vertical writing)' },
  { id: 'text-200', row: '1.4.4', narrow: false, what: 'the root font at 200 %' },
  { id: 'text-spacing', row: '1.4.12', narrow: false, what: 'the four text-spacing overrides together' },
  { id: 'forced-colours', row: '1.4.1', narrow: false, what: 'forced colours' },
  { id: 'orientation', row: '1.3.4', narrow: true, what: 'portrait, 800 by 1280, against the landscape default' },
];
export const RELATIONS = ['text', 'names', 'controls'];
// What makes each relation vacuous: it then reads not run, never a pass.
export const VACUOUS = {
  text: 'the default render shows no text',
  names: 'the default render\'s accessibility tree has no node',
  controls: 'the default render has no control',
  taken: 'the adaptation did not take effect in this engine or the state did not open as discovered',
};
export const DEFAULTS = { depth: 2, maxStates: 40, maxActions: 25, maxLoads: 400, topUp: 0.1, cap: 150, engines: ['chromium'], skip: 'delete|remove|sign out|log out|pay|buy|send|submit|purchase|cancel subscription' };
// The roles the walk operates by a click; links are followed by their address.
export const OPERATE = ['button', 'tab', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'switch'];
const STATE_ATTRS = ['pressed', 'expanded', 'checked', 'selected', 'disabled', 'level'];

export class InputError extends Error {}
const sha = (s) => createHash('sha256').update(s).digest('hex');

// One ARIA snapshot line (Playwright's YAML) to { depth, role, name, attrs, text }; property lines (`- /url: …`) and
// anything unparsed give null.
export function parseLine(line) {
  const m = /^(\s*)- (.*)$/.exec(line);
  if (!m) return null;
  let body = m[2];
  if (body[0] === "'") { // a YAML single-quoted key, its quotes doubled: 'heading "a: b" [level=1]': text
    let i = 1, key = '';
    for (; i < body.length; i++) { if (body[i] === "'") { if (body[i + 1] === "'") { key += "'"; i++; continue; } break; } key += body[i]; }
    if (i >= body.length) return null;
    body = key + body.slice(i + 1);
  } else if (body[0] === '"') {
    const q = /^"((?:[^"\\]|\\.)*)"/.exec(body);
    if (!q) return null;
    body = JSON.parse(`"${q[1]}"`) + body.slice(q[0].length);
  }
  body = body.replace(/:$/, '');
  if (body.startsWith('/')) return null;
  const n = /^([a-z]+)(?: "((?:[^"\\]|\\.)*)")?((?: \[[^\]]*\])*)(?::\s*(.*))?$/.exec(body);
  if (!n) return null;
  const attrs = [...(n[3] || '').matchAll(/\[([^\]]*)\]/g)].map((a) => a[1]).sort();
  return { depth: m[1].length, role: n[1], name: n[2] ?? '', attrs, text: n[4] ?? '' };
}
export const nodes = (yaml) => String(yaml || '').split('\n').map(parseLine).filter((x) => x && x.role !== 'text');

// The digest that keys a state: roles, names and state attributes with their nesting, text values dropped and digits
// in names masked, so a counter's change is the same state and a pressed toggle, an open dialog or a selected tab is a
// new one.
export function treeDigest(yaml) {
  const lines = nodes(yaml).map((n) => `${' '.repeat(n.depth)}${n.role} ${JSON.stringify(n.name.replace(/\d+/g, '#').replace(/\s+/g, ' ').trim())} ${n.attrs.filter((a) => STATE_ATTRS.some((s) => a === s || a.startsWith(`${s}=`))).join(' ')}`.trimEnd());
  return sha(lines.join('\n')).slice(0, 16);
}
// An address is the path, query and fragment; the origin is the run's own.
export const address = (url) => { const u = new URL(url, 'http://x'); return `${u.pathname}${u.search}${u.hash}`; };
export const stateKey = (url, yaml) => `${address(url)} ${treeDigest(yaml)}`;
// A path's template: numeric and long hexadecimal or UUID segments masked, so /orders/12 and /orders/13 are one kind.
export const template = (path) => path.split('?')[0].split('#')[0].split('/').map((s) => (/^\d+$/.test(s) ? ':n' : /^[0-9a-f-]{8,}$/i.test(s) && /\d/.test(s) ? ':id' : s)).join('/');

// The kind of a state, from the state alone, so the route that reached it does not move it: the path template and the
// flags its tree holds — a dialog, a menu or listbox, an expanded control, a pressed, checked or selected one, a
// selected tab.
export function kindOf(state) {
  const n = nodes(state.snapshot), flags = [];
  if (n.some((x) => x.role === 'dialog' || x.role === 'alertdialog')) flags.push('dialog');
  if (n.some((x) => x.role === 'menu' || x.role === 'listbox')) flags.push('menu');
  if (n.some((x) => x.attrs.some((a) => a === 'expanded' || a === 'expanded=true'))) flags.push('expanded');
  if (n.some((x) => x.role !== 'tab' && x.attrs.some((a) => /^(pressed|checked|selected)(=true|=mixed)?$/.test(a)))) flags.push('pressed');
  if (n.some((x) => x.role === 'tab' && x.attrs.some((a) => a === 'selected' || a === 'selected=true'))) flags.push('tabs');
  return [template(address(state.address)), ...flags].join(' ');
}

// The structured sample, WCAG-EM's steps 3.b–3.d read as states, in order: the common states (every declared state,
// kept whole, and each entry point's landing); each complete process, which is a declared journey run whole by the
// standard gate, its states declared and so already held; then one state of each kind not yet represented, the
// shallowest first and then in discovery order. Returns [{ key, why }].
export function structured(discovered, { declared = [] } = {}) {
  const out = [], have = new Set(), kinds = new Set();
  const add = (s, why) => { if (!have.has(s.key)) { have.add(s.key); out.push({ key: s.key, why }); } kinds.add(s.kind); };
  const byName = new Map(discovered.filter((s) => s.declared).flatMap((s) => [s.declared, ...(s.also ?? [])].map((n) => [n, s])));
  for (const name of declared) { const s = byName.get(name); if (s) add(s, `common: the declared state ${name}`); }
  for (const s of discovered.filter((x) => x.depth === 0 && !x.declared)) add(s, `common: the landing at entry ${s.route.entry}`);
  const order = [...discovered].map((s, i) => ({ s, i })).sort((x, y) => x.s.depth - y.s.depth || x.i - y.i).map((x) => x.s);
  for (const s of order) if (!kinds.has(s.kind)) add(s, `kind: the first state of kind ${s.kind}`);
  return out;
}
// The top-up's pool: discovered states the project did not declare and the structured sample does not hold.
export const pool = (discovered, structure) => { const taken = new Set(structure.map((x) => x.key)); return discovered.filter((s) => !s.declared && !taken.has(s.key)).map((s) => s.key); };
export const topUpSize = (structuredCount, ratio, poolCount) => Math.min(poolCount, Math.max(poolCount ? 1 : 0, Math.ceil(ratio * structuredCount)));
// The seeded draw: the pool ordered by SHA-256 of the seed and each key, the first n. The record holds the seed, the
// pool and the drawn keys, so anyone repeats the draw, and the order the walk found them in cannot move it.
export const draw = (keys, n, seed) => keys.map((k) => ({ k, h: sha(`${seed}:${k}`) })).sort((a, b) => (a.h < b.h ? -1 : a.h > b.h ? 1 : 0)).slice(0, n).map((x) => x.k);
// Browser renders: each sampled state twice by default (a baseline that differs from itself is unstable) and once per
// adaptation, in each engine; the relations read those renders and add none.
export const renders = (states, engines, adaptations = ADAPTATIONS.length) => states * (2 + adaptations) * engines;

// The plan: structure, pool, draw and budget. Nothing is trimmed: a plan over the cap, the top-up included, is a
// refusal naming the counts.
export function plan(discovered, cfg, seed) {
  const c = { ...DEFAULTS, ...cfg };
  const structure = structured(discovered, c);
  const keys = pool(discovered, structure);
  const n = topUpSize(structure.length, c.topUp, keys.length);
  const drawn = draw(keys, n, seed);
  const total = renders(structure.length + drawn.length, c.engines.length);
  if (total > c.cap) throw new InputError(`the sample needs ${total} renders (${structure.length} structured and ${drawn.length} drawn state(s) × ${2 + ADAPTATIONS.length} × ${c.engines.length} engine(s)), over the cap of ${c.cap} in tests/a11y/project.mjs sample.cap; raise the cap or narrow the engines`);
  return { seed, structure, pool: keys, drawn, renders: total, cap: c.cap, engines: c.engines };
}

// Whether an adaptation took effect, from the render's probe: the width, the root font, the spacing, the forced
// colours and the orientation the adaptation sets.
export function taken(id, probe, base) {
  if (!probe) return false;
  if (id === 'reflow') return probe.vertical ? probe.innerHeight === 256 : probe.innerWidth === 320;
  if (id === 'text-200') return Math.abs(probe.rootFont - 2 * base.rootFont) < 0.5 && probe.maxTextFont >= 1.5 * base.maxTextFont;
  if (id === 'text-spacing') { const sp = probe.spacing ?? {}; return sp.elements > 0 && sp.line === sp.elements && sp.letter === sp.elements && sp.word === sp.elements && sp.paragraph === sp.paragraphs; }
  if (id === 'forced-colours') return probe.forced === true;
  if (id === 'orientation') return probe.portrait === true;
  return false;
}
const tally = (list) => { const m = new Map(); for (const x of list) m.set(x, (m.get(x) || 0) + 1); return m; };
const missing = (want, have) => { const h = tally(have), out = []; for (const [x, n] of tally(want)) { const d = n - (h.get(x) || 0); for (let i = 0; i < d; i++) out.push(x); } return out; };
const list = (items, n = 6) => items.slice(0, n).join('; ') + (items.length > n ? `; and ${items.length - n} more` : '');

// The difference between two renders' words in reading order: lost and added words by count, else a change of order.
export function textDiff(a, b) {
  const lost = missing(a, b), added = missing(b, a);
  if (lost.length || added.length) return [lost.length ? `${lost.length} word(s) of the default render not shown: ${list(lost)}` : '', added.length ? `${added.length} word(s) added: ${list(added)}` : ''].filter(Boolean).join('; ');
  const i = a.findIndex((w, k) => w !== b[k]);
  return i < 0 ? '' : `the words' order changed at word ${i + 1}: "${a.slice(i, i + 4).join(' ')}" became "${b.slice(i, i + 4).join(' ')}"`;
}
// The three relations of one adaptation, from the default capture and the adapted one. Each capture holds `snapshot`
// (the ARIA snapshot), `words` (the text visible in it), `controls` ({ role, label, ok, why }) and `probe`.
export function relate(id, def, adapted) {
  const out = {};
  if (!adapted || adapted.error || !def || def.error) {
    for (const r of RELATIONS) out[r] = { state: 'error', reason: `the state did not render: ${(adapted?.error || def?.error || 'no capture').slice(0, 120)}` };
    return out;
  }
  if (!taken(id, adapted.probe, def.probe)) { for (const r of RELATIONS) out[r] = { state: 'not_run', reason: `vacuous: ${VACUOUS.taken}` }; return out; }
  // Same text: the words the default render shows, in reading order, are the words shown, unclipped and inside the
  // width where it is narrow — none lost, none added, none moved.
  if (!def.words.length) out.text = { state: 'not_run', reason: `vacuous: ${VACUOUS.text}` };
  else { const d = textDiff(def.words, adapted.words); out.text = d ? { state: 'fail', reason: d } : { state: 'pass', reason: `all ${def.words.length} visible word(s) kept in order` }; }
  // Same names and roles: the multiset of role and name over the accessibility tree.
  const nn = (c) => nodes(c.snapshot).map((n) => `${n.role} "${n.name}"`);
  const a = nn(def), b = nn(adapted);
  if (!a.length) out.names = { state: 'not_run', reason: `vacuous: ${VACUOUS.names}` };
  else { const lost = missing(a, b), added = missing(b, a); out.names = lost.length || added.length ? { state: 'fail', reason: [lost.length ? `lost ${list(lost)}` : '', added.length ? `added ${list(added)}` : ''].filter(Boolean).join('; ') } : { state: 'pass', reason: `the same ${a.length} role and name node(s)` }; }
  // Every control: each of the default's controls present by role and label, shown, inside the width where it is
  // narrow, and the topmost element at its centre.
  if (!def.controls.length) out.controls = { state: 'not_run', reason: `vacuous: ${VACUOUS.controls}` };
  else {
    const id2 = (c) => `${c.role} "${c.label}"`;
    const ok = adapted.controls.filter((c) => c.ok).map(id2);
    const lost = missing(def.controls.map(id2), ok);
    const why = lost.map((x) => { const c = adapted.controls.find((y) => id2(y) === x && !y.ok); return c ? `${x} ${c.why}` : `${x} is gone`; });
    out.controls = lost.length ? { state: 'fail', reason: list(why) } : { state: 'pass', reason: `all ${def.controls.length} control(s) shown and reachable` };
  }
  return out;
}

// The baseline's own stability: the two default renders hold the same words, nodes and controls.
export function unstable(a, b) {
  if (!a || !b || a.error || b.error) return 'a default render failed';
  const same = (x, y) => JSON.stringify([...x].sort()) === JSON.stringify([...y].sort());
  const c = (x) => x.controls.map((k) => `${k.role} ${k.label} ${k.ok}`);
  const n = (x) => nodes(x.snapshot).map((k) => `${k.role} ${k.name} ${k.attrs.join(' ')}`);
  return a.key !== b.key ? 'its key' : textDiff(a.words, b.words) ? 'its text' : !same(n(a), n(b)) ? 'its names and roles' : !same(c(a), c(b)) ? 'its controls' : '';
}
// Whether an adapted render opened the sampled state: each adaptation is applied after the state opens at default
// settings, whose key must be the sampled one, and the adapted render must keep its address.
export function reached(key, c) {
  const at = key.slice(0, key.lastIndexOf(' '));
  if (c.before !== key) return `the replay reached ${c.before ?? 'no recorded state'} at default settings, not the sampled state`;
  if (address(c.url) !== at) return `the adapted render moved to ${address(c.url)}, not ${at}`;
  return '';
}
// A declared state discovery could not open: an error row, so a run missing one never reads passed.
export const declaredMissing = (states, names) => names.filter((n) => !states.some((s) => s.declared === n || s.also?.includes(n))).map((n) => ({ key: `(declared ${n})`, engine: '', adaptation: '', row: '', relation: '', state: 'error', reason: `the declared state ${n} did not open in discovery, so the sample lacks it` }));
// The sampled states' relations from the render records ({ key, engine, defaults: [a, b], adapted: { id: capture } }):
// one row per state, engine, adaptation and relation. A default render that does not reopen the state's key, or that
// differs from the second, makes every relation of that state not run.
export function judge(records) {
  const rows = [];
  for (const r of records) {
    const [a, b] = r.defaults ?? [];
    const why = !a || a.error ? `the state did not render: ${String(a?.error ?? 'no capture').slice(0, 120)}` : a.key !== r.key ? `the state reopened as ${a.key}, not as discovered` : unstable(a, b) ? `unstable: the two default renders differ in ${unstable(a, b)}` : '';
    // (the second default's key is checked by unstable)
    for (const ad of ADAPTATIONS) {
      const c = r.adapted?.[ad.id], off = !why && c && !c.error ? reached(r.key, c) : '';
      const rel = why || off ? Object.fromEntries(RELATIONS.map((k) => [k, { state: why.startsWith('the state did not') ? 'error' : 'not_run', reason: why || off }])) : relate(ad.id, a, c);
      for (const k of RELATIONS) rows.push({ key: r.key, engine: r.engine, adaptation: ad.id, row: ad.row, relation: k, ...rel[k] });
    }
  }
  return rows;
}
export const outcome = (rows) => (rows.some((r) => r.state === 'error') ? 'error' : rows.some((r) => r.state === 'fail') ? 'failed' : rows.some((r) => r.state === 'pass') ? 'passed' : 'empty');

// The report: the rule's record (discovered, structured, pool, seed and draw, trim) and the relations' table.
export function table(run, p, discovered, rows) {
  const why = new Map(p.structure.map((x) => [x.key, x.why]));
  const L = [`# The sampled states — ${run.date}`, '', `Tree ${run.tree ?? 'not recorded'}; seed \`${p.seed}\`; engines ${p.engines.join(', ')}; ${p.renders} renders of a cap of ${p.cap}.`, '',
    `Discovery: ${run.discovery}; ${discovered.length} state(s), ${discovered.filter((s) => s.declared).length} declared. No claim reaches past the states listed here.`, '',
    '| State | Kind | Declared | Depth | In the sample |', '| --- | --- | --- | --- | --- |'];
  for (const s of discovered) L.push(`| \`${s.key}\` | ${s.kind} | ${s.declared ?? '—'} | ${s.depth} | ${why.get(s.key) ?? (p.drawn.includes(s.key) ? 'top-up: drawn' : 'no')} |`);
  L.push('', `Top-up: a pool of ${p.pool.length}, ${p.drawn.length} drawn by the seed.`, '', '| State | Engine | Adaptation (row) | Relation | Result | Reason |', '| --- | --- | --- | --- | --- | --- |');
  for (const r of rows) L.push(`| \`${r.key}\` | ${r.engine} | ${r.adaptation} (${r.row}) | ${r.relation} | ${r.state} | ${String(r.reason).replace(/\|/g, '\\|')} |`);
  L.push('', `Outcome: ${outcome(rows)}. Relations credit no catalogue row; conformance is not claimed.`);
  return `${L.join('\n')}\n`;
}

// The command. Every step's output stays in the run folder under the system's temporary folder, outside the checkout.
const real = (p) => realpathSync(p);
const inside = (child, parent) => { const r = relative(parent, child); return r === '' || (!r.startsWith('..') && !isAbsolute(r)); };
export function config(project) {
  const c = { ...DEFAULTS, ...(project.sample ?? {}) };
  const bad = [];
  for (const k of ['depth', 'maxStates', 'maxActions', 'maxLoads', 'cap']) if (!Number.isInteger(c[k]) || c[k] < (k === 'depth' ? 0 : 1)) bad.push(`sample.${k} must be a whole number${k === 'depth' ? '' : ' above 0'}`);
  if (typeof c.topUp !== 'number' || c.topUp < 0 || c.topUp > 1) bad.push('sample.topUp must be a share between 0 and 1');
  if (!Array.isArray(c.engines) || !c.engines.length || c.engines.some((e) => !['chromium', 'firefox', 'webkit'].includes(e))) bad.push('sample.engines must list chromium, firefox or webkit');
  for (const k of ['entries', 'routes']) if (c[k] !== undefined && (!Array.isArray(c[k]) || c[k].some((p) => typeof p !== 'string' || !p.startsWith('/')))) bad.push(`sample.${k} must list paths starting with /`);
  if ((project.states?.length ?? 0) > c.maxStates) bad.push(`${project.states.length} declared states exceed sample.maxStates ${c.maxStates}: raise it, as every declared state is sampled whole`);
  try { new RegExp(c.skip, 'i'); } catch { bad.push('sample.skip must be a regular expression\'s source'); }
  if (bad.length) throw new InputError(`tests/a11y/project.mjs: ${bad.join('; ')}`);
  return c;
}
export async function main(argv, env = process.env) {
  const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
  const root = real(resolve(opt('--root') ?? '.'));
  for (const f of ['project/a11y/catalogue.json', 'project/a11y/coverage.json', `${SPECS}/project.mjs`, `${SPECS}/sample.spec.ts`]) if (!existsSync(join(root, f))) throw new InputError(`${f} is missing: install the pack's standard depth first`);
  let project;
  try { project = (await import(pathToFileURL(join(root, SPECS, 'project.mjs')).href)).default; } catch (e) { throw new InputError(`${SPECS}/project.mjs cannot be loaded: ${String(e.message).split('\n')[0]}`); }
  const c = config(project);
  if (inside(real(tmpdir()), root)) throw new InputError(`the temporary folder ${real(tmpdir())} lies inside the checkout; set TMPDIR outside it`);
  const cli = join(root, 'node_modules/@playwright/test/cli.js');
  if (!existsSync(cli)) throw new InputError('@playwright/test is not installed; nothing ran');
  const run = mkdtempSync(join(real(tmpdir()), 'a11y-sample-'));
  const seed = opt('--seed') ?? randomBytes(8).toString('hex');
  const git = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' });
  const dirty = spawnSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).stdout?.trim();
  const runInfo = { schema: 1, date: opt('--date') ?? new Date().toISOString().slice(0, 10), tree: git.status === 0 ? `${git.stdout.trim()}${dirty ? ' with changes' : ''}` : null, seed, config: c, discovery: c.routes && !c.walk ? `the app's own list of ${c.routes.length} route(s)` : `a walk from ${(c.routes ?? c.entries ?? ['the declared states\' paths']).join(', ')} to depth ${c.depth}, at most ${c.maxStates} states and ${c.maxActions} actions a state` };
  writeFileSync(join(run, 'run.json'), `${JSON.stringify(runInfo, null, 2)}\n`);
  console.log(`a11y-sample: run folder ${run}`);
  const base = Object.fromEntries(Object.entries(env).filter(([k]) => !k.startsWith('GIT_') && !k.startsWith('A11Y_')));
  const server = project.server ? JSON.stringify(project.server) : '';
  const pw = (phase, engines) => spawnSync(process.execPath, [cli, 'test', '--config', `${SPECS}/playwright.config.ts`], { cwd: root, stdio: 'inherit', env: { ...base, A11Y_SAMPLE: phase, A11Y_RUN_DIR: run, A11Y_ROOT: root, A11Y_BASE_URL: project.baseURL || '', A11Y_SERVER: server, A11Y_PROJECTS: JSON.stringify(engines.map((name) => ({ name, stands: 'standard' }))) } }).status;
  if (pw('discover', ['chromium']) !== 0 || !existsSync(join(run, 'discovered.json'))) { console.error('a11y-sample: discovery crashed; nothing sampled'); return 2; }
  const discovered = JSON.parse(readFileSync(join(run, 'discovered.json'), 'utf8'));
  const p = plan(discovered.states, { ...c, declared: project.states.map((s) => s.name) }, seed);
  const byKey = new Map(discovered.states.map((s) => [s.key, s]));
  const chosen = [...p.structure.map((x) => x.key), ...p.drawn];
  writeFileSync(join(run, 'sample.json'), `${JSON.stringify({ seed, processes: (project.journeys ?? []).map((j) => j.name), ...p, states: chosen.map((k) => ({ key: k, route: byKey.get(k).route })) }, null, 1)}\n`);
  const code = pw('relate', c.engines);
  const dir = join(run, 'renders');
  const records = existsSync(dir) ? readdirSync(dir).sort().map((f) => JSON.parse(readFileSync(join(dir, f), 'utf8'))) : [];
  const missingRecords = chosen.length * c.engines.length - records.length;
  const rows = [...declaredMissing(discovered.states, project.states.map((s) => s.name)), ...judge(records)];
  if (code !== 0) rows.push({ key: '(the render run)', engine: '', adaptation: '', row: '', relation: '', state: 'error', reason: `Playwright exited ${code} while rendering; the records are incomplete or unsafe to read as a pass` });
  for (let i = 0; i < missingRecords; i++) rows.push({ key: '(a state with no render record)', engine: '', adaptation: '', row: '', relation: '', state: 'error', reason: 'the render test did not write its record' });
  writeFileSync(join(run, 'a11y-sample.md'), table(runInfo, p, discovered.states, rows));
  writeFileSync(join(run, 'a11y-sample.json'), `${JSON.stringify({ run: runInfo, refused: discovered.refused, loads: discovered.loads, plan: p, outcome: outcome(rows), rows }, null, 1)}\n`);
  const result = outcome(rows);
  console.log(`a11y-sample: ${discovered.states.length} state(s) found, ${p.structure.length} structured, ${p.drawn.length} drawn of a pool of ${p.pool.length} by seed ${seed}; ${rows.filter((r) => r.state === 'fail').length} relation(s) failed; outcome ${result}; report ${join(run, 'a11y-sample.md')}`);
  return result === 'error' ? 2 : result === 'passed' ? 0 : 1;
}
// Run as a command when Node was started on this file, judged by its path: sample.spec.ts imports this module through
// Playwright's loader, which cannot carry the module's own URL.
if (process.argv[1] && /(^|[\\/])a11y-sample\.mjs$/.test(process.argv[1])) {
  main(process.argv.slice(2)).then((code) => { process.exitCode = code; }, (e) => { console.error(`a11y-sample: ${e instanceof InputError ? e.message : `crash: ${e.stack || e.message}`}`); process.exitCode = 2; });
}

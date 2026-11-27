#!/usr/bin/env node
// pm-skills 5's JSDoc pack (V31-JSDOC-FLAG, specification 3.23): the ratchet. It runs the project's own TypeScript
// compiler, 5.6 or later, over tsconfig.jsdoc.json with checking forced on and every write forced off, counts the
// error diagnostics and compares the count with the tracked baseline, project/jsdoc-baseline.json. The count may never
// rise.
//
// Usage, from the project root:
//   node tools/jsdoc-ratchet.mjs            check: exit 0 at or below the baseline, 1 above it; never writes
//   node tools/jsdoc-ratchet.mjs --init     writes the first baseline; refuses when one exists
//   node tools/jsdoc-ratchet.mjs --lower    writes a lower count only
//   node tools/jsdoc-ratchet.mjs --lower --accept-environment-change
//                                           also records a new compiler version or configuration hash, the count at
//                                           or below the ceiling
// Exit 2 is "cannot measure": TypeScript not declared in package.json, not installed inside the project or resolving
// outside it; the configuration missing or in error, no inputs; a crash, an unexpected exit status, anything on
// standard error but Node's own warnings, a signal, the timeout or the output limit; a missing, malformed, mismatched
// or concurrently changed baseline; a failed write; a bad argument. Nothing is written on a failure. No mode raises the
// ceiling: a raise is a decision that edits the baseline by hand. One writer per checkout is the contract's; a write
// re-reads the baseline first and refuses if it changed during the run, and --init never replaces a file.
// Zero dependencies; never npx, PATH, a global compiler, another project's or the network.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { closeSync, existsSync, openSync, readFileSync, realpathSync, renameSync, rmSync, writeFileSync, writeSync } from 'node:fs';
import { join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const CONFIG = 'tsconfig.jsdoc.json';
export const BASELINE = 'project/jsdoc-baseline.json';
export const TIMEOUT_MS = 120_000;
export const MAX_OUTPUT = 32 * 1024 * 1024;
// Checking on, writes off, whatever the configuration says: no emit, no build information (incremental and composite
// off), noCheck overridden, which needs TypeScript 5.6 or later.
export const FLAGS = ['-p', CONFIG, '--noEmit', '--allowJs', '--checkJs', '--noCheck', 'false', '--incremental', 'false', '--composite', 'false', '--pretty', 'false'];
export const MINIMUM = [5, 6];
// tsc's exit statuses: 0 with no error, 1 or 2 with errors reported (diagnostics present, outputs skipped or generated).
const ERROR_STATUSES = new Set([1, 2]);
const USAGE = 'usage: node tools/jsdoc-ratchet.mjs [--init | --lower [--accept-environment-change]]';
const OWNER = "TypeScript is this project's own dev dependency, added on its owner's word";
const DIAGNOSTIC = /^(.+?)\((\d+),(\d+)\): error (TS\d+): /;
const UNLOCATED = /^error (TS\d+): /;
const NODE_WARNING = /^\(node:\d+\) \w*Warning: |^\(Use `node --trace-\S+ \.\.\.` to show where the warning was created\)$/;

class Unmeasurable extends Error {}

// The compiler's plain output: error lines with a location, counted in total and per file; error lines with none.
export function parse(output) {
  const files = {}, unlocated = [];
  let errors = 0;
  for (const line of output.split(/\r?\n/)) {
    const m = DIAGNOSTIC.exec(line);
    if (m) { errors++; files[m[1]] = (files[m[1]] ?? 0) + 1; }
    else if (UNLOCATED.test(line)) unlocated.push(line);
  }
  return { errors, files, unlocated };
}

const readJson = (path, what) => {
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch { throw new Unmeasurable(`${what} is not valid JSON`); }
};
const inside = (real, rootReal) => real === rootReal || real.startsWith(rootReal + sep);

// The project's own compiler: declared in package.json and installed under node_modules/typescript, resolving inside
// the project (a package manager's links within it are followed; a link to another checkout is refused).
export function compiler(root) {
  const pkgPath = join(root, 'package.json');
  if (!existsSync(pkgPath)) throw new Unmeasurable(`no package.json; ${OWNER}`);
  const pkg = readJson(pkgPath, 'package.json');
  if (!pkg?.devDependencies?.typescript && !pkg?.dependencies?.typescript) throw new Unmeasurable(`package.json does not declare typescript; ${OWNER}`);
  const dir = join(root, 'node_modules', 'typescript'), bin = join(dir, 'bin', 'tsc');
  if (!existsSync(bin)) throw new Unmeasurable('typescript is declared but not installed at node_modules/typescript; install the project\'s own dependencies first');
  const rootReal = realpathSync(root);
  for (const p of [dir, bin]) if (!inside(realpathSync(p), rootReal)) throw new Unmeasurable(`node_modules/typescript resolves outside the project, to ${realpathSync(p)}; the ratchet runs only the project's own copy`);
  const version = existsSync(join(dir, 'package.json')) ? readJson(join(dir, 'package.json'), 'node_modules/typescript/package.json').version : undefined;
  if (typeof version !== 'string' || version === '') throw new Unmeasurable('node_modules/typescript/package.json names no version');
  const [major, minor] = version.split('.').map(Number);
  if (!(major > MINIMUM[0] || (major === MINIMUM[0] && minor >= MINIMUM[1]))) throw new Unmeasurable(`TypeScript ${version} is older than ${MINIMUM.join('.')}, which the forced --noCheck false needs`);
  return { bin, version };
}

// One run of the compiler; the count, per-file counts, compiler version and the configuration file's hash.
export function measure(root, { timeoutMs = TIMEOUT_MS, maxOutput = MAX_OUTPUT } = {}) {
  const { bin, version } = compiler(root);
  const configPath = join(root, CONFIG);
  if (!existsSync(configPath)) throw new Unmeasurable(`${CONFIG} is missing; intake copies it from the pack and fits its include and lib`);
  const configHash = createHash('sha256').update(readFileSync(configPath)).digest('hex');
  const started = process.hrtime.bigint();
  const r = spawnSync(process.execPath, [bin, ...FLAGS], { cwd: root, encoding: 'utf8', timeout: timeoutMs, killSignal: 'SIGKILL', maxBuffer: maxOutput });
  const seconds = Number(process.hrtime.bigint() - started) / 1e9;
  if (r.error?.code === 'ETIMEDOUT') throw new Unmeasurable(`the compiler ran past ${timeoutMs / 1000} s and was killed`);
  if (r.error?.code === 'ENOBUFS') throw new Unmeasurable(`the compiler's output passed ${maxOutput} bytes`);
  if (r.error) throw new Unmeasurable(`the compiler could not run: ${r.error.message}`);
  if (r.signal) throw new Unmeasurable(`the compiler stopped on ${r.signal}`);
  const stderr = (r.stderr ?? '').split(/\r?\n/).filter((l) => l.trim() !== '' && !NODE_WARNING.test(l));
  if (stderr.length) throw new Unmeasurable(`the compiler wrote to standard error, so its count may be partial: ${stderr[0]}`);
  const { errors, files, unlocated } = parse(r.stdout ?? '');
  if (unlocated.length) throw new Unmeasurable(`the compiler reported an error with no location, so its count measures nothing: ${unlocated[0]}`);
  if (r.status === 0 && errors > 0) throw new Unmeasurable(`the compiler exited 0 yet printed ${errors} error line(s)`);
  if (r.status !== 0 && !ERROR_STATUSES.has(r.status)) throw new Unmeasurable(`the compiler exited ${r.status}, not a status it gives for errors found`);
  if (r.status !== 0 && errors === 0) throw new Unmeasurable(`the compiler exited ${r.status} with no diagnostic line`);
  return { errors, files, compilerVersion: version, configHash, seconds };
}

export function readBaseline(root) {
  const path = join(root, BASELINE);
  if (!existsSync(path)) return null;
  const raw = readFileSync(path, 'utf8');
  let b; try { b = JSON.parse(raw); } catch { throw new Unmeasurable(`${BASELINE} is not valid JSON`); }
  const ok = b && b.schema === 1 && Number.isInteger(b.errors) && b.errors >= 0 && typeof b.compilerVersion === 'string' && b.compilerVersion !== ''
    && typeof b.configHash === 'string' && /^[0-9a-f]{64}$/.test(b.configHash) && b.files && typeof b.files === 'object' && !Array.isArray(b.files)
    && Object.values(b.files).every((n) => Number.isInteger(n) && n > 0) && Object.values(b.files).reduce((s, n) => s + n, 0) === b.errors;
  if (!ok) throw new Unmeasurable(`${BASELINE} does not have the baseline's shape: schema 1, errors, compilerVersion, configHash and per-file counts summing to errors`);
  return { ...b, raw };
}

// Writes the baseline only if the file is as it was read at the start. The first is created exclusively, so it never
// replaces one that appeared during the run; a lower one goes through a temporary file created exclusively and renamed
// over the old, the temporary file removed on any failure.
function writeBaseline(root, m, expected) {
  const files = Object.fromEntries(Object.keys(m.files).sort().map((f) => [f, m.files[f]]));
  const body = `${JSON.stringify({ schema: 1, errors: m.errors, compilerVersion: m.compilerVersion, configHash: m.configHash, files }, null, 2)}\n`;
  const path = join(root, BASELINE);
  if (expected === null) {
    try { writeFileSync(path, body, { flag: 'wx' }); } catch (e) {
      if (e.code === 'EEXIST') throw new Unmeasurable(`${BASELINE} appeared during the run; nothing written`);
      rmSync(path, { force: true });
      throw new Unmeasurable(`the baseline could not be written: ${e.message}`);
    }
    return;
  }
  const tmp = `${path}.${process.pid}.tmp`;
  if ((existsSync(path) ? readFileSync(path, 'utf8') : null) !== expected) throw new Unmeasurable(`${BASELINE} changed during the run; nothing written, run it again`);
  let fd = null, created = false;
  try {
    fd = openSync(tmp, 'wx'); // owned from here: created exclusively by this run
    created = true;
    writeSync(fd, body);
    closeSync(fd); fd = null;
    renameSync(tmp, path);
    created = false;
  } catch (e) {
    throw new Unmeasurable(`the baseline could not be written: ${e.message}`);
  } finally {
    if (fd !== null) { try { closeSync(fd); } catch { /* already failing */ } }
    if (created) rmSync(tmp, { force: true }); // only a temporary file this run made
  }
}

// Files whose count rose against the baseline, as "file: before → after".
const rises = (base, m) => Object.keys(m.files).sort().filter((f) => m.files[f] > (base.files[f] ?? 0)).map((f) => `${f}: ${base.files[f] ?? 0} → ${m.files[f]}`);

// The ratchet; returns the exit code and the lines it prints.
export function ratchet(args, root = process.cwd(), opts = {}) {
  const out = [], say = (l) => out.push(l);
  const init = args.includes('--init'), lower = args.includes('--lower'), accept = args.includes('--accept-environment-change');
  const known = new Set(['--init', '--lower', '--accept-environment-change']);
  if (args.some((a) => !known.has(a)) || new Set(args).size !== args.length || (init && (lower || accept)) || (accept && !lower)) return { code: 2, lines: [USAGE] };
  try {
    const base = readBaseline(root);
    if (init) {
      if (base) throw new Unmeasurable(`${BASELINE} exists; --init writes only the first baseline, and a raise is a decision that edits it by hand`);
      const m = measure(root, opts);
      writeBaseline(root, m, null);
      say(`jsdoc-ratchet: recorded ${m.errors} error(s) with TypeScript ${m.compilerVersion} in ${m.seconds.toFixed(1)} s; name the count in a decision`);
      return { code: 0, lines: out };
    }
    if (!base) throw new Unmeasurable(`no ${BASELINE}; run --init once, then name the count in a decision`);
    const m = measure(root, opts);
    const changed = [];
    if (m.compilerVersion !== base.compilerVersion) changed.push(`the compiler is TypeScript ${m.compilerVersion}, the baseline's ${base.compilerVersion}`);
    if (m.configHash !== base.configHash) changed.push(`${CONFIG} differs from the one the baseline measured`);
    const head = `jsdoc-ratchet: ${m.errors} error(s), baseline ${base.errors}, TypeScript ${m.compilerVersion}, ${m.seconds.toFixed(1)} s`;
    if (changed.length && !(lower && accept)) throw new Unmeasurable(`${changed.join('; ')}: review the change, then --lower --accept-environment-change records it while the count is at or below ${base.errors}`);
    if (m.errors > base.errors) {
      say(`${head} — the count rose by ${m.errors - base.errors} and may not rise${lower ? '; nothing written' : ''}`);
      for (const r of rises(base, m)) say(`  ${r}`);
      return { code: 1, lines: out };
    }
    say(head);
    const hidden = rises(base, m);
    if (hidden.length) { say('INFO  a file\'s count rose while the total did not; a new error may have replaced a fixed one:'); for (const r of hidden) say(`  ${r}`); }
    if (lower && (m.errors < base.errors || changed.length)) {
      writeBaseline(root, m, base.raw);
      say(`jsdoc-ratchet: baseline now ${m.errors}${changed.length ? `, recording ${changed.join('; ')}` : ''}`);
    } else if (m.errors < base.errors) say(`jsdoc-ratchet: the count fell by ${base.errors - m.errors}; --lower records it`);
    else if (lower) say('jsdoc-ratchet: the count equals the baseline; nothing to record');
    return { code: 0, lines: out };
  } catch (e) {
    const why = e instanceof Unmeasurable ? e.message : `an unexpected failure: ${e instanceof Error ? e.message : String(e)}`;
    return { code: 2, lines: [...out, `jsdoc-ratchet: cannot measure — ${why}`] };
  }
}

const self = fileURLToPath(import.meta.url);
const invoked = process.argv[1] && (() => { try { return realpathSync(process.argv[1]) === realpathSync(self); } catch { return false; } })();
if (invoked) {
  const { code, lines } = ratchet(process.argv.slice(2));
  for (const l of lines) (code === 0 ? console.log : console.error)(l);
  process.exitCode = code;
}

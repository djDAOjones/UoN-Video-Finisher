// VH-235 #2 (from mx.mjs, S-78k's 12 keys only, ruling 1's re-walk): the matrix cells, by the walker's own matrix.mjs on a plan held in memory (no walker file changed).
// The plan `vh235` declares the 45 keys of keys.mjs; matrix.mjs then runs as its own main with `--keys`.
import { pathToFileURL } from 'node:url'
import { writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
const WK = process.env.WALKER, OUTD = process.env.OUTD
const keys = execSync('node keys.mjs list', { env: process.env }).toString().trim().split('\n').filter((k) => k.startsWith('S-78k__'))
const keyFile = OUTD + '/keys.txt'
writeFileSync(keyFile, keys.join('\n') + '\n')
const { PLANS } = await import(pathToFileURL(WK + '/scenarios.mjs'))
PLANS.vh235 = () => keys.map((k) => { const [id, lang, view, mode] = k.split('__'); return { id, lang, view, mode } })
process.argv = [process.argv[0], WK + '/matrix.mjs', 'vh235', '--keys', keyFile]
await import(pathToFileURL(WK + '/matrix.mjs'))

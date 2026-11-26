import { toolConfig } from '../eslint.base.js' // the repository's base config (UVT-3), the import boundaries in it (UVT-1, D9)

/**
 * The Finisher's ESLint config: the base every folder extends, with this
 * tool's own ignores. Strict on correctness, silent on taste — per
 * conventions.md -> Tooling. Formatting is Prettier's job and never fails the gate.
 */
export default toolConfig({
  tsconfigRootDir: import.meta.dirname,
  ignores: ['dist/**', 'node_modules/**', 'pm_skills/**', 'coverage/**', 'tools/**'], // tools/ is pm-next v3's, linted upstream
})

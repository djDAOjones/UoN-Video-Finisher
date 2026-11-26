import { defineConfig } from 'vitest/config'

/**
 * `shared/`'s own test run, in the root gate (UVT-2). Each tool also runs the
 * shared tests it depends on, under its own config and build-time values;
 * here the two values `core/version.ts` reads are fixed stand-ins.
 */
export default defineConfig({
  root: import.meta.dirname,
  define: {
    __APP_VERSION__: JSON.stringify('v0.0.0-shared'),
    __BUILD_ID__: JSON.stringify('v0.0.0-shared+test'),
  },
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
  },
})

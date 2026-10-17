import { defineConfig } from 'vitest/config';

// Relative base so the same build works on GitHub Pages (/Salef-AlAwaleen/) and any other host.
export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    sourcemap: true,
    chunkSizeWarningLimit: 900,
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});

import { defineConfig } from 'vitest/config';

// Relative base so the same build works on GitHub Pages (/Salef-AlAwaleen/) and any other host.
export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    sourcemap: true,
    chunkSizeWarningLimit: 900,
    // Keep the AudioWorklet as a real file: data: URLs in addModule are not reliable on Safari.
    assetsInlineLimit: (file: string) => (file.includes('worklet') ? false : undefined),
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
});

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['chatbox/index.ts'],
  format: ['esm'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
});

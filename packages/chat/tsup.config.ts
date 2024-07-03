import { defineConfig, Format } from 'tsup';

const cfg = {
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: false,
  dts: true,
  format: ['esm', 'cjs'] as Format[],
};

export default defineConfig([
  {
    ...cfg,
    entry: {
      index: 'src/components/button-scroll-to-bottom.ts',
    },
    external: ['react', 'next'],
    outDir: 'dist/components',
    esbuildOptions: (options) => {
      // Append "use client" to the top of the react entry point
      options.banner = {
        js: '"use client";',
      };
    },
  },
  {
    ...cfg,
    entry: {
      index: 'src/components/chat-bubble-content.tsx',
    },
    external: ['react', 'next'],
    outDir: 'dist/components',
    esbuildOptions: (options) => {
      // Append "use client" to the top of the react entry point
      options.banner = {
        js: '"use client";',
      };
    },
  },
  {
    ...cfg,
    entry: {
      index: 'src/components/message.tsx',
    },
    external: ['react', 'next'],
    outDir: 'dist/components',
    esbuildOptions: (options) => {
      // Append "use client" to the top of the react entry point
      options.banner = {
        js: '"use client";',
      };
    },
  },
  {
    ...cfg,
    entry: {
      index: 'src/hooks/use-state-reducer.ts',
    },
    external: ['react', 'next'],
    outDir: 'dist/hooks',
    esbuildOptions: (options) => {
      // Append "use client" to the top of the react entry point
      options.banner = {
        js: '"use client";',
      };
    },
  }
]);

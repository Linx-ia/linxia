import autoprefixer from 'autoprefixer';
import * as esbuild from 'esbuild';
import postCssPlugin from 'esbuild-style-plugin';
import tailwindcss from 'tailwindcss';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';
const outDir = isProd ? './dist' : './tests/dist';

const clientSymbols = [
  'use-streamable-text.ts',
  'prompt-form.tsx',
  'empty-screen.tsx',
  'chat.tsx',
];

// @ts-ignore
function shouldResolveToClient(importedSymbols) {
  return clientSymbols.some(symbol => importedSymbols.includes(symbol));
}

const resolvePlugin = {
  name: 'resolve-plugin',
  // @ts-ignore
  setup(build) {
    // @ts-ignore
    build.onResolve({ filter: /ai\/rsc/ }, async (args) => {
      const clientPath = path.resolve(__dirname, '../../node_modules/ai/rsc/dist/rsc-client.mjs');
      const serverPath = path.resolve(__dirname, '../../node_modules/ai/rsc/dist/rsc-server.mjs');
      const importedFile = args.importer.split('\\').pop();
      const resolveToClient = shouldResolveToClient([importedFile]);
      const resolvedPath = resolveToClient ? clientPath : serverPath;
      return {
        path: resolvedPath,
        namespace: 'file',
      };
    });
  },
};

let ctx = await esbuild.context({
  entryPoints: [
    'chatbox/index.ts',
  ],
  bundle: true,
  outdir: outDir,
  external: ['fs', 'stream', 'zlib', 'process'],
  allowOverwrite: true,
  format: 'esm',
  jsx: 'automatic',
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  metafile: true,
  sourcemap: true,
  minify: isProd,
  platform: 'browser',
  plugins: [
    // @ts-ignore
    postCssPlugin({
      postcss: {
        // @ts-ignore
        plugins: [tailwindcss, autoprefixer],
      },
    }),
    resolvePlugin,
  ],
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.js': 'js',
    '.jsx': 'jsx',
    '.mjs': 'js',
  },
  alias: {
    'ai/rsc': path.resolve(__dirname, '../../node_modules/ai/rsc/dist/rsc-client.mjs'),
    'async_hooks': path.resolve(__dirname, '../../node_modules/@types/node/async_hooks.d.ts'),
  },
});

if (isProd) {
  const b = await ctx.rebuild();
  console.log(await esbuild.analyzeMetafile(b.metafile, { verbose: true }));
  await ctx.dispose();
  console.log('✅ Build complete!');
} else {
  let { host, port } = await ctx.serve({
    servedir: 'tests/',
  });
  console.log(`🚀 Server running at http://${host === '0.0.0.0' ? 'localhost' : host}:${port}/`);
}

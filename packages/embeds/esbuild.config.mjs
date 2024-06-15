import autoprefixer from 'autoprefixer';
import * as esbuild from 'esbuild';
import postCssPlugin from 'esbuild-style-plugin';
import tailwindcss from 'tailwindcss';

const isProd = process.env.NODE_ENV === 'production';
const outDir = isProd ? './dist' : './tests/dist';

let ctx = await esbuild.context({
  entryPoints: [
    'chatbox/index.ts'
  ],
  bundle: true,
  outdir: outDir,
  external: ['fs', 'stream', 'zlib', 'process'],
  allowOverwrite: true,
  format: 'esm',
  jsx: 'automatic',
  define: {
    'process.env': '{}',

    ...(isProd
      ? {
          'process.env.NODE_ENV': '"production"'
        }
      : {}),
  },
  metafile: true,
  sourcemap: true,
  ...(isProd
    ? {
        minify: true,
        sourcemap: false,
      }
    : {}),

  plugins: [
    postCssPlugin({
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    }),
  ],
});

if (isProd) {
  const b = await ctx.rebuild();

  console.log(
    await esbuild.analyzeMetafile(b.metafile, {
      verbose: true,
    })
  );

  await ctx.dispose();
  console.log('✅ Build complete!');
} else {
  let { host, port } = await ctx.serve({
    servedir: 'tests/',
  });
  console.log(
    `🚀 Server running at http://${
      host === '0.0.0.0' ? 'localhost' : host
    }:${port}/`
  );
}

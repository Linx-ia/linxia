import type { Options } from "tsup";
import { defineConfig } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["src/**/*.tsx"],
  format: ["cjs"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
  dts: true,
  minify: true,
  external: ["react"],
  ...options,
}));

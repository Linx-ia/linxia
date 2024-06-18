import type { Options } from "tsup";
import { defineConfig } from "tsup";

export default defineConfig((options: Options) => ({
  entry: ["chatbox/**/*.tsx", "chatbox/**/*.ts"],
  format: ["cjs", "esm"],
  dts: true,
  minify: true,
  external: ["react"],
  noExternal: ["@linxia/chat"], // Include @linxia/chat in the bundle
  splitting: false, // Disable code splitting to avoid chunk creation
  clean: true, // Clean the output directory before each build
  esbuildOptions(options) {
    options.plugins = [
      {
        name: "add-use-client",
        setup(build) {
          const fs = require("fs");
          const path = require("path");

          build.onLoad({ filter: /\.(js|mjs|tsx|jsx)$/ }, async (args) => {
            const contents = fs.readFileSync(args.path, "utf8");

            // Determine if "use client" should be added
            const shouldAddUseClient = /useState|useEffect|useContext|useReducer|useRef|useMemo|useCallback|useLayoutEffect|useDebugValue/.test(contents);

            const result = shouldAddUseClient ? `"use client";\n${contents}` : contents;

            // Determine the appropriate loader for the file extension
            const ext = path.extname(args.path).slice(1);
            let loader: "tsx" | "jsx" | "js" | "mjs" = ext as "tsx" | "jsx" | "js" | "mjs";

            // Normalize the loader for esbuild compatibility
            if (loader === "mjs") {
              loader = "js";
            }

            return {
              contents: result,
              loader,
            };
          });
        },
      },
    ];
  },
  ...options,
}));

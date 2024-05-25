import type { Config } from "tailwindcss";

import sharedConfig from "@linxia/tailwind-config";

const config: Pick<Config, "presets"> = {
  presets: [
    {
      ...sharedConfig,
      content: [
        "src/**/*.{ts,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        // h/t to https://www.willliu.com/blog/Why-your-Tailwind-styles-aren-t-working-in-your-Turborepo
        "../../packages/ui/src/**/*{.js,.ts,.jsx,.tsx}",
      ],
      theme: {
        extend: {
          ...sharedConfig?.theme?.extend,
          animation: {
            ...sharedConfig?.theme?.extend?.animation,
            // Infinite scroll animation
            "infinite-scroll": "infinite-scroll 22s linear infinite",
          },
          keyframes: {
            ...sharedConfig?.theme?.extend?.keyframes,
            // Infinite scroll animation
            "infinite-scroll": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-150%)" },
            },
          },
        },
      },
    },
  ],
};

export default config;

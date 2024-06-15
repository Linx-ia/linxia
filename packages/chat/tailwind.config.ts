import type { Config } from "tailwindcss";

import sharedConfig from "@linxia/tailwind-config";

const config: Pick<Config, "presets"> = {
  presets: [sharedConfig],
};

export default config;

"use cliente";

import type { ReactNode } from "react";

import { TooltipProvider } from "@linxia/ui";

import ModalProvider from "./model-provider";
import { ThemeProvider } from "./theme-provider";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <ModalProvider>{children}</ModalProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

// app/providers.tsx
"use client";

import { ChakraProvider, CSSReset, ColorModeProvider } from "@chakra-ui/react";
import { theme } from "../theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      {children}
    </ChakraProvider>
  );
}

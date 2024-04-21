"use client";
import {
  ChakraProvider,
  CSSReset,
  localStorageManager,
} from "@chakra-ui/react";
import { theme } from "../theme";
import { UrqlProvider, ssrExchange } from "@urql/next";

import { useMemo } from "react";
import createUrqlClient from "../utils/createUrqlClient";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== "undefined",
    });

    const client = createUrqlClient({
      exchanges: [ssr],
      otherOptions: {
        suspense: true,
      },
    });

    return [client, ssr];
  }, []);

  return (
    <UrqlProvider client={client} ssr={ssr}>
      <ChakraProvider colorModeManager={localStorageManager} theme={theme}>
        <CSSReset />
        {children}
      </ChakraProvider>
    </UrqlProvider>
  );
}

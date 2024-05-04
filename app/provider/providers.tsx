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
import { IS_CLIENT } from "../constants";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: IS_CLIENT,
    });

    const client = createUrqlClient({
      exchanges: [ssr],
      otherOptions: {
        // suspense: true,
      },
    });

    return [client, ssr];
  }, []);

  const data = JSON.stringify(ssr.extractData());

  return (
    <UrqlProvider client={client} ssr={ssr}>
      <ChakraProvider colorModeManager={localStorageManager} theme={theme}>
        <CSSReset />
        {children}
      </ChakraProvider>
    </UrqlProvider>
  );
}

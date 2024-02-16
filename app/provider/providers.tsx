"use client";
import {
  ChakraProvider,
  CSSReset,
  ColorModeProvider,
  localStorageManager,
} from "@chakra-ui/react";
import { theme } from "../theme";
import {
  Provider as URQLProvider,
  Client,
  cacheExchange,
  fetchExchange,
} from "urql";

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    credentials: "include",
    headers: {
      "x-forwarded-proto": "https",
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <URQLProvider value={client}>
      <ChakraProvider colorModeManager={localStorageManager} theme={theme}>
        <CSSReset />
        {children}
      </ChakraProvider>
    </URQLProvider>
  );
}

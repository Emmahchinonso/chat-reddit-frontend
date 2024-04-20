"use client";
import {
  ChakraProvider,
  CSSReset,
  localStorageManager,
} from "@chakra-ui/react";
import { theme } from "../theme";
import { cacheExchange, createClient, fetchExchange, gql } from "@urql/core";
import { UrqlProvider, ssrExchange } from "@urql/next";
import { useMemo } from "react";
import createUrqlClient from "../utils/createUrqlClient";
import { registerUrql } from "@urql/next/rsc";

const makeClient = () => {
  return createClient({
    url: "https://trygql.formidable.dev/graphql/basic-pokedex",
    exchanges: [cacheExchange, fetchExchange],
  });
};

// for server components
export const { getClient } = registerUrql(makeClient);

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

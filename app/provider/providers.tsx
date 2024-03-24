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
  fetchExchange,
  Exchange,
} from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  MeDocument,
  LoginMutation,
  MeQuery,
  RegisterMutation,
} from "../generate/graphql";
import { devtoolsExchange } from "@urql/devtools";

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [
    devtoolsExchange as Exchange,
    cacheExchange({
      updates: {
        Mutation: {
          login(result: LoginMutation, args, cache, info) {
            cache.updateQuery({ query: MeDocument }, (data: MeQuery | null) => {
              if (result.login.errors) {
                return data;
              }
              return {
                ...data,
                me: result.login.user,
              };
            });
          },
          register(result: RegisterMutation, args, cache, info) {
            cache.updateQuery({ query: MeDocument }, (data: MeQuery | null) => {
              if (result.register.errors) {
                return data;
              }
              return {
                ...data,
                me: result.register.user,
              };
            });
          },
        },
      },
    }) as Exchange,
    fetchExchange,
  ],
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

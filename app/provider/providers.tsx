"use client";
import {
  ChakraProvider,
  CSSReset,
  localStorageManager,
} from "@chakra-ui/react";
import { theme } from "../theme";
import {
  UrqlProvider,
  fetchExchange,
  Exchange,
  ssrExchange,
  createClient,
} from "@urql/next";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  MeDocument,
  LoginMutation,
  MeQuery,
  RegisterMutation,
  LogoutMutation,
} from "../generate/graphql";
import { devtoolsExchange } from "@urql/devtools";
import { useMemo } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== "undefined",
    });

    const client = createClient({
      url: "http://localhost:4000/graphql",
      exchanges: [
        devtoolsExchange as Exchange,
        cacheExchange({
          updates: {
            Mutation: {
              login(result: LoginMutation, args, cache, info) {
                cache.updateQuery(
                  { query: MeDocument },
                  (data: MeQuery | null) => {
                    if (result.login.errors) {
                      return data;
                    }
                    return {
                      ...data,
                      me: result.login.user,
                    };
                  }
                );
              },
              register(result: RegisterMutation, args, cache, info) {
                cache.updateQuery(
                  { query: MeDocument },
                  (data: MeQuery | null) => {
                    if (result.register.errors) {
                      return data;
                    }
                    return {
                      ...data,
                      me: result.register.user,
                    };
                  }
                );
              },
              logout(result: LogoutMutation, args, cache, info) {
                cache.updateQuery(
                  { query: MeDocument },
                  (data: MeQuery | null) => {
                    if (result.logout) {
                      return { me: null };
                    }
                    return data;
                  }
                );
              },
            },
          },
        }) as Exchange,
        ssr,
        fetchExchange,
      ],
      fetchOptions: {
        credentials: "include",
        headers: {
          "x-forwarded-proto": "https",
        },
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

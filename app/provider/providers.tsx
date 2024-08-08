"use client";
import {
  ChakraProvider,
  cookieStorageManager,
  CSSReset,
} from "@chakra-ui/react";
import { theme } from "../theme";
import { Exchange, UrqlProvider, ssrExchange } from "@urql/next";
import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";

import { Suspense, useMemo } from "react";
import createUrqlClient from "../utils/createUrqlClient";
import { API_URL, IS_CLIENT } from "../constants";
import { useRouter } from "next/navigation";
import { pipe, tap } from "wonka";
import { apiErrors } from "../utils/apiErros";
import { getCookies } from "../utils/actions";
import { ApolloProvider } from "@apollo/client";
import { PaginatedPosts } from "../generate/graphql";

export interface ICookie {
  name: string;
  value: string;
}

export function Providers({
  children,
  cookie,
}: {
  children: React.ReactNode;
  cookie?: ICookie;
}) {
  const router = useRouter();
  function makeClient() {
    const httpLink = new HttpLink({
      uri: API_URL,
      credentials: "include",
      headers: {
        "x-forwarded-proto": "https",
        ...(!IS_CLIENT() && { cookie: `${cookie?.name}=${cookie?.value}` }),
      },
    });

    return new ApolloClient({
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              posts: {
                keyArgs: false,
                merge(
                  existing: PaginatedPosts | undefined,
                  incoming: PaginatedPosts
                ): PaginatedPosts {
                  return {
                    ...incoming,
                    posts: [...(existing?.posts || []), ...incoming.posts],
                  };
                },
              },
            },
          },
        },
      }),
      link: httpLink,
    });
  }

  return (
    <Suspense>
      <ApolloNextAppProvider makeClient={makeClient}>
        {/* <UrqlProvider client={client} ssr={ssr}> */}
        <ChakraProvider colorModeManager={cookieStorageManager} theme={theme}>
          <CSSReset />
          {children}
        </ChakraProvider>
        {/* </UrqlProvider> */}
      </ApolloNextAppProvider>
    </Suspense>
  );
}

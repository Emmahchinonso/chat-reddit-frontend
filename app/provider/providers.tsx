"use client";
import {
  ChakraProvider,
  cookieStorageManager,
  CSSReset,
} from "@chakra-ui/react";
import { theme } from "../theme";
import { Exchange, UrqlProvider, ssrExchange } from "@urql/next";

import { Suspense, useMemo } from "react";
import createUrqlClient from "../utils/createUrqlClient";
import { API_URL, IS_CLIENT } from "../constants";
import { useRouter } from "next/navigation";
import { pipe, tap } from "wonka";
import { apiErrors } from "../utils/apiErros";
import { getCookies } from "../utils/actions";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
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
  const _client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: false,
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts,
                { args }
              ): PaginatedPosts {
                console.log("posts ==>", existing, incoming);
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
    credentials: "include",
    headers: {
      "x-forwarded-proto": "https",
      ...(!IS_CLIENT() && { cookie: `${cookie?.name}=${cookie?.value}` }),
    },
  });

  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: IS_CLIENT(),
    });

    const errorExchange: Exchange =
      ({ forward }) =>
      (ops$) => {
        return pipe(
          forward(ops$),
          tap(({ error }) => {
            if (error?.message === apiErrors.IS_NOT_AUTHENTICATED) {
              router.replace("/login");
            }
          })
        );
      };

    const client = createUrqlClient({
      exchanges: [errorExchange, ssr],
      otherOptions: {
        suspense: true,
      },
      cookie,
    });

    return [client, ssr];
  }, []);

  return (
    <Suspense>
      <ApolloProvider client={_client}>
        {/* <UrqlProvider client={client} ssr={ssr}> */}
        <ChakraProvider colorModeManager={cookieStorageManager} theme={theme}>
          <CSSReset />
          {children}
        </ChakraProvider>
        {/* </UrqlProvider> */}
      </ApolloProvider>
    </Suspense>
  );
}

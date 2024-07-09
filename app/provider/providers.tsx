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
import { IS_CLIENT } from "../constants";
import { useRouter } from "next/navigation";
import { pipe, tap } from "wonka";
import { apiErrors } from "../utils/apiErros";
import { getCookies } from "../utils/actions";

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
      <UrqlProvider client={client} ssr={ssr}>
        <ChakraProvider colorModeManager={cookieStorageManager} theme={theme}>
          <CSSReset />
          {children}
        </ChakraProvider>
      </UrqlProvider>
    </Suspense>
  );
}

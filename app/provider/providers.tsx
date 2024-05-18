"use client";
import {
  ChakraProvider,
  cookieStorageManager,
  CSSReset,
} from "@chakra-ui/react";
import { theme } from "../theme";
import { Exchange, UrqlProvider, ssrExchange } from "@urql/next";

import { useMemo } from "react";
import createUrqlClient from "../utils/createUrqlClient";
import { IS_CLIENT } from "../constants";
import { useRouter } from "next/navigation";
import { pipe, tap } from "wonka";
import { apiErrors } from "../utils/apiErros";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: IS_CLIENT,
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
    });

    return [client, ssr];
  }, []);

  const data = JSON.stringify(ssr.extractData());

  return (
    <UrqlProvider client={client} ssr={ssr}>
      <ChakraProvider colorModeManager={cookieStorageManager} theme={theme}>
        <CSSReset />
        {children}
      </ChakraProvider>
    </UrqlProvider>
  );
}

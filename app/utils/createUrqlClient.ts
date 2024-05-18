import {
  fetchExchange,
  Exchange,
  createClient,
  ClientOptions,
} from "@urql/next";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  RegisterMutation,
  LogoutMutation,
} from "../generate/graphql";
import { devtoolsExchange } from "@urql/devtools";

const createUrqlClient = ({
  exchanges,
  otherOptions,
}: {
  exchanges?: Exchange[];
  otherOptions?: Omit<ClientOptions, "url" | "exchanges">;
}) => {
  return createClient({
    url: "http://localhost:4000/graphql",
    exchanges: [
      devtoolsExchange as Exchange,
      cacheExchange({
        updates: {
          Mutation: {
            login(result: LoginMutation, args, cache, info) {
              cache.invalidate("Query", "me");
            },
            register(result: RegisterMutation, args, cache, info) {
              cache.invalidate("Query", "me");
            },
            logout(result: LogoutMutation, args, cache, info) {
              cache.invalidate("Query", "me");
            },
          },
        },
      }) as Exchange,
      ...exchanges!,
      fetchExchange,
    ],
    ...otherOptions,
    fetchOptions: {
      credentials: "include",
      headers: {
        "x-forwarded-proto": "https",
      },
    },
  });
};

export default createUrqlClient;

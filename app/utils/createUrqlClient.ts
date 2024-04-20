import {
  fetchExchange,
  Exchange,
  createClient,
  ClientOptions,
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
      ...exchanges!,
      fetchExchange,
    ],

    fetchOptions: {
      credentials: "include",
      headers: {
        "x-forwarded-proto": "https",
      },
    },
    ...otherOptions,
  });
};

export default createUrqlClient;

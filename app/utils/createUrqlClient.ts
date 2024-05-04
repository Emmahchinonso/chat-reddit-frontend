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
  RegularUserResponseFragmentDoc,
} from "../generate/graphql";
import { devtoolsExchange } from "@urql/devtools";
import { useFragment } from "../generate";

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
              const login = useFragment(
                RegularUserResponseFragmentDoc,
                result.login
              );
              // cache.updateQuery(
              //   { query: MeDocument },
              //   (data: MeQuery | null) => {
              //     const login = useFragment(
              //       RegularUserResponseFragmentDoc,
              //       result.login
              //     );

              //     if (login.errors) {
              //       return data;
              //     }
              //     return {
              //       ...data,
              //       me: login.user,
              //     };
              //   }
              // );

              cache.invalidate("Query", "me");
            },
            register(result: RegisterMutation, args, cache, info) {
              // cache.updateQuery(
              //   { query: MeDocument },
              //   (data: MeQuery | null) => {
              //     const register = useFragment(
              //       RegularUserResponseFragmentDoc,
              //       result.register
              //     );
              //     if (register.errors) {
              //       return data;
              //     }
              //     return {
              //       ...data,
              //       me: register.user,
              //     };
              //   }
              // );
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

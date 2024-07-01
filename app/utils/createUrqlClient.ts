import {
  fetchExchange,
  Exchange,
  createClient,
  ClientOptions,
  Query,
} from "@urql/next";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  RegisterMutation,
  LogoutMutation,
} from "../generate/graphql";
import { devtoolsExchange } from "@urql/devtools";
import { cursorPagination } from "./cursorPagination";
import { PostsLimit } from "../constants";

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
        keys: {
          PaginatedPosts: () => null,
        },
        resolvers: {
          Query: {
            posts: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            createPost(result, args, cache, info) {
              const allFields = cache.inspectFields("Query");
              const fieldInfos = allFields.filter(
                (info: any) => info.fieldName === "posts"
              );
              fieldInfos.forEach((fieldInfo) => {
                cache.invalidate("Query", "posts", fieldInfo.arguments || {});
              });
              window.console.log("allFields", allFields);
            },
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

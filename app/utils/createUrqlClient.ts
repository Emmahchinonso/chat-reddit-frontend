import {
  fetchExchange,
  Exchange,
  createClient,
  ClientOptions,
  Query,
  gql,
} from "@urql/next";
import { cacheExchange } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  RegisterMutation,
  LogoutMutation,
  VotePostMutationVariables,
  PostSnippetFragment,
} from "../generate/graphql";
import { devtoolsExchange } from "@urql/devtools";
import { cursorPagination } from "./cursorPagination";
import { PostsLimit } from "../constants";
import { VoteState } from "../types";

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
            vote: (result, args, cache, info) => {
              const { postId, type } = args as VotePostMutationVariables;
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: postId }
              ) as PostSnippetFragment;

              if (data) {
                const pointsToAdd = type === "UP" ? 1 : -1;
                if (type === VoteState.NONE) {
                  const pointsToAdd = data.voteStatus === "UP" ? -1 : 1;
                  cache.writeFragment(
                    gql`
                      fragment _ on Post {
                        points
                        voteStatus
                      }
                    `,
                    {
                      id: postId,
                      points: data.points + pointsToAdd,
                      voteStatus: null,
                    }
                  );
                  console.log(
                    "fragmentResult ==>",
                    cache.readFragment(
                      gql`
                        fragment _ on Post {
                          id
                          points
                          voteStatus
                        }
                      `,
                      { id: postId }
                    )
                  );
                  return;
                }
                const newPoints =
                  data.points + (data.voteStatus ? 2 : 1) * pointsToAdd;
                cache.writeFragment(
                  gql`
                    fragment _ on Post {
                      points
                      voteStatus
                    }
                  `,
                  {
                    id: postId,
                    points: newPoints,
                    voteStatus: type,
                  }
                );
              }
            },
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

import {
  fetchExchange,
  Exchange,
  createClient,
  ClientOptions,
  Query,
  gql,
} from "@urql/next";
import { Cache, cacheExchange } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  RegisterMutation,
  LogoutMutation,
  VotePostMutationVariables,
  PostSnippetFragment,
  DeletePostMutationVariables,
} from "../generate/graphql";
import { devtoolsExchange } from "@urql/devtools";
import { cursorPagination } from "./cursorPagination";
import { API_URL, IS_CLIENT, PostsLimit } from "../constants";
import { VoteState } from "../types";
import { ICookie } from "../provider/providers";

const invalidatePostsField = (cache: Cache) => {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter(
    (info: any) => info.fieldName === "posts"
  );
  fieldInfos.forEach((fieldInfo) => {
    cache.invalidate("Query", "posts", fieldInfo.arguments || {});
  });
};

const createUrqlClient = ({
  exchanges,
  otherOptions,
  cookie,
}: {
  exchanges?: Exchange[];
  otherOptions?: Omit<ClientOptions, "url" | "exchanges">;
  cookie?: ICookie;
}) => {
  console.log("APi url =>", API_URL);
  return createClient({
    url: API_URL!,
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
              invalidatePostsField(cache);
            },
            deletePost(result, args, cache, info) {
              invalidatePostsField(cache);
            },
            login(result: LoginMutation, args, cache, info) {
              cache.invalidate("Query", "me");
              // invalidatePostsField(cache);
            },
            register(result: RegisterMutation, args, cache, info) {
              cache.invalidate("Query", "me");
            },
            logout(result: LogoutMutation, args, cache, info) {
              cache.invalidate("Query", "me");
              // invalidatePostsField(cache);
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
        ...(!IS_CLIENT() && { cookie: `${cookie?.name}=${cookie?.value}` }),
      },
    },
  });
};

export default createUrqlClient;

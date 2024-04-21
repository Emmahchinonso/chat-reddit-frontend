import { cacheExchange, createClient, fetchExchange, gql } from "@urql/core";
import { registerUrql } from "@urql/next/rsc";
const makeClient = () => {
  return createClient({
    url: "http://localhost:4000/graphql",
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: {
      credentials: "include",
      headers: {
        "x-forwarded-proto": "https",
      },
    },
  });
};

// for server components
export const { getClient } = registerUrql(makeClient);

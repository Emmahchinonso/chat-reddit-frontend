"use client";
import Posts from "./components/Posts";
import { routes } from "./constants/routes";
import { Link } from "@chakra-ui/next-js";
import { useMeQuery, usePostsQuery } from "./generate/hooks";
import { IS_CLIENT } from "./constants";
import { useQuery } from "urql";
import { MeDocument, PostsDocument } from "./generate/graphql";
import Wrapper from "./components/Wrapper";

export default async function Home() {
  // const [{ data, fetching }] = useQuery({
  //   query: PostsDocument,
  //   pause: !IS_CLIENT,
  //   variables: {
  //     limit: 10,
  //   },
  // });

  // console.log("data", data);
  return (
    <Wrapper>
      <main>
        <br />
        <Link mb={4} display="block" href={routes.createPost}>
          Create post
        </Link>
        <Posts />
      </main>
    </Wrapper>
  );
}

import React from "react";
import { usePostsQuery } from "../generate/hooks";
import { IS_CLIENT } from "../constants";
import { Link } from "@chakra-ui/next-js";
import { routes } from "../constants/routes";

const Posts = () => {
  const [{ data, fetching }] = usePostsQuery({ pause: !IS_CLIENT });
  console.log("rendering...");

  return (
    <main>
      <br />
      <Link href={routes.createPost}>Create post</Link>

      {data?.posts ? (
        data.posts.map((post) => <div key={post.id}>{post.title}</div>)
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default Posts;

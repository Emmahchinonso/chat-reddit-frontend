import { Suspense } from "react";
import Navbar from "./components/Navbar";
import { PostsDocument } from "./generate/graphql";
import { getClient } from "./utils/getServerClients";

export default async function Home() {
  const result = await getClient().query(PostsDocument, {});
  const posts = result.data?.posts;

  return (
    <main>
      <Suspense>
        <Navbar />
      </Suspense>
      <br />
      <p>Hello world</p>
      {posts ? (
        posts.map((post) => <div key={post.id}>{post.title}</div>)
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}

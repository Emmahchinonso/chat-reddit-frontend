"use client";
import Posts from "./components/Posts";
import { routes } from "./constants/routes";
import { Link } from "@chakra-ui/next-js";

export default async function Home() {
  return (
    <main>
      <br />
      <Link href={routes.createPost}>Create post</Link>
      <Posts />
    </main>
  );
}

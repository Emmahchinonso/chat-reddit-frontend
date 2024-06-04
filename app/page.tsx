"use client";
import Posts from "./components/Posts";
import { routes } from "./constants/routes";
import { Link } from "@chakra-ui/next-js";
import Wrapper from "./components/Wrapper";

export default async function Home() {
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

"use client";
import Posts from "./components/Posts";
import { routes } from "./constants/routes";
import { Link } from "@chakra-ui/next-js";
import Wrapper from "./components/Wrapper";
import { Flex, Heading } from "@chakra-ui/react";

export default async function Home() {
  return (
    <Wrapper>
      <main>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading>ChatReddit</Heading>
          <Link display="block" href={routes.createPost}>
            Create post
          </Link>
        </Flex>
        <br />
        <Posts />
      </main>
    </Wrapper>
  );
}

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
        <Posts />
      </main>
    </Wrapper>
  );
}

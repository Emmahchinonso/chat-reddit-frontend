"use client";
import { Link } from "@chakra-ui/next-js";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generate/hooks";
import { useFragment } from "../generate";
import { RegularUserFragmentDoc } from "../generate/graphql";
import { routes } from "../constants/routes";
import { useRouter } from "next/navigation";
import Wrapper from "./Wrapper";
import { useApolloClient } from "@apollo/client";

const Navbar = () => {
  const [logout, { loading: isLoggingOut }] = useLogoutMutation();
  const { data, loading } = useMeQuery();
  const user = useFragment(RegularUserFragmentDoc, data?.me);
  const apolloClient = useApolloClient();

  let body: any;
  if (loading) {
    body = null;
  } else if (!user) {
    body = (
      <>
        <Link href={routes.login} color="white" mr={4}>
          Login
        </Link>
        <Link href={routes.register} color="white">
          Register
        </Link>
      </>
    );
  } else {
    body = (
      <Flex gap={3} alignItems="center">
        <Link
          bg="white"
          p={1}
          px={2}
          borderRadius={4}
          _hover={{ textDecor: "none" }}
          as={Button}
          href={routes.createPost}
        >
          Create post
        </Link>
        <Text fontSize="md" color="black" fontWeight="medium">
          {user?.username}
        </Text>
        <Button
          isLoading={isLoggingOut}
          onClick={async () => {
            logout();
            await apolloClient.resetStore();
          }}
          variant="link"
          color="black"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Box bg="tan" p={4}>
      <Flex maxW="800px" alignItems="center" mx="auto">
        <Link href="/" fontWeight={600} fontSize={20}>
          Chatreddit
        </Link>
        <Box ml="auto">{body}</Box>
      </Flex>
    </Box>
  );
};

export default Navbar;

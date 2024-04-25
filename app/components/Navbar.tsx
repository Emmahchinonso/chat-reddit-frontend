"use client";
import { Link } from "@chakra-ui/next-js";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { Suspense } from "react";
import { useLogoutMutation, useMeQuery } from "../generate/hooks";
import { useFragment } from "../generate";
import { RegularUserFragmentDoc } from "../generate/graphql";

const Navbar = () => {
  const [{ fetching: isLoggingOut }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  const user = useFragment(RegularUserFragmentDoc, data?.me);

  let body: any;
  if (fetching) {
    body = null;
  } else if (!user) {
    body = (
      <>
        <Link href="/login" color="white" mr={4}>
          Login
        </Link>
        <Link href="/register" color="white">
          Register
        </Link>
      </>
    );
  } else {
    body = (
      <Flex gap={3}>
        <Text fontSize="md" color="black" fontWeight="medium">
          {user?.username}
        </Text>
        <Button
          isLoading={isLoggingOut}
          onClick={() => logout({})}
          variant="link"
          color="black"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Suspense>
      <Flex bg="tan" p={4}>
        <Box ml="auto">{body}</Box>
      </Flex>
    </Suspense>
  );
};

export default Navbar;

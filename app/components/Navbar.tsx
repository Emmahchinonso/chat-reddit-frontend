"use client";
import { Link } from "@chakra-ui/next-js";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useMeQuery } from "../generate/hooks";
import { useFragment } from "../generate";
import { RegularUserFragmentDoc } from "../generate/graphql";

const Navbar = () => {
  const [{ data, fetching }] = useMeQuery();
  const user = useFragment(RegularUserFragmentDoc, data?.me);

  let body: any;
  if (fetching) {
    body = null;
  } else if (!data?.me) {
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
        <Button variant="link" color="black">
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tan" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default Navbar;

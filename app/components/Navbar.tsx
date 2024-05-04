"use client";
import { Link } from "@chakra-ui/next-js";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generate/hooks";
import { useFragment } from "../generate";
import { RegularUserFragmentDoc } from "../generate/graphql";
import { useRouter } from "next/navigation";
import { IS_CLIENT } from "../constants";

const Navbar = () => {
  const [{ fetching: isLoggingOut }, logout] = useLogoutMutation();
  const [{ data, fetching, stale }] = useMeQuery({
    pause: !IS_CLIENT,
  });
  const user = useFragment(RegularUserFragmentDoc, data?.me);
  const router = useRouter();

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
    <Flex bg="tan" p={4}>
      <Link href="/">Home</Link>
      <Link href="/login">login</Link>
      <Link href="/register">register</Link>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};

export default Navbar;

"use client";
import { Link } from "@chakra-ui/next-js";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const Navbar = () => {
  return (
    <Flex bg="tomato" p={4}>
      <Box ml="auto">
        <Link href="/login" color="white" mr={4}>
          Login
        </Link>
        <Link href="/register" color="white">
          Register
        </Link>
      </Box>
    </Flex>
  );
};

export default Navbar;

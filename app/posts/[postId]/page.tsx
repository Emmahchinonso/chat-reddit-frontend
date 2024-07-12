"use client";
import Wrapper from "@/app/components/Wrapper";
import { routes } from "@/app/constants/routes";
import { usePostQuery } from "@/app/generate/hooks";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";

const Post = ({ params }: { params: { postId: string } }) => {
  const [{ data, fetching }] = usePostQuery({
    variables: {
      id: Number(params.postId),
    },
  });

  if (fetching) return <p>Loading...</p>;
  console.log("post ==>", data);

  if (!data?.post) {
    return (
      <Box textAlign="center" mt={20}>
        <Text fontSize="40px" fontWeight={600}>
          OOPs
        </Text>
        <Text>Could not find what you're looking for 🥲</Text>
      </Box>
    );
  }

  return (
    <Wrapper>
      <main>
        <Link href={routes.home} display="block" mb={3}>
          {" "}
          <ArrowLeftIcon /> Go back
        </Link>
        <Heading mb={4}>{data.post.title}</Heading>
        {data?.post?.text}
      </main>
    </Wrapper>
  );
};

export default Post;

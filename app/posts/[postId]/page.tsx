"use client";
import EditDeleteButton from "@/app/components/EditDeleteButton";
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
          <ArrowLeftIcon /> Go back
        </Link>
        <Flex alignItems="center" gap={8} mb={4}>
          <Heading>{data.post.title}</Heading>
          <EditDeleteButton
            postId={data.post.id}
            authorId={data.post.author.id}
          />
        </Flex>
        {data?.post?.text}
      </main>
    </Wrapper>
  );
};

export default Post;

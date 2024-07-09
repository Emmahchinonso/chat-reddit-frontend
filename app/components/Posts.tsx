"use client";
import React, { useState } from "react";
import { usePostsQuery } from "../generate/hooks";
import { PostsLimit } from "../constants";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import VotePostButton from "./VotePostButton";
import { useFragment } from "../generate";
import { PostSnippetFragmentDoc } from "../generate/graphql";

const Posts = () => {
  const [variables, setVariables] = useState({
    limit: PostsLimit,
    cursor: null as string | null,
  });
  const [{ data, fetching, stale }, refetch] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <p>Could not fetch posts. please try reloading your page</p>;
  }
  const postData = data?.posts;
  const posts = useFragment(PostSnippetFragmentDoc, postData?.posts);

  return (
    <section>
      {!posts && fetching ? (
        <p>Loading...</p>
      ) : (
        <Stack spacing={4} pb={4}>
          {posts?.map((post) => (
            <Flex
              key={post.id}
              p={5}
              gap={3}
              alignItems="center"
              shadow="md"
              borderRadius={2}
              borderWidth="1px"
            >
              <VotePostButton post={post} />
              <Box>
                <Flex gap={2} alignItems="center">
                  <Heading fontSize="x-large">{post.title}</Heading> by{" "}
                  <Text fontWeight={400}>{post.author.username}</Text>
                </Flex>
                <Text mt={4}>{post.textSnippet}</Text>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
      {posts && postData?.hasMore ? (
        <Grid placeItems="center" my={8}>
          <Button
            isLoading={fetching || stale}
            onClick={() => {
              setVariables((state) => ({
                ...state,
                cursor: posts?.[posts.length - 1].createdAt,
              }));
            }}
          >
            Load more
          </Button>
        </Grid>
      ) : null}
    </section>
  );
};

export default Posts;

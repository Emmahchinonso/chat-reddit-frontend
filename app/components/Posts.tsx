"use client";
import React, { useRef, useState, useTransition } from "react";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
} from "../generate/hooks";
import { IS_CLIENT, PostsLimit } from "../constants";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import VotePostButton from "./VotePostButton";
import { useFragment } from "../generate";
import { PostSnippetFragmentDoc } from "../generate/graphql";
import { Link } from "@chakra-ui/next-js";
import { routes } from "../constants/routes";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import EditDeleteButton from "./EditDeleteButton";

const Posts = () => {
  const [isPending, startTransition] = useTransition();
  const { data, fetchMore, client } = usePostsQuery({
    variables: {
      limit: PostsLimit,
      cursor: null as string | null,
    },
  });

  if (!isPending && !data) {
    return <p>Could not fetch posts. please try reloading your page</p>;
  }

  const postData = data?.posts;
  const posts = useFragment(PostSnippetFragmentDoc, postData?.posts);

  return (
    <section>
      {!posts && isPending ? (
        <p>Loading...</p>
      ) : (
        <Stack spacing={4} pb={4}>
          {posts?.map((post) => (
            <Flex
              key={post.id}
              p={5}
              gap={4}
              alignItems="center"
              shadow="md"
              borderRadius={2}
              borderWidth="1px"
            >
              <VotePostButton post={post} />
              <Box flexGrow="1">
                <Link href={routes.postId(post.id)}>
                  <Heading fontSize="x-large">{post.title}</Heading>
                </Link>
                <Text mt={2}>{post.textSnippet}</Text>
                <Text fontWeight={400} fontSize="12px" mt={4}>
                  posted by{" "}
                  <Text as="span" fontWeight={500}>
                    {post.author.username}
                  </Text>
                </Text>
              </Box>
              <EditDeleteButton authorId={post.author.id} postId={post.id} />
            </Flex>
          ))}
        </Stack>
      )}
      {postData && postData?.hasMore ? (
        <Grid placeItems="center" my={8}>
          <Button
            isLoading={isPending}
            onClick={() => {
              startTransition(() => {
                fetchMore({
                  variables: {
                    limit: PostsLimit,
                    cursor: posts?.[posts?.length - 1].createdAt!,
                  },
                  // updateQuery: (
                  //   previousValue,
                  //   { fetchMoreResult }
                  // ): PostsQuery => {
                  //   if (!fetchMoreResult) {
                  //     return previousValue;
                  //   }
                  //   return {
                  //     __typename: "Query",
                  //     posts: {
                  //       __typename: "PaginatedPosts",
                  //       posts: [
                  //         ...previousValue.posts.posts,
                  //         ...fetchMoreResult.posts.posts,
                  //       ],
                  //       hasMore: fetchMoreResult.posts.hasMore,
                  //     },
                  //   };
                  // },
                });
              });
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

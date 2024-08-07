"use client";
import React, { useRef, useState } from "react";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
} from "../generate/hooks";
import { PostsLimit } from "../constants";
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
import {
  PostSnippetFragmentDoc,
  RegularUserFragmentDoc,
} from "../generate/graphql";
import { Link } from "@chakra-ui/next-js";
import { routes } from "../constants/routes";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import EditDeleteButton from "./EditDeleteButton";

const Posts = () => {
  const [variables, setVariables] = useState({
    limit: PostsLimit,
    cursor: null as string | null,
  });
  const [{ data, fetching, stale }, refetch] = usePostsQuery({
    variables,
  });
  const [{ data: userData }] = useMeQuery();
  const user = useFragment(RegularUserFragmentDoc, userData?.me);
  const [{ fetching: isDeleting }, deletePost] = useDeletePostMutation();
  const postRef = useRef<Number>();

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
            isLoading={fetching || stale}
            onClick={() => {
              setVariables((state) => ({
                ...state,
                cursor: posts?.[posts?.length - 1].createdAt!,
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

import React, { useState } from "react";
import { usePostsQuery } from "../generate/hooks";
import { IS_CLIENT } from "../constants";
import { Link } from "@chakra-ui/next-js";
import { routes } from "../constants/routes";
import { Box, Button, Grid, Heading, Stack, Text } from "@chakra-ui/react";

const Posts = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as string | null,
  });
  const [{ data, fetching }] = usePostsQuery({
    pause: !IS_CLIENT,
    variables,
  });

  if (!fetching && !data) {
    return <p>Could not fetch posts. please try reloading your page</p>;
  }

  return (
    <section>
      {!data && fetching ? (
        <p>Loading...</p>
      ) : (
        <Stack spacing={4}>
          {data?.posts.map((post) => (
            <Box
              key={post.id}
              p={5}
              shadow="md"
              borderRadius={2}
              borderWidth="1px"
            >
              <Heading fontSize="x-large">{post.title}</Heading>
              <Text mt={4}>{post.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data ? (
        <Grid placeItems="center" my={8}>
          <Button
            isLoading={fetching}
            onClick={() => {
              setVariables((state) => ({
                ...state,
                cursor: data.posts[data.posts.length - 1].createdAt,
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

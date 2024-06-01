import React from "react";
import { usePostsQuery } from "../generate/hooks";
import { IS_CLIENT } from "../constants";
import { Link } from "@chakra-ui/next-js";
import { routes } from "../constants/routes";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";

const Posts = () => {
  const [{ data, fetching }] = usePostsQuery({
    pause: !IS_CLIENT,
    variables: { limit: 10 },
  });

  return (
    <section>
      {data?.posts ? (
        <Stack spacing={4}>
          {data.posts.map((post) => (
            <Box
              key={post.id}
              p={5}
              shadow="md"
              borderRadius={2}
              borderWidth="1px"
            >
              <Heading fontSize="x-large">{post.title}</Heading>
              <Text mt={4}>{post.text}</Text>
            </Box>
          ))}
        </Stack>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
};

export default Posts;

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React, { useRef } from "react";
import { routes } from "../constants/routes";
import { useDeletePostMutation, useMeQuery } from "../generate/hooks";
import {
  PostSnippetFragment,
  RegularUserFragmentDoc,
} from "../generate/graphql";
import { useFragment } from "../generate";

const EditDeleteButton = ({
  postId,
  authorId,
}: {
  postId: number;
  authorId: number;
}) => {
  const [deletePost, { loading: isDeleting }] = useDeletePostMutation();
  const postRef = useRef<Number>();
  const { data: userData } = useMeQuery();
  const user = useFragment(RegularUserFragmentDoc, userData?.me);

  if (user?.id !== authorId) {
    return null;
  }

  return (
    <Flex alignItems="center" gap={4}>
      <IconButton
        variant="unstyled"
        icon={<DeleteIcon />}
        aria-label="delete post"
        onClick={async () => {
          postRef.current = postId;
          await deletePost({ variables: { id: postId } });
          postRef.current = undefined;
        }}
        isLoading={isDeleting && postRef.current === postId}
      />
      <Link href={routes.editPost(postId)}>
        <EditIcon />
      </Link>
    </Flex>
  );
};

export default EditDeleteButton;

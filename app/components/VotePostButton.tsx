import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useReducer, useState } from "react";
import { useVotePostMutation } from "../generate/hooks";
import { PostSnippetFragment } from "../generate/graphql";
import { VoteState } from "../types";

interface IProps {
  post: PostSnippetFragment;
}

const loadingVoteReducer = (prevState: LoadingState, state: LoadingState) => {
  return state;
};

enum LoadingState {
  notLoading = "not-loading",
  loadingUpVote = "loading-up-vote",
  loadingDownVote = "loading-down-vote",
}

const VotePostButton = ({ post }: IProps) => {
  const [loadingState, setLoadingState] = useState(LoadingState.notLoading);
  const [, vote] = useVotePostMutation();
  return (
    <Flex gap={1} alignItems="center" flexDirection="column">
      <IconButton
        aria-label="vote up button"
        minW={8}
        h={8}
        p="0"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="50%"
        isLoading={loadingState === LoadingState.loadingUpVote}
        bg="transparent"
        onClick={async () => {
          setLoadingState(LoadingState.loadingUpVote);
          await vote({ type: VoteState.UP, postId: post.id });
          setLoadingState(LoadingState.notLoading);
        }}
        icon={<TriangleUpIcon />}
      />
      {post.points}
      <IconButton
        aria-label="vote down button"
        minW={8}
        h={8}
        p="0"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="50%"
        bg="transparent"
        isLoading={loadingState === LoadingState.loadingDownVote}
        onClick={async () => {
          setLoadingState(LoadingState.loadingDownVote);
          await vote({ type: VoteState.DOWN, postId: post.id });
          setLoadingState(LoadingState.notLoading);
        }}
        icon={<TriangleDownIcon />}
      />
    </Flex>
  );
};

export default VotePostButton;

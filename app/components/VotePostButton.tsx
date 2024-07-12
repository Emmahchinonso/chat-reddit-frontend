import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useReducer, useState } from "react";
import { useVotePostMutation } from "../generate/hooks";
import { PostSnippetFragment } from "../generate/graphql";
import { VoteState } from "../types";

interface IProps {
  post: PostSnippetFragment;
}

enum LoadingState {
  notLoading = "not-loading",
  loadingUpVote = "loading-up-vote",
  loadingDownVote = "loading-down-vote",
}

const VotePostButton = ({ post }: IProps) => {
  const [loadingState, setLoadingState] = useState(LoadingState.notLoading);
  const [, vote] = useVotePostMutation();

  async function handleVote(type: VoteState, loadingState: LoadingState) {
    setLoadingState(loadingState);
    await vote({ type, postId: post.id });
    setLoadingState(LoadingState.notLoading);
  }

  return (
    <Flex gap={1} alignItems="center" flexDirection="column">
      <IconButton
        aria-label="vote up button"
        minW={8}
        h={8}
        p="0"
        size="sm"
        border="1px solid"
        borderColor="gray.200"
        isLoading={loadingState === LoadingState.loadingUpVote}
        bg={post.voteStatus === VoteState.UP ? "teal" : "transparent"}
        isRound
        onClick={async () => {
          if (post.voteStatus === VoteState.UP) {
            handleVote(VoteState.NONE, LoadingState.loadingUpVote);
          } else {
            handleVote(VoteState.UP, LoadingState.loadingUpVote);
          }
        }}
        variant="unstyled"
        icon={
          <TriangleUpIcon
            color={post.voteStatus === VoteState.UP ? "white" : "black"}
          />
        }
      />
      {post.points}
      <IconButton
        aria-label="vote down button"
        minW={8}
        h={8}
        p="0"
        border="1px solid"
        borderColor="gray.200"
        isRound
        size="sm"
        variant="unstyled"
        bg={post.voteStatus === VoteState.DOWN ? "orange" : "transparent"}
        isLoading={loadingState === LoadingState.loadingDownVote}
        onClick={async () => {
          if (post.voteStatus === VoteState.DOWN) {
            handleVote(VoteState.NONE, LoadingState.loadingDownVote);
          } else {
            handleVote(VoteState.DOWN, LoadingState.loadingDownVote);
          }
        }}
        icon={
          <TriangleDownIcon
            color={post.voteStatus === VoteState.DOWN ? "white" : "black"}
          />
        }
      />
    </Flex>
  );
};

export default VotePostButton;

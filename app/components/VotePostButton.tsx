import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useReducer, useState } from "react";
import { useMeQuery, useVotePostMutation } from "../generate/hooks";
import {
  PostSnippetFragment,
  RegularUserFragmentDoc,
} from "../generate/graphql";
import { VoteState } from "../types";
import { useFragment } from "../generate";
import { useRouter } from "next/navigation";
import { routes } from "../constants/routes";
import { gql } from "@apollo/client";

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
  const [vote] = useVotePostMutation();
  const { data: userData } = useMeQuery();
  const user = useFragment(RegularUserFragmentDoc, userData?.me);
  const router = useRouter();

  async function handleVote(type: VoteState, loadingState: LoadingState) {
    setLoadingState(loadingState);
    await vote({
      variables: { type, postId: post.id },
      update: (cache) => {
        const data = cache.readFragment({
          id: cache.identify(post),
          fragment: gql`
            fragment _ on Post {
              id
              points
              voteStatus
            }
          `,
        }) as PostSnippetFragment;
        if (data) {
          const pointsToAdd = type === "UP" ? 1 : -1;
          if (type === VoteState.NONE) {
            const pointsToAdd = data.voteStatus === "UP" ? -1 : 1;
            cache.writeFragment({
              id: cache.identify(post),
              fragment: gql`
                fragment _ on Post {
                  points
                  voteStatus
                }
              `,
              data: {
                points: data.points + pointsToAdd,
                voteStatus: null,
              },
            });
            return;
          }
          const newPoints =
            data.points + (data.voteStatus ? 2 : 1) * pointsToAdd;

          cache.writeFragment({
            id: cache.identify(post),
            fragment: gql`
              fragment _ on Post {
                points
                voteStatus
              }
            `,
            data: {
              points: newPoints,
              voteStatus: type,
            },
          });
        }
      },
    });
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
          if (!user) {
            router.push(routes.login);
            return;
          }
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
          if (!user) {
            router.push(routes.login);
            return;
          }
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

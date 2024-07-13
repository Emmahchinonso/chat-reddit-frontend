import { useMutation, useQuery } from "@urql/next";
import {
  ChangePasswordDocument,
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
  CreatePostDocument,
  CreatePostMutation,
  CreatePostMutationVariables,
  DeletePostDocument,
  DeletePostMutation,
  DeletePostMutationVariables,
  Exact,
  ForgotPasswordDocument,
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables,
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  LogoutDocument,
  LogoutMutation,
  LogoutMutationVariables,
  MeDocument,
  MeQuery,
  MeQueryVariables,
  PostDocument,
  PostQuery,
  PostQueryVariables,
  PostsDocument,
  PostsQuery,
  PostsQueryVariables,
  RegisterDocument,
  RegisterMutation,
  RegisterMutationVariables,
  VotePostDocument,
  VotePostMutation,
  VotePostMutationVariables,
} from "./graphql";
import * as Urql from "urql";

export const useLoginMutation = () => {
  return useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};

export const useRegisterMutation = () => {
  return useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
};

export const useMeQuery = (
  options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query">
) => {
  return useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
};

export const usePostsQuery = (
  options?: Omit<Urql.UseQueryArgs<PostsQueryVariables>, "query">
) => {
  return useQuery<PostsQuery, PostsQueryVariables>({
    query: PostsDocument,
    ...options,
  });
};

export const usePostQuery = (
  options: Omit<Urql.UseQueryArgs<PostQueryVariables>, "query">
) => {
  return useQuery({
    query: PostDocument,
    ...options,
  });
};

export const useLogoutMutation = () => {
  return useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};

export const useChangePasswordMutation = () => {
  return useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(
    ChangePasswordDocument
  );
};

export const useForgotPasswordMutation = () => {
  return useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(
    ForgotPasswordDocument
  );
};

export const useCreatePostMutation = () => {
  return useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument
  );
};

export const useDeletePostMutation = () => {
  return useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument
  );
};

export const useVotePostMutation = () => {
  return useMutation<VotePostMutation, VotePostMutationVariables>(
    VotePostDocument
  );
};

// import { useMutation } from "@urql/next";
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
  UpdatePostDocument,
  UpdatePostMutation,
  UpdatePostMutationVariables,
  VotePostDocument,
  VotePostMutation,
  VotePostMutationVariables,
} from "./graphql";
import * as Urql from "urql";
import {
  ApolloClient,
  QueryHookOptions,
  SuspenseQueryHookOptions,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from "@apollo/client";
import { IS_CLIENT } from "../constants";

export const useLoginMutation = () => {
  return useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};

export const useRegisterMutation = () => {
  return useMutation(RegisterDocument);
};

export const useMeQuery = (
  options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, "query">
) => {
  return useQuery<MeQuery, MeQueryVariables>(MeDocument, { ...options });
};

export const usePostsQuery = (
  options?: SuspenseQueryHookOptions<PostsQuery, PostsQueryVariables>
) => {
  return useSuspenseQuery<PostsQuery, PostsQueryVariables>(PostsDocument, {
    ...options,
  });
};

export const usePostQuery = (
  options: Omit<Urql.UseQueryArgs<PostQueryVariables>, "query">
) => {
  return useQuery(PostDocument, {
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

export const useUpdatePostMutation = () => {
  return useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument
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

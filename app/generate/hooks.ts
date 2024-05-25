import { useMutation, useQuery } from "@urql/next";
import {
  ChangePasswordDocument,
  ChangePasswordMutation,
  ChangePasswordMutationVariables,
  CreatePostDocument,
  CreatePostMutation,
  CreatePostMutationVariables,
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
  PostsDocument,
  PostsQuery,
  PostsQueryVariables,
  RegisterDocument,
  RegisterMutation,
  RegisterMutationVariables,
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

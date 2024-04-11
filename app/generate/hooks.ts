import { useMutation, useQuery } from "@urql/next";
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  LogoutDocument,
  MeDocument,
  MeQuery,
  MeQueryVariables,
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

export const useLogoutMutation = () => {
  return useMutation(LogoutDocument);
};

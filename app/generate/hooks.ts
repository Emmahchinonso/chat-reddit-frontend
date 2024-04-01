import { useMutation, useQuery } from "urql";
import { graphql } from ".";
import { loginDocument, meDocument, registerDocument } from "./documents";
import {
  LoginMutation,
  LoginMutationVariables,
  MeQuery,
  MeQueryVariables,
} from "./graphql";

export const useLoginMutation = () => {
  return useMutation(loginDocument);
};

export const useRegisterMutation = () => {
  return useMutation(registerDocument);
};

export const useMeQuery = () => {
  return useQuery<MeQuery, MeQueryVariables>({ query: meDocument });
};

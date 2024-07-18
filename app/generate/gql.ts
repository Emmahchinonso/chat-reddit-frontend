/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment PostSnippet on Post {\n  createdAt\n  id\n  title\n  points\n  updatedAt\n  textSnippet\n  voteStatus\n  author {\n    id\n    username\n  }\n}": types.PostSnippetFragmentDoc,
    "fragment RegularError on FieldError {\n  field\n  message\n}": types.RegularErrorFragmentDoc,
    "fragment RegularUser on User {\n  id\n  username\n}": types.RegularUserFragmentDoc,
    "fragment RegularUserResponse on UserResponse {\n  errors {\n    field\n    message\n  }\n  user {\n    id\n    username\n  }\n}": types.RegularUserResponseFragmentDoc,
    "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    ...RegularUserResponse\n  }\n}": types.ChangePasswordDocument,
    "mutation CreatePost($postRequest: CreatePostRequest!) {\n  createPost(postRequest: $postRequest) {\n    authorId\n    createdAt\n    id\n    points\n    text\n    title\n    updatedAt\n  }\n}": types.CreatePostDocument,
    "mutation DeletePost($id: Int!) {\n  deletePost(id: $id)\n}": types.DeletePostDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}": types.ForgotPasswordDocument,
    "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    ...RegularUserResponse\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($options: UserNamePassword!) {\n  register(options: $options) {\n    ...RegularUserResponse\n  }\n}": types.RegisterDocument,
    "mutation UpdatePost($text: String!, $title: String!, $id: Int!) {\n  updatePost(text: $text, title: $title, id: $id) {\n    id\n    text\n    textSnippet\n    title\n  }\n}": types.UpdatePostDocument,
    "mutation VotePost($type: String!, $postId: Int!) {\n  vote(type: $type, postId: $postId)\n}": types.VotePostDocument,
    "query Me {\n  me {\n    ...RegularUser\n  }\n}": types.MeDocument,
    "query Post($id: Int!) {\n  post(id: $id) {\n    createdAt\n    id\n    title\n    points\n    updatedAt\n    text\n    voteStatus\n    author {\n      id\n      username\n    }\n  }\n}": types.PostDocument,
    "query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    hasMore\n    posts {\n      ...PostSnippet\n    }\n  }\n}": types.PostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PostSnippet on Post {\n  createdAt\n  id\n  title\n  points\n  updatedAt\n  textSnippet\n  voteStatus\n  author {\n    id\n    username\n  }\n}"): (typeof documents)["fragment PostSnippet on Post {\n  createdAt\n  id\n  title\n  points\n  updatedAt\n  textSnippet\n  voteStatus\n  author {\n    id\n    username\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularError on FieldError {\n  field\n  message\n}"): (typeof documents)["fragment RegularError on FieldError {\n  field\n  message\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularUser on User {\n  id\n  username\n}"): (typeof documents)["fragment RegularUser on User {\n  id\n  username\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularUserResponse on UserResponse {\n  errors {\n    field\n    message\n  }\n  user {\n    id\n    username\n  }\n}"): (typeof documents)["fragment RegularUserResponse on UserResponse {\n  errors {\n    field\n    message\n  }\n  user {\n    id\n    username\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    ...RegularUserResponse\n  }\n}"): (typeof documents)["mutation ChangePassword($token: String!, $newPassword: String!) {\n  changePassword(token: $token, newPassword: $newPassword) {\n    ...RegularUserResponse\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreatePost($postRequest: CreatePostRequest!) {\n  createPost(postRequest: $postRequest) {\n    authorId\n    createdAt\n    id\n    points\n    text\n    title\n    updatedAt\n  }\n}"): (typeof documents)["mutation CreatePost($postRequest: CreatePostRequest!) {\n  createPost(postRequest: $postRequest) {\n    authorId\n    createdAt\n    id\n    points\n    text\n    title\n    updatedAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeletePost($id: Int!) {\n  deletePost(id: $id)\n}"): (typeof documents)["mutation DeletePost($id: Int!) {\n  deletePost(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    ...RegularUserResponse\n  }\n}"): (typeof documents)["mutation Login($usernameOrEmail: String!, $password: String!) {\n  login(usernameOrEmail: $usernameOrEmail, password: $password) {\n    ...RegularUserResponse\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($options: UserNamePassword!) {\n  register(options: $options) {\n    ...RegularUserResponse\n  }\n}"): (typeof documents)["mutation Register($options: UserNamePassword!) {\n  register(options: $options) {\n    ...RegularUserResponse\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdatePost($text: String!, $title: String!, $id: Int!) {\n  updatePost(text: $text, title: $title, id: $id) {\n    id\n    text\n    textSnippet\n    title\n  }\n}"): (typeof documents)["mutation UpdatePost($text: String!, $title: String!, $id: Int!) {\n  updatePost(text: $text, title: $title, id: $id) {\n    id\n    text\n    textSnippet\n    title\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation VotePost($type: String!, $postId: Int!) {\n  vote(type: $type, postId: $postId)\n}"): (typeof documents)["mutation VotePost($type: String!, $postId: Int!) {\n  vote(type: $type, postId: $postId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    ...RegularUser\n  }\n}"): (typeof documents)["query Me {\n  me {\n    ...RegularUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Post($id: Int!) {\n  post(id: $id) {\n    createdAt\n    id\n    title\n    points\n    updatedAt\n    text\n    voteStatus\n    author {\n      id\n      username\n    }\n  }\n}"): (typeof documents)["query Post($id: Int!) {\n  post(id: $id) {\n    createdAt\n    id\n    title\n    points\n    updatedAt\n    text\n    voteStatus\n    author {\n      id\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    hasMore\n    posts {\n      ...PostSnippet\n    }\n  }\n}"): (typeof documents)["query Posts($limit: Int!, $cursor: String) {\n  posts(limit: $limit, cursor: $cursor) {\n    hasMore\n    posts {\n      ...PostSnippet\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
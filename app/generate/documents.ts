import { DocumentType, graphql } from ".";
import * as types from "./graphql";

export const loginDocument = graphql(`mutation Login($options: UserNamePassword!) {\n  login(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      ...RegularUser\n    }\n  }\n}`);

export const registerDocument = graphql(`mutation Register($options: UserNamePassword!) {\n  register(options: $options) {\n    errors {\n      field\n      message\n    }\n    user {\n      createdAt\n      updatedAt\n      ...RegularUser\n    }\n  }\n}`);

export const meDocument = graphql(`query Me {\n  me {\n    ...RegularUser\n  }\n}`);

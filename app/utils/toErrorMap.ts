import { RegularErrorFragment } from "../generate/graphql";

export const toErrormap = (errors: readonly RegularErrorFragment[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach((error) => {
    errorMap[error.field] = error.message;
  });

  return errorMap;
};

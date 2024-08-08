"use client";
import InputField from "@/app/components/InputField";
import Wrapper from "@/app/components/Wrapper";
import { routes } from "@/app/constants/routes";
import { useFragment } from "@/app/generate";
import {
  MeDocument,
  MeQuery,
  RegularUserResponseFragmentDoc,
} from "@/app/generate/graphql";
import { useChangePasswordMutation } from "@/app/generate/hooks";
import { toErrormap } from "@/app/utils/toErrorMap";
import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ChangePassword = ({ params }: { params: { token: string } }) => {
  const router = useRouter();
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            variables: {
              newPassword: values.newPassword,
              token: params.token,
            },
            update: (cache, { data }) => {
              const userData = useFragment(
                RegularUserResponseFragmentDoc,
                data?.changePassword
              );
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: userData?.user,
                },
              });
            },
          });
          const dataResponse = useFragment(
            RegularUserResponseFragmentDoc,
            response.data?.changePassword
          );
          const errors = dataResponse?.errors;
          if (errors) {
            const errorMap = toErrormap(errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            // setErrors(toErrormap(errors));
          } else if (dataResponse?.user) {
            router.push(routes.home);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="Enter new password"
              label="New password"
              type="password"
            />
            {tokenError ? (
              <Flex gap={2} mt={2} fontSize={12}>
                <Box color="red">{tokenError}</Box>
                <Link
                  href="/forgot-password
                "
                  textDecorationLine="underline"
                  textUnderlineOffset="2px"
                >
                  Get new token
                </Link>
              </Flex>
            ) : null}
            <Button
              isLoading={isSubmitting}
              colorScheme="teal"
              type="submit"
              mt={4}
            >
              Change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default ChangePassword;

"use client";
import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";

import { toErrormap } from "../utils/toErrorMap";
import { useRouter } from "next/navigation";
import { routes } from "../constants/routes";
import { useRegisterMutation } from "../generate/hooks";
import {
  MeDocument,
  MeQuery,
  RegularUserResponseFragmentDoc,
} from "../generate/graphql";
import { useFragment } from "../generate";

const Register = ({}) => {
  const [register, { loading }] = useRegisterMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { options: values },
            update: (cache, { data }) => {
              const userData = useFragment(
                RegularUserResponseFragmentDoc,
                data?.register
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
            response.data?.register
          );
          const user = dataResponse?.user;
          const errors = dataResponse?.errors;
          if (errors) {
            setErrors(toErrormap(errors));
          } else if (user) {
            router.push(routes.home);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="email"
                placeholder="email"
                label="Email"
                type="email"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              isLoading={loading || isSubmitting}
              colorScheme="teal"
              type="submit"
              mt={4}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;

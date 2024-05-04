"use client";
import { Box, Button, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { Suspense } from "react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { toErrormap } from "../utils/toErrorMap";
import { useRouter } from "next/navigation";
import { routes } from "../constants/routes";
import { useLoginMutation } from "../generate/hooks";
import { useFragment } from "../generate";
import {
  RegularErrorFragmentDoc,
  RegularUserFragmentDoc,
  RegularUserResponseFragmentDoc,
} from "../generate/graphql";
import Navbar from "../components/Navbar";

interface LoginProps {}

const Login: LoginProps = ({}) => {
  const [{ fetching }, login] = useLoginMutation();
  const router = useRouter();
  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        <Navbar />
      </Suspense>
      <Wrapper variant="small">
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);
            const dataResponse = useFragment(
              RegularUserResponseFragmentDoc,
              response.data?.login
            );
            const user = dataResponse?.user;
            const errors = dataResponse?.errors;
            if (errors) {
              setErrors(toErrormap(errors));
            } else if (user) {
              router.push(routes.home);
              router.refresh();
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="usernameOrEmail"
                placeholder="username or email"
                label="username or email"
              />
              <Box mt={4} />
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
              <Link
                href="/forgot-password
                "
                textDecorationLine="underline"
                textUnderlineOffset="2px"
                display="block"
                mt={2}
                fontSize={14}
                color="grey"
              >
                Forgot password?
              </Link>
              <Button
                isLoading={fetching || isSubmitting}
                colorScheme="teal"
                type="submit"
                mt={4}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default Login;

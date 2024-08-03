"use client";
import { Box, Button, Link } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { toErrormap } from "../utils/toErrorMap";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "../constants/routes";
import { useLoginMutation } from "../generate/hooks";
import { useFragment } from "../generate";
import { RegularUserResponseFragmentDoc } from "../generate/graphql";

const Login = () => {
  const [login, { loading }] = useLoginMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next");
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ variables: values });
          const dataResponse = useFragment(
            RegularUserResponseFragmentDoc,
            response.data?.login
          );
          const user = dataResponse?.user;
          const errors = dataResponse?.errors;
          if (errors) {
            setErrors(toErrormap(errors));
          } else if (user) {
            router.push(nextUrl || routes.home);
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
              isLoading={loading || isSubmitting}
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
  );
};

export default Login;

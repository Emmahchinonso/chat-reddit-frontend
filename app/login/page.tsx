"use client";
import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { useLoginMutation } from "../generate/graphql";
import { toErrormap } from "../utils/toErrorMap";
import { useRouter } from "next/navigation";
import { routes } from "../constants/routes";

interface LoginProps {}

const Login: LoginProps = ({}) => {
  const [{ fetching }, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values });
          if (response.data?.login.errors) {
            setErrors(toErrormap(response.data.login.errors));
          } else if (response.data?.login.user) {
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
            <Box mt={4} />
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
            />
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
  );
};

export default Login;

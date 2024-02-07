"use client";
import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";
import { gql, useMutation } from "urql";

interface RegisterProps {}

const Register: RegisterProps = ({}) => {
  const registerUser = gql`
    mutation Register($username: String!, $password: String!) {
      register(options: { username: $username, password: $password }) {
        errors {
          field
          message
        }
        user {
          createdAt
          id
          updatedAt
          username
        }
      }
    }
  `;
  const [{ fetching }, register] = useMutation(registerUser);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, helpers) => {
          const response = await register(values);
          helpers.resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
              required
            />
            <Box mt={4} />
            <InputField
              name="password"
              placeholder="password"
              label="Password"
              type="password"
              required
            />
            <Button
              isLoading={fetching || isSubmitting}
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

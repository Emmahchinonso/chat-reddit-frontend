"use client";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import Wrapper from "../components/Wrapper";
import InputField from "../components/InputField";

interface RegisterProps {}

const Register: RegisterProps = ({}) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
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
              isLoading={isSubmitting}
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

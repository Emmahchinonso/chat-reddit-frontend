"use client";
import { Box, Button, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generate/hooks";

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors }) => {
          await forgotPassword({ variables: values });
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              <p>If an account with such email exists, we sent you an email</p>
            </Box>
          ) : (
            <Form>
              <Box mb={4}>
                <InputField
                  name="email"
                  placeholder="Email address"
                  label="Email address"
                />
              </Box>

              <Button isLoading={isSubmitting} colorScheme="teal" type="submit">
                Forgot password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default ForgotPassword;

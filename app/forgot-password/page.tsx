"use client";
import { Box, Button, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import router from "next/router";
import React, { useState } from "react";
import InputField from "../components/InputField";
import Wrapper from "../components/Wrapper";
import { routes } from "../constants/routes";
import { useFragment } from "../generate";
import { RegularUserResponseFragmentDoc } from "../generate/graphql";
import { toErrormap } from "../utils/toErrorMap";
import { useForgotPasswordMutation } from "../generate/hooks";

const ForgotPassword = () => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors }) => {
          await forgotPassword(values);
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

"use client";
import React, { useEffect } from "react";
import Wrapper from "../../components/Wrapper";
import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputField from "../../components/InputField";
import { useCreatePostMutation, useMeQuery } from "../../generate/hooks";
import { useRouter } from "next/navigation";
import { apiErrors } from "../../utils/apiErros";
import { routes } from "@/app/constants/routes";
import useCheckAuthState from "@/app/hooks/useAuth";
import { useFragment } from "@/app/generate";
import { RegularUserFragmentDoc } from "@/app/generate/graphql";
import { IS_CLIENT } from "@/app/constants";

const Page = () => {
  useCheckAuthState();
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, {}) => {
          const { error } = await createPost({ postRequest: values });
          console.log("error ==>", error?.message);
          if (!error) {
            router.push(routes.home);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="title"
              placeholder="Post title"
              label="Post title"
            />
            <Box mt={4} />
            <InputField
              name="text"
              placeholder="text..."
              label="Post body"
              textArea
            />

            <Button
              isLoading={isSubmitting}
              colorScheme="teal"
              type="submit"
              mt={4}
            >
              Create post
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Page;

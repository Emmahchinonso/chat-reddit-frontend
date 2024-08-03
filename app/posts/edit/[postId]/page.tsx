"use client";
import React, { useEffect } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { routes } from "@/app/constants/routes";
import useIsAuth from "@/app/hooks/useAuth";
import Wrapper from "@/app/components/Wrapper";
import InputField from "@/app/components/InputField";
import {
  useCreatePostMutation,
  usePostQuery,
  useUpdatePostMutation,
} from "@/app/generate/hooks";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";

const EditPost = ({ params }: { params: { postId: string } }) => {
  useIsAuth();
  const router = useRouter();
  const { data, loading } = usePostQuery({
    variables: {
      id: Number(params.postId),
    },
  });
  const [updatePost] = useUpdatePostMutation();

  if (loading) {
    return <Wrapper variant="small">Loading...</Wrapper>;
  }

  return (
    <Wrapper variant="small">
      <Link href={routes.home} display="block" mb={3}>
        {" "}
        <ArrowLeftIcon /> Go back
      </Link>
      <Heading fontSize={28} mb={5}>
        Edit post
      </Heading>
      <Formik
        initialValues={{
          title: data?.post?.title || "",
          text: data?.post?.text || "",
        }}
        onSubmit={async (values, {}) => {
          const { errors } = await updatePost({
            variables: { id: +params.postId, ...values },
          });
          if (!errors) {
            router.back();
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
              Update post
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default EditPost;

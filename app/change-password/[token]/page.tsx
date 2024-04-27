import InputField from "@/app/components/InputField";
import Wrapper from "@/app/components/Wrapper";
import { routes } from "@/app/constants/routes";
import { toErrormap } from "@/app/utils/toErrorMap";
import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";

const ChangePassword = ({ params }: { params: { token: string } }) => {
  const router = useRouter();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          //   const response = await login(values);
          //   if (response.data?.login.errors) {
          //     setErrors(toErrormap(response.data.login.errors));
          //   } else if (response.data?.login.user) {
          //     router.push(routes.home);
          //   }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="Enter new password"
              label="New password"
              type="password"
            />
            <Button
              isLoading={isSubmitting}
              colorScheme="teal"
              type="submit"
              mt={4}
            >
              Change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default ChangePassword;

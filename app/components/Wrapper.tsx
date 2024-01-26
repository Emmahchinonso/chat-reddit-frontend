import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  variant?: "regular" | "small";
}

const Wrapper = ({ children, variant = "regular" }: WrapperProps) => {
  return (
    <Box maxW={variant == "regular" ? "800px" : "400px"} mt={8} mx="auto">
      {children}
    </Box>
  );
};

export default Wrapper;

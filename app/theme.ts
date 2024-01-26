import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

export const theme: ThemeConfig = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

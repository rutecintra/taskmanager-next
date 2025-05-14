"use client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

export default function ChakraProviderWrapper({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

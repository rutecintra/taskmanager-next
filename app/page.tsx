import { Box, Heading, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Box maxWidth="container.md" mx="auto" p={8} textAlign="center">
      <Heading mb={6}>Bem-vindo ao Gerenciador de Tarefas</Heading>
      <Link href="/dashboard" passHref>
        <Button as="a" colorScheme="blue" size="lg">
          Entrar no Dashboard
        </Button>
      </Link>
    </Box>
  );
}
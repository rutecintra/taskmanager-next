import { Box, Flex, Button, Heading } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <Flex as="nav" bg="blue.500" color="white" p={4} alignItems="center" justifyContent="space-between">
      <Heading size="md">Task Manager</Heading>
      <Box>
        {session ? (
          <Button colorScheme="whiteAlpha" size="sm" onClick={() => signOut()}>
            Logout
          </Button>
        ) : (
          <Link href="/login" passHref>
            <Button as="a" colorScheme="whiteAlpha" size="sm">
              Login
            </Button>
          </Link>
        )}
      </Box>
    </Flex>
  );
}
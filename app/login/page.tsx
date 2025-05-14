"use client";

import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Heading, Alert, AlertIcon } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const result = await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });
    
    if (result.error) {
      setError("Email ou senha inválidos");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Box maxWidth="400px" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
      <Heading size="lg" mb={6} textAlign="center">Login</Heading>
      
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input 
            type="email" 
            name="email" 
            value={credentials.email} 
            onChange={handleChange} 
            placeholder="Digite seu email"
          />
        </FormControl>
        
        <FormControl mb={6} isRequired>
          <FormLabel>Senha</FormLabel>
          <Input 
            type="password" 
            name="password" 
            value={credentials.password} 
            onChange={handleChange} 
            placeholder="Digite sua senha"
          />
        </FormControl>
        
        <Button type="submit" colorScheme="blue" width="full">
          Entrar
        </Button>
      </Box>
    </Box>
  );
}
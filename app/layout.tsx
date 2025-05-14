import { ReactNode } from "react";
import AuthProvider from './providers/AuthProvider';
import ChakraProviderWrapper from './providers/ChakraProvider';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <ChakraProviderWrapper>
            {children}
          </ChakraProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
"use client";

import { Authenticator } from "@aws-amplify/ui-react";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { Amplify } from "aws-amplify";
import amplifyconfig from "@/amplify_outputs.json";

// Configure Amplify in the client side
Amplify.configure(amplifyconfig, { ssr: true });

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Authenticator>
        {children}
        <Toaster position="bottom-right" closeButton />
      </Authenticator>
    </ThemeProvider>
  );
}

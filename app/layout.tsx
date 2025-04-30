"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import amplifyconfig from "@/amplify_outputs.json";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";

// Configure Amplify in the client side
Amplify.configure(amplifyconfig);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// We can't use metadata export with client components
// Using Head component instead for title and description

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Task Master | AWS Amplify & Next.js</title>
        <meta name="description" content="Modern task management app built with AWS Amplify and Next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} ${inter.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Authenticator.Provider>
            {children}
            <Toaster position="bottom-right" closeButton />
          </Authenticator.Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}

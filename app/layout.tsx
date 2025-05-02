
import { Inter } from "next/font/google";
import "./globals.css";

import "@aws-amplify/ui-react/styles.css";
import { Toaster } from "@/components/ui/sonner";

import Providers from "@/components/providers";


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
        <Providers>
            {children}
            <Toaster position="bottom-right" closeButton />
        </Providers>
      </body>
    </html>
  );
}

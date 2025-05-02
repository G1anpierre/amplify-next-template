"use client";

import { AuthUser } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";

function Login({ user }: { user?: AuthUser }) {
  const router = useRouter();

  useEffect(() => {
    if (user) {
      // Use Next.js router for navigation without full reload
      router.push("/");
    }
  }, [user, router]);

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-secondary/20 py-8 px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">
              Welcome, {user?.signInDetails?.loginId}!
            </h1>
            <button
              onClick={signOut}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default Login;

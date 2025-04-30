"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";

function Login() {
  const router = useRouter();
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  useEffect(() => {
    if (authStatus === "authenticated") {
      router.push("/");
    }
  }, [authStatus, router]);

  return null;
}

export default withAuthenticator(Login); 
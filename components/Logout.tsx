"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        await signOut();
        router.push("/login");
      }}
      variant="outline"
    >
      Sign out
    </Button>
  );
} 
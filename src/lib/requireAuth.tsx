// /src/lib/requireAuth.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@lib/auth"; // Assuming you have a custom auth hook that uses Firebase

export function requireAuth(Component: any) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const { user, loading } = useAuth(); // Custom hook to get the user

    useEffect(() => {
      if (!loading && !user) {
        router.push("/signin");
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return <p>Loading...</p>; // Loading state or a spinner
    }

    return <Component {...props} />;
  };
}

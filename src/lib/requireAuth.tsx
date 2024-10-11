"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@lib/auth";
import Spinner from "@components/Spinner";

export function requireAuth(Component: any) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/signin");
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner aria-label="Loading user authentication..." />{" "}
        </div>
      );
    }

    return <Component {...props} />;
  };
}

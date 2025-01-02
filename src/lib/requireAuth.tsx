"use client";

import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";
import { useAuth } from "@lib/auth";
import Spinner from "@components/Spinner";

type RequireAuthOptions = {
  redirectUrl?: string;
  allowedRoles?: string[];
};

export function requireAuth<P>(
  Component: ComponentType<P>,
  options: RequireAuthOptions = {}
): ComponentType<P> {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();
    const { user, loading, userRoles } = useAuth();
    const { redirectUrl = "/signin", allowedRoles } = options;

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push(redirectUrl);
        } else if (allowedRoles && allowedRoles.length > 0) {
          const hasAllowedRole = allowedRoles.some((role) =>
            userRoles.includes(role)
          );
          if (!hasAllowedRole) {
            router.push("/unauthorized");
          }
        }
      }
    }, [user, loading, router, redirectUrl, allowedRoles, userRoles]);

    if (loading || !user) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="p-8 bg-white rounded-lg shadow-md">
            <Spinner aria-label="Authenticating..." />
            <p className="mt-4 text-gray-600">Authenticating...</p>
          </div>
        </div>
      );
    }

    return <Component {...(props as P & JSX.IntrinsicAttributes)} />;
  };

  // Explicitly set the display name for better debugging
  AuthenticatedComponent.displayName = `RequireAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return AuthenticatedComponent;
}

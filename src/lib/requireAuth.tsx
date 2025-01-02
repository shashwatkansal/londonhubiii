"use client";

import { useRouter } from "next/navigation";
import { useEffect, ComponentType } from "react";
import { useAuth } from "@lib/auth";
import Spinner from "@components/Spinner";

// Define a type for the props that can be passed to the wrapped component
type ComponentProps = { [key: string]: any };

export function requireAuth<P extends ComponentProps>(
    Component: ComponentType<P>,
    options: {
        redirectUrl?: string;
        allowedRoles?: string[];
    } = {}
) {
    return function AuthenticatedComponent(props: P) {
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

        // If roles are specified and user doesn't have any of the allowed roles
        if (allowedRoles && allowedRoles.length > 0) {
            const hasAllowedRole = allowedRoles.some((role) =>
                userRoles.includes(role)
            );
            if (!hasAllowedRole) {
                return null; // Or you could render an "Unauthorized" component here
            }
        }

        return <Component {...props} />;
    };
}

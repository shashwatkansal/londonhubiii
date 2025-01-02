import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/lib/auth";
import { db } from "@/lib/firebaseConfig";

export function useAdminAccess() {
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user?.email) {
        console.warn("No user email found during admin check.");
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        console.log(`Checking admin status for email: ${user.email}`);
        const adminDocRef = doc(db, "admins", user.email);
        const adminDocSnapshot = await getDoc(adminDocRef);

        if (adminDocSnapshot.exists()) {
          console.log(`${user.email} is an admin.`);
          setIsAdmin(true);
        } else {
          console.log(`${user.email} is not an admin.`);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      checkAdminStatus();
    }
  }, [user, authLoading]);

  return { isAdmin, loading };
}

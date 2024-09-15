"use client";
import { useEffect, useState, useContext, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig"; // Ensure Firebase config is correct
import { doc, getDoc } from "firebase/firestore";

// Create an AuthContext
const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false); // Admin status state
  const [loading, setLoading] = useState(true);

  // Check if user is an admin by checking if their email exists as a document ID
  const checkAdminStatus = async (email: string) => {
    try {
      const adminDocRef = doc(db, "admins", email); // Reference the document by email (ID)
      const adminDocSnapshot = await getDoc(adminDocRef);

      setIsAdmin(adminDocSnapshot.exists()); // If document exists, user is an admin
    } catch (error) {
      console.error("Error checking admin status: ", error);
      setIsAdmin(false);
    }
  };

  // Handle auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await checkAdminStatus(currentUser.email || ""); // Check admin status based on email ID
      } else {
        setUser(null);
        setIsAdmin(false); // Reset admin status
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to access auth context
export function useAuth() {
  return useContext(AuthContext);
}

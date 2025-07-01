"use client";
import { useEffect, useState, useContext, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async (email: string) => {
    try {
      const adminDocRef = doc(db, "admins", email);
      const adminDocSnapshot = await getDoc(adminDocRef);

      setIsAdmin(adminDocSnapshot.exists());
    } catch (error) {
      console.error("Error checking admin status: ", error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await checkAdminStatus(currentUser.email || "");
      } else {
        setUser(null);
        setIsAdmin(false);
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

export function useAuth() {
  return useContext(AuthContext);
}

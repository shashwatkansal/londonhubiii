"use client";
import { useEffect, useState, useContext, createContext } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { AuthContextType, User } from "@/types";
import { COLLECTIONS } from "./constants";
import { AuthError, logError } from "./errors";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAdminStatus = async (email: string): Promise<boolean> => {
    try {
      const adminDocRef = doc(db, COLLECTIONS.ADMINS, email);
      const adminDocSnapshot = await getDoc(adminDocRef);
      return adminDocSnapshot.exists();
    } catch (error) {
      logError(error, 'checkAdminStatus');
      throw new AuthError('Failed to check admin status');
    }
  };

  const mapFirebaseUser = (firebaseUser: FirebaseUser): User => ({
    id: firebaseUser.uid,
    uid: firebaseUser.uid,
    email: firebaseUser.email || '',
    displayName: firebaseUser.displayName || undefined,
    photoURL: firebaseUser.photoURL || undefined,
    createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
    updatedAt: new Date(firebaseUser.metadata.lastSignInTime || Date.now()),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setError(null);
        
        if (currentUser) {
          const mappedUser = mapFirebaseUser(currentUser);
          setUser(mappedUser);
          
          if (currentUser.email) {
            const adminStatus = await checkAdminStatus(currentUser.email);
            setIsAdmin(adminStatus);
          }
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      } catch (error) {
        logError(error, 'AuthProvider.onAuthStateChanged');
        setError('Failed to authenticate user');
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const contextValue: AuthContextType = {
    user,
    isAdmin,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

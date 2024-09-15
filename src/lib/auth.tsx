// /src/lib/auth.tsx
"use client";
import { useEffect, useState, useContext, createContext } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Your Firebase config
import { doc, setDoc } from "firebase/firestore";
import { db } from "@lib/firebaseConfig";
import {
  getDatabase,
  ref,
  onDisconnect,
  set,
  serverTimestamp,
} from "firebase/database";
const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// Store login information in Firestore
export const storeLoginInfo = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(
    userRef,
    {
      email: user.email,
      lastLogin: new Date(), // Set current login time
    },
    { merge: true }
  );
};

// Hook into Firebase auth state change
export const onAuthStateChange = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      storeLoginInfo(user); // Call the store function
    }
  });
};

export const trackUserPresence = () => {
  const db = getDatabase();
  auth.onAuthStateChanged((user) => {
    if (user) {
      const statusRef = ref(db, `/status/${user.uid}`);
      set(statusRef, {
        state: "online",
        last_changed: serverTimestamp(),
      });

      // Handle disconnect events
      onDisconnect(statusRef).set({
        state: "offline",
        last_changed: serverTimestamp(),
      });
    }
  });
};

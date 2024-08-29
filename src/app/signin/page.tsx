// /app/signin/page.tsx

"use client";

import { useState } from "react";
import { auth, googleProvider } from "@lib/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to home or any other page
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to home or any other page
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/"); // Redirect to home or any other page
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSigningUp ? "Sign Up" : "Sign In"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="mb-4 p-2 w-full border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="mb-4 p-2 w-full border rounded"
        />
        <button
          onClick={isSigningUp ? handleSignUp : handleSignIn}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          {isSigningUp ? "Sign Up" : "Sign In"}
        </button>
        <button
          onClick={handleGoogleSignIn}
          className="bg-red-500 text-white py-2 px-4 rounded w-full mt-4"
        >
          Sign in with Google
        </button>
        {!isSigningUp && (
          <button
            onClick={handleForgotPassword}
            className="text-blue-500 mt-4 w-full"
          >
            Forgot Password?
          </button>
        )}
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsSigningUp(!isSigningUp)}
            className="text-blue-500"
          >
            {isSigningUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}

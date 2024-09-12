"use client";

import { useState } from "react";
import { auth, googleProvider, db } from "@lib/firebaseConfig"; // Ensure db is imported from Firebase config
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Firestore functions for checking the directory
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const GoogleIcon = () => (
  <FcGoogle className="mr-2 text-wef-blue" style={{ fontSize: "1.5rem" }} />
);

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  // Helper function to check if the email exists in the "directory" collection
  const checkEmailInDirectory = async (email: string): Promise<boolean> => {
    const docRef = doc(db, "directory", email);
    const docSnap = await getDoc(docRef);
    return docSnap.exists(); // Returns true if the document with email exists, false otherwise
  };

  const handleSignIn = async () => {
    try {
      const emailExists = await checkEmailInDirectory(email);
      if (!emailExists) {
        throw new Error(
          "This email is not authorized for sign-in. Please contact support."
        );
      }
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/hub/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const emailExists = await checkEmailInDirectory(email);
      if (!emailExists) {
        throw new Error(
          "This email is not authorized for sign-up. Please contact support."
        );
      }
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/hub/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const emailExists = await checkEmailInDirectory(email);
      if (!emailExists) {
        throw new Error(
          "This email is not authorized for password reset. Please contact support."
        );
      }
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;
      if (userEmail) {
        const emailExists = await checkEmailInDirectory(userEmail);
        if (!emailExists) {
          throw new Error(
            "This email is not authorized for sign-in. Please contact support."
          );
        }
        router.push("/hub/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          src="/assets/videos/shapers_stock.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Sign-In Box */}
      <div className="relative z-10 bg-white text-wef-blue p-8 rounded-lg shadow-2xl w-96 card card-bordered">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isSigningUp ? "Sign Up" : "Sign In"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="input input-bordered w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="input input-bordered w-full mb-4"
        />
        <button
          onClick={isSigningUp ? handleSignUp : handleSignIn}
          className="btn btn-primary w-full mb-4 bg-wef-gradient hover:opacity-80 text-white"
        >
          {isSigningUp ? "Sign Up" : "Sign In"}
        </button>
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full flex items-center justify-center hover:opacity-60 text-wef-blue"
        >
          <GoogleIcon />
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
